import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'portfolio-auth-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioAuthUiResetPasswordComponent {
  private readonly fb = inject(FormBuilder);
  readonly isLoading = input.required<boolean>();
  readonly itSubmitted = output<string>();
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
    if (password && this.resetPasswordForm.valid) {
      this.itSubmitted.emit(password);
    }
  }
}
