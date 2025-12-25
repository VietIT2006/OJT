export enum JobCandidateStatus {
  Applied = 0,      // Đã ứng tuyển
  Screening = 1,    // Đang lọc CV
  Interview = 2,    // Phỏng vấn
  Offered = 3,      // Đã offer
  Rejected = 4,     // Từ chối
  Hired = 5        // Đã nhận việc
}

export enum CompanyType {
  Startup = "Startup",
  Outsourcing = "Outsourcing",
  Software = "Software",
  Finance = "Finance",
  Education = "Education",
  Healthcare = "Healthcare",
  Retail = "Retail",
  Manufacturing = "Manufacturing",
  Other = "Other",
}

export enum JobLevel {
  Intern = "Intern",
  Fresher = "Fresher",
  Junior = "Junior",
  MidLevel = "Mid Level",
  Senior = "Senior",
  Lead = "Lead",
}


export enum SalaryType {
  Monthly = "Monthly",
  Yearly = "Yearly",
}

export type Company = {
  id: string;
  user_id: string;
  type_company_id: string;
  name: string;
  logo: string | null;
  featured: boolean;
  address: string;
  website: string | null;
  link_fb: string | null;
  link_linkedin: string | null;
  featured: boolean;
  follower: number;
  size: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type Job = {
  id: string;
  is_open: boolean;
  company_id: string;
  type_job_id: string;
  tag_id: string
  location_id: string;
  level: JobLevel;
  experience: string;
  education: string;
  title: string;
  description: string;
  salary: string | null;
  salary_type: SalaryType | null;
  expire_at: string | null;
  created_at: string;
  updated_at: string;
};

export type TypeCompany = {
  id: string;
  name: CompanyType;
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

export type TagJob = {
  id: string;
  /** Designer, Mobile, Frontend, Backend*/
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
  updated_at: string;
};

export type AddressCompany = {
  id: string;
  company_id: string;
  location_id: string;
  address: string;
  map_url: string | null;
};

export type RatingScale = 1 | 2 | 3 | 4 | 5;

export type CompanyReview = {
  // Company đánh giá candidate theo Job ứng tuyển
  // Mỗi job_candidate chỉ được đánh giá 1 lần

  id: string;

  company_id: string;
  candidate_id: string;
  job_candidate_id: string;

  rating: RatingScale; //1–5
  comment: string | null;

  created_at: string;
  updated_at: string;
};

export type CompanyFavoriteCandidate = {
  id: string;

  company_id: string;
  candidate_id: string;

  created_at: string;
  updated_at: string;
};
