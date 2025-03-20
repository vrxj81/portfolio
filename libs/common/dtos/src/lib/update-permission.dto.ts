import { Type, Static } from '@sinclair/typebox';

export const UpdatePermissionSchema = Type.Object({
  name: Type.Optional(Type.String()),
  action: Type.Optional(Type.String()),
  subject: Type.Optional(Type.String()),
  conditions: Type.Optional(Type.String()),
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

export type UpdatePermissionDto = Static<typeof UpdatePermissionSchema>;
