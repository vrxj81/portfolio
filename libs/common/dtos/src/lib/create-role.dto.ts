import { IRole, IPermission, IUser } from '@portfolio/common-models';
import { Type } from 'class-transformer';
import { ValidateNested, IsOptional, IsString, IsArray } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { CreatePermissionDto } from './create-permission.dto';

// Role DTOs
export class CreateRoleDto
  implements Omit<IRole, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  users?: IUser[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePermissionDto)
  permissions?: IPermission[];
}
