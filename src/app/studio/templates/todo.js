import { jsString, LEARN, page, pick, PROTECT } from '../page';

// Att göra-lista: lägg till, bocka av, och det man väljer till.
export const todo = {
  id: 'todo',
  icon: '✅',
  title: 'Att göra-lista',
  description: 'Allt som ska göras, på ett ställe. Bocka av när det är klart.',
  defaultName: 'Att göra',
  features: [
    {
      id: 'tabort',
      label: 'Ta bort uppgifter',
      hint: 'En knapp som tar bort en uppgift helt.',
      default: true,
    },
    {
      id: 'filter',
      label: 'Filter',
      hint: 'Visa alla, bara de som är kvar eller bara de klara.',
      default: true,
    },
    {
      id: 'viktig',
      label: 'Viktigt först',
      hint: 'Markera med en stjärna – de viktiga hamnar överst.',
      default: false,
    },
    {
      id: 'datum',
      label: 'Klart senast',
      hint: 'Ett datum per uppgift, rött när det har passerat.',
      default: false,
    },
    {
      id: 'raknare',
      label: 'Räknare',
      hint: '"3 kvar av 5" överst.',
      default: true,
    },
    {
      id: 'spara',
      label: 'Kom ihåg allt',
      hint: 'Listan finns kvar när du öppnar appen igen.',
      default: true,
    },
  ],

  build({ name, theme, accent, features: on }) {
    const parts = pick([
      [
        true,
        {
          title: 'Datan: en lista med uppgifter',
          text: 'Varje uppgift är ett objekt med text och klar (sant eller falskt). Hela appen är en lista med sådana objekt – det du ser ritas från den.',
          code: "let uppgifter = [\n  { text: 'Handla mjölk', klar: false },\n];",
          learn: LEARN.js,
        },
      ],
      [
        true,
        {
          title: 'Rita listan',
          text: 'rita bygger listan på nytt efter varje ändring. Varje uppgift blir en rad med en kryssruta.',
          code: 'function rita() {\n  // … en rad per uppgift\n}',
          learn: LEARN.js,
        },
      ],
      [
        true,
        {
          title: 'Skydda texten',
          text: 'Det du skriver går genom skydda innan det visas, så att ingen kan skriva in egen HTML.',
          code: PROTECT,
          learn: LEARN.js,
        },
      ],
      [
        on.filter,
        {
          title: 'Filtret',
          text: 'filter går igenom listan och behåller bara de uppgifter som passar: alla, de som är kvar eller de klara. Själva listan ändras inte.',
          code: "const synliga = uppgifter.filter(uppgift =>\n  visa === 'kvar' ? !uppgift.klar : visa === 'klara' ? uppgift.klar : true);",
          learn: LEARN.js,
        },
      ],
      [
        on.viktig,
        {
          title: 'Viktigt först',
          text: 'sort ordnar listan: de viktiga före de andra. En jämförelse som ger ett negativt tal betyder "den här först".',
          code: 'synliga.sort((a, b) => Number(b.viktig) - Number(a.viktig));',
          learn: LEARN.js,
        },
      ],
      [
        on.datum,
        {
          title: 'Datumet',
          text: 'Ett datum i formen 2026-11-20 går att jämföra som text. Är det tidigare än i dag är uppgiften sen och blir röd.',
          code: 'const sen = !uppgift.klar && uppgift.datum && uppgift.datum < idag();',
          learn: LEARN.js,
        },
      ],
      [
        on.spara,
        {
          title: 'Spara',
          text: 'Listan sparas i webbläsarens minne (localStorage) som text, med JSON.stringify, och läses in igen med JSON.parse.',
          code: 'localStorage.setItem(NYCKEL, JSON.stringify(uppgifter));',
          learn: LEARN.js,
        },
      ],
    ]);

    const css = `
#lista { list-style: none; margin: 0; padding: 0; }
#lista li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 4px;
  border-bottom: 1px solid var(--kant);
}
#lista li:last-child { border-bottom: none; }
#lista .text { flex: 1; }
#lista .klar .text { color: var(--dampad); text-decoration: line-through; }
#lista input[type="checkbox"] { width: 20px; height: 20px; accent-color: var(--accent); }
.liten { padding: 2px 8px; border: none; background: transparent; color: var(--dampad); }
#ny { flex: 1; min-width: 180px; }
${on.filter ? '.filter button { background: transparent; color: var(--accent); }\n.filter button.vald { background: var(--accent); color: #fff; }' : ''}
${on.viktig ? '.stjarna { font-size: 1.2rem; color: var(--dampad); }\n.stjarna.pa { color: #f59e0b; }' : ''}
${on.datum ? '.datum { font-size: 0.85rem; color: var(--dampad); }\n.sen .datum { color: #dc2626; font-weight: 700; }' : ''}
${on.raknare ? '#raknare { margin: 0 0 12px; font-weight: 700; }' : ''}
`;

    const body = `
<h1>${name.replace(/</g, '&lt;')}</h1>
<p class="under">Skriv en uppgift och tryck på Enter.</p>

<div class="ruta">
  <div class="rad">
    <input id="ny" placeholder="Vad ska göras?" aria-label="Ny uppgift">
    ${on.datum ? '<input id="nytt-datum" type="date" aria-label="Klart senast">' : ''}
    <button id="lagg-till">Lägg till</button>
  </div>
</div>

<div class="ruta">
  ${on.raknare ? '<p id="raknare"></p>' : ''}
  ${on.filter ? '<div class="rad filter" style="margin-bottom:12px"><button data-visa="alla" class="vald">Alla</button><button data-visa="kvar">Kvar</button><button data-visa="klara">Klara</button></div>' : ''}
  <ul id="lista"></ul>
  <p id="tomt" class="dampad">Inget att göra. Skönt! 🎉</p>
</div>
`;

    const script = [
      `// ${name} – byggd i Kodskolans Byggstudion.`,
      `// Datan: en lista med uppgifter.\nlet uppgifter = [\n  { text: 'Prova appen', klar: false${on.viktig ? ', viktig: true' : ''}${on.datum ? ", datum: ''" : ''} },\n];`,
      on.filter &&
        "// Vilka som visas: 'alla', 'kvar' eller 'klara'.\nlet visa = 'alla';",
      on.spara &&
        `// Spara i webbläsarens minne (localStorage), så att listan finns kvar.
const NYCKEL = ${jsString(`kodskolan-app-${name}`)};

function spara() {
  localStorage.setItem(NYCKEL, JSON.stringify(uppgifter));
}

function ladda() {
  const sparat = JSON.parse(localStorage.getItem(NYCKEL) || 'null');
  if (sparat) uppgifter = sparat;
}`,
      !on.spara && 'function spara() {}',
      PROTECT,
      on.datum &&
        `// Dagens datum som text, t.ex. 2026-11-20.
function idag() {
  const nu = new Date();
  const tvaSiffror = tal => String(tal).padStart(2, '0');
  return nu.getFullYear() + '-' + tvaSiffror(nu.getMonth() + 1) + '-' + tvaSiffror(nu.getDate());
}`,
      `// Ritar listan från datan.
function rita() {
  ${on.filter ? "const synliga = uppgifter.filter(uppgift =>\n    visa === 'kvar' ? !uppgift.klar : visa === 'klara' ? uppgift.klar : true);" : 'const synliga = [...uppgifter];'}
  ${on.viktig ? 'synliga.sort((a, b) => Number(Boolean(b.viktig)) - Number(Boolean(a.viktig)));' : ''}
  document.getElementById('lista').innerHTML = synliga.map(uppgift => {
    const plats = uppgifter.indexOf(uppgift);
    const klasser = [uppgift.klar ? 'klar' : ''${on.datum ? ", !uppgift.klar && uppgift.datum && uppgift.datum < idag() ? 'sen' : ''" : ''}].join(' ');
    return '<li class="' + klasser + '">' +
      '<input type="checkbox" data-klar="' + plats + '"' + (uppgift.klar ? ' checked' : '') + ' aria-label="Klar">' +
      ${on.viktig ? `'<button class="liten stjarna' + (uppgift.viktig ? ' pa' : '') + '" data-viktig="' + plats + '" aria-label="Viktig">★</button>' +` : ''}
      '<span class="text">' + skydda(uppgift.text) + '</span>' +
      ${on.datum ? `(uppgift.datum ? '<span class="datum">' + uppgift.datum + '</span>' : '') +` : ''}
      ${on.tabort ? `'<button class="liten" data-ta-bort="' + plats + '" aria-label="Ta bort">✕</button>' +` : ''}
      '</li>';
  }).join('');
  document.getElementById('tomt').hidden = synliga.length > 0;
  ${on.raknare ? "const kvar = uppgifter.filter(uppgift => !uppgift.klar).length;\n  document.getElementById('raknare').textContent = kvar + ' kvar av ' + uppgifter.length;" : ''}
}`,
      `// Lägg till en uppgift.
function laggTill() {
  const falt = document.getElementById('ny');
  const text = falt.value.trim();
  if (!text) return;
  ${on.datum ? "const datumFalt = document.getElementById('nytt-datum');\n  uppgifter.push({ text, klar: false, datum: datumFalt.value });\n  datumFalt.value = '';" : 'uppgifter.push({ text, klar: false });'}
  falt.value = '';
  spara();
  rita();
}

document.getElementById('lagg-till').addEventListener('click', laggTill);
document.getElementById('ny').addEventListener('keydown', event => {
  if (event.key === 'Enter') laggTill();
});`,
      `// Klick i listan: bocka av${on.viktig ? ', stjärnmärk' : ''}${on.tabort ? ', ta bort' : ''}.
document.getElementById('lista').addEventListener('click', event => {
  const knapp = event.target.dataset;
  if (knapp.klar !== undefined) uppgifter[knapp.klar].klar = event.target.checked;
  ${on.viktig ? 'if (knapp.viktig !== undefined) uppgifter[knapp.viktig].viktig = !uppgifter[knapp.viktig].viktig;' : ''}
  ${on.tabort ? 'if (knapp.taBort !== undefined) uppgifter.splice(Number(knapp.taBort), 1);' : ''}
  spara();
  rita();
});`,
      on.filter &&
        `// Filterknapparna.
document.querySelector('.filter').addEventListener('click', event => {
  if (!event.target.dataset.visa) return;
  visa = event.target.dataset.visa;
  for (const knapp of document.querySelectorAll('.filter button')) {
    knapp.classList.toggle('vald', knapp === event.target);
  }
  rita();
});`,
      `// Starta appen.\n${on.spara ? 'ladda();\n' : ''}rita();`,
    ]
      .filter(Boolean)
      .join('\n\n');

    return { html: page({ name, theme, accent, css, body, script }), parts };
  },
};
