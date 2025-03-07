import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'portfolio-auth-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioAuthUiResetPasswordComponent {
  private readonly authStore = inject(AuthStore);
  private readonly fb = inject(FormBuilder);
  readonly isActivated = this.authStore.isActivated;
  readonly isLoading = this.authStore.isLoading;
  readonly error = this.authStore.error;
  readonly token = input.required<string>();
  readonly resetPasswordForm = this.fb.group(
    {
      password: this.fb.control('', [Validators.required]),
      confirmPassword: this.fb.control('', [Validators.required]),
    },
    {
      validators: [
        (group) => {
          const password = group.get('password')?.value;
          const confirmPassword = group.get('confirmPassword')?.value;
          return password === confirmPassword
            ? null
            : { passwordMismatch: true };
        },
      ],
    },
  );

  onSubmit() {
    const password = this.resetPasswordForm.get('password')?.value;
    if (password) {
      this.authStore.resetPassword({ token: this.token(), password });
    }
  }
}
