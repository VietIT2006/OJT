import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Card, Empty, Spin, message } from "antd";
import { useSelector } from "react-redux";
import { DescriptionBusiness } from "./components/DescriptionBusiness";
import { InformationBusiness } from "./components/InformationBusiness";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { businessApi } from "../../../apis/businessApi";
import type { Company, Job as BusinessJob } from "../../../types/business.type";
import { RootState } from "../../../store";
import { ModalUpdateCompany } from "../../../components/business/ModalUpdateCompany";
import { ModalAddJob } from "../../../components/business/ModalAddJob";

export const OutBusinessDetailMain = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { userId, role } = useSelector((state: RootState) => state.user);

    const [company, setCompany] = useState<Company | null>(null);
    const [jobs, setJobs] = useState<BusinessJob[]>([]);
    const [similarCompanies, setSimilarCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showAddJobModal, setShowAddJobModal] = useState(false);    

    useEffect(() => {
        if (id) {
            fetchCompanyDetail();
        }
    }, [id]);

    const fetchCompanyDetail = async () => {
        if (!id) return;
        
        setLoading(true);
        try {
            const companyData = await businessApi.getCompanyById(id);
            setCompany(companyData);

            if (role === "business" && userId) {
                console.log(role, userId);
                
                const ownerCheck = await businessApi.checkCompanyOwnership(id, userId);
                console.log(ownerCheck);
                
                setIsOwner(ownerCheck);
            }

            const jobsData = await businessApi.getJobs({ company_id: id });
            setJobs(jobsData);

            if (companyData.type_company_id) {
                const similar = await businessApi.getCompanies({ 
                    type_company_id: companyData.type_company_id,
                    _limit: 6 
                });
                setSimilarCompanies(similar.filter((c: Company) => c.id !== id));
            }
        } catch (error: any) {
            message.error(error.message || "Không thể tải thông tin công ty");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateSuccess = () => {
        setShowUpdateModal(false);
        fetchCompanyDetail(); 
    };

    const handleAddJobSuccess = () => {
        setShowAddJobModal(false);
        fetchCompanyDetail(); 
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (!company) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Không tìm thấy thông tin công ty</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <InformationBusiness 
                data={company} 
                isOwner={isOwner}
                onEdit={() => setShowUpdateModal(true)}
            />
            <DescriptionBusiness 
                data={company} 
                jobs={jobs}
                isOwner={isOwner}
                onAddJob={() => setShowAddJobModal(true)}
                onJobUpdated={fetchCompanyDetail}
            />

            <div className="max-w-7xl mx-auto mt-12">
                <h3 className="text-xl font-semibold mb-6">Công ty cùng lĩnh vực</h3>
                <div className="flex mx-auto">
                    {similarCompanies.length === 0 && <Empty description="Không có công ty tương tự" />}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {similarCompanies && similarCompanies.map((c) => (
                        <Card key={c.id} className="border border-gray-200! rounded-lg">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-16 h-16 bg-gray-200 rounded-xl" />
                                <div className="flex gap-2 flex-1 flex-col">
                                    <div className="flex gap-2">
                                        <div className="font-semibold text-lg">{c.name}</div>
                                    </div>
                                    <div className="flex items-center text-gray-500 text-xs">
                                        <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                                        {c.size || "N/A"}
                                    </div>
                                </div>
                            </div>
                            <Button
                                type="primary"
                                block
                                className="bg-[#E7F0FA]! text-[#0A65CC]! border-0! font-medium! mt-4"
                                size="large"
                                onClick={() => navigate(`/candidate/outstanding-company/${c.id}`)}
                            >
                                Xem chi tiết
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
            {isOwner && company && (
                <>
                    <ModalUpdateCompany
                        open={showUpdateModal}
                        onCancel={() => setShowUpdateModal(false)}
                        onSuccess={handleUpdateSuccess}
                        company={company}
                    />
                    <ModalAddJob
                        open={showAddJobModal}
                        onCancel={() => setShowAddJobModal(false)}
                        onSuccess={handleAddJobSuccess}
                        companyId={company.id}
                    />
                </>
            )}
        </div>
    );
};

export default OutBusinessDetailMain;
