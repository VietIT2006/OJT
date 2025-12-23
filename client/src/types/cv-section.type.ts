export type CvSection = {
  id: string;
  title: string;
  description: string;
};

export type CandidateCvSection = {
  id: string;
  candidateId: string;
  cvSectionId: string;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
};
