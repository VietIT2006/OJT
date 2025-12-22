import { Spin } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function Loading() {
    const loading = useSelector((state: RootState) => state.user?.loading);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <Spin size="large" />
        </div>
    );
}
