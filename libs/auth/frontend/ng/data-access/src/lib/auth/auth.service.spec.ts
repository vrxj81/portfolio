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
  });
});
