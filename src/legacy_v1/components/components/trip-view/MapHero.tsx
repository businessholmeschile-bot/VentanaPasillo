import React from 'react';
import { MapPin } from 'lucide-react';

interface MapHeroProps {
  mapImage?: string; // Optional custom map
  pins: { id: number; label: string; x: number; y: number }[]; // Coordinates for dynamic pins
}

const MapHero: React.FC<MapHeroProps> = ({ mapImage = "https://cdn.dribbble.com/users/3534898/screenshots/16386616/media/511c79805908f51a705e3f3b145d5a7d.png", pins = [] }) => {
  return (
    <div className="relative w-full h-[60vh] md:h-[500px] overflow-hidden group">
      {/* Background with Blur Fade */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-110 transition-transform duration-[2s]"
        style={{ backgroundImage: `url(${mapImage})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0B1116] via-transparent to-transparent"></div>
      
      {/* Dynamic Map Pins */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {/* Placeholder pins for now - center them roughly */}
        <div className="absolute top-[30%] left-[45%] flex flex-col items-center animate-bounce-slow">
           <MapPin className="text-blue-500 fill-current" size={32} />
           <div className="mt-2 bg-white dark:bg-[#141A20] px-3 py-1.5 rounded-lg shadow-xl shadow-black/20 text-xs font-bold text-gray-800 dark:text-white border border-gray-100 dark:border-white/10 uppercase tracking-wider backdrop-blur-md">
             1. Shibuya Crossing
           </div>
        </div>

        <div className="absolute top-[50%] right-[35%] flex flex-col items-center animate-float">
           <MapPin className="text-brand-orange fill-current" size={32} />
           <div className="mt-2 bg-white dark:bg-[#141A20] px-3 py-1.5 rounded-lg shadow-xl shadow-black/20 text-xs font-bold text-gray-800 dark:text-white border border-gray-100 dark:border-white/10 uppercase tracking-wider backdrop-blur-md">
             2. Shinjuku Gyoen
           </div>
        </div>
      </div>
    </div>
  );
};

export default MapHero;
