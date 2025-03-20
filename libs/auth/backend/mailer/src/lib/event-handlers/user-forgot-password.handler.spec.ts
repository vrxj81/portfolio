import { Test, TestingModule } from '@nestjs/testing';
import { UserForgotPasswordHandler } from './user-forgot-password.handler';
import { userFactory } from '@portfolio/testing-data-mocks-util';
import { EmailService } from '../email.service';

describe('UserForgotPasswordHandler', () => {
  let provider: UserForgotPasswordHandler;

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
        UserForgotPasswordHandler,
        { provide: EmailService, useValue: mockEmailService },
      ],
    }).compile();

    provider = module.get<UserForgotPasswordHandler>(UserForgotPasswordHandler);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  describe('handleUserForgotPasswordEvent', () => {
    it('should call sendForgotPasswordEmail', () => {
      const payload = {
        email: mockUser.username,
        name: mockUser.username,
        token: 'token',
      };
      provider.handleUserForgotPasswordEvent(payload);
      expect(mockEmailService.sendForgotPasswordEmail).toHaveBeenCalledWith(
        payload.email,
        payload.name,
        payload.token,
      );
    });
  });
});
