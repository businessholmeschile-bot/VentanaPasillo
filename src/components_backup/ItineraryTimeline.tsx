import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface Activity {
  time: string;
  name: string;
  description: string;
  cost: string;
  emoji_icon: string;
  location_url: string;
  is_paid_activity: boolean;
}

interface Day {
  day: number;
  title: string;
  activities: Activity[];
}

interface ItineraryProps {
  itinerary: Day[];
}

const ItineraryTimeline: React.FC<ItineraryProps> = ({ itinerary }) => {
  return (
    <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-800 before:via-gray-700 before:to-gray-800">
      {itinerary.map((day) => (
        <div key={day.day} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          {/* Dot */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 bg-gray-900 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            <Calendar size={18} className="text-[#00C2FF]" />
          </div>
          
          {/* Content */}
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl bg-[#1A1A1A] border border-gray-800 shadow-xl group-hover:border-gray-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <time className="font-mono text-xs font-bold text-[#00C2FF] uppercase">Día {day.day}</time>
              <h4 className="text-white font-bold">{day.title}</h4>
            </div>
            
            <div className="space-y-4 mt-4">
              {day.activities.map((activity, idx) => (
                <div key={idx} className="pl-4 border-l-2 border-gray-800 relative">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                      <Clock size={10} /> {activity.time}
                    </span>
                    {activity.is_paid_activity && (
                      <span className="text-[10px] bg-green-900/30 text-green-400 px-1.5 py-0.5 rounded border border-green-800/50 uppercase font-bold">
                        {activity.cost}
                      </span>
                    )}
                  </div>
                  <h5 className="text-sm font-semibold text-gray-200 flex items-center gap-1">
                    {activity.emoji_icon} {activity.name}
                  </h5>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryTimeline;
