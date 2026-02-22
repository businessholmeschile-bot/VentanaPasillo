import React from 'react';
import { Plane, DollarSign, Calendar, ThermometerSun, Snowflake, MapPin } from 'lucide-react';
import { Destination } from './InteractiveMap';

interface MapFiltersProps {
  budget: number;
  setBudget: (val: number) => void;
  days: number;
  setDays: (val: number) => void;
  climate: "Frío" | "Calor" | "Templado" | null;
  setClimate: (val: "Frío" | "Calor" | "Templado" | null) => void;
  selectedDestinations: string[];
  destinations: Destination[];
  onGeneratePlan: () => void;
  isDarkMode: boolean;
}

const MapFilters: React.FC<MapFiltersProps> = ({
  budget, setBudget,
  days, setDays,
  climate, setClimate,
  selectedDestinations,
  destinations,
  onGeneratePlan,
  isDarkMode
}) => {

  const selectedNames = selectedDestinations.map(
    (id) => destinations.find((d) => d.id === id)?.name || id
  );

  return (
    <div className={`absolute top-6 left-1/2 -translate-x-1/2 w-11/12 max-w-4xl p-4 rounded-3xl mx-auto backdrop-blur-xl border shadow-2xl transition-all duration-300 z-[1000]
      ${isDarkMode 
        ? 'bg-[#1e293b]/80 border-gray-700/50 shadow-black/40' 
        : 'bg-white/90 border-white/50 shadow-slate-300/40'}
    `}>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Budget */}
        <div className="flex-1 flex items-center gap-3 w-full">
          <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-brand-cyan/10 text-brand-cyan'}`}>
            <DollarSign size={20} />
          </div>
          <div className="flex-1">
            <label className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider block mb-1`}>
              Presupuesto Global
            </label>
            <input 
              type="number" 
              value={budget} 
              onChange={(e) => setBudget(Number(e.target.value))}
              className={`w-full bg-transparent text-xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 rounded-md px-1
                ${isDarkMode ? 'text-white placeholder-gray-600' : 'text-slate-800 placeholder-slate-400'}
              `}
              min="0"
              step="100"
              placeholder="Ej: 1500"
            />
          </div>
        </div>

        {/* Divider */}
        <div className={`hidden md:block w-px h-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>

        {/* Days */}
        <div className="flex-1 flex items-center gap-3 w-full">
          <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-500/10 text-orange-500'}`}>
            <Calendar size={20} />
          </div>
          <div className="flex-1">
            <label className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider block mb-1`}>
              Días Totales
            </label>
            <input 
              type="number" 
              value={days} 
              onChange={(e) => setDays(Number(e.target.value))}
              className={`w-full bg-transparent text-xl font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/50 rounded-md px-1
                ${isDarkMode ? 'text-white placeholder-gray-600' : 'text-slate-800 placeholder-slate-400'}
              `}
              min="1"
              max="90"
            />
          </div>
        </div>

        {/* Divider */}
        <div className={`hidden md:block w-px h-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>

        {/* Climate */}
        <div className="flex-1 flex flex-col gap-1 w-full justify-center">
           <label className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider block text-center mb-1`}>
              Clima Ideal
            </label>
           <div className="flex border rounded-lg overflow-hidden border-orange-500/30">
             <button 
               onClick={() => setClimate(climate === 'Calor' ? null : 'Calor')}
               className={`flex-1 py-1 flex items-center justify-center transition-colors
                 ${climate === 'Calor' ? (isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600 font-bold') : (isDarkMode ? 'text-gray-500 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100')}
               `}
             >
               <ThermometerSun size={18} />
             </button>
             <button 
               onClick={() => setClimate(climate === 'Frío' ? null : 'Frío')}
               className={`flex-1 py-1 flex items-center justify-center transition-colors border-l border-orange-500/30
                 ${climate === 'Frío' ? (isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600 font-bold') : (isDarkMode ? 'text-gray-500 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100')}
               `}
             >
               <Snowflake size={18} />
             </button>
           </div>
        </div>

      </div>

      {/* Selected Destinations summary */}
      <div className={`mt-4 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200'}`}>
         <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Ruta (<span className="text-brand-cyan">{selectedDestinations.length}</span>):
            </span>
            {selectedDestinations.length === 0 ? (
               <span className={`text-sm italic ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                 Pincha puntos verdes en el mapa...
               </span>
            ) : (
               <div className="flex items-center flex-wrap gap-1">
                 {selectedNames.map((name, i) => (
                   <React.Fragment key={name}>
                     {i > 0 && <span className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>→</span>}
                     <span className={`text-sm font-bold px-2 py-0.5 rounded-md ${isDarkMode ? 'bg-[#0f172a] text-white border border-gray-700' : 'bg-white text-slate-800 border border-slate-200 shadow-sm'}`}>
                       {name}
                     </span>
                   </React.Fragment>
                 ))}
               </div>
            )}
         </div>

         <button 
           onClick={onGeneratePlan}
           disabled={selectedDestinations.length === 0}
           className={`px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95
             ${selectedDestinations.length > 0
               ? 'bg-brand-cyan text-white shadow-lg shadow-brand-cyan/20 hover:bg-[#00a8cc]'
               : (isDarkMode ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-slate-200 text-slate-400 cursor-not-allowed')
             }
           `}
         >
           <Plane size={18} />
           Planificar Viaje
         </button>
      </div>

    </div>
  );
};

export default MapFilters;
