import React, { useState, useEffect } from 'react';
import { Plane, Search, Loader2 } from 'lucide-react';

interface HeroSearchProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

const HeroSearch: React.FC<HeroSearchProps> = ({ onSearch, isSearching }) => {
  const [query, setQuery] = useState('');
  const [typedText, setTypedText] = useState('');
  const placeholderText = "Ej: 7 días en Tokio, barato y con comida callejera...";

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setTypedText(placeholderText.slice(0, index));
      index++;
      if (index > placeholderText.length) {
        clearInterval(intervalId);
      }
    }, 50);
    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-16 px-4">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-brand-cyan blur-[100px] opacity-20 dark:opacity-20 rounded-full animate-pulse"></div>
      
      <div className="relative z-10 text-center space-y-8 pt-20">
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold tracking-widest uppercase mb-4 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
            10,000+ rutas planificadas este mes
         </div>
         <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter mb-4 leading-tight">
            Andy pregunta:<br/>
            <span className="text-brand-cyan">¿Ventana o Pasillo?</span>
         </h1>
         <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
           Tu copiloto de viajes con IA que diseña rutas reales, optimiza tu presupuesto y elimina la incertidumbre de planificar.
         </p>

        <form onSubmit={handleSearch} className="relative group">
          <div className={`relative flex items-center bg-white dark:bg-[#141A20] rounded-2xl shadow-2xl shadow-brand-cyan/20 dark:shadow-brand-cyan/10 border border-gray-100 dark:border-gray-800 transition-all focus-within:ring-4 focus-within:ring-brand-cyan/20 focus-within:border-brand-cyan overflow-hidden group hover:shadow-brand-cyan/30 dark:hover:shadow-brand-cyan/20`}>
            <div className="pl-6 text-gray-400 dark:text-gray-500">
              <Search className="w-6 h-6 group-focus-within:text-brand-cyan transition-colors" />
            </div>
            <input
              type="text"
              className="w-full bg-transparent border-none focus:ring-0 text-lg md:text-xl p-6 text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 font-medium"
              placeholder={typedText}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              disabled={isSearching}
            />
            <button 
              onClick={handleSearch}
              disabled={isSearching || !query.trim()}
              className={`mr-3 px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2
                ${!query.trim() || isSearching 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed' 
                  : 'bg-brand-cyan text-white hover:bg-brand-cyan/90 hover:scale-105 shadow-lg shadow-brand-cyan/30'
                }`}
            >
              {isSearching ? <Loader2 className="animate-spin" size={20} /> : <Plane size={20} className="transform rotate-45" />}
              <span className="hidden md:inline">Despegar</span>
            </button>
          </div>
        </form>

        {/* Developer / Testing Menu */}
        <div className="flex flex-col items-center gap-3 mt-6">
           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">⚡ Modo Developer: Test de Estrés</h3>
           <div className="flex flex-wrap justify-center gap-2">
              {[
                "Antártica expedición científica estilo premium",
                "Chernobyl tour fotográfico zona exclusión",
                "Amazonas supervivencia extrema selva profunda",
                "Sahara marruecos lujo campamento nómada",
                "Japón ruta espiritual templos poco turísticos",
                "Islandia auroras boreales con cabaña aislada",
                "Bhutan monasterios nido del tigre exclusivo",
                "Corea del Norte tour histórico estricto",
                "Patagonia chilena trekking remoto glaciares",
                "Egipto arqueología profunda acceso especial"
              ].map((sub, i) => (
                  <button 
                    key={i}
                    onClick={() => onSearch(sub)} 
                    className="text-[10px] bg-gray-800 hover:bg-brand-cyan text-gray-400 hover:text-white transition-colors border border-gray-700 rounded-lg px-3 py-1.5"
                  >
                    {sub.split(' ').slice(0, 3).join(' ')}...
                  </button>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;
