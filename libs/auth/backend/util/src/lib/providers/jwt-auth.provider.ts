/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import {
  RegisterRequestDto,
  LoginRequestDto,
  AuthResponseDto,
} from '@portfolio/common-dtos';
import { IUser } from '@portfolio/common-models';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '@portfolio/data-access-backend-users';
import { EntityRepository } from '@mikro-orm/core';
import { compare, genSalt, hash } from 'bcrypt';
import { Role } from '@portfolio/data-access-backend-roles';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class JwtAuthProvider implements AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: EntityRepository<Role>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async register(registerRequest: RegisterRequestDto): Promise<IUser> {
    if (registerRequest.password !== registerRequest.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashedPassword = await hash(
      registerRequest.password,
      await genSalt(),
    );
    const role = await this.roleRepository.findOneOrFail({
      name: registerRequest.role || process.env['DEFAULT_ROLE'],
    });
    const newUser = this.userRepository.create(
      {
        ...registerRequest,
        password: hashedPassword,
        roles: [role],
      },
      { partial: true },
    );

    await this.userRepository.getEntityManager().persistAndFlush(newUser);

    const { password, ...user } = newUser;
    this.eventEmitter.emit('user.registered', user);
    return user;
  }

  async login(loginRequest: LoginRequestDto): Promise<AuthResponseDto> {
    const loginUser: IUser = await this.userRepository.findOneOrFail(
      {
        email: loginRequest.email,
      },
      { populate: ['roles', 'roles.permissions'] },
    );
    if (
      !loginUser ||
      !(await compare(loginRequest.password, loginUser.password || ''))
    ) {
      throw new BadRequestException('Invalid credentials');
    }
    const { password, ...user } = loginUser;
    const payload = { sub: user.id, user };
    const token = this.jwtService.sign(payload);
    this.userRepository.assign(user, { accessToken: token });
    this.userRepository.getEntityManager().persistAndFlush(user);
    this.eventEmitter.emit('user.logged-in', user);
    return { token };
  }

  async activate(
    userId: string,
    token: string,
  ): Promise<{ activated: boolean }> {
    const user: IUser = await this.userRepository.findOneOrFail({
      id: userId,
      accessToken: token,
    });
    if (!user) {
      throw new BadRequestException('Invalid activation token');
    }
    this.userRepository.assign(user, { isActive: true });
    await this.userRepository.getEntityManager().persistAndFlush(user);
    this.eventEmitter.emit('user.activated', user);
    return { activated: true };
  }

  async forgotPassword(credential: string): Promise<{ forgot: boolean }> {
    const user = await this.userRepository.findOneOrFail({
      email: credential,
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    this.userRepository.assign(user, { accessToken: crypto.randomUUID() });
    await this.userRepository.getEntityManager().persistAndFlush(user);
    this.eventEmitter.emit('user.forgot-password', user);
    return { forgot: true };
  }

  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ reset: boolean }> {
    const user = await this.userRepository.findOneOrFail({
      accessToken: token,
    });
    if (!user) {
      throw new Error('Invalid reset token');
    }
    this.userRepository.assign(user, {
      password: await hash(newPassword, await genSalt()),
    });
    await this.userRepository.getEntityManager().persistAndFlush(user);
    this.eventEmitter.emit('user.reset-password', user);
    return { reset: true };
  }
}
