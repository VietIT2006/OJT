import { useState } from "react";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/slices/user.slices";
import type { AppDispatch } from "../../store";
import rikkeiLogo from "../../assets/img/rikkei logo.png";
import phonecall from "../../assets/img/PhoneCall.png";
import america from "../../assets/img/America.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    const [city, setCity] = useState("Ha Noi");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const leftMenuItemClass = "text-sm text-[#333333] font-normal cursor-pointer";
    const { userId, displayName } = useSelector((state: RootState) => state.user);
    // console.log(role);

    return (
        <header className="w-full">
            <div className="w-full h-12 bg-[#F1F2F4] flex justify-between items-center px-8 box-border">
                <div className="flex gap-6">
                    <span className={leftMenuItemClass}>Trang chủ</span>
                    <span className={leftMenuItemClass}>Việc làm</span>
                    <span className={leftMenuItemClass}>CV của bạn</span>
                    <span className={leftMenuItemClass}>Customer Supports</span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <img src={phonecall} alt="phone icon" className="w-4 h-4" />
                        <span className="text-sm font-medium text-[#333]">+1-202-555-0178</span>
                    </div>

                    <div className="flex items-center gap-1.5 cursor-pointer">
                        <img src={america} alt="america icon" className="w-5 h-3.5" />
                        <span className="text-sm text-[#333]">English</span>
                    </div>
                </div>
            </div>

            <div className="w-full bg-white shadow-md">
                <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <img src={rikkeiLogo} alt="Rikkei Edu" className="h-9 w-24 cursor-pointer" onClick={() => navigate("/")} />

                        <div className="hidden md:flex items-center gap-3 text-sm text-gray-700">
                            <Select
                                value={city}
                                onChange={(val) => setCity(val)}
                                options={[
                                    { value: "Ha Noi", label: "Hà Nội" },
                                    { value: "Ho Chi Minh", label: "Hồ Chí Minh" },
                                    { value: "Da Nang", label: "Đà Nẵng" },
                                    { value: "Hai Phong", label: "Hải Phòng" },
                                ]}
                                size="small"
                                bordered={false}
                                style={{ minWidth: 120 }}
                                dropdownMatchSelectWidth={false}
                                aria-label="Chọn thành phố"
                            />
                        </div>
                    </div>

                    <div className="w-full md:flex-1">
                        <div className="w-full h-10 flex items-center border border-gray-200 rounded-md px-3 gap-3 box-border">
                            <input placeholder="Job title, keyword, company" className="flex-1 border-none outline-none text-sm" />
                        </div>
                    </div>

                    <div className="w-full md:w-auto flex items-center justify-end gap-3">
                        {userId ? (
                            <div className="flex items-center gap-3 text-[#BC2228] text-sm">
                                <FontAwesomeIcon icon={faBell} className="text-xl text-[#BC2228]" />
                                <div className="flex items-center gap-2 rounded-[1px] border border-[#f0f0f0] bg-[#fdfdfd] px-4 py-1 font-semibold text-[#c71c1c]">
                                    <FontAwesomeIcon icon={faUserCircle} className="text-xl text-[#BC2228]" />

                                    {displayName || "Người dùng"}
                                </div>
                                {/* <span className="font-semibold text-[#BC2228] text-base truncate max-w-[140px]"></span> */}
                                <button
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        dispatch(setUser(null));
                                        navigate("/");
                                    }}
                                    className="ml-2 px-3 py-1 text-sm rounded-sm border border-[#C62828] text-[#C62828] bg-white cursor-pointer font-semibold"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    className="px-3 py-2 rounded-sm border border-[#C62828] bg-[#C62828] text-white! font-semibold text-sm cursor-pointer"
                                    onClick={() => navigate("/login")}
                                >
                                    Đăng Nhập
                                </button>

                                <button
                                    className="px-3 py-2 rounded-sm border border-[#C62828] bg-white! text-[#C62828] font-semibold text-sm cursor-pointer"
                                    onClick={() => navigate("/register")}
                                >
                                    Đăng Kí
                                </button>

                                <button
                                    className="px-3 py-2 rounded-sm border-0 bg-[#24125F] text-white! font-semibold text-sm cursor-pointer"
                                    onClick={() => navigate("/business/login")}
                                >
                                    Đăng Tuyển
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
