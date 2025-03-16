import { Route } from '@angular/router';

export const authFrontendNgFeaturePasswordRoutes: Route[] = [
  {
    path: 'forgot',
    loadComponent: () =>
      import('./forgot/forgot.component').then(
        (c) => c.AuthFeaturePasswordForgotComponent,
      ),
  },
  {
    path: 'reset/:token',
    loadComponent: () =>
      import('./reset/reset.component').then(
        (c) => c.AuthFeaturePasswordResetComponent,
      ),
  },
];
