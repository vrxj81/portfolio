import { Inject } from '@nestjs/common';
import { registerAs, ConfigType } from '@nestjs/config';

export const mailConfig = registerAs('mail', () => ({
  host: process.env['MAIL_HOST'],
  port: parseInt(process.env['MAIL_PORT'] || '465', 10),
  secure: process.env['MAIL_SECURE'] === 'true',
  user: process.env['MAIL_USER'],
  pass: process.env['MAIL_PASS'],
  default: process.env['MAIL_DEFAULT'],
  ignoreTls: process.env['MAIL_IGNORE_TLS'] === 'true',
  rejectUnauthorized: process.env['MAIL_REJECT_UNAUTHORIZED'] === 'true',
}));

export type MailConfig = ConfigType<typeof mailConfig>;

export const InjectMailConfig = () => Inject(mailConfig.KEY);
