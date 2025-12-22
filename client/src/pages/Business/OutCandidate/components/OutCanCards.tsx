import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Tag } from "antd";
import React from "react";
import { useNavigate } from "react-router";

interface PropsType {
    data: Array<any>;
}

export const OutCanCards = ({ data }: PropsType) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {data.map((c, idx) => (
                <Card key={idx} className="border border-gray-200! rounded-lg">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-16 h-16 bg-gray-200 rounded-xl" />
                        <div>
                            <div className="font-semibold text-lg">{c.name}</div>
                            <div className="flex gap-2 mt-1">
                                <div className="text-white bg-[#0BA02C] rounded px-3 py-1 text-xs font-bold">{c.position}</div>
                                <Tag color="blue" className=" text-xs rounded-2xl! font-medium!">
                                    {c.level}
                                </Tag>
                            </div>
                        </div>
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className="ml-auto text-lg cursor-pointer text-[#BC2228]"
                            onClick={() => navigate(`/business/outstanding-candidate/${c.id}`)}
                        />
                    </div>
                    <div className="mb-2 text-sm">
                        <span>Technical in use:</span>
                        {c.tech.map((t) => (
                            <span className="ml-2! bg-[#E7F6EA] text-[#0BA02C] font-medium text-xs py-1 px-2 rounded" key={t}>
                                {t}
                            </span>
                        ))}
                    </div>
                    <div className="mb-2 text-sm pt-3 pb-4">
                        <span>Foreign Language:</span>
                        <span className="text-[#F16A1B] bg-[#FCE1D1] py-1 px-2 ml-2! rounded font-medium text-xs">{c.language}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-xs mt-2">
                        <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                        {c.location}
                    </div>
                </Card>
            ))}
        </div>
    );
};
