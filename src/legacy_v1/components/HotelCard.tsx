import React from 'react';
import { Hotel, MapPin, ExternalLink } from 'lucide-react';

interface HotelProps {
  name: string;
  location: string;
  price_night: string;
  reason_to_book: string;
  emoji_icon: string;
  call_to_action: string;
  affiliate_link: string;
  tag_color: string;
  badges: string[];
}

const HotelCard: React.FC<HotelProps> = ({
  name,
  location,
  price_night,
  reason_to_book,
  call_to_action,
  affiliate_link,
  badges,
}) => {
  return (
    <div className="bg-white dark:bg-[#141A20] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-brand-cyan/50 transition-all shadow-sm dark:shadow-xl group relative">
       <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-brand-cyan/5 rounded-full blur-3xl"></div>

      <div className="p-6 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-gray-800 rounded-lg">
              <Hotel size={20} className="text-brand-cyan" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold text-lg leading-tight group-hover:text-brand-cyan transition-colors">{name}</h3>
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mt-1">
                <MapPin size={12} />
                <span className="text-xs">{location}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 italic pl-3 border-l-2 border-brand-orange/50">
          "{reason_to_book}"
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {badges.map((badge, idx) => (
            <span 
              key={idx} 
              className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-brand-cyan/5 dark:bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <div>
            <p className="text-gray-400 dark:text-gray-500 text-xs mb-1 uppercase tracking-wider">Por noche</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{price_night}</p>
          </div>
          <a
            href={affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-cyan text-black font-bold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-brand-cyan/20 whitespace-nowrap"
          >
            {call_to_action}
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
