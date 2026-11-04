import { useEffect, useState } from 'react';
import { mergeCompleted, mergeDrafts } from './progress';
import { supabase } from './supabase';

// Håller koll på inloggningen och synkar framstegen med Supabase, i
// kursens tabell (progressTable). Etapp 3 slår ihop dem till en.
// status: 'loading' när kontot hämtas, 'synced' när allt är sparat och
// 'error' om något gick fel. Själva sparandet visas inte, eftersom det
// sker hela tiden och annars får sidan att flimra.
// Så här ser en rad ut i Python- och HTML-kursens tabeller. En kurs med
// andra kolumner (JS) skickar med en egen cloud: { select, fromRow, toRow }.
const STANDARD = {
  select: 'completed_ids, drafts, project_modes',
  fromRow: row => ({
    completedIds: row?.completed_ids,
    drafts: row?.drafts,
    projectModes: row?.project_modes,
  }),
  toRow: ({ completedIds, drafts, projectModes }) => ({
    completed_ids: completedIds,
    drafts,
    project_modes: projectModes,
  }),
};

export function useCloudProgress({
  table,
  cloud = STANDARD,
  completedIds,
  setCompletedIds,
  drafts,
  setDrafts,
  projectModes,
  setProjectModes,
}) {
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState('synced');
  // Vems framsteg som hämtats. Inget sparas förrän de hämtats, annars
  // kan tomma framsteg skriva över det som finns i kontot.
  const [loadedUserId, setLoadedUserId] = useState(null);
  const userId = session?.user.id ?? null;

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  // Hämta kontots framsteg och slå ihop dem med webbläsarens.
  useEffect(() => {
    if (!supabase || !userId) return;
    let ignore = false;
    supabase
      .from(table)
      .select(cloud.select)
      .eq('user_id', userId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (ignore) return;
        if (error) {
          setStatus('error');
          return;
        }
        const saved = cloud.fromRow(data);
        setCompletedIds(local => mergeCompleted(local, saved.completedIds));
        setDrafts(local => mergeDrafts(local, saved.drafts));
        setProjectModes(local => mergeDrafts(local, saved.projectModes));
        setLoadedUserId(userId);
        setStatus('synced');
      });
    return () => {
      ignore = true;
    };
  }, [table, cloud, userId, setCompletedIds, setDrafts, setProjectModes]);

  // Spara en sekund efter senaste ändringen, så att inte varje
  // tangenttryckning skickas.
  useEffect(() => {
    if (!supabase || !userId || loadedUserId !== userId) return;
    const timer = setTimeout(async () => {
      const { error } = await supabase.from(table).upsert({
        user_id: userId,
        ...cloud.toRow({ completedIds, drafts, projectModes }),
        updated_at: new Date().toISOString(),
      });
      setStatus(error ? 'error' : 'synced');
    }, 1000);
    return () => clearTimeout(timer);
  }, [table, cloud, userId, loadedUserId, completedIds, drafts, projectModes]);

  async function signIn(email) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Tillbaka till kursen man loggade in från.
        emailRedirectTo: window.location.origin + window.location.pathname,
      },
    });
    return error;
  }

  async function signOut() {
    await supabase.auth.signOut();
    setLoadedUserId(null);
  }

  // Inloggad men kontot är inte hämtat än.
  const isLoading = userId && loadedUserId !== userId && status !== 'error';

  return {
    isAvailable: Boolean(supabase),
    user: session?.user ?? null,
    status: isLoading ? 'loading' : status,
    signIn,
    signOut,
  };
}
