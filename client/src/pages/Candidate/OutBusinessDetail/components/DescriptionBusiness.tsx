import { useState, useEffect } from "react";
import { Card, Button, Space, Input, List, Tag, message, Dropdown, Menu, Pagination } from "antd";
import { LinkedinFilled, FacebookFilled, TwitchFilled, MailFilled, EnvironmentOutlined, MoreOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faBookmark, faFileLines, faLink, faLocationArrow, faMapLocation, faSearch } from "@fortawesome/free-solid-svg-icons";
import type { Company, Job as BusinessJob, Location, TypeJob } from "../../../../types/business.type";
import { businessApi } from "../../../../apis/businessApi";
import { ModalConfirmDeleteJob } from "../../../../components/business/ModalConfirmDeleteJob";
import { useNavigate } from "react-router";


interface PropsType {
    data: Company;
    jobs: BusinessJob[];
    isOwner?: boolean;
    onAddJob?: () => void;
    onJobUpdated?: () => void;
}

export const DescriptionBusiness = ({ data, jobs, isOwner = false, onAddJob, onJobUpdated }: PropsType) => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [deleteJobId, setDeleteJobId] = useState<string | null>(null);
    const [deleteJobTitle, setDeleteJobTitle] = useState<string>("");
    const [deleting, setDeleting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [locations, setLocations] = useState<Location[]>([]);
    const [typeJobs, setTypeJobs] = useState<TypeJob[]>([]);
    const pageSize = 6;

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const [locationsData, typeJobsData] = await Promise.all([
                    businessApi.getLocations(),
                    businessApi.getTypeJobs()
                ]);
                setLocations(locationsData);
                setTypeJobs(typeJobsData);
            } catch (error) {
                console.error("Failed to fetch metadata:", error);
            }
        };
        fetchMetadata();
    }, []);

    const getLocationName = (locationId: string) => {
        const location = locations.find(loc => loc.id === locationId);
        return location?.name || locationId;
    };

    const getTypeJobName = (typeJobId: string) => {
        const typeJob = typeJobs.find(type => type.id === typeJobId);
        return typeJob?.name || typeJobId;
    };

    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteJob = async () => {
        if (!deleteJobId) return;
        
        setDeleting(true);
        try {
            await businessApi.deleteJob(deleteJobId);
            message.success("Xóa công việc thành công!");
            setDeleteJobId(null);
            if (onJobUpdated) onJobUpdated();
        } catch (error: any) {
            message.error(error.message || "Xóa công việc thất bại!");
        } finally {
            setDeleting(false);
        }
    };

    const getJobMenu = (job: BusinessJob) => (
        <Menu>
            <Menu.Item 
                key="edit" 
                icon={<EditOutlined />}
                onClick={() => {
                    message.info("Chức năng chỉnh sửa đang phát triển");
                }}
            >
                Chỉnh sửa
            </Menu.Item>
            <Menu.Item 
                key="delete" 
                icon={<DeleteOutlined />} 
                danger
                onClick={() => {
                    setDeleteJobId(job.id);
                    setDeleteJobTitle(job.title);
                }}
            >
                Xóa
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-16">
                <div className="lg:col-span-2">
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Mô tả về công ty</h3>
                        <p className="text-sm text-gray-700 leading-relaxed mb-4">
                            {data.description || "Chưa có mô tả"}
                        </p>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold">Việc làm công ty đang mở ({jobs.length})</h3>
                            {isOwner && onAddJob && (
                                <Button 
                                    type="primary" 
                                    icon={<PlusOutlined />}
                                    onClick={onAddJob}
                                    className="bg-[#BC2228]! border-0!"
                                >
                                    Thêm việc làm
                                </Button>
                            )}
                        </div>

                        <div className="mb-4 p-4 border border-gray-300 rounded shadow">
                            <Input
                                prefix={<FontAwesomeIcon icon={faSearch} className="text-[#BC2228]!" />}
                                placeholder="Tìm kiếm công việc..."
                                className="border-0!"
                                size="large"
                                value={searchText}
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>

                        {filteredJobs.length === 0 ? (
                            <div className="text-center py-10 text-gray-500">
                                {jobs.length === 0 ? "Chưa có công việc nào" : "Không tìm thấy công việc phù hợp"}
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col gap-4">
                                    {paginatedJobs.map((item) => (
                                        <div key={item.id} className="bg-white p-5 rounded-lg border border-gray-100 hover:border-red-300 transition-all flex justify-between items-start" onClick={() => navigate(`/job/${item.id}`)}>
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center font-bold text-blue-600">
                                                    {data.logo ? <img src={data.logo} alt={data.name} className="w-10 h-10 object-contain" /> : data.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-800 text-lg mb-1">{item.title}</h4>
                                                    <div className="flex gap-2 text-xs my-1 items-center">
                                                        <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase font-semibold">
                                                            {getTypeJobName(item.type_job_id)}
                                                        </span>
                                                        <span className="text-gray-500 italic">Salary: {item.salary || 'Negotiable'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-400 text-sm mt-2">
                                                        <EnvironmentOutlined />
                                                        <span>{getLocationName(item.location_id)}</span>
                                                    </div>
                                                    {item.expire_at && (
                                                        <div className="text-xs text-gray-400 mt-2">
                                                            Hết hạn: {new Date(item.expire_at).toLocaleDateString('vi-VN')}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                {!isOwner && (
                                                    <Button type="text" icon={<FontAwesomeIcon icon={faBookmark} />} />
                                                )}
                                                {isOwner && (
                                                    <>
                                                        <Button type="text" icon={<EditOutlined />} onClick={() => message.info('Chức năng chỉnh sửa đang phát triển')} />
                                                        <Button type="text" icon={<DeleteOutlined />} danger onClick={() => { setDeleteJobId(item.id); setDeleteJobTitle(item.title); }} />
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            
                            {filteredJobs.length > pageSize && (
                                <div className="flex justify-center mt-6">
                                    <Pagination
                                        current={currentPage}
                                        total={filteredJobs.length}
                                        pageSize={pageSize}
                                        onChange={handlePageChange}
                                        showSizeChanger={false}
                                        showTotal={(total) => `Tổng ${total} công việc`}
                                    />
                                </div>
                            )}
                        </>
                        )}
                    </div>
                </div>

                <Space direction="vertical" size={16} className="w-full">
                    <Card>
                        <h4 className="font-medium! mb-3 text-[16px]!">
                            <FontAwesomeIcon icon={faLocationArrow} className="text-[#BC2228] mr-2" /> Địa chỉ công ty
                        </h4>
                        <div className="text-sm text-gray-600 space-y-2">
                           {data.address || "Chưa có địa chỉ"}
                        </div>
                    </Card>
                    
                    <Card>
                        <h4 className="font-medium! mb-3 text-[16px]!">
                            <FontAwesomeIcon icon={faAddressCard} className="text-[#BC2228] mr-2" /> Xem trên Map
                        </h4>
                        <iframe
                            title="Company Location"
                            src={`https://www.google.com/maps?q=${encodeURIComponent(data.address || '')}&output=embed`}
                            width="100%"
                            height="200"
                            className="border-0 rounded"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </Card>
                    <Card>
                        <h4 className="font-medium! mb-3 text-[16px]!">
                            <FontAwesomeIcon icon={faAddressCard} className="text-[#BC2228] mr-2" /> Chia sẻ thông tin công ty
                        </h4>
                        <Space direction="vertical" size={8} className="w-full">
                            <div className="flex gap-2 flex-wrap">
                                <Button
                                    type="default"
                                    size="large"
                                    className="bg-[#EFC3C4]! text-[#BC2228]! font-bold! border-0!"
                                    icon={<FontAwesomeIcon icon={faLink} />}
                                    onClick={() => {
                                        navigator.clipboard.writeText(data.website || '');
                                        message.success("Đã copy link!");
                                    }}
                                >
                                    Copy Link
                                </Button>
                                {data.link_linkedin && (
                                    <Button
                                        type="default"
                                        size="large"
                                        className="bg-[#EFC3C4]! text-[#BC2228]! font-bold! border-0!"
                                        icon={<LinkedinFilled />}
                                        onClick={() => window.open(data.link_linkedin!, '_blank')}
                                    />
                                )}
                                {data.link_fb && (
                                    <Button
                                        type="default"
                                        size="large"
                                        className="bg-[#EFC3C4]! text-[#BC2228]! font-bold! border-0!"
                                        icon={<FacebookFilled />}
                                        onClick={() => window.open(data.link_fb!, '_blank')}
                                    />
                                )}
                            </div>
                        </Space>
                    </Card>
                </Space>
            </div>

            <ModalConfirmDeleteJob
                open={!!deleteJobId}
                onConfirm={handleDeleteJob}
                onCancel={() => setDeleteJobId(null)}
                jobTitle={deleteJobTitle}
            />
        </>
    );
};
