import React, { useState, useEffect } from "react";
import mainheader from "../../assets/img/mainheader.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookmark,
    faBriefcase,
    faChevronRight,
    faCity,
    faMapPin,
    faPeopleGroup,
    faQuoteRight,
    faSearch,
    faSquareArrowUpRight,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { OutBusinessCards } from "../Candidate/OutBusiness/components/OutBusinessCards";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { OutCanCards } from "../Business/OutCandidate/components/OutCanCards";
import { useTranslation } from "react-i18next";
import axios from "axios";

const STATS = [
    { icon: <FontAwesomeIcon icon={faBriefcase} className="text-[#BC2228] text-3xl" />, label: "Live Job", count: "1,75,324", bg: "bg-white", active: false },
    { icon: <FontAwesomeIcon icon={faCity} className="text-white text-3xl" />, label: "Companies", count: "97,354", bg: "bg-[#CC1E1E]", text: "text-white", active: true },
    { icon: <FontAwesomeIcon icon={faPeopleGroup} className="text-[#BC2228] text-3xl" />, label: "Candidates", count: "38,47,154", bg: "bg-white", active: false },
    { icon: <FontAwesomeIcon icon={faSquareArrowUpRight} className="text-[#BC2228] text-3xl" />, label: "New Jobs", count: "7,532", bg: "bg-white", active: false },
];

