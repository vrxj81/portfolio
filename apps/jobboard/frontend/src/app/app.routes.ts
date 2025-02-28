import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        loadComponent: () =>
          import('@portfolio/auth-frontend-ng-ui').then(
            (m) => m.PortfolioAuthUiRegisterFormComponent,
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
    ],
  },
];
