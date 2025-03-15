import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { authConfig, jwtConfig } from '@portfolio/auth-backend-config';
import {
  DbConfig,
  dbConfig,
  MailConfig,
  mailConfig,
} from '@portfolio/backend-config';
import { AuthBackendInterfaceModule } from '@portfolio/auth-backend-interface';
import { User } from '@portfolio/backend-data-access-users';
import { Role } from '@portfolio/backend-data-access-roles';
import { Permission } from '@portfolio/backend-data-access-permissions';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AuthBackendMailerModule } from '@portfolio/auth-backend-mailer';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, authConfig, dbConfig, mailConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [dbConfig.KEY],
      useFactory: (dbConfig: DbConfig) => ({
        type: dbConfig.type,
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.database,
        synchronize: dbConfig.synchronize,
        logging: dbConfig.logging,
        autoLoadEntities: true,
        namingStrategy: dbConfig.namingStragegy,
        entities: [User, Role, Permission],
      }),
    }),
    MailerModule.forRootAsync({
      inject: [mailConfig.KEY],
      useFactory: (mailConfig: MailConfig) => ({
        transport: {
          host: mailConfig.host,
          port: mailConfig.port,
          secure: mailConfig.secure,
          auth: {
            user: mailConfig.user,
            pass: mailConfig.pass,
          },
          ignoreTLS: mailConfig.ignoreTls,
          tls: {
            rejectUnauthorized: mailConfig.rejectUnauthorized,
          },
        },
        defaults: {
          from: mailConfig.default,
          to: mailConfig.default,
        },
        template: {
          dir: join(__dirname, 'assets', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        }
      }),
    }),
    EventEmitterModule.forRoot(),
    AuthBackendInterfaceModule,
    AuthBackendMailerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
