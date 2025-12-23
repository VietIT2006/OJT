import React from 'react';
import { Search, Filter, MapPin, Globe, Heart, Share2, Facebook, Linkedin, Twitter, Mail } from 'lucide-react';
import JobCard from './components/JobCard';
import SimilarCompanyCard from './components/SimilarCompanyCard';

const OutBusinessDetailMain: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="bg-white p-6 rounded-lg shadow-sm flex flex-wrap justify-between items-center mb-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMJX6E9M9KL6aCiWpUg0sNDrPVB-mFLjvtJw&s" alt="FPT Logo" className="w-16 h-16 object-contain" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-800">FPT Software</h1>
                <span className="bg-green-100 text-green-600 text-[10px] px-2 py-1 rounded">Outsource</span>
                <span className="bg-blue-100 text-blue-600 text-[10px] px-2 py-1 rounded">Verified</span>
              </div>
              <a href="https://fptsoftware.com" className="text-gray-500 text-sm flex items-center gap-1 mt-1 hover:text-red-500">
                <Globe size={14} /> https://fptsoftware.com/
              </a>
            </div>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button className="p-2 border rounded-md hover:bg-gray-50"><Heart size={20} className="text-red-500" /></button>
            <button className="bg-red-600 text-white px-6 py-2 rounded-md font-medium hover:bg-red-700 transition-colors">Theo Dõi Công Ty</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-4 border-b pb-2">Mô tả về công ty</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Velstar is a Shopify Plus agency, and we partner with brands to help them grow... [Dữ liệu từ db.json]
              </p>
              <h3 className="font-bold mb-2">Chính sách</h3>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
                <li>Great troubleshooting and analytical skills head-on</li>
                <li>3+ years of experience in back-end development</li>
                <li>Familiarity with version control (Git, Jira)</li>
              </ul>
            </section>

            {/* Job Search Area */}
            <section>
              <h2 className="text-lg font-bold mb-4">Việc làm công ty đang mở</h2>
              <div className="flex flex-wrap gap-2 mb-6 bg-white p-2 rounded-lg shadow-sm">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <input type="text" placeholder="Search job..." className="w-full pl-10 pr-4 py-2 border-none outline-none focus:ring-0" />
                </div>
                <div className="relative flex-1 min-w-[150px] border-l">
                  <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <input type="text" placeholder="Vị trí" className="w-full pl-10 pr-4 py-2 border-none outline-none focus:ring-0" />
                </div>
                <button className="bg-gray-100 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-200"><Filter size={18} /> Filters</button>
                <button className="bg-red-600 text-white px-6 py-2 rounded-md font-medium">Find Job</button>
              </div>

              {/* Job List Component */}
              <div className="space-y-4">
                <JobCard title="Technical Support Specialist" type="Part-time" salary="$20,000 - $25,000" location="Dhaka, Bangladesh" />
                <JobCard title="Senior UX Designer" type="Full-time" salary="$30,000 - $45,000" location="Remote" />
              </div>
            </section>
          </div>

          {/* Sidebar (Right) */}
          <aside className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500 border border-gray-100">
              <h3 className="flex items-center gap-2 font-bold mb-3"><MapPin size={18} className="text-red-500"/> Địa chỉ công ty</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Đường D1, Khu Công Nghệ Cao, Phường Tân Phú, Quận 9, Thành phố Hồ Chí Minh</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-bold mb-3">Xem trên Maps</h3>
              <div className="w-full h-48 bg-gray-200 rounded-md overflow-hidden relative">
                 <img src="https://via.placeholder.com/400x300?text=Google+Maps+Placeholder" alt="Map" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-bold mb-4 text-center text-sm text-gray-500">Chia sẻ thông tin công ty</h3>
              <div className="flex justify-center gap-3">
                {[Share2, Linkedin, Facebook, Twitter, Mail].map((Icon, idx) => (
                  <button key={idx} className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
                    <Icon size={18}/>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Similar Companies Section */}
        <section className="mt-12 pb-10">
           <h2 className="text-xl font-bold mb-6">Công ty cùng lĩnh vực</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SimilarCompanyCard name="Dribbble" location="Dhaka, Bangladesh" openPositions={3} />
              <SimilarCompanyCard name="Behance" location="Remote" openPositions={5} />
              <SimilarCompanyCard name="Pinterest" location="San Francisco, USA" openPositions={2} />
           </div>
        </section>
      </div>
    </div>
  );
};

export default OutBusinessDetailMain;