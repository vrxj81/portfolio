import { IRecruiterProfile } from './recruiter-profile.interface';
import { IApplicantProfile } from './applicant-profile.interface';

export interface IJob {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salaryRange?: {
    min: number;
    max: number;
  };
  employmentType:
    | 'Full-time'
    | 'Part-time'
    | 'Contract'
    | 'Temporary'
    | 'Internship';
  postedDate: Date;
  applicationDeadline?: Date;
  requirements: string[];
  responsibilities: string[];
  recruiter?: IRecruiterProfile;
  applicants?: IApplicantProfile[];
}
