import { IApplicantProfile, IUser } from '@portfolio/domain-interfaces';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested, IsString, IsArray } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class UpdateApplicantProfileDto
  implements Partial<Omit<IApplicantProfile, 'createdAt' | 'updatedAt'>>
{
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserDto)
  user?: IUser;

  @IsOptional()
  @IsString()
  resumeUrl?: string;

  @IsOptional()
  @IsString()
  coverLetter?: string;

  @IsOptional()
  @IsString()
  portfolioUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  experience?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  education?: string[];
}
