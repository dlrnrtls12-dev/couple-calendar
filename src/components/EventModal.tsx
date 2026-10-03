import React, { useState, useEffect } from 'react';
import { CalendarEvent, EventCategory } from '../types';
import { X, Calendar, Clock, MapPin, AlignLeft, Tag } from 'lucide-react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
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
    } else {
      setTitle('');
      setDate(initialDate || new Date().toISOString().split('T')[0]);
      setStartTime('');
      setEndTime('');
      setCategory('couple');
      setLocation('');
      setNote('');
      setAuthor('husband');
    }
  }, [editingEvent, initialDate, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      date,
      startTime: startTime || undefined,
      endTime: endTime || undefined,
      category,
      location: location.trim() || undefined,
      note: note.trim() || undefined,
      author,
    });

    onClose();
  };

  const categories: { key: EventCategory; label: string; color: string }[] = [
    { key: 'couple', label: '💜 우리 함께', color: 'bg-purple-100 text-purple-700' },
    { key: 'husband', label: '💙 남편 일정', color: 'bg-blue-100 text-blue-700' },
    { key: 'wife', label: '💖 아내 일정', color: 'bg-pink-100 text-pink-700' },
    { key: 'family', label: '🏡 가족 행사', color: 'bg-emerald-100 text-emerald-700' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-100">
          <h3 className="text-base font-bold text-stone-800">
            {editingEvent ? '일정 수정하기' : '새로운 부부 일정 등록'}
          </h3>
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
            <label className="block text-xs font-bold text-stone-600 mb-1">일정 제목 *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 주말 브런치 카페 데이트 ☕"
              required
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5">카테고리</label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setCategory(c.key)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    category === c.key
                      ? 'border-rose-400 bg-rose-50 text-rose-700 shadow-2xs'
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-1">날짜</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-1">시작 시간</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-1">종료 시간</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1">장소 (선택)</label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="예: 삼청동 카페거리"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white"
              />
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1">메모 (선택)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="준비물, 예약 정보 등 세부 사항을 적어두세요"
              rows={2}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white resize-none"
            />
          </div>

          {/* Action buttons */}
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
              {editingEvent ? '수정 완료' : '일정 저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
