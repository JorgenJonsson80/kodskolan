import { supabase } from '../core/lib/supabase';

// Den publika profilen (tabellen profiles, se supabase/migrations). Finns
// bara om eleven själv skapat den, och visar bara namnet och diplomen.
export const SLUG_PATTERN = /^[a-z0-9-]{3,30}$/;

export const profileUrl = slug =>
  `${window.location.origin}${import.meta.env.BASE_URL}profil/${slug}`;

// "Åsa Öberg" → "asa-oberg": bara det som får stå i en adress.
export function toSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 30);
}

export async function fetchMyProfile() {
  const { data, error } = await supabase
    .from('profiles')
    .select('slug, display_name, created_at')
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function saveProfile(user, slug, displayName) {
  const { error } = await supabase
    .from('profiles')
    .upsert(
      { user_id: user.id, slug, display_name: displayName.trim() },
      { onConflict: 'user_id' },
    );
  if (error) {
    // 23505: någon annan har redan adressen.
    throw new Error(
      error.code === '23505'
        ? 'Någon annan har redan den adressen. Välj en annan.'
        : 'Profilen kunde inte sparas. Försök igen om en stund.',
    );
  }
}

export async function deleteProfile(user) {
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('user_id', user.id);
  if (error) throw error;
}

export async function fetchPublicProfile(slug) {
  const { data, error } = await supabase.rpc('public_profile', {
    p_slug: slug,
  });
  if (error) throw error;
  return data;
}
