import { RatingScale } from "./business.type";

export enum Gender {
  Female = 0,
  Male = 1,
}

export enum JobLevel {
  Intern = 0,
  Junior = 1,
  Senior = 2,
}

export enum LanguageCertType {
  IELTS = "IELTS",
  TOEIC = "TOEIC",
  JLPT = "JLPT",
  TOPIK = "TOPIK",
  HSK = "HSK",
}

export type JLPTLevel = "N1" | "N2" | "N3" | "N4" | "N5";
export type TOPIKLevel = "1" | "2" | "3" | "4" | "5" | "6";
export type HSKLevel = "1" | "2" | "3" | "4" | "5" | "6";
export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";



export enum CandidateRole {
  Frontend = "Frontend",
  Backend = "Backend",
  Fullstack = "Fullstack",
  Mobile = "Mobile",
  DevOps = "DevOps",
  QA = "QA",
  Data = "Data",
  UIUX = "UIUX",
}


export type JobOpenStatus = 0 | 1;

export type Candidate = {
  id: string;
  user_id: string;
  name: string;
  isOpen: JobOpenStatus;
  dob: string | null;
  address: string | null;
  phone: string | null;
  gender: Gender;

  link_fb: string | null;
  link_linkedin: string | null;
  link_git: string | null;

  role: CandidateRole | null;

  created_at: string;
  updated_at: string;
};

export type EducationCandidate = {
  id: string;
  candidate_id: string;
  name_education: string;
  major: string | null;
  started_at: string | null;
  end_at: string | null;
  info: string | null;
  created_at: string;
  updated_at: string;
};


export type ExperienceCandidate = {
  id: string;
  candidate_id: string;
  position: string;
  company: string;
  started_at: string | null;
  end_at: string | null;
  info: string | null;
  created_at: string;
  updated_at: string;
};

export type ProjectCandidate = {
  id: string;
  candidate_id: string;
  name: string;
  link: string | null;
  started_at: string | null;
  end_at: string | null;
  info: string | null;
  created_at: string;
  updated_at: string;
};

export type CertificateCandidate = {
  id: string;
  candidate_id: string;
  name: string;
  organization: string | null;
  started_at: string | null;
  end_at: string | null;
  info: string | null;
  created_at: string;
  updated_at: string;
};

export type SkillCandidate = {
  id: string;
  candidate_id: string;
  name: string;
  level: JobLevel;
  created_at: string;
  updated_at: string;
};

export type CandidateLanguage = {
  id: string;

  candidate_id: string;

  type: LanguageCertType; 
  value: JLPTLevel | TOPIKLevel | HSKLevel | CEFRLevel | string;

  created_at: string;
  updated_at: string;
};



export type CandidateReview = {
  // Candidate đánh giá company theo Job đã ứng tuyển
  // Mỗi job_candidate chỉ được đánh giá 1 lần

  id: string;

  candidate_id: string;
  company_id: string;
  job_candidate_id: string;

  rating: RatingScale; // 1–5
  comment: string | null;

  created_at: string;
  updated_at: string;
};

export type CandidateSavedCompany = {
  // Lưu công ty yêu thích
  id: string;

  candidate_id: string;
  company_id: string;

  created_at: string;
  updated_at: string;
};

export type CandidateFavoriteJob = {
  // Lưu công việc yêu thích
  id: string;

  candidate_id: string;
  job_id: string;

  created_at: string;
  updated_at: string;
};
