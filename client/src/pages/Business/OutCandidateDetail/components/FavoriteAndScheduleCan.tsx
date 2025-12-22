import { Button, Tooltip } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useState } from "react";
export const FavoriteAndScheduleCan = () => {
    const [favorited, setFavorited] = useState(false);

    return (
        <div className="flex items-center gap-3">
            <Tooltip title={favorited ? "Remove from favorites" : "Add to favorites"}>
                {favorited ? (
                    <Button
                        type="default"
                        size="large"
                        className="bg-[#EFC3C4]! text-[#BC2228]! font-bold! border-0!"
                        icon={<HeartFilled />}
                        onClick={() => setFavorited(!favorited)}
                    />
                ) : (
                    <Button
                        type="default"
                        size="large"
                        className="bg-[#EFC3C4]! text-[#BC2228]! font-bold! border-0!"
                        icon={<HeartOutlined />}
                        onClick={() => setFavorited(!favorited)}
                    />
                )}
            </Tooltip>

            <Button type="primary" size="large" className="bg-[#BC2228]! border-0!">
                Đặt Lịch Phỏng Vấn
            </Button>
        </div>
    );
};
