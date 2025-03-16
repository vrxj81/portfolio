import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env['JWT_SECRET'] || 'secret',
  audience: process.env['JWT_AUDIENCE'],
  issuer: process.env['JWT_ISSUER'],
  accessTokenTtl: process.env['JWT_ACCESS_TOKEN_TTL'] || '5m',
  refreshTokenTtl: process.env['JWT_REFRESH_TOKEN_TTL'] || '7d',
}));

export type JwtConfig = ConfigType<typeof jwtConfig>;

export const InjectJwtConfig = () => Inject(jwtConfig.KEY);
