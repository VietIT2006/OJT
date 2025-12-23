import React from 'react';
import { MapPin, Heart } from 'lucide-react';

interface JobCardProps {
  title: string;
  type: string;
  salary: string;
  location: string;
}

const JobCard: React.FC<JobCardProps> = ({ title, type, salary, location }) => {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-100 hover:border-red-300 transition-all flex justify-between items-start">
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center font-bold text-blue-600">G</div>
        <div>
          <h4 className="font-bold text-gray-800">{title}</h4>
          <div className="flex gap-2 text-xs my-1">
            <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase font-semibold">{type}</span>
            <span className="text-gray-500 italic">Salary: {salary}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-sm mt-2">
            <MapPin size={14} /> {location}
          </div>
        </div>
      </div>
      <button className="text-gray-300 hover:text-red-500"><Heart size={20} /></button>
    </div>
  );
};

export default JobCard;