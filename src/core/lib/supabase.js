import { createClient } from '@supabase/supabase-js';

// Adressen och den publika nyckeln kommer från .env.local lokalt och från
// GitHub Actions vid bygget. Saknas de fungerar appen som förut, med
// framstegen bara i webbläsaren.
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && anonKey ? createClient(url, anonKey) : null;
