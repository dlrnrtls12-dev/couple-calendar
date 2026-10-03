import React from 'react';
import { Anniversary, CoupleProfile } from '../types';
import { calculateDaysPassed, calculateDDay, getUpcomingMilestones, formatKoreanDate } from '../utils/dateUtils';
import { Heart, Plus, Sparkles, Trash2, Calendar, Gift, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

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
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#ff6b8b', '#fda4af', '#f43f5e']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#a855f7', '#ec4899', '#f43f5e']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#fbbf24', '#f59e0b', '#fb7185']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#ec4899', '#d946ef', '#f43f5e']
    });
  };

  // Calculate sorted upcoming anniversaries
  const sortedAnniversaries = [...anniversaries].map((item) => {
    const ddayInfo = calculateDDay(item.date, item.isRepeatYearly);
    return { ...item, ddayInfo };
  }).sort((a, b) => {
    // Put today first, then closest upcoming, then past
    return a.ddayInfo.days - b.ddayInfo.days;
  });

  // Calculate upcoming milestones for wedding & first met
  const weddingMilestones = profile.weddingDate ? getUpcomingMilestones(profile.weddingDate, '결혼') : [];
  const metMilestones = profile.firstMetDate ? getUpcomingMilestones(profile.firstMetDate, '처음 만난 지') : [];

  return (
    <div className="space-y-6">
      {/* Hero Banner: Romantic Couple Milestone Showcase */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 text-white p-6 sm:p-8 shadow-lg shadow-rose-200">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-4 right-6 text-white/20 text-8xl font-serif select-none pointer-events-none">
          ♥
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-rose-100">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>우리의 소중한 시간들</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              결혼한 지 <span className="underline decoration-wavy decoration-yellow-300">D+{weddingDays}일</span>
            </h2>
            <p className="text-sm text-rose-100 font-medium">
              {profile.partner1.nickname || profile.partner1.name} ❤️ {profile.partner2.nickname || profile.partner2.name} 부부의 행복한 여정
            </p>
            {profile.weddingDate && (
              <div className="text-xs text-rose-200/80 pt-1">
                결혼식: {formatKoreanDate(profile.weddingDate)}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={triggerCelebrate}
              className="flex items-center gap-2 bg-white text-rose-600 hover:bg-rose-50 px-5 py-3 rounded-2xl font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
              <span>축하 폭죽 터뜨리기! 🎉</span>
            </button>
            <button
              onClick={onAddAnniversary}
              className="flex items-center gap-2 bg-rose-700/60 hover:bg-rose-700 border border-white/30 text-white px-4 py-3 rounded-2xl font-semibold text-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
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
            <span>기념일 & 다가오는 날</span>
          </h3>
          <span className="text-xs text-stone-500">총 {anniversaries.length}개의 기념일</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedAnniversaries.map((ann) => {
            const isTodayDDay = ann.ddayInfo.days === 0;

            return (
              <div
                key={ann.id}
                className={`relative group bg-white rounded-3xl p-5 border transition-all shadow-sm hover:shadow-md ${
                  isTodayDDay
                    ? 'border-rose-400 bg-rose-50/30 ring-2 ring-rose-300'
                    : 'border-stone-200/80 hover:border-rose-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 bg-stone-50 rounded-2xl border border-stone-100">
                      {ann.icon || '🌸'}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-stone-800">{ann.title}</h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {ann.date} {ann.isRepeatYearly && '(매년 반복)'}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-sm font-extrabold px-3 py-1 rounded-xl shadow-2xs ${
                      isTodayDDay
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-rose-50 text-rose-600 border border-rose-200'
                    }`}
                  >
                    {ann.ddayInfo.formattedText}
                  </span>
                </div>

                {ann.memo && (
                  <p className="text-xs text-stone-600 bg-stone-50/80 p-2.5 rounded-xl border border-stone-100 mt-3">
                    {ann.memo}
                  </p>
                )}

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                  <span>{ann.isRepeatYearly ? '매년 챙기는 기념일' : '특별한 날'}</span>
                  <button
                    onClick={() => onDeleteAnniversary(ann.id)}
                    className="p-1 text-stone-300 hover:text-rose-500 transition-colors cursor-pointer"
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
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-bold text-stone-800">다가오는 마일스톤 (100일 / 1000일 / 주년)</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {weddingMilestones.concat(metMilestones).slice(0, 4).map((m, idx) => (
            <div
              key={idx}
              className="bg-stone-50/70 border border-stone-200/70 rounded-2xl p-4 flex flex-col justify-between hover:bg-stone-50 transition-colors"
            >
              <div>
                <span className="text-[10px] font-bold text-stone-500 bg-stone-200/60 px-2 py-0.5 rounded">
                  카운트다운
                </span>
                <h4 className="text-sm font-bold text-stone-800 mt-2">{m.label}</h4>
                <p className="text-xs text-stone-500 mt-1">{m.date}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-200/50 flex items-center justify-between">
                <span className="text-xs font-semibold text-rose-500">{m.dDayText}</span>
                <span className="text-[11px] text-stone-400">({m.daysLeft}일 남음)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
