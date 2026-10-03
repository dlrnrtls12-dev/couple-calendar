import React, { useState, useEffect } from 'react';
import { CalendarEvent, EventCategory } from '../types';
import { X, Calendar, Clock, MapPin, Sparkles, Heart } from 'lucide-react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    event: Omit<CalendarEvent, 'id'>,
    anniversaryData?: { isRepeatYearly: boolean; icon: string; memo?: string }
  ) => void;
  editingEvent?: CalendarEvent | null;
  initialDate?: string;
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingEvent,
  initialDate,
}) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(initialDate || new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [category, setCategory] = useState<EventCategory>('couple');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const [author, setAuthor] = useState<'husband' | 'wife'>('husband');

  // Anniversary addition options
  const [isAlsoAnniversary, setIsAlsoAnniversary] = useState(false);
  const [isRepeatYearly, setIsRepeatYearly] = useState(true);
  const [anniversaryIcon, setAnniversaryIcon] = useState('🎂');

  const icons = ['🎂', '💍', '🌸', '💖', '🎉', '✈️', '🥂', '🏡', '🎁'];

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDate(editingEvent.date);
      setStartTime(editingEvent.startTime || '');
      setEndTime(editingEvent.endTime || '');
      setCategory(editingEvent.category);
      setLocation(editingEvent.location || '');
      setNote(editingEvent.note || '');
      setAuthor(editingEvent.author || 'husband');
      setIsAlsoAnniversary(editingEvent.category === 'anniversary');
    } else {
      setTitle('');
      setDate(initialDate || new Date().toISOString().split('T')[0]);
      setStartTime('');
      setEndTime('');
      setCategory('couple');
      setLocation('');
      setNote('');
      setAuthor('husband');
      setIsAlsoAnniversary(false);
    }
  }, [editingEvent, initialDate, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const finalCategory: EventCategory = isAlsoAnniversary ? 'anniversary' : category;

    onSave(
      {
        title: title.trim(),
        date,
        startTime: startTime || undefined,
        endTime: endTime || undefined,
        category: finalCategory,
        location: location.trim() || undefined,
        note: note.trim() || undefined,
        author,
      },
      isAlsoAnniversary
        ? {
            isRepeatYearly,
            icon: anniversaryIcon,
            memo: note.trim() || title.trim(),
          }
        : undefined
    );

    onClose();
  };

  const categories: { key: EventCategory; label: string; dot: string }[] = [
    { key: 'couple', label: '💜 우리 함께', dot: 'bg-purple-500' },
    { key: 'husband', label: '💙 남편 일정', dot: 'bg-blue-500' },
    { key: 'wife', label: '💖 아내 일정', dot: 'bg-pink-500' },
    { key: 'family', label: '🏡 가족 행사', dot: 'bg-emerald-500' },
    { key: 'anniversary', label: '🎂 기념일', dot: 'bg-amber-500' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Mobile handle indicator */}
        <div className="sm:hidden w-12 h-1.5 bg-stone-200 rounded-full mx-auto mt-2.5 mb-1" />

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <span className="text-xl">📅</span>
            <h3 className="text-base font-bold text-stone-800">
              {editingEvent ? '일정 수정하기' : '새로운 부부 일정 & 기념일 등록'}
            </h3>
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
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">일정 / 기념일 제목 *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 우리 결혼 100일, 주말 데이트 ☕"
              required
              className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white"
            />
          </div>

          {/* Category selection */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">카테고리</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {categories.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => {
                    setCategory(c.key);
                    if (c.key === 'anniversary') {
                      setIsAlsoAnniversary(true);
                    }
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer border flex flex-col items-center justify-center gap-1 ${
                    (isAlsoAnniversary && c.key === 'anniversary') || (!isAlsoAnniversary && category === c.key)
                      ? 'border-rose-400 bg-rose-50 text-rose-700 shadow-2xs'
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <span className="truncate text-[11px]">{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 기념일 동시 등록 옵션 (핵심 요구사항!) */}
          <div className="bg-gradient-to-r from-amber-50/80 to-rose-50/80 border border-amber-200/80 rounded-2xl p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <div>
                  <span className="text-xs font-bold text-stone-800">기념일로도 함께 등록</span>
                  <span className="text-[10px] text-stone-500 block">D-Day 카운트다운 및 기념일 탭에 표시</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isAlsoAnniversary}
                onChange={(e) => setIsAlsoAnniversary(e.target.checked)}
                className="w-5 h-5 accent-rose-500 rounded cursor-pointer"
              />
            </div>

            {isAlsoAnniversary && (
              <div className="pt-2 border-t border-amber-200/50 space-y-2.5 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-600">매년 반복하기</span>
                  <input
                    type="checkbox"
                    checked={isRepeatYearly}
                    onChange={(e) => setIsRepeatYearly(e.target.checked)}
                    className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                  />
                </div>

                <div>
                  <span className="text-xs font-semibold text-stone-600 block mb-1">기념일 이모지</span>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {icons.map((ic) => (
                      <button
                        key={ic}
                        type="button"
                        onClick={() => setAnniversaryIcon(ic)}
                        className={`text-lg p-1.5 rounded-xl transition-all cursor-pointer ${
                          anniversaryIcon === ic
                            ? 'bg-rose-200 scale-125 border border-rose-400'
                            : 'bg-white/80 hover:scale-110'
                        }`}
                      >
                        {ic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">날짜</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">시작 시간</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">종료 시간</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">장소 (선택)</label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="예: 분위기 좋은 레스토랑"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white"
              />
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">메모 / 준비물</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="예약 정보, 꽃다발 준비, 둘만의 체크포인트 등"
              rows={2}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white resize-none"
            />
          </div>

          {/* Actions */}
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
              className="flex-1 sm:flex-none px-6 py-2.5 text-xs font-bold bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              {editingEvent ? '수정 완료' : isAlsoAnniversary ? '일정 및 기념일 저장 💍' : '일정 저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
