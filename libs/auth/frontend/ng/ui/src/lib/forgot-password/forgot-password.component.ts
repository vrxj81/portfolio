import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'portfolio-auth-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioAuthUiForgotPasswordComponent {
  private readonly fb = inject(FormBuilder);
  readonly isLoading = input.required<boolean>();
  readonly itSubmitted = output<string>();
  readonly forgotPasswordForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
  });

  onSubmit() {
    const email = this.forgotPasswordForm.get('email')?.value;
    if (email && this.forgotPasswordForm.valid) {
      this.itSubmitted.emit(email);
    }
  }
}
