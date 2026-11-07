// Bana 13: slutprojektet. Bokningsappen för hundpensionatet byggs från
// typerna till React, en övning i taget. Varje startkod har det som
// byggts hittills, så att övningarna går att göra i vilken ordning som
// helst.

const HUND =
  "type Storlek = 'liten' | 'mellan' | 'stor';\ntype Hund = { id: number; namn: string; storlek: Storlek; agare: string };\n";
const HUNDAR =
  "const hundar: Hund[] = [\n  { id: 1, namn: 'Bamse', storlek: 'stor', agare: 'Ada' },\n  { id: 2, namn: 'Saga', storlek: 'liten', agare: 'Bo' },\n];\n";
const BOKNING =
  "type Status = 'preliminar' | 'bekraftad' | 'avbokad';\ntype Bokning = { id: number; hundId: number; fran: string; till: string; status: Status };\n";
const TYPER = `${HUND}${BOKNING}`;
const PRISER =
  'const PRIS_PER_NATT: Record<Storlek, number> = { liten: 250, mellan: 300, stor: 350 };\n';
const NATTER =
  'function natter(fran: string, till: string): number {\n  const dag = 24 * 60 * 60 * 1000;\n  return Math.round((new Date(till).getTime() - new Date(fran).getTime()) / dag);\n}\n';
const PRIS =
  "function pris(b: Bokning, hund: Hund): number {\n  if (b.status === 'avbokad') {\n    return 0;\n  }\n  return natter(b.fran, b.till) * PRIS_PER_NATT[hund.storlek];\n}\n";
const RESULTAT =
  'type Resultat = { ok: true; bokning: Bokning } | { ok: false; fel: string };\n';
const BOKA =
  "function boka(bokningar: Bokning[], ny: Omit<Bokning, 'id' | 'status'>): Resultat {\n  if (ny.till <= ny.fran) {\n    return { ok: false, fel: 'Fel datum' };\n  }\n  const krock = bokningar.some(\n    b =>\n      b.hundId === ny.hundId &&\n      b.status !== 'avbokad' &&\n      ny.fran < b.till &&\n      b.fran < ny.till,\n  );\n  if (krock) {\n    return { ok: false, fel: 'Redan bokad' };\n  }\n  return { ok: true, bokning: { ...ny, id: bokningar.length + 1, status: 'preliminar' } };\n}\n";
const STATUS_TEXT =
  "const STATUS_TEXT: Record<Status, string> = {\n  preliminar: 'Preliminär',\n  bekraftad: 'Bekräftad',\n  avbokad: 'Avbokad',\n};\n";
const BOKNINGAR =
  "const bokningar: Bokning[] = [\n  { id: 1, hundId: 1, fran: '2026-06-10', till: '2026-06-13', status: 'bekraftad' },\n  { id: 2, hundId: 2, fran: '2026-06-11', till: '2026-06-12', status: 'preliminar' },\n  { id: 3, hundId: 2, fran: '2026-07-01', till: '2026-07-05', status: 'avbokad' },\n];\n";

