// Jämför elevens godkända kod med facit. Sådant som bara är stil räknas
// inte: blanksteg och vilken sorts citattecken man använder. Kursen kan
// skicka med en egen normalize som också tar bort t.ex. kommentarer.
const basic = code => code.replace(/"/g, "'").replace(/\s/g, '');

// true när lösningen fungerar men är märkbart längre än facit, både
// räknat i andel och i antal tecken. Då är facit värt att visa.
export function isNoticeablyLonger(code, solution, normalize = basic) {
  const mine = normalize(code).length;
  const theirs = normalize(solution).length;
  return mine > theirs * 1.3 && mine - theirs >= 15;
}
