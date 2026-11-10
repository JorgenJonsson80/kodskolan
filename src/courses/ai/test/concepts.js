import { TRACKS } from '../data/tracks';

// Begrepp som facit inte får använda före sin bana. Kommentarer och text
// inom citattecken tas bort först. En regel för en bana som inte finns än
// gäller inte. Banorna står i docs/kurser/ai.md.
const RULES = [
  {
    track: 'samtal',
    name: 'samtal med historik',
    pattern: /role['"]?\s*:\s*['"]assistant/,
  },
  {
    track: 'struktur',
    name: 'strukturerade svar',
    pattern: /\.parse\(|output_config|output_format/,
  },
  {
    track: 'verktyg',
    name: 'verktyg',
    pattern: /tools\s*=|tool_use|tool_result/,
  },
  { track: 'agent', name: 'agentloop', pattern: /while\s+.*stop_reason/ },
  {
    track: 'slutprojekt',
    name: 'FastAPI',
    pattern: /from fastapi|import fastapi/,
  },
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
