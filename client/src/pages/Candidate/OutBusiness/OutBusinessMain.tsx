import { useCallback, useEffect, useMemo, useState } from "react";
import { Empty, Spin, message, Pagination } from "antd";
import { OutBusinessSearch } from "./components/OutBusinessSearch";
import { OutBusinessCards } from "./components/OutBusinessCards";
import { businessApi } from "../../../apis/businessApi";
import type { Company, TypeCompany, Location } from "../../../types/business.type";

type FilterState = {
    typeCompanyId?: string;
};

const defaultFilters: FilterState = {};

const OutBusinessMain = () => {
    const [allCompanies, setAllCompanies] = useState<Company[]>([]);
    const [positionsMap, setPositionsMap] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(false);
    const [appliedSearch, setAppliedSearch] = useState("");
    const [appliedLocation, setAppliedLocation] = useState("");
    const [appliedFilters, setAppliedFilters] = useState<FilterState>(defaultFilters);
    const [page, setPage] = useState(1);
    const [typeCompanies, setTypeCompanies] = useState<TypeCompany[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const pageSize = 9;

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [companiesData, jobsData, typesData, locsData] = await Promise.all([
                businessApi.getCompanies(),
                businessApi.getJobs(),
                businessApi.getTypeCompanies(),
                businessApi.getLocations(),
            ]);

            setAllCompanies(companiesData);
            setTypeCompanies(typesData);
            setLocations(locsData);

            const map: Record<string, number> = {};
            jobsData.forEach((job: any) => {
                if (!map[job.company_id]) map[job.company_id] = 0;
                map[job.company_id]++;
            });
            setPositionsMap(map);
        } catch (error: any) {
            message.error(error.message || "Không thể tải dữ liệu");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const filterOptions = useMemo(() => {
        const locationOptions = Array.from(
            new Set(
                allCompanies
                    .map((c) => {
                        if (!c.address) return "";
                        const parts = c.address.split(",").map((p) => p.trim());
                        return parts[parts.length - 1] || ""; 
                    })
                    .filter(Boolean)
            )
        );
        const typeCompanyOptions = typeCompanies.map((t) => ({
            label: t.name,
            value: t.id,
        }));
        return { locationOptions, typeCompanyOptions };
    }, [allCompanies, typeCompanies]);

    const filteredCompanies = useMemo(() => {
        return allCompanies.filter((company) => {
            const searchLower = appliedSearch.toLowerCase();
            const matchName = !appliedSearch || company.name.toLowerCase().includes(searchLower);
            
            let matchLocation = true;
            if (appliedLocation && company.address) {
                const parts = company.address.split(",").map((p) => p.trim());
                const city = parts[parts.length - 1] || "";
                matchLocation = city === appliedLocation;
            }
            
            const matchType = !appliedFilters.typeCompanyId || company.type_company_id === appliedFilters.typeCompanyId;
            return matchName && matchLocation && matchType;
        });
    }, [allCompanies, appliedSearch, appliedLocation, appliedFilters]);

    const totalPages = Math.ceil(filteredCompanies.length / pageSize);
    const paginatedCompanies = filteredCompanies.slice((page - 1) * pageSize, page * pageSize);

    const handleSubmit = (values: { search: string; location: string; filters: FilterState }) => {
        setAppliedSearch(values.search);
        setAppliedLocation(values.location);
        setAppliedFilters(values.filters);
        setPage(1);
    };

    return (
        <div className="p-15">
            <OutBusinessSearch
                initialSearch={appliedSearch}
                initialLocation={appliedLocation}
                initialFilters={appliedFilters}
                onSubmit={handleSubmit}
                filterOptions={filterOptions}
            />
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Spin size="large" />
                </div>
            ) : paginatedCompanies.length > 0 ? (
                <>
                    <div className="grid grid-cols-3 gap-6 mt-6">
                        {paginatedCompanies.map((company) => (
                            <OutBusinessCards
                                key={company.id}
                                logo={company.logo}
                                id={company.id}
                                name={company.name}
                                featured={company.featured}
                                location={company.address}
                                positions_quantity={positionsMap[company.id] || 0}
                            />
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8">
                            <Pagination
                                current={page}
                                total={filteredCompanies.length}
                                pageSize={pageSize}
                                onChange={(p) => setPage(p)}
                                showSizeChanger={false}
                            />
                        </div>
                    )}
                </>
            ) : (
                <Empty description="Không có công ty phù hợp" className="mt-20" />
            )}
        </div>
    );
};

export default OutBusinessMain;
