import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const dbConfig = registerAs('db', () => ({
  type: process.env['DB_TYPE'] as 'postgres' | 'sqlite', // TypeORM supports multiple database types
  host: process.env['DB_HOST'],
  port: parseInt(process.env['DB_PORT'] || '5432', 10),
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_DATABASE'],
  synchronize: process.env['DB_SYNCHRONIZE'] === 'true',
  logging: process.env['DB_LOGGING'] === 'true',
  namingStragegy: new SnakeNamingStrategy(),
}));

export type DbConfig = ConfigType<typeof dbConfig>;

export const InjectDbConfig = () => Inject(dbConfig.KEY);