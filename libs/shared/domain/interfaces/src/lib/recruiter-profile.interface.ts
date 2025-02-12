import { IUser } from './user.interface';

export interface IRecruiterProfile {
  user: IUser;
  company: string;
  position: string;
  bio?: string;
  contactEmail: string;
  contactPhone?: string;
  createdAt: Date;
  updatedAt: Date;
}
