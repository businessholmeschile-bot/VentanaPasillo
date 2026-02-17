import React from 'react';
import { Sparkles, Zap } from 'lucide-react';

interface SecretProps {
  title: string;
  description: string;
  type: string;
  emoji_icon: string;
  tag_color: string;
}

const LocalSecret: React.FC<SecretProps> = ({
  title,
  description,
  type,
  emoji_icon,
}) => {
  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-[#141A20] dark:to-[#0F0F0F] border border-gray-100 dark:border-transparent border-l-4 dark:border-l-4 border-brand-orange rounded-r-xl p-5 shadow-sm dark:shadow-lg relative overflow-hidden group hover:bg-gray-50 dark:hover:bg-[#1A222A] transition-colors">
      <div 
        className="absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-10 bg-brand-orange"
      />
      
      <div className="flex items-start gap-4">
        <div className="p-2.5 bg-brand-orange/5 dark:bg-brand-orange/10 rounded-lg shrink-0 border border-brand-orange/10 dark:border-brand-orange/20">
          {type === 'Hack' ? (
            <Zap size={20} className="text-brand-orange" />
          ) : (
            <Sparkles size={20} className="text-brand-orange" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-gray-900 dark:text-white font-bold">{title}</h4>
            <span 
              className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase bg-brand-orange/10 dark:bg-brand-orange/20 text-brand-orange border border-brand-orange/20 dark:border-brand-orange/40"
            >
              {type}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {emoji_icon} {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocalSecret;
