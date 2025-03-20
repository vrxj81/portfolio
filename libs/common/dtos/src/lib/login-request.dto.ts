import { Type, Static } from '@sinclair/typebox';

export const LoginRequestSchema = Type.Object({
  email: Type.String(),
  password: Type.String(),
});

export type LoginRequestDto = Static<typeof LoginRequestSchema>;
