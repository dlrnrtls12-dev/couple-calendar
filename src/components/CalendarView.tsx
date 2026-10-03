import React, { useState } from 'react';
import { CalendarEvent, Anniversary } from '../types';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday, 
  parseISO 
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  MapPin, 
  Clock, 
  Trash2, 
  Calendar as CalendarIcon, 
  Sparkles,
  Filter
} from 'lucide-react';

interface CalendarViewProps {
  events: CalendarEvent[];
  anniversaries: Anniversary[];
  onAddEvent: (dateStr?: string) => void;
  onEditEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (id: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  anniversaries,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Month navigation
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  // Generate calendar days
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Filter events
  const filteredEvents = events.filter((e) => {
    if (selectedFilter === 'all') return true;
    return e.category === selectedFilter;
  });

  // Get events & anniversaries for a specific date
  const getDayItems = (day: Date) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const dayEvents = filteredEvents.filter((e) => e.date === dateStr);
    
    // Anniversaries matching month & day (for yearly) or exact date
    const dayAnns = anniversaries.filter((a) => {
      if (a.isRepeatYearly) {
        return a.date.slice(5) === dateStr.slice(5);
      }
      return a.date === dateStr;
    });

    return { events: dayEvents, anniversaries: dayAnns };
  };

  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const selectedDayItems = getDayItems(selectedDate);

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'couple':
        return { label: '우리 둘이', bg: 'bg-purple-100 text-purple-700 border-purple-200', dot: 'bg-purple-500' };
      case 'husband':
        return { label: '남편 일정', bg: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500' };
      case 'wife':
        return { label: '아내 일정', bg: 'bg-pink-100 text-pink-700 border-pink-200', dot: 'bg-pink-500' };
      case 'family':
        return { label: '가족 행사', bg: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' };
      default:
        return { label: '일정', bg: 'bg-stone-100 text-stone-700 border-stone-200', dot: 'bg-stone-500' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header with Controls */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-stone-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Month selector */}
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-stone-800 tracking-tight">
            {format(currentMonth, 'yyyy년 M월', { locale: ko })}
          </h2>
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
            <button
              onClick={prevMonth}
              className="p-1.5 hover:bg-white text-stone-600 rounded-lg transition-colors cursor-pointer"
              title="이전 달"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goToToday}
              className="px-2.5 py-1 text-xs font-semibold text-stone-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              오늘
            </button>
            <button
              onClick={nextMonth}
              className="p-1.5 hover:bg-white text-stone-600 rounded-lg transition-colors cursor-pointer"
              title="다음 달"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter & Add Event Button */}
        <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
          <div className="flex items-center bg-stone-100 p-1 rounded-2xl text-xs gap-1">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-2.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                selectedFilter === 'all' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setSelectedFilter('couple')}
              className={`px-2.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                selectedFilter === 'couple' ? 'bg-purple-500 text-white font-semibold' : 'text-stone-500 hover:text-purple-600'
              }`}
            >
              💜 함께
            </button>
            <button
              onClick={() => setSelectedFilter('husband')}
              className={`px-2.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                selectedFilter === 'husband' ? 'bg-blue-500 text-white font-semibold' : 'text-stone-500 hover:text-blue-600'
              }`}
            >
              💙 남편
            </button>
            <button
              onClick={() => setSelectedFilter('wife')}
              className={`px-2.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                selectedFilter === 'wife' ? 'bg-pink-500 text-white font-semibold' : 'text-stone-500 hover:text-pink-600'
              }`}
            >
              💖 아내
            </button>
          </div>

          <button
            onClick={() => onAddEvent(selectedDateStr)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-semibold px-3.5 py-2 rounded-2xl shadow-sm shadow-rose-200 transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>일정 추가</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Calendar Grid & Daily Schedule Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar Grid (8 cols on lg) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-5 shadow-sm border border-stone-200/80">
          {/* Day of week headers */}
          <div className="grid grid-cols-7 mb-2 text-center text-xs font-bold">
            <span className="text-rose-500 py-1">일</span>
            <span className="text-stone-600 py-1">월</span>
            <span className="text-stone-600 py-1">화</span>
            <span className="text-stone-600 py-1">수</span>
            <span className="text-stone-600 py-1">목</span>
            <span className="text-stone-600 py-1">금</span>
            <span className="text-blue-500 py-1">토</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {days.map((day) => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const isCurrentMonthDay = isSameMonth(day, currentMonth);
              const isSelected = isSameDay(day, selectedDate);
              const isDayToday = isToday(day);
              const { events: dayEvts, anniversaries: dayAnns } = getDayItems(day);
              const dayOfWeek = day.getDay();

              return (
                <div
                  key={dateStr}
                  onClick={() => setSelectedDate(day)}
                  className={`min-h-[56px] sm:min-h-[92px] p-1 sm:p-1.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative group ${
                    isSelected
                      ? 'border-rose-400 bg-rose-50/40 shadow-xs'
                      : isDayToday
                      ? 'border-rose-200 bg-orange-50/20'
                      : isCurrentMonthDay
                      ? 'border-stone-100 hover:border-stone-300 hover:bg-stone-50/50'
                      : 'border-transparent text-stone-300 bg-stone-50/30'
                  }`}
                >
                  {/* Date number */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full ${
                        isDayToday
                          ? 'bg-rose-500 text-white font-bold'
                          : isSelected
                          ? 'bg-rose-100 text-rose-700'
                          : dayOfWeek === 0
                          ? 'text-rose-500'
                          : dayOfWeek === 6
                          ? 'text-blue-500'
                          : isCurrentMonthDay
                          ? 'text-stone-700'
                          : 'text-stone-300'
                      }`}
                    >
                      {format(day, 'd')}
                    </span>

                    {/* Anniversary icon */}
                    {dayAnns.length > 0 && (
                      <span className="text-xs animate-bounce" title={dayAnns[0].title}>
                        {dayAnns[0].icon || '🎂'}
                      </span>
                    )}
                  </div>

                  {/* Badges / indicators */}
                  <div className="space-y-1 mt-0.5 overflow-hidden">
                    {/* Mobile Dots Indicator (Visible on small screens) */}
                    <div className="flex sm:hidden items-center justify-center gap-0.5 flex-wrap pt-0.5">
                      {dayAnns.slice(0, 1).map((ann) => (
                        <span key={ann.id} className="text-[10px] leading-none" title={ann.title}>
                          {ann.icon || '💍'}
                        </span>
                      ))}
                      {dayEvts.slice(0, 3).map((ev) => {
                        const badge = getCategoryBadge(ev.category);
                        return (
                          <span
                            key={ev.id}
                            className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}
                            title={ev.title}
                          />
                        );
                      })}
                    </div>

                    {/* Desktop/Tablet Text Pills (Hidden on mobile) */}
                    <div className="hidden sm:block space-y-1">
                      {dayAnns.slice(0, 1).map((ann) => (
                        <div
                          key={ann.id}
                          className="text-[10px] leading-tight truncate px-1 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold border border-amber-200"
                          title={ann.title}
                        >
                          {ann.icon || '💍'} {ann.title}
                        </div>
                      ))}

                      {dayEvts.slice(0, 2).map((ev) => {
                        const badge = getCategoryBadge(ev.category);
                        return (
                          <div
                            key={ev.id}
                            className={`text-[10px] leading-tight truncate px-1 py-0.5 rounded font-medium border ${badge.bg}`}
                            title={`${ev.title} (${ev.startTime || '종일'})`}
                          >
                            {ev.title}
                          </div>
                        );
                      })}

                      {dayEvts.length + dayAnns.length > 2 && (
                        <div className="text-[9px] text-stone-400 text-right pr-0.5">
                          +{dayEvts.length + dayAnns.length - 2}개 더보기
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Detail Panel (4 cols on lg) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 shadow-sm border border-stone-200/80 flex flex-col h-full">
          {/* Selected Date Header */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <div className="text-xs font-semibold text-rose-500">
                {isToday(selectedDate) ? '오늘의 일정' : '선택한 날짜'}
              </div>
              <h3 className="text-lg font-bold text-stone-800">
                {format(selectedDate, 'M월 d일 (eee)', { locale: ko })}
              </h3>
            </div>
            <button
              onClick={() => onAddEvent(selectedDateStr)}
              className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors cursor-pointer"
              title="이 날짜에 새 일정 추가"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* List of items */}
          <div className="flex-1 overflow-y-auto mt-4 space-y-3 pr-1">
            {/* Anniversaries on this day */}
            {selectedDayItems.anniversaries.map((ann) => (
              <div
                key={ann.id}
                className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-3.5 shadow-2xs"
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-2xl">{ann.icon || '💍'}</span>
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-200/60 px-1.5 py-0.5 rounded">
                      특별한 기념일
                    </span>
                    <h4 className="text-sm font-bold text-amber-900 mt-1">{ann.title}</h4>
                    {ann.memo && <p className="text-xs text-amber-700/90 mt-0.5">{ann.memo}</p>}
                  </div>
                </div>
              </div>
            ))}

            {/* Events on this day */}
            {selectedDayItems.events.length > 0 ? (
              selectedDayItems.events.map((ev) => {
                const badge = getCategoryBadge(ev.category);
                return (
                  <div
                    key={ev.id}
                    className="group bg-stone-50/80 hover:bg-white border border-stone-200/70 hover:border-rose-200 rounded-2xl p-3.5 transition-all shadow-2xs hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${badge.dot}`} />
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${badge.bg}`}>
                          {badge.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onDeleteEvent(ev.id)}
                          className="p-1 text-stone-400 hover:text-rose-500 rounded transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 
                      onClick={() => onEditEvent(ev)} 
                      className="text-sm font-semibold text-stone-800 mt-2 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      {ev.title}
                    </h4>

                    {/* Time & Location */}
                    <div className="mt-2 space-y-1 text-xs text-stone-500">
                      {(ev.startTime || ev.endTime) && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          <span>
                            {ev.startTime || '00:00'} ~ {ev.endTime || '하루 종일'}
                          </span>
                        </div>
                      )}
                      {ev.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-stone-400" />
                          <span>{ev.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Note */}
                    {ev.note && (
                      <p className="mt-2 text-xs text-stone-600 bg-white/70 p-2 rounded-xl border border-stone-100">
                        {ev.note}
                      </p>
                    )}
                  </div>
                );
              })
            ) : selectedDayItems.anniversaries.length === 0 ? (
              <div className="text-center py-12 text-stone-400">
                <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-30 text-rose-400" />
                <p className="text-xs">등록된 일정이 없어요</p>
                <button
                  onClick={() => onAddEvent(selectedDateStr)}
                  className="mt-3 text-xs text-rose-500 hover:text-rose-600 font-semibold underline cursor-pointer"
                >
                  + 첫 일정 등록하기
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
