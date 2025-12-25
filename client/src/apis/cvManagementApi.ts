import type {
  CandidateCoverLetterEntry,
  CandidateCvFile,
  CandidateCvSetting,
} from "../types/candidate.type";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const FILE_API_URL = import.meta.env.VITE_FILE_API_URL ?? API_BASE_URL;

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

type RawCvSetting = CandidateCvSetting & { useDefaultCv?: boolean };

const normalizeSetting = (entry: RawCvSetting | null): CandidateCvSetting | null => {
  if (!entry) return null;
  const mode =
    entry.mode ??
    (typeof entry.useDefaultCv === "boolean" ? (entry.useDefaultCv ? "profile" : "file") : "profile");
  return {
    id: entry.id,
    candidateId: entry.candidateId,
    mode,
    fileId: entry.fileId ?? null,
    updatedAt: entry.updatedAt,
  };
};

export const fetchCvSetting = async (candidateId: string): Promise<CandidateCvSetting | null> => {
  const response = await fetch(`${API_BASE_URL}/candidateCvSettings?candidateId=${candidateId}`);
  const data = await handleJsonResponse<RawCvSetting[]>(
    response,
    "Không thể tải cấu hình CV mặc định",
    {
      ignore404: true,
      fallbackValue: [],
    },
  );
  return normalizeSetting(data[0] ?? null);
};

export const upsertCvSetting = async (
  candidateId: string,
  mode: "profile" | "file",
  fileId: string | null,
  setting?: CandidateCvSetting | null,
): Promise<CandidateCvSetting> => {
  const payload = {
    candidateId,
    mode,
    fileId: mode === "file" ? fileId : null,
    updatedAt: new Date().toISOString(),
    useDefaultCv: mode === "profile",
  };

  if (setting) {
    const response = await fetch(`${API_BASE_URL}/candidateCvSettings/${setting.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const updated = await handleJsonResponse<RawCvSetting>(
      response,
      "Không thể cập nhật cấu hình CV mặc định",
    );
    return normalizeSetting(updated)!;
  }

  const response = await fetch(`${API_BASE_URL}/candidateCvSettings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const created = await handleJsonResponse<RawCvSetting>(
    response,
    "Không thể tạo cấu hình CV mặc định",
  );
  return normalizeSetting(created)!;
};

const withAbsoluteFileUrl = (file: CandidateCvFile): CandidateCvFile => ({
  ...file,
  fileUrl: file.fileUrl.startsWith("http") ? file.fileUrl : `${FILE_API_URL}${file.fileUrl}`,
});

export const fetchCvFiles = async (candidateId: string): Promise<CandidateCvFile[]> => {
  const response = await fetch(`${FILE_API_URL}/cv-files?candidateId=${candidateId}`);
  const data = await handleJsonResponse<CandidateCvFile[]>(response, "Không thể tải danh sách CV đã tải lên", {
    ignore404: true,
    fallbackValue: [],
  });
  return data.map(withAbsoluteFileUrl);
};

export const uploadCvFile = async (candidateId: string, file: File): Promise<CandidateCvFile> => {
  const formData = new FormData();
  formData.append("candidateId", candidateId);
  formData.append("cv", file);

  const response = await fetch(`${FILE_API_URL}/cv-files`, {
    method: "POST",
    body: formData,
  });
  const created = await handleJsonResponse<CandidateCvFile>(response, "Không thể tải lên CV mới");
  return withAbsoluteFileUrl(created);
};

export const patchCvFile = async (
  id: string,
  data: Partial<Pick<CandidateCvFile, "isPrimary">>,
): Promise<CandidateCvFile> => {
  const response = await fetch(`${FILE_API_URL}/cv-files/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const updated = await handleJsonResponse<CandidateCvFile>(response, "Không thể cập nhật CV");
  return withAbsoluteFileUrl(updated);
};

export const deleteCvFile = async (id: string): Promise<void> => {
  const response = await fetch(`${FILE_API_URL}/cv-files/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Không thể xóa CV này");
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
