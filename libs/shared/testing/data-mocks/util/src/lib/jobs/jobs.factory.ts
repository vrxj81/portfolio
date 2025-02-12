import { IJob } from '@portfolio/common-models';
import { faker } from '@faker-js/faker';

export const jobFactory = (options?: Partial<IJob>): IJob => {
  const job: IJob = {
    id: faker.string.uuid(),
    title: faker.person.jobTitle(),
    description: faker.lorem.paragraph(),
    company: faker.company.name(),
    location: faker.location.city(),
    salaryRange: {
      min: ((min) => {
        const max = faker.number.int({ min: min + 500, max: 6000 });
        return { min, max };
      })(faker.number.int({ min: 1500, max: 5000 })).min,
      max: ((min) => {
        const max = faker.number.int({ min: min + 500, max: 6000 });
        return { min, max };
      })(faker.number.int({ min: 1500, max: 5000 })).max,
    },
    employmentType: faker.helpers.arrayElement([
      'Full-time',
      'Part-time',
      'Contract',
      'Temporary',
      'Internship',
    ]),
    postedDate: faker.date.recent(),
    applicationDeadline: faker.date.future(),
    requirements: faker.lorem.words(5).split(' '),
    responsibilities: faker.lorem.words(5).split(' '),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };

  return { ...job, ...options };
};

export const jobsFactory = (count = 5, options?: Partial<IJob>[]): IJob[] => {
  return Array.from({ length: count }, (_, i) =>
    jobFactory(options ? options[i] : {}),
  );
};
