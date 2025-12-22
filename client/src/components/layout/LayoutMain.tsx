import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Loading from "../common/Loading";
import Header from "./Header";
import Footer from "./Footer";
import { fetchUser } from "../../store/slices/user.slices";
import type { AppDispatch } from "../../store";

export default function LayoutMain() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(fetchUser());
        }
    }, [dispatch]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />

            <Loading />
        </div>
    );
}
