import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { InformationCan } from "./components/InformationCan";
import { DescriptionCan } from "./components/DescriptionCan";
import { candidateApi } from "../../../apis/candidateApi";

type DetailProfile = {
    avatar?: string;
    name: string;
    position: string;
    level: string;
    location: string;
    skills: string[];
    languages: string[];
};

export const OutCandidateDetailMain = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState<DetailProfile | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const [candidate, skills, experiences, languages] = await Promise.all([
                    candidateApi.getCandidateById(id),
                    candidateApi.getCandidateSkills(),
                    candidateApi.getCandidateExperiences(),
                    candidateApi.getCandidateLanguages(),
                ]);

                const tech = skills.filter((s) => String(s.candidate_id) === String(id)).map((s) => s.name);
                const lang = languages
                    .filter((l) => String(l.candidate_id) === String(id))
                    .map((l) => (l.type && l.value ? `${l.type} ${l.value}` : l.type || l.value))
                    .filter(Boolean);

                const exp = experiences
                    .filter((e) => String(e.candidate_id) === String(id))
                    .sort((a, b) => new Date(b.end_at || 0).getTime() - new Date(a.end_at || 0).getTime());
                const latestExp = exp[0];

                const mapped: DetailProfile = {
                    avatar: "",
                    name: candidate.name || candidate.email || "Ứng viên",
                    position: candidate.role || latestExp?.position || "Ứng viên",
                    level: latestExp ? "Experienced" : "Fresher",
                    location: candidate.address || "",
                    skills: tech,
                    languages: lang,
                };

                setProfile(mapped);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [id]);

    if (loading) return <div className="p-6">Đang tải hồ sơ...</div>;
    if (!profile) return <div className="p-6">Không tìm thấy ứng viên.</div>;

    return (
        <div className="p-6">
            <InformationCan data={profile} />
            <DescriptionCan data={profile} />
        </div>
    );
};

export default OutCandidateDetailMain;
