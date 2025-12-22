import { faFilter, faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Input, Select } from "antd";
import React, { useState } from "react";

export const OutBusinessSearch = () => {
    const [openFilter, setOpenFilter] = useState(false);

    return (
        <>
            <div className="bg-white rounded-lg border border-gray-500 p-4 mb-4 shadow">
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
                    <div className="flex flex-1 gap-2 items-center">
                        <Input
                            prefix={<FontAwesomeIcon icon={faSearch} className="text-[#BC2228]!" />}
                            placeholder="Tìm kiếm theo: Tên công ty"
                            className="w-full md:w-96 border-0!"
                            size="large"
                        />
                        <Divider orientation="vertical" className="h-10!" />
                        <Input
                            prefix={<FontAwesomeIcon icon={faLocationDot} className="text-[#BC2228]!" />}
                            placeholder="Thành phố"
                            className="w-40 border-0!"
                            size="large"
                        />
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0">
                        <Button
                            onClick={() => setOpenFilter(!openFilter)}
                            icon={<FontAwesomeIcon icon={faFilter} className="text-[#BC2228]!" />}
                            className="flex! items-center"
                            size="large"
                        >
                            Lọc
                        </Button>
                        <Button type="primary" className="bg-[#BC2228]! border-0!" size="large">
                            Tìm Công ty
                        </Button>
                    </div>
                </div>
            </div>
            {openFilter && (
                <div className="bg-white rounded-lg shadow border border-gray-400 p-4 mb-6">
                    <div className="flex flex-wrap justify-around gap-2 items-center">
                        <Select className="border-0! rounded-0! bg-[#F1F2F4]!" size="large" placeholder="Lĩnh vực" allowClear />
                        <Select className="border-0! rounded-0! bg-[#F1F2F4]!" size="large" placeholder="Quy mô" allowClear />
                        <Select className="border-0! rounded-0! bg-[#F1F2F4]!" size="large" placeholder="Số lượt tim" allowClear />
                        <Button className="border-none! bg-[#BC2228]! text-white! ml-2" size="large">
                            Lọc
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};
