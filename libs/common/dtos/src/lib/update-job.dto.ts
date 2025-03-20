import { Type, Static } from '@sinclair/typebox';

export const UpdateJobSchema = Type.Object({
  title: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
  company: Type.Optional(Type.String()),
  location: Type.Optional(Type.String()),
  salaryRange: Type.Optional(
    Type.Object({
      min: Type.Number(),
      max: Type.Number(),
    }),
  ),
  employmentType: Type.Optional(
    Type.Union([
      Type.Literal('Full-time'),
      Type.Literal('Part-time'),
      Type.Literal('Contract'),
      Type.Literal('Temporary'),
      Type.Literal('Internship'),
    ]),
  ),
  postedDate: Type.Optional(Type.String()),
  applicationDeadline: Type.Optional(Type.String()),
  requirements: Type.Optional(Type.Array(Type.String())),
  responsibilities: Type.Optional(Type.Array(Type.String())),
  recruiter: Type.Optional(
    Type.Object({
      name: Type.String(),
      email: Type.String(),
      phoneNumber: Type.String(),
      company: Type.String(),
    }),
  ),
  applicants: Type.Optional(
    Type.Array(
      Type.Object({
        name: Type.String(),
        email: Type.String(),
        phoneNumber: Type.String(),
        resume: Type.String(),
      }),
    ),
  ),
});

export type UpdateJobDto = Static<typeof UpdateJobSchema>;
