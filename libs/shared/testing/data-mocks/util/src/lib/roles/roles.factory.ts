import { IRole } from '@portfolio/domain-interfaces';
import { faker } from '@faker-js/faker';

export const roleFactory = (options?: Partial<IRole>): IRole => {
  const role: IRole = {
    id: faker.string.uuid(),
    name: faker.name.jobTitle(),
    description: faker.lorem.sentence(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  return { ...role, ...options };
};

export const rolesFactory = (
  count = 5,
  options?: Partial<IRole>[],
): IRole[] => {
  return Array.from({ length: count }, (_, i) =>
    roleFactory(options ? options[i] : {}),
  );
};
