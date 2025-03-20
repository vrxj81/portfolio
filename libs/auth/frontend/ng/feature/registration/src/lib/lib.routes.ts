import { Route } from '@angular/router';

export const authFrontendNgFeatureRegistrationRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./registration/registration.component').then(
        (c) => c.AuthFeatureRegistrationComponent,
      ),
  },
];
