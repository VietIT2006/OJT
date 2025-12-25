import { faFilter, faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Input, Select } from "antd";
import { useEffect, useState } from "react";

type FilterState = {
    typeCompanyId?: string;
};

interface Props {
    initialSearch: string;
    initialLocation: string;
    initialFilters: FilterState;
    onSubmit: (values: { search: string; location: string; filters: FilterState }) => void;
    filterOptions: {
        locationOptions: string[];
        typeCompanyOptions: Array<{ label: string; value: string }>;
    };
}

export const OutBusinessSearch = ({ initialSearch, initialLocation, initialFilters, onSubmit, filterOptions }: Props) => {
    const [openFilter, setOpenFilter] = useState(false);
    const [search, setSearch] = useState(initialSearch);
    const [location, setLocation] = useState(initialLocation);
    const [filters, setFilters] = useState<FilterState>(initialFilters);

    useEffect(() => {
        setSearch(initialSearch);
    }, [initialSearch]);

    useEffect(() => {
        setLocation(initialLocation);
    }, [initialLocation]);

    useEffect(() => {
        setFilters(initialFilters);
    }, [initialFilters]);

    const handleSubmit = () => {
        onSubmit({ search, location, filters });
        setOpenFilter(false);
    };

    return (
        <>
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 shadow">
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
                    <div className="flex flex-1 gap-2 items-center">
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            prefix={<FontAwesomeIcon icon={faSearch} className="text-[#BC2228]!" />}
                            placeholder="Tìm kiếm theo: Tên công ty, Lĩnh vực..."
                            className="w-full md:w-96 border-0!"
                            size="large"
                            allowClear
                        />
                        <Divider orientation="vertical" className="h-10!" />
                        <Select
                            value={location || undefined}
                            onChange={(val) => setLocation(val || "")}
                            allowClear
                            placeholder="Thành phố"
                            className="w-full md:w-40"
                            size="large"
                            options={filterOptions.locationOptions.map((c) => ({ label: c, value: c }))}
                            showSearch
                            optionFilterProp="label"
                            suffixIcon={<FontAwesomeIcon icon={faLocationDot} className="text-[#BC2228]!" />}
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
                        <Button type="primary" className="bg-[#BC2228]! border-0!" size="large" onClick={handleSubmit}>
                            Tìm Công ty
                        </Button>
                    </div>
                </div>
            </div>
            {openFilter && (
                <div className="bg-white rounded-lg shadow border border-gray-200 p-4 mb-6">
                    <div className="flex flex-wrap justify-around gap-2 items-center">
                        <Select
                            value={filters.typeCompanyId || undefined}
                            onChange={(val) => setFilters((prev) => ({ ...prev, typeCompanyId: val || undefined }))}
                            className="border-0! rounded-0! bg-[#F1F2F4]!"
                            size="large"
                            placeholder="Lĩnh vực công ty"
                            allowClear
                            options={filterOptions.typeCompanyOptions}
                        />
                        <Button className="border-none! bg-[#BC2228]! text-white! ml-2" size="large" onClick={handleSubmit}>
                            Lọc
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};
