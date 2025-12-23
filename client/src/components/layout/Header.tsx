import { Link, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons";

import rikkeiLogo from "../../assets/img/rikkei logo.png";
import phonecall from "../../assets/img/PhoneCall.png";
import america from "../../assets/img/America.png";
import { RootState } from "../../store";

const navLinks = [
  { path: "/", label: "Trang chu" },
  { path: "/job", label: "Viec lam" },
  { path: "/my-cv", label: "CV cua ban" },
  { path: "/customer-support", label: "Customer Supports" },
];

const Header = () => {
  const location = useLocation();
  const { userId, displayName } = useSelector((state: RootState) => state.user);

  const leftMenuItemClass = (path: string) =>
    `text-sm font-normal cursor-pointer transition-colors ${
      location.pathname === path ? "text-[#BC2228]" : "text-[#333333] hover:text-[#BC2228]"
    }`;

  return (
    <header className="w-full">
      <div className="flex h-12 w-full items-center justify-between bg-[#F1F2F4] px-8">
        <nav className="flex gap-6">
          {navLinks.map(({ path, label }) => (
            <Link key={path} to={path} className={leftMenuItemClass(path)}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <img src={phonecall} alt="phone icon" className="h-4 w-4" />
            <span className="text-sm font-medium text-[#333]">+1-202-555-0178</span>
          </div>
          <button className="flex items-center gap-1.5">
            <img src={america} alt="america icon" className="h-3.5 w-5" />
            <span className="text-sm text-[#333]">English</span>
          </button>
        </div>
      </div>

      <div className="flex w-full justify-center bg-white shadow-md">
        <div className="flex w-full max-w-[1320px] items-center gap-6 px-5 py-4">
          <div className="flex items-center gap-6">
            <img src={rikkeiLogo} alt="Rikkei Edu" className="h-9 w-24 cursor-pointer" />
            <div className="flex h-12 w-[420px] items-center gap-3 rounded-md border border-gray-200 px-4">
              <span className="text-sm text-[#333333]">Ha Noi</span>
              <span className="h-6 w-px bg-gray-200" />
              <input
                className="flex-1 border-none text-sm outline-none"
                placeholder="Job title, keyword, company"
              />
            </div>
          </div>

          {userId ? (
            <div className="flex items-center gap-3 text-[#BC2228]">
              <FontAwesomeIcon icon={faBell} className="text-xl" />
              <FontAwesomeIcon icon={faUserCircle} className="text-xl" />
              <span className="text-xl font-semibold whitespace-nowrap">{displayName || "Nguoi dung"}</span>
            </div>
          ) : (
            <div className="ml-auto flex gap-3">
              <button className="h-12 w-32 rounded-sm border border-[#C62828] bg-[#C62828] font-semibold text-white">
                Dang nhap
              </button>
              <button className="h-12 w-32 rounded-sm border border-[#C62828] bg-white font-semibold text-[#C62828]">
                Dang ky
              </button>
              <button className="h-12 w-32 rounded-sm bg-[#24125F] font-semibold text-white">Dang tuyen</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
