import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';

@Component({
  selector: 'portfolio-auth-feature-activation',
  imports: [RouterLink],
  templateUrl: './activation.component.html',
  styleUrl: './activation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFeatureActivationComponent {
  private readonly authStore = inject(AuthStore);
  private readonly fb = inject(FormBuilder);
  readonly isActivated = this.authStore.isActivated;
  readonly isLoading = this.authStore.isLoading;
  readonly error = this.authStore.error;
  readonly id = input.required<string>();
  readonly token = input.required<string>();

  constructor() {
    effect(() => {
      if (this.id() && this.token()) {
        this.authStore.activate({ userId: this.id(), token: this.token() });
      }
    });
  }
}
