import React, { useState, useEffect } from "react";
import logo from "../../assets/img/logo.png";
import mainheader from "../../assets/img/mainheader.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faBriefcase, faChevronDown, faChevronRight, faCity, faMapPin, faPeopleGroup, faQuoteRight, faSearch, faSquareArrowUpRight, faStar } from "@fortawesome/free-solid-svg-icons";


const STATS = [
  { icon: <FontAwesomeIcon icon={faBriefcase} className="text-blue-600" />, label: "Live Job", count: "1,75,324", bg: "bg-white", active: false },
  { icon: <FontAwesomeIcon icon={faCity} className="text-white" />, label: "Companies", count: "97,354", bg: "bg-[#CC1E1E]", text: "text-white", active: true },
  { icon: <FontAwesomeIcon icon={faPeopleGroup} className="text-blue-600" />, label: "Candidates", count: "38,47,154", bg: "bg-white", active: false },
  { icon: <FontAwesomeIcon icon={faSquareArrowUpRight} className="text-blue-600" />, label: "New Jobs", count: "7,532", bg: "bg-white", active: false },
];

const JOBS = Array(12).fill({
  title: "Technical Support Specialist",
  type: "PART-TIME",
  salary: "$20,000 - $25,000",
  company: "Google Inc.",
  location: "Dhaka, Bangladesh",
  logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
  badgeColor: "text-[#0BA02C] bg-[#E7F6EA]",
});

