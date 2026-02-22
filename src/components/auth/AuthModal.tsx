import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { X, Mail, Lock, User, Loader2, Github } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;
        alert('Revisa tu email para confirmar el registro.');
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-md overflow-hidden rounded-3xl border transition-all transform shadow-2xl
        ${isDarkMode ? 'bg-[#151b23] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}
      `}>
        {/* Header Photo or Pattern */}
        <div className="h-32 bg-gradient-to-br from-brand-cyan to-indigo-600 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="absolute -bottom-8 left-8">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl border-4
              ${isDarkMode ? 'bg-[#0B1116] border-[#151b23]' : 'bg-white border-white'}
            `}>
              <User size={40} className="text-brand-cyan" />
            </div>
          </div>
        </div>

        <div className="p-8 pt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-black">{isLogin ? '¡Hola de nuevo!' : 'Crea tu cuenta'}</h2>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
              {isLogin ? 'Usa tus credenciales para entrar a Ventanapasillo.' : 'Empieza a planificar viajes inteligentes con Andy.'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Ej. Harry Potter"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all
                      ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-brand-cyan' : 'bg-slate-50 border-slate-200 focus:border-brand-cyan'}
                    `}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="email" 
                  placeholder="tu@email.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all
                    ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-brand-cyan' : 'bg-slate-50 border-slate-200 focus:border-brand-cyan'}
                  `}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all
                    ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-brand-cyan' : 'bg-slate-50 border-slate-200 focus:border-brand-cyan'}
                  `}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-brand-cyan hover:bg-brand-cyan/90 text-white font-black rounded-2xl shadow-xl shadow-brand-cyan/20 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'ENTRAR' : 'REGISTRARME')}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute w-full border-t border-gray-800"></div>
              <span className={`relative px-4 text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'bg-[#151b23] text-gray-500' : 'bg-white text-gray-400'}`}>O continúa con</span>
            </div>
            
            <button className={`w-full py-3 rounded-2xl border flex items-center justify-center gap-3 font-bold transition-all
              ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}
            `}>
              <Github size={20} />
              Github
            </button>
          </div>

          <p className="text-center mt-8 text-sm font-medium">
            <span className="text-gray-500">{isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'} </span>
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-brand-cyan hover:underline font-bold"
            >
              {isLogin ? 'Crea una aquí' : 'Inicia sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
