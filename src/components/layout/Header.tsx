import React from "react";
import { 
  Globe, 
  Moon, 
  Sun, 
  ChevronDown, 
  ChevronUp, 
  LogOut,
} from "lucide-react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabaseClient";

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
  lang: "es" | "en";
  toggleLang: () => void;
  budget: number;
  days: number;
  isFiltersOpen: boolean;
  setIsFiltersOpen: (val: boolean) => void;
  user: User | null;
  onLogin: () => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  darkMode,
  toggleTheme,
  lang,
  toggleLang,
  budget,
  days,
  isFiltersOpen,
  setIsFiltersOpen,
  user,
  onLogin,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className={`w-full z-[9999] transition-all duration-500 border-b ${darkMode ? "bg-[#0B1116] border-white/5" : "bg-white border-slate-100"}`}>
      <div className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between">
        
        {/* Brand & Search */}
        <div className="flex items-center gap-10">
          <span className="text-2xl font-black tracking-tighter cursor-pointer">
            Ventana<span className="text-brand-cyan font-extrabold opacity-80">Pasillo</span>
          </span>
          
          <div className="relative hidden md:block">
            <Globe className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-gray-600" : "text-slate-300"}`} size={18} />
            <input 
              type="text"
              placeholder="¿A dónde vamos?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-full text-sm font-bold w-[200px] lg:w-[300px] transition-all outline-none border
                ${darkMode ? "bg-white/5 border-white/5 text-white focus:bg-white/10" : "bg-slate-50 border-slate-100 text-slate-800 focus:bg-white focus:shadow-sm"}
              `}
            />
          </div>
        </div>

        {/* Right Side Nav */}
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm font-bold text-slate-400">
            <a href="#" className="hover:text-brand-cyan transition-colors">Mis Viajes</a>
            
            {user ? (
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${darkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
                  <div className="w-5 h-5 rounded-full bg-brand-cyan flex items-center justify-center text-[10px] font-black text-white">
                    {user.email?.substring(0, 1).toUpperCase()}
                  </div>
                  <span className="text-xs">{user.email?.split('@')[0]}</span>
                </div>
                <button onClick={() => supabase.auth.signOut()} className="text-slate-500 hover:text-red-500"><LogOut size={16}/></button>
              </div>
            ) : (
              <button onClick={onLogin} className={`px-5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white hover:bg-brand-cyan hover:text-white transition-all`}>
                Entrar
              </button>
            )}
          </nav>

          {/* Status Badge */}
          <div className={`flex items-center gap-3 px-4 py-1.5 rounded-full border ${darkMode ? 'border-brand-cyan/20 bg-brand-cyan/5' : 'border-brand-cyan/10 bg-slate-50'}`}>
            <span className="text-brand-cyan font-black text-xs">${budget.toLocaleString('es-CL')}</span>
            <span className={`text-xs font-bold ${darkMode ? 'text-gray-500' : 'text-slate-400'}`}>{days}d</span>
            <button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-cyan transition-colors border-l pl-3 ml-1"
            >
              Ajustes {isFiltersOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5">
            {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-slate-400" />}
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
