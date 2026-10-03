import React from 'react';
import { Anniversary, CoupleProfile } from '../types';
import { calculateDaysPassed, calculateDDay, getUpcomingMilestones } from '../utils/dateUtils';
import { Plus, Sparkles, Trash2, Gift, Award } from 'lucide-react';
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
    const count = 250;
    const defaults = { origin: { y: 0.6 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#ff6b8b', '#fda4af', '#f43f5e'] });
    fire(0.2, { spread: 60, colors: ['#a855f7', '#ec4899', '#f43f5e'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#fbbf24', '#f59e0b', '#fb7185'] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#ec4899', '#d946ef', '#f43f5e'] });
  };

  // Calculate sorted upcoming anniversaries
  const sortedAnniversaries = [...anniversaries].map((item) => {
    const ddayInfo = calculateDDay(item.date, item.isRepeatYearly);
    return { ...item, ddayInfo };
  }).sort((a, b) => a.ddayInfo.days - b.ddayInfo.days);

  // Calculate upcoming milestones for wedding & first met
  const weddingMilestones = profile.weddingDate ? getUpcomingMilestones(profile.weddingDate, '결혼') : [];
  const metMilestones = profile.firstMetDate ? getUpcomingMilestones(profile.firstMetDate, '처음 만난 지') : [];

  return (
    <div className="space-y-6">
      {/* Real-time Ticking Seconds Live Counters */}
      <LiveTimer
        weddingDate={profile.weddingDate}
        firstMetDate={profile.firstMetDate}
      />

      {/* Hero Banner: Celebration & Quick Action */}
      <div className="relative overflow-hidden rounded-3xl glass-panel-glow p-6 sm:p-7 text-stone-800 shadow-xl border border-rose-200/80">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="text-center md:text-left space-y-1.5">
            <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold border border-rose-200">
              <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" />
              <span>함께해서 매 순간이 축제인 우리</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
              {profile.partner1.nickname || '서방님'} ♥ {profile.partner2.nickname || '우리여보'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-medium">
              3900일의 기적 같은 인연, 그리고 영원을 약속한 아름다운 결혼 이야기 ✨
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={triggerCelebrate}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white hover:from-rose-600 hover:to-pink-700 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-lg shadow-rose-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-yellow-300 animate-bounce" />
              <span>화려한 축하 폭죽 터뜨리기! 🎉</span>
            </button>
            <button
              onClick={onAddAnniversary}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-stone-700 border border-stone-200 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-rose-500" />
              <span>기념일 추가</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Anniversaries Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-stone-800 flex items-center gap-2">
            <Gift className="w-5 h-5 text-rose-500" />
            <span className="shimmer-text font-black text-xl">기념일 & D-Day 리스트</span>
          </h3>
          <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
            총 {anniversaries.length}개의 기념일
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedAnniversaries.map((ann) => {
            const isTodayDDay = ann.ddayInfo.days === 0;

            return (
              <div
                key={ann.id}
                className={`relative group glass-panel rounded-3xl p-5 border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${
                  isTodayDDay
                    ? 'border-rose-400 bg-rose-50/70 ring-2 ring-rose-400/80 shadow-lg shadow-rose-300/30'
                    : 'border-white/80 hover:border-rose-300 hover:shadow-lg hover:shadow-rose-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2.5 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border border-rose-100 shadow-2xs">
                      {ann.icon || '🌸'}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-stone-800">{ann.title}</h4>
                      <p className="text-xs text-stone-500 mt-0.5 font-medium">
                        {ann.date} {ann.isRepeatYearly && '• 매년 반복'}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-sm font-black px-3.5 py-1.5 rounded-2xl shadow-xs ${
                      isTodayDDay
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white animate-pulse'
                        : 'bg-rose-50 text-rose-600 border border-rose-200'
                    }`}
                  >
                    {ann.ddayInfo.formattedText}
                  </span>
                </div>

                {ann.memo && (
                  <p className="text-xs text-stone-600 bg-white/80 p-3 rounded-2xl border border-stone-100 mt-3 font-medium leading-relaxed">
                    {ann.memo}
                  </p>
                )}

                <div className="mt-4 pt-3 border-t border-rose-100/60 flex items-center justify-between text-xs text-stone-400">
                  <span className="text-[11px] font-medium text-stone-400">
                    {ann.isRepeatYearly ? '매년 챙기는 기념일 💖' : '특별한 날 ✨'}
                  </span>
                  <button
                    onClick={() => onDeleteAnniversary(ann.id)}
                    className="p-1 text-stone-300 hover:text-rose-500 rounded-lg transition-colors cursor-pointer"
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
      <div className="glass-panel rounded-3xl p-6 shadow-sm border border-stone-200/80">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-bold text-stone-800">다가오는 마일스톤 (100일 / 1000일 / 연주년)</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {weddingMilestones.concat(metMilestones).slice(0, 4).map((m, idx) => (
            <div
              key={idx}
              className="bg-white/80 border border-rose-100/80 rounded-2xl p-4 flex flex-col justify-between hover:bg-rose-50/50 transition-colors shadow-2xs"
            >
              <div>
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                  카운트다운
                </span>
                <h4 className="text-sm font-bold text-stone-800 mt-2">{m.label}</h4>
                <p className="text-xs text-stone-500 mt-1">{m.date}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-bold text-rose-500">{m.dDayText}</span>
                <span className="text-[11px] text-stone-400">({m.daysLeft}일 남음)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
