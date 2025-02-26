import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  if (authStore.accessToken()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authStore.accessToken()}`,
      },
    });
  }
  return next(req);
};
