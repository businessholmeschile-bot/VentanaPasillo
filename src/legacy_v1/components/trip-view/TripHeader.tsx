import React from 'react';
import { Share2, HelpCircle } from 'lucide-react';
import { TravelData } from '../../services/aiPlanner';

interface TripHeaderProps {
  data: TravelData;
}

const TripHeader: React.FC<TripHeaderProps> = ({ data }) => {
  return (
    <div className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#0F0F0F]/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5 h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-cyan flex items-center justify-center text-white font-black text-xs">
            VP
          </div>
          <div className="leading-none">
            <h1 className="text-xs font-black uppercase tracking-widest text-brand-dark dark:text-white">
              Andy: Tu Copiloto
            </h1>
            <p className="text-[10px] text-brand-cyan tracking-widest font-bold">
              VENTANAPASILLO.COM
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Ruta 100% Optimizada</span>
          <HelpCircle size={10} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5">
          Mis Viajes
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2 rounded-full transition-colors shadow-lg shadow-blue-600/20">
          Exportar PDF
        </button>
      </div>
    </div>
  );
};

export default TripHeader;
