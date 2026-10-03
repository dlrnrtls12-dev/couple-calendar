export interface HolidayItem {
  date: string; // YYYY-MM-DD
  name: string; // e.g. "3·1절", "대체공휴일 (3·1절)"
  isSubstitute: boolean; // true if 대체공휴일 / 대체휴무
  isPublicHoliday: boolean; // true for red days
  memo?: string;
}

// Built-in verified South Korea Public Holidays & Substitute Holidays (관공서의 공휴일에 관한 규정)
const BASE_HOLIDAYS: Record<string, HolidayItem> = {
  // 2024
  '2024-01-01': { date: '2024-01-01', name: '새해 (신정)', isSubstitute: false, isPublicHoliday: true },
  '2024-02-09': { date: '2024-02-09', name: '설날 연휴', isSubstitute: false, isPublicHoliday: true },
  '2024-02-10': { date: '2024-02-10', name: '설날', isSubstitute: false, isPublicHoliday: true },
  '2024-02-11': { date: '2024-02-11', name: '설날 연휴', isSubstitute: false, isPublicHoliday: true },
  '2024-02-12': { date: '2024-02-12', name: '대체공휴일 (설날)', isSubstitute: true, isPublicHoliday: true },
  '2024-03-01': { date: '2024-03-01', name: '3·1절', isSubstitute: false, isPublicHoliday: true },
  '2024-04-10': { date: '2024-04-10', name: '제22대 국회의원 선거일', isSubstitute: false, isPublicHoliday: true },
  '2024-05-05': { date: '2024-05-05', name: '어린이날', isSubstitute: false, isPublicHoliday: true },
  '2024-05-06': { date: '2024-05-06', name: '대체공휴일 (어린이날)', isSubstitute: true, isPublicHoliday: true },
  '2024-05-15': { date: '2024-05-15', name: '부처님 오신 날', isSubstitute: false, isPublicHoliday: true },
  '2024-06-06': { date: '2024-06-06', name: '현충일', isSubstitute: false, isPublicHoliday: true },
  '2024-08-15': { date: '2024-08-15', name: '광복절', isSubstitute: false, isPublicHoliday: true },
  '2024-09-16': { date: '2024-09-16', name: '추석 연휴', isSubstitute: false, isPublicHoliday: true },
  '2024-09-17': { date: '2024-09-17', name: '추석', isSubstitute: false, isPublicHoliday: true },
  '2024-09-18': { date: '2024-09-18', name: '추석 연휴', isSubstitute: false, isPublicHoliday: true },
  '2024-10-01': { date: '2024-10-01', name: '국군의 날 (임시공휴일)', isSubstitute: false, isPublicHoliday: true },
  '2024-10-03': { date: '2024-10-03', name: '개천절', isSubstitute: false, isPublicHoliday: true },
  '2024-10-09': { date: '2024-10-09', name: '한글날', isSubstitute: false, isPublicHoliday: true },
  '2024-12-25': { date: '2024-12-25', name: '크리스마스', isSubstitute: false, isPublicHoliday: true },

  // 2025
  '2025-01-01': { date: '2025-01-01', name: '새해 (신정)', isSubstitute: false, isPublicHoliday: true },
  '2025-01-28': { date: '2025-01-28', name: '설날 연휴', isSubstitute: false, isPublicHoliday: true },
  '2025-01-29': { date: '2025-01-29', name: '설날', isSubstitute: false, isPublicHoliday: true },
  '2025-01-30': { date: '2025-01-30', name: '설날 연휴', isSubstitute: false, isPublicHoliday: true },
  '2025-03-01': { date: '2025-03-01', name: '3·1절', isSubstitute: false, isPublicHoliday: true },
  '2025-03-03': { date: '2025-03-03', name: '대체공휴일 (3·1절)', isSubstitute: true, isPublicHoliday: true },
  '2025-05-05': { date: '2025-05-05', name: '어린이날 · 부처님 오신 날', isSubstitute: false, isPublicHoliday: true },
  '2025-05-06': { date: '2025-05-06', name: '대체공휴일 (부처님 오신 날)', isSubstitute: true, isPublicHoliday: true },
  '2025-06-06': { date: '2025-06-06', name: '현충일', isSubstitute: false, isPublicHoliday: true },
  '2025-08-15': { date: '2025-08-15', name: '광복절', isSubstitute: false, isPublicHoliday: true },
  '2025-10-03': { date: '2025-10-03', name: '개천절', isSubstitute: false, isPublicHoliday: true },
  '2025-10-05': { date: '2025-10-05', name: '추석 연휴', isSubstitute: false, isPublicHoliday: true },
  '2025-10-06': { date: '2025-10-06', name: '추석', isSubstitute: false, isPublicHoliday: true },
  '2025-10-07': { date: '2025-10-07', name: '추석 연휴', isSubstitute: false, isPublicHoliday: true },
  '2025-10-08': { date: '2025-10-08', name: '대체공휴일 (추석)', isSubstitute: true, isPublicHoliday: true },
  '2025-10-09': { date: '2025-10-09', name: '한글날', isSubstitute: false, isPublicHoliday: true },
  '2025-12-25': { date: '2025-12-25', name: '크리스마스', isSubstitute: false, isPublicHoliday: true },

  // 2026
  '2026-01-01': { date: '2026-01-01', name: '새해 (신정)', isSubstitute: false, isPublicHoliday: true },
  '2026-02-16': { date: '2026-02-16', name: '설날 연휴', isSubstitute: false, isPublicHoliday: true },
  '2026-02-17': { date: '2026-02-17', name: '설날', isSubstitute: false, isPublicHoliday: true },
  '2026-02-18': { date: '2026-02-18', name: '설날 연휴', isSubstitute: false, isPublicHoliday: true },
  '2026-03-01': { date: '2026-03-01', name: '3·1절', isSubstitute: false, isPublicHoliday: true },
  '2026-03-02': { date: '2026-03-02', name: '대체공휴일 (3·1절)', isSubstitute: true, isPublicHoliday: true },
  '2026-05-05': { date: '2026-05-05', name: '어린이날', isSubstitute: false, isPublicHoliday: true },
  '2026-05-24': { date: '2026-05-24', name: '부처님 오신 날', isSubstitute: false, isPublicHoliday: true },
  '2026-05-25': { date: '2026-05-25', name: '대체공휴일 (부처님 오신 날)', isSubstitute: true, isPublicHoliday: true },
  '2026-06-03': { date: '2026-06-03', name: '제9회 지방선거일', isSubstitute: false, isPublicHoliday: true },
  '2026-06-06': { date: '2026-06-06', name: '현충일', isSubstitute: false, isPublicHoliday: true },
  '2026-08-15': { date: '2026-08-15', name: '광복절', isSubstitute: false, isPublicHoliday: true },
  '2026-08-17': { date: '2026-08-17', name: '대체공휴일 (광복절)', isSubstitute: true, isPublicHoliday: true },
  '2026-09-24': { date: '2026-09-24', name: '추석 연휴', isSubstitute: false, isPublicHoliday: true },
  '2026-09-25': { date: '2026-09-25', name: '추석', isSubstitute: false, isPublicHoliday: true },
  '2026-09-26': { date: '2026-09-26', name: '추석 연휴', isSubstitute: false, isPublicHoliday: true },
  '2026-09-28': { date: '2026-09-28', name: '대체공휴일 (추석)', isSubstitute: true, isPublicHoliday: true },
  '2026-10-03': { date: '2026-10-03', name: '개천절', isSubstitute: false, isPublicHoliday: true },
  '2026-10-05': { date: '2026-10-05', name: '대체공휴일 (개천절)', isSubstitute: true, isPublicHoliday: true },
  '2026-10-09': { date: '2026-10-09', name: '한글날', isSubstitute: false, isPublicHoliday: true },
  '2026-12-25': { date: '2026-12-25', name: '크리스마스', isSubstitute: false, isPublicHoliday: true },

  // 2027
  '2027-01-01': { date: '2027-01-01', name: '새해 (신정)', isSubstitute: false, isPublicHoliday: true },
  '2027-02-06': { date: '2027-02-06', name: '설날 연휴', isSubstitute: false, isPublicHoliday: true },
  '2027-02-07': { date: '2027-02-07', name: '설날', isSubstitute: false, isPublicHoliday: true },
  '2027-02-08': { date: '2027-02-08', name: '설날 연휴', isSubstitute: false, isPublicHoliday: true },
  '2027-02-09': { date: '2027-02-09', name: '대체공휴일 (설날)', isSubstitute: true, isPublicHoliday: true },
  '2027-03-01': { date: '2027-03-01', name: '3·1절', isSubstitute: false, isPublicHoliday: true },
  '2027-05-05': { date: '2027-05-05', name: '어린이날', isSubstitute: false, isPublicHoliday: true },
  '2027-05-13': { date: '2027-05-13', name: '부처님 오신 날', isSubstitute: false, isPublicHoliday: true },
  '2027-06-06': { date: '2027-06-06', name: '현충일', isSubstitute: false, isPublicHoliday: true },
  '2027-08-15': { date: '2027-08-15', name: '광복절', isSubstitute: false, isPublicHoliday: true },
  '2027-08-16': { date: '2027-08-16', name: '대체공휴일 (광복절)', isSubstitute: true, isPublicHoliday: true },
  '2027-09-14': { date: '2027-09-14', name: '추석 연휴', isSubstitute: false, isPublicHoliday: true },
  '2027-09-15': { date: '2027-09-15', name: '추석', isSubstitute: false, isPublicHoliday: true },
  '2027-09-16': { date: '2027-09-16', name: '추석 연휴', isSubstitute: false, isPublicHoliday: true },
  '2027-10-03': { date: '2027-10-03', name: '개천절', isSubstitute: false, isPublicHoliday: true },
  '2027-10-04': { date: '2027-10-04', name: '대체공휴일 (개천절)', isSubstitute: true, isPublicHoliday: true },
  '2027-10-09': { date: '2027-10-09', name: '한글날', isSubstitute: false, isPublicHoliday: true },
  '2027-10-11': { date: '2027-10-11', name: '대체공휴일 (한글날)', isSubstitute: true, isPublicHoliday: true },
  '2027-12-25': { date: '2027-12-25', name: '크리스마스', isSubstitute: false, isPublicHoliday: true },
  '2027-12-27': { date: '2027-12-27', name: '대체공휴일 (크리스마스)', isSubstitute: true, isPublicHoliday: true },
};

