import { InformationCan } from "./components/InformationCan";
import { DescriptionCan } from "./components/DescriptionCan";

const profile = {
    avatar: "",
    name: "Nguyễn Văn A",
    position: "Front-end",
    level: "Fresher",
    location: "Quận 1, Thành phố Hồ Chí Minh",
    skills: ["ReactJS", "Node.JS", "TypeScript", "JavaScript"],
    languages: ["JAPANESE N2", "TOEIC 700"],
};

export const OutCandidateDetailMain = () => {
    return (
        <div className="p-6">
            <InformationCan data={profile} />
            <DescriptionCan data={profile} />
        </div>
    );
};

export default OutCandidateDetailMain;
