// Bana 9: moduler – färdig kod som hämtas med import: random, math och
// datetime. Slumpen rättas med många anrop i testerna, t.ex. att alla sex
// sidor på tärningen kommer upp, eftersom svaret är olika varje gång.
export const MODULER = [
  {
    id: 'mod-01',
    track: 'moduler',
    title: 'Slå en tärning: import random',
    xp: 10,
    description:
      'Python har massor av färdig kod som ligger i moduler. Du hämtar en modul med import och använder sedan det som finns i den.',
    explain:
      '`import random` högst upp hämtar modulen random. Sedan skriver du modulens namn, en punkt och det du vill använda: `random.randint(1, 6)` ger ett slumpat heltal från 1 till och med 6.\n\nTill skillnad från `range` är båda talen med. Svaret blir olika varje gång du kör koden – det är hela poängen.',
    example: 'import random\n\ntal = random.randint(1, 100)\nprint(tal)',
    task: 'Uppgift: Tärningen fuskar och ger alltid 6. Hämta random och låt `kasta()` returnera ett slumpat tal från 1 till 6.',
    starterCode: 'def kasta():\n    return 6\n',
    solution:
      'import random\n\n\ndef kasta():\n    return random.randint(1, 6)\n',
    hints: [
      'Skriv import random på första raden.',
      'random.randint(1, 6) ger ett tal från 1 till och med 6.',
      'I funktionen: return random.randint(1, 6)',
    ],
    tests: [
      {
        description: 'kasta() ger ett tal från 1 till 6',
        code: 'kasta() in [1, 2, 3, 4, 5, 6]',
        expected: true,
      },
      {
        description: 'Inget av 300 kast hamnar utanför 1 till 6',
        code: 'all(1 <= kasta() <= 6 for _ in range(300))',
        expected: true,
      },
      {
        description: 'Alla sex sidor kommer upp på 300 kast',
        code: 'sorted(set(kasta() for _ in range(300)))',
        expected: [1, 2, 3, 4, 5, 6],
      },
    ],
    sourceChecks: [
      { description: 'Hämtar random', pattern: /^import\s+random\b/m },
      { description: 'Använder random.randint', pattern: /random\.randint\(/ },
    ],
  },
  {
    id: 'mod-02',
    track: 'moduler',
    title: 'Dra en lapp: random.choice',
    xp: 10,
    description:
      'random.choice väljer en sak ur en lista, på måfå. Bra för lottning, frågesporter och spel.',
    explain:
      '`random.choice(lista)` ger en slumpad sak ur listan. Varje sak har lika stor chans.\n\nListan får inte vara tom – då finns inget att välja, och det blir IndexError.',
    example:
      'import random\n\nsvar = ["Ja", "Nej", "Kanske"]\nprint(random.choice(svar))',
    task: 'Uppgift: Skapa `dra_lapp(lappar)` som returnerar en slumpad lapp ur listan.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'import random\n\n\ndef dra_lapp(lappar):\n    return random.choice(lappar)\n',
    hints: [
      'Börja med import random.',
      'random.choice(lappar) ger en av lapparna.',
      'def dra_lapp(lappar):\n    return random.choice(lappar)',
    ],
    tests: [
      {
        description: 'dra_lapp(["Ada"]) är Ada',
        code: 'dra_lapp(["Ada"])',
        expected: 'Ada',
      },
      {
        description: 'Alla tre lapparna dras någon gång',
        code: 'sorted(set(dra_lapp(["Ada", "Bo", "Cy"]) for _ in range(200)))',
        expected: ['Ada', 'Bo', 'Cy'],
      },
    ],
    sourceChecks: [
      { description: 'Använder random.choice', pattern: /random\.choice\(/ },
    ],
  },
  {
    id: 'mod-03',
    track: 'moduler',
    title: 'Blanda korten: random.shuffle',
    xp: 10,
    description:
      'random.shuffle blandar en lista. Den har en fälla: den ändrar listan du skickar in och ger tillbaka None.',
    explain:
      '`random.shuffle(lista)` blandar listan *på plats*, alltså själva listan du skickar in. Den returnerar ingenting, så `ny = random.shuffle(kort)` gör `ny` till None.\n\nVill du behålla originalet gör du en kopia först med `kort.copy()` och blandar kopian.',
    example:
      'import random\n\nkort = ["A", "K", "D"]\nblandade = kort.copy()\nrandom.shuffle(blandade)\nprint(blandade)\nprint(kort)',
    task: 'Uppgift: `blanda(kort)` ger None och förstör dessutom `lek`. Låt den blanda en kopia och returnera kopian, så att `lek` är oförändrad.',
    starterCode:
      'import random\n\n\ndef blanda(kort):\n    return random.shuffle(kort)\n\n\nlek = [1, 2, 3, 4, 5]\nprint(blanda(lek))\nprint(lek)\n',
    solution:
      'import random\n\n\ndef blanda(kort):\n    ny = kort.copy()\n    random.shuffle(ny)\n    return ny\n\n\nlek = [1, 2, 3, 4, 5]\nprint(blanda(lek))\nprint(lek)\n',
    hints: [
      'Gör en kopia: ny = kort.copy()',
      'Blanda kopian med random.shuffle(ny) på en egen rad.',
      'Returnera ny, inte det random.shuffle ger.',
    ],
    tests: [
      {
        description: 'blanda ger samma kort, i någon ordning',
        code: 'sorted(blanda([5, 3, 1, 4, 2]))',
        expected: [1, 2, 3, 4, 5],
      },
      {
        description: 'Ordningen blir olika olika gånger',
        code: 'len(set(tuple(blanda(lek)) for _ in range(30))) > 1',
        expected: true,
      },
      {
        description: 'lek är oförändrad efteråt',
        code: 'lek',
        expected: [1, 2, 3, 4, 5],
      },
    ],
    sourceChecks: [
      { description: 'Använder random.shuffle', pattern: /random\.shuffle\(/ },
    ],
  },
  {
    id: 'mod-04',
    track: 'moduler',
    title: 'Roten ur: import math',
    xp: 10,
    description:
      'Modulen math har det som finns på en miniräknare: roten ur, pi och mer.',
    explain:
      '`import math` och sedan `math.sqrt(25)` ger roten ur, 5.0. Svaret är alltid ett decimaltal. `math.pi` är talet pi, utan parenteser eftersom det är ett värde och inte en funktion.\n\nRoten ur behövs t.ex. för att räkna ut diagonalen i en rektangel: roten ur (bredd · bredd + höjd · höjd).',
    example: 'import math\n\nprint(math.sqrt(16))\nprint(math.pi)',
    task: 'Uppgift: Skapa `diagonal(bredd, hojd)` som returnerar diagonalen i en skärm, avrundad till en decimal med `round(…, 1)`.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'import math\n\n\ndef diagonal(bredd, hojd):\n    return round(math.sqrt(bredd * bredd + hojd * hojd), 1)\n',
    hints: [
      'Börja med import math.',
      'Inuti roten: bredd * bredd + hojd * hojd',
      'return round(math.sqrt(…), 1)',
    ],
    tests: [
      {
        description: 'diagonal(3, 4) är 5.0',
        code: 'diagonal(3, 4)',
        expected: 5.0,
      },
      {
        description: 'diagonal(80, 45) är 91.8',
        code: 'diagonal(80, 45)',
        expected: 91.8,
      },
    ],
    sourceChecks: [
      { description: 'Använder math.sqrt', pattern: /math\.sqrt\(/ },
    ],
  },
  {
    id: 'mod-05',
    track: 'moduler',
    title: 'Avrunda uppåt: math.ceil',
    xp: 10,
    description:
      'Ibland ska man alltid avrunda uppåt: blir det en person över behövs en buss till.',
    explain:
      '`math.ceil(2.1)` avrundar uppåt till 3. `math.floor(2.9)` avrundar nedåt till 2. Båda ger ett heltal.\n\n`round` avrundar till närmaste, och `//` kastar bort det som blir över – ingen av dem räcker när resten också måste få plats.',
    example: 'import math\n\nprint(math.ceil(7 / 3))\nprint(math.floor(7 / 3))',
    task: 'Uppgift: `bussar(personer, platser)` glömmer dem som blir över. Gör så att den räknar ut hur många bussar som behövs, med `math.ceil`.',
    starterCode:
      'def bussar(personer, platser):\n    return personer // platser\n',
    solution:
      'import math\n\n\ndef bussar(personer, platser):\n    return math.ceil(personer / platser)\n',
    hints: [
      'Byt // mot / så att du får ett decimaltal.',
      'math.ceil avrundar det uppåt.',
      'Glöm inte import math överst.',
    ],
    tests: [
      {
        description: 'bussar(100, 50) är 2',
        code: 'bussar(100, 50)',
        expected: 2,
      },
      {
        description: 'bussar(101, 50) är 3',
        code: 'bussar(101, 50)',
        expected: 3,
      },
      {
        description: 'bussar(1, 50) är 1',
        code: 'bussar(1, 50)',
        expected: 1,
      },
    ],
    sourceChecks: [
      { description: 'Använder math.ceil', pattern: /math\.ceil\(/ },
    ],
  },
  {
    id: 'mod-06',
    track: 'moduler',
    title: 'Hämta bara det du behöver: from … import',
    xp: 10,
    description:
      'Med from hämtar du en sak ur en modul och slipper skriva modulens namn varje gång.',
    explain:
      '`from math import pi` hämtar bara pi. Sedan skriver du `pi` i stället för `math.pi`. Flera saker skiljs med komma: `from math import pi, sqrt`.\n\nBåda sätten är rätt. `import math` gör det tydligt var saker kommer ifrån; `from` är kortare när du använder samma sak många gånger.',
    example: 'from math import pi, sqrt\n\nprint(pi)\nprint(sqrt(9))',
    task: 'Uppgift: Hämta pi med `from math import pi` och skriv `pi` i stället för `math.pi`. Lägg sedan till `omkrets(radie)` som returnerar `2 * pi * radie`, avrundat till en decimal.',
    starterCode:
      'import math\n\n\ndef cirkel_yta(radie):\n    return round(math.pi * radie * radie, 1)\n',
    solution:
      'from math import pi\n\n\ndef cirkel_yta(radie):\n    return round(pi * radie * radie, 1)\n\n\ndef omkrets(radie):\n    return round(2 * pi * radie, 1)\n',
    hints: [
      'Byt första raden mot from math import pi.',
      'Ta bort math. framför pi.',
      'def omkrets(radie):\n    return round(2 * pi * radie, 1)',
    ],
    tests: [
      {
        description: 'cirkel_yta(10) är 314.2',
        code: 'cirkel_yta(10)',
        expected: 314.2,
      },
      {
        description: 'omkrets(10) är 62.8',
        code: 'omkrets(10)',
        expected: 62.8,
      },
    ],
    sourceChecks: [
      { description: 'Hämtar pi med from', pattern: /from\s+math\s+import/ },
      {
        description: 'Skriver pi utan math. framför',
        pattern: /math\./,
        forbidden: true,
      },
    ],
  },
  {
    id: 'mod-07',
    track: 'moduler',
    title: 'Datum: from datetime import date',
    xp: 10,
    description:
      'Modulen datetime håller reda på datum, så att du slipper räkna med månader och skottår själv.',
    explain:
      '`date(2026, 12, 24)` är julafton 2026: år, månad, dag. Drar du ett datum från ett annat får du en tidsrymd, och `.days` på den ger antalet dagar.\n\nPython vet hur många dagar varje månad har och vilka år som är skottår.',
    example:
      'from datetime import date\n\nidag = date(2026, 10, 31)\njul = date(2026, 12, 24)\nprint((jul - idag).days)',
    task: 'Uppgift: Skapa `dagar_mellan(fran, till)` som returnerar hur många dagar det är mellan två datum.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'from datetime import date\n\n\ndef dagar_mellan(fran, till):\n    return (till - fran).days\n',
    hints: [
      'Börja med from datetime import date.',
      'till - fran ger en tidsrymd.',
      'return (till - fran).days',
    ],
    tests: [
      {
        description: '31 oktober till julafton är 54 dagar',
        code: 'dagar_mellan(date(2026, 10, 31), date(2026, 12, 24))',
        expected: 54,
      },
      {
        description: 'Ett helt år 2026 är 365 dagar',
        code: 'dagar_mellan(date(2026, 1, 1), date(2027, 1, 1))',
        expected: 365,
      },
      {
        description: 'Skottåret 2028 är 366 dagar',
        code: 'dagar_mellan(date(2028, 1, 1), date(2029, 1, 1))',
        expected: 366,
      },
    ],
    sourceChecks: [
      {
        description: 'Hämtar date ur datetime',
        pattern: /from\s+datetime\s+import\s+.*\bdate\b/,
      },
    ],
  },
  {
    id: 'mod-08',
    track: 'moduler',
    title: 'Vilken veckodag?',
    xp: 10,
    description:
      'Ett datum vet vilken veckodag det är. Med en lista får du namnet på svenska.',
    explain:
      '`datum.weekday()` ger 0 för måndag, 1 för tisdag och så vidare till 6 för söndag. Talet passar som index i en lista med dagarnas namn.\n\nEtt datum har också `datum.year`, `datum.month` och `datum.day`, utan parenteser.',
    example:
      'from datetime import date\n\njul = date(2026, 12, 24)\nprint(jul.weekday())\nprint(jul.month)',
    task: 'Uppgift: Skapa `veckodag(datum)` som returnerar veckodagens namn på svenska, med liten bokstav.',
    starterCode:
      'from datetime import date\n\nDAGAR = ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag", "söndag"]\n',
    solution:
      'from datetime import date\n\nDAGAR = ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag", "söndag"]\n\n\ndef veckodag(datum):\n    return DAGAR[datum.weekday()]\n',
    hints: [
      'datum.weekday() ger ett tal från 0 till 6.',
      'Använd talet som index i DAGAR.',
      'return DAGAR[datum.weekday()]',
    ],
    tests: [
      {
        description: 'Julafton 2026 är en torsdag',
        code: 'veckodag(date(2026, 12, 24))',
        expected: 'torsdag',
      },
      {
        description: '31 oktober 2026 är en lördag',
        code: 'veckodag(date(2026, 10, 31))',
        expected: 'lördag',
      },
      {
        description: '1 juni 2027 är en tisdag',
        code: 'veckodag(date(2027, 6, 1))',
        expected: 'tisdag',
      },
    ],
    sourceChecks: [
      { description: 'Använder weekday()', pattern: /\.weekday\(\)/ },
    ],
  },
  {
    id: 'mod-09',
    track: 'moduler',
    title: 'Om tre veckor: timedelta',
    xp: 10,
    description:
      'timedelta är en tidsrymd, t.ex. 21 dagar. Lägg den till ett datum så får du ett nytt datum.',
    explain:
      '`timedelta(days=21)` är 21 dagar. `datum + timedelta(days=21)` ger datumet tre veckor senare – även när det går över ett månads- eller årsskifte.\n\n`str(datum)` ger datumet som text, t.ex. `2026-11-21`.',
    example:
      'from datetime import date, timedelta\n\nidag = date(2026, 10, 31)\nprint(idag + timedelta(days=7))',
    task: 'Uppgift: Böcker på biblioteket lånas i 21 dagar. Skapa `aterlamning(lanad)` som returnerar datumet då boken ska vara tillbaka.',
    starterCode: 'from datetime import date\n',
    solution:
      'from datetime import date, timedelta\n\n\ndef aterlamning(lanad):\n    return lanad + timedelta(days=21)\n',
    hints: [
      'Hämta timedelta också: from datetime import date, timedelta',
      'timedelta(days=21) är tre veckor.',
      'return lanad + timedelta(days=21)',
    ],
    tests: [
      {
        description: 'Lånad 31 oktober, tillbaka 2026-11-21',
        code: 'str(aterlamning(date(2026, 10, 31)))',
        expected: '2026-11-21',
      },
      {
        description: 'Lånad 20 december, tillbaka 2027-01-10',
        code: 'str(aterlamning(date(2026, 12, 20)))',
        expected: '2027-01-10',
      },
    ],
    sourceChecks: [{ description: 'Använder timedelta', pattern: /timedelta/ }],
  },
];
