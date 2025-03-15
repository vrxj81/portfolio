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
        loadComponent: () =>
          import('@portfolio/auth-frontend-ng-ui').then(
            (m) => m.PortfolioAuthUiLoginFormComponent,
          ),
      },
      {
        path: 'activate/:id/:token',
        loadComponent: () =>
          import('@portfolio/auth-frontend-ng-ui').then(
            (m) => m.PortfolioAuthUiActivateComponentComponent,
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
