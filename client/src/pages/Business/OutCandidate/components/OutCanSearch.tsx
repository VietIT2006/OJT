import { faFilter, faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Input, Select } from "antd";
import { useEffect, useState } from "react";

type FilterState = {
    technology?: string;
    level?: string;
    language?: string;
    industry?: string;
};

interface Props {
    initialSearch: string;
    initialCity: string;
    initialFilters: FilterState;
    onSubmit: (values: { search: string; city: string; filters: FilterState }) => void;
    filterOptions: {
        cityOptions: string[];
        technologyOptions: string[];
        levelOptions: string[];
        languageOptions: string[];
        industryOptions: string[];
    };
}

export const OutCanSearch = ({ initialSearch, initialCity, initialFilters, onSubmit, filterOptions }: Props) => {
    const [openFilter, setOpenFilter] = useState(false);
    const [search, setSearch] = useState(initialSearch);
    const [city, setCity] = useState(initialCity);
    const [filters, setFilters] = useState<FilterState>(initialFilters);

    useEffect(() => {
        setSearch(initialSearch);
    }, [initialSearch]);

    useEffect(() => {
        setCity(initialCity);
    }, [initialCity]);

    useEffect(() => {
        setFilters(initialFilters);
    }, [initialFilters]);

    const handleSubmit = () => {
        onSubmit({ search, city, filters });
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
                            placeholder="Tìm kiếm theo: Tên, Công nghệ, Vị trí ứng tuyển..."
                            className="w-full md:w-96 border-0!"
                            size="large"
                            allowClear
                        />
                        <Divider orientation="vertical" className="h-10!" />
                        <Select
                            value={city || undefined}
                            onChange={(val) => setCity(val || "")}
                            allowClear
                            placeholder="Thành phố"
                            className="w-full md:w-40"
                            size="large"
                            options={filterOptions.cityOptions.map((c) => ({ label: c, value: c }))}
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
                            Tìm Ứng Viên
                        </Button>
                    </div>
                </div>
            </div>
            {openFilter && (
                <div className="bg-white rounded-lg shadow border border-gray-200 p-4 mb-6">
                    <div className="flex flex-wrap justify-around gap-2 items-center">
                        <Select
                            value={filters.industry || undefined}
                            onChange={(val) => setFilters((prev) => ({ ...prev, industry: val || undefined }))}
                            className="border-0! rounded-0! bg-[#F1F2F4]!"
                            size="large"
                            placeholder="Ngành nghề"
                            allowClear
                            options={filterOptions.industryOptions.map((i) => ({ label: i, value: i }))}
                        />
                        <Select
                            value={filters.technology || undefined}
                            onChange={(val) => setFilters((prev) => ({ ...prev, technology: val || undefined }))}
                            className="border-0! rounded-0! bg-[#F1F2F4]!"
                            size="large"
                            placeholder="Công Nghệ Sử Dụng"
                            allowClear
                            options={filterOptions.technologyOptions.map((t) => ({ label: t, value: t }))}
                        />
                        <Select
                            value={filters.level || undefined}
                            onChange={(val) => setFilters((prev) => ({ ...prev, level: val || undefined }))}
                            className="border-0! rounded-0! bg-[#F1F2F4]!"
                            size="large"
                            placeholder="Cấp Bậc"
                            allowClear
                            options={filterOptions.levelOptions.map((l) => ({ label: l, value: l }))}
                        />
                        <Select
                            value={filters.language || undefined}
                            onChange={(val) => setFilters((prev) => ({ ...prev, language: val || undefined }))}
                            className="border-0! rounded-0! bg-[#F1F2F4]!"
                            size="large"
                            placeholder="Ngoại Ngữ"
                            allowClear
                            options={filterOptions.languageOptions.map((lng) => ({ label: lng, value: lng }))}
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
