import { TRACKS } from '../data/tracks';

// Begrepp som facit inte får använda före sin bana. Kommentarer och text
// inom citattecken tas bort först. En regel för en bana som inte finns än
// gäller inte, så reglerna kan stå här från början och slår till när
// banan läggs till.
const RULES = [
  {
    track: 'filtrera',
    name: 'WHERE',
    pattern: /\b(WHERE|LIKE|BETWEEN|IS\s+(NOT\s+)?NULL)\b/i,
  },
  {
    track: 'sortera',
    name: 'sortering och räkning',
    pattern: /\b(ORDER\s+BY|DISTINCT|AS|COUNT|SUM|AVG|MIN|MAX)\b/i,
  },
  { track: 'gruppera', name: 'GROUP BY', pattern: /\b(GROUP\s+BY|HAVING)\b/i },
  {
    track: 'omvandla',
    name: 'funktioner och CASE',
    pattern:
      /\b(CASE|ROUND|UPPER|LOWER|LENGTH|SUBSTR|strftime|julianday|date)\s*\(?|\|\|/i,
  },
  { track: 'join', name: 'JOIN', pattern: /\bJOIN\b/i },
  {
    track: 'saknas',
    name: 'LEFT JOIN och COALESCE',
    pattern: /\b(LEFT\s+JOIN|COALESCE|IFNULL)\b/i,
  },
  {
    track: 'andra',
    name: 'INSERT, UPDATE och DELETE',
    pattern: /\b(INSERT|UPDATE|DELETE)\b/i,
  },
  {
    track: 'skapa',
    name: 'CREATE TABLE',
    pattern: /\b(CREATE|DROP|ALTER)\s+TABLE\b/i,
  },
  {
    track: 'delfragor',
    name: 'delfrågor och WITH',
    pattern: /\(\s*SELECT\b|\bWITH\b|\bEXISTS\b/i,
  },
  { track: 'fonster', name: 'fönsterfunktioner', pattern: /\bOVER\s*\(/i },
];

const trackIndex = id => TRACKS.findIndex(track => track.id === id);

// Ger namnen på begreppen som används för tidigt, t.ex. ['JOIN'].
export function conceptsTooEarly(code, trackId) {
  const source = code.replace(/--.*$/gm, '').replace(/'[^']*'/g, "''");
  return RULES.filter(
    rule =>
      trackIndex(rule.track) !== -1 &&
      trackIndex(trackId) < trackIndex(rule.track) &&
      rule.pattern.test(source),
  ).map(rule => rule.name);
}
