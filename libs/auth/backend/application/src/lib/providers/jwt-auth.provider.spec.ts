import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthProvider } from './jwt-auth.provider';
import { JwtService } from '@nestjs/jwt';
import { User } from '@portfolio/backend-data-access-users';
import { Role } from '@portfolio/backend-data-access-roles';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { userFactory } from '@portfolio/testing-data-mocks-util';
import { RegisterRequestDto } from '@portfolio/common-dtos';
import * as bcrypt from 'bcrypt';
import { IUser } from '@portfolio/common-models';
import { authConfig, jwtConfig } from '@portfolio/auth-backend-config';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('JwtAuthProvider', () => {
  let provider: JwtAuthProvider;

  const registerRequest: RegisterRequestDto = {
    username: 'test',
    email: 'test@example.com',
    password: 'password',
    confirmPassword: 'password',
    role: 'user',
  };

  const loginRequest = { email: 'test@example.com', password: 'password' };

  const user = userFactory({ ...registerRequest, isActive: false });
  const role = { name: 'user' };

  const genSalt = jest.fn().mockResolvedValue('salt');
  (bcrypt.genSalt as jest.Mock) = genSalt;
  const hash = jest.fn().mockResolvedValue('hash');
  (bcrypt.hash as jest.Mock) = hash;
  const compare = jest.fn().mockResolvedValue(true);
  (bcrypt.compare as jest.Mock) = compare;

  const mockUserRepository = {
    findOne: jest.fn().mockResolvedValue(user),
    create: jest.fn().mockReturnValue(user),
    save: jest.fn().mockReturnValue(user),
    preload: jest.fn((data: Partial<IUser>) => {
      return { ...user, ...data };
    }),
  };

  const mockRoleRepository = {
    findOne: jest.fn().mockResolvedValue(role),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue(user.accessToken),
    verify: jest.fn().mockReturnValue({ sub: user.id }),
  };

  const mockEventEmitter = {
    emit: jest.fn().mockReturnValue(true),
  };

  const mockAuthConfig = {
    activationRequired: false,
    defaultRole: 'user',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthProvider,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Role),
          useValue: mockRoleRepository,
        },
        {
          provide: EventEmitter2,
          useValue: mockEventEmitter,
        },
        {
          provide: authConfig.KEY,
          useValue: mockAuthConfig,
        },
        {
          provide: jwtConfig.KEY,
          useValue: jwtConfig,
        },
      ],
    }).compile();

    provider = module.get<JwtAuthProvider>(JwtAuthProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const result = await provider.register(registerRequest);

      expect(result).toEqual(
        expect.objectContaining({
          accessToken: user.accessToken,
          refreshToken: user.accessToken,
        }),
      );
      expect(mockEventEmitter.emit).toHaveBeenCalledWith('user.registered', {
        email: user.email,
        name: user.username,
        userId: user.id,
        token: user.accessToken,
        registrationRequired: mockAuthConfig.activationRequired,
      });
    });

    it('should return a boolean if activation is required', async () => {
      mockAuthConfig.activationRequired = true;
      const result = await provider.register(registerRequest);

      expect(result).toEqual({ registered: true });
      expect(mockEventEmitter.emit).toHaveBeenCalledWith('user.registered', {
        email: user.email,
        name: user.username,
        userId: user.id,
        token: user.accessToken,
        registrationRequired: mockAuthConfig.activationRequired,
      });
    });

    it('should throw an error if passwords do not match', async () => {
      registerRequest.confirmPassword = 'wrongPassword';
      await expect(provider.register(registerRequest)).rejects.toThrow(
        'Passwords do not match',
      );
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const result = await provider.login(loginRequest);

      expect(result).toEqual({
        accessToken: user.accessToken,
        refreshToken: user.accessToken,
      });
      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        'user.logged-in',
        expect.any(Object),
      );
    });

    it('should throw an error if credentials are invalid', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null);
      await expect(provider.login(loginRequest)).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });

  describe('activate', () => {
    it('should activate a user', async () => {
      const result = await provider.activate(user.id, user.accessToken || '');

      expect(result).toEqual({ activated: true });
      expect(mockEventEmitter.emit).toHaveBeenCalledWith('user.activated', {
        email: user.email,
        name: user.username,
      });
    });

    it('should throw an error if activation token is invalid', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        provider.activate('invalidId', 'invalidToken'),
      ).rejects.toThrow('Invalid activation token');
    });
  });

  describe('forgotPassword', () => {
    it('should handle forgot password', async () => {
      const result = await provider.forgotPassword(user.email);

      expect(result).toEqual({ forgot: true });
      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        'user.forgot-password',
        {
          email: user.email,
          name: user.username,
          token: user.accessToken,
        },
      );
    });

    it('should throw an error if user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        provider.forgotPassword('nonexistent@example.com'),
      ).rejects.toThrow('User not found');
    });
  });

  describe('resetPassword', () => {
    it('should reset password', async () => {
      const result = await provider.resetPassword(
        user.accessToken || '',
        'newPassword',
      );

      expect(result).toEqual({ reset: true });
      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        'user.reset-password',
        {
          email: user.email,
          name: user.username,
        },
      );
    });

    it('should throw an error if reset token is invalid', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        provider.resetPassword('invalidToken', 'newPassword'),
      ).rejects.toThrow('Invalid reset token');
    });
  });
  describe('refreshToken', () => {
    it('should refresh token', async () => {
      const result = await provider.refreshToken(user.accessToken || '');

      expect(result).toEqual({
        accessToken: user.accessToken,
        refreshToken: user.accessToken,
      });
    });
    it('should throw an error if refresh token is invalid', async () => {
      mockJwtService.verify.mockImplementationOnce(() => {
        throw new Error('Invalid token');
      });

      await expect(provider.refreshToken('invalidToken')).rejects.toThrow(
        'Invalid refresh token',
      );
    });
    it('should throw an error if user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null);

      await expect(provider.refreshToken('invalidToken')).rejects.toThrow(
        'User not found',
      );
    });
  });
});
