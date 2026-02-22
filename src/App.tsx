import React, { useState, useRef } from "react";
import { Globe } from "lucide-react";

// Components
import Header from "./components/layout/Header";
import FilterBar from "./components/layout/FilterBar";
import InteractiveMap, {
  VALIDATED_DESTINATIONS,
} from "./components/map/InteractiveMap";
import TripDashboard from "./components/dashboard/TripDashboard";
import PlaneTakeoff from "./components/animations/PlaneTakeoff";

// Services
import { AndyBrain } from "./services/AndyBrain";
import { generateProceduralPlan } from "./services/aiPlanner";
import { AffiliateService } from "./services/affiliateService";

const App: React.FC = () => {
  // --- STATE ---
  const [activePlan, setActivePlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  
  // Filters & Global State
  const [budget, setBudget] = useState(2500000);
  const [days, setDays] = useState(7);
  const [climates, setClimates] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [lang, setLang] = useState<"es" | "en">("es");
  const [user, setUser] = useState<any>(null);

  const dashboardRef = useRef<HTMLDivElement>(null);
  const planButtonRef = useRef<HTMLButtonElement>(null);

  // --- ACTIONS ---
  const handleToggleDestination = (id: string, isValid: boolean) => {
    // We allow selecting even if "invalid" by budget for now, Andy will handle it
    setSelectedDestinations(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleRemoveDestination = (id: string) => {
    setSelectedDestinations(prev => prev.filter(d => d !== id));
  };

  const toggleClimate = (c: string) => {
    setClimates(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const toggleThemeTag = (t: string) => {
    setSelectedThemes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  const handleEditActivity = (dayIdx: number, actIdx: number) => {
    if (!activePlan) return;
    const activity = activePlan.itinerary[dayIdx].activities[actIdx];
    const newName = prompt("Nuevo nombre para la actividad:", activity.name);
    if (newName) {
       const newItinerary = [...activePlan.itinerary];
       newItinerary[dayIdx].activities[actIdx] = { ...activity, name: newName };
       setActivePlan({ ...activePlan, itinerary: newItinerary });
    }
  };

  const handleDeleteActivity = (dayIdx: number, actIdx: number) => {
    if (!activePlan) return;
    const newItinerary = [...activePlan.itinerary];
    newItinerary[dayIdx].activities.splice(actIdx, 1);
    setActivePlan({ ...activePlan, itinerary: newItinerary });
  };

  const handleGeneratePlan = async () => {
    if (selectedDestinations.length === 0) return;
    
    setIsFlying(true);
    setActivePlan(null);
    setIsLoading(true);

    const destinationNames = selectedDestinations
      .map((id) => VALIDATED_DESTINATIONS.find((d) => d.id === id)?.name)
      .join(", ");
    
    let query = `Viaje a ${destinationNames} por ${days} días con un presupuesto total de $${budget.toLocaleString('es-CL')} CLP saliendo desde Santiago (SCL).`;

    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
    const openaiKey = import.meta.env.VITE_OPENAI_API_KEY || "";
    const deepseekKey = import.meta.env.VITE_DEEPSEEK_API_KEY || "";

    try {
      const brain = new AndyBrain(geminiKey, openaiKey, deepseekKey);
      const plan = await brain.generateItinerary(query);
      if (plan) {
        setActivePlan(plan);
      } else {
        setActivePlan(AffiliateService.enrichPlanWithLinks(generateProceduralPlan(query), "SCL"));
      }
    } catch (err) {
      console.error("AndyBrain Error:", err);
      setActivePlan(AffiliateService.enrichPlanWithLinks(generateProceduralPlan(query), "SCL"));
    } finally {
      setIsLoading(false);
      setIsFlying(false);
      setTimeout(() => {
        dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-[#0B1116] text-slate-200' : 'bg-white text-slate-900'}`}>
      
      {/* Plane Animation Overlay */}
      <PlaneTakeoff isFlying={isFlying} buttonRef={planButtonRef} />

      <Header
        darkMode={theme === "dark"}
        toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        lang={lang}
        toggleLang={() => setLang(l => l === 'es' ? 'en' : 'es')}
        budget={budget}
        days={days}
        isFiltersOpen={isFiltersOpen}
        setIsFiltersOpen={setIsFiltersOpen}
        user={user}
        onLogin={() => {}}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className={`transition-all duration-300 overflow-hidden ${isFiltersOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
        <FilterBar 
          budget={budget}
          setBudget={setBudget}
          days={days}
          setDays={setDays}
          climates={climates}
          toggleClimate={toggleClimate}
          selectedThemes={selectedThemes}
          toggleThemeTag={toggleThemeTag}
          onGeneratePlan={handleGeneratePlan}
          selectedDestinations={selectedDestinations}
          destinations={VALIDATED_DESTINATIONS}
          onRemoveDestination={handleRemoveDestination}
          isDarkMode={theme === 'dark'}
        />
      </div>

      <main className="flex flex-col w-full min-h-[calc(100vh-70px)]">
        {/* Map Section */}
        <section className="relative w-full h-[60vh] border-b border-black/10">
          <InteractiveMap
            budget={budget}
            days={days}
            climates={climates}
            selectedThemes={selectedThemes}
            selectedDestinations={selectedDestinations}
            onToggleDestination={handleToggleDestination}
            isDarkMode={theme === "dark"}
            searchQuery={searchQuery}
          />
          {isLoading && (
            <div className="absolute inset-0 z-[2000] bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white font-black uppercase tracking-widest text-sm">Andy está pensando...</p>
              </div>
            </div>
          )}
        </section>

        {/* Dashboard Section */}
        <section ref={dashboardRef} className="w-full bg-slate-50 dark:bg-[#080d11]">
          {activePlan ? (
            <div className="max-w-7xl mx-auto py-12 px-6">
              <TripDashboard 
                plan={activePlan} 
                isDarkMode={theme === "dark"}
                totalBudget={budget}
                days={days}
                onDeleteActivity={handleDeleteActivity} 
                onEditActivity={handleEditActivity}
              />
            </div>
          ) : !isLoading && (
            <div className="py-24 text-center opacity-30">
              <Globe size={64} className="mx-auto mb-4 text-slate-400" />
              <p className="text-xl font-bold uppercase tracking-tighter">Explora el mapa y selecciona tu ruta para comenzar</p>
            </div>
          )}
        </section>
      </main>

      <footer className="py-12 border-t border-black/5 dark:border-white/5 text-center opacity-40">
        <p className="text-xs font-bold uppercase tracking-widest">Ventanapasillo.com — HQ Santiago de Chile</p>
      </footer>
    </div>
  );
};

export default App;
