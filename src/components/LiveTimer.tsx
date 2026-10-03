import React, { useState, useEffect } from 'react';
import { differenceInSeconds, parseISO } from 'date-fns';
import { Sparkles, Heart, Flame, Clock } from 'lucide-react';

interface LiveTimerProps {
  weddingDate: string;
  firstMetDate: string;
}

export const LiveTimer: React.FC<LiveTimerProps> = ({ weddingDate, firstMetDate }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateDetailed = (dateStr: string) => {
    if (!dateStr) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const start = parseISO(dateStr);
    const totalSecs = Math.max(0, differenceInSeconds(now, start));

    const days = Math.floor(totalSecs / 86400);
    const hours = Math.floor((totalSecs % 86400) / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;

    return { days, hours, minutes, seconds };
  };

  const weddingTime = calculateDetailed(weddingDate);
  const metTime = calculateDetailed(firstMetDate);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
      {/* Wedding Live Counter Card */}
      <div className="relative group overflow-hidden rounded-[28px] p-6 sm:p-7 bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700 text-white shadow-xl shadow-rose-500/25 border border-white/30 hover:shadow-2xl hover:shadow-rose-500/35 transition-all duration-300">
        {/* Glow & Sparkle Accents */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-400/25 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-2 right-4 text-white/10 text-8xl font-serif select-none pointer-events-none transition-transform group-hover:scale-110">
          💍
        </div>

        <div className="relative z-10 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white/25 backdrop-blur-md text-white border border-white/40 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-sparkle" />
              <span>영원한 사랑의 서약</span>
            </span>
            <span className="text-xs font-bold text-rose-100 bg-black/20 px-2.5 py-0.5 rounded-full border border-white/10">
              2024.11.17
            </span>
          </div>

          <div>
            <div className="text-xs text-rose-100/90 font-semibold tracking-wide flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-rose-300 text-rose-300 animate-pulse" />
              <span>결혼하고 함께 걸어온 날</span>
            </div>
            <div className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-1 drop-shadow-md">
              D+{weddingTime.days}
              <span className="text-xl sm:text-2xl font-bold ml-1.5 text-rose-100">일째 💍</span>
            </div>
          </div>

          {/* Real-time Ticking Counter Units */}
          <div className="grid grid-cols-3 gap-2.5 pt-1.5">
            <div className="bg-black/25 backdrop-blur-md rounded-2xl p-2.5 text-center border border-white/20 shadow-inner group-hover:border-white/40 transition-colors">
              <span className="block text-xl sm:text-2xl font-black font-mono text-amber-200 drop-shadow-sm">
                {String(weddingTime.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-rose-100/80">시간</span>
            </div>
            <div className="bg-black/25 backdrop-blur-md rounded-2xl p-2.5 text-center border border-white/20 shadow-inner group-hover:border-white/40 transition-colors">
              <span className="block text-xl sm:text-2xl font-black font-mono text-amber-200 drop-shadow-sm">
                {String(weddingTime.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-rose-100/80">분</span>
            </div>
            <div className="bg-black/25 backdrop-blur-md rounded-2xl p-2.5 text-center border border-white/20 shadow-inner group-hover:border-white/40 transition-colors relative overflow-hidden">
              <span className="block text-xl sm:text-2xl font-black font-mono text-white animate-pulse drop-shadow-sm">
                {String(weddingTime.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-rose-100/80 flex items-center justify-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping inline-block" />
                초 (LIVE)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* First Met 3900+ Days Counter Card */}
      <div className="relative group overflow-hidden rounded-[28px] p-6 sm:p-7 bg-gradient-to-br from-amber-500 via-rose-500 to-pink-600 text-white shadow-xl shadow-amber-500/25 border border-white/30 hover:shadow-2xl hover:shadow-amber-500/35 transition-all duration-300">
        {/* Glow & Sparkle Accents */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-yellow-300/30 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-400/25 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-2 right-4 text-white/10 text-8xl font-serif select-none pointer-events-none transition-transform group-hover:scale-110">
          🌸
        </div>

        <div className="relative z-10 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white/25 backdrop-blur-md text-white border border-white/40 shadow-sm">
              <Flame className="w-3.5 h-3.5 text-amber-200 animate-bounce" />
              <span>3900일의 기적 같은 인연</span>
            </span>
            <span className="text-xs font-bold text-amber-100 bg-black/20 px-2.5 py-0.5 rounded-full border border-white/10">
              2016.01.29
            </span>
          </div>

          <div>
            <div className="text-xs text-amber-100/90 font-semibold tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>처음 서로를 알아본 날로부터</span>
            </div>
            <div className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-1 drop-shadow-md">
              D+{metTime.days}
              <span className="text-xl sm:text-2xl font-bold ml-1.5 text-amber-100">일째 🌸</span>
            </div>
          </div>

          {/* Real-time Ticking Counter Units */}
          <div className="grid grid-cols-3 gap-2.5 pt-1.5">
            <div className="bg-black/25 backdrop-blur-md rounded-2xl p-2.5 text-center border border-white/20 shadow-inner group-hover:border-white/40 transition-colors">
              <span className="block text-xl sm:text-2xl font-black font-mono text-amber-200 drop-shadow-sm">
                {String(metTime.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-amber-100/80">시간</span>
            </div>
            <div className="bg-black/25 backdrop-blur-md rounded-2xl p-2.5 text-center border border-white/20 shadow-inner group-hover:border-white/40 transition-colors">
              <span className="block text-xl sm:text-2xl font-black font-mono text-amber-200 drop-shadow-sm">
                {String(metTime.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-amber-100/80">분</span>
            </div>
            <div className="bg-black/25 backdrop-blur-md rounded-2xl p-2.5 text-center border border-white/20 shadow-inner group-hover:border-white/40 transition-colors relative overflow-hidden">
              <span className="block text-xl sm:text-2xl font-black font-mono text-white animate-pulse drop-shadow-sm">
                {String(metTime.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-amber-100/80 flex items-center justify-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping inline-block" />
                초 (LIVE)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
