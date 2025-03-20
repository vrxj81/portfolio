import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { userFactory } from '@portfolio/testing-data-mocks-util';
import { provideHttpClient } from '@angular/common/http';
import { LoginRequestDto, RegisterRequestDto } from '@portfolio/common-dtos';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  const expectedUser = userFactory();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('login', () => {
    it('should return an Observable<AuthResponseDto>', () => {
      const loginRequest: LoginRequestDto = {
        email: expectedUser.username,
        password: expectedUser.password || '',
      };
      service.login(loginRequest).subscribe((response) => {
        expect(response).toEqual(expectedUser.accessToken);
      });
      const req = httpController.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(expectedUser);
    });
    it('should throw an error if the request fails', () => {
      const loginRequest: LoginRequestDto = {
        email: expectedUser.username,
        password: expectedUser.password || '',
      };
      service.login(loginRequest).subscribe({
        error: (error) => {
          expect(error).toEqual('An error occurred');
        },
      });
      const req = httpController.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.error(new ProgressEvent('error'));
    });
  });
  describe('register', () => {
    it('should return an Observable<AuthResponseDto>', () => {
      const registerRequest: RegisterRequestDto = {
        username: expectedUser.username,
        email: expectedUser.email,
        password: expectedUser.password || '',
        confirmPassword: expectedUser.password || '',
      };
      service.register(registerRequest).subscribe((response) => {
        expect(response).toEqual(expectedUser.accessToken);
      });
      const req = httpController.expectOne('/api/auth/register');
      expect(req.request.method).toBe('POST');
      req.flush(expectedUser);
    });
    it('should throw an error if the request fails', () => {
      const registerRequest: RegisterRequestDto = {
        username: expectedUser.username,
        email: expectedUser.email,
        password: expectedUser.password || '',
        confirmPassword: expectedUser.password || '',
      };
      service.register(registerRequest).subscribe({
        error: (error) => {
          expect(error).toEqual('An error occurred');
        },
      });
      const req = httpController.expectOne('/api/auth/register');
      expect(req.request.method).toBe('POST');
      req.error(new ProgressEvent('An error occurred'));
    });
  });
  describe('activate', () => {
    it('should return an Observable<{ activated: boolean }>', () => {
      const userId = expectedUser.id;
      const token = 'token';
      service.activate(userId, token).subscribe((response) => {
        expect(response).toEqual({ activated: true });
      });
      const req = httpController.expectOne(`/api/auth/activate/${userId}`);
      expect(req.request.method).toBe('PATCH');
      req.flush({ activated: true });
    });
    it('should throw an error if the request fails', () => {
      const userId = expectedUser.id;
      const token = 'token';
      service.activate(userId, token).subscribe({
        error: (error) => {
          expect(error).toEqual('An error occurred');
        },
      });
      const req = httpController.expectOne(`/api/auth/activate/${userId}`);
      expect(req.request.method).toBe('PATCH');
      req.error(new ProgressEvent('An error occurred'));
    });
  });
  describe('forgotPassword', () => {
    it('should return an Observable<{ forgot: boolean }>', () => {
      const email = expectedUser.email;
      service.forgotPassword(email).subscribe((response) => {
        expect(response).toEqual({ forgot: true });
      });
      const req = httpController.expectOne('/api/auth/forgot-password');
      expect(req.request.method).toBe('POST');
      req.flush({ forgot: true });
    });
    it('should throw an error if the request fails', () => {
      const email = expectedUser.email;
      service.forgotPassword(email).subscribe({
        error: (error) => {
          expect(error).toEqual('An error occurred');
        },
      });
      const req = httpController.expectOne('/api/auth/forgot-password');
      expect(req.request.method).toBe('POST');
      req.error(new ProgressEvent('An error occurred'));
    });
  });
  describe('resetPassword', () => {
    it('should return an Observable<{ reset: boolean }>', () => {
      const token = 'token';
      const password = 'password';
      service.resetPassword(token, password).subscribe((response) => {
        expect(response).toEqual({ reset: true });
      });
      const req = httpController.expectOne(`/api/auth/reset-password/${token}`);
      expect(req.request.method).toBe('PATCH');
      req.flush({ reset: true });
    });
    it('should throw an error if the request fails', () => {
      const token = 'token';
      const password = 'password';
      service.resetPassword(token, password).subscribe({
        error: (error) => {
          expect(error).toEqual('An error occurred');
        },
      });
      const req = httpController.expectOne(`/api/auth/reset-password/${token}`);
      expect(req.request.method).toBe('PATCH');
      req.error(new ProgressEvent('An error occurred'));
    });
  });
  describe('refreshToken', () => {
    it('should return an Observable<AuthResponseDto>', () => {
      const token = 'token';
      service.refreshToken(token).subscribe((response) => {
        expect(response).toEqual(expectedUser);
      });
      const req = httpController.expectOne('/api/auth/refresh-token');
      expect(req.request.method).toBe('POST');
      req.flush(expectedUser);
    });
    it('should throw an error if the request fails', () => {
      const token = 'token';
      service.refreshToken(token).subscribe({
        error: (error) => {
          expect(error).toEqual('An error occurred');
        },
      });
      const req = httpController.expectOne('/api/auth/refresh-token');
      expect(req.request.method).toBe('POST');
      req.error(new ProgressEvent('An error occurred'));
    });
  });
});
