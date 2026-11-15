import { accentById, themeById } from './themes';

// Bygger en hel app som en enda HTML-fil: stilen, sidan och skriptet.
// Allt står i samma fil med svenska kommentarer, så att den går att läsa
// och ladda ner. parts är delarna som förklaras under "Så funkar den".

const BASE_CSS = `
* { box-sizing: border-box; }
body {
  margin: 0;
  padding: 24px 16px 48px;
  background: var(--bakgrund);
  color: var(--text);
  font-family: var(--typsnitt);
  line-height: 1.5;
}
main { max-width: 960px; margin: 0 auto; }
h1 { margin: 0 0 4px; font-size: 1.8rem; }
.under { margin: 0 0 20px; color: var(--dampad); }
.ruta {
  padding: 16px;
  margin-bottom: 16px;
  background: var(--yta);
  border: 1px solid var(--kant);
  border-radius: var(--rundning);
}
button, input, select {
  font: inherit;
  color: inherit;
}
input, select {
  padding: 8px 10px;
  border: 1px solid var(--kant);
  border-radius: calc(var(--rundning) / 2);
  background: var(--yta);
}
button {
  padding: 8px 14px;
  border: 1px solid var(--accent);
  border-radius: calc(var(--rundning) / 2);
  background: var(--accent);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
button.diskret {
  background: transparent;
  color: var(--accent);
}
.rad { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.dampad { color: var(--dampad); }
`;

export function page({ name, theme, accent, css, body, script }) {
  const vars = themeById(theme).vars;
  const variables = Object.entries({
    ...vars,
    accent: accentById(accent).color,
  })
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');
  return `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(name)}</title>
<style>
/* Färgerna och typsnittet – byt här för att ändra utseendet. */
:root {
${variables}
}
${BASE_CSS.trim()}
${css.trim()}
</style>
</head>
<body>
<main>
${body.trim()}
</main>
<script>
${script.trim()}
</script>
</body>
</html>
`;
}

export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// För namn som hamnar i en JavaScript-sträng i appen.
export const jsString = text => JSON.stringify(String(text));

// Delarna som valts, i ordning: [villkor, del]. Delar utan villkor är alltid
// med.
export const pick = list => list.filter(([on]) => on).map(([, part]) => part);

// Skyddar text som eleven skriver in innan den sätts in i sidan, så att
// ingen kan skriva in egen HTML. Står i varje app.
export const PROTECT = `// Gör om text så att den visas som text och aldrig blir HTML.
function skydda(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}`;

// Länkar till kurserna, för "Lär dig mer".
export const LEARN = {
  html: { label: 'HTML & CSS', href: 'kurser/html/' },
  js: { label: 'JavaScript', href: 'kurser/js/' },
};
