import { Type, Static } from '@sinclair/typebox';

export const SalaryRangeSchema = Type.Object({
  min: Type.Number(),
  max: Type.Number(),
});

export type SalaryRangeDto = Static<typeof SalaryRangeSchema>;
