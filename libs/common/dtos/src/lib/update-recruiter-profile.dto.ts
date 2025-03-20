import { Type, Static } from '@sinclair/typebox';

export const UpdateRecruiterProfileSchema = Type.Object({
  user: Type.Optional(
    Type.Object({
      id: Type.String(),
      username: Type.String(),
      email: Type.String(),
      role: Type.String(),
    }),
  ),
  fullName: Type.Optional(Type.String()),
  company: Type.Optional(Type.String()),
  position: Type.Optional(Type.String()),
  bio: Type.Optional(Type.String()),
  contactEmail: Type.Optional(Type.String()),
  contactPhone: Type.Optional(Type.String()),
});

export type UpdateRecruiterProfileDto = Static<
  typeof UpdateRecruiterProfileSchema
>;
