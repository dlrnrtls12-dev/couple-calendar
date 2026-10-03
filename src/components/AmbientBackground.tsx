import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Pink/Rose Glow Orb */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-br from-rose-300/40 via-pink-400/25 to-purple-400/20 blur-3xl animate-float"
      />
      
      {/* Sunset Amber/Gold Glow Orb */}
      <div 
        className="absolute top-1/3 -right-32 w-80 h-80 sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-bl from-amber-300/35 via-orange-300/25 to-rose-300/20 blur-3xl animate-float-delayed"
      />
      
      {/* Lavender Violet Glow Orb */}
      <div 
        className="absolute -bottom-32 left-1/4 w-96 h-96 sm:w-[550px] sm:h-[550px] rounded-full bg-gradient-to-tr from-purple-300/30 via-pink-300/20 to-sky-300/20 blur-3xl animate-float"
      />

      {/* Subtle Floating Hearts Pattern */}
      <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:24px_24px]" />
    </div>
  );
};
