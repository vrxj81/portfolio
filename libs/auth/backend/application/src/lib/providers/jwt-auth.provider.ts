/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import {
  RegisterRequestDto,
  LoginRequestDto,
  AuthResponseDto,
} from '@portfolio/common-dtos';
import { IUser } from '@portfolio/common-models';
import { JwtService } from '@nestjs/jwt';
import { User } from '@portfolio/backend-data-access-users';
import { compare, genSalt, hash } from 'bcrypt';
import { Role } from '@portfolio/backend-data-access-roles';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  AuthConfig,
  InjectAuthConfig,
  InjectJwtConfig,
  JwtConfig,
} from '@portfolio/auth-backend-config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtAuthProvider implements AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly eventEmitter: EventEmitter2,
    @InjectAuthConfig() private readonly authConfig: AuthConfig,
    @InjectJwtConfig() private readonly jwtConfig: JwtConfig,
  ) {}

  async register(
    registerRequest: RegisterRequestDto,
  ): Promise<AuthResponseDto | { registered: boolean }> {
    if (registerRequest.password !== registerRequest.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashedPassword = await hash(
      registerRequest.password,
      await genSalt(),
    );
    const role = await this.roleRepository.findOne({
      where: { name: registerRequest.role || this.authConfig.defaultRole },
    });
    if (!role) {
      throw new BadRequestException('Role not found');
    }
    const newUser = this.userRepository.create({
      ...registerRequest,
      password: hashedPassword,
      isActive: !this.authConfig.activationRequired,
      roles: [role],
      accessToken: this.authConfig.activationRequired
        ? crypto.randomUUID()
        : undefined,
    });

    await this.userRepository.save(newUser);

    const { password, ...user } = newUser;
    this.eventEmitter.emit('user.registered', {
      email: user.email,
      name: user.username,
      userId: user.id,
      token: user.accessToken,
      registrationRequired: this.authConfig.activationRequired,
    });
    if (this.authConfig.activationRequired) {
      return { registered: true };
    }
    const payload = { sub: user.id, user };
    return this.generateTokens(payload);
  }

  async login(loginRequest: LoginRequestDto): Promise<AuthResponseDto> {
    const loginUser: IUser | null = await this.userRepository.findOne({
      where: {
        email: loginRequest.email,
        isActive: true,
      },
      relations: ['roles', 'roles.permissions'],
    });
    if (
      !loginUser ||
      !(await compare(loginRequest.password, loginUser.password || ''))
    ) {
      throw new BadRequestException('Invalid credentials');
    }
    const { password, ...user } = loginUser;
    const payload = { sub: user.id, user };
    this.eventEmitter.emit('user.logged-in', user);
    return this.generateTokens(payload);
  }

  async activate(
    userId: string,
    token: string,
  ): Promise<{ activated: boolean }> {
    const user: IUser | null = await this.userRepository.findOne({
      where: {
        id: userId,
        accessToken: token,
      },
    });
    if (!user) {
      throw new BadRequestException('Invalid activation token');
    }
    if (user.isActive) {
      throw new BadRequestException('User already activated');
    }
    await this.userRepository.update(user, { isActive: true });
    await this.userRepository.save(user);
    this.eventEmitter.emit('user.activated', {
      email: user.email,
      name: user.username,
    });
    return { activated: true };
  }

  async forgotPassword(credential: string): Promise<{ forgot: boolean }> {
    const user: IUser | null = await this.userRepository.findOne({
      where: {
        email: credential,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    await this.userRepository.update(user, {
      accessToken: crypto.randomUUID(),
    });
    await this.userRepository.save(user);
    this.eventEmitter.emit('user.forgot-password', {
      email: user.email,
      name: user.username,
      token: user.accessToken,
    });
    return { forgot: true };
  }

  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ reset: boolean }> {
    const user = await this.userRepository.findOne({
      where: {
        accessToken: token,
      },
    });
    if (!user) {
      throw new BadRequestException('Invalid reset token');
    }
    await this.userRepository.update(user, {
      password: await hash(newPassword, await genSalt()),
    });
    await this.userRepository.save(user);
    this.eventEmitter.emit('user.reset-password', {
      email: user.email,
      name: user.username,
    });
    return { reset: true };
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    let payload: { sub: string };
    try {
      payload = this.jwtService.verify(refreshToken);
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const { password, ...userData } = user;
    return this.generateTokens({ sub: payload.sub, user: userData });
  }

  private async generateTokens(payload: { sub: string; user: IUser }): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const refreshPayload = { sub: payload.sub };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload),
      this.jwtService.sign(refreshPayload, {
        expiresIn: this.jwtConfig.refreshTokenTtl,
      }),
    ]);
    return { accessToken, refreshToken };
  }
}
