import { faFilter, faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Input, Select } from "antd";
import React, { useState, useEffect } from "react";
import { CompanySearchParams } from "../../../../apis/businessApi";
import { businessApi } from "../../../../apis/businessApi";
import type { TypeCompany, Location } from "../../../../types/business.type";

interface OutBusinessSearchProps {
    onSearch: (params: CompanySearchParams) => void;
}

export const OutBusinessSearch = ({ onSearch }: OutBusinessSearchProps) => {
    const [openFilter, setOpenFilter] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [typeCompanyId, setTypeCompanyId] = useState<string | undefined>();
    const [typeCompanies, setTypeCompanies] = useState<TypeCompany[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        Promise.all([
            businessApi.getTypeCompanies(),
            businessApi.getLocations(),
        ]).then(([types, locs]) => {
            setTypeCompanies(types);
            setLocations(locs);
        }).catch(console.error);
    }, []);

    const handleSearch = () => {
        const params: CompanySearchParams = {};
        if (searchName) params.name = searchName;
        if (searchLocation) params.location = searchLocation;
        if (typeCompanyId) params.type_company_id = typeCompanyId;
        onSearch(params);
    };

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
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            onPressEnter={handleSearch}
                        />
                        <Divider orientation="vertical" className="h-10!" />
                        <Select
                            showSearch
                            allowClear
                            placeholder="Thành phố"
                            className="w-40 border-0!"
                            size="large"
                            value={searchLocation || undefined}
                            onChange={(value) => setSearchLocation(value || "")}
                            filterOption={(input, option) =>
                                (option?.children as string)?.toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {locations.map((loc) => (
                                <Select.Option key={loc.id} value={loc.name}>
                                    {loc.name}
                                </Select.Option>
                            ))}
                        </Select>
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
                        <Button 
                            type="primary" 
                            className="bg-[#BC2228]! border-0!" 
                            size="large"
                            onClick={handleSearch}
                        >
                            Tìm Công ty
                        </Button>
                    </div>
                </div>
            </div>
            {openFilter && (
                <div className="bg-white rounded-lg shadow border border-gray-400 p-4 mb-6">
                    <div className="flex flex-wrap justify-around gap-2 items-center">
                        <Select 
                            className="border-0! rounded-0! bg-[#F1F2F4]!" 
                            size="large" 
                            placeholder="Lĩnh vực" 
                            allowClear
                            value={typeCompanyId}
                            onChange={(value) => setTypeCompanyId(value)}
                        >
                            {typeCompanies.map((type) => (
                                <Select.Option key={type.id} value={type.id}>
                                    {type.name}
                                </Select.Option>
                            ))}
                        </Select>
                        <Button 
                            className="border-none! bg-[#BC2228]! text-white! ml-2" 
                            size="large"
                            onClick={handleSearch}
                        >
                            Lọc
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};
