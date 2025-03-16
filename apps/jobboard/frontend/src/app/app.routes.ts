import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        loadChildren: () =>
          import('@portfolio/auth-frontend-ng-feature-registration').then(
            (m) => m.authFrontendNgFeatureRegistrationRoutes,
          ),
        data: {
          role: 'recruiter',
        },
      },
      {
        path: 'login',
        loadChildren: () =>
          import('@portfolio/auth-frontend-ng-feature-login').then(
            (m) => m.authFrontendNgFeatureLoginRoutes,
          ),
      },
      {
        path: 'activate/:id/:token',
        loadChildren: () =>
          import('@portfolio/auth-frontend-ng-feature-activation').then(
            (m) => m.authFrontendNgFeatureActivationRoutes,
          ),
      },
      {
        path: 'password',
        loadChildren: () =>
          import('@portfolio/auth-frontend-ng-feature-password').then(
            (m) => m.authFrontendNgFeaturePasswordRoutes,
          ),
      },
    ],
  },
];
