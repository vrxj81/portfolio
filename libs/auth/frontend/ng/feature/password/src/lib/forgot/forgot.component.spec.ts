import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFeaturePasswordForgotComponent } from './forgot.component';
import { signal } from '@angular/core';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';

describe('AuthFeaturePasswordForgotComponent', () => {
  let component: AuthFeaturePasswordForgotComponent;
  let fixture: ComponentFixture<AuthFeaturePasswordForgotComponent>;

  const mockAuthStore = {
    isForgot: signal(false),
    isLoading: signal(false),
    error: signal<string | null>(null),
    forgotPassword: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFeaturePasswordForgotComponent],
      providers: [{ provide: AuthStore, useValue: mockAuthStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFeaturePasswordForgotComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call forgotPassword on submit', () => {
    component.onSubmit('test@example.com');
    expect(mockAuthStore.forgotPassword).toHaveBeenCalledWith(
      'test@example.com',
    );
  });
  it('should display a message when isForgot is true', async () => {
    mockAuthStore.isForgot.set(true);
    await fixture.whenStable();
    const messageElement: HTMLElement = fixture.nativeElement;
    const p = messageElement.querySelector('p');
    expect(p).toBeTruthy();
    expect(p?.textContent).toContain(
      'A password reset mail has been sent if an account with this email exists and is active.',
    );
  });
  it('should display an error message when error is set', () => {
    mockAuthStore.error.set('test error');
    expect(component.error()).toBe('test error');
  });
  it('should disply loading', () => {
    expect(component.isLoading()).toBe(false);
    mockAuthStore.isLoading.set(true);
    expect(component.isLoading()).toBe(true);
  });
});
