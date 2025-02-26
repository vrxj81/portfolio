import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AuthResponseDto,
  LoginRequestDto,
  RegisterRequestDto,
} from '@portfolio/common-dtos';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = '/api/auth';

  login(data: LoginRequestDto) {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/login`, data);
  }

  register(data: RegisterRequestDto) {
    return this.http.post<AuthResponseDto | { registered: boolean }>(
      `${this.apiUrl}/register`,
      data,
    );
  }

  activate(userId: string, token: string) {
    return this.http.patch<{ activated: boolean }>(
      `${this.apiUrl}/activate/${userId}`,
      { token },
    );
  }

  forgotPassword(email: string) {
    return this.http.post<{ forgot: boolean }>(
      `${this.apiUrl}/forgot-password`,
      email,
    );
  }

  resetPassword(token: string, password: string) {
    return this.http.patch<{ reset: boolean }>(
      `${this.apiUrl}/reset-password/${token}`,
      { password },
    );
  }
}
