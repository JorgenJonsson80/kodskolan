import { useEffect, useState } from 'react';
import {
  ACTIVITY_EVENT,
  DAILY_GOAL,
  localDay,
  mergeActivity,
  readActivity,
  streakOf,
} from './activity';
import { supabase } from './supabase';

// Streaken och dagens mål, uppdaterade när en övning blir klar. Med konto
// hämtas de senaste dagarna från daily_activity och slås ihop med
// webbläsarens.
export function useActivity(user) {
  const [local, setLocal] = useState(readActivity);
  const [remote, setRemote] = useState({});
  const userId = user?.id ?? null;

  useEffect(() => {
    const update = () => setLocal(readActivity());
    window.addEventListener(ACTIVITY_EVENT, update);
    return () => window.removeEventListener(ACTIVITY_EVENT, update);
  }, []);

  useEffect(() => {
    if (!supabase || !userId) return;
    let ignore = false;
    supabase
      .from('daily_activity')
      .select('day, exercises')
      .eq('user_id', userId)
      .order('day', { ascending: false })
      .limit(400)
      .then(({ data }) => {
        if (ignore || !data) return;
        setRemote(
          Object.fromEntries(data.map(row => [row.day, row.exercises])),
        );
      });
    return () => {
      ignore = true;
    };
  }, [userId]);

  const days = mergeActivity(local, userId ? remote : {});
  const today = days[localDay()] ?? 0;
  return { today, goal: DAILY_GOAL, streak: streakOf(days) };
}
