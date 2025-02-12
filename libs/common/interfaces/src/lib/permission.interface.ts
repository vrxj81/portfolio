import { IRole } from './role.interface';

export interface IPermission {
  id: string;
  name: string;
  action: string;
  subject: string;
  conditions?: string; // string holding JSON object with conditions
  roles?: IRole[];
  createdAt: Date;
  updatedAt: Date;
}
