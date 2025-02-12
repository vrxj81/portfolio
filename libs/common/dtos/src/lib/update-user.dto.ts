import { IRole, IUser } from '@portfolio/common-models';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateRoleDto } from './update-role.dto';

export class UpdateUserDto
  implements Partial<Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>>
{
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  accessToken?: string;

  @IsOptional()
  @IsString()
  refreshToken?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateRoleDto)
  roles?: IRole[];
}
