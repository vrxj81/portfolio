import { IPermission, IRole } from '@portfolio/domain-interfaces';
import { Type } from 'class-transformer';
import { ValidateNested, IsOptional, IsString, IsArray } from 'class-validator';
import { UpdateRoleDto } from './update-role.dto';

export class UpdatePermissionDto
  implements Partial<Omit<IPermission, 'id' | 'createdAt' | 'updatedAt'>>
{
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  action?: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  conditions?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateRoleDto)
  roles?: IRole[];
}
