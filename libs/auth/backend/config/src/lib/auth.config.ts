import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

export const authConfig = registerAs('auth', () => ({
  defaultRole: process.env['AUTH_DEFAULT_ROLE'] || 'user',
  activationRequired: process.env['AUTH_ACTIVATION_REQUIRED'] === 'true',
  authStrategies: (process.env['AUTH_STRATEGIES'] || 'jwt').split(','),
}));

export type AuthConfig = ConfigType<typeof authConfig>;

export const InjectAuthConfig = () => Inject(authConfig.KEY);
