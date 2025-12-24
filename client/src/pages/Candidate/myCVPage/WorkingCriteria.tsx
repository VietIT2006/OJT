import { NavLink } from "react-router";
import CandidateBreadcrumb from "../../../components/candidate/CandidateBreadcrumb";

const tabs = [
  { to: "/my-cv", label: "Hồ sơ" },
  { to: "/my-cv/manage", label: "Quản lý CV" },
  { to: "/my-cv/job-preferences", label: "Tiêu chí tìm việc" },
];

const WorkingCriteria = () => {
  return (
    <div className="min-h-screen bg-[#F3F4F6] text-[#333333] antialiased dark:bg-[#121212] dark:text-gray-200">
      <CandidateBreadcrumb
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "CV của bạn", to: "/my-cv" },
          { label: "Tiêu chí tìm việc", highlight: true },
        ]}
      />
      <div className="border-b border-gray-200 bg-white dark:border-zinc-700 dark:bg-[#1E1E1E]">
        <nav className="mx-auto flex max-w-7xl gap-5 px-4 text-sm font-medium">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `py-3 transition-colors ${isActive
                  ? "border-b-2 border-[#BC2228] text-[#BC2228] dark:border-red-500 dark:text-red-500"
                  : "text-gray-600 hover:text-[#BC2228] dark:text-gray-300 dark:hover:text-white"}`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tiêu chí tìm việc</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Tính năng đang được phát triển. Bạn sẽ sớm có thể lưu tiêu chí tìm việc để nhận gợi ý phù hợp
          nhất.
        </p>
      </div>
    </div>
  );
};

export default WorkingCriteria;
