import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterRequestDto } from '@portfolio/common-dtos';

type RegisterForm = {
  [field in keyof RegisterRequestDto]: FormControl<
    RegisterRequestDto[field] | null
  >;
};

@Component({
  selector: 'portfolio-auth-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioAuthUiRegisterFormComponent {
  private readonly fb = inject(FormBuilder);
  readonly isLoading = input.required<boolean>();
  readonly itSubmitted = output<RegisterRequestDto>();
  readonly registerForm = this.fb.group<RegisterForm>(
    {
      username: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [Validators.required]),
      confirmPassword: this.fb.control(null, [Validators.required]),
      role: this.fb.control(null),
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
    if (this.registerForm.valid) {
      const registerRequest: RegisterRequestDto = Object.assign(
        this.registerForm.value,
      );
      this.itSubmitted.emit(registerRequest);
    }
  }
}
