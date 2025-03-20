import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';
import { PortfolioAuthUiLoginFormComponent } from '@portfolio/auth-frontend-ng-ui';
import { LoginRequestDto } from '@portfolio/common-dtos';

@Component({
  selector: 'portfolio-auth-feature-login',
  imports: [PortfolioAuthUiLoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFeatureLoginComponent {
  private readonly authStore = inject(AuthStore);
  readonly isLoading = this.authStore.isLoading;
  readonly error = this.authStore.error;

  onSubmit(loginRequestDto: LoginRequestDto) {
    this.authStore.login(loginRequestDto);
  }
}
