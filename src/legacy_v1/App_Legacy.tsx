import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FlightCard from './components/FlightCard';
import HotelCard from './components/HotelCard';
import ItineraryTimeline from './components/ItineraryTimeline';
import LocalSecret from './components/LocalSecret';
import HeroSearch from './components/HeroSearch';
import LoadingState from './components/LoadingState';
import TripView from './components/trip-view/TripView';
import { Sun, Moon, Globe, Brain, Wallet, Sparkles } from 'lucide-react';

// Data Imports
import baliData from './data/example_bali.json';
import tokyoData from './data/example_tokyo.json';
import nidoData from './data/example_elnido.json';
import positanoData from './data/example_positano.json';
import icelandData from './data/example_iceland.json';
import chileData from './data/example_chile.json';
import eurotripData from './data/example_eurotrip.json';
import { generateProceduralPlan, TravelPlan, TravelData } from './services/aiPlanner';
import { saveTripToDB, trackClick } from './services/tripService';

// Type Definitions
// Compatibility shim if needed, but imported type is preferred
// type TravelData = typeof baliData;

const translations = {
  es: {
    heroTitle: "Ventanapasillo",
    heroSub: "Tu arquitecto de viajes personal.",
    thinking: "Andy está pensando...",
    optimizedRoute: "Ruta Optimizada",
    tripTo: "Tu viaje a",
    recommendedFlight: "Mejor Vuelo Detectado",
    localSecrets: "Secretos Locales",
    whereToSleep: "Alojamiento Estratégico",
    itinerary: "Itinerario: Día a Día",
    insider: "INSIDER ONLY",
    lowestPrice: "LOWEST PRICE"
  },
  en: {
    heroTitle: "Ventanapasillo",
    heroSub: "Your personal travel architect.",
    thinking: "Andy is thinking...",
    optimizedRoute: "Optimized Route",
    tripTo: "Your trip to",
    recommendedFlight: "Best Flight Detected",
    localSecrets: "Local Secrets",
    whereToSleep: "Strategic Accommodation",
    itinerary: "Itinerary: Day by Day",
    insider: "INSIDER ONLY",
    lowestPrice: "LOWEST PRICE"
  }
};

import { AndyBrain } from './services/AndyBrain';

const generateTravelPlan = async (query: string): Promise<TravelData> => {
  // 1. Check for specific hardcoded demos (Fast Load)
  const q = query.toLowerCase();
  if (q.includes('nido') || q.includes('palawan')) return nidoData as TravelData;
  if (q.includes('tokio') || q.includes('japon') || q.includes('japan')) return tokyoData as TravelData;
  if (q.includes('positano') || q.includes('italia') || q.includes('amalfi')) return positanoData as TravelData;
  if (q.includes('islandia') || q.includes('iceland')) return icelandData as TravelData;
  if (q.includes('chile') || q.includes('paine') || q.includes('natales')) return chileData as TravelData;
  if (q.includes('euro') || q.includes('europa') || q.includes('europe')) return eurotripData as TravelData;

  // 2. Try Real AI (Andy Brain)
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (apiKey) {
    console.log("🧠 Andy Activado: Analizando ruta con Gemini...");
    const brain = new AndyBrain(apiKey);
    const aiPlan = await brain.generateItinerary(query);
    if (aiPlan) {
      return aiPlan as unknown as TravelData;
    }
  }

  // 3. Fallback: Procedural Generator (Offline/Error Mode)
  console.log("⚠️ Andy Offline: Usando generador procedural.");
  return new Promise((resolve) => {
    setTimeout(() => {
      const proceduralPlan = generateProceduralPlan(query);
      resolve(proceduralPlan as unknown as TravelData);
    }, 2000);
  });
};

