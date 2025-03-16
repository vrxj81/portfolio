import { Injectable } from '@nestjs/common';
import {
  AuthResponseDto,
  LoginRequestDto,
  RegisterRequestDto,
} from '@portfolio/common-dtos';

@Injectable()
export abstract class AuthService {
  abstract register(
    registerRequest: RegisterRequestDto,
  ): Promise<AuthResponseDto | { registered: boolean }>;
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
  abstract refreshToken(token: string): Promise<AuthResponseDto>;
}
