import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PortfolioAuthUiForgotPasswordComponent } from './forgot-password.component';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';
import { of } from 'rxjs';

describe('PortfolioAuthUiForgotPasswordComponent', () => {
  let component: PortfolioAuthUiForgotPasswordComponent;
  let fixture: ComponentFixture<PortfolioAuthUiForgotPasswordComponent>;
  const mockAuthStore = {
    isForgot: of(false),
    isLoading: of(false),
    error: of(null),
    forgotPassword: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [{ provide: AuthStore, useValue: mockAuthStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioAuthUiForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with email control', () => {
    const emailControl = component.forgotPasswordForm.get('email');
    expect(emailControl).toBeTruthy();
    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['required']).toBeTruthy();
  });

  it('should display email validation errors', () => {
    const emailInput = fixture.debugElement.query(By.css('input#email'));
    emailInput.nativeElement.value = '';
    emailInput.nativeElement.dispatchEvent(new Event('input'));
    emailInput.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorMessages = fixture.debugElement.queryAll(By.css('span'));
    expect(errorMessages.length).toBe(1);
    expect(errorMessages[0].nativeElement.textContent).toContain(
      'Email is required.',
    );
  });

  it('should call forgotPassword on form submit', () => {
    const emailInput = component.forgotPasswordForm.get('email');
    emailInput?.setValue('test@example.com');
    emailInput?.markAllAsTouched();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(mockAuthStore.forgotPassword).toHaveBeenCalledWith(
      'test@example.com',
    );
  });

  it('should disable submit button when form is invalid', () => {
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]'),
    );
    expect(submitButton.nativeElement.disabled).toBeTruthy();
  });
});
