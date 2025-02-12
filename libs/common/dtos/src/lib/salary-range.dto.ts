import { IsNumber } from 'class-validator';

// Salary Range DTO
export class SalaryRangeDto {
  @IsNumber()
  min!: number;

  @IsNumber()
  max!: number;
}
