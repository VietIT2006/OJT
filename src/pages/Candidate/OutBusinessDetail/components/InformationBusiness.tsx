import { Avatar, Tag } from "antd";
import { FavoriteAndScheduleBusiness } from "./FavoriteAndScheduleBusiness";

interface PropsType {
    data: any;
}

export const InformationBusiness = ({ data }: PropsType) => {
    return (
        <div className="max-w-7xl mx-auto mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Avatar size={64} className="bg-white border" />
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-semibold m-0">{data.name}</h2>
                            <span className="text-sm text-[#E05151] bg-[#FCEEEE] px-2 py-1 rounded">{data.tag}</span>
                        </div>
                        <div className="flex gap-2 mt-2 items-center">
                            <span className="rounded bg-[#0BA02C] text-white px-2 py-1">{data.typeTag}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <FavoriteAndScheduleBusiness />
                </div>
            </div>
        </div>
    );
};
