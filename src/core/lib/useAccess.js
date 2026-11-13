import { useEffect, useState } from 'react';
import { supabase } from './supabase';

// Vad den inloggade har tillgång till (my_access i databasen). access är
// null medan den hämtas, så att en kurs inte hinner låsa betalbanorna för
// den som har tillgång innan svaret kommit.
export function useAccess(user) {
  const userId = user?.id ?? null;
  // Ökar när en kod lösts in, så att tillgången hämtas igen.
  const [version, setVersion] = useState(0);
  const [loaded, setLoaded] = useState({ key: null, access: [] });
  const key = `${userId}-${version}`;

  useEffect(() => {
    if (!supabase || !userId) return;
    let ignore = false;
    supabase.rpc('my_access').then(({ data, error }) => {
      // Går det inte att hämta blir det som utan tillgång. Gratisbanorna
      // fungerar ändå.
      if (!ignore) setLoaded({ key, access: error ? [] : data });
    });
    return () => {
      ignore = true;
    };
  }, [userId, key]);

  // Ger felet som text att visa, eller null när koden gick att lösa in.
  async function redeem(code) {
    const { error } = await supabase.rpc('redeem_access_code', {
      p_code: code,
    });
    if (error) return error.message;
    setVersion(count => count + 1);
    return null;
  }

  // Till Stripes betalsida (supabase/functions/create-checkout). Ger felet
  // som text, annars lämnar sidan.
  async function buy() {
    const { data, error } = await supabase.functions.invoke('create-checkout');
    if (error || !data?.url)
      return 'Det gick inte att öppna betalningen. Försök igen om en stund.';
    window.location.assign(data.url);
    return null;
  }

  // Hämtar tillgången igen, t.ex. strax efter ett köp.
  const reload = () => setVersion(count => count + 1);

  // Efter en inlöst kod visas den gamla tillgången tills den nya kommit.
  const isFirstLoad = !loaded.key?.startsWith(`${userId}-`);
  return {
    access: !supabase || !userId ? [] : isFirstLoad ? null : loaded.access,
    redeem,
    buy,
    reload,
  };
}
