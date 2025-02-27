import { Type, Static } from '@sinclair/typebox';

export const UpdateUserSchema = Type.Object({
  username: Type.Optional(Type.String()),
  email: Type.Optional(Type.String()),
  password: Type.Optional(Type.String()),
  isActive: Type.Optional(Type.Boolean()),
  accessToken: Type.Optional(Type.String()),
  refreshToken: Type.Optional(Type.String()),
  roles: Type.Optional(
    Type.Array(
      Type.Object({
        id: Type.String(),
        name: Type.Optional(Type.String()),
        description: Type.Optional(Type.String()),
      }),
    ),
  ),
});

export type UpdateUserDto = Static<typeof UpdateUserSchema>;
