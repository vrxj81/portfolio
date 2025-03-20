import { Type, Static } from '@sinclair/typebox';

export const CreatePermissionSchema = Type.Object({
  name: Type.String(),
  action: Type.String(),
  subject: Type.String(),
  conditions: Type.Optional(Type.String()),
  roles: Type.Optional(
    Type.Array(
      Type.Object({
        name: Type.String(),
        description: Type.Optional(Type.String()),
      }),
    ),
  ),
  createdAt: Type.Optional(Type.String({ format: 'date-time' })),
  updatedAt: Type.Optional(Type.String({ format: 'date-time' })),
});

export type CreatePermissionDto = Static<typeof CreatePermissionSchema>;
