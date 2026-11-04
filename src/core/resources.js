// Fastnat?-panelen länkar till en YouTube-sökning, inte en viss video,
// så att länken aldrig dör.
export function videoSearchUrl(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}
