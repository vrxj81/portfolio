import { Injectable } from '@nestjs/common';
import { EmailService } from '../email.service';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UserRegisteredHandler {
  constructor(private readonly emailService: EmailService) {}

  @OnEvent('user.registered', { async: true })
  handleUserRegisteredEvent(payload: {
    email: string;
    name: string;
    userId: string;
    token: string;
    registrationRequired: boolean;
  }) {
    const { email, name, userId, token, registrationRequired } = payload;
    if (registrationRequired) {
      return this.emailService.sendActivationEmail(email, name, userId, token);
    }
    return;
  }
}
