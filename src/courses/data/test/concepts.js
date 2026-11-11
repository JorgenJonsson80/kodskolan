import { TRACKS } from '../data/tracks';

// Begrepp som facit inte får använda före sin bana. Kommentarer tas bort
// först. En regel för en bana som inte finns än gäller inte. Banorna står
// i docs/kurser/data.md.
const RULES = [
  {
    track: 'forsta',
    name: 'describe och info',
    pattern: /\.describe\(|\.info\(|\.dtypes/,
  },
  {
    track: 'stada',
    name: 'städa data',
    pattern: /isna\(|dropna\(|fillna\(|duplicated\(|astype\(|to_numeric\(/,
  },
  {
    track: 'datum',
    name: 'datum',
    pattern: /to_datetime\(|\.dt\.|resample\(/,
  },
  {
    track: 'gruppera',
    name: 'pivot och agg',
    pattern: /pivot_table\(|crosstab\(|\.agg\(/,
  },
  {
    track: 'kombinera',
    name: 'kombinera tabeller',
    pattern: /merge\(|concat\(|sqlite3/,
  },
  { track: 'diagram', name: 'diagram', pattern: /matplotlib|plt\./ },
  {
    track: 'statistik',
    name: 'statistik',
    pattern: /numpy|np\.|\.corr\(|\.std\(|quantile\(|median\(/,
  },
  { track: 'app', name: 'Streamlit', pattern: /streamlit/ },
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
