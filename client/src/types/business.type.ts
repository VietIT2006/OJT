export enum JobCandidateStatus {
  Applied = 0,      // Đã ứng tuyển
  Screening = 1,    // Đang lọc CV
  Interview = 2,    // Phỏng vấn
  Offered = 3,      // Đã offer
  Rejected = 4,     // Từ chối
}

export type Company = {
  id: string;
  user_id: string;
  type_company_id: string;
  name: string;
  logo: string | null;
  website: string | null;
  link_fb: string | null;
  link_linkedin: string | null;
  follower: number;
  size: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type Job = {
  id: string;
  company_id: string;
  type_job_id: string;
  location_id: string;
  title: string;
  description: string;
  salary: string | null;
  expire_at: string | null;
  created_at: string;
  updated_at: string;
};

export type TypeCompany = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Location = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type TypeJob = {
  id: string;
  /** Fulltime, Part-time, Remote, Internship */
  name: string;
  created_at: string;
  updated_at: string;
};

export type JobCandidate = {
  id: string;
  job_id: string;
  candidate_id: string;
  cv_url: string | null;
  content: string | null;
  status: JobCandidateStatus;
  created_at: string;
};

export type AddressCompany = {
  id: string;
  company_id: string;
  location_id: string;
  address: string;
  map_url: string | null;
};

