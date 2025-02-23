/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ClassProvider,
  ExistingProvider,
  FactoryProvider,
  Inject,
  Module,
  Type,
  ValueProvider,
} from '@nestjs/common';
import { JwtAuthProvider } from './providers/jwt-auth.provider';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { DataAccessBackendUsersModule } from '@portfolio/data-access-backend-users';
import { DataAccessBackendRolesModule } from '@portfolio/data-access-backend-roles';
import {
  AUTH_MODULE_OPTIONS,
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from './auth-backend-util.module.definition';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({})
export class AuthBackendUtilModule extends ConfigurableModuleClass {
  constructor(@Inject(AUTH_MODULE_OPTIONS) private options: string | symbol) {
    super();
  }

  static register(options: typeof OPTIONS_TYPE) {
    let imports = [
      PassportModule.register({ defaultStrategy: 'jwt' }),
      DataAccessBackendUsersModule,
      DataAccessBackendRolesModule,
    ];
    let providers: (
      | Type<any>
      | ClassProvider<any>
      | ValueProvider<any>
      | FactoryProvider<any>
      | ExistingProvider<any>
    )[] = [
      {
        provide: AUTH_MODULE_OPTIONS,
        useValue: options,
      },
    ];
    let exports: (
      | Type<any>
      | ClassProvider<any>
      | ValueProvider<any>
      | FactoryProvider<any>
      | ExistingProvider<any>
    )[] = [];
    switch (true) {
      case options.authStrategies.includes('jwt'):
        imports = [
          ...imports,
          JwtModule.register({
            secret: process.env['JWT_SECRET'],
            signOptions: {
              expiresIn: +(process.env['JWT_EXPIRES_IN'] || 3600),
            },
          }),
        ];
        providers = [...providers, JwtAuthProvider, JwtStrategy];
        exports = [
          ...exports,
          { provide: AuthService, useClass: JwtAuthProvider },
          JwtAuthProvider,
          JwtStrategy,
        ];
    }
    return {
      ...super.register(options),
      imports,
      providers,
      exports,
    };
  }
}
