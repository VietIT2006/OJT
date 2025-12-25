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
  displayOrder?: number;
  created_at?: string;
  updated_at?: string;
};
