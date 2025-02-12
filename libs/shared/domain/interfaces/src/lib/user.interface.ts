import { IRole } from './role.interface';

export interface IUser {
  id: string;
  username: string;
  email: string;
  password?: string; // Optional because other auth providers may not provide password
  accessToken?: string; // Optional because other auth providers may not provide accessToken
  refreshToken?: string; // Optional because other auth providers may not provide refreshToken
  roles?: IRole[];
  createdAt: Date;
  updatedAt: Date;
}
