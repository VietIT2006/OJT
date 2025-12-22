export type JobType = "Full-time" | "Part-time" | "Internship" | string;

export interface Job {
  id: number;
  title: string;
  type: JobType;
  salary: string;
  company: string;
  location: string;
  logo?: string;
  tags?: string[];
  description?: string[];
  requirements?: string[];
  desirable?: string[];
  benefits?: string[];
  postedDate?: string;
  expiryDate?: string;
  level?: string;
  experience?: string;
  education?: string;
}
