import React from 'react';
import { Globe, Moon, Sun, Menu, X } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
  lang: 'es' | 'en';
  toggleLang: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleTheme, lang, toggleLang }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0F0F0F]/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter text-white">
            Ventana<span className="text-brand-cyan">Pasillo</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-brand-cyan transition-colors">Mis Viajes</a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-brand-cyan transition-colors">Destinos</a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-brand-cyan transition-colors">Precios</a>
          <button className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-brand-cyan hover:border-brand-cyan transition-all">
            Entrar
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLang}
            className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold"
          >
            <Globe size={18} />
            <span>{lang.toUpperCase()}</span>
          </button>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
             {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0F0F0F] border-b border-white/5 p-4 space-y-4">
          <a href="#" className="block text-gray-400 hover:text-brand-cyan">Mis Viajes</a>
          <a href="#" className="block text-gray-400 hover:text-brand-cyan">Destinos</a>
          <a href="#" className="block text-gray-400 hover:text-brand-cyan">Precios</a>
          <button className="w-full py-3 rounded-lg bg-brand-cyan text-white font-bold">
            Entrar
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
