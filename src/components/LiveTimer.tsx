import React, { useState, useEffect } from 'react';
import { differenceInSeconds, parseISO } from 'date-fns';
import { Sparkles, Heart, Flame } from 'lucide-react';

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Wedding Live Counter Card */}
      <div className="relative overflow-hidden rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-rose-500/95 via-pink-600/90 to-purple-600/95 text-white shadow-xl shadow-rose-500/20 border border-white/20">
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-white/20 rounded-full blur-2xl" />
        <div className="absolute bottom-2 right-4 text-white/10 text-7xl font-serif select-none pointer-events-none">
          💍
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-rose-100 border border-white/30">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
              <span>우리의 결혼 이야기</span>
            </span>
            <span className="text-xs font-semibold text-rose-200">2024.11.17</span>
          </div>

          <div>
            <div className="text-xs text-rose-200 font-medium">영원을 약속한 지</div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-0.5">
              D+{weddingTime.days}일
            </div>
          </div>

          {/* Real-time Ticking Counter Units */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-2 text-center border border-white/10">
              <span className="block text-lg sm:text-xl font-bold font-mono text-yellow-300">
                {String(weddingTime.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-rose-200">시간</span>
            </div>
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-2 text-center border border-white/10">
              <span className="block text-lg sm:text-xl font-bold font-mono text-yellow-300">
                {String(weddingTime.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-rose-200">분</span>
            </div>
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-2 text-center border border-white/10 animate-pulse">
              <span className="block text-lg sm:text-xl font-bold font-mono text-white">
                {String(weddingTime.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-rose-200">초 (실시간)</span>
            </div>
          </div>
        </div>
      </div>

      {/* First Met 3900+ Days Counter Card */}
      <div className="relative overflow-hidden rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-amber-500/95 via-rose-500/90 to-pink-600/95 text-white shadow-xl shadow-amber-500/20 border border-white/20">
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-yellow-300/25 rounded-full blur-2xl" />
        <div className="absolute bottom-2 right-4 text-white/10 text-7xl font-serif select-none pointer-events-none">
          🌸
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-amber-100 border border-white/30">
              <Flame className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
              <span>3900일의 기적 같은 사랑</span>
            </span>
            <span className="text-xs font-semibold text-amber-100">2016.01.29</span>
          </div>

          <div>
            <div className="text-xs text-amber-100 font-medium">처음 눈이 마주친 날로부터</div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-0.5">
              D+{metTime.days}일째
            </div>
          </div>

          {/* Real-time Ticking Counter Units */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-2 text-center border border-white/10">
              <span className="block text-lg sm:text-xl font-bold font-mono text-yellow-300">
                {String(metTime.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-amber-100">시간</span>
            </div>
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-2 text-center border border-white/10">
              <span className="block text-lg sm:text-xl font-bold font-mono text-yellow-300">
                {String(metTime.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-amber-100">분</span>
            </div>
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-2 text-center border border-white/10 animate-pulse">
              <span className="block text-lg sm:text-xl font-bold font-mono text-white">
                {String(metTime.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-amber-100">초 (실시간)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
