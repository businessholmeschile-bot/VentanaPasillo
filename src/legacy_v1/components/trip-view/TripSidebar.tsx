import React, { useState } from 'react';
import { DollarSign, Tag, Users, Zap, TrendingUp, Info, Coffee, Car, Pizza, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

import { TravelData } from '../../services/aiPlanner';
import FlightCard from '../FlightCard';

interface TripSidebarProps {
  totalCost: number;
  data: TravelData;
}

const TripSidebar: React.FC<TripSidebarProps> = ({ totalCost = 1450, data }) => {
  const [luxuryLevel, setLuxuryLevel] = useState(2); // 1: Econ, 2: Standard, 3: High, 4: Luxury
  const [isPerPerson, setIsPerPerson] = useState(true);
  const [currency, setCurrency] = useState<'USD' | 'CLP'>('USD');
  const [dates, setDates] = useState('');
  
  const PAX = 2; // Default Pareja
  
  // Smart Multipliers based on luxury slider
  const multipliers = [0.6, 1.0, 1.8, 3.5];
  const currentMult = multipliers[luxuryLevel - 1];

  // Base Costs (Standard)
  const baseAccommodation = 850;
  const baseFood = 420;
  const baseActivities = 180;

  // Calculated Costs
  const accommodation = Math.round(baseAccommodation * currentMult);
  const food = Math.round(baseFood * currentMult);
  const activities = Math.round(baseActivities * currentMult);
  const emergencyFund = Math.round((accommodation + food + activities) * 0.10); // 10% Colchón

  const rawTotal = accommodation + food + activities + emergencyFund;
  const displayTotal = isPerPerson ? Math.round(rawTotal / PAX) : rawTotal;

  // Currency Conversion (Mock: 1 USD = 950 CLP)
  const finalAmount = currency === 'USD' ? displayTotal : displayTotal * 950;
  const currencySymbol = currency === 'USD' ? '$' : 'CLP $';
  const formatMoney = (amount: number) => currency === 'USD' ? amount.toLocaleString() : (amount / 1000).toFixed(0) + 'k';

  // Benchmark Logic
  const benchmarkStatus = luxuryLevel === 1 ? 'Económico (Top 20%)' : luxuryLevel === 2 ? 'Promedio' : 'Lujo';
  const benchmarkColor = luxuryLevel === 1 ? 'bg-green-500' : luxuryLevel === 2 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="space-y-6 sticky top-24 pb-20 max-h-[85vh] overflow-y-auto pr-2 custom-scrollbar">
      
      {/* 0. Date Selector (New) */}
      <div className="bg-white dark:bg-[#141A20] rounded-2xl p-4 border border-gray-100 dark:border-white/5 shadow-sm">
         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
            <TrendingUp size={12} /> ¿Tienes fechas tentativas?
         </label>
         <input 
            type="text" 
            placeholder="Ej: Segunda quincena de Marzo"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            className="w-full bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-blue-500/50 transition-all font-medium"
         />
      </div>

      {/* 2. Dual Flight View (Actionable Items First) */}
      <div className="space-y-3">
         <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
            <Zap size={12} className="text-brand-orange" /> Opciones de Vuelo
         </h4>
         <div className="grid grid-cols-1 gap-3">
             {data.flight_fast && <FlightCard {...data.flight_fast} />}
             {data.flight_cheap && <FlightCard {...data.flight_cheap} />}
         </div>
      </div>

      {/* 1. Main Budget Card (Interactive) */}
      <div className="bg-white dark:bg-[#141A20] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        
        {/* Header & Controls */}
        <div className="flex justify-between items-start mb-6">
            <div>
                 <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                    <DollarSign size={12} className="stroke-[3]" /> Presupuesto
                 </h3>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setIsPerPerson(!isPerPerson)}
                        className="text-[10px] font-bold px-2 py-1 rounded-md bg-gray-100 dark:bg-white/10 hover:bg-gray-200 transition-colors text-gray-600 dark:text-gray-300"
                    >
                        {isPerPerson ? 'POR PAX' : 'TOTAL'}
                    </button>
                    <button 
                        onClick={() => setCurrency(currency === 'USD' ? 'CLP' : 'USD')}
                        className="text-[10px] font-bold px-2 py-1 rounded-md bg-gray-100 dark:bg-white/10 hover:bg-gray-200 transition-colors text-gray-600 dark:text-gray-300"
                    >
                        {currency}
                    </button>
                </div>
            </div>
            
            <div className="text-right">
                <span className="block text-3xl font-black text-blue-600 dark:text-blue-500 tracking-tighter transition-all duration-300">
                    {currency === 'USD' ? '$' : ''}{finalAmount.toLocaleString()}{currency === 'CLP' ? '' : ''}
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase">USD Estimado</span>
            </div>
        </div>

        {/* 10. Benchmark Bar */}
        <div className="mb-6">
            <div className="h-1.5 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden flex">
                <div className={`h-full transition-all duration-500 ${benchmarkColor}`} style={{ width: `${(luxuryLevel / 4) * 100}%` }}></div>
            </div>
            <div className="flex justify-between mt-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                <span>Económico</span>
                <span>Lujo</span>
            </div>
        </div>

        {/* 1. Slider Luxury Level */}
        <div className="mb-6">
             <input 
                type="range" 
                min="1" 
                max="4" 
                step="1" 
                value={luxuryLevel}
                onChange={(e) => setLuxuryLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between mt-2">
                 <span className="text-xs font-bold text-gray-900 dark:text-white">Nivel:</span>
                 <span className="text-xs font-bold text-blue-500">{luxuryLevel === 1 ? 'Mochilero' : luxuryLevel === 2 ? 'Standard' : luxuryLevel === 3 ? 'Comfort' : 'Ultra'}</span>
            </div>
        </div>

        {/* Breakdown Items */}
        <div className="space-y-2 relative z-10">
            <BudgetItem 
                label="Alojamiento" 
                amount={accommodation} 
                color="bg-blue-500" 
                currency={currency} 
                isPerPerson={isPerPerson} 
                pax={PAX} 
            />
            <BudgetItem 
                label="Comida" 
                amount={food} 
                color="bg-orange-400" 
                currency={currency} 
                isPerPerson={isPerPerson} 
                pax={PAX} 
            />
            <BudgetItem 
                label="Actividades" 
                amount={activities} 
                color="bg-purple-500" 
                currency={currency} 
                isPerPerson={isPerPerson} 
                pax={PAX} 
            />
            
            {/* 5. Emergency Fund (Colchón de Andy) */}
            <div className="flex justify-between items-center text-xs pt-2 border-t border-dashed border-gray-200 dark:border-white/10 mt-2">
                <div className="flex items-center gap-1 text-gray-400">
                    <ShieldCheck size={12} />
                    <span>Colchón (10%)</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white opacity-60">{currency === 'USD' ? '$' : ''}{(isPerPerson ? Math.round(emergencyFund/PAX) : emergencyFund).toLocaleString()}</span>
            </div>
        </div>
      </div>

      {/* 3. Price Prediction (FOMO) - Collapsed/Simplified */}
      <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-xl p-4 text-white shadow-lg flex items-center justify-between">
          <div>
              <h4 className="text-xs font-bold flex items-center gap-2 mb-0.5">
                <AlertCircle size={12} className="text-yellow-400" /> Tendencia de Precios
              </h4>
               <p className="text-[10px] text-blue-200">
                 +12% esta semana.
              </p>
          </div>
          <button className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-1.5 text-[10px] font-bold transition-all whitespace-nowrap">
             Bloquear Precio
          </button>
      </div>

      {/* Contextual Cost Cards - Simplified Grid */}
      <div className="grid grid-cols-3 gap-2">
          <CostCard icon={<Coffee size={14} />} label="Café" price={3.5} />
          <CostCard icon={<Car size={14} />} label="Uber" price={8} />
          <CostCard icon={<Pizza size={14} />} label="Cena" price={18} />
      </div>

      {/* 8. Andy's Saving Hack */}
      <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-2xl p-5 mb-6">
          <div className="flex items-start gap-3">
              <div className="bg-green-500 text-white p-1.5 rounded-lg mt-0.5">
                  <Zap size={14} fill="currentColor" />
              </div>
              <div>
                  <h4 className="text-xs font-black text-green-800 dark:text-green-400 uppercase tracking-wider mb-1">
                      Hack de Ahorro
                  </h4>
                  <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
                      "Si mueves tu vuelo de salida al <b>Martes</b>, ahorrarás aprox <b>$180 USD</b> en tasas aéreas."
                  </p>
              </div>
          </div>
      </div>

    </div>
  );
};

