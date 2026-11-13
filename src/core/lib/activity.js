import { readJson, writeJson } from './storage';
import { supabase } from './supabase';

// Streak och dagens mål: hur många övningar eleven klarat per dag, i alla
// kurser. Sparas i webbläsaren och, för den som är inloggad, i
// daily_activity (log_activity), så att streaken följer med kontot.
export const DAILY_GOAL = 3;
const KEY = 'kodskolan-aktivitet';
export const ACTIVITY_EVENT = 'kodskolan-aktivitet';

const isDayMap = value =>
  value !== null &&
  typeof value === 'object' &&
  Object.entries(value).every(
    ([day, count]) =>
      /^\d{4}-\d{2}-\d{2}$/.test(day) && Number.isInteger(count),
  );

// Den lokala dagen, som 2026-11-13. Inte UTC: en övning klockan 00:30
// ska räknas till den dag eleven själv tycker att det är.
export function localDay(date = new Date()) {
  const pad = number => String(number).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export const readActivity = () => readJson(KEY, {}, isDayMap);

// Slår ihop två dagsräkningar: den största per dag vinner, så att samma
// övning inte räknas två gånger när webbläsaren och kontot möts.
export function mergeActivity(a, b) {
  const merged = { ...a };
  for (const [day, count] of Object.entries(b)) {
    merged[day] = Math.max(merged[day] ?? 0, count);
  }
  return merged;
}

// Antal dagar i rad med minst en övning, fram till i dag. Har eleven inte
// hunnit i dag än räknas streaken fram till i går, så att den inte nollas
// på morgonen.
export function streakOf(days, today = new Date()) {
  const date = new Date(today);
  if (!days[localDay(date)]) date.setDate(date.getDate() - 1);
  let streak = 0;
  while (days[localDay(date)] > 0) {
    streak += 1;
    date.setDate(date.getDate() - 1);
  }
  return streak;
}

// Anropas när en övning blir klar.
export function recordExercise(user) {
  const day = localDay();
  const days = readActivity();
  days[day] = (days[day] ?? 0) + 1;
  // Bara de senaste 400 dagarna, så att lagringen inte växer för evigt.
  const kept = Object.fromEntries(Object.entries(days).sort().slice(-400));
  writeJson(KEY, kept);
  window.dispatchEvent(new Event(ACTIVITY_EVENT));
  if (supabase && user) {
    supabase.rpc('log_activity', { p_day: day }).then(
      () => {},
      () => {},
    );
  }
}
