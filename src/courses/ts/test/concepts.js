import { TRACKS } from '../data/tracks';

// Begrepp som facit inte får använda före sin bana. Kommentarer och text
// inom citattecken tas bort först. En regel för en bana som inte finns än
// gäller inte, så reglerna kan stå här från början och slår till när
// banan läggs till. JavaScript kan eleven redan, så bara det som
// TypeScript lägger till räknas.
const RULES = [
  {
    track: 'funktioner',
    name: 'typade parametrar och returtyper',
    pattern: /\(\s*[\w$]+\??\s*:|\)\s*:\s*[\w'{[]/,
  },
  {
    track: 'objekt',
    name: 'arraytyper och objekttyper',
    pattern: /\w\[\]|\breadonly\b|:\s*\{/,
  },
  {
    track: 'egna',
    name: 'type och interface',
    pattern: /\btype\s+[A-Z]\w*\s*[=<]|\binterface\b/,
  },
  { track: 'unioner', name: 'unioner', pattern: /[^|]\|(?!\|)/ },
  {
    track: 'saknas',
    name: 'null och ! i typer',
    pattern: /\|\s*(null|undefined)\b|[\w)\]]!(\.|;|\)|,|\s)/,
  },
  { track: 'fall', name: 'never', pattern: /\bnever\b/ },
  {
    track: 'generics',
    name: 'generics',
    pattern: /<\s*[A-Z]\w*\s*(,|>|extends)|\b(Array|Map|Set)\s*</,
  },
  {
    track: 'verktyg',
    name: 'verktygstyper',
    pattern:
      /\b(Partial|Pick|Omit|Record|Required|Readonly|ReturnType)\s*<|\bkeyof\b|:\s*typeof\b/,
  },
  {
    track: 'data',
    name: 'unknown, Promise och typkontroller',
    pattern: /\bunknown\b|\bPromise\s*<|\)\s*:\s*\w+\s+is\s/,
  },
  {
    track: 'react',
    name: 'React',
    pattern: /from\s+['"]react['"]|<\/[a-zA-Z]|\/>/,
  },
];

const trackIndex = id => TRACKS.findIndex(track => track.id === id);

const withoutTextAndComments = code =>
  code
    .replace(/\/\/.*$/gm, '')
    .replace(/'(?:[^'\\\n]|\\.)*'/g, "''")
    .replace(/"(?:[^"\\\n]|\\.)*"/g, '""');

// Ger namnen på begreppen som används för tidigt, t.ex. ['generics'].
export function conceptsTooEarly(code, trackId) {
  const source = withoutTextAndComments(code);
  return RULES.filter(
    rule =>
      trackIndex(rule.track) !== -1 &&
      trackIndex(trackId) < trackIndex(rule.track) &&
      rule.pattern.test(source),
  ).map(rule => rule.name);
}
