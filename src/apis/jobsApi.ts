import type { Job } from "../types/job.type";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export type JobSearchParams = {
  location?: string;
};

const buildQueryString = (params: JobSearchParams) => {
  const query = new URLSearchParams();

  if (params.location?.trim()) {
    query.set("location", params.location.trim());
  }

  return query.toString();
};

export const fetchJobs = async (params: JobSearchParams = {}): Promise<Job[]> => {
  const query = buildQueryString(params);
  const url = query ? `${API_BASE_URL}/jobs?${query}` : `${API_BASE_URL}/jobs`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Không thể tải danh sách việc làm");
  }

  return response.json();
};

export const fetchJobLocations = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/jobs`);

  if (!response.ok) {
    throw new Error("Không thể tải danh sách địa điểm");
  }

  const jobs: Job[] = await response.json();
  return Array.from(new Set(jobs.map((job) => job.location))).filter(Boolean);
};

export const fetchJobById = async (id: string | number): Promise<Job> => {
  const response = await fetch(`${API_BASE_URL}/jobs?id=${id}`);

  if (!response.ok) {
    throw new Error("Kh?ng t?m th?y th?ng tin vi?c l?m");
  }

  const jobs: Job[] = await response.json();

  if (!jobs.length) {
    throw new Error("Kh?ng t?m th?y th?ng tin vi?c l?m");
  }

  return jobs[0];
};
