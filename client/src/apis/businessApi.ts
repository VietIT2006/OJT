import axios from "axios";
import type { Company, Job, AddressCompany } from "../types/business.type";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export type CompanySearchParams = {
    type_company_id?: string;
    location?: string;
    name?: string;
    _page?: number;
    _limit?: number;
};

export type JobSearchParams = {
    company_id?: string;
    type_job_id?: string;
    location_id?: string;
    title?: string;
};

export type UpdateCompanyDTO = {
    name?: string;
    logo?: string | null;
    website?: string | null;
    link_fb?: string | null;
    link_linkedin?: string | null;
    size?: string | null;
    description?: string | null;
    type_company_id?: string;
};

export type CreateJobDTO = {
    is_open?: boolean;
    company_id: string;
    type_job_id: string;
    tag_id: string;
    location_id: string;
    level: string;
    experience: string;
    education: string;
    title: string;
    description: string;
    salary?: string | null;
    salary_type?: string | null;
    expire_at?: string | null;
};

export type UpdateJobDTO = {
    is_open?: boolean;
    type_job_id?: string;
    tag_id?: string;
    location_id?: string;
    level?: string;
    experience?: string;
    education?: string;
    title?: string;
    description?: string;
    salary?: string | null;
    salary_type?: string | null;
    expire_at?: string | null;
};



export const businessApi = {
    getCompanies: async (params: CompanySearchParams = {}) => {
        try {
            const res = await axios.get(`${baseUrl}/companies`, { params });
            return res.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || "Failed to fetch companies");
        }
    },

    getCompanyById: async (id: string) => {
        try {            
            const res = await axios.get(`${baseUrl}/companies/${id}`);
            
            return res.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || "Failed to fetch company detail");
        }
    },
    
    getCompanyTypes: async () => {
        try {
            const res = await axios.get(`${baseUrl}/type_companies`);
            return res.data;
        } catch (error: any) {
            throw new Error("Không thể tải loại hình công ty");
        }
    },

    getCompanyAddresses: async (companyId: string) => {
        try {
            const res = await axios.get(`${baseUrl}/address_companies?company_id=${companyId}`);
            return res.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || "Failed to fetch company addresses");
        }
    },

    updateCompany: async (id: string, data: UpdateCompanyDTO) => {
        try {
            const res = await axios.patch(`${baseUrl}/companies/${id}`, {
                ...data,
                updated_at: new Date().toISOString(),
            });
            return res.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || "Failed to update company");
        }
    },

    getJobs: async (params: JobSearchParams = {}) => {
        try {
            const res = await axios.get(`${baseUrl}/jobs`, { params });
            return res.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || "Failed to fetch jobs");
        }
    },

    getJobById: async (id: string) => {
        try {
            const res = await axios.get(`${baseUrl}/jobs/${id}`);
            return res.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || "Failed to fetch job detail");
        }
    },

    createJob: async (data: CreateJobDTO) => {
        try {
            const res = await axios.post(`${baseUrl}/jobs`, {
                is_open: true,
                ...data,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            });
            return res.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || "Failed to create job");
        }
    },

    updateJob: async (id: string, data: UpdateJobDTO) => {
        try {
            const res = await axios.patch(`${baseUrl}/jobs/${id}`, {
                ...data,
                updated_at: new Date().toISOString(),
            });
            return res.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || "Failed to update job");
        }
    },

    deleteJob: async (id: string) => {
        try {
            const res = await axios.delete(`${baseUrl}/jobs/${id}`);
            return res.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || "Failed to delete job");
        }
    },

    getTypeCompanies: async () => {
        try {
            const res = await axios.get(`${baseUrl}/type_companies`);
            return res.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || "Failed to fetch company types");
        }
    },

    getLocations: async () => {
        try {
            const res = await axios.get(`${baseUrl}/locations`);
            return res.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || "Failed to fetch locations");
        }
    },

    getLocationById: async (id: string) => {
        try {
            const res = await axios.get(`${baseUrl}/locations/${id}`);
            return res.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || "Failed to fetch location detail");
        }
    },

    getTypeJobs: async () => {
        try {
            const res = await axios.get(`${baseUrl}/type_jobs`);
            return res.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || "Failed to fetch job types");
        }
    },

    getTypeJobById: async (id: string) => {
        try {
            const res = await axios.get(`${baseUrl}/type_jobs/${id}`);
            return res.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || "Failed to fetch job type detail");
        }
    },

    getTagJobs: async () => {
        try {
            const res = await axios.get(`${baseUrl}/tag_jobs`);
            return res.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || "Failed to fetch job tags");
        }
    },

    getTagJobById: async (id: string) => {
        try {
            const res = await axios.get(`${baseUrl}/tag_jobs/${id}`);
            return res.data;
        } catch (error: any) {
            throw new Error(error?.response?.data?.message || "Failed to fetch job tag detail");
        }
    },

    checkCompanyOwnership: async (companyId: string, userId: string) => {
        try {
            const company: Company = await businessApi.getCompanyById(companyId);
            return company.user_id === userId;
        } catch (error) {
            return false;
        }
    },
};
