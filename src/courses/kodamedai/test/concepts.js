import { TRACKS } from '../data/tracks';

// Begrepp som facit inte får använda före sin bana. Banorna står i
// docs/kurser/kodamedai.md.
const RULES = [
  { track: 'testa', name: 'assert-tester', pattern: /^\s*assert\b/m },
  { track: 'sakerhet', name: 'sqlite3', pattern: /sqlite3/ },
];

const trackIndex = id => TRACKS.findIndex(track => track.id === id);
const withoutComments = code => code.replace(/#.*$/gm, '');

export function conceptsTooEarly(code, trackId) {
  const source = withoutComments(code);
  return RULES.filter(
    rule =>
      trackIndex(rule.track) !== -1 &&
      trackIndex(trackId) < trackIndex(rule.track) &&
      rule.pattern.test(source),
  ).map(rule => rule.name);
}
