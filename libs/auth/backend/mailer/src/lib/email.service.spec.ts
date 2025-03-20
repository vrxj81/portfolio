import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { userFactory } from '@portfolio/testing-data-mocks-util';
import { MailerService } from '@nestjs-modules/mailer';

describe('EmailService', () => {
  let service: EmailService;

  const mockUser = userFactory();

  const mockMailerService = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        { provide: MailerService, useValue: mockMailerService },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should send an activation email', async () => {
    const result = await service.sendActivationEmail(
      mockUser.email,
      mockUser.username,
      mockUser.id,
      mockUser.accessToken || '',
    );
    expect(result).toBeUndefined();
    expect(mockMailerService.sendMail).toHaveBeenCalled();
  });
  it('should send an activation success email', async () => {
    const result = await service.sendActivationSuccessEmail(
      mockUser.email,
      mockUser.username,
    );
    expect(result).toBeUndefined();
    expect(mockMailerService.sendMail).toHaveBeenCalled();
  });
  it('should send a forgot password email', async () => {
    const result = await service.sendForgotPasswordEmail(
      mockUser.email,
      mockUser.username,
      mockUser.accessToken || '',
    );
    expect(result).toBeUndefined();
    expect(mockMailerService.sendMail).toHaveBeenCalled();
  });
  it('should send a reset password success email', async () => {
    const result = await service.sendResetPasswordSuccessEmail(
      mockUser.email,
      mockUser.username,
    );
    expect(result).toBeUndefined();
    expect(mockMailerService.sendMail).toHaveBeenCalled();
  });
});
