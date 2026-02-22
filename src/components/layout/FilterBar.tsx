import React from 'react';
import { 
  Calendar, 
  ThermometerSun, 
  Snowflake, 
  Heart, 
  Palmtree, 
  CloudRain, 
  Mountain, 
  Send,
  X 
} from 'lucide-react';
import { Destination } from '../map/InteractiveMap';

interface FilterBarProps {
  budget: number;
  setBudget: (val: number) => void;
  days: number;
  setDays: (val: number) => void;
  climates: string[];
  toggleClimate: (c: string) => void;
  selectedThemes: string[];
  toggleThemeTag: (t: string) => void;
  onGeneratePlan: () => void;
  selectedDestinations: string[];
  destinations: Destination[];
  onRemoveDestination: (id: string) => void;
  isDarkMode: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({
  budget, setBudget,
  days, setDays,
  climates, toggleClimate,
  selectedThemes, toggleThemeTag,
  onGeneratePlan,
  selectedDestinations,
  destinations,
  onRemoveDestination,
  isDarkMode
}) => {
  return (
    <div className={`w-full px-6 py-4 flex flex-col gap-4 border-b ${isDarkMode ? 'bg-[#0B1116] border-white/5' : 'bg-white border-slate-100'}`}>
      
      {/* Filters Row */}
      <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-8">
        
        {/* Budget */}
        <div className="flex flex-col gap-1 min-w-[200px]">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>Presupuesto</span>
            <span className="text-brand-cyan text-sm">${budget.toLocaleString('es-CL')}</span>
          </div>
          <input 
            type="range" 
            min="200000" 
            max="15000000" 
            step="50000" 
            value={budget} 
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
          />
        </div>

        {/* Days */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Días</label>
          <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <Calendar size={16} className="text-orange-500" />
            <input 
              type="number" 
              value={days} 
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-8 bg-transparent text-sm font-black focus:outline-none"
            />
          </div>
        </div>

        {/* Climate */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Clima</label>
          <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-white/5">
            <button 
              onClick={() => toggleClimate('Calor')}
              className={`p-2 rounded-lg transition-all ${climates.includes('Calor') ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400'}`}
            >
              <ThermometerSun size={18} />
            </button>
            <button 
              onClick={() => toggleClimate('Frío')}
              className={`p-2 rounded-lg transition-all ${climates.includes('Frío') ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400'}`}
            >
              <Snowflake size={18} />
            </button>
          </div>
        </div>

        {/* Vibra (Themes) */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Vibra</label>
          <div className="flex gap-2">
            {[
              { id: 'romance', icon: Heart },
              { id: 'playa', icon: Palmtree },
              { id: 'aventura', icon: CloudRain },
              { id: 'naturaleza', icon: Mountain }
            ].map(({ id, icon: Icon }) => (
              <button 
                key={id}
                onClick={() => toggleThemeTag(id)}
                className={`p-2 rounded-xl transition-all ${selectedThemes.includes(id) ? 'bg-brand-cyan text-white' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>

        {/* Plan Button */}
        <button 
          onClick={onGeneratePlan}
          disabled={selectedDestinations.length === 0}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all
            ${selectedDestinations.length > 0 
              ? 'bg-brand-cyan text-white shadow-xl shadow-brand-cyan/20 hover:scale-105 active:scale-95' 
              : 'bg-slate-100 dark:bg-white/5 text-slate-300 dark:text-gray-600 cursor-not-allowed'}
          `}
        >
          <Send size={18} />
          Planificar
        </button>

      </div>

      {/* Selected Destinations / Tu Ruta Row */}
      <div className="max-w-7xl mx-auto w-full flex items-center gap-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tu Ruta ({selectedDestinations.length})</span>
        <div className="flex flex-wrap gap-2">
          {selectedDestinations.map(id => {
            const dest = destinations.find(d => d.id === id);
            return (
              <div key={id} className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold">
                {dest?.name}
                <button onClick={() => onRemoveDestination(id)} className="hover:text-red-500">
                  <X size={12} />
                </button>
              </div>
            );
          })}
          {selectedDestinations.length === 0 && (
            <span className="text-xs italic text-slate-400">Pincha puntos en el mapa...</span>
          )}
        </div>
      </div>

    </div>
  );
};

export default FilterBar;
