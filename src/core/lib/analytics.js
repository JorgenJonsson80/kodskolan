// Statistik och fel till PostHog (EU). Bara på den publicerade sajten och
// bara när VITE_POSTHOG_KEY finns, så att utveckling och tester inte
// räknas. Inget sparas i webbläsaren (cookieless_mode): PostHog räknar
// besökare med en hash som byts varje dag. Ingen kod, inga mejladresser
// och inga klick skickas, bara händelserna nedan.

const KEY = import.meta.env.VITE_POSTHOG_KEY;
const ENABLED = Boolean(KEY) && import.meta.env.PROD;

// Händelser före laddningen väntar här, så att ingen tappas.
let queue = [];
let client = null;

export function startAnalytics() {
  if (!ENABLED || client || typeof window === 'undefined') return;
  client = 'loading';
  // Biblioteket är stort, så det hämtas först när sidan har ritats.
  const load = () =>
    import('posthog-js').then(
      ({ default: posthog }) => {
        posthog.init(KEY, {
          api_host: 'https://eu.i.posthog.com',
          cookieless_mode: 'always',
          person_profiles: 'never',
          autocapture: false,
          capture_pageview: true,
          capture_pageleave: false,
          disable_session_recording: true,
          disable_surveys: true,
          advanced_disable_flags: true,
          capture_exceptions: true,
          respect_dnt: true,
        });
        client = posthog;
        queue.forEach(([name, props]) => posthog.capture(name, props));
        queue = [];
      },
      // Blockeras PostHog (t.ex. av en annonsblockerare) fungerar allt ändå.
      () => {
        client = null;
        queue = [];
      },
    );
  if ('requestIdleCallback' in window) window.requestIdleCallback(load);
  else setTimeout(load, 1);
}

export function trackEvent(name, props = {}) {
  if (!ENABLED) return;
  if (client && client !== 'loading') client.capture(name, props);
  else if (client === 'loading') queue.push([name, props]);
}
