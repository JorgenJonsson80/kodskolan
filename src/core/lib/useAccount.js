import { useEffect, useState } from 'react';
import { supabase } from './supabase';

// Tillbaka till sidan man loggade in från.
const here = () => window.location.origin + window.location.pathname;

// Länken i mejlet för "Glömt lösenordet?" leder till /konto, där man
// väljer ett nytt (AccountPage läser NEW_PASSWORD).
export const NEW_PASSWORD = 'nytt-losenord';
const newPasswordUrl = () =>
  `${window.location.origin}${import.meta.env.BASE_URL}konto?${NEW_PASSWORD}`;

// Är Google påslaget i Supabase? Frågas en gång, så att knappen bara
// visas när den fungerar.
let googleEnabled;
function fetchGoogleEnabled() {
  googleEnabled ??= fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/settings`,
    { headers: { apikey: import.meta.env.VITE_SUPABASE_ANON_KEY } },
  )
    .then(response => response.json())
    .then(settings => Boolean(settings.external?.google))
    .catch(() => false);
  return googleEnabled;
}

// Inloggningen, som är densamma i alla kurser och på startsidan.
// session är undefined tills den hämtats, och null när ingen är inloggad.
// Funktionerna ger Supabases fel, eller null när det gick bra.
export function useAccount() {
  const [session, setSession] = useState(supabase ? undefined : null);
  const [hasGoogle, setHasGoogle] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    let ignore = false;
    fetchGoogleEnabled().then(enabled => !ignore && setHasGoogle(enabled));
    return () => {
      ignore = true;
      data.subscription.unsubscribe();
    };
  }, []);

  async function signInWithLink(email) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: here() },
    });
    return error;
  }

  async function signInWithPassword(email, password) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return error;
  }

  // Ett nytt konto får ett mejl att bekräfta adressen med. Finns adressen
  // redan säger Supabase inget om det (så att ingen kan pröva sig fram
  // till vilka som har konto), och då kommer inget mejl.
  async function signUp(email, password) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: here() },
    });
    return error;
  }

  // Google skickar tillbaka hit inloggad. Har adressen redan ett konto
  // kopplar Supabase ihop dem, så framstegen finns kvar.
  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: here() },
    });
    return error;
  }

  async function sendPasswordReset(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: newPasswordUrl(),
    });
    return error;
  }

  async function setPassword(password) {
    const { error } = await supabase.auth.updateUser({ password });
    return error;
  }

  return {
    isAvailable: Boolean(supabase),
    isReady: session !== undefined,
    user: session?.user ?? null,
    hasGoogle,
    signInWithLink,
    signInWithPassword,
    signUp,
    signInWithGoogle,
    sendPasswordReset,
    setPassword,
    signOut: () => supabase.auth.signOut(),
  };
}
