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
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/register`, data);
  }
}
