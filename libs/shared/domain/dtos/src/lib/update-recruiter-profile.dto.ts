import { IRecruiterProfile, IUser } from '@portfolio/domain-interfaces';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested, IsString } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class UpdateRecruiterProfileDto
  implements Partial<Omit<IRecruiterProfile, 'createdAt' | 'updatedAt'>>
{
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserDto)
  user?: IUser;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  contactEmail?: string;

  @IsOptional()
  @IsString()
  contactPhone?: string;
}
