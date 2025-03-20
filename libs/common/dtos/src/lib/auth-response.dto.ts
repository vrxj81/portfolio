import { Type, Static } from '@sinclair/typebox';

export const AuthResponseSchema = Type.Object({
  accessToken: Type.String(),
  refreshToken: Type.String(),
});

export type AuthResponseDto = Static<typeof AuthResponseSchema>;
