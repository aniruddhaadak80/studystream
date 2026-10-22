import { describe, it, expect } from 'vitest';
import { dayKey, nextStreak, previousDay } from './streak';

describe('dayKey', () => {
  it('formats a date as the local calendar day', () => {
    expect(dayKey(new Date(2026, 0, 5))).toBe('2026-01-05');
    expect(dayKey(new Date(2026, 11, 31))).toBe('2026-12-31');
  });
});

describe('previousDay', () => {
  it('steps back one calendar day', () => {
    expect(previousDay('2026-01-05')).toBe('2026-01-04');
    expect(previousDay('2026-03-01')).toBe('2026-02-28');
    expect(previousDay('2026-01-01')).toBe('2025-12-31');
  });
});

describe('nextStreak', () => {
  it('starts at 1 when there was no earlier session', () => {
    expect(nextStreak(1, null, '2026-01-05')).toBe(1);
  });

  it('grows by one on the day after the previous session', () => {
    expect(nextStreak(3, '2026-01-04', '2026-01-05')).toBe(4);
  });

  it('keeps the streak for a second session on the same day', () => {
    expect(nextStreak(3, '2026-01-05', '2026-01-05')).toBe(3);
  });

  it('restarts at 1 after a gap of more than one day', () => {
    expect(nextStreak(9, '2026-01-01', '2026-01-05')).toBe(1);
  });

  it('handles a missing or broken current value', () => {
    expect(nextStreak(Number.NaN, '2026-01-04', '2026-01-05')).toBe(1);
    expect(nextStreak(0, '2026-01-04', '2026-01-05')).toBe(1);
  });
});
