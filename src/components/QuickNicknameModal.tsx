import React, { useState } from 'react';
import { X, Heart, Sparkles, Smile, Check } from 'lucide-react';
import { CoupleProfile } from '../types';

interface QuickNicknameModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CoupleProfile;
  onSave: (updatedProfile: Partial<CoupleProfile>) => void;
  onOpenAdmin?: () => void;
}

export const QuickNicknameModal: React.FC<QuickNicknameModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  onOpenAdmin,
}) => {
  const [partner1Nickname, setPartner1Nickname] = useState(profile.partner1.nickname || '서방님');
  const [partner1Mood, setPartner1Mood] = useState(profile.partner1.mood || '설렘 💕');
  const [partner1Avatar, setPartner1Avatar] = useState(profile.partner1.avatar || '👨');

  const [partner2Nickname, setPartner2Nickname] = useState(profile.partner2.nickname || '우리여보');
  const [partner2Mood, setPartner2Mood] = useState(profile.partner2.mood || '행복함 🥰');
  const [partner2Avatar, setPartner2Avatar] = useState(profile.partner2.avatar || '👩');

  if (!isOpen) return null;

  const husbandNicknames = ['서방님', '자기', '여보', '내 사랑', '오빠', '달링'];
  const wifeNicknames = ['우리여보', '공주님', '자기야', '내 반쪽', '애기야', '마누라'];

  const husbandAvatars = ['👨', '🧑‍🦱', '🧔', '👓', '🤴', '🐱', '🐻', '🐶'];
  const wifeAvatars = ['👩', '👱‍♀️', '👩‍🦰', '👸', '🌸', '🐰', '🐹', '🐥'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      partner1: {
        ...profile.partner1,
        nickname: partner1Nickname.trim() || '남편',
        mood: partner1Mood,
        avatar: partner1Avatar,
      },
      partner2: {
        ...profile.partner2,
        nickname: partner2Nickname.trim() || '아내',
        mood: partner2Mood,
        avatar: partner2Avatar,
      },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Mobile handle indicator */}
        <div className="sm:hidden w-12 h-1.5 bg-stone-200 rounded-full mx-auto mt-2.5 mb-1" />

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-500" />
            <h3 className="text-base font-bold text-stone-800">부부 호칭 & 애칭 변경</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
          <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-2.5 flex items-center justify-between text-xs">
            <span className="text-amber-900 font-semibold text-[11px]">
              👑 사용자 본명(이름) 임의 변경은 <strong>관리자 모드</strong> 전용입니다.
            </span>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAdmin();
                }}
                className="text-[10px] bg-amber-500 hover:bg-amber-600 text-white font-bold px-2 py-1 rounded-lg shadow-2xs transition-colors cursor-pointer whitespace-nowrap ml-2"
              >
                관리자 이동
              </button>
            )}
          </div>

          {/* Husband Card */}
          <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                <span>💙 남편 호칭 설정</span>
              </span>
              <div className="flex gap-1">
                {husbandAvatars.slice(0, 4).map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setPartner1Avatar(av)}
                    className={`text-sm p-1 rounded-lg transition-transform ${
                      partner1Avatar === av ? 'bg-blue-200 scale-125' : 'hover:scale-110'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">애칭 / 호칭 직접 입력</label>
              <input
                type="text"
                value={partner1Nickname}
                onChange={(e) => setPartner1Nickname(e.target.value)}
                placeholder="예: 서방님, 여보, 자기"
                required
                className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Quick nickname pills */}
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              <span className="text-[10px] text-stone-400">추천:</span>
              {husbandNicknames.map((nick) => (
                <button
                  key={nick}
                  type="button"
                  onClick={() => setPartner1Nickname(nick)}
                  className={`text-[11px] px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                    partner1Nickname === nick
                      ? 'bg-blue-600 text-white font-bold shadow-2xs'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {nick}
                </button>
              ))}
            </div>
          </div>

          {/* Wife Card */}
          <div className="bg-pink-50/70 p-4 rounded-2xl border border-pink-100/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-pink-700 flex items-center gap-1.5">
                <span>💖 아내 호칭 설정</span>
              </span>
              <div className="flex gap-1">
                {wifeAvatars.slice(0, 4).map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setPartner2Avatar(av)}
                    className={`text-sm p-1 rounded-lg transition-transform ${
                      partner2Avatar === av ? 'bg-pink-200 scale-125' : 'hover:scale-110'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">애칭 / 호칭 직접 입력</label>
              <input
                type="text"
                value={partner2Nickname}
                onChange={(e) => setPartner2Nickname(e.target.value)}
                placeholder="예: 우리여보, 공주님, 애기야"
                required
                className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* Quick nickname pills */}
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              <span className="text-[10px] text-stone-400">추천:</span>
              {wifeNicknames.map((nick) => (
                <button
                  key={nick}
                  type="button"
                  onClick={() => setPartner2Nickname(nick)}
                  className={`text-[11px] px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                    partner2Nickname === nick
                      ? 'bg-pink-600 text-white font-bold shadow-2xs'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {nick}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-stone-500 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 sm:flex-none px-6 py-2.5 text-xs font-bold bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              호칭 변경 완료 ✨
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
