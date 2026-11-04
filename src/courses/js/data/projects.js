import { projectSteps as stepsFor } from '../../../core/projects';

import { isConst, isLet } from './lesson';

// Miniprojekt som låses upp när en bana är klar. Eleven väljer ett av
// tre, men kan göra alla. Varje projekt byggs i steg, och koden från
// förra steget följer med till nästa. Uppgifterna säger vad koden ska
// göra men mindre om exakt hur, så testerna kollar mest resultatet.
// reward: priset man får till samlingen när projektet är klart.
export const projects = [
  {
    id: 'proj-checkout',
    track: 'js-basics',
    title: 'Kassaapparaten',
    reward: { emoji: '🛒', name: 'Kundvagn' },
    summary: 'Räkna ihop varorna, ge rabatt och skriv ut kvittot.',
    steps: [
      {
        title: 'Varorna',
        why: 'Priserna är const eftersom ett pris inte ändras medan kunden handlar. total är let eftersom summan växer för varje vara. Fråga dig alltid: kommer det här värdet att ändras? Nej ger const, ja ger let.',
        xp: 15,
        description:
          'Du bygger kassan i en affär. Först behöver kassan veta vad varorna kostar och ha en summa som börjar på noll.',
        task: `Uppgift:
  1. Skapa tre konstanter med priserna: \`bread\` 35, \`cheese\` 89 och \`coffee\` 96.
  2. Skapa \`total\` med let och startvärdet 0. Den ska ändras i nästa steg.`,
        starterCode: '// Steg 1: priserna och summan\n',
        solution: `const bread = 35;
const cheese = 89;
const coffee = 96;

let total = 0;`,
        hints: [
          'Priserna ändras inte, så de skapas med const.',
          'Summan ska kunna ändras senare, så den skapas med let.',
          'Till exempel: const bread = 35; och let total = 0;',
        ],
        tests: [
          { description: 'bread är 35', code: 'bread', expected: 35 },
          { description: 'cheese är 89', code: 'cheese', expected: 89 },
          { description: 'coffee är 96', code: 'coffee', expected: 96 },
          isConst('bread'),
          isConst('cheese'),
          isConst('coffee'),
          { description: 'total är 0', code: 'total', expected: 0 },
          isLet('total'),
        ],
      },
      {
        title: 'Lägg i korgen',
        why: 'Du räknade med variablerna och inte med talen 35, 89 och 96. Höjs priset på ost behöver du bara ändra på ett ställe, och summan blir ändå rätt. Ett tal som betyder något ska ha ett namn.',
        xp: 15,
        description:
          'Kunden lägger en av varje vara i korgen. Kassan ska räkna ut summan själv från priserna, så att den blir rätt även när ett pris ändras.',
        task: 'Uppgift: Lägg till alla tre priserna i `total`. Använd variablerna, inte talen.',
        hints: [
          'Du kan öka total på samma sätt som score = score + 5.',
          'Antingen en rad per vara, eller allt på en gång.',
          'total = total + bread + cheese + coffee;',
        ],
        solution: `const bread = 35;
const cheese = 89;
const coffee = 96;

let total = 0;
total = total + bread + cheese + coffee;`,
        tests: [{ description: 'total är 220', code: 'total', expected: 220 }],
        sourceChecks: [
          {
            description: 'total räknas ut från variablerna',
            pattern: /total\s*\+?=[^;]*\b(bread|cheese|coffee)\b/,
          },
          {
            description: 'total skrivs inte in som 220 för hand',
            pattern: /total\s*=\s*220\b/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Rabatten',
        why: 'if används när koden bara ibland ska göra något. hasDiscount sparar vad som hände, så att resten av programmet kan fråga om det senare utan att räkna om. En boolean är rätt verktyg för en ja/nej-fråga.',
        xp: 15,
        description:
          'Affären har ett erbjudande: handlar man för minst 200 kr får man 10 % rabatt. 10 % av ett belopp är beloppet delat med 10.',
        task: `Uppgift:
  1. Skapa \`hasDiscount\` med let och värdet false.
  2. Om total är minst 200 ska du dra av 10 % från total och sätta hasDiscount till true.`,
        hints: [
          '"Minst 200" skrivs total >= 200.',
          'Dra av rabatten med total = total - total / 10;',
          'Inuti if: total = total - total / 10; och hasDiscount = true;',
        ],
        solution: `const bread = 35;
const cheese = 89;
const coffee = 96;

let total = 0;
total = total + bread + cheese + coffee;

let hasDiscount = false;
if (total >= 200) {
  total = total - total / 10;
  hasDiscount = true;
}`,
        tests: [
          {
            description: 'total är 198 efter rabatten',
            code: 'total',
            expected: 198,
          },
          {
            description: 'hasDiscount är true',
            code: 'hasDiscount',
            expected: true,
          },
          isLet('hasDiscount'),
        ],
        sourceChecks: [
          { description: 'Rabatten ges med if', pattern: /\bif\s*\(/ },
          {
            description: 'total skrivs inte in som 198 för hand',
            pattern: /total\s*=\s*198\b/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Kvittot',
        why: 'console.log är för dig som programmerar, inte för kunden. I en riktig app skulle kvittot visas på skärmen, men logiken är densamma: räkna först, visa sist.',
        xp: 25,
        description:
          'Sist skriver kassan ut kvittot. Kunden ska se vad hen ska betala, och få veta om rabatten räknades in.',
        task: `Uppgift:
  1. Skriv ut texten "Att betala:" och total med console.log.
  2. Om hasDiscount är true ska du också skriva ut "Du fick 10 % rabatt!". Annars skriver du ut "Ingen rabatt den här gången.".`,
        hints: [
          "Text och variabel med komma emellan: console.log('Att betala:', total);",
          'Du kan skriva if (hasDiscount) i stället för if (hasDiscount === true).',
          'Använd if och else med en console.log i varje del.',
        ],
        solution: `const bread = 35;
const cheese = 89;
const coffee = 96;

let total = 0;
total = total + bread + cheese + coffee;

let hasDiscount = false;
if (total >= 200) {
  total = total - total / 10;
  hasDiscount = true;
}

console.log('Att betala:', total);
if (hasDiscount) {
  console.log('Du fick 10 % rabatt!');
} else {
  console.log('Ingen rabatt den här gången.');
}`,
        tests: [
          {
            description:
              'Konsolen visar "Att betala: 198" och "Du fick 10 % rabatt!"',
            code: '__logs',
            expected: ['Att betala: 198', 'Du fick 10 % rabatt!'],
          },
        ],
        sourceChecks: [
          {
            description: 'Totalen hämtas från variabeln total',
            pattern: /console\s*\.\s*log\s*\([^)]*,\s*total\s*\)/,
          },
          {
            description: 'Rabatttexten väljs med if och else',
            pattern: /\belse\b/,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-thermostat',
    track: 'js-basics',
    title: 'Termostaten',
    reward: { emoji: '🧣', name: 'Halsduk' },
    summary:
      'Läs av temperaturen, värm upp rummet och kolla om det blev lagom.',
    steps: [
      {
        title: 'Läs av temperaturen',
        why: 'else if används när det finns fler än två vägar och bara en av dem ska väljas. Med tre separata if hade JavaScript kollat alla tre villkoren, även när det redan visste svaret.',
        xp: 15,
        description:
          'Du programmerar en termostat. Den läser av temperaturen och säger om det är för kallt, för varmt eller lagom. Lagom är från 18 till och med 24 grader.',
        task: `Uppgift:
  1. Skapa \`temp\` med let och värdet 14.
  2. Skriv ut "För kallt" om temp är under 18, "För varmt" om temp är över 24 och annars "Lagom". Använd if, else if och else.`,
        starterCode: '// Steg 1: läs av temperaturen\n',
        hints: [
          'Under 18 skrivs temp < 18 och över 24 skrivs temp > 24.',
          'else if kommer mellan if och else och har ett eget villkor.',
          "if (temp < 18) { console.log('För kallt'); } else if (temp > 24) { ... } else { ... }",
        ],
        solution: `let temp = 14;

if (temp < 18) {
  console.log('För kallt');
} else if (temp > 24) {
  console.log('För varmt');
} else {
  console.log('Lagom');
}`,
        tests: [
          { description: 'temp är 14', code: 'temp', expected: 14 },
          isLet('temp'),
          {
            description: 'Konsolen visar "För kallt"',
            code: '__logs',
            expected: ['För kallt'],
          },
        ],
        sourceChecks: [
          {
            description: 'Texten väljs med else if',
            pattern: /\belse\s+if\s*\(/,
          },
          {
            description: 'Det finns ett else för "Lagom"',
            pattern: /\belse\s*\{/,
          },
        ],
      },
      {
        title: 'Värm upp',
        why: 'En for-loop passar när du vet hur många varv det ska bli, här 3 minuter. Utan loop hade du skrivit samma rader tre gånger, och 30 minuter hade blivit 30 kopior.',
        xp: 15,
        description:
          'Termostaten sätter på elementet. Varje minut blir rummet 2 grader varmare, och elementet är på i 3 minuter.',
        task: 'Uppgift: Efter koden du har, skriv en for-loop som går 3 varv. Varje varv ökar temp med 2 och skriver ut "Temp:" och temp.',
        hints: [
          'En loop med 3 varv: for (let i = 0; i < 3; i++) { ... }',
          'Inuti loopen: öka temp först, skriv sedan ut den.',
          "temp = temp + 2; och sedan console.log('Temp:', temp);",
        ],
        solution: `let temp = 14;

if (temp < 18) {
  console.log('För kallt');
} else if (temp > 24) {
  console.log('För varmt');
} else {
  console.log('Lagom');
}

for (let i = 0; i < 3; i++) {
  temp = temp + 2;
  console.log('Temp:', temp);
}`,
        tests: [
          {
            description: 'temp är 20 efter uppvärmningen',
            code: 'temp',
            expected: 20,
          },
          {
            description:
              'Konsolen visar "För kallt" och sedan varje ny temperatur',
            code: '__logs',
            expected: ['För kallt', 'Temp: 16', 'Temp: 18', 'Temp: 20'],
          },
        ],
        sourceChecks: [
          {
            description: 'Uppvärmningen sker i en for-loop',
            pattern: /\bfor\s*\(/,
          },
          {
            description: 'temp skrivs inte in som 20 för hand',
            pattern: /temp\s*=\s*20\b/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Blev det lagom?',
        why: 'En jämförelse som temp >= 18 ger true eller false direkt. Att spara den i isDone gör koden lättläst: if (isDone) läses nästan som vanlig svenska.',
        xp: 25,
        description:
          'Nu ska termostaten kolla om det räckte. Termostaten bara värmer, så det räcker att kolla att temp är minst 18.',
        task: `Uppgift:
  1. Skapa konstanten \`isDone\` som är resultatet av jämförelsen temp >= 18.
  2. Om isDone är true skriver du ut "Klart, stänger av elementet". Annars skriver du ut "Fortsätter värma".`,
        hints: [
          'En jämförelse ger true eller false, och det kan sparas i en variabel.',
          'const isDone = temp >= 18;',
          'if (isDone) { ... } else { ... } med en console.log i varje del.',
        ],
        solution: `let temp = 14;

if (temp < 18) {
  console.log('För kallt');
} else if (temp > 24) {
  console.log('För varmt');
} else {
  console.log('Lagom');
}

for (let i = 0; i < 3; i++) {
  temp = temp + 2;
  console.log('Temp:', temp);
}

const isDone = temp >= 18;
if (isDone) {
  console.log('Klart, stänger av elementet');
} else {
  console.log('Fortsätter värma');
}`,
        tests: [
          { description: 'isDone är true', code: 'isDone', expected: true },
          isConst('isDone'),
          {
            description: 'Konsolen slutar med "Klart, stänger av elementet"',
            code: '__logs.at(-1)',
            expected: 'Klart, stänger av elementet',
          },
        ],
        sourceChecks: [
          {
            description: 'isDone räknas ut med en jämförelse',
            pattern: /isDone\s*=\s*temp\s*>=\s*18/,
          },
          {
            description: 'Meddelandet väljs med if och else',
            pattern: /\bif\s*\(\s*isDone\b/,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-workout',
    track: 'js-basics',
    title: 'Träningsloggen',
    reward: { emoji: '👟', name: 'Löparskor' },
    summary: 'Summera en veckas träning och se om du nådde målet.',
    steps: [
      {
        title: 'Veckans minuter',
        why: 'När värdena följer ett mönster, 20, 25, 30 och så vidare, kan loopen räkna ut dem i stället för att du skriver in dem. day blir både räknare och en del av uträkningen.',
        xp: 15,
        description:
          'Du tränar varje dag i en vecka. Första dagen tränar du 20 minuter, och sedan 5 minuter mer för varje dag. Dag 1 blir 20, dag 2 blir 25 och så vidare. Dagens minuter kan räknas ut som 15 + day * 5.',
        task: `Uppgift:
  1. Skapa \`totalMinutes\` med let och värdet 0.
  2. Skriv en for-loop med \`day\` som går från 1 till och med 7.
  3. Räkna ut dagens minuter i loopen och lägg till dem i totalMinutes.`,
        starterCode: '// Steg 1: summera veckans träning\n',
        hints: [
          'Till och med 7 skrivs day <= 7.',
          'Inuti loopen: const minutes = 15 + day * 5;',
          'totalMinutes = totalMinutes + minutes;',
        ],
        solution: `let totalMinutes = 0;

for (let day = 1; day <= 7; day++) {
  const minutes = 15 + day * 5;
  totalMinutes = totalMinutes + minutes;
}`,
        tests: [
          {
            description: 'totalMinutes är 245',
            code: 'totalMinutes',
            expected: 245,
          },
          isLet('totalMinutes'),
        ],
        sourceChecks: [
          {
            description: 'Minuterna summeras i en for-loop',
            pattern: /\bfor\s*\(/,
          },
          {
            description: 'totalMinutes skrivs inte in som 245 för hand',
            pattern: /totalMinutes\s*=\s*245\b/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Långa pass',
        why: 'En räknare, let longDays = 0, som ökas i en loop är ett av de vanligaste mönstren i programmering. Den måste skapas före loopen, annars börjar den om på 0 varje varv.',
        xp: 15,
        description:
          'Ett pass som är längre än 30 minuter räknas som ett långt pass. Hur många sådana hade du i veckan?',
        task: 'Uppgift: Skapa `longDays` med let och värdet 0 före loopen. Öka longDays med 1 inuti loopen de dagar då minuterna är fler än 30.',
        hints: [
          'longDays måste skapas före loopen, annars börjar den om på 0 varje varv.',
          'Fler än 30 skrivs minutes > 30.',
          'if (minutes > 30) { longDays = longDays + 1; }',
        ],
        solution: `let totalMinutes = 0;
let longDays = 0;

for (let day = 1; day <= 7; day++) {
  const minutes = 15 + day * 5;
  totalMinutes = totalMinutes + minutes;
  if (minutes > 30) {
    longDays = longDays + 1;
  }
}`,
        tests: [
          { description: 'longDays är 4', code: 'longDays', expected: 4 },
          isLet('longDays'),
          {
            description: 'totalMinutes är fortfarande 245',
            code: 'totalMinutes',
            expected: 245,
          },
        ],
        sourceChecks: [
          {
            description: 'De långa passen räknas med if',
            pattern: /\bif\s*\(/,
          },
          {
            description: 'longDays skrivs inte in som 4 för hand',
            pattern: /longDays\s*=\s*4\b/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Nådde du målet?',
        why: 'Det som kan räknas ut ska räknas ut i stället för att skrivas in. Ändrar du träningen i steg 1 blir hela sammanfattningen rätt av sig själv.',
        xp: 25,
        description:
          'Målet är att träna minst 150 minuter i veckan. Avsluta med en sammanfattning av veckan.',
        task: `Uppgift:
  1. Skapa konstanten \`goalReached\` som är resultatet av jämförelsen totalMinutes >= 150.
  2. Skriv ut "Minuter:" och totalMinutes, och sedan "Långa pass:" och longDays.
  3. Skriv sist ut "Målet är nått!" om goalReached är true, annars "Fortsätt kämpa!".`,
        hints: [
          'Gör det här efter loopen, när allt är summerat.',
          'const goalReached = totalMinutes >= 150;',
          "console.log('Minuter:', totalMinutes); och sedan if (goalReached) { ... } else { ... }",
        ],
        solution: `let totalMinutes = 0;
let longDays = 0;

for (let day = 1; day <= 7; day++) {
  const minutes = 15 + day * 5;
  totalMinutes = totalMinutes + minutes;
  if (minutes > 30) {
    longDays = longDays + 1;
  }
}

const goalReached = totalMinutes >= 150;
console.log('Minuter:', totalMinutes);
console.log('Långa pass:', longDays);
if (goalReached) {
  console.log('Målet är nått!');
} else {
  console.log('Fortsätt kämpa!');
}`,
        tests: [
          {
            description: 'goalReached är true',
            code: 'goalReached',
            expected: true,
          },
          isConst('goalReached'),
          {
            description: 'Konsolen visar sammanfattningen',
            code: '__logs',
            expected: ['Minuter: 245', 'Långa pass: 4', 'Målet är nått!'],
          },
        ],
        sourceChecks: [
          {
            description: 'goalReached räknas ut med en jämförelse',
            pattern: /goalReached\s*=\s*totalMinutes\s*>=\s*150/,
          },
          {
            description: 'Slutorden väljs med if och else',
            pattern: /\belse\b/,
          },
        ],
      },
    ],
  },
  // Från och med Arrayer & objekt säger uppgifterna mest vad som ska
  // bli resultatet, och ledtrådarna pekar åt rätt håll utan färdig kod.
  {
    id: 'proj-packing',
    track: 'arrays',
    title: 'Packlistan',
    reward: { emoji: '🧳', name: 'Resväska' },
    summary: 'Packa inför resan, skriv ut listan och kolla att passet är med.',
    steps: [
      {
        title: 'Packa väskan',
        why: 'En array passar när du har flera saker av samma sort och ordningen spelar roll: packlistor, köer, topplistor. push lägger till sist, precis som att skriva på nästa rad på en lapp.',
        xp: 20,
        description:
          'Du ska ut och resa och gör en packlista i kod. Några saker har du redan skrivit upp, och sedan kommer du på två till.',
        task: `Uppgift:
  1. Skapa konstanten \`packList\` med "tandborste", "laddare" och "bok".
  2. Lägg till "solkräm" och sedan "badbyxor" sist i listan, utan att ändra raden där listan skapas.`,
        starterCode: '// Steg 1: packa väskan\n',
        hints: [
          'En array kan ändras med push även om den är skapad med const.',
          'Varje push lägger till ett värde sist.',
        ],
        solution: `const packList = ['tandborste', 'laddare', 'bok'];
packList.push('solkräm');
packList.push('badbyxor');`,
        tests: [
          {
            description: 'packList har de fem sakerna i rätt ordning',
            code: 'packList',
            expected: ['tandborste', 'laddare', 'bok', 'solkräm', 'badbyxor'],
          },
          isConst('packList'),
        ],
        sourceChecks: [
          {
            description: 'De två nya sakerna läggs till med push',
            pattern: /\.push\s*\([^]*\.push\s*\(/,
          },
        ],
      },
      {
        title: 'Skriv ut listan',
        why: 'Här behövde du numret, alltså platsen i listan, och därför passar den vanliga for-loopen med i. Behöver du bara värdena, och inte platsen, är for...of enklare: for (const thing of packList).',
        xp: 20,
        description:
          'Nu vill du se hela listan, med nummer framför varje sak. Koden ska fungera hur lång listan än är, så du kan inte skriva en console.log per sak.',
        task: `Uppgift:
  1. Skriv ut varje sak på en egen rad med nummer framför: "1. tandborste", "2. laddare" och så vidare.
  2. Skriv sist ut "Antal saker:" och hur många saker listan har.`,
        hints: [
          'En for-loop kan gå från 0 till packList.length, och packList[i] är saken i varvet.',
          'Numret är ett mer än i. console.log skriver ut flera värden med mellanslag emellan, så punkten kan sitta ihop med numret som text.',
        ],
        solution: `const packList = ['tandborste', 'laddare', 'bok'];
packList.push('solkräm');
packList.push('badbyxor');

for (let i = 0; i < packList.length; i++) {
  console.log(i + 1 + '.', packList[i]);
}
console.log('Antal saker:', packList.length);`,
        tests: [
          {
            description: 'Konsolen visar listan med nummer och sedan antalet',
            code: '__logs',
            expected: [
              '1. tandborste',
              '2. laddare',
              '3. bok',
              '4. solkräm',
              '5. badbyxor',
              'Antal saker: 5',
            ],
          },
        ],
        sourceChecks: [
          {
            description: 'Listan skrivs ut i en for-loop',
            pattern: /\bfor\s*\(/,
          },
          { description: 'Antalet hämtas med .length', pattern: /\.length\b/ },
          {
            description: 'Raderna skrivs inte ut en och en för hand',
            pattern: /['"]2\./,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Har du passet?',
        why: 'Att leta i en lista med en loop och en boolean är ett grundmönster. Senare lär du dig packList.includes("pass"), som gör samma sak på en rad. Men nu vet du vad includes gör inuti.',
        xp: 30,
        description:
          'Det värsta som kan hända är att glömma passet. Koden ska själv leta igenom listan, så att den fungerar även när du ändrar i listan.',
        task: `Uppgift:
  1. Skapa \`hasPassport\` med let. Den ska bli true om "pass" finns i packList och annars false. Leta med en loop.
  2. Skriv sist ut "Passet är packat." om passet finns, annars "Glöm inte passet!".`,
        hints: [
          'Börja med att anta att passet saknas, och ändra om du hittar det.',
          'Jämför varje sak i loopen med "pass" med ===.',
        ],
        solution: `const packList = ['tandborste', 'laddare', 'bok'];
packList.push('solkräm');
packList.push('badbyxor');

for (let i = 0; i < packList.length; i++) {
  console.log(i + 1 + '.', packList[i]);
}
console.log('Antal saker:', packList.length);

let hasPassport = false;
for (let i = 0; i < packList.length; i++) {
  if (packList[i] === 'pass') {
    hasPassport = true;
  }
}

if (hasPassport) {
  console.log('Passet är packat.');
} else {
  console.log('Glöm inte passet!');
}`,
        tests: [
          {
            description: 'hasPassport är false',
            code: 'hasPassport',
            expected: false,
          },
          isLet('hasPassport'),
          {
            description: 'Konsolen slutar med "Glöm inte passet!"',
            code: '__logs.at(-1)',
            expected: 'Glöm inte passet!',
          },
        ],
        sourceChecks: [
          {
            description: 'Koden letar efter "pass" med ===',
            pattern: /===\s*['"]pass['"]|['"]pass['"]\s*===/,
          },
          {
            description: 'Meddelandet väljs med if och else',
            pattern: /\belse\b/,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-playlist',
    track: 'arrays',
    title: 'Spellistan',
    reward: { emoji: '📻', name: 'Radio' },
    summary:
      'Lägg till din egen låt, räkna ut speltiden och hitta den längsta.',
    steps: [
      {
        title: 'Din låt',
        why: 'En låt har flera egenskaper som hör ihop: titel, artist och längd. Då är ett objekt rätt, för du kommer åt dem med namn: song.title. Många låtar blir en array av objekt, den vanligaste formen på data i React-appar.',
        xp: 20,
        description:
          'Spellistan är en array med låtar. Varje låt är ett objekt med title, artist och seconds, alltså låtens längd i sekunder. Nu ska din favoritlåt in.',
        task: 'Uppgift: Lägg till en låt du gillar sist i `songs`. Den ska ha samma tre egenskaper som de andra låtarna. Ändra inte de tre låtarna som redan finns.',
        starterCode: `const songs = [
  { title: 'Dancing Queen', artist: 'ABBA', seconds: 231 },
  { title: 'Levitating', artist: 'Dua Lipa', seconds: 203 },
  { title: 'Bohemian Rhapsody', artist: 'Queen', seconds: 355 },
];

// Steg 1: lägg till din låt
`,
        hints: [
          'push fungerar för objekt precis som för text och tal.',
          "Ett objekt skrivs med { } och egenskaper som title: '...', med komma emellan.",
        ],
        solution: `const songs = [
  { title: 'Dancing Queen', artist: 'ABBA', seconds: 231 },
  { title: 'Levitating', artist: 'Dua Lipa', seconds: 203 },
  { title: 'Bohemian Rhapsody', artist: 'Queen', seconds: 355 },
];

songs.push({ title: 'Hey Jude', artist: 'The Beatles', seconds: 431 });`,
        tests: [
          {
            description: 'songs har fyra låtar',
            code: 'songs.length',
            expected: 4,
          },
          {
            description: 'De tre första låtarna är kvar',
            code: 'songs.slice(0, 3).map(song => song.title)',
            expected: ['Dancing Queen', 'Levitating', 'Bohemian Rhapsody'],
          },
          {
            description: 'Din låt har en title och en artist som är text',
            code: "typeof songs[3]?.title === 'string' && typeof songs[3]?.artist === 'string'",
            expected: true,
          },
          {
            description: 'Din låt har seconds som ett tal större än 0',
            code: "typeof songs[3]?.seconds === 'number' && songs[3].seconds > 0",
            expected: true,
          },
        ],
        sourceChecks: [
          {
            description: 'Låten läggs till med push',
            pattern: /songs\s*\.\s*push\s*\(/,
          },
        ],
      },
      {
        title: 'Hur länge spelar den?',
        why: 'Här behövde du bara varje låts sekunder, inte platsen i listan. Då hade for (const song of songs) varit ännu tydligare än for med i. Prova gärna att skriva om loopen.',
        xp: 20,
        description:
          'Hur lång tid tar hela spellistan? Summera sekunderna och gör om dem till minuter och sekunder. Två nya verktyg: Math.floor(x) avrundar nedåt till ett heltal, och x % 60 ger det som blir över när x delas med 60.',
        task: `Uppgift:
  1. Skapa \`totalSeconds\` med let och summera alla låtars seconds i den med en loop.
  2. Skriv ut speltiden så här: "Speltid: 20 min 20 s", fast med rätt tal för din spellista.`,
        hints: [
          'songs[i].seconds är längden på låten i varvet.',
          'Hela minuter är Math.floor(totalSeconds / 60). console.log kan få flera värden: text, tal, text och så vidare.',
        ],
        solution: `const songs = [
  { title: 'Dancing Queen', artist: 'ABBA', seconds: 231 },
  { title: 'Levitating', artist: 'Dua Lipa', seconds: 203 },
  { title: 'Bohemian Rhapsody', artist: 'Queen', seconds: 355 },
];

songs.push({ title: 'Hey Jude', artist: 'The Beatles', seconds: 431 });

let totalSeconds = 0;
for (let i = 0; i < songs.length; i++) {
  totalSeconds = totalSeconds + songs[i].seconds;
}

const minutes = Math.floor(totalSeconds / 60);
const rest = totalSeconds % 60;
console.log('Speltid:', minutes, 'min', rest, 's');`,
        tests: [
          {
            description: 'totalSeconds är summan av alla låtars sekunder',
            code: 'totalSeconds === songs.reduce((sum, song) => sum + song.seconds, 0)',
            expected: true,
          },
          isLet('totalSeconds'),
          {
            description: 'Konsolen visar speltiden i minuter och sekunder',
            code: "(() => { const t = songs.reduce((sum, song) => sum + song.seconds, 0); return __logs.at(-1) === 'Speltid: ' + Math.floor(t / 60) + ' min ' + (t % 60) + ' s'; })()",
            expected: true,
          },
        ],
        sourceChecks: [
          {
            description: 'Sekunderna summeras i en for-loop',
            pattern: /\bfor\s*\(/,
          },
        ],
      },
      {
        title: 'Den längsta låten',
        why: 'longest sparar hela objektet, inte bara antalet sekunder. Då har du titel och artist kvar när loopen är klar. Spara det du behöver senare, inte bara det du jämför med.',
        xp: 30,
        description:
          'Vilken låt i spellistan är längst? Koden ska hitta den själv, så att svaret blir rätt vilken låt du än lade till.',
        task: `Uppgift:
  1. Skapa \`longest\` med let. Efter din kod ska den vara objektet för den längsta låten.
  2. Skriv sist ut till exempel "Längst: Hey Jude av The Beatles".`,
        hints: [
          'Börja med att anta att första låten är längst, och byt när du hittar en som är längre.',
          'Jämför songs[i].seconds med longest.seconds.',
        ],
        solution: `const songs = [
  { title: 'Dancing Queen', artist: 'ABBA', seconds: 231 },
  { title: 'Levitating', artist: 'Dua Lipa', seconds: 203 },
  { title: 'Bohemian Rhapsody', artist: 'Queen', seconds: 355 },
];

songs.push({ title: 'Hey Jude', artist: 'The Beatles', seconds: 431 });

let totalSeconds = 0;
for (let i = 0; i < songs.length; i++) {
  totalSeconds = totalSeconds + songs[i].seconds;
}

const minutes = Math.floor(totalSeconds / 60);
const rest = totalSeconds % 60;
console.log('Speltid:', minutes, 'min', rest, 's');

let longest = songs[0];
for (let i = 1; i < songs.length; i++) {
  if (songs[i].seconds > longest.seconds) {
    longest = songs[i];
  }
}
console.log('Längst:', longest.title, 'av', longest.artist);`,
        tests: [
          {
            description: 'longest är den längsta låten',
            code: 'longest === songs.reduce((max, song) => (song.seconds > max.seconds ? song : max))',
            expected: true,
          },
          isLet('longest'),
          {
            description: 'Konsolen slutar med den längsta låten och artisten',
            code: "__logs.at(-1) === 'Längst: ' + longest?.title + ' av ' + longest?.artist",
            expected: true,
          },
        ],
        sourceChecks: [
          {
            description: 'Låtarnas längder jämförs med if',
            pattern: /\bif\s*\(/,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-leaderboard',
    track: 'arrays',
    title: 'Topplistan',
    reward: { emoji: '🏆', name: 'Pokal' },
    summary:
      'Ställ upp dig själv i tävlingen, räkna snittet och kora vinnaren.',
    steps: [
      {
        title: 'Ställ upp',
        why: 'En array av objekt: arrayen för att det finns många spelare i en ordning, och objektet för att varje spelare har namngivna egenskaper. Tumregel: många av samma sort ger en array, en sak med egenskaper ger ett objekt.',
        xp: 20,
        description:
          'Fyra spelare har redan tävlat, och nu är det din tur. Varje spelare är ett objekt med name och score.',
        task: 'Uppgift: Lägg till dig själv sist i `players`, med ditt namn och ett score mellan 0 och 100. Ändra inte de andra spelarna.',
        starterCode: `const players = [
  { name: 'Ada', score: 42 },
  { name: 'Linus', score: 35 },
  { name: 'Grace', score: 51 },
  { name: 'Alan', score: 28 },
];

// Steg 1: ställ upp i tävlingen
`,
        hints: [
          'Samma sätt som när du lade till saker i en array, fast med ett objekt.',
          'Objektet behöver egenskaperna name och score.',
        ],
        solution: `const players = [
  { name: 'Ada', score: 42 },
  { name: 'Linus', score: 35 },
  { name: 'Grace', score: 51 },
  { name: 'Alan', score: 28 },
];

players.push({ name: 'Kim', score: 47 });`,
        tests: [
          {
            description: 'players har fem spelare',
            code: 'players.length',
            expected: 5,
          },
          {
            description: 'De fyra första spelarna är kvar',
            code: 'players.slice(0, 4).map(player => player.score)',
            expected: [42, 35, 51, 28],
          },
          {
            description: 'Du har ett name som är text',
            code: "typeof players[4]?.name === 'string' && players[4].name.length > 0",
            expected: true,
          },
          {
            description: 'Ditt score är ett tal mellan 0 och 100',
            code: "typeof players[4]?.score === 'number' && players[4].score >= 0 && players[4].score <= 100",
            expected: true,
          },
        ],
        sourceChecks: [
          {
            description: 'Du läggs till med push',
            pattern: /players\s*\.\s*push\s*\(/,
          },
        ],
      },
      {
        title: 'Snittet',
        why: 'Du använde players.length och inte talet 5. Lägger någon till en spelare blir snittet ändå rätt. Räkna alltid antalet från listan.',
        xp: 20,
        description:
          'Hur bra gick det i snitt? Snittet är summan av alla poäng delat med antalet spelare.',
        task: `Uppgift:
  1. Skapa konstanten \`average\` med snittpoängen för alla spelare. Räkna ut summan med en loop.
  2. Skriv ut "Snitt:" och snittet.`,
        hints: [
          'Du behöver en summa som börjar på 0 och växer i loopen.',
          'Antalet spelare får du med .length.',
        ],
        solution: `const players = [
  { name: 'Ada', score: 42 },
  { name: 'Linus', score: 35 },
  { name: 'Grace', score: 51 },
  { name: 'Alan', score: 28 },
];

players.push({ name: 'Kim', score: 47 });

let total = 0;
for (let i = 0; i < players.length; i++) {
  total = total + players[i].score;
}
const average = total / players.length;
console.log('Snitt:', average);`,
        tests: [
          {
            description: 'average är snittet av alla spelares poäng',
            code: 'average === players.reduce((sum, player) => sum + player.score, 0) / players.length',
            expected: true,
          },
          isConst('average'),
          {
            description: 'Konsolen visar snittet',
            code: "__logs.at(-1) === 'Snitt: ' + average",
            expected: true,
          },
        ],
        sourceChecks: [
          {
            description: 'Poängen summeras i en for-loop',
            pattern: /\bfor\s*\(/,
          },
          {
            description: 'Antalet spelare hämtas med .length',
            pattern: /\.length\b/,
          },
        ],
      },
      {
        title: 'Vinnaren',
        why: 'Två saker räknades ut i samma loop. Det fungerar bra när de hör ihop, men två loopar som gör en sak var är ofta lättare att läsa. Båda sätten är rätt.',
        xp: 30,
        description:
          'Dags för prisutdelning. Vem vann, och hur många spelade bättre än snittet?',
        task: `Uppgift:
  1. Skapa \`winner\` med let. Efter din kod ska den vara objektet för spelaren med högst score. Blir det lika vinner den som står först.
  2. Skapa \`aboveAverage\` med let: antalet spelare med mer poäng än snittet.
  3. Skriv ut "Vinnare:" och vinnarens namn, och sist "Över snittet:" och antalet.`,
        hints: [
          'Båda kan räknas ut i samma loop, eller i var sin.',
          'För att den som står först ska vinna vid lika poäng byter du bara vinnare när någon har mer, inte lika mycket.',
        ],
        solution: `const players = [
  { name: 'Ada', score: 42 },
  { name: 'Linus', score: 35 },
  { name: 'Grace', score: 51 },
  { name: 'Alan', score: 28 },
];

players.push({ name: 'Kim', score: 47 });

let total = 0;
for (let i = 0; i < players.length; i++) {
  total = total + players[i].score;
}
const average = total / players.length;
console.log('Snitt:', average);

let winner = players[0];
let aboveAverage = 0;
for (let i = 0; i < players.length; i++) {
  if (players[i].score > winner.score) {
    winner = players[i];
  }
  if (players[i].score > average) {
    aboveAverage = aboveAverage + 1;
  }
}
console.log('Vinnare:', winner.name);
console.log('Över snittet:', aboveAverage);`,
        tests: [
          {
            description: 'winner är spelaren med högst score',
            code: 'winner === players.reduce((best, player) => (player.score > best.score ? player : best))',
            expected: true,
          },
          isLet('winner'),
          {
            description: 'aboveAverage är antalet spelare över snittet',
            code: 'aboveAverage === players.filter(player => player.score > average).length',
            expected: true,
          },
          isLet('aboveAverage'),
          {
            description:
              'Konsolen slutar med vinnaren och antalet över snittet',
            code: "__logs.slice(-2).join('|') === 'Vinnare: ' + winner?.name + '|Över snittet: ' + aboveAverage",
            expected: true,
          },
        ],
        sourceChecks: [
          { description: 'Poängen jämförs med if', pattern: /\bif\s*\(/ },
        ],
      },
    ],
  },
  // Från och med Functions säger uppgiften bara vad funktionerna ska
  // göra. Testerna anropar dem med många olika värden, så det spelar
  // ingen roll hur de är skrivna.
  {
    id: 'proj-change',
    track: 'functions',
    title: 'Växelautomaten',
    reward: { emoji: '🐷', name: 'Spargris' },
    summary: 'Räkna ut växel med så få mynt som möjligt.',
    steps: [
      {
        title: 'Hur många mynt?',
        why: 'En funktion löser ett litet problem och får ett namn. coinsOf(37, 10) säger vad som händer, Math.floor(37 / 10) säger hur. Bra namn gör att man kan läsa koden utan att räkna.',
        xp: 25,
        description:
          'Du bygger en automat som ger växel i mynt på 20, 10, 5 och 1 kr. Först behöver den veta hur många hela mynt av en sort som ryms i ett belopp. Math.floor(x) avrundar ett tal nedåt.',
        task: 'Uppgift: Skriv funktionen `coinsOf(amount, coin)` som returnerar hur många hela mynt värda coin som ryms i amount. coinsOf(37, 10) ger 3 och coinsOf(9, 10) ger 0.',
        starterCode: '// Steg 1: hur många mynt ryms?\n',
        hints: [
          'Dela beloppet med myntets värde. Vad gör du med decimalerna?',
          'Det är bara hela mynt som räknas, så svaret avrundas alltid nedåt.',
        ],
        solution: `function coinsOf(amount, coin) {
  return Math.floor(amount / coin);
}`,
        tests: [
          {
            description: 'coinsOf(37, 10) ger 3',
            code: 'coinsOf(37, 10)',
            expected: 3,
          },
          {
            description: 'coinsOf(9, 10) ger 0',
            code: 'coinsOf(9, 10)',
            expected: 0,
          },
          {
            description: 'coinsOf(40, 20) ger 2',
            code: 'coinsOf(40, 20)',
            expected: 2,
          },
          {
            description: 'coinsOf(7, 1) ger 7',
            code: 'coinsOf(7, 1)',
            expected: 7,
          },
        ],
      },
      {
        title: 'Växla',
        why: 'makeChange returnerar ett objekt eftersom svaret har fyra delar som hör ihop. Ett objekt med namn är tydligare än en array som [1, 1, 1, 2], där man måste komma ihåg vilken plats som är vad.',
        xp: 25,
        description:
          'Nu ska automaten dela upp ett helt belopp i mynt. Den tar alltid så många stora mynt som möjligt först, så att det blir så få mynt som möjligt. Det som blir över efter en sort går vidare till nästa.',
        task: 'Uppgift: Skriv funktionen `makeChange(amount)` som returnerar ett objekt med egenskaperna twenties, tens, fives och ones. makeChange(37) ger { twenties: 1, tens: 1, fives: 1, ones: 2 }. Använd coinsOf.',
        hints: [
          'Håll reda på hur mycket som är kvar att växla efter varje myntsort.',
          'Det som är kvar efter 20-kronorna är beloppet minus antalet 20-kronor gånger 20. Eller resten med %.',
        ],
        solution: `function coinsOf(amount, coin) {
  return Math.floor(amount / coin);
}

function makeChange(amount) {
  let left = amount;
  const twenties = coinsOf(left, 20);
  left = left - twenties * 20;
  const tens = coinsOf(left, 10);
  left = left - tens * 10;
  const fives = coinsOf(left, 5);
  left = left - fives * 5;
  return { twenties, tens, fives, ones: left };
}`,
        tests: [
          {
            description: 'makeChange(37) ger 1, 1, 1 och 2 mynt',
            code: '(() => { const c = makeChange(37); return [c.twenties, c.tens, c.fives, c.ones]; })()',
            expected: [1, 1, 1, 2],
          },
          {
            description: 'makeChange(80) ger fyra 20-kronor och inget annat',
            code: '(() => { const c = makeChange(80); return [c.twenties, c.tens, c.fives, c.ones]; })()',
            expected: [4, 0, 0, 0],
          },
          {
            description: 'makeChange(19) ger 0, 1, 1 och 4 mynt',
            code: '(() => { const c = makeChange(19); return [c.twenties, c.tens, c.fives, c.ones]; })()',
            expected: [0, 1, 1, 4],
          },
          {
            description: 'makeChange(0) ger inga mynt',
            code: '(() => { const c = makeChange(0); return [c.twenties, c.tens, c.fives, c.ones]; })()',
            expected: [0, 0, 0, 0],
          },
        ],
        sourceChecks: [
          {
            description: 'makeChange använder coinsOf',
            pattern:
              /function\s+makeChange[^]*coinsOf\s*\(|makeChange\s*=[^]*coinsOf\s*\(/,
          },
        ],
      },
      {
        title: 'Betala',
        why: 'pay bygger på makeChange, som bygger på coinsOf. Små funktioner som används av större är så nästan all kod är byggd, också React-komponenter.',
        xp: 40,
        description:
          'Sist kopplar du ihop allt till själva betalningen. Kunden lägger i pengar, och automaten svarar på tre olika sätt beroende på hur mycket som kom in.',
        task: `Uppgift: Skriv funktionen \`pay(price, paid)\`.
  - Om kunden betalat för lite returnerar den texten "Det fattas 13 kr", med rätt belopp.
  - Om kunden betalat exakt returnerar den "Jämnt!".
  - Om kunden betalat för mycket returnerar den växeln som ett objekt från makeChange.`,
        hints: [
          'Tre fall betyder tre vägar genom funktionen. Vilket fall ska kollas först?',
          'Texten kan byggas med + mellan text och tal.',
        ],
        solution: `function coinsOf(amount, coin) {
  return Math.floor(amount / coin);
}

function makeChange(amount) {
  let left = amount;
  const twenties = coinsOf(left, 20);
  left = left - twenties * 20;
  const tens = coinsOf(left, 10);
  left = left - tens * 10;
  const fives = coinsOf(left, 5);
  left = left - fives * 5;
  return { twenties, tens, fives, ones: left };
}

function pay(price, paid) {
  if (paid < price) {
    return 'Det fattas ' + (price - paid) + ' kr';
  }
  if (paid === price) {
    return 'Jämnt!';
  }
  return makeChange(paid - price);
}`,
        tests: [
          {
            description: 'pay(50, 37) ger "Det fattas 13 kr"',
            code: 'pay(50, 37)',
            expected: 'Det fattas 13 kr',
          },
          {
            description: 'pay(25, 25) ger "Jämnt!"',
            code: 'pay(25, 25)',
            expected: 'Jämnt!',
          },
          {
            description: 'pay(63, 100) ger växel för 37 kr',
            code: '(() => { const c = pay(63, 100); return [c.twenties, c.tens, c.fives, c.ones]; })()',
            expected: [1, 1, 1, 2],
          },
          {
            description: 'pay(1, 50) ger växel för 49 kr',
            code: '(() => { const c = pay(1, 50); return [c.twenties, c.tens, c.fives, c.ones]; })()',
            expected: [2, 0, 1, 4],
          },
        ],
        sourceChecks: [
          {
            description: 'pay använder makeChange',
            pattern:
              /function\s+pay[^]*makeChange\s*\(|pay\s*=[^]*makeChange\s*\(/,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-weather',
    track: 'functions',
    title: 'Väderstationen',
    reward: { emoji: '🌂', name: 'Paraply' },
    summary: 'Små funktioner som tillsammans blir en veckorapport om vädret.',
    steps: [
      {
        title: 'Medeltemperaturen',
        why: 'Det tomma fallet kollas först, innan något räknas. Att hantera konstiga indata direkt i början av en funktion kallas en guard, och det gör resten av funktionen enklare.',
        xp: 25,
        description:
          'Väderstationen mäter temperaturen varje dag och sparar mätningarna i en array. Första verktyget räknar ut medelvärdet.',
        task: 'Uppgift: Skriv funktionen `average(numbers)` som returnerar medelvärdet av talen i arrayen. För en tom array ska den returnera 0.',
        starterCode: '// Steg 1: medelvärdet\n',
        hints: [
          'Medelvärdet är summan delat med antalet.',
          'Vad blir 0 / 0 i JavaScript? Den tomma arrayen behöver ett eget fall.',
        ],
        solution: `function average(numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum = sum + numbers[i];
  }
  return sum / numbers.length;
}`,
        tests: [
          {
            description: 'average([12, 15, 18]) ger 15',
            code: 'average([12, 15, 18])',
            expected: 15,
          },
          {
            description: 'average([-4, 2]) ger -1',
            code: 'average([-4, 2])',
            expected: -1,
          },
          {
            description: 'average([7]) ger 7',
            code: 'average([7])',
            expected: 7,
          },
          {
            description: 'average([]) ger 0',
            code: 'average([])',
            expected: 0,
          },
        ],
      },
      {
        title: 'Varmast och känsla',
        why: 'warmest börjar med temps[0] och inte 0, eftersom 0 är en gissning som kan vara fel. Börja med ett riktigt värde ur listan, så blir svaret alltid ett av värdena.',
        xp: 25,
        description:
          'Två verktyg till: ett som hittar den varmaste dagen och ett som beskriver hur en temperatur känns.',
        task: `Uppgift:
  - Skriv \`warmest(temps)\` som returnerar den högsta temperaturen i arrayen. Den ska fungera även när alla temperaturer är under noll.
  - Skriv \`describe(temp)\` som returnerar "kallt" under 10 grader, "varmt" över 20 grader och annars "lagom".`,
        hints: [
          'Om du börjar leta från 0 blir det fel när alla dagar är kalla. Vad kan du börja med i stället?',
          'Gränserna 10 och 20 räknas som lagom.',
        ],
        solution: `function average(numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum = sum + numbers[i];
  }
  return sum / numbers.length;
}

function warmest(temps) {
  let max = temps[0];
  for (let i = 1; i < temps.length; i++) {
    if (temps[i] > max) {
      max = temps[i];
    }
  }
  return max;
}

function describe(temp) {
  if (temp < 10) {
    return 'kallt';
  }
  if (temp > 20) {
    return 'varmt';
  }
  return 'lagom';
}`,
        tests: [
          {
            description: 'warmest([12, 25, 18]) ger 25',
            code: 'warmest([12, 25, 18])',
            expected: 25,
          },
          {
            description: 'warmest([-8, -3, -12]) ger -3',
            code: 'warmest([-8, -3, -12])',
            expected: -3,
          },
          {
            description: 'describe(4) ger "kallt"',
            code: 'describe(4)',
            expected: 'kallt',
          },
          {
            description: 'describe(10) ger "lagom"',
            code: 'describe(10)',
            expected: 'lagom',
          },
          {
            description: 'describe(20) ger "lagom"',
            code: 'describe(20)',
            expected: 'lagom',
          },
          {
            description: 'describe(27) ger "varmt"',
            code: 'describe(27)',
            expected: 'varmt',
          },
        ],
      },
      {
        title: 'Veckorapporten',
        why: 'weekReport räknar ingenting själv, den frågar de andra funktionerna. Hittar du ett fel i medelvärdet rättar du det på ett ställe, och rapporten blir rätt.',
        xp: 40,
        description:
          'Nu sätter du ihop verktygen. Bra funktioner gör en sak var, och större funktioner bygger på de små.',
        task: 'Uppgift: Skriv `weekReport(temps)` som returnerar ett objekt med average (medeltemperaturen), warmest (högsta temperaturen) och feel (hur medeltemperaturen känns). Använd dina tre funktioner.',
        hints: [
          'weekReport behöver inte räkna något själv.',
          'feel beskriver medeltemperaturen, inte den varmaste dagen.',
        ],
        solution: `function average(numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum = sum + numbers[i];
  }
  return sum / numbers.length;
}

function warmest(temps) {
  let max = temps[0];
  for (let i = 1; i < temps.length; i++) {
    if (temps[i] > max) {
      max = temps[i];
    }
  }
  return max;
}

function describe(temp) {
  if (temp < 10) {
    return 'kallt';
  }
  if (temp > 20) {
    return 'varmt';
  }
  return 'lagom';
}

function weekReport(temps) {
  const avg = average(temps);
  return {
    average: avg,
    warmest: warmest(temps),
    feel: describe(avg),
  };
}`,
        tests: [
          {
            description: 'weekReport för en sval vecka',
            code: '(() => { const r = weekReport([8, 12, 14, 10, 16, 18, 6]); return [r.average, r.warmest, r.feel]; })()',
            expected: [12, 18, 'lagom'],
          },
          {
            description: 'weekReport för en vintervecka',
            code: '(() => { const r = weekReport([-2, -6, 1, -4, -3, 0, 0]); return [r.average, r.warmest, r.feel]; })()',
            expected: [-2, 1, 'kallt'],
          },
          {
            description:
              'feel beskriver medeltemperaturen och inte den varmaste dagen',
            code: 'weekReport([18, 18, 18, 18, 18, 18, 30]).feel',
            expected: 'lagom',
          },
        ],
        sourceChecks: [
          {
            description: 'weekReport använder average, warmest och describe',
            pattern:
              /weekReport[^]*(?=[^]*\baverage\s*\()(?=[^]*\bwarmest\s*\()(?=[^]*\bdescribe\s*\()/,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-dice',
    track: 'functions',
    title: 'Tärningsspelet',
    reward: { emoji: '🎲', name: 'Tärningar' },
    summary: 'Räkna poäng för ett kast med fem tärningar.',
    steps: [
      {
        title: 'Räkna ögon',
        why: 'value är en parameter i stället för att du skriver en funktion per tärningsvärde. En parameter gör att samma funktion kan svara på många frågor.',
        xp: 25,
        description:
          'Du bygger poängräkningen till ett tärningsspel med fem tärningar. Ett kast är en array, till exempel [3, 1, 3, 6, 3].',
        task: 'Uppgift: Skriv `countValue(dice, value)` som returnerar hur många tärningar i kastet som visar value. countValue([3, 1, 3, 6, 3], 3) ger 3.',
        starterCode: '// Steg 1: räkna en sorts tärningar\n',
        hints: [
          'Gå igenom tärningarna en i taget.',
          'Du behöver en räknare som börjar på 0.',
        ],
        solution: `function countValue(dice, value) {
  let count = 0;
  for (let i = 0; i < dice.length; i++) {
    if (dice[i] === value) {
      count = count + 1;
    }
  }
  return count;
}`,
        tests: [
          {
            description: 'countValue([3, 1, 3, 6, 3], 3) ger 3',
            code: 'countValue([3, 1, 3, 6, 3], 3)',
            expected: 3,
          },
          {
            description: 'countValue([3, 1, 3, 6, 3], 6) ger 1',
            code: 'countValue([3, 1, 3, 6, 3], 6)',
            expected: 1,
          },
          {
            description: 'countValue([3, 1, 3, 6, 3], 5) ger 0',
            code: 'countValue([3, 1, 3, 6, 3], 5)',
            expected: 0,
          },
          {
            description: 'countValue([2, 2, 2, 2, 2], 2) ger 5',
            code: 'countValue([2, 2, 2, 2, 2], 2)',
            expected: 5,
          },
        ],
      },
      {
        title: 'Summa och yatzy',
        why: 'hasYatzy återanvände countValue. När du märker att du ska skriva något du redan har skrivit, fråga dig om det finns en funktion som redan kan det.',
        xp: 25,
        description:
          'Två regler till spelet: summan av alla tärningar, och yatzy, som är när alla fem visar samma.',
        task: `Uppgift:
  - Skriv \`sumDice(dice)\` som returnerar summan av tärningarna.
  - Skriv \`hasYatzy(dice)\` som returnerar true om alla fem tärningar visar samma, annars false.`,
        hints: [
          'Om alla visar samma som den första tärningen, hur många visar då det värdet?',
          'countValue kan svara på det.',
        ],
        solution: `function countValue(dice, value) {
  let count = 0;
  for (let i = 0; i < dice.length; i++) {
    if (dice[i] === value) {
      count = count + 1;
    }
  }
  return count;
}

function sumDice(dice) {
  let sum = 0;
  for (let i = 0; i < dice.length; i++) {
    sum = sum + dice[i];
  }
  return sum;
}

function hasYatzy(dice) {
  return countValue(dice, dice[0]) === 5;
}`,
        tests: [
          {
            description: 'sumDice([3, 1, 3, 6, 3]) ger 16',
            code: 'sumDice([3, 1, 3, 6, 3])',
            expected: 16,
          },
          {
            description: 'sumDice([6, 6, 6, 6, 6]) ger 30',
            code: 'sumDice([6, 6, 6, 6, 6])',
            expected: 30,
          },
          {
            description: 'hasYatzy([4, 4, 4, 4, 4]) ger true',
            code: 'hasYatzy([4, 4, 4, 4, 4])',
            expected: true,
          },
          {
            description: 'hasYatzy([4, 4, 4, 4, 1]) ger false',
            code: 'hasYatzy([4, 4, 4, 4, 1])',
            expected: false,
          },
          {
            description: 'hasYatzy([1, 4, 4, 4, 4]) ger false',
            code: 'hasYatzy([1, 4, 4, 4, 4])',
            expected: false,
          },
        ],
      },
      {
        title: 'Poängen',
        why: 'return avbryter funktionen direkt. Därför kan reglerna kollas i ordning, den som ger mest poäng först, utan else. Tidig return gör långa if-kedjor kortare.',
        xp: 40,
        description: 'Nu ska ett kast få sin poäng enligt spelets regler.',
        task: `Uppgift: Skriv \`score(dice)\` som returnerar poängen för ett kast:
  - Yatzy ger 50 poäng.
  - Annars: visar minst tre tärningar samma värde ger kastet summan av alla tärningar.
  - Annars ger kastet 0 poäng.`,
        hints: [
          'Börja med regeln som ger mest poäng.',
          'För att hitta tre lika kan du prova varje värde från 1 till 6.',
        ],
        solution: `function countValue(dice, value) {
  let count = 0;
  for (let i = 0; i < dice.length; i++) {
    if (dice[i] === value) {
      count = count + 1;
    }
  }
  return count;
}

function sumDice(dice) {
  let sum = 0;
  for (let i = 0; i < dice.length; i++) {
    sum = sum + dice[i];
  }
  return sum;
}

function hasYatzy(dice) {
  return countValue(dice, dice[0]) === 5;
}

function score(dice) {
  if (hasYatzy(dice)) {
    return 50;
  }
  for (let value = 1; value <= 6; value++) {
    if (countValue(dice, value) >= 3) {
      return sumDice(dice);
    }
  }
  return 0;
}`,
        tests: [
          {
            description: 'score([5, 5, 5, 5, 5]) ger 50',
            code: 'score([5, 5, 5, 5, 5])',
            expected: 50,
          },
          {
            description: 'score([3, 1, 3, 6, 3]) ger 16',
            code: 'score([3, 1, 3, 6, 3])',
            expected: 16,
          },
          {
            description: 'score([2, 6, 6, 6, 6]) ger 26',
            code: 'score([2, 6, 6, 6, 6])',
            expected: 26,
          },
          {
            description: 'score([1, 2, 3, 4, 6]) ger 0',
            code: 'score([1, 2, 3, 4, 6])',
            expected: 0,
          },
          {
            description: 'score([4, 4, 1, 1, 6]) ger 0',
            code: 'score([4, 4, 1, 1, 6])',
            expected: 0,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-password',
    track: 'strings',
    title: 'Lösenordskollen',
    reward: { emoji: '🔑', name: 'Nyckel' },
    summary: 'Kolla hur starkt ett lösenord är och säg vad som saknas.',
    steps: [
      {
        title: 'Siffror och stora bokstäver',
        why: 'En sträng kan gås igenom som en array, tecken för tecken. Två små funktioner som svarar på en ja/nej-fråga var är lättare att testa än en stor som kollar allt.',
        xp: 25,
        description:
          'Du bygger lösenordskollen till ett registreringsformulär. Först behövs två små verktyg som letar efter olika sorters tecken. En sträng kan gås igenom tecken för tecken precis som en array: text[i] och text.length.',
        task: `Uppgift:
  - Skriv \`hasDigit(text)\` som returnerar true om text innehåller minst en siffra.
  - Skriv \`hasUpper(text)\` som returnerar true om text innehåller minst en stor bokstav, även Å, Ä och Ö.`,
        starterCode: '// Steg 1: leta efter tecken\n',
        hints: [
          'Finns det en sträng som innehåller alla siffror, som du kan fråga med includes?',
          'Vad händer med en stor bokstav när du gör toLowerCase på den? Och med en siffra?',
        ],
        solution: `function hasDigit(text) {
  for (let i = 0; i < text.length; i++) {
    if ('0123456789'.includes(text[i])) {
      return true;
    }
  }
  return false;
}

function hasUpper(text) {
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char !== char.toLowerCase()) {
      return true;
    }
  }
  return false;
}`,
        tests: [
          {
            description: 'hasDigit("hemligt7") ger true',
            code: "hasDigit('hemligt7')",
            expected: true,
          },
          {
            description: 'hasDigit("0abc") ger true',
            code: "hasDigit('0abc')",
            expected: true,
          },
          {
            description: 'hasDigit("hemligt") ger false',
            code: "hasDigit('hemligt')",
            expected: false,
          },
          {
            description: 'hasDigit("") ger false',
            code: "hasDigit('')",
            expected: false,
          },
          {
            description: 'hasUpper("hejSan") ger true',
            code: "hasUpper('hejSan')",
            expected: true,
          },
          {
            description: 'hasUpper("åÖ") ger true',
            code: "hasUpper('åÖ')",
            expected: true,
          },
          {
            description: 'hasUpper("hej123!") ger false',
            code: "hasUpper('hej123!')",
            expected: false,
          },
        ],
      },
      {
        title: 'Vad är fel?',
        why: 'Varje regel är en egen if, inte else if, eftersom flera problem kan gälla samtidigt. else if används bara när svaren utesluter varandra.',
        xp: 25,
        description:
          'Formuläret ska kunna säga exakt vad som är fel med ett lösenord, så att användaren vet vad hen ska ändra.',
        task: `Uppgift: Skriv \`passwordProblems(password)\` som returnerar en array med alla problem, i den här ordningen:
  - "För kort" om lösenordet har färre än 8 tecken
  - "Saknar siffra"
  - "Saknar stor bokstav"
Ett bra lösenord ger en tom array.`,
        hints: [
          'Börja med en tom array och lägg till ett problem i taget.',
          'Varje regel är en egen if, inte en else if. Varför?',
        ],
        solution: `function hasDigit(text) {
  for (let i = 0; i < text.length; i++) {
    if ('0123456789'.includes(text[i])) {
      return true;
    }
  }
  return false;
}

function hasUpper(text) {
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char !== char.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function passwordProblems(password) {
  const problems = [];
  if (password.length < 8) {
    problems.push('För kort');
  }
  if (!hasDigit(password)) {
    problems.push('Saknar siffra');
  }
  if (!hasUpper(password)) {
    problems.push('Saknar stor bokstav');
  }
  return problems;
}`,
        tests: [
          {
            description: 'passwordProblems("Hemligt123") ger []',
            code: "passwordProblems('Hemligt123')",
            expected: [],
          },
          {
            description: 'passwordProblems("abc") ger alla tre problemen',
            code: "passwordProblems('abc')",
            expected: ['För kort', 'Saknar siffra', 'Saknar stor bokstav'],
          },
          {
            description:
              'passwordProblems("hemligt123") saknar bara stor bokstav',
            code: "passwordProblems('hemligt123')",
            expected: ['Saknar stor bokstav'],
          },
          {
            description: 'passwordProblems("Kort1") är bara för kort',
            code: "passwordProblems('Kort1')",
            expected: ['För kort'],
          },
          {
            description: 'Exakt 8 tecken är inte för kort',
            code: "passwordProblems('Abcdefg1')",
            expected: [],
          },
        ],
        sourceChecks: [
          {
            description: 'passwordProblems använder hasDigit och hasUpper',
            pattern:
              /passwordProblems[^]*(?=[^]*\bhasDigit\s*\()(?=[^]*\bhasUpper\s*\()/,
          },
        ],
      },
      {
        title: 'Omdömet',
        why: 'trim görs en gång, i början, på det användaren skrev. Städa indata så tidigt som möjligt, så behöver resten av koden inte tänka på det.',
        xp: 40,
        description:
          'Sist ska användaren få ett omdöme om lösenordet i klartext, precis under rutan i formuläret.',
        task: `Uppgift: Skriv \`feedback(password)\` som returnerar en text:
  - Inga problem: "Lösenordet är starkt!"
  - Ett problem: "Lösenordet är okej: Saknar siffra", med problemet efter kolon.
  - Två eller fler: "Lösenordet är svagt: För kort, Saknar siffra", med problemen i ordning och komma emellan.
Mellanslag före och efter lösenordet räknas inte, så "  Hemligt1  " är bara 8 tecken.`,
        hints: [
          'Städa lösenordet först och skicka det städade vidare.',
          'Det finns en array-metod som sätter ihop alla delar med en text emellan.',
        ],
        solution: `function hasDigit(text) {
  for (let i = 0; i < text.length; i++) {
    if ('0123456789'.includes(text[i])) {
      return true;
    }
  }
  return false;
}

function hasUpper(text) {
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char !== char.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function passwordProblems(password) {
  const problems = [];
  if (password.length < 8) {
    problems.push('För kort');
  }
  if (!hasDigit(password)) {
    problems.push('Saknar siffra');
  }
  if (!hasUpper(password)) {
    problems.push('Saknar stor bokstav');
  }
  return problems;
}

function feedback(password) {
  const problems = passwordProblems(password.trim());
  if (problems.length === 0) {
    return 'Lösenordet är starkt!';
  }
  let level = 'svagt';
  if (problems.length === 1) {
    level = 'okej';
  }
  return \`Lösenordet är \${level}: \${problems.join(', ')}\`;
}`,
        tests: [
          {
            description: 'feedback("Hemligt123") ger starkt',
            code: "feedback('Hemligt123')",
            expected: 'Lösenordet är starkt!',
          },
          {
            description: 'feedback("hemligt123") ger okej med problemet',
            code: "feedback('hemligt123')",
            expected: 'Lösenordet är okej: Saknar stor bokstav',
          },
          {
            description: 'feedback("abc") ger svagt med alla problemen',
            code: "feedback('abc')",
            expected:
              'Lösenordet är svagt: För kort, Saknar siffra, Saknar stor bokstav',
          },
          {
            description: 'Mellanslag runt lösenordet räknas inte',
            code: "feedback('  Hemligt  ')",
            expected: 'Lösenordet är svagt: För kort, Saknar siffra',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-badge',
    track: 'strings',
    title: 'Namnbrickan',
    reward: { emoji: '📛', name: 'Namnbricka' },
    summary:
      'Städa slarvigt inskrivna namn och gör namnbrickor till en konferens.',
    steps: [
      {
        title: 'Stor första bokstav',
        why: 'Text från användare är nästan alltid slarvig. Att städa den, med trim och små eller stora bokstäver, är något du kommer göra i varje formulär du bygger.',
        xp: 25,
        description:
          'Till en konferens skriver deltagarna in sina namn själva, och de gör det slarvigt: "aDA", " linus ", "GRACE". Namnbrickorna ska ändå bli snygga. Ett nytt verktyg: text.slice(1) ger hela texten utom första tecknet.',
        task: 'Uppgift: Skriv `capitalize(word)` som tar bort mellanslag runt ordet och returnerar det med stor första bokstav och resten små. capitalize(" aDA ") ger "Ada". En tom sträng ger en tom sträng.',
        starterCode: '// Steg 1: stor första bokstav\n',
        hints: [
          'Dela upp jobbet: den första bokstaven och resten av ordet behandlas olika.',
          'Vad är text[0], och vad är text.slice(1)? Vad gör en tom sträng med text[0]?',
        ],
        solution: `function capitalize(word) {
  const clean = word.trim();
  if (clean === '') {
    return '';
  }
  return clean[0].toUpperCase() + clean.slice(1).toLowerCase();
}`,
        tests: [
          {
            description: 'capitalize(" aDA ") ger "Ada"',
            code: "capitalize(' aDA ')",
            expected: 'Ada',
          },
          {
            description: 'capitalize("GRACE") ger "Grace"',
            code: "capitalize('GRACE')",
            expected: 'Grace',
          },
          {
            description: 'capitalize("östen") ger "Östen"',
            code: "capitalize('östen')",
            expected: 'Östen',
          },
          {
            description: 'capitalize("x") ger "X"',
            code: "capitalize('x')",
            expected: 'X',
          },
          {
            description: 'capitalize("") ger ""',
            code: "capitalize('')",
            expected: '',
          },
          {
            description: 'capitalize("   ") ger ""',
            code: "capitalize('   ')",
            expected: '',
          },
        ],
      },
      {
        title: 'Hela namnet',
        why: 'split, ändra delarna och join igen är ett mönster för all text som består av delar: namn, taggar, adresser i en webbläsare.',
        xp: 25,
        description:
          'Många skriver både för- och efternamn, ibland med flera mellanslag emellan. Också dubbelnamn som "anna maria" ska bli rätt.',
        task: 'Uppgift: Skriv `formatName(fullName)` som returnerar namnet med stor bokstav i varje del och exakt ett mellanslag mellan delarna. formatName("  ada   LOVELACE ") ger "Ada Lovelace".',
        hints: [
          'Vad ger "a  b".split(" ")? Prova med console.log.',
          'Tomma delar ska hoppas över innan du sätter ihop namnet igen.',
        ],
        solution: `function capitalize(word) {
  const clean = word.trim();
  if (clean === '') {
    return '';
  }
  return clean[0].toUpperCase() + clean.slice(1).toLowerCase();
}

function formatName(fullName) {
  const parts = fullName.split(' ');
  const words = [];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] !== '') {
      words.push(capitalize(parts[i]));
    }
  }
  return words.join(' ');
}`,
        tests: [
          {
            description: 'formatName("  ada   LOVELACE ") ger "Ada Lovelace"',
            code: "formatName('  ada   LOVELACE ')",
            expected: 'Ada Lovelace',
          },
          {
            description: 'formatName("linus") ger "Linus"',
            code: "formatName('linus')",
            expected: 'Linus',
          },
          {
            description:
              'formatName("anna maria ÅBERG") ger "Anna Maria Åberg"',
            code: "formatName('anna maria ÅBERG')",
            expected: 'Anna Maria Åberg',
          },
          {
            description: 'formatName("") ger ""',
            code: "formatName('')",
            expected: '',
          },
        ],
      },
      {
        title: 'Brickan',
        why: '?? och ?. finns för data som kanske saknas. Det är vanligt när data kommer från ett formulär eller ett API, där man aldrig kan lita på att allt är ifyllt.',
        xp: 40,
        description:
          'Nu ska brickorna skrivas ut. Varje deltagare är ett objekt, men alla har inte fyllt i allt, och ibland saknas deltagaren helt.',
        task: `Uppgift: Skriv \`badge(person)\` som returnerar texten på brickan.
  - Namnet formateras som i förra steget, och efter det kommer " – " och rollen: "Ada Lovelace – Utvecklare".
  - Saknas rollen står det "Gäst".
  - Har personen ett företag med ett namn, som person.company.name, läggs det till inom parentes: "Ada Lovelace – Utvecklare (Analytical AB)".
  - Saknas personen helt returneras "Okänd besökare".`,
        hints: [
          'Två av operatorerna från banan är gjorda för precis det här: saker som kanske saknas.',
          'Bygg texten i två delar: först det som alltid finns, sedan det som bara ibland finns.',
        ],
        solution: `function capitalize(word) {
  const clean = word.trim();
  if (clean === '') {
    return '';
  }
  return clean[0].toUpperCase() + clean.slice(1).toLowerCase();
}

function formatName(fullName) {
  const parts = fullName.split(' ');
  const words = [];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] !== '') {
      words.push(capitalize(parts[i]));
    }
  }
  return words.join(' ');
}

function badge(person) {
  if (!person) {
    return 'Okänd besökare';
  }
  const text = \`\${formatName(person.name)} – \${person.role ?? 'Gäst'}\`;
  const company = person.company?.name;
  if (company) {
    return \`\${text} (\${company})\`;
  }
  return text;
}`,
        tests: [
          {
            description: 'En person med roll och företag',
            code: "badge({ name: 'ada lovelace', role: 'Utvecklare', company: { name: 'Analytical AB' } })",
            expected: 'Ada Lovelace – Utvecklare (Analytical AB)',
          },
          {
            description: 'En person utan roll blir Gäst',
            code: "badge({ name: ' LINUS ' })",
            expected: 'Linus – Gäst',
          },
          {
            description: 'Ett företag utan namn visas inte',
            code: "badge({ name: 'grace hopper', role: 'Amiral', company: {} })",
            expected: 'Grace Hopper – Amiral',
          },
          {
            description: 'Utan person blir det "Okänd besökare"',
            code: 'badge(undefined)',
            expected: 'Okänd besökare',
          },
          {
            description: 'Även null ger "Okänd besökare"',
            code: 'badge(null)',
            expected: 'Okänd besökare',
          },
        ],
        sourceChecks: [
          {
            description: 'badge använder formatName',
            pattern: /badge[^]*\bformatName\s*\(/,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-chat',
    track: 'strings',
    title: 'Chattfiltret',
    reward: { emoji: '🦜', name: 'Papegoja' },
    summary: 'Räkna ord, censurera fula ord och visa chattmeddelanden snyggt.',
    steps: [
      {
        title: 'Räkna ord',
        why: 'split(" ").length ser rätt ut men räknar tomma delar som ord. Testa alltid med konstiga indata, som en tom text eller extra mellanslag. Det är där felen gömmer sig.',
        xp: 25,
        description:
          'Du bygger filtret till en chatt. Först ska den kunna räkna orden i ett meddelande, till exempel för att stoppa meddelanden som är för långa. Folk skriver ofta med extra mellanslag.',
        task: 'Uppgift: Skriv `countWords(text)` som returnerar antalet ord. countWords("  hej  på dig ") ger 3, och en tom text eller bara mellanslag ger 0.',
        starterCode: '// Steg 1: räkna ord\n',
        hints: [
          'Vad blir det när du delar " hej " med split(" ")? Vilka delar är egentligen ord?',
          'Räkna bara de delar som inte är tomma.',
        ],
        solution: `function countWords(text) {
  const parts = text.split(' ');
  let count = 0;
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] !== '') {
      count = count + 1;
    }
  }
  return count;
}`,
        tests: [
          {
            description: 'countWords("hej på dig") ger 3',
            code: "countWords('hej på dig')",
            expected: 3,
          },
          {
            description: 'countWords("  hej  på dig ") ger 3',
            code: "countWords('  hej  på dig ')",
            expected: 3,
          },
          {
            description: 'countWords("hej") ger 1',
            code: "countWords('hej')",
            expected: 1,
          },
          {
            description: 'countWords("") ger 0',
            code: "countWords('')",
            expected: 0,
          },
          {
            description: 'countWords("    ") ger 0',
            code: "countWords('    ')",
            expected: 0,
          },
        ],
      },
      {
        title: 'Censur',
        why: 'Du jämförde hela ord, inte om texten innehåller ordet. Annars hade "Fånerier" blivit censurerat. Fundera alltid på om du vill ha en exakt jämförelse, ===, eller en sökning, includes.',
        xp: 25,
        description:
          'Chatten ska vara snäll. Fula ord byts ut mot stjärnor, en stjärna per bokstav, så att man ser att något stod där. Orden i ett meddelande skiljs åt med ett mellanslag.',
        task: 'Uppgift: Skriv `censor(text, badWords)` som byter ut varje ord som finns i arrayen badWords mot lika många * som ordet har bokstäver. Stora och små bokstäver spelar ingen roll. censor("Du är en Fåne", ["fåne"]) ger "Du är en ****". Alla andra ord ska vara precis som förut.',
        hints: [
          'Dela upp, byt ut de delar som behöver det, och sätt ihop igen.',
          'Stjärnorna kan byggas upp i en loop, ett tecken per varv.',
        ],
        solution: `function countWords(text) {
  const parts = text.split(' ');
  let count = 0;
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] !== '') {
      count = count + 1;
    }
  }
  return count;
}

function stars(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result = result + '*';
  }
  return result;
}

function censor(text, badWords) {
  const words = text.split(' ');
  for (let i = 0; i < words.length; i++) {
    if (badWords.includes(words[i].toLowerCase())) {
      words[i] = stars(words[i].length);
    }
  }
  return words.join(' ');
}`,
        tests: [
          {
            description:
              'censor("Du är en Fåne", ["fåne"]) ger "Du är en ****"',
            code: "censor('Du är en Fåne', ['fåne'])",
            expected: 'Du är en ****',
          },
          {
            description: 'Flera fula ord byts ut',
            code: "censor('DUMBOM och fåne', ['fåne', 'dumbom'])",
            expected: '****** och ****',
          },
          {
            description: 'Ord som bara innehåller ett fult ord byts inte ut',
            code: "censor('Fånerier är kul', ['fåne'])",
            expected: 'Fånerier är kul',
          },
          {
            description: 'Utan fula ord blir texten likadan',
            code: "censor('Hej på dig', ['fåne'])",
            expected: 'Hej på dig',
          },
        ],
      },
      {
        title: 'Visa meddelandet',
        why: 'BAD_WORDS skrivs med stora bokstäver eftersom det är en konstant som hela programmet delar. Det är en vanlig namnvana för värden som aldrig ändras.',
        xp: 40,
        description:
          'Sist ska meddelandena visas i chatten. Ett meddelande är ett objekt med text, och ibland user och time. Ordlistan med fula ord är ["fåne", "dumbom"].',
        task: `Uppgift: Skriv \`formatMessage(message)\` som returnerar raden som visas i chatten.
  - Formatet är "[12:05] Ada: Hej på dig", med texten censurerad.
  - Saknas user står det "Anonym". Saknas time visas ingen tid, och raden börjar direkt med namnet.
  - Mellanslag runt texten tas bort.
  - Är texten tom, eller bara mellanslag, ska meddelandet inte visas: returnera null.`,
        hints: [
          'Börja med fallet där inget ska visas, så slipper resten av funktionen tänka på det.',
          'Tiden är antingen en bit text med hakparenteser och ett mellanslag, eller ingenting.',
        ],
        solution: `function countWords(text) {
  const parts = text.split(' ');
  let count = 0;
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] !== '') {
      count = count + 1;
    }
  }
  return count;
}

function stars(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result = result + '*';
  }
  return result;
}

function censor(text, badWords) {
  const words = text.split(' ');
  for (let i = 0; i < words.length; i++) {
    if (badWords.includes(words[i].toLowerCase())) {
      words[i] = stars(words[i].length);
    }
  }
  return words.join(' ');
}

const BAD_WORDS = ['fåne', 'dumbom'];

function formatMessage(message) {
  const text = message.text.trim();
  if (text === '') {
    return null;
  }
  let time = '';
  if (message.time) {
    time = \`[\${message.time}] \`;
  }
  const user = message.user ?? 'Anonym';
  return \`\${time}\${user}: \${censor(text, BAD_WORDS)}\`;
}`,
        tests: [
          {
            description: 'Ett helt meddelande med tid och namn',
            code: "formatMessage({ user: 'Ada', time: '12:05', text: 'Hej på dig' })",
            expected: '[12:05] Ada: Hej på dig',
          },
          {
            description: 'Utan user blir det Anonym, och fula ord censureras',
            code: "formatMessage({ time: '09:30', text: 'Din dumbom' })",
            expected: '[09:30] Anonym: Din ******',
          },
          {
            description: 'Utan time börjar raden med namnet',
            code: "formatMessage({ user: 'Linus', text: '  Hallå!  ' })",
            expected: 'Linus: Hallå!',
          },
          {
            description: 'Ett tomt meddelande ger null',
            code: "formatMessage({ user: 'Grace', time: '10:00', text: '   ' })",
            expected: null,
          },
        ],
        sourceChecks: [
          {
            description: 'formatMessage använder censor',
            pattern: /formatMessage[^]*\bcensor\s*\(/,
          },
        ],
      },
    ],
  },
  // Array-metoder: samma nivå som Functions, och dessutom inga
  // for-loopar. Allt görs med map, filter, find och reduce.
  {
    id: 'proj-movies',
    track: 'array-methods',
    title: 'Filmkvällen',
    reward: { emoji: '🍿', name: 'Popcorn' },
    summary: 'Sök bland filmer, hitta den bästa och få tips på vad du ska se.',
    steps: [
      {
        title: 'Välj genre',
        xp: 25,
        description:
          'Du bygger en app för filmkvällen. Varje film är ett objekt: { title, year, rating, genres }, där genres är en array som ["komedi", "drama"]. Inga for-loopar i det här projektet.',
        task: 'Uppgift: Skriv `titlesByGenre(movies, genre)` som returnerar en array med titlarna på filmerna som har genren, i samma ordning som i movies.',
        starterCode: '// Steg 1: filmer i en genre\n',
        hints: [
          'Det är två jobb: välja ut filmer och sedan göra om dem till titlar.',
          'genres är en array. Hur frågar man en array om den innehåller något?',
        ],
        solution: `function titlesByGenre(movies, genre) {
  return movies
    .filter(movie => movie.genres.includes(genre))
    .map(movie => movie.title);
}`,
        tests: [
          {
            description: 'Hittar alla komedier i rätt ordning',
            code: "titlesByGenre([{ title: 'A', genres: ['komedi'] }, { title: 'B', genres: ['skräck'] }, { title: 'C', genres: ['drama', 'komedi'] }], 'komedi')",
            expected: ['A', 'C'],
          },
          {
            description: 'Ger en tom array när ingen film har genren',
            code: "titlesByGenre([{ title: 'A', genres: ['komedi'] }], 'western')",
            expected: [],
          },
          {
            description: 'Ger en tom array för en tom lista',
            code: "titlesByGenre([], 'drama')",
            expected: [],
          },
        ],
        sourceChecks: [
          {
            description: 'Inga for-loopar',
            pattern: /\bfor\s*\(/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Betyg',
        xp: 25,
        description:
          'Nu ska appen kunna säga något om betygen, som går från 1 till 10.',
        task: `Uppgift:
  - Skriv \`averageRating(movies)\` som returnerar medelbetyget, eller 0 om listan är tom.
  - Skriv \`bestMovie(movies)\` som returnerar filmobjektet med högst betyg. Vid lika vinner den som kommer först. En tom lista ger undefined.`,
        hints: [
          'En av metoderna kan gå igenom en lista och bära med sig ett värde från varv till varv.',
          'För bestMovie kan det värdet vara den bästa filmen hittills.',
        ],
        solution: `function titlesByGenre(movies, genre) {
  return movies
    .filter(movie => movie.genres.includes(genre))
    .map(movie => movie.title);
}

function averageRating(movies) {
  if (movies.length === 0) {
    return 0;
  }
  const sum = movies.reduce((total, movie) => total + movie.rating, 0);
  return sum / movies.length;
}

function bestMovie(movies) {
  if (movies.length === 0) {
    return undefined;
  }
  return movies.reduce((best, movie) => {
    if (movie.rating > best.rating) {
      return movie;
    }
    return best;
  });
}`,
        tests: [
          {
            description: 'averageRating räknar ut medelbetyget',
            code: "averageRating([{ title: 'A', rating: 6 }, { title: 'B', rating: 9 }, { title: 'C', rating: 9 }])",
            expected: 8,
          },
          {
            description: 'averageRating([]) ger 0',
            code: 'averageRating([])',
            expected: 0,
          },
          {
            description:
              'bestMovie ger filmen med högst betyg, den första vid lika',
            code: "bestMovie([{ title: 'A', rating: 6 }, { title: 'B', rating: 9 }, { title: 'C', rating: 9 }]).title",
            expected: 'B',
          },
          {
            description: 'bestMovie fungerar när den bästa ligger först',
            code: "bestMovie([{ title: 'A', rating: 10 }, { title: 'B', rating: 2 }]).title",
            expected: 'A',
          },
          {
            description: 'bestMovie([]) ger undefined',
            code: 'bestMovie([])',
            expected: undefined,
          },
        ],
        sourceChecks: [
          {
            description: 'Inga for-loopar',
            pattern: /\bfor\s*\(/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Tips',
        why: 'Varje steg i kedjan gör en sak: filter, filter, map och slice. Kedjor av array-metoder läses uppifrån och ner, som ett recept, och det är så listor tas fram i React.',
        xp: 40,
        description:
          'Sist ska appen tipsa om vad du ska se ikväll. Den vet vilka filmer du redan har sett.',
        task: 'Uppgift: Skriv `recommend(movies, seen)`, där seen är en array med titlar du redan sett. Den returnerar titlarna på högst 3 filmer som du inte har sett och som har minst betyget 7, i samma ordning som i movies. Titlarna i seen kan vara skrivna med andra stora och små bokstäver.',
        hints: [
          'Börja med att göra seen lätt att jämföra med.',
          'Begränsa till 3 sist, när allt annat är klart.',
        ],
        solution: `function titlesByGenre(movies, genre) {
  return movies
    .filter(movie => movie.genres.includes(genre))
    .map(movie => movie.title);
}

function averageRating(movies) {
  if (movies.length === 0) {
    return 0;
  }
  const sum = movies.reduce((total, movie) => total + movie.rating, 0);
  return sum / movies.length;
}

function bestMovie(movies) {
  if (movies.length === 0) {
    return undefined;
  }
  return movies.reduce((best, movie) => {
    if (movie.rating > best.rating) {
      return movie;
    }
    return best;
  });
}

function recommend(movies, seen) {
  const seenLower = seen.map(title => title.toLowerCase());
  return movies
    .filter(movie => movie.rating >= 7)
    .filter(movie => !seenLower.includes(movie.title.toLowerCase()))
    .map(movie => movie.title)
    .slice(0, 3);
}`,
        tests: [
          {
            description: 'Tipsar om bra filmer du inte sett',
            code: "recommend([{ title: 'Up', rating: 8 }, { title: 'Cats', rating: 3 }, { title: 'Jaws', rating: 7 }], [])",
            expected: ['Up', 'Jaws'],
          },
          {
            description:
              'Hoppar över filmer du sett, oavsett stora och små bokstäver',
            code: "recommend([{ title: 'Up', rating: 8 }, { title: 'Jaws', rating: 7 }], ['UP'])",
            expected: ['Jaws'],
          },
          {
            description: 'Ger högst 3 tips',
            code: "recommend([{ title: 'A', rating: 9 }, { title: 'B', rating: 9 }, { title: 'C', rating: 9 }, { title: 'D', rating: 9 }], ['x'])",
            expected: ['A', 'B', 'C'],
          },
          {
            description: 'Filmer du sett räknas inte in bland de 3',
            code: "recommend([{ title: 'A', rating: 9 }, { title: 'B', rating: 9 }, { title: 'C', rating: 9 }, { title: 'D', rating: 9 }], ['a'])",
            expected: ['B', 'C', 'D'],
          },
        ],
        sourceChecks: [
          {
            description: 'Inga for-loopar',
            pattern: /\bfor\s*\(/,
            forbidden: true,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-cart',
    track: 'array-methods',
    title: 'Varukorgen',
    reward: { emoji: '🧺', name: 'Korg' },
    summary: 'Räkna på en varukorg i en webbshop och skriv ut kvittot.',
    steps: [
      {
        title: 'Summan',
        xp: 25,
        description:
          'Du bygger varukorgen i en webbshop. Varje rad i korgen är ett objekt: { id, name, price, qty }, där qty är antalet. Inga for-loopar i det här projektet.',
        task: `Uppgift:
  - Skriv \`cartTotal(cart)\` som returnerar vad hela korgen kostar.
  - Skriv \`itemCount(cart)\` som returnerar hur många varor som ligger i korgen totalt.`,
        starterCode: '// Steg 1: vad kostar korgen?\n',
        hints: [
          'En rad kostar priset gånger antalet.',
          'Båda funktionerna gör om en lista till ett enda tal.',
        ],
        solution: `function cartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function itemCount(cart) {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}`,
        tests: [
          {
            description: 'cartTotal räknar pris gånger antal för varje rad',
            code: "cartTotal([{ id: 1, name: 'Mjölk', price: 18, qty: 2 }, { id: 2, name: 'Bröd', price: 35, qty: 1 }])",
            expected: 71,
          },
          {
            description: 'cartTotal([]) ger 0',
            code: 'cartTotal([])',
            expected: 0,
          },
          {
            description: 'itemCount räknar alla varor',
            code: "itemCount([{ id: 1, name: 'Mjölk', price: 18, qty: 2 }, { id: 2, name: 'Bröd', price: 35, qty: 1 }])",
            expected: 3,
          },
          {
            description: 'itemCount([]) ger 0',
            code: 'itemCount([])',
            expected: 0,
          },
        ],
        sourceChecks: [
          {
            description: 'Inga for-loopar',
            pattern: /\bfor\s*\(/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Sök i korgen',
        xp: 25,
        description: 'Kunden vill kunna leta i korgen och se vad som är dyrt.',
        task: `Uppgift:
  - Skriv \`findItem(cart, name)\` som returnerar raden med varan, oavsett stora och små bokstäver. Finns den inte returneras null.
  - Skriv \`expensiveNames(cart, limit)\` som returnerar namnen på varorna som kostar mer än limit styck.`,
        hints: [
          'Vad returnerar find när inget hittas? Är det null?',
          'Det finns en operator som ger ett reservvärde när något saknas.',
        ],
        solution: `function cartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function itemCount(cart) {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function findItem(cart, name) {
  const item = cart.find(
    item => item.name.toLowerCase() === name.toLowerCase(),
  );
  return item ?? null;
}

function expensiveNames(cart, limit) {
  return cart.filter(item => item.price > limit).map(item => item.name);
}`,
        tests: [
          {
            description:
              'findItem hittar varan oavsett stora och små bokstäver',
            code: "findItem([{ id: 1, name: 'Mjölk', price: 18, qty: 2 }, { id: 2, name: 'Bröd', price: 35, qty: 1 }], 'BRÖD').id",
            expected: 2,
          },
          {
            description: 'findItem ger null när varan inte finns',
            code: "findItem([{ id: 1, name: 'Mjölk', price: 18, qty: 2 }], 'Ost')",
            expected: null,
          },
          {
            description: 'expensiveNames ger varorna över gränsen',
            code: "expensiveNames([{ id: 1, name: 'Mjölk', price: 18, qty: 2 }, { id: 2, name: 'Ost', price: 89, qty: 1 }, { id: 3, name: 'Kaffe', price: 50, qty: 1 }], 50)",
            expected: ['Ost'],
          },
        ],
        sourceChecks: [
          {
            description: 'Inga for-loopar',
            pattern: /\bfor\s*\(/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Kvittot',
        why: 'map gör om data till det som ska visas, här en textrad per vara. I React gör du exakt samma sak, fast varje rad blir ett element på skärmen i stället för text.',
        xp: 40,
        description:
          'Dags att betala. Kvittot är en array med rader som visas en och en på skärmen.',
        task: `Uppgift: Skriv \`receipt(cart)\` som returnerar kvittots rader:
  - En rad per vara: "2 × Mjölk: 36 kr", med antal, namn och radens summa.
  - Är summan minst 500 kr får kunden 10 % rabatt, avrundat nedåt till hela kronor. Då kommer en rad "Rabatt: -52 kr".
  - Sist kommer "Totalt: 468 kr", med rabatten avdragen.`,
        hints: [
          'Varje vara blir en textrad: det låter som ett jobb för en av metoderna.',
          'Räkna ut rabatten med funktionerna du redan har, innan du bygger de sista raderna.',
        ],
        solution: `function cartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function itemCount(cart) {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function findItem(cart, name) {
  const item = cart.find(
    item => item.name.toLowerCase() === name.toLowerCase(),
  );
  return item ?? null;
}

function expensiveNames(cart, limit) {
  return cart.filter(item => item.price > limit).map(item => item.name);
}

function receipt(cart) {
  const lines = cart.map(
    item => \`\${item.qty} × \${item.name}: \${item.price * item.qty} kr\`,
  );
  const total = cartTotal(cart);
  let discount = 0;
  if (total >= 500) {
    discount = Math.floor(total / 10);
  }
  if (discount > 0) {
    lines.push(\`Rabatt: -\${discount} kr\`);
  }
  lines.push(\`Totalt: \${total - discount} kr\`);
  return lines;
}`,
        tests: [
          {
            description: 'Ett kvitto utan rabatt',
            code: "receipt([{ id: 1, name: 'Mjölk', price: 18, qty: 2 }, { id: 2, name: 'Bröd', price: 35, qty: 1 }])",
            expected: ['2 × Mjölk: 36 kr', '1 × Bröd: 35 kr', 'Totalt: 71 kr'],
          },
          {
            description: 'Ett kvitto med rabatt',
            code: "receipt([{ id: 1, name: 'Hörlurar', price: 499, qty: 1 }, { id: 2, name: 'Kabel', price: 25, qty: 1 }])",
            expected: [
              '1 × Hörlurar: 499 kr',
              '1 × Kabel: 25 kr',
              'Rabatt: -52 kr',
              'Totalt: 472 kr',
            ],
          },
          {
            description: 'Exakt 500 kr ger rabatt',
            code: "receipt([{ id: 1, name: 'Spel', price: 250, qty: 2 }])",
            expected: ['2 × Spel: 500 kr', 'Rabatt: -50 kr', 'Totalt: 450 kr'],
          },
          {
            description: 'En tom korg',
            code: 'receipt([])',
            expected: ['Totalt: 0 kr'],
          },
        ],
        sourceChecks: [
          {
            description: 'Inga for-loopar',
            pattern: /\bfor\s*\(/,
            forbidden: true,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-quiz-results',
    track: 'array-methods',
    title: 'Quizresultaten',
    reward: { emoji: '📜', name: 'Diplom' },
    summary: 'Rätta ett quiz, se vem som klarade det och sammanfatta klassen.',
    steps: [
      {
        title: 'Rätta',
        xp: 25,
        description:
          'Du rättar ett quiz. En elevs svar är en array med true för rätt och false för fel, till exempel [true, false, true, true]. Inga for-loopar i det här projektet.',
        task: `Uppgift:
  - Skriv \`scoreOf(answers)\` som returnerar antalet rätt.
  - Skriv \`percent(answers)\` som returnerar andelen rätt i procent, avrundat till närmaste heltal med Math.round. Inga svar alls ger 0.`,
        starterCode: '// Steg 1: rätta svaren\n',
        hints: [
          'Hur många rätt är lika med hur många true som blir kvar om du bara behåller dem.',
          'Procent är andelen gånger 100.',
        ],
        solution: `function scoreOf(answers) {
  return answers.filter(answer => answer).length;
}

function percent(answers) {
  if (answers.length === 0) {
    return 0;
  }
  return Math.round((scoreOf(answers) / answers.length) * 100);
}`,
        tests: [
          {
            description: 'scoreOf([true, false, true, true]) ger 3',
            code: 'scoreOf([true, false, true, true])',
            expected: 3,
          },
          {
            description: 'scoreOf([false, false]) ger 0',
            code: 'scoreOf([false, false])',
            expected: 0,
          },
          {
            description: 'percent([true, false, true, true]) ger 75',
            code: 'percent([true, false, true, true])',
            expected: 75,
          },
          {
            description: 'percent([true, false, false]) ger 33',
            code: 'percent([true, false, false])',
            expected: 33,
          },
          {
            description: 'percent([true, true, false]) ger 67',
            code: 'percent([true, true, false])',
            expected: 67,
          },
          {
            description: 'percent([]) ger 0',
            code: 'percent([])',
            expected: 0,
          },
        ],
        sourceChecks: [
          {
            description: 'Inga for-loopar',
            pattern: /\bfor\s*\(/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Godkänd?',
        xp: 25,
        description:
          'Nu rättar du hela klassen. Varje elev är ett objekt: { name, answers }. Man är godkänd med minst 60 %.',
        task: `Uppgift:
  - Skriv \`passedNames(students)\` som returnerar namnen på de godkända eleverna.
  - Skriv \`topStudent(students)\` som returnerar namnet på eleven med högst procent. Vid lika vinner den som kommer först, och en tom klass ger null.`,
        hints: [
          'percent kan räkna åt dig, så slipper du göra det igen.',
          'Hitta den bästa eleven först, och plocka ut namnet sist.',
        ],
        solution: `function scoreOf(answers) {
  return answers.filter(answer => answer).length;
}

function percent(answers) {
  if (answers.length === 0) {
    return 0;
  }
  return Math.round((scoreOf(answers) / answers.length) * 100);
}

function passedNames(students) {
  return students
    .filter(student => percent(student.answers) >= 60)
    .map(student => student.name);
}

function topStudent(students) {
  if (students.length === 0) {
    return null;
  }
  const best = students.reduce((top, student) => {
    if (percent(student.answers) > percent(top.answers)) {
      return student;
    }
    return top;
  });
  return best.name;
}`,
        tests: [
          {
            description: 'passedNames ger de godkända, 60 % räcker',
            code: "passedNames([{ name: 'Ada', answers: [true, true, true, false, false] }, { name: 'Bo', answers: [true, false, false] }, { name: 'Cy', answers: [true] }])",
            expected: ['Ada', 'Cy'],
          },
          {
            description: 'topStudent ger den med högst procent',
            code: "topStudent([{ name: 'Ada', answers: [true, true, false] }, { name: 'Bo', answers: [true, true, true, false] }])",
            expected: 'Bo',
          },
          {
            description: 'topStudent låter den första vinna vid lika',
            code: "topStudent([{ name: 'Ada', answers: [true, false] }, { name: 'Bo', answers: [false, true] }])",
            expected: 'Ada',
          },
          {
            description: 'topStudent([]) ger null',
            code: 'topStudent([])',
            expected: null,
          },
        ],
        sourceChecks: [
          {
            description: 'Inga for-loopar',
            pattern: /\bfor\s*\(/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Klassens sammanfattning',
        why: 'reduce kan bygga vad som helst, inte bara summor. Med ett objekt som startvärde räknar du flera saker på en gång. Ett objekt passar när du vill slå upp något med namn, som grades.A.',
        xp: 40,
        description:
          'Läraren vill ha en sammanfattning av hela klassen. Betygen är A från 90 %, B från 60 % och annars C.',
        task: 'Uppgift: Skriv `summary(students)` som returnerar ett objekt med average (klassens medelprocent, avrundad med Math.round, 0 för en tom klass), passed (antalet godkända) och grades, ett objekt med hur många som fick varje betyg: { A: 1, B: 2, C: 0 }. Alla tre betyg ska finnas med, även när ingen fick det.',
        hints: [
          'Gör om eleverna till procent en gång, och räkna på den listan.',
          'reduce kan bygga upp ett objekt lika gärna som ett tal. Vad är startvärdet då?',
        ],
        solution: `function scoreOf(answers) {
  return answers.filter(answer => answer).length;
}

function percent(answers) {
  if (answers.length === 0) {
    return 0;
  }
  return Math.round((scoreOf(answers) / answers.length) * 100);
}

function passedNames(students) {
  return students
    .filter(student => percent(student.answers) >= 60)
    .map(student => student.name);
}

function topStudent(students) {
  if (students.length === 0) {
    return null;
  }
  const best = students.reduce((top, student) => {
    if (percent(student.answers) > percent(top.answers)) {
      return student;
    }
    return top;
  });
  return best.name;
}

function gradeOf(value) {
  if (value >= 90) {
    return 'A';
  }
  if (value >= 60) {
    return 'B';
  }
  return 'C';
}

function summary(students) {
  const percents = students.map(student => percent(student.answers));
  const sum = percents.reduce((total, value) => total + value, 0);
  const grades = percents.reduce(
    (counts, value) => {
      counts[gradeOf(value)] = counts[gradeOf(value)] + 1;
      return counts;
    },
    { A: 0, B: 0, C: 0 },
  );
  let average = 0;
  if (students.length > 0) {
    average = Math.round(sum / students.length);
  }
  return {
    average,
    passed: percents.filter(value => value >= 60).length,
    grades,
  };
}`,
        tests: [
          {
            description: 'average är klassens medelprocent',
            code: "summary([{ name: 'Ada', answers: [true, true, true, true, true, true, true, true, true, false] }, { name: 'Bo', answers: [true, true, false] }, { name: 'Cy', answers: [false, false, true, false] }]).average",
            expected: 61,
          },
          {
            description: 'passed är antalet godkända',
            code: "summary([{ name: 'Ada', answers: [true, true, true, true, true, true, true, true, true, false] }, { name: 'Bo', answers: [true, true, false] }, { name: 'Cy', answers: [false, false, true, false] }]).passed",
            expected: 2,
          },
          {
            description: 'grades räknar varje betyg',
            code: "(() => { const g = summary([{ name: 'Ada', answers: [true, true, true, true, true, true, true, true, true, false] }, { name: 'Bo', answers: [true, true, false] }, { name: 'Cy', answers: [false, false, true, false] }]).grades; return [g.A, g.B, g.C]; })()",
            expected: [1, 1, 1],
          },
          {
            description: 'Alla betyg finns med, även när ingen fick dem',
            code: "(() => { const g = summary([{ name: 'Ada', answers: [true, false] }]).grades; return [g.A, g.B, g.C]; })()",
            expected: [0, 0, 1],
          },
          {
            description: 'En tom klass',
            code: '(() => { const s = summary([]); return [s.average, s.passed, s.grades.A, s.grades.B, s.grades.C]; })()',
            expected: [0, 0, 0, 0, 0],
          },
        ],
        sourceChecks: [
          {
            description: 'Inga for-loopar',
            pattern: /\bfor\s*\(/,
            forbidden: true,
          },
        ],
      },
    ],
  },
  // Modern JS: testerna kollar också att originalet aldrig ändras,
  // eftersom det är så state måste uppdateras i React.
  {
    id: 'proj-settings',
    track: 'modern-js',
    title: 'Inställningarna',
    reward: { emoji: '🎛️', name: 'Mixerbord' },
    summary:
      'Standardvärden, säkra uppdateringar och en sammanfattning av inställningarna.',
    steps: [
      {
        title: 'Standardvärden',
        xp: 25,
        description:
          'Du bygger inställningssidan i en app. Användaren har bara sparat de inställningar hen ändrat, så resten ska fyllas i med standardvärden: theme "ljust", volume 50 och language "sv".',
        task: 'Uppgift: Skriv `withDefaults(settings)` som returnerar ett nytt objekt med standardvärdena, där det användaren sparat vinner. Andra egenskaper ska följa med. En inställning som är undefined räknas som att den saknas, men volume 0 är en riktig inställning.',
        starterCode: '// Steg 1: standardvärden\n',
        hints: [
          'Vad händer med en egenskap som är undefined när ett objekt spreadas?',
          'Det finns en operator som bara använder reservvärdet när något är null eller undefined.',
        ],
        solution: `const DEFAULTS = { theme: 'ljust', volume: 50, language: 'sv' };

function withDefaults(settings) {
  return {
    ...settings,
    theme: settings.theme ?? DEFAULTS.theme,
    volume: settings.volume ?? DEFAULTS.volume,
    language: settings.language ?? DEFAULTS.language,
  };
}`,
        tests: [
          {
            description: 'Ett tomt objekt får alla standardvärden',
            code: '(() => { const s = withDefaults({}); return [s.theme, s.volume, s.language]; })()',
            expected: ['ljust', 50, 'sv'],
          },
          {
            description: 'Det användaren sparat vinner, och volume 0 behålls',
            code: "(() => { const s = withDefaults({ theme: 'mörkt', volume: 0 }); return [s.theme, s.volume, s.language]; })()",
            expected: ['mörkt', 0, 'sv'],
          },
          {
            description: 'undefined räknas som att inställningen saknas',
            code: '(() => { const s = withDefaults({ volume: undefined }); return s.volume; })()',
            expected: 50,
          },
          {
            description: 'Andra egenskaper följer med',
            code: 'withDefaults({ fontSize: 18 }).fontSize',
            expected: 18,
          },
          {
            description: 'settings ändras inte',
            code: "(() => { const s = { theme: 'mörkt' }; withDefaults(s); return Object.keys(s); })()",
            expected: ['theme'],
          },
        ],
      },
      {
        title: 'Ändra',
        why: 'Funktionerna returnerar en kopia i stället för att ändra originalet. React jämför det gamla och det nya objektet för att se om något har ändrats. Ändrar du originalet ser React ingen skillnad, och skärmen uppdateras inte.',
        xp: 25,
        description:
          'Nu ska användaren kunna ändra inställningarna. Funktionerna får aldrig ändra objektet de får in, utan returnerar en ny kopia. Math.min(a, b) ger det minsta av två tal och Math.max(a, b) det största.',
        task: `Uppgift:
  - Skriv \`toggleTheme(settings)\` som byter theme mellan "ljust" och "mörkt".
  - Skriv \`changeVolume(settings, change)\` som ändrar volume med change, men aldrig under 0 eller över 100.`,
        hints: [
          'Kopiera först, och skriv över den egenskap som ska ändras.',
          'Att hålla ett tal mellan två gränser går att göra med en Math.min och en Math.max i varandra.',
        ],
        solution: `const DEFAULTS = { theme: 'ljust', volume: 50, language: 'sv' };

function withDefaults(settings) {
  return {
    ...settings,
    theme: settings.theme ?? DEFAULTS.theme,
    volume: settings.volume ?? DEFAULTS.volume,
    language: settings.language ?? DEFAULTS.language,
  };
}

function toggleTheme(settings) {
  return {
    ...settings,
    theme: settings.theme === 'mörkt' ? 'ljust' : 'mörkt',
  };
}

function changeVolume(settings, change) {
  const volume = Math.min(100, Math.max(0, settings.volume + change));
  return { ...settings, volume };
}`,
        tests: [
          {
            description: 'toggleTheme byter ljust till mörkt',
            code: "toggleTheme({ theme: 'ljust', volume: 50 }).theme",
            expected: 'mörkt',
          },
          {
            description: 'toggleTheme byter mörkt till ljust',
            code: "toggleTheme({ theme: 'mörkt' }).theme",
            expected: 'ljust',
          },
          {
            description: 'toggleTheme behåller resten',
            code: "toggleTheme({ theme: 'ljust', volume: 30 }).volume",
            expected: 30,
          },
          {
            description: 'changeVolume höjer volymen',
            code: 'changeVolume({ volume: 50 }, 20).volume',
            expected: 70,
          },
          {
            description: 'Volymen går inte över 100',
            code: 'changeVolume({ volume: 90 }, 25).volume',
            expected: 100,
          },
          {
            description: 'Volymen går inte under 0',
            code: 'changeVolume({ volume: 10 }, -30).volume',
            expected: 0,
          },
          {
            description: 'Originalet ändras aldrig',
            code: "(() => { const s = { theme: 'ljust', volume: 50 }; toggleTheme(s); changeVolume(s, 10); return [s.theme, s.volume]; })()",
            expected: ['ljust', 50],
          },
          {
            description: 'Funktionerna returnerar ett nytt objekt',
            code: "(() => { const s = { theme: 'ljust', volume: 50 }; return toggleTheme(s) !== s && changeVolume(s, 0) !== s; })()",
            expected: true,
          },
        ],
      },
      {
        title: 'Sammanfattningen',
        xp: 40,
        description:
          'Överst på inställningssidan står en rad som sammanfattar allt.',
        task: `Uppgift: Skriv \`describeSettings(settings)\` som returnerar till exempel "Mörkt tema · volym 30 · sv".
  - Inställningar som saknas får standardvärdena.
  - Temat skrivs "Ljust tema" eller "Mörkt tema".
  - Är volymen 0 står det "ljudet av" i stället för "volym 0".`,
        hints: [
          'Du har redan en funktion som fyller i det som saknas.',
          'Plocka ut de tre värdena du behöver på en rad, så blir texten lätt att bygga.',
        ],
        solution: `const DEFAULTS = { theme: 'ljust', volume: 50, language: 'sv' };

function withDefaults(settings) {
  return {
    ...settings,
    theme: settings.theme ?? DEFAULTS.theme,
    volume: settings.volume ?? DEFAULTS.volume,
    language: settings.language ?? DEFAULTS.language,
  };
}

function toggleTheme(settings) {
  return {
    ...settings,
    theme: settings.theme === 'mörkt' ? 'ljust' : 'mörkt',
  };
}

function changeVolume(settings, change) {
  const volume = Math.min(100, Math.max(0, settings.volume + change));
  return { ...settings, volume };
}

function describeSettings(settings) {
  const { theme, volume, language } = withDefaults(settings);
  const themeText = theme === 'mörkt' ? 'Mörkt tema' : 'Ljust tema';
  const volumeText = volume === 0 ? 'ljudet av' : \`volym \${volume}\`;
  return \`\${themeText} · \${volumeText} · \${language}\`;
}`,
        tests: [
          {
            description: 'Alla inställningar ifyllda',
            code: "describeSettings({ theme: 'mörkt', volume: 30, language: 'en' })",
            expected: 'Mörkt tema · volym 30 · en',
          },
          {
            description: 'Standardvärden när inget är sparat',
            code: 'describeSettings({})',
            expected: 'Ljust tema · volym 50 · sv',
          },
          {
            description: 'Volym 0 blir "ljudet av"',
            code: 'describeSettings({ volume: 0 })',
            expected: 'Ljust tema · ljudet av · sv',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-todos',
    track: 'modern-js',
    title: 'Att göra-listan',
    reward: { emoji: '📌', name: 'Anslagstavla' },
    summary:
      'Logiken bakom en att göra-lista, skriven så som React vill ha den.',
    steps: [
      {
        title: 'Lägg till',
        xp: 25,
        description:
          'Du skriver logiken till en att göra-lista. Om några banor blir den en React-app, och React kräver att listan aldrig ändras, utan byts mot en ny. En uppgift är { id, text, done }.',
        task: 'Uppgift: Skriv `addTodo(todos, text)` som returnerar en ny lista med en ny uppgift sist. Den nya uppgiften får id ett högre än det högsta id som finns (1 i en tom lista), texten utan mellanslag runt och done false. Är texten tom eller bara mellanslag returneras todos som den är.',
        starterCode: '// Steg 1: lägg till en uppgift\n',
        hints: [
          'Hur gör man en ny array med allt från en gammal plus ett värde till?',
          'Math.max kan ta emot många tal. Hur gör man en array av id:n till många tal?',
        ],
        solution: `function addTodo(todos, text) {
  const clean = text.trim();
  if (clean === '') {
    return todos;
  }
  const id = Math.max(0, ...todos.map(todo => todo.id)) + 1;
  return [...todos, { id, text: clean, done: false }];
}`,
        tests: [
          {
            description: 'Den första uppgiften får id 1',
            code: "(() => { const todos = addTodo([], ' Handla '); return [todos.length, todos[0].id, todos[0].text, todos[0].done]; })()",
            expected: [1, 1, 'Handla', false],
          },
          {
            description: 'En ny uppgift får id ett högre än det högsta',
            code: "addTodo([{ id: 4, text: 'A', done: true }, { id: 2, text: 'B', done: false }], 'C').at(-1).id",
            expected: 5,
          },
          {
            description: 'En tom text lägger inte till något',
            code: "(() => { const todos = [{ id: 1, text: 'A', done: false }]; return addTodo(todos, '   ') === todos; })()",
            expected: true,
          },
          {
            description: 'todos ändras inte',
            code: "(() => { const todos = [{ id: 1, text: 'A', done: false }]; const next = addTodo(todos, 'B'); return [todos.length, next.length, next !== todos]; })()",
            expected: [1, 2, true],
          },
        ],
      },
      {
        title: 'Bocka av och ta bort',
        why: 'map när listan ska vara lika lång, filter när något ska bort och spread när något ska till. De tre är nästan allt du behöver för att uppdatera listor i state.',
        xp: 25,
        description:
          'Uppgifter ska kunna bockas av och tas bort. I React jämförs objekt för att se vad som ändrats, så uppgifter som inte ändras ska vara samma objekt som förut, och den som ändras ska bli ett nytt.',
        task: `Uppgift:
  - Skriv \`toggleTodo(todos, id)\` som returnerar en ny lista där uppgiften med id har bytt done.
  - Skriv \`removeTodo(todos, id)\` som returnerar en ny lista utan uppgiften.`,
        hints: [
          'En av array-metoderna gör en ny lista med lika många saker, en annan en ny lista med färre.',
          'För den uppgift som ändras: en kopia av objektet där done skrivs över.',
        ],
        solution: `function addTodo(todos, text) {
  const clean = text.trim();
  if (clean === '') {
    return todos;
  }
  const id = Math.max(0, ...todos.map(todo => todo.id)) + 1;
  return [...todos, { id, text: clean, done: false }];
}

function toggleTodo(todos, id) {
  return todos.map(todo =>
    todo.id === id ? { ...todo, done: !todo.done } : todo,
  );
}

function removeTodo(todos, id) {
  return todos.filter(todo => todo.id !== id);
}`,
        tests: [
          {
            description: 'toggleTodo bockar av rätt uppgift',
            code: "toggleTodo([{ id: 1, text: 'A', done: false }, { id: 2, text: 'B', done: false }], 2).map(todo => todo.done)",
            expected: [false, true],
          },
          {
            description: 'toggleTodo kan ångra en avbockning',
            code: "toggleTodo([{ id: 1, text: 'A', done: true }], 1)[0].done",
            expected: false,
          },
          {
            description:
              'Originalet ändras inte, och bara den ändrade uppgiften är ett nytt objekt',
            code: "(() => { const a = { id: 1, text: 'A', done: false }; const b = { id: 2, text: 'B', done: false }; const next = toggleTodo([a, b], 2); return [b.done, next[0] === a, next[1] !== b]; })()",
            expected: [false, true, true],
          },
          {
            description: 'removeTodo tar bort rätt uppgift',
            code: "removeTodo([{ id: 1, text: 'A', done: false }, { id: 2, text: 'B', done: false }], 1).map(todo => todo.id)",
            expected: [2],
          },
          {
            description: 'removeTodo ändrar inte originalet',
            code: "(() => { const todos = [{ id: 1, text: 'A', done: false }]; removeTodo(todos, 1); return todos.length; })()",
            expected: 1,
          },
        ],
      },
      {
        title: 'Statusraden',
        xp: 40,
        description: 'Under listan står en statusrad som visar hur det går.',
        task: `Uppgift: Skriv \`statusText(todos)\` som returnerar:
  - "Inget att göra" för en tom lista.
  - "Allt klart! 🎉" när alla uppgifter är klara.
  - Annars till exempel "2 av 5 klara, 3 kvar".`,
        hints: [
          'Räkna ut alla tal du behöver först, och välj text sist.',
          'Det finns tre fall. Vilket fall måste kollas före vilket?',
        ],
        solution: `function addTodo(todos, text) {
  const clean = text.trim();
  if (clean === '') {
    return todos;
  }
  const id = Math.max(0, ...todos.map(todo => todo.id)) + 1;
  return [...todos, { id, text: clean, done: false }];
}

function toggleTodo(todos, id) {
  return todos.map(todo =>
    todo.id === id ? { ...todo, done: !todo.done } : todo,
  );
}

function removeTodo(todos, id) {
  return todos.filter(todo => todo.id !== id);
}

function statusText(todos) {
  const total = todos.length;
  const done = todos.filter(todo => todo.done).length;
  if (total === 0) {
    return 'Inget att göra';
  }
  if (done === total) {
    return 'Allt klart! 🎉';
  }
  return \`\${done} av \${total} klara, \${total - done} kvar\`;
}`,
        tests: [
          {
            description: 'En tom lista',
            code: 'statusText([])',
            expected: 'Inget att göra',
          },
          {
            description: 'Allt klart',
            code: "statusText([{ id: 1, text: 'A', done: true }, { id: 2, text: 'B', done: true }])",
            expected: 'Allt klart! 🎉',
          },
          {
            description: 'Några kvar',
            code: "statusText([{ id: 1, text: 'A', done: true }, { id: 2, text: 'B', done: false }, { id: 3, text: 'C', done: false }])",
            expected: '1 av 3 klara, 2 kvar',
          },
          {
            description: 'Fungerar ihop med de andra funktionerna',
            code: "statusText(toggleTodo(addTodo(addTodo([], 'A'), 'B'), 1))",
            expected: '1 av 2 klara, 1 kvar',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-player',
    track: 'modern-js',
    title: 'Spelprofilen',
    reward: { emoji: '🕹️', name: 'Handkontroll' },
    summary: 'Skapa spelare, spara matcher och visa en publik profil.',
    steps: [
      {
        title: 'Ny spelare',
        xp: 25,
        description:
          'Du bygger profilerna i ett onlinespel. En spelare är ett objekt med name, scores (poängen från alla matcher) och best (bästa poängen).',
        task: 'Uppgift: Skriv `createPlayer(name, ...)` som tar emot namnet och sedan hur många matchpoäng som helst, som vanliga argument: createPlayer("Ada", 40, 75, 60). Den returnerar { name, scores, best }. En spelare utan matcher har best 0.',
        starterCode: '// Steg 1: skapa en spelare\n',
        hints: [
          'Det finns ett sätt att samla alla argument som blir över i en array.',
          'Math.max vill ha talen ett och ett, inte i en array. Vad ger Math.max() utan några tal alls?',
        ],
        solution: `function createPlayer(name, ...scores) {
  return {
    name,
    scores,
    best: Math.max(0, ...scores),
  };
}`,
        tests: [
          {
            description:
              'createPlayer("Ada", 40, 75, 60) får rätt scores och best',
            code: "(() => { const p = createPlayer('Ada', 40, 75, 60); return [p.name, p.scores, p.best]; })()",
            expected: ['Ada', [40, 75, 60], 75],
          },
          {
            description: 'En spelare utan matcher',
            code: "(() => { const p = createPlayer('Bo'); return [p.name, p.scores, p.best]; })()",
            expected: ['Bo', [], 0],
          },
        ],
      },
      {
        title: 'Spara en match',
        xp: 25,
        description:
          'Efter varje match sparas poängen. Profilen får aldrig ändras på plats, utan byts mot en ny.',
        task: 'Uppgift: Skriv `addScore(player, score)` som returnerar en ny spelare där score har lagts till sist i scores och best är uppdaterat. Andra egenskaper på spelaren, som country, ska följa med.',
        hints: [
          'Både spelaren och scores behöver bli nya kopior.',
          'Den nya bästa poängen är det största av den gamla bästa och den nya.',
        ],
        solution: `function createPlayer(name, ...scores) {
  return {
    name,
    scores,
    best: Math.max(0, ...scores),
  };
}

function addScore(player, score) {
  return {
    ...player,
    scores: [...player.scores, score],
    best: Math.max(player.best, score),
  };
}`,
        tests: [
          {
            description: 'Poängen läggs till och best uppdateras',
            code: "(() => { const p = addScore({ name: 'Ada', scores: [40, 75], best: 75 }, 90); return [p.name, p.scores, p.best]; })()",
            expected: ['Ada', [40, 75, 90], 90],
          },
          {
            description: 'best behålls när den nya poängen är lägre',
            code: "addScore({ name: 'Ada', scores: [40, 75], best: 75 }, 10).best",
            expected: 75,
          },
          {
            description: 'Andra egenskaper följer med',
            code: "addScore({ name: 'Ada', country: 'SE', scores: [], best: 0 }, 5).country",
            expected: 'SE',
          },
          {
            description: 'Originalet och dess scores ändras inte',
            code: "(() => { const p = { name: 'Ada', scores: [40], best: 40 }; addScore(p, 90); return [p.scores.length, p.best]; })()",
            expected: [1, 40],
          },
        ],
      },
      {
        title: 'Den publika profilen',
        why: 'Rest i destructuring plockar bort det du inte vill skicka vidare och behåller resten, även egenskaper du inte känner till. I React används det för att skicka vidare props.',
        xp: 40,
        description:
          'Andra spelare ska kunna se din profil, men inte alla dina enskilda matcher. I stället visas hur många matcher du spelat och ditt snitt.',
        task: 'Uppgift: Skriv `publicProfile(player)` som returnerar ett nytt objekt med allt från spelaren utom scores, och dessutom games (antalet matcher) och average (snittpoängen avrundad med Math.round, 0 utan matcher). Egenskaper du inte känner till i förväg ska också följa med.',
        hints: [
          'Ett sätt att plocka ut en egenskap och samla resten i ett nytt objekt lärde du dig i banan.',
          'Du kan inte veta vilka andra egenskaper spelaren har, så de kan inte skrivas ut en och en.',
        ],
        solution: `function createPlayer(name, ...scores) {
  return {
    name,
    scores,
    best: Math.max(0, ...scores),
  };
}

function addScore(player, score) {
  return {
    ...player,
    scores: [...player.scores, score],
    best: Math.max(player.best, score),
  };
}

function publicProfile(player) {
  const { scores, ...rest } = player;
  const sum = scores.reduce((total, score) => total + score, 0);
  return {
    ...rest,
    games: scores.length,
    average: scores.length === 0 ? 0 : Math.round(sum / scores.length),
  };
}`,
        tests: [
          {
            description: 'Profilen har games och average men inte scores',
            code: "(() => { const p = publicProfile({ name: 'Ada', scores: [40, 75, 60], best: 75 }); return [p.name, p.best, p.games, p.average, 'scores' in p]; })()",
            expected: ['Ada', 75, 3, 58, false],
          },
          {
            description: 'Okända egenskaper följer med',
            code: "(() => { const p = publicProfile({ name: 'Bo', clan: 'Vargarna', level: 7, scores: [], best: 0 }); return [p.clan, p.level, 'scores' in p]; })()",
            expected: ['Vargarna', 7, false],
          },
          {
            description: 'En spelare utan matcher har snittet 0',
            code: "publicProfile({ name: 'Bo', scores: [], best: 0 }).average",
            expected: 0,
          },
          {
            description: 'Spelaren ändras inte',
            code: "(() => { const p = { name: 'Ada', scores: [1], best: 1 }; publicProfile(p); return Object.keys(p); })()",
            expected: ['name', 'scores', 'best'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-poll',
    track: 'immutable',
    title: 'Omröstningen',
    reward: { emoji: '🗳️', name: 'Valurna' },
    summary: 'Räkna röster, visa resultatet sorterat och kora en vinnare.',
    steps: [
      {
        title: 'Rösta',
        why: 'Ett objekt passar när du slår upp saker med namn: votes.tacos. Hade rösterna legat i en array hade du fått leta igenom den varje gång. Fråga dig: letar jag med ett namn? Då är ett objekt ofta bättre än en array.',
        xp: 25,
        description:
          'Klassen röstar om vad det ska bli på fredagsfikat. Rösterna sparas i ett objekt där varje alternativ är en nyckel: { pizza: 3, tacos: 5 }.',
        task: 'Uppgift: Skriv `vote(votes, option)` som returnerar ett nytt objekt där option har fått en röst till. Ett alternativ som inte fanns förut får sin första röst. votes får inte ändras.',
        starterCode: '// Steg 1: lägg en röst\n',
        hints: [
          'Nyckeln står i en variabel. Hur skriver man en nyckel som räknas ut?',
          'Ett alternativ som saknas har 0 röster. Vilken operator ger ett reservvärde?',
        ],
        solution: `function vote(votes, option) {
  return { ...votes, [option]: (votes[option] ?? 0) + 1 };
}`,
        tests: [
          {
            description: 'Ett befintligt alternativ får en röst till',
            code: "vote({ pizza: 3, tacos: 5 }, 'tacos').tacos",
            expected: 6,
          },
          {
            description: 'Ett nytt alternativ får 1 röst',
            code: "vote({ pizza: 3 }, 'sushi').sushi",
            expected: 1,
          },
          {
            description: 'De andra alternativen är kvar',
            code: "vote({ pizza: 3 }, 'sushi').pizza",
            expected: 3,
          },
          {
            description: 'votes ändras inte',
            code: "(() => { const v = { pizza: 3 }; vote(v, 'pizza'); vote(v, 'sushi'); return [v.pizza, 'sushi' in v]; })()",
            expected: [3, false],
          },
        ],
      },
      {
        title: 'Resultatet',
        xp: 25,
        description:
          'Resultatet ska visas som en lista, med flest röster först. a.localeCompare(b) jämför två texter i bokstavsordning och fungerar i en sorteringsfunktion.',
        task: `Uppgift: Skriv \`results(votes)\` som returnerar en array med rader som "tacos: 5 röster (50 %)".
  - Flest röster först. Vid lika kommer alternativen i bokstavsordning.
  - Procenten avrundas med Math.round.
  - Ett alternativ med en enda röst skrivs "1 röst".
  - votes får inte ändras.`,
        hints: [
          'Gör först om objektet till något som går att sortera.',
          'En sorteringsfunktion kan jämföra en sak först och bara gå vidare till nästa när den första är lika.',
        ],
        solution: `function vote(votes, option) {
  return { ...votes, [option]: (votes[option] ?? 0) + 1 };
}

function results(votes) {
  const entries = Object.entries(votes);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);
  return entries
    .toSorted(([nameA, a], [nameB, b]) => b - a || nameA.localeCompare(nameB))
    .map(([name, count]) => {
      const word = count === 1 ? 'röst' : 'röster';
      const share = Math.round((count / total) * 100);
      return \`\${name}: \${count} \${word} (\${share} %)\`;
    });
}`,
        tests: [
          {
            description: 'Flest röster först, med procent',
            code: 'results({ pizza: 3, tacos: 5, sushi: 2 })',
            expected: [
              'tacos: 5 röster (50 %)',
              'pizza: 3 röster (30 %)',
              'sushi: 2 röster (20 %)',
            ],
          },
          {
            description:
              'Lika många röster ger bokstavsordning, och 1 röst skrivs i singular',
            code: 'results({ våfflor: 1, bullar: 1, glass: 2 })',
            expected: [
              'glass: 2 röster (50 %)',
              'bullar: 1 röst (25 %)',
              'våfflor: 1 röst (25 %)',
            ],
          },
          {
            description: 'Procenten avrundas',
            code: 'results({ a: 1, b: 2 })',
            expected: ['b: 2 röster (67 %)', 'a: 1 röst (33 %)'],
          },
          {
            description: 'Inga röster ger en tom lista',
            code: 'results({})',
            expected: [],
          },
        ],
      },
      {
        title: 'Vinnaren',
        xp: 40,
        description:
          'Sist ska appen säga vad det blir. Ibland blir det oavgjort.',
        task: `Uppgift: Skriv \`winner(votes)\` som returnerar:
  - Namnet på alternativet med flest röster, till exempel "tacos".
  - "Oavgjort: bullar, glass" om flera delar på förstaplatsen, i bokstavsordning.
  - "Inga röster" om ingen har röstat.`,
        hints: [
          'Ta reda på det högsta antalet röster först.',
          'Hur många alternativ har just det antalet?',
        ],
        solution: `function vote(votes, option) {
  return { ...votes, [option]: (votes[option] ?? 0) + 1 };
}

function results(votes) {
  const entries = Object.entries(votes);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);
  return entries
    .toSorted(([nameA, a], [nameB, b]) => b - a || nameA.localeCompare(nameB))
    .map(([name, count]) => {
      const word = count === 1 ? 'röst' : 'röster';
      const share = Math.round((count / total) * 100);
      return \`\${name}: \${count} \${word} (\${share} %)\`;
    });
}

function winner(votes) {
  const entries = Object.entries(votes);
  if (entries.length === 0) {
    return 'Inga röster';
  }
  const top = Math.max(...entries.map(([, count]) => count));
  const leaders = entries
    .filter(([, count]) => count === top)
    .map(([name]) => name)
    .toSorted((a, b) => a.localeCompare(b));
  return leaders.length === 1 ? leaders[0] : \`Oavgjort: \${leaders.join(', ')}\`;
}`,
        tests: [
          {
            description: 'En klar vinnare',
            code: 'winner({ pizza: 3, tacos: 5 })',
            expected: 'tacos',
          },
          {
            description: 'Oavgjort i bokstavsordning',
            code: 'winner({ glass: 4, bullar: 4, pizza: 1 })',
            expected: 'Oavgjort: bullar, glass',
          },
          {
            description: 'Inga röster',
            code: 'winner({})',
            expected: 'Inga röster',
          },
          {
            description: 'Fungerar ihop med vote',
            code: "winner(vote(vote(vote({}, 'te'), 'kaffe'), 'kaffe'))",
            expected: 'kaffe',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-library',
    track: 'immutable',
    title: 'Biblioteket',
    reward: { emoji: '📚', name: 'Bokhylla' },
    summary: 'Sortera böcker, låna ut dem och se vem som har vad.',
    steps: [
      {
        title: 'Sortera hyllan',
        xp: 25,
        description:
          'Du bygger systemet till skolbiblioteket. En bok är { id, title, year }. Boklistan delas av flera vyer i appen, så den får aldrig ändras. a.localeCompare(b, "sv") jämför två texter i svensk bokstavsordning, med Å, Ä och Ö sist.',
        task: 'Uppgift: Skriv `sortBooks(books, by)` som returnerar böckerna sorterade efter title i bokstavsordning när by är "title", och efter year med äldst först när by är "year". books får inte ändras.',
        starterCode: '// Steg 1: sortera böckerna\n',
        hints: [
          'Det finns en sorteringsmetod som inte ändrar originalet.',
          'En sorteringsfunktion för tal kan returnera skillnaden mellan dem.',
        ],
        solution: `function sortBooks(books, by) {
  if (by === 'year') {
    return books.toSorted((a, b) => a.year - b.year);
  }
  return books.toSorted((a, b) => a.title.localeCompare(b.title, 'sv'));
}`,
        tests: [
          {
            description: 'Sorterar efter titel, med Ö sist',
            code: "sortBooks([{ id: 1, title: 'Ödlan', year: 2001 }, { id: 2, title: 'Bröderna Lejonhjärta', year: 1973 }, { id: 3, title: 'Alfons', year: 1972 }], 'title').map(book => book.id)",
            expected: [3, 2, 1],
          },
          {
            description: 'Sorterar efter år, äldst först',
            code: "sortBooks([{ id: 1, title: 'Ödlan', year: 2001 }, { id: 2, title: 'Bröderna Lejonhjärta', year: 1973 }, { id: 3, title: 'Alfons', year: 1972 }], 'year').map(book => book.year)",
            expected: [1972, 1973, 2001],
          },
          {
            description: 'books ändras inte',
            code: "(() => { const books = [{ id: 1, title: 'B', year: 2 }, { id: 2, title: 'A', year: 1 }]; sortBooks(books, 'title'); sortBooks(books, 'year'); return books.map(book => book.id); })()",
            expected: [1, 2],
          },
        ],
      },
      {
        title: 'Låna och lämna',
        why: 'Utlånen ligger i ett objekt med bokens id som nyckel, så att du direkt kan se om en bok är utlånad: loans[3]. Böckerna ligger i en array, eftersom de visas i en ordning. Samma data kan förtjäna olika former beroende på vad du ska göra med den.',
        xp: 25,
        description:
          'Utlånen sparas i ett objekt där nyckeln är bokens id och värdet är namnet på den som lånat: { 2: "Ada" }. Object.fromEntries(entries) gör om en array med [nyckel, värde]-par till ett objekt, alltså motsatsen till Object.entries.',
        task: `Uppgift:
  - Skriv \`lend(loans, bookId, name)\` som returnerar nya utlån där boken är utlånad till name. Är boken redan utlånad returneras loans som det är.
  - Skriv \`giveBack(loans, bookId)\` som returnerar nya utlån utan boken.
  - loans får aldrig ändras.`,
        hints: [
          'Nyckeln står i en variabel. Hur skriver man en nyckel som räknas ut?',
          'Att ta bort en nyckel utan delete: gör om till en lista, filtrera, och gör om tillbaka.',
        ],
        solution: `function sortBooks(books, by) {
  if (by === 'year') {
    return books.toSorted((a, b) => a.year - b.year);
  }
  return books.toSorted((a, b) => a.title.localeCompare(b.title, 'sv'));
}

function lend(loans, bookId, name) {
  if (loans[bookId] !== undefined) {
    return loans;
  }
  return { ...loans, [bookId]: name };
}

function giveBack(loans, bookId) {
  return Object.fromEntries(
    Object.entries(loans).filter(([id]) => id !== String(bookId)),
  );
}`,
        tests: [
          {
            description: 'lend lånar ut boken',
            code: "lend({}, 3, 'Ada')[3]",
            expected: 'Ada',
          },
          {
            description: 'En bok som redan är utlånad lånas inte ut igen',
            code: "(() => { const loans = { 3: 'Ada' }; return lend(loans, 3, 'Bo') === loans; })()",
            expected: true,
          },
          {
            description: 'giveBack tar bort boken och behåller de andra',
            code: "(() => { const next = giveBack({ 3: 'Ada', 5: 'Bo' }, 3); return [3 in next, next[5]]; })()",
            expected: [false, 'Bo'],
          },
          {
            description: 'loans ändras aldrig',
            code: "(() => { const loans = { 3: 'Ada' }; lend(loans, 4, 'Bo'); giveBack(loans, 3); return Object.keys(loans); })()",
            expected: ['3'],
          },
        ],
        sourceChecks: [
          {
            description: 'Inget delete',
            pattern: /\bdelete\s/,
            forbidden: true,
          },
        ],
      },
      {
        title: 'Vem har vad?',
        xp: 40,
        description:
          'Bibliotekarien vill se alla utlån på en lista, sorterade efter den som lånat.',
        task: `Uppgift: Skriv \`loanReport(books, loans)\` som returnerar en array med rader som "Ada har Bröderna Lejonhjärta".
  - Raderna sorteras efter namnet på den som lånat, i bokstavsordning. Har någon lånat flera böcker sorteras de efter titel.
  - Ett utlån av en bok som inte finns i books visas som "Bo har en okänd bok".
  - Inga utlån ger ["Inga utlånade böcker"].`,
        hints: [
          'Nycklarna i loans är text, men id i böckerna är tal.',
          'Bygg ett objekt för varje utlån med namn och titel, och sortera dem innan du gör texten.',
        ],
        solution: `function sortBooks(books, by) {
  if (by === 'year') {
    return books.toSorted((a, b) => a.year - b.year);
  }
  return books.toSorted((a, b) => a.title.localeCompare(b.title, 'sv'));
}

function lend(loans, bookId, name) {
  if (loans[bookId] !== undefined) {
    return loans;
  }
  return { ...loans, [bookId]: name };
}

function giveBack(loans, bookId) {
  return Object.fromEntries(
    Object.entries(loans).filter(([id]) => id !== String(bookId)),
  );
}

function loanReport(books, loans) {
  const rows = Object.entries(loans).map(([id, name]) => {
    const book = books.find(item => String(item.id) === id);
    return { name, title: book?.title };
  });
  if (rows.length === 0) {
    return ['Inga utlånade böcker'];
  }
  return rows
    .toSorted(
      (a, b) =>
        a.name.localeCompare(b.name, 'sv') ||
        (a.title ?? '').localeCompare(b.title ?? '', 'sv'),
    )
    .map(({ name, title }) =>
      title ? \`\${name} har \${title}\` : \`\${name} har en okänd bok\`,
    );
}`,
        tests: [
          {
            description: 'Sorterar efter den som lånat och sedan efter titel',
            code: "loanReport([{ id: 1, title: 'Ödlan' }, { id: 2, title: 'Alfons' }, { id: 3, title: 'Mio' }], { 1: 'Ada', 2: 'Cy', 3: 'Ada' })",
            expected: ['Ada har Mio', 'Ada har Ödlan', 'Cy har Alfons'],
          },
          {
            description: 'En bok som saknas visas som okänd',
            code: "loanReport([{ id: 1, title: 'Mio' }], { 9: 'Bo' })",
            expected: ['Bo har en okänd bok'],
          },
          {
            description: 'Inga utlån',
            code: "loanReport([{ id: 1, title: 'Mio' }], {})",
            expected: ['Inga utlånade böcker'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-undo',
    track: 'immutable',
    title: 'Ångra-knappen',
    reward: { emoji: '🧽', name: 'Suddgummi' },
    summary: 'Bygg ångra och gör om med en closure som minns historiken.',
    steps: [
      {
        title: 'Historiken',
        xp: 25,
        description:
          'Du bygger ångra-knappen till ett ritprogram. Varje ändring sparas, så att man kan gå tillbaka. Historiken ska leva inne i en closure, så att ingen utanför kan röra den.',
        task: `Uppgift: Skriv \`createHistory(initial)\` som returnerar ett objekt med tre funktioner:
  - current() returnerar det nuvarande värdet, från början initial.
  - push(value) gör value till det nuvarande värdet.
  - undo() går tillbaka till värdet innan. Längre tillbaka än initial går det inte.`,
        starterCode: '// Steg 1: en historik med ångra\n',
        hints: [
          'Vilka variabler behöver funktionerna dela, och var ska de skapas för att bara de ska nå dem?',
          'En lista med alla värden och en plats i listan räcker långt.',
        ],
        solution: `function createHistory(initial) {
  let past = [initial];
  return {
    current: () => past.at(-1),
    push: value => {
      past = [...past, value];
    },
    undo: () => {
      if (past.length > 1) {
        past = past.slice(0, -1);
      }
    },
  };
}`,
        tests: [
          {
            description: 'current() ger initial från början',
            code: "createHistory('tomt').current()",
            expected: 'tomt',
          },
          {
            description: 'push byter det nuvarande värdet',
            code: '(() => { const h = createHistory(0); h.push(1); h.push(2); return h.current(); })()',
            expected: 2,
          },
          {
            description: 'undo går tillbaka ett steg i taget',
            code: '(() => { const h = createHistory(0); h.push(1); h.push(2); h.undo(); const a = h.current(); h.undo(); return [a, h.current()]; })()',
            expected: [1, 0],
          },
          {
            description: 'undo går inte längre tillbaka än initial',
            code: "(() => { const h = createHistory('start'); h.push('a'); h.undo(); h.undo(); h.undo(); return h.current(); })()",
            expected: 'start',
          },
          {
            description: 'Två historiker påverkar inte varandra',
            code: '(() => { const a = createHistory(1); const b = createHistory(10); a.push(2); return [a.current(), b.current()]; })()',
            expected: [2, 10],
          },
        ],
      },
      {
        title: 'Gör om',
        xp: 25,
        description:
          'En ångra-knapp behöver en gör om-knapp. Och knapparna ska vara gråa när de inte går att använda.',
        task: `Uppgift: Bygg ut historiken med:
  - redo() som gör om det man senast ångrade.
  - canUndo() och canRedo() som returnerar true eller false.
  - Gör man push efter att ha ångrat försvinner det som gick att göra om, som i alla ritprogram.`,
        hints: [
          'Det som ångras måste sparas någonstans, så att det går att hämta tillbaka.',
          'push är det enda som tömmer gör om-listan.',
        ],
        solution: `function createHistory(initial) {
  let past = [initial];
  let future = [];
  return {
    current: () => past.at(-1),
    push: value => {
      past = [...past, value];
      future = [];
    },
    undo: () => {
      if (past.length > 1) {
        future = [past.at(-1), ...future];
        past = past.slice(0, -1);
      }
    },
    redo: () => {
      if (future.length > 0) {
        past = [...past, future[0]];
        future = future.slice(1);
      }
    },
    canUndo: () => past.length > 1,
    canRedo: () => future.length > 0,
  };
}`,
        tests: [
          {
            description: 'redo gör om det som ångrades',
            code: '(() => { const h = createHistory(0); h.push(1); h.push(2); h.undo(); h.undo(); h.redo(); return h.current(); })()',
            expected: 1,
          },
          {
            description: 'redo gör ingenting när inget har ångrats',
            code: '(() => { const h = createHistory(0); h.push(1); h.redo(); return h.current(); })()',
            expected: 1,
          },
          {
            description: 'canUndo och canRedo stämmer',
            code: '(() => { const h = createHistory(0); const start = [h.canUndo(), h.canRedo()]; h.push(1); h.undo(); return [...start, h.canUndo(), h.canRedo()]; })()',
            expected: [false, false, false, true],
          },
          {
            description: 'push efter undo tömmer det som gick att göra om',
            code: '(() => { const h = createHistory(0); h.push(1); h.undo(); h.push(5); h.redo(); return [h.current(), h.canRedo()]; })()',
            expected: [5, false],
          },
        ],
      },
      {
        title: 'Ritprogrammet',
        why: 'Ångra fungerar bara om gamla värden aldrig ändras. Därför skapar addShape alltid en ny teckning. Det är samma skäl som gör att React vill ha nya objekt i state.',
        xp: 40,
        description:
          'Nu kopplar du historiken till själva ritprogrammet. En teckning är ett objekt: { color, shapes }, där shapes är en array. Det är samma idé som när React får en funktion till setState.',
        task: `Uppgift: Bygg ut historiken med update(change), där change är en funktion som får det nuvarande värdet och returnerar nästa. Nästa värde läggs till som med push.
Skriv sedan två sådana funktioner för teckningar, som inte får ändra teckningen de får in:
  - \`addShape(shape)\` returnerar en funktion som lägger till shape sist i shapes.
  - \`setColor(color)\` returnerar en funktion som byter color.`,
        hints: [
          'addShape och setColor returnerar en funktion som minns shape eller color: en closure till.',
          'Om en tidigare teckning ändras på plats förstör det historiken. Varför?',
        ],
        solution: `function createHistory(initial) {
  let past = [initial];
  let future = [];
  const push = value => {
    past = [...past, value];
    future = [];
  };
  return {
    current: () => past.at(-1),
    push,
    update: change => push(change(past.at(-1))),
    undo: () => {
      if (past.length > 1) {
        future = [past.at(-1), ...future];
        past = past.slice(0, -1);
      }
    },
    redo: () => {
      if (future.length > 0) {
        past = [...past, future[0]];
        future = future.slice(1);
      }
    },
    canUndo: () => past.length > 1,
    canRedo: () => future.length > 0,
  };
}

function addShape(shape) {
  return drawing => ({ ...drawing, shapes: [...drawing.shapes, shape] });
}

function setColor(color) {
  return drawing => ({ ...drawing, color });
}`,
        tests: [
          {
            description: 'update använder funktionen på det nuvarande värdet',
            code: '(() => { const h = createHistory(1); h.update(n => n * 10); h.update(n => n + 5); return h.current(); })()',
            expected: 15,
          },
          {
            description: 'addShape och setColor fungerar med update',
            code: "(() => { const h = createHistory({ color: 'svart', shapes: [] }); h.update(addShape('cirkel')); h.update(setColor('röd')); h.update(addShape('fyrkant')); const d = h.current(); return [d.color, d.shapes]; })()",
            expected: ['röd', ['cirkel', 'fyrkant']],
          },
          {
            description: 'undo ger tillbaka teckningen som den var',
            code: "(() => { const h = createHistory({ color: 'svart', shapes: [] }); h.update(addShape('cirkel')); h.update(addShape('fyrkant')); h.undo(); return h.current().shapes; })()",
            expected: ['cirkel'],
          },
          {
            description: 'Teckningen som skickas in ändras inte',
            code: "(() => { const d = { color: 'svart', shapes: ['linje'] }; addShape('cirkel')(d); setColor('röd')(d); return [d.color, d.shapes.length]; })()",
            expected: ['svart', 1],
          },
        ],
      },
    ],
  },
];

// Stegen som vanliga övningar, så att samma editor och rättning kan
// användas. Ett steg utan egen startkod börjar med förra stegets lösning.
export const projectSteps = stepsFor(projects, text => `// ${text}`);
