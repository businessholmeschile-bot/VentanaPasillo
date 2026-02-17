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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-16 px-4">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-brand-cyan blur-[100px] opacity-20 dark:opacity-20 rounded-full animate-pulse"></div>
      
      <div className="relative z-10 text-center space-y-8">
         <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">
            Ventanapasillo<span className="text-brand-cyan">.com</span>
         </h1>
         <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg mx-auto leading-relaxed">
           Tu arquitecto de viajes personal. <br/>
           <span className="text-brand-orange font-bold uppercase tracking-widest text-sm">Logística real. Sin alucinaciones.</span>
         </p>

        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-purple-600 rounded-2xl blur opacity-10 dark:opacity-25 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative flex items-center bg-white dark:bg-[#141A20] border border-gray-200 dark:border-gray-800 rounded-2xl p-2 shadow-xl dark:shadow-2xl transition-transform group-hover:scale-[1.01]">
            <div className="pl-4 text-gray-400 dark:text-gray-500">
              <Search size={24} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={typedText}
              className="w-full bg-transparent text-gray-900 dark:text-white text-lg px-4 py-4 focus:outline-none placeholder-gray-300 dark:placeholder-gray-600 font-medium"
              disabled={isSearching}
            />
            <button
              type="submit"
              disabled={isSearching || !query.trim()}
              className="bg-brand-cyan hover:bg-opacity-90 text-brand-dark font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-brand-cyan/20"
            >
              {isSearching ? <Loader2 className="animate-spin" size={20} /> : <Plane size={20} className="transform rotate-45" />}
              <span className="hidden md:inline">Despegar</span>
            </button>
          </div>
        </form>

        {/* Quick Prompts */}
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-400 dark:text-gray-500">
          <button onClick={() => setQuery("El Nido, Palawan")} className="hover:text-brand-cyan transition-colors border border-gray-200 dark:border-gray-800 rounded-full px-4 py-2 hover:border-brand-cyan bg-white dark:bg-[#141A20] shadow-sm">🏝️ El Nido, Palawan</button>
          <button onClick={() => setQuery("7 días en Tokio")} className="hover:text-brand-cyan transition-colors border border-gray-200 dark:border-gray-800 rounded-full px-4 py-2 hover:border-brand-cyan bg-white dark:bg-[#141A20] shadow-sm">🍣 Tokio, Japón</button>
          <button onClick={() => setQuery("Nueva York Navidad")} className="hover:text-brand-cyan transition-colors border border-gray-200 dark:border-gray-800 rounded-full px-4 py-2 hover:border-brand-cyan bg-white dark:bg-[#141A20] shadow-sm">🗽 NY Navidad</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;
