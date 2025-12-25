import type { CandidateCvSection, CvSection } from "../types/cv-section.type";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const fetchCvSections = async (): Promise<CvSection[]> => {
  const response = await fetch(`${API_BASE_URL}/cv_sections`);

  if (!response.ok) {
    throw new Error("Không thể tải danh sách mục CV");
  }

  return response.json();
};

export const fetchCandidateSections = async (candidateId: string): Promise<CandidateCvSection[]> => {
  const response = await fetch(`${API_BASE_URL}/candidate_cv_sections?candidateId=${candidateId}`);

  if (!response.ok) {
    throw new Error("Không thể tải dữ liệu CV đã lưu của ứng viên");
  }

  return response.json();
};

export type CreateCandidateSectionPayload = {
  candidateId: string;
  cvSectionId: string;
  title: string;
  description: string;
  displayOrder?: number;
};

export const createCandidateSection = async (
  payload: CreateCandidateSectionPayload,
): Promise<CandidateCvSection> => {
  const response = await fetch(`${API_BASE_URL}/candidate_cv_sections`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      displayOrder: typeof payload.displayOrder === "number" ? payload.displayOrder : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error("Không thể thêm mục CV mới");
  }

  return response.json();
};

export const updateCandidateSection = async (
  id: string,
  data: Partial<Pick<CandidateCvSection, "title" | "description" | "displayOrder">>,
): Promise<CandidateCvSection> => {
  const response = await fetch(`${API_BASE_URL}/candidate_cv_sections/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, updated_at: new Date().toISOString() }),
  });

  if (!response.ok) {
    throw new Error("Không thể cập nhật mục CV");
  }

  return response.json();
};

export const deleteCandidateSection = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/candidate_cv_sections/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Không thể xóa mục CV");
  }
};
