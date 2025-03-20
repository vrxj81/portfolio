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
  private readonly fb = inject(FormBuilder);
  readonly isLoading = input.required<boolean>();
  readonly itSubmitted = output<LoginRequestDto>();
  readonly loginForm = this.fb.group<LoginForm>({
    email: this.fb.control(null, [Validators.required, Validators.email]),
    password: this.fb.control(null, [Validators.required]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequestDto = Object.assign(this.loginForm.value);
      this.itSubmitted.emit(loginRequest);
    }
  }
}
