import React, { useState } from 'react';
import { CoupleProfile } from '../types';
import { X, Heart, User, Calendar, MessageCircle, Sparkles, Lock, Crown } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CoupleProfile;
  onSave: (updated: Partial<CoupleProfile>) => void;
  onOpenAdmin?: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  onOpenAdmin,
}) => {
  const [partner1Nickname, setPartner1Nickname] = useState(profile.partner1.nickname || '');
  const [partner1Mood, setPartner1Mood] = useState(profile.partner1.mood || '');
  const [partner1Avatar, setPartner1Avatar] = useState(profile.partner1.avatar || '👨');

  const [partner2Nickname, setPartner2Nickname] = useState(profile.partner2.nickname || '');
  const [partner2Mood, setPartner2Mood] = useState(profile.partner2.mood || '');
  const [partner2Avatar, setPartner2Avatar] = useState(profile.partner2.avatar || '👩');

  const [weddingDate, setWeddingDate] = useState(profile.weddingDate || '');
  const [firstMetDate, setFirstMetDate] = useState(profile.firstMetDate || '');
  const [coupleMessage, setCoupleMessage] = useState(profile.coupleMessage || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      partner1: {
        ...profile.partner1,
        nickname: partner1Nickname,
        mood: partner1Mood,
        avatar: partner1Avatar,
      },
      partner2: {
        ...profile.partner2,
        nickname: partner2Nickname,
        mood: partner2Mood,
        avatar: partner2Avatar,
      },
      weddingDate,
      firstMetDate,
      coupleMessage,
    });

    onClose();
  };

  const avatarsHusband = ['👨', '🧑‍🦱', '🧔', '👓', '🤴', '🐱', '🐻', '🐶'];
  const avatarsWife = ['👩', '👱‍♀️', '👩‍🦰', '👸', '🌸', '🐰', '🐹', '🐥'];
  const moodPresets = ['행복함 🥰', '설렘 💕', '열일 중 🔥', '피곤해요 🥱', '힐링 필요 ☕', '기분 최고 🌈'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-500" />
            <h3 className="text-base font-bold text-stone-800">우리 부부 프로필 & 기념일 설정</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5 overflow-y-auto flex-1">
          {/* Admin Banner */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-600" />
              <div className="text-xs">
                <span className="font-bold text-amber-900">사용자 이름(실명) 변경은 관리자 전용입니다.</span>
                <p className="text-[10px] text-amber-700">관리자 모드에서 언제든 이름을 자유롭게 수정할 수 있습니다.</p>
              </div>
            </div>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAdmin();
                }}
                className="text-xs bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold px-3 py-1.5 rounded-xl shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap ml-2"
              >
                관리자 모드 👑
              </button>
            )}
          </div>

          {/* Partner 1 (Husband) */}
          <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                <span>💙 남편 프로필</span>
              </span>
              <div className="flex gap-1">
                {avatarsHusband.slice(0, 4).map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setPartner1Avatar(av)}
                    className={`text-sm p-1 rounded-lg ${partner1Avatar === av ? 'bg-blue-200' : ''}`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/90 p-2.5 rounded-xl border border-blue-200/80 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium">사용자 이름:</span>
              <span className="font-bold text-blue-900 flex items-center gap-1">
                <span>{profile.partner1.name}</span>
                <span title="관리자만 변경 가능"><Lock className="w-3 h-3 text-stone-400" /></span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-stone-500 mb-1">애칭 / 호칭</label>
                <input
                  type="text"
                  value={partner1Nickname}
                  onChange={(e) => setPartner1Nickname(e.target.value)}
                  placeholder="예: 서방님, 자기"
                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-500 mb-1">오늘의 기분</label>
                <input
                  type="text"
                  value={partner1Mood}
                  onChange={(e) => setPartner1Mood(e.target.value)}
                  placeholder="예: 행복함 🥰"
                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
          </div>

          {/* Partner 2 (Wife) */}
          <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-pink-700 flex items-center gap-1.5">
                <span>💖 아내 프로필</span>
              </span>
              <div className="flex gap-1">
                {avatarsWife.slice(0, 4).map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setPartner2Avatar(av)}
                    className={`text-sm p-1 rounded-lg ${partner2Avatar === av ? 'bg-pink-200' : ''}`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/90 p-2.5 rounded-xl border border-pink-200/80 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium">사용자 이름:</span>
              <span className="font-bold text-pink-900 flex items-center gap-1">
                <span>{profile.partner2.name}</span>
                <span title="관리자만 변경 가능"><Lock className="w-3 h-3 text-stone-400" /></span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-stone-500 mb-1">애칭 / 호칭</label>
                <input
                  type="text"
                  value={partner2Nickname}
                  onChange={(e) => setPartner2Nickname(e.target.value)}
                  placeholder="예: 우리여보, 공주님"
                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-500 mb-1">오늘의 기분</label>
                <input
                  type="text"
                  value={partner2Mood}
                  onChange={(e) => setPartner2Mood(e.target.value)}
                  placeholder="예: 설렘 💕"
                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
            </div>
          </div>

          {/* Core Dates */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-3">
            <span className="text-xs font-bold text-stone-700 block">💍 기준 기념일 날짜</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-stone-500 mb-1">
                  결혼기념일 (D-Day 기준일)
                </label>
                <input
                  type="date"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-500 mb-1">
                  처음 만난 날
                </label>
                <input
                  type="date"
                  value={firstMetDate}
                  onChange={(e) => setFirstMetDate(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>
            </div>
          </div>

          {/* Couple Message */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1">
              우리 둘만의 다짐 / 상단 문구
            </label>
            <input
              type="text"
              value={coupleMessage}
              onChange={(e) => setCoupleMessage(e.target.value)}
              placeholder="예: 평생 서로의 편이 되어 함께 걸어가자 💍"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white"
            />
          </div>

          {/* Data Backup & Restore */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-2">
            <span className="text-xs font-bold text-stone-700 block">💾 우리 데이터 백업 & 복원</span>
            <p className="text-[11px] text-stone-500">
              작성한 모든 일정, 기념일, 쪽지, 추억을 파일로 저장하거나 복원할 수 있습니다.
            </p>
            <div className="flex gap-2 pt-1">
              <a
                href="/api/data"
                download="우리사이_데이터백업.json"
                className="flex-1 text-center py-2 bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                📥 백업 파일 다운로드
              </a>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-500 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            >
              닫기
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              설정 저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
