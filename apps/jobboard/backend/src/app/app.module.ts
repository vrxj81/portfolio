import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { authConfig, jwtConfig } from '@portfolio/auth-backend-config';
import { DbConfig, dbConfig } from '@portfolio/backend-config';
import { AuthBackendInterfaceModule } from '@portfolio/auth-backend-interface';
import { User } from '@portfolio/backend-data-access-users';
import { Role } from '@portfolio/backend-data-access-roles';
import { Permission } from '@portfolio/backend-data-access-permissions';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, authConfig, dbConfig],
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
    AuthBackendInterfaceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
