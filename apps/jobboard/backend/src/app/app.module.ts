import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { authConfig, jwtConfig } from '@portfolio/auth-backend-config';
import { DbConfig, dbConfig } from '@portfolio/backend-config';
import { AuthBackendInterfaceModule } from '@portfolio/auth-backend-interface';
import { User } from '@portfolio/data-access-backend-users';
import { Role } from '@portfolio/data-access-backend-roles';
import { Permission } from '@portfolio/data-access-backend-permissions';

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
        namingStrategry: dbConfig.namingStragegy,
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
