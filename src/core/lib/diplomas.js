import { supabase } from './supabase';

// Diplomen i kontot (tabellen diplomas, se supabase/migrations). Koden är
// diplomets id, och sidan /diplom/<kod> kan visas för vem som helst.
export const diplomaUrl = code =>
  `${window.location.origin}${import.meta.env.BASE_URL}diplom/${code}`;

// kind: 'course' eller 'path'. Ger koden, eller kastar ett fel.
export async function issueDiploma(kind, subject, name, details) {
  const { data, error } = await supabase.rpc('issue_diploma', {
    p_kind: kind,
    p_subject: subject,
    p_name: name,
    p_details: details,
  });
  if (error) throw error;
  return data;
}

export async function fetchDiploma(code) {
  const { data, error } = await supabase.rpc('diploma', { p_code: code });
  if (error) throw error;
  return data?.[0] ?? null;
}

export async function fetchMyDiplomas() {
  const { data, error } = await supabase
    .from('diplomas')
    .select('id, kind, subject, name, details, issued_at')
    .order('issued_at');
  if (error) throw error;
  return data;
}
