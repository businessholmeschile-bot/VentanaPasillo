import React from 'react';
import { 
  Plane, 
  Calendar, 
  Wallet, 
  CheckCircle2, 
  ChevronRight, 
  MapPin, 
  Coffee, 
  ArrowRight, 
  Heart, 
  Edit2, 
  X, 
  Clock, 
  Tag, 
  Map as MapIcon 
} from 'lucide-react';
import { TravelPlan } from '../../services/aiPlanner';

interface TripDashboardProps {
  plan: TravelPlan;
  isDarkMode: boolean;
  totalBudget: number;
  days: number;
  user?: any;
  onSave?: () => void;
  onDeleteActivity?: (dayIndex: number, actIndex: number) => void;
  onEditActivity?: (dayIndex: number, actIndex: number) => void;
}

const TripDashboard = ({ 
  plan, 
  isDarkMode, 
  totalBudget, 
  days, 
  user, 
  onSave,
  onDeleteActivity,
  onEditActivity
}: TripDashboardProps) => {
  const isDark = isDarkMode;

  const renderFlight = (flight: any, isFast: boolean) => (
    <div className={`p-6 rounded-3xl border flex flex-col justify-between transition-transform transform hover:-translate-y-1 shadow-lg
      ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}
    `}>
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
             <div className={`p-3 rounded-2xl ${isFast ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-orange-500/20 text-orange-500'}`}>
                <Plane size={24} className={isFast ? '' : 'rotate-45'} />
             </div>
             <div>
               <h3 className="font-bold">{isFast ? 'Ruta Directa' : 'Opción Ahorro'}</h3>
               <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{flight.airline}</p>
             </div>
          </div>
          <span className="text-xl font-black">{flight.price_estimate}</span>
        </div>
        
        <div className={`flex items-center justify-between text-sm py-3 border-y mb-4 ${isDark ? 'border-white/10 text-gray-400' : 'border-slate-100 text-slate-500'}`}>
           <span className="flex items-center gap-1"><MapPin size={14}/> {flight.route}</span>
           <span>{flight.duration}</span>
           <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${isFast ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-orange-500/20 text-orange-500'}`}>
             {flight.stops}
           </span>
        </div>
      </div>
      
      <a href={flight.affiliate_link || "#"} target="_blank" rel="noopener noreferrer" className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${isFast ? 'bg-brand-cyan text-white' : 'bg-orange-500 text-white'}`}>
        {flight.call_to_action} <ArrowRight size={16} />
      </a>
    </div>
  );

  return (
    <div className={`relative w-full pb-20 ${isDark ? 'text-white' : 'text-slate-900'}`}>
      <div className="text-center mb-12">
         <h1 className="text-3xl md:text-5xl font-black mb-4">{plan.destination_name}</h1>
         <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{plan.summary}</p>
         <div className="flex justify-center gap-4 mt-6">
            <span className="px-4 py-2 rounded-full text-xs font-bold border border-brand-cyan/20 text-brand-cyan flex items-center gap-2"><Calendar size={14}/> {days} Días</span>
            <span className="px-4 py-2 rounded-full text-xs font-bold border border-orange-500/20 text-orange-500 flex items-center gap-2"><Wallet size={14}/> ${totalBudget.toLocaleString('es-CL')} CLP</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-12">
            <section>
               <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Plane size={20}/> Vuelos Sugeridos</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {plan.flight_fast && renderFlight(plan.flight_fast, true)}
                 {plan.flight_cheap && renderFlight(plan.flight_cheap, false)}
               </div>
            </section>

            <section>
               <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Calendar size={20}/> Itinerario</h2>
               <div className="space-y-8">
                  {plan.itinerary.map((day, dIdx) => (
                    <div key={dIdx} className={`p-6 rounded-[2rem] border relative ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-brand-cyan text-white flex flex-col items-center justify-center font-black">
                          <span className="text-[10px] uppercase">Día</span>
                          <span className="text-xl">{day.day}</span>
                        </div>
                        <h3 className="text-xl font-bold">{day.title}</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {day.activities.map((act, aIdx) => (
                          <div key={aIdx} className={`group p-4 rounded-xl border relative transition-all hover:border-brand-cyan/50 ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => onEditActivity?.(dIdx, aIdx)} className="p-1.5 rounded-md bg-brand-cyan/20 text-brand-cyan hover:bg-brand-cyan hover:text-white transition-colors"><Edit2 size={12}/></button>
                              <button onClick={() => onDeleteActivity?.(dIdx, aIdx)} className="p-1.5 rounded-md bg-red-500/20 text-red-500 hover:bg-red-50 hover:text-red-500 transition-colors"><X size={12}/></button>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] font-black uppercase text-brand-cyan">{act.time}</span>
                              <span className="text-[10px] font-bold opacity-60">{act.cost}</span>
                            </div>
                            <div className="flex gap-3">
                              <span className="text-2xl">{act.emoji_icon}</span>
                              <div>
                                <h4 className="font-bold text-sm leading-tight">{act.name}</h4>
                                <p className="text-xs opacity-70 mt-1 line-clamp-2">{act.description}</p>
                              </div>
                            </div>
                            {act.tips && (
                              <div className="mt-3 p-2 rounded-lg bg-orange-500/10 text-orange-400 text-[10px] flex gap-2">
                                <Coffee size={12} className="shrink-0" />
                                <span>{act.tips}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
               </div>
            </section>
         </div>

         <div className="lg:col-span-1">
            <div className={`sticky top-24 p-6 rounded-3xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'}`}>
              <div className="flex items-center gap-3 mb-6">
                <Wallet className="text-brand-cyan" size={24} />
                <h3 className="font-black text-xl">Tu Bolsillo</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm opacity-60">Presupuesto</span>
                  <span className="text-2xl font-black text-brand-cyan">${totalBudget.toLocaleString('es-CL')} CLP</span>
                </div>
                <div className="h-px bg-white/10 w-full"></div>
                <div className="text-sm space-y-2 opacity-80">
                  <p>• Vuelos desde Santiago (SCL) incluidos.</p>
                  <p>• Estimación para {days} días de aventura.</p>
                </div>
                <button onClick={onSave} className={`w-full py-4 rounded-xl font-black text-sm transition-all mt-4 ${user ? 'bg-brand-cyan text-white shadow-lg' : 'bg-white/10 text-gray-400 border border-white/10'}`}>
                  {user ? 'GUARDAR VIAJE' : 'ENTRA PARA GUARDAR'}
                </button>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default TripDashboard;
