import { IPermission } from '@portfolio/common-models';
import { faker } from '@faker-js/faker';

export const permissionFactory = (
  options?: Partial<IPermission>,
): IPermission => {
  const permission: IPermission = {
    id: faker.string.uuid(),
    name: faker.lorem.word(),
    action: faker.lorem.sentence(),
    subject: faker.lorem.sentence(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  return { ...permission, ...options };
};

export const permissionsFactory = (
  count = 5,
  options?: Partial<IPermission>[],
): IPermission[] => {
  return Array.from({ length: count }, (_, i) =>
    permissionFactory(options ? options[i] : {}),
  );
};
