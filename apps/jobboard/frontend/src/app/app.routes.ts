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
        path: 'forgot-password',
        loadComponent: () =>
          import('@portfolio/auth-frontend-ng-ui').then(
            (m) => m.PortfolioAuthUiForgotPasswordComponent,
          ),
      },
      {
        path: 'reset-password/:token',
        loadComponent: () =>
          import('@portfolio/auth-frontend-ng-ui').then(
            (m) => m.PortfolioAuthUiResetPasswordComponent,
          ),
      },
    ],
  },
];
