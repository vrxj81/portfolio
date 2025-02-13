import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';
import { LoginRequestDto } from '@portfolio/common-dtos';

type LoginForm = {
  [field in keyof LoginRequestDto]: FormControl<LoginRequestDto[field] | null>;
};

@Component({
  selector: 'portfolio-auth-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioAuthUiLoginFormComponent {
  private readonly authStore = inject(AuthStore);
  private readonly fb = inject(FormBuilder);
  readonly authUser = this.authStore.user;
  readonly isLoading = this.authStore.isLoading;
  readonly loginForm = this.fb.group<LoginForm>({
    email: this.fb.control(null, [Validators.required, Validators.email]),
    password: this.fb.control(null, [Validators.required]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const loginRequest = Object.assign(this.loginForm.value);
      this.authStore.login(loginRequest);
    }
  }
}
