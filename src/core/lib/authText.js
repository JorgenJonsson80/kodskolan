export const MIN_PASSWORD = 8;

// Supabase begränsar hur många mejl som skickas i timmen (429).
const isRateLimit = error =>
  error.status === 429 || /rate limit/i.test(error.message ?? '');

// Supabases fel vid inloggning, på svenska.
export function errorText(error) {
  if (isRateLimit(error)) {
    return 'Just nu har det skickats för många mejl. Vänta en stund (upp till en timme) och försök igen.';
  }
  if (error.code === 'invalid_credentials') {
    return 'Fel mejladress eller lösenord. Har du loggat in med länk eller Google förut? Välj "Glömt lösenordet?" så skapar du ett.';
  }
  if (error.code === 'email_not_confirmed') {
    return 'Bekräfta din mejladress först, med länken vi skickade när du skapade kontot.';
  }
  if (error.code === 'weak_password') {
    return `Välj ett svårare lösenord, minst ${MIN_PASSWORD} tecken.`;
  }
  if (error.code === 'same_password') {
    return 'Det är samma lösenord som förut. Välj ett nytt.';
  }
  return 'Det gick inte. Försök igen om en stund.';
}
