// Bana 2: typade funktioner. Parametrarna måste ha typer (strict), och
// returtypen är ett löfte som TypeScript håller funktionen till.

export const FUNKTIONER = [
  {
    id: 'funktioner-01',
    track: 'funktioner',
    title: 'Typade parametrar',
    xp: 10,
    description:
      'En funktion säger vilken typ varje parameter ska ha. Då kan ingen anropa den med fel sak.',
    explain:
      "Typen skrivs efter parameterns namn, precis som för en variabel: `function dubbla(tal: number)`.\n\nAnropar någon `dubbla('5')` blir det ett typfel direkt – i JavaScript hade det blivit `'55'` eller `NaN` långt senare.",
    example:
      'function dubbla(tal: number) {\n  return tal * 2;\n}\n\ndubbla(4); // 8',
    task: 'Uppgift: Skriv funktionen `halva` som tar ett `tal` av typen `number` och returnerar hälften.',
    starterCode: '// Skriv din kod här\n',
    solution: 'function halva(tal: number) {\n  return tal / 2;\n}\n',
    hints: [
      'Som dubbla i exemplet, men delat med 2.',
      'Parametern behöver typen number.',
      'function halva(tal: number) {\n  return tal / 2;\n}',
    ],
    tests: [
      { description: 'halva(10) är 5', code: 'halva(10)', expected: 5 },
      { description: 'halva(3) är 1.5', code: 'halva(3)', expected: 1.5 },
    ],
    typeTests: [
      { description: 'halva tar ett tal', code: 'halva(8);' },
      {
        description: "halva('10') ger typfel",
        code: "halva('10');",
        fails: true,
      },
    ],
  },
  {
    id: 'funktioner-02',
    track: 'funktioner',
    title: 'Parametern utan typ',
    xp: 10,
    description:
      'Glömmer du typen på en parameter säger TypeScript till. Den vägrar gissa.',
    explain:
      'För en variabel kan TypeScript se typen på värdet. Men en parameter får sitt värde först när funktionen anropas, så TypeScript kan inte veta vad den är.\n\nUtan typ blir den `any` – vad som helst – och då kontrolleras ingenting. I strikt läge, som här och i de flesta riktiga projekt, är det ett fel.',
    example: "function hej(namn: string) {\n  return 'Hej ' + namn;\n}",
    task: 'Uppgift: Laga funktionen så att `namn` har en typ.',
    starterCode:
      "function rop(namn) {\n  return namn.toUpperCase() + '!';\n}\n",
    solution:
      "function rop(namn: string) {\n  return namn.toUpperCase() + '!';\n}\n",
    hints: [
      'Läs felet: namn saknar typ.',
      'namn används med toUpperCase – vilken typ har det?',
      'function rop(namn: string) {',
    ],
    tests: [
      {
        description: "rop('hej') är 'HEJ!'",
        code: "rop('hej')",
        expected: 'HEJ!',
      },
    ],
    typeTests: [
      { description: 'rop vill ha text', code: 'rop(5);', fails: true },
    ],
  },
  {
    id: 'funktioner-03',
    track: 'funktioner',
    title: 'Returtypen',
    xp: 15,
    description:
      'Efter parentesen kan du skriva vad funktionen lovar att returnera.',
    explain:
      'Returtypen står efter parametrarna: `function moms(pris: number): number`. TypeScript kan ofta räkna ut den själv, men skriver du den blir den ett löfte.\n\nRåkar funktionen returnera fel sak säger TypeScript till inne i funktionen, där felet är – inte där den används.',
    example: 'function kvadrat(x: number): number {\n  return x * x;\n}',
    task: 'Uppgift: Skriv `moms` som tar `pris` (`number`), har returtypen `number` och returnerar 25 % av priset.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'function moms(pris: number): number {\n  return pris * 0.25;\n}\n',
    hints: [
      '25 % är 0.25.',
      'Returtypen skrivs efter ) med ett kolon.',
      'function moms(pris: number): number {\n  return pris * 0.25;\n}',
    ],
    tests: [
      { description: 'moms(100) är 25', code: 'moms(100)', expected: 25 },
      { description: 'moms(80) är 20', code: 'moms(80)', expected: 20 },
    ],
    typeTests: [
      { description: 'moms ger ett tal', code: 'const m: number = moms(10);' },
    ],
    sourceChecks: [
      { description: 'Returtypen är skriven', pattern: /\)\s*:\s*number\s*\{/ },
    ],
  },
  {
    id: 'funktioner-04',
    track: 'funktioner',
    title: 'Ett löfte som inte hålls',
    xp: 15,
    description:
      'Funktionen lovar att returnera text, men det finns en väg genom den som inte returnerar något.',
    explain:
      'Med returtypen `string` måste **varje** väg genom funktionen returnera en text. Om `poang` är under 50 här når funktionen slutet utan `return`, och då blir svaret `undefined`.\n\nTypeScript ser det och säger till – det är ett fel som annars är lätt att missa.',
    example:
      "function storlek(cm: number): string {\n  if (cm > 180) {\n    return 'lång';\n  }\n  return 'inte lång';\n}",
    task: "Uppgift: Laga `betyg` så att den returnerar `'Underkänd'` när poängen är under 50.",
    starterCode:
      "function betyg(poang: number): string {\n  if (poang >= 50) {\n    return 'Godkänd';\n  }\n}\n",
    solution:
      "function betyg(poang: number): string {\n  if (poang >= 50) {\n    return 'Godkänd';\n  }\n  return 'Underkänd';\n}\n",
    hints: [
      'Vad returnerar funktionen om poang är 10?',
      'Lägg till en return efter if-satsen.',
      "return 'Underkänd';",
    ],
    tests: [
      {
        description: "betyg(70) är 'Godkänd'",
        code: 'betyg(70)',
        expected: 'Godkänd',
      },
      {
        description: "betyg(10) är 'Underkänd'",
        code: 'betyg(10)',
        expected: 'Underkänd',
      },
    ],
  },
  {
    id: 'funktioner-05',
    track: 'funktioner',
    title: 'Valfria parametrar',
    xp: 15,
    description:
      'Ett frågetecken efter namnet gör parametern valfri. Då får man hoppa över den.',
    explain:
      "Med `titel?: string` får funktionen anropas både som `halsa('Ada')` och `halsa('Ada', 'Dr.')`.\n\nNär parametern hoppas över är den `undefined`. Därför måste funktionen kolla om den finns innan den används – TypeScript påminner dig om det.",
    example:
      "function namnskylt(namn: string, avdelning?: string) {\n  if (avdelning) {\n    return namn + ', ' + avdelning;\n  }\n  return namn;\n}",
    task: 'Uppgift: Skriv `halsa(namn: string, titel?: string)`. Med titel ska den returnera `` `Hej ${titel} ${namn}` ``, utan titel `` `Hej ${namn}` ``.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'function halsa(namn: string, titel?: string) {\n  if (titel) {\n    return `Hej ${titel} ${namn}`;\n  }\n  return `Hej ${namn}`;\n}\n',
    hints: [
      'Frågetecknet står före kolonet: titel?: string',
      'Kolla med if (titel) om den finns.',
      'if (titel) {\n    return `Hej ${titel} ${namn}`;\n  }\n  return `Hej ${namn}`;',
    ],
    tests: [
      {
        description: "halsa('Ada') är 'Hej Ada'",
        code: "halsa('Ada')",
        expected: 'Hej Ada',
      },
      {
        description: "halsa('Ada', 'Dr.') är 'Hej Dr. Ada'",
        code: "halsa('Ada', 'Dr.')",
        expected: 'Hej Dr. Ada',
      },
    ],
    typeTests: [
      { description: 'titel går att hoppa över', code: "halsa('Bo');" },
      {
        description: 'titel måste vara text',
        code: "halsa('Bo', 3);",
        fails: true,
      },
    ],
    sourceChecks: [
      { description: 'titel är valfri', pattern: /titel\s*\?\s*:\s*string/ },
    ],
  },
  {
    id: 'funktioner-06',
    track: 'funktioner',
    title: 'Standardvärden',
    xp: 15,
    description:
      'Ett standardvärde gör parametern valfri – och TypeScript räknar ut typen från värdet.',
    explain:
      '`function pris(belopp: number, moms = 0.25)` betyder att `moms` blir `0.25` om den inte skickas med.\n\nDu behöver inte skriva `moms: number`. TypeScript ser att standardvärdet är ett tal, så `moms` får typen `number`. Försöker någon skicka text blir det typfel.',
    example:
      "function hej(namn = 'du') {\n  return 'Hej ' + namn;\n}\n\nhej();      // 'Hej du'\nhej('Bo');  // 'Hej Bo'",
    task: 'Uppgift: Skriv `medMoms(belopp: number, moms = 0.25)` som returnerar `belopp * (1 + moms)`.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'function medMoms(belopp: number, moms = 0.25) {\n  return belopp * (1 + moms);\n}\n',
    hints: [
      'Två parametrar, den andra med = 0.25.',
      'moms behöver ingen skriven typ.',
      'return belopp * (1 + moms);',
    ],
    tests: [
      {
        description: 'medMoms(100) är 125',
        code: 'medMoms(100)',
        expected: 125,
      },
      {
        description: 'medMoms(200, 0.5) är 300',
        code: 'medMoms(200, 0.5)',
        expected: 300,
      },
    ],
    typeTests: [
      {
        description: 'moms är ett number',
        code: "medMoms(100, 'låg');",
        fails: true,
      },
    ],
    sourceChecks: [
      {
        description: 'moms har standardvärdet 0.25',
        pattern: /moms\s*=\s*0?\.25/,
      },
    ],
  },
  {
    id: 'funktioner-07',
    track: 'funktioner',
    title: 'void – inget svar',
    xp: 15,
    description:
      'En funktion som bara gör något, som att skriva ut, returnerar inget. Dess returtyp heter `void`.',
    explain:
      '`void` betyder "returnerar inget användbart". Det är vanligt för funktioner som skriver ut, sparar eller ändrar något.\n\nMed returtypen `void` säger TypeScript till om någon försöker använda svaret som om det vore text eller ett tal.',
    example: "function pip(): void {\n  console.log('pip!');\n}",
    task: 'Uppgift: Skriv `logga(text: string): void` som skriver ut `` `[logg] ${text}` `` med `console.log`.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'function logga(text: string): void {\n  console.log(`[logg] ${text}`);\n}\n',
    hints: [
      'Returtypen är void.',
      'Inget return behövs.',
      'console.log(`[logg] ${text}`);',
    ],
    tests: [
      {
        description: "logga('start') skriver ut '[logg] start'",
        code: "(logga('start'), __logs)",
        expected: ['[logg] start'],
      },
    ],
    typeTests: [
      {
        description: 'Svaret går inte att använda som text',
        code: "const svar: string = logga('a');",
        fails: true,
      },
    ],
    sourceChecks: [
      { description: 'Returtypen är void', pattern: /\)\s*:\s*void/ },
    ],
  },
  {
    id: 'funktioner-08',
    track: 'funktioner',
    title: 'Pilfunktioner med typer',
    xp: 15,
    description: 'Pilfunktioner får typer på samma sätt.',
    explain:
      'Parametern får typen inom parentesen, och returtypen står efter den: `(x: number): number => x * x`.\n\nMed en typ måste parentesen vara med, även när det bara finns en parameter.',
    example: 'const dubbla = (tal: number): number => tal * 2;',
    task: 'Uppgift: Skriv `kvadrat` som en pilfunktion som tar `x` (`number`) och returnerar `x * x`, med returtypen `number`.',
    starterCode: '// Skriv din kod här\n',
    solution: 'const kvadrat = (x: number): number => x * x;\n',
    hints: [
      'const kvadrat = ( … ) => …',
      'Typen inne i parentesen och returtypen efter den.',
      'const kvadrat = (x: number): number => x * x;',
    ],
    tests: [
      { description: 'kvadrat(4) är 16', code: 'kvadrat(4)', expected: 16 },
    ],
    typeTests: [
      {
        description: 'kvadrat vill ha ett tal',
        code: "kvadrat('4');",
        fails: true,
      },
    ],
    sourceChecks: [
      { description: 'kvadrat är en pilfunktion', pattern: /=>/ },
      { description: 'Returtypen är skriven', pattern: /\)\s*:\s*number\s*=>/ },
    ],
  },
  {
    id: 'funktioner-09',
    track: 'funktioner',
    title: 'Funktioner som parameter',
    xp: 20,
    description:
      'En parameter kan vara en funktion. Då skrivs dess typ som en liten pil: `(x: number) => number`.',
    explain:
      '`f: (x: number) => number` betyder "en funktion som tar ett tal och ger ett tal".\n\nNär någon anropar `tillampa(3, x => x + 1)` vet TypeScript redan att `x` är ett tal – det står ju i typen. Därför behöver pilfunktionen i anropet ingen egen typ.',
    example:
      "function tvaGanger(f: () => void) {\n  f();\n  f();\n}\n\ntvaGanger(() => console.log('hej'));",
    task: 'Uppgift: Skriv `tillampa(tal: number, f: (x: number) => number): number` som returnerar `f(tal)`.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'function tillampa(tal: number, f: (x: number) => number): number {\n  return f(tal);\n}\n',
    hints: [
      'Två parametrar: ett tal och en funktion.',
      'Funktionens typ: (x: number) => number',
      'return f(tal);',
    ],
    tests: [
      {
        description: 'tillampa(3, x => x + 1) är 4',
        code: 'tillampa(3, x => x + 1)',
        expected: 4,
      },
      {
        description: 'tillampa(5, x => x * 10) är 50',
        code: 'tillampa(5, x => x * 10)',
        expected: 50,
      },
    ],
    typeTests: [
      {
        description: 'x i anropet är redan ett number',
        code: 'tillampa(2, x => x.toFixed(1).length);',
      },
      {
        description: 'Funktionen måste ge ett tal',
        code: "tillampa(2, x => 'två');",
        fails: true,
      },
    ],
  },
];
