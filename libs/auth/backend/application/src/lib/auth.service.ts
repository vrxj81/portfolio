import { Injectable } from '@nestjs/common';
import {
  AuthResponseDto,
  LoginRequestDto,
  RegisterRequestDto,
} from '@portfolio/common-dtos';
import { IUser } from '@portfolio/common-models';

@Injectable()
export abstract class AuthService {
  abstract register(registerRequest: RegisterRequestDto): Promise<IUser>;
  abstract login(loginRequest: LoginRequestDto): Promise<AuthResponseDto>;
  abstract activate(
    userId: string,
    token: string,
  ): Promise<{ activated: boolean }>;
  abstract forgotPassword(credential: string): Promise<{ forgot: boolean }>;
  abstract resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ reset: boolean }>;
}
