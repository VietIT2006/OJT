import rikkeiLogo from "../../assets/img/rikkei logo.png";
import phonecall from "../../assets/img/PhoneCall.png";
import america from "../../assets/img/America.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons";


export default function Header() {
    const leftMenuItemClass = "text-sm text-[#333333] font-normal cursor-pointer";
    const { userId, displayName } = useSelector((state: RootState) => state.user);

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

            <div className="w-full h-35 bg-white flex justify-center shadow-md">
                <div className="w-max px-5 flex items-center justify-start gap-6 box-border">
                    <div className="flex items-center gap-6">
                        <img src={rikkeiLogo} alt="Rikkei Edu" className="h-9 w-24 cursor-pointer" />

                        <div className="w-167 h-12 flex items-center border border-gray-200 rounded-md px-4 gap-3 box-border">
                            <div className="flex items-center gap-1.5 whitespace-nowrap text-sm">Hà Nội</div>

                            <div className="w-px h-6 bg-gray-200" />

                            <input
                                placeholder="Job title, keyword, company"
                                className="flex-1 border-none outline-none text-sm"
                            />
                        </div>
                    </div>

                    {userId ? (
                        <div className="flex items-center gap-3 text-[#BC2228]">
                            <FontAwesomeIcon icon={faBell} className="text-xl text-[#BC2228]!" />
                            <FontAwesomeIcon icon={faUserCircle} className="text-xl text-[#BC2228]!" />
                            <span className="font-semibold text-[#BC2228] text-xl whitespace-nowrap">{displayName || "Người dùng"}</span>
                        </div>
                    ) : (
                        <div className="flex gap-3 ml-auto">
                            <button className="w-34 h-12 rounded-sm border border-[#C62828] bg-[#C62828] text-white font-semibold cursor-pointer">Đăng Nhập</button>

                            <button className="w-34 h-12 rounded-sm border border-[#C62828] bg-white text-[#C62828] font-semibold cursor-pointer">Đăng Kí</button>

                            <button className="w-35 h-12 rounded-sm border-0 bg-[#24125F] text-white font-semibold cursor-pointer">Đăng Tuyển</button>
                        </div>
                    )}
                </div>
            </div>

        </header>
    );
}
