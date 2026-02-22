import React from 'react';

interface PlaneTakeoffProps {
  isFlying: boolean;
  // buttonRef kept for prop compatibility but unused now for vertical pass
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

const PlaneTakeoff: React.FC<PlaneTakeoffProps> = ({ isFlying }) => {
  if (!isFlying) return null;

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden flex justify-center">
      {/* Container for the plane to descent */}
      <div 
        className="absolute w-[600px] h-auto"
        style={{
          animation: 'descent 4s forwards cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <img 
          src="/assets/plane_787.png" 
          alt="Boeing 787" 
          className="w-full h-auto drop-shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
          style={{ transform: 'rotate(180deg)' }} 
        />
        
        {/* Cinematic Vapor/Cloud trail behind the descent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 md:w-8 h-screen bg-gradient-to-t from-transparent via-white/5 to-white/10 blur-2xl"></div>
      </div>

      <style>{`
        @keyframes descent {
          0% {
            transform: translateY(-120%) scale(1.5);
            opacity: 0;
            filter: blur(20px);
          }
          15% {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(-80%) scale(1.4);
          }
          100% {
            transform: translateY(150vh) scale(0.8);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default PlaneTakeoff;
