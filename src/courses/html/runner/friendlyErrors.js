// Förklarar fel på svenska. HTML kraschar aldrig – webbläsaren gissar
// sig fram i stället – så felen här kommer från testerna. Nya regler för
// vanliga misstag (en tagg som aldrig stängs …) läggs till i RULES.

const RULES = [
  {
    pattern: /is not a valid selector|SyntaxError/,
    text: () =>
      'Testet kunde inte läsa sidan. Det är troligen vårt fel och inte ditt – prova att ladda om sidan.',
  },
];

// error: { type, message, line } från checkPage
export function explainError(error) {
  const rule = RULES.map(({ pattern, text }) => {
    const match = error.message.match(pattern);
    return match && text(match);
  }).find(Boolean);
  return rule ?? 'Något gick fel när sidan rättades.';
}

export function errorTitle(error, isSyntax) {
  const where = error.line ? ` på rad ${error.line}` : '';
  return isSyntax
    ? `Webbläsaren kunde inte läsa koden${where}`
    : `Något gick fel${where}`;
}