const TESTIMONIALS = [
  { id: 1, name: "Robert Fox", role: "UI/UX Designer", avatar: "https://i.pravatar.cc/150?u=robert", text: "Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est." },
  { id: 2, name: "Bessie Cooper", role: "Creative Director", avatar: "https://i.pravatar.cc/150?u=bessie", text: "Mauris eget lorem odio. Mauris convallis justo molestie metus aliquam lacinia. Suspendisse ut dui vulputate augue condimentum ornare." },
  { id: 3, name: "Jane Cooper", role: "Photographer", avatar: "https://i.pravatar.cc/150?u=jane", text: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse et magna quis nibh accumsan." },
  { id: 4, name: "Sơn Việt", role: "Software Engineer", avatar: "https://i.pravatar.cc/150?u=viet", text: "Hệ thống tìm việc cực kỳ chuyên nghiệp và giao diện rất dễ sử dụng. Rất đáng trải nghiệm!" },
  { id: 5, name: "Mai Anh", role: "Product Manager", avatar: "https://i.pravatar.cc/150?u=maianh", text: "Tôi rất hài lòng với chất lượng ứng viên tìm được qua nền tảng này. Cảm ơn RikkeiEdu!" },
];

export const HomepageMain = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3); 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        prev >= TESTIMONIALS.length - itemsPerView ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [itemsPerView]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* 1. NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-3 border-b md:px-20 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-8 flex-1">
          <img src={logo} alt="RikkeiEdu Logo" className="h-9 w-auto object-contain" />
          <div className="hidden lg:flex items-center border border-gray-200 rounded-md overflow-hidden flex-1 max-w-2xl bg-white">
            <div className="flex items-center px-4 py-2 border-r border-gray-100 cursor-pointer">
              <span className="text-sm text-gray-700 font-medium">Hà Nội</span>
              <FontAwesomeIcon icon={faChevronDown} className="ml-2 text-gray-400" />
            </div>
            <div className="flex items-center flex-1 px-4 py-2">
              <FontAwesomeIcon icon={faSearch} className="text-[#CC1E1E] mr-2" />
              <input type="text" placeholder="Job tittle, keyword, company" className="bg-transparent outline-none text-sm w-full" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 ml-4">
          <button className="px-5 py-2 text-sm font-bold bg-[#CC1E1E] text-white rounded-sm hover:bg-red-700">Đăng Nhập</button>
          <button className="px-5 py-2 text-sm font-bold border border-[#CC1E1E] text-[#CC1E1E] rounded-sm hover:bg-red-50">Đăng Ký</button>
          <button className="px-5 py-2 text-sm font-bold bg-[#1B1445] text-white rounded-sm">Đăng Tuyển</button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="bg-[#F1F2F4] pt-16 pb-28 px-6 md:px-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-gray-900 font-extrabold">
            Tìm kiếm công việc phù hợp với năng lực của bạn cùng chúng tôi
          </h1>
          <p className="text-[#5E6670] mt-6 text-lg max-w-xl leading-relaxed">
            Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in scelerisque leo, eget sollicitudin velit bestibulum.
          </p>
          <div className="mt-10 bg-white p-2 rounded-xl shadow-2xl flex flex-col md:flex-row items-center gap-2 border border-white">
            <div className="flex items-center flex-1 px-4 py-3 border-r border-gray-100 w-full">
              <FontAwesomeIcon icon={faSearch} className="text-[#CC1E1E] mr-3" />
              <input type="text" placeholder="Job tittle, Keyword..." className="w-full outline-none" />
            </div>
            <div className="flex items-center flex-1 px-4 py-3 w-full">
              <FontAwesomeIcon icon={faMapPin} className="text-[#CC1E1E] mr-3" />
              <input type="text" placeholder="Your Location" className="w-full outline-none" />
            </div>
            <button className="bg-[#CC1E1E] text-white px-10 py-4 rounded-lg font-bold hover:bg-red-700 transition-all w-full md:w-auto">Find Job</button>
          </div>
        </div>
        <div className="flex-1 hidden lg:block">
          <img src={mainheader} alt="Hero" className="w-full h-auto rounded-3xl mix-blend-multiply opacity-80" />
        </div>
      </header>

      {/* 3. STATS SECTION */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 -mt-14 relative z-10">
        {STATS.map((stat, i) => (
          <div key={i} className={`${stat.bg} p-6 rounded-xl shadow-xl flex items-center gap-5 border border-gray-50 hover:-translate-y-2 transition-transform duration-300`}>
            <div className={`p-4 rounded-lg ${stat.active ? 'bg-red-500' : 'bg-blue-50'}`}>{stat.icon}</div>
            <div>
              <h4 className={`text-2xl font-bold ${stat.text || 'text-gray-900'}`}>{stat.count}</h4>
              <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 4. FEATURED JOBS */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Công việc nổi bật</h2>
          <button className="text-[#CC1E1E] font-bold text-sm flex items-center gap-1 hover:underline">
            Xem thêm <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JOBS.map((job, i) => (
            <div key={i} className="bg-white p-6 border border-[#EDEFF5] rounded-xl hover:shadow-xl transition-all group cursor-pointer">
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 mb-2">{job.title}</h3>
              <div className="flex items-center gap-3 mb-6">
                <span className={`text-[11px] font-bold px-2 py-1 rounded-sm ${job.badgeColor}`}>{job.type}</span>
                <p className="text-sm text-[#767F8C]">Salary: {job.salary}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F1F2F4] rounded-lg flex items-center justify-center p-2">
                  <img src={job.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-800">{job.company}</p>
                  <p className="text-xs text-[#9199A3] flex items-center mt-0.5"><FontAwesomeIcon icon={faMapPin}  className="mr-1"/> {job.location}</p>
                </div>
                <FontAwesomeIcon icon={faBookmark} className="text-[#B1B8C1] hover:text-red-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-24 bg-[#F1F2F4] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#18191E] text-center mb-16">Clients Testimonial</h2>
          
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {TESTIMONIALS.map((item) => (
                <div 
                  key={item.id} 
                  className="px-3 shrink-0"
                  style={{ width: `${100 / itemsPerView}%` }} 
                >
                  <div className="bg-white p-8 rounded-xl shadow-sm h-full flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex gap-1 mb-4 text-[#FFAA00]">
                        {[1, 2, 3, 4, 5].map(s => <FontAwesomeIcon key={s} icon={faStar} />)}
                      </div>
                      <p className="text-[#5E6670] text-sm leading-relaxed mb-8 italic">"{item.text}"</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full border-2 border-white" />
                        <div>
                          <h5 className="font-bold text-[#18191E] text-[15px]">{item.name}</h5>
                          <p className="text-xs text-[#9199A3]">{item.role}</p>
                        </div>
                      </div>
                      <FontAwesomeIcon icon={faQuoteRight} className="text-[#E4E5E8] rotate-180" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-12">
            {TESTIMONIALS.slice(0, TESTIMONIALS.length - itemsPerView + 1).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full h-2 ${
                  currentIndex === index ? "w-8 bg-[#CC1E1E]" : "w-2 bg-[#CC1E1E] bg-opacity-30"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};