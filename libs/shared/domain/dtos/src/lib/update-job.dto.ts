import {
  IJob,
  IRecruiterProfile,
  IApplicantProfile,
} from '@portfolio/domain-interfaces';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SalaryRangeDto } from './salary-range.dto';
import { UpdateRecruiterProfileDto } from './update-recruiter-profile.dto';
import { UpdateApplicantProfileDto } from './update-applicant-profile.dto';

export class UpdateJobDto
  implements Partial<Omit<IJob, 'id' | 'createdAt' | 'updatedAt'>>
{
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SalaryRangeDto)
  salaryRange?: SalaryRangeDto;

  @IsOptional()
  @IsEnum(['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'])
  employmentType?:
    | 'Full-time'
    | 'Part-time'
    | 'Contract'
    | 'Temporary'
    | 'Internship';

  @IsOptional()
  @IsDate()
  postedDate?: Date;

  @IsOptional()
  @IsDate()
  applicationDeadline?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  responsibilities?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateRecruiterProfileDto)
  recruiter?: IRecruiterProfile;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateApplicantProfileDto)
  applicants?: IApplicantProfile[];
}
