import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';

@Component({
  selector: 'portfolio-auth-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioAuthUiForgotPasswordComponent {
  private readonly authStore = inject(AuthStore);
  private readonly fb = inject(FormBuilder);
  readonly isForgot = this.authStore.isForgot;
  readonly isLoading = this.authStore.isLoading;
  readonly error = this.authStore.error;
  readonly forgotPasswordForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
  });

  onSubmit() {
    const email = this.forgotPasswordForm.get('email')?.value;
    if (email) {
      this.authStore.forgotPassword(email);
    }
  }
}
