// Att tilldela en const igen kastar ett TypeError, det gör inte let.
// Finns variabeln inte alls blir det ett ReferenceError, och då ska
// testet inte gå igenom.
export function isConst(name) {
  return {
    description: `${name} är skapad med const`,
    code: `(() => { try { ${name} = ${name}; return false; } catch (error) { return error.name === 'TypeError'; } })()`,
    expected: true,
  };
}

export function isLet(name) {
  return {
    description: `${name} är skapad med let`,
    code: `(() => { try { ${name} = ${name}; return true; } catch { return false; } })()`,
    expected: true,
  };
}

export const lessons = [
  {
    id: 'js-log-01',
    title: 'Hej världen!',
    xp: 10,
    track: 'js-basics',
    isBoss: false,
    description:
      'console.log skriver ut ett värde i konsolen. Det är programmerarens viktigaste verktyg för att se vad koden gör. Text skrivs inom citattecken. Det du skriver ut visas under Konsol när du klickar på Kolla lösning.',
    explain:
      'console betyder konsol. Det är ett fönster där programmet kan skriva meddelanden till dig som programmerar. Användaren av en app ser det aldrig.\n\nParenteserna efter log är där du lägger det som ska skrivas ut. Text måste stå inom citattecken, enkla \' \' eller dubbla " ". Annars tror JavaScript att det är namnet på något. Semikolonet ; sist avslutar raden, ungefär som en punkt i en mening.',
    example:
      'console.log(\'Godmorgon!\');\nconsole.log("Det här är också text");',
    task: 'Uppgift: Skriv ut texten "Hej världen!" med console.log.',
    starterCode: '// Skriv din kod här',
    solution: "console.log('Hej världen!');",
    hints: [
      'Skriv console.log( ); och lägg texten mellan parenteserna.',
      'Text skrivs inom citattecken: "Hej världen!".',
      "Skriv console.log('Hej världen!');",
    ],
    tests: [
      {
        description: 'Konsolen visar "Hej världen!"',
        code: '__logs',
        expected: ['Hej världen!'],
      },
    ],
  },
  {
    id: 'js-log-02',
    title: 'Skriv ut variabler',
    xp: 10,
    track: 'js-basics',
    isBoss: false,
    description:
      'console.log kan skriva ut variabler, och flera värden på en gång med komma emellan: console.log("Poäng:", score) visar Poäng: 42. Lägg in console.log när du undrar vad en variabel innehåller. Det är det snabbaste sättet att hitta fel.',
    explain:
      "const name = 'Ada'; skapar en variabel. Tänk på den som en etikett med namnet name som sitter på värdet 'Ada'. Du lär dig mer om variabler i nästa övningar.\n\nNär du skriver variabelns namn utan citattecken hämtar JavaScript värdet den pekar på. Med citattecken blir det bara texten \"name\". Flera värden i samma console.log skiljs åt med komma, och de skrivs ut med ett mellanslag emellan.",
    example:
      "const city = 'Lund';\nconst year = 2026;\n\nconsole.log(city);\nconsole.log('År:', year);",
    task: 'Uppgift: Skriv först ut name. Skriv sedan ut texten "Ålder:" och age i samma console.log, med komma emellan.',
    starterCode: `const name = 'Ada';
const age = 36;

`,
    solution: `const name = 'Ada';
const age = 36;

console.log(name);
console.log('Ålder:', age);`,
    hints: [
      'Du behöver två console.log, en per rad.',
      'Variabler skrivs utan citattecken: console.log(name);',
      "Andra raden: console.log('Ålder:', age);",
    ],
    tests: [
      {
        description: 'Konsolen visar "Ada" och sedan "Ålder: 36"',
        code: '__logs',
        expected: ['Ada', 'Ålder: 36'],
      },
    ],
    sourceChecks: [
      {
        description: 'Namnet hämtas från variabeln name',
        pattern: /console\s*\.\s*log\s*\(\s*name\s*\)/,
      },
      {
        description: 'Åldern hämtas från variabeln age',
        pattern: /console\s*\.\s*log\s*\([^)]*,\s*age\s*\)/,
      },
    ],
  },
  {
    id: 'js-const-01',
    title: 'Din första variabel',
    xp: 10,
    isBoss: false,
    track: 'js-basics',
    description:
      'Med const skapar du en variabel som inte kan tilldelas ett nytt värde.',
    explain:
      'En variabel är ett namn på ett värde, så att du kan använda värdet igen senare. Du skapar den med const, ett namn, ett likhetstecken och värdet.\n\nLikhetstecknet = betyder här "får värdet", inte "är lika med" som i matte. Variabelnamn skrivs oftast med liten bokstav först och utan mellanslag, till exempel firstName.',
    example: "const city = 'Göteborg';\nconst favoriteColor = 'grön';",
    task: 'Uppgift: Skapa en variabel som heter `language` med värdet "JavaScript".',
    starterCode: '// Skriv din kod här',
    solution: "const language = 'JavaScript';",
    hints: [
      'Börja med nyckelordet const följt av variabelns namn.',
      'Använd likhetstecknet = för att tilldela variabeln ett värde.',
      'Textvärdet JavaScript behöver omges av enkla eller dubbla citattecken.',
    ],
    tests: [
      {
        description: 'language har värdet "JavaScript"',
        code: 'language',
        expected: 'JavaScript',
      },
      isConst('language'),
    ],
  },
  {
    id: 'js-const-02',
    title: 'Spara ett tal',
    xp: 10,
    track: 'js-basics',
    isBoss: false,
    description: 'Tal skrivs utan citattecken.',
    explain:
      "Tal skrivs utan citattecken. 25 är ett tal som du kan räkna med, medan '25' är text som bara råkar se ut som ett tal.\n\nDecimaltal skrivs med punkt, inte komma: 3.5.",
    example: 'const year = 2026;\nconst price = 99.5;',
    task: 'Uppgift: Skapa en konstant som heter `age` med värdet 25.',
    starterCode: '// Skriv din kod här',
    solution: 'const age = 25;',
    hints: [
      'Börja med nyckelordet const följt av variabelns namn.',
      'Använd likhetstecknet = för att tilldela variabeln ett värde.',
      'Ett tal i JavaScript skrivs utan citattecken',
    ],
    tests: [
      { description: 'age har värdet 25', code: 'age', expected: 25 },
      isConst('age'),
    ],
  },
  {
    id: 'js-let-01',
    title: 'Ändra ett värde',
    xp: 10,
    track: 'js-basics',
    isBoss: false,
    description:
      'Med let kan en variabel tilldelas ett nytt värde efter att den skapats.',
    explain:
      'Med let skapar du en variabel som får ändras senare. Första gången skriver du let. När du ger den ett nytt värde skriver du bara namnet, ett = och det nya värdet, utan let.\n\nSkriver du let en gång till med samma namn blir det ett fel, eftersom variabeln redan finns.',
    example: 'let level = 1;\nlevel = 2;',
    task: 'Uppgift: Skapa `score` med let och startvärdet 0. Tilldela sedan score värdet 10.',
    starterCode: '// Skriv din kod här',
    solution: `let score = 0;
score = 10;`,
    hints: [
      'Börja med nyckelordet let följt av variabelns namn.',
      'Ge score startvärdet 0 när du deklarerar variabeln.',
      'På nästa rad använder du score = ... utan att skriva let igen.',
    ],
    tests: [
      { description: 'score har värdet 10', code: 'score', expected: 10 },
      isLet('score'),
    ],
    sourceChecks: [
      {
        description: 'score skapas med startvärdet 0',
        pattern: /let\s+score\s*=\s*0\b/,
      },
    ],
  },
  {
    id: 'js-let-02',
    title: 'Öka ett värde',
    xp: 10,
    track: 'js-basics',
    isBoss: false,
    description:
      'Du kan använda variabelns nuvarande värde för att beräkna dess nästa värde.',
    explain:
      'score = score + 5 läses från höger till vänster. Först räknar JavaScript ut score + 5 med det gamla värdet. Sedan sparas svaret i score.\n\nDet här är ett av de vanligaste mönstren i programmering. Det används för poäng, räknare och summor.',
    example: 'let coins = 3;\ncoins = coins + 2;\n// coins är nu 5',
    task: 'Skapa `score` med let och värdet 10. Öka sedan värdet med 5 genom att skriva score = score + 5.',
    starterCode: '// Skriv din kod här',
    solution: `let score = 10;
score = score + 5;`,
    hints: [
      'Börja med nyckelordet let följt av variabelns namn.',
      'Ge score startvärdet 10 när du deklarerar variabeln.',
      'På nästa rad använder du score = score + 5 utan att använda let igen',
    ],
    tests: [
      { description: 'score har värdet 15', code: 'score', expected: 15 },
      isLet('score'),
    ],
    sourceChecks: [
      {
        description: 'score skapas med startvärdet 10',
        pattern: /let\s+score\s*=\s*10\b/,
      },
      {
        description: 'score ökas med 5 utifrån sitt nuvarande värde',
        pattern: /score\s*=\s*score\s*\+\s*5|score\s*\+=\s*5/,
      },
    ],
  },
  {
    id: 'js-if-01',
    title: 'Öka bara om villkoret stämmer',
    xp: 10,
    track: 'js-basics',
    isBoss: false,
    description: 'En if-sats kör sitt kodblock bara när villkoret är sant.',
    explain:
      'En if-sats ser ut så här: if (villkor) { kod }. Villkoret inom parenteserna blir antingen sant eller falskt. Är det sant körs koden mellan klamrarna { }. Annars hoppas den över.\n\n>= betyder "större än eller lika med". Andra jämförelser är > (större än), < (mindre än), <= och === (lika med).',
    example: 'let lives = 3;\nif (lives < 5) {\n  lives = lives + 1;\n}',
    task: 'Skapa `score` med let och värdet 10. Om score >= 10 ska du öka värdet med score = score + 5.',
    starterCode: '// Skriv din kod här',
    solution: `let score = 10;

if (score >= 10) {
  score = score + 5;
}`,
    hints: [
      'Börja med nyckelordet let följt av variabelns namn.',
      'Jämför score med värdet för att se om den uppfyller kravet',
      'Placera score = score + 5; inuti if-blockets klamrar.',
    ],
    tests: [
      { description: 'score har värdet 15', code: 'score', expected: 15 },
    ],
    sourceChecks: [
      {
        description: 'score skapas med startvärdet 10',
        pattern: /let\s+score\s*=\s*10\b/,
      },
      { description: 'Koden använder en if-sats', pattern: /\bif\s*\(/ },
    ],
  },
  {
    id: 'js-if-02',
    title: 'Välj mellan två vägar',
    xp: 10,
    track: 'js-basics',
    isBoss: false,
    description:
      'Ett if/else-statement väljer ett av två kodblock beroende på om villkoret är sant eller falskt.',
    explain:
      'else betyder "annars". Koden i else-blocket körs bara när villkoret i if är falskt. Exakt ett av blocken körs, aldrig båda.\n\nHela if/else-satsen skrivs i ett svep: if (villkor) { … } else { … }.',
    example:
      'let temperature = 12;\nif (temperature >= 20) {\n  temperature = temperature - 1;\n} else {\n  temperature = temperature + 1;\n}',
    task: 'Skapa `points` med let och värdet 4. Om points >= 5 ska du tilldela points värdet points + 10, annars points + 2. Använd if och else.',
    starterCode: '// Skriv din kod här',
    solution: `let points = 4;

if (points >= 5) {
  points = points + 10;
} else {
  points = points + 2;
}`,
    hints: [
      'Börja med nyckelordet let följt av variabelns namn.',
      'Skriv villkoret points >= 5 inom parenteser efter if.',
      'Placera points = points + 10; inuti if-blockets klamrar. points = points + 2 ska vara i else blocket',
    ],
    tests: [
      { description: 'points har värdet 6', code: 'points', expected: 6 },
    ],
    sourceChecks: [
      {
        description: 'points skapas med startvärdet 4',
        pattern: /let\s+points\s*=\s*4\b/,
      },
      { description: 'Koden använder en if-sats', pattern: /\bif\s*\(/ },
      { description: 'Koden använder else', pattern: /\belse\b/ },
    ],
  },
  {
    id: 'js-loop-01',
    title: 'Upprepa med en loop',
    xp: 10,
    track: 'js-basics',
    isBoss: false,
    description:
      'En for-loop upprepar ett kodblock så länge dess villkor är sant.',
    explain:
      'En for-loop har tre delar inom parenteserna, åtskilda med semikolon. Först let i = 0, som är startvärdet. Sedan i < 3, villkoret för att köra ett varv till. Sist i++, som ökar i med 1 efter varje varv.\n\nMed i = 0 och i < 3 blir det tre varv: i är 0, 1 och 2. Lägg gärna in console.log(i) i loopen för att se det.',
    example:
      'let stars = 0;\nfor (let i = 0; i < 4; i++) {\n  stars = stars + 1;\n}\n// stars är nu 4',
    task: 'Skapa `total` med let och värdet 0. Använd en for-loop med let i = 0, villkoret i < 3 och ökningen i++. Lägg till 2 i total varje varv med total = total + 2.',
    starterCode: '// Skriv din kod här',
    solution: `let total = 0;

for (let i = 0; i < 3; i++) {
  total = total + 2;
}`,
    hints: [
      'Börja med nyckelordet let följt av variabelns namn.',
      'Skriv loopens tre delar(let i = 0;i < 3; i++)',
      'Glöm inte att uppdatera total vid varje varv total = total +2',
    ],
    tests: [{ description: 'total har värdet 6', code: 'total', expected: 6 }],
    sourceChecks: [
      { description: 'Koden använder en for-loop', pattern: /\bfor\s*\(/ },
    ],
  },
  {
    id: 'js-loop-02',
    title: 'Summera med en loop',
    xp: 10,
    track: 'js-basics',
    isBoss: false,
    description:
      'En variabel utanför loopen behåller sitt värde mellan varven. Därför kan den samla en summa.',
    explain:
      'i ändras för varje varv i loopen, och du kan använda den i koden inuti. Börjar loopen på 1 och går till och med 3 får du talen 1, 2 och 3.\n\ntotal skapas före loopen. Skapar du den inuti loopen börjar den om på 0 varje varv.',
    example:
      'let sum = 0;\nfor (let i = 1; i <= 3; i++) {\n  sum = sum + i;\n}\n// sum är 1 + 2 + 3 = 6',
    task: 'Skapa `total` med let och värdet 0. Använd en for-loop med let i = 1, villkoret i <= 4 och ökningen i++. Lägg till i i total varje varv med total = total + i.',
    starterCode: '// Skriv din kod här',
    solution: `let total = 0;

for (let i = 1; i <= 4; i++) {
  total = total + i;
}`,
    hints: [
      'Börja med nyckelordet let följt av variabelns namn.',
      'Skriv loopens tre delar(let i = 1;i <= 4; i++)',
      'Glöm inte att uppdatera total vid varje varv total = total + i',
    ],
    tests: [
      { description: 'total har värdet 10', code: 'total', expected: 10 },
    ],
    sourceChecks: [
      { description: 'Koden använder en for-loop', pattern: /\bfor\s*\(/ },
    ],
  },
  {
    id: 'js-boolean-01',
    title: 'Sant eller falskt',
    xp: 10,
    track: 'js-basics',
    isBoss: false,
    description:
      'En boolean har värdet true eller false och kan beskriva om något är på eller av.',
    explain:
      "En boolean har bara två möjliga värden: true (sant) och false (falskt). De skrivs utan citattecken. 'true' med citattecken är text och inte en boolean.\n\nBooleans används för saker som är av eller på: är användaren inloggad, är uppgiften klar, är lampan tänd.",
    example: 'const isLoggedIn = false;\nconst hasCoffee = true;',
    task: 'Uppgift: Skapa konstanten `isReady` med det booleska värdet true.',
    starterCode: '// Skriv din kod här',
    solution: 'const isReady = true;',
    hints: [
      'Börja med nyckelordet const följt av variabelns namn.',
      'Använd likhetstecknet = för att tilldela variabeln ett värde.',
      'En boolean i JavaScript skrivs utan citattecken och antingen true eller false',
    ],
    tests: [
      {
        description: 'isReady har värdet true',
        code: 'isReady',
        expected: true,
      },
      isConst('isReady'),
    ],
  },
  {
    id: 'js-boolean-02',
    title: 'Jämför två tal',
    xp: 10,
    track: 'js-basics',
    isBoss: false,
    description:
      'Operatorn >= kontrollerar om vänstra värdet är större än eller lika med det högra. Resultatet är en boolean.',
    explain:
      'En jämförelse som 10 > 3 ger en boolean som svar. Du kan spara svaret direkt i en variabel, utan if.\n\nNamn på booleans börjar ofta med is eller has, så att det låter som en ja/nej-fråga: isAdult, hasTicket.',
    example: 'const isTall = 190 >= 180;\n// isTall är true',
    task: 'Uppgift: Skapa konstanten `isAdult` och tilldela den resultatet av jämförelsen 20 >= 18.',
    starterCode: '// Skriv din kod här',
    solution: 'const isAdult = 20 >= 18;',
    hints: [
      'Börja med nyckelordet const följt av variabelns namn.',
      'Använd likhetstecknet = för att tilldela variabeln ett värde.',
      'Jämför talen med >=',
    ],
    tests: [
      {
        description: 'isAdult har värdet true',
        code: 'isAdult',
        expected: true,
      },
      isConst('isAdult'),
    ],
    sourceChecks: [
      { description: 'Värdet räknas ut med 20 >= 18', pattern: /20\s*>=\s*18/ },
    ],
  },
  {
    id: 'js-basics-boss-01',
    title: 'Boss: Poängräknaren',
    xp: 30,
    track: 'js-basics',
    isBoss: true,
    description:
      'Nu använder du allt från banan på en gång: variabler med const och let, en loop, en jämförelse, if och else och console.log.',
    task: `Uppgift: Bygg en poängräknare.
  1. Skapa \`score\` med let och startvärdet 0.
  2. Använd en for-loop som går 5 varv och lägger till 10 i score varje varv.
  3. Skapa konstanten \`hasWon\` som är resultatet av jämförelsen score >= 40.
  4. Skapa \`level\` med let och värdet 1.
     Om hasWon är true ska level få värdet 2, annars 0. Använd if och else.
  5. Skriv ut texten "Poäng:" och score med console.log.`,
    starterCode: '// Skriv din kod här',
    solution: `let score = 0;
for (let i = 0; i < 5; i++) {
  score = score + 10;
}

const hasWon = score >= 40;

let level = 1;
if (hasWon) {
  level = 2;
} else {
  level = 0;
}

console.log('Poäng:', score);`,
    hints: [],
    tests: [
      { description: 'score är 50', code: 'score', expected: 50 },
      isLet('score'),
      { description: 'hasWon är true', code: 'hasWon', expected: true },
      isConst('hasWon'),
      { description: 'level är 2', code: 'level', expected: 2 },
      isLet('level'),
      {
        description: 'Konsolen visar "Poäng: 50"',
        code: '__logs',
        expected: ['Poäng: 50'],
      },
    ],
    sourceChecks: [
      { description: 'Poängen räknas i en for-loop', pattern: /for\s*\(/ },
      {
        description: 'hasWon räknas ut med en jämförelse',
        pattern: /hasWon\s*=\s*score\s*>=\s*40/,
      },
      { description: 'level sätts med if och else', pattern: /\belse\b/ },
      {
        description: 'score skrivs inte in som 50 för hand',
        pattern: /score\s*=\s*50\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'arrays-01',
    xp: 10,
    title: 'Skapa en array',
    track: 'arrays',
    isBoss: false,
    description: 'En array samlar flera värden i en ordnad lista.',
    explain:
      'En array är en lista med värden inom hakparenteser [ ], åtskilda med komma. Värdena kan vara tal, text eller något annat.\n\nEn tom array skrivs [].',
    example:
      "const colors = ['röd', 'grön', 'blå'];\nconst ages = [12, 15, 18];",
    task: 'Uppgift: Skapa en konstant som heter `numbers` med arrayen [1, 2, 3].',
    starterCode: '// Skriv din kod här',
    solution: 'const numbers = [1, 2, 3];',
    hints: [
      'Börja med nyckelordet const följt av arrayens namn.',
      'Använd likhetstecknet = för att tilldela variabeln ett värde.',
      'En array i JS skrivs inuti []',
    ],
    tests: [
      {
        description: 'numbers är [1, 2, 3]',
        code: 'numbers',
        expected: [1, 2, 3],
      },
      isConst('numbers'),
    ],
  },
  {
    id: 'arrays-02',
    xp: 10,
    title: 'Räkna värden',
    track: 'arrays',
    isBoss: false,
    description: 'Egenskapen length anger hur många värden en array innehåller',
    explain:
      'length skrivs efter arrayen med en punkt: colors.length. Det ger antalet värden i arrayen.\n\nlength har inga parenteser efter sig. Den är en egenskap, ett värde som arrayen har, och inte en funktion som ska anropas.',
    example:
      "const colors = ['röd', 'grön'];\nconst amount = colors.length;\n// amount är 2",
    task: 'Uppgift: Skapa konstanten `count` och tilldela den längden av [10, 20, 30] med .length.',
    starterCode: '// Skriv din kod här',
    solution: 'const count = [10, 20, 30].length;',
    hints: [
      'Börja med const och variabelnamnet count.',
      'Använd likhetstecknet = för att tilldela variabeln ett värde.',
      'Skriv .length direkt efter arrayens avslutande hakparentes.',
    ],
    tests: [{ description: 'count har värdet 3', code: 'count', expected: 3 }],
    sourceChecks: [
      { description: 'Längden hämtas med .length', pattern: /\.\s*length\b/ },
    ],
  },
  {
    id: 'arrays-03',
    xp: 10,
    title: 'Hämta första värdet',
    track: 'arrays',
    isBoss: false,
    description: 'Arrayens positioner kallas index. Första värdet har index 0.',
    explain:
      'Varje värde i en array har ett nummer, ett index. Räkningen börjar på 0, så första värdet har index 0, andra index 1 och så vidare.\n\nDu hämtar ett värde med arrayens namn och index inom hakparenteser: colors[0].',
    example:
      "const colors = ['röd', 'grön', 'blå'];\nconst second = colors[1];\n// second är 'grön'",
    task: 'Uppgift: Skapa konstanten `first` och hämta första värdet ur [10, 20, 30] med indexering.',
    starterCode: '// Skriv din kod här',
    solution: 'const first = [10, 20, 30][0];',
    hints: [
      'Börja med const och variabelnamnet first.',
      'Använd likhetstecknet = för att tilldela variabeln ett värde.',
      'Använd [] med valt index efter arrayen för att få fram rätt svar',
    ],
    tests: [
      { description: 'first har värdet 10', code: 'first', expected: 10 },
    ],
    sourceChecks: [
      { description: 'Värdet hämtas med index [0]', pattern: /\[\s*0\s*\]/ },
    ],
  },
  {
    id: 'arrays-04',
    xp: 10,
    title: 'Lägg till ett värde',
    track: 'arrays',
    isBoss: false,
    description:
      'Metoden push lägger till ett värde sist i en array. Det fungerar även med const, eftersom push ändrar innehållet och inte vilken array variabeln pekar på.',
    explain:
      'push är en metod, en funktion som hör till arrayen. Den anropas med punkt och parenteser: lista.push(värde).\n\nVärdet läggs till sist i arrayen. Du skriver inte = framför, för push ändrar arrayen direkt.',
    example:
      "const pets = ['katt'];\npets.push('hund');\n// pets är ['katt', 'hund']",
    task: 'Uppgift: Lägg till "päron" sist i arrayen fruits med push.',
    starterCode: `const fruits = ['äpple', 'banan'];

`,
    solution: `const fruits = ['äpple', 'banan'];
fruits.push('päron');`,
    hints: [
      'Skriv arrayens namn följt av en punkt.',
      'Metoden heter push och anropas med parenteser.',
      'Skicka in texten "päron" som argument till push.',
    ],
    tests: [
      {
        description: 'fruits är ["äpple", "banan", "päron"]',
        code: 'fruits',
        expected: ['äpple', 'banan', 'päron'],
      },
      isConst('fruits'),
    ],
    sourceChecks: [
      {
        description: 'Värdet läggs till med fruits.push',
        pattern: /fruits\s*\.\s*push\s*\(/,
      },
    ],
  },
  {
    id: 'arrays-for-of',
    xp: 10,
    title: 'Gå igenom en array med for...of',
    track: 'arrays',
    isBoss: false,
    addedLater: true,
    description:
      'for...of går igenom en array ett värde i taget, utan att du behöver hålla reda på i. Använd den när du vill göra något med varje värde. Behöver du veta platsen, till exempel för att numrera, passar den vanliga for-loopen med i bättre.',
    explain:
      'for (const fruit of fruits) betyder: för varje värde i fruits, kalla värdet fruit och kör koden i { }. Första varvet är fruit det första värdet, andra varvet det andra, och så vidare tills arrayen är slut.\n\nDu väljer själv namnet efter const. Ett bra namn är ental av arrayens namn: fruits ger fruit, users ger user. const går bra eftersom det är en ny variabel varje varv.',
    example:
      'const prices = [20, 35, 15];\nlet sum = 0;\n\nfor (const price of prices) {\n  sum = sum + price;\n}\n// sum är 70',
    task: 'Uppgift: Skapa `totalLength` med let och värdet 0. Gå igenom words med for...of och lägg till varje ords längd (.length) i totalLength.',
    starterCode: `const words = ['hej', 'på', 'dig'];

`,
    solution: `const words = ['hej', 'på', 'dig'];

let totalLength = 0;
for (const word of words) {
  totalLength = totalLength + word.length;
}`,
    hints: [
      'Börja med let totalLength = 0; före loopen.',
      'Loopen skrivs for (const word of words) { ... }.',
      'Inuti loopen: totalLength = totalLength + word.length;',
    ],
    tests: [
      { description: 'totalLength är 8', code: 'totalLength', expected: 8 },
      isLet('totalLength'),
    ],
    sourceChecks: [
      {
        description: 'Orden gås igenom med for...of',
        pattern: /for\s*\(\s*(const|let)\s+\w+\s+of\s+words\s*\)/,
      },
      {
        description: 'totalLength skrivs inte in som 8 för hand',
        pattern: /totalLength\s*=\s*8\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'arrays-boss-01',
    xp: 30,
    title: 'Boss: Undersök en array',
    track: 'arrays',
    isBoss: true,
    description: 'Kombinera det du lärt dig om arrayer, längd och index.',
    task: `Uppgift: Skapa konstanten \`numbers\` med [10, 20, 30].
  Skapa \`count\` med numbers.length.
  Skapa \`first\` med numbers[0]
  Använd const i alla tre deklarationer.`,
    starterCode: '// Skriv din kod här',
    solution: `const numbers = [10, 20, 30];
const count = numbers.length;
const first = numbers[0];`,
    hints: [],
    tests: [
      {
        description: 'numbers är [10, 20, 30]',
        code: 'numbers',
        expected: [10, 20, 30],
      },
      { description: 'count har värdet 3', code: 'count', expected: 3 },
      { description: 'first har värdet 10', code: 'first', expected: 10 },
      isConst('numbers'),
      isConst('count'),
      isConst('first'),
    ],
    sourceChecks: [
      {
        description: 'count hämtas med numbers.length',
        pattern: /numbers\s*\.\s*length\b/,
      },
      {
        description: 'first hämtas med numbers[0]',
        pattern: /numbers\s*\[\s*0\s*\]/,
      },
    ],
  },
  {
    id: 'objects-01',
    xp: 10,
    title: 'Skapa ett objekt',
    track: 'arrays',
    isBoss: false,
    description:
      'Ett objekt samlar värden under namn, så kallade egenskaper. Det skrivs inuti { } med namn: värde, separerade med kommatecken.',
    explain:
      'En array håller värden i ordning med nummer. Ett objekt håller värden med namn. Varje egenskap skrivs som namn: värde, och egenskaperna skiljs åt med komma.\n\nNamnen skrivs utan citattecken. Värdena följer samma regler som vanligt, alltså text med citattecken och tal utan.',
    example: "const book = {\n  title: 'Pippi',\n  pages: 120,\n};",
    task: 'Uppgift: Skapa konstanten `user` som ett objekt med egenskapen name som har värdet "Ada" och egenskapen age som har värdet 36.',
    starterCode: '// Skriv din kod här',
    solution: `const user = { name: 'Ada', age: 36 };`,
    hints: [
      'Börja med const user = följt av { }.',
      'Skriv varje egenskap som namn: värde.',
      'Separera name och age med ett kommatecken.',
    ],
    tests: [
      {
        description: 'user är ett objekt',
        code: 'typeof user === "object" && user !== null && !Array.isArray(user)',
        expected: true,
      },
      { description: 'user.name är "Ada"', code: 'user.name', expected: 'Ada' },
      { description: 'user.age är 36', code: 'user.age', expected: 36 },
      isConst('user'),
    ],
  },
  {
    id: 'objects-02',
    xp: 10,
    title: 'Läs en egenskap',
    track: 'arrays',
    isBoss: false,
    description:
      'Med punktnotation, objekt.egenskap, läser du värdet av en egenskap.',
    explain:
      'Punkten betyder ungefär "dess". book.title läses som "bokens titel".\n\nFinns inte egenskapen får du undefined. Det är JavaScripts sätt att säga att det inte finns något värde där.',
    example:
      "const book = { title: 'Pippi', pages: 120 };\nconst bookTitle = book.title;",
    task: 'Uppgift: Skapa konstanten `userName` och hämta värdet av name ur user med punktnotation.',
    starterCode: `const user = { name: 'Ada', age: 36 };

`,
    solution: `const user = { name: 'Ada', age: 36 };
const userName = user.name;`,
    hints: [
      'Börja med const userName =.',
      'Skriv objektets namn user följt av en punkt.',
      'Avsluta med egenskapens namn, name.',
    ],
    tests: [
      {
        description: 'userName har värdet "Ada"',
        code: 'userName',
        expected: 'Ada',
      },
    ],
    sourceChecks: [
      {
        description: 'Värdet hämtas med user.name',
        pattern: /user\s*\.\s*name\b/,
      },
    ],
  },
  {
    id: 'objects-03',
    xp: 10,
    title: 'En array av objekt',
    track: 'arrays',
    isBoss: false,
    description:
      'I React får du ofta data som en array av objekt, till exempel en lista med användare. Kombinera index och punktnotation för att nå ett värde.',
    explain:
      'Läs koden steg för steg från vänster. books[0] är första objektet i arrayen. books[0].title är titeln på det objektet.\n\nKom ihåg att index börjar på 0, så andra objektet har index 1.',
    example:
      "const books = [\n  { title: 'Pippi' },\n  { title: 'Emil' },\n];\nconst firstTitle = books[0].title;",
    task: 'Uppgift: Skapa konstanten `secondName` och hämta name från andra användaren i users.',
    starterCode: `const users = [
  { name: 'Ada', age: 36 },
  { name: 'Linus', age: 28 },
];

`,
    solution: `const users = [
  { name: 'Ada', age: 36 },
  { name: 'Linus', age: 28 },
];
const secondName = users[1].name;`,
    hints: [
      'Börja med const secondName =.',
      'Andra värdet i en array har index 1.',
      'Skriv .name direkt efter users[1].',
    ],
    tests: [
      {
        description: 'secondName har värdet "Linus"',
        code: 'secondName',
        expected: 'Linus',
      },
    ],
    sourceChecks: [
      {
        description: 'Värdet hämtas med users[1].name',
        pattern: /users\s*\[\s*1\s*\]\s*\.\s*name\b/,
      },
    ],
  },
  {
    id: 'objects-for-in',
    xp: 10,
    title: 'Gå igenom ett objekt med for...in',
    track: 'arrays',
    isBoss: false,
    addedLater: true,
    description:
      'for...in går igenom alla nycklar i ett objekt. Använd den när du inte vet i förväg vilka egenskaper som finns, till exempel ett objekt med priser där nya varor kan tillkomma. Värdet hämtar du med hakparenteser: prices[key].',
    explain:
      'for (const key in prices) betyder: för varje nyckel i prices, kalla nyckeln key. Nyckeln är text, till exempel "keps".\n\nprices.key fungerar inte här, för då letar JavaScript efter en egenskap som faktiskt heter key. Med hakparenteser, prices[key], används värdet i variabeln key som namn.\n\nBlanda inte ihop dem: of ger värdena i en array, in ger nycklarna i ett objekt. Längre fram lär du dig Object.entries, som ofta används i stället i React-kod.',
    example:
      'const ages = { ada: 36, linus: 28 };\n\nfor (const name in ages) {\n  console.log(name, ages[name]);\n}\n// ada 36\n// linus 28',
    task: 'Uppgift: Skapa `total` med let och värdet 0. Gå igenom cart med for...in och lägg ihop alla priser i total.',
    starterCode: `const cart = { keps: 199, tröja: 349, strumpor: 49 };

`,
    solution: `const cart = { keps: 199, tröja: 349, strumpor: 49 };

let total = 0;
for (const item in cart) {
  total = total + cart[item];
}`,
    hints: [
      'Börja med let total = 0; före loopen.',
      'Loopen skrivs for (const item in cart) { ... }, och item blir namnet på varan.',
      'Priset hämtas med cart[item]: total = total + cart[item];',
    ],
    tests: [
      { description: 'total är 597', code: 'total', expected: 597 },
      isLet('total'),
    ],
    sourceChecks: [
      {
        description: 'cart gås igenom med for...in',
        pattern: /for\s*\(\s*(const|let)\s+\w+\s+in\s+cart\s*\)/,
      },
      {
        description: 'total skrivs inte in som 597 för hand',
        pattern: /total\s*=\s*597\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'objects-boss-01',
    xp: 30,
    title: 'Boss: En lista med användare',
    track: 'arrays',
    isBoss: true,
    description: 'Kombinera arrayer, objekt, index och egenskaper.',
    task: `Uppgift: Skapa konstanten \`users\` med två objekt:
  { name: "Ada", age: 36 } och { name: "Linus", age: 28 }.
  Skapa \`count\` med users.length.
  Skapa \`firstName\` med name från första användaren.
  Skapa \`secondAge\` med age från andra användaren.
  Använd const i alla fyra deklarationer.`,
    starterCode: '// Skriv din kod här',
    solution: `const users = [
  { name: 'Ada', age: 36 },
  { name: 'Linus', age: 28 },
];
const count = users.length;
const firstName = users[0].name;
const secondAge = users[1].age;`,
    hints: [],
    tests: [
      {
        description: 'users har två objekt',
        code: 'users.length',
        expected: 2,
      },
      {
        description: 'Första användaren heter "Ada" och är 36',
        code: '[users[0].name, users[0].age]',
        expected: ['Ada', 36],
      },
      {
        description: 'Andra användaren heter "Linus" och är 28',
        code: '[users[1].name, users[1].age]',
        expected: ['Linus', 28],
      },
      { description: 'count har värdet 2', code: 'count', expected: 2 },
      {
        description: 'firstName har värdet "Ada"',
        code: 'firstName',
        expected: 'Ada',
      },
      {
        description: 'secondAge har värdet 28',
        code: 'secondAge',
        expected: 28,
      },
      isConst('users'),
      isConst('count'),
      isConst('firstName'),
      isConst('secondAge'),
    ],
    sourceChecks: [
      {
        description: 'count hämtas med users.length',
        pattern: /users\s*\.\s*length\b/,
      },
      {
        description: 'firstName hämtas med users[0].name',
        pattern: /users\s*\[\s*0\s*\]\s*\.\s*name\b/,
      },
      {
        description: 'secondAge hämtas med users[1].age',
        pattern: /users\s*\[\s*1\s*\]\s*\.\s*age\b/,
      },
    ],
  },
  {
    id: 'functions-01',
    title: 'Returnera en bonus',
    xp: 10,
    track: 'functions',
    isBoss: false,
    description:
      'En parameter tar emot ett värde. Med return skickar funktionen tillbaka ett resultat.',
    explain:
      'En funktion är kod som har ett namn och kan köras många gånger. Den skrivs med function, ett namn, parametrar inom ( ) och koden inom { }.\n\nEn parameter är som en variabel som får sitt värde när funktionen anropas. return skickar tillbaka svaret. Koden inuti körs först när någon anropar funktionen.',
    example: 'function addTen(number) {\n  return number + 10;\n}',
    task: 'Skriv funktionen `addBonus` med parametern points. Använd function och returnera points + 5. Du ska bara definiera funktionen, inte anropa den.',
    starterCode: '// Skriv din kod här',
    solution: `function addBonus(points) {
  return points + 5;
}`,
    hints: [
      'Börja med function följt av funktionens namn',
      'Glöm inte (points) efter namnet',
      'Använd return följt av points + 5',
    ],
    tests: [
      {
        description: 'addBonus(10) returnerar 15',
        code: 'addBonus(10)',
        expected: 15,
      },
      {
        description: 'addBonus(0) returnerar 5',
        code: 'addBonus(0)',
        expected: 5,
      },
      {
        description: 'addBonus(-5) returnerar 0',
        code: 'addBonus(-5)',
        expected: 0,
      },
    ],
    sourceChecks: [
      {
        description: 'addBonus skapas med function',
        pattern: /\bfunction\s+addBonus\b/,
      },
    ],
  },
  {
    id: 'functions-02',
    title: 'Anropa en funktion',
    xp: 10,
    track: 'functions',
    isBoss: false,
    description:
      'När du anropar en funktion skickar du in ett argument. Returvärdet kan sparas i en variabel.',
    explain:
      'Att anropa en funktion betyder att köra den. Du skriver namnet följt av parenteser, och lägger värdet du skickar in mellan dem: addTen(5).\n\nVärdet du skickar in kallas argument. Det hamnar i parametern. Svaret från return kan du spara i en variabel.',
    example:
      'function addTen(number) {\n  return number + 10;\n}\n\nconst answer = addTen(5);\n// answer är 15',
    task: 'Behåll funktionen `addBonus`. Anropa den med argumentet 10 och spara returvärdet i konstanten `result`.',
    starterCode: `function addBonus(points) {
  return points + 5;
}

`,
    solution: `function addBonus(points) {
  return points + 5;
}
const result = addBonus(10);`,
    hints: [
      'Börja med const result = och anropa funktionen.',
      'Anropa funktionen med dess namn och parenteser.',
      'Skriv argumentet 10 mellan parenteserna och avsluta med semikolon.',
    ],
    tests: [
      { description: 'result har värdet 15', code: 'result', expected: 15 },
      {
        description: 'addBonus(1) returnerar fortfarande 6',
        code: 'addBonus(1)',
        expected: 6,
      },
    ],
    sourceChecks: [
      {
        description: 'result räknas ut med addBonus(10)',
        pattern: /addBonus\s*\(\s*10\s*\)/,
      },
    ],
  },
  {
    id: 'functions-03',
    title: 'Två parametrar',
    xp: 10,
    track: 'functions',
    isBoss: false,
    description:
      'En funktion kan ta emot flera parametrar. Argumenten kopplas till dem i samma ordning som de skickas in.',
    explain:
      'Flera parametrar skiljs åt med komma, både när du skriver funktionen och när du anropar den.\n\nOrdningen avgör vilket värde som hamnar var. I subtract(10, 4) blir a 10 och b 4.',
    example:
      'function subtract(a, b) {\n  return a - b;\n}\n\nconst difference = subtract(10, 4);',
    task: 'Skriv funktionen `multiply` som tar emot två tal och returnerar produkten av dem. Anropa sedan funktionen med 3 och 4 och spara returvärdet i konstanten `result`.',
    starterCode: '// Skriv din kod här',
    solution: `function multiply(a, b) {
  return a * b;
}

const result = multiply(3, 4);`,
    hints: [
      'Börja function förljt av funktionens namn',
      'Ange två parametrar',
      'Returnera parameter 1 * parameter 2',
    ],
    tests: [
      {
        description: 'multiply(3, 4) returnerar 12',
        code: 'multiply(3, 4)',
        expected: 12,
      },
      {
        description: 'multiply(2, 5) returnerar 10',
        code: 'multiply(2, 5)',
        expected: 10,
      },
      {
        description: 'multiply(-3, 0) returnerar 0',
        code: 'multiply(-3, 0)',
        expected: 0,
      },
      { description: 'result är 12', code: 'result', expected: 12 },
    ],
  },
  {
    id: 'functions-04',
    title: 'Returnera utifrån ett villkor',
    xp: 10,
    track: 'functions',
    isBoss: false,
    description:
      'Return avslutar funktionsanropet. Därför kan du returnera ett värde inuti if och ett annat efter blocket.',
    explain:
      'När return körs är funktionen klar direkt, och ingen kod efter den körs.\n\nDärför behövs ingen else. Om villkoret är sant returnerar funktionen inuti if. Annars fortsätter den till nästa return.',
    example:
      'function getShipping(total) {\n  if (total >= 500) {\n    return 0;\n  }\n  return 49;\n}',
    task: 'Skriv funktionen `getDiscount` med parametern price. Om price >= 100 ska den returnera 20. Efter if-blocket ska den returnera 0. Använd inte else.',
    starterCode: '// Skriv din kod här',
    solution: `function getDiscount(price) {
  if (price >= 100) {
    return 20;
  }
  return 0;
}`,
    hints: [
      'Deklarera getDiscount med parametern price.',
      'Kontrollera price >= 100 i ett if-block och returnera 20 där.',
      'Placera return 0; efter if-blocket men inuti funktionen.',
    ],
    tests: [
      {
        description: 'getDiscount(150) returnerar 20',
        code: 'getDiscount(150)',
        expected: 20,
      },
      {
        description: 'getDiscount(100) returnerar 20',
        code: 'getDiscount(100)',
        expected: 20,
      },
      {
        description: 'getDiscount(99) returnerar 0',
        code: 'getDiscount(99)',
        expected: 0,
      },
      {
        description: 'getDiscount(0) returnerar 0',
        code: 'getDiscount(0)',
        expected: 0,
      },
    ],
    sourceChecks: [
      {
        description: 'Koden använder inte else',
        pattern: /\belse\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'functions-05',
    title: 'Skriv en arrow function',
    xp: 10,
    track: 'functions',
    isBoss: false,
    description:
      'En arrow function med ett uttryck utan klamrar returnerar uttryckets värde automatiskt.',
    explain:
      'En arrow function är ett kortare sätt att skriva en funktion. Den sparas i en variabel med const, och pilen => står mellan parametrarna och svaret.\n\nUtan klamrar returneras det som står efter pilen automatiskt, så du skriver varken { } eller return.',
    example:
      'const subtract = (a, b) => a - b;\n\n// Samma sak som:\n// function subtract(a, b) {\n//   return a - b;\n// }',
    task: 'Skapa konstanten `multiply` som en arrow function med parametrarna a och b inom parenteser. Returnera a * b utan klamrar eller return. Du ska inte anropa funktionen.',
    starterCode: '// Skriv din kod här',
    solution: 'const multiply = (a, b) => a * b;',
    hints: [
      'Deklarera multiply som en arraow function',
      'Glöm inte parentes och själva =>',
      'Avsluta med a*b',
    ],
    tests: [
      {
        description: 'multiply(3, 4) returnerar 12',
        code: 'multiply(3, 4)',
        expected: 12,
      },
      {
        description: 'multiply(2, 5) returnerar 10',
        code: 'multiply(2, 5)',
        expected: 10,
      },
      isConst('multiply'),
    ],
    sourceChecks: [
      { description: 'multiply är en arrow function', pattern: /=>/ },
      {
        description: 'Koden använder inte return',
        pattern: /\breturn\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'functions-06',
    title: 'return eller console.log?',
    xp: 10,
    track: 'functions',
    isBoss: false,
    description:
      'console.log visar ett värde i konsolen, men funktionen ger inte tillbaka något. Utan return blir resultatet av ett anrop undefined. Vill du använda värdet efteråt måste funktionen returnera det.',
    explain:
      'console.log och return liknar varandra men gör helt olika saker. console.log visar ett värde för dig i konsolen. return ger tillbaka värdet till koden som anropade funktionen.\n\nTänk dig en kalkylator. console.log visar svaret på skärmen, men bara return låter dig räkna vidare med det.',
    example:
      'function triple(number) {\n  return number * 3;\n}\n\nconst big = triple(5);\nconsole.log(big); // 15',
    task: 'Uppgift: `double` skriver ut svaret i stället för att returnera det, så result blir undefined. Rätta `double` så att result blir 8.',
    starterCode: `function double(number) {
  console.log(number * 2);
}

const result = double(4);`,
    solution: `function double(number) {
  return number * 2;
}

const result = double(4);`,
    hints: [
      'Problemet är inuti double.',
      'console.log visar bara värdet. Det behöver skickas tillbaka.',
      'Byt console.log(number * 2); mot return number * 2;',
    ],
    tests: [
      { description: 'result är 8', code: 'result', expected: 8 },
      {
        description: 'double(10) returnerar 20',
        code: 'double(10)',
        expected: 20,
      },
      { description: 'double(0) returnerar 0', code: 'double(0)', expected: 0 },
    ],
  },
  {
    id: 'functions-07',
    title: 'Standardvärden',
    xp: 10,
    track: 'functions',
    isBoss: false,
    description:
      'Skickas inget argument blir parametern undefined. Med ett standardvärde, function greet(name = "du"), får den ett värde ändå. Samma sak används för props i React.',
    explain:
      'Ett standardvärde skrivs med = direkt i parameterlistan. Det används bara när inget argument skickas in.\n\nSkickar du in ett värde vinner det alltid över standardvärdet.',
    example:
      "function welcome(city = 'Stockholm') {\n  return 'Välkommen till ' + city;\n}\n\nwelcome(); // 'Välkommen till Stockholm'\nwelcome('Malmö'); // 'Välkommen till Malmö'",
    task: 'Uppgift: Skriv funktionen `greet` med parametern name som har standardvärdet "du". Den returnerar "Hej " + name + "!".',
    starterCode: '// Skriv din kod här',
    solution: `function greet(name = 'du') {
  return 'Hej ' + name + '!';
}`,
    hints: [
      'Börja med function greet(name) { }.',
      "Standardvärdet skrivs i parentesen: name = 'du'.",
      "Returnera 'Hej ' + name + '!'.",
    ],
    tests: [
      {
        description: 'greet("Ada") ger "Hej Ada!"',
        code: "greet('Ada')",
        expected: 'Hej Ada!',
      },
      {
        description: 'greet() ger "Hej du!"',
        code: 'greet()',
        expected: 'Hej du!',
      },
      {
        description: 'greet(\'Linus\') returnerar "Hej Linus!"',
        code: "greet('Linus')",
        expected: 'Hej Linus!',
      },
    ],
    sourceChecks: [
      {
        description: 'name har ett standardvärde',
        pattern: /name\s*=\s*['"`]du['"`]/,
      },
    ],
  },
  {
    id: 'functions-08',
    title: 'Funktioner som använder funktioner',
    xp: 10,
    track: 'functions',
    isBoss: false,
    description:
      'Små funktioner som gör en sak var är lättare att förstå och testa. Sedan kan större funktioner bygga på dem. Precis så byggs React-appar av små komponenter.',
    explain:
      'En funktion kan anropa en annan funktion. Då körs den inre funktionen först, och svaret används i den yttre.\n\nGe funktionerna namn som säger vad de gör. Då går koden nästan att läsa som en mening.',
    example:
      'function half(n) {\n  return n / 2;\n}\n\nfunction halfOfBoth(a, b) {\n  return half(a) + half(b);\n}',
    task: 'Uppgift: Skriv funktionen `square(n)` som returnerar n * n. Skriv sedan `sumOfSquares(a, b)` som returnerar square(a) + square(b). Använd square inuti sumOfSquares.',
    starterCode: '// Skriv din kod här',
    solution: `function square(n) {
  return n * n;
}

function sumOfSquares(a, b) {
  return square(a) + square(b);
}`,
    hints: [
      'Skriv square först: function square(n) { return n * n; }',
      'sumOfSquares tar emot a och b.',
      'Returnera square(a) + square(b);',
    ],
    tests: [
      {
        description: 'square(5) returnerar 25',
        code: 'square(5)',
        expected: 25,
      },
      {
        description: 'sumOfSquares(3, 4) returnerar 25',
        code: 'sumOfSquares(3, 4)',
        expected: 25,
      },
      {
        description: 'sumOfSquares(1, 2) returnerar 5',
        code: 'sumOfSquares(1, 2)',
        expected: 5,
      },
      {
        description: 'square(-3) returnerar 9',
        code: 'square(-3)',
        expected: 9,
      },
      {
        description: 'sumOfSquares(0, 5) returnerar 25',
        code: 'sumOfSquares(0, 5)',
        expected: 25,
      },
    ],
    sourceChecks: [
      {
        description: 'sumOfSquares använder square',
        pattern: /\bsumOfSquares\b[^]*\bsquare\s*\(\s*a\s*\)/,
      },
    ],
  },
  {
    id: 'functions-09',
    title: 'Arrow function med klamrar',
    xp: 10,
    track: 'functions',
    isBoss: false,
    description:
      'Behöver en arrow function flera rader använder du klamrar. Då måste du skriva return själv, precis som i en vanlig funktion. Utan return blir resultatet undefined.',
    explain:
      'Med klamrar efter pilen blir arrow functionen ett kodblock, precis som en vanlig funktion. Då kan du ha flera rader och if-satser inuti.\n\nSkillnaden är att inget returneras automatiskt längre. Du måste skriva return själv.',
    example:
      "const getSize = cm => {\n  if (cm >= 180) return 'Lång';\n  if (cm >= 150) return 'Mellan';\n  return 'Kort';\n};",
    task: 'Uppgift: Skapa arrow functionen `getGrade` med parametern points. Den returnerar "A" om points är minst 90, "B" om points är minst 50 och annars "C". Använd klamrar och if.',
    starterCode: '// Skriv din kod här',
    solution: `const getGrade = points => {
  if (points >= 90) return 'A';
  if (points >= 50) return 'B';
  return 'C';
};`,
    hints: [
      'Börja med const getGrade = points => { };',
      "Första villkoret: if (points >= 90) return 'A';",
      "Sist, efter alla if: return 'C';",
    ],
    tests: [
      {
        description: 'getGrade(95) ger "A"',
        code: 'getGrade(95)',
        expected: 'A',
      },
      {
        description: 'getGrade(90) ger "A"',
        code: 'getGrade(90)',
        expected: 'A',
      },
      {
        description: 'getGrade(60) ger "B"',
        code: 'getGrade(60)',
        expected: 'B',
      },
      {
        description: 'getGrade(20) ger "C"',
        code: 'getGrade(20)',
        expected: 'C',
      },
      {
        description: 'getGrade(50) returnerar "B"',
        code: 'getGrade(50)',
        expected: 'B',
      },
      {
        description: 'getGrade(49) returnerar "C"',
        code: 'getGrade(49)',
        expected: 'C',
      },
    ],
    sourceChecks: [
      {
        description: 'getGrade är en arrow function',
        pattern: /getGrade\s*=\s*\(?\s*points\s*\)?\s*=>/,
      },
    ],
  },
  {
    id: 'functions-10',
    title: 'Skicka en funktion som argument',
    xp: 10,
    track: 'functions',
    isBoss: false,
    description:
      'En funktion är ett värde, precis som ett tal. Den kan sparas i en variabel och skickas in i en annan funktion, som sedan anropar den. En sådan funktion kallas callback. Det är så map, filter och onClick i React fungerar.',
    explain:
      'När du skickar in en funktion som argument skriver du bara namnet, utan parenteser. Med parenteser körs funktionen direkt, och då skickar du in svaret i stället för funktionen.\n\nFunktionen som tar emot den kan sedan anropa den när den vill, så många gånger den vill.',
    example:
      "function runTwice(fn) {\n  fn();\n  fn();\n}\n\nconst sayHi = () => console.log('Hej!');\nrunTwice(sayHi); // Hej! Hej!",
    task: 'Uppgift: Skapa arrow functionen `addThree` som returnerar talet plus 3. Anropa sedan applyTwice med addThree och 10, och spara svaret i `result`.',
    starterCode: `function applyTwice(fn, value) {
  return fn(fn(value));
}

`,
    solution: `function applyTwice(fn, value) {
  return fn(fn(value));
}

const addThree = number => number + 3;
const result = applyTwice(addThree, 10);`,
    hints: [
      'Skapa const addThree = number => number + 3;',
      'Skicka in funktionen utan parenteser: applyTwice(addThree, 10).',
      'Spara svaret: const result = applyTwice(addThree, 10);',
    ],
    tests: [
      {
        description: 'addThree(1) returnerar 4',
        code: 'addThree(1)',
        expected: 4,
      },
      { description: 'result är 16', code: 'result', expected: 16 },
      {
        description: 'addThree(-3) returnerar 0',
        code: 'addThree(-3)',
        expected: 0,
      },
    ],
    sourceChecks: [
      {
        description: 'addThree skickas in utan att anropas',
        pattern: /applyTwice\s*\(\s*addThree\s*,/,
      },
    ],
  },
  {
    id: 'functions-boss-01',
    title: 'Boss: Kassaapparaten',
    xp: 30,
    track: 'functions',
    isBoss: true,
    description:
      'Bygg en liten kassaapparat av funktioner som bygger på varandra: parametrar, standardvärden, return, villkor och arrow functions.',
    task: `Uppgift: Skriv tre funktioner och ett anrop.
  1. \`lineTotal(price, quantity)\` returnerar price * quantity.
     quantity har standardvärdet 1.
  2. \`applyDiscount(total, percent)\` är en arrow function
     som returnerar total minus percent procent av total.
  3. \`checkout(price, quantity, isMember)\` räknar ut summan med lineTotal.
     Medlemmar får 10 % rabatt via applyDiscount, andra betalar fullt pris.
  Spara checkout(200, 3, true) i konstanten \`receipt\`.`,
    starterCode: '// Skriv din kod här',
    solution: `function lineTotal(price, quantity = 1) {
  return price * quantity;
}

const applyDiscount = (total, percent) => total - (total * percent) / 100;

function checkout(price, quantity, isMember) {
  const total = lineTotal(price, quantity);
  if (isMember) return applyDiscount(total, 10);
  return total;
}

const receipt = checkout(200, 3, true);`,
    hints: [],
    tests: [
      {
        description: 'lineTotal(50) returnerar 50',
        code: 'lineTotal(50)',
        expected: 50,
      },
      {
        description: 'lineTotal(50, 3) returnerar 150',
        code: 'lineTotal(50, 3)',
        expected: 150,
      },
      {
        description: 'lineTotal(7, 0) returnerar 0',
        code: 'lineTotal(7, 0)',
        expected: 0,
      },
      {
        description: 'applyDiscount(200, 25) returnerar 150',
        code: 'applyDiscount(200, 25)',
        expected: 150,
      },
      {
        description: 'applyDiscount(80, 50) returnerar 40',
        code: 'applyDiscount(80, 50)',
        expected: 40,
      },
      {
        description: 'applyDiscount(90, 0) returnerar 90',
        code: 'applyDiscount(90, 0)',
        expected: 90,
      },
      {
        description: 'checkout(100, 2, false) returnerar 200',
        code: 'checkout(100, 2, false)',
        expected: 200,
      },
      {
        description: 'checkout(50, 4, true) returnerar 180',
        code: 'checkout(50, 4, true)',
        expected: 180,
      },
      {
        description: 'checkout(30, 1, true) returnerar 27',
        code: 'checkout(30, 1, true)',
        expected: 27,
      },
      {
        description: 'checkout(200, 3, true) returnerar 540',
        code: 'checkout(200, 3, true)',
        expected: 540,
      },
      { description: 'receipt är 540', code: 'receipt', expected: 540 },
    ],
    sourceChecks: [
      {
        description: 'quantity har standardvärdet 1',
        pattern: /quantity\s*=\s*1\b/,
      },
      {
        description: 'applyDiscount är en arrow function',
        pattern: /applyDiscount\s*=\s*\(/,
      },
      {
        description: 'checkout använder lineTotal och applyDiscount',
        pattern:
          /\bcheckout\b(?=[^]*\blineTotal\s*\()(?=[^]*\bapplyDiscount\s*\()/,
      },
    ],
  },
  {
    id: 'str-01',
    title: 'Strängmetoder',
    xp: 10,
    track: 'strings',
    isBoss: false,
    description:
      'En sträng är text. Strängar har egna funktioner, metoder, som anropas med en punkt: name.toUpperCase() ger texten i versaler. Strängen själv ändras aldrig, du får en ny. length är en egenskap och har inga parenteser: name.length ger antalet tecken.',
    task: 'Uppgift: Skapa `shout` som är name i versaler med toUpperCase, och `letters` som är antalet tecken i name.',
    starterCode: `const name = 'Ada Lovelace';

`,
    solution: `const name = 'Ada Lovelace';

const shout = name.toUpperCase();
const letters = name.length;`,
    hints: [
      'Metoder anropas med punkt och parenteser: name.toUpperCase().',
      'length har inga parenteser.',
      'Skriv const letters = name.length;',
    ],
    tests: [
      {
        description: 'shout är "ADA LOVELACE"',
        code: 'shout',
        expected: 'ADA LOVELACE',
      },
      { description: 'letters är 12', code: 'letters', expected: 12 },
      {
        description: 'name är oförändrad',
        code: 'name',
        expected: 'Ada Lovelace',
      },
    ],
    sourceChecks: [
      {
        description: 'shout skapas med toUpperCase',
        pattern: /name\s*\.\s*toUpperCase\s*\(\s*\)/,
      },
      {
        description: 'letters skapas med name.length',
        pattern: /name\s*\.\s*length\b/,
      },
    ],
  },
  {
    id: 'template-01',
    title: 'Template literals',
    xp: 10,
    track: 'strings',
    isBoss: false,
    description:
      'En template literal skrivs med backticks ` ` i stället för citattecken. Inuti kan du stoppa in värden med ${ }. I React bygger du ofta text och klassnamn så.',
    task: 'Uppgift: Skapa konstanten `greeting` med en template literal som ger texten "Hej Ada!". Använd variabeln name, inte texten Ada direkt.',
    starterCode: `const name = 'Ada';

`,
    solution: "const name = 'Ada';\nconst greeting = `Hej ${name}!`;",
    hints: [
      'Börja med const greeting = och en backtick `.',
      'Skriv Hej följt av ett mellanslag och ${name}.',
      'Avsluta med ! och en backtick.',
    ],
    tests: [
      {
        description: 'greeting är "Hej Ada!"',
        code: 'greeting',
        expected: 'Hej Ada!',
      },
    ],
    sourceChecks: [
      {
        description: 'name stoppas in med ${name} i en template literal',
        pattern: /`[^`]*\$\{\s*name\s*\}[^`]*`/,
      },
      {
        description: 'Texten slås inte ihop med +',
        pattern: /\+/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'template-02',
    title: 'Räkna inuti ${ }',
    xp: 10,
    track: 'strings',
    isBoss: false,
    description:
      'Inuti ${ } kan du skriva vilket JavaScript-uttryck som helst, inte bara en variabel. ${price * quantity} räknar ut summan och stoppar in svaret i texten.',
    task: 'Uppgift: Skapa konstanten `receipt` med en template literal som ger texten "3 st för 75 kr". Hämta antalet från quantity och räkna ut summan med price * quantity inuti ${ }.',
    starterCode: `const price = 25;
const quantity = 3;

`,
    solution:
      'const price = 25;\nconst quantity = 3;\n\nconst receipt = `${quantity} st för ${price * quantity} kr`;',
    hints: [
      'Börja med const receipt = och en backtick `.',
      'Antalet stoppas in med ${quantity}.',
      'Summan räknas ut direkt i texten: ${price * quantity}.',
    ],
    tests: [
      {
        description: 'receipt är "3 st för 75 kr"',
        code: 'receipt',
        expected: '3 st för 75 kr',
      },
    ],
    sourceChecks: [
      {
        description: 'quantity stoppas in med ${quantity}',
        pattern: /`[^`]*\$\{\s*quantity\s*\}[^`]*`/,
      },
      {
        description: 'Summan räknas ut inuti ${ }',
        pattern: /\$\{\s*(?:price\s*\*\s*quantity|quantity\s*\*\s*price)\s*\}/,
      },
      {
        description: 'Summan 75 skrivs inte in för hand',
        pattern: /75/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'template-03',
    title: 'Bygg text i en funktion',
    xp: 10,
    track: 'strings',
    isBoss: false,
    description:
      'Template literals passar bra i funktioner som bygger text. Funktionen får värdena som parametrar och returnerar färdig text. Det gör du ofta i React, till exempel för en etikett eller ett klassnamn.',
    task: 'Uppgift: Skriv funktionen `formatPrice(name, price)` som returnerar texten "Keps: 199 kr" (med name och price i stället för Keps och 199). Använd en template literal.',
    starterCode: '// Skriv din kod här',
    solution:
      'function formatPrice(name, price) {\n  return `${name}: ${price} kr`;\n}',
    hints: [
      'Börja med function formatPrice(name, price) { }.',
      'Returnera en template literal: return `…`;',
      'Inuti: ${name}, sedan ": ", sedan ${price} och " kr".',
    ],
    tests: [
      {
        description: 'formatPrice(\'Keps\', 199) returnerar "Keps: 199 kr"',
        code: "formatPrice('Keps', 199)",
        expected: 'Keps: 199 kr',
      },
      {
        description: 'formatPrice(\'Mössa\', 149) returnerar "Mössa: 149 kr"',
        code: "formatPrice('Mössa', 149)",
        expected: 'Mössa: 149 kr',
      },
      {
        description: 'formatPrice(\'Vante\', 0) returnerar "Vante: 0 kr"',
        code: "formatPrice('Vante', 0)",
        expected: 'Vante: 0 kr',
      },
    ],
    sourceChecks: [
      {
        description: 'Texten byggs med en template literal',
        pattern: /`[^`]*\$\{[^`]*`/,
      },
      {
        description: 'Texten slås inte ihop med +',
        pattern: /\+/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'str-02',
    title: 'Sök i text med includes',
    xp: 10,
    track: 'strings',
    isBoss: false,
    description:
      'text.includes("React") är true om texten innehåller "React". Den skiljer på stora och små bokstäver. Gör därför om båda till gemener med toLowerCase innan du jämför. Det är så sökfält fungerar.',
    task: 'Uppgift: Skriv funktionen `matches(name, query)` som returnerar true om name innehåller query, oavsett stora eller små bokstäver.',
    starterCode: '// Skriv din kod här',
    solution: `function matches(name, query) {
  return name.toLowerCase().includes(query.toLowerCase());
}`,
    hints: [
      'Gör om både name och query till gemener.',
      'Metoder kan kedjas: name.toLowerCase().includes(…).',
      'Returnera name.toLowerCase().includes(query.toLowerCase());',
    ],
    tests: [
      {
        description: 'matches("Ada Lovelace", "love") är true',
        code: "matches('Ada Lovelace', 'love')",
        expected: true,
      },
      {
        description: 'matches("Ada Lovelace", "ADA") är true',
        code: "matches('Ada Lovelace', 'ADA')",
        expected: true,
      },
      {
        description: 'matches("Ada Lovelace", "xyz") är false',
        code: "matches('Ada Lovelace', 'xyz')",
        expected: false,
      },
      {
        description: "matches('Grace Hopper', 'hop') returnerar true",
        code: "matches('Grace Hopper', 'hop')",
        expected: true,
      },
      {
        description: "matches('Linus', 'Ada') returnerar false",
        code: "matches('Linus', 'Ada')",
        expected: false,
      },
    ],
    sourceChecks: [
      { description: 'Koden använder includes', pattern: /\.\s*includes\s*\(/ },
    ],
  },
  {
    id: 'str-03',
    title: 'Städa text med trim',
    xp: 10,
    track: 'strings',
    isBoss: false,
    description:
      'Användare skriver ofta mellanslag av misstag. text.trim() tar bort mellanslag i början och slutet. En text med bara mellanslag blir då tom, så du kan se att inget riktigt skrivits.',
    task: 'Uppgift: Skriv funktionen `isBlank(text)` som returnerar true om text är tom eller bara innehåller mellanslag.',
    starterCode: '// Skriv din kod här',
    solution: `function isBlank(text) {
  return text.trim() === '';
}`,
    hints: [
      'Ta bort mellanslagen med text.trim().',
      "Jämför resultatet med en tom sträng ''.",
      "Returnera text.trim() === '';",
    ],
    tests: [
      {
        description: 'isBlank("   ") är true',
        code: "isBlank('   ')",
        expected: true,
      },
      {
        description: 'isBlank("") är true',
        code: "isBlank('')",
        expected: true,
      },
      {
        description: 'isBlank("  Ada ") är false',
        code: "isBlank('  Ada ')",
        expected: false,
      },
      {
        description: "isBlank('a') returnerar false",
        code: "isBlank('a')",
        expected: false,
      },
    ],
    sourceChecks: [
      { description: 'Koden använder trim', pattern: /\.\s*trim\s*\(\s*\)/ },
    ],
  },
  {
    id: 'str-04',
    title: 'Dela upp och sätt ihop',
    xp: 10,
    track: 'strings',
    isBoss: false,
    description:
      'text.split(" ") delar upp en sträng i en array vid varje mellanslag. array.join("-") gör tvärtom och sätter ihop en array till en sträng med "-" emellan.',
    task: 'Uppgift: Skriv funktionen `toSlug(title)` som gör om titeln till gemener och byter varje mellanslag mot ett bindestreck med split och join.',
    starterCode: '// Skriv din kod här',
    solution: `function toSlug(title) {
  return title.toLowerCase().split(' ').join('-');
}`,
    hints: [
      'Börja med title.toLowerCase().',
      "Dela vid mellanslag med .split(' ').",
      "Sätt ihop med .join('-').",
    ],
    tests: [
      {
        description:
          'toSlug("Min Första React App") ger "min-första-react-app"',
        code: "toSlug('Min Första React App')",
        expected: 'min-första-react-app',
      },
      {
        description: 'toSlug("Hej") ger "hej"',
        code: "toSlug('Hej')",
        expected: 'hej',
      },
      {
        description: 'toSlug(\'React Är Kul\') returnerar "react-är-kul"',
        code: "toSlug('React Är Kul')",
        expected: 'react-är-kul',
      },
    ],
    sourceChecks: [
      { description: 'Koden använder split', pattern: /\.\s*split\s*\(/ },
      { description: 'Koden använder join', pattern: /\.\s*join\s*\(/ },
    ],
  },
  {
    id: 'str-05',
    title: '=== och ==',
    xp: 10,
    track: 'strings',
    isBoss: false,
    description:
      'JavaScript har två sätt att jämföra. == gör om värdena innan det jämför, så "5" == 5 är true. === jämför både värde och typ, så "5" === 5 är false. Använd alltid === och !==, då slipper du överraskningar.',
    task: 'Uppgift: `isFive` använder == och säger att texten "5" är talet 5. Rätta den så att bara talet 5 räknas.',
    starterCode: `function isFive(value) {
  return value == 5;
}`,
    solution: `function isFive(value) {
  return value === 5;
}`,
    hints: [
      'Problemet är jämförelsen.',
      '== gör om "5" till 5 innan den jämför.',
      'Byt == mot ===.',
    ],
    tests: [
      { description: 'isFive(5) är true', code: 'isFive(5)', expected: true },
      {
        description: 'isFive("5") är false',
        code: "isFive('5')",
        expected: false,
      },
      {
        description: 'isFive(4) returnerar false',
        code: 'isFive(4)',
        expected: false,
      },
    ],
    sourceChecks: [
      {
        description: 'Koden använder inte ==',
        pattern: /[^=!]==[^=]/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'str-06',
    title: 'Truthy och falsy',
    xp: 10,
    track: 'strings',
    isBoss: false,
    description:
      'I ett villkor räknas varje värde som sant eller falskt. Exakt sex värden är falsy: false, 0, "", null, undefined och NaN. Allt annat är truthy, även "0", [] och {}. Därför visar {count && …} en nolla i React: 0 är falsy men renderas ändå.',
    task: 'Uppgift: Skapa arrayen `falsyValues` med alla sex falsy värden.',
    starterCode: '// Skriv din kod här',
    solution: "const falsyValues = [false, 0, '', null, undefined, NaN];",
    hints: [
      'Arrayen ska ha sex värden.',
      'Två av dem är false och 0. En är en tom sträng.',
      "Skriv [false, 0, '', null, undefined, NaN].",
    ],
    tests: [
      {
        description: 'falsyValues har sex värden',
        code: 'falsyValues.length',
        expected: 6,
      },
      {
        description: 'Alla värden är falsy',
        code: 'falsyValues.every(value => !value)',
        expected: true,
      },
      {
        description: 'Alla sex olika falsy värden finns med',
        code: "[false, 0, '', null, undefined].every(value => falsyValues.includes(value)) && falsyValues.some(Number.isNaN)",
        expected: true,
      },
    ],
  },
  {
    id: 'str-07',
    title: 'Reservvärde med ??',
    xp: 10,
    track: 'strings',
    isBoss: false,
    description:
      'value ?? "reserv" ger reservvärdet bara om value är null eller undefined. Den äldre varianten value || "reserv" byter även ut 0 och "", och det är ofta fel. En volym på 0 är ett riktigt värde.',
    task: 'Uppgift: Skriv funktionen `getVolume(settings)` som returnerar settings.volume, eller 50 om volume saknas. En volym på 0 ska behållas.',
    starterCode: '// Skriv din kod här',
    solution: `function getVolume(settings) {
  return settings.volume ?? 50;
}`,
    hints: [
      'Värdet finns i settings.volume.',
      '|| byter ut 0. Använd ?? i stället.',
      'Returnera settings.volume ?? 50;',
    ],
    tests: [
      {
        description: 'getVolume({ volume: 80 }) ger 80',
        code: 'getVolume({ volume: 80 })',
        expected: 80,
      },
      {
        description: 'getVolume({}) ger 50',
        code: 'getVolume({})',
        expected: 50,
      },
      {
        description: 'getVolume({ volume: 0 }) ger 0',
        code: 'getVolume({ volume: 0 })',
        expected: 0,
      },
      {
        description: 'getVolume({ volume: 15 }) returnerar 15',
        code: 'getVolume({ volume: 15 })',
        expected: 15,
      },
    ],
    sourceChecks: [{ description: 'Koden använder ??', pattern: /\?\?/ }],
  },
  {
    id: 'str-08',
    title: 'Läs säkert med ?.',
    xp: 10,
    track: 'strings',
    isBoss: false,
    description:
      'user.address.city kraschar om user eller address saknas. Med optional chaining, user?.address?.city, blir svaret undefined i stället. Kombinera med ?? för ett reservvärde. Det är vanligt i React, där data ofta inte har hunnit laddas än.',
    task: 'Uppgift: Skriv funktionen `getCity(user)` som returnerar user.address.city, eller "Okänd stad" om user, address eller city saknas.',
    starterCode: '// Skriv din kod här',
    solution: `function getCity(user) {
  return user?.address?.city ?? 'Okänd stad';
}`,
    hints: [
      'Byt varje . mot ?. där värdet kan saknas.',
      'user?.address?.city ger undefined om något saknas.',
      "Lägg till ?? 'Okänd stad' sist.",
    ],
    tests: [
      {
        description: 'En hel adress ger staden',
        code: "getCity({ address: { city: 'Lund' } })",
        expected: 'Lund',
      },
      {
        description: 'Utan address: "Okänd stad"',
        code: 'getCity({})',
        expected: 'Okänd stad',
      },
      {
        description: 'Utan user: "Okänd stad"',
        code: 'getCity(null)',
        expected: 'Okänd stad',
      },
      {
        description: 'getCity({ address: {} }) returnerar "Okänd stad"',
        code: 'getCity({ address: {} })',
        expected: 'Okänd stad',
      },
      {
        description:
          'getCity({ address: { city: \'Malmö\' } }) returnerar "Malmö"',
        code: "getCity({ address: { city: 'Malmö' } })",
        expected: 'Malmö',
      },
    ],
    sourceChecks: [
      { description: 'Koden använder ?.', pattern: /\?\.\s*address/ },
      {
        description: 'Koden använder inte if',
        pattern: /\bif\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'str-boss-01',
    title: 'Boss: Sökrutan',
    xp: 30,
    track: 'strings',
    isBoss: true,
    description:
      'Bygg logiken bakom en sökruta: städa texten, jämför utan att bry dig om stora och små bokstäver, och hantera data som saknas.',
    task: `Uppgift: Skriv funktionen \`searchUsers(users, query)\`.
  Varje användare visas med sitt smeknamn (nickname),
    eller med name om nickname saknas. Använd ??.
  Ta bort mellanslag runt query med trim.
  Är query tom: returnera alla visningsnamn.
  Annars: returnera visningsnamnen för användarna vars name
    innehåller query, oavsett stora och små bokstäver.`,
    starterCode: `const users = [
  { name: 'Ada Lovelace', nickname: 'Ada' },
  { name: 'Linus Torvalds' },
  { name: 'Grace Hopper', nickname: 'Amazing Grace' },
];

`,
    solution: `const users = [
  { name: 'Ada Lovelace', nickname: 'Ada' },
  { name: 'Linus Torvalds' },
  { name: 'Grace Hopper', nickname: 'Amazing Grace' },
];

function searchUsers(users, query) {
  const cleanQuery = query.trim().toLowerCase();
  const found = [];
  for (const user of users) {
    if (user.name.toLowerCase().includes(cleanQuery)) {
      found.push(user.nickname ?? user.name);
    }
  }
  return found;
}`,
    hints: [],
    tests: [
      {
        description: 'Tom sökning ger alla visningsnamn',
        code: "searchUsers(users, '')",
        expected: ['Ada', 'Linus Torvalds', 'Amazing Grace'],
      },
      {
        description: 'Bara mellanslag räknas som tom sökning',
        code: "searchUsers(users, '   ').length",
        expected: 3,
      },
      {
        description: '"  HOPPER " hittar Grace',
        code: "searchUsers(users, '  HOPPER ')",
        expected: ['Amazing Grace'],
      },
      {
        description: '"o" hittar alla med o i namnet',
        code: "searchUsers(users, 'o')",
        expected: ['Ada', 'Linus Torvalds', 'Amazing Grace'],
      },
      {
        description: 'En sökning utan träffar ger []',
        code: "searchUsers(users, 'xyz')",
        expected: [],
      },
    ],
    sourceChecks: [
      { description: 'Koden använder ??', pattern: /\?\?/ },
      { description: 'Koden använder trim', pattern: /\.\s*trim\s*\(\s*\)/ },
    ],
  },
  {
    id: 'map-01',
    title: 'Dubbla med map',
    xp: 10,
    track: 'array-methods',
    isBoss: false,
    description:
      'map anropar en funktion för varje värde och returnerar en ny array med resultaten. Den ursprungliga arrayen ändras inte.',
    task: 'Uppgift: Skapa konstanten `doubled` med numbers.map och en arrow function som returnerar varje tal gånger 2.',
    starterCode: `const numbers = [1, 2, 3];

`,
    solution: `const numbers = [1, 2, 3];
const doubled = numbers.map(number => number * 2);`,
    hints: [
      'Börja med const doubled = numbers.map(...).',
      'Skicka in en arrow function till map, till exempel number => ...',
      'Arrow functionen ska returnera number * 2.',
    ],
    tests: [
      {
        description: 'doubled är [2, 4, 6]',
        code: 'doubled',
        expected: [2, 4, 6],
      },
      {
        description: 'numbers är fortfarande [1, 2, 3]',
        code: 'numbers',
        expected: [1, 2, 3],
      },
    ],
    sourceChecks: [
      {
        description: 'doubled skapas med numbers.map',
        pattern: /numbers\s*\.\s*map\s*\(/,
      },
      {
        description: 'Koden använder ingen loop',
        pattern: /\b(for|while)\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'map-02',
    title: 'Plocka ut namn med map',
    xp: 10,
    track: 'array-methods',
    isBoss: false,
    description:
      'Med map kan du göra om en array av objekt till en array av enskilda värden. I React är det så du gör om data till en lista.',
    task: 'Uppgift: Skapa konstanten `names` med users.map som returnerar name för varje användare.',
    starterCode: `const users = [
  { name: 'Ada', age: 36 },
  { name: 'Linus', age: 28 },
  { name: 'Grace', age: 45 },
];

`,
    solution: `const users = [
  { name: 'Ada', age: 36 },
  { name: 'Linus', age: 28 },
  { name: 'Grace', age: 45 },
];
const names = users.map(user => user.name);`,
    hints: [
      'Börja med const names = users.map(...).',
      'Arrow functionen tar emot en användare åt gången, till exempel user => ...',
      'Returnera user.name.',
    ],
    tests: [
      {
        description: 'names är ["Ada", "Linus", "Grace"]',
        code: 'names',
        expected: ['Ada', 'Linus', 'Grace'],
      },
      {
        description: 'users har fortfarande tre användare',
        code: 'users.length',
        expected: 3,
      },
    ],
    sourceChecks: [
      {
        description: 'names skapas med users.map',
        pattern: /users\s*\.\s*map\s*\(/,
      },
    ],
  },
  {
    id: 'filter-01',
    title: 'Filtrera tal',
    xp: 10,
    track: 'array-methods',
    isBoss: false,
    description:
      'filter returnerar en ny array med de värden där funktionen returnerar true.',
    task: 'Uppgift: Skapa konstanten `bigNumbers` med numbers.filter och behåll bara talen som är större än 10.',
    starterCode: `const numbers = [5, 12, 8, 20, 3];

`,
    solution: `const numbers = [5, 12, 8, 20, 3];
const bigNumbers = numbers.filter(number => number > 10);`,
    hints: [
      'Börja med const bigNumbers = numbers.filter(...).',
      'Arrow functionen ska returnera true för de tal som ska vara kvar.',
      'Jämför med number > 10.',
    ],
    tests: [
      {
        description: 'bigNumbers är [12, 20]',
        code: 'bigNumbers',
        expected: [12, 20],
      },
      {
        description: 'numbers är oförändrad',
        code: 'numbers',
        expected: [5, 12, 8, 20, 3],
      },
    ],
    sourceChecks: [
      {
        description: 'bigNumbers skapas med numbers.filter',
        pattern: /numbers\s*\.\s*filter\s*\(/,
      },
    ],
  },
  {
    id: 'filter-02',
    title: 'Filtrera objekt',
    xp: 10,
    track: 'array-methods',
    isBoss: false,
    description:
      'filter fungerar lika bra på objekt. Funktionen kan läsa en egenskap och avgöra om objektet ska vara med.',
    task: 'Uppgift: Skapa konstanten `doneTodos` med todos.filter och behåll bara uppgifterna där done är true.',
    starterCode: `const todos = [
  { id: 1, text: 'Handla', done: true },
  { id: 2, text: 'Träna', done: false },
  { id: 3, text: 'Plugga React', done: true },
];

`,
    solution: `const todos = [
  { id: 1, text: 'Handla', done: true },
  { id: 2, text: 'Träna', done: false },
  { id: 3, text: 'Plugga React', done: true },
];
const doneTodos = todos.filter(todo => todo.done);`,
    hints: [
      'Börja med const doneTodos = todos.filter(...).',
      'Arrow functionen tar emot en todo åt gången.',
      'todo.done är redan true eller false, så du kan returnera det direkt.',
    ],
    tests: [
      {
        description: 'doneTodos innehåller "Handla" och "Plugga React"',
        code: 'doneTodos.map(todo => todo.text)',
        expected: ['Handla', 'Plugga React'],
      },
      {
        description: 'doneTodos innehåller samma objekt som todos',
        code: 'doneTodos[0] === todos[0]',
        expected: true,
      },
      {
        description: 'todos har fortfarande tre uppgifter',
        code: 'todos.length',
        expected: 3,
      },
    ],
    sourceChecks: [
      {
        description: 'doneTodos skapas med todos.filter',
        pattern: /todos\s*\.\s*filter\s*\(/,
      },
    ],
  },
  {
    id: 'find-01',
    title: 'Hitta ett objekt',
    xp: 10,
    track: 'array-methods',
    isBoss: false,
    description:
      'find returnerar det första värdet där funktionen returnerar true. Hittas inget blir resultatet undefined.',
    task: 'Uppgift: Skapa konstanten `todo` med todos.find och hämta uppgiften som har id 2.',
    starterCode: `const todos = [
  { id: 1, text: 'Handla', done: true },
  { id: 2, text: 'Träna', done: false },
  { id: 3, text: 'Plugga React', done: true },
];

`,
    solution: `const todos = [
  { id: 1, text: 'Handla', done: true },
  { id: 2, text: 'Träna', done: false },
  { id: 3, text: 'Plugga React', done: true },
];
const todo = todos.find(item => item.id === 2);`,
    hints: [
      'Börja med const todo = todos.find(...).',
      'Arrow functionen tar emot ett objekt åt gången, till exempel item => ...',
      'Jämför item.id === 2.',
    ],
    tests: [
      {
        description: 'todo är samma objekt som todos[1]',
        code: 'todo === todos[1]',
        expected: true,
      },
      {
        description: 'todos har fortfarande tre uppgifter',
        code: 'todos.length',
        expected: 3,
      },
    ],
    sourceChecks: [
      {
        description: 'todo hämtas med todos.find',
        pattern: /todos\s*\.\s*find\s*\(/,
      },
    ],
  },
  {
    id: 'reduce-01',
    title: 'Summera med reduce',
    xp: 10,
    track: 'array-methods',
    isBoss: false,
    description:
      'reduce slår ihop en array till ett enda värde. Funktionen får det hittills samlade värdet och nästa värde i arrayen, och returnerar det nya samlade värdet. Det andra argumentet till reduce är startvärdet.',
    task: 'Uppgift: Skapa konstanten `total` med numbers.reduce som summerar alla tal. Använd 0 som startvärde.',
    starterCode: `const numbers = [5, 10, 15];

`,
    solution: `const numbers = [5, 10, 15];
const total = numbers.reduce((sum, number) => sum + number, 0);`,
    hints: [
      'Börja med const total = numbers.reduce(...).',
      'Funktionen tar två parametrar: (sum, number) => ...',
      'Returnera sum + number och skicka in 0 som andra argument till reduce.',
    ],
    tests: [
      { description: 'total har värdet 30', code: 'total', expected: 30 },
      {
        description: 'numbers är oförändrad',
        code: 'numbers',
        expected: [5, 10, 15],
      },
    ],
    sourceChecks: [
      {
        description: 'total räknas ut med numbers.reduce',
        pattern: /numbers\s*\.\s*reduce\s*\(/,
      },
      {
        description: 'Koden använder ingen loop',
        pattern: /\b(for|while)\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'array-methods-boss-01',
    title: 'Boss: Butikens lager',
    xp: 30,
    track: 'array-methods',
    isBoss: true,
    description: 'Kombinera map, filter, find och reduce.',
    task: `Uppgift: Utgå från products.
  Skapa \`inStock\` med filter: bara produkter där inStock är true.
  Skapa \`inStockNames\` med map på inStock: bara namnen.
  Skapa \`cap\` med find: produkten som heter "Keps".
  Skapa \`totalPrice\` med reduce på inStock: summan av alla priser.
  Använd inga loopar.`,
    starterCode: `const products = [
  { name: 'Keps', price: 199, inStock: true },
  { name: 'Mössa', price: 149, inStock: false },
  { name: 'Halsduk', price: 299, inStock: true },
];

`,
    solution: `const products = [
  { name: 'Keps', price: 199, inStock: true },
  { name: 'Mössa', price: 149, inStock: false },
  { name: 'Halsduk', price: 299, inStock: true },
];
const inStock = products.filter(product => product.inStock);
const inStockNames = inStock.map(product => product.name);
const cap = products.find(product => product.name === 'Keps');
const totalPrice = inStock.reduce((sum, product) => sum + product.price, 0);`,
    hints: [],
    tests: [
      {
        description: 'inStock innehåller Keps och Halsduk',
        code: 'inStock.map(product => product.name)',
        expected: ['Keps', 'Halsduk'],
      },
      {
        description: 'inStockNames är ["Keps", "Halsduk"]',
        code: 'inStockNames',
        expected: ['Keps', 'Halsduk'],
      },
      {
        description: 'cap är samma objekt som products[0]',
        code: 'cap === products[0]',
        expected: true,
      },
      {
        description: 'totalPrice har värdet 498',
        code: 'totalPrice',
        expected: 498,
      },
      {
        description: 'products har fortfarande tre produkter',
        code: 'products.length',
        expected: 3,
      },
    ],
    sourceChecks: [
      {
        description: 'inStock skapas med products.filter',
        pattern: /products\s*\.\s*filter\s*\(/,
      },
      {
        description: 'inStockNames skapas med inStock.map',
        pattern: /inStock\s*\.\s*map\s*\(/,
      },
      {
        description: 'cap hämtas med products.find',
        pattern: /products\s*\.\s*find\s*\(/,
      },
      {
        description: 'totalPrice räknas ut med inStock.reduce',
        pattern: /inStock\s*\.\s*reduce\s*\(/,
      },
      {
        description: 'Koden använder ingen loop',
        pattern: /\b(for|while)\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'destructuring-01',
    title: 'Plocka ut ur ett objekt',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'Med destructuring plockar du ut egenskaper ur ett objekt till egna variabler på en rad: const { name } = user; skapar variabeln name med värdet user.name.',
    task: 'Uppgift: Plocka ut `name` och `age` ur user med destructuring på en rad.',
    starterCode: `const user = { name: 'Ada', age: 36 };

`,
    solution: `const user = { name: 'Ada', age: 36 };
const { name, age } = user;`,
    hints: [
      'Börja med const { } = user;',
      'Skriv namnen på egenskaperna inuti klamrarna.',
      'Separera name och age med kommatecken.',
    ],
    tests: [
      { description: 'name har värdet "Ada"', code: 'name', expected: 'Ada' },
      { description: 'age har värdet 36', code: 'age', expected: 36 },
    ],
    sourceChecks: [
      {
        description: 'name och age plockas ut med const { ... } = user',
        pattern:
          /const\s*\{(?=[^}]*\bname\b)(?=[^}]*\bage\b)[^}]*\}\s*=\s*user\b/,
      },
    ],
  },
  {
    id: 'destructuring-02',
    title: 'Plocka ut ur en array',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'Destructuring fungerar också på arrayer, men med [ ] och efter position i stället för namn. Det är så du tar emot värdena från useState i React: const [count, setCount] = useState(0);',
    task: 'Uppgift: Plocka ut de två första värdena i scores till `first` och `second` med array-destructuring på en rad.',
    starterCode: `const scores = [90, 75, 60];

`,
    solution: `const scores = [90, 75, 60];
const [first, second] = scores;`,
    hints: [
      'Börja med const [ ] = scores;',
      'Variablerna får värdena i samma ordning som i arrayen.',
      'Skriv first, second inuti hakparenteserna.',
    ],
    tests: [
      { description: 'first har värdet 90', code: 'first', expected: 90 },
      { description: 'second har värdet 75', code: 'second', expected: 75 },
    ],
    sourceChecks: [
      {
        description: 'Värdena plockas ut med const [first, second] = scores',
        pattern: /const\s*\[\s*first\s*,\s*second\s*\]\s*=\s*scores\b/,
      },
    ],
  },
  {
    id: 'destructuring-03',
    title: 'Destructuring i parametrar',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'Du kan plocka isär ett objekt direkt i parameterlistan. Så tar en React-komponent emot sina props: function Greeting({ name }) { ... }',
    task: 'Uppgift: Skriv funktionen `greet` som tar emot ett objekt och plockar ut name direkt i parameterlistan. Den ska returnera "Hej " följt av namnet och "!".',
    starterCode: '// Skriv din kod här',
    solution: 'function greet({ name }) {\n  return `Hej ${name}!`;\n}',
    hints: [
      'Börja med function greet( ).',
      'Skriv { name } inuti parenteserna i stället för ett vanligt parameternamn.',
      'Returnera en template literal med ${name}.',
    ],
    tests: [
      {
        description: 'greet({ name: "Ada" }) returnerar "Hej Ada!"',
        code: 'greet({ name: "Ada" })',
        expected: 'Hej Ada!',
      },
      {
        description:
          'greet({ name: "Linus", age: 28 }) returnerar "Hej Linus!"',
        code: 'greet({ name: "Linus", age: 28 })',
        expected: 'Hej Linus!',
      },
      {
        description: 'greet({ name: \'Grace\' }) returnerar "Hej Grace!"',
        code: "greet({ name: 'Grace' })",
        expected: 'Hej Grace!',
      },
    ],
    sourceChecks: [
      {
        description: 'name plockas ut i parameterlistan',
        pattern: /\(\s*\{\s*name\s*\}\s*\)/,
      },
    ],
  },
  {
    id: 'spread-01',
    title: 'Spread: kopiera en array',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'Spread, ..., packar upp en array till sina värden. [...todos, "Ny"] skapar en ny array med allt från todos plus ett nytt värde. I React ändrar du aldrig state direkt, du skapar en ny array så här.',
    task: 'Uppgift: Skapa konstanten `newTodos` med spread: alla värden från todos följt av "Plugga React". Använd inte push, todos ska vara oförändrad.',
    starterCode: `const todos = ['Handla', 'Träna'];

`,
    solution: `const todos = ['Handla', 'Träna'];
const newTodos = [...todos, 'Plugga React'];`,
    hints: [
      'Börja med const newTodos = [ ];',
      'Skriv ...todos först inuti hakparenteserna.',
      'Lägg till "Plugga React" efter ett kommatecken.',
    ],
    tests: [
      {
        description: 'newTodos är ["Handla", "Träna", "Plugga React"]',
        code: 'newTodos',
        expected: ['Handla', 'Träna', 'Plugga React'],
      },
      {
        description: 'todos är fortfarande ["Handla", "Träna"]',
        code: 'todos',
        expected: ['Handla', 'Träna'],
      },
    ],
    sourceChecks: [
      {
        description: 'newTodos skapas med [...todos, ...]',
        pattern: /\[\s*\.\.\.\s*todos\b/,
      },
      {
        description: 'Koden använder inte push',
        pattern: /\bpush\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'spread-02',
    title: 'Spread: kopiera ett objekt',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'Spread fungerar också på objekt. { ...user, age: 37 } kopierar alla egenskaper från user och skriver sedan över age. Det som står sist vinner.',
    task: 'Uppgift: Skapa konstanten `olderUser` med spread: en kopia av user där age är 37. user ska vara oförändrad.',
    starterCode: `const user = { name: 'Ada', age: 36 };

`,
    solution: `const user = { name: 'Ada', age: 36 };
const olderUser = { ...user, age: 37 };`,
    hints: [
      'Börja med const olderUser = { };',
      'Skriv ...user först inuti klamrarna.',
      'Lägg till age: 37 efter ...user, så att det nya värdet vinner.',
    ],
    tests: [
      {
        description: 'olderUser.name är "Ada"',
        code: 'olderUser.name',
        expected: 'Ada',
      },
      {
        description: 'olderUser.age är 37',
        code: 'olderUser.age',
        expected: 37,
      },
      {
        description: 'user.age är fortfarande 36',
        code: 'user.age',
        expected: 36,
      },
      {
        description: 'olderUser är ett nytt objekt',
        code: 'olderUser !== user',
        expected: true,
      },
    ],
    sourceChecks: [
      {
        description: 'olderUser skapas med { ...user, ... }',
        pattern: /\{\s*\.\.\.\s*user\b/,
      },
    ],
  },
  {
    id: 'rest-01',
    title: 'Rest: resten av en array',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'Rest ser ut som spread men gör tvärtom: den packar ihop. Står ... till vänster om = är det rest. const [first, ...others] = numbers; ger first det första värdet och others en array med resten.',
    task: 'Uppgift: Plocka ut första värdet i numbers till `first` och samla resten i arrayen `others`. Använd rest på en rad.',
    starterCode: `const numbers = [1, 2, 3, 4];

`,
    solution: `const numbers = [1, 2, 3, 4];
const [first, ...others] = numbers;`,
    hints: [
      'Börja med const [ ] = numbers; som i array-destructuring.',
      'Skriv first som första variabel.',
      'Skriv ...others sist, den samlar ihop resten.',
    ],
    tests: [
      { description: 'first har värdet 1', code: 'first', expected: 1 },
      {
        description: 'others är [2, 3, 4]',
        code: 'others',
        expected: [2, 3, 4],
      },
    ],
    sourceChecks: [
      {
        description:
          'Värdena plockas ut med const [first, ...others] = numbers',
        pattern:
          /const\s*\[\s*first\s*,\s*\.\.\.\s*others\s*\]\s*=\s*numbers\b/,
      },
    ],
  },
  {
    id: 'rest-02',
    title: 'Rest: resten av ett objekt',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'Rest fungerar också på objekt: const { id, ...details } = user; plockar ut id och samlar alla andra egenskaper i ett nytt objekt.',
    task: 'Uppgift: Plocka ut `id` ur user och samla resten av egenskaperna i objektet `details`. Använd rest på en rad.',
    starterCode: `const user = { id: 1, name: 'Ada', age: 36 };

`,
    solution: `const user = { id: 1, name: 'Ada', age: 36 };
const { id, ...details } = user;`,
    hints: [
      'Börja med const { } = user; som i objekt-destructuring.',
      'Skriv id som första namn.',
      'Skriv ...details sist, den samlar ihop resten.',
    ],
    tests: [
      { description: 'id har värdet 1', code: 'id', expected: 1 },
      {
        description: 'details är { name: "Ada", age: 36 }',
        code: 'details',
        expected: { name: 'Ada', age: 36 },
      },
      {
        description: 'user har fortfarande id',
        code: 'user.id',
        expected: 1,
      },
    ],
    sourceChecks: [
      {
        description: 'Värdena plockas ut med const { id, ...details } = user',
        pattern: /const\s*\{\s*id\s*,\s*\.\.\.\s*details\s*\}\s*=\s*user\b/,
      },
    ],
  },
  {
    id: 'rest-03',
    title: 'Rest i parametrar',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'Med rest i parameterlistan tar en funktion emot hur många argument som helst. function sum(...numbers) samlar alla argument i arrayen numbers.',
    task: 'Uppgift: Skriv funktionen `sum` med rest-parametern ...numbers. Den ska returnera summan av alla argument. Använd reduce.',
    starterCode: '// Skriv din kod här',
    solution: `function sum(...numbers) {
  return numbers.reduce((total, number) => total + number, 0);
}`,
    hints: [
      'Börja med function sum(...numbers).',
      'numbers är en vanlig array inuti funktionen.',
      'Returnera numbers.reduce((total, number) => total + number, 0).',
    ],
    tests: [
      {
        description: 'sum(1, 2, 3) returnerar 6',
        code: 'sum(1, 2, 3)',
        expected: 6,
      },
      { description: 'sum(5) returnerar 5', code: 'sum(5)', expected: 5 },
      {
        description: 'sum(10, 20, 30, 40) returnerar 100',
        code: 'sum(10, 20, 30, 40)',
        expected: 100,
      },
      { description: 'sum() returnerar 0', code: 'sum()', expected: 0 },
    ],
    sourceChecks: [
      {
        description: 'sum har rest-parametern ...numbers',
        pattern: /\(\s*\.\.\.\s*numbers\s*\)/,
      },
      {
        description: 'Summan räknas ut med reduce',
        pattern: /\.\s*reduce\s*\(/,
      },
    ],
  },
  {
    id: 'ternary-01',
    title: 'Välj med ? :',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'Villkorsoperatorn villkor ? a : b ger a om villkoret är sant och annars b. Den är ett uttryck, så den fungerar mitt i JSX där if inte gör det.',
    task: 'Uppgift: Skapa arrow functionen `getLabel` med parametern isLoggedIn. Den ska returnera "Logga ut" om isLoggedIn är true och annars "Logga in". Använd ? : och inte if.',
    starterCode: '// Skriv din kod här',
    solution:
      "const getLabel = isLoggedIn => (isLoggedIn ? 'Logga ut' : 'Logga in');",
    hints: [
      'Börja med const getLabel = isLoggedIn =>',
      'Skriv villkoret isLoggedIn följt av ?',
      'Efter ? kommer "Logga ut", sedan : och "Logga in".',
    ],
    tests: [
      {
        description: 'getLabel(true) returnerar "Logga ut"',
        code: 'getLabel(true)',
        expected: 'Logga ut',
      },
      {
        description: 'getLabel(false) returnerar "Logga in"',
        code: 'getLabel(false)',
        expected: 'Logga in',
      },
      {
        description: 'getLabel returnerar text och inte true eller false',
        code: 'typeof getLabel(true)',
        expected: 'string',
      },
    ],
    sourceChecks: [
      { description: 'Koden använder ? :', pattern: /\?[^:]+:/ },
      {
        description: 'Koden använder inte if',
        pattern: /\bif\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'and-01',
    title: 'Visa bara om med &&',
    xp: 10,
    track: 'modern-js',
    isBoss: false,
    description:
      'a && b ger a om a är falskt och annars b. I React används det för att visa något bara när ett villkor är sant: {count > 0 && <Badge />}.',
    task: 'Uppgift: Skapa arrow functionen `getBadge` med parametern count. Returnera count > 0 && en template literal med texten "3 nya" (med count i stället för 3). Använd varken if eller ? :.',
    starterCode: '// Skriv din kod här',
    solution: 'const getBadge = count => count > 0 && `${count} nya`;',
    hints: [
      'Börja med const getBadge = count =>',
      'Skriv villkoret count > 0 följt av &&.',
      'Efter && kommer en template literal med ${count} nya.',
    ],
    tests: [
      {
        description: 'getBadge(3) returnerar "3 nya"',
        code: 'getBadge(3)',
        expected: '3 nya',
      },
      {
        description: 'getBadge(12) returnerar "12 nya"',
        code: 'getBadge(12)',
        expected: '12 nya',
      },
      {
        description: 'getBadge(0) returnerar false',
        code: 'getBadge(0)',
        expected: false,
      },
      {
        description: 'getBadge(1) returnerar "1 nya"',
        code: 'getBadge(1)',
        expected: '1 nya',
      },
      {
        description: 'getBadge(-2) returnerar false',
        code: 'getBadge(-2)',
        expected: false,
      },
    ],
    sourceChecks: [
      { description: 'Koden använder &&', pattern: /&&/ },
      {
        description: 'Koden använder inte if',
        pattern: /\bif\b/,
        forbidden: true,
      },
      {
        description: 'Koden använder inte ? :',
        pattern: /\?/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'modern-js-boss-01',
    title: 'Boss: Rest eller spread?',
    xp: 30,
    track: 'modern-js',
    isBoss: true,
    description:
      'Blanda destructuring, rest, spread och template literals. Avgör för varje ... om det packar ihop (rest) eller packar upp (spread).',
    task: `Uppgift: Utgå från user och todos.
  Plocka ut \`id\` ur user och samla resten i \`profile\`.
  Skapa \`updatedProfile\`: en kopia av profile där age är 37.
  Skapa \`allTodos\`: alla todos följt av "Plugga React".
  Plocka ut \`firstTodo\` och samla resten av allTodos i \`otherTodos\`.
  Skapa \`message\` med en template literal: "Ada har 3 uppgifter".
  Använd updatedProfile.name och allTodos.length i message.
  user och todos ska vara oförändrade.`,
    starterCode: `const user = { id: 1, name: 'Ada', age: 36 };
const todos = ['Handla', 'Träna'];

`,
    solution:
      "const user = { id: 1, name: 'Ada', age: 36 };\nconst todos = ['Handla', 'Träna'];\n\nconst { id, ...profile } = user;\nconst updatedProfile = { ...profile, age: 37 };\nconst allTodos = [...todos, 'Plugga React'];\nconst [firstTodo, ...otherTodos] = allTodos;\nconst message = `${updatedProfile.name} har ${allTodos.length} uppgifter`;",
    hints: [],
    tests: [
      { description: 'id har värdet 1', code: 'id', expected: 1 },
      {
        description: 'profile är { name: "Ada", age: 36 }',
        code: 'profile',
        expected: { name: 'Ada', age: 36 },
      },
      {
        description: 'updatedProfile är { name: "Ada", age: 37 }',
        code: '[updatedProfile.name, updatedProfile.age, "id" in updatedProfile]',
        expected: ['Ada', 37, false],
      },
      {
        description: 'allTodos är ["Handla", "Träna", "Plugga React"]',
        code: 'allTodos',
        expected: ['Handla', 'Träna', 'Plugga React'],
      },
      {
        description: 'firstTodo är "Handla"',
        code: 'firstTodo',
        expected: 'Handla',
      },
      {
        description: 'otherTodos är ["Träna", "Plugga React"]',
        code: 'otherTodos',
        expected: ['Träna', 'Plugga React'],
      },
      {
        description: 'message är "Ada har 3 uppgifter"',
        code: 'message',
        expected: 'Ada har 3 uppgifter',
      },
      {
        description: 'user och todos är oförändrade',
        code: '[user.age, todos.length]',
        expected: [36, 2],
      },
    ],
    sourceChecks: [
      {
        description: 'profile samlas ihop med rest: { id, ...profile } = user',
        pattern: /\{\s*id\s*,\s*\.\.\.\s*profile\s*\}\s*=\s*user\b/,
      },
      {
        description: 'updatedProfile skapas med spread: { ...profile, ... }',
        pattern: /\{\s*\.\.\.\s*profile\b/,
      },
      {
        description: 'allTodos skapas med spread: [...todos, ...]',
        pattern: /\[\s*\.\.\.\s*todos\b/,
      },
      {
        description:
          'otherTodos samlas ihop med rest: [firstTodo, ...otherTodos] = allTodos',
        pattern:
          /\[\s*firstTodo\s*,\s*\.\.\.\s*otherTodos\s*\]\s*=\s*allTodos\b/,
      },
      {
        description:
          'message använder ${updatedProfile.name} och ${allTodos.length}',
        pattern:
          /`(?=[^`]*\$\{\s*updatedProfile\s*\.\s*name\s*\})(?=[^`]*\$\{\s*allTodos\s*\.\s*length\s*\})[^`]*`/,
      },
    ],
  },
  {
    id: 'imm-01',
    title: 'Samma array eller en kopia?',
    xp: 10,
    track: 'immutable',
    isBoss: false,
    description:
      'En variabel med en array eller ett objekt innehåller inte själva datan, utan en referens till den. const b = a; ger därför två namn på samma array, och b.push(3) ändrar även a. === jämför referenser, så [1] === [1] är false men b === a är true.',
    task: 'Uppgift: Skapa `copy` som en kopia av original med spread och lägg till 3 i copy med push. original ska vara oförändrad.',
    starterCode: `const original = [1, 2];

`,
    solution: `const original = [1, 2];

const copy = [...original];
copy.push(3);`,
    hints: [
      'En kopia skapas med [...original].',
      'Ändra sedan bara copy.',
      'Skriv const copy = [...original]; och copy.push(3);',
    ],
    tests: [
      { description: 'copy är [1, 2, 3]', code: 'copy', expected: [1, 2, 3] },
      {
        description: 'original är fortfarande [1, 2]',
        code: 'original',
        expected: [1, 2],
      },
      {
        description: 'copy är en annan array än original',
        code: 'copy !== original',
        expected: true,
      },
    ],
    sourceChecks: [
      {
        description: 'copy skapas med [...original]',
        pattern: /\[\s*\.\.\.\s*original\s*\]/,
      },
    ],
  },
  {
    id: 'imm-02',
    title: 'Ändra inte, skapa nytt',
    xp: 10,
    track: 'immutable',
    isBoss: false,
    description:
      'React avgör om något ändrats genom att jämföra referenser med ===. Ändrar du en array med push är den fortfarande samma array, och React tror att ingenting hänt. Därför skapar man alltid en ny array eller ett nytt objekt i stället.',
    task: 'Uppgift: Skriv funktionen `addItem(list, item)` som returnerar en ny array med item sist. list får inte ändras.',
    starterCode: '// Skriv din kod här',
    solution: `function addItem(list, item) {
  return [...list, item];
}`,
    hints: [
      'Använd inte push, den ändrar list.',
      'Spread skapar en ny array: [...list, …].',
      'Returnera [...list, item];',
    ],
    tests: [
      {
        description: 'addItem([1, 2], 3) ger [1, 2, 3]',
        code: 'addItem([1, 2], 3)',
        expected: [1, 2, 3],
      },
      {
        description: 'list ändras inte',
        code: '(() => { const list = [1]; addItem(list, 2); return list; })()',
        expected: [1],
      },
      {
        description: 'Resultatet är en ny array',
        code: '(() => { const list = [1]; return addItem(list, 2) !== list; })()',
        expected: true,
      },
      {
        description: "addItem([], 'a') returnerar ['a']",
        code: "addItem([], 'a')",
        expected: ['a'],
      },
    ],
    sourceChecks: [
      {
        description: 'Koden använder inte push',
        pattern: /\.\s*push\s*\(/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'imm-03',
    title: 'some, every och includes',
    xp: 10,
    track: 'immutable',
    isBoss: false,
    description:
      'some är true om minst ett element klarar villkoret. every är true om alla gör det. includes kollar om ett värde finns i arrayen. Inget av dem ändrar arrayen.',
    task: 'Uppgift: Skapa `allDone` (är alla todos klara?), `anyDone` (är minst en klar?) och `hasShopping` (finns "Handla" bland names?).',
    starterCode: `const todos = [
  { text: 'Handla', done: true },
  { text: 'Träna', done: false },
];
const names = todos.map(todo => todo.text);

`,
    solution: `const todos = [
  { text: 'Handla', done: true },
  { text: 'Träna', done: false },
];
const names = todos.map(todo => todo.text);

const allDone = todos.every(todo => todo.done);
const anyDone = todos.some(todo => todo.done);
const hasShopping = names.includes('Handla');`,
    hints: [
      'allDone: todos.every(todo => todo.done)',
      'anyDone: todos.some(todo => todo.done)',
      "hasShopping: names.includes('Handla')",
    ],
    tests: [
      { description: 'allDone är false', code: 'allDone', expected: false },
      { description: 'anyDone är true', code: 'anyDone', expected: true },
      {
        description: 'hasShopping är true',
        code: 'hasShopping',
        expected: true,
      },
    ],
    sourceChecks: [
      {
        description: 'allDone använder every',
        pattern: /allDone\s*=\s*todos\s*\.\s*every\s*\(/,
      },
      {
        description: 'anyDone använder some',
        pattern: /anyDone\s*=\s*todos\s*\.\s*some\s*\(/,
      },
      {
        description: 'hasShopping använder includes',
        pattern: /\.\s*includes\s*\(/,
      },
    ],
  },
  {
    id: 'imm-04',
    title: 'Sortera utan att förstöra',
    xp: 10,
    track: 'immutable',
    isBoss: false,
    description:
      'sort ändrar den array den anropas på, vilket i React betyder att du ändrar state direkt. Sortera därför en kopia: [...scores].sort(…) eller scores.toSorted(…). sort behöver en jämförelsefunktion för tal: (a, b) => b - a sorterar från störst till minst.',
    task: 'Uppgift: Skapa `topScores` som innehåller scores sorterade från högst till lägst. scores får inte ändras.',
    starterCode: `const scores = [40, 95, 72, 18];

`,
    solution: `const scores = [40, 95, 72, 18];

const topScores = [...scores].sort((a, b) => b - a);`,
    hints: [
      'Gör en kopia först: [...scores].',
      'Sortera kopian med .sort(…).',
      'Från högst till lägst: (a, b) => b - a.',
    ],
    tests: [
      {
        description: 'topScores är [95, 72, 40, 18]',
        code: 'topScores',
        expected: [95, 72, 40, 18],
      },
      {
        description: 'scores är oförändrad',
        code: 'scores',
        expected: [40, 95, 72, 18],
      },
    ],
    sourceChecks: [
      {
        description: 'Koden sorterar med sort eller toSorted',
        pattern: /\.\s*(sort|toSorted)\s*\(/,
      },
    ],
  },
  {
    id: 'imm-05',
    title: 'Uppdatera ett element med map',
    xp: 10,
    track: 'immutable',
    isBoss: false,
    description:
      'För att ändra ett element skapar du en ny array med map. Elementet som ska ändras byts mot en kopia med det nya värdet, alla andra behålls som de är: todo.id === id ? { ...todo, done: !todo.done } : todo.',
    task: 'Uppgift: Skriv funktionen `toggleTodo(todos, id)` som returnerar en ny array där done är omvänd för todon med det id:t. Inget får ändras.',
    starterCode: '// Skriv din kod här',
    solution: `function toggleTodo(todos, id) {
  return todos.map(todo =>
    todo.id === id ? { ...todo, done: !todo.done } : todo,
  );
}`,
    hints: [
      'Börja med return todos.map(todo => …);',
      'Är todo.id === id? Returnera då { ...todo, done: !todo.done }.',
      'Annars returneras todo som den är.',
    ],
    tests: [
      {
        description: 'Rätt todo ändras',
        code: 'toggleTodo([{ id: 1, done: false }, { id: 2, done: false }], 2)',
        expected: [
          { id: 1, done: false },
          { id: 2, done: true },
        ],
      },
      {
        description: 'Originalet ändras inte',
        code: '(() => { const todos = [{ id: 1, done: false }]; toggleTodo(todos, 1); return todos[0].done; })()',
        expected: false,
      },
      {
        description: 'Orörda todos är samma objekt som förut',
        code: '(() => { const todos = [{ id: 1, done: false }, { id: 2, done: false }]; return toggleTodo(todos, 2)[0] === todos[0]; })()',
        expected: true,
      },
      {
        description: 'toggleTodo kan även bocka av en klar todo',
        code: 'toggleTodo([{ id: 1, done: true }], 1)',
        expected: [{ id: 1, done: false }],
      },
    ],
    sourceChecks: [
      { description: 'Koden använder map', pattern: /\.\s*map\s*\(/ },
    ],
  },
  {
    id: 'imm-06',
    title: 'Ta bort med slice',
    xp: 10,
    track: 'immutable',
    isBoss: false,
    description:
      'splice tar bort element men ändrar arrayen. slice(start, slut) ger en kopia av en del av arrayen och ändrar ingenting. Två slice runt elementet och spread blir en ny array utan det.',
    task: 'Uppgift: Skriv funktionen `removeAt(list, index)` som returnerar en ny array utan elementet på platsen index. Använd slice, inte splice.',
    starterCode: '// Skriv din kod här',
    solution: `function removeAt(list, index) {
  return [...list.slice(0, index), ...list.slice(index + 1)];
}`,
    hints: [
      'list.slice(0, index) ger allt före elementet.',
      'list.slice(index + 1) ger allt efter.',
      'Returnera [...list.slice(0, index), ...list.slice(index + 1)];',
    ],
    tests: [
      {
        description: "removeAt(['a', 'b', 'c'], 1) ger ['a', 'c']",
        code: "removeAt(['a', 'b', 'c'], 1)",
        expected: ['a', 'c'],
      },
      {
        description: 'Första elementet kan tas bort',
        code: "removeAt(['a', 'b'], 0)",
        expected: ['b'],
      },
      {
        description: 'list ändras inte',
        code: "(() => { const list = ['a', 'b']; removeAt(list, 0); return list; })()",
        expected: ['a', 'b'],
      },
      {
        description: "removeAt(['a', 'b', 'c'], 2) returnerar ['a', 'b']",
        code: "removeAt(['a', 'b', 'c'], 2)",
        expected: ['a', 'b'],
      },
    ],
    sourceChecks: [
      { description: 'Koden använder slice', pattern: /\.\s*slice\s*\(/ },
      {
        description: 'Koden använder inte splice',
        pattern: /\.\s*splice\s*\(/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'imm-07',
    title: 'Kortform och beräknade nycklar',
    xp: 10,
    track: 'immutable',
    isBoss: false,
    description:
      'Heter variabeln samma som egenskapen kan du skriva { name, age } i stället för { name: name, age: age }. Med hakparenteser blir nyckeln ett värde: { [field]: value }. Det används i React-formulär där ett fält uppdateras med sitt namn: { ...form, [event.target.name]: event.target.value }.',
    task: 'Uppgift: Skapa `user` med kortform av name och age. Skriv sedan funktionen `updateField(form, field, value)` som returnerar en kopia av form där field har fått värdet value.',
    starterCode: `const name = 'Ada';
const age = 36;

`,
    solution: `const name = 'Ada';
const age = 36;

const user = { name, age };

function updateField(form, field, value) {
  return { ...form, [field]: value };
}`,
    hints: [
      'user skrivs { name, age }.',
      'updateField börjar med en kopia: { ...form }.',
      'Lägg till [field]: value efter ...form.',
    ],
    tests: [
      {
        description: 'user är { name: "Ada", age: 36 }',
        code: 'user',
        expected: { name: 'Ada', age: 36 },
      },
      {
        description: 'updateField ändrar rätt fält',
        code: "updateField({ email: '', city: 'Lund' }, 'email', 'ada@example.com')",
        expected: { email: 'ada@example.com', city: 'Lund' },
      },
      {
        description: 'form ändras inte',
        code: "(() => { const form = { email: '' }; updateField(form, 'email', 'x'); return form.email; })()",
        expected: '',
      },
      {
        description: "updateField({ name: 'Ada' }, 'age', 36) lägger till age",
        code: "updateField({ name: 'Ada' }, 'age', 36)",
        expected: { name: 'Ada', age: 36 },
      },
    ],
    sourceChecks: [
      {
        description: 'user skapas med kortform',
        pattern: /\{\s*name\s*,\s*age\s*\}/,
      },
      { description: 'Nyckeln skrivs [field]', pattern: /\[\s*field\s*\]\s*:/ },
    ],
  },
  {
    id: 'imm-08',
    title: 'Object.entries',
    xp: 10,
    track: 'immutable',
    isBoss: false,
    description:
      'Object.keys(obj) ger en array med nycklarna och Object.values(obj) med värdena. Object.entries(obj) ger par: [["keps", 199], …]. Då kan du använda map på ett objekt, till exempel för att visa det som en lista i React.',
    task: 'Uppgift: Skapa `lines` med Object.entries och map, så att varje rad blir "keps: 199 kr".',
    starterCode: `const prices = { keps: 199, mössa: 149 };

`,
    solution: `const prices = { keps: 199, mössa: 149 };

const lines = Object.entries(prices).map(
  ([item, price]) => \`\${item}: \${price} kr\`,
);`,
    hints: [
      'Object.entries(prices) ger [["keps", 199], ["mössa", 149]].',
      'Plocka ut paret med destructuring: ([item, price]) => …',
      'Returnera `${item}: ${price} kr` från map.',
    ],
    tests: [
      {
        description: 'lines är ["keps: 199 kr", "mössa: 149 kr"]',
        code: 'lines',
        expected: ['keps: 199 kr', 'mössa: 149 kr'],
      },
    ],
    sourceChecks: [
      {
        description: 'Koden använder Object.entries',
        pattern: /Object\s*\.\s*entries\s*\(/,
      },
    ],
  },
  {
    id: 'imm-09',
    title: 'Closures: funktioner minns',
    xp: 10,
    track: 'immutable',
    isBoss: false,
    description:
      'En funktion minns variablerna som fanns där den skapades, även efteråt. Det kallas closure. Varje anrop av makeCounter skapar en ny count som bara den returnerade funktionen kommer åt. I React är det därför en effekt eller ett intervall kan se ett gammalt värde: funktionen minns värdet från när den skapades.',
    task: 'Uppgift: Skriv funktionen `makeCounter` som skapar let count = 0 och returnerar en arrow function. Varje anrop av den ökar count med 1 och returnerar det nya värdet.',
    starterCode: '// Skriv din kod här',
    solution: `function makeCounter() {
  let count = 0;
  return () => {
    count += 1;
    return count;
  };
}`,
    hints: [
      'Börja med let count = 0; inuti makeCounter.',
      'Returnera en arrow function: return () => { … };',
      'I den: count += 1; och return count;',
    ],
    tests: [
      {
        description: 'Tre anrop ger 1, 2 och 3',
        code: '(() => { const next = makeCounter(); return [next(), next(), next()]; })()',
        expected: [1, 2, 3],
      },
      {
        description: 'Två räknare räknar var för sig',
        code: '(() => { const a = makeCounter(); const b = makeCounter(); a(); a(); return [a(), b()]; })()',
        expected: [3, 1],
      },
    ],
  },
  {
    id: 'imm-boss-01',
    title: 'Boss: Flytta ett kort',
    xp: 30,
    track: 'immutable',
    isBoss: true,
    description:
      'Uppdatera nästlad data utan att ändra något, precis som när state i React innehåller objekt i arrayer i objekt.',
    task: `Uppgift: Skriv funktionen \`moveCard(board, cardId, fromId, toId)\`.
  board har columns, och varje kolumn har id och cards.
  Returnera ett nytt board där kortet med cardId har flyttats
    från kolumnen fromId till slutet av kolumnen toId.
  Inget i board får ändras. Använd varken push eller splice.`,
    starterCode: `const board = {
  title: 'Veckans plan',
  columns: [
    { id: 'todo', cards: [{ id: 1, text: 'Handla' }, { id: 2, text: 'Träna' }] },
    { id: 'done', cards: [] },
  ],
};

`,
    solution: `const board = {
  title: 'Veckans plan',
  columns: [
    {
      id: 'todo',
      cards: [
        { id: 1, text: 'Handla' },
        { id: 2, text: 'Träna' },
      ],
    },
    { id: 'done', cards: [] },
  ],
};

function moveCard(board, cardId, fromId, toId) {
  const from = board.columns.find(column => column.id === fromId);
  const card = from.cards.find(item => item.id === cardId);

  const columns = board.columns.map(column => {
    if (column.id === fromId) {
      return {
        ...column,
        cards: column.cards.filter(item => item.id !== cardId),
      };
    }
    if (column.id === toId) {
      return { ...column, cards: [...column.cards, card] };
    }
    return column;
  });

  return { ...board, columns };
}`,
    hints: [],
    tests: [
      {
        description: 'Kortet flyttas till rätt kolumn',
        code: "moveCard(board, 1, 'todo', 'done').columns.map(column => column.cards.map(card => card.text))",
        expected: [['Träna'], ['Handla']],
      },
      {
        description: 'board ändras inte',
        code: "(() => { const before = JSON.stringify(board); moveCard(board, 1, 'todo', 'done'); return JSON.stringify(board) === before; })()",
        expected: true,
      },
      {
        description: 'Det nya board är ett nytt objekt med nya columns',
        code: "(() => { const next = moveCard(board, 1, 'todo', 'done'); return [next !== board, next.columns !== board.columns, next.title]; })()",
        expected: [true, true, 'Veckans plan'],
      },
      {
        description: 'Ett kort kan flyttas tillbaka',
        code: "moveCard(moveCard(board, 2, 'todo', 'done'), 2, 'done', 'todo').columns[0].cards.map(card => card.id)",
        expected: [1, 2],
      },
    ],
    sourceChecks: [
      {
        description: 'Koden använder inte push',
        pattern: /\.\s*push\s*\(/,
        forbidden: true,
      },
      {
        description: 'Koden använder inte splice',
        pattern: /\.\s*splice\s*\(/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'modules-01',
    title: 'Exportera en funktion',
    xp: 10,
    track: 'modules',
    isBoss: false,
    description:
      "I React delas koden upp i många filer, så kallade moduler. Allt i en fil är privat tills du exporterar det. Skriver du export framför en funktion kan andra filer importera den med import { add } from './math.js'. Det kallas named export.",
    task: 'Uppgift: app.js försöker importera `add` från din fil math.js. Exportera add så att app.js fungerar.',
    fileName: 'math.js',
    files: {
      'app.js': `import { add } from './math.js';

export const result = add(2, 3);`,
    },
    starterCode: `function add(a, b) {
  return a + b;
}`,
    solution: `export function add(a, b) {
  return a + b;
}`,
    hints: [
      'Funktionen är redan klar, den behöver bara exporteras.',
      'Ordet export skrivs först på raden.',
      'Skriv export function add(a, b) {',
    ],
    tests: [
      {
        description: 'math.js exporterar add',
        code: "typeof __require('./math.js').add",
        expected: 'function',
      },
      {
        description: 'result i app.js är 5',
        code: "__require('./app.js').result",
        expected: 5,
      },
    ],
  },
  {
    id: 'modules-02',
    title: 'Exportera flera saker',
    xp: 10,
    track: 'modules',
    isBoss: false,
    description:
      'En fil kan ha hur många named exports som helst. export fungerar framför const också, så både vanliga värden och arrow functions kan exporteras.',
    task: 'Uppgift: Exportera konstanten `PI` med värdet 3.14 och arrow functionen `double`, som returnerar talet gånger 2. app.js importerar båda.',
    fileName: 'math.js',
    files: {
      'app.js': `import { PI, double } from './math.js';

export const result = double(PI);`,
    },
    starterCode: '// Skriv din kod här',
    solution: `export const PI = 3.14;
export const double = number => number * 2;`,
    hints: [
      'Du behöver två rader, en för PI och en för double.',
      'Börja varje rad med export const.',
      'Skriv export const double = number => number * 2;',
    ],
    tests: [
      {
        description: 'math.js exporterar PI med värdet 3.14',
        code: "__require('./math.js').PI",
        expected: 3.14,
      },
      {
        description: 'double(5) returnerar 10',
        code: "__require('./math.js').double(5)",
        expected: 10,
      },
      {
        description: 'result i app.js är 6.28',
        code: "__require('./app.js').result",
        expected: 6.28,
      },
      {
        description: 'double(-4) returnerar -8',
        code: "__require('./math.js').double(-4)",
        expected: -8,
      },
    ],
  },
  {
    id: 'modules-03',
    title: 'Importera named exports',
    xp: 10,
    track: 'modules',
    isBoss: false,
    description:
      "För att använda något från en annan fil importerar du det: import { add, multiply } from './math.js'. Namnen inom { } måste vara exakt samma som i exporten. ./ betyder att filen ligger i samma mapp.",
    task: 'Uppgift: Importera add och multiply från ./math.js med en import. Skapa sedan `total` = add(2, 3) och `product` = multiply(4, 5).',
    fileName: 'app.js',
    files: {
      'math.js': `export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}`,
    },
    starterCode: '// Skriv din kod här',
    solution: `import { add, multiply } from './math.js';

const total = add(2, 3);
const product = multiply(4, 5);`,
    hints: [
      'Importer skrivs överst i filen.',
      "Börja med import { } from './math.js';",
      'Skriv add, multiply inom { } och skapa sedan total och product.',
    ],
    tests: [
      { description: 'total är 5', code: 'total', expected: 5 },
      { description: 'product är 20', code: 'product', expected: 20 },
      {
        description: 'add och multiply är importerade från math.js',
        code: "add === __require('./math.js').add && multiply === __require('./math.js').multiply",
        expected: true,
      },
    ],
    sourceChecks: [
      {
        description: 'Båda importeras i samma import',
        pattern:
          /import\s*\{\s*(add\s*,\s*multiply|multiply\s*,\s*add)\s*,?\s*\}/,
      },
    ],
  },
  {
    id: 'modules-04',
    title: 'Default export',
    xp: 10,
    track: 'modules',
    isBoss: false,
    description:
      "En fil kan också ha en default export, filens huvudsak. Den importeras utan { }: import greet from './greet.js'. React-komponenter brukar exporteras så: export default function App() { … }.",
    task: 'Uppgift: Skriv funktionen `greet` med parametern name. Den ska returnera "Hej Ada!" (med name i stället för Ada). Gör greet till filens default export.',
    fileName: 'greet.js',
    files: {
      'app.js': `import greet from './greet.js';

export const message = greet('Ada');`,
    },
    starterCode: '// Skriv din kod här',
    solution: `export default function greet(name) {
  return \`Hej \${name}!\`;
}`,
    hints: [
      'Börja med function greet(name) och returnera en template literal.',
      'Skriv export default framför function.',
      'Det blir export default function greet(name) {',
    ],
    tests: [
      {
        description: 'greet.js har en default export',
        code: "typeof __require('./greet.js').default",
        expected: 'function',
      },
      {
        description: 'message i app.js är "Hej Ada!"',
        code: "__require('./app.js').message",
        expected: 'Hej Ada!',
      },
      {
        description: 'greet("Linus") returnerar "Hej Linus!"',
        code: "__require('./greet.js').default('Linus')",
        expected: 'Hej Linus!',
      },
    ],
  },
  {
    id: 'modules-05',
    title: 'Importera default',
    xp: 10,
    track: 'modules',
    isBoss: false,
    description:
      "En default export har inget fast namn när den importeras. Du väljer namnet själv: import format from './formatPrice.js' fungerar lika bra som import formatPrice from ….",
    task: 'Uppgift: Importera default exporten från ./formatPrice.js och döp den till `format`. Skapa sedan `price` = format(99).',
    fileName: 'app.js',
    files: {
      'formatPrice.js': `export default function formatPrice(amount) {
  return \`\${amount} kr\`;
}`,
    },
    starterCode: '// Skriv din kod här',
    solution: `import format from './formatPrice.js';

const price = format(99);`,
    hints: [
      'En default export importeras utan { }.',
      'Namnet efter import bestämmer du själv.',
      "Skriv import format from './formatPrice.js';",
    ],
    tests: [
      { description: 'price är "99 kr"', code: 'price', expected: '99 kr' },
      {
        description: 'format är default exporten från formatPrice.js',
        code: "format === __require('./formatPrice.js').default",
        expected: true,
      },
    ],
  },
  {
    id: 'modules-06',
    title: 'Default och named i samma import',
    xp: 10,
    track: 'modules',
    isBoss: false,
    description:
      "En fil kan ha både en default export och named exports. Då importerar du dem tillsammans, default först: import addTodo, { MAX_TODOS } from './todos.js'. Du kommer att se samma mönster i React: import React, { useState } from 'react'. Paket skrivs utan ./.",
    task: "Uppgift: Importera addTodo och MAX_TODOS från ./todos.js på en rad. Skapa `todos` = addTodo(['Handla'], 'Träna') och `isFull`, som är true om todos.length är minst MAX_TODOS.",
    fileName: 'app.js',
    files: {
      'todos.js': `export const MAX_TODOS = 3;

export default function addTodo(todos, text) {
  return [...todos, text];
}`,
    },
    starterCode: '// Skriv din kod här',
    solution: `import addTodo, { MAX_TODOS } from './todos.js';

const todos = addTodo(['Handla'], 'Träna');
const isFull = todos.length >= MAX_TODOS;`,
    hints: [
      'addTodo är default exporten och MAX_TODOS en named export.',
      'Default kommer först, sedan ett komma och { } för named exports.',
      "Skriv import addTodo, { MAX_TODOS } from './todos.js';",
    ],
    tests: [
      {
        description: 'todos är ["Handla", "Träna"]',
        code: 'todos',
        expected: ['Handla', 'Träna'],
      },
      { description: 'isFull är false', code: 'isFull', expected: false },
      {
        description: 'addTodo och MAX_TODOS är importerade från todos.js',
        code: "addTodo === __require('./todos.js').default && MAX_TODOS === 3",
        expected: true,
      },
    ],
    sourceChecks: [
      {
        description: 'Båda importeras på en rad: import addTodo, { MAX_TODOS }',
        pattern: /import\s+addTodo\s*,\s*\{\s*MAX_TODOS\s*,?\s*\}\s*from/,
      },
      {
        description: 'isFull använder MAX_TODOS i stället för siffran 3',
        pattern: /\b3\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'modules-boss-01',
    title: 'Boss: Bygg en modul',
    xp: 30,
    track: 'modules',
    isBoss: true,
    description:
      'Nu skriver du en fil som både importerar och exporterar. Läs app.js och config.js noga. De visar vad din fil måste exportera och vad den kan importera.',
    task: `Uppgift: Skriv \`todoUtils.js\`.
  Importera MAX_TODOS från ./config.js.
  Default export: funktionen \`addTodo(todos, text)\`.
  Är todos.length minst MAX_TODOS returneras todos oförändrad.
  Annars returneras en ny array med spread: todos följt av text.
  Named export: arrow functionen \`countTodos(todos)\`.
  Den returnerar en template literal som "2 av 3", med MAX_TODOS som sista tal.`,
    fileName: 'todoUtils.js',
    files: {
      'config.js': 'export const MAX_TODOS = 3;',
      'app.js': `import addTodo, { countTodos } from './todoUtils.js';

const one = addTodo([], 'Handla');
const two = addTodo(one, 'Träna');
const three = addTodo(two, 'Plugga React');
const four = addTodo(three, 'Städa');

export const todos = four;
export const status = countTodos(four);
export const firstList = one;`,
    },
    starterCode: '// Skriv din kod här',
    solution: `import { MAX_TODOS } from './config.js';

export default function addTodo(todos, text) {
  if (todos.length >= MAX_TODOS) return todos;
  return [...todos, text];
}

export const countTodos = todos => \`\${todos.length} av \${MAX_TODOS}\`;`,
    hints: [],
    tests: [
      {
        description: 'todos i app.js är ["Handla", "Träna", "Plugga React"]',
        code: "__require('./app.js').todos",
        expected: ['Handla', 'Träna', 'Plugga React'],
      },
      {
        description: 'status i app.js är "3 av 3"',
        code: "__require('./app.js').status",
        expected: '3 av 3',
      },
      {
        description: 'addTodo ändrar inte arrayen den får',
        code: "__require('./app.js').firstList",
        expected: ['Handla'],
      },
      {
        description: 'countTodos(["Handla"]) returnerar "1 av 3"',
        code: "__require('./todoUtils.js').countTodos(['Handla'])",
        expected: '1 av 3',
      },
    ],
    sourceChecks: [
      {
        description:
          "MAX_TODOS importeras: import { MAX_TODOS } from './config.js'",
        pattern:
          /import\s*\{\s*MAX_TODOS\s*,?\s*\}\s*from\s*['"]\.\/config(\.js)?['"]/,
      },
      {
        description: 'Koden använder MAX_TODOS i stället för siffran 3',
        pattern: /\b3\b/,
        forbidden: true,
      },
      {
        description: 'Den nya arrayen skapas med spread: [...todos, text]',
        pattern: /\[\s*\.\.\.\s*todos\s*,/,
      },
    ],
  },
  {
    id: 'async-01',
    title: 'Vad är ett Promise?',
    xp: 10,
    track: 'async',
    isBoss: false,
    description:
      'Vissa saker tar tid, som att hämta data från en server. Då får du inte svaret direkt utan ett Promise, ett löfte om ett värde senare. Med .then(…) säger du vad som ska hända med värdet när det kommer. .then ger själv ett nytt Promise.',
    task: 'Uppgift: getUser() ger ett Promise med en användare. Skapa `namePromise` med getUser().then(…) så att det ger användarens namn.',
    starterCode: `function getUser() {
  return Promise.resolve({ id: 1, name: 'Ada' });
}

`,
    solution: `function getUser() {
  return Promise.resolve({ id: 1, name: 'Ada' });
}

const namePromise = getUser().then(user => user.name);`,
    hints: [
      'Börja med const namePromise = getUser().then( );',
      'then får en funktion som tar emot användaren.',
      'Skriv getUser().then(user => user.name);',
    ],
    tests: [
      {
        description: 'namePromise är ett Promise',
        code: 'namePromise instanceof Promise',
        expected: true,
      },
      {
        description: 'namePromise ger "Ada"',
        code: 'namePromise',
        expected: 'Ada',
      },
    ],
    sourceChecks: [
      { description: 'Koden använder .then', pattern: /\.\s*then\s*\(/ },
    ],
  },
  {
    id: 'async-02',
    title: 'async och await',
    xp: 10,
    track: 'async',
    isBoss: false,
    description:
      'Med async och await skriver du samma sak som med then, fast det läses uppifrån och ned. I en async-funktion pausar await tills löftet är uppfyllt och ger dig värdet. En async-funktion returnerar alltid ett Promise.',
    task: 'Uppgift: Skriv async-funktionen `getName` som väntar på getUser() med await och returnerar användarens namn.',
    starterCode: `function getUser() {
  return Promise.resolve({ id: 1, name: 'Ada' });
}

`,
    solution: `function getUser() {
  return Promise.resolve({ id: 1, name: 'Ada' });
}

async function getName() {
  const user = await getUser();
  return user.name;
}`,
    hints: [
      'Börja med async function getName() { }.',
      'Inuti: const user = await getUser();',
      'Returnera user.name.',
    ],
    tests: [
      {
        description: 'getName() ger "Ada"',
        code: 'getName()',
        expected: 'Ada',
      },
      {
        description: 'getName returnerar ett Promise',
        code: 'getName() instanceof Promise',
        expected: true,
      },
    ],
    sourceChecks: [
      { description: 'Koden använder await', pattern: /\bawait\b/ },
      {
        description: 'Koden använder inte .then',
        pattern: /\.\s*then\s*\(/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'async-03',
    title: 'Vänta i tur och ordning',
    xp: 10,
    track: 'async',
    isBoss: false,
    description:
      'Ibland behöver ett anrop svaret från ett annat. Med await efter varandra väntar du på det första innan du gör det andra.',
    task: 'Uppgift: Skriv async-funktionen `countTodos`. Hämta användaren med getUser(), sedan användarens uppgifter med getTodos(user.id), och returnera antalet uppgifter.',
    starterCode: `function getUser() {
  return Promise.resolve({ id: 1, name: 'Ada' });
}

function getTodos(userId) {
  const todos = [
    { userId: 1, title: 'Handla' },
    { userId: 2, title: 'Träna' },
    { userId: 1, title: 'Plugga' },
  ];
  return Promise.resolve(todos.filter(todo => todo.userId === userId));
}

`,
    solution: `function getUser() {
  return Promise.resolve({ id: 1, name: 'Ada' });
}

function getTodos(userId) {
  const todos = [
    { userId: 1, title: 'Handla' },
    { userId: 2, title: 'Träna' },
    { userId: 1, title: 'Plugga' },
  ];
  return Promise.resolve(todos.filter(todo => todo.userId === userId));
}

async function countTodos() {
  const user = await getUser();
  const todos = await getTodos(user.id);
  return todos.length;
}`,
    hints: [
      'Börja med async function countTodos() { }.',
      'const user = await getUser(); och sedan const todos = await getTodos(user.id);',
      'Returnera todos.length.',
    ],
    tests: [
      { description: 'countTodos() ger 2', code: 'countTodos()', expected: 2 },
    ],
    sourceChecks: [
      {
        description: 'getTodos får user.id',
        pattern: /getTodos\s*\(\s*user\s*\.\s*id\s*\)/,
      },
    ],
  },
  {
    id: 'async-04',
    title: 'fetch och json',
    xp: 10,
    track: 'async',
    isBoss: false,
    description:
      'fetch(url) hämtar data från en server och ger ett Promise med ett svar, en response. Själva datan läser du med response.json(), som också ger ett Promise. Därför behövs två await. I övningarna finns ett låtsas-API på /api/users.',
    task: 'Uppgift: Skriv async-funktionen `loadUsers` som hämtar /api/users och returnerar datan från response.json().',
    starterCode: '// Skriv din kod här',
    solution: `async function loadUsers() {
  const response = await fetch('/api/users');
  return await response.json();
}`,
    hints: [
      "Börja med const response = await fetch('/api/users');",
      'Datan läses med response.json().',
      'Returnera await response.json();',
    ],
    tests: [
      {
        description: 'loadUsers() ger tre användare',
        code: 'loadUsers().then(users => users.map(user => user.name))',
        expected: ['Ada Lovelace', 'Linus Torvalds', 'Grace Hopper'],
      },
      {
        description: 'loadUsers hämtar /api/users',
        code: 'loadUsers().then(() => fetch.calls)',
        expected: ['/api/users'],
      },
    ],
  },
  {
    id: 'async-05',
    title: 'Kolla response.ok',
    xp: 10,
    track: 'async',
    isBoss: false,
    description:
      'fetch ger ett svar även när servern svarar med ett fel, som 404 när något inte finns. response.ok är true bara om allt gick bra. Kontrollera det och kasta ett eget fel annars: throw new Error("…").',
    task: 'Uppgift: Skriv async-funktionen `loadUser(id)` som hämtar /api/users/ följt av id. Är response.ok false kastas ett Error med texten "Hittade inte användaren". Annars returneras datan.',
    starterCode: '// Skriv din kod här',
    solution: `async function loadUser(id) {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error('Hittade inte användaren');
  }
  return await response.json();
}`,
    hints: [
      'Adressen blir en template literal: `/api/users/${id}`.',
      'Efter fetch: if (!response.ok) { … }.',
      "Inuti if: throw new Error('Hittade inte användaren');",
    ],
    tests: [
      {
        description: 'loadUser(2) ger Linus Torvalds',
        code: 'loadUser(2).then(user => user.name)',
        expected: 'Linus Torvalds',
      },
      {
        description: 'loadUser(99) kastar "Hittade inte användaren"',
        code: 'loadUser(99).then(() => "inget fel", error => error.message)',
        expected: 'Hittade inte användaren',
      },
    ],
    sourceChecks: [
      { description: 'Koden kontrollerar response.ok', pattern: /\.\s*ok\b/ },
    ],
  },
  {
    id: 'async-06',
    title: 'Fånga fel med try/catch',
    xp: 10,
    track: 'async',
    isBoss: false,
    description:
      'Med try/catch fångar du fel så att programmet inte kraschar. Det som står i try körs, och kastas ett fel där hoppar koden till catch. Med await fungerar det även för fel från Promises.',
    task: 'Uppgift: Skriv async-funktionen `safeLoad(url)`. Den hämtar url och returnerar datan. Är response.ok false, eller går något annat fel, returneras en tom array i stället.',
    starterCode: '// Skriv din kod här',
    solution: `async function safeLoad(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Serverfel');
    return await response.json();
  } catch {
    return [];
  }
}`,
    hints: [
      'Lägg fetch och json inuti try { }.',
      'Kasta ett fel i try om response.ok är false.',
      'catch { return []; }',
    ],
    tests: [
      {
        description: 'safeLoad("/api/users") ger tre användare',
        code: "safeLoad('/api/users').then(users => users.length)",
        expected: 3,
      },
      {
        description: 'safeLoad("/api/broken") ger []',
        code: "safeLoad('/api/broken')",
        expected: [],
      },
    ],
    sourceChecks: [
      { description: 'Koden använder try', pattern: /\btry\s*\{/ },
      { description: 'Koden använder catch', pattern: /\bcatch\b/ },
    ],
  },
  {
    id: 'async-07',
    title: 'Flera samtidigt: Promise.all',
    xp: 10,
    track: 'async',
    isBoss: false,
    description:
      'Två await efter varandra väntar på det första innan det andra startar. Behövs inte svaren av varandra kan du starta båda direkt och vänta på dem tillsammans: const [a, b] = await Promise.all([first(), second()]).',
    task: 'Uppgift: Skriv async-funktionen `loadCounts`. Hämta /api/users och /api/todos samtidigt med Promise.all och getJson, och returnera [antal användare, antal uppgifter].',
    starterCode: `async function getJson(url) {
  const response = await fetch(url);
  return await response.json();
}

`,
    solution: `async function getJson(url) {
  const response = await fetch(url);
  return await response.json();
}

async function loadCounts() {
  const [users, todos] = await Promise.all([
    getJson('/api/users'),
    getJson('/api/todos'),
  ]);
  return [users.length, todos.length];
}`,
    hints: [
      'Promise.all får en array med Promises.',
      "Skriv await Promise.all([getJson('/api/users'), getJson('/api/todos')]).",
      'Plocka ut svaren med const [users, todos] = … och returnera [users.length, todos.length].',
    ],
    tests: [
      {
        description: 'loadCounts() ger [3, 3]',
        code: 'loadCounts()',
        expected: [3, 3],
      },
      {
        description: 'Båda hämtningarna startar direkt',
        code: '(loadCounts(), fetch.calls.length)',
        expected: 2,
      },
    ],
    sourceChecks: [
      {
        description: 'Koden använder Promise.all',
        pattern: /Promise\s*\.\s*all\s*\(/,
      },
    ],
  },
  {
    id: 'async-boss-01',
    title: 'Boss: Rapporten',
    xp: 30,
    track: 'async',
    isBoss: true,
    description:
      'Kombinera fetch, response.ok, try/catch och Promise.all i en funktion som tål fel.',
    task: `Uppgift: Skriv async-funktionen \`loadReport(baseUrl)\`.
  Hämta baseUrl + "/users" och baseUrl + "/todos" samtidigt med Promise.all.
  Är något svar inte ok ska ett fel kastas.
  Gick allt bra returneras { users: 3, openTodos: 2 }:
    antalet användare och antalet uppgifter där done är false.
  Gick något fel returneras { error: "Kunde inte ladda rapporten" }.`,
    starterCode: '// Skriv din kod här',
    solution: `async function loadReport(baseUrl) {
  try {
    const [usersResponse, todosResponse] = await Promise.all([
      fetch(\`\${baseUrl}/users\`),
      fetch(\`\${baseUrl}/todos\`),
    ]);
    if (!usersResponse.ok || !todosResponse.ok) {
      throw new Error('Serverfel');
    }
    const users = await usersResponse.json();
    const todos = await todosResponse.json();
    return {
      users: users.length,
      openTodos: todos.filter(todo => !todo.done).length,
    };
  } catch {
    return { error: 'Kunde inte ladda rapporten' };
  }
}`,
    hints: [],
    tests: [
      {
        description: 'loadReport("/api") ger { users: 3, openTodos: 2 }',
        code: "loadReport('/api')",
        expected: { users: 3, openTodos: 2 },
      },
      {
        description:
          'Ett serverfel ger { error: "Kunde inte ladda rapporten" }',
        code: "loadReport('/api/broken')",
        expected: { error: 'Kunde inte ladda rapporten' },
      },
      {
        description: 'Båda hämtningarna startar direkt',
        code: "(loadReport('/api'), fetch.calls)",
        expected: ['/api/users', '/api/todos'],
      },
    ],
    sourceChecks: [
      {
        description: 'Koden använder Promise.all',
        pattern: /Promise\s*\.\s*all\s*\(/,
      },
      { description: 'Koden använder try', pattern: /\btry\s*\{/ },
    ],
  },
  {
    id: 'debug-js-01',
    title: 'Ett = för lite',
    xp: 15,
    track: 'debug-js',
    isBoss: false,
    description:
      'I den här banan är koden redan skriven, men den har ett fel. Läs testerna som inte går igenom: de visar vad koden ger och vad den borde ge. Ett klassiskt fel är = i stället för ===. Ett = tilldelar ett värde, === jämför två värden.',
    task: 'Uppgift: `isAdmin` säger att alla är admin, även "guest". Hitta felet och rätta det.',
    starterCode: `function isAdmin(role) {
  if (role = 'admin') {
    return true;
  }
  return false;
}`,
    solution: `function isAdmin(role) {
  if (role === 'admin') {
    return true;
  }
  return false;
}`,
    hints: [
      'Titta på villkoret i if-satsen.',
      "role = 'admin' ger role ett nytt värde i stället för att jämföra.",
      "Skriv role === 'admin'.",
    ],
    tests: [
      {
        description: "isAdmin('admin') returnerar true",
        code: "isAdmin('admin')",
        expected: true,
      },
      {
        description: "isAdmin('guest') returnerar false",
        code: "isAdmin('guest')",
        expected: false,
      },
      {
        description: 'isAdmin() returnerar false',
        code: 'isAdmin()',
        expected: false,
      },
    ],
  },
  {
    id: 'debug-js-02',
    title: 'Svaret som försvann',
    xp: 15,
    track: 'debug-js',
    isBoss: false,
    description:
      'Får du undefined när du väntade dig ett värde? Då saknas ofta en return. En funktion som inte returnerar något ger alltid undefined, även om den räknar ut rätt svar inuti.',
    task: 'Uppgift: `getTotal` ska returnera summan av priserna, men ger undefined. Hitta felet och rätta det.',
    starterCode: `function getTotal(prices) {
  prices.reduce((sum, price) => sum + price, 0);
}`,
    solution: `function getTotal(prices) {
  return prices.reduce((sum, price) => sum + price, 0);
}`,
    hints: [
      'Testet säger att funktionen ger undefined.',
      'Summan räknas ut, men vad händer med den sedan?',
      'Lägg till return före prices.reduce.',
    ],
    tests: [
      {
        description: 'getTotal([10, 20]) returnerar 30',
        code: 'getTotal([10, 20])',
        expected: 30,
      },
      {
        description: 'getTotal([5, 5, 5]) returnerar 15',
        code: 'getTotal([5, 5, 5])',
        expected: 15,
      },
      {
        description: 'getTotal([]) returnerar 0',
        code: 'getTotal([])',
        expected: 0,
      },
    ],
  },
  {
    id: 'debug-js-03',
    title: 'Klamrar som slukar svaret',
    xp: 15,
    track: 'debug-js',
    isBoss: false,
    description:
      'En arrow function utan klamrar returnerar värdet direkt: n => n * 2. Med klamrar blir det ett block, och då måste du skriva return själv: n => { return n * 2; }. Glömmer du det blir svaret undefined.',
    task: 'Uppgift: `doubleAll` ska dubbla varje tal, men ger bara undefined. Hitta felet och rätta det.',
    starterCode: `const doubleAll = numbers => numbers.map(n => {
  n * 2;
});`,
    solution: 'const doubleAll = numbers => numbers.map(n => n * 2);',
    hints: [
      'Testet visar en array full av null. Så skrivs undefined i en array som text.',
      'Arrow functionen i map har klamrar men ingen return.',
      'Skriv numbers.map(n => n * 2) eller lägg till return.',
    ],
    tests: [
      {
        description: 'doubleAll([1, 2, 3]) returnerar [2, 4, 6]',
        code: 'doubleAll([1, 2, 3])',
        expected: [2, 4, 6],
      },
      {
        description: 'doubleAll([0, -5]) returnerar [0, -10]',
        code: 'doubleAll([0, -5])',
        expected: [0, -10],
      },
    ],
  },
  {
    id: 'debug-js-04',
    title: 'Ett varv för mycket',
    xp: 15,
    track: 'debug-js',
    isBoss: false,
    description:
      'Får du NaN (Not a Number) har du räknat med något som inte är ett tal, ofta undefined. Lägg in console.log i loopen för att se vad som händer i varje varv, t.ex. console.log(i, numbers[i]). Det du skriver ut visas under Konsol.',
    task: 'Uppgift: `sumAll` ger NaN i stället för summan. Lägg gärna in en console.log i loopen för att se varför. Hitta sedan felet och rätta det.',
    starterCode: `function sumAll(numbers) {
  let total = 0;
  for (let i = 0; i <= numbers.length; i++) {
    total = total + numbers[i];
  }
  return total;
}

sumAll([1, 2, 3]);`,
    solution: `function sumAll(numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total = total + numbers[i];
  }
  return total;
}

sumAll([1, 2, 3]);`,
    hints: [
      'Skriv console.log(i, numbers[i]); i loopen och kolla sista raden i konsolen.',
      'Arrayen [1, 2, 3] har index 0, 1 och 2. Vad är numbers[3]?',
      'Villkoret ska vara i < numbers.length, inte <=.',
    ],
    tests: [
      {
        description: 'sumAll([1, 2, 3]) returnerar 6',
        code: 'sumAll([1, 2, 3])',
        expected: 6,
      },
      {
        description: 'sumAll([5]) returnerar 5',
        code: 'sumAll([5])',
        expected: 5,
      },
      {
        description: 'sumAll([]) returnerar 0',
        code: 'sumAll([])',
        expected: 0,
      },
    ],
  },
  {
    id: 'debug-js-05',
    title: 'Text i stället för tal',
    xp: 15,
    track: 'debug-js',
    isBoss: false,
    description:
      'Det man skriver i ett formulär är alltid text, även om det ser ut som ett tal. 2 + "3" ger "23", för + med text slår ihop texterna. Gör om texten till ett tal med Number("3") innan du räknar.',
    task: 'Uppgift: `addToCart(count, input)` lägger till antalet från ett formulärfält. input är text, så 2 varor plus "3" blir "23". Rätta funktionen så att den räknar med tal.',
    starterCode: `function addToCart(count, input) {
  return count + input;
}`,
    solution: `function addToCart(count, input) {
  return count + Number(input);
}`,
    hints: [
      'Testet visar "23", alltså text och inte ett tal.',
      'input är text. Den måste bli ett tal innan du räknar.',
      'Skriv count + Number(input).',
    ],
    tests: [
      {
        description: "addToCart(2, '3') returnerar talet 5",
        code: "addToCart(2, '3')",
        expected: 5,
      },
      {
        description: "addToCart(0, '10') returnerar talet 10",
        code: "addToCart(0, '10')",
        expected: 10,
      },
    ],
  },
  {
    id: 'debug-js-06',
    title: 'Läs felmeddelandet',
    xp: 15,
    track: 'debug-js',
    isBoss: false,
    description:
      'Ett felmeddelande som "Cannot read properties of undefined (reading \'0\')" betyder att du försökte läsa [0] från något som är undefined. Leta efter var värdet kommer ifrån. Ofta är ett namn felstavat, och JavaScript skiljer på stora och små bokstäver.',
    task: 'Uppgift: `getInitials(user)` ska returnera initialerna, t.ex. "AL" för Ada Lovelace, men kraschar. Läs felmeddelandet i testet, hitta felet och rätta det.',
    starterCode: `const user = { firstName: 'Ada', lastName: 'Lovelace' };

function getInitials(user) {
  return user.firstname[0] + user.lastName[0];
}`,
    solution: `const user = { firstName: 'Ada', lastName: 'Lovelace' };

function getInitials(user) {
  return user.firstName[0] + user.lastName[0];
}`,
    hints: [
      'Felet säger att något är undefined när [0] läses.',
      'Jämför namnen i getInitials med namnen i objektet user.',
      'firstname ska vara firstName, med stort N.',
    ],
    tests: [
      {
        description: 'getInitials(user) returnerar "AL"',
        code: 'getInitials(user)',
        expected: 'AL',
      },
      {
        description: 'Fungerar för Grace Hopper',
        code: "getInitials({ firstName: 'Grace', lastName: 'Hopper' })",
        expected: 'GH',
      },
    ],
  },
  {
    id: 'debug-js-07',
    title: 'Originalet ändrades',
    xp: 15,
    track: 'debug-js',
    isBoss: false,
    description:
      'Vissa array-metoder ändrar arrayen de anropas på, t.ex. sort, push och reverse. Det kan ge buggar som syns någon helt annanstans i koden, eftersom någon annan också använder samma array. Använd en metod som ger en ny array, som toSorted, eller kopiera först med [...array].',
    task: 'Uppgift: `getTopScore` returnerar rätt tal, men den kastar om ordningen i scores som man skickar in. Rätta den så att scores inte ändras.',
    starterCode: `function getTopScore(scores) {
  return scores.sort((a, b) => b - a)[0];
}`,
    solution: `function getTopScore(scores) {
  return scores.toSorted((a, b) => b - a)[0];
}`,
    hints: [
      'Det andra testet visar att arrayen man skickar in har ändrats.',
      'sort ändrar arrayen den anropas på.',
      'Använd toSorted i stället för sort.',
    ],
    tests: [
      {
        description: 'getTopScore([3, 9, 5]) returnerar 9',
        code: 'getTopScore([3, 9, 5])',
        expected: 9,
      },
      {
        description: 'scores har samma ordning efteråt',
        code: '(() => { const scores = [3, 9, 5]; getTopScore(scores); return scores; })()',
        expected: [3, 9, 5],
      },
    ],
  },
  {
    id: 'debug-js-08',
    title: 'Ett glömt await',
    xp: 15,
    track: 'debug-js',
    isBoss: false,
    description:
      'fetch och response.json() ger Promises, alltså svar som kommer senare. Utan await får du själva Promiset i stället för värdet. Felet "response.json is not a function" betyder att response inte är ett svar än, utan ett Promise.',
    task: 'Uppgift: `getUserName(id)` ska hämta /api/users/ följt av id och returnera namnet, men kraschar. Hitta felen och rätta dem.',
    starterCode: `async function getUserName(id) {
  const response = fetch(\`/api/users/\${id}\`);
  const user = response.json();
  return user.name;
}`,
    solution: `async function getUserName(id) {
  const response = await fetch(\`/api/users/\${id}\`);
  const user = await response.json();
  return user.name;
}`,
    hints: [
      'Felet säger att response.json inte är en funktion. Vad är response egentligen?',
      'fetch ger ett Promise. Du måste vänta in svaret.',
      'Lägg till await både före fetch och före response.json().',
    ],
    tests: [
      {
        description: 'getUserName(1) ger "Ada Lovelace"',
        code: 'getUserName(1)',
        expected: 'Ada Lovelace',
      },
      {
        description: 'getUserName(3) ger "Grace Hopper"',
        code: 'getUserName(3)',
        expected: 'Grace Hopper',
      },
    ],
  },
  {
    id: 'debug-js-boss-01',
    title: 'Boss: Orderrapporten',
    xp: 30,
    track: 'debug-js',
    isBoss: true,
    description:
      'Nu är det flera fel i samma funktion. Ta ett i taget: läs ett test som inte går igenom, hitta orsaken, rätta och kör igen. console.log är din bästa vän.',
    task: `Uppgift: \`summarize(orders)\` ska ge en rad som "Totalt 175 kr. 2 obetalda."
  Summan är alla ordrars price.
  Obetalda är ordrarna där isPaid är false.
  Finns inga obetalda ska det stå "Allt är betalt".
  Funktionen har tre fel. Hitta och rätta dem.`,
    starterCode: `function summarize(orders) {
  let total = 0;
  for (let i = 1; i < orders.length; i++) {
    total = total + orders[i].price;
  }

  const unpaid = orders.filter(order => {
    !order.isPaid;
  });

  const status =
    unpaid.length = 0 ? 'Allt är betalt' : \`\${unpaid.length} obetalda\`;

  return \`Totalt \${total} kr. \${status}.\`;
}`,
    solution: `function summarize(orders) {
  let total = 0;
  for (let i = 0; i < orders.length; i++) {
    total = total + orders[i].price;
  }

  const unpaid = orders.filter(order => !order.isPaid);

  const status =
    unpaid.length === 0 ? 'Allt är betalt' : \`\${unpaid.length} obetalda\`;

  return \`Totalt \${total} kr. \${status}.\`;
}`,
    hints: [],
    tests: [
      {
        description: 'Tre ordrar, två obetalda',
        code: 'summarize([{ price: 100, isPaid: true }, { price: 50, isPaid: false }, { price: 25, isPaid: false }])',
        expected: 'Totalt 175 kr. 2 obetalda.',
      },
      {
        description: 'Alla ordrar betalda',
        code: 'summarize([{ price: 40, isPaid: true }, { price: 60, isPaid: true }])',
        expected: 'Totalt 100 kr. Allt är betalt.',
      },
      {
        description: 'En obetald order',
        code: 'summarize([{ price: 30, isPaid: false }])',
        expected: 'Totalt 30 kr. 1 obetalda.',
      },
      {
        description: 'Inga ordrar alls',
        code: 'summarize([])',
        expected: 'Totalt 0 kr. Allt är betalt.',
      },
    ],
  },
  {
    id: 'jsx-01',
    title: 'Din första komponent',
    xp: 10,
    track: 'jsx',
    isBoss: false,
    description:
      'En React-komponent är en funktion som returnerar JSX. JSX ser ut som HTML men är JavaScript. Komponentens namn måste börja med stor bokstav, annars tror React att det är en HTML-tagg.',
    task: 'Uppgift: Skriv komponenten `App` som returnerar en h1 med texten "Hej React!".',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: '// Skriv din kod här',
    solution: `function App() {
  return <h1>Hej React!</h1>;
}`,
    hints: [
      'Börja med function App() { }.',
      'Inuti funktionen skriver du return följt av JSX.',
      'Skriv return <h1>Hej React!</h1>;',
    ],
    tests: [
      {
        description: 'App renderar <h1>Hej React!</h1>',
        code: '__render(<App />)',
        expected: '<h1>Hej React!</h1>',
      },
    ],
  },
  {
    id: 'jsx-02',
    title: 'Värden i JSX med { }',
    xp: 10,
    track: 'jsx',
    isBoss: false,
    description:
      'Inom { } i JSX kan du skriva JavaScript. <p>Hej {name}!</p> visar värdet av variabeln name mitt i texten.',
    task: 'Uppgift: Låt `App` returnera en p med texten "Hej Ada!". Hämta namnet från variabeln name med { }.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const name = 'Ada';

function App() {
  return <p>Hej !</p>;
}`,
    solution: `const name = 'Ada';

function App() {
  return <p>Hej {name}!</p>;
}`,
    hints: [
      'Namnet ska stå mellan "Hej " och "!".',
      'Variabler skrivs inom klamrar i JSX.',
      'Skriv <p>Hej {name}!</p>',
    ],
    tests: [
      {
        description: 'App renderar <p>Hej Ada!</p>',
        code: '__render(<App />)',
        expected: '<p>Hej Ada!</p>',
      },
    ],
    sourceChecks: [
      {
        description: 'Namnet skrivs inte in som text i JSX:en',
        pattern: /Ada[^]*Ada/,
        forbidden: true,
      },
      { description: 'JSX:en använder {name}', pattern: /\{\s*name\s*\}/ },
    ],
  },
  {
    id: 'jsx-03',
    title: 'Uttryck i { }',
    xp: 10,
    track: 'jsx',
    isBoss: false,
    description:
      'Allt som ger ett värde fungerar inom { }: uträkningar, funktionsanrop och template literals. {items * price} räknar ut summan direkt i JSX:en.',
    task: 'Uppgift: Låt `App` returnera en p med texten "Totalt: 75 kr". Räkna ut summan med items * price inom { }.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const items = 3;
const price = 25;

function App() {
  return <p></p>;
}`,
    solution: `const items = 3;
const price = 25;

function App() {
  return <p>Totalt: {items * price} kr</p>;
}`,
    hints: [
      'Texten "Totalt: " och " kr" skrivs som vanlig text.',
      'Uträkningen items * price ska stå inom { }.',
      'Skriv <p>Totalt: {items * price} kr</p>',
    ],
    tests: [
      {
        description: 'App renderar <p>Totalt: 75 kr</p>',
        code: '__render(<App />)',
        expected: '<p>Totalt: 75 kr</p>',
      },
    ],
    sourceChecks: [
      {
        description: 'Summan räknas ut med items * price',
        pattern: /\{\s*items\s*\*\s*price\s*\}|\{\s*price\s*\*\s*items\s*\}/,
      },
      {
        description: 'Summan skrivs inte in som 75',
        pattern: /\b75\b/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'jsx-04',
    title: 'Attribut och className',
    xp: 10,
    track: 'jsx',
    isBoss: false,
    description:
      'Attribut skrivs nästan som i HTML. Några heter annorlunda: class heter className, eftersom class redan betyder något i JavaScript. Värden från variabler skrivs inom { } utan citattecken: src={logoUrl}. Taggar utan innehåll, som img, måste stängas med />.',
    task: 'Uppgift: Låt `App` returnera en img med src från variabeln logoUrl, alt "Logga" och klassen "logo".',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const logoUrl = '/favicon.svg';

function App() {
  return null;
}`,
    solution: `const logoUrl = '/favicon.svg';

function App() {
  return <img src={logoUrl} alt="Logga" className="logo" />;
}`,
    hints: [
      'Byt null mot en img-tagg som stängs med />.',
      'src ska få värdet från logoUrl, alltså src={logoUrl}.',
      'Klassen skrivs className="logo".',
    ],
    tests: [
      {
        description: 'App renderar en img',
        code: '/^<img[^>]*>$/.test(__render(<App />))',
        expected: true,
      },
      {
        description: 'img har src="/favicon.svg"',
        code: '__render(<App />).includes(\'src="/favicon.svg"\')',
        expected: true,
      },
      {
        description: 'img har alt="Logga"',
        code: '__render(<App />).includes(\'alt="Logga"\')',
        expected: true,
      },
      {
        description: 'img har klassen "logo"',
        code: '__render(<App />).includes(\'class="logo"\')',
        expected: true,
      },
    ],
    sourceChecks: [
      {
        description: 'src hämtas med {logoUrl}',
        pattern: /src=\{\s*logoUrl\s*\}/,
      },
      {
        description: 'Klassen skrivs med className, inte class',
        pattern: /\bclass\s*=/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'jsx-05',
    title: 'En rot: Fragment',
    xp: 10,
    track: 'jsx',
    isBoss: false,
    description:
      'En komponent får bara returnera ett element. Vill du returnera två element bredvid varandra lägger du dem i en Fragment: <>…</>. Den samlar ihop dem utan att lägga till något extra element på sidan, som en div skulle göra.',
    task: 'Uppgift: Låt `App` returnera en h1 med "Profil" och direkt efter den en p med "Ada, 36 år". Använd user.name och user.age. Lägg dem i en Fragment, inte en div.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const user = { name: 'Ada', age: 36 };

function App() {
  return <h1>Profil</h1>;
}`,
    solution: `const user = { name: 'Ada', age: 36 };

function App() {
  return (
    <>
      <h1>Profil</h1>
      <p>
        {user.name}, {user.age} år
      </p>
    </>
  );
}`,
    hints: [
      'Två element bredvid varandra måste ha en gemensam förälder.',
      'Skriv <> före h1 och </> efter p. JSX över flera rader omges med ( ).',
      'p:n blir <p>{user.name}, {user.age} år</p>',
    ],
    tests: [
      {
        description: 'App renderar <h1>Profil</h1><p>Ada, 36 år</p>',
        code: '__render(<App />)',
        expected: '<h1>Profil</h1><p>Ada, 36 år</p>',
      },
    ],
    sourceChecks: [
      {
        description: 'Namnet och åldern hämtas från user',
        pattern: /user\s*\.\s*name[^]*user\s*\.\s*age/,
      },
    ],
  },
  {
    id: 'jsx-boss-01',
    title: 'Boss: Profilkort',
    xp: 30,
    track: 'jsx',
    isBoss: true,
    description:
      'Kombinera allt om JSX: värden och uttryck i { }, attribut, className och självstängande taggar.',
    task: `Uppgift: Låt \`App\` returnera ett profilkort för user.
  En div med klassen "card".
  I den: en img med src från user.avatar och alt från user.name.
  Sedan en h2 med user.name.
  Sist en p med user.title i versaler (toUpperCase).
  Allt ska hämtas från user, inget skrivs in som text.`,
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const user = {
  name: 'Ada Lovelace',
  title: 'Programmerare',
  avatar: '/favicon.svg',
};

function App() {
  return null;
}`,
    solution: `const user = {
  name: 'Ada Lovelace',
  title: 'Programmerare',
  avatar: '/favicon.svg',
};

function App() {
  return (
    <div className="card">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.title.toUpperCase()}</p>
    </div>
  );
}`,
    hints: [],
    tests: [
      {
        description: 'Kortet är en div med klassen "card"',
        code: '/^<div class="card">.*<\\/div>$/.test(__render(<App />))',
        expected: true,
      },
      {
        description: 'img har src="/favicon.svg" och alt="Ada Lovelace"',
        code: '/<img(?=[^>]*\\bsrc="\\/favicon\\.svg")(?=[^>]*\\balt="Ada Lovelace")[^>]*>/.test(__render(<App />))',
        expected: true,
      },
      {
        description:
          'Efter img kommer <h2>Ada Lovelace</h2><p>PROGRAMMERARE</p>',
        code: '__render(<App />).endsWith("><h2>Ada Lovelace</h2><p>PROGRAMMERARE</p></div>")',
        expected: true,
      },
      {
        description: 'Kortet visar en annan användare om user ändras',
        code: "(user.name = 'Linus', user.title = 'Utvecklare', __render(<App />).includes('<h2>Linus</h2><p>UTVECKLARE</p>'))",
        expected: true,
      },
    ],
    sourceChecks: [
      {
        description: 'Titeln görs om med toUpperCase',
        pattern: /\.\s*toUpperCase\s*\(/,
      },
      {
        description: 'Klassen skrivs med className, inte class',
        pattern: /\bclass\s*=/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'props-01',
    title: 'Komponent i komponent',
    xp: 10,
    track: 'props',
    isBoss: false,
    description:
      'En React-app byggs av komponenter i komponenter. En komponent du skrivit används som en egen tagg: <Logo />. Taggen måste börja med stor bokstav, för <logo /> tror React är en HTML-tagg.',
    task: 'Uppgift: Låt `App` returnera en header med komponenten Logo inuti.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `function Logo() {
  return <span>⚛️ Academy</span>;
}

function App() {
  return <header></header>;
}`,
    solution: `function Logo() {
  return <span>⚛️ Academy</span>;
}

function App() {
  return (
    <header>
      <Logo />
    </header>
  );
}`,
    hints: [
      'Logo är redan klar, den ska bara användas.',
      'En komponent används som en tagg med sitt namn.',
      'Skriv <Logo /> mellan <header> och </header>.',
    ],
    tests: [
      {
        description: 'App renderar <header><span>⚛️ Academy</span></header>',
        code: '__render(<App />)',
        expected: '<header><span>⚛️ Academy</span></header>',
      },
    ],
    sourceChecks: [
      { description: 'App använder <Logo />', pattern: /<Logo\s*\/>/ },
    ],
  },
  {
    id: 'props-02',
    title: 'Skicka en prop',
    xp: 10,
    track: 'props',
    isBoss: false,
    description:
      'Props är det som skickas in i en komponent, som attribut på taggen: <Greeting name="Ada" />. Till vänster om = står propens namn, det som komponenten tar emot. Till höger står värdet. Komponenten nedan läser props.name.',
    task: 'Uppgift: Låt `App` returnera Greeting med propen name satt till "Ada".',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `function Greeting(props) {
  return <h1>Hej {props.name}!</h1>;
}

function App() {
  return <Greeting />;
}`,
    solution: `function Greeting(props) {
  return <h1>Hej {props.name}!</h1>;
}

function App() {
  return <Greeting name="Ada" />;
}`,
    hints: [
      'Greeting läser props.name, så propen måste heta name.',
      'Props skrivs som attribut: namn="värde".',
      'Skriv <Greeting name="Ada" />',
    ],
    tests: [
      {
        description: 'App renderar <h1>Hej Ada!</h1>',
        code: '__render(<App />)',
        expected: '<h1>Hej Ada!</h1>',
      },
    ],
    sourceChecks: [
      {
        description: 'App skickar name till Greeting',
        pattern: /<Greeting\s+name=/,
      },
    ],
  },
  {
    id: 'props-03',
    title: 'Ta emot props',
    xp: 10,
    track: 'props',
    isBoss: false,
    description:
      'En komponent får alla props i ett objekt, sitt första argument. <Greeting name="Ada" /> anropar Greeting med { name: "Ada" }. Därför läser man värdet med props.name.',
    task: 'Uppgift: Skriv komponenten `Greeting` med parametern props. Den ska returnera en h1 med "Hej Ada!", där namnet hämtas från props.name.',
    fileName: 'App.jsx',
    preview: '<Greeting name="Ada" />',
    starterCode: '// Skriv din kod här',
    solution: `function Greeting(props) {
  return <h1>Hej {props.name}!</h1>;
}`,
    hints: [
      'Börja med function Greeting(props) { }.',
      'Namnet finns i props.name.',
      'Returnera <h1>Hej {props.name}!</h1>',
    ],
    tests: [
      {
        description: '<Greeting name="Ada" /> renderar <h1>Hej Ada!</h1>',
        code: '__render(<Greeting name="Ada" />)',
        expected: '<h1>Hej Ada!</h1>',
      },
      {
        description: '<Greeting name="Linus" /> renderar <h1>Hej Linus!</h1>',
        code: '__render(<Greeting name="Linus" />)',
        expected: '<h1>Hej Linus!</h1>',
      },
    ],
  },
  {
    id: 'props-04',
    title: 'Destructuring av props',
    xp: 10,
    track: 'props',
    isBoss: false,
    description:
      'Oftast plockar man ut props direkt i parameterlistan med destructuring: function Badge({ label, count }). Då slipper man skriva props. framför varje namn. Det är samma destructuring som i Modern JS-banan.',
    task: 'Uppgift: Skriv komponenten `Badge` som tar emot label och count med destructuring. Den ska returnera en span med texten "Nya: 3" (label, kolon, count).',
    fileName: 'App.jsx',
    preview: '<Badge label="Nya" count={3} />',
    starterCode: '// Skriv din kod här',
    solution: `function Badge({ label, count }) {
  return (
    <span>
      {label}: {count}
    </span>
  );
}`,
    hints: [
      'Börja med function Badge({ label, count }) { }.',
      'label och count är vanliga variabler inuti funktionen.',
      'Returnera <span>{label}: {count}</span>',
    ],
    tests: [
      {
        description:
          '<Badge label="Nya" count={3} /> renderar <span>Nya: 3</span>',
        code: '__render(<Badge label="Nya" count={3} />)',
        expected: '<span>Nya: 3</span>',
      },
      {
        description:
          '<Badge label="Olästa" count={12} /> renderar <span>Olästa: 12</span>',
        code: '__render(<Badge label="Olästa" count={12} />)',
        expected: '<span>Olästa: 12</span>',
      },
      {
        description: 'Badge med count 0 visar 0',
        code: '__render(<Badge label="Klara" count={0} />)',
        expected: '<span>Klara: 0</span>',
      },
    ],
    sourceChecks: [
      {
        description: 'Props plockas ut med ({ label, count })',
        pattern:
          /\(\s*\{\s*(label\s*,\s*count|count\s*,\s*label)\s*,?\s*\}\s*\)/,
      },
    ],
  },
  {
    id: 'props-05',
    title: 'Tal och booleans som props',
    xp: 10,
    track: 'props',
    isBoss: false,
    description:
      'Med citattecken blir en prop alltid text: amount="99" är strängen "99". Allt annat skickas inom { }: amount={99} är talet 99 och onSale={true} är en boolean. Skriver du bara onSale utan värde blir den också true.',
    task: 'Uppgift: Låt `App` returnera Price med amount satt till talet 99 och onSale satt till true.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `function Price({ amount, onSale }) {
  if (typeof amount !== 'number') {
    return <p>amount ska vara ett tal, inte text</p>;
  }
  return <p>{onSale ? 'REA ' : ''}{amount} kr</p>;
}

function App() {
  return <Price />;
}`,
    solution: `function Price({ amount, onSale }) {
  if (typeof amount !== 'number') {
    return <p>amount ska vara ett tal, inte text</p>;
  }
  return (
    <p>
      {onSale ? 'REA ' : ''}
      {amount} kr
    </p>
  );
}

function App() {
  return <Price amount={99} onSale={true} />;
}`,
    hints: [
      'Talet 99 ska skickas utan citattecken.',
      'Värden som inte är text skrivs inom { }.',
      'Skriv <Price amount={99} onSale={true} />',
    ],
    tests: [
      {
        description: 'App renderar <p>REA 99 kr</p>',
        code: '__render(<App />)',
        expected: '<p>REA 99 kr</p>',
      },
    ],
  },
  {
    id: 'props-06',
    title: 'Standardvärden',
    xp: 10,
    track: 'props',
    isBoss: false,
    description:
      'Skickas inte en prop blir den undefined. Med ett standardvärde i destructuringen, { variant = "primary" }, får den ett värde ändå. Det är vanligt för props som oftast har samma värde.',
    task: 'Uppgift: Skriv komponenten `Button` med props label och variant, där variant har standardvärdet "primary". Returnera en button med label som text och variant som className.',
    fileName: 'App.jsx',
    preview:
      '<><Button label="Spara" /> <Button label="Ta bort" variant="danger" /></>',
    starterCode: '// Skriv din kod här',
    solution: `function Button({ label, variant = 'primary' }) {
  return <button className={variant}>{label}</button>;
}`,
    hints: [
      'Börja med function Button({ label, variant }) och lägg till standardvärdet.',
      "Standardvärdet skrivs variant = 'primary' i destructuringen.",
      'Returnera <button className={variant}>{label}</button>',
    ],
    tests: [
      {
        description: '<Button label="Spara" /> får klassen "primary"',
        code: '__render(<Button label="Spara" />)',
        expected: '<button class="primary">Spara</button>',
      },
      {
        description:
          '<Button label="Ta bort" variant="danger" /> får klassen "danger"',
        code: '__render(<Button label="Ta bort" variant="danger" />)',
        expected: '<button class="danger">Ta bort</button>',
      },
    ],
  },
  {
    id: 'props-07',
    title: 'children',
    xp: 10,
    track: 'props',
    isBoss: false,
    description:
      'Det du skriver mellan start- och sluttaggen skickas med som propen children: <Card title="Hej"><p>Text</p></Card>. På så sätt kan en komponent vara en ram runt vilket innehåll som helst.',
    task: 'Uppgift: Skriv komponenten `Card` med props title och children. Returnera en section med klassen "card", med en h2 med title och sedan children.',
    fileName: 'App.jsx',
    preview: '<Card title="Dagens tips"><p>Props flödar nedåt.</p></Card>',
    starterCode: '// Skriv din kod här',
    solution: `function Card({ title, children }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      {children}
    </section>
  );
}`,
    hints: [
      'Börja med function Card({ title, children }) { }.',
      'children används som vilket värde som helst: {children}.',
      'Lägg {children} efter h2:n inuti section.',
    ],
    tests: [
      {
        description: 'Card renderar title och children',
        code: '__render(<Card title="Hej"><p>Text</p></Card>)',
        expected: '<section class="card"><h2>Hej</h2><p>Text</p></section>',
      },
      {
        description: 'Card fungerar med annat innehåll',
        code: '__render(<Card title="Lista"><ul><li>A</li></ul></Card>)',
        expected:
          '<section class="card"><h2>Lista</h2><ul><li>A</li></ul></section>',
      },
    ],
  },
  {
    id: 'props-boss-01',
    title: 'Boss: Profilkort i delar',
    xp: 30,
    track: 'props',
    isBoss: true,
    description:
      'Dela upp ett profilkort i små komponenter som får allt de behöver via props.',
    task: `Uppgift: Skriv tre komponenter.
  \`Avatar({ src, name })\`: en img med src och alt satt till name.
  \`Card({ children })\`: en div med klassen "card" runt children.
  \`ProfileCard({ user, isOnline = false })\`:
    ett Card med Avatar (src från user.avatar, name från user.name),
    en h2 med user.name och en p med "Online" eller "Offline".
  ProfileCard ska använda Card och Avatar.`,
    fileName: 'App.jsx',
    preview:
      "<ProfileCard user={{ name: 'Ada', avatar: '/favicon.svg' }} isOnline />",
    starterCode: '// Skriv din kod här',
    solution: `function Avatar({ src, name }) {
  return <img src={src} alt={name} />;
}

function Card({ children }) {
  return <div className="card">{children}</div>;
}

function ProfileCard({ user, isOnline = false }) {
  return (
    <Card>
      <Avatar src={user.avatar} name={user.name} />
      <h2>{user.name}</h2>
      <p>{isOnline ? 'Online' : 'Offline'}</p>
    </Card>
  );
}`,
    hints: [],
    tests: [
      {
        description: 'Avatar renderar en img med src och alt',
        code: '/^<img(?=[^>]*\\bsrc="\\/a\\.png")(?=[^>]*\\balt="Ada")[^>]*>$/.test(__render(<Avatar src="/a.png" name="Ada" />))',
        expected: true,
      },
      {
        description: 'Card lägger children i <div class="card">',
        code: '__render(<Card><b>Hej</b></Card>)',
        expected: '<div class="card"><b>Hej</b></div>',
      },
      {
        description: 'ProfileCard visar bild, namn och "Online"',
        code: '/^<div class="card"><img(?=[^>]*\\bsrc="\\/l\\.png")(?=[^>]*\\balt="Linus")[^>]*><h2>Linus<\\/h2><p>Online<\\/p><\\/div>$/.test(__render(<ProfileCard user={{ name: \'Linus\', avatar: \'/l.png\' }} isOnline />))',
        expected: true,
      },
      {
        description: 'ProfileCard visar "Offline" när isOnline saknas',
        code: "__render(<ProfileCard user={{ name: 'Linus', avatar: '/l.png' }} />).endsWith('<h2>Linus</h2><p>Offline</p></div>')",
        expected: true,
      },
    ],
    sourceChecks: [
      { description: 'ProfileCard använder <Card>', pattern: /<Card\s*>/ },
      { description: 'ProfileCard använder <Avatar', pattern: /<Avatar\b/ },
      {
        description: 'isOnline har standardvärdet false',
        pattern: /isOnline\s*=\s*false/,
      },
    ],
  },
  {
    id: 'lists-01',
    title: 'Rendera en lista med map',
    xp: 10,
    track: 'lists',
    isBoss: false,
    description:
      'JSX kan visa en array av element. Därför gör man om data till element med map: fruits.map(fruit => <li>{fruit}</li>) ger ett li för varje frukt. Själva listan läggs inom { } i JSX:en.',
    task: 'Uppgift: Låt `App` returnera en ul med ett li för varje frukt i fruits. Använd map.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const fruits = ['Äpple', 'Banan', 'Päron'];

function App() {
  return <ul></ul>;
}`,
    solution: `const fruits = ['Äpple', 'Banan', 'Päron'];

function App() {
  return (
    <ul>
      {fruits.map(fruit => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}`,
    hints: [
      'Skriv { } mellan <ul> och </ul>.',
      'Inuti klamrarna: fruits.map(fruit => …).',
      'Varje frukt blir <li>{fruit}</li>.',
    ],
    tests: [
      {
        description: 'App renderar en ul med tre li',
        code: '__render(<App />)',
        expected: '<ul><li>Äpple</li><li>Banan</li><li>Päron</li></ul>',
      },
      {
        description: 'Listan följer med när fruits ändras',
        code: "(fruits.push('Kiwi'), __render(<App />).endsWith('<li>Kiwi</li></ul>'))",
        expected: true,
      },
    ],
    sourceChecks: [
      { description: 'Listan skapas med map', pattern: /\.\s*map\s*\(/ },
    ],
  },
  {
    id: 'lists-02',
    title: 'key',
    xp: 10,
    track: 'lists',
    isBoss: false,
    description:
      'Varje element i en lista behöver en key, ett värde som är unikt inom listan. Med den kan React hålla reda på vilket element som är vilket när listan ändras. key skrivs som en prop: <li key={fruit}>. Den syns inte på sidan.',
    task: 'Uppgift: Ge varje li en key. Frukterna är unika, så fruit duger som key.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const fruits = ['Äpple', 'Banan', 'Päron'];

function App() {
  return (
    <ul>
      {fruits.map(fruit => (
        <li>{fruit}</li>
      ))}
    </ul>
  );
}`,
    solution: `const fruits = ['Äpple', 'Banan', 'Päron'];

function App() {
  return (
    <ul>
      {fruits.map(fruit => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}`,
    hints: [
      'key skrivs som ett attribut på li.',
      'Värdet är en variabel, så det står inom { }.',
      'Skriv <li key={fruit}>',
    ],
    tests: [
      {
        description: 'App renderar fortfarande listan',
        code: '__render(<App />)',
        expected: '<ul><li>Äpple</li><li>Banan</li><li>Päron</li></ul>',
      },
      {
        description: 'Alla li har en unik key',
        code: '(__render(<App />), __keyProblems)',
        expected: [],
      },
    ],
  },
  {
    id: 'lists-03',
    title: 'key från id',
    xp: 10,
    track: 'lists',
    isBoss: false,
    description:
      'Är listan en array av objekt används oftast ett id som key: <li key={todo.id}>. Använd inte platsen i arrayen (index) som key. Tas ett element bort eller byter ordning flyttas index till fel element, och då kan React blanda ihop dem.',
    task: 'Uppgift: Låt `App` returnera en ul med ett li för varje todo. Visa todo.text och använd todo.id som key.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const todos = [
  { id: 1, text: 'Handla' },
  { id: 2, text: 'Träna' },
  { id: 3, text: 'Plugga React' },
];

function App() {
  return <ul></ul>;
}`,
    solution: `const todos = [
  { id: 1, text: 'Handla' },
  { id: 2, text: 'Träna' },
  { id: 3, text: 'Plugga React' },
];

function App() {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`,
    hints: [
      'Börja med {todos.map(todo => …)} inuti ul.',
      'Texten finns i todo.text.',
      'Skriv <li key={todo.id}>{todo.text}</li>',
    ],
    tests: [
      {
        description: 'App renderar de tre uppgifterna',
        code: '__render(<App />)',
        expected: '<ul><li>Handla</li><li>Träna</li><li>Plugga React</li></ul>',
      },
      {
        description: 'Alla li har en unik key',
        code: '(__render(<App />), __keyProblems)',
        expected: [],
      },
    ],
    sourceChecks: [
      {
        description: 'key är todo.id',
        pattern: /key=\{\s*todo\s*\.\s*id\s*\}/,
      },
    ],
  },
  {
    id: 'lists-04',
    title: 'En lista av komponenter',
    xp: 10,
    track: 'lists',
    isBoss: false,
    description:
      'map kan lika gärna returnera dina egna komponenter: <TodoItem key={todo.id} text={todo.text} />. key sätts på komponenten i map, inte på li:n inuti TodoItem. Det är listan i map som behöver key, och TodoItem vet inte ens att den ligger i en lista.',
    task: 'Uppgift: Låt `App` returnera en ul med en TodoItem för varje todo. Skicka todo.text som propen text och använd todo.id som key.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const todos = [
  { id: 1, text: 'Handla' },
  { id: 2, text: 'Träna' },
];

function TodoItem({ text }) {
  return <li>✅ {text}</li>;
}

function App() {
  return <ul></ul>;
}`,
    solution: `const todos = [
  { id: 1, text: 'Handla' },
  { id: 2, text: 'Träna' },
];

function TodoItem({ text }) {
  return <li>✅ {text}</li>;
}

function App() {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} text={todo.text} />
      ))}
    </ul>
  );
}`,
    hints: [
      'map ska returnera <TodoItem /> i stället för <li>.',
      'TodoItem behöver propen text={todo.text}.',
      'key={todo.id} skrivs på TodoItem.',
    ],
    tests: [
      {
        description: 'App renderar en TodoItem per uppgift',
        code: '__render(<App />)',
        expected: '<ul><li>✅ Handla</li><li>✅ Träna</li></ul>',
      },
      {
        description: 'Varje TodoItem har en unik key',
        code: '(__render(<App />), __keyProblems)',
        expected: [],
      },
    ],
    sourceChecks: [
      {
        description: 'map returnerar <TodoItem',
        pattern: /\.map\s*\([^]*<TodoItem\b/,
      },
      {
        description: 'key sitter på TodoItem',
        pattern: /<TodoItem[^>]*\bkey=\{\s*todo\s*\.\s*id\s*\}/,
      },
    ],
  },
  {
    id: 'lists-05',
    title: 'filter före map',
    xp: 10,
    track: 'lists',
    isBoss: false,
    description:
      'Vill du bara visa en del av listan filtrerar du först och renderar sedan: todos.filter(todo => !todo.done).map(…). Data ändras aldrig, du väljer bara vad som visas.',
    task: 'Uppgift: Låt `App` returnera en ul med bara de todos som inte är klara (done är false). Visa todo.text och använd todo.id som key.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const todos = [
  { id: 1, text: 'Handla', done: true },
  { id: 2, text: 'Träna', done: false },
  { id: 3, text: 'Plugga React', done: false },
];

function App() {
  return <ul></ul>;
}`,
    solution: `const todos = [
  { id: 1, text: 'Handla', done: true },
  { id: 2, text: 'Träna', done: false },
  { id: 3, text: 'Plugga React', done: false },
];

function App() {
  return (
    <ul>
      {todos
        .filter(todo => !todo.done)
        .map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
    </ul>
  );
}`,
    hints: [
      'Börja med todos.filter(todo => !todo.done).',
      'Kedja på .map(…) direkt efter filter.',
      'map ger <li key={todo.id}>{todo.text}</li>.',
    ],
    tests: [
      {
        description: 'App visar bara Träna och Plugga React',
        code: '__render(<App />)',
        expected: '<ul><li>Träna</li><li>Plugga React</li></ul>',
      },
      {
        description: 'Alla li har en unik key',
        code: '(__render(<App />), __keyProblems)',
        expected: [],
      },
      {
        description: 'todos är oförändrad',
        code: 'todos.length',
        expected: 3,
      },
    ],
    sourceChecks: [
      {
        description: 'Listan filtreras med filter',
        pattern: /\.\s*filter\s*\(/,
      },
    ],
  },
  {
    id: 'lists-06',
    title: 'Numrera med index',
    xp: 10,
    track: 'lists',
    isBoss: false,
    description:
      'map skickar med platsen i arrayen som andra argument: players.map((player, index) => …). index passar bra för att visa en numrering, men key ska fortfarande vara player.id.',
    task: 'Uppgift: Låt `App` returnera en ol med ett li per spelare med texten "1. Ada", där talet är index + 1. Använd player.id som key.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const players = [
  { id: 'a7', name: 'Ada' },
  { id: 'l3', name: 'Linus' },
  { id: 'g9', name: 'Grace' },
];

function App() {
  return <ol></ol>;
}`,
    solution: `const players = [
  { id: 'a7', name: 'Ada' },
  { id: 'l3', name: 'Linus' },
  { id: 'g9', name: 'Grace' },
];

function App() {
  return (
    <ol>
      {players.map((player, index) => (
        <li key={player.id}>
          {index + 1}. {player.name}
        </li>
      ))}
    </ol>
  );
}`,
    hints: [
      'map tar emot (player, index), med parenteser runt båda.',
      'Numret är {index + 1}.',
      'Skriv <li key={player.id}>{index + 1}. {player.name}</li>',
    ],
    tests: [
      {
        description: 'App renderar en numrerad lista',
        code: '__render(<App />)',
        expected: '<ol><li>1. Ada</li><li>2. Linus</li><li>3. Grace</li></ol>',
      },
      {
        description: 'Alla li har en unik key',
        code: '(__render(<App />), __keyProblems)',
        expected: [],
      },
    ],
    sourceChecks: [
      {
        description: 'key är player.id',
        pattern: /key=\{\s*player\s*\.\s*id\s*\}/,
      },
      {
        description: 'Numret räknas ut med index + 1',
        pattern: /index\s*\+\s*1/,
      },
    ],
  },
  {
    id: 'lists-boss-01',
    title: 'Boss: Produktlistan',
    xp: 30,
    track: 'lists',
    isBoss: true,
    description:
      'Kombinera komponenter, props, filter, map och key i en riktig produktlista.',
    task: `Uppgift: Skriv två komponenter.
  \`ProductRow({ name, price })\`: ett li med texten "Keps: 199 kr".
  \`ProductList({ products })\`: en section med
    en h2 med texten "2 i lager" (antalet produkter där inStock är true),
    och en ul med en ProductRow per produkt i lager.
  Använd filter och map, och product.id som key på ProductRow.`,
    fileName: 'App.jsx',
    preview: `<ProductList products={[
  { id: 1, name: 'Keps', price: 199, inStock: true },
  { id: 2, name: 'Mössa', price: 149, inStock: false },
  { id: 3, name: 'Halsduk', price: 299, inStock: true },
]} />`,
    starterCode: '// Skriv din kod här',
    solution: `function ProductRow({ name, price }) {
  return (
    <li>
      {name}: {price} kr
    </li>
  );
}

function ProductList({ products }) {
  const inStock = products.filter(product => product.inStock);
  return (
    <section>
      <h2>{inStock.length} i lager</h2>
      <ul>
        {inStock.map(product => (
          <ProductRow
            key={product.id}
            name={product.name}
            price={product.price}
          />
        ))}
      </ul>
    </section>
  );
}`,
    hints: [],
    tests: [
      {
        description: 'ProductRow renderar <li>Keps: 199 kr</li>',
        code: '__render(<ProductRow name="Keps" price={199} />)',
        expected: '<li>Keps: 199 kr</li>',
      },
      {
        description: 'ProductList visar bara produkter i lager',
        code: "__render(<ProductList products={[{ id: 1, name: 'Keps', price: 199, inStock: true }, { id: 2, name: 'Mössa', price: 149, inStock: false }, { id: 3, name: 'Halsduk', price: 299, inStock: true }]} />)",
        expected:
          '<section><h2>2 i lager</h2><ul><li>Keps: 199 kr</li><li>Halsduk: 299 kr</li></ul></section>',
      },
      {
        description: 'Rubriken räknar produkterna i lager',
        code: "__render(<ProductList products={[{ id: 7, name: 'Vante', price: 99, inStock: true }]} />).startsWith('<section><h2>1 i lager</h2>')",
        expected: true,
      },
      {
        description: 'Varje ProductRow har en unik key',
        code: "(__render(<ProductList products={[{ id: 1, name: 'A', price: 1, inStock: true }, { id: 2, name: 'B', price: 2, inStock: true }]} />), __keyProblems)",
        expected: [],
      },
    ],
    sourceChecks: [
      {
        description: 'Produkterna filtreras med filter',
        pattern: /\.\s*filter\s*\(/,
      },
      { description: 'Raderna skapas med map', pattern: /\.\s*map\s*\(/ },
      {
        description: 'map returnerar <ProductRow med key={product.id}',
        pattern: /<ProductRow[^>]*\bkey=\{\s*product\s*\.\s*id\s*\}/,
      },
    ],
  },
  {
    id: 'cond-01',
    title: 'Visa bara om: &&',
    xp: 10,
    track: 'conditionals',
    isBoss: false,
    description:
      'I JSX kan du inte skriva if, men du kan använda &&: {count > 0 && <p>…</p>}. Är villkoret sant visas elementet, annars visas ingenting. React visar inte false, null eller undefined.',
    task: 'Uppgift: Skriv komponenten `Inbox({ count })`. Den returnerar en div med en h2 "Inkorg" och, bara om count är större än 0, en p med "Du har 3 nya meddelanden" (med count i stället för 3).',
    fileName: 'App.jsx',
    preview: '<><Inbox count={3} /><Inbox count={0} /></>',
    starterCode: '// Skriv din kod här',
    solution: `function Inbox({ count }) {
  return (
    <div>
      <h2>Inkorg</h2>
      {count > 0 && <p>Du har {count} nya meddelanden</p>}
    </div>
  );
}`,
    hints: [
      'Börja med en div med <h2>Inkorg</h2> inuti.',
      'Efter h2:n: {count > 0 && …}.',
      'Efter && kommer <p>Du har {count} nya meddelanden</p>.',
    ],
    tests: [
      {
        description: '<Inbox count={3} /> visar meddelandet',
        code: '__render(<Inbox count={3} />)',
        expected: '<div><h2>Inkorg</h2><p>Du har 3 nya meddelanden</p></div>',
      },
      {
        description: '<Inbox count={0} /> visar bara rubriken',
        code: '__render(<Inbox count={0} />)',
        expected: '<div><h2>Inkorg</h2></div>',
      },
      {
        description: 'Inbox med count 12 visar 12',
        code: '__render(<Inbox count={12} />)',
        expected: '<div><h2>Inkorg</h2><p>Du har 12 nya meddelanden</p></div>',
      },
    ],
    sourceChecks: [{ description: 'Koden använder &&', pattern: /&&/ }],
  },
  {
    id: 'cond-02',
    title: 'Fallgropen 0 &&',
    xp: 10,
    track: 'conditionals',
    isBoss: false,
    description:
      'Se upp med {count && …}. Är count 0 blir hela uttrycket 0, och till skillnad från false visar React talet 0 på sidan. Gör därför villkoret till en riktig boolean: {count > 0 && …}.',
    task: 'Uppgift: Komponenten visar en ensam 0:a när count är 0. Rätta villkoret så att ingenting visas då.',
    fileName: 'App.jsx',
    preview: '<><Cart count={2} /><Cart count={0} /></>',
    starterCode: `function Cart({ count }) {
  return <div>🛒{count && <span> {count} varor</span>}</div>;
}`,
    solution: `function Cart({ count }) {
  return <div>🛒{count > 0 && <span> {count} varor</span>}</div>;
}`,
    hints: [
      'Problemet är villkoret före &&.',
      'count är ett tal, inte en boolean. Jämför det med något.',
      'Skriv {count > 0 && …}.',
    ],
    tests: [
      {
        description: '<Cart count={2} /> visar antalet',
        code: '__render(<Cart count={2} />)',
        expected: '<div>🛒<span> 2 varor</span></div>',
      },
      {
        description: '<Cart count={0} /> visar ingen 0:a',
        code: '__render(<Cart count={0} />)',
        expected: '<div>🛒</div>',
      },
    ],
  },
  {
    id: 'cond-03',
    title: 'Antingen eller: ? :',
    xp: 10,
    track: 'conditionals',
    isBoss: false,
    description:
      'Ska något av två alternativ visas använder du ? :. Det fungerar både för text och för element: {isLoggedIn ? "Logga ut" : "Logga in"}.',
    task: 'Uppgift: Skriv komponenten `LoginButton({ isLoggedIn })` som returnerar en button med texten "Logga ut" om isLoggedIn är true och annars "Logga in".',
    fileName: 'App.jsx',
    preview:
      '<><LoginButton isLoggedIn={true} /> <LoginButton isLoggedIn={false} /></>',
    starterCode: '// Skriv din kod här',
    solution: `function LoginButton({ isLoggedIn }) {
  return <button>{isLoggedIn ? 'Logga ut' : 'Logga in'}</button>;
}`,
    hints: [
      'Returnera <button>{ }</button>.',
      'Inuti klamrarna: isLoggedIn ? … : ….',
      "Skriv {isLoggedIn ? 'Logga ut' : 'Logga in'}.",
    ],
    tests: [
      {
        description: 'Inloggad: "Logga ut"',
        code: '__render(<LoginButton isLoggedIn={true} />)',
        expected: '<button>Logga ut</button>',
      },
      {
        description: 'Utloggad: "Logga in"',
        code: '__render(<LoginButton isLoggedIn={false} />)',
        expected: '<button>Logga in</button>',
      },
    ],
    sourceChecks: [{ description: 'Koden använder ? :', pattern: /\?[^:]+:/ }],
  },
  {
    id: 'cond-04',
    title: 'Välj komponent',
    xp: 10,
    track: 'conditionals',
    isBoss: false,
    description:
      'Med ? : kan du välja mellan hela komponenter: {user ? <Welcome name={user.name} /> : <Login />}. Ett objekt räknas som sant och null som falskt, så du kan använda user direkt som villkor.',
    task: 'Uppgift: Skriv komponenten `Page({ user })`. Finns user ska den returnera Welcome med user.name som propen name. Annars returnerar den Login.',
    fileName: 'App.jsx',
    preview: "<><Page user={{ name: 'Ada' }} /><Page user={null} /></>",
    starterCode: `function Welcome({ name }) {
  return <h1>Välkommen, {name}!</h1>;
}

function Login() {
  return <button>Logga in</button>;
}
`,
    solution: `function Welcome({ name }) {
  return <h1>Välkommen, {name}!</h1>;
}

function Login() {
  return <button>Logga in</button>;
}

function Page({ user }) {
  return user ? <Welcome name={user.name} /> : <Login />;
}`,
    hints: [
      'Skriv function Page({ user }) under de andra komponenterna.',
      'Villkoret är bara user.',
      'Returnera user ? <Welcome name={user.name} /> : <Login />.',
    ],
    tests: [
      {
        description: 'Med user visas Welcome',
        code: "__render(<Page user={{ name: 'Ada' }} />)",
        expected: '<h1>Välkommen, Ada!</h1>',
      },
      {
        description: 'Utan user visas Login',
        code: '__render(<Page user={null} />)',
        expected: '<button>Logga in</button>',
      },
    ],
    sourceChecks: [
      { description: 'Page använder <Welcome', pattern: /<Welcome\b/ },
      { description: 'Page använder <Login', pattern: /<Login\s*\/>/ },
    ],
  },
  {
    id: 'cond-05',
    title: 'Tidig return',
    xp: 10,
    track: 'conditionals',
    isBoss: false,
    description:
      'Före return är komponenten vanlig JavaScript, så där kan du använda if. Ett vanligt mönster är att returnera tidigt: if (!user) return <p>Laddar…</p>; Resten av komponenten kan sedan räkna med att user finns.',
    task: 'Uppgift: Skriv komponenten `Profile({ user })`. Saknas user returneras <p>Laddar…</p> med en if. Annars returneras en h2 med user.name.',
    fileName: 'App.jsx',
    preview: "<><Profile user={{ name: 'Grace' }} /><Profile /></>",
    starterCode: '// Skriv din kod här',
    solution: `function Profile({ user }) {
  if (!user) {
    return <p>Laddar…</p>;
  }
  return <h2>{user.name}</h2>;
}`,
    hints: [
      'Börja funktionen med if (!user) { }.',
      'Inuti if: return <p>Laddar…</p>;',
      'Efter if: return <h2>{user.name}</h2>;',
    ],
    tests: [
      {
        description: 'Utan user visas "Laddar…"',
        code: '__render(<Profile />)',
        expected: '<p>Laddar…</p>',
      },
      {
        description: 'Med user visas namnet',
        code: "__render(<Profile user={{ name: 'Grace' }} />)",
        expected: '<h2>Grace</h2>',
      },
      {
        description: 'Profile visar ett annat namn',
        code: "__render(<Profile user={{ name: 'Linus' }} />)",
        expected: '<h2>Linus</h2>',
      },
    ],
    sourceChecks: [{ description: 'Koden använder if', pattern: /\bif\s*\(/ }],
  },
  {
    id: 'cond-06',
    title: 'Returnera null',
    xp: 10,
    track: 'conditionals',
    isBoss: false,
    description:
      'En komponent som inte ska visa något returnerar null. Det är vanligt för till exempel varningar, som bara ska synas när det finns något att varna för.',
    task: 'Uppgift: Skriv komponenten `Warning({ message })`. Saknas message returneras null. Annars returneras en p med klassen "warning" och message som text.',
    fileName: 'App.jsx',
    preview: '<><Warning message="Lösenordet är för kort" /><Warning /></>',
    starterCode: '// Skriv din kod här',
    solution: `function Warning({ message }) {
  if (!message) return null;
  return <p className="warning">{message}</p>;
}`,
    hints: [
      'Börja med if (!message).',
      'Returnera null om message saknas.',
      'Annars: return <p className="warning">{message}</p>;',
    ],
    tests: [
      {
        description: 'Utan message renderas ingenting',
        code: '__render(<Warning />)',
        expected: '',
      },
      {
        description: 'Med message visas varningen',
        code: '__render(<Warning message="Fel lösenord" />)',
        expected: '<p class="warning">Fel lösenord</p>',
      },
      {
        description: 'Warning returnerar null, inte ett tomt element',
        code: 'Warning({})',
        expected: null,
      },
    ],
  },
  {
    id: 'cond-07',
    title: 'Tom lista',
    xp: 10,
    track: 'conditionals',
    isBoss: false,
    description:
      'En tom lista ger en tom ul, och det ser ut som att något är trasigt. Visa hellre ett meddelande när listan är tom: todos.length === 0 ? <p>…</p> : <ul>…</ul>.',
    task: 'Uppgift: Skriv komponenten `TodoList({ todos })`. Är todos tom returneras <p>Inga uppgifter</p>. Annars en ul med ett li per todo, med todo.text som text och todo.id som key.',
    fileName: 'App.jsx',
    preview:
      "<><TodoList todos={[{ id: 1, text: 'Handla' }]} /><TodoList todos={[]} /></>",
    starterCode: '// Skriv din kod här',
    solution: `function TodoList({ todos }) {
  return todos.length === 0 ? (
    <p>Inga uppgifter</p>
  ) : (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`,
    hints: [
      'Villkoret är todos.length === 0.',
      'Använd ? : eller en tidig return med if.',
      'Listan är samma map som i Listor-banan.',
    ],
    tests: [
      {
        description: 'Tom lista: "Inga uppgifter"',
        code: '__render(<TodoList todos={[]} />)',
        expected: '<p>Inga uppgifter</p>',
      },
      {
        description: 'Med uppgifter visas listan',
        code: "__render(<TodoList todos={[{ id: 1, text: 'Handla' }, { id: 2, text: 'Träna' }]} />)",
        expected: '<ul><li>Handla</li><li>Träna</li></ul>',
      },
      {
        description: 'Alla li har en unik key',
        code: "(__render(<TodoList todos={[{ id: 1, text: 'A' }, { id: 2, text: 'B' }]} />), __keyProblems)",
        expected: [],
      },
    ],
  },
  {
    id: 'cond-08',
    title: 'Villkorlig className',
    xp: 10,
    track: 'conditionals',
    isBoss: false,
    description:
      'Villkor fungerar i props också. Ett vanligt exempel är att byta klass beroende på data: className={done ? "todo done" : "todo"}. Då kan CSS:en till exempel stryka över klara uppgifter.',
    task: 'Uppgift: Skriv komponenten `TodoItem({ text, done })`. Den returnerar ett li med text. Klassen är "todo done" om done är true och annars "todo".',
    fileName: 'App.jsx',
    preview: `<ul>
  <style>{'.done { text-decoration: line-through; color: gray; }'}</style>
  <TodoItem text="Handla" done={true} />
  <TodoItem text="Träna" done={false} />
</ul>`,
    starterCode: '// Skriv din kod här',
    solution: `function TodoItem({ text, done }) {
  return <li className={done ? 'todo done' : 'todo'}>{text}</li>;
}`,
    hints: [
      'className får ett värde inom { }.',
      'Inuti klamrarna: done ? … : ….',
      "Skriv className={done ? 'todo done' : 'todo'}.",
    ],
    tests: [
      {
        description: 'Klar uppgift får klassen "todo done"',
        code: '__render(<TodoItem text="Handla" done={true} />)',
        expected: '<li class="todo done">Handla</li>',
      },
      {
        description: 'Oklar uppgift får klassen "todo"',
        code: '__render(<TodoItem text="Träna" done={false} />)',
        expected: '<li class="todo">Träna</li>',
      },
      {
        description: 'TodoItem visar en annan text',
        code: '__render(<TodoItem text="Plugga" done={false} />)',
        expected: '<li class="todo">Plugga</li>',
      },
    ],
  },
  {
    id: 'cond-boss-01',
    title: 'Boss: Orderstatus',
    xp: 30,
    track: 'conditionals',
    isBoss: true,
    description:
      'Använd alla sätt att visa saker villkorligt: tidig return, ? :, && och tomma listor. Akta dig för 0 &&.',
    task: `Uppgift: Skriv komponenten \`OrderSummary({ order })\`.
  Saknas order: returnera <p>Ingen order vald</p>.
  Annars en section med, i den här ordningen:
    en h2 med "Order 42" (order.id i stället för 42),
    <p>Betald</p> om order.isPaid är true, annars <p>Ej betald</p>,
    <p>Ordern är tom</p> om order.items är tom,
      annars en ul med ett li per item (item.name, key item.id),
    <p>Rabatt: 50 kr</p> bara om order.discount är större än 0.`,
    fileName: 'App.jsx',
    preview: `<OrderSummary order={{
  id: 42,
  isPaid: true,
  discount: 50,
  items: [{ id: 1, name: 'Keps' }, { id: 2, name: 'Halsduk' }],
}} />`,
    starterCode: '// Skriv din kod här',
    solution: `function OrderSummary({ order }) {
  if (!order) return <p>Ingen order vald</p>;

  return (
    <section>
      <h2>Order {order.id}</h2>
      {order.isPaid ? <p>Betald</p> : <p>Ej betald</p>}
      {order.items.length === 0 ? (
        <p>Ordern är tom</p>
      ) : (
        <ul>
          {order.items.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
      {order.discount > 0 && <p>Rabatt: {order.discount} kr</p>}
    </section>
  );
}`,
    hints: [],
    tests: [
      {
        description: 'Utan order: "Ingen order vald"',
        code: '__render(<OrderSummary />)',
        expected: '<p>Ingen order vald</p>',
      },
      {
        description: 'Betald order med varor och rabatt',
        code: "__render(<OrderSummary order={{ id: 42, isPaid: true, discount: 50, items: [{ id: 1, name: 'Keps' }, { id: 2, name: 'Halsduk' }] }} />)",
        expected:
          '<section><h2>Order 42</h2><p>Betald</p><ul><li>Keps</li><li>Halsduk</li></ul><p>Rabatt: 50 kr</p></section>',
      },
      {
        description: 'Obetald, tom order utan rabatt visar ingen 0:a',
        code: '__render(<OrderSummary order={{ id: 7, isPaid: false, discount: 0, items: [] }} />)',
        expected:
          '<section><h2>Order 7</h2><p>Ej betald</p><p>Ordern är tom</p></section>',
      },
      {
        description: 'Alla li har en unik key',
        code: "(__render(<OrderSummary order={{ id: 1, isPaid: true, discount: 0, items: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }] }} />), __keyProblems)",
        expected: [],
      },
    ],
  },
  {
    id: 'state-01',
    title: 'Händelser: onClick',
    xp: 10,
    track: 'state',
    isBoss: false,
    description:
      'Med onClick talar du om vilken funktion som ska köras när någon klickar. Skicka funktionen, anropa den inte: onClick={onLike} är rätt. onClick={onLike()} anropar funktionen direkt när komponenten ritas, och sedan händer ingenting vid klick.',
    task: 'Uppgift: Skriv komponenten `LikeButton({ onLike })` som returnerar en button med texten "Gilla". onLike ska anropas när man klickar.',
    fileName: 'App.jsx',
    preview: '<LikeButton onLike={() => {}} />',
    starterCode: '// Skriv din kod här',
    solution: `function LikeButton({ onLike }) {
  return <button onClick={onLike}>Gilla</button>;
}`,
    hints: [
      'Returnera <button>Gilla</button>.',
      'Lägg till onClick på knappen.',
      'Skriv onClick={onLike} utan parenteser efter onLike.',
    ],
    tests: [
      {
        description: 'onLike anropas inte förrän man klickar',
        code: '(() => { let clicks = 0; __mount(<LikeButton onLike={() => clicks++} />); return clicks; })()',
        expected: 0,
      },
      {
        description: 'Ett klick anropar onLike en gång',
        code: "(() => { let clicks = 0; __mount(<LikeButton onLike={() => clicks++} />).click('Gilla'); return clicks; })()",
        expected: 1,
      },
      {
        description: 'Tre klick anropar onLike tre gånger',
        code: "(() => { let clicks = 0; __mount(<LikeButton onLike={() => clicks++} />).click('Gilla').click('Gilla').click('Gilla'); return clicks; })()",
        expected: 3,
      },
    ],
  },
  {
    id: 'state-02',
    title: 'useState',
    xp: 10,
    track: 'state',
    isBoss: false,
    description:
      'En vanlig variabel glöms bort varje gång komponenten ritas om, och React vet inte att den ändrats. För värden som ändras använder du state: const [count, setCount] = useState(0). count är värdet just nu och setCount(…) sparar ett nytt värde och ritar om komponenten. useState importeras från react.',
    task: 'Uppgift: Skriv komponenten `Counter`. Den har state `count` som börjar på 0, visar count i en p och har en button "+1" som ökar count med 1.',
    fileName: 'App.jsx',
    preview: '<Counter />',
    starterCode: `import { useState } from 'react';

`,
    solution: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}`,
    hints: [
      'Första raden i Counter: const [count, setCount] = useState(0);',
      'Visa värdet med <p>{count}</p>.',
      'Knappen: <button onClick={() => setCount(count + 1)}>+1</button>',
    ],
    tests: [
      {
        description: 'count börjar på 0',
        code: "__mount(<Counter />).text('p')",
        expected: '0',
      },
      {
        description: 'Ett klick på "+1" ger 1',
        code: "__mount(<Counter />).click('+1').text('p')",
        expected: '1',
      },
      {
        description: 'Tre klick ger 3',
        code: "__mount(<Counter />).click('+1').click('+1').click('+1').text('p')",
        expected: '3',
      },
    ],
    sourceChecks: [
      {
        description: 'Counter använder useState',
        pattern: /useState\s*\(\s*0\s*\)/,
      },
    ],
  },
  {
    id: 'state-03',
    title: 'Flera knappar, samma state',
    xp: 10,
    track: 'state',
    isBoss: false,
    description:
      'Flera knappar kan ändra samma state på olika sätt. Varje knapp får en egen liten funktion: onClick={() => setCount(count - 1)}. Pilfunktionen behövs eftersom setCount ska anropas med ett värde först när man klickar.',
    task: 'Uppgift: Bygg ut `Counter` med tre knappar: "-1" minskar count, "+1" ökar count och "Nollställ" sätter count till 0.',
    fileName: 'App.jsx',
    preview: '<Counter />',
    starterCode: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}`,
    solution: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(0)}>Nollställ</button>
    </div>
  );
}`,
    hints: [
      'Kopiera knappen "+1" och ändra den till "-1".',
      '"-1" anropar setCount(count - 1).',
      '"Nollställ" anropar setCount(0).',
    ],
    tests: [
      {
        description: '"-1" minskar count',
        code: "__mount(<Counter />).click('-1').click('-1').text('p')",
        expected: '-2',
      },
      {
        description: '"+1" ökar fortfarande count',
        code: "__mount(<Counter />).click('+1').text('p')",
        expected: '1',
      },
      {
        description: '"Nollställ" sätter count till 0',
        code: "__mount(<Counter />).click('+1').click('+1').click('Nollställ').text('p')",
        expected: '0',
      },
    ],
  },
  {
    id: 'state-04',
    title: 'Växla en boolean',
    xp: 10,
    track: 'state',
    isBoss: false,
    description:
      'State kan vara vilken typ av värde som helst. En boolean passar för saker som är på eller av. setIsOn(!isOn) byter till motsatt värde.',
    task: 'Uppgift: Skriv komponenten `Lamp` med state `isOn` som börjar på false. En p visar "Lampan är tänd" eller "Lampan är släckt", och en button "Växla" byter isOn.',
    fileName: 'App.jsx',
    preview: '<Lamp />',
    starterCode: `import { useState } from 'react';

`,
    solution: `import { useState } from 'react';

function Lamp() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <p>{isOn ? 'Lampan är tänd' : 'Lampan är släckt'}</p>
      <button onClick={() => setIsOn(!isOn)}>Växla</button>
    </div>
  );
}`,
    hints: [
      'Börja med const [isOn, setIsOn] = useState(false);',
      "Texten väljs med isOn ? 'Lampan är tänd' : 'Lampan är släckt'.",
      'Knappen anropar setIsOn(!isOn).',
    ],
    tests: [
      {
        description: 'Lampan börjar släckt',
        code: "__mount(<Lamp />).text('p')",
        expected: 'Lampan är släckt',
      },
      {
        description: 'Ett klick tänder lampan',
        code: "__mount(<Lamp />).click('Växla').text('p')",
        expected: 'Lampan är tänd',
      },
      {
        description: 'Två klick släcker den igen',
        code: "__mount(<Lamp />).click('Växla').click('Växla').text('p')",
        expected: 'Lampan är släckt',
      },
    ],
  },
  {
    id: 'state-05',
    title: 'Kontrollerat textfält',
    xp: 10,
    track: 'state',
    isBoss: false,
    description:
      'Ett textfält kopplas till state på två sätt: value={name} visar värdet från state och onChange={event => setName(event.target.value)} sparar det man skriver. Då är state alltid det som står i fältet. Det kallas ett kontrollerat fält.',
    task: 'Uppgift: Skriv komponenten `NameForm` med state `name` som börjar som "". Den har ett kontrollerat input och en p med texten "Hej Ada!" (med name i stället för Ada).',
    fileName: 'App.jsx',
    preview: '<NameForm />',
    starterCode: `import { useState } from 'react';

`,
    solution: `import { useState } from 'react';

function NameForm() {
  const [name, setName] = useState('');

  return (
    <div>
      <input value={name} onChange={event => setName(event.target.value)} />
      <p>Hej {name}!</p>
    </div>
  );
}`,
    hints: [
      "Börja med const [name, setName] = useState('');",
      'input behöver både value={name} och onChange.',
      'onChange={event => setName(event.target.value)}',
    ],
    tests: [
      {
        description: 'Det man skriver visas i p',
        code: "__mount(<NameForm />).type('Ada').text('p')",
        expected: 'Hej Ada!',
      },
      {
        description: 'input visar värdet från state',
        code: "__mount(<NameForm />).type('Linus').html().includes('value=\"Linus\"')",
        expected: true,
      },
    ],
    sourceChecks: [
      {
        description: 'input har value={name}',
        pattern: /value=\{\s*name\s*\}/,
      },
      {
        description: 'Värdet läses från event.target.value',
        pattern: /\.\s*target\s*\.\s*value/,
      },
    ],
  },
  {
    id: 'state-06',
    title: 'Lägg till i en lista',
    xp: 10,
    track: 'state',
    isBoss: false,
    description:
      'State får aldrig ändras direkt. todos.push(…) ändrar arrayen men React märker inget. Skapa i stället en ny array med spread: setTodos([...todos, newTodo]). Det är därför spread var så viktigt i Modern JS-banan.',
    task: `Uppgift: Bygg klart \`TodoApp\`.
  "Lägg till" lägger till { id: crypto.randomUUID(), text } sist i todos
  och tömmer sedan fältet. Använd spread, inte push.`,
    fileName: 'App.jsx',
    preview: '<TodoApp />',
    starterCode: `import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  function handleAdd() {
    // Din kod här
  }

  return (
    <div>
      <input value={text} onChange={event => setText(event.target.value)} />
      <button onClick={handleAdd}>Lägg till</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}`,
    solution: `import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  function handleAdd() {
    setTodos([...todos, { id: crypto.randomUUID(), text }]);
    setText('');
  }

  return (
    <div>
      <input value={text} onChange={event => setText(event.target.value)} />
      <button onClick={handleAdd}>Lägg till</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}`,
    hints: [
      'Allt sker i handleAdd.',
      'Skapa den nya arrayen med [...todos, { id: crypto.randomUUID(), text }].',
      "Anropa setTodos med den nya arrayen och sedan setText('').",
    ],
    tests: [
      {
        description: 'En uppgift läggs till',
        code: "__mount(<TodoApp />).type('Handla').click('Lägg till').text('ul')",
        expected: 'Handla',
      },
      {
        description: 'Två uppgifter hamnar i rätt ordning',
        code: "__mount(<TodoApp />).type('Handla').click('Lägg till').type('Träna').click('Lägg till').html().includes('<ul><li>Handla</li><li>Träna</li></ul>')",
        expected: true,
      },
      {
        description: 'Fältet töms efter "Lägg till"',
        code: "__mount(<TodoApp />).type('Handla').click('Lägg till').html().includes('<input value=\"\"/>')",
        expected: true,
      },
      {
        description: 'Alla li har en unik key',
        code: "(__mount(<TodoApp />).type('A').click('Lägg till').type('B').click('Lägg till'), __keyProblems)",
        expected: [],
      },
    ],
    sourceChecks: [
      {
        description: 'Den nya arrayen skapas med spread',
        pattern: /\[\s*\.\.\.\s*\w+/,
      },
      {
        description: 'Koden använder inte push',
        pattern: /\.\s*push\s*\(/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'state-07',
    title: 'Ta bort ur en lista',
    xp: 10,
    track: 'state',
    isBoss: false,
    description:
      'Att ta bort görs också med en ny array, oftast med filter: setTodos(todos.filter(todo => todo.id !== id)). Alla utom den med rätt id blir kvar.',
    task: 'Uppgift: Varje uppgift har en knapp "Ta bort". Skriv klart `handleRemove(id)` så att uppgiften med det id:t försvinner.',
    fileName: 'App.jsx',
    preview: '<TodoList />',
    starterCode: `import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Handla' },
    { id: 2, text: 'Träna' },
    { id: 3, text: 'Plugga React' },
  ]);

  function handleRemove(id) {
    // Din kod här
  }

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text} <button onClick={() => handleRemove(todo.id)}>Ta bort</button>
        </li>
      ))}
    </ul>
  );
}`,
    solution: `import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Handla' },
    { id: 2, text: 'Träna' },
    { id: 3, text: 'Plugga React' },
  ]);

  function handleRemove(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}{' '}
          <button onClick={() => handleRemove(todo.id)}>Ta bort</button>
        </li>
      ))}
    </ul>
  );
}`,
    hints: [
      'Använd filter för att skapa en ny array.',
      'Behåll alla todos där todo.id !== id.',
      'Skriv setTodos(todos.filter(todo => todo.id !== id));',
    ],
    tests: [
      {
        description: 'Första uppgiften tas bort',
        code: "__mount(<TodoList />).click('Ta bort').count('li')",
        expected: 2,
      },
      {
        description: 'Rätt uppgift försvinner',
        code: "__mount(<TodoList />).click('Ta bort').text('li').startsWith('Träna')",
        expected: true,
      },
      {
        description: 'Alla kan tas bort',
        code: "__mount(<TodoList />).click('Ta bort').click('Ta bort').click('Ta bort').count('li')",
        expected: 0,
      },
    ],
    sourceChecks: [
      { description: 'Koden använder filter', pattern: /\.\s*filter\s*\(/ },
      {
        description: 'Koden använder inte splice',
        pattern: /\.\s*splice\s*\(/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'state-08',
    title: 'Uppdatera ett objekt',
    xp: 10,
    track: 'state',
    isBoss: false,
    description:
      'Samma regel gäller objekt: ändra aldrig user.age direkt. Skapa en kopia med spread och skriv över det som ändras: setUser({ ...user, age: user.age + 1 }).',
    task: 'Uppgift: Knappen "Fyll år" ska öka user.age med 1. Skriv klart `handleBirthday` med spread.',
    fileName: 'App.jsx',
    preview: '<Profile />',
    starterCode: `import { useState } from 'react';

function Profile() {
  const [user, setUser] = useState({ name: 'Ada', age: 36 });

  function handleBirthday() {
    // Din kod här
  }

  return (
    <div>
      <p>
        {user.name}, {user.age} år
      </p>
      <button onClick={handleBirthday}>Fyll år</button>
    </div>
  );
}`,
    solution: `import { useState } from 'react';

function Profile() {
  const [user, setUser] = useState({ name: 'Ada', age: 36 });

  function handleBirthday() {
    setUser({ ...user, age: user.age + 1 });
  }

  return (
    <div>
      <p>
        {user.name}, {user.age} år
      </p>
      <button onClick={handleBirthday}>Fyll år</button>
    </div>
  );
}`,
    hints: [
      'Skapa ett nytt objekt med { ...user }.',
      'Skriv över age efter spread: age: user.age + 1.',
      'Skriv setUser({ ...user, age: user.age + 1 });',
    ],
    tests: [
      {
        description: 'Ett klick ger 37 år',
        code: "__mount(<Profile />).click('Fyll år').text('p')",
        expected: 'Ada, 37 år',
      },
      {
        description: 'Två klick ger 38 år',
        code: "__mount(<Profile />).click('Fyll år').click('Fyll år').text('p')",
        expected: 'Ada, 38 år',
      },
    ],
    sourceChecks: [
      {
        description: 'Det nya objektet skapas med { ...user }',
        pattern: /\{\s*\.\.\.\s*user\b/,
      },
      {
        description: 'user ändras inte direkt',
        pattern: /user\s*\.\s*age\s*(\+\+|\+=|=[^=])/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'state-09',
    title: 'Formulär med onSubmit',
    xp: 10,
    track: 'state',
    isBoss: false,
    description:
      'Ett formulär skickas när man trycker Enter eller på en submit-knapp. Lyssna med onSubmit på form. Webbläsaren laddar annars om sidan, så börja alltid med event.preventDefault().',
    task: 'Uppgift: Skriv klart `handleSubmit`. Det ska stoppa omladdningen och spara name i `submitted`, så att texten "Tack, Ada!" visas.',
    fileName: 'App.jsx',
    preview: '<SignupForm />',
    starterCode: `import { useState } from 'react';

function SignupForm() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState('');

  function handleSubmit(event) {
    // Din kod här
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={event => setName(event.target.value)} />
      <button type="submit">Skicka</button>
      {submitted && <p>Tack, {submitted}!</p>}
    </form>
  );
}`,
    solution: `import { useState } from 'react';

function SignupForm() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={event => setName(event.target.value)} />
      <button type="submit">Skicka</button>
      {submitted && <p>Tack, {submitted}!</p>}
    </form>
  );
}`,
    hints: [
      'Första raden i handleSubmit: event.preventDefault();',
      'Spara sedan det som står i fältet.',
      'Skriv setSubmitted(name);',
    ],
    tests: [
      {
        description: 'Formuläret stoppar omladdningen',
        code: "__mount(<SignupForm />).type('Ada').submit()",
        expected: true,
      },
      {
        description: 'Efter skickat visas "Tack, Ada!"',
        code: "(() => { const app = __mount(<SignupForm />); app.type('Ada'); app.submit(); return app.text('p'); })()",
        expected: 'Tack, Ada!',
      },
      {
        description: 'Inget tack visas innan formuläret skickats',
        code: "__mount(<SignupForm />).type('Ada').count('p')",
        expected: 0,
      },
    ],
  },
  {
    id: 'state-boss-01',
    title: 'Boss: Todo-appen',
    xp: 30,
    track: 'state',
    isBoss: true,
    description:
      'Bygg en hel todo-app med state, formulär, kontrollerade fält, listor och villkor. Ändra aldrig state direkt.',
    task: `Uppgift: Skriv komponenten \`TodoApp\`.
  Ett form med ett input och en button "Lägg till".
    Vid submit: stoppa omladdningen, lägg till { id, text, done: false }
    och töm fältet. Tom text (efter trim) läggs inte till.
  En ul med ett li per todo (key todo.id) som innehåller:
    en checkbox (input type="checkbox") som växlar done,
    texten i en span, och en button "Ta bort".
  En p med "2 kvar": antalet todos som inte är klara.`,
    fileName: 'App.jsx',
    preview: '<TodoApp />',
    starterCode: `import { useState } from 'react';

`,
    solution: `import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (text.trim() === '') return;
    setTodos([...todos, { id: crypto.randomUUID(), text, done: false }]);
    setText('');
  }

  function toggle(id) {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  function remove(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const left = todos.filter(todo => !todo.done).length;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={event => setText(event.target.value)} />
        <button type="submit">Lägg till</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggle(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => remove(todo.id)}>Ta bort</button>
          </li>
        ))}
      </ul>
      <p>{left} kvar</p>
    </div>
  );
}`,
    hints: [],
    tests: [
      {
        description: 'Två uppgifter läggs till och fältet töms',
        code: "(() => { const app = __mount(<TodoApp />); app.type('Handla'); app.submit(); app.type('Träna'); app.submit(); return [app.count('li'), app.text('p'), app.html().includes('<input value=\"\"/>')]; })()",
        expected: [2, '2 kvar', true],
      },
      {
        description: 'submit stoppar omladdningen',
        code: "__mount(<TodoApp />).type('Handla').submit()",
        expected: true,
      },
      {
        description: 'Tom text läggs inte till',
        code: "(() => { const app = __mount(<TodoApp />); app.type('   '); app.submit(); return app.count('li'); })()",
        expected: 0,
      },
      {
        description: 'Checkboxen markerar en uppgift som klar',
        code: "(() => { const app = __mount(<TodoApp />); app.type('Handla'); app.submit(); app.type('Träna'); app.submit(); app.check(1); return app.text('p'); })()",
        expected: '1 kvar',
      },
      {
        description: '"Ta bort" tar bort den första uppgiften',
        code: "(() => { const app = __mount(<TodoApp />); app.type('Handla'); app.submit(); app.type('Träna'); app.submit(); app.click('Ta bort'); return [app.count('li'), app.text('span')]; })()",
        expected: [1, 'Träna'],
      },
      {
        description: 'Alla li har en unik key',
        code: "(() => { const app = __mount(<TodoApp />); app.type('A'); app.submit(); app.type('B'); app.submit(); return __keyProblems; })()",
        expected: [],
      },
    ],
    sourceChecks: [
      {
        description: 'Koden använder inte push',
        pattern: /\.\s*push\s*\(/,
        forbidden: true,
      },
      {
        description: 'Koden använder inte splice',
        pattern: /\.\s*splice\s*\(/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'lift-01',
    title: 'Skicka data uppåt',
    xp: 10,
    track: 'lifting',
    isBoss: false,
    description:
      'Props går bara neråt, från förälder till barn. Vill ett barn berätta något för föräldern skickar föräldern ner en funktion, en callback, som barnet anropar med datan: onRate(3). Sådana props brukar heta on-något.',
    task: 'Uppgift: Skriv komponenten `Rating({ onRate })` med tre knappar "1", "2" och "3". Ett klick på en knapp anropar onRate med det talet.',
    fileName: 'App.jsx',
    preview: '<Rating onRate={() => {}} />',
    starterCode: '// Skriv din kod här',
    solution: `function Rating({ onRate }) {
  return (
    <div>
      <button onClick={() => onRate(1)}>1</button>
      <button onClick={() => onRate(2)}>2</button>
      <button onClick={() => onRate(3)}>3</button>
    </div>
  );
}`,
    hints: [
      'Returnera en div med tre knappar.',
      'Varje knapp behöver en egen pilfunktion i onClick.',
      'Första knappen: <button onClick={() => onRate(1)}>1</button>',
    ],
    tests: [
      {
        description: 'Ett klick på "3" anropar onRate(3)',
        code: "(() => { const calls = []; __mount(<Rating onRate={value => calls.push(value)} />).click('3'); return calls; })()",
        expected: [3],
      },
      {
        description: 'Varje knapp skickar sitt eget tal',
        code: "(() => { const calls = []; __mount(<Rating onRate={value => calls.push(value)} />).click('1').click('2').click('3'); return calls; })()",
        expected: [1, 2, 3],
      },
      {
        description: 'onRate anropas inte förrän man klickar',
        code: '(() => { const calls = []; __mount(<Rating onRate={value => calls.push(value)} />); return calls; })()',
        expected: [],
      },
    ],
  },
  {
    id: 'lift-02',
    title: 'Föräldern äger state',
    xp: 10,
    track: 'lifting',
    isBoss: false,
    description:
      'När två komponenter behöver samma värde lägger man state i deras gemensamma förälder. Föräldern skickar värdet neråt som en prop och en funktion som ändrar det. Barnen har inget eget state, de visar bara och berättar.',
    task: 'Uppgift: Skriv `App`. Den äger state `count` (börjar på 0) och renderar Display med count och IncrementButton med onIncrement, som ökar count med 1.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `import { useState } from 'react';

function Display({ count }) {
  return <p>Antal: {count}</p>;
}

function IncrementButton({ onIncrement }) {
  return <button onClick={onIncrement}>+1</button>;
}

function App() {
  // Din kod här
}`,
    solution: `import { useState } from 'react';

function Display({ count }) {
  return <p>Antal: {count}</p>;
}

function IncrementButton({ onIncrement }) {
  return <button onClick={onIncrement}>+1</button>;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Display count={count} />
      <IncrementButton onIncrement={() => setCount(count + 1)} />
    </div>
  );
}`,
    hints: [
      'App börjar med const [count, setCount] = useState(0);',
      'Display får count={count}.',
      'IncrementButton får onIncrement={() => setCount(count + 1)}.',
    ],
    tests: [
      {
        description: 'Display visar 0 från början',
        code: "__mount(<App />).text('p')",
        expected: 'Antal: 0',
      },
      {
        description: 'Knappen i ett barn ändrar det andra barnet',
        code: "__mount(<App />).click('+1').click('+1').text('p')",
        expected: 'Antal: 2',
      },
    ],
    sourceChecks: [
      { description: 'App använder <Display', pattern: /<Display\b/ },
      {
        description: 'App använder <IncrementButton',
        pattern: /<IncrementButton\b/,
      },
    ],
  },
  {
    id: 'lift-03',
    title: 'Syskon som delar state',
    xp: 10,
    track: 'lifting',
    isBoss: false,
    description:
      'Sökfältet och resultatlistan är syskon. Listan behöver veta vad som står i sökfältet, så query bor i föräldern. SearchBar får både värdet och en callback för att ändra det: query och onQueryChange.',
    task: 'Uppgift: Skriv `App`. Den äger state `query` (börjar som "") och kopplar ihop SearchBar och ResultList.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `import { useState } from 'react';

const fruits = ['Äpple', 'Banan', 'Päron', 'Ananas'];

function SearchBar({ query, onQueryChange }) {
  return (
    <input value={query} onChange={event => onQueryChange(event.target.value)} />
  );
}

function ResultList({ query }) {
  const matches = fruits.filter(fruit =>
    fruit.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <ul>
      {matches.map(fruit => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}

function App() {
  // Din kod här
}`,
    solution: `import { useState } from 'react';

const fruits = ['Äpple', 'Banan', 'Päron', 'Ananas'];

function SearchBar({ query, onQueryChange }) {
  return (
    <input
      value={query}
      onChange={event => onQueryChange(event.target.value)}
    />
  );
}

function ResultList({ query }) {
  const matches = fruits.filter(fruit =>
    fruit.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <ul>
      {matches.map(fruit => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}

function App() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <SearchBar query={query} onQueryChange={setQuery} />
      <ResultList query={query} />
    </div>
  );
}`,
    hints: [
      "App börjar med const [query, setQuery] = useState('');",
      'SearchBar behöver query={query} och onQueryChange={setQuery}.',
      'ResultList behöver bara query={query}.',
    ],
    tests: [
      {
        description: 'Alla frukter visas från början',
        code: "__mount(<App />).count('li')",
        expected: 4,
      },
      {
        description: 'Sökningen "an" visar Banan och Ananas',
        code: "__mount(<App />).type('an').text('ul')",
        expected: 'BananAnanas',
      },
      {
        description: 'Sökfältet visar det man skrivit',
        code: "__mount(<App />).type('pä').html().includes('value=\"pä\"')",
        expected: true,
      },
    ],
  },
  {
    id: 'lift-04',
    title: 'Skriv ett kontrollerat barn',
    xp: 10,
    track: 'lifting',
    isBoss: false,
    description:
      'Nu skriver du barnet själv. Ett kontrollerat barn har inget eget state: värdet kommer som en prop och ändringar skickas uppåt med en callback. Det är samma kontrollerade fält som förut, bara uppdelat på två komponenter.',
    task: 'Uppgift: Skriv `NameInput({ name, onNameChange })`. Den returnerar ett input som visar name och anropar onNameChange med det nya värdet när man skriver. Använd inte useState i NameInput.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `import { useState } from 'react';

// Skriv NameInput här

function App() {
  const [name, setName] = useState('');

  return (
    <div>
      <NameInput name={name} onNameChange={setName} />
      <p>Hej {name || 'du'}!</p>
    </div>
  );
}`,
    solution: `import { useState } from 'react';

function NameInput({ name, onNameChange }) {
  return (
    <input value={name} onChange={event => onNameChange(event.target.value)} />
  );
}

function App() {
  const [name, setName] = useState('');

  return (
    <div>
      <NameInput name={name} onNameChange={setName} />
      <p>Hej {name || 'du'}!</p>
    </div>
  );
}`,
    hints: [
      'Börja med function NameInput({ name, onNameChange }).',
      'input får value={name}.',
      'onChange={event => onNameChange(event.target.value)}',
    ],
    tests: [
      {
        description: 'Det man skriver når App',
        code: "__mount(<App />).type('Ada').text('p')",
        expected: 'Hej Ada!',
      },
      {
        description: 'NameInput visar värdet från propen',
        code: '__render(<NameInput name="Linus" onNameChange={() => {}} />)',
        expected: '<input value="Linus"/>',
      },
    ],
    sourceChecks: [
      {
        description: 'NameInput har inget eget state',
        pattern:
          /(?:function\s+NameInput|NameInput\s*=)[^]*?useState[^]*?(?:function\s+App|App\s*=)/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'lift-05',
    title: 'Skicka med id',
    xp: 10,
    track: 'lifting',
    isBoss: false,
    description:
      'I en lista vet barnet vilken rad det är, men föräldern äger listan. Barnet skickar därför med sitt id: onToggle(todo.id). Föräldern letar upp rätt rad och uppdaterar state.',
    task: 'Uppgift: Skriv `TodoItem({ todo, onToggle, onRemove })`. Ett li med en checkbox som visar todo.done och anropar onToggle(todo.id), texten i en span och en button "Ta bort" som anropar onRemove(todo.id).',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `import { useState } from 'react';

// Skriv TodoItem här

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Handla', done: false },
    { id: 2, text: 'Träna', done: false },
  ]);

  function handleToggle(id) {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  }

  function handleRemove(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />
      ))}
    </ul>
  );
}`,
    solution: `import { useState } from 'react';

function TodoItem({ todo, onToggle, onRemove }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onRemove(todo.id)}>Ta bort</button>
    </li>
  );
}

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Handla', done: false },
    { id: 2, text: 'Träna', done: false },
  ]);

  function handleToggle(id) {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  function handleRemove(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />
      ))}
    </ul>
  );
}`,
    hints: [
      'Börja med function TodoItem({ todo, onToggle, onRemove }) och returnera ett li.',
      'Checkboxen: <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />',
      'Knappen: <button onClick={() => onRemove(todo.id)}>Ta bort</button>',
    ],
    tests: [
      {
        description: 'Båda uppgifterna visas',
        code: "__mount(<App />).count('li')",
        expected: 2,
      },
      {
        description: 'Checkboxen bockar för rätt uppgift',
        code: '__mount(<App />).check(1).html().includes(\'<li><input type="checkbox"/><span>Handla\')',
        expected: true,
      },
      {
        description: 'Checkboxen skickar todo.id till onToggle',
        code: "(() => { const calls = []; __mount(<TodoItem todo={{ id: 7, text: 'A', done: false }} onToggle={id => calls.push(id)} onRemove={() => {}} />).check(); return calls; })()",
        expected: [7],
      },
      {
        description: '"Ta bort" tar bort rätt uppgift',
        code: "__mount(<App />).click('Ta bort').text('span')",
        expected: 'Träna',
      },
    ],
  },
  {
    id: 'lift-06',
    title: 'Räkna ut i stället för att spara',
    xp: 10,
    track: 'lifting',
    isBoss: false,
    description:
      'Spara inte det som går att räkna ut. Här finns både todos och left i state, och de har glidit isär: left uppdateras inte när man tar bort en uppgift. Räkna i stället ut left från todos varje gång komponenten ritas. Då kan de aldrig visa olika saker.',
    task: 'Uppgift: Ta bort state `left`. Räkna ut left från todos (antalet som inte är klara) direkt i komponenten.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Handla', done: false },
    { id: 2, text: 'Träna', done: true },
    { id: 3, text: 'Plugga React', done: false },
  ]);
  const [left, setLeft] = useState(2);

  function handleRemove(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div>
      <p>{left} kvar</p>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text} <button onClick={() => handleRemove(todo.id)}>Ta bort</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    solution: `import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Handla', done: false },
    { id: 2, text: 'Träna', done: true },
    { id: 3, text: 'Plugga React', done: false },
  ]);
  const left = todos.filter(todo => !todo.done).length;

  function handleRemove(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div>
      <p>{left} kvar</p>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}{' '}
            <button onClick={() => handleRemove(todo.id)}>Ta bort</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    hints: [
      'Ta bort raden med useState(2).',
      'left är antalet todos där done är false.',
      'Skriv const left = todos.filter(todo => !todo.done).length;',
    ],
    tests: [
      {
        description: 'Från början: "2 kvar"',
        code: "__mount(<App />).text('p')",
        expected: '2 kvar',
      },
      {
        description: 'Efter att Handla tagits bort: "1 kvar"',
        code: "__mount(<App />).click('Ta bort').text('p')",
        expected: '1 kvar',
      },
    ],
    sourceChecks: [
      {
        description: 'Det finns bara ett state: todos',
        pattern: /useState\s*\([^]*useState\s*\(/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'lift-boss-01',
    title: 'Boss: Kundvagnen',
    xp: 30,
    track: 'lifting',
    isBoss: true,
    description:
      'Bygg en butik där App äger kundvagnen och barnen bara visar och berättar. Ingen data får finnas på två ställen.',
    task: `Uppgift: ProductList är klar. Skriv \`Cart\` och \`App\`.
  \`Cart({ items, onRemove })\`:
    är items tom visas <p>Kundvagnen är tom</p>,
    annars en ul med ett li per vara: namnet följt av en
    button "Ta bort" som anropar onRemove med varans cartId.
    Sist en p med "Totalt: 348 kr", uträknat från items.
  App äger state items (en tom array från början).
    onAdd(product) lägger till { ...product, cartId: crypto.randomUUID() }.
    onRemove(cartId) tar bort den varan.
    App renderar ProductList och sedan Cart.`,
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `import { useState } from 'react';

const products = [
  { id: 1, name: 'Keps', price: 199 },
  { id: 2, name: 'Mössa', price: 149 },
];

function ProductList({ onAdd }) {
  return (
    <div>
      {products.map(product => (
        <button key={product.id} onClick={() => onAdd(product)}>
          Köp {product.name}
        </button>
      ))}
    </div>
  );
}

`,
    solution: `import { useState } from 'react';

const products = [
  { id: 1, name: 'Keps', price: 199 },
  { id: 2, name: 'Mössa', price: 149 },
];

function ProductList({ onAdd }) {
  return (
    <div>
      {products.map(product => (
        <button key={product.id} onClick={() => onAdd(product)}>
          Köp {product.name}
        </button>
      ))}
    </div>
  );
}

function Cart({ items, onRemove }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <section>
      {items.length === 0 ? (
        <p>Kundvagnen är tom</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.cartId}>
              {item.name}{' '}
              <button onClick={() => onRemove(item.cartId)}>Ta bort</button>
            </li>
          ))}
        </ul>
      )}
      <p>Totalt: {total} kr</p>
    </section>
  );
}

function App() {
  const [items, setItems] = useState([]);

  function handleAdd(product) {
    setItems([...items, { ...product, cartId: crypto.randomUUID() }]);
  }

  function handleRemove(cartId) {
    setItems(items.filter(item => item.cartId !== cartId));
  }

  return (
    <div>
      <ProductList onAdd={handleAdd} />
      <Cart items={items} onRemove={handleRemove} />
    </div>
  );
}`,
    hints: [],
    tests: [
      {
        description: 'Kundvagnen är tom från början',
        code: "__mount(<App />).text('section')",
        expected: 'Kundvagnen är tomTotalt: 0 kr',
      },
      {
        description: 'Två köpta varor visas med rätt totalsumma',
        code: "(() => { const app = __mount(<App />).click('Köp Keps').click('Köp Mössa'); return [app.count('li'), app.text('section').endsWith('Totalt: 348 kr')]; })()",
        expected: [2, true],
      },
      {
        description: 'Samma vara kan köpas två gånger',
        code: "__mount(<App />).click('Köp Keps').click('Köp Keps').text('section').endsWith('Totalt: 398 kr')",
        expected: true,
      },
      {
        description: '"Ta bort" tar bort den första varan',
        code: "(() => { const app = __mount(<App />).click('Köp Keps').click('Köp Mössa').click('Ta bort'); return [app.text('li'), app.text('section').endsWith('Totalt: 149 kr')]; })()",
        expected: ['Mössa Ta bort', true],
      },
      {
        description: 'Cart anropar onRemove med cartId',
        code: "(() => { const calls = []; __mount(<Cart items={[{ cartId: 'x1', name: 'Keps', price: 199 }]} onRemove={id => calls.push(id)} />).click('Ta bort'); return calls; })()",
        expected: ['x1'],
      },
      {
        description: 'Alla varor har en unik key',
        code: "(__mount(<App />).click('Köp Keps').click('Köp Keps'), __keyProblems)",
        expected: [],
      },
    ],
    sourceChecks: [
      { description: 'App använder <ProductList', pattern: /<ProductList\b/ },
      { description: 'App använder <Cart', pattern: /<Cart\b/ },
      {
        description: 'Totalsumman räknas ut, den sparas inte i state',
        pattern: /useState\s*\([^]*useState\s*\(/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'effects-01',
    title: 'Din första effekt',
    xp: 10,
    track: 'effects',
    isBoss: false,
    description:
      'En komponent ska bara räkna ut vad som ska visas. Allt som påverkar något utanför React, som sidans titel, localStorage eller timers, kallas en sidoeffekt och läggs i useEffect. Funktionen du ger useEffect körs efter att komponenten ritats.',
    task: 'Uppgift: Lägg till en useEffect i Counter som sätter document.title till "Klick: 0" (med count i stället för 0).',
    fileName: 'App.jsx',
    preview: '<Counter />',
    starterCode: `import { useEffect, useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>+1</button>;
}`,
    solution: `import { useEffect, useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Klick: \${count}\`;
  });

  return <button onClick={() => setCount(count + 1)}>+1</button>;
}`,
    hints: [
      'Skriv useEffect(() => { }); före return.',
      'Inuti effekten sätter du document.title.',
      'Skriv document.title = `Klick: ${count}`;',
    ],
    tests: [
      {
        description: 'Titeln är "Klick: 0" från början',
        code: '(__mount(<Counter />), document.title)',
        expected: 'Klick: 0',
      },
      {
        description: 'Titeln följer med när man klickar',
        code: "(__mount(<Counter />).click('+1').click('+1'), document.title)",
        expected: 'Klick: 2',
      },
    ],
    sourceChecks: [
      { description: 'Titeln sätts i en useEffect', pattern: /useEffect\s*\(/ },
    ],
  },
  {
    id: 'effects-02',
    title: 'Beroendelistan',
    xp: 10,
    track: 'effects',
    isBoss: false,
    description:
      'Utan andra argument körs en effekt efter varje rendering. Med en beroendelista körs den bara när något i listan ändrats: useEffect(() => { … }, [name]). Lista alla värden från komponenten som effekten använder.',
    task: 'Uppgift: Effekten sparar name i localStorage. Ge den beroendelistan [name], så att den inte körs när man bara byter tema.',
    fileName: 'App.jsx',
    preview: '<Settings />',
    starterCode: `import { useEffect, useState } from 'react';

function Settings() {
  const [name, setName] = useState('');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    localStorage.setItem('name', name);
  });

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <input value={name} onChange={event => setName(event.target.value)} />
      <button onClick={() => setIsDark(!isDark)}>Byt tema</button>
    </div>
  );
}`,
    solution: `import { useEffect, useState } from 'react';

function Settings() {
  const [name, setName] = useState('');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    localStorage.setItem('name', name);
  }, [name]);

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <input value={name} onChange={event => setName(event.target.value)} />
      <button onClick={() => setIsDark(!isDark)}>Byt tema</button>
    </div>
  );
}`,
    hints: [
      'Beroendelistan är useEffects andra argument.',
      'Den skrivs efter funktionens } och ett komma.',
      'Skriv }, [name]);',
    ],
    tests: [
      {
        description: 'name sparas när man skriver',
        code: "(__mount(<Settings />).type('Ada'), localStorage.getItem('name'))",
        expected: 'Ada',
      },
      {
        description: 'Effekten körs inte när temat byts',
        code: "(() => { const app = __mount(<Settings />); const before = localStorage.writes; app.click('Byt tema').click('Byt tema'); return localStorage.writes - before; })()",
        expected: 0,
      },
    ],
  },
  {
    id: 'effects-03',
    title: 'Läs ett sparat värde',
    xp: 10,
    track: 'effects',
    isBoss: false,
    description:
      'Att läsa ett sparat värde behöver ingen effekt. Ge useState en funktion så körs den bara första gången: useState(() => localStorage.getItem("note") ?? ""). getItem ger null om inget är sparat, och ?? byter då null mot "".',
    task: 'Uppgift: Låt note börja med det som finns sparat under "note" i localStorage, eller "" om inget finns. Spara sedan note i en effekt varje gång den ändras.',
    fileName: 'App.jsx',
    preview: '<NoteApp />',
    starterCode: `import { useEffect, useState } from 'react';

function NoteApp() {
  const [note, setNote] = useState('');

  return (
    <textarea value={note} onChange={event => setNote(event.target.value)} />
  );
}`,
    solution: `import { useEffect, useState } from 'react';

function NoteApp() {
  const [note, setNote] = useState(() => localStorage.getItem('note') ?? '');

  useEffect(() => {
    localStorage.setItem('note', note);
  }, [note]);

  return (
    <textarea value={note} onChange={event => setNote(event.target.value)} />
  );
}`,
    hints: [
      "Ändra useState('') till useState(() => …).",
      "Funktionen returnerar localStorage.getItem('note') ?? ''.",
      "Lägg till useEffect(() => { localStorage.setItem('note', note); }, [note]);",
    ],
    tests: [
      {
        description: 'Ett sparat värde visas från början',
        code: "(localStorage.setItem('note', 'Köp mjölk'), __mount(<NoteApp />).html())",
        expected: '<textarea value="Köp mjölk"></textarea>',
      },
      {
        description: 'Utan sparat värde är fältet tomt',
        code: '__mount(<NoteApp />).html()',
        expected: '<textarea value=""></textarea>',
      },
      {
        description: 'Det man skriver sparas',
        code: "(__mount(<NoteApp />).type('Ring mamma'), localStorage.getItem('note'))",
        expected: 'Ring mamma',
      },
    ],
    sourceChecks: [
      {
        description: 'Startvärdet läses med en funktion: useState(() => …)',
        pattern: /useState\s*\(\s*\(\s*\)\s*=>/,
      },
    ],
  },
  {
    id: 'effects-04',
    title: 'JSON i localStorage',
    xp: 10,
    track: 'effects',
    isBoss: false,
    description:
      'localStorage kan bara spara text. Arrayer och objekt görs om till text med JSON.stringify när de sparas och tillbaka med JSON.parse när de läses. Den här appen sparar dina klarade övningar precis så.',
    task: `Uppgift: Spara todos i localStorage under "todos".
  Läs startvärdet med JSON.parse, eller [] om inget finns.
  Spara med JSON.stringify i en effekt när todos ändras.`,
    fileName: 'App.jsx',
    preview: '<TodoApp />',
    starterCode: `import { useEffect, useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <button onClick={() => setTodos([...todos, 'Ny uppgift'])}>Lägg till</button>
      <p>{todos.length} uppgifter</p>
    </div>
  );
}`,
    solution: `import { useEffect, useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <button onClick={() => setTodos([...todos, 'Ny uppgift'])}>
        Lägg till
      </button>
      <p>{todos.length} uppgifter</p>
    </div>
  );
}`,
    hints: [
      'Startvärdet: useState(() => { … }) med getItem och JSON.parse.',
      'Finns inget sparat ger getItem null. Returnera då [].',
      "Effekten: localStorage.setItem('todos', JSON.stringify(todos)), med [todos] som beroende.",
    ],
    tests: [
      {
        description: 'Sparade todos läses in',
        code: "(localStorage.setItem('todos', JSON.stringify(['A', 'B'])), __mount(<TodoApp />).text('p'))",
        expected: '2 uppgifter',
      },
      {
        description: 'Utan sparade todos börjar listan tom',
        code: "__mount(<TodoApp />).text('p')",
        expected: '0 uppgifter',
      },
      {
        description: 'todos sparas som JSON',
        code: "(__mount(<TodoApp />).click('Lägg till'), JSON.parse(localStorage.getItem('todos')))",
        expected: ['Ny uppgift'],
      },
    ],
    sourceChecks: [
      {
        description: 'Koden använder JSON.parse',
        pattern: /JSON\s*\.\s*parse\s*\(/,
      },
      {
        description: 'Koden använder JSON.stringify',
        pattern: /JSON\s*\.\s*stringify\s*\(/,
      },
    ],
  },
  {
    id: 'effects-05',
    title: 'Städa upp',
    xp: 10,
    track: 'effects',
    isBoss: false,
    description:
      'En effekt som startar något, som en timer, måste också stoppa det. Returnera en städfunktion från effekten: return () => clearInterval(id). React kör den när komponenten tas bort. Inuti intervallet uppdaterar du med en funktion, setSeconds(s => s + 1), eftersom seconds i effekten annars alltid är startvärdet 0.',
    task: 'Uppgift: Starta ett intervall i en effekt som ökar seconds med 1 varje sekund (1000 ms). Kör effekten bara en gång med [] och returnera en städfunktion som stoppar intervallet.',
    fileName: 'App.jsx',
    preview: '<Timer />',
    starterCode: `import { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  return <p>{seconds} sekunder</p>;
}`,
    solution: `import { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p>{seconds} sekunder</p>;
}`,
    hints: [
      'Spara intervallet: const id = setInterval(() => { … }, 1000);',
      'Inuti intervallet: setSeconds(s => s + 1);',
      'Sist i effekten: return () => clearInterval(id); och beroendelistan [].',
    ],
    tests: [
      {
        description: 'Efter tre sekunder visas "3 sekunder"',
        code: "__mount(<Timer />).tick(3000).text('p')",
        expected: '3 sekunder',
      },
      {
        description: 'Bara ett intervall startas',
        code: '(__mount(<Timer />).tick(5000), __clock.active())',
        expected: 1,
      },
      {
        description: 'Intervallet stoppas när Timer tas bort',
        code: '(__mount(<Timer />).tick(1000).unmount(), __clock.active())',
        expected: 0,
      },
    ],
    sourceChecks: [
      {
        description: 'Effekten körs bara en gång: beroendelistan är []',
        pattern: /,\s*\[\s*\]\s*\)/,
      },
    ],
  },
  {
    id: 'effects-06',
    title: 'Ett glömt beroende',
    xp: 10,
    track: 'effects',
    isBoss: false,
    description:
      'Ett vanligt fel är att glömma ett värde i beroendelistan. Då körs effekten inte när värdet ändras, och det som visas utanför React blir gammalt. Här använder effekten propen title, men beroendelistan är tom.',
    task: 'Uppgift: Rätta beroendelistan så att document.title uppdateras när propen title ändras.',
    fileName: 'App.jsx',
    preview: '<PageTitle title="Start" />',
    starterCode: `import { useEffect } from 'react';

function PageTitle({ title }) {
  useEffect(() => {
    document.title = \`\${title} | Academy\`;
  }, []);

  return <h1>{title}</h1>;
}`,
    solution: `import { useEffect } from 'react';

function PageTitle({ title }) {
  useEffect(() => {
    document.title = \`\${title} | Academy\`;
  }, [title]);

  return <h1>{title}</h1>;
}`,
    hints: [
      'Vilka värden från komponenten använder effekten?',
      'Effekten använder title.',
      'Skriv [title] som beroendelista.',
    ],
    tests: [
      {
        description: 'Titeln sätts från början',
        code: '(__mount(<PageTitle title="Start" />), document.title)',
        expected: 'Start | Academy',
      },
      {
        description: 'Titeln uppdateras när propen ändras',
        code: '(__mount(<PageTitle title="Start" />).rerender(<PageTitle title="Profil" />), document.title)',
        expected: 'Profil | Academy',
      },
    ],
    sourceChecks: [
      {
        description: 'title finns i beroendelistan',
        pattern: /,\s*\[\s*title\s*\]\s*\)/,
      },
    ],
  },
  {
    id: 'effects-boss-01',
    title: 'Boss: Stoppuret',
    xp: 30,
    track: 'effects',
    isBoss: true,
    description:
      'Bygg ett stoppur som använder allt om effekter: beroendelistor, timers med städning, document.title och localStorage.',
    task: `Uppgift: Skriv komponenten \`Stopwatch\`.
  seconds börjar med talet sparat under "seconds" i localStorage, annars 0.
  isRunning börjar som false.
  En p visar "3 s" (seconds följt av " s").
  En button visar "Start" eller "Stopp" och växlar isRunning.
  En button "Nollställ" sätter seconds till 0.
  När isRunning är true ökar seconds med 1 varje sekund.
    Intervallet ska stoppas när man trycker Stopp och när Stopwatch tas bort.
  När seconds ändras: sätt document.title till "⏱ 3 s"
    och spara seconds i localStorage under "seconds".`,
    fileName: 'App.jsx',
    preview: '<Stopwatch />',
    starterCode: `import { useEffect, useState } from 'react';

`,
    solution: `import { useEffect, useState } from 'react';

function Stopwatch() {
  const [seconds, setSeconds] = useState(
    () => Number(localStorage.getItem('seconds')) || 0,
  );
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  useEffect(() => {
    document.title = \`⏱ \${seconds} s\`;
    localStorage.setItem('seconds', String(seconds));
  }, [seconds]);

  return (
    <div>
      <p>{seconds} s</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stopp' : 'Start'}
      </button>
      <button onClick={() => setSeconds(0)}>Nollställ</button>
    </div>
  );
}`,
    hints: [],
    tests: [
      {
        description: 'Stoppuret börjar på "0 s" och står still',
        code: "__mount(<Stopwatch />).tick(3000).text('p')",
        expected: '0 s',
      },
      {
        description: 'Start räknar upp en gång per sekund',
        code: "__mount(<Stopwatch />).click('Start').tick(3000).text('p')",
        expected: '3 s',
      },
      {
        description: 'Stopp stoppar intervallet',
        code: "(() => { const app = __mount(<Stopwatch />).click('Start').tick(2000).click('Stopp').tick(5000); return [app.text('p'), __clock.active()]; })()",
        expected: ['2 s', 0],
      },
      {
        description: 'Nollställ sätter tiden till 0',
        code: "__mount(<Stopwatch />).click('Start').tick(4000).click('Nollställ').text('p')",
        expected: '0 s',
      },
      {
        description: 'Titeln och localStorage följer tiden',
        code: "(__mount(<Stopwatch />).click('Start').tick(2000), [document.title, localStorage.getItem('seconds')])",
        expected: ['⏱ 2 s', '2'],
      },
      {
        description: 'En sparad tid läses in',
        code: "(localStorage.setItem('seconds', '10'), __mount(<Stopwatch />).text('p'))",
        expected: '10 s',
      },
      {
        description: 'Intervallet stoppas när Stopwatch tas bort',
        code: "(__mount(<Stopwatch />).click('Start').tick(1000).unmount(), __clock.active())",
        expected: 0,
      },
    ],
  },
  {
    id: 'data-01',
    title: 'Hämta i en effekt',
    xp: 10,
    track: 'data',
    isBoss: false,
    description:
      'Att hämta data är en sidoeffekt, så det görs i useEffect. Med [] som beroendelista hämtas datan en gång när komponenten visas. När svaret kommer sparas det i state, och då ritas listan om.',
    task: 'Uppgift: Hämta /api/users i en effekt som bara körs en gång. Spara användarna i `users` och visa ett li per användare med user.name (key user.id).',
    fileName: 'App.jsx',
    preview: '<Users />',
    starterCode: `import { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  return <ul></ul>;
}`,
    solution: `import { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
    hints: [
      'Skriv useEffect(() => { … }, []); före return.',
      "I effekten: fetch('/api/users').then(response => response.json()).then(data => setUsers(data));",
      'Listan: {users.map(user => <li key={user.id}>{user.name}</li>)}',
    ],
    tests: [
      {
        description: 'Tre användare visas när datan kommit',
        code: "(async () => { const app = __mount(<Users />); await app.settle(); return app.count('li'); })()",
        expected: 3,
      },
      {
        description: 'Första användaren är Ada Lovelace',
        code: "(async () => { const app = __mount(<Users />); await app.settle(); return app.text('li'); })()",
        expected: 'Ada Lovelace',
      },
      {
        description: 'Datan hämtas bara en gång',
        code: '(async () => { const app = __mount(<Users />); await app.settle(); return fetch.calls; })()',
        expected: ['/api/users'],
      },
      {
        description: 'Alla li har en unik key',
        code: '(async () => { const app = __mount(<Users />); await app.settle(); return __keyProblems; })()',
        expected: [],
      },
    ],
  },
  {
    id: 'data-02',
    title: 'async i en effekt',
    xp: 10,
    track: 'data',
    isBoss: false,
    description:
      'Effektens funktion får inte vara async, eftersom React förväntar sig att få tillbaka en städfunktion och inte ett Promise. Skriv i stället en async-funktion inuti effekten och anropa den direkt.',
    task: 'Uppgift: Hämta /api/todos med async/await i en funktion inuti effekten. Visa ett li per uppgift med todo.title (key todo.id).',
    fileName: 'App.jsx',
    preview: '<Todos />',
    starterCode: `import { useEffect, useState } from 'react';

function Todos() {
  const [todos, setTodos] = useState([]);

  return <ul></ul>;
}`,
    solution: `import { useEffect, useState } from 'react';

function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function load() {
      const response = await fetch('/api/todos');
      setTodos(await response.json());
    }
    load();
  }, []);

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}`,
    hints: [
      'Inuti useEffect: async function load() { … } och sedan load();',
      "I load: const response = await fetch('/api/todos');",
      'Spara med setTodos(await response.json());',
    ],
    tests: [
      {
        description: 'Tre uppgifter visas',
        code: "(async () => { const app = __mount(<Todos />); await app.settle(); return app.count('li'); })()",
        expected: 3,
      },
      {
        description: 'Första uppgiften är "Skriv första programmet"',
        code: "(async () => { const app = __mount(<Todos />); await app.settle(); return app.text('li'); })()",
        expected: 'Skriv första programmet',
      },
    ],
    sourceChecks: [
      { description: 'Koden använder await', pattern: /\bawait\b/ },
      {
        description: 'Effektens funktion är inte async',
        pattern: /useEffect\s*\(\s*async/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'data-03',
    title: 'Laddar…',
    xp: 10,
    track: 'data',
    isBoss: false,
    description:
      'Medan datan hämtas ska användaren se att något händer. Ett state isLoading som börjar som true och sätts till false när datan kommit räcker långt.',
    task: 'Uppgift: Lägg till state `isLoading` som börjar som true. Visa <p>Laddar…</p> så länge den är true. Sätt den till false när användarna sparats.',
    fileName: 'App.jsx',
    preview: '<Users />',
    starterCode: `import { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function load() {
      const response = await fetch('/api/users');
      setUsers(await response.json());
    }
    load();
  }, []);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
    solution: `import { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const response = await fetch('/api/users');
      setUsers(await response.json());
      setIsLoading(false);
    }
    load();
  }, []);

  if (isLoading) return <p>Laddar…</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
    hints: [
      'const [isLoading, setIsLoading] = useState(true);',
      'Anropa setIsLoading(false) efter setUsers i load.',
      'Före return: if (isLoading) return <p>Laddar…</p>;',
    ],
    tests: [
      {
        description: '"Laddar…" visas innan datan kommit',
        code: '__mount(<Users />).text()',
        expected: 'Laddar…',
      },
      {
        description: 'Listan visas när datan kommit',
        code: "(async () => { const app = __mount(<Users />); await app.settle(); return [app.count('li'), app.count('p')]; })()",
        expected: [3, 0],
      },
    ],
  },
  {
    id: 'data-04',
    title: 'Visa fel',
    xp: 10,
    track: 'data',
    isBoss: false,
    description:
      'Hämtningar kan misslyckas. Spara felet i state och visa det, i stället för att användaren ser "Laddar…" för evigt. try/catch/finally passar bra: finally körs både när det gick bra och när det blev fel.',
    task: `Uppgift: UserList får adressen som propen url.
  Kasta ett fel om response.ok är false.
  Fånga felet och spara texten "Kunde inte hämta användarna" i error.
  Sätt isLoading till false i finally.
  Visa <p className="error">{error}</p> om det finns ett fel.`,
    fileName: 'App.jsx',
    preview: '<><UserList url="/api/users" /><UserList url="/api/broken" /></>',
    starterCode: `import { useEffect, useState } from 'react';

function UserList({ url }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      const response = await fetch(url);
      setUsers(await response.json());
      setIsLoading(false);
    }
    load();
  }, [url]);

  if (isLoading) return <p>Laddar…</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
    solution: `import { useEffect, useState } from 'react';

function UserList({ url }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Serverfel');
        setUsers(await response.json());
      } catch {
        setError('Kunde inte hämta användarna');
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [url]);

  if (isLoading) return <p>Laddar…</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
    hints: [
      'Lägg innehållet i load i try { } och lägg till catch och finally.',
      "I try: if (!response.ok) throw new Error('Serverfel');",
      'Efter if (isLoading): if (error) return <p className="error">{error}</p>;',
    ],
    tests: [
      {
        description: 'En fungerande adress visar användarna',
        code: '(async () => { const app = __mount(<UserList url="/api/users" />); await app.settle(); return app.count(\'li\'); })()',
        expected: 3,
      },
      {
        description: 'Ett serverfel visar felmeddelandet',
        code: '(async () => { const app = __mount(<UserList url="/api/broken" />); await app.settle(); return app.html(); })()',
        expected: '<p class="error">Kunde inte hämta användarna</p>',
      },
    ],
    sourceChecks: [
      { description: 'Koden använder finally', pattern: /\bfinally\b/ },
    ],
  },
  {
    id: 'data-05',
    title: 'Hämta igen när en prop ändras',
    xp: 10,
    track: 'data',
    isBoss: false,
    description:
      'Beror hämtningen på en prop ska den finnas i beroendelistan. Då hämtas ny data varje gång propen ändras, till exempel när man väljer en annan användare.',
    task: 'Uppgift: `UserCard({ userId })` hämtar /api/users/ följt av userId och visar <h2>{user.name}</h2>. Visa <p>Laddar…</p> medan user är null. Hämta igen när userId ändras.',
    fileName: 'App.jsx',
    preview: '<UserCard userId={3} />',
    starterCode: `import { useEffect, useState } from 'react';

`,
    solution: `import { useEffect, useState } from 'react';

function UserCard({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function load() {
      const response = await fetch(\`/api/users/\${userId}\`);
      setUser(await response.json());
    }
    load();
  }, [userId]);

  if (!user) return <p>Laddar…</p>;
  return <h2>{user.name}</h2>;
}`,
    hints: [
      'Börja med const [user, setUser] = useState(null);',
      'Adressen: `/api/users/${userId}`.',
      'Beroendelistan är [userId].',
    ],
    tests: [
      {
        description: 'userId 1 visar Ada Lovelace',
        code: "(async () => { const app = __mount(<UserCard userId={1} />); await app.settle(); return app.text('h2'); })()",
        expected: 'Ada Lovelace',
      },
      {
        description: '"Laddar…" visas först',
        code: '__mount(<UserCard userId={1} />).text()',
        expected: 'Laddar…',
      },
      {
        description: 'Ny userId hämtar en ny användare',
        code: "(async () => { const app = __mount(<UserCard userId={1} />); await app.settle(); app.rerender(<UserCard userId={2} />); await app.settle(); return app.text('h2'); })()",
        expected: 'Linus Torvalds',
      },
    ],
  },
  {
    id: 'data-boss-01',
    title: 'Boss: Sök användare',
    xp: 30,
    track: 'data',
    isBoss: true,
    description:
      'Bygg en sökning som hämtar nya träffar när man skriver, med laddning, fel och tomt resultat.',
    task: `Uppgift: Skriv komponenten \`UserSearch\`.
  State: query (""), users ([]), isLoading (true), error (null).
  Ett kontrollerat input för query.
  En effekt hämtar /api/users?q= följt av query varje gång query ändras.
    Sätt isLoading till true när en hämtning startar och false när den är klar.
    Är svaret inte ok: spara "Sökningen misslyckades" i error.
  Under input, i den här ordningen av alternativ:
    <p>Laddar…</p> medan isLoading är true,
    annars <p>{error}</p> om det finns ett fel,
    annars <p>Inga träffar</p> om users är tom,
    annars en ul med ett li per user.name (key user.id).`,
    fileName: 'App.jsx',
    preview: '<UserSearch />',
    starterCode: `import { useEffect, useState } from 'react';

`,
    solution: `import { useEffect, useState } from 'react';

function UserSearch() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function search() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(\`/api/users?q=\${query}\`);
        if (!response.ok) throw new Error('Serverfel');
        setUsers(await response.json());
      } catch {
        setError('Sökningen misslyckades');
      } finally {
        setIsLoading(false);
      }
    }
    search();
  }, [query]);

  let result;
  if (isLoading) result = <p>Laddar…</p>;
  else if (error) result = <p>{error}</p>;
  else if (users.length === 0) result = <p>Inga träffar</p>;
  else
    result = (
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    );

  return (
    <div>
      <input value={query} onChange={event => setQuery(event.target.value)} />
      {result}
    </div>
  );
}`,
    hints: [],
    tests: [
      {
        description: 'Alla användare visas från början',
        code: "(async () => { const app = __mount(<UserSearch />); await app.settle(); return app.count('li'); })()",
        expected: 3,
      },
      {
        description: 'Sökningen "gr" visar Grace Hopper',
        code: "(async () => { const app = __mount(<UserSearch />); await app.settle(); app.type('gr'); await app.settle(); return app.text('ul'); })()",
        expected: 'Grace Hopper',
      },
      {
        description: 'En sökning utan träffar visar "Inga träffar"',
        code: "(async () => { const app = __mount(<UserSearch />); await app.settle(); app.type('xyz'); await app.settle(); return app.text('p'); })()",
        expected: 'Inga träffar',
      },
      {
        description: 'Sökningen skickar query till API:t',
        code: "(async () => { const app = __mount(<UserSearch />); await app.settle(); app.type('gr'); await app.settle(); return fetch.calls.at(-1); })()",
        expected: '/api/users?q=gr',
      },
      {
        description: 'Alla li har en unik key',
        code: '(async () => { const app = __mount(<UserSearch />); await app.settle(); return __keyProblems; })()',
        expected: [],
      },
    ],
    sourceChecks: [
      {
        description: 'query finns i beroendelistan',
        pattern: /,\s*\[\s*query\s*\]\s*\)/,
      },
      { description: 'Koden kontrollerar response.ok', pattern: /\.\s*ok\b/ },
    ],
  },
  {
    id: 'debug-react-01',
    title: 'Funktionen som körs för tidigt',
    xp: 15,
    track: 'debug-react',
    isBoss: false,
    description:
      'onClick ska få en funktion som React anropar vid klick. Skriver du onClick={onLike()} anropas funktionen direkt när komponenten ritas, och onClick får det funktionen returnerar. Skicka funktionen utan parenteser: onClick={onLike}.',
    task: 'Uppgift: `LikeButton` anropar onLike en gång direkt, och sedan inte när man klickar. Hitta felet och rätta det.',
    fileName: 'App.jsx',
    preview: '<LikeButton onLike={() => {}} />',
    starterCode: `function LikeButton({ onLike }) {
  return <button onClick={onLike()}>Gilla</button>;
}`,
    solution: `function LikeButton({ onLike }) {
  return <button onClick={onLike}>Gilla</button>;
}`,
    hints: [
      'Första testet visar att onLike anropas innan någon klickat.',
      'onLike() med parenteser anropar funktionen direkt.',
      'Skriv onClick={onLike}.',
    ],
    tests: [
      {
        description: 'onLike anropas inte innan man klickat',
        code: '(() => { let clicks = 0; try { __mount(<LikeButton onLike={() => clicks++} />); } catch {} return clicks; })()',
        expected: 0,
      },
      {
        description: 'Tre klick anropar onLike tre gånger',
        code: "(() => { let clicks = 0; __mount(<LikeButton onLike={() => clicks++} />).click('Gilla').click('Gilla').click('Gilla'); return clicks; })()",
        expected: 3,
      },
    ],
  },
  {
    id: 'debug-react-02',
    title: 'Ett objekt där det ska vara text',
    xp: 15,
    track: 'debug-react',
    isBoss: false,
    description:
      'onChange får ett event-objekt, inte texten. Själva texten ligger i event.target.value. Sparar du hela eventet i state och försöker visa det får du felet "Objects are not valid as a React child", för React kan inte visa ett objekt som text.',
    task: 'Uppgift: `NameForm` kraschar när man skriver i fältet. Läs felmeddelandet, hitta felet och rätta det.',
    fileName: 'App.jsx',
    preview: '<NameForm />',
    starterCode: `import { useState } from 'react';

function NameForm() {
  const [name, setName] = useState('');

  return (
    <div>
      <input value={name} onChange={event => setName(event)} />
      <p>Hej {name}!</p>
    </div>
  );
}`,
    solution: `import { useState } from 'react';

function NameForm() {
  const [name, setName] = useState('');

  return (
    <div>
      <input value={name} onChange={event => setName(event.target.value)} />
      <p>Hej {name}!</p>
    </div>
  );
}`,
    hints: [
      'Felet säger att ett objekt visas som text.',
      'Vad är event? Var finns texten man skrev?',
      'Skriv setName(event.target.value).',
    ],
    tests: [
      {
        description: 'Det man skriver visas',
        code: "__mount(<NameForm />).type('Ada').text('p')",
        expected: 'Hej Ada!',
      },
      {
        description: 'Fältet visar det man skrev',
        code: "__mount(<NameForm />).type('Linus').html().includes('value=\"Linus\"')",
        expected: true,
      },
    ],
  },
  {
    id: 'debug-react-03',
    title: 'State som ändrades i smyg',
    xp: 15,
    track: 'debug-react',
    isBoss: false,
    description:
      'React ritar bara om när du ger state ett nytt värde. push ändrar arrayen som redan finns, och setTodos(todos) skickar samma array igen. Då ser React ingen ändring och ritar inte om. Skapa alltid en ny array, t.ex. med spread.',
    task: 'Uppgift: Knappen "Lägg till" ska lägga till en uppgift i listan, men ingenting händer. Hitta felet och rätta det.',
    fileName: 'App.jsx',
    preview: '<TodoList />',
    starterCode: `import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([{ id: 1, text: 'Handla' }]);

  function handleAdd() {
    todos.push({ id: todos.length + 1, text: 'Ny uppgift' });
    setTodos(todos);
  }

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      <button onClick={handleAdd}>Lägg till</button>
    </div>
  );
}`,
    solution: `import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([{ id: 1, text: 'Handla' }]);

  function handleAdd() {
    setTodos([...todos, { id: todos.length + 1, text: 'Ny uppgift' }]);
  }

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      <button onClick={handleAdd}>Lägg till</button>
    </div>
  );
}`,
    hints: [
      'Listan ritas inte om. Vad skickar du till setTodos?',
      'push ändrar den gamla arrayen. React behöver en ny.',
      "Skriv setTodos([...todos, { id: todos.length + 1, text: 'Ny uppgift' }]);",
    ],
    tests: [
      {
        description: 'Ett klick ger två uppgifter',
        code: "__mount(<TodoList />).click('Lägg till').count('li')",
        expected: 2,
      },
      {
        description: 'Tre klick ger fyra uppgifter',
        code: "__mount(<TodoList />).click('Lägg till').click('Lägg till').click('Lägg till').count('li')",
        expected: 4,
      },
    ],
    sourceChecks: [
      {
        description: 'Ingen push på state',
        pattern: /todos\.push\(/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'debug-react-04',
    title: 'Två med samma key',
    xp: 15,
    track: 'debug-react',
    isBoss: false,
    description:
      'En key måste vara unik i listan, annars blandar React ihop elementen när listan ändras. Text är en dålig key, för två saker kan heta likadant. Ett id är alltid unikt.',
    task: 'Uppgift: Listan visas, men React varnar för att två element har samma key. Hitta felet och rätta det.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `const todos = [
  { id: 1, text: 'Handla' },
  { id: 2, text: 'Träna' },
  { id: 3, text: 'Handla' },
];

function App() {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.text}>{todo.text}</li>
      ))}
    </ul>
  );
}`,
    solution: `const todos = [
  { id: 1, text: 'Handla' },
  { id: 2, text: 'Träna' },
  { id: 3, text: 'Handla' },
];

function App() {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`,
    hints: [
      'Två uppgifter heter "Handla".',
      'Vad finns i varje todo som alltid är unikt?',
      'Skriv key={todo.id}.',
    ],
    tests: [
      {
        description: 'Alla tre uppgifter visas',
        code: '__render(<App />)',
        expected: '<ul><li>Handla</li><li>Träna</li><li>Handla</li></ul>',
      },
      {
        description: 'Alla keys är unika',
        code: '(__render(<App />), __keyProblems)',
        expected: [],
      },
    ],
  },
  {
    id: 'debug-react-05',
    title: 'Fel namn på propen',
    xp: 15,
    track: 'debug-react',
    isBoss: false,
    description:
      'En prop heter det föräldern skriver. Skickar App onDelete men TodoItem plockar ut onRemove, så blir onRemove undefined. Felet "onRemove is not a function" betyder att du försöker anropa något som inte är en funktion.',
    task: 'Uppgift: Knappen "Ta bort" kraschar med ett fel. Läs felmeddelandet, jämför App och `TodoItem` och rätta felet.',
    fileName: 'App.jsx',
    preview: '<App />',
    starterCode: `import { useState } from 'react';

function TodoItem({ todo, onRemove }) {
  return (
    <li>
      {todo.text} <button onClick={() => onRemove(todo.id)}>Ta bort</button>
    </li>
  );
}

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Handla' },
    { id: 2, text: 'Träna' },
  ]);

  function handleRemove(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={handleRemove} />
      ))}
    </ul>
  );
}`,
    solution: `import { useState } from 'react';

function TodoItem({ todo, onRemove }) {
  return (
    <li>
      {todo.text} <button onClick={() => onRemove(todo.id)}>Ta bort</button>
    </li>
  );
}

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Handla' },
    { id: 2, text: 'Träna' },
  ]);

  function handleRemove(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onRemove={handleRemove} />
      ))}
    </ul>
  );
}`,
    hints: [
      'Felet säger att onRemove inte är en funktion.',
      'Vilket namn har propen när App skickar den?',
      'Byt onDelete mot onRemove i App, så att namnen stämmer.',
    ],
    tests: [
      {
        description: 'Ett klick tar bort en uppgift',
        code: "__mount(<App />).click('Ta bort').count('li')",
        expected: 1,
      },
      {
        description: 'Rätt uppgift tas bort',
        code: "__mount(<App />).click('Ta bort').text('li').startsWith('Träna')",
        expected: true,
      },
    ],
  },
  {
    id: 'debug-react-06',
    title: '+2 som bara ger +1',
    xp: 15,
    track: 'debug-react',
    isBoss: false,
    description:
      'setCount(count + 1) ändrar inte count direkt. Det ber React om ett nytt värde vid nästa ritning, så count har kvar sitt gamla värde resten av funktionen. Vill du räkna vidare på det senaste värdet skickar du en funktion: setCount(c => c + 1). Då får c alltid det senaste värdet.',
    task: 'Uppgift: Knappen "+2" ökar bara count med 1. Rätta `handleAddTwo` så att den ökar med 2. Behåll två anrop av setCount.',
    fileName: 'App.jsx',
    preview: '<Counter />',
    starterCode: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  function handleAddTwo() {
    setCount(count + 1);
    setCount(count + 1);
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={handleAddTwo}>+2</button>
    </div>
  );
}`,
    solution: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  function handleAddTwo() {
    setCount(c => c + 1);
    setCount(c => c + 1);
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={handleAddTwo}>+2</button>
    </div>
  );
}`,
    hints: [
      'Båda anropen räknar med samma gamla count.',
      'Skicka en funktion till setCount i stället för ett värde.',
      'Skriv setCount(c => c + 1); två gånger.',
    ],
    tests: [
      {
        description: 'Ett klick ger 2',
        code: "__mount(<Counter />).click('+2').text('p')",
        expected: '2',
      },
      {
        description: 'Två klick ger 4',
        code: "__mount(<Counter />).click('+2').click('+2').text('p')",
        expected: '4',
      },
    ],
    sourceChecks: [
      {
        description: 'setCount anropas två gånger',
        pattern: /setCount\s*\([^]*setCount\s*\(/,
      },
    ],
  },
  {
    id: 'debug-react-07',
    title: 'Klockan som fastnar',
    xp: 15,
    track: 'debug-react',
    isBoss: false,
    description:
      'En effekt med [] körs bara en gång, så funktionen i setInterval ser alltid seconds som 0. Då blir setSeconds(seconds + 1) alltid 1. Med setSeconds(s => s + 1) får du det senaste värdet varje gång. Glöm inte heller att stoppa intervallet när komponenten tas bort.',
    task: 'Uppgift: `Timer` fastnar på "1 sekunder", och intervallet fortsätter efter att Timer tagits bort. Hitta de två felen och rätta dem.',
    fileName: 'App.jsx',
    preview: '<Timer />',
    starterCode: `import { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
  }, []);

  return <p>{seconds} sekunder</p>;
}`,
    solution: `import { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p>{seconds} sekunder</p>;
}`,
    hints: [
      'seconds är alltid 0 inuti intervallet. Använd en funktion i setSeconds.',
      'Spara id:t från setInterval i en konstant.',
      'Returnera () => clearInterval(id) från effekten.',
    ],
    tests: [
      {
        description: 'Efter 3 sekunder visas "3 sekunder"',
        code: "__mount(<Timer />).tick(3000).text('p')",
        expected: '3 sekunder',
      },
      {
        description: 'Intervallet stoppas när Timer tas bort',
        code: '(__mount(<Timer />).tick(1000).unmount(), __clock.active())',
        expected: 0,
      },
    ],
  },
  {
    id: 'debug-react-boss-01',
    title: 'Boss: Inköpslistan',
    xp: 30,
    track: 'debug-react',
    isBoss: true,
    description:
      'Flera fel i en hel komponent. Ta ett test i taget, läs vad som går fel och rätta en sak innan du går vidare till nästa.',
    task: `Uppgift: \`ShoppingList\` har tre fel.
  Vid submit ska sidan inte laddas om,
    och varan ska läggas till i listan.
  Två varor med samma namn ska kunna finnas i listan.
  Kryssrutan bockar av en vara, och "2 kvar att köpa" ska stämma.
  Hitta och rätta felen.`,
    fileName: 'App.jsx',
    preview: '<ShoppingList />',
    starterCode: `import { useState } from 'react';

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  function handleSubmit() {
    items.push({ id: crypto.randomUUID(), text, bought: false });
    setItems(items);
    setText('');
  }

  function handleToggle(id) {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, bought: !item.bought } : item,
      ),
    );
  }

  const left = items.filter(item => !item.bought).length;

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={event => setText(event.target.value)} />
      <button>Lägg till</button>
      <ul>
        {items.map(item => (
          <li key={item.text}>
            <input
              type="checkbox"
              checked={item.bought}
              onChange={() => handleToggle(item.id)}
            />
            {item.text}
          </li>
        ))}
      </ul>
      <p>{left} kvar att köpa</p>
    </form>
  );
}`,
    solution: `import { useState } from 'react';

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setItems([...items, { id: crypto.randomUUID(), text, bought: false }]);
    setText('');
  }

  function handleToggle(id) {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, bought: !item.bought } : item,
      ),
    );
  }

  const left = items.filter(item => !item.bought).length;

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={event => setText(event.target.value)} />
      <button>Lägg till</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.bought}
              onChange={() => handleToggle(item.id)}
            />
            {item.text}
          </li>
        ))}
      </ul>
      <p>{left} kvar att köpa</p>
    </form>
  );
}`,
    hints: [],
    tests: [
      {
        description: 'Submit stoppar omladdningen',
        code: "__mount(<ShoppingList />).type('Mjölk').submit()",
        expected: true,
      },
      {
        description: 'Varan läggs till i listan',
        code: "(() => { const app = __mount(<ShoppingList />); app.type('Mjölk'); app.submit(); return [app.count('li'), app.text('li')]; })()",
        expected: [1, 'Mjölk'],
      },
      {
        description: 'Två varor med samma namn ger unika keys',
        code: "(() => { const app = __mount(<ShoppingList />); app.type('Mjölk'); app.submit(); app.type('Mjölk'); app.submit(); return [app.count('li'), __keyProblems]; })()",
        expected: [2, []],
      },
      {
        description: 'En avbockad vara räknas inte som kvar',
        code: "(() => { const app = __mount(<ShoppingList />); app.type('Mjölk'); app.submit(); app.type('Bröd'); app.submit(); app.type('Ost'); app.submit(); app.check(1); return app.text('p'); })()",
        expected: '2 kvar att köpa',
      },
    ],
  },
];
