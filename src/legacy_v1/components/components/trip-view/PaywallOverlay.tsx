import React from 'react';
import { Lock, FileText, Map, Headphones } from 'lucide-react';

const PaywallOverlay: React.FC = () => {
    return (
        <div className="relative mt-24 py-16 px-6 md:px-12 w-full max-w-4xl mx-auto rounded-3xl border border-gray-100 dark:border-white/5 bg-white/80 dark:bg-[#141A20]/80 backdrop-blur-2xl shadow-2xl text-center overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 dark:to-black/50 pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
                {/* Lock Icon */}
                <div className="w-16 h-16 bg-brand-orange text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-brand-orange/30 animate-pulse">
                    <Lock size={32} />
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-4">
                    Desbloquea los 9 días restantes
                </h2>
                
                <p className="text-lg text-gray-500 dark:text-gray-300 leading-relaxed mb-10 max-w-lg">
                    Andy ya tiene lista tu ruta premium. Logística optimizada, paradas secretas y tips exclusivos para una experiencia futurista.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-12">
                   <button className="flex-1 bg-brand-orange hover:bg-brand-orange/90 text-black font-black py-4 px-8 rounded-xl shadow-lg shadow-brand-orange/20 transition-all hover:scale-105 flex items-center justify-center gap-2 group">
                      DESBLOQUEAR POR $5 USD
                      <Zap size={18} className="group-hover:text-white transition-colors" />
                   </button>
                   <button className="flex-1 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 text-gray-900 dark:text-white font-bold py-4 px-8 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-white/10">
                      Seguir editando día 1
                   </button>
                </div>

                {/* Trust Signals */}
                <div className="flex items-center justify-center gap-6 sm:gap-12 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <FileText size={14} className="text-blue-500" />
                        PDF OFFLINE
                    </div>
                    <div className="flex items-center gap-2">
                        <Map size={14} className="text-green-500" />
                        GOOGLE MAPS LIST
                    </div>
                    <div className="flex items-center gap-2">
                        <Headphones size={14} className="text-brand-orange" />
                        SOPORTE 24/7
                    </div>
                </div>
            </div>
        </div>
    );
};

// Required for Zap icon usage if not imported
import { Zap } from 'lucide-react';

export default PaywallOverlay;
