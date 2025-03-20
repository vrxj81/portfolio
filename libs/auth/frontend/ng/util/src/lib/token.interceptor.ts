import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { effect, inject } from '@angular/core';
import { AuthStore } from '@portfolio/auth-frontend-ng-state';
import { catchError, throwError } from 'rxjs';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  if (authStore.accessToken()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authStore.accessToken()}`,
      },
    });
  }
  return next(req).pipe(
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        localStorage.getItem('refreshToken')
      ) {
        authStore.refreshToken(localStorage.getItem('refreshToken') || '');
        effect(() => {
          if (authStore.isRegistered()) {
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${authStore.accessToken()}`,
              },
            });
            return next(req);
          }
          if (authStore.error()) {
            return throwError(() => authStore.error());
          }
          return throwError(() => error);
        });
        return next(req);
      }
      return throwError(() => error);
    }),
  );
};
