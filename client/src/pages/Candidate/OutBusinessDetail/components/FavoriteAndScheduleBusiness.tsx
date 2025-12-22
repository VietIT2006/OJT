import { Button, Tooltip } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useState } from "react";

export const FavoriteAndScheduleBusiness = () => {
    const [favorited, setFavorited] = useState(false);

    return (
        <div className="flex items-center gap-3">
            <Tooltip title={favorited ? "Bỏ yêu thích" : "Yêu thích"}>
                <Button
                    type="default"
                    size="large"
                    className="bg-[#F6E8E9]! text-[#BC2228]! border-0!"
                    icon={favorited ? <HeartFilled /> : <HeartOutlined />}
                    onClick={() => setFavorited(!favorited)}
                />
            </Tooltip>

            <Button type="primary" size="large" className="bg-[#BC2228]! border-0!">
                Theo Dõi Công Ty
            </Button>
        </div>
    );
};
