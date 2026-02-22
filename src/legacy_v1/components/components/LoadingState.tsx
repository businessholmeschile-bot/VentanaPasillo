import React, { useState, useEffect } from 'react';
import { Loader2, Plane, Map, Search, Wallet } from 'lucide-react';

const loadingMessages = [
  { text: "Buscando villas con piscina en Ubud...", icon: <Search className="animate-pulse" /> },
  { text: "Analizando rutas de ferris en El Nido...", icon: <Plane className="animate-bounce" /> },
  { text: "Verificando disponibilidad de hostales premium...", icon: <Map className="animate-spin" /> },
  { text: "Cruzando datos de mareas y clima...", icon: <Loader2 className="animate-spin" /> },
  { text: "Negociando las mejores comisiones para ti...", icon: <Wallet className="animate-pulse" /> },
];

const LoadingState: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-fade-in-up">
      <div className="relative">
        <div className="absolute inset-0 bg-brand-cyan/20 blur-xl rounded-full animate-pulse"></div>
        <div className="bg-white dark:bg-[#141A20] p-6 rounded-2xl border border-gray-100 dark:border-brand-cyan/30 shadow-2xl shadow-brand-cyan/10 relative z-10">
          <div className="text-brand-cyan w-12 h-12 flex items-center justify-center">
            {loadingMessages[currentMessage].icon}
          </div>
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          Andy está pensando...
        </h3>
        <p className="text-brand-cyan font-mono text-sm h-6 transition-all duration-300 px-4">
          {loadingMessages[currentMessage].text}
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
