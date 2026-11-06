import { useEffect, useState } from 'react';
import { supabase } from './supabase';

// Inloggningen, som är densamma i alla kurser och på startsidan.
// session är undefined tills den hämtats, och null när ingen är inloggad.
export function useAccount() {
  const [session, setSession] = useState(supabase ? undefined : null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  async function signIn(email) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Tillbaka till sidan man loggade in från.
        emailRedirectTo: window.location.origin + window.location.pathname,
      },
    });
    return error;
  }

  return {
    isAvailable: Boolean(supabase),
    isReady: session !== undefined,
    user: session?.user ?? null,
    signIn,
    signOut: () => supabase.auth.signOut(),
  };
}