const TESTIMONIALS = [
    { id: 1, name: "Robert Fox", role: "UI/UX Designer", avatar: "https://i.pravatar.cc/150?u=robert", text: "Hệ thống tìm việc cực kỳ chuyên nghiệp và giao diện rất dễ sử dụng." },
    { id: 2, name: "Bessie Cooper", role: "Creative Director", avatar: "https://i.pravatar.cc/150?u=bessie", text: "Mauris eget lorem odio. Mauris convallis justo molestie metus aliquam lacinia." },
    { id: 3, name: "Sơn Việt", role: "Software Engineer", avatar: "https://i.pravatar.cc/150?u=viet", text: "Rất đáng trải nghiệm cho các bạn sinh viên mới ra trường!" },
];
export const HomepageMain = () => {
    const { role } = useSelector((state: RootState) => state.user);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [jobs, setJobs] = useState<any[]>([]);
    const [companies, setCompanies] = useState<any[]>([]);
    const [candidates, setCandidates] = useState<any[]>([]);
    const [featuredCompany, setFeaturedCompany] = useState<any>(null);
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [jobsRes, companiesRes, candidatesRes, addressesRes] = await Promise.all([
                    axios.get("http://localhost:3001/jobs"),
                    axios.get("http://localhost:3001/companies"),
                    axios.get("http://localhost:3001/candidates"),
                    axios.get("http://localhost:3001/address_companies")
                ]);

                const allCompanies = companiesRes.data;
                const allAddresses = addressesRes.data;
                const allJobs = jobsRes.data;

                // 1. Gắn địa chỉ vào từng Công ty
                const enrichedCompanies = allCompanies.map((c: any) => {
                    const addr = allAddresses.find((a: any) => a.company_id === c.id);
                    return { ...c, location: addr ? addr.address : "Địa chỉ đang cập nhật..." };
                });

                // 2. Lấy thông tin Công ty Nổi bật (Featured) để hiện ở tiêu đề
                const topComp = enrichedCompanies.find((c: any) => c.featured === true) || enrichedCompanies[0];
                setFeaturedCompany(topComp);

                // 3. Gắn thông tin Công ty (Logo, Tên, Địa chỉ thật) vào từng Công việc
                const enrichedJobs = allJobs.map((j: any) => {
                    const comp = enrichedCompanies.find((c: any) => c.id === j.company_id);
                    return {
                        ...j,
                        company: comp ? comp.name : j.company,
                        logo: comp ? comp.logo : j.logo,
                        location: comp ? comp.location : j.location // Lấy địa chỉ từ bảng address qua company
                    };
                });

                // Hiển thị 6 công việc nổi bật từ nhiều công ty khác nhau
                setJobs(enrichedJobs.slice(0, 6));
                setCompanies(enrichedCompanies.slice(0, 9));
                setCandidates(candidatesRes.data.slice(0, 9));
                setLoading(false);
            } catch (error) {
                console.error("Lỗi fetch data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const candidateHTML = (
        <>
            {/* FEATURED JOBS SECTION */}
            <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Công việc nổi bật</h2>
                    <button
                        className="text-[#CC1E1E] font-bold text-sm flex items-center gap-1 hover:underline"
                        onClick={() => navigate("/job")}
                    >
                        {t('see-more-0')}<FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
                
                {/* Grid này giờ đây sẽ hiển thị Jobs của nhiều công ty khác nhau */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <div key={job.id} className="bg-white p-6 border border-[#EDEFF5] rounded-xl hover:shadow-xl transition-all group cursor-pointer">
                            <h3 className="font-bold text-lg text-gray-800 group-hover:text-[#BC2228] mb-2">{job.title}</h3>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-[11px] font-bold px-2 py-1 rounded-sm text-[#0BA02C] bg-[#E7F6EA] uppercase">{job.type}</span>
                                <p className="text-sm text-[#767F8C]">Salary: {job.salary}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#F1F2F4] rounded-lg flex items-center justify-center p-2">
                                    <img src={job.logo} alt="Logo" className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-800">{job.company}</p>
                                    <p className="text-xs text-[#9199A3] flex items-center mt-0.5">
                                        <FontAwesomeIcon icon={faMapPin} className="mr-1" /> {job.location}
                                    </p>
                                </div>
                                <FontAwesomeIcon icon={faBookmark} className="text-[#B1B8C1] hover:text-red-500 transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* OUTSTANDING COMPANIES SECTION */}
            <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Công ty nổi bật</h2>
                    <button className="text-[#CC1E1E] font-bold text-sm flex items-center gap-1 hover:underline" onClick={() => navigate("/candidate/outstanding-company")}>
                        {t('see-more-0')}<FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
                <OutBusinessCards data={companies} />
            </section>

            {/* TESTIMONIALS SECTION (GIỮ NGUYÊN) */}
            <section className="py-24 bg-[#F1F2F4] overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-[#18191E] text-center mb-16">Clients Testimonial</h2>
                    <div className="relative overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                        >
                            {TESTIMONIALS.map((item) => (
                                <div key={item.id} className="px-3 shrink-0" style={{ width: `${100 / itemsPerView}%` }}>
                                    <div className="bg-white p-8 rounded-xl shadow-sm h-full flex flex-col justify-between hover:shadow-md transition-shadow">
                                        <div>
                                            <div className="flex gap-1 mb-4 text-[#FFAA00]">
                                                {[1, 2, 3, 4, 5].map((s) => (<FontAwesomeIcon key={s} icon={faStar} />))}
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
                </div>
            </section>
        </>
    );

    const businessHTML = (
        <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Ứng viên nổi bật</h2>
                <button className="text-[#CC1E1E] font-bold text-sm flex items-center gap-1 hover:underline" onClick={() => navigate("/business/outstanding-candidate")}>
                    {t('see-more-0')}<FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
            <OutCanCards data={candidates} />
        </section>
    );

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

    if (loading) return <div className="h-screen flex items-center justify-center font-bold">Loading...</div>;

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
             <header className="bg-[#F1F2F4] pt-16 pb-28 px-6 md:px-20 flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-gray-900 font-extrabold">
                        {role === "candidate" ? "Tìm kiếm công việc phù hợp với năng lực của bạn cùng chúng tôi" : "Tìm kiếm ứng viên phù hợp với công ty cùng chúng tôi"}
                    </h1>
                    <p className="text-[#5E6670] mt-6 text-lg max-w-xl leading-relaxed">
                        Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in scelerisque leo, eget sollicitudin velit bestibulum.
                    </p>
                    <div className="mt-10 bg-white p-2 rounded-xl shadow-2xl flex flex-col md:flex-row items-center gap-2 border border-white">
                        <div className="flex items-center flex-1 px-4 py-3 border-r border-gray-100 w-full">
                            <FontAwesomeIcon icon={faSearch} className="text-[#BC2228] mr-3" />
                            <input type="text" placeholder="Job tittle, Keyword..." className="w-full outline-none" />
                        </div>
                        <div className="flex items-center flex-1 px-4 py-3 w-full">
                            <FontAwesomeIcon icon={faMapPin} className="text-[#BC2228] mr-3" />
                            <input type="text" placeholder="Your Location" className="w-full outline-none" />
                        </div>
                        <button className="bg-[#BC2228] text-white! px-10 py-4 rounded-lg font-bold hover:bg-red-700 transition-all w-full md:w-auto">
                            {t('find-job')}
                        </button>
                    </div>
                </div>
                <div className="flex-1 hidden lg:block">
                    <img src={mainheader} alt="Hero" className="w-full h-auto rounded-3xl mix-blend-multiply opacity-80" />
                </div>
            </header>


            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 -mt-14 relative z-10">
                {STATS.map((stat, i) => (
                    <div key={i} className={`${stat.bg} p-6 rounded-xl shadow-xl flex items-center gap-5 border border-gray-50 hover:-translate-y-2 transition-transform duration-300`}>
                        <div className={`p-4 rounded-lg ${stat.active ? "bg-red-500 text-white" : "bg-blue-50 text-[#BC2228]"}`}>{stat.icon}</div>
                        <div>
                            <h4 className={`text-2xl font-bold ${stat.text || "text-gray-900"}`}>{stat.count}</h4>
                            <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {role === "business" ? businessHTML : candidateHTML}
        </div>
    );
};
