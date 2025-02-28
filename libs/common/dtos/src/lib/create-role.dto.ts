import { Type, Static } from '@sinclair/typebox';

export const CreateRoleSchema = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  users: Type.Optional(
    Type.Array(
      Type.Object({
        username: Type.String(),
        email: Type.String(),
        password: Type.Optional(Type.String()),
        isActive: Type.Boolean(),
        accessToken: Type.Optional(Type.String()),
        refreshToken: Type.Optional(Type.String()),
      }),
    ),
  ),
  permissions: Type.Optional(
    Type.Array(
      Type.Object({
        name: Type.String(),
        action: Type.String(),
        subject: Type.String(),
        conditions: Type.Optional(Type.String()),
      }),
    ),
  ),
});

export type CreateRoleDto = Static<typeof CreateRoleSchema>;
