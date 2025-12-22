import { Avatar, Tag } from "antd";

import { FavoriteAndScheduleCan } from "./FavoriteAndScheduleCan";

interface PropsType {
    data: any;
}

export const InformationCan = ({ data }: PropsType) => {
    return (
        <>
            <div className="max-w-7xl mx-auto flex justify-between items-center gap-4 mb-12">
                <div className="flex gap-4">
                    <Avatar size={64} className="bg-gray-100" />
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-semibold m-0">{data.name}</h2>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <div className="text-white bg-[#0BA02C] rounded px-3 py-1 text-xs font-bold">{data.position}</div>

                            <Tag color="blue" className=" text-xs rounded-2xl! font-medium!">
                                {data.level}
                            </Tag>
                        </div>
                    </div>
                </div>
                <FavoriteAndScheduleCan/>
            </div>
        </>
    );
};
