import { Route } from '@angular/router';

export const authFrontendNgFeatureLoginRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./login/login.component').then(
        (c) => c.AuthFeatureLoginComponent,
      ),
  },
];
