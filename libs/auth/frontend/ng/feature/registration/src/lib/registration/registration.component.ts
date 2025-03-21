import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';
import { PortfolioAuthUiRegisterFormComponent } from '@portfolio/auth-frontend-ng-ui';
import { RegisterRequestDto } from '@portfolio/common-dtos';

@Component({
  selector: 'portfolio-auth-feature-registration',
  imports: [PortfolioAuthUiRegisterFormComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFeatureRegistrationComponent {
  private readonly authStore = inject(AuthStore);
  readonly isRegistered = this.authStore.isRegistered;
  readonly isLoading = this.authStore.isLoading;
  readonly error = this.authStore.error;
  readonly role = input<string>();

  onSubmit(registerRequestDto: RegisterRequestDto) {
    this.authStore.register({ ...registerRequestDto, role: this.role() });
  }
}
