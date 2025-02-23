import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { IUser } from '@portfolio/common-models';
import { userFactory } from '@portfolio/testing-data-mocks-util';

describe('JwtStrategy', () => {
  let provider: JwtStrategy;

  const mockUser: IUser = userFactory();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy],
    }).compile();

    provider = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should validate and return user data', async () => {
    const payload = { sub: mockUser.id, user: mockUser };
    const result = await provider.validate(payload);
    expect(result).toEqual({ userId: mockUser.id, user: mockUser });
  });
});
