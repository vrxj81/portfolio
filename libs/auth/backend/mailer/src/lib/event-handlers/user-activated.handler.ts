import { Injectable } from '@nestjs/common';
import { EmailService } from '../email.service';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UserActivatedHandler {
  constructor(private readonly emailService: EmailService) {}

  @OnEvent('user.activated', { async: true })
  handleUserActivatedEvent(payload: { email: string; name: string }) {
    const { email, name } = payload;
    return this.emailService.sendActivationSuccessEmail(email, name);
  }
}
