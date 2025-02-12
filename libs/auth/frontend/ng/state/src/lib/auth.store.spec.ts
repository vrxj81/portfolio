import { TestBed } from '@angular/core/testing';
import { AuthStore } from './auth.store';
import { AuthService } from '@portfolio/auth-frontend-ng-data-access';
import { provideRouter } from '@angular/router';

describe('AuthStore', () => {
  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        provideRouter([]),
      ],
    });
  });
  it('should create an instance', () => {
    const store = TestBed.inject(AuthStore);
    expect(store).toBeTruthy();
  });
});

// TODO: Add more tests!
