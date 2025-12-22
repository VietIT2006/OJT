import rikkeiLogo from "../../assets/images/rikkeiEduAvatar.png";
import phoneIcon from "../../assets/images/PhoneCall.png";

const navItems = [
  { label: "Trang chủ" },
  { label: "Việc làm", isActive: true },
  { label: "CV của bạn" },
  { label: "Customer Supports" },
];

const UsaFlag = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28 20"
    className="h-4 w-6 rounded-[1px] border border-[#d0d0d0]"
  >
    <rect width="28" height="20" fill="#b22234" />
    <g fill="#fff">
      <rect y="2" width="28" height="2" />
      <rect y="6" width="28" height="2" />
      <rect y="10" width="28" height="2" />
      <rect y="14" width="28" height="2" />
      <rect y="18" width="28" height="2" />
    </g>
    <rect width="12" height="10" fill="#3c3b6e" />
    <g fill="#fff">
      <circle cx="2" cy="1.5" r=".4" />
      <circle cx="4" cy="3.5" r=".4" />
      <circle cx="6" cy="1.5" r=".4" />
      <circle cx="8" cy="3.5" r=".4" />
      <circle cx="10" cy="1.5" r=".4" />
      <circle cx="2" cy="5.5" r=".4" />
      <circle cx="4" cy="7.5" r=".4" />
      <circle cx="6" cy="5.5" r=".4" />
      <circle cx="8" cy="7.5" r=".4" />
      <circle cx="10" cy="5.5" r=".4" />
    </g>
  </svg>
);

const CaretIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-4 w-4 text-[#7b7b7b]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
  </svg>
);

const Header = () => {
  return (
    <header className="bg-[#F1F2F4]">
      <div className="flex items-center justify-between px-8 py-3">
        <div className="flex items-center gap-8">
          <nav className="flex h-[48px] items-center gap-8 text-[15px]">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`group relative inline-flex h-full items-center pb-1 font-medium transition-colors ${
                  item.isActive
                    ? "text-[#c71c1c]"
                    : "text-[#707070] hover:text-[#c71c1c]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-0 bottom-0 h-[2px] rounded-[1px] transition ${
                    item.isActive
                      ? "bg-[#c71c1c]"
                      : "bg-transparent group-hover:bg-[#c71c1c]"
                  }`}
                />
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6 text-sm text-[#3d3d3d]">
          <div className="flex items-center gap-2 font-semibold">
            <img src={phoneIcon} alt="Phone" className="h-5 w-5" />
            <span>+1-202-555-0178</span>
          </div>
          <div className="flex items-center gap-2">
            <UsaFlag />
            <span className="text-[15px] font-medium text-[#5a5a5a]">
              English
            </span>
            <CaretIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
