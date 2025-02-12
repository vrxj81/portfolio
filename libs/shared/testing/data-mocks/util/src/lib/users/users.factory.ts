import { IUser } from '@portfolio/common-models';
import { faker } from '@faker-js/faker';

export const userFactory = (options?: Partial<IUser>): IUser => {
  const user: IUser = {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    isActive: faker.datatype.boolean(),
    accessToken: faker.string.uuid(),
    refreshToken: faker.string.uuid(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  return { ...user, ...options };
};

export const usersFactory = (
  count = 5,
  options?: Partial<IUser>[],
): IUser[] => {
  return Array.from({ length: count }, (_, i) =>
    userFactory(options ? options[i] : {}),
  );
};
