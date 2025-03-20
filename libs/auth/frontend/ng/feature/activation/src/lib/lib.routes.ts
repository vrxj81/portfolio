import { Route } from '@angular/router';

export const authFrontendNgFeatureActivationRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./activation/activation.component').then(
        (m) => m.AuthFeatureActivationComponent,
      ),
  },
];
