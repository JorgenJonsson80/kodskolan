import { TRACKS } from '../data/tracks';

// Begrepp som facit inte får använda före sin bana. Kommentarer och
// innehållet i texter tas bort först, så att t.ex. "(" och "{" i en
// f-sträng inte ser ut som en dictionary.
// sorted finns inte med: Telefonboken i bana 6 tar in den med en egen
// förklaring.
const RULES = [
  { track: 'listor', name: 'listor', pattern: /\[/ },
  { track: 'funktioner', name: 'def', pattern: /\bdef\b/ },
  { track: 'strangar', name: 'f-strängar', pattern: /\bf["']/ },
  {
    track: 'dictionaries',
    name: 'dictionaries',
    pattern: /[=(,[]\s*\{|\.items\(/,
  },
  {
    track: 'smidigare',
    name: 'comprehensions',
    pattern: /[[{][^\]}]*\bfor\b/,
  },
  {
    track: 'smidigare',
    name: 'enumerate, zip och lambda',
    pattern: /\b(enumerate|zip)\s*\(|\blambda\b/,
  },
  {
    track: 'undantag',
    name: 'try och raise',
    pattern: /\btry\s*:|\braise\b/,
  },
  { track: 'moduler', name: 'import', pattern: /^\s*(import|from)\s/m },
  { track: 'klasser', name: 'class', pattern: /^\s*class\s/m },
  { track: 'pandas', name: 'pandas', pattern: /\bimport\s+pandas\b/ },
  { track: 'slutprojekt', name: 'filer', pattern: /\bopen\(/ },
  { track: 'streamlit', name: 'streamlit', pattern: /\bimport\s+streamlit\b/ },
];

const trackIndex = id => TRACKS.findIndex(track => track.id === id);

// Ger namnen på begreppen som används för tidigt, t.ex. ['def'].
export function conceptsTooEarly(code, trackId) {
  const source = code
    .replace(/#.*$/gm, '')
    .replace(/(["'])(?:\\.|(?!\1).)*\1/g, '""');
  return RULES.filter(
    rule =>
      trackIndex(trackId) < trackIndex(rule.track) && rule.pattern.test(source),
  ).map(rule => rule.name);
}
