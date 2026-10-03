import { differenceInDays, parseISO, format, addDays, addYears, isAfter, isBefore, startOfDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Anniversary } from '../types';
import { getAnniversarySolarDate } from './lunarUtils';

export function calculateDaysPassed(dateString: string): number {
  if (!dateString) return 0;
  const target = startOfDay(parseISO(dateString));
  const today = startOfDay(new Date());
  return differenceInDays(today, target);
}

export function calculateDDay(dateString: string, isYearly: boolean = false): { days: number; formattedText: string; isPast: boolean } {
  if (!dateString) return { days: 0, formattedText: 'D-0', isPast: false };
  const today = startOfDay(new Date());
  let target = startOfDay(parseISO(dateString));

  if (isYearly) {
    const thisYear = today.getFullYear();
    let nextDate = new Date(target);
    nextDate.setFullYear(thisYear);

    // If already passed this year, look at next year
    if (isBefore(nextDate, today)) {
      nextDate = addYears(nextDate, 1);
    }
    const diff = differenceInDays(nextDate, today);
    if (diff === 0) {
      return { days: 0, formattedText: 'D-DAY 오늘! 🎉', isPast: false };
    }
    return { days: diff, formattedText: `D-${diff}`, isPast: false };
  } else {
    const diff = differenceInDays(target, today);
    if (diff === 0) {
      return { days: 0, formattedText: 'D-DAY 오늘! 🎉', isPast: false };
    } else if (diff > 0) {
      return { days: diff, formattedText: `D-${diff}`, isPast: false };
    } else {
      return { days: Math.abs(diff), formattedText: `D+${Math.abs(diff)}`, isPast: true };
    }
  }
}

export function calculateAnniversaryDDay(ann: Anniversary): { days: number; formattedText: string; isPast: boolean; nextSolarDate: string } {
  const today = startOfDay(new Date());
  const thisYear = today.getFullYear();

  let nextSolarDateStr = getAnniversarySolarDate(ann, thisYear);
  let nextDate = startOfDay(parseISO(nextSolarDateStr));

  if (ann.isRepeatYearly && isBefore(nextDate, today)) {
    nextSolarDateStr = getAnniversarySolarDate(ann, thisYear + 1);
    nextDate = startOfDay(parseISO(nextSolarDateStr));
  }

  const diff = differenceInDays(nextDate, today);
  if (diff === 0) {
    return { days: 0, formattedText: 'D-DAY 오늘! 🎉', isPast: false, nextSolarDate: nextSolarDateStr };
  } else if (diff > 0) {
    return { days: diff, formattedText: `D-${diff}`, isPast: false, nextSolarDate: nextSolarDateStr };
  } else {
    return { days: Math.abs(diff), formattedText: `D+${Math.abs(diff)}`, isPast: true, nextSolarDate: nextSolarDateStr };
  }
}

export function getUpcomingMilestones(baseDateStr: string, titlePrefix: string) {
  if (!baseDateStr) return [];
  const baseDate = parseISO(baseDateStr);
  const today = startOfDay(new Date());
  const milestones: { label: string; date: string; dDayText: string; daysLeft: number }[] = [];

  // 100-day increments
  const dayIntervals = [100, 200, 300, 500, 1000, 1500, 2000, 3000];
  for (const days of dayIntervals) {
    const targetDate = addDays(baseDate, days - 1); // 1st day counts as day 1
    const diff = differenceInDays(targetDate, today);
    if (diff >= 0) {
      milestones.push({
        label: `${titlePrefix} ${days}일`,
        date: format(targetDate, 'yyyy.MM.dd (eee)', { locale: ko }),
        dDayText: diff === 0 ? 'D-Day 오늘!' : `D-${diff}`,
        daysLeft: diff,
      });
    }
  }

  // Years increments
  for (let year = 1; year <= 20; year++) {
    const targetDate = addYears(baseDate, year);
    const diff = differenceInDays(targetDate, today);
    if (diff >= 0 && diff < 365) {
      milestones.push({
        label: `${titlePrefix} ${year}주년`,
        date: format(targetDate, 'yyyy.MM.dd (eee)', { locale: ko }),
        dDayText: diff === 0 ? 'D-Day 오늘!' : `D-${diff}`,
        daysLeft: diff,
      });
    }
  }

  return milestones.sort((a, b) => a.daysLeft - b.daysLeft).slice(0, 5);
}

export function formatKoreanDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), 'yyyy년 M월 d일 (eee)', { locale: ko });
  } catch {
    return dateStr;
  }
}
