import React from 'react';
import { AppData } from '../types';
import { Heart, Sparkles, Check, X, Calendar, Gift } from 'lucide-react';

interface SyncApprovalModalProps {
  isOpen: boolean;
  incomingData: AppData | null;
  onApprove: () => void;
  onReject: () => void;
}

export const SyncApprovalModal: React.FC<SyncApprovalModalProps> = ({
  isOpen,
  incomingData,
  onApprove,
  onReject,
}) => {
  if (!isOpen || !incomingData) return null;

  const { profile, events, anniversaries } = incomingData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-rose-200 overflow-hidden text-center p-6 space-y-4">
        {/* Animated Heart Badge */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-rose-500/30 animate-bounce">
          <Heart className="w-8 h-8 fill-white" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>새로운 부부 데이터 도착</span>
          </span>
          <h3 className="text-lg font-black text-stone-900">
            배우자가 보낸 호칭과 일정을 적용할까요?
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            상대방이 변경한 호칭과 새로운 일정을 내 휴대폰에 즉시 동기화합니다.
          </p>
        </div>

        {/* Preview incoming data */}
        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 text-left space-y-2.5">
          <div className="text-xs font-bold text-stone-700 pb-1 border-b border-stone-200 flex items-center justify-between">
            <span>미리보기</span>
            <span className="text-rose-500 font-semibold text-[11px]">동기화 승인 대기</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-500">💙 남편 호칭:</span>
            <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
              {profile.partner1.avatar || '👨'} {profile.partner1.nickname || profile.partner1.name}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-500">💖 아내 호칭:</span>
            <span className="font-bold text-pink-700 bg-pink-50 px-2 py-0.5 rounded-lg border border-pink-200">
              {profile.partner2.avatar || '👩'} {profile.partner2.nickname || profile.partner2.name}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-200">
            <span className="text-stone-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>일정 / 기념일:</span>
            </span>
            <span className="font-semibold text-stone-700">
              일정 {events.length}개 • 기념일 {anniversaries.length}개
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={onReject}
            className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-2xl text-xs font-bold transition-colors cursor-pointer"
          >
            건너뛰기
          </button>
          <button
            onClick={onApprove}
            className="w-full py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-rose-500/25 transition-all cursor-pointer active:scale-95"
          >
            네, 적용하기 ✨
          </button>
        </div>
      </div>
    </div>
  );
};
