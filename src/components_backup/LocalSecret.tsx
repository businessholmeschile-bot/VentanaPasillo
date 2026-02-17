import React from 'react';
import { Sparkles, Zap, Info } from 'lucide-react';

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
  tag_color,
}) => {
  return (
    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#222] border-l-4 border-[#FF9F66] rounded-r-xl p-5 shadow-lg relative overflow-hidden group">
      {/* Background Glow */}
      <div 
        className="absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: tag_color }}
      />
      
      <div className="flex items-start gap-4">
        <div className="p-2.5 bg-gray-900 rounded-lg shrink-0">
          {type === 'Hack' ? (
            <Zap size={20} style={{ color: tag_color }} />
          ) : (
            <Sparkles size={20} style={{ color: tag_color }} />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-bold">{title}</h4>
            <span 
              className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase"
              style={{ backgroundColor: `${tag_color}20`, color: tag_color, border: `1px solid ${tag_color}40` }}
            >
              {type}
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            {emoji_icon} {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocalSecret;
