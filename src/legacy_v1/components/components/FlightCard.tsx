import React from 'react';
import { Plane, Clock,  ExternalLink } from 'lucide-react';

interface FlightProps {
  airline: string;
  route: string;
  price_estimate: string;
  duration: string;
  stops: string;
  emoji_icon: string;
  call_to_action: string;
  affiliate_link: string;
  tag_color: string;
}

const FlightCard: React.FC<FlightProps> = ({
  airline,
  route,
  price_estimate,
  duration,
  stops,
  call_to_action,
  affiliate_link,
}) => {
  return (
    <div className="bg-white dark:bg-[#141A20] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm dark:shadow-2xl hover:border-brand-cyan/50 transition-all group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-3xl -z-0 translate-x-16 -translate-y-16"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-gray-800 rounded-lg">
              <Plane size={20} className="text-brand-cyan" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold text-lg">{airline}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{route}</p>
            </div>
          </div>
          <span className="text-[10px] font-bold tracking-widest text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-black/40 px-2 py-1 rounded border border-gray-100 dark:border-gray-800">
            VUELO
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-1">
            <p className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider">Duración</p>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <Clock size={14} className="text-brand-cyan" />
              <span className="text-sm font-medium">{duration}</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider">Escalas</p>
            <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">{stops}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <div>
            <p className="text-gray-400 dark:text-gray-500 text-xs mb-1 uppercase tracking-wider">Estimación</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{price_estimate}</p>
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

export default FlightCard;
