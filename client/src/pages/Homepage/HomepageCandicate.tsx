import React, { useState, useEffect } from "react";
import logo from "../../assets/img/logo.png";
import mainheader from "../../assets/img/mainheader.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBookmark, faBriefcase, faChevronDown, faChevronRight, 
  faCity, faMapPin, faPeopleGroup, faSearch, 
  faSquareArrowUpRight, faArrowRight 
} from "@fortawesome/free-solid-svg-icons";

// 1. Dữ liệu Thống kê theo mẫu ảnh
const STATS = [
  { icon: <FontAwesomeIcon icon={faBriefcase} className="text-[#0066FF]" />, label: "Live Job", count: "1,75,324", bg: "bg-white" },
  { icon: <FontAwesomeIcon icon={faCity} className="text-white" />, label: "Companies", count: "97,354", bg: "bg-[#CC1E1E]", text: "text-white", active: true },
  { icon: <FontAwesomeIcon icon={faPeopleGroup} className="text-[#0066FF]" />, label: "Candidates", count: "38,47,154", bg: "bg-white" },
  { icon: <FontAwesomeIcon icon={faSquareArrowUpRight} className="text-[#0066FF]" />, label: "New Jobs", count: "7,532", bg: "bg-white" },
];

// 2. Dữ liệu Ứng viên mẫu (Grid 3x3)
const CANDIDATES = Array(9).fill({
  name: "Nguyen Van A",
  role: "Front-end",
  level: "Fresher",
  tech: ["REACTJS", "NODEJS"],
  language: "N2",
  location: "Ha Noi, Viet Nam"
});

export const HomepageCandicate = () => {
  const [jobs, setJobs] = useState([]);

  // Fetch dữ liệu từ db.json
  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(Array.isArray(data) ? data : data.jobs))
      .catch((err) => console.error("Lỗi kết nối db.json:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFBFC] font-sans text-gray-900">
      {/* --- NAVBAR --- */}
      <nav className="flex items-center justify-between px-6 py-3 border-b md:px-20 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-10 flex-1">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <div className="hidden lg:flex items-center border border-gray-200 rounded-md overflow-hidden flex-1 max-w-xl">
            <div className="flex items-center px-4 py-2 border-r border-gray-100 cursor-pointer text-sm">
              <span>Hà Nội</span>
              <FontAwesomeIcon icon={faChevronDown} className="ml-2 text-gray-400" size="xs" />
            </div>
            <div className="flex items-center flex-1 px-4 py-2">
              <FontAwesomeIcon icon={faSearch} className="text-[#CC1E1E] mr-2" />
              <input type="text" placeholder="Job title, keyword, company" className="outline-none text-sm w-full" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-bold text-gray-600">Đăng Nhập</button>
          <button className="px-4 py-2 text-sm font-bold bg-[#CC1E1E] text-white rounded">Đăng Ký</button>
          <button className="px-4 py-2 text-sm font-bold bg-[#1B1445] text-white rounded">Đăng Tuyển</button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="bg-[#F1F2F4] pt-12 pb-24 px-6 md:px-20 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1B1445] leading-tight">
            Tìm kiếm công việc phù hợp với năng lực của bạn cùng chúng tôi
          </h1>
          <p className="text-gray-500 mt-5 text-sm max-w-lg">
            Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in scelerisque leo, eget sollicitudin velit vestibulum.
          </p>
          <div className="mt-8 bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-2 border">
            <div className="flex items-center flex-1 px-3 py-2 border-r border-gray-100 w-full">
              <FontAwesomeIcon icon={faSearch} className="text-[#CC1E1E] mr-3" />
              <input type="text" placeholder="Job title, Keyword..." className="w-full outline-none text-sm" />
            </div>
            <div className="flex items-center flex-1 px-3 py-2 w-full">
              <FontAwesomeIcon icon={faMapPin} className="text-[#CC1E1E] mr-3" />
              <input type="text" placeholder="Your Location" className="w-full outline-none text-sm" />
            </div>
            <button className="bg-[#CC1E1E] text-white px-8 py-3 rounded-md font-bold text-sm hover:bg-red-700 w-full md:w-auto">Find Job</button>
          </div>
        </div>
        <div className="flex-1 hidden lg:block">
          <img src={mainheader} alt="Header" className="w-full max-w-lg ml-auto" />
        </div>
      </header>

      {/* --- STATS SECTION --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 -mt-10 relative z-10">
        {STATS.map((stat, i) => (
          <div key={i} className={`${stat.bg} p-5 rounded-lg shadow-md flex items-center gap-4 border border-gray-100`}>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.active ? 'bg-red-500' : 'bg-blue-50'}`}>
              {stat.icon}
            </div>
            <div>
              <h4 className={`text-xl font-bold ${stat.text || 'text-gray-900'}`}>{stat.count}</h4>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- FEATURED CANDIDATES (Grid 3x3) --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#1B1445]">Ứng viên nổi bật</h2>
          <button className="text-[#CC1E1E] text-sm font-bold flex items-center gap-1">
            Xem Thêm <FontAwesomeIcon icon={faArrowRight} size="xs" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CANDIDATES.map((can, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all relative group">
              <FontAwesomeIcon icon={faArrowRight} className="absolute top-5 right-5 text-red-400 opacity-40 group-hover:opacity-100 transition-opacity" />
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-md shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{can.name}</h4>
                  <div className="flex gap-2 mt-1 mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#0BA02C] text-white rounded">{can.role}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#E7F0FD] text-[#0066FF] rounded">{can.level}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-500 font-medium">Technical in use: 
                      {can.tech.map(t => <span key={t} className="ml-1 text-[#0BA02C] bg-green-50 px-1 rounded uppercase">{t}</span>)}
                    </p>
                    <p className="text-[10px] text-gray-500 font-medium">Foreign Language: 
                      <span className="ml-1 text-orange-600 bg-orange-50 px-1 rounded">{can.language}</span>
                    </p>
                    <p className="text-[10px] text-gray-400 flex items-center mt-2">
                      <FontAwesomeIcon icon={faMapPin} className="mr-1" size="xs" /> {can.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURED JOBS (Dữ liệu từ db.json) --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 pb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#1B1445]">Công việc nổi bật</h2>
          <button className="text-[#CC1E1E] text-sm font-bold flex items-center gap-1">
            Xem Thêm <FontAwesomeIcon icon={faArrowRight} size="xs" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.slice(0, 12).map((job) => (
            <div key={job.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-sm text-gray-800 line-clamp-1">{job.title}</h3>
                  <FontAwesomeIcon icon={faBookmark} className="text-gray-300 hover:text-red-500 cursor-pointer" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-green-50 text-green-600 rounded uppercase">
                    {job.type}
                  </span>
                  <p className="text-[11px] text-gray-400">Salary: {job.salary}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className="w-10 h-10 border rounded p-1 shrink-0">
                  <img src={job.logo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-700 line-clamp-1">{job.company}</p>
                  <p className="text-[10px] text-gray-400 flex items-center">
                    <FontAwesomeIcon icon={faMapPin} className="mr-1" size="xs" /> {job.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};