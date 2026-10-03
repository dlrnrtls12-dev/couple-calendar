import React from 'react';
import { CoupleProfile } from '../types';
import { calculateDaysPassed } from '../utils/dateUtils';
import { Calendar, Heart, MessageSquareHeart, CheckSquare, Camera, Settings, Smartphone, Sparkles, Crown, Edit3 } from 'lucide-react';
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
      particleCount: 70,
      spread: 80,
      origin: { y: 0.25 },
      colors: ['#ff4b72', '#fb7185', '#fda4af', '#f59e0b', '#ec4899', '#c084fc']
    });
  };

  const navItems = [
    { id: 'calendar', label: '달력', icon: Calendar, activeGradient: 'from-rose-500 to-pink-500', color: 'text-rose-500' },
    { id: 'anniversary', label: '기념일 & D-Day', icon: Heart, activeGradient: 'from-pink-500 to-rose-600', color: 'text-pink-500' },
    { id: 'notes', label: '러브 노트', icon: MessageSquareHeart, activeGradient: 'from-purple-500 to-pink-500', color: 'text-purple-500' },
    { id: 'todos', label: '할일 & 버킷', icon: CheckSquare, activeGradient: 'from-amber-500 to-rose-500', color: 'text-amber-500' },
    { id: 'memories', label: '추억 앨범', icon: Camera, activeGradient: 'from-emerald-500 to-teal-600', color: 'text-emerald-500' },
  ];

  return (
    <header className="glass-panel-glow sticky top-0 z-40 border-b border-rose-200/60 shadow-lg shadow-rose-100/40 transition-all backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5">
        {/* Top Bar: Title & Couple Profile & Actions */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Left: Brand Logo & Floating D-Day Badges */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-3">
              <button 
                onClick={triggerHeartConfetti} 
                title="사랑의 축하 하트 터뜨리기! 💕"
                className="relative group p-0.5 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-300 shadow-md shadow-rose-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 flex items-center justify-center text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Heart className="w-6 h-6 fill-white text-white animate-heart-beat drop-shadow-md" />
                  <Sparkles className="w-3.5 h-3.5 text-amber-200 absolute top-1 right-1 animate-sparkle" />
                </div>
              </button>
              
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight shimmer-text drop-shadow-xs">
                    우리사이
                  </h1>
                  <span className="text-[10px] bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white px-2.5 py-0.5 rounded-full font-extrabold shadow-sm tracking-wide">
                    FOREVER 💍
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                  {profile.weddingDate && (
                    <span className="inline-flex items-center gap-1 font-extrabold text-rose-700 bg-rose-50 border border-rose-200/80 px-2 py-0.5 rounded-lg text-[11px] shadow-2xs">
                      <span className="text-xs">💍</span> 결혼 D+{weddingDays}일
                    </span>
                  )}
                  {profile.firstMetDate && (
                    <span className="inline-flex items-center gap-1 font-extrabold text-amber-800 bg-amber-50/90 border border-amber-200/80 px-2 py-0.5 rounded-lg text-[11px] shadow-2xs">
                      <span className="text-xs">🌸</span> 함께한 D+{metDays}일
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Admin & Share Mini Actions */}
            <div className="flex sm:hidden items-center gap-1.5">
              <button
                onClick={onOpenAdmin}
                className="p-2 text-amber-700 bg-amber-100/80 hover:bg-amber-200 rounded-xl transition-all cursor-pointer border border-amber-200"
                title="관리자 모드"
              >
                <Crown className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenShare}
                className="p-2 text-purple-700 bg-purple-100/80 hover:bg-purple-200 rounded-xl transition-all cursor-pointer border border-purple-200"
                title="모바일 공유"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenProfile}
                className="p-2 text-stone-600 bg-white/80 rounded-xl border border-stone-200"
                title="설정"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center: Couple Nicknames & Mood Bar (Clickable to change nicknames) */}
          <button
            onClick={onOpenQuickNickname}
            title="클릭하여 호칭(서방님, 우리여보 등)을 자유롭게 변경하세요 ✨"
            className="group relative flex items-center justify-between sm:justify-center bg-gradient-to-r from-white/95 via-rose-50/40 to-white/95 hover:from-white hover:to-rose-50 backdrop-blur-md border border-rose-200 hover:border-rose-400 p-2 sm:px-4 sm:py-2 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer w-full lg:w-auto"
          >
            {/* Husband */}
            <div className="flex items-center gap-2">
              <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 shadow-2xs">
                <span className="text-xl sm:text-2xl bg-white block p-1 rounded-full group-hover:scale-105 transition-transform">
                  {profile.partner1.avatar || '👨'}
                </span>
                <span className="absolute -bottom-1 -right-1 text-[9px] bg-blue-600 text-white font-black px-1 rounded-full shadow-xs">
                  남편
                </span>
              </div>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-black text-stone-800 flex items-center gap-1">
                  <span className="group-hover:text-blue-600 transition-colors">
                    {profile.partner1.nickname || profile.partner1.name}
                  </span>
                </div>
                <div className="text-[10px] text-stone-500 font-medium truncate max-w-[90px] sm:max-w-[130px]">
                  {profile.partner1.mood || '행복해요 💕'}
                </div>
              </div>
            </div>

            {/* Glowing Heart Divider */}
            <div className="flex flex-col items-center px-2 sm:px-3">
              <div className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 text-xs shadow-inner animate-pulse">
                ❤️
              </div>
            </div>

            {/* Wife */}
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-xs sm:text-sm font-black text-stone-800 flex items-center justify-end gap-1">
                  <span className="group-hover:text-pink-600 transition-colors">
                    {profile.partner2.nickname || profile.partner2.name}
                  </span>
                </div>
                <div className="text-[10px] text-stone-500 font-medium truncate max-w-[90px] sm:max-w-[130px]">
                  {profile.partner2.mood || '사랑해 🥰'}
                </div>
              </div>
              <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-rose-400 to-pink-500 shadow-2xs">
                <span className="text-xl sm:text-2xl bg-white block p-1 rounded-full group-hover:scale-105 transition-transform">
                  {profile.partner2.avatar || '👩'}
                </span>
                <span className="absolute -bottom-1 -right-1 text-[9px] bg-rose-500 text-white font-black px-1 rounded-full shadow-xs">
                  아내
                </span>
              </div>
            </div>

            {/* Little edit hint badge */}
            <div className="hidden sm:flex items-center gap-1 ml-3 pl-2.5 border-l border-rose-200/80 text-[11px] text-rose-600 font-bold bg-rose-50/80 px-2 py-1 rounded-lg">
              <Edit3 className="w-3 h-3" />
              <span>호칭 변경</span>
            </div>
          </button>

          {/* Right: Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-2 justify-end">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-xs font-black bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-white px-3.5 py-2.5 rounded-2xl shadow-md shadow-amber-500/20 hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              title="관리자 전용 설정 (호칭 및 사용자 이름 강제 변경, PIN 설정)"
            >
              <Crown className="w-3.5 h-3.5 text-amber-200" />
              <span>관리자 모드</span>
            </button>
            <button
              onClick={onOpenShare}
              className="flex items-center gap-1.5 text-xs font-black bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-2xl shadow-md shadow-rose-500/25 hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              title="스마트폰 연결 및 호칭 동기화 링크 전송"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>폰으로 공유</span>
            </button>
            <button
              onClick={onOpenProfile}
              className="p-2.5 text-stone-600 hover:text-rose-600 bg-white hover:bg-rose-50 rounded-2xl transition-all cursor-pointer border border-rose-200/80 shadow-2xs"
              title="우리 프로필 & 기념일 설정"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Romantic Couple Message Banner */}
        {profile.coupleMessage && (
          <div className="mt-2.5 text-center text-xs font-bold text-rose-800 flex items-center justify-center gap-2 bg-gradient-to-r from-rose-100/60 via-pink-100/80 to-rose-100/60 py-1.5 px-4 rounded-2xl border border-rose-200/80 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-sparkle" />
            <span className="tracking-wide font-medium">"{profile.coupleMessage}"</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-sparkle" />
          </div>
        )}

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center justify-center gap-2 mt-3.5 pt-2 border-t border-rose-100/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? `bg-gradient-to-r ${item.activeGradient} text-white shadow-md shadow-rose-500/20 scale-105`
                    : 'text-stone-600 hover:text-rose-600 hover:bg-rose-50/80 bg-white/60 border border-stone-200/40'
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
