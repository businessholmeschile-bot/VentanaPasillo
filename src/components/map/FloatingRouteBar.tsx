import React from 'react';
import { X, MapPin } from 'lucide-react';
import { Destination } from './InteractiveMap';

interface FloatingRouteBarProps {
  selectedDestinations: string[];
  destinations: Destination[];
  onRemoveDestination: (id: string) => void;
  isDarkMode: boolean;
}

const FloatingRouteBar: React.FC<FloatingRouteBarProps> = ({
  selectedDestinations,
  destinations,
  onRemoveDestination,
  isDarkMode,
}) => {
  if (selectedDestinations.length === 0) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[400] w-full max-w-3xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className={`
        backdrop-blur-xl border rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4
        ${isDarkMode 
          ? 'bg-[#0B1116]/80 border-white/10 shadow-black/40' 
          : 'bg-white/90 border-slate-200 shadow-slate-200/50'}
      `}>
        <div className={`
          flex items-center gap-2 px-3 py-1.5 rounded-xl shrink-0
          ${isDarkMode ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-brand-cyan/10 text-brand-cyan'}
        `}>
          <MapPin size={16} />
          <span className="text-xs font-black uppercase tracking-widest">Tu Ruta</span>
          <span className="bg-brand-cyan text-white text-[10px] px-1.5 py-0.5 rounded-full font-black ml-1">
            {selectedDestinations.length}
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth flex-1 items-center py-1">
          {selectedDestinations.map((id, idx) => {
            const dest = destinations.find((d) => d.id === id);
            const name = dest?.name || id;
            return (
              <React.Fragment key={id}>
                {idx > 0 && (
                  <span className={`text-[10px] font-black ${isDarkMode ? 'text-gray-700' : 'text-slate-300'}`}>
                    →
                  </span>
                )}
                <div 
                  className={`
                    group flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap border transition-all
                    ${isDarkMode 
                      ? 'bg-white/5 border-white/5 text-gray-300 hover:border-brand-cyan/40 hover:text-white' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-brand-cyan/40 hover:text-brand-cyan'}
                  `}
                >
                  {name}
                  <button
                    onClick={() => onRemoveDestination(id)}
                    className="opacity-40 hover:opacity-100 hover:text-red-500 transition-opacity"
                  >
                    <X size={12} strokeWidth={3} />
                  </button>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FloatingRouteBar;
