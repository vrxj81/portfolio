import { Injectable } from '@nestjs/common';
import { EmailService } from '../email.service';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UserResetPasswordHandler {
  constructor(private readonly emailService: EmailService) {}

  @OnEvent('user.reset-password', { async: true })
  handleUserResetPasswordEvent(payload: { email: string; name: string }) {
    const { email, name } = payload;
    return this.emailService.sendResetPasswordSuccessEmail(email, name);
  }
}
