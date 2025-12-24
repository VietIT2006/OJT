import { Avatar, Tag, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { FavoriteAndScheduleBusiness } from "./FavoriteAndScheduleBusiness";
import type { Company } from "../../../../types/business.type";

interface PropsType {
    data: Company;
    isOwner?: boolean;
    onEdit?: () => void;
}

export const InformationBusiness = ({ data, isOwner = false, onEdit }: PropsType) => {
    return (
        <div className="max-w-7xl mx-auto mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Avatar size={64} src={data.logo || undefined} className="bg-white border" />
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-semibold m-0">{data.name}</h2>
                            {data.follower > 100 && (
                                <span className="text-sm text-[#E05151] bg-[#FCEEEE] px-2 py-1 rounded">Featured</span>
                            )}
                        </div>
                        <div className="flex gap-2 mt-2 items-center">
                            {data.website && (
                                <a href={data.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
                                    {data.website}
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    {isOwner && onEdit && (
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={onEdit}
                            size="large"
                        >
                            Cập nhật thông tin
                        </Button>
                    )}
                    {!isOwner && <FavoriteAndScheduleBusiness />}
                </div>
            </div>
        </div>
    );
};
