import React from "react";
import { Plane, Clock, ArrowRight, ExternalLink } from "lucide-react";

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
  emoji_icon,
  call_to_action,
  affiliate_link,
  tag_color,
}) => {
  return (
    <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 shadow-2xl hover:border-gray-700 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-900 rounded-lg">
            <Plane size={20} style={{ color: tag_color }} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{airline}</h3>
            <p className="text-gray-400 text-sm">{route}</p>
          </div>
        </div>
        <span className="text-xs font-mono text-gray-500 bg-gray-900 px-2 py-1 rounded">
          FLIGHT
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-1">
          <p className="text-gray-500 text-xs uppercase tracking-wider">
            Duración
          </p>
          <div className="flex items-center gap-2 text-gray-200">
            <Clock size={14} />
            <span className="text-sm">{duration}</span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-gray-500 text-xs uppercase tracking-wider">
            Escalas
          </p>
          <p className="text-sm text-gray-200">{stops}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <div>
          <p className="text-gray-500 text-xs mb-1">Estimación</p>
          <p className="text-xl font-bold text-white">{price_estimate}</p>
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
  );
};

export default FlightCard;
