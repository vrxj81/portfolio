import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbConfig = registerAs('db', (): TypeOrmModuleOptions => ({
  type: process.env['DB_TYPE'] as 'postgres' | 'sqlite', // TypeORM supports multiple database types
  host: process.env['DB_HOST'],
  port: parseInt(process.env['DB_PORT'], 10),
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_DATABASE'],
  synchronize: process.env['DB_SYNCHRONIZE'] === 'true',
  logging: process.env['DB_LOGGING'] === 'true',
}));