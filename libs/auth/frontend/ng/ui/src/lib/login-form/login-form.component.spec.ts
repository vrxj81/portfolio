import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PortfolioAuthUiLoginFormComponent } from './login-form.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { LoginRequestDto } from '@portfolio/common-dtos';

describe('PortfolioAuthUiLoginFormComponent', () => {
  let component: PortfolioAuthUiLoginFormComponent;
  let fixture: ComponentFixture<PortfolioAuthUiLoginFormComponent>;
  let loginRequestDto: LoginRequestDto | undefined;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioAuthUiLoginFormComponent);
    component = fixture.componentInstance;
    component.itSubmitted.subscribe((emitted) => {  loginRequestDto = emitted; });
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

    expect(loginRequestDto).toBeUndefined();
  });

  it('should call authStore.login when form is valid and submitted', () => {
    const loginRequest = {
      email: 'test@example.com',
      password: 'password',
    };

    component.loginForm.setValue(loginRequest);
    component.onSubmit();

    expect(loginRequestDto).toEqual(loginRequest);
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
    
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
    expect(submitButton.nativeElement.disabled).toBeTruthy();
  });
});
