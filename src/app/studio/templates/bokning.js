import { jsString, LEARN, page, pick, PROTECT } from '../page';

// Bokning: välj en dag och en ledig tid och skriv ditt namn.
export const bokning = {
  id: 'bokning',
  icon: '📅',
  title: 'Bokning',
  description:
    'Lediga tider att boka – för frisören, gymmet eller mötesrummet.',
  defaultName: 'Boka en tid',
  features: [
    {
      id: 'platser',
      label: 'Flera platser per tid',
      hint: 'T.ex. ett pass med plats för fyra.',
      default: false,
    },
    {
      id: 'avboka',
      label: 'Avboka',
      hint: 'Ta bort en bokning igen.',
      default: true,
    },
    {
      id: 'helger',
      label: 'Helger',
      hint: 'Går att boka på lördagar och söndagar.',
      default: false,
    },
    {
      id: 'lista',
      label: 'Alla bokningar i en lista',
      hint: 'En översikt under tiderna, sorterad efter dag och tid.',
      default: true,
    },
    {
      id: 'spara',
      label: 'Kom ihåg allt',
      hint: 'Bokningarna finns kvar när du öppnar appen igen.',
      default: true,
    },
    {
      id: 'utskrift',
      label: 'Skriv ut',
      hint: 'Skriv ut dagens bokningar.',
      default: false,
    },
  ],

  build({ name, theme, accent, features: on }) {
    const places = on.platser ? 4 : 1;
    const parts = pick([
      [
        true,
        {
          title: 'Datan: en lista med bokningar',
          text: 'Varje bokning är ett objekt med dag, tid och namn. Om en tid är ledig räknas ut från listan – appen behöver inte minnas något annat.',
          code: "let bokningar = [\n  { dag: '2026-11-20', tid: '10:00', namn: 'Ada' },\n];",
          learn: LEARN.js,
        },
      ],
      [
        true,
        {
          title: 'Tiderna',
          text: 'TIDER är listan med tider som går att boka. Vill du ha halvtimmar eller andra öppettider ändrar du här.',
          code: "const TIDER = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];",
          learn: LEARN.js,
        },
      ],
      [
        true,
        {
          title: 'Hur många har bokat?',
          text: `filter plockar ut bokningarna för en dag och tid, och length säger hur många de är. Är de ${places} är tiden full.`,
          code: 'function antalBokade(dag, tid) {\n  return bokningar.filter(b => b.dag === dag && b.tid === tid).length;\n}',
          learn: LEARN.js,
        },
      ],
      [
        true,
        {
          title: 'Skydda texten',
          text: 'Namnen går genom skydda innan de visas, så att ingen kan skriva in egen HTML.',
          code: PROTECT,
          learn: LEARN.js,
        },
      ],
      [
        on.lista,
        {
          title: 'Listan',
          text: 'Alla bokningar sorteras efter dag och tid. Texterna går att jämföra direkt, eftersom datum och tider står med siffror i rätt ordning.',
          code: '[...bokningar].sort((a, b) => (a.dag + a.tid).localeCompare(b.dag + b.tid));',
          learn: LEARN.js,
        },
      ],
      [
        on.spara,
        {
          title: 'Spara',
          text: 'Bokningarna sparas i webbläsarens minne (localStorage). Vill flera personer boka från olika datorer behövs en server – det lär du dig i Flask-kursen.',
          code: 'localStorage.setItem(NYCKEL, JSON.stringify(bokningar));',
          learn: { label: 'Flask', href: 'kurser/flask/' },
        },
      ],
      [
        on.utskrift,
        {
          title: 'Utskriften',
          text: 'En egen stil för utskrift (@media print) gömmer knapparna, så att bara bokningarna kommer med.',
          code: '@media print {\n  .ingen-utskrift { display: none; }\n}',
          learn: LEARN.html,
        },
      ],
    ]);

    const css = `
.dagar { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; }
.dagar button { flex: none; background: transparent; color: var(--accent); }
.dagar button.vald { background: var(--accent); color: #fff; }
.tider {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}
.tid {
  padding: 12px;
  border: 1px solid var(--kant);
  border-radius: var(--rundning);
}
.tid strong { display: block; font-size: 1.2rem; }
.tid.full { opacity: 0.6; }
.tid .namn { display: block; font-size: 0.9rem; }
.tid button { margin-top: 8px; width: 100%; }
${on.avboka ? '.avboka { margin-left: 4px; padding: 0 4px; border: none; background: transparent; color: var(--dampad); }' : ''}
${on.lista ? '#alla li { padding: 4px 0; }' : ''}
${on.utskrift ? '@media print {\n  body { background: #fff; padding: 0; }\n  .ingen-utskrift { display: none !important; }\n  .ruta { border: none; }\n}' : ''}
`;

    const body = `
<h1>${name.replace(/</g, '&lt;')}</h1>
<p class="under">Välj en dag, skriv ditt namn och boka en ledig tid.</p>

<div class="ruta ingen-utskrift">
  <div class="dagar" id="dagar"></div>
  <div class="rad" style="margin-top:12px">
    <input id="namn" placeholder="Ditt namn" aria-label="Ditt namn">
    ${on.utskrift ? '<button class="diskret" id="skriv-ut">🖨️ Skriv ut</button>' : ''}
  </div>
</div>

<div class="ruta">
  <div class="tider" id="tider"></div>
</div>

${on.lista ? '<div class="ruta">\n  <h2 style="margin-top:0">Alla bokningar</h2>\n  <ul id="alla"></ul>\n</div>' : ''}
`;

    const script = [
      `// ${name} – byggd i Kodskolans Byggstudion.`,
      `// Tiderna som går att boka, och hur många som får plats på varje.
const TIDER = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
const PLATSER = ${places};
const VISA_DAGAR = 7;`,
      `// Datan: alla bokningar.\nlet bokningar = [];`,
      `// Dagen som är vald, t.ex. '2026-11-20'.\nlet valdDag = '';`,
      on.spara &&
        `// Spara i webbläsarens minne (localStorage), så att bokningarna finns kvar.
const NYCKEL = ${jsString(`kodskolan-app-${name}`)};

function spara() {
  localStorage.setItem(NYCKEL, JSON.stringify(bokningar));
}

function ladda() {
  const sparat = JSON.parse(localStorage.getItem(NYCKEL) || 'null');
  if (sparat) bokningar = sparat;
}`,
      !on.spara && 'function spara() {}',
      PROTECT,
      `// Datum som text, t.ex. 2026-11-20, och som "fre 20/11".
function somText(datum) {
  const tvaSiffror = tal => String(tal).padStart(2, '0');
  return datum.getFullYear() + '-' + tvaSiffror(datum.getMonth() + 1) + '-' + tvaSiffror(datum.getDate());
}

function kort(text) {
  const datum = new Date(text + 'T12:00');
  const namn = ['sön', 'mån', 'tis', 'ons', 'tor', 'fre', 'lör'][datum.getDay()];
  return namn + ' ' + datum.getDate() + '/' + (datum.getMonth() + 1);
}

// De kommande dagarna som går att boka.
function bokbaraDagar() {
  const dagar = [];
  const datum = new Date();
  datum.setHours(12, 0, 0, 0);
  while (dagar.length < VISA_DAGAR) {
    const helg = datum.getDay() === 0 || datum.getDay() === 6;
    ${on.helger ? 'dagar.push(somText(datum));' : 'if (!helg) dagar.push(somText(datum));'}
    datum.setDate(datum.getDate() + 1);
  }
  return dagar;
}`,
      `// Bokningarna för en dag och tid.
function bokadeFor(dag, tid) {
  return bokningar.filter(bokning => bokning.dag === dag && bokning.tid === tid);
}

function antalBokade(dag, tid) {
  return bokadeFor(dag, tid).length;
}`,
      `// Ritar dagarna, tiderna${on.lista ? ' och listan' : ''}.
function rita() {
  document.getElementById('dagar').innerHTML = bokbaraDagar()
    .map(dag => '<button data-dag="' + dag + '"' + (dag === valdDag ? ' class="vald"' : '') + '>' + kort(dag) + '</button>')
    .join('');

  document.getElementById('tider').innerHTML = TIDER.map(tid => {
    const bokade = bokadeFor(valdDag, tid);
    const full = bokade.length >= PLATSER;
    const namn = bokade
      .map(bokning => '<span class="namn">' + skydda(bokning.namn) +
        ${on.avboka ? `'<button class="avboka ingen-utskrift" data-avboka="' + bokningar.indexOf(bokning) + '" aria-label="Avboka">✕</button>' +` : ''}
        '</span>')
      .join('');
    return '<div class="tid' + (full ? ' full' : '') + '"><strong>' + tid + '</strong>' +
      ${on.platser ? `'<span class="dampad">' + (PLATSER - bokade.length) + ' av ' + PLATSER + ' platser kvar</span>' +` : ''}
      namn +
      (full ? '' : '<button class="ingen-utskrift" data-boka="' + tid + '">Boka</button>') +
      '</div>';
  }).join('');
  ${
    on.lista
      ? `
  const sorterade = [...bokningar].sort((a, b) => (a.dag + a.tid).localeCompare(b.dag + b.tid));
  document.getElementById('alla').innerHTML = sorterade.length
    ? sorterade.map(bokning => '<li>' + kort(bokning.dag) + ' ' + bokning.tid + ' – ' + skydda(bokning.namn) + '</li>').join('')
    : '<li class="dampad">Inga bokningar än.</li>';`
      : ''
  }
}`,
      `// Boka en tid med namnet i fältet.
function boka(tid) {
  const falt = document.getElementById('namn');
  const namn = falt.value.trim();
  if (!namn) {
    alert('Skriv ditt namn först.');
    falt.focus();
    return;
  }
  if (antalBokade(valdDag, tid) >= PLATSER) return;
  bokningar.push({ dag: valdDag, tid, namn });
  spara();
  rita();
}

document.getElementById('dagar').addEventListener('click', event => {
  if (!event.target.dataset.dag) return;
  valdDag = event.target.dataset.dag;
  rita();
});
document.getElementById('tider').addEventListener('click', event => {
  if (event.target.dataset.boka) boka(event.target.dataset.boka);
  ${on.avboka ? "if (event.target.dataset.avboka !== undefined && confirm('Avboka?')) {\n    bokningar.splice(Number(event.target.dataset.avboka), 1);\n    spara();\n    rita();\n  }" : ''}
});`,
      on.utskrift &&
        "document.getElementById('skriv-ut').addEventListener('click', () => window.print());",
      `// Starta appen på den första dagen.\n${on.spara ? 'ladda();\n' : ''}valdDag = bokbaraDagar()[0];\nrita();`,
    ]
      .filter(Boolean)
      .join('\n\n');

    return { html: page({ name, theme, accent, css, body, script }), parts };
  },
};
