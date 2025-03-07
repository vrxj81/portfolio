import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PortfolioAuthUiRegisterFormComponent } from './register-form.component';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

describe('PortfolioAuthUiRegisterFormComponent', () => {
  let component: PortfolioAuthUiRegisterFormComponent;
  let fixture: ComponentFixture<PortfolioAuthUiRegisterFormComponent>;

  const mockAuthStore = {
    register: jest.fn(),
    user: jest.fn().mockReturnValue(of(null)),
    isLoading: jest.fn().mockReturnValue(of(false)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [{ provide: AuthStore, useValue: mockAuthStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioAuthUiRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with 4 controls', () => {
    expect(component.registerForm.contains('username')).toBeTruthy();
    expect(component.registerForm.contains('email')).toBeTruthy();
    expect(component.registerForm.contains('password')).toBeTruthy();
    expect(component.registerForm.contains('confirmPassword')).toBeTruthy();
  });

  it('should make the username control required', () => {
    const control = component.registerForm.get('username');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the email control required and validate email format', () => {
    const control = component.registerForm.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();

    control?.setValue('invalid-email');
    expect(control?.valid).toBeFalsy();

    control?.setValue('test@example.com');
    expect(control?.valid).toBeTruthy();
  });

  it('should make the password control required', () => {
    const control = component.registerForm.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the confirmPassword control required', () => {
    const control = component.registerForm.get('confirmPassword');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should validate that password and confirmPassword match', () => {
    const passwordControl = component.registerForm.get('password');
    const confirmPasswordControl =
      component.registerForm.get('confirmPassword');

    passwordControl?.setValue('password');
    confirmPasswordControl?.setValue('differentPassword');
    expect(component.registerForm.errors?.['passwordMismatch']).toBeTruthy();

    confirmPasswordControl?.setValue('password');
    expect(component.registerForm.errors?.['passwordMismatch']).toBeFalsy();
  });

  it('should not call authStore.register when form is invalid and submitted', () => {
    component.registerForm.setValue({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
    });
    component.onSubmit();

    expect(mockAuthStore.register).not.toHaveBeenCalled();
  });

  it('should call authStore.register when form is valid and submitted', () => {
    const registerRequest = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
      confirmPassword: 'password',
      role: 'user',
    };

    component.registerForm.setValue(registerRequest);
    component.onSubmit();

    expect(mockAuthStore.register).toHaveBeenCalledWith(registerRequest);
  });

  it('should disable the submit button when form is invalid or loading', () => {
    const submitButton: DebugElement = fixture.debugElement.query(
      By.css('button[type="submit"]'),
    );

    // Form is invalid
    component.registerForm.setValue({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
    });
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeTruthy();

    // Form is valid but loading
    component.registerForm.setValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
      confirmPassword: 'password',
      role: 'user',
    });
    mockAuthStore.isLoading.mockReturnValue(of(true));
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
    expect(submitButton.nativeElement.disabled).toBeTruthy();
  });
});
