export const STREAK_STORAGE_KEY = 'studyStreak';
export const LAST_STUDY_STORAGE_KEY = 'studyLastStudyDay';

/** Local calendar day of a date, formatted as YYYY-MM-DD. */
export function dayKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** The calendar day before the given YYYY-MM-DD key. */
export function previousDay(key: string): string {
  const [year, month, day] = key.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() - 1);
  return dayKey(date);
}

/**
 * The streak value after a study session on `day`.
 *
 * - no previous session -> the streak starts at 1
 * - the previous session was on the same day -> the streak is kept
 * - the previous session was on the day before -> the streak grows by one
 * - any other gap -> the streak restarts at 1
 */
export function nextStreak(current: number, lastStudyDay: string | null, day: string): number {
  const safeCurrent = Number.isFinite(current) && current > 0 ? Math.floor(current) : 0;
  if (!lastStudyDay) return 1;
  if (lastStudyDay === day) return Math.max(1, safeCurrent);
  if (lastStudyDay === previousDay(day)) return safeCurrent + 1;
  return 1;
}
