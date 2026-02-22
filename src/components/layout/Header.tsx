import React, { useState } from "react";
import {
  Globe,
  Moon,
  Sun,
  Menu,
  X,
  Plane,
  DollarSign,
  Calendar,
  ThermometerSun,
  Snowflake,
  ChevronDown,
  ChevronUp,
  Heart,
  Palmtree,
  CloudSnow,
  Mountain,
  Rocket,
} from "lucide-react";
import { Destination } from "../map/InteractiveMap";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabaseClient";
import { LogOut, User as UserIcon } from "lucide-react";

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
  lang: "es" | "en";
  toggleLang: () => void;

  // Filter Props
  budget: number;
  setBudget: (val: number) => void;
  days: number;
  setDays: (val: number) => void;
  climates: string[];
  toggleClimate: (c: string) => void;
  selectedThemes: string[];
  toggleThemeTag: (t: string) => void;
  selectedDestinations: string[];
  destinations: Destination[];
  onGeneratePlan: () => void;
  onRemoveDestination: (id: string) => void;
  planButtonRef?: React.RefObject<HTMLButtonElement>;
  user: User | null;
  onLogin: () => void;
}

const Header: React.FC<HeaderProps> = ({
  darkMode,
  toggleTheme,
  lang,
  toggleLang,
  budget,
  setBudget,
  days,
  setDays,
  climates,
  toggleClimate,
  selectedThemes,
  toggleThemeTag,
  selectedDestinations,
  destinations,
  onGeneratePlan,
  onRemoveDestination,
  planButtonRef,
  user,
  onLogin,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  const selectedNames = selectedDestinations.map(
    (id) => destinations.find((d) => d.id === id)?.name || id,
  );

  return (
    <header
      className={`fixed top-0 w-full z-[9999] transition-all duration-500 backdrop-blur-lg border-b
      ${darkMode ? "bg-[#0B1116]/90 border-white/5" : "bg-white/95 border-slate-200 shadow-sm"}
    `}
    >
      {/* Top Main Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-[60px] flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-2">
          <span
            className={`text-xl font-black tracking-tighter ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            Ventana<span className="text-brand-cyan">Pasillo</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <a
            href="#"
            className={`text-sm font-bold transition-colors ${darkMode ? "text-gray-400 hover:text-brand-cyan" : "text-slate-500 hover:text-brand-cyan"}`}
          >
            Mis Viajes
          </a>
          
          {user ? (
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 p-1 rounded-full border ${darkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
                <div className="w-5 h-5 rounded-full bg-brand-cyan flex items-center justify-center text-[9px] font-black text-white">
                  {user.email?.substring(0, 2).toUpperCase()}
                </div>
                <span className="text-[11px] font-bold mr-1">{user.user_metadata?.full_name || 'Usuario'}</span>
              </div>
              <button
                onClick={() => supabase.auth.signOut()}
                className={`p-1.5 rounded-lg transition-colors ${darkMode ? 'hover:bg-red-500/10 text-gray-500 hover:text-red-400' : 'hover:bg-red-50 hover:text-red-500'}`}
                title="Cerrar Sesión"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className={`px-3 py-1 rounded-lg text-sm font-bold transition-all
              ${darkMode ? "bg-white/5 border border-white/10 text-white hover:bg-brand-cyan" : "bg-slate-100 text-slate-800 hover:bg-brand-cyan hover:text-white"}
            `}
            >
              Entrar
            </button>
          )}
        </nav>

        {/* Integrated Filter Toggle for Desktop (Mini view) */}
        <div className="hidden md:flex items-center gap-3 bg-transparent border rounded-full pl-4 pr-1.5 py-1 border-brand-cyan/20">
          <div className="flex items-center gap-4 border-r border-brand-cyan/10 pr-4">
            <div className="flex flex-col -space-y-1">
              <span className="text-[8px] uppercase font-black text-gray-500 tracking-wider">Presupuesto</span>
              <span className={`text-base font-black ${darkMode ? "text-brand-cyan" : "text-brand-cyan"}`}>
                ${budget.toLocaleString('es-CL')}
              </span>
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-[8px] uppercase font-black text-gray-500 tracking-wider">Días</span>
              <span className={`text-base font-black ${darkMode ? "text-white" : "text-slate-800"}`}>
                {days}d
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors
              ${isFiltersOpen 
                ? (darkMode ? "bg-brand-cyan/20 text-brand-cyan" : "bg-brand-cyan/10 text-brand-cyan")
                : (darkMode ? "text-gray-400 hover:bg-white/5" : "text-slate-600 hover:bg-slate-100")
              }`}
          >
            Ajustes{" "}
            {isFiltersOpen ? (
              <ChevronUp size={14} />
            ) : (
              <ChevronDown size={14} />
            )}
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors
               ${darkMode ? "hover:bg-white/5 text-gray-400 hover:text-white" : "hover:bg-slate-100 text-slate-500 hover:text-slate-900"}
             `}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className={`md:hidden p-2 ${darkMode ? "text-white" : "text-slate-900"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Desktop Filter Row (Sub-header) */}
      <div
        className={`hidden md:block transition-all duration-300 overflow-hidden ${isFiltersOpen ? "max-h-[160px] border-t border-white/5 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex flex-col gap-3">
          <div className="flex items-center gap-8 justify-between">
            {/* Budget input in header with Slider */}
            <div className="flex flex-col gap-1 flex-1 max-w-[200px]">
              <div className="flex items-center justify-between">
                <label className="text-[9px] font-black uppercase tracking-tighter text-gray-500">
                  Presupuesto
                </label>
                <span className="text-sm font-black text-brand-cyan">
                  ${budget.toLocaleString('es-CL')} <span className="text-[10px] text-gray-500 font-normal">CLP</span>
                </span>
              </div>
              <input
                type="range"
                min="500000"
                max="10000000"
                step="100000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-1.5 bg-brand-cyan/20 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
              />
            </div>

            {/* Days Stepper Selector */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-black uppercase tracking-tighter text-gray-500">
                Duración
              </label>
              <div className={`flex items-center bg-slate-500/10 rounded-xl p-1 border border-white/5`}>
                <button 
                  onClick={() => setDays(Math.max(1, days - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-brand-cyan font-black"
                >
                  -
                </button>
                <div className="px-4 flex items-center gap-2">
                  <span className={`text-base font-black ${darkMode ? "text-white" : "text-slate-800"}`}>{days}</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Días</span>
                </div>
                <button 
                  onClick={() => setDays(days + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-brand-cyan font-black"
                >
                  +
                </button>
              </div>
            </div>

            {/* Climate Multi-toggle */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-black uppercase tracking-tighter text-gray-500">
                Clima
              </label>
              <div className="flex bg-slate-500/10 rounded-xl p-1 border border-white/5">
                <button
                  onClick={() => toggleClimate("Calor")}
                  className={`px-4 py-1.5 rounded-lg transition-all flex items-center gap-2 ${climates.includes("Calor") ? "bg-orange-500 text-white shadow-md font-bold" : "text-gray-500 hover:bg-white/5 font-bold"}`}
                >
                  <ThermometerSun size={14} />
                  <span className="text-xs uppercase">Calor</span>
                </button>
                <button
                  onClick={() => toggleClimate("Frío")}
                  className={`px-4 py-1.5 rounded-lg transition-all flex items-center gap-2 ${climates.includes("Frío") ? "bg-blue-500 text-white shadow-md font-bold" : "text-gray-500 hover:bg-white/5 font-bold"}`}
                >
                  <Snowflake size={14} />
                  <span className="text-xs uppercase">Frío</span>
                </button>
              </div>
            </div>

            {/* Vibe / Theme Buttons */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-black uppercase tracking-tighter text-gray-500">
                Vibra
              </label>
              <div className="flex gap-1">
                {[
                  {
                    id: "romance",
                    icon: <Heart size={14} />,
                    color: "hover:text-red-500",
                    active: "bg-red-500 text-white",
                  },
                  {
                    id: "playa",
                    icon: <Palmtree size={14} />,
                    color: "hover:text-yellow-500",
                    active: "bg-yellow-500 text-white",
                  },
                  {
                    id: "nieve",
                    icon: <CloudSnow size={14} />,
                    color: "hover:text-blue-300",
                    active: "bg-blue-400 text-white",
                  },
                  {
                    id: "aventura",
                    icon: <Mountain size={14} />,
                    color: "hover:text-green-500",
                    active: "bg-green-600 text-white",
                  },
                ].map((vibe) => (
                  <button
                    key={vibe.id}
                    onClick={() => toggleThemeTag(vibe.id)}
                    className={`p-2.5 rounded-xl border border-white/5 transition-all ${selectedThemes.includes(vibe.id) ? vibe.active : `bg-white/5 text-gray-500 ${vibe.color}`}`}
                    title={vibe.id}
                  >
                    {vibe.icon}
                  </button>
                ))}
              </div>
            </div>

            <button
              ref={planButtonRef}
              onClick={onGeneratePlan}
              disabled={selectedDestinations.length === 0}
              className={`px-8 py-3 rounded-2xl font-black flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap
                    ${
                      selectedDestinations.length > 0
                        ? "bg-brand-cyan text-white shadow-xl shadow-brand-cyan/20 hover:shadow-brand-cyan/40 animate-pulse-cyan"
                        : darkMode
                          ? "bg-gray-800 text-gray-600 border border-gray-700"
                          : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }
                  `}
            >
              <Rocket size={18} />
              PLANIFICAR
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu & Filter Drawer */}
      {isMenuOpen && (
        <div
          className={`md:hidden p-6 space-y-8 ${darkMode ? "bg-[#0B1116] border-white/5" : "bg-slate-50 border-slate-200"} animate-in fade-in slide-in-from-top-4 duration-300`}
        >
          {/* User Profile Mobile */}
          <div className={`p-4 rounded-3xl border flex items-center justify-between ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white shadow-sm border-slate-200'}`}>
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-brand-cyan flex items-center justify-center text-sm font-black text-white uppercase">
                    {user.email?.substring(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{user.user_metadata?.full_name || 'Pasajero'}</h4>
                    <p className="text-[10px] text-gray-400">{user.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => supabase.auth.signOut()}
                  className={`p-2 rounded-xl transition-colors ${darkMode ? 'hover:bg-red-500/10 text-red-400' : 'hover:bg-red-50 text-red-500'}`}
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${darkMode ? 'bg-white/5' : 'bg-white shadow-sm'}`}>
                    <UserIcon size={20} className="text-brand-cyan" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Tu cuenta de viaje</h4>
                    <p className="text-[10px] text-gray-400">Guarda tus rutas favoritas</p>
                  </div>
                </div>
                <button 
                  onClick={onLogin}
                  className="px-4 py-2 bg-brand-cyan text-white text-xs font-black rounded-xl shadow-lg shadow-brand-cyan/20"
                >
                  ENTRAR
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase text-gray-500">
                Presupuesto
              </label>
              <span className="text-lg font-black text-brand-cyan">
                ${budget.toLocaleString('es-CL')}
              </span>
            </div>
            <input
              type="range"
              min="500000"
              max="10000000"
              step="100000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-2 bg-brand-cyan/20 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-2xl border ${darkMode ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-sm"}`}
            >
              <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">
                Días
              </label>
              <div className="flex items-center gap-2 font-black">
                <Calendar size={16} className="text-orange-500" />
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="bg-transparent w-full focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase text-gray-500">
                Clima
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleClimate("Calor")}
                  className={`flex-1 py-3 rounded-xl border ${climates.includes("Calor") ? "bg-orange-500 border-orange-500 text-white" : "border-white/10 text-gray-500"}`}
                >
                  <ThermometerSun size={18} className="mx-auto" />
                </button>
                <button
                  onClick={() => toggleClimate("Frío")}
                  className={`flex-1 py-3 rounded-xl border ${climates.includes("Frío") ? "bg-blue-500 border-blue-500 text-white" : "border-white/10 text-gray-500"}`}
                >
                  <Snowflake size={18} className="mx-auto" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase text-gray-500 block">
              ¿Qué buscas?
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: "romance", icon: <Heart />, color: "red" },
                { id: "playa", icon: <Palmtree />, color: "yellow" },
                { id: "nieve", icon: <CloudSnow />, color: "blue" },
                { id: "aventura", icon: <Mountain />, color: "green" },
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => toggleThemeTag(v.id)}
                  className={`p-3 rounded-xl border flex items-center justify-center transition-all ${selectedThemes.includes(v.id) ? `bg-${v.color}-500 border-${v.color}-500 text-white` : "border-white/10 text-gray-500"}`}
                >
                  {v.icon}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              onGeneratePlan();
              setIsMenuOpen(false);
            }}
            disabled={selectedDestinations.length === 0}
            className="w-full py-5 rounded-2xl bg-brand-cyan text-white font-black text-xl shadow-2xl shadow-brand-cyan/40 active:scale-95 transition-transform"
          >
            CONFIRMAR RUTA
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
