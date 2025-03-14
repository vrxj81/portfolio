import { Test, TestingModule } from '@nestjs/testing';
import { UserActivatedHandler } from './user-activated.handler';
import { EmailService } from '../email.service';
import { userFactory } from '@portfolio/testing-data-mocks-util';

describe('UserActivatedHandler', () => {
  let provider: UserActivatedHandler;

  const mockUser = userFactory();

  const mockEmailService = {
    sendActivationEmail: jest.fn(),
    sendActivationSuccessEmail: jest.fn(),
    sendForgotPasswordEmail: jest.fn(),
    sendResetPasswordSuccessEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserActivatedHandler,
        { provide: EmailService, useValue: mockEmailService },
      ],
    }).compile();

    provider = module.get<UserActivatedHandler>(UserActivatedHandler);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  describe('handleUserActivatedEvent', () => {
    it('should call sendActivationSuccessEmail', () => {
      const payload = { email: mockUser.username, name: mockUser.username };
      provider.handleUserActivatedEvent(payload);
      expect(mockEmailService.sendActivationSuccessEmail).toHaveBeenCalledWith(
        payload.email,
        payload.name,
      );
    });
  });
});
