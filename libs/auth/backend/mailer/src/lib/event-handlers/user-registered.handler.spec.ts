import { Test, TestingModule } from '@nestjs/testing';
import { UserRegisteredHandler } from './user-registered.handler';
import { userFactory } from '@portfolio/testing-data-mocks-util';
import { EmailService } from '../email.service';

describe('UserRegisteredHandler', () => {
  let provider: UserRegisteredHandler;

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
        UserRegisteredHandler,
        { provide: EmailService, useValue: mockEmailService },
      ],
    }).compile();

    provider = module.get<UserRegisteredHandler>(UserRegisteredHandler);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  describe('handleUserRegisteredEvent', () => {
    it('should call sendActivationEmail', () => {
      const payload = {
        email: mockUser.username,
        name: mockUser.username,
        userId: mockUser.id,
        token: mockUser.accessToken || '',
      };
      provider.handleUserRegisteredEvent(payload);
      expect(mockEmailService.sendActivationEmail).toHaveBeenCalledWith(
        payload.email,
        payload.name,
        payload.userId,
        payload.token,
      );
    });
  });
});
