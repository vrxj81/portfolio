import { IRecruiterProfile, IUser } from '@portfolio/common-models';
import { Type } from 'class-transformer';
import { ValidateNested, IsString, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

// Recruiter Profile DTOs
export class CreateRecruiterProfileDto
  implements Omit<IRecruiterProfile, 'createdAt' | 'updatedAt'>
{
  @ValidateNested()
  @Type(() => CreateUserDto)
  user!: IUser;

  @IsString()
  fullName!: string;

  @IsString()
  company!: string;

  @IsString()
  position!: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsString()
  contactEmail!: string;

  @IsOptional()
  @IsString()
  contactPhone?: string;
}
