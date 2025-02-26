import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const authData = route.data['auth'];

  if (authData) {
    if (authStore.ability()) {
      const { action, subject, field } = authData;
      return authStore.ability()?.can(action, subject, field) ?? false;
    }
    const router = inject(Router);
    return router.createUrlTree(['/auth/login'], {
      queryParams: { redirect: state.url },
    });
  }
  return true;
};
