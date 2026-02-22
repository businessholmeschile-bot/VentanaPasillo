import React from 'react';
import { Calendar, Clock } from 'lucide-react';

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
    <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 dark:before:via-gray-800 before:to-transparent">
      {itinerary.map((day) => (
        <div key={day.day} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          {/* Dot */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#141A20] shadow-sm dark:shadow-lg dark:shadow-brand-cyan/20 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-brand-cyan transition-colors">
            <Calendar size={18} className="text-brand-cyan" />
          </div>
          
          {/* Content */}
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl bg-white dark:bg-[#141A20] border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-xl group-hover:border-brand-cyan/30 transition-all hover:bg-gray-50 dark:hover:bg-[#1A222A]">
            <div className="flex items-center justify-between mb-2">
              <time className="font-mono text-xs font-bold text-brand-cyan uppercase tracking-wider">Día {day.day}</time>
              <h4 className="text-gray-900 dark:text-white font-bold">{day.title}</h4>
            </div>
            
            <div className="space-y-4 mt-4">
              {day.activities.map((activity, idx) => (
                <div key={idx} className="pl-4 border-l-2 border-gray-100 dark:border-gray-800 group-hover:border-gray-200 dark:group-hover:border-gray-700 relative transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-400 dark:text-gray-500 flex items-center gap-1">
                      <Clock size={10} className="text-brand-cyan" /> {activity.time}
                    </span>
                    {activity.is_paid_activity && (
                      <span className="text-[10px] bg-green-500/5 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded border border-green-500/10 dark:border-green-800/30 uppercase font-bold tracking-wider">
                        {activity.cost}
                      </span>
                    )}
                  </div>
                  <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-1 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {activity.emoji_icon} {activity.name}
                  </h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
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
