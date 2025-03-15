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
import { AuthBackendMailerModule } from '@portfolio/auth-backend-mailer';

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
    EventEmitterModule.forRoot(),
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
        },
        defaults: {
          from: mailConfig.default,
          to: mailConfig.default,
        },
        ignoreTLS: mailConfig.ignoreTls,
        rejectUnauthorized: mailConfig.rejectUnauthorized,
      }),
    }),
    AuthBackendInterfaceModule,
    AuthBackendMailerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
