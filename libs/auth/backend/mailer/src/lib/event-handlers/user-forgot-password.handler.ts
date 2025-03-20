import { Injectable } from '@nestjs/common';
import { EmailService } from '../email.service';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UserForgotPasswordHandler {
  constructor(private readonly emailService: EmailService) {}

  @OnEvent('user.forgot-password', { async: true })
  handleUserForgotPasswordEvent(payload: {
    email: string;
    name: string;
    token: string;
  }) {
    const { email, name, token } = payload;
    return this.emailService.sendForgotPasswordEmail(email, name, token);
  }
}
