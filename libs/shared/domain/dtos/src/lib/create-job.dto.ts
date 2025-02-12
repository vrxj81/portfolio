import {
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  IApplicantProfile,
  IJob,
  IRecruiterProfile,
} from '@portfolio/domain-interfaces';
import { SalaryRangeDto } from './salary-range.dto';
import { CreateRecruiterProfileDto } from './create-recruiter-profile.dto';
import { CreateApplicantProfileDto } from './create-applicant-profile.dto';

// Job DTOs
export class CreateJobDto
  implements Omit<IJob, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  company!: string;

  @IsString()
  location!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SalaryRangeDto)
  salaryRange?: SalaryRangeDto;

  @IsEnum(['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'])
  employmentType!:
    | 'Full-time'
    | 'Part-time'
    | 'Contract'
    | 'Temporary'
    | 'Internship';

  @IsDate()
  postedDate!: Date;

  @IsOptional()
  @IsDate()
  applicationDeadline?: Date;

  @IsArray()
  @IsString({ each: true })
  requirements!: string[];

  @IsArray()
  @IsString({ each: true })
  responsibilities!: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateRecruiterProfileDto)
  recruiter?: IRecruiterProfile;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateApplicantProfileDto)
  applicants?: IApplicantProfile[];
}
