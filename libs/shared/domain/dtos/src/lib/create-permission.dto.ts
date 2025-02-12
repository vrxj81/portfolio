import { IPermission, IRole } from '@portfolio/domain-interfaces';
import { Type } from 'class-transformer';
import { CreateRoleDto } from './create-role.dto';
import {
  ValidateNested,
  IsOptional,
  IsString,
  IsArray,
  IsDate,
} from 'class-validator';

export class CreatePermissionDto
  implements Omit<IPermission, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  action!: string;

  @IsString()
  subject!: string;

  @IsOptional()
  @IsString()
  conditions?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRoleDto)
  roles?: IRole[];

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
