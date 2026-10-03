import KoreanLunarCalendar from 'korean-lunar-calendar';
import { Anniversary } from '../types';

const calendar = new KoreanLunarCalendar();

/**
 * Convert Lunar (음력) date to Solar (양력) date string (YYYY-MM-DD) for a given year.
 * Handles short lunar months (29 days) gracefully by falling back to day 29.
 */
export function getSolarDateFromLunar(year: number, lunarMonth: number, lunarDay: number): string {
  try {
    let ok = calendar.setLunarDate(year, lunarMonth, lunarDay, false);
    if (!ok && lunarDay === 30) {
      // If day 30 doesn't exist in this lunar month, use day 29 (그믐)
      ok = calendar.setLunarDate(year, lunarMonth, 29, false);
    }
    if (ok) {
      const solar = calendar.getSolarCalendar();
      const m = String(solar.month).padStart(2, '0');
      const d = String(solar.day).padStart(2, '0');
      return `${solar.year}-${m}-${d}`;
    }
  } catch (err) {
    console.error('Failed to convert lunar date to solar:', err);
  }
  // Fallback
  return `${year}-${String(lunarMonth).padStart(2, '0')}-${String(lunarDay).padStart(2, '0')}`;
}

/**
 * Gets the effective solar date (YYYY-MM-DD) of an anniversary for a target year.
 */
export function getAnniversarySolarDate(ann: Anniversary, targetYear: number): string {
  if (ann.isLunar && ann.lunarMonth && ann.lunarDay) {
    return getSolarDateFromLunar(targetYear, ann.lunarMonth, ann.lunarDay);
  }
  const monthDay = ann.date.slice(5); // MM-DD
  return `${targetYear}-${monthDay}`;
}

/**
 * Determines whether an anniversary falls on a specific date (YYYY-MM-DD).
 */
export function isAnniversaryOnDate(ann: Anniversary, dateStr: string): boolean {
  const [yearStr] = dateStr.split('-');
  const year = parseInt(yearStr, 10);

  if (ann.isLunar && ann.lunarMonth && ann.lunarDay) {
    const solarDate = getSolarDateFromLunar(year, ann.lunarMonth, ann.lunarDay);
    return solarDate === dateStr;
  }

  if (ann.isRepeatYearly) {
    return ann.date.slice(5) === dateStr.slice(5);
  }

  return ann.date === dateStr;
}
