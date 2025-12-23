import React from 'react';
import { MapPin } from 'lucide-react';

interface SimilarCompanyProps {
  name: string;
  location: string;
  openPositions: number;
}

const SimilarCompanyCard: React.FC<SimilarCompanyProps> = ({ name, location, openPositions }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 flex flex-col items-center text-center space-y-3">
      <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
        {name.charAt(0).toLowerCase()}
      </div>
      <div>
        <h4 className="font-bold">{name} <span className="text-[10px] bg-red-100 text-red-500 px-2 py-0.5 rounded">Featured</span></h4>
        <p className="text-gray-400 text-sm flex items-center justify-center gap-1 mt-1">
          <MapPin size={14} /> {location}
        </p>
      </div>
      <button className="w-full bg-blue-50 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-100 transition-colors">
        Open Position ({openPositions})
      </button>
    </div>
  );
};

export default SimilarCompanyCard;