import React, { useState } from 'react';
import { Plus, Calendar, Heart, MessageSquareHeart, CheckSquare, X } from 'lucide-react';

interface MobileFABProps {
  onAddEvent: () => void;
  onAddAnniversary: () => void;
  onAddNote?: () => void;
  onAddTodo?: () => void;
}

export const MobileFAB: React.FC<MobileFABProps> = ({
  onAddEvent,
  onAddAnniversary,
  onAddNote,
  onAddTodo,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden fixed right-4 bottom-20 z-40 flex flex-col items-end gap-2.5">
      {/* Expanded Quick Action Items */}
      {isOpen && (
        <div className="flex flex-col items-end gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <button
            onClick={() => {
              setIsOpen(false);
              onAddAnniversary();
            }}
            className="flex items-center gap-2 bg-white text-stone-700 px-3.5 py-2 rounded-2xl shadow-lg border border-rose-100 text-xs font-bold active:scale-95 transition-transform"
          >
            <span>기념일 등록</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-rose-500" />
            </div>
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              onAddEvent();
            }}
            className="flex items-center gap-2 bg-white text-stone-700 px-3.5 py-2 rounded-2xl shadow-lg border border-purple-100 text-xs font-bold active:scale-95 transition-transform"
          >
            <span>새 일정 & 기념일</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 text-white shadow-lg shadow-rose-300 flex items-center justify-center transition-all transform active:scale-90 cursor-pointer"
        aria-label="빠른 추가 메뉴"
      >
        {isOpen ? (
          <X className="w-6 h-6 stroke-[2.5]" />
        ) : (
          <Plus className="w-6 h-6 stroke-[2.5]" />
        )}
      </button>
    </div>
  );
};
