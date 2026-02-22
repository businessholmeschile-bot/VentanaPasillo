import React, { useState, useEffect, useRef } from "react";
import Header from "./components/layout/Header";
import InteractiveMap, {
  Destination,
  VALIDATED_DESTINATIONS,
} from "./components/map/InteractiveMap";
import { AndyBrain } from "./services/AndyBrain";
import TripDashboard from "./components/dashboard/TripDashboard";
import { TravelPlan, generateProceduralPlan } from "./services/aiPlanner";
import PlaneTakeoff from "./components/animations/PlaneTakeoff";
import AuthModal from "./components/auth/AuthModal";
import { supabase } from "./lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { AffiliateService } from "./services/affiliateService";
import FloatingRouteBar from "./components/map/FloatingRouteBar";

const App: React.FC = () => {
  // Default to Light "White Mode"
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [lang, setLang] = useState<"es" | "en">("es");

  // Map Filter State with Persistence
  const [budget, setBudget] = useState<number>(() => {
    const saved = localStorage.getItem("vp_budget");
    return saved ? Number(saved) : 3000;
  });
  const [days, setDays] = useState<number>(() => {
    const saved = localStorage.getItem("vp_days");
    return saved ? Number(saved) : 7;
  });
  const [climates, setClimates] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    () => {
      const saved = localStorage.getItem("vp_destinations");
      return saved ? JSON.parse(saved) : [];
    },
  );

  const [isLoading, setIsLoading] = useState(false);
  const [activePlan, setActivePlan] = useState<TravelPlan | null>(null);
  const [loadingMsg, setLoadingMsg] = useState("Andy está optimizando tu ruta...");
  const [isFlying, setIsFlying] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const dashboardRef = useRef<HTMLDivElement>(null);
  const planButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Loading Message Cycle
  useEffect(() => {
    if (!isLoading) return;
    const msgs = [
      "Andy está analizando estacionalidad...",
      "Cruzando datos de vuelos en tiempo real...",
      "Buscando los mejores hoteles para tu presupuesto...",
      "Diseñando experiencias auténticas...",
      "Casi listo. Ajustando detalles finales..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLoadingMsg(msgs[i % msgs.length]);
      i++;
    }, 2500);
    return () => clearInterval(interval);
  }, [isLoading]);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem("vp_budget", budget.toString());
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("vp_days", days.toString());
  }, [days]);

  useEffect(() => {
    localStorage.setItem(
      "vp_destinations",
      JSON.stringify(selectedDestinations),
    );
  }, [selectedDestinations]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  const toggleLang = () => setLang((prev) => (prev === "es" ? "en" : "es"));

  const toggleClimate = (c: string) => {
    setClimates((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  };

  const toggleThemeTag = (t: string) => {
    setSelectedThemes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  };

  const handleToggleDestination = (id: string, isValid: boolean) => {
    setSelectedDestinations((prev) => {
      if (prev.includes(id)) {
        return prev.filter((d) => d !== id);
      } else {
        if (!isValid && budget > 0) return prev;
        return [...prev, id];
      }
    });
  };

  const handleRemoveDestination = (id: string) => {
    setSelectedDestinations(prev => prev.filter(d => d !== id));
  };

  const handleGeneratePlan = async () => {
    if (selectedDestinations.length === 0) return;
    
    // Trigger Plane Animation
    setIsFlying(true);
    setActivePlan(null); // Clear previous results
    
    // Smooth scroll and loading delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(true);
    setLoadingMsg("Andy está conectándose con la red de viajes...");
    
    setTimeout(() => {
      if (dashboardRef.current) {
        const top = dashboardRef.current.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 100);

    const destinationNames = selectedDestinations
      .map((id) => VALIDATED_DESTINATIONS.find((d) => d.id === id)?.name)
      .join(", ");
    const query = `Viaje a ${destinationNames} por ${days} días con un presupuesto de $${budget} USD. Filtros: ${climates.join(", ")} ${selectedThemes.join(", ")}.`;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
    if (apiKey) {
      try {
        const brain = new AndyBrain(apiKey);
        const plan = await brain.generateItinerary(query);
        if (plan) {
          const enriched = AffiliateService.enrichPlanWithLinks(plan);
          setActivePlan(enriched);
        } else {
          setActivePlan(AffiliateService.enrichPlanWithLinks(generateProceduralPlan(query)));
        }
      } catch (err) {
        console.error("AndyBrain Error:", err);
        setActivePlan(AffiliateService.enrichPlanWithLinks(generateProceduralPlan(query)));
      }
    } else {
      // Simulate real thinking time for the demo
      await new Promise(resolve => setTimeout(resolve, 3500));
      setActivePlan(AffiliateService.enrichPlanWithLinks(generateProceduralPlan(query)));
    }

    setIsLoading(false);
    setTimeout(() => setIsFlying(false), 4000);
  };

  const handleSavePlan = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    // Simulation of saving
    alert("¡Viaje guardado en tu perfil! Andy lo ha archivado para tu próxima aventura.");
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-[#0B1116] text-gray-200" : "bg-white text-slate-900"} font-sans flex flex-col`}
    >
      <PlaneTakeoff isFlying={isFlying} buttonRef={planButtonRef} />
      <Header
        darkMode={isDark}
        toggleTheme={toggleTheme}
        lang={lang}
        toggleLang={toggleLang}
        budget={budget}
        setBudget={setBudget}
        days={days}
        setDays={setDays}
        climates={climates}
        toggleClimate={toggleClimate}
        selectedThemes={selectedThemes}
        toggleThemeTag={toggleThemeTag}
        selectedDestinations={selectedDestinations}
        destinations={VALIDATED_DESTINATIONS}
        onGeneratePlan={handleGeneratePlan}
        onRemoveDestination={handleRemoveDestination}
        planButtonRef={planButtonRef}
        user={user}
        onLogin={() => setIsAuthModalOpen(true)}
      />

      <main className="flex-grow flex flex-col relative w-full mt-[60px]">
        <div
          className="relative w-full"
          style={{ height: "calc(100vh - 60px)" }}
        >
          <div className="absolute inset-0 z-0">
            <InteractiveMap
              budget={budget}
              days={days}
              climates={climates}
              selectedThemes={selectedThemes}
              selectedDestinations={selectedDestinations}
              onToggleDestination={handleToggleDestination}
              isDarkMode={isDark}
            />
          </div>

          <FloatingRouteBar 
            selectedDestinations={selectedDestinations}
            destinations={VALIDATED_DESTINATIONS}
            onRemoveDestination={handleRemoveDestination}
            isDarkMode={isDark}
          />
        </div>

        <div ref={dashboardRef} className="w-full">
          {(isLoading || activePlan) && (
            <div
              className={`w-full min-h-screen p-4 md:p-8 ${isDark ? "bg-[#0B1116]" : "bg-[#f8fafc]"}`}
            >
              <div className="max-w-6xl mx-auto mt-8">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
                    <div className="w-16 h-16 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin"></div>
                    <h2
                      className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}
                    >
                      {loadingMsg}
                    </h2>
                    <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                      Cruzando datos de vuelos, estacionalidad y alojamiento.
                    </p>
                  </div>
                ) : activePlan ? (
                   <TripDashboard
                    plan={activePlan}
                    isDarkMode={isDark}
                    totalBudget={budget}
                    days={days}
                    user={user}
                    onSave={handleSavePlan}
                  />
                ) : null}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer
        className={`w-full border-t py-8 text-center space-y-2 mt-auto z-10 ${isDark ? "border-white/5 bg-[#0B1116]" : "border-gray-200 bg-white"}`}
      >
        <p
          className={`text-xs font-mono uppercase tracking-widest ${isDark ? "text-gray-600" : "text-gray-400"}`}
        >
          © 2026 Ventanapasillo.com
        </p>
      </footer>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        isDarkMode={isDark} 
      />
    </div>
  );
};

export default App;
