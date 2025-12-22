export enum Gender {
  Female = 0,
  Male = 1,
}

export enum JobLevel {
  Intern = 0,
  Junior = 1,
  Senior = 2,
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
