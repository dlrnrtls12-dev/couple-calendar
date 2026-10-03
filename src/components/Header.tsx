import React from 'react';
import { CoupleProfile } from '../types';
import { calculateDaysPassed } from '../utils/dateUtils';
import { Calendar, Heart, MessageSquareHeart, CheckSquare, Camera, Settings, Smartphone, Sparkles, Crown } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeaderProps {
  profile: CoupleProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenProfile: () => void;
  onOpenShare: () => void;
  onOpenQuickNickname: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  activeTab,
  setActiveTab,
  onOpenProfile,
  onOpenShare,
  onOpenQuickNickname,
  onOpenAdmin,
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
    <header className="glass-panel sticky top-0 z-40 border-b border-white/70 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Top Bar: Title & Couple Profile & Actions */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & D-Day Status */}
          <div className="flex items-center gap-3">
            <button 
              onClick={triggerHeartConfetti} 
              title="사랑의 하트 날리기 클릭!"
              className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 flex items-center justify-center text-white shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            >
              <div className="absolute inset-0 rounded-2xl bg-rose-400 animate-ping opacity-25 pointer-events-none" />
              <Heart className="w-6 h-6 fill-white group-hover:scale-110 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight shimmer-text">
                  우리사이
                </h1>
                <span className="text-[10px] bg-gradient-to-r from-rose-500 to-pink-500 text-white px-2 py-0.5 rounded-full font-bold shadow-2xs">
                  둘만의 공간 💍
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 mt-0.5 text-xs">
                {profile.weddingDate && (
                  <span className="font-bold text-rose-600 bg-rose-100/70 px-2 py-0.5 rounded-lg border border-rose-200/80 text-[11px] shadow-2xs">
                    결혼 D+{weddingDays}일
                  </span>
                )}
                {profile.firstMetDate && (
                  <span className="font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-lg border border-amber-200/80 text-[11px] shadow-2xs">
                    만난 지 D+{metDays}일
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Couple Nicknames & Mood Bar (Clickable to customize nicknames!) */}
          <button
            onClick={onOpenQuickNickname}
            title="클릭하여 서방님, 우리여보 등 호칭을 변경하세요 ✨"
            className="group flex items-center justify-center bg-white/90 hover:bg-white backdrop-blur-md border border-rose-200/90 hover:border-rose-400 px-3.5 py-1.5 rounded-2xl gap-2 sm:gap-3 shadow-xs hover:shadow-md transition-all cursor-pointer w-full sm:w-auto text-left relative"
          >
            {/* Husband */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-lg sm:text-xl bg-blue-100/80 p-1 rounded-xl shadow-2xs group-hover:scale-110 transition-transform">{profile.partner1.avatar || '👨'}</span>
              <div className="text-left">
                <div className="text-[11px] sm:text-xs font-bold text-stone-800 flex items-center gap-1">
                  <span className="group-hover:text-blue-600 transition-colors">{profile.partner1.nickname || profile.partner1.name}</span>
                  <span className="text-[9px] sm:text-[10px] bg-blue-500 text-white font-bold px-1.5 py-0.2 rounded-md">남편</span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-stone-500 truncate max-w-[85px] sm:max-w-[120px]">
                  {profile.partner1.mood}
                </div>
              </div>
            </div>

            <div className="text-rose-500 text-sm font-serif italic px-1 animate-pulse">♥</div>

            {/* Wife */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-lg sm:text-xl bg-pink-100/80 p-1 rounded-xl shadow-2xs group-hover:scale-110 transition-transform">{profile.partner2.avatar || '👩'}</span>
              <div className="text-left">
                <div className="text-[11px] sm:text-xs font-bold text-stone-800 flex items-center gap-1">
                  <span className="group-hover:text-pink-600 transition-colors">{profile.partner2.nickname || profile.partner2.name}</span>
                  <span className="text-[9px] sm:text-[10px] bg-pink-500 text-white font-bold px-1.5 py-0.2 rounded-md">아내</span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-stone-500 truncate max-w-[85px] sm:max-w-[120px]">
                  {profile.partner2.mood}
                </div>
              </div>
            </div>

            {/* Little edit hint badge */}
            <span className="hidden sm:inline-block ml-1 text-[10px] text-rose-500 bg-rose-50 border border-rose-200/80 px-1.5 py-0.5 rounded-md font-semibold opacity-70 group-hover:opacity-100 transition-opacity">
              호칭 변경 ✏️
            </span>
          </button>

          {/* Utility Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 justify-end w-full sm:w-auto">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-xs font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-3 py-2.5 rounded-2xl shadow-sm shadow-amber-500/25 transition-all active:scale-95 cursor-pointer"
              title="관리자 모드 (사용자 이름 임의 변경 및 전체 설정)"
            >
              <Crown className="w-3.5 h-3.5 text-amber-200" />
              <span>관리자</span>
            </button>
            <button
              onClick={onOpenShare}
              className="flex-1 sm:flex-none justify-center flex items-center gap-1.5 text-xs font-bold bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-700 text-white px-3.5 py-2.5 rounded-2xl shadow-md shadow-purple-500/20 transition-all active:scale-95 cursor-pointer"
              title="스마트폰 연결 및 공유 링크"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>폰으로 공유</span>
            </button>
            <button
              onClick={onOpenProfile}
              className="p-2.5 text-stone-600 hover:text-stone-900 bg-white/80 hover:bg-white rounded-2xl transition-all cursor-pointer border border-stone-200/80 shadow-2xs"
              title="우리 프로필 & 기념일 설정"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Couple Greeting Message */}
        {profile.coupleMessage && (
          <div className="mt-2 text-center text-xs text-rose-700 font-semibold flex items-center justify-center gap-1.5 bg-rose-50/70 py-1.5 px-4 rounded-xl border border-rose-200/60 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
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
