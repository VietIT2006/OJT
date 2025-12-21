import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import CandidateBreadcrumb from "../../components/candidate/CandidateBreadcrumb";
import { fetchJobById, fetchJobs, fetchJobLocations } from "../../apis/jobsApi";
import type { Job } from "../../types/job.type";
import mapPinIcon from "../../assets/images/MapPin.png";
import searchIcon from "../../assets/images/fi_search.png";
import bellIcon from "../../assets/images/bell.fill.png";
import userIcon from "../../assets/images/user-icon.png";
import rikkeiLogo from "../../assets/images/rikkeiEduAvatar.png";

const ALL_LOCATIONS_LABEL = "Tat ca dia diem";
const DEFAULT_COMPANY_LOGO = "https://www.google.com/favicon.ico";

const JobDetailPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!jobId) return;
    let mounted = true;
    const loadData = async () => {
      try {
        setLoading(true);
        const [jobDetail, jobList] = await Promise.all([fetchJobById(jobId), fetchJobs()]);
        if (!mounted) return;
        setJob(jobDetail);
        const related = jobList
          .filter((item) => item.id !== jobDetail.id && item.location === jobDetail.location)
          .slice(0, 4);
        const fallback = related.length < 4
          ? jobList.filter((item) => item.id !== jobDetail.id).slice(0, 4 - related.length)
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
    fetchJobLocations()
      .then((data) => mounted && setLocations(data))
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const locationOptions = useMemo(() => [ALL_LOCATIONS_LABEL, ...locations], [locations]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
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
          { label: "Trang chu", to: "/" },
          { label: "Viec lam", to: "/viec-lam" },
          { label: job?.title || "Job Details", highlight: true },
        ]}
      />
      {loading && (
        <div className="py-16 text-center text-sm text-[#707070]">Dang tai thong tin cong viec...</div>
      )}
      {!loading && error && (
        <div className="py-16 text-center text-sm text-[#d00000]">{error}</div>
      )}
      {!loading && job && (
        <>
          <JobHero job={job} />
          <JobBody job={job} />
          <RelatedJobsSection jobs={relatedJobs} />
        </>
      )}
      <Footer />
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
        <div className="rounded-[1px] bg-white p-6 shadow-[0_15px_35px_rgba(0,0,0,0.08)]">
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
                            className={`flex w-full items-center px-3 py-2 text-sm ${
                              currentLocation === item
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
const JobHero = ({ job }: { job: Job }) => {
  const badgeTags = (job.tags && job.tags.length > 0 ? job.tags : ["Featured"]).filter(Boolean);
  const companyLogo = job.logo || DEFAULT_COMPANY_LOGO;
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1320px] px-6 py-10">
        <div className="flex flex-col gap-6 rounded-[12px] bg-white px-8 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <img
              src={companyLogo}
              alt={job.company}
              className="h-16 w-16 rounded-[10px] border bg-white object-cover"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <p className="text-sm text-black">at {job.company}</p>
              </div>
              <h1 className="mt-1 text-3xl font-semibold">{job.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="rounded-full bg-[#16a24b] px-3 py-1 ">{job.type.toUpperCase()}</span>
                {badgeTags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#ffe6e6] px-3 py-1 text-[#d44f4f]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:flex-col md:items-end">
            <button className="flex h-11 w-11 items-center justify-center rounded-[6px] bg-[#aa1b1b]  shadow-[0_8px_18px_rgba(170,27,27,0.4)]">
              <BookmarkIcon className="h-4 w-4" />
            </button>
            <button className="flex items-center gap-2 rounded-[6px] bg-[#c71c1c] px-6 py-3 text-sm font-semibold  shadow-[0_18px_30px_rgba(199,28,28,0.35)] transition hover:bg-[#b41717]">
              Ung tuyen ngay
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
const JobBody = ({ job }: { job: Job }) => {
  const description = job.description && job.description.length > 0 ? job.description : FALLBACK_DESCRIPTION;
  const requirements = job.requirements && job.requirements.length > 0 ? job.requirements : FALLBACK_REQUIREMENTS;
  const desirable = job.desirable && job.desirable.length > 0 ? job.desirable : FALLBACK_DESIRABLE;
  const benefits = job.benefits && job.benefits.length > 0 ? job.benefits : FALLBACK_BENEFITS;
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1320px] px-6 pb-12">
        <div className="flex flex-col gap-6 lg:flex-row">
          <article className="flex-1 space-y-10 rounded-[14px] text-black bg-white px-10 py-8">
            <JobSection title="Job Description" paragraphs={description} />
            <ListSection title="Requirements" items={requirements} />
            <ListSection title="Desirable" items={desirable} />
            <ListSection title="Benefits" items={benefits} />
          </article>
          <aside className="w-full self-start lg:max-w-[360px]">
            <div className="space-y-6">
              <SalaryLocationCard job={job} />
              <JobOverviewCard job={job} />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
const SalaryLocationCard = ({ job }: { job: Job }) => (
  <div className="rounded-2xl border border-[#e2e7ff] bg-white px-6 py-5 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div className="flex-1 text-center md:text-left">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#9a9a9a]">Salary (USD)</p>
        <p className="mt-1 text-2xl font-semibold text-[#12a053]">{job.salary}</p>
        <p className="text-xs text-[#b0b0b0]">Yearly salary</p>
      </div>
      <span className="hidden h-12 w-px bg-[#e1e8ff] md:block" />
      <div className="flex-1 text-center md:text-left">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#9a9a9a]">Job Location</p>
        <div className="mt-1 flex items-center justify-center gap-2 text-sm font-semibold text-[#2a2a2a] md:justify-start">
          <LocationIcon />
          <span>{job.location}</span>
        </div>
      </div>
    </div>
  </div>
);
const RelatedJobsSection = ({ jobs }: { jobs: Job[] }) => {
  if (!jobs.length) return null;
  return (
    <section className="bg-white pb-16">
      <div className="mx-auto w-full max-w-[1320px] px-6">
        <h2 className="text-2xl font-semibold text-[#1f1f1f]">Related Jobs</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {jobs.map((job) => (
            <Link
              key={job.id}
              to={`/viec-lam/${job.id}`}
              className="rounded-[1px] border border-[#ededed] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-[#1c1c1c]">{job.title}</h3>
                  <p className="mt-1 text-xs text-[#8e8e8e]">Salary: {job.salary}</p>
                </div>
                <span className="text-[#d0d0d0]">
                  <BookmarkIcon className="h-4 w-4" />
                </span>
              </div>
              <span className="mt-3 inline-flex rounded-full bg-[#fef3f2] px-2 py-1 text-[10px] font-semibold text-[#c71c1c]">
                {job.type}
              </span>
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={job.logo || DEFAULT_COMPANY_LOGO}
                  alt={job.company}
                  className="h-6 w-6 rounded-[1px] border border-[#e7e7e7]"
                />
                <div>
                  <p className="text-xs font-semibold text-[#3d3d3d]">{job.company}</p>
                  <p className="flex items-center gap-1 text-[11px] text-[#9a9a9a]">
                    <img src={mapPinIcon} alt="Location" className="h-3 w-3" />
                    {job.location}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const JobSection = ({ title, paragraphs = [] }: { title: string; paragraphs?: string[] }) => {
  if (!paragraphs.length) return null;
  return (
    <section>
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="mt-3 space-y-3 text-sm leading-relaxed">
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
      <h3 className="text-xl font-semibold">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm leading-relaxed ">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#c71c1c]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

const JobOverviewCard = ({ job }: { job: Job }) => {
  const overviewItems = [
    { label: "Job Posted", value: job.postedDate ?? "Dang cap nhat", icon: <CalendarIcon /> },
    { label: "Job Expires", value: job.expiryDate ?? "Dang cap nhat", icon: <TimerIcon /> },
    { label: "Job Level", value: job.level ?? "Dang cap nhat", icon: <BriefcaseIcon /> },
    { label: "Experience", value: job.experience ?? "Dang cap nhat", icon: <ClockIcon /> },
    { label: "Education", value: job.education ?? "Dang cap nhat", icon: <CapIcon /> },
  ];
  const socials = [
    { label: "LinkedIn", icon: <LinkedInIcon /> },
    { label: "Facebook", icon: <FacebookIcon /> },
    { label: "Twitter", icon: <TwitterIcon /> },
    { label: "Email", icon: <MailIcon /> },
  ];
  return (
    <div className="rounded-2xl border border-[#e2e7ff] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
      <div className="px-6 py-5">
        <h4 className="text-base font-semibold text-[#1f1f1f]">Job Overview</h4>
        <div className="mt-4 grid gap-4">
          {overviewItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-xl border border-[#f2f4ff] p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff0f0] text-[#c71c1c]">
                {item.icon}
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#8a8a8a]">{item.label}</p>
                <p className="text-sm font-semibold text-[#2f2f2f]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-[#eef0ff] px-6 py-4">
        <p className="text-sm font-semibold text-[#1f1f1f]">Share this job:</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-full bg-[#ffe6e6] px-4 py-2 text-sm font-semibold text-[#c71c1c] shadow-[0_6px_12px_rgba(199,28,28,0.15)]">
            <LinkIcon />
            Copy Links
          </button>
          {socials.map((social) => (
            <button
              key={social.label}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f7f8ff] text-[#c71c1c] transition hover:bg-[#ffecec]"
              aria-label={`share-${social.label.toLowerCase()}`}
            >
              {social.icon}
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

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 text-[#c71c1c]" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 21s7-6.1 7-11a7 7 0 0 0-14 0c0 4.9 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
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
