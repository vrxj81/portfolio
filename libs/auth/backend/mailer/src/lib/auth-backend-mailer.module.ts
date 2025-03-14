import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';
import { UserRegisteredHandler } from './event-handlers/user-registered.handler';
import { UserActivatedHandler } from './event-handlers/user-activated.handler';
import { UserForgotPasswordHandler } from './event-handlers/user-forgot-password.handler';
import { UserResetPasswordHandler } from './event-handlers/user-reset-password.handler';

@Module({
  imports: [MailerModule],
  providers: [
    EmailService,
    UserRegisteredHandler,
    UserActivatedHandler,
    UserForgotPasswordHandler,
    UserResetPasswordHandler,
  ],
  exports: [],
})
export class AuthBackendMailerModule {}
