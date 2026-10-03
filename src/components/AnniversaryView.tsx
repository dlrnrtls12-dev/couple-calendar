import React from 'react';
import { Anniversary, CoupleProfile } from '../types';
import { calculateDaysPassed, calculateAnniversaryDDay, getUpcomingMilestones } from '../utils/dateUtils';
import { Plus, Sparkles, Trash2, Gift, Award, Heart, Star, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LiveTimer } from './LiveTimer';

interface AnniversaryViewProps {
  profile: CoupleProfile;
  anniversaries: Anniversary[];
  onAddAnniversary: () => void;
  onDeleteAnniversary: (id: string) => void;
}

export const AnniversaryView: React.FC<AnniversaryViewProps> = ({
  profile,
  anniversaries,
  onAddAnniversary,
  onDeleteAnniversary,
}) => {
  const weddingDays = profile.weddingDate ? calculateDaysPassed(profile.weddingDate) : 0;
  const metDays = profile.firstMetDate ? calculateDaysPassed(profile.firstMetDate) : 0;

  const triggerCelebrate = () => {
    // Multi-stage confetti celebration
    const count = 300;
    const defaults = { origin: { y: 0.6 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 30, startVelocity: 60, colors: ['#ff4b72', '#fda4af', '#f43f5e'] });
    fire(0.2, { spread: 65, colors: ['#a855f7', '#ec4899', '#f43f5e'] });
    fire(0.35, { spread: 110, decay: 0.91, scalar: 0.9, colors: ['#fbbf24', '#f59e0b', '#fb7185'] });
    fire(0.1, { spread: 130, startVelocity: 30, decay: 0.92, scalar: 1.3, colors: ['#ec4899', '#d946ef', '#f43f5e', '#38bdf8'] });
  };

  // Calculate sorted upcoming anniversaries (supporting both Solar and Lunar)
  const sortedAnniversaries = [...anniversaries].map((item) => {
    const ddayInfo = calculateAnniversaryDDay(item);
    return { ...item, ddayInfo };
  }).sort((a, b) => a.ddayInfo.days - b.ddayInfo.days);

  // The very next upcoming anniversary
  const nextAnniversary = sortedAnniversaries[0];

  // Calculate upcoming milestones for wedding & first met
  const weddingMilestones = profile.weddingDate ? getUpcomingMilestones(profile.weddingDate, '결혼') : [];
  const metMilestones = profile.firstMetDate ? getUpcomingMilestones(profile.firstMetDate, '처음 만난 지') : [];

  return (
    <div className="space-y-6 sm:space-y-7">
      {/* Real-time Ticking Seconds Live Counters */}
      <LiveTimer
        weddingDate={profile.weddingDate}
        firstMetDate={profile.firstMetDate}
      />

      {/* Hero Banner: Celebration & Next Spotlight */}
      {nextAnniversary && (
        <div className="relative overflow-hidden rounded-[28px] p-6 sm:p-8 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white shadow-xl shadow-rose-500/20 border border-white/30">
          <div className="absolute -top-16 -right-16 w-52 h-52 bg-white/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-amber-300/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-white/25 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-black border border-white/30 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-sparkle" />
                <span>가장 가까운 다가오는 기념일</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white drop-shadow-sm flex items-center justify-center md:justify-start gap-2">
                <span>{nextAnniversary.icon || '🎉'}</span>
                <span>{nextAnniversary.title}</span>
              </h2>
              <p className="text-xs sm:text-sm text-rose-100 font-semibold max-w-lg">
                {nextAnniversary.memo || '소중하고 행복한 순간을 함께 축하해요 ✨'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl px-5 py-3 text-center border border-white/30 shadow-inner w-full sm:w-auto">
                <span className="block text-[11px] font-bold text-rose-100">남은 시간</span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight drop-shadow-sm">
                  {nextAnniversary.ddayInfo.formattedText}
                </span>
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <button
                  onClick={triggerCelebrate}
                  className="flex items-center justify-center gap-2 bg-white text-rose-600 hover:bg-rose-50 px-5 py-3 rounded-2xl font-black text-xs sm:text-sm shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                  <span>축하 폭죽 터뜨리기! 🎉</span>
                </button>
                <button
                  onClick={onAddAnniversary}
                  className="flex items-center justify-center gap-2 bg-black/20 hover:bg-black/30 text-white border border-white/25 px-4 py-2.5 rounded-2xl font-bold text-xs shadow-xs transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>새 기념일 추가</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Anniversaries Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-xl font-black text-stone-800 flex items-center gap-2 tracking-tight">
            <Gift className="w-6 h-6 text-rose-500" />
            <span className="shimmer-text">기념일 & D-Day 리스트</span>
          </h3>
          <span className="text-xs font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 shadow-2xs">
            총 {anniversaries.length}개의 기념일
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {sortedAnniversaries.map((ann) => {
            const isTodayDDay = ann.ddayInfo.days === 0;

            return (
              <div
                key={ann.id}
                className={`relative group luxury-card rounded-[26px] p-5 sm:p-6 border transition-all duration-300 ${
                  isTodayDDay
                    ? 'border-rose-400 bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 ring-2 ring-rose-400 shadow-xl shadow-rose-300/40'
                    : 'border-white/80 hover:border-rose-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <span className="text-3xl sm:text-4xl p-2.5 bg-gradient-to-br from-rose-100/80 via-pink-100/60 to-amber-100/80 rounded-2xl border border-rose-200/60 shadow-xs group-hover:scale-110 transition-transform">
                      {ann.icon || '🌸'}
                    </span>
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-stone-800 tracking-tight">{ann.title}</h4>
                      <p className="text-xs text-stone-500 mt-1 font-semibold flex items-center gap-1.5 flex-wrap">
                        {ann.isLunar ? (
                          <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md font-bold text-[11px] border border-purple-200">
                            음력 {ann.lunarMonth}월 {ann.lunarDay}일 (올해: {ann.ddayInfo.nextSolarDate.slice(5)})
                          </span>
                        ) : (
                          <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md font-bold text-[11px] border border-rose-100">
                            양력 {ann.date.slice(5)}
                          </span>
                        )}
                        {ann.isRepeatYearly && (
                          <span className="text-amber-700 font-bold text-[11px]">
                            • 매년 반복 🔄
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-sm sm:text-base font-black px-3.5 py-1.5 rounded-2xl shadow-sm whitespace-nowrap ${
                      isTodayDDay
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white animate-pulse shadow-rose-400/40'
                        : 'bg-rose-50 text-rose-600 border border-rose-200'
                    }`}
                  >
                    {ann.ddayInfo.formattedText}
                  </span>
                </div>

                {ann.memo && (
                  <p className="text-xs text-stone-600 bg-white/90 p-3 rounded-2xl border border-rose-100/80 mt-3.5 font-medium leading-relaxed shadow-2xs">
                    {ann.memo}
                  </p>
                )}

                <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between text-xs text-stone-400">
                  <span className="text-[11px] font-bold text-rose-500 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-rose-500" />
                    <span>{ann.isRepeatYearly ? '매년 함께 챙기는 날 💖' : '특별한 하루 ✨'}</span>
                  </span>
                  <button
                    onClick={() => onDeleteAnniversary(ann.id)}
                    className="p-1.5 text-stone-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                    title="기념일 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Auto Milestone Timeline */}
      <div className="glass-panel-glow rounded-[28px] p-6 sm:p-7 shadow-xl border border-rose-200/80">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-6 h-6 text-amber-500" />
          <h3 className="text-lg sm:text-xl font-black text-stone-800 tracking-tight">
            다가오는 마일스톤 (100일 / 1000일 / 연주년) 🏆
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {weddingMilestones.concat(metMilestones).slice(0, 4).map((m, idx) => (
            <div
              key={idx}
              className="bg-white/90 border border-rose-200/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-rose-400 hover:shadow-md transition-all shadow-xs"
            >
              <div>
                <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                  카운트다운 ⏱️
                </span>
                <h4 className="text-sm sm:text-base font-black text-stone-800 mt-2">{m.label}</h4>
                <p className="text-xs text-stone-500 font-semibold mt-1">{m.date}</p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-rose-100 flex items-center justify-between">
                <span className="text-sm font-black text-rose-500">{m.dDayText}</span>
                <span className="text-xs font-bold text-amber-700">({m.daysLeft}일 남음)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
