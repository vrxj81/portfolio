import { Type, Static } from '@sinclair/typebox';

export const CreateRecruiterProfileSchema = Type.Object({
  user: Type.Object({
    email: Type.String(),
    password: Type.String(),
  }),
  fullName: Type.String(),
  company: Type.String(),
  position: Type.String(),
  bio: Type.Optional(Type.String()),
  contactEmail: Type.String(),
  contactPhone: Type.Optional(Type.String()),
});

export type CreateRecruiterProfileDto = Static<
  typeof CreateRecruiterProfileSchema
>;
