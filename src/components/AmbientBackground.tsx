import React, { useMemo } from 'react';

export const AmbientBackground: React.FC = () => {
  // Generate random sparkling elements for a fairy-tale couple ambiance
  const sparkles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      top: `${(i * 19) % 95}%`,
      left: `${(i * 23 + 7) % 92}%`,
      size: 10 + (i % 4) * 6,
      delay: `${(i * 0.7) % 4}s`,
      duration: `${4 + (i % 3) * 2}s`,
      icon: ['✨', '💖', '🌸', '💫', '💎', '🤍', '⭐'][i % 7],
      opacity: 0.25 + (i % 3) * 0.15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary Rose Glow Orb */}
      <div 
        className="absolute -top-32 -left-20 w-[420px] h-[420px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-br from-rose-400/35 via-pink-400/25 to-purple-400/20 blur-[90px] animate-float"
      />
      
      {/* Warm Golden Sunrise Glow Orb */}
      <div 
        className="absolute top-1/4 -right-24 w-[380px] h-[380px] sm:w-[550px] sm:h-[550px] rounded-full bg-gradient-to-bl from-amber-300/35 via-rose-300/25 to-pink-300/20 blur-[100px] animate-float-delayed"
      />
      
      {/* Romantic Lavender Velvet Orb */}
      <div 
        className="absolute -bottom-24 left-1/5 w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full bg-gradient-to-tr from-purple-300/30 via-pink-300/25 to-rose-200/20 blur-[100px] animate-float"
      />

      {/* Center Soft Pearl Halo */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[800px] sm:h-[800px] rounded-full bg-radial from-white/40 via-rose-100/10 to-transparent blur-3xl"
      />

      {/* Subtle Floating Sparkles & Hearts */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute select-none pointer-events-none animate-float"
          style={{
            top: s.top,
            left: s.left,
            fontSize: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: s.delay,
            animationDuration: s.duration,
            filter: 'drop-shadow(0 2px 8px rgba(244, 63, 94, 0.3))',
          }}
        >
          {s.icon}
        </div>
      ))}

      {/* Elegant Polka Pattern Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#e11d48_1.5px,transparent_1.5px)] [background-size:28px_28px]" />
    </div>
  );
};
