import { TRACKS } from '../data/tracks';

// Begrepp som facit inte får använda före sin bana. Kommentarer och text
// inom citattecken tas bort först. En regel för en bana som inte finns än
// gäller inte. Python kan eleven redan, så bara FastAPI räknas. Banorna
// står i docs/kurser/fastapi.md.
const RULES = [
  {
    track: 'vagar',
    name: 'variabler i adressen',
    pattern: /@app\.\w+\([^)]*\{/,
  },
  {
    track: 'modeller',
    name: 'Pydantic och POST',
    pattern: /BaseModel|@app\.post/,
  },
  {
    track: 'svar',
    name: 'HTTPException och statuskoder',
    pattern: /HTTPException|status_code\s*=|response_model/,
  },
  {
    track: 'crud',
    name: 'PUT, PATCH och DELETE',
    pattern: /@app\.(put|patch|delete)/,
  },
  {
    track: 'beroenden',
    name: 'Depends och Header',
    pattern: /Depends|Header\(/,
  },
  { track: 'databas', name: 'sqlite3', pattern: /sqlite3/ },
  { track: 'async', name: 'async och await', pattern: /\basync\b|\bawait\b/ },
];

const trackIndex = id => TRACKS.findIndex(track => track.id === id);

// Text inom citattecken tas bort, men inte nyckeln i FastAPI:s sökvägar,
// där {id} står inne i texten. Därför behålls hakparenteserna.
const withoutTextAndComments = code =>
  code
    .replace(/#.*$/gm, '')
    .replace(/'''[^]*?'''|"""[^]*?"""/g, "''")
    .replace(/'(?:[^'\\\n]|\\.)*'/g, text =>
      text.includes('{') ? "'{'" : "''",
    )
    .replace(/"(?:[^"\\\n]|\\.)*"/g, text =>
      text.includes('{') ? '"{"' : '""',
    );

export function conceptsTooEarly(code, trackId) {
  const source = withoutTextAndComments(code);
  return RULES.filter(
    rule =>
      trackIndex(rule.track) !== -1 &&
      trackIndex(trackId) < trackIndex(rule.track) &&
      rule.pattern.test(source),
  ).map(rule => rule.name);
}