const App: React.FC = () => {
  const [data, setData] = useState<TravelData | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [lang, setLang] = useState<'es' | 'en'>('es');

  const t = translations[lang];

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setHasSearched(true);
    setData(null);
    try {
      const result = await generateTravelPlan(query);
      setData(result);
      
      // Save generating travel plan to Supabase (Async/Fire-and-forget)
      // Casting result to TravelPlan for compatibility
      saveTripToDB(result as unknown as TravelPlan, query);

    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleLang = () => setLang(prev => prev === 'es' ? 'en' : 'es');

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-brand-dark text-gray-200' : 'bg-gray-50 text-gray-900'} font-sans selection:bg-brand-cyan selection:text-black flex flex-col`}>
      
      <Header 
        darkMode={theme === 'dark'} 
        toggleTheme={toggleTheme} 
        lang={lang} 
        toggleLang={toggleLang} 
      />

      <div className="flex-grow flex flex-col items-center">
        {/* Hero Section */}
        <div className={`w-full max-w-5xl px-4 transition-all duration-700 ${!hasSearched ? 'pt-32 pb-16' : 'pt-24 pb-8'}`}>
          <HeroSearch onSearch={handleSearch} isSearching={isSearching} />
        </div>

        {/* Loading State */}
        {isSearching && <LoadingState />}

        {/* Landing Page Content (Features) */}
        {!isSearching && !data && (
          <div className="w-full max-w-6xl px-4 py-8 animate-fade-in-up pb-32">
            
            {/* Bento Grid Features - Matching Stitch Design */}
            <div className="grid md:grid-cols-3 gap-6 mb-24">
              {/* El Cerebro */}
              <div className="bg-[#141A20] p-8 rounded-2xl border border-gray-800 hover:border-brand-cyan/50 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-2xl -mr-8 -mt-8"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-brand-cyan/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Brain className="text-brand-cyan" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-display">El Cerebro</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">IA entrenada con data logística real de 100+ países. Andy entiende el contexto, no solo genera texto.</p>
                </div>
              </div>
              
              {/* El Bolsillo */}
              <div className="bg-[#141A20] p-8 rounded-2xl border border-gray-800 hover:border-brand-cyan/50 transition-all group relative overflow-hidden">
                 <div className="relative z-10">
                   <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Wallet className="text-green-400" size={24} />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2 font-display">El Bolsillo</h3>
                   <p className="text-gray-400 leading-relaxed text-sm">Optimización de presupuestos con precios proyectados. Te decimos exactamente cuánto ahorrar y dónde gastar.</p>
                 </div>
              </div>

              {/* El Secreto */}
              <div className="bg-[#141A20] p-8 rounded-2xl border border-gray-800 hover:border-brand-cyan/50 transition-all group">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="text-purple-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-display">El Secreto</h3>
                <p className="text-gray-400 leading-relaxed text-sm">Acceso a "Hidden Gems" que los algoritmos tradicionales ignoran. Experiencias diseñadas para evitar las trampas de turistas.</p>
              </div>
            </div>

            {/* Footer CTA Section */}
            <div className="bg-gradient-to-r from-brand-cyan/10 to-purple-900/10 border border-brand-cyan/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Lleva a Andy en tu bolsillo</h2>
                 <div className="flex flex-col md:flex-row justify-center gap-8 mb-8 text-left max-w-2xl mx-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan">✓</div>
                      <span className="text-gray-300">Itinerario PDF profesional</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan">✓</div>
                      <span className="text-gray-300">Mapa interactivo</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan">✓</div>
                      <span className="text-gray-300">Links de reserva curados</span>
                    </div>
                 </div>
                 <button className="bg-white text-black font-bold py-4 px-8 rounded-xl hover:bg-gray-200 transition-colors shadow-xl shadow-brand-cyan/10">
                   Empezar Gratuitamente
                 </button>
               </div>
            </div>

            {/* Trust Section */}
            <div className="text-center mt-24 opacity-40 hover:opacity-100 transition-opacity">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-bold">Hecho con ❤️ por exploradores para exploradores</p>
            </div>
          </div>
        )}
      </div>



      {/* Results Container (New Trip View) */}
      {!isSearching && data && (
        <TripView data={data as unknown as TravelData} />
      )}

      {/* Footer */}
      {(data || isSearching) && (
        <footer className={`w-full border-t border-gray-900 mt-auto py-8 text-center space-y-2`}>
          <p className="text-gray-600 text-sm">© 2026 Ventanapasillo.com - Powered by Andy v2.0</p>
          <p className="text-xs text-brand-cyan/40 font-mono">Affiliate Engine Active - Session ID: A1-9982</p>
        </footer>
      )}

    </div>
  );
};

export default App;
