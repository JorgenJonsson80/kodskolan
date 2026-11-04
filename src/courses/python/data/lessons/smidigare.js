// Bana 7: smidigare Python – kortare sätt att skriva loopar man redan kan.
export const SMIDIGARE = [
  {
    id: 'smid-01',
    track: 'smidigare',
    title: 'Färdiga hjälpare: sum, min och max',
    xp: 10,
    description:
      'Python har färdiga funktioner för det du byggt med loopar: sum lägger ihop, min och max hittar minst och störst.',
    explain:
      'I bana 3 räknade du ut summan och det största talet med en loop. Det är bra att kunna, men så vanligt att Python har färdiga funktioner: `sum(lista)`, `min(lista)` och `max(lista)`.\n\nDu tar till dem när du bara vill ha svaret. Loopen behöver du fortfarande när du vill göra något mer på vägen.',
    example:
      'langder = [152, 167, 140]\nprint(sum(langder))\nprint(min(langder))\nprint(max(langder))',
    task: 'Uppgift: Räkna ut `totalt` med sum, `billigast` med min och `dyrast` med max av `priser`. Skriv sedan ut `Totalt: 155 kr` med en f-sträng.',
    starterCode: 'priser = [35, 12, 80, 28]\n',
    solution:
      'priser = [35, 12, 80, 28]\ntotalt = sum(priser)\nbilligast = min(priser)\ndyrast = max(priser)\nprint(f"Totalt: {totalt} kr")\n',
    hints: [
      'sum(priser) ger summan av alla tal i listan.',
      'billigast = min(priser) och dyrast = max(priser).',
      'print(f"Totalt: {totalt} kr")',
    ],
    tests: [
      { description: 'totalt är 155', code: 'totalt', expected: 155 },
      { description: 'billigast är 12', code: 'billigast', expected: 12 },
      { description: 'dyrast är 80', code: 'dyrast', expected: 80 },
      {
        description: 'Skriver ut Totalt: 155 kr',
        code: '__output',
        expected: ['Totalt: 155 kr'],
      },
    ],
    sourceChecks: [
      { description: 'Använder sum()', pattern: /\bsum\s*\(\s*priser/ },
      { description: 'Använder min()', pattern: /\bmin\s*\(\s*priser/ },
      { description: 'Använder max()', pattern: /\bmax\s*\(\s*priser/ },
    ],
  },
  {
    id: 'smid-02',
    track: 'smidigare',
    title: 'Platsnummer med enumerate',
    xp: 10,
    description:
      'enumerate ger både platsnumret och värdet i varje varv, så att du slipper en egen räknare.',
    explain:
      'Utan enumerate behöver du en räknare: `plats = 1` före loopen och `plats += 1` i den. Med `for plats, namn in enumerate(lista, 1):` får du båda i varje varv. Ettan betyder att räkningen börjar på 1 i stället för 0.\n\nDu tar till enumerate när du vill numrera något: en topplista, en meny eller rader i en text.',
    example:
      'for plats, frukt in enumerate(["äpple", "päron"], 1):\n    print(plats, frukt)',
    task: 'Uppgift: Skriv ut deltagarna numrerade: `1. Ada`, `2. Bo` och så vidare. Använd enumerate och en f-sträng.',
    starterCode: 'deltagare = ["Ada", "Bo", "Cy", "Dan"]\n',
    solution:
      'deltagare = ["Ada", "Bo", "Cy", "Dan"]\nfor plats, namn in enumerate(deltagare, 1):\n    print(f"{plats}. {namn}")\n',
    hints: [
      'for plats, namn in enumerate(deltagare, 1):',
      'Ettan gör att numreringen börjar på 1.',
      'print(f"{plats}. {namn}") i loopen.',
    ],
    tests: [
      {
        description: 'Skriver ut fyra numrerade rader',
        code: '__output',
        expected: ['1. Ada', '2. Bo', '3. Cy', '4. Dan'],
      },
    ],
    sourceChecks: [
      { description: 'Använder enumerate', pattern: /\benumerate\s*\(/ },
    ],
  },
  {
    id: 'smid-03',
    track: 'smidigare',
    title: 'Två listor parvis: zip',
    xp: 15,
    description:
      'zip går igenom två listor samtidigt och ger ett par i varje varv: första med första, andra med andra.',
    explain:
      '`for namn, poang in zip(namnen, poangen):` ger `namn` från första listan och `poang` från den andra, på samma plats. Är listorna olika långa slutar zip när den kortaste tar slut.\n\nDu tar till zip när två listor hör ihop rad för rad, som namn och telefonnummer i varsin lista.',
    example:
      'dagar = ["mån", "tis"]\ngrader = [12, 15]\nfor dag, g in zip(dagar, grader):\n    print(dag, g)',
    task: 'Uppgift: Skriv ut varje vara med sitt pris, som `Mjölk: 15 kr`. Använd zip och en f-sträng.',
    starterCode: 'varor = ["Mjölk", "Bröd", "Ost"]\npriser = [15, 32, 89]\n',
    solution:
      'varor = ["Mjölk", "Bröd", "Ost"]\npriser = [15, 32, 89]\nfor vara, pris in zip(varor, priser):\n    print(f"{vara}: {pris} kr")\n',
    hints: [
      'for vara, pris in zip(varor, priser):',
      'I varje varv är vara och pris från samma plats i listorna.',
      'print(f"{vara}: {pris} kr")',
    ],
    tests: [
      {
        description: 'Skriver ut varorna med pris',
        code: '__output',
        expected: ['Mjölk: 15 kr', 'Bröd: 32 kr', 'Ost: 89 kr'],
      },
    ],
    sourceChecks: [{ description: 'Använder zip', pattern: /\bzip\s*\(/ }],
  },
  {
    id: 'smid-04',
    track: 'smidigare',
    title: 'Sortera med sorted',
    xp: 15,
    description:
      'sorted ger en ny lista i ordning. Med reverse=True blir det störst först.',
    explain:
      '`sorted(lista)` ger en ny, sorterad lista – originalet är kvar som det var. Tal sorteras från minst till störst och text i bokstavsordning. `sorted(lista, reverse=True)` vänder på ordningen.\n\nDu tar till sorted när du vill visa något i ordning utan att förstöra originalet, t.ex. en topplista.',
    example: 'tider = [31, 28, 35]\nsnabbast = sorted(tider)\nprint(snabbast)',
    task: 'Uppgift: Skapa `stigande` med poängen från minst till störst och `topp` med störst först. `poang` ska inte ändras. Skriv sedan ut `topp`.',
    starterCode: 'poang = [42, 87, 15, 66]\n',
    solution:
      'poang = [42, 87, 15, 66]\nstigande = sorted(poang)\ntopp = sorted(poang, reverse=True)\nprint(topp)\n',
    hints: [
      'stigande = sorted(poang)',
      'reverse=True vänder på ordningen.',
      'topp = sorted(poang, reverse=True) och print(topp).',
    ],
    tests: [
      {
        description: 'stigande är [15, 42, 66, 87]',
        code: 'stigande',
        expected: [15, 42, 66, 87],
      },
      {
        description: 'topp är [87, 66, 42, 15]',
        code: 'topp',
        expected: [87, 66, 42, 15],
      },
      {
        description: 'poang är oförändrad',
        code: 'poang',
        expected: [42, 87, 15, 66],
      },
      {
        description: 'Skriver ut topp',
        code: '__output',
        expected: ['[87, 66, 42, 15]'],
      },
    ],
    sourceChecks: [
      { description: 'Använder sorted', pattern: /\bsorted\s*\(/ },
    ],
  },
  {
    id: 'smid-05',
    track: 'smidigare',
    title: 'Bygg en lista på en rad',
    xp: 15,
    description:
      'En list comprehension bygger en ny lista på en enda rad: vad som ska in, följt av en for.',
    explain:
      'I bana 3 byggde du nya listor så här: en tom lista, en for-loop och append. En list comprehension gör samma sak på en rad: `[x * 2 for x in talen]`. Läs den som "x gånger två, för varje x i talen".\n\nDu tar till den när varje sak i den nya listan räknas ut från en sak i den gamla. Blir raden svår att läsa är en vanlig loop bättre.',
    example:
      'talen = [1, 2, 3]\ndubbla = [x * 2 for x in talen]\nprint(dubbla)',
    task: 'Uppgift: Skapa `kvadrater` med talen 1–5 i kvadrat (talet gånger sig självt) med en list comprehension och range. Skriv ut listan.',
    starterCode: '# Skriv din kod här\n',
    solution: 'kvadrater = [x * x for x in range(1, 6)]\nprint(kvadrater)\n',
    hints: [
      'Börja med [ ... for x in range(1, 6)].',
      'Det som står först är det som hamnar i listan: x * x.',
      'kvadrater = [x * x for x in range(1, 6)]',
    ],
    tests: [
      {
        description: 'kvadrater är [1, 4, 9, 16, 25]',
        code: 'kvadrater',
        expected: [1, 4, 9, 16, 25],
      },
      {
        description: 'Skriver ut listan',
        code: '__output',
        expected: ['[1, 4, 9, 16, 25]'],
      },
    ],
    sourceChecks: [
      {
        description: 'Använder en list comprehension',
        pattern: /\[[^\]]*\bfor\b[^\]]*\bin\b/,
      },
    ],
  },
  {
    id: 'smid-06',
    track: 'smidigare',
    title: 'Filtrera med if',
    xp: 15,
    description:
      'Med en if sist i en list comprehension kommer bara det som uppfyller villkoret med.',
    explain:
      '`[p for p in poang if p >= 60]` betyder "p, för varje p i poang, om p är minst 60". Det ersätter tom lista, loop, if och append.\n\nDu tar till den när du vill plocka ut en del av en lista: godkända resultat, varor under ett visst pris eller namn som börjar på A.',
    example:
      'talen = [3, 8, 1, 9]\nstora = [t for t in talen if t > 5]\nprint(stora)',
    task: 'Uppgift: Skapa `langa` med orden som har fler än 4 bokstäver. Använd en list comprehension med if och len().',
    starterCode: 'orden = ["katt", "elefant", "mus", "giraff", "hund"]\n',
    solution:
      'orden = ["katt", "elefant", "mus", "giraff", "hund"]\nlanga = [ordet for ordet in orden if len(ordet) > 4]\nprint(langa)\n',
    hints: [
      'Börja med [ordet for ordet in orden ...].',
      'Lägg till if len(ordet) > 4 sist inom hakparenteserna.',
      'langa = [ordet for ordet in orden if len(ordet) > 4]',
    ],
    tests: [
      {
        description: 'langa är ["elefant", "giraff"]',
        code: 'langa',
        expected: ['elefant', 'giraff'],
      },
    ],
    sourceChecks: [
      {
        description: 'Använder en list comprehension med if',
        pattern: /\[[^\]]*\bfor\b[^\]]*\bif\b/,
      },
    ],
  },
  {
    id: 'smid-07',
    track: 'smidigare',
    title: 'En dictionary på en rad',
    xp: 15,
    description:
      'Samma knep fungerar för dictionaries: nyckel: värde följt av en for, inom klammerparenteser.',
    explain:
      '`{namn: len(namn) for namn in namnen}` bygger en dictionary där varje namn är nyckel och längden är värdet. Det är en dictionary comprehension.\n\nDu tar till den när du vill göra en uppslagstabell av en lista, eller räkna om alla värden i en dictionary: `{vara: pris * 2 for vara, pris in priser.items()}`.',
    example: 'djur = ["ko", "häst"]\nben = {d: 4 for d in djur}\nprint(ben)',
    task: 'Uppgift: Priserna ska höjas med 10 kr. Skapa `nya` med samma varor och 10 kr högre pris, med en dictionary comprehension och items().',
    starterCode: 'priser = {"kaffe": 30, "bulle": 25, "te": 20}\n',
    solution:
      'priser = {"kaffe": 30, "bulle": 25, "te": 20}\nnya = {vara: pris + 10 for vara, pris in priser.items()}\nprint(nya)\n',
    hints: [
      'Börja med {vara: ... for vara, pris in priser.items()}.',
      'Värdet efter kolonet är det nya priset: pris + 10.',
      'nya = {vara: pris + 10 for vara, pris in priser.items()}',
    ],
    tests: [
      {
        description: 'nya är {"kaffe": 40, "bulle": 35, "te": 30}',
        code: 'nya',
        expected: { kaffe: 40, bulle: 35, te: 30 },
      },
      {
        description: 'priser är oförändrad',
        code: 'priser',
        expected: { kaffe: 30, bulle: 25, te: 20 },
      },
    ],
    sourceChecks: [
      {
        description: 'Använder en dictionary comprehension',
        pattern: /\{[^}]*:[^}]*\bfor\b/,
      },
    ],
  },
  {
    id: 'smid-08',
    track: 'smidigare',
    title: 'Sortera efter något annat: key',
    xp: 15,
    description:
      'Med key bestämmer du vad som ska jämföras när sorted sorterar.',
    explain:
      '`sorted(orden, key=len)` sorterar orden efter längd i stället för bokstavsordning. sorted anropar `len` på varje ord och sorterar efter svaren. Lägg märke till att det står `len` utan parenteser – du skickar med själva funktionen, inte svaret.\n\nDu tar till key när det du vill sortera efter inte är själva värdet.',
    example:
      'namnen = ["Alexandra", "Bo", "Cecilia"]\nprint(sorted(namnen, key=len))',
    task: 'Uppgift: Skapa `kortast_forst` med städerna sorterade efter längd, kortast först. Skriv sedan ut det längsta namnet, alltså sista i listan, med `kortast_forst[-1]`.',
    starterCode:
      'stader = ["Stockholm", "Lund", "Göteborg", "Umeå", "Ystad"]\n',
    solution:
      'stader = ["Stockholm", "Lund", "Göteborg", "Umeå", "Ystad"]\nkortast_forst = sorted(stader, key=len)\nprint(kortast_forst[-1])\n',
    hints: [
      'sorted(stader, key=len)',
      'len skrivs utan parenteser efter key=.',
      'print(kortast_forst[-1]) skriver ut sista.',
    ],
    tests: [
      {
        description: 'kortast_forst är sorterad efter längd',
        code: 'kortast_forst',
        expected: ['Lund', 'Umeå', 'Ystad', 'Göteborg', 'Stockholm'],
      },
      {
        description: 'Skriver ut Stockholm',
        code: '__output',
        expected: ['Stockholm'],
      },
    ],
    sourceChecks: [
      { description: 'Använder key=len', pattern: /key\s*=\s*len\b/ },
    ],
  },
  {
    id: 'smid-09',
    track: 'smidigare',
    title: 'En liten funktion: lambda',
    xp: 20,
    description:
      'lambda är en funktion utan namn på en rad. Den passar perfekt som key till sorted.',
    explain:
      '`lambda par: par[1]` är en kort funktion som tar emot `par` och returnerar `par[1]`. Den är samma sak som `def andra(par): return par[1]`, fast utan namn och på en rad.\n\nDu tar till lambda när du behöver en liten funktion på ett enda ställe, som key: `sorted(elever, key=lambda e: e[1])` sorterar tupler efter andra värdet.',
    example:
      'lag = [("Röda", 3), ("Blå", 7)]\nprint(sorted(lag, key=lambda l: l[1]))',
    task: 'Uppgift: Skapa `topplista` med spelarna sorterade efter poäng, flest först. Använd sorted med `key=lambda` och `reverse=True`. Skriv sedan ut vinnarens namn.',
    starterCode:
      'spelare = [("Ada", 120), ("Bo", 340), ("Cy", 95), ("Dan", 210)]\n',
    solution:
      'spelare = [("Ada", 120), ("Bo", 340), ("Cy", 95), ("Dan", 210)]\ntopplista = sorted(spelare, key=lambda s: s[1], reverse=True)\nprint(topplista[0][0])\n',
    hints: [
      'key=lambda s: s[1] sorterar efter poängen, som är på plats 1 i tupeln.',
      'reverse=True ger flest poäng först.',
      'print(topplista[0][0]) – första tupeln, första värdet.',
    ],
    tests: [
      {
        description: 'Ordningen är Bo, Dan, Ada, Cy',
        code: '[namn for namn, p in topplista]',
        expected: ['Bo', 'Dan', 'Ada', 'Cy'],
      },
      { description: 'Skriver ut Bo', code: '__output', expected: ['Bo'] },
    ],
    sourceChecks: [{ description: 'Använder lambda', pattern: /\blambda\b/ }],
  },
];
