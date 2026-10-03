import React, { useState } from 'react';
import { Anniversary } from '../types';
import { X, Heart, Sparkles } from 'lucide-react';

interface AnniversaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ann: Omit<Anniversary, 'id'>) => void;
}

export const AnniversaryModal: React.FC<AnniversaryModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isRepeatYearly, setIsRepeatYearly] = useState(true);
  const [category, setCategory] = useState<'wedding' | 'firstMet' | 'birthday' | 'custom'>('custom');
  const [memo, setMemo] = useState('');
  const [icon, setIcon] = useState('💍');

  if (!isOpen) return null;

  const icons = ['💍', '🌸', '🎂', '🎁', '🎉', '💖', '✈️', '🏡', '🥂', '💌', '👶', '🐱'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      date,
      isRepeatYearly,
      category,
      memo: memo.trim() || undefined,
      icon,
    });

    setTitle('');
    setMemo('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="text-base font-bold text-stone-800">새로운 기념일 등록</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1">기념일 이름 *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 우리 결혼 1000일, 첫 해외여행 등"
              required
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1">기념일 날짜 *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>

          {/* Repeat Yearly Toggle */}
          <div className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl border border-stone-100">
            <div>
              <div className="text-xs font-bold text-stone-700">매년 반복하기</div>
              <div className="text-[11px] text-stone-400">생일, 결혼기념일처럼 매년 D-Day를 셉니다</div>
            </div>
            <input
              type="checkbox"
              checked={isRepeatYearly}
              onChange={(e) => setIsRepeatYearly(e.target.checked)}
              className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
            />
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">대표 이모지</label>
            <div className="grid grid-cols-6 gap-2">
              {icons.map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setIcon(ic)}
                  className={`text-xl p-2 rounded-xl transition-all cursor-pointer ${
                    icon === ic ? 'bg-rose-100 border border-rose-400 scale-110' : 'bg-stone-50 hover:bg-stone-100'
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          {/* Memo */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1">한 줄 소감 / 메모</label>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="서로에게 전하는 기념일 메시지"
              rows={2}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-500 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              기념일 저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