const STORAGE_KEY = 'korean_holidays_cache_v1';

function getCachedHolidays(): Record<string, HolidayItem> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...BASE_HOLIDAYS, ...JSON.parse(saved) };
    }
  } catch {
    // fallback
  }
  return { ...BASE_HOLIDAYS };
}

let holidaysMemoryCache = getCachedHolidays();

export function getHoliday(dateStr: string): HolidayItem | undefined {
  return holidaysMemoryCache[dateStr];
}

export function isHoliday(dateStr: string): boolean {
  const item = holidaysMemoryCache[dateStr];
  return Boolean(item && item.isPublicHoliday);
}

export function isSubstituteHoliday(dateStr: string): boolean {
  const item = holidaysMemoryCache[dateStr];
  return Boolean(item && item.isSubstitute);
}

export async function syncHolidaysFromApi(year: number = new Date().getFullYear()): Promise<{ success: boolean; count: number }> {
  try {
    const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/KR`);
    if (res.ok) {
      const data: Array<{ date: string; localName: string; name: string }> = await res.json();
      const updated = { ...holidaysMemoryCache };

      let addedCount = 0;
      data.forEach((item) => {
        const isSub = item.localName.includes('대체') || item.name.toLowerCase().includes('substitute') || item.name.toLowerCase().includes('observed');
        if (!updated[item.date]) {
          updated[item.date] = {
            date: item.date,
            name: isSub ? `대체공휴일 (${item.localName.replace('대체공휴일', '').trim() || item.localName})` : item.localName,
            isSubstitute: isSub,
            isPublicHoliday: true,
          };
          addedCount++;
        }
      });

      holidaysMemoryCache = updated;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // storage error ignore
      }

      return { success: true, count: addedCount };
    }
  } catch (err) {
    console.warn('Failed to fetch holidays from online API, using verified base database', err);
  }
  return { success: false, count: 0 };
}
