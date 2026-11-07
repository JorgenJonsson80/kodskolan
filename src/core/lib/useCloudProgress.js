import { useEffect, useState } from 'react';
import { mergeCompleted, mergeDrafts } from './progress';
import { belongsTo, progressKeys, writeJson } from './storage';
import { supabase } from './supabase';
import { useAccount } from './useAccount';

// Synkar kursens framsteg med kontot: en rad per kurs i course_progress.
// status: 'loading' när kontot hämtas, 'synced' när allt är sparat och
// 'error' om något gick fel. Själva sparandet visas inte, eftersom det
// sker hela tiden och annars får sidan att flimra.
export function useCloudProgress({
  courseId,
  storagePrefix,
  completedIds,
  setCompletedIds,
  drafts,
  setDrafts,
  projectModes,
  setProjectModes,
}) {
  const account = useAccount();
  const [status, setStatus] = useState('synced');
  // Vems framsteg som hämtats. Inget sparas förrän de hämtats, annars
  // kan tomma framsteg skriva över det som finns i kontot.
  const [loadedUserId, setLoadedUserId] = useState(null);
  const userId = account.user?.id ?? null;

  // Hämta kontots framsteg och slå ihop dem med webbläsarens.
  useEffect(() => {
    if (!supabase || !userId) return;
    let ignore = false;
    supabase
      .from('course_progress')
      .select('completed_ids, drafts, project_modes')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (ignore) return;
        if (error) {
          setStatus('error');
          return;
        }
        // Framsteg från ett annat konto i samma webbläsare byts ut mot
        // kontots, i stället för att slås ihop.
        const mine = belongsTo(storagePrefix, userId);
        setCompletedIds(local =>
          mergeCompleted(mine ? local : [], data?.completed_ids),
        );
        setDrafts(local => mergeDrafts(mine ? local : {}, data?.drafts));
        setProjectModes(local =>
          mergeDrafts(mine ? local : {}, data?.project_modes),
        );
        writeJson(progressKeys(storagePrefix).owner, userId);
        setLoadedUserId(userId);
        setStatus('synced');
      });
    return () => {
      ignore = true;
    };
  }, [
    courseId,
    storagePrefix,
    userId,
    setCompletedIds,
    setDrafts,
    setProjectModes,
  ]);

  // Spara en sekund efter senaste ändringen, så att inte varje
  // tangenttryckning skickas.
  useEffect(() => {
    if (!supabase || !userId || loadedUserId !== userId) return;
    const timer = setTimeout(async () => {
      const { error } = await supabase.from('course_progress').upsert({
        user_id: userId,
        course_id: courseId,
        completed_ids: completedIds,
        drafts,
        project_modes: projectModes,
        updated_at: new Date().toISOString(),
      });
      setStatus(error ? 'error' : 'synced');
    }, 1000);
    return () => clearTimeout(timer);
  }, [courseId, userId, loadedUserId, completedIds, drafts, projectModes]);

  async function signOut() {
    await account.signOut();
    setLoadedUserId(null);
  }

  // Inloggad men kontot är inte hämtat än.
  const isLoading = userId && loadedUserId !== userId && status !== 'error';

  return {
    isAvailable: account.isAvailable,
    user: account.user,
    status: isLoading ? 'loading' : status,
    signIn: account.signIn,
    signOut,
  };
}
