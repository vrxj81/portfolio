/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGuard } from './auth.guard';
import { provideHttpClient } from '@angular/common/http';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  const mockAuthStore = {
    ability: jest
      .fn()
      .mockReturnValue({ can: jest.fn().mockReturnValue(true) }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        { provide: AuthStore, useValue: mockAuthStore },
      ],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
  it('should return true if no auth data is provided', () => {
    const route = { data: {} } as any;
    const state = {} as any;

    expect(executeGuard(route, state)).toBe(true);
  });
  it('should return true if the user has the ability', () => {
    const route = {
      data: { auth: { action: 'read', subject: 'Post', field: 'title' } },
    } as any;
    const state = {} as any;

    expect(executeGuard(route, state)).toBe(true);
  });
  it('should return false if the user does not have the ability', () => {
    mockAuthStore.ability.mockReturnValue({
      can: jest.fn().mockReturnValue(false),
    });
    const route = {
      data: { auth: { action: 'read', subject: 'Post', field: 'title' } },
    } as any;
    const state = {} as any;

    expect(executeGuard(route, state)).toBe(false);
  });
  it('should return a url tree if the user is not logged in (ability is null)', () => {
    mockAuthStore.ability.mockReturnValue(null);
    const route = {
      data: { auth: { action: 'read', subject: 'Post', field: 'title' } },
    } as any;
    const state = { url: '/test' } as any;

    const result = executeGuard(route, state);

    expect(result.toString()).toBe('/auth/login?redirect=%2Ftest');
  });
});
