// Utseendena att välja mellan i Byggstudion. Varje tema är några
// CSS-variabler som appens stil använder, så att samma app kan se helt
// olika ut. accents är färgerna man kan välja för knappar och detaljer.
export const THEMES = [
  {
    id: 'ljus',
    name: 'Ljust och luftigt',
    vars: {
      bakgrund: '#f8fafc',
      yta: '#ffffff',
      text: '#0f172a',
      dampad: '#64748b',
      kant: '#e2e8f0',
      typsnitt: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      rundning: '12px',
    },
  },
  {
    id: 'mork',
    name: 'Mörkt',
    vars: {
      bakgrund: '#0f172a',
      yta: '#1e293b',
      text: '#e5e7eb',
      dampad: '#94a3b8',
      kant: '#334155',
      typsnitt: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      rundning: '12px',
    },
  },
  {
    id: 'fargglad',
    name: 'Färgglatt',
    vars: {
      bakgrund: '#fff7ed',
      yta: '#ffffff',
      text: '#1f2937',
      dampad: '#6b7280',
      kant: '#fed7aa',
      typsnitt: "'Trebuchet MS', 'Segoe UI', sans-serif",
      rundning: '20px',
    },
  },
  {
    id: 'foretag',
    name: 'Företag',
    vars: {
      bakgrund: '#f1f5f9',
      yta: '#ffffff',
      text: '#111827',
      dampad: '#6b7280',
      kant: '#d1d5db',
      typsnitt: "Georgia, 'Times New Roman', serif",
      rundning: '4px',
    },
  },
];

export const ACCENTS = [
  { id: 'lila', name: 'Lila', color: '#7c3aed' },
  { id: 'bla', name: 'Blå', color: '#2563eb' },
  { id: 'gron', name: 'Grön', color: '#16a34a' },
  { id: 'orange', name: 'Orange', color: '#ea580c' },
  { id: 'rosa', name: 'Rosa', color: '#db2777' },
  { id: 'gra', name: 'Grafit', color: '#334155' },
];

export const themeById = id =>
  THEMES.find(theme => theme.id === id) ?? THEMES[0];
export const accentById = id =>
  ACCENTS.find(accent => accent.id === id) ?? ACCENTS[0];
