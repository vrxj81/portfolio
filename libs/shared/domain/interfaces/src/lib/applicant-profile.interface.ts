import { IUser } from './user.interface';

export interface IApplicantProfile {
  user: IUser;
  resumeFile?: File;
  coverLetter?: string;
  portfolioUrl?: string;
  skills: string[];
  experience: string[];
  education: string[];
  createdAt: Date;
  updatedAt: Date;
}
