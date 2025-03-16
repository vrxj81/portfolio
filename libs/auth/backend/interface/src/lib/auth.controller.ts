import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from '@portfolio/auth-backend-application';
import {
  AuthResponseDto,
  LoginRequestDto,
  RegisterRequestDto,
} from '@portfolio/common-dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerRequest: RegisterRequestDto,
  ): Promise<AuthResponseDto | { registered: boolean }> {
    return this.authService.register(registerRequest);
  }

  @Post('login')
  async login(@Body() loginRequest: LoginRequestDto): Promise<AuthResponseDto> {
    return this.authService.login(loginRequest);
  }

  @Patch('activate/:id')
  async activate(
    @Param('id') id: string,
    @Body() activateDto: { token: string },
  ): Promise<{ activated: boolean }> {
    return this.authService.activate(id, activateDto.token);
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotDto: { email: string },
  ): Promise<{ forgot: boolean }> {
    return this.authService.forgotPassword(forgotDto.email);
  }

  @Patch('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() resetDto: { password: string },
  ): Promise<{ reset: boolean }> {
    return this.authService.resetPassword(token, resetDto.password);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() refreshDto: { token: string },
  ): Promise<AuthResponseDto> {
    return this.authService.refreshToken(refreshDto.token);
  }
}
