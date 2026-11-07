import { supabase } from '../core/lib/supabase';
import { COURSES } from './courses';

// Det Kodskolan sparar om en elev (GDPR): framstegen i webbläsaren, under
// kursernas prefix, och i kontot course_progress och diplomas.

const PREFIXES = COURSES.map(course => course.storagePrefix);

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
  const [progress, diplomas] = await Promise.all([
    supabase.from('course_progress').select('*').order('course_id'),
    supabase.from('diplomas').select('*').order('issued_at'),
  ]);
  if (progress.error) throw progress.error;
  if (diplomas.error) throw diplomas.error;
  return {
    ...data,
    account: { id: user.id, email: user.email, created_at: user.created_at },
    course_progress: progress.data,
    diplomas: diplomas.data,
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
