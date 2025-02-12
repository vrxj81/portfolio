import { IRecruiterProfile } from '@portfolio/common-models';
import { faker } from '@faker-js/faker';

export const recruiterProfileFactory = (
  options?: Partial<IRecruiterProfile>,
): IRecruiterProfile => {
  const recruiterProfile: IRecruiterProfile = {
    user: {
      id: faker.string.uuid(),
      username: faker.person.fullName(),
      email: faker.internet.email(),
      isActive: faker.datatype.boolean(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    fullName: faker.person.fullName(),
    company: faker.company.name(),
    position: faker.person.jobTitle(),
    bio: faker.lorem.paragraph(),
    contactEmail: faker.internet.email(),
    contactPhone: faker.phone.number(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };

  return { ...recruiterProfile, ...options };
};

export const recruiterProfilesFactory = (
  count = 5,
  options?: Partial<IRecruiterProfile>[],
): IRecruiterProfile[] => {
  return Array.from({ length: count }, (_, i) =>
    recruiterProfileFactory(options ? options[i] : {}),
  );
};
