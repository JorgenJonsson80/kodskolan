// Kontaktvägen för elever: ett mejl till supporten. Adressen kommer från
// VITE_SUPPORT_EMAIL (.env.local och GitHub-variabeln). Utan den visas
// inga kontaktlänkar.
export const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL || null;

const mailto = (subject, body) =>
  `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const contactUrl = () =>
  SUPPORT_EMAIL && mailto('Fråga om Kodskolan', '');

// Ett felrapportsmejl med det supporten behöver veta, så att eleven bara
// behöver skriva vad som hände.
export function problemReportUrl({ course, lesson } = {}) {
  if (!SUPPORT_EMAIL) return null;
  // Vid bygget (scripts/prerender.mjs) finns ingen webbläsare att fråga.
  const browser = typeof window === 'undefined' ? null : window;
  const facts = [
    browser && `Sidan: ${browser.location.href}`,
    course && `Kurs: ${course.name}`,
    lesson && `Övning: ${lesson.title} (${lesson.id})`,
    browser && `Webbläsare: ${browser.navigator.userAgent}`,
  ].filter(Boolean);
  return mailto(
    'Något fungerar inte i Kodskolan',
    `Vad hände, och vad väntade du dig?\n\n\n\n---\n${facts.join('\n')}`,
  );
}
