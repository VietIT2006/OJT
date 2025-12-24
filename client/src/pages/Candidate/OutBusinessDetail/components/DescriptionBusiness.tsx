import { useState } from "react";
import { Card, Button, Space, Input, List, Tag, message, Dropdown, Menu, Pagination } from "antd";
import { LinkedinFilled, FacebookFilled, TwitchFilled, MailFilled, EnvironmentOutlined, MoreOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faBookmark, faFileLines, faLink, faLocationArrow, faMapLocation, faSearch } from "@fortawesome/free-solid-svg-icons";
import type { Company, Job as BusinessJob } from "../../../../types/business.type";
import { businessApi } from "../../../../apis/businessApi";
import { ModalConfirmDeleteJob } from "../../../../components/business/ModalConfirmDeleteJob";


interface PropsType {
    data: Company;
    jobs: BusinessJob[];
    isOwner?: boolean;
    onAddJob?: () => void;
    onJobUpdated?: () => void;
}

export const DescriptionBusiness = ({ data, jobs, isOwner = false, onAddJob, onJobUpdated }: PropsType) => {
    const [searchText, setSearchText] = useState("");
    const [deleteJobId, setDeleteJobId] = useState<string | null>(null);
    const [deleteJobTitle, setDeleteJobTitle] = useState<string>("");
    const [deleting, setDeleting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchText.toLowerCase())
    );

    // Tính toán jobs cho trang hiện tại
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
                                    setCurrentPage(1); // Reset về trang 1 khi search
                                }}
                            />
                        </div>

                        {filteredJobs.length === 0 ? (
                            <div className="text-center py-10 text-gray-500">
                                {jobs.length === 0 ? "Chưa có công việc nào" : "Không tìm thấy công việc phù hợp"}
                            </div>
                        ) : (
                            <>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={paginatedJobs}
                                    renderItem={(item) => (
                                    <List.Item className="mb-4">
                                        <div className="w-full border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="font-medium text-lg mb-2">{item.title}</div>
                                                    <div className="flex gap-3 mb-2">
                                                        <Tag color="blue" className="text-sm">
                                                            {item.type_job_id}
                                                        </Tag>
                                                        {item.salary && (
                                                            <div className="text-sm text-gray-500">
                                                                Lương: {item.salary}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        <EnvironmentOutlined className="mr-1" />
                                                        {item.location_id}
                                                    </div>
                                                    {item.expire_at && (
                                                        <div className="text-xs text-gray-400 mt-2">
                                                            Hết hạn: {new Date(item.expire_at).toLocaleDateString('vi-VN')}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex gap-2">
                                                    {!isOwner && (
                                                        <Button type="text" icon={<FontAwesomeIcon icon={faBookmark} />} />
                                                    )}
                                                    {isOwner && (
                                                        <Dropdown overlay={getJobMenu(item)} trigger={['click']}>
                                                            <Button type="text" icon={<MoreOutlined />} />
                                                        </Dropdown>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </List.Item>
                                )}
                            />
                            
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
                            <FontAwesomeIcon icon={faLocationArrow} className="text-[#BC2228] mr-2" /> Thông tin công ty
                        </h4>
                        <div className="text-sm text-gray-600 space-y-2">
                            {data.size && <div>Quy mô: {data.size}</div>}
                            {data.website && (
                                <div>
                                    Website: <a href={data.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                        {data.website}
                                    </a>
                                </div>
                            )}
                        </div>
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
                                        navigator.clipboard.writeText(window.location.href);
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

                    {data.website && (
                        <Card className="text-center">
                            <div className="mb-3">
                                <div className="inline-block p-3 bg-gray-50 rounded-md">
                                    <FontAwesomeIcon icon={faFileLines} className="text-3xl text-[#BC2228]" />
                                </div>
                                <div className="mb-4 text-[16px] font-medium">Truy cập trang công ty</div>
                            </div>
                            <Button 
                                type="primary" 
                                block 
                                className="bg-[#BC2228] border-0! font-medium!" 
                                size="large"
                                onClick={() => window.open(data.website!, '_blank')}
                            >
                                Truy cập
                            </Button>
                        </Card>
                    )}
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
