import { Type, Static } from '@sinclair/typebox';
import { SalaryRangeSchema } from './salary-range.dto';

export const CreateJobSchema = Type.Object({
  title: Type.String(),
  description: Type.String(),
  company: Type.String(),
  location: Type.String(),
  salaryRange: Type.Optional(SalaryRangeSchema),
  employmentType: Type.Union([
    Type.Literal('Full-time'),
    Type.Literal('Part-time'),
    Type.Literal('Contract'),
    Type.Literal('Temporary'),
    Type.Literal('Internship'),
  ]),
  postedDate: Type.String({ format: 'date-time' }),
  applicationDeadline: Type.Optional(Type.String({ format: 'date-time' })),
  requirements: Type.Array(Type.String()),
});

export type CreateJobDto = Static<typeof CreateJobSchema>;
