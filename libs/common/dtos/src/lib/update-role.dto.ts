import { Type, Static } from '@sinclair/typebox';

export const UpdateRoleSchema = Type.Object({
  name: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
  users: Type.Optional(
    Type.Array(
      Type.Object({
        id: Type.String(),
        username: Type.Optional(Type.String()),
        email: Type.Optional(Type.String()),
        password: Type.Optional(Type.String()),
      }),
    ),
  ),
  permissions: Type.Optional(
    Type.Array(
      Type.Object({
        id: Type.String(),
        name: Type.Optional(Type.String()),
        description: Type.Optional(Type.String()),
      }),
    ),
  ),
});

export type UpdateRoleDto = Static<typeof UpdateRoleSchema>;
