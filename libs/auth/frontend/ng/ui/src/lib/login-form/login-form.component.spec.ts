import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PortfolioAuthUiLoginFormComponent } from './login-form.component';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

describe('PortfolioAuthUiLoginFormComponent', () => {
  let component: PortfolioAuthUiLoginFormComponent;
  let fixture: ComponentFixture<PortfolioAuthUiLoginFormComponent>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let authStore: any;

  const mockAuthStore = {
    login: jest.fn(),
    user: jest.fn().mockReturnValue(of(null)),
    isLoading: jest.fn().mockReturnValue(of(false)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [{ provide: AuthStore, useValue: mockAuthStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioAuthUiLoginFormComponent);
    component = fixture.componentInstance;
    authStore = TestBed.inject(AuthStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with 2 controls', () => {
    expect(component.loginForm.contains('email')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('should make the email control required and validate email format', () => {
    const control = component.loginForm.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();

    control?.setValue('invalid-email');
    expect(control?.valid).toBeFalsy();

    control?.setValue('test@example.com');
    expect(control?.valid).toBeTruthy();
  });

  it('should make the password control required', () => {
    const control = component.loginForm.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should not call authStore.login when form is invalid and submitted', () => {
    component.loginForm.setValue({
      email: '',
      password: '',
    });
    component.onSubmit();

    expect(authStore.login).not.toHaveBeenCalled();
  });

  it('should call authStore.login when form is valid and submitted', () => {
    const loginRequest = {
      email: 'test@example.com',
      password: 'password',
    };

    component.loginForm.setValue(loginRequest);
    component.onSubmit();

    expect(authStore.login).toHaveBeenCalledWith(loginRequest);
  });

  it('should disable the submit button when form is invalid or loading', () => {
    const submitButton: DebugElement = fixture.debugElement.query(
      By.css('button[type="submit"]'),
    );

    // Form is invalid
    component.loginForm.setValue({
      email: '',
      password: '',
    });
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeTruthy();

    // Form is valid but loading
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password',
    });
    mockAuthStore.isLoading.mockReturnValue(of(true));
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
    expect(submitButton.nativeElement.disabled).toBeTruthy();
  });
});
