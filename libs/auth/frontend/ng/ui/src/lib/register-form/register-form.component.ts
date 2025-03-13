import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';
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
  private readonly authStore = inject(AuthStore);
  private readonly fb = inject(FormBuilder);
  readonly authUser = this.authStore.user;
  readonly isLoading = this.authStore.isLoading;
  readonly error = this.authStore.error;
  readonly role = input<string>();
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

  constructor() {
    effect(() => {
      this.registerForm.get('role')?.patchValue(this.role());
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registerRequest = Object.assign(this.registerForm.value);
      this.authStore.register(registerRequest);
    }
  }
}
