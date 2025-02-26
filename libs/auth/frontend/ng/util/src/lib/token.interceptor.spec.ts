/* eslint-disable @typescript-eslint/no-explicit-any */
import { TokenInterceptor } from './token.interceptor';
import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';
import { of } from 'rxjs';

describe('TokenInterceptor', () => {
  const mockAuthStore = {
    accessToken: jest.fn().mockReturnValue('token'),
  };

  const req = new HttpRequest('GET', '/test');
  const next: HttpHandlerFn = jest
    .fn()
    .mockReturnValue(of({} as HttpEvent<any>));
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthStore, useValue: mockAuthStore }],
    });
  });

  it('should add an Authorization header if accessToken is present', () => {
    const result = TestBed.runInInjectionContext(() =>
      TokenInterceptor(req, next),
    );

    result.subscribe(() => {
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer token`,
          }),
        }),
      );
    });
  });

  it('should not add an Authorization header if accessToken is not present', () => {
    mockAuthStore.accessToken.mockReturnValue(null);

    const result = TestBed.runInInjectionContext(() =>
      TokenInterceptor(req, next),
    );

    result.subscribe(() => {
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.not.objectContaining({
            Authorization: expect.any(String),
          }),
        }),
      );
    });
  });
});
