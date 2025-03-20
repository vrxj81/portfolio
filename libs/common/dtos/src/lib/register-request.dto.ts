import { Type, Static } from '@sinclair/typebox';

export const RegisterRequestSchema = Type.Object({
  username: Type.String(),
  email: Type.String(),
  password: Type.String(),
  confirmPassword: Type.String(),
  role: Type.Optional(Type.String()),
});

export type RegisterRequestDto = Static<typeof RegisterRequestSchema>;
