// Bana 3: listor. Inga funktioner än (bana 4) och inga f-strängar
// (bana 5), så text sätts fortfarande ihop med + och str().
export const LISTOR = [
  {
    id: 'listor-01',
    track: 'listor',
    title: 'Din första lista',
    xp: 10,
    description:
      'En lista sparar många värden i en enda variabel, i en bestämd ordning.',
    explain:
      'En lista skrivs med hakparenteser och kommatecken mellan sakerna: `["äpple", "banan"]`. Den kan innehålla text, tal eller en blandning.\n\nDu tar till en lista när du har flera saker av samma sort: varorna på en inköpslista, poängen i ett spel eller namnen i en klass. Tio variabler som `namn1`, `namn2` … blir snabbt jobbigt – en lista räcker.',
    example: 'farger = ["röd", "grön", "blå"]\nprint(farger)',
    task: 'Uppgift: Skapa en lista `frukter` med texterna `äpple`, `banan` och `päron`, i den ordningen. Skriv sedan ut listan.',
    starterCode: '# Skriv din kod här\n',
    solution: 'frukter = ["äpple", "banan", "päron"]\nprint(frukter)\n',
    hints: [
      'En lista skrivs med [ och ], och sakerna skiljs åt med kommatecken.',
      'Varje frukt är text, så den behöver citattecken.',
      'frukter = ["äpple", "banan", "päron"] och sedan print(frukter).',
    ],
    tests: [
      {
        description: 'frukter är äpple, banan och päron',
        code: 'frukter',
        expected: ['äpple', 'banan', 'päron'],
      },
      {
        description: 'Skriver ut listan',
        code: '__output',
        expected: ["['äpple', 'banan', 'päron']"],
      },
    ],
  },
  {
    id: 'listor-02',
    track: 'listor',
    title: 'Hämta med index',
    xp: 10,
    description:
      'Varje sak i en lista har ett nummer, ett index. Med det hämtar du en enda sak.',
    explain:
      'Python börjar räkna på 0. Första saken är `djur[0]`, andra `djur[1]`. Det är ovant först, men alla programspråk du stöter på gör likadant.\n\nMinus räknar bakifrån: `djur[-1]` är den sista, `djur[-2]` den näst sista. Det är praktiskt när du inte vet hur lång listan är.',
    example: 'veckodagar = ["mån", "tis", "ons"]\nprint(veckodagar[1])',
    task: 'Uppgift: Skriv ut första och sista djuret i listan `djur`, med index. Första djuret på en rad och sista på nästa.',
    starterCode: 'djur = ["katt", "hund", "häst", "ko"]\n',
    solution:
      'djur = ["katt", "hund", "häst", "ko"]\nprint(djur[0])\nprint(djur[-1])\n',
    hints: [
      'Första saken har index 0.',
      'Sista saken kan du hämta med -1, oavsett hur lång listan är.',
      'print(djur[0]) och print(djur[-1]).',
    ],
    tests: [
      {
        description: 'Skriver ut katt och ko',
        code: '__output',
        expected: ['katt', 'ko'],
      },
    ],
    sourceChecks: [
      { description: 'Hämtar ur listan med index', pattern: /djur\[/ },
    ],
  },
  {
    id: 'listor-03',
    track: 'listor',
    title: 'Ändra i en lista',
    xp: 10,
    description:
      'En lista går att ändra efter att den skapats. Du byter ut en sak genom att peka ut den med index.',
    explain:
      '`poang[0] = 5` byter ut första saken mot 5. Resten av listan är kvar som förut.\n\nDet är skillnaden mot en vanlig variabel: där byter du hela värdet, här bara en del av det.',
    example: 'lampor = ["av", "av", "av"]\nlampor[2] = "på"\nprint(lampor)',
    task: 'Uppgift: Ändra andra talet i `poang` till 10 och skriv sedan ut listan.',
    starterCode: 'poang = [3, 7, 2]\n',
    solution: 'poang = [3, 7, 2]\npoang[1] = 10\nprint(poang)\n',
    hints: [
      'Andra saken har index 1, eftersom Python börjar räkna på 0.',
      'Du ändrar med likhetstecken, precis som en vanlig variabel.',
      'poang[1] = 10 och sedan print(poang).',
    ],
    tests: [
      {
        description: 'poang är [3, 10, 2]',
        code: 'poang',
        expected: [3, 10, 2],
      },
      {
        description: 'Skriver ut listan',
        code: '__output',
        expected: ['[3, 10, 2]'],
      },
    ],
    sourceChecks: [
      {
        description: 'Ändrar med index',
        pattern: /poang\[\s*(1|-2)\s*\]\s*=[^=]/,
      },
    ],
  },
  {
    id: 'listor-04',
    track: 'listor',
    title: 'Lägg till med append',
    xp: 10,
    description:
      'Ofta börjar en lista tom och fylls på medan programmet körs. Det gör du med append.',
    explain:
      '`[]` är en tom lista. `handla.append("mjölk")` lägger till mjölk sist i listan. Punkten betyder att append hör till listan – det är en *metod*, en funktion som tillhör något.\n\nDu tar till append när du inte vet från början vad som ska finnas i listan, till exempel svaren som användaren skriver.',
    example: 'kon = []\nkon.append("Ali")\nkon.append("Bea")\nprint(kon)',
    task: 'Uppgift: Lägg till `mjölk`, `bröd` och `ost` i listan `handla` med append, i den ordningen. Skriv sedan ut listan.',
    starterCode: 'handla = []\n',
    solution:
      'handla = []\nhandla.append("mjölk")\nhandla.append("bröd")\nhandla.append("ost")\nprint(handla)\n',
    hints: [
      'append lägger till en sak i taget, sist i listan.',
      'Skriv handla.append("mjölk") och gör likadant för de andra.',
      'Tre rader med append, och print(handla) sist.',
    ],
    tests: [
      {
        description: 'handla är mjölk, bröd och ost',
        code: 'handla',
        expected: ['mjölk', 'bröd', 'ost'],
      },
      {
        description: 'Skriver ut listan',
        code: '__output',
        expected: ["['mjölk', 'bröd', 'ost']"],
      },
    ],
    sourceChecks: [{ description: 'Använder append', pattern: /\.append\(/ }],
  },
  {
    id: 'listor-05',
    track: 'listor',
    title: 'Hur många? len',
    xp: 10,
    description: 'len berättar hur många saker en lista innehåller.',
    explain:
      '`len(gaster)` ger antalet saker i listan. Den räknar om varje gång, så lägger du till något blir svaret större.\n\nlen ger ett tal. Ska det sättas ihop med text behövs `str()`, precis som förut.',
    example: 'lag = ["Ali", "Bea"]\nprint(len(lag))',
    task: 'Uppgift: Skriv ut `Antal gäster: 4` med hjälp av len, så att det blir rätt även om listan ändras.',
    starterCode: 'gaster = ["Ali", "Bea", "Cem", "Dana"]\n',
    solution:
      'gaster = ["Ali", "Bea", "Cem", "Dana"]\nprint("Antal gäster: " + str(len(gaster)))\n',
    hints: [
      'len(gaster) ger 4.',
      'Talet måste göras om till text med str() innan det sätts ihop med +.',
      'print("Antal gäster: " + str(len(gaster)))',
    ],
    tests: [
      {
        description: 'Skriver ut Antal gäster: 4',
        code: '__output',
        expected: ['Antal gäster: 4'],
      },
    ],
    sourceChecks: [{ description: 'Använder len', pattern: /\blen\(/ }],
  },
  {
    id: 'listor-06',
    track: 'listor',
    title: 'Loopa över en lista',
    xp: 15,
    description:
      'for kan gå igenom en lista direkt, en sak i taget. Det är listornas superkraft.',
    explain:
      '`for person in namn:` ger variabeln `person` ett nytt värde varje varv: först "Ali", sedan "Bea" och så vidare. Loopen tar slut när listan är slut.\n\nDu behöver inte range eller index – for hämtar sakerna åt dig. Namnet på loopvariabeln väljer du själv, och det blir lättast att läsa om det beskriver *en* sak ur listan.',
    example: 'for frukt in ["äpple", "kiwi"]:\n    print(frukt + " är gott")',
    task: 'Uppgift: Skriv ut `Hej Ali!`, `Hej Bea!` och `Hej Cem!` med en for-loop över listan `namn`.',
    starterCode: 'namn = ["Ali", "Bea", "Cem"]\n',
    solution:
      'namn = ["Ali", "Bea", "Cem"]\nfor person in namn:\n    print("Hej " + person + "!")\n',
    hints: [
      'for person in namn: går igenom listan.',
      'Inne i loopen innehåller person ett namn i taget.',
      'print("Hej " + person + "!") indraget under for-raden.',
    ],
    tests: [
      {
        description: 'Hälsar på alla tre',
        code: '__output',
        expected: ['Hej Ali!', 'Hej Bea!', 'Hej Cem!'],
      },
    ],
    sourceChecks: [{ description: 'Använder en for-loop', pattern: /\bfor\b/ }],
  },
  {
    id: 'listor-07',
    track: 'listor',
    title: 'Summera en lista',
    xp: 15,
    description:
      'Samma mönster som i förra banan – en variabel som samlar ihop – fast nu över en lista.',
    explain:
      'Skapa `total = 0` före loopen och lägg till varje pris i loopen: `total += pris`.\n\nPython har också `sum(priser)` som gör samma sak på en rad. Bra att känna till, men mönstret med loopen behöver du när det är något annat än en summa, till exempel att bara räkna de dyra varorna.',
    example:
      'langder = [140, 152, 147]\nsumma = 0\nfor langd in langder:\n    summa += langd\nprint(summa)',
    task: 'Uppgift: Räkna ihop alla priser i variabeln `total` och skriv ut `Totalt: 140 kr`.',
    starterCode: 'priser = [25, 40, 15, 60]\n',
    solution:
      'priser = [25, 40, 15, 60]\ntotal = 0\nfor pris in priser:\n    total += pris\nprint("Totalt: " + str(total) + " kr")\n',
    hints: [
      'Börja med total = 0 före loopen.',
      'for pris in priser: och total += pris inuti.',
      'Skriv ut efter loopen: print("Totalt: " + str(total) + " kr")',
    ],
    tests: [
      { description: 'total är 140', code: 'total', expected: 140 },
      {
        description: 'Skriver ut Totalt: 140 kr',
        code: '__output',
        expected: ['Totalt: 140 kr'],
      },
    ],
  },
  {
    id: 'listor-08',
    track: 'listor',
    title: 'Finns den i listan?',
    xp: 15,
    description:
      'in frågar om något finns i en lista och svarar sant eller falskt.',
    explain:
      '`"Bea" in medlemmar` är sant om Bea finns i listan. Du använder det direkt i en if: `if namn in medlemmar:`.\n\nDet sparar dig en hel loop. Utan in skulle du behöva gå igenom listan och jämföra varje namn själv.',
    example:
      'vip = ["Ali", "Bea"]\nif "Ali" in vip:\n    print("Ali får gå före")',
    task: 'Uppgift: Fråga `input("Vad heter du? ")` och spara svaret i `namn`. Finns namnet i `medlemmar` skriver du ut `Välkommen in, Bea!` (med rätt namn). Annars `Du står inte på listan.`',
    starterCode: 'medlemmar = ["Ali", "Bea", "Cem"]\n',
    solution:
      'medlemmar = ["Ali", "Bea", "Cem"]\nnamn = input("Vad heter du? ")\nif namn in medlemmar:\n    print("Välkommen in, " + namn + "!")\nelse:\n    print("Du står inte på listan.")\n',
    hints: [
      'namn = input("Vad heter du? ") och sedan en if med in.',
      'if namn in medlemmar: och else: under.',
      'print("Välkommen in, " + namn + "!") i if-delen.',
    ],
    inputs: ['Bea'],
    tests: [
      {
        description: 'namn är svaret från input',
        code: 'namn',
        expected: 'Bea',
      },
      {
        description: 'Bea släpps in',
        code: '__output',
        expected: ['Välkommen in, Bea!'],
      },
      {
        description: 'Eva står inte på listan',
        code: '__output',
        expected: ['Du står inte på listan.'],
        inputs: ['Eva'],
      },
    ],
    sourceChecks: [
      { description: 'Använder in', pattern: /\bin\s+medlemmar\b/ },
    ],
  },
  {
    id: 'listor-09',
    track: 'listor',
    title: 'Bygg en ny lista',
    xp: 15,
    description:
      'En loop med if kan sortera ut det du vill ha och lägga det i en ny lista.',
    explain:
      'Börja med en tom lista, gå igenom den gamla och `append` bara det som klarar villkoret. Den gamla listan är kvar som den var.\n\nMönstret heter att *filtrera*. Du tar till det när du vill ha en del av en lista: bara de jämna talen, bara de godkända eleverna, bara varorna under 50 kr.',
    example:
      'langder = [140, 162, 155, 171]\nlanga = []\nfor langd in langder:\n    if langd > 160:\n        langa.append(langd)\nprint(langa)',
    task: 'Uppgift: Lägg alla jämna tal från `tal` i listan `jamna` och skriv ut den.',
    starterCode: 'tal = [4, 7, 10, 13, 16]\njamna = []\n',
    solution:
      'tal = [4, 7, 10, 13, 16]\njamna = []\nfor t in tal:\n    if t % 2 == 0:\n        jamna.append(t)\nprint(jamna)\n',
    hints: [
      'Gå igenom tal med en for-loop.',
      'Ett tal är jämnt om t % 2 == 0. Då gör du jamna.append(t).',
      'print(jamna) efter loopen, utan indrag.',
    ],
    tests: [
      {
        description: 'jamna är [4, 10, 16]',
        code: 'jamna',
        expected: [4, 10, 16],
      },
      {
        description: 'Skriver ut listan',
        code: '__output',
        expected: ['[4, 10, 16]'],
      },
    ],
    sourceChecks: [{ description: 'Använder append', pattern: /\.append\(/ }],
  },
  {
    id: 'listor-10',
    track: 'listor',
    title: 'Störst i listan',
    xp: 20,
    description:
      'Att leta upp det största är ett klassiskt mönster: kom ihåg det bästa hittills.',
    explain:
      'Börja med att anta att första värdet är störst: `hogst = temperaturer[0]`. Gå sedan igenom listan och byt ut `hogst` varje gång du hittar något större.\n\nPython har `max()` som gör det åt dig, och den får du gärna använda senare. Men mönstret behövs när du letar efter något annat, som det längsta namnet eller den billigaste varan.',
    example:
      'langder = [140, 162, 155]\nkortast = langder[0]\nfor langd in langder:\n    if langd < kortast:\n        kortast = langd\nprint(kortast)',
    task: 'Uppgift: Leta upp den högsta temperaturen med en loop, spara den i `hogst` och skriv ut `Högst: 21`.',
    starterCode: 'temperaturer = [12, 18, 9, 21, 15]\n',
    solution:
      'temperaturer = [12, 18, 9, 21, 15]\nhogst = temperaturer[0]\nfor temp in temperaturer:\n    if temp > hogst:\n        hogst = temp\nprint("Högst: " + str(hogst))\n',
    hints: [
      'Börja med hogst = temperaturer[0].',
      'I loopen: if temp > hogst: och då hogst = temp.',
      'print("Högst: " + str(hogst)) efter loopen.',
    ],
    tests: [
      { description: 'hogst är 21', code: 'hogst', expected: 21 },
      {
        description: 'Skriver ut Högst: 21',
        code: '__output',
        expected: ['Högst: 21'],
      },
    ],
  },
];
