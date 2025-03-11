import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AuthResponseDto,
  LoginRequestDto,
  RegisterRequestDto,
} from '@portfolio/common-dtos';
import { catchError, throwError } from 'rxjs';
import { handleHttpError } from '@portfolio/frontend-util-error-handler';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = '/api/auth';

  login(data: LoginRequestDto) {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/login`, data).pipe(
      catchError((error) => {
        return throwError(() => handleHttpError(error));
      }),
    );
  }

  register(data: RegisterRequestDto) {
    return this.http
      .post<
        AuthResponseDto | { registered: boolean }
      >(`${this.apiUrl}/register`, data)
      .pipe(
        catchError((error) => {
          return throwError(() => handleHttpError(error));
        }),
      );
  }

  activate(userId: string, token: string) {
    return this.http
      .patch<{
        activated: boolean;
      }>(`${this.apiUrl}/activate/${userId}`, { token })
      .pipe(
        catchError((error) => {
          return throwError(() => handleHttpError(error));
        }),
      );
  }

  forgotPassword(email: string) {
    return this.http
      .post<{ forgot: boolean }>(`${this.apiUrl}/forgot-password`, email)
      .pipe(
        catchError((error) => {
          return throwError(() => handleHttpError(error));
        }),
      );
  }

  resetPassword(token: string, password: string) {
    return this.http
      .patch<{
        reset: boolean;
      }>(`${this.apiUrl}/reset-password/${token}`, { password })
      .pipe(
        catchError((error) => {
          return throwError(() => handleHttpError(error));
        }),
      );
  }
}
