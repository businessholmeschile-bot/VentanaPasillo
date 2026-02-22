import React from 'react';
import { Plane, Calendar, Wallet, CheckCircle2, ChevronRight, MapPin, Coffee, ArrowRight, Heart } from 'lucide-react';
import { TravelPlan } from '../../services/aiPlanner';

interface TripDashboardProps {
  plan: TravelPlan;
  isDarkMode: boolean;
  totalBudget: number;
  days: number;
  user?: any;
  onSave?: () => void;
}

const TripDashboard = ({ plan, isDarkMode, totalBudget, days, user, onSave }: TripDashboardProps) => {
  const isDark = isDarkMode;

  // Render a Flight Card
  const renderFlight = (flight: any, isFast: boolean) => (
    <div className={`p-6 rounded-3xl border flex flex-col justify-between transition-transform transform hover:-translate-y-1 shadow-lg
      ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}
    `}>
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
             <div className={`p-3 rounded-2xl ${isFast ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-orange-500/20 text-orange-500'}`}>
                {isFast ? <Plane size={24} /> : <Plane className="rotate-45" size={24} />}
             </div>
             <div>
               <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                 {isFast ? 'Ruta Directa' : 'Opción Ahorro'}
               </h3>
               <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{flight.airline}</p>
             </div>
          </div>
          <span className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-800'}`}>
             {flight.price_estimate}
          </span>
        </div>
        
        <div className={`flex items-center justify-between text-sm py-3 border-y mb-4 ${isDark ? 'border-white/10 text-gray-400' : 'border-slate-100 text-slate-500'}`}>
           <span className="flex items-center gap-1"><MapPin size={14}/> {flight.route}</span>
           <span>{flight.duration}</span>
           <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${isFast ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-orange-500/20 text-orange-500'}`}>
             {flight.stops}
           </span>
        </div>
      </div>
      
      <a 
        href={flight.affiliate_link || "#"}
        target="_blank" rel="noopener noreferrer"
        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors
          ${isFast 
            ? 'bg-brand-cyan text-white hover:bg-opacity-90 shadow-brand-cyan/30' 
            : 'bg-orange-500 text-white hover:bg-opacity-90 shadow-orange-500/30'}
        `}
      >
        {flight.call_to_action} <ArrowRight size={16} />
      </a>
    </div>
  );

  return (
    <div className={`relative w-full pb-20 ${isDark ? 'text-white' : 'text-slate-900'} font-sans`}>
      {/* Overview Head */}
      <div className="text-center mb-12">
         <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 break-words leading-[1.1]">
           {plan.destination_name}
         </h1>
         <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
           {plan.summary}
         </p>
         
         <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border
              ${isDark ? 'border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan' : 'border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan-700'}`}>
              <Calendar size={16}/> {days} Días
            </span>
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border
              ${isDark ? 'border-orange-500/30 bg-orange-500/10 text-orange-500' : 'border-orange-500/20 bg-orange-500/5 text-orange-600'}`}>
              <Wallet size={16}/> {totalBudget} USD
            </span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
         {/* Left col: Flights & Hotels */}
         <div className="lg:col-span-2 space-y-8">
            
            {/* Flights Panel */}
            <section>
               <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                 Vuelos Optimizados
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {plan.flight_fast && renderFlight(plan.flight_fast, true)}
                 {plan.flight_cheap && renderFlight(plan.flight_cheap, false)}
               </div>
            </section>

            {/* Hotels Suggestion */}
            {plan.hotels_suggestion && plan.hotels_suggestion.length > 0 && (
               <section>
                 <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                   Alojamientos Estratégicos
                 </h2>
                 <div className="space-y-4">
                    {plan.hotels_suggestion.map((h, i) => (
                      <div key={i} className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-transform hover:-translate-y-1 shadow-md
                        ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}
                      `}>
                         <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-lg">{h.name}</h3>
                                {h.badges.map((b, bi) => (
                                  <span key={bi} className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold
                                      ${i === 0 ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-gray-500/20 text-gray-500'}
                                  `}>
                                    {b}
                                  </span>
                                ))}
                            </div>
                            <p className={`text-sm flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                               <MapPin size={14} /> {h.location}
                            </p>
                            <p className={`text-sm mt-2 font-medium italic ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                              "{h.reason_to_book}"
                            </p>
                         </div>
                         <div className="flex md:flex-col items-center justify-between md:items-end gap-3 md:gap-1 border-t md:border-t-0 pt-4 md:pt-0">
                            <span className="text-xl font-black">{h.price_night}</span>
                            <span className="text-xs uppercase tracking-widest text-gray-400 mb-2">/ noche</span>
                            <a href={h.affiliate_link} target="_blank" rel="noopener noreferrer" 
                               className={`px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2
                                ${i === 0 ? 'bg-brand-cyan text-white hover:bg-brand-cyan/90' : (isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-slate-800 text-white hover:bg-slate-700')}`}>
                               {h.call_to_action} <ChevronRight size={14}/>
                            </a>
                         </div>
                      </div>
                    ))}
                 </div>
               </section>
            )}

            {/* Itinerary */}
            {plan.itinerary && plan.itinerary.length > 0 && (
               <section>
                  <h2 className="text-2xl font-bold mb-6 mt-12 flex items-center gap-2">
                   Plan Día a Día
                 </h2>
                 <div className="space-y-12">
                    {plan.itinerary.map((day) => (
                       <div key={day.day} className={`p-8 rounded-[2rem] border overflow-hidden relative
                          ${isDark ? 'bg-[#0B1116] border-white/10 shadow-2xl shadow-black/20' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'}
                       `}>
                          <div className="absolute top-0 right-0 p-8 opacity-5">
                            <span className="text-8xl font-black">0{day.day}</span>
                          </div>

                          <div className="flex items-center gap-4 mb-8 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-brand-cyan text-white flex flex-col items-center justify-center shrink-0 shadow-lg shadow-brand-cyan/20">
                               <span className="text-[10px] font-black uppercase tracking-tighter leading-none mb-1">Día</span>
                               <span className="text-2xl font-black leading-none">{day.day}</span>
                            </div>
                            <div>
                               <h3 className="text-xl md:text-2xl font-black tracking-tight break-words">{day.title}</h3>
                               <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                                 Actividades curadas por Andy
                               </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                             {day.activities.map((act, i) => (
                                <div key={i} className={`group p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02]
                                   ${isDark 
                                     ? 'bg-white/5 border-white/5 hover:bg-white/[0.08] hover:border-brand-cyan/30' 
                                     : 'bg-slate-50 border-slate-100 hover:bg-white hover:border-brand-cyan/30 hover:shadow-xl hover:shadow-brand-cyan/5'}
                                `}>
                                   <div className="flex justify-between items-start mb-3">
                                      <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest
                                         ${isDark ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-brand-cyan/10 text-brand-cyan'}
                                      `}>
                                         {act.time}
                                      </div>
                                      <span className={`text-[11px] font-bold px-2 py-1 rounded-lg
                                         ${act.cost.includes('Gratis') || act.cost.includes('Free') 
                                           ? 'bg-green-500/20 text-green-500' 
                                           : (isDark ? 'bg-white/10 text-gray-400' : 'bg-slate-200 text-slate-600')}
                                      `}>
                                         {act.cost}
                                      </span>
                                   </div>

                                   <div className="flex gap-4">
                                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl
                                         ${isDark ? 'bg-[#0B1116]' : 'bg-white shadow-sm'}
                                      `}>
                                         {act.emoji_icon}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                         {act.location_url ? (
                                            <a 
                                              href={act.location_url} 
                                              target="_blank" 
                                              rel="noopener noreferrer"
                                              className="font-bold text-base leading-tight hover:text-brand-cyan transition-colors flex items-center gap-1 group/link truncate"
                                            >
                                              {act.name} <ArrowRight size={12} className="opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
                                            </a>
                                         ) : (
                                            <h4 className="font-bold text-base leading-tight truncate">{act.name}</h4>
                                         )}
                                         <p className={`text-sm mt-1 mb-3 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                                            {act.description}
                                         </p>
                                      </div>
                                   </div>

                                   {act.tips && (
                                     <div className={`mt-2 py-2 px-3 rounded-xl flex items-start gap-2 text-xs font-medium
                                        ${isDark ? 'bg-orange-500/10 text-orange-300' : 'bg-orange-50 text-orange-700'}
                                     `}>
                                        <Coffee size={14} className="shrink-0 mt-0.5" />
                                        <span><span className="font-bold uppercase text-[9px] mr-1">Andy dice:</span>{act.tips}</span>
                                     </div>
                                   )}
                                </div>
                             ))}
                          </div>
                       </div>
                    ))}
                 </div>
               </section>
            )}

         </div>

         {/* Right Col: The Pocket / El Bolsillo (Sticky) */}
         <div className="lg:col-span-1 relative">
            <div className={`sticky top-24 p-6 rounded-3xl border shadow-2xl 
               ${isDark ? 'bg-[#151b23] border-gray-800' : 'bg-white border-slate-200'}
            `}>
               <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-brand-cyan/20 rounded-2xl text-brand-cyan">
                     <Wallet size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-xl">El Bolsillo</h3>
                    <p className={`text-xs uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Contexto Económico</p>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-end">
                     <div>
                        <span className={`block text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Presupuesto Total</span>
                     </div>
                     <span className="text-2xl font-black text-brand-cyan">${totalBudget}</span>
                  </div>
                  <div className={`h-px w-full ${isDark ? 'bg-gray-800' : 'bg-slate-100'}`}></div>
                  
                  {/* Visual allocation mock */}
                  <div className="space-y-3">
                     <div>
                        <div className="flex justify-between text-xs mb-1">
                           <span className={isDark ? 'text-gray-300' : 'text-slate-600'}>Vuelos (Est.)</span>
                           <span className="font-bold">~40%</span>
                        </div>
                        <div className={`h-2 rounded-full w-full ${isDark ? 'bg-gray-800' : 'bg-slate-100'}`}>
                           <div className="h-full bg-brand-cyan rounded-full" style={{width: '40%'}}></div>
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between text-xs mb-1">
                           <span className={isDark ? 'text-gray-300' : 'text-slate-600'}>Alojamiento (Est.)</span>
                           <span className="font-bold">~35%</span>
                        </div>
                        <div className={`h-2 rounded-full w-full ${isDark ? 'bg-gray-800' : 'bg-slate-100'}`}>
                           <div className="h-full bg-indigo-500 rounded-full" style={{width: '35%'}}></div>
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between text-xs mb-1">
                           <span className={isDark ? 'text-gray-300' : 'text-slate-600'}>Día a Día (Comida/Ocio)</span>
                           <span className="font-bold">~25%</span>
                        </div>
                        <div className={`h-2 rounded-full w-full ${isDark ? 'bg-gray-800' : 'bg-slate-100'}`}>
                           <div className="h-full bg-orange-500 rounded-full" style={{width: '25%'}}></div>
                        </div>
                     </div>
                  </div>

                  <div className={`mt-6 p-4 rounded-2xl flex items-start gap-3 border
                     ${isDark ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-green-50 border-green-200 text-green-700'}
                  `}>
                     <CheckCircle2 size={24} className="shrink-0" />
                      <p className="text-sm font-semibold leading-tight">
                        Este presupuesto es viable para {days} días en base al modo seleccionado. Estás cubierto.
                      </p>
                   </div>

                   <button 
                      onClick={onSave}
                      className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all mt-4
                        ${user 
                          ? 'bg-brand-cyan text-white shadow-xl shadow-brand-cyan/20 hover:scale-[1.02]' 
                          : 'bg-white/10 text-gray-400 border border-white/10 hover:bg-white/20'
                        }
                      `}
                   >
                     <Heart size={18} className={user ? 'fill-white' : ''} />
                     {user ? 'GUARDAR MI VIAJE' : 'ENTRA PARA GUARDAR'}
                   </button>
                </div>

               {/* Local Secrets Teaser */}
               <div className={`mt-8 pt-6 border-t ${isDark ? 'border-gray-800' : 'border-slate-100'}`}>
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                     🤫 Secretos VIP
                  </h4>
                  <div className={`relative overflow-hidden rounded-2xl border p-4 backdrop-blur-sm
                     ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}
                  `}>
                     <div className="blur-sm select-none opacity-50 space-y-2">
                        <p className="text-sm font-bold">El bar oculto de {plan.destination_name}</p>
                        <p className="text-xs">Ubicado en la calle principal, no tiene letrero. Golpea 3 veces en la puerta de madera roja...</p>
                     </div>
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[2px]">
                        <button className="bg-white text-black text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg transform hover:scale-105 transition">
                           Desbloquear ($4.99)
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default TripDashboard;
