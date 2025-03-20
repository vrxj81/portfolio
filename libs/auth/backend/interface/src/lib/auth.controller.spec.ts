import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LoginRequestDto, RegisterRequestDto } from '@portfolio/common-dtos';
import { IUser } from '@portfolio/common-models';
import { userFactory } from '@portfolio/testing-data-mocks-util';
import { AuthService } from '@portfolio/auth-backend-application';

describe('AuthController', () => {
  let controller: AuthController;

  const mockRegisterRequest: RegisterRequestDto = {
    username: 'test',
    email: 'test@example.com',
    password: 'password',
    confirmPassword: 'password',
  };

  const mockLoginRequest: LoginRequestDto = {
    email: 'test@example.com',
    password: 'password',
  };

  const mockUswer: IUser = userFactory(mockRegisterRequest);

  const mockAuthService = {
    register: jest.fn().mockResolvedValue(mockUswer),
    login: jest.fn().mockResolvedValue({ token: 'token' }),
    activate: jest.fn().mockResolvedValue({ activated: true }),
    forgotPassword: jest.fn().mockResolvedValue({ forgot: true }),
    resetPassword: jest.fn().mockResolvedValue({ reset: true }),
    refreshToken: jest
      .fn()
      .mockResolvedValue({ accessToken: 'token', refreshToken: 'token' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('register', () => {
    it('should return a user', async () => {
      expect(await controller.register(mockRegisterRequest)).toEqual(mockUswer);
    });
  });
  describe('login', () => {
    it('should return a token', async () => {
      expect(await controller.login(mockLoginRequest)).toEqual({
        token: 'token',
      });
    });
  });
  describe('activate', () => {
    it('should return activated', async () => {
      expect(await controller.activate('id', { token: 'token' })).toEqual({
        activated: true,
      });
    });
  });
  describe('forgotPassword', () => {
    it('should return forgot', async () => {
      expect(await controller.forgotPassword({ email: 'email' })).toEqual({
        forgot: true,
      });
    });
  });
  describe('resetPassword', () => {
    it('should return reset', async () => {
      expect(
        await controller.resetPassword('token', { password: 'password' }),
      ).toEqual({
        reset: true,
      });
    });
  });
  describe('refreshToken', () => {
    it('should return a token', async () => {
      expect(await controller.refreshToken({ token: 'token' })).toEqual({
        accessToken: 'token',
        refreshToken: 'token',
      });
    });
  });
});
