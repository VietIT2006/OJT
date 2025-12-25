import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "antd";
import { useNavigate } from "react-router";

interface PropsType {
    id: string;
    name: string;
    location: string;
    featured: boolean;
    positions_quantity: number;
    logo: string | null;
}

export const OutBusinessCards = ({ id, name, location, featured, positions_quantity, logo }: PropsType) => {
    const navigate = useNavigate();
    return (
        <Card className="border border-gray-200! rounded-lg group cursor-pointer">
            <div className="flex items-center gap-4 mb-2">
                <div className="w-16 h-16 shrink-0">
                    <img
                        src={logo || "/images/default-company-logo.png"}
                        alt={name}
                        className="w-full h-full object-cover rounded"
                    />
                </div>
                <div className="flex gap-2 flex-1 flex-col">
                    <div className="flex gap-2">
                        <div className="font-semibold text-lg group-hover:text-[#BC2228]">{name}</div>
                        {featured && <div className="bg-[#FCEEEE] text-[#E05151] rounded px-3 py-1 text-xs font-bold">Featured</div>}
                    </div>
                    <div className="flex items-center text-gray-500 text-xs">
                        <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                        {location}
                    </div>
                </div>
            </div>
            <Button
                type="primary"
                block
                className="bg-[#E7F0FA]! text-[#0A65CC]! border-0! font-medium! mt-4"
                size="large"
                onClick={() => navigate(`/candidate/outstanding-company/${id}`)}
            >
                Open Position ({positions_quantity})
            </Button>
        </Card>
    );
};
