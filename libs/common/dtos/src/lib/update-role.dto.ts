import { IRole, IPermission, IUser } from '@portfolio/common-models';
import { Type } from 'class-transformer';
import { ValidateNested, IsOptional, IsString, IsArray } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';
import { UpdatePermissionDto } from './update-permission.dto';

// Update Role DTOs
export class UpdateRoleDto
  implements Partial<Omit<IRole, 'id' | 'createdAt' | 'updatedAt'>>
{
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateUserDto)
  users?: IUser[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePermissionDto)
  permissions?: IPermission[];
}
