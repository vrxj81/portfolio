import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

export const authConfig = registerAs('auth', () => ({
  defaultRole: process.env['DEFAULT_ROLE'],
  activationRequired: process.env['ACTIVATION_REQUIRED'] === 'true',
}));

export type AuthConfig = ConfigType<typeof authConfig>;

export const InjectAuthConfig = () => Inject(authConfig.KEY);
