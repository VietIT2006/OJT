import { useCallback, useEffect, useMemo, useState } from "react";
import { OutCanSearch } from "./components/OutCanSearch";
import { OutCanCards, CandidateCard } from "./components/OutCanCards";
import { candidateApi } from "../../../apis/candidateApi";
import { Pagination } from "antd";

type FilterState = {
    technology?: string;
    level?: string;
    language?: string;
    industry?: string;
};

const defaultFilters: FilterState = {};

const OutCandidateMain = () => {
    const [cards, setCards] = useState<CandidateCard[]>([]);
    const [appliedSearch, setAppliedSearch] = useState("");
    const [appliedCity, setAppliedCity] = useState("");
    const [appliedFilters, setAppliedFilters] = useState<FilterState>(defaultFilters);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize = 9;

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [candidates, skills, experiences, languages] = await Promise.all([
                candidateApi.getCandidates(),
                candidateApi.getCandidateSkills(),
                candidateApi.getCandidateExperiences(),
                candidateApi.getCandidateLanguages(),
            ]);

            const skillMap = skills.reduce((acc: Record<string, string[]>, s: any) => {
                const key = String(s.candidate_id);
                acc[key] = acc[key] ? [...acc[key], s.name] : [s.name];
                return acc;
            }, {});

            const languageMap = languages.reduce((acc: Record<string, string[]>, l: any) => {
                const key = String(l.candidate_id);
                const value = l.type && l.value ? `${l.type} ${l.value}` : l.type || l.value || "";
                if (!value) return acc;
                acc[key] = acc[key] ? [...acc[key], value] : [value];
                return acc;
            }, {});

            const experienceMap = experiences.reduce((acc: Record<string, any>, e: any) => {
                const key = String(e.candidate_id);
                const prev = acc[key];
                if (!prev) {
                    acc[key] = e;
                } else {
                    const prevDate = prev.end_at ? new Date(prev.end_at).getTime() : 0;
                    const curDate = e.end_at ? new Date(e.end_at).getTime() : 0;
                    if (curDate >= prevDate) acc[key] = e;
                }
                return acc;
            }, {});

            const mapped: CandidateCard[] = candidates.map((c: any) => {
                const tech = skillMap[c.id] || [];
                const exp = experienceMap[c.id];
                const languagesText = languageMap[c.id]?.join(", ") || "";
                const position = c.role || exp?.position || "Ứng viên";
                const location = c.address || "";
                const level = exp ? "Experienced" : "Fresher";
                return {
                    id: String(c.id),
                    name: c.name || c.email || "Ứng viên",
                    position,
                    level,
                    tech,
                    language: languagesText,
                    location,
                };
            });

            setCards(mapped);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const filterOptions = useMemo(() => {
        const cityOptions = Array.from(new Set(cards.map((c) => c.location).filter(Boolean)));
        const technologyOptions = Array.from(new Set(cards.flatMap((c) => c.tech))).filter(Boolean);
        const levelOptions = Array.from(new Set(cards.map((c) => c.level))).filter(Boolean);
        const languageOptions = Array.from(
            new Set(cards.flatMap((c) => (c.language ? c.language.split(", ").filter(Boolean) : [])))
        );
        const industryOptions = ["Frontend", "Backend", "Fullstack", "Mobile", "QA", "PM", "DevOps", "Data", "UIUX"]; // preset
        return { cityOptions, technologyOptions, levelOptions, languageOptions, industryOptions };
    }, [cards]);

    const filteredCards = useMemo(() => {
        return cards.filter((c) => {
            const matchSearch = appliedSearch
                ? `${c.name} ${c.position} ${c.tech.join(" ")}`.toLowerCase().includes(appliedSearch.toLowerCase())
                : true;
            const matchCity = appliedCity ? (c.location || "").toLowerCase().includes(appliedCity.toLowerCase()) : true;
            const matchTech = appliedFilters.technology ? c.tech.includes(appliedFilters.technology) : true;
            const matchLevel = appliedFilters.level ? c.level === appliedFilters.level : true;
            const matchLang = appliedFilters.language ? c.language.includes(appliedFilters.language) : true;
            const matchIndustry = appliedFilters.industry
                ? c.position?.toLowerCase().includes(appliedFilters.industry.toLowerCase())
                : true;
            return matchSearch && matchCity && matchTech && matchLevel && matchLang && matchIndustry;
        });
    }, [cards, appliedSearch, appliedCity, appliedFilters]);

    const paginatedCards = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filteredCards.slice(start, start + pageSize);
    }, [filteredCards, page]);

    const handleSubmitFilters = (values: { search: string; city: string; filters: FilterState }) => {
        setAppliedSearch(values.search);
        setAppliedCity(values.city);
        setAppliedFilters(values.filters);
        setPage(1);
    };

    return (
        <div className="p-6 md:p-10">
            <OutCanSearch
                initialSearch={appliedSearch}
                initialCity={appliedCity}
                initialFilters={appliedFilters}
                onSubmit={handleSubmitFilters}
                filterOptions={filterOptions}
            />
            {loading ? <div className="mt-6">Đang tải ứng viên...</div> : <OutCanCards data={paginatedCards} />}
            {!loading && (
                <div className="mt-8 flex justify-center">
                    <Pagination
                        current={page}
                        pageSize={pageSize}
                        total={filteredCards.length}
                        onChange={(p) => setPage(p)}
                        showSizeChanger={false}
                    />
                </div>
            )}
        </div>
    );
};

export default OutCandidateMain;