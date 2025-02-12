import { IRole, IUser } from '@portfolio/domain-interfaces';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

export class CreateUserDto
  implements Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  username!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsBoolean()
  isActive!: boolean;

  @IsOptional()
  @IsString()
  accessToken?: string;

  @IsOptional()
  @IsString()
  refreshToken?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateRoleDto)
  roles?: IRole[];
}
