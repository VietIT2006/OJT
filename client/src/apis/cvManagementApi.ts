import type {
  CandidateCoverLetterEntry,
  CandidateCvFile,
  CandidateCvSetting,
} from "../types/candidate.type";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const handleJsonResponse = async <T>(
  response: Response,
  errorMessage: string,
  options?: { ignore404?: boolean; fallbackValue?: T },
): Promise<T> => {
  if (!response.ok) {
    if (response.status === 404 && options?.ignore404) {
      return options.fallbackValue as T;
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

export const fetchCvSetting = async (candidateId: string): Promise<CandidateCvSetting | null> => {
  const response = await fetch(`${API_BASE_URL}/candidateCvSettings?candidateId=${candidateId}`);
  const data = await handleJsonResponse<CandidateCvSetting[]>(response, "Không thể tải cài đặt CV mặc định", {
    ignore404: true,
    fallbackValue: [],
  });
  return data[0] ?? null;
};

export const upsertCvSetting = async (
  candidateId: string,
  useDefaultCv: boolean,
  setting?: CandidateCvSetting | null,
): Promise<CandidateCvSetting> => {
  const timestamp = new Date().toISOString();
  if (setting) {
    const response = await fetch(`${API_BASE_URL}/candidateCvSettings/${setting.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ useDefaultCv, updatedAt: timestamp }),
    });
    return handleJsonResponse(response, "Không thể cập nhật cài đặt CV mặc định");
  }

  const response = await fetch(`${API_BASE_URL}/candidateCvSettings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      candidateId,
      useDefaultCv,
      updatedAt: timestamp,
    }),
  });
  return handleJsonResponse(response, "Không thể tạo cài đặt CV mặc định");
};

export const fetchCvFiles = async (candidateId: string): Promise<CandidateCvFile[]> => {
  const response = await fetch(
    `${API_BASE_URL}/candidateCvFiles?candidateId=${candidateId}&_sort=uploadedAt&_order=desc`,
  );
  return handleJsonResponse(response, "Không thể tải danh sách CV đã tải lên", {
    ignore404: true,
    fallbackValue: [],
  });
};

export type UploadCvFilePayload = {
  candidateId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileContent: string;
  isPrimary?: boolean;
};

export const uploadCvFile = async (payload: UploadCvFilePayload): Promise<CandidateCvFile> => {
  const response = await fetch(`${API_BASE_URL}/candidateCvFiles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      isPrimary: payload.isPrimary ?? true,
      uploadedAt: new Date().toISOString(),
    }),
  });
  return handleJsonResponse(response, "Không thể tải lên CV mới");
};

export const patchCvFile = async (
  id: string,
  data: Partial<Pick<CandidateCvFile, "isPrimary">>,
): Promise<CandidateCvFile> => {
  const response = await fetch(`${API_BASE_URL}/candidateCvFiles/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleJsonResponse(response, "Không thể cập nhật CV");
};

export const deleteCvFile = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/candidateCvFiles/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Không thể xoá CV này");
  }
};

export const fetchCoverLetter = async (candidateId: string): Promise<CandidateCoverLetterEntry | null> => {
  const response = await fetch(`${API_BASE_URL}/candidateCoverLetters?candidateId=${candidateId}`);
  const data = await handleJsonResponse<CandidateCoverLetterEntry[]>(
    response,
    "Không thể tải thư xin việc",
    {
      ignore404: true,
      fallbackValue: [],
    },
  );
  return data[0] ?? null;
};

export const saveCoverLetter = async (
  candidateId: string,
  content: string,
  title: string,
  entry?: CandidateCoverLetterEntry | null,
): Promise<CandidateCoverLetterEntry> => {
  const timestamp = new Date().toISOString();
  if (entry) {
    const response = await fetch(`${API_BASE_URL}/candidateCoverLetters/${entry.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, title, updatedAt: timestamp }),
    });
    return handleJsonResponse(response, "Không thể cập nhật thư xin việc");
  }

  const response = await fetch(`${API_BASE_URL}/candidateCoverLetters`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ candidateId, content, title, updatedAt: timestamp }),
  });
  return handleJsonResponse(response, "Không thể lưu thư xin việc");
};
