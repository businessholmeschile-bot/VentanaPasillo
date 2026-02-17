import React, { useState, useEffect } from 'react';
import FlightCard from './components/FlightCard';
import HotelCard from './components/HotelCard';
import ItineraryTimeline from './components/ItineraryTimeline';
import LocalSecret from './components/LocalSecret';
import HeroSearch from './components/HeroSearch';
import LoadingState from './components/LoadingState';
import { Sun, Moon, Globe } from 'lucide-react';

// Data Imports
import baliData from './data/example_bali.json';
import tokyoData from './data/example_tokyo.json';
import nidoData from './data/example_elnido.json';
import positanoData from './data/example_positano.json';
import icelandData from './data/example_iceland.json';
import chileData from './data/example_chile.json';
import eurotripData from './data/example_eurotrip.json';
import { generateProceduralPlan } from './services/aiPlanner';

// Type Definitions
// We need to extend the type to match what generateProceduralPlan returns if it's slightly different, 
// but for now let's assume compat or cast.
type TravelData = typeof baliData;

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

const generateTravelPlan = async (query: string): Promise<TravelData> => {
  return new Promise((resolve) => {
    const q = query.toLowerCase();
    setTimeout(() => {
      if (q.includes('nido') || q.includes('palawan')) {
        resolve(nidoData as TravelData);
      } else if (q.includes('tokio') || q.includes('japon') || q.includes('japan')) {
        resolve(tokyoData as TravelData);
      } else if (q.includes('positano') || q.includes('italia') || q.includes('amalfi')) {
        resolve(positanoData as TravelData);
      } else if (q.includes('islandia') || q.includes('iceland')) {
        resolve(icelandData as TravelData);
      } else if (q.includes('chile') || q.includes('paine') || q.includes('natales')) {
        resolve(chileData as TravelData);
      } else if (q.includes('euro') || q.includes('europa') || q.includes('europe')) {
        resolve(eurotripData as TravelData);
      } else {
        // AI FALLBACK: Generate a unique plan for the requested destination
        // instead of defaulting to Bali. This solves the "Pucol != Bali" issue.
        const proceduralPlan = generateProceduralPlan(query);
        resolve(proceduralPlan as unknown as TravelData);
      }
    }, 3500);
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
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-brand-dark text-gray-200' : 'bg-gray-50 text-gray-900'} font-sans selection:bg-brand-cyan selection:text-black flex flex-col items-center justify-center`}>
      
      {/* Settings Toggles */}
      <div className="fixed top-6 right-6 z-[60] flex items-center gap-3">
        <button 
          onClick={toggleLang}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${theme === 'dark' ? 'bg-gray-900 border-gray-800 text-gray-400 hover:text-brand-cyan' : 'bg-white border-gray-200 text-gray-600 hover:text-brand-cyan shadow-sm'}`}
        >
          <Globe size={14} />
          {lang.toUpperCase()}
        </button>
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-full border transition-all ${theme === 'dark' ? 'bg-gray-900 border-gray-800 text-gray-400 hover:text-brand-cyan' : 'bg-white border-gray-200 text-gray-600 hover:text-brand-cyan shadow-sm'}`}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      {/* Hero Section */}
      <div className={`transition-all duration-700 w-full max-w-4xl px-4 ${hasSearched ? 'pt-8 pb-4' : 'h-screen flex flex-col justify-center'}`}>
          <HeroSearch onSearch={handleSearch} isSearching={isSearching} />
      </div>

      {/* Loading State */}
      {isSearching && <LoadingState />}

      {/* Results Container */}
      {!isSearching && data && (
        <main className="w-full max-w-5xl px-4 md:px-8 space-y-16 animate-fade-in-up pb-20 mt-12">
          
          {/* Destination Header */}
          <section className="text-center space-y-4">
             <div className="inline-block px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-bold uppercase tracking-widest animate-pulse">
              ✈️ {t.optimizedRoute}
            </div>
            <h2 className="text-3xl md:text-5xl font-black max-w-3xl mx-auto leading-tight">
               <span className={`text-transparent bg-clip-text ${theme === 'dark' ? 'bg-gradient-to-r from-white to-gray-500' : 'bg-gradient-to-r from-gray-900 to-gray-500'}`}>
                {t.tripTo}
               </span>{' '}
               <span className="text-brand-cyan drop-shadow-[0_0_25px_rgba(0,194,255,0.4)] underline decoration-brand-orange decoration-4 underline-offset-4">
                  {data.summary.includes('Nido') ? 'El Nido, Palawan' : 
                   data.summary.includes('Tokio') ? 'Tokio, Japón' : 
                   data.summary.includes('Positano') ? 'Positano, Italia' :
                   data.summary.includes('Islandia') ? 'Islandia' :
                   data.summary.includes('Patagonia') ? 'Patagonia, Chile' : // Adjusted check for Chile specific static
                   data.summary.includes('Euro') ? 'Europa' :
                   // For procedural plans, use the destination name from the summary logic or object
                   (data as any).destination_name ? (data as any).destination_name : 
                   data.summary.split(':')[0] 
                   }
               </span>
            </h2>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto text-xl leading-relaxed border-l-4 border-brand-orange pl-6 italic`}>
              "{data.summary}"
            </p>
          </section>

          {/* Logistics Dashboard Grid */}
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5 space-y-8">
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                   <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t.recommendedFlight}</h3>
                   <span className="text-[10px] bg-green-900/40 text-green-400 px-2 py-0.5 rounded border border-green-800">{t.lowestPrice}</span>
                </div>
                <FlightCard {...data.flights_suggestion} />
              </section>

              <section className="space-y-4">
                 <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                    <h3 className="text-sm font-bold text-brand-orange uppercase tracking-widest">{t.localSecrets}</h3>
                    <span className="bg-brand-orange text-black text-[10px] px-2 rounded font-bold">{t.insider}</span>
                 </div>
                 <div className="space-y-4">
                  {data.local_secrets.map((secret, idx) => (
                    <LocalSecret key={idx} {...secret} />
                  ))}
                 </div>
              </section>
            </div>

            <div className="md:col-span-7 space-y-8">
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-800 pb-2">{t.whereToSleep}</h3>
                <div className="grid gap-5">
                  {data.hotels_suggestion.map((hotel, idx) => (
                     <HotelCard key={idx} {...hotel} />
                  ))}
                </div>
              </section>

              <section className="space-y-4 pt-4">
                 <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-800 pb-2">{t.itinerary}</h3>
                 <ItineraryTimeline itinerary={data.itinerary} />
              </section>
            </div>
          </div>

        </main>
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
