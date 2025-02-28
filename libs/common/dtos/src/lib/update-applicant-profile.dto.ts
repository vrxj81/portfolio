import { Type, Static } from '@sinclair/typebox';

export const UpdateApplicantProfileSchema = Type.Object({
  user: Type.Optional(
    Type.Object({
      username: Type.Optional(Type.String()),
      email: Type.Optional(Type.String()),
      role: Type.Optional(Type.String()),
    }),
  ),
  fullName: Type.Optional(Type.String()),
  resumeUrl: Type.Optional(Type.String()),
  coverLetter: Type.Optional(Type.String()),
  portfolioUrl: Type.Optional(Type.String()),
  skills: Type.Optional(Type.Array(Type.String())),
  experience: Type.Optional(Type.Array(Type.String())),
  education: Type.Optional(Type.Array(Type.String())),
});

export type UpdateApplicantProfileDto = Static<
  typeof UpdateApplicantProfileSchema
>;