// Sub-components for cleaner code
const BudgetItem = ({ label, subLabel, amount, color, currency, isPerPerson, pax }: any) => {
    const displayAmount = isPerPerson ? Math.round(amount / pax) : amount;
    const finalVal = currency === 'USD' ? displayAmount : displayAmount * 950;

    return (
        <div className="flex justify-between items-center text-sm group">
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${color}`}></div>
                <div>
                    <span className="text-gray-500 dark:text-gray-400 font-medium group-hover:text-gray-800 transition-colors block leading-none">{label}</span>
                    {subLabel && <span className="text-[9px] text-gray-400 font-medium">{subLabel}</span>}
                </div>
            </div>
            <span className="font-bold text-gray-900 dark:text-white">{currency === 'USD' ? '$' : ''}{finalVal.toLocaleString()}</span>
        </div>
    );
};

const CostCard = ({ icon, label, price }: any) => (
    <div className="bg-white dark:bg-[#141A20] p-3 rounded-xl border border-gray-100 dark:border-white/5 flex flex-col items-center justify-center text-center shadow-sm">
        <div className="text-gray-400 mb-2">{icon}</div>
        <div className="text-[10px] font-bold text-gray-400 uppercase">{label}</div>
        <div className="text-sm font-black text-gray-900 dark:text-white">${price}</div>
    </div>
);

export default TripSidebar;
