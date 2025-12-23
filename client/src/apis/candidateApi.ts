import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const candidateApi = {
    getCandidates: async () => {
        try {
            const res = await axios.get(`${baseUrl}/candidates`);
            return res.data;
        } catch (error: any) {
            throw new Error("Failed to fetch candidates");
        }
    },
    getCandidateSkills: async () => {
        try {
            const res = await axios.get(`${baseUrl}/skill_candidates`);
            return res.data;
        } catch (error: any) {
            throw new Error("Failed to fetch candidate skills");
        }
    },
    getCandidateExperiences: async () => {
        try {
            const res = await axios.get(`${baseUrl}/experience_candidates`);
            return res.data;
        } catch (error: any) {
            throw new Error("Failed to fetch candidate experiences");
        }
    },
    getCandidateLanguages: async () => {
        try {
            const res = await axios.get(`${baseUrl}/candidate_languages`);
            return res.data;
        } catch (error: any) {
            throw new Error("Failed to fetch candidate languages");
        }
    },
    getCandidateById: async (id: string) => {
        try {
            const res = await axios.get(`${baseUrl}/candidates/${id}`);
            return res.data;
        } catch (error: any) {
            throw new Error("Failed to fetch candidate detail");
        }
    },
};