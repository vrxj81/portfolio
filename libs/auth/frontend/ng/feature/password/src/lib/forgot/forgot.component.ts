import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';
import { PortfolioAuthUiForgotPasswordComponent } from '@portfolio/auth-frontend-ng-ui';

@Component({
  selector: 'portfolio-auth-feature-password-forgot',
  imports: [PortfolioAuthUiForgotPasswordComponent],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFeaturePasswordForgotComponent {
  private readonly authStore = inject(AuthStore);
  readonly isForgot = this.authStore.isForgot;
  readonly isLoading = this.authStore.isLoading;
  readonly error = this.authStore.error;

  onSubmit(email: string) {
    this.authStore.forgotPassword(email);
  }
}
