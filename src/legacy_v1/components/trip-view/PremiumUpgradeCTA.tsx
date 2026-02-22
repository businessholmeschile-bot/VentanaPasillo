import React from 'react';
import { Smartphone, Download, Map, Zap, CheckCircle2, ChevronRight } from 'lucide-react';

const PremiumUpgradeCTA: React.FC = () => {
    return (
        <div className="relative mt-20 p-8 md:p-12 w-full max-w-5xl mx-auto rounded-[2rem] border border-brand-cyan/20 bg-[#0B1116] overflow-hidden group">
            
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                
                {/* Left: Value Prop */}
                <div className="text-left space-y-8">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold uppercase tracking-widest">
                        <Zap size={12} fill="currentColor" />
                        Andy Premium
                    </div>
                    
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
                            Lleva este plan <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-purple-400">en tu bolsillo.</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            La planificación es gratis, la tranquilidad tiene un pequeño costo. Desbloquea las herramientas offline para viajar sin internet.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 group/item">
                            <div className="w-10 h-10 rounded-xl bg-gray-800 group-hover/item:bg-brand-cyan/20 flex items-center justify-center transition-colors">
                                <Download size={20} className="text-gray-300 group-hover/item:text-brand-cyan" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold">PDF Inteligente & Calendar</h4>
                                <p className="text-sm text-gray-500">Sincroniza todo tu itinerario con un click.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group/item">
                            <div className="w-10 h-10 rounded-xl bg-gray-800 group-hover/item:bg-green-500/20 flex items-center justify-center transition-colors">
                                <Map size={20} className="text-gray-300 group-hover/item:text-green-400" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold">Mapas Offline & Secretos VIP</h4>
                                <p className="text-sm text-gray-500">Ruta cargada en Google Maps para usar sin datos.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group/item">
                            <div className="w-10 h-10 rounded-xl bg-gray-800 group-hover/item:bg-purple-500/20 flex items-center justify-center transition-colors">
                                <Smartphone size={20} className="text-gray-300 group-hover/item:text-purple-400" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold">Soporte WhatsApp 24/7</h4>
                                <p className="text-sm text-gray-500">Acceso directo a Andy mientras viajas.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: CTA Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center relative hover:border-brand-cyan/30 transition-colors">
                     <div className="absolute -top-4 right-8 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-green-500/20">
                        OFERTA FASE 2
                     </div>

                    <h3 className="text-gray-300 font-medium mb-2">Pack Viajero Pro</h3>
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <span className="text-5xl font-black text-white">$4.99</span>
                        <div className="text-left leading-none">
                            <span className="block text-sm font-bold text-gray-400 line-through decoration-red-500">$19.99</span>
                            <span className="block text-xs font-bold text-gray-500">USD / Único</span>
                        </div>
                    </div>

                    <button className="w-full bg-brand-cyan hover:bg-brand-cyan/90 text-black font-black py-4 px-6 rounded-xl shadow-xl shadow-brand-cyan/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 mb-4">
                        Obtener Premium
                        <ChevronRight size={20} />
                    </button>
                    
                    <p className="text-xs text-gray-500 max-w-xs mx-auto">
                        Pago único seguro vía Stripe. Garantía de satisfacción de 30 días.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default PremiumUpgradeCTA;
