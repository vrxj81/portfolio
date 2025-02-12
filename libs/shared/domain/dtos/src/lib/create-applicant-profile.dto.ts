import { IApplicantProfile, IUser } from '@portfolio/domain-interfaces';
import { Type } from 'class-transformer';
import { ValidateNested, IsOptional, IsString, IsArray } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

// Applicant Profile DTOs
export class CreateApplicantProfileDto
  implements Omit<IApplicantProfile, 'createdAt' | 'updatedAt'>
{
  @ValidateNested()
  @Type(() => CreateUserDto)
  user!: IUser;

  @IsOptional()
  @IsString()
  resumeUrl?: string;

  @IsOptional()
  @IsString()
  coverLetter?: string;

  @IsOptional()
  @IsString()
  portfolioUrl?: string;

  @IsArray()
  @IsString({ each: true })
  skills!: string[];

  @IsArray()
  @IsString({ each: true })
  experience!: string[];

  @IsArray()
  @IsString({ each: true })
  education!: string[];
}
