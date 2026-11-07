// Bana 7: sorterade fall. En union av objekt som skiljs åt av en egenskap
// (kind, typ, ok). TypeScript smalnar av i varje case och kan med never
// påminna om fall man glömt.

const FORMER =
  "type Cirkel = { kind: 'cirkel'; radie: number };\ntype Kvadrat = { kind: 'kvadrat'; sida: number };\ntype Form = Cirkel | Kvadrat;\n";

export const FALL = [
  {
    id: 'fall-01',
    track: 'fall',
    title: 'Objekt med en etikett',
    xp: 15,
    description:
      'När en union består av objekt kan en gemensam egenskap, som `kind`, säga vilket sorts objekt det är.',
    explain:
      "Både `Cirkel` och `Kvadrat` har `kind`, men med olika värden. Kollar du `f.kind === 'cirkel'` vet TypeScript att `f` är en `Cirkel` – och att den har en `radie`.\n\nDet kallas en **diskriminerad union**. Egenskapen kan heta vad som helst, men `kind` och `type` är vanligast.",
    example:
      "type Hund = { art: 'hund'; ras: string };\ntype Katt = { art: 'katt'; inne: boolean };\n\nfunction beskriv(d: Hund | Katt) {\n  if (d.art === 'hund') {\n    return d.ras;\n  }\n  return d.inne ? 'innekatt' : 'utekatt';\n}",
    task: 'Uppgift: Skriv `area(f: Form): number`. En cirkel har arean `Math.PI * radie * radie`, en kvadrat `sida * sida`.',
    starterCode: FORMER,
    solution: `${FORMER}\nfunction area(f: Form): number {\n  if (f.kind === 'cirkel') {\n    return Math.PI * f.radie * f.radie;\n  }\n  return f.sida * f.sida;\n}\n`,
    hints: [
      "if (f.kind === 'cirkel') { … }",
      'Inne i if är f en Cirkel och har radie.',
      'return f.sida * f.sida; efter if.',
    ],
    tests: [
      {
        description: 'En kvadrat med sidan 3',
        code: "area({ kind: 'kvadrat', sida: 3 })",
        expected: 9,
      },
      {
        description: 'En cirkel med radien 1',
        code: "Math.round(area({ kind: 'cirkel', radie: 1 }) * 100)",
        expected: 314,
      },
    ],
    typeTests: [
      {
        description: 'En cirkel har ingen sida',
        code: "const c: Cirkel = { kind: 'cirkel', sida: 2 };",
        fails: true,
      },
    ],
  },
  {
    id: 'fall-02',
    track: 'fall',
    title: 'switch på etiketten',
    xp: 15,
    description: 'Med fler fall blir en `switch` tydligare än många if-satser.',
    explain:
      "`switch (f.kind)` med ett `case` per värde. TypeScript smalnar av i varje case: i `case 'rektangel':` är `f` en `Rektangel`.\n\nEditorn föreslår till och med vilka värden som finns efter `case`.",
    example:
      "switch (d.art) {\n  case 'hund':\n    return d.ras;\n  case 'katt':\n    return 'katt';\n}",
    task: "Uppgift: Lägg till `type Rektangel = { kind: 'rektangel'; bredd: number; hojd: number }` i `Form`, och skriv `area` med en `switch`.",
    starterCode:
      "type Cirkel = { kind: 'cirkel'; radie: number };\ntype Kvadrat = { kind: 'kvadrat'; sida: number };\n",
    solution:
      "type Cirkel = { kind: 'cirkel'; radie: number };\ntype Kvadrat = { kind: 'kvadrat'; sida: number };\ntype Rektangel = { kind: 'rektangel'; bredd: number; hojd: number };\ntype Form = Cirkel | Kvadrat | Rektangel;\n\nfunction area(f: Form): number {\n  switch (f.kind) {\n    case 'cirkel':\n      return Math.PI * f.radie * f.radie;\n    case 'kvadrat':\n      return f.sida * f.sida;\n    case 'rektangel':\n      return f.bredd * f.hojd;\n  }\n}\n",
    hints: [
      'type Form = Cirkel | Kvadrat | Rektangel;',
      'switch (f.kind) { case … }',
      "case 'rektangel':\n      return f.bredd * f.hojd;",
    ],
    tests: [
      {
        description: 'En rektangel 2 × 5',
        code: "area({ kind: 'rektangel', bredd: 2, hojd: 5 })",
        expected: 10,
      },
      {
        description: 'En kvadrat',
        code: "area({ kind: 'kvadrat', sida: 4 })",
        expected: 16,
      },
    ],
    typeTests: [
      {
        description: 'En Rektangel är en Form',
        code: "const f: Form = { kind: 'rektangel', bredd: 1, hojd: 1 };",
      },
    ],
    sourceChecks: [
      { description: 'Använder switch', pattern: /switch\s*\(\s*f\.kind\s*\)/ },
    ],
  },
  {
    id: 'fall-03',
    track: 'fall',
    title: 'Fallet som saknas',
    xp: 15,
    description:
      'Någon har lagt till en triangel i `Form`, men `area` vet inte om det.',
    explain:
      'Funktionen lovar att returnera ett `number`. När `Form` kan vara en triangel och switchen saknar det fallet, finns det en väg där inget returneras.\n\nTypeScript säger "Function lacks ending return statement". Felet står vid funktionen, men orsaken är det nya fallet i typen.',
    example: "case 'triangel':\n  return (f.bas * f.hojd) / 2;",
    task: 'Uppgift: Laga `area` så att den klarar trianglar: arean är `bas * hojd / 2`.',
    starterCode:
      "type Kvadrat = { kind: 'kvadrat'; sida: number };\ntype Triangel = { kind: 'triangel'; bas: number; hojd: number };\ntype Form = Kvadrat | Triangel;\n\nfunction area(f: Form): number {\n  switch (f.kind) {\n    case 'kvadrat':\n      return f.sida * f.sida;\n  }\n}\n",
    solution:
      "type Kvadrat = { kind: 'kvadrat'; sida: number };\ntype Triangel = { kind: 'triangel'; bas: number; hojd: number };\ntype Form = Kvadrat | Triangel;\n\nfunction area(f: Form): number {\n  switch (f.kind) {\n    case 'kvadrat':\n      return f.sida * f.sida;\n    case 'triangel':\n      return (f.bas * f.hojd) / 2;\n  }\n}\n",
    hints: [
      'Vilket fall saknas i switchen?',
      "case 'triangel':",
      'return (f.bas * f.hojd) / 2;',
    ],
    tests: [
      {
        description: 'En triangel',
        code: "area({ kind: 'triangel', bas: 4, hojd: 3 })",
        expected: 6,
      },
    ],
  },
  {
    id: 'fall-04',
    track: 'fall',
    title: 'never',
    xp: 20,
    description:
      '`never` är typen för något som aldrig kan hända. Den kan vakta att alla fall är med.',
    explain:
      'Efter alla case är `f` av typen `never` – det finns inget kvar. Skriver du `const koll: never = f;` i `default` fungerar det bara om alla fall är hanterade.\n\nLägger någon senare till en ny form blir det typfel just där, med namnet på det som saknas. Det kallas **uttömmande kontroll** (exhaustiveness check).',
    example: 'default: {\n  const koll: never = f;\n  return koll;\n}',
    task: 'Uppgift: Lägg till ett `default` i `area` som sparar `f` i `const koll: never` och returnerar `koll`.',
    starterCode: `${FORMER}\nfunction area(f: Form): number {\n  switch (f.kind) {\n    case 'cirkel':\n      return Math.PI * f.radie * f.radie;\n    case 'kvadrat':\n      return f.sida * f.sida;\n  }\n}\n`,
    solution: `${FORMER}\nfunction area(f: Form): number {\n  switch (f.kind) {\n    case 'cirkel':\n      return Math.PI * f.radie * f.radie;\n    case 'kvadrat':\n      return f.sida * f.sida;\n    default: {\n      const koll: never = f;\n      return koll;\n    }\n  }\n}\n`,
    hints: [
      'default: { … } sist i switchen.',
      'const koll: never = f;',
      'return koll;',
    ],
    tests: [
      {
        description: 'Kvadraten fungerar',
        code: "area({ kind: 'kvadrat', sida: 2 })",
        expected: 4,
      },
    ],
    sourceChecks: [
      { description: 'Har const koll: never', pattern: /:\s*never\s*=\s*f/ },
    ],
  },
  {
    id: 'fall-05',
    track: 'fall',
    title: 'never hittar det glömda',
    xp: 15,
    description:
      'En ny sorts form har lagts till. Felet syns vid `never` – och säger vad som glömts.',
    explain:
      "Felet säger ungefär \"Type 'Triangel' is not assignable to type 'never'\". Det betyder: en `Triangel` kan nå hit, så alla fall är inte hanterade.\n\nSå hittar TypeScript varje switch i hela programmet som behöver ett nytt fall när en typ växer.",
    example: "case 'triangel':\n  return (f.bas * f.hojd) / 2;",
    task: 'Uppgift: Lägg till fallet som saknas.',
    starterCode:
      "type Kvadrat = { kind: 'kvadrat'; sida: number };\ntype Triangel = { kind: 'triangel'; bas: number; hojd: number };\ntype Form = Kvadrat | Triangel;\n\nfunction namn(f: Form): string {\n  switch (f.kind) {\n    case 'kvadrat':\n      return 'Kvadrat';\n    default: {\n      const koll: never = f;\n      return koll;\n    }\n  }\n}\n",
    solution:
      "type Kvadrat = { kind: 'kvadrat'; sida: number };\ntype Triangel = { kind: 'triangel'; bas: number; hojd: number };\ntype Form = Kvadrat | Triangel;\n\nfunction namn(f: Form): string {\n  switch (f.kind) {\n    case 'kvadrat':\n      return 'Kvadrat';\n    case 'triangel':\n      return 'Triangel';\n    default: {\n      const koll: never = f;\n      return koll;\n    }\n  }\n}\n",
    hints: [
      'Läs felet: vilken typ når default?',
      "case 'triangel':",
      "return 'Triangel';",
    ],
    tests: [
      {
        description: 'Triangeln har ett namn',
        code: "namn({ kind: 'triangel', bas: 1, hojd: 1 })",
        expected: 'Triangel',
      },
    ],
  },
  {
    id: 'fall-06',
    track: 'fall',
    title: 'Betalningen',
    xp: 20,
    description:
      'Samma idé fungerar för allt som kan vara en av flera sorter, som sätt att betala.',
    explain:
      'Varje betalsätt har sina egna uppgifter: ett kort har ett nummer, Swish ett telefonnummer och en faktura ett antal dagar. Med `typ` som etikett vet TypeScript vilka uppgifter som finns i varje fall.\n\nTypen kan skrivas direkt som en union av objekt, utan namn på varje del.',
    example:
      "type Leverans =\n  | { satt: 'hem'; adress: string }\n  | { satt: 'ombud'; ombud: string };",
    task: 'Uppgift: Skriv `beskriv(b: Betalning): string`: kort ger `` `Kort som slutar på ${…}` `` (de fyra sista siffrorna), swish `` `Swish till ${telefon}` `` och faktura `` `Faktura, ${dagar} dagar` ``.',
    starterCode:
      "type Betalning =\n  | { typ: 'kort'; nummer: string }\n  | { typ: 'swish'; telefon: string }\n  | { typ: 'faktura'; dagar: number };\n",
    solution:
      "type Betalning =\n  | { typ: 'kort'; nummer: string }\n  | { typ: 'swish'; telefon: string }\n  | { typ: 'faktura'; dagar: number };\n\nfunction beskriv(b: Betalning): string {\n  switch (b.typ) {\n    case 'kort':\n      return `Kort som slutar på ${b.nummer.slice(-4)}`;\n    case 'swish':\n      return `Swish till ${b.telefon}`;\n    case 'faktura':\n      return `Faktura, ${b.dagar} dagar`;\n  }\n}\n",
    hints: [
      'switch (b.typ)',
      'slice(-4) ger de fyra sista tecknen.',
      "case 'faktura':\n      return `Faktura, ${b.dagar} dagar`;",
    ],
    tests: [
      {
        description: 'Kort',
        code: "beskriv({ typ: 'kort', nummer: '1234567812345678' })",
        expected: 'Kort som slutar på 5678',
      },
      {
        description: 'Swish',
        code: "beskriv({ typ: 'swish', telefon: '070-123' })",
        expected: 'Swish till 070-123',
      },
      {
        description: 'Faktura',
        code: "beskriv({ typ: 'faktura', dagar: 30 })",
        expected: 'Faktura, 30 dagar',
      },
    ],
    typeTests: [
      {
        description: 'Swish har inget nummer',
        code: "const b: Betalning = { typ: 'swish', nummer: '1' };",
        fails: true,
      },
    ],
  },
  {
    id: 'fall-07',
    track: 'fall',
    title: 'Lyckades det?',
    xp: 20,
    description:
      'Etiketten kan vara `true` eller `false`. Så kan en funktion svara antingen med ett värde eller med ett fel.',
    explain:
      '`{ ok: true; varde: number } | { ok: false; fel: string }` är ett vanligt mönster. Den som får svaret måste kolla `ok` innan den läser `varde` – annars blir det typfel.\n\nInget kastas och inget kraschar: felet är en vanlig del av svaret.',
    example:
      "function las(text: string): Resultat {\n  const n = Number(text);\n  if (Number.isNaN(n)) {\n    return { ok: false, fel: 'Inget tal' };\n  }\n  return { ok: true, varde: n };\n}",
    task: "Uppgift: Skriv `dela(a: number, b: number): Resultat`. Med `b` lika med `0` blir det `{ ok: false, fel: 'Kan inte dela med noll' }`, annars `{ ok: true, varde: a / b }`.",
    starterCode:
      'type Resultat = { ok: true; varde: number } | { ok: false; fel: string };\n',
    solution:
      "type Resultat = { ok: true; varde: number } | { ok: false; fel: string };\n\nfunction dela(a: number, b: number): Resultat {\n  if (b === 0) {\n    return { ok: false, fel: 'Kan inte dela med noll' };\n  }\n  return { ok: true, varde: a / b };\n}\n",
    hints: [
      'if (b === 0) { … }',
      "return { ok: false, fel: 'Kan inte dela med noll' };",
      'return { ok: true, varde: a / b };',
    ],
    tests: [
      {
        description: 'dela(6, 3)',
        code: 'dela(6, 3)',
        expected: { ok: true, varde: 2 },
      },
      {
        description: 'dela(1, 0)',
        code: 'dela(1, 0)',
        expected: { ok: false, fel: 'Kan inte dela med noll' },
      },
    ],
    typeTests: [
      {
        description: 'varde går inte att läsa utan att kolla ok',
        code: 'const v: number = dela(1, 1).varde;',
        fails: true,
      },
      {
        description: 'Efter koll av ok går det',
        code: 'const r = dela(1, 1);\nif (r.ok) { const v: number = r.varde; }',
      },
    ],
  },
  {
    id: 'fall-08',
    track: 'fall',
    title: 'Händelser',
    xp: 20,
    description:
      'Ett program som tar emot händelser – klick, knapptryck, meddelanden – kan beskriva varje sort med en etikett.',
    explain:
      'En räknare kan få händelsen "öka med 3" eller "nollställ". Bara den första har ett antal.\n\nFunktionen tar det nuvarande värdet och en händelse, och ger det nya värdet. Samma mönster används i React (`useReducer`) och i många appar.',
    example:
      "type Knapp = { typ: 'tryck'; tangent: string } | { typ: 'släpp' };",
    task: "Uppgift: Skriv `rakna(nu: number, h: Handelse): number`: `'plus'` lägger till `antal`, `'minus'` drar ifrån `antal` och `'nollstall'` ger `0`.",
    starterCode:
      "type Handelse =\n  | { typ: 'plus'; antal: number }\n  | { typ: 'minus'; antal: number }\n  | { typ: 'nollstall' };\n",
    solution:
      "type Handelse =\n  | { typ: 'plus'; antal: number }\n  | { typ: 'minus'; antal: number }\n  | { typ: 'nollstall' };\n\nfunction rakna(nu: number, h: Handelse): number {\n  switch (h.typ) {\n    case 'plus':\n      return nu + h.antal;\n    case 'minus':\n      return nu - h.antal;\n    case 'nollstall':\n      return 0;\n  }\n}\n",
    hints: [
      'switch (h.typ)',
      "case 'plus':\n      return nu + h.antal;",
      "case 'nollstall':\n      return 0;",
    ],
    tests: [
      {
        description: 'plus 3',
        code: "rakna(5, { typ: 'plus', antal: 3 })",
        expected: 8,
      },
      {
        description: 'minus 2',
        code: "rakna(5, { typ: 'minus', antal: 2 })",
        expected: 3,
      },
      {
        description: 'nollställ',
        code: "rakna(5, { typ: 'nollstall' })",
        expected: 0,
      },
      {
        description: 'Flera händelser efter varandra',
        code: "[{ typ: 'plus', antal: 4 }, { typ: 'minus', antal: 1 }].reduce(rakna, 0)",
        expected: 3,
      },
    ],
    typeTests: [
      {
        description: 'nollstall har inget antal',
        code: "rakna(1, { typ: 'nollstall', antal: 1 });",
        fails: true,
      },
    ],
  },
  {
    id: 'fall-09',
    track: 'fall',
    title: 'Sortera ut ett fall',
    xp: 20,
    description:
      '`filter` på etiketten ger en lista med bara den sorten – och TypeScript vet vilken.',
    explain:
      "`former.filter(f => f.kind === 'cirkel')` ger en `Cirkel[]`. TypeScript ser vad filtret kollar, precis som med `typeof` i bana 5.\n\nDärför kan `map(c => c.radie)` läsa `radie` utan fler kontroller.",
    example: "const hundar = djur.filter(d => d.art === 'hund');",
    task: 'Uppgift: Skapa `cirklar` med bara cirklarna i `former`, och `radier` med deras radier.',
    starterCode: `${FORMER}\nconst former: Form[] = [\n  { kind: 'cirkel', radie: 2 },\n  { kind: 'kvadrat', sida: 3 },\n  { kind: 'cirkel', radie: 5 },\n];\n`,
    solution: `${FORMER}\nconst former: Form[] = [\n  { kind: 'cirkel', radie: 2 },\n  { kind: 'kvadrat', sida: 3 },\n  { kind: 'cirkel', radie: 5 },\n];\n\nconst cirklar = former.filter(f => f.kind === 'cirkel');\nconst radier = cirklar.map(c => c.radie);\n`,
    hints: [
      "former.filter(f => f.kind === 'cirkel')",
      'Håll musen över cirklar – det är en Cirkel[].',
      'const radier = cirklar.map(c => c.radie);',
    ],
    tests: [
      { description: 'radier är [2, 5]', code: 'radier', expected: [2, 5] },
    ],
    typeTests: [
      {
        description: 'cirklar är en Cirkel[]',
        code: 'const k: Cirkel[] = cirklar;',
      },
    ],
  },
];
