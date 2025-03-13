import { InjectionToken } from '@angular/core';

export interface AuthConfig {
  loginRedirectUrl: string;
  logoutRedirectUrl: string;
}

export const AUTH_CONFIG = new InjectionToken<AuthConfig>('auth.config', {
  providedIn: 'root',
  factory: () => ({
    loginRedirectUrl: '/',
    logoutRedirectUrl: '/',
  }),
});
