import { TRACKS } from '../data/tracks';

// Begrepp som facit inte får använda före sin bana. Kommentarer tas bort
// först. En regel för en bana som inte finns än gäller inte, så reglerna
// kan stå här från början och slår till när banan läggs till.
const RULES = [
  { track: 'lankar', name: 'länkar och bilder', pattern: /<(a|img)\b/i },
  {
    track: 'listor',
    name: 'listor och tabeller',
    pattern: /<(ul|ol|table)\b/i,
  },
  {
    track: 'struktur',
    name: 'sidans delar',
    pattern: /<(header|nav|main|section|article|footer)\b/i,
  },
  {
    track: 'formular',
    name: 'formulär',
    pattern: /<(form|input|label|button)\b/i,
  },
  { track: 'css', name: 'CSS', pattern: /<style\b|\sstyle\s*=/i },
  {
    track: 'boxen',
    name: 'boxmodellen',
    pattern:
      /(?<![\w-])(padding|margin|border|box-sizing|(max-|min-)?(width|height)|display)(-[a-z-]+)?\s*:/i,
  },
  { track: 'flexbox', name: 'flexbox', pattern: /display\s*:\s*flex/i },
  { track: 'grid', name: 'grid', pattern: /display\s*:\s*grid/i },
  { track: 'responsivt', name: '@media', pattern: /@media\b/i },
  { track: 'tailwind', name: 'Tailwind', pattern: /tailwindcss/i },
];

const trackIndex = id => TRACKS.findIndex(track => track.id === id);

// Ger namnen på begreppen som används för tidigt, t.ex. ['CSS'].
export function conceptsTooEarly(code, trackId) {
  const source = code.replace(/<!--[\s\S]*?-->/g, '');
  return RULES.filter(
    rule =>
      trackIndex(rule.track) !== -1 &&
      trackIndex(trackId) < trackIndex(rule.track) &&
      rule.pattern.test(source),
  ).map(rule => rule.name);
}
