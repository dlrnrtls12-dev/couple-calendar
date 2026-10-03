import React from 'react';
import { CoupleProfile } from '../types';
import { calculateDaysPassed } from '../utils/dateUtils';
import { Calendar, Heart, MessageSquareHeart, CheckSquare, Camera, Settings, Smartphone, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeaderProps {
  profile: CoupleProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenProfile: () => void;
  onOpenShare: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  activeTab,
  setActiveTab,
  onOpenProfile,
  onOpenShare,
}) => {
  const weddingDays = profile.weddingDate ? calculateDaysPassed(profile.weddingDate) : 0;
  const metDays = profile.firstMetDate ? calculateDaysPassed(profile.firstMetDate) : 0;

  const triggerHeartConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.2 },
      colors: ['#ff6b8b', '#ff8e53', '#f43f5e', '#f472b6', '#fb7185']
    });
  };

  const navItems = [
    { id: 'calendar', label: '캘린더', icon: Calendar, color: 'text-violet-500' },
    { id: 'anniversary', label: '기념일 & D-Day', icon: Heart, color: 'text-rose-500' },
    { id: 'notes', label: '러브 노트', icon: MessageSquareHeart, color: 'text-pink-500' },
    { id: 'todos', label: '할일 & 장보기', icon: CheckSquare, color: 'text-amber-500' },
    { id: 'memories', label: '소중한 순간', icon: Camera, color: 'text-emerald-500' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-rose-100/80 sticky top-0 z-40 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Top Bar: Title & Couple Profile & Actions */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & D-Day Status */}
          <div className="flex items-center gap-3">
            <button 
              onClick={triggerHeartConfetti} 
              title="사랑의 하트 날리기 클릭!"
              className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-400 via-pink-400 to-rose-300 flex items-center justify-center text-white shadow-md shadow-rose-200 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            >
              <Heart className="w-6 h-6 fill-white group-hover:scale-110 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  우리사이
                </h1>
                <span className="text-xs bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-semibold border border-rose-200">
                  부부 공간
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-stone-500">
                {profile.weddingDate && (
                  <span className="font-medium text-rose-500 bg-rose-50/70 px-1.5 py-0.5 rounded">
                    결혼 D+{weddingDays}일 💍
                  </span>
                )}
                {profile.firstMetDate && (
                  <span className="text-stone-400 hidden sm:inline">
                    (만난 지 {metDays}일째)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Couple Nicknames & Mood Bar */}
          <div className="flex items-center justify-center bg-stone-50 border border-stone-200/70 px-2.5 py-1.5 rounded-2xl gap-2 sm:gap-3 shadow-2xs w-full sm:w-auto">
            {/* Husband */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-lg sm:text-xl bg-blue-100/60 p-1 rounded-xl">{profile.partner1.avatar || '👨'}</span>
              <div className="text-left">
                <div className="text-[11px] sm:text-xs font-semibold text-stone-700 flex items-center gap-1">
                  <span>{profile.partner1.nickname || profile.partner1.name}</span>
                  <span className="text-[9px] sm:text-[10px] bg-blue-50 text-blue-600 px-1 rounded border border-blue-200">남편</span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-stone-500 truncate max-w-[85px] sm:max-w-[120px]">
                  {profile.partner1.mood}
                </div>
              </div>
            </div>

            <div className="text-rose-400 text-xs font-serif italic px-1">♥</div>

            {/* Wife */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-lg sm:text-xl bg-pink-100/60 p-1 rounded-xl">{profile.partner2.avatar || '👩'}</span>
              <div className="text-left">
                <div className="text-[11px] sm:text-xs font-semibold text-stone-700 flex items-center gap-1">
                  <span>{profile.partner2.nickname || profile.partner2.name}</span>
                  <span className="text-[9px] sm:text-[10px] bg-pink-50 text-pink-600 px-1 rounded border border-pink-200">아내</span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-stone-500 truncate max-w-[85px] sm:max-w-[120px]">
                  {profile.partner2.mood}
                </div>
              </div>
            </div>
          </div>

          {/* Utility Buttons */}
          <div className="flex items-center gap-2 justify-end w-full sm:w-auto">
            <button
              onClick={onOpenShare}
              className="flex-1 sm:flex-none justify-center flex items-center gap-1.5 text-xs font-medium bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-3 py-2 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
              title="스마트폰 연결 및 공유 링크"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>폰으로 공유</span>
            </button>
            <button
              onClick={onOpenProfile}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer border border-stone-200/80"
              title="우리 프로필 & 기념일 설정"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Couple Greeting Message */}
        {profile.coupleMessage && (
          <div className="mt-2 text-center text-xs text-rose-500/90 font-medium flex items-center justify-center gap-1.5 bg-rose-50/50 py-1 px-3 rounded-lg border border-rose-100/60">
            <Sparkles className="w-3 h-3 text-rose-400" />
            <span>"{profile.coupleMessage}"</span>
          </div>
        )}

        {/* Navigation Tabs (Desktop / Tablet only) */}
        <nav className="hidden md:flex items-center justify-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                    : 'text-stone-600 hover:text-rose-600 hover:bg-rose-50/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.color}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
