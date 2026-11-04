// Riktig Streamlit i webbläsaren med stlite, för ▶ Öppna appen. Det är
// cirka 30 MB första gången, så det laddas bara när eleven trycker.
// Rättningen använder inte stlite utan låtsasmodulen i harness.py.
export const STLITE_URL =
  'https://cdn.jsdelivr.net/npm/@stlite/browser@1.12.0/build/';

export const usesStreamlit = code =>
  /^\s*(import\s+streamlit\b|from\s+streamlit\b)/m.test(code);

// JSON i en <script> får inte innehålla </script>, så < blir <.
const scriptJson = value => JSON.stringify(value).replace(/</g, '\\u003c');

// Sidan i iframen: stlite kör app.py med elevens kod och datafilerna.
export function stliteDocument(code, files = {}) {
  const all = { ...files, 'app.py': code };
  return `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="${STLITE_URL}stlite.css">
<style>body { margin: 0; }</style>
</head>
<body>
<div id="root"></div>
<script type="module">
import { mount } from '${STLITE_URL}stlite.js';
mount({ requirements: [], entrypoint: 'app.py', files: ${scriptJson(all)} }, document.getElementById('root'));
</script>
</body>
</html>`;
}
