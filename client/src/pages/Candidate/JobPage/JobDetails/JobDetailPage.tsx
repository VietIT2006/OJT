import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router";
import CandidateBreadcrumb from "../../../../components/candidate/CandidateBreadcrumb";
import { businessApi } from "../../../../apis/businessApi";
import type { Job, Location, TypeJob, Company } from "../../../../types/business.type";
import mapPinIcon from "../../../../assets/images/MapPin.png";
import mapTrifoldIcon from "../../../../assets/images/MapTrifold.png";
import searchIcon from "../../../../assets/images/fi_search.png";
import bellIcon from "../../../../assets/images/bell.fill.png";
import userIcon from "../../../../assets/images/user-icon.png";
import rikkeiLogo from "../../../../assets/images/rikkeiEduAvatar.png";
import { Calendar, Clock, Layers, Briefcase, GraduationCap, Link2, Linkedin, Facebook, Twitter, Mail, Calendar1, Timer, Clock1, CaptionsIcon } from 'lucide-react';

const ALL_LOCATIONS_LABEL = "Tat ca dia diem";
const DEFAULT_COMPANY_LOGO = "https://www.google.com/favicon.ico";

const JobDetailPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  

  useEffect(() => {
    if (!jobId) return;
    let mounted = true;
    const loadData = async () => {
      try {
        setLoading(true);
        const [jobDetail, jobList] = await Promise.all([businessApi.getJobById(jobId), businessApi.getJobs()]);
        if (!mounted) return;
        setJob(jobDetail);
        
        const companyData = await businessApi.getCompanyById(jobDetail.company_id);
        setCompany(companyData);
        
        const openJobs = jobList.filter(item => item.is_open !== false);
        const related = openJobs
          .filter((item) => item.id !== jobDetail.id && item.tag_id === jobDetail.tag_id)
          .slice(0, 4);
        const fallback = related.length < 4
          ? openJobs.filter((item) => item.id !== jobDetail.id).slice(0, 4 - related.length)
          : [];
        setRelatedJobs([...related, ...fallback]);
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Không thể tải dữ liệu");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadData();

    return () => {
      mounted = false;
    };
  }, [jobId]);

  useEffect(() => {
    let mounted = true;
    businessApi.getLocations()
      .then((data) => mounted && setLocations(data))
      .catch(() => { });
    return () => {
      mounted = false;
    };
  }, []);

  const locationOptions = useMemo(() => [ALL_LOCATIONS_LABEL, ...locations.map(loc => loc.name)], [locations]);

  return (
    <div className="min-h-screen bg-white">
      <main
        style={{
          fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: 400,
          letterSpacing: "0px",
          color: "#333333",
        }}
      >
        <HeroSearchShell
          keyword={keyword}
          onKeywordChange={setKeyword}
          selectedLocation={location}
          onSelectLocation={(value: string) => setLocation(value === ALL_LOCATIONS_LABEL ? "" : value)}
          dropdownOpen={dropdownOpen}
          toggleDropdown={() => setDropdownOpen((prev) => !prev)}
          locations={locationOptions}
        />
        <CandidateBreadcrumb
          items={[
            { label: "Trang chủ", to: "/" },
            { label: "Việc làm", to: "/job" },
            { label: job?.title || "Job Details", highlight: true },
          ]}
        />
        {loading && (
          <div className="py-16 text-center text-sm text-[#707070]">Đang tải thông tin công việc...</div>
        )}
        {!loading && error && (
          <div className="py-16 text-center text-sm text-[#d00000]">{error}</div>
        )}
        {!loading && job && (
          <>
            <JobHero job={job} company={company} />
            <JobBody job={job} company={company} />
            <RelatedJobsSection jobs={relatedJobs} />
          </>
        )}
      </main>
    </div>
  );
};

type HeroSearchShellProps = {
  keyword: string;
  onKeywordChange: (value: string) => void;
  selectedLocation: string;
  onSelectLocation: (value: string) => void;
  dropdownOpen: boolean;
  toggleDropdown: () => void;
  locations: string[];
};

const HeroSearchShell = ({
  keyword,
  onKeywordChange,
  selectedLocation,
  onSelectLocation,
  dropdownOpen,
  toggleDropdown,
  locations,
}: HeroSearchShellProps) => {
  const currentLocation = selectedLocation || ALL_LOCATIONS_LABEL;
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1320px] px-6 py-6">
        <div className="rounded-[1px] bg-white p-6">
          <div className="flex flex-wrap items-center gap-4">
            <img src={rikkeiLogo} alt="Rikkei Education" className="h-10 w-auto" />
            <div className="flex min-w-[300px] flex-1 items-center rounded-[1px] border border-[#e3e3e3] bg-white text-sm text-[#777]">
              <div className="relative flex min-w-[200px] items-center gap-2 px-4 py-2">
                <img src={mapPinIcon} alt="Location" className="h-4 w-4" />
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="flex w-full items-center justify-between text-left font-medium text-[#2f2f2f]"
                >
                  <span>{selectedLocation || "Chon dia diem"}</span>
                  <CaretDownIcon />
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 top-full z-20 mt-2 w-full rounded-[1px] border border-[#e3e3e3] bg-white shadow-lg">
                    <ul className="max-h-56 overflow-y-auto">
                      {locations.map((item) => (
                        <li key={item}>
                          <button
                            type="button"
                            onClick={() => onSelectLocation(item)}
                            className={`flex w-full items-center px-3 py-2 text-sm ${currentLocation === item
                                ? "bg-[#fdecec] font-semibold text-[#c71c1c]"
                                : "hover:bg-[#f5f5f5]"
                              }`}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <span className="w-px self-stretch bg-[#e5e5e5]" />
              <div className="flex flex-1 items-center gap-3 px-4 py-2">
                <img src={searchIcon} alt="Search" className="h-4 w-4" />
                <input
                  value={keyword}
                  onChange={(event) => onKeywordChange(event.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#b4b4b4]"
                  placeholder="Job title, keyword, company"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 text-[#777]">
              <button className="rounded-[1px] border border-[#e3e3e3] p-2 text-[#ff3b30]">
                <img src={bellIcon} alt="Notification" className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2 rounded-[1px] border border-[#f0f0f0] bg-[#fdfdfd] px-4 py-1 text-sm font-semibold text-[#c71c1c]">
                <img src={userIcon} alt="User" className="h-8 w-8 rounded-full" />
                Nguyen Minh Duong
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const JobHero = ({ job, company }: { job: Job; company: Company | null }) => {
  const companyLogo = company?.logo || DEFAULT_COMPANY_LOGO;
  const companyName = company?.name || "Unknown Company";
  
  return (
    <section className="bg-white shadow-[0_6px_18px_rgba(0,0,0,0.04)]">
      <div className="mx-auto w-full max-w-[1320px] px-6 py-8 mt-[38px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-18 w-35 items-center justify-center">
              <img src={companyLogo} alt={companyName} className="h-full w-full object-contain" />
            </div>
            <div>
              <h1 className="text-[24px] font-[500] text-[#18191C] md:text-3xl">{job.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[#6a6a6a]">
                <span className="text-[#474C54]">
                  at {companyName}
                </span>
                <span className={`rounded-[3px] px-3 py-0.5 text-xs font-semibold uppercase text-white ${
                  job.is_open ? 'bg-[#0BA02C]' : 'bg-[#d00000]'
                }`}>
                  {job.is_open ? 'Đang mở' : 'Đã đóng'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 md:mt-0">
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e4e4e4] bg-[#fff3f3] text-[#c71c1c] transition hover:bg-[#ffe0e0]">
              <BookmarkIcon className="h-4 w-4" />
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-[#c71c1c] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_15px_30px_rgba(199,28,28,0.25)] transition hover:bg-[#b41717]">
              Ứng tuyển ngay
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const JobBody = ({ job, company }: { job: Job; company: Company | null }) => {
  const description = job.description ? [job.description] : FALLBACK_DESCRIPTION;
  const requirements = FALLBACK_REQUIREMENTS;
  const desirable = FALLBACK_DESIRABLE;
  const benefits = FALLBACK_BENEFITS;
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1320px] ">
        <div className="grid gap-8 lg:grid-cols-12">
          <article className="space-y-8 rounded-2xl bg-white px-8 py-8 text-[#282828] lg:col-span-8">
            <JobSection title="Job Description" paragraphs={description} />
            <ListSection title="Requirements" items={requirements} />
            <ListSection title="Desirable" items={desirable} />
            <ListSection title="Benefits" items={benefits} />
          </article>
          <aside className="space-y-6 lg:col-span-4">
            <SalaryLocationCard job={job} />
            <JobOverviewCard job={job} />
          </aside>
        </div>
      </div>
    </section>
  );
};
const SalaryLocationCard = ({ job }: { job: Job }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  
  useEffect(() => {
    businessApi.getLocations()
      .then((data) => setLocations(data))
      .catch(() => {});
  }, []);
  
  const location = locations.find(l => l.id === job.location_id);
  const salaryLabel = job.salary_type ? `${job.salary_type} salary` : "Salary";
  
  return (
    <div className="rounded-[16px] border border-[#e1e1e1] bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex-1 border-b border-[#e5e5e5] pb-4 text-center sm:border-b-0 sm:pb-0 ">
          <p className="mb-3 text-xs font-semibold uppercase text-[#18191C]">Salary (USD)</p>
          <p className="whitespace-nowrap text-xl font-semibold text-[#16a24b]">{job.salary || "Negotiable"}</p>
          <p className="mt-1 text-xs text-[#a3a3a3]">{salaryLabel}</p>
        </div>
        <span className="hidden h-30 w-px bg-[#e5e5e5] sm:block" />
        <div className="flex-1 text-center ">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg ">
            <img src={mapTrifoldIcon} alt="Location" className="h-10 w-10" />
          </div>
          <p className="text-xs font-semibold uppercase text-[#18191C]">Job Location</p>
          <p className="whitespace-nowrap mt-1 text-sm font-semibold text-[#767F8C]">{location?.name || "Unknown"}</p>
        </div>
      </div>
    </div>
  );
};
const RelatedJobsSection = ({ jobs }: { jobs: Job[] }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companiesData, locationsData] = await Promise.all([
          businessApi.getCompanies(),
          businessApi.getLocations()
        ]);
        setCompanies(companiesData);
        setLocations(locationsData);
      } catch (error) {
        console.error("Failed to fetch related data:", error);
      }
    };
    fetchData();
  }, []);
  
  if (!jobs.length) return null;
  
  const getCompany = (companyId: string) => companies.find(c => c.id === companyId);
  const getLocation = (locationId: string) => locations.find(l => l.id === locationId);
  
  return (
    <section className="bg-white pb-16 pt-20 mt-7 border-t border-[#f0f0f0]">
      <div className="mx-auto w-full max-w-[1320px] px-6">
        <h2 className="text-2xl font-semibold text-[#1f1f1f]">Related Jobs</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => {
            const company = getCompany(job.company_id);
            const location = getLocation(job.location_id);
            return (
              <Link
                key={job.id}
                to={`/job/${job.id}`}
                className="rounded-[1px] border border-[#ededed] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-[#1c1c1c]">{job.title}</h3>
                    <div className="flex items-center justify-center gap-3">
                      <span className="rounded-[3px] bg-[#E7F6EA] px-[8px] py-[4px] text-[12px] font-semibold text-[#0BA02C] uppercase">
                        Full-time
                      </span>
                      <p className="mt-1 text-xs text-[#8e8e8e]">Salary: {job.salary || "Negotiable"}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={company?.logo || DEFAULT_COMPANY_LOGO}
                      alt={company?.name || "Company"}
                      className="h-6 w-6 rounded-[1px] border border-[#e7e7e7] object-contain"
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#3d3d3d]">{company?.name || "Unknown"}</p>
                      <p className="flex items-center gap-1 text-[11px] text-[#9a9a9a]">
                        <img src={mapPinIcon} alt="Location" className="h-3 w-3" />
                        {location?.name || "Unknown"}
                      </p>
                    </div>
                  </div>
                  <span className="text-[#d0d0d0]">
                    <BookmarkIcon className="h-6 w-6" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const JobSection = ({ title, paragraphs = [] }: { title: string; paragraphs?: string[] }) => {
  if (!paragraphs.length) return null;
  return (
    <section>
      <h3 className="text-lg font-semibold text-[#1f1f1f]">{title}</h3>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#4e4e4e]">
        {paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </section>
  );
};

const ListSection = ({ title, items = [] }: { title: string; items?: string[] }) => {
  if (!items.length) return null;
  return (
    <section>
      <h3 className="text-lg font-semibold text-[#1f1f1f]">{title}</h3>
      <ul className="mt-4 list-outside list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#4e4e4e]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
};

const JobOverviewCard = ({ job }: { job: Job }) => {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Updating...";
    try {
      return new Date(dateStr).toLocaleDateString('vi-VN');
    } catch {
      return "Updating...";
    }
  };
  
  const overviewItems = [
    { label: "Job Posted", value: formatDate(job.created_at), icon: <Calendar1 className="w-10 h-8" /> },
    { label: "Job Expire In", value: formatDate(job.expire_at), icon: <Timer className="w-10 h-8" /> },
    { label: "Job Level", value: job.level || "Not specified", icon: <Layers className="w-10 h-8" /> },
    { label: "Experience", value: job.experience || "Not specified", icon: <Clock1 className="w-10 h-8" /> },
    { label: "Education", value: job.education || "Not specified", icon: <GraduationCap className="w-10 h-8" /> },
  ];
  const socials = [
    { label: "Copy Links", icon: <LinkIcon />, type: "copy" },
    { label: "LinkedIn", icon: <LinkedInIcon />, type: "light" },
    { label: "Facebook", icon: <FacebookIcon />, type: "solid" },
    { label: "Twitter", icon: <TwitterIcon />, type: "light" },
    { label: "Email", icon: <MailIcon />, type: "light" },
  ];
  const topOverview = overviewItems.slice(0, 3);
  const bottomOverview = overviewItems.slice(3);
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 w-full max-w-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Job Overview</h2>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {topOverview.map((item) => (
          <OverviewItem key={item.label} item={item} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {bottomOverview.map((item) => (
          <OverviewItem key={item.label} item={item} />
        ))}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Share this job:</h3>
        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <button
              key={social.label}
              className={`flex items-center justify-center gap-2 rounded transition-colors ${social.type === "copy"
                  ? "px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100"
                  : social.type === "solid"
                    ? "w-10 h-10 bg-red-600 text-white hover:bg-red-700"
                    : "w-10 h-10 bg-red-100 text-red-600 hover:bg-red-200"
                }`}
            >
              {social.icon}
              {social.type === "copy" ? <span className="text-sm font-medium">Copy Links</span> : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const BookmarkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.5 4h11a1.5 1.5 0 0 1 1.5 1.5V21l-7-3-7 3V5.5A1.5 1.5 0 0 1 6.5 4z"
    />
  </svg>
);

const OverviewItem = ({ item }: { item: { label: string; value: string; icon: ReactNode } }) => (
  <div>
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded  text-red-500">
      {item.icon}
    </div>
    <p className="text-xs font-semibold uppercase text-gray-500">{item.label}:</p>
    <p className="mt-1 text-sm font-medium text-gray-900">{item.value}</p>
  </div>
);

const CaretDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 text-[#a0a0a0]" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-5-5m5 5-5 5" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
    <path d="M8 3.5v4M16 3.5v4M3.5 10.5h17" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 7h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
    <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M4 12h16" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l3 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="m3 10 9-5 9 5-9 5-9-5Z" />
    <path d="M7 12v5c0 1.1 2.24 2 5 2s5-.9 5-2v-5" />
  </svg>
);

const TimerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="13" r="7" />
    <path d="M9 4h6M12 2v2M12 10.5v3.5l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10 14a4 4 0 0 0 4-4" />
    <path d="M8.5 5h-2a3.5 3.5 0 0 0 0 7h2M15.5 12h2a3.5 3.5 0 0 1 0 7h-2" />
    <path d="m12 6 2-2m-7 7 2-2m5 9 2-2" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M5.2 9h3.1v10.5H5.2zM6.8 4.5A1.8 1.8 0 1 1 5 6.3a1.8 1.8 0 0 1 1.8-1.8m4.1 4.5h3v1.5h.1c.4-.8 1.4-1.6 2.8-1.6 3 0 3.6 2 3.6 4.5v5.1h-3.1v-4.5c0-1.1 0-2.5-1.6-2.5s-1.8 1.2-1.8 2.4v4.6h-3.1z" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M15 4h3V0h-3c-3.3 0-5 2.2-5 5.3V8H7v4h3v12h4V12h3.1l.9-4H14V5.3C14 4.6 14.3 4 15 4z" />
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M24 4.6a10 10 0 0 1-2.8.8 4.8 4.8 0 0 0 2.1-2.6 9.7 9.7 0 0 1-3.1 1.2A4.9 4.9 0 0 0 16.6 3a5 5 0 0 0-4.9 6.1A13.9 13.9 0 0 1 1.6 3.2a4.9 4.9 0 0 0 1.5 6.6 4.8 4.8 0 0 1-2.2-.6v.1a5 5 0 0 0 3.9 4.8 5 5 0 0 1-2.2.1 5 5 0 0 0 4.6 3.4A9.8 9.8 0 0 1 0 20.4a13.8 13.8 0 0 0 7.5 2.2c9 0 13.9-7.6 13.9-14.3v-.6A9.8 9.8 0 0 0 24 4.6z" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FALLBACK_DESCRIPTION = [
  "We are looking for teammates who care about crafting thoughtful experiences for candidates and partners. You will collaborate closely with product, design, and business stakeholders to deliver polished features end to end.",
  "Every release combines research, prototyping, implementation, and validation. We expect you to switch between big-picture product thinking and detailed execution comfortably.",
];

const FALLBACK_REQUIREMENTS = [
  "3+ years of experience working in a similar role with measurable impact.",
  "Strong communication skills and the ability to work with cross-functional partners.",
  "Hands-on expertise with modern tools and workflows that keep quality high.",
  "Comfortable owning deliverables from discovery through launch and optimization.",
];

const FALLBACK_DESIRABLE = [
  "Exposure to Agile or Lean delivery frameworks.",
  "Familiarity with cloud platforms and observability tooling.",
  "Mentorship experience or a passion for sharing knowledge with teammates.",
];

const FALLBACK_BENEFITS = [
  "Hybrid working schedule with flexible hours.",
  "Learning budget for certifications, books, and online courses.",
  "Comprehensive healthcare coverage for you and your family.",
  "Quarterly team retreats and plenty of internal knowledge-sharing events.",
];

export default JobDetailPage;
