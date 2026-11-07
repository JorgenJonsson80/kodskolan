import { useEffect, useState } from 'react';
import { supabase } from '../core/lib/supabase';

// Klara id:n per kurs i kontot ({ python: […] }), eller null tills de
// hämtats. Utan inloggning finns inget att hämta.
export function useCloudCompleted(userId) {
  const [saved, setSaved] = useState({ userId: null, byCourse: {} });

  useEffect(() => {
    if (!supabase || !userId) return;
    let ignore = false;
    supabase
      .from('course_progress')
      .select('course_id, completed_ids')
      .eq('user_id', userId)
      .then(({ data, error }) => {
        if (ignore) return;
        const byCourse = Object.fromEntries(
          (error ? [] : data).map(row => [row.course_id, row.completed_ids]),
        );
        setSaved({ userId, byCourse, error: Boolean(error) });
      });
    return () => {
      ignore = true;
    };
  }, [userId]);

  return saved.userId === userId ? saved : null;
}
