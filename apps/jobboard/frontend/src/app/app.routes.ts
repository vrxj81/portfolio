import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        loadComponent: () => import('@portfolio/auth-frontend-ng-ui').then(m => m.PortfolioAuthUiRegisterFormComponent),
      },
      {
        path: 'login',
        loadComponent: () => import('@portfolio/auth-frontend-ng-ui').then(m => m.PortfolioAuthUiLoginFormComponent),
      },
    ],
  },
];
