import { Test, TestingModule } from '@nestjs/testing';
import { UserResetPasswordHandler } from './user-reset-password.handler';
import { userFactory } from '@portfolio/testing-data-mocks-util';
import { EmailService } from '../email.service';

describe('UserResetPasswordHandler', () => {
  let provider: UserResetPasswordHandler;

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
        UserResetPasswordHandler,
        { provide: EmailService, useValue: mockEmailService },
      ],
    }).compile();

    provider = module.get<UserResetPasswordHandler>(UserResetPasswordHandler);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  describe('handleUserResetPasswordEvent', () => {
    it('should call sendResetPasswordSuccessEmail', () => {
      const payload = { email: mockUser.username, name: mockUser.username };
      provider.handleUserResetPasswordEvent(payload);
      expect(
        mockEmailService.sendResetPasswordSuccessEmail,
      ).toHaveBeenCalledWith(payload.email, payload.name);
    });
  });
});
