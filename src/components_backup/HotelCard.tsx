import React from 'react';
import { Hotel, MapPin, CheckCircle2, ExternalLink } from 'lucide-react';

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
  emoji_icon,
  call_to_action,
  affiliate_link,
  tag_color,
  badges,
}) => {
  return (
    <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all shadow-xl group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-900 rounded-lg">
              <Hotel size={20} style={{ color: tag_color }} />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg leading-tight">{name}</h3>
              <div className="flex items-center gap-1 text-gray-400 mt-1">
                <MapPin size={12} />
                <span className="text-xs">{location}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-4 italic">
          "{reason_to_book}"
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {badges.map((badge, idx) => (
            <span 
              key={idx} 
              className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-gray-900 text-gray-400 border border-gray-800"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div>
            <p className="text-gray-500 text-xs mb-1">Por noche</p>
            <p className="text-lg font-bold text-white">{price_night}</p>
          </div>
          <a
            href={affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: tag_color }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-black font-bold hover:opacity-90 transition-opacity whitespace-nowrap"
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
