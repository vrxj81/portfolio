import { Type, Static } from '@sinclair/typebox';

export const CreateUserSchema = Type.Object({
  username: Type.String(),
  email: Type.String(),
  password: Type.Optional(Type.String()),
  isActive: Type.Boolean(),
  accessToken: Type.Optional(Type.String()),
  refreshToken: Type.Optional(Type.String()),
  roles: Type.Optional(
    Type.Array(
      Type.Object({
        name: Type.String(),
        description: Type.Optional(Type.String()),
      }),
    ),
  ),
});

export type CreateUserDto = Static<typeof CreateUserSchema>;
