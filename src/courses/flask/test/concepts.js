import { TRACKS } from '../data/tracks';

// Begrepp som facit inte får använda före sin bana. Kommentarer och text
// inom citattecken tas bort först. En regel för en bana som inte finns än
// gäller inte. Python kan eleven redan, så bara Flask räknas.
const RULES = [
  {
    track: 'vagar',
    name: 'variabler i adressen',
    pattern: /@app\.\w+\([^)]*<|url_for/,
  },
  {
    track: 'json',
    name: 'JSON och statuskoder',
    pattern: /jsonify|return [^\n]*,\s*\d{3}\s*$/m,
  },
  { track: 'fragor', name: 'request.args', pattern: /request\.args/ },
  {
    track: 'skicka',
    name: 'POST och get_json',
    pattern: /@app\.post|get_json|methods=/,
  },
  { track: 'api', name: 'PUT och DELETE', pattern: /@app\.(put|delete|patch)/ },
  {
    track: 'fel',
    name: 'abort och errorhandler',
    pattern: /\babort\(|errorhandler/,
  },
  { track: 'mallar', name: 'mallar', pattern: /render_template/ },
  {
    track: 'formular',
    name: 'formulär och redirect',
    pattern: /request\.form|redirect\(/,
  },
  { track: 'databas', name: 'sqlite3', pattern: /sqlite3/ },
  {
    track: 'inloggning',
    name: 'session och lösenord',
    pattern: /\bsession\b|password_hash|secret_key/,
  },
];

const trackIndex = id => TRACKS.findIndex(track => track.id === id);

const withoutTextAndComments = code =>
  code
    .replace(/#.*$/gm, '')
    .replace(/'''[^]*?'''|"""[^]*?"""/g, "''")
    .replace(/'(?:[^'\\\n]|\\.)*'/g, "''")
    .replace(/"(?:[^"\\\n]|\\.)*"/g, '""');

export function conceptsTooEarly(code, trackId) {
  const source = withoutTextAndComments(code);
  return RULES.filter(
    rule =>
      trackIndex(rule.track) !== -1 &&
      trackIndex(trackId) < trackIndex(rule.track) &&
      rule.pattern.test(source),
  ).map(rule => rule.name);
}
