import { IUser } from './user.interface';

export interface IRecruiterProfile {
  user: IUser;
  fullName: string;
  company: string;
  position: string;
  bio?: string;
  contactEmail: string;
  contactPhone?: string;
  createdAt: Date;
  updatedAt: Date;
}
