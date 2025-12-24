import axios from "axios";
import { Company } from "../types/business.type";

const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const companiesApi = {
    // Lấy danh sách tất cả công ty
    getCompanies: async (): Promise<Company[]> => {
        try {
            const res = await axios.get(`${baseUrl}/companies`);
            return res.data;
        } catch (error: any) {
            throw new Error("Không thể tải danh sách công ty");
        }
    },


    getCompanyById: async (id: string): Promise<Company> => {
        try {
            const res = await axios.get(`${baseUrl}/companies/${id}`);
            return res.data;
        } catch (error: any) {
            throw new Error("Không thể tải thông tin chi tiết công ty");
        }
    },

    // Lấy thông tin địa chỉ của các công ty
    getCompanyAddresses: async () => {
        try {
            const res = await axios.get(`${baseUrl}/address_companies`);
            return res.data;
        } catch (error: any) {
            throw new Error("Không thể tải địa chỉ công ty");
        }
    },

    // Lấy danh sách loại hình công ty (Product, Outsourcing, v.v.)
    getCompanyTypes: async () => {
        try {
            const res = await axios.get(`${baseUrl}/type_companies`);
            return res.data;
        } catch (error: any) {
            throw new Error("Không thể tải loại hình công ty");
        }
    }
};