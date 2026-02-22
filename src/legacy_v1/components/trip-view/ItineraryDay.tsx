import React, { useState } from 'react';
import { Camera, Clock, DollarSign, MapPin, Tag } from 'lucide-react';
import { Activity } from '../../services/aiPlanner';

interface ItineraryDayProps {
  day: number;
  title: string;
  activities: Activity[];
}

const ItineraryDay: React.FC<ItineraryDayProps> = ({ day, title, activities = [] }) => {
  return (
    <div className="space-y-12">
      {/* Day Header */}
      <div className="relative border-l-4 border-blue-500 pl-6 py-2 mb-8 z-10">
        <h1 className="text-6xl md:text-8xl font-black text-gray-100 dark:text-white/5 absolute -top-10 -left-6 select-none -z-10 font-display">
          Día {day}
        </h1>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight relative bg-gray-50 dark:bg-[#0B1116] inline-block px-2 ml-[-8px]">
          Día {day}: {title}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 italic mt-2 animate-fade-in-up pl-2">
          "El equilibrio perfecto entre lo futurista y lo tradicional."
        </p>
      </div>

      {/* Activities Grid */}
      <div className="space-y-6">
        {activities.map((act, idx) => (
          <ActivityCard key={idx} activity={act} idx={idx} />
        ))}
        {/* Fallback Activities if only 1 or 2 */}
        {activities.length < 3 && (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded text-red-500 text-sm">
                Warning: AI only generated {activities.length} activity. UI requires 3 for demo.
            </div>
        )}
      </div>

    </div>
  );
};

const ActivityCard: React.FC<{ activity: Activity, idx: number }> = ({ activity }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(activity.image_url || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800");

  const handleImgError = () => {
      // Fallback: Generic Map/Travel Image if the specific one fails
      // Using a different robust URL to avoid infinite loops if fallback also fails (though unlikely with Unsplash)
      if (imgSrc !== "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop") {
          setImgSrc("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop");
      }
  };

  return (
    <div 
        className="group relative bg-white dark:bg-[#141A20] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-white/5 flex flex-col md:flex-row"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        {/* Cost Tag */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-white/90 dark:bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-gray-100 dark:border-white/10 text-xs font-bold text-gray-900 dark:text-white shadow-sm">
            <span className="uppercase tracking-widest opacity-60">
                 {activity.time}
            </span>
            <span className={`px-2 py-0.5 rounded ${activity.cost === 'Gratis' || activity.cost === 'Free' ? 'bg-green-100 text-green-700' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300'}`}>
                {activity.cost}
            </span>
        </div>

        {/* Image Side (1 Main + 3 Small Layout) */}
        <div className="w-full md:w-5/12 p-3 flex flex-col gap-2">
            {/* Main Image */}
            <div className="h-48 md:h-56 rounded-2xl overflow-hidden relative bg-gray-200 dark:bg-white/5">
                <img 
                    src={imgSrc} 
                    alt={activity.name}
                    onError={handleImgError}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>
            {/* 3 Small Thumbnails (Real Thematic Images) */}
            <div className="grid grid-cols-3 gap-2 h-16">
                 {activity.thumb_urls && activity.thumb_urls.length > 0 ? (
                     activity.thumb_urls.map((thumb, i) => (
                        <div key={i} className="rounded-lg bg-gray-100 dark:bg-white/5 overflow-hidden relative">
                            <img 
                                src={thumb} 
                                onError={(e) => e.currentTarget.style.display = 'none'} 
                                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" 
                                alt={`thumbnail-${i}`}
                            />
                        </div>
                     ))
                 ) : (
                     // Fallback if no specific thumbs (Older logic)
                     <>
                        <div className="rounded-lg bg-gray-100 dark:bg-white/5 overflow-hidden relative">
                            <img src={`${imgSrc}&blur=2`} className="w-full h-full object-cover opacity-60" />
                        </div>
                        <div className="rounded-lg bg-gray-100 dark:bg-white/5 overflow-hidden relative flex items-center justify-center">
                            <MapPin size={16} className="text-gray-400" />
                        </div>
                        <div className="rounded-lg bg-gray-100 dark:bg-white/5 overflow-hidden relative flex items-center justify-center bg-brand-cyan/10">
                            <span className="text-[10px] font-bold text-brand-cyan">+ Info</span>
                        </div>
                     </>
                 )}
            </div>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-between relative">
            <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-blue-500 transition-colors">
                    {activity.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light mb-4 line-clamp-3">
                    {activity.description}
                </p>
                
                {/* Specific Tip/Insight - Always show if available */}
                {activity.tips && (
                    <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-3 flex items-start gap-3 mt-2">
                        <div className="p-1.5 bg-blue-500 rounded-full text-white mt-0.5 shadow-sm min-w-[24px]">
                            <Tag size={12} fill="currentColor" />
                        </div>
                        <p className="text-xs text-blue-800 dark:text-blue-200 italic font-medium">
                            "{activity.tips}"
                        </p>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-500 uppercase tracking-wider">
                    <Clock size={14} />
                    <span>Recomendado: 2 Horas</span>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ItineraryDay;
