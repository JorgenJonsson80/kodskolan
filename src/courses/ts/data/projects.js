import { projectSteps } from '../../../core/projects';

// Projekt som låses upp när en bana är klar. Eleven väljer ett av tre men
// kan göra alla. Varje projekt byggs i steg, och koden från förra steget
// följer med till nästa. why förklarar varför koden ser ut som den gör.
// reward: priset man får när projektet är klart. Facit följer samma
// regler som övningarna (se test/concepts.js).
export const PROJECTS = [
  {
    id: 'proj-profil',
    track: 'typer',
    title: 'Din profil',
    reward: { emoji: '🪪', name: 'Namnbricka' },
    summary:
      'En profil med namn, ålder och medlemskap, där varje värde har rätt typ.',
    steps: [
      {
        title: 'Namn och ålder',
        why: 'Typerna står där värdena skapas. Då behöver ingen gissa senare om alder är talet 30 eller texten "30".',
        xp: 15,
        description: 'En profil börjar med namn och ålder.',
        task: 'Uppgift: Skapa `namn` (`string`) med ditt namn och `alder` (`number`) med din ålder.',
        starterCode: '// Steg 1: namn och ålder\n',
        solution: "let namn: string = 'Ada';\nlet alder: number = 30;\n",
        hints: [
          'Två variabler med typ.',
          'namn är text och alder ett tal.',
          "let namn: string = 'Ada';\nlet alder: number = 30;",
        ],
        tests: [
          {
            description: 'namn är text',
            code: 'typeof namn',
            expected: 'string',
          },
          {
            description: 'alder är ett tal',
            code: 'typeof alder',
            expected: 'number',
          },
        ],
        typeTests: [
          {
            description: 'alder kan inte bli text',
            code: "alder = '30';",
            fails: true,
          },
        ],
        sourceChecks: [
          {
            description: 'namn har typen string',
            pattern: /namn\s*:\s*string/,
          },
          {
            description: 'alder har typen number',
            pattern: /alder\s*:\s*number/,
          },
        ],
      },
      {
        title: 'Medlem',
        why: 'En boolean svarar på en ja- eller nej-fråga. Den är tydligare än texten "ja", som lätt stavas "Ja" eller "JA".',
        xp: 15,
        description: 'Profilen ska visa om man är medlem.',
        task: 'Uppgift: Lägg till `medlem` (`boolean`) med värdet `true`.',
        solution:
          "let namn: string = 'Ada';\nlet alder: number = 30;\nlet medlem: boolean = true;\n",
        hints: [
          'En boolean är true eller false.',
          'Utan citattecken.',
          'let medlem: boolean = true;',
        ],
        tests: [
          { description: 'medlem är true', code: 'medlem', expected: true },
        ],
        sourceChecks: [
          {
            description: 'medlem har typen boolean',
            pattern: /medlem\s*:\s*boolean/,
          },
        ],
      },
      {
        title: 'Presentationen',
        why: 'Template literalen gör om talen till text åt dig, och TypeScript vet att resultatet alltid är en string.',
        xp: 20,
        description: 'Sist en rad som presenterar profilen.',
        task: 'Uppgift: Skapa `presentation` (`string`): `` `${namn}, ${alder} år` ``. Skriv ut den med `console.log`.',
        solution:
          "let namn: string = 'Ada';\nlet alder: number = 30;\nlet medlem: boolean = true;\nconst presentation: string = `${namn}, ${alder} år`;\nconsole.log(presentation);\n",
        hints: [
          'Backticks och ${ } runt namnen.',
          'console.log(presentation);',
          'const presentation: string = `${namn}, ${alder} år`;',
        ],
        tests: [
          {
            description: 'presentation har namn och ålder',
            code: 'presentation === `${namn}, ${alder} år`',
            expected: true,
          },
          {
            description: 'Presentationen skrivs ut',
            code: '__logs.length',
            expected: 1,
          },
        ],
        sourceChecks: [
          {
            description: 'presentation har typen string',
            pattern: /presentation\s*:\s*string/,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-varukorg',
    track: 'typer',
    title: 'Varukorgen',
    reward: { emoji: '🧺', name: 'Korg' },
    summary: 'Räkna ut vad en varukorg kostar, med rabatt och avrundning.',
    steps: [
      {
        title: 'Två varor',
        why: 'summa får ingen skriven typ. TypeScript ser att två tal gånger varandra blir ett tal, och det räcker.',
        xp: 15,
        description: 'Varukorgen har en tröja och en mössa.',
        task: 'Uppgift: Skapa `troja` (`number`, `299`) och `mossa` (`number`, `149`), och `summa` som är båda ihop. Skriv ingen typ på `summa`.',
        starterCode: '// Steg 1: två varor\n',
        solution:
          'const troja: number = 299;\nconst mossa: number = 149;\nconst summa = troja + mossa;\n',
        hints: [
          'Tre variabler.',
          'summa = troja + mossa',
          'const summa = troja + mossa;',
        ],
        tests: [{ description: 'summa är 448', code: 'summa', expected: 448 }],
        typeTests: [
          {
            description: 'summa är ett number',
            code: 'const k: number = summa;',
          },
        ],
        sourceChecks: [
          {
            description: 'summa har ingen skriven typ',
            pattern: /summa\s*:/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Rabatten',
        why: 'Rabatten är ett tal mellan 0 och 1. Math.round ger ett helt antal kronor, och fortfarande ett number.',
        xp: 20,
        description: 'Medlemmar får 10 % rabatt.',
        task: 'Uppgift: Skapa `rabatt` (`0.1`) och `attBetala` som är `summa * (1 - rabatt)` avrundat med `Math.round`.',
        solution:
          'const troja: number = 299;\nconst mossa: number = 149;\nconst summa = troja + mossa;\nconst rabatt = 0.1;\nconst attBetala = Math.round(summa * (1 - rabatt));\n',
        hints: [
          'rabatt är 0.1.',
          'Math.round( … ) runt uträkningen.',
          'const attBetala = Math.round(summa * (1 - rabatt));',
        ],
        tests: [
          { description: 'attBetala är 403', code: 'attBetala', expected: 403 },
        ],
        typeTests: [
          {
            description: 'attBetala är ett number',
            code: 'const k: number = attBetala;',
          },
        ],
      },
      {
        title: 'Kvittot',
        why: 'toFixed ger text, och det är just det vi vill ha på ett kvitto: alltid två decimaler.',
        xp: 20,
        description: 'Kvittot visar priset med två decimaler.',
        task: 'Uppgift: Skapa `kvitto` (`string`): `` `Att betala: ${attBetala.toFixed(2)} kr` ``.',
        solution:
          'const troja: number = 299;\nconst mossa: number = 149;\nconst summa = troja + mossa;\nconst rabatt = 0.1;\nconst attBetala = Math.round(summa * (1 - rabatt));\nconst kvitto: string = `Att betala: ${attBetala.toFixed(2)} kr`;\n',
        hints: [
          'toFixed(2) ger två decimaler.',
          'Inne i ${ }.',
          'const kvitto: string = `Att betala: ${attBetala.toFixed(2)} kr`;',
        ],
        tests: [
          {
            description: "kvitto är 'Att betala: 403.00 kr'",
            code: 'kvitto',
            expected: 'Att betala: 403.00 kr',
          },
        ],
        sourceChecks: [
          {
            description: 'kvitto har typen string',
            pattern: /kvitto\s*:\s*string/,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-termometer',
    track: 'typer',
    title: 'Termometern',
    reward: { emoji: '🌡️', name: 'Termometer' },
    summary:
      'Gör om grader Celsius till Fahrenheit, med en text som säger om det är varmt.',
    steps: [
      {
        title: 'Celsius',
        why: 'Temperaturen läses ofta från en sensor eller ett formulär som text. Number gör om den, och typen number lovar att det blev ett tal.',
        xp: 15,
        description: 'Termometern ger temperaturen som text.',
        task: "Uppgift: `matning` är `'21'`. Skapa `celsius` (`number`) som är `Number(matning)`.",
        starterCode: "// Steg 1: celsius\nconst matning = '21';\n",
        solution:
          "const matning = '21';\nconst celsius: number = Number(matning);\n",
        hints: [
          'Number( … ) gör om text till tal.',
          'Typen number efter namnet.',
          'const celsius: number = Number(matning);',
        ],
        tests: [
          { description: 'celsius är 21', code: 'celsius', expected: 21 },
        ],
        sourceChecks: [
          {
            description: 'celsius har typen number',
            pattern: /celsius\s*:\s*number/,
          },
        ],
      },
      {
        title: 'Fahrenheit',
        why: 'Formeln är bara uträkningar med tal, så TypeScript vet att svaret är ett number.',
        xp: 15,
        description: 'Amerikanska gäster vill ha Fahrenheit.',
        task: 'Uppgift: Skapa `fahrenheit` som är `celsius * 9 / 5 + 32`.',
        solution:
          "const matning = '21';\nconst celsius: number = Number(matning);\nconst fahrenheit = celsius * 9 / 5 + 32;\n",
        hints: [
          'Skriv formeln som den står.',
          'Ingen typ behövs.',
          'const fahrenheit = celsius * 9 / 5 + 32;',
        ],
        tests: [
          {
            description: 'fahrenheit är 69.8',
            code: 'fahrenheit',
            expected: 69.8,
          },
        ],
      },
      {
        title: 'Varmt eller kallt?',
        why: 'arVarmt är en boolean, och villkorsoperatorn väljer text efter den. Båda grenarna är text, så TypeScript vet att resultatet är en string.',
        xp: 20,
        description: 'Termometern säger om det är varmt.',
        task: "Uppgift: Skapa `arVarmt` (`boolean`) som är `celsius >= 20`, och `text` som är `arVarmt ? 'Varmt' : 'Kallt'`.",
        solution:
          "const matning = '21';\nconst celsius: number = Number(matning);\nconst fahrenheit = celsius * 9 / 5 + 32;\nconst arVarmt: boolean = celsius >= 20;\nconst text = arVarmt ? 'Varmt' : 'Kallt';\n",
        hints: [
          'En jämförelse ger en boolean.',
          'condition ? a : b',
          "const text = arVarmt ? 'Varmt' : 'Kallt';",
        ],
        tests: [
          { description: 'arVarmt är true', code: 'arVarmt', expected: true },
          { description: "text är 'Varmt'", code: 'text', expected: 'Varmt' },
        ],
        typeTests: [
          { description: 'text är en string', code: 'const k: string = text;' },
        ],
        sourceChecks: [
          {
            description: 'arVarmt har typen boolean',
            pattern: /arVarmt\s*:\s*boolean/,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-miniraknare',
    track: 'funktioner',
    title: 'Miniräknaren',
    reward: { emoji: '🧮', name: 'Kulram' },
    summary:
      'En miniräknare där varje funktion säger vad den vill ha och vad den ger.',
    steps: [
      {
        title: 'Plus och minus',
        why: "Typerna på parametrarna gör att plus('2', 3) aldrig kan bli '23'. Returtypen lovar ett tal tillbaka.",
        xp: 15,
        description: 'Miniräknaren börjar med två funktioner.',
        task: 'Uppgift: Skriv `plus(a: number, b: number): number` och `minus(a: number, b: number): number`.',
        starterCode: '// Steg 1: plus och minus\n',
        solution:
          'function plus(a: number, b: number): number {\n  return a + b;\n}\n\nfunction minus(a: number, b: number): number {\n  return a - b;\n}\n',
        hints: [
          'Två funktioner med två parametrar var.',
          'Båda parametrarna har typen number.',
          'function plus(a: number, b: number): number {\n  return a + b;\n}',
        ],
        tests: [
          { description: 'plus(2, 3) är 5', code: 'plus(2, 3)', expected: 5 },
          {
            description: 'minus(10, 4) är 6',
            code: 'minus(10, 4)',
            expected: 6,
          },
        ],
        typeTests: [
          {
            description: "plus('2', 3) ger typfel",
            code: "plus('2', 3);",
            fails: true,
          },
        ],
      },
      {
        title: 'Dela utan krasch',
        why: 'Att dela med noll ger Infinity i JavaScript. Returtypen number gäller fortfarande, så vi väljer att ge 0 och säga till.',
        xp: 20,
        description: 'Att dela med noll ska inte ge Infinity.',
        task: 'Uppgift: Skriv `dela(a: number, b: number): number` som ger `a / b`, men `0` när `b` är `0`.',
        solution:
          'function plus(a: number, b: number): number {\n  return a + b;\n}\n\nfunction minus(a: number, b: number): number {\n  return a - b;\n}\n\nfunction dela(a: number, b: number): number {\n  if (b === 0) {\n    return 0;\n  }\n  return a / b;\n}\n',
        hints: [
          'Kolla b först.',
          'if (b === 0) { return 0; }',
          'return a / b; sist.',
        ],
        tests: [
          {
            description: 'dela(10, 4) är 2.5',
            code: 'dela(10, 4)',
            expected: 2.5,
          },
          { description: 'dela(5, 0) är 0', code: 'dela(5, 0)', expected: 0 },
        ],
      },
      {
        title: 'Räkna med text',
        why: 'Talen från ett formulär är text. Number gör om dem, och sedan tar funktionerna vid med rätt typer.',
        xp: 20,
        description: 'Talen kommer från två textfält.',
        task: 'Uppgift: Skriv `raknaText(a: string, b: string): number` som gör om båda till tal och returnerar `plus` av dem.',
        solution:
          'function plus(a: number, b: number): number {\n  return a + b;\n}\n\nfunction minus(a: number, b: number): number {\n  return a - b;\n}\n\nfunction dela(a: number, b: number): number {\n  if (b === 0) {\n    return 0;\n  }\n  return a / b;\n}\n\nfunction raknaText(a: string, b: string): number {\n  return plus(Number(a), Number(b));\n}\n',
        hints: [
          'Parametrarna är text den här gången.',
          'Number(a) gör om till ett tal.',
          'return plus(Number(a), Number(b));',
        ],
        tests: [
          {
            description: "raknaText('2', '3') är 5",
            code: "raknaText('2', '3')",
            expected: 5,
          },
        ],
        typeTests: [
          {
            description: 'raknaText vill ha text',
            code: 'raknaText(2, 3);',
            fails: true,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-lon',
    track: 'funktioner',
    title: 'Lönekollen',
    reward: { emoji: '💰', name: 'Pengapåse' },
    summary: 'Räkna ut lön före och efter skatt, med standardvärden.',
    steps: [
      {
        title: 'Lön per månad',
        why: 'Funktionen säger vad den vill ha: timlön och antal timmar. Ingen kan råka skicka ett namn i stället.',
        xp: 15,
        description: 'Lönen är timlönen gånger antalet timmar.',
        task: 'Uppgift: Skriv `brutto(timlon: number, timmar: number): number`.',
        starterCode: '// Steg 1: lön per månad\n',
        solution:
          'function brutto(timlon: number, timmar: number): number {\n  return timlon * timmar;\n}\n',
        hints: [
          'Två parametrar med typen number.',
          'return timlon * timmar;',
          'function brutto(timlon: number, timmar: number): number {',
        ],
        tests: [
          {
            description: 'brutto(150, 160) är 24000',
            code: 'brutto(150, 160)',
            expected: 24000,
          },
        ],
      },
      {
        title: 'Skatten',
        why: 'Standardvärdet 0.3 gör skattesatsen valfri, och TypeScript vet att den är ett tal utan att vi skriver det.',
        xp: 20,
        description: 'Skatten är oftast 30 %, men inte alltid.',
        task: 'Uppgift: Skriv `netto(lon: number, skatt = 0.3): number` som returnerar lönen efter skatt, avrundad med `Math.round`.',
        solution:
          'function brutto(timlon: number, timmar: number): number {\n  return timlon * timmar;\n}\n\nfunction netto(lon: number, skatt = 0.3): number {\n  return Math.round(lon * (1 - skatt));\n}\n',
        hints: [
          'skatt = 0.3 som standardvärde.',
          'lon * (1 - skatt)',
          'return Math.round(lon * (1 - skatt));',
        ],
        tests: [
          {
            description: 'netto(24000) är 16800',
            code: 'netto(24000)',
            expected: 16800,
          },
          {
            description: 'netto(24000, 0.25) är 18000',
            code: 'netto(24000, 0.25)',
            expected: 18000,
          },
        ],
        typeTests: [
          {
            description: 'skatt är ett tal',
            code: "netto(100, 'hög');",
            fails: true,
          },
        ],
      },
      {
        title: 'Lönebeskedet',
        why: 'Funktionen som skriver ut returnerar inget, och void säger just det. Själva texten byggs av de andra funktionerna.',
        xp: 20,
        description: 'Lönebeskedet skrivs ut.',
        task: 'Uppgift: Skriv `lonebesked(timlon: number, timmar: number): void` som skriver ut `` `Brutto: ${…} kr, netto: ${…} kr` `` med `brutto` och `netto`.',
        solution:
          'function brutto(timlon: number, timmar: number): number {\n  return timlon * timmar;\n}\n\nfunction netto(lon: number, skatt = 0.3): number {\n  return Math.round(lon * (1 - skatt));\n}\n\nfunction lonebesked(timlon: number, timmar: number): void {\n  const lon = brutto(timlon, timmar);\n  console.log(`Brutto: ${lon} kr, netto: ${netto(lon)} kr`);\n}\n',
        hints: [
          'Räkna ut bruttolönen först och spara den.',
          'Returtypen är void.',
          'console.log(`Brutto: ${lon} kr, netto: ${netto(lon)} kr`);',
        ],
        tests: [
          {
            description: 'lonebesked(150, 160) skriver ut beskedet',
            code: '(lonebesked(150, 160), __logs)',
            expected: ['Brutto: 24000 kr, netto: 16800 kr'],
          },
        ],
        sourceChecks: [
          {
            description: 'Returtypen är void',
            pattern: /lonebesked[^{]*\)\s*:\s*void/,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-kort',
    track: 'funktioner',
    title: 'Hälsningskortet',
    reward: { emoji: '💌', name: 'Kuvert' },
    summary: 'Ett kort som skrivs olika beroende på vad man vet om mottagaren.',
    steps: [
      {
        title: 'Hälsningen',
        why: 'Åldern är valfri, för vi vet den inte alltid. Frågetecknet säger det, och if-satsen hanterar båda fallen.',
        xp: 15,
        description: 'Kortet börjar med en hälsning.',
        task: 'Uppgift: Skriv `halsning(namn: string, alder?: number): string`. Med ålder: `` `Grattis ${namn}, ${alder} år!` ``, utan: `` `Grattis ${namn}!` ``.',
        starterCode: '// Steg 1: hälsningen\n',
        solution:
          'function halsning(namn: string, alder?: number): string {\n  if (alder) {\n    return `Grattis ${namn}, ${alder} år!`;\n  }\n  return `Grattis ${namn}!`;\n}\n',
        hints: [
          'alder?: number',
          'if (alder) { … }',
          'return `Grattis ${namn}!`; sist.',
        ],
        tests: [
          {
            description: 'Med ålder',
            code: "halsning('Ada', 7)",
            expected: 'Grattis Ada, 7 år!',
          },
          {
            description: 'Utan ålder',
            code: "halsning('Bo')",
            expected: 'Grattis Bo!',
          },
        ],
      },
      {
        title: 'Versaler',
        why: 'En pilfunktion med typer är kort. TypeScript vet att toUpperCase finns, eftersom text har typen string.',
        xp: 15,
        description: 'Rubriken ska stå med stora bokstäver.',
        task: 'Uppgift: Skriv `rubrik` som en pilfunktion: `(text: string): string => …` som ger texten med versaler.',
        solution:
          'function halsning(namn: string, alder?: number): string {\n  if (alder) {\n    return `Grattis ${namn}, ${alder} år!`;\n  }\n  return `Grattis ${namn}!`;\n}\n\nconst rubrik = (text: string): string => text.toUpperCase();\n',
        hints: [
          'const rubrik = (text: string): string => …',
          'toUpperCase()',
          'const rubrik = (text: string): string => text.toUpperCase();',
        ],
        tests: [
          {
            description: "rubrik('hej') är 'HEJ'",
            code: "rubrik('hej')",
            expected: 'HEJ',
          },
        ],
      },
      {
        title: 'Kortet',
        why: 'kort tar en funktion som parameter, så samma kort kan få olika stil. Typen säger vilken sorts funktion som passar.',
        xp: 20,
        description: 'Kortet ska kunna stylas på olika sätt.',
        task: 'Uppgift: Skriv `kort(namn: string, stil: (text: string) => string): string` som returnerar `stil(halsning(namn))`.',
        solution:
          'function halsning(namn: string, alder?: number): string {\n  if (alder) {\n    return `Grattis ${namn}, ${alder} år!`;\n  }\n  return `Grattis ${namn}!`;\n}\n\nconst rubrik = (text: string): string => text.toUpperCase();\n\nfunction kort(namn: string, stil: (text: string) => string): string {\n  return stil(halsning(namn));\n}\n',
        hints: [
          'Den andra parametern är en funktion.',
          'Typen: (text: string) => string',
          'return stil(halsning(namn));',
        ],
        tests: [
          {
            description: "kort('Ada', rubrik)",
            code: "kort('Ada', rubrik)",
            expected: 'GRATTIS ADA!',
          },
          {
            description: 'Med en egen stil',
            code: "kort('Bo', t => t + ' 🎉')",
            expected: 'Grattis Bo! 🎉',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-klass',
    track: 'objekt',
    title: 'Klasslistan',
    reward: { emoji: '📋', name: 'Skrivplatta' },
    summary:
      'En lista med elever och deras poäng, och funktioner som räknar på den.',
    steps: [
      {
        title: 'Eleverna',
        why: 'Typen beskriver varje elev en gång, och [] säger att det är en lista. Varje elev måste ha både namn och poäng.',
        xp: 15,
        description: 'Klassen har tre elever.',
        task: 'Uppgift: Skapa `klass` med typen `{ namn: string; poang: number }[]`: Ada 18, Bo 12 och Cia 15.',
        starterCode: '// Steg 1: eleverna\n',
        solution:
          "const klass: { namn: string; poang: number }[] = [\n  { namn: 'Ada', poang: 18 },\n  { namn: 'Bo', poang: 12 },\n  { namn: 'Cia', poang: 15 },\n];\n",
        hints: [
          'Objekttypen följd av [].',
          "{ namn: 'Ada', poang: 18 }",
          'const klass: { namn: string; poang: number }[] = [ … ];',
        ],
        tests: [
          { description: 'Tre elever', code: 'klass.length', expected: 3 },
          {
            description: 'Ada har 18 poäng',
            code: 'klass[0].poang',
            expected: 18,
          },
        ],
        typeTests: [
          {
            description: 'En elev utan poäng ger typfel',
            code: "klass.push({ namn: 'Dag' });",
            fails: true,
          },
        ],
      },
      {
        title: 'Medel',
        why: 'Funktionen tar listan med samma typ. Då vet TypeScript att e.poang är ett tal i reduce.',
        xp: 20,
        description: 'Läraren vill veta medelpoängen.',
        task: 'Uppgift: Skriv `medel(elever: { namn: string; poang: number }[]): number` som ger medelpoängen.',
        solution:
          "const klass: { namn: string; poang: number }[] = [\n  { namn: 'Ada', poang: 18 },\n  { namn: 'Bo', poang: 12 },\n  { namn: 'Cia', poang: 15 },\n];\n\nfunction medel(elever: { namn: string; poang: number }[]): number {\n  const summa = elever.reduce((total, e) => total + e.poang, 0);\n  return summa / elever.length;\n}\n",
        hints: [
          'Summera med reduce.',
          'Dela med antalet elever.',
          'return summa / elever.length;',
        ],
        tests: [
          {
            description: 'medel(klass) är 15',
            code: 'medel(klass)',
            expected: 15,
          },
        ],
      },
      {
        title: 'Godkända',
        why: 'filter ger samma sorts objekt, och map plockar ut namnen. Svaret blir string[] utan att vi skriver det.',
        xp: 20,
        description: 'Vilka klarade minst 15 poäng?',
        task: 'Uppgift: Skriv `godkanda(elever: { namn: string; poang: number }[]): string[]` med namnen på dem med minst 15 poäng.',
        solution:
          "const klass: { namn: string; poang: number }[] = [\n  { namn: 'Ada', poang: 18 },\n  { namn: 'Bo', poang: 12 },\n  { namn: 'Cia', poang: 15 },\n];\n\nfunction medel(elever: { namn: string; poang: number }[]): number {\n  const summa = elever.reduce((total, e) => total + e.poang, 0);\n  return summa / elever.length;\n}\n\nfunction godkanda(elever: { namn: string; poang: number }[]): string[] {\n  return elever.filter(e => e.poang >= 15).map(e => e.namn);\n}\n",
        hints: [
          'filter, sedan map.',
          'e.poang >= 15',
          'return elever.filter(e => e.poang >= 15).map(e => e.namn);',
        ],
        tests: [
          {
            description: 'Ada och Cia',
            code: 'godkanda(klass)',
            expected: ['Ada', 'Cia'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-adressbok',
    track: 'objekt',
    title: 'Adressboken',
    reward: { emoji: '📒', name: 'Adressbok' },
    summary:
      'Kontakter där en del saknar telefon, och ett id som aldrig får ändras.',
    steps: [
      {
        title: 'Kontakterna',
        why: 'id är readonly: det får aldrig ändras när kontakten väl finns. telefon är valfri, för alla har inte gett sitt nummer.',
        xp: 15,
        description: 'Adressboken har två kontakter.',
        task: "Uppgift: Skapa `kontakter` med typen `{ readonly id: number; namn: string; telefon?: string }[]`: id 1 Ada med `'070-111'`, id 2 Bo utan telefon.",
        starterCode: '// Steg 1: kontakterna\n',
        solution:
          "const kontakter: { readonly id: number; namn: string; telefon?: string }[] = [\n  { id: 1, namn: 'Ada', telefon: '070-111' },\n  { id: 2, namn: 'Bo' },\n];\n",
        hints: [
          'readonly före id, ? efter telefon.',
          'Bo har ingen telefon alls i objektet.',
          "{ id: 2, namn: 'Bo' }",
        ],
        tests: [
          {
            description: 'Två kontakter',
            code: 'kontakter.length',
            expected: 2,
          },
          {
            description: 'Bo saknar telefon',
            code: 'kontakter[1].telefon',
            expected: undefined,
          },
        ],
        typeTests: [
          {
            description: 'id går inte att ändra',
            code: 'kontakter[0].id = 5;',
            fails: true,
          },
        ],
      },
      {
        title: 'Telefonlistan',
        why: '?? ger en reservtext när telefon saknas. Utan den skulle listan visa "undefined".',
        xp: 20,
        description: 'En lista att skriva ut.',
        task: "Uppgift: Skapa `rader` med `map`: `` `${k.namn}: ${k.telefon ?? 'okänt'}` `` för varje kontakt.",
        solution:
          "const kontakter: { readonly id: number; namn: string; telefon?: string }[] = [\n  { id: 1, namn: 'Ada', telefon: '070-111' },\n  { id: 2, namn: 'Bo' },\n];\n\nconst rader = kontakter.map(k => `${k.namn}: ${k.telefon ?? 'okänt'}`);\n",
        hints: [
          'kontakter.map(k => …)',
          "k.telefon ?? 'okänt'",
          "const rader = kontakter.map(k => `${k.namn}: ${k.telefon ?? 'okänt'}`);",
        ],
        tests: [
          {
            description: 'rader',
            code: 'rader',
            expected: ['Ada: 070-111', 'Bo: okänt'],
          },
        ],
      },
      {
        title: 'Hitta med id',
        why: 'find kan misslyckas, så svaret kan vara undefined. Därför returnerar vi namnet eller en text som säger att ingen hittades.',
        xp: 20,
        description: 'Slå upp en kontakt med dess id.',
        task: "Uppgift: Skriv `namnFor(id: number): string` som letar i `kontakter` med `find` och ger namnet, eller `'ingen'`.",
        solution:
          "const kontakter: { readonly id: number; namn: string; telefon?: string }[] = [\n  { id: 1, namn: 'Ada', telefon: '070-111' },\n  { id: 2, namn: 'Bo' },\n];\n\nconst rader = kontakter.map(k => `${k.namn}: ${k.telefon ?? 'okänt'}`);\n\nfunction namnFor(id: number): string {\n  const kontakt = kontakter.find(k => k.id === id);\n  return kontakt ? kontakt.namn : 'ingen';\n}\n",
        hints: [
          'kontakter.find(k => k.id === id)',
          'Svaret kan vara undefined – kolla det.',
          "return kontakt ? kontakt.namn : 'ingen';",
        ],
        tests: [
          {
            description: 'namnFor(2) är Bo',
            code: 'namnFor(2)',
            expected: 'Bo',
          },
          {
            description: 'namnFor(9) är ingen',
            code: 'namnFor(9)',
            expected: 'ingen',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-meny',
    track: 'objekt',
    title: 'Menyn',
    reward: { emoji: '🍽️', name: 'Tallrik' },
    summary: 'En restaurangmeny där priserna aldrig ändras av misstag.',
    steps: [
      {
        title: 'Rätterna',
        why: 'Menyn är readonly, så ingen kan lägga till eller ta bort rätter av misstag någonstans i programmet.',
        xp: 15,
        description: 'Menyn har tre rätter.',
        task: 'Uppgift: Skapa `meny` med typen `readonly { ratt: string; pris: number; vegetarisk: boolean }[]`: Köttbullar 129 (nej), Falafel 115 (ja) och Laxpasta 139 (nej).',
        starterCode: '// Steg 1: rätterna\n',
        solution:
          "const meny: readonly { ratt: string; pris: number; vegetarisk: boolean }[] = [\n  { ratt: 'Köttbullar', pris: 129, vegetarisk: false },\n  { ratt: 'Falafel', pris: 115, vegetarisk: true },\n  { ratt: 'Laxpasta', pris: 139, vegetarisk: false },\n];\n",
        hints: [
          'readonly står först i typen.',
          "{ ratt: 'Falafel', pris: 115, vegetarisk: true }",
          'const meny: readonly { ratt: string; pris: number; vegetarisk: boolean }[] = [ … ];',
        ],
        tests: [
          { description: 'Tre rätter', code: 'meny.length', expected: 3 },
        ],
        typeTests: [
          {
            description: 'Menyn går inte att ändra',
            code: "meny.push({ ratt: 'X', pris: 1, vegetarisk: true });",
            fails: true,
          },
        ],
      },
      {
        title: 'Vegetariskt',
        why: 'filter fungerar på en readonly-array, för den ändrar inget utan ger en ny lista.',
        xp: 15,
        description: 'Gästen vill bara se det vegetariska.',
        task: 'Uppgift: Skapa `vego` med namnen på de vegetariska rätterna.',
        solution:
          "const meny: readonly { ratt: string; pris: number; vegetarisk: boolean }[] = [\n  { ratt: 'Köttbullar', pris: 129, vegetarisk: false },\n  { ratt: 'Falafel', pris: 115, vegetarisk: true },\n  { ratt: 'Laxpasta', pris: 139, vegetarisk: false },\n];\n\nconst vego = meny.filter(r => r.vegetarisk).map(r => r.ratt);\n",
        hints: [
          'filter på vegetarisk.',
          'map till ratt.',
          'const vego = meny.filter(r => r.vegetarisk).map(r => r.ratt);',
        ],
        tests: [
          { description: 'Bara Falafel', code: 'vego', expected: ['Falafel'] },
        ],
      },
      {
        title: 'Notan',
        why: 'Funktionen tar en lista med rättnamn och letar upp priserna. Typerna gör att den inte kan få en lista med tal av misstag.',
        xp: 20,
        description: 'Räkna ihop notan för ett bord.',
        task: 'Uppgift: Skriv `nota(bestallning: string[]): number` som summerar priserna för rätterna i beställningen (en rätt som inte finns kostar 0).',
        solution:
          "const meny: readonly { ratt: string; pris: number; vegetarisk: boolean }[] = [\n  { ratt: 'Köttbullar', pris: 129, vegetarisk: false },\n  { ratt: 'Falafel', pris: 115, vegetarisk: true },\n  { ratt: 'Laxpasta', pris: 139, vegetarisk: false },\n];\n\nconst vego = meny.filter(r => r.vegetarisk).map(r => r.ratt);\n\nfunction nota(bestallning: string[]): number {\n  return bestallning.reduce((summa, namn) => {\n    const ratt = meny.find(r => r.ratt === namn);\n    return summa + (ratt ? ratt.pris : 0);\n  }, 0);\n}\n",
        hints: [
          'reduce över beställningen.',
          'find letar upp rätten i menyn – den kan saknas.',
          'return summa + (ratt ? ratt.pris : 0);',
        ],
        tests: [
          {
            description: 'Två rätter',
            code: "nota(['Falafel', 'Laxpasta'])",
            expected: 254,
          },
          {
            description: 'En okänd rätt kostar 0',
            code: "nota(['Pizza'])",
            expected: 0,
          },
        ],
        typeTests: [
          {
            description: 'nota vill ha text',
            code: 'nota([1, 2]);',
            fails: true,
          },
        ],
      },
    ],
  },
];

export const PROJECT_STEPS = projectSteps(PROJECTS, text => `// ${text}`);
