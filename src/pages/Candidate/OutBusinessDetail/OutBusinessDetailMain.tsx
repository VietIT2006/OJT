import { Button, Card } from "antd";
import { DescriptionBusiness } from "./components/DescriptionBusiness";
import { InformationBusiness } from "./components/InformationBusiness";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

const profile = {
    companyLogo: "",
    name: "FPT Software",
    tag: "Featured",
    typeTag: "Outsource",
    location: "Quận Nam Từ Liêm, Hà Nội",
    description: `Velistar is a Shopify Plus agency, and we partner with brands to help them grow, we also do the work with our people! Here at Velistar, we don’t just make websites, we create exceptional digital experiences that consumers love. Our team of designers, developers, strategists, and creators work together to push brands to the next level...`,
};

export const OutBusinessDetailMain = () => {
    const navigate = useNavigate();
    return (
        <div className="p-6">
            <InformationBusiness data={profile} />
            <DescriptionBusiness data={profile} />

            <div className="max-w-7xl mx-auto mt-12">
                <h3 className="text-xl font-semibold mb-6">Công ty cùng lĩnh vực</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i} className="border border-gray-200! rounded-lg">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-16 h-16 bg-gray-200 rounded-xl" />
                                <div className="flex gap-2 flex-1 flex-col">
                                    <div className="flex gap-2">
                                        <div className="font-semibold text-lg">Google</div>
                                        {/* {_.featured && (
                                            <div className="bg-[#FCEEEE] text-[#E05151] rounded px-3 py-1 text-xs font-bold">Featured</div>
                                        )} */}
                                    </div>
                                    <div className="flex items-center text-gray-500 text-xs">
                                        <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                                        Ha Noi, Vietnam
                                    </div>
                                </div>
                            </div>
                            <Button
                                type="primary"
                                block
                                className="bg-[#E7F0FA]! text-[#0A65CC]! border-0! font-medium! mt-4"
                                size="large"
                                onClick={() => navigate(`/candidate/out-business/${i}`)}
                            >
                                Open Position (3)
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OutBusinessDetailMain;
