import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from './users.repository';
import { usersFactory } from '@portfolio/testing-data-mocks-util';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { User } from './user.entity';
import { IUser } from '@portfolio/common-models';

describe('UsersRepository', () => {
  let provider: UsersRepository;

  const expectedUsers = usersFactory();
  const expectedUser = expectedUsers[0];

  const mockEntityManager = {
    persistAndFlush: jest.fn(),
  };

  const mockRepository = {
    findAll: jest.fn().mockResolvedValue(expectedUsers),
    findOne: jest.fn().mockResolvedValue(expectedUser),
    create: jest.fn().mockReturnValue(expectedUser),
    getEntityManager: jest.fn().mockReturnValue(mockEntityManager),
    persistAndFlush: jest.fn(),
    findOneOrFail: jest.fn().mockResolvedValue(expectedUser),
    assign: jest.fn((user: IUser, data: Partial<IUser>) => {
      Object.assign(user, data);
    }),
    nativeDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();

    provider = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const users = await provider.getUsers();
      expect(users).toEqual(expectedUsers);
    });
  });

  describe('getUser', () => {
    it('should return a user if found', async () => {
      const user = await provider.getUser({ id: expectedUser.id });
      expect(user).toEqual(expectedUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);
      await expect(provider.getUser({ id: 'non-existent-id' })).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const newUser = await provider.createUser(expectedUser);
      expect(newUser).toEqual(expectedUser);
      expect(mockEntityManager.persistAndFlush).toHaveBeenCalledWith(newUser);
    });
  });

  describe('updateUser', () => {
    it('should update and return the user', async () => {
      const updatedData = { username: 'updatedUsername' };
      const updatedUser = await provider.updateUser(
        expectedUser.id,
        updatedData,
      );
      expect(updatedUser.username).toEqual(updatedData.username);
      expect(mockEntityManager.persistAndFlush).toHaveBeenCalledWith(
        expectedUser,
      );
    });

    it('should throw NotFoundException if user not found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);
      await expect(
        provider.updateUser('non-existent-id', { username: 'updatedUsername' }),
      ).rejects.toThrow('User not found');
    });
  });

  describe('deleteUser', () => {
    it('should delete the user and return the id', async () => {
      const deletedId = await provider.deleteUser(expectedUser.id);
      expect(deletedId).toEqual(expectedUser.id);
      expect(mockRepository.nativeDelete).toHaveBeenCalledWith({
        id: expectedUser.id,
      });
    });
  });
});
