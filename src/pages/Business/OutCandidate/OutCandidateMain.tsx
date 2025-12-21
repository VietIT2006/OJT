import { OutCanSearch } from "./components/OutCanSearch";
import { OutCanCards } from "./components/OutCanCards";

const candidates = Array(9).fill({
    name: "Nguyen Van A",
    position: "Front-end",
    level: "Fresher",
    tech: ["REACTJS", "NODE.JS"],
    language: "N2",
    location: "Ha Noi, Viet Nam",
});

const OutCandidateMain = () => {
    return (
        <div className="p-15">
            <OutCanSearch/>
            <OutCanCards data={candidates} />
        </div>
    );
};

export default OutCandidateMain;