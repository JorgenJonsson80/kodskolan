import { jsString, LEARN, page, pick, PROTECT } from '../page';

// Personalschema: personal i rader, veckodagar i kolumner, och ett pass i
// varje ruta.
export const schema = {
  id: 'schema',
  icon: '🗓️',
  title: 'Personalschema',
  description: 'Vem jobbar när? En vecka i taget, med passen i färg.',
  defaultName: 'Personalschema',
  features: [
    {
      id: 'pass',
      label: 'Olika pass med färger',
      hint: 'Förmiddag, eftermiddag och kväll – i stället för bara "jobbar".',
      default: true,
    },
    {
      id: 'timmar',
      label: 'Räkna timmar',
      hint: 'Hur många timmar varje person jobbar i veckan.',
      default: true,
    },
    {
      id: 'helger',
      label: 'Helger',
      hint: 'Ta med lördag och söndag.',
      default: false,
    },
    {
      id: 'veckor',
      label: 'Bläddra mellan veckor',
      hint: 'Ett schema per vecka, med knappar för förra och nästa.',
      default: true,
    },
    {
      id: 'spara',
      label: 'Kom ihåg allt',
      hint: 'Schemat finns kvar när du öppnar appen igen.',
      default: true,
    },
    {
      id: 'utskrift',
      label: 'Skriv ut',
      hint: 'En knapp som skriver ut schemat, utan knappar och menyer.',
      default: false,
    },
  ],

  build({ name, theme, accent, features: on }) {
    const days = on.helger
      ? "['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag']"
      : "['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag']";
    const shifts = on.pass
      ? `{
  fm: { namn: 'Förmiddag', tid: '06–14', timmar: 8, farg: '#fde68a' },
  em: { namn: 'Eftermiddag', tid: '14–22', timmar: 8, farg: '#bfdbfe' },
  kv: { namn: 'Kväll', tid: '18–23', timmar: 5, farg: '#ddd6fe' },
}`
      : `{
  jobb: { namn: 'Jobbar', tid: '', timmar: 8, farg: '#bbf7d0' },
}`;

    const parts = pick([
      [
        true,
        {
          title: 'Datan: personalen och schemat',
          text: 'Appen minns allt i två variabler. personal är en lista med namn, och schema säger vilket pass varje person har varje dag. Allt du ser på skärmen ritas från de två.',
          code: `let personal = ['Ada', 'Bo', 'Cy'];\nlet schema = {};`,
          learn: LEARN.js,
        },
      ],
      [
        true,
        {
          title: 'Passen',
          text: on.pass
            ? 'Varje pass har ett namn, en tid, hur många timmar det är och en färg. Vill du ha ett nattpass lägger du till en rad här.'
            : 'Just nu finns bara ett pass, "Jobbar". Välj "Olika pass med färger" för förmiddag, eftermiddag och kväll.',
          code: `const PASS = ${shifts};`,
          learn: LEARN.js,
        },
      ],
      [
        true,
        {
          title: 'Rita tabellen',
          text: 'Funktionen rita bygger tabellen på nytt varje gång något ändras: en rad per person och en ruta per dag. Det är samma tanke som i React – datan bestämmer vad som syns.',
          code: 'function rita() {\n  // … en rad per person, en ruta per dag\n}',
          learn: LEARN.js,
        },
      ],
      [
        true,
        {
          title: 'Skydda texten',
          text: 'Namnen du skriver in går genom skydda innan de visas. Annars skulle någon kunna skriva in egen HTML eller kod i ett namn.',
          code: PROTECT,
          learn: LEARN.js,
        },
      ],
      [
        on.timmar,
        {
          title: 'Timmarna',
          text: 'För varje person läggs timmarna för alla pass i veckan ihop. Det är en loop som summerar – precis som i övningarna med listor.',
          code: 'function timmarFor(person) {\n  let summa = 0;\n  // … lägg ihop timmarna för varje dag\n  return summa;\n}',
          learn: LEARN.js,
        },
      ],
      [
        on.veckor,
        {
          title: 'Veckorna',
          text: 'Varje vecka har en egen del i schemat, med veckans nummer som nyckel. Knapparna ändrar bara vilken vecka som ritas.',
          code: "function veckoNyckel() {\n  return 'v' + veckonummer(veckansMandag());\n}",
          learn: LEARN.js,
        },
      ],
      [
        on.spara,
        {
          title: 'Spara',
          text: 'localStorage är webbläsarens eget lilla minne. Appen sparar personalen och schemat där efter varje ändring och läser in dem när den startar.',
          code: 'localStorage.setItem(NYCKEL, JSON.stringify({ personal, schema }));',
          learn: LEARN.js,
        },
      ],
      [
        on.utskrift,
        {
          title: 'Utskriften',
          text: 'window.print() öppnar utskriften. En egen stil för utskrift (@media print) gömmer knapparna, så att bara schemat kommer med på papperet.',
          code: '@media print {\n  .ingen-utskrift { display: none; }\n}',
          learn: LEARN.html,
        },
      ],
    ]);

    const css = `
table { width: 100%; border-collapse: collapse; }
th, td {
  padding: 8px;
  border-bottom: 1px solid var(--kant);
  text-align: left;
  vertical-align: middle;
}
th { color: var(--dampad); font-size: 0.85rem; font-weight: 600; }
.tabell { overflow-x: auto; }
td select { width: 100%; min-width: 92px; }
.namn { font-weight: 700; white-space: nowrap; }
.ta-bort {
  margin-left: 6px;
  padding: 0 6px;
  border: none;
  background: transparent;
  color: var(--dampad);
}
${on.timmar ? '.timmar { font-weight: 700; text-align: right; white-space: nowrap; }' : ''}
${on.veckor ? '.vecka { margin: 0 8px; font-weight: 700; }' : ''}
${on.utskrift ? '@media print {\n  body { padding: 0; background: #fff; }\n  .ingen-utskrift { display: none !important; }\n  .ruta { border: none; }\n}' : ''}
`;

    const body = `
<h1>${name.replace(/</g, '&lt;')}</h1>
<p class="under">Välj ett pass i varje ruta. ${on.spara ? 'Allt sparas automatiskt.' : ''}</p>

<div class="ruta rad ingen-utskrift">
  <input id="nytt-namn" placeholder="Namn" aria-label="Namn på ny person">
  <button id="lagg-till">Lägg till person</button>
  ${on.veckor ? '<span class="rad" style="margin-left:auto"><button class="diskret" id="forra">← Förra</button><span class="vecka" id="vecka"></span><button class="diskret" id="nasta">Nästa →</button></span>' : ''}
  ${on.utskrift ? '<button class="diskret" id="skriv-ut">🖨️ Skriv ut</button>' : ''}
</div>

<div class="ruta tabell">
  <table>
    <thead id="huvud"></thead>
    <tbody id="rader"></tbody>
  </table>
</div>
`;

    const script = [
      `// ${name} – byggd i Kodskolans Byggstudion.`,
      `const DAGAR = ${days};`,
      `// Passen: namn, tid, hur många timmar och färgen i schemat.\nconst PASS = ${shifts};`,
      `// Datan: personalen och vilket pass var och en har varje dag.\nlet personal = ['Ada', 'Bo', 'Cy'];\nlet schema = {};`,
      on.spara &&
        `// Spara i webbläsarens minne (localStorage), så att allt finns kvar.
const NYCKEL = ${jsString(`kodskolan-app-${name}`)};

function spara() {
  localStorage.setItem(NYCKEL, JSON.stringify({ personal, schema }));
}

function ladda() {
  const sparat = JSON.parse(localStorage.getItem(NYCKEL) || 'null');
  if (sparat) {
    personal = sparat.personal;
    schema = sparat.schema;
  }
}`,
      !on.spara && 'function spara() {}',
      PROTECT,
      on.veckor
        ? `// Vilken vecka som visas: 0 är den här veckan, -1 förra och så vidare.
let vecka = 0;

function veckansMandag() {
  const dag = new Date();
  dag.setHours(12, 0, 0, 0);
  dag.setDate(dag.getDate() - ((dag.getDay() + 6) % 7) + vecka * 7);
  return dag;
}

// Veckonumret som i almanackan (ISO-vecka).
function veckonummer(datum) {
  const torsdag = new Date(datum);
  torsdag.setDate(torsdag.getDate() + 3);
  const forstaJanuari = new Date(torsdag.getFullYear(), 0, 1);
  return Math.ceil(((torsdag - forstaJanuari) / 86400000 + 1) / 7);
}

function veckoNyckel() {
  const mandag = veckansMandag();
  return mandag.getFullYear() + '-v' + veckonummer(mandag);
}`
        : `function veckoNyckel() {\n  return 'vecka';\n}`,
      `// Passet en person har en dag, eller '' om ingen.
function passFor(person, dag) {
  const veckan = schema[veckoNyckel()] || {};
  return (veckan[person] || {})[dag] || '';
}

function valjPass(person, dag, pass) {
  const nyckel = veckoNyckel();
  schema[nyckel] = schema[nyckel] || {};
  schema[nyckel][person] = schema[nyckel][person] || {};
  schema[nyckel][person][dag] = pass;
  spara();
  rita();
}`,
      on.timmar &&
        `// Hur många timmar en person jobbar den här veckan.
function timmarFor(person) {
  let summa = 0;
  for (const dag of DAGAR) {
    const pass = PASS[passFor(person, dag)];
    if (pass) summa += pass.timmar;
  }
  return summa;
}`,
      `// Ritar hela tabellen från datan.
function rita() {
  ${on.veckor ? "document.getElementById('vecka').textContent = 'Vecka ' + veckonummer(veckansMandag());" : ''}
  document.getElementById('huvud').innerHTML =
    '<tr><th>Namn</th>' +
    DAGAR.map(dag => '<th>' + dag + '</th>').join('') +
    ${on.timmar ? "'<th>Timmar</th>' +" : ''}
    '</tr>';

  const rader = personal.map(person => {
    const rutor = DAGAR.map(dag => {
      const vald = passFor(person, dag);
      const farg = vald ? PASS[vald].farg : 'transparent';
      const val = Object.entries(PASS)
        .map(([id, pass]) =>
          '<option value="' + id + '"' + (id === vald ? ' selected' : '') + '>' +
          pass.namn + (pass.tid ? ' ' + pass.tid : '') + '</option>')
        .join('');
      return '<td><select data-person="' + skydda(person) + '" data-dag="' + dag +
        '" style="background:' + farg + (vald ? ';color:#111827' : '') + '"><option value="">–</option>' + val + '</select></td>';
    }).join('');
    return '<tr><td class="namn">' + skydda(person) +
      '<button class="ta-bort ingen-utskrift" data-ta-bort="' + skydda(person) +
      '" aria-label="Ta bort ' + skydda(person) + '">✕</button></td>' + rutor +
      ${on.timmar ? "'<td class=\"timmar\">' + timmarFor(person) + ' h</td>' +" : ''}
      '</tr>';
  });
  document.getElementById('rader').innerHTML = rader.join('');
}`,
      `// Lägg till och ta bort personal.
function laggTillPerson() {
  const falt = document.getElementById('nytt-namn');
  const namn = falt.value.trim();
  if (!namn || personal.includes(namn)) return;
  personal.push(namn);
  falt.value = '';
  spara();
  rita();
}

function taBortPerson(namn) {
  if (!confirm('Ta bort ' + namn + '?')) return;
  personal = personal.filter(person => person !== namn);
  spara();
  rita();
}`,
      `// Knapparna och valen i tabellen.
document.getElementById('lagg-till').addEventListener('click', laggTillPerson);
document.getElementById('nytt-namn').addEventListener('keydown', event => {
  if (event.key === 'Enter') laggTillPerson();
});
document.getElementById('rader').addEventListener('change', event => {
  const ruta = event.target;
  valjPass(ruta.dataset.person, ruta.dataset.dag, ruta.value);
});
document.getElementById('rader').addEventListener('click', event => {
  const namn = event.target.dataset.taBort;
  if (namn) taBortPerson(namn);
});`,
      on.veckor &&
        `document.getElementById('forra').addEventListener('click', () => {
  vecka -= 1;
  rita();
});
document.getElementById('nasta').addEventListener('click', () => {
  vecka += 1;
  rita();
});`,
      on.utskrift &&
        "document.getElementById('skriv-ut').addEventListener('click', () => window.print());",
      `// Starta appen.\n${on.spara ? 'ladda();\n' : ''}rita();`,
    ]
      .filter(Boolean)
      .join('\n\n');

    return { html: page({ name, theme, accent, css, body, script }), parts };
  },
};
