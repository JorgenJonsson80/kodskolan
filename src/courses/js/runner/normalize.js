// Jämför elevens godkända kod med facit. Sådant som bara är stil räknas
// inte: kommentarer, blanksteg, semikolon, citattecken, parenteser runt
// en ensam parameter och kommatecken sist i en lista.
export function normalize(code) {
  return code
    .replace(/\/\*[^]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/["`]/g, "'")
    .replace(/\(\s*([A-Za-z_$][\w$]*)\s*\)\s*=>/g, '$1=>')
    .replace(/,(\s*[)\]}])/g, '$1')
    .replace(/[\s;]/g, '');
}