export const SLUTPROJEKT = [
  {
    id: 'slutprojekt-01',
    track: 'slutprojekt',
    title: 'Hundarna',
    xp: 15,
    description:
      'Hundpensionatet Tassen behöver en bokningsapp. Allt börjar med typerna: vad är en hund?',
    explain:
      'I ett riktigt projekt skriver man ofta typerna först. De blir en karta över vad appen handlar om, och resten av koden följer dem.\n\nStorleken styr priset, så den får bara vara tre värden.',
    example:
      "type Farg = 'svart' | 'vit';\ntype Katt = { namn: string; farg: Farg };",
    task: "Uppgift: Skapa `type Storlek = 'liten' | 'mellan' | 'stor'` och `type Hund = { id: number; namn: string; storlek: Storlek; agare: string }`. Skapa `hundar: Hund[]` med Bamse (1, stor, Ada) och Saga (2, liten, Bo).",
    starterCode: '// Bokningsappen för hundpensionatet Tassen\n',
    solution: `// Bokningsappen för hundpensionatet Tassen\n${HUND}\n${HUNDAR}`,
    hints: [
      'Två typer och en lista.',
      'storlek: Storlek i Hund.',
      "{ id: 1, namn: 'Bamse', storlek: 'stor', agare: 'Ada' }",
    ],
    tests: [
      {
        description: 'Två hundar',
        code: 'hundar.map(h => h.namn)',
        expected: ['Bamse', 'Saga'],
      },
    ],
    typeTests: [
      {
        description: "'jätte' är ingen storlek",
        code: "const h: Hund = { id: 3, namn: 'X', storlek: 'jätte', agare: 'Y' };",
        fails: true,
      },
    ],
  },
  {
    id: 'slutprojekt-02',
    track: 'slutprojekt',
    title: 'Bokningen',
    xp: 15,
    description:
      'En bokning gäller en hund mellan två datum, och har en status.',
    explain:
      "Datumen sparas som text, `'2026-06-10'`. Den formen sorteras och jämförs rätt även som text.\n\nStatusen är en union, så att en bokning aldrig kan vara `'kanske'`.",
    example: "type Svar = 'ja' | 'nej';",
    task: "Uppgift: Skapa `type Status = 'preliminar' | 'bekraftad' | 'avbokad'` och `type Bokning = { id: number; hundId: number; fran: string; till: string; status: Status }`.",
    starterCode: HUND,
    solution: `${HUND}${BOKNING}`,
    hints: [
      'Status är en union av tre texter.',
      'hundId: number pekar på hunden.',
      'type Bokning = { id: number; hundId: number; fran: string; till: string; status: Status };',
    ],
    tests: [],
    typeTests: [
      {
        description: 'En bokning',
        code: "const b: Bokning = { id: 1, hundId: 1, fran: '2026-06-10', till: '2026-06-12', status: 'bekraftad' };",
      },
      {
        description: "'kanske' är ingen status",
        code: "const s: Status = 'kanske';",
        fails: true,
      },
      {
        description: 'En bokning måste ha status',
        code: "const b: Bokning = { id: 1, hundId: 1, fran: 'a', till: 'b' };",
        fails: true,
      },
    ],
  },
  {
    id: 'slutprojekt-03',
    track: 'slutprojekt',
    title: 'Prislistan',
    xp: 10,
    description: 'Priset per natt beror på hundens storlek.',
    explain:
      '`Record<Storlek, number>` gör att varje storlek måste ha ett pris. Lägger pensionatet senare till `xl` säger TypeScript att prislistan saknar den.',
    example:
      "const ljud: Record<'katt' | 'hund', string> = { katt: 'mjau', hund: 'voff' };",
    task: 'Uppgift: Skapa `PRIS_PER_NATT: Record<Storlek, number>`: liten 250, mellan 300 och stor 350.',
    starterCode: TYPER,
    solution: `${TYPER}\n${PRISER}`,
    hints: [
      'Record<Storlek, number>',
      'Tre nycklar.',
      'const PRIS_PER_NATT: Record<Storlek, number> = { liten: 250, mellan: 300, stor: 350 };',
    ],
    tests: [
      {
        description: 'Stor kostar 350',
        code: 'PRIS_PER_NATT.stor',
        expected: 350,
      },
    ],
  },
  {
    id: 'slutprojekt-04',
    track: 'slutprojekt',
    title: 'Antal nätter',
    xp: 15,
    description: 'Hur många nätter är det mellan två datum?',
    explain:
      "`new Date('2026-06-10').getTime()` ger antalet millisekunder sedan 1970. Skillnaden delat med millisekunderna på ett dygn blir antalet nätter.\n\n`Math.round` tar bort små fel från sommartid.",
    example:
      "const ms = new Date('2026-01-02').getTime() - new Date('2026-01-01').getTime(); // 86400000",
    task: 'Uppgift: Skriv `natter(fran: string, till: string): number`.',
    starterCode: `${TYPER}\n${PRISER}`,
    solution: `${TYPER}\n${PRISER}\n${NATTER}`,
    hints: [
      'const dag = 24 * 60 * 60 * 1000;',
      'new Date(till).getTime() - new Date(fran).getTime()',
      'Dela med dag och avrunda.',
    ],
    tests: [
      {
        description: '10–13 juni är 3 nätter',
        code: "natter('2026-06-10', '2026-06-13')",
        expected: 3,
      },
      {
        description: 'Över ett månadsskifte',
        code: "natter('2026-06-29', '2026-07-02')",
        expected: 3,
      },
    ],
  },
  {
    id: 'slutprojekt-05',
    track: 'slutprojekt',
    title: 'Priset',
    xp: 15,
    description: 'Vad kostar en bokning? En avbokad bokning kostar ingenting.',
    explain:
      'Funktionen behöver både bokningen (datumen) och hunden (storleken). Typerna gör att de inte kan skickas i fel ordning.',
    example: "if (b.status === 'avbokad') {\n  return 0;\n}",
    task: 'Uppgift: Skriv `pris(b: Bokning, hund: Hund): number`: nätter gånger priset för hundens storlek, eller `0` om bokningen är avbokad.',
    starterCode: `${TYPER}\n${PRISER}\n${NATTER}`,
    solution: `${TYPER}\n${PRISER}\n${NATTER}\n${PRIS}`,
    hints: [
      "if (b.status === 'avbokad') { return 0; }",
      'PRIS_PER_NATT[hund.storlek]',
      'return natter(b.fran, b.till) * PRIS_PER_NATT[hund.storlek];',
    ],
    tests: [
      {
        description: 'Bamse 3 nätter',
        code: "pris({ id: 1, hundId: 1, fran: '2026-06-10', till: '2026-06-13', status: 'bekraftad' }, { id: 1, namn: 'Bamse', storlek: 'stor', agare: 'Ada' })",
        expected: 1050,
      },
      {
        description: 'Avbokad',
        code: "pris({ id: 1, hundId: 1, fran: '2026-06-10', till: '2026-06-13', status: 'avbokad' }, { id: 1, namn: 'Bamse', storlek: 'stor', agare: 'Ada' })",
        expected: 0,
      },
    ],
  },
  {
    id: 'slutprojekt-06',
    track: 'slutprojekt',
    title: 'Kvittot',
    xp: 15,
    description:
      'Kvittot behöver hundens namn. Hunden hittas med sitt id – om den finns.',
    explain:
      '`find` kan ge `undefined`, så kvittot måste klara att hunden saknas. TypeScript ser till att det inte glöms bort.',
    example: 'const h = hundar.find(h => h.id === 1);',
    task: "Uppgift: Skriv `kvitto(b: Bokning, hundar: Hund[]): string` som ger t.ex. `'Bamse: 3 nätter, 1050 kr'`, eller `'Okänd hund'`.",
    starterCode: `${TYPER}\n${PRISER}\n${NATTER}\n${PRIS}`,
    solution: `${TYPER}\n${PRISER}\n${NATTER}\n${PRIS}\nfunction kvitto(b: Bokning, hundar: Hund[]): string {\n  const hund = hundar.find(h => h.id === b.hundId);\n  if (hund === undefined) {\n    return 'Okänd hund';\n  }\n  return \`\${hund.namn}: \${natter(b.fran, b.till)} nätter, \${pris(b, hund)} kr\`;\n}\n`,
    hints: [
      'const hund = hundar.find(h => h.id === b.hundId);',
      "if (hund === undefined) { return 'Okänd hund'; }",
      'Använd natter och pris i texten.',
    ],
    tests: [
      {
        description: 'Bamses kvitto',
        code: "kvitto({ id: 1, hundId: 1, fran: '2026-06-10', till: '2026-06-13', status: 'bekraftad' }, [{ id: 1, namn: 'Bamse', storlek: 'stor', agare: 'Ada' }])",
        expected: 'Bamse: 3 nätter, 1050 kr',
      },
      {
        description: 'Okänd hund',
        code: "kvitto({ id: 1, hundId: 9, fran: '2026-06-10', till: '2026-06-13', status: 'bekraftad' }, [])",
        expected: 'Okänd hund',
      },
    ],
  },
  {
    id: 'slutprojekt-07',
    track: 'slutprojekt',
    title: 'Boka',
    xp: 25,
    description:
      'En ny bokning kontrolleras: datumen måste vara rätt, och hunden får inte redan vara bokad samma nätter.',
    explain:
      "Den nya bokningen har inget `id` eller `status` än – det sätter `boka`. `Omit<Bokning, 'id' | 'status'>` är precis det som behövs.\n\nTvå bokningar krockar om den ena börjar innan den andra slutar, och tvärtom. Avbokade räknas inte.\n\nSvaret är en `Resultat`, som i bana 7.",
    example: 'const krock = ny.fran < b.till && b.fran < ny.till;',
    task: "Uppgift: Skriv `boka(bokningar: Bokning[], ny: Omit<Bokning, 'id' | 'status'>): Resultat`. Fel ger `'Fel datum'` (till är inte efter från) eller `'Redan bokad'`. Annars får bokningen id `bokningar.length + 1` och status `'preliminar'`.",
    starterCode: `${TYPER}\n${RESULTAT}`,
    solution: `${TYPER}\n${RESULTAT}\n${BOKA}`,
    hints: [
      "if (ny.till <= ny.fran) { return { ok: false, fel: 'Fel datum' }; }",
      "bokningar.some(b => b.hundId === ny.hundId && b.status !== 'avbokad' && ny.fran < b.till && b.fran < ny.till)",
      "return { ok: true, bokning: { ...ny, id: bokningar.length + 1, status: 'preliminar' } };",
    ],
    tests: [
      {
        description: 'Fel datum',
        code: "boka([], { hundId: 1, fran: '2026-06-12', till: '2026-06-10' })",
        expected: { ok: false, fel: 'Fel datum' },
      },
      {
        description: 'Redan bokad',
        code: "boka([{ id: 1, hundId: 1, fran: '2026-06-10', till: '2026-06-13', status: 'bekraftad' }], { hundId: 1, fran: '2026-06-12', till: '2026-06-14' })",
        expected: { ok: false, fel: 'Redan bokad' },
      },
      {
        description: 'En avbokad krockar inte',
        code: "boka([{ id: 1, hundId: 1, fran: '2026-06-10', till: '2026-06-13', status: 'avbokad' }], { hundId: 1, fran: '2026-06-12', till: '2026-06-14' }).ok",
        expected: true,
      },
      {
        description: 'Bokad',
        code: "boka([], { hundId: 2, fran: '2026-06-10', till: '2026-06-11' })",
        expected: {
          ok: true,
          bokning: {
            hundId: 2,
            fran: '2026-06-10',
            till: '2026-06-11',
            id: 1,
            status: 'preliminar',
          },
        },
      },
    ],
    typeTests: [
      {
        description: 'Den nya bokningen har ingen status',
        code: "boka([], { hundId: 1, fran: 'a', till: 'b', status: 'bekraftad' });",
        fails: true,
      },
    ],
  },
  {
    id: 'slutprojekt-08',
    track: 'slutprojekt',
    title: 'Bokningskortet',
    xp: 20,
    description: 'Nu får appen ett ansikte: ett kort som visar en bokning.',
    explain:
      'Komponenten får både bokningen och hunden som props. Statusen visas med en text från `STATUS_TEXT`, ett `Record<Status, string>` – så att ingen status blir utan text.',
    example: 'type Props = { bokning: Bokning; hund: Hund };',
    task: 'Uppgift: Skriv `BokningsKort({ bokning, hund }: Props)` som visar en `<article>` med `<h3>` (hundens namn), `<p>` med `` `${fran} – ${till}` `` och en `<p>` med statustexten.',
    starterCode: `${TYPER}\n${STATUS_TEXT}`,
    solution: `${TYPER}\n${STATUS_TEXT}\ntype Props = { bokning: Bokning; hund: Hund };\n\nfunction BokningsKort({ bokning, hund }: Props) {\n  return (\n    <article>\n      <h3>{hund.namn}</h3>\n      <p>{\`\${bokning.fran} – \${bokning.till}\`}</p>\n      <p>{STATUS_TEXT[bokning.status]}</p>\n    </article>\n  );\n}\n`,
    hints: [
      'type Props = { bokning: Bokning; hund: Hund };',
      '<h3>{hund.namn}</h3>',
      '<p>{STATUS_TEXT[bokning.status]}</p>',
    ],
    tests: [
      {
        description: 'Bamses kort',
        code: "__render(<BokningsKort bokning={{ id: 1, hundId: 1, fran: '2026-06-10', till: '2026-06-13', status: 'bekraftad' }} hund={{ id: 1, namn: 'Bamse', storlek: 'stor', agare: 'Ada' }} />)",
        expected:
          '<article><h3>Bamse</h3><p>2026-06-10 – 2026-06-13</p><p>Bekräftad</p></article>',
      },
    ],
    typeTests: [
      {
        description: 'Kortet kräver en hund',
        code: "<BokningsKort bokning={{ id: 1, hundId: 1, fran: 'a', till: 'b', status: 'avbokad' }} />;",
        fails: true,
      },
    ],
    preview:
      "<BokningsKort bokning={{ id: 1, hundId: 1, fran: '2026-06-10', till: '2026-06-13', status: 'bekraftad' }} hund={{ id: 1, namn: 'Bamse', storlek: 'stor', agare: 'Ada' }} />",
  },
  {
    id: 'slutprojekt-09',
    track: 'slutprojekt',
    title: 'Filtrera bokningarna',
    xp: 20,
    description:
      'Personalen vill se bara de bekräftade, eller bara de avbokade.',
    explain:
      "Filtret är antingen en `Status` eller `'alla'`. Typen `Status | 'alla'` säger just det, och `useState` behöver få den, för startvärdet `'alla'` räcker inte för TypeScript att gissa resten.",
    example: "const [visa, setVisa] = useState<Status | 'alla'>('alla');",
    task: "Uppgift: Skriv `Bokningar({ lista }: { lista: Bokning[] })` med knapparna `Alla`, `Bekräftade` och `Avbokade`. En `<p>` visar t.ex. `'1 bokningar'` för det valda filtret.",
    starterCode: `import { useState } from 'react';\n\n${TYPER}`,
    solution: `import { useState } from 'react';\n\n${TYPER}\nfunction Bokningar({ lista }: { lista: Bokning[] }) {\n  const [visa, setVisa] = useState<Status | 'alla'>('alla');\n  const valda = lista.filter(b => visa === 'alla' || b.status === visa);\n  return (\n    <div>\n      <button onClick={() => setVisa('alla')}>Alla</button>\n      <button onClick={() => setVisa('bekraftad')}>Bekräftade</button>\n      <button onClick={() => setVisa('avbokad')}>Avbokade</button>\n      <p>{valda.length} bokningar</p>\n    </div>\n  );\n}\n`,
    hints: [
      "useState<Status | 'alla'>('alla')",
      "lista.filter(b => visa === 'alla' || b.status === visa)",
      '<p>{valda.length} bokningar</p>',
    ],
    tests: [
      {
        description: 'Alla',
        code: `(() => { ${BOKNINGAR.replace(/: Bokning\[\]/, '').replace(/\n/g, ' ')} return __mount(<Bokningar lista={bokningar} />).text('p'); })()`,
        expected: '3 bokningar',
      },
      {
        description: 'Avbokade',
        code: `(() => { ${BOKNINGAR.replace(/: Bokning\[\]/, '').replace(/\n/g, ' ')} return __mount(<Bokningar lista={bokningar} />).click('Avbokade').text('p'); })()`,
        expected: '1 bokningar',
      },
    ],
    sourceChecks: [
      {
        description: "useState<Status | 'alla'>",
        pattern: /useState\s*<\s*Status\s*\|\s*'alla'\s*>/,
      },
    ],
    preview: `<Bokningar lista={${BOKNINGAR.slice(BOKNINGAR.indexOf('['), BOKNINGAR.lastIndexOf(']') + 1)}} />`,
  },
];

// Det som byggts i banan, till bossen.
export const SLUTPROJEKT_BAS = `${TYPER}\n${PRISER}\n${NATTER}\n${PRIS}\n${RESULTAT}\n${BOKA}`;
