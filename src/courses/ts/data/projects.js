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
];

export const PROJECT_STEPS = projectSteps(PROJECTS, text => `// ${text}`);
