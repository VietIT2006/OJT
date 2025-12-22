import { OutBusinessSearch } from "./components/OutBusinessSearch";
import { OutBusinessCards} from "./components/OutBusinessCards";

const candidates = Array(9).fill({
    name: "Dribbble",
    featured: true,
    level: "Fresher",
    location: "Ha Noi, Viet Nam",
});

const OutBusinessMain = () => {
    return (
        <div className="p-15">
            <OutBusinessSearch/>
            <OutBusinessCards data={candidates} />
        </div>
    );
};

export default OutBusinessMain;