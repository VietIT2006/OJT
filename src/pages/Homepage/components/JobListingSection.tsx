import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { fetchJobLocations, fetchJobs } from "../../../apis/jobsApi";
import type { Job } from "../../../types/job.type";
import Pagination from "../../../components/common/Pagination";
import CandidateBreadcrumb from "../../../components/candidate/CandidateBreadcrumb";

import rikkeiLogo from "../../../assets/images/rikkeiEduAvatar.png";
import searchIcon from "../../../assets/images/fi_search.png";
import mapPinIcon from "../../../assets/images/MapPin.png";
import mapPinRedIcon from "../../../assets/images/MapPinRed.png";
import bellIcon from "../../../assets/images/bell.fill.png";
import sliderIcon from "../../../assets/images/Sliders.png";
import userIcon from "../../../assets/images/user-icon.png";
import crosshairIcon from "../../../assets/images/Crosshair.png";

const JobListingSection = () => {
  const pageSize = 6;
  const [jobs, setJobs] = useState<Job[]>([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let mounted = true;
    fetchJobLocations()
      .then((data) => {
        if (mounted) setLocations(data);
      })
      .catch(() => {
        /* bỏ qua lỗi location */
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    fetchJobs({
      location,
    })
      .then((data) => {
        if (mounted) setJobs(data);
      })
      .catch((err) => {
        if (mounted) setError(err instanceof Error ? err.message : "Không thể tải dữ liệu");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [location]);

  const dropdownOptions = useMemo(
    () => ["Tất cả địa điểm", ...locations],
    [locations],
  );

  const filteredJobs = useMemo(() => {
    if (!keyword.trim()) return jobs;
    const keywordLower = keyword.trim().toLowerCase();
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(keywordLower) ||
        job.company.toLowerCase().includes(keywordLower),
    );
  }, [jobs, keyword]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredJobs.length / pageSize)),
    [filteredJobs.length],
  );
  const paginatedJobs = useMemo(
    () => filteredJobs.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filteredJobs, currentPage],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, location]);

  const handleLocationSelect = (value: string) => {
    setLocation(value === "Tất cả địa điểm" ? "" : value);
    setLocationDropdownOpen(false);
  };

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1320px] px-6 py-6">
          <HeroSearchBar
            keyword={keyword}
            onKeywordChange={setKeyword}
            selectedLocation={location}
            onSelectLocation={handleLocationSelect}
            dropdownOpen={locationDropdownOpen}
            toggleDropdown={() => setLocationDropdownOpen((prev) => !prev)}
            locations={dropdownOptions}
          />
        </div>
      </section>

      <CandidateBreadcrumb
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Việc làm", highlight: true },
        ]}
      />

      <section className="bg-white pb-16 mt-[20px]">
        <div className="mx-auto w-full max-w-[1320px] px-6">
          <FilterBar />
      <JobGrid jobs={paginatedJobs} loading={loading} error={error} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </section>
    </>
  );
};

type HeroSearchProps = {
  keyword: string;
  onKeywordChange: (value: string) => void;
  selectedLocation: string;
  onSelectLocation: (value: string) => void;
  dropdownOpen: boolean;
  toggleDropdown: () => void;
  locations: string[];
};

const HeroSearchBar = ({
  keyword,
  onKeywordChange,
  selectedLocation,
  onSelectLocation,
  dropdownOpen,
  toggleDropdown,
  locations,
}: HeroSearchProps) => (
  <div className="rounded-[1px] bg-white p-6">
    <div className="flex flex-wrap items-center gap-4">
      <img src={rikkeiLogo} alt="Rikkei Education" className="h-10 w-auto" />
      <div className="flex min-w-[280px] flex-1 items-center rounded-[1px] border border-[#e3e3e3] bg-white text-sm text-[#777]">
        <div className="relative flex min-w-[200px] items-center gap-2 px-4 py-2">
          <img src={mapPinIcon} alt="Location" className="h-4 w-4" />
          <button
            type="button"
            onClick={toggleDropdown}
            className="flex w-full items-center justify-between text-left font-medium text-[#2f2f2f]"
          >
            <span>{selectedLocation || "Chọn địa điểm"}</span>
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
                        (selectedLocation || "Tất cả địa điểm") === item
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
          Nguyễn Minh Dương
        </div>
      </div>
    </div>
  </div>
);

const FilterBar = () => (
  <div className="rounded-[1px] border border-[#E4E5E8] px-6 py-5">
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-1 min-w-[320px] items-center rounded-[1px] border border-[#ececec] bg-white text-sm text-[#8a8a8a]">
        <div className="flex min-w-[240px] flex-1 items-center gap-3 px-4 py-3">
          <img src={searchIcon} alt="Search" className="h-4 w-4" />
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#bababa]"
            placeholder="Search by: Job title, Position, Keyword..."
          />
        </div>
        <span className="w-px self-stretch bg-[#e5e5e5]" />
        <div className="flex flex-1 min-w-[200px] items-center gap-3 px-4 py-3">
          <img src={mapPinRedIcon} alt="Location" className="h-4 w-4" />
          <input
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#bababa]"
            placeholder="City, state or zip code"
          />
        </div>
        <button className="px-3 py-3">
          <img src={crosshairIcon} alt="Locate me" className="h-4 w-4" />
        </button>
      </div>
      <button className="flex items-center gap-2 rounded-[1px] border border-[#c1c1c1] bg-[#F1F2F4] px-5 py-3 text-sm font-semibold text-[#505050]">
        <img src={sliderIcon} alt="Filters" className="h-4 w-4" />
        Filters
      </button>
      <button className="rounded-[1px] bg-[#c71c1c] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_20px_rgba(199,28,28,0.2)]">
        Find Job
      </button>
    </div>
  </div>
);

const JobGrid = ({ jobs, loading, error }: { jobs: Job[]; loading: boolean; error: string | null }) => {
  if (loading) {
    return (
      <div className="mt-10 rounded-[1px] border border-dashed border-[#d5d5d5] bg-white p-10 text-center text-sm text-[#757575]">
        Đang tải danh sách việc làm...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 rounded-[1px] border border-[#ffd3d7] bg-[#fff5f6] p-6 text-center text-sm text-[#d00000]">
        {error}
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <div className="mt-10 rounded-[1px] border border-dashed border-[#d5d5d5] bg-white p-10 text-center text-sm text-[#757575]">
        Không tìm thấy việc làm phù hợp. Hãy thử từ khóa hoặc địa điểm khác.
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-5 rounded-[1px] border border-[#dedede] bg-white p-6 shadow-[0_15px_35px_rgba(0,0,0,0.05)] md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
};

const JobCard = ({ id, title, type, salary, company, location }: Job) => {
  const badgeColor =
    type === "Full-time"
      ? "bg-[#ebfff3] text-[#13ae4b]"
      : type === "Part-time"
        ? "bg-[#fff7e5] text-[#f7a614]"
        : "bg-[#edf5ff] text-[#2470ff]";

  return (
    <Link
      to={`/viec-lam/${id}`}
      className="block rounded-[1px] border border-[#f0f0f0] bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-[0_20px_35px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[#202020]">{title}</h3>
          <p className="mt-1 text-sm text-[#8e8e8e]">Salary: {salary}</p>
        </div>
        <span className="text-[#d0d0d0]">
          <BookmarkIcon className="h-5 w-5" />
        </span>
      </div>
      <span className={`mt-4 inline-flex rounded-[1px] px-3 py-1 text-xs font-semibold ${badgeColor}`}>
        {type.toUpperCase()}
      </span>
      <div className="mt-4 flex items-center gap-3">
        <img
          src="https://www.google.com/favicon.ico"
          alt="Company"
          className="h-8 w-8 rounded-[1px] border border-[#e7e7e7] object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-[#3d3d3d]">{company}</p>
          <p className="flex items-center gap-1 text-xs text-[#9a9a9a]">
            <img src={mapPinIcon} alt="Location" className="h-3 w-3" />
            {location}
          </p>
        </div>
      </div>
    </Link>
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

export default JobListingSection;
