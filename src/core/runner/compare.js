// Jämför elevens godkända kod med facit. Sådant som bara är stil räknas
// inte: kommentarer, blanksteg och vilken sorts citattecken man använder.
function normalize(code) {
  return code.replace(/#.*$/gm, '').replace(/"/g, "'").replace(/\s/g, '');
}

// true när lösningen fungerar men är märkbart längre än facit, både
// räknat i andel och i antal tecken. Då är facit värt att visa.
export function isNoticeablyLonger(code, solution) {
  const mine = normalize(code).length;
  const theirs = normalize(solution).length;
  return mine > theirs * 1.3 && mine - theirs >= 15;
}
