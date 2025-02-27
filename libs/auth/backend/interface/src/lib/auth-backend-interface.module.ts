import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthBackendApplicationModule } from '@portfolio/auth-backend-application';

@Module({
  imports: [AuthBackendApplicationModule.register({ authStrategies: ['jwt'] })],
  controllers: [AuthController],
  providers: [],
  exports: [],
})
export class AuthBackendInterfaceModule {}
