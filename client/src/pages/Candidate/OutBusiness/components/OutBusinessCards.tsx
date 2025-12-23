import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Tag } from "antd";
import React from "react";
import { useNavigate } from "react-router";

interface PropsType {
    data: Array<any>;
}

export const OutBusinessCards = ({ data }: PropsType) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {data.map((c, idx) => (
                <Card key={idx} className="border border-gray-200! rounded-lg group cursor-pointer">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-16 h-16 bg-gray-200 rounded-xl" />
                        <div className="flex gap-2 flex-1 flex-col">
                            <div className="flex gap-2">
                                <div className="font-semibold text-lg group-hover:text-[#BC2228]">{c.name}</div>
                                {c.featured && <div className="bg-[#FCEEEE] text-[#E05151] rounded px-3 py-1 text-xs font-bold">Featured</div>}
                            </div>
                            <div className="flex items-center text-gray-500 text-xs">
                                <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                                {c.location}
                            </div>
                        </div>
                    </div>
                    <Button type="primary" block className="bg-[#E7F0FA]! text-[#0A65CC]! border-0! font-medium! mt-4" size="large" onClick={() => navigate(`/candidate/out-business/${c.id}`)}>
                        Open Position (3)
                    </Button>
                </Card>
            ))}
        </div>
    );
};
