import { IApplicantProfile } from '@portfolio/common-models';
import { faker } from '@faker-js/faker';

export const applicantProfileFactory = (
  options?: Partial<IApplicantProfile>,
): IApplicantProfile => {
  const applicantProfile: IApplicantProfile = {
    user: {
      id: faker.string.uuid(),
      username: faker.person.fullName(),
      email: faker.internet.email(),
      isActive: faker.datatype.boolean(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    fullName: faker.person.fullName(),
    resumeFile: undefined,
    coverLetter: faker.lorem.paragraph(),
    portfolioUrl: faker.internet.url(),
    skills: faker.lorem.words(5).split(' '),
    experience: faker.lorem.words(5).split(' '),
    education: faker.lorem.words(5).split(' '),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };

  return { ...applicantProfile, ...options };
};

export const applicantProfilesFactory = (
  count = 5,
  options?: Partial<IApplicantProfile>[],
): IApplicantProfile[] => {
  return Array.from({ length: count }, (_, i) =>
    applicantProfileFactory(options ? options[i] : {}),
  );
};
