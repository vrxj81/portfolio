import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';
import { PortfolioAuthUiResetPasswordComponent } from '@portfolio/auth-frontend-ng-ui';

@Component({
  selector: 'portfolio-auth-feature-password-reset',
  imports: [PortfolioAuthUiResetPasswordComponent, RouterLink],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFeaturePasswordResetComponent {
  private readonly authStore = inject(AuthStore);
  readonly isReset = this.authStore.isReset;
  readonly isLoading = this.authStore.isLoading;
  readonly error = this.authStore.error;
  readonly token = input.required<string>();

  onSubmit(password: string) {
    if (this.token())
      this.authStore.resetPassword({ token: this.token(), password });
  }
}
