import { supabase } from '../core/lib/supabase';
import { COURSES } from './courses';

// Det Kodskolan sparar om en elev (GDPR): framstegen i webbläsaren, under
// kursernas prefix, och i kontot course_progress, diplomas och entitlements.

// kodskolan-aktivitet är streaken, som gäller alla kurser.
const PREFIXES = [
  ...COURSES.map(course => course.storagePrefix),
  'kodskolan-aktivitet',
];

function localKeys() {
  try {
    return Object.keys(localStorage).filter(key =>
      PREFIXES.some(prefix => key.startsWith(prefix)),
    );
  } catch {
    return [];
  }
}

function parse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export function localData() {
  return Object.fromEntries(
    localKeys().map(key => [key, parse(localStorage.getItem(key))]),
  );
}

export function clearLocalData() {
  for (const key of localKeys()) {
    try {
      localStorage.removeItem(key);
    } catch {
      // Avstängt – då finns inget sparat heller.
    }
  }
}

// Allt om eleven som en JSON-fil. user är null utan inloggning, och då
// finns bara det i webbläsaren.
export async function myData(user) {
  const data = {
    exported_at: new Date().toISOString(),
    browser: localData(),
  };
  if (!supabase || !user) return data;
  // Bara egna rader: en lärare kan läsa sina elevers framsteg, men de hör
  // inte till lärarens data.
  const own = query => query.eq('user_id', user.id);
  const tables = {
    course_progress: own(supabase.from('course_progress').select('*')),
    diplomas: own(supabase.from('diplomas').select('*')),
    entitlements: own(supabase.from('entitlements').select('*')),
    lesson_feedback: own(supabase.from('lesson_feedback').select('*')),
    daily_activity: own(supabase.from('daily_activity').select('*')),
    profiles: own(supabase.from('profiles').select('*')),
    classes: supabase.from('classes').select('*').eq('teacher_id', user.id),
    class_members: own(supabase.from('class_members').select('*')),
  };
  const results = await Promise.all(Object.values(tables));
  const failed = results.find(result => result.error);
  if (failed) throw failed.error;
  return {
    ...data,
    account: { id: user.id, email: user.email, created_at: user.created_at },
    ...Object.fromEntries(
      Object.keys(tables).map((name, index) => [name, results[index].data]),
    ),
  };
}

export function downloadJson(data, fileName) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }),
  );
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Raderar kontot och allt i det (delete_my_account i databasen), och
// framstegen i den här webbläsaren.
export async function deleteMyAccount() {
  const { error } = await supabase.rpc('delete_my_account');
  if (error) throw error;
  clearLocalData();
  // Kontot finns inte längre, så bara inloggningen här tas bort.
  await supabase.auth.signOut({ scope: 'local' });
}
