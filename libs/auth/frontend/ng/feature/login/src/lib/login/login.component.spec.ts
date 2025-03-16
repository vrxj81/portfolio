import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFeatureLoginComponent } from './login.component';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';
import { signal } from '@angular/core';

describe('AuthFeatureLoginComponent', () => {
  let component: AuthFeatureLoginComponent;
  let fixture: ComponentFixture<AuthFeatureLoginComponent>;

  const mockAuthStore = {
    isLoading: signal(false),
    error: signal<string | null>(null),
    login: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFeatureLoginComponent],
      providers: [{ provide: AuthStore, useValue: mockAuthStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFeatureLoginComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call login on onSubmit', () => {
    const loginRequestDto = {
      email: 'test@example.com',
      password: 'password',
    };
    component.onSubmit(loginRequestDto);
    expect(mockAuthStore.login).toHaveBeenCalledWith(loginRequestDto);
  });
  it('should display error', () => {
    mockAuthStore.error.set('error');
    expect(component.error()).toBe('error');
  });
  it('should display loading', () => {
    expect(component.isLoading()).toBe(false);
    mockAuthStore.isLoading.set(true);
    expect(component.isLoading()).toBe(true);
  });
});
