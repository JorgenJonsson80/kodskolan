import { parse } from '@babel/parser';
import { transform } from 'sucrase';

// Översätter JSX till vanliga funktionsanrop:
//   <h1>Hej</h1>  →  __React.createElement('h1', null, 'Hej')
// __React skickas in när koden körs, så att eleven själv kan
// skriva import React from 'react' utan att namnen krockar.
export function transformJsx(code) {
  if (!/<\s*[A-Za-z>]/.test(code)) return code;
  return transform(code, {
    transforms: ['jsx'],
    jsxPragma: '__React.createElement',
    jsxFragmentPragma: '__React.Fragment',
    production: true,
    // Behåll ?? och ?. som de är. Annars lägger sucrase till
    // hjälpfunktioner först i filen, före elevens import-rader.
    disableESTransforms: true,
  }).code;
}

// Sucrase hittar inte alla fel, t.ex. <h1>Hej</h2>. Babels parser
// kontrollerar koden ordentligt och kastar SyntaxError vid fel.
export function checkSyntax(code) {
  parse(code, { sourceType: 'module', plugins: ['jsx'] });
}
