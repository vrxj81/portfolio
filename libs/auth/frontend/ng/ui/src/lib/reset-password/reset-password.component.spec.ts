import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PortfolioAuthUiResetPasswordComponent } from './reset-password.component';

describe('PortfolioAuthUiResetPasswordComponent', () => {
  let component: PortfolioAuthUiResetPasswordComponent;
  let fixture: ComponentFixture<PortfolioAuthUiResetPasswordComponent>;
  let password: string | undefined;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioAuthUiResetPasswordComponent);
    component = fixture.componentInstance;
    component.itSubmitted.subscribe((emitted) => {
      password = emitted;
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display password and confirm password fields', () => {
    const passwordInput = fixture.debugElement.query(By.css('#password'));
    const confirmPasswordInput = fixture.debugElement.query(
      By.css('#confirmPassword'),
    );

    expect(passwordInput).toBeTruthy();
    expect(confirmPasswordInput).toBeTruthy();
  });

  it('should display error message if password is touched and invalid', () => {
    const passwordInput = component.resetPasswordForm.get('password');
    passwordInput?.markAsTouched();
    passwordInput?.setValue('');
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('span'));
    expect(errorMessage.nativeElement.textContent).toContain(
      'Password is required.',
    );
  });

  it('should display error message if confirm password is touched and invalid', () => {
    const confirmPasswordInput =
      component.resetPasswordForm.get('confirmPassword');
    confirmPasswordInput?.markAsTouched();
    confirmPasswordInput?.setValue('');
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('span'));
    expect(errorMessage.nativeElement.textContent).toContain(
      'Confirm Password is required.',
    );
  });

  it('should display error message if passwords do not match', () => {
    component.resetPasswordForm.get('password')?.setValue('password');
    component.resetPasswordForm.get('confirmPassword')?.setValue('different');
    component.resetPasswordForm.get('confirmPassword')?.markAsTouched();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('span'));
    expect(errorMessage.nativeElement.textContent).toContain(
      'Passwords do not match.',
    );
  });

  it('should call resetPassword on form submit', () => {
    component.resetPasswordForm.get('password')?.setValue('password');
    component.resetPasswordForm.get('confirmPassword')?.setValue('password');
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(password).toBe('password');
  });

  it('should disable submit button if form is invalid', () => {
    component.resetPasswordForm.get('password')?.setValue('');
    component.resetPasswordForm.get('confirmPassword')?.setValue('');
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button'));
    expect(submitButton.nativeElement.disabled).toBeTruthy();
  });

  it('should disable submit button if isLoading is true', () => {
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button'));
    expect(submitButton.nativeElement.disabled).toBeTruthy();
  });
});
