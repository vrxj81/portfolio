import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendActivationEmail(
    email: string,
    name: string,
    userId: string,
    token: string,
  ) {
    return this.mailerService.sendMail({
      to: email,
      subject: 'Activate your account',
      template: 'activation',
      context: {
        email,
        name,
        url: `http://localhost:4200/activate/${userId}/${token}`,
      },
    });
  }

  sendActivationSuccessEmail(email: string, name: string) {
    return this.mailerService.sendMail({
      to: email,
      subject: 'Account activated',
      template: 'activation-success',
      context: {
        email,
        name,
        url: 'http://localhost:4200/auth/login',
      },
    });
  }

  sendForgotPasswordEmail(email: string, name: string, token: string) {
    return this.mailerService.sendMail({
      to: email,
      subject: 'Reset your password',
      template: 'forgot-password',
      context: {
        email,
        name,
        url: `http://localhost:4200/reset-password/${token}`,
      },
    });
  }

  sendResetPasswordSuccessEmail(email: string, name: string) {
    return this.mailerService.sendMail({
      to: email,
      subject: 'Password reset',
      template: 'reset-password-success',
      context: {
        email,
        name,
        url: 'http://localhost:4200/auth/login',
      },
    });
  }
}
