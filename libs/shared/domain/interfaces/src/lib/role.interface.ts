import { IPermission } from './permission.interface';
import { IUser } from './user.interface';

export interface IRole {
  id: string;
  name: string;
  description?: string;
  users?: IUser[];
  permissions?: IPermission[];
  createdAt: Date;
  updatedAt: Date;
}
