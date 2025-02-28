import { Type, Static } from '@sinclair/typebox';

export const CreateApplicantProfileSchema = Type.Object({
  user: Type.Object({
    email: Type.String(),
    password: Type.String(),
  }),
  fullName: Type.String(),
  resumeUrl: Type.Optional(Type.String()),
  coverLetter: Type.Optional(Type.String()),
  portfolioUrl: Type.Optional(Type.String()),
  skills: Type.Array(Type.String()),
  experience: Type.Array(Type.String()),
  education: Type.Array(Type.String()),
});

export type CreateApplicantProfileDto = Static<
  typeof CreateApplicantProfileSchema
>;
