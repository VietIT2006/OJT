import { useEffect, useState } from "react";
import { Spin, message } from "antd";
import { OutBusinessSearch } from "./components/OutBusinessSearch";
import { OutBusinessCards } from "./components/OutBusinessCards";
import { businessApi, CompanySearchParams } from "../../../apis/businessApi";
import type { Company } from "../../../types/business.type";

const OutBusinessMain = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState<CompanySearchParams>({});

    useEffect(() => {
        fetchCompanies();
    }, [searchParams]);

    const fetchCompanies = async () => {
        setLoading(true);
        try {
            const data = await businessApi.getCompanies(searchParams);
            setCompanies(data);
        } catch (error: any) {
            message.error(error.message || "Không thể tải danh sách công ty");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (params: CompanySearchParams) => {
        setSearchParams(params);
    };

    return (
        <div className="p-15">
            <OutBusinessSearch onSearch={handleSearch} />
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Spin size="large" />
                </div>
            ) : (
                <OutBusinessCards data={companies} />
            )}
        </div>
    );
};

export default OutBusinessMain;