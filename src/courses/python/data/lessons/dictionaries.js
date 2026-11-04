// Bana 6: dictionaries och tupler.
export const DICTIONARIES = [
  {
    id: 'dict-01',
    track: 'dictionaries',
    title: 'Din första dictionary',
    xp: 10,
    description:
      'En dictionary sparar värden med namn i stället för nummer. Varje värde har en nyckel.',
    explain:
      'En dictionary skrivs med klammerparenteser: `{"namn": "Ali", "alder": 12}`. Före kolonet står nyckeln, efter står värdet. Du hämtar ett värde med nyckeln: `person["namn"]`.\n\nDu tar till en dictionary när sakerna har namn snarare än en ordning: en persons uppgifter, priserna i en meny eller hur många av varje vara som finns i lager.',
    example: 'bil = {"marke": "Volvo", "ar": 2019}\nprint(bil["marke"])',
    task: 'Uppgift: Skapa `person` med nycklarna `namn` (Ali), `alder` (12) och `stad` (Malmö). Skriv sedan ut namnet med hjälp av nyckeln.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'person = {"namn": "Ali", "alder": 12, "stad": "Malmö"}\nprint(person["namn"])\n',
    hints: [
      'En dictionary skrivs med { och }, och nyckel: värde-par med kommatecken emellan.',
      'Nycklarna är text, så de behöver citattecken: "namn": "Ali".',
      'print(person["namn"])',
    ],
    tests: [
      {
        description: 'person har namn, alder och stad',
        code: 'person',
        expected: { namn: 'Ali', alder: 12, stad: 'Malmö' },
      },
      { description: 'Skriver ut Ali', code: '__output', expected: ['Ali'] },
    ],
    sourceChecks: [
      {
        description: 'Hämtar namnet med nyckeln',
        pattern: /person\[\s*["']namn["']\s*\]/,
      },
    ],
  },
  {
    id: 'dict-02',
    track: 'dictionaries',
    title: 'Ändra och lägg till',
    xp: 10,
    description:
      'Samma rad både ändrar ett värde och lägger till en ny nyckel.',
    explain:
      '`lager["päron"] = 6` ändrar värdet om nyckeln redan finns. Finns den inte skapas den. Du behöver inget append.\n\nVarje nyckel finns bara en gång. Skriver du till samma nyckel igen byts värdet ut.',
    example:
      'poang = {"Ali": 3}\npoang["Ali"] = 5\npoang["Bea"] = 2\nprint(poang)',
    task: 'Uppgift: Ändra antalet päron i `lager` till 6 och lägg till `bananer` med 12. Skriv sedan ut `lager`.',
    starterCode: 'lager = {"äpplen": 10, "päron": 4}\n',
    solution:
      'lager = {"äpplen": 10, "päron": 4}\nlager["päron"] = 6\nlager["bananer"] = 12\nprint(lager)\n',
    hints: [
      'lager["päron"] = 6 ändrar värdet.',
      'En ny nyckel läggs till på samma sätt.',
      'lager["bananer"] = 12 och sedan print(lager).',
    ],
    tests: [
      {
        description: 'lager har 10 äpplen, 6 päron och 12 bananer',
        code: 'lager',
        expected: { äpplen: 10, päron: 6, bananer: 12 },
      },
      {
        description: 'Skriver ut lager',
        code: '__output',
        expected: ["{'äpplen': 10, 'päron': 6, 'bananer': 12}"],
      },
    ],
  },
  {
    id: 'dict-03',
    track: 'dictionaries',
    title: 'Finns nyckeln?',
    xp: 15,
    description:
      'Hämtar du en nyckel som inte finns blir det KeyError. Fråga först med in.',
    explain:
      '`if vara in priser:` frågar om nyckeln finns, precis som med listor. Först då är det säkert att hämta `priser[vara]`.\n\nDu kan använda en variabel som nyckel. `priser[vara]` hämtar värdet för det som just nu står i `vara`.',
    example:
      'farger = {"himmel": "blå", "gräs": "grönt"}\nsak = "gräs"\nif sak in farger:\n    print(farger[sak])',
    task: 'Uppgift: Fråga `input("Vad vill du köpa? ")` och spara svaret i `vara`. Finns varan skriver du ut t.ex. `kaffe kostar 30 kr`, annars `Vi har ingen kaka`.',
    starterCode: 'priser = {"kaffe": 30, "te": 25, "bulle": 20}\n',
    solution:
      'priser = {"kaffe": 30, "te": 25, "bulle": 20}\nvara = input("Vad vill du köpa? ")\nif vara in priser:\n    print(f"{vara} kostar {priser[vara]} kr")\nelse:\n    print(f"Vi har ingen {vara}")\n',
    hints: [
      'vara = input("Vad vill du köpa? ") och sedan if vara in priser:',
      'Priset hämtas med priser[vara].',
      'print(f"{vara} kostar {priser[vara]} kr") och print(f"Vi har ingen {vara}") i else.',
    ],
    inputs: ['kaffe'],
    tests: [
      {
        description: 'vara är svaret från input',
        code: 'vara',
        expected: 'kaffe',
      },
      {
        description: 'kaffe kostar 30 kr',
        code: '__output',
        expected: ['kaffe kostar 30 kr'],
      },
      {
        description: 'bulle kostar 20 kr',
        code: '__output',
        expected: ['bulle kostar 20 kr'],
        inputs: ['bulle'],
      },
      {
        description: 'Ingen kaka',
        code: '__output',
        expected: ['Vi har ingen kaka'],
        inputs: ['kaka'],
      },
    ],
  },
  {
    id: 'dict-04',
    track: 'dictionaries',
    title: 'Loopa med items()',
    xp: 15,
    description:
      'items() ger nyckel och värde parvis, så att du kan gå igenom hela dictionaryn.',
    explain:
      '`for namn, poang in resultat.items():` ger två variabler varje varv: nyckeln och värdet. Ordningen är den ordning nycklarna lades till.\n\nLoopar du bara `for namn in resultat:` får du nycklarna, och får hämta värdet själv med `resultat[namn]`.',
    example:
      'lager = {"skruv": 120, "mutter": 80}\nfor vara, antal in lager.items():\n    print(vara, antal)',
    task: 'Uppgift: Skriv ut en rad per person i `resultat`, så här: `Ali: 18 poäng`.',
    starterCode: 'resultat = {"Ali": 18, "Bea": 22, "Cem": 15}\n',
    solution:
      'resultat = {"Ali": 18, "Bea": 22, "Cem": 15}\nfor namn, poang in resultat.items():\n    print(f"{namn}: {poang} poäng")\n',
    hints: [
      'for namn, poang in resultat.items():',
      'Inne i loopen innehåller namn nyckeln och poang värdet.',
      'print(f"{namn}: {poang} poäng")',
    ],
    tests: [
      {
        description: 'En rad per person',
        code: '__output',
        expected: ['Ali: 18 poäng', 'Bea: 22 poäng', 'Cem: 15 poäng'],
      },
    ],
    sourceChecks: [{ description: 'Använder en for-loop', pattern: /\bfor\b/ }],
  },
  {
    id: 'dict-05',
    track: 'dictionaries',
    title: 'get med reservvärde',
    xp: 15,
    description:
      'get hämtar ett värde utan att krascha. Saknas nyckeln får du ett reservvärde.',
    explain:
      '`telefon.get(namn, "okänt")` ger numret om namnet finns, annars "okänt". Utan reservvärde ger get `None`.\n\nDet är ett kortare sätt att skriva en if med in. Du tar till get när det finns ett vettigt värde att falla tillbaka på.',
    example: 'lager = {"skruv": 120}\nprint(lager.get("spik", 0))',
    task: 'Uppgift: Fråga `input("Vem söker du? ")` och spara svaret i `namn`. Hämta numret med get och reservvärdet `okänt`, spara i `nummer` och skriv ut t.ex. `Bea: 073-222`.',
    starterCode: 'telefon = {"Ali": "070-111", "Bea": "073-222"}\n',
    solution:
      'telefon = {"Ali": "070-111", "Bea": "073-222"}\nnamn = input("Vem söker du? ")\nnummer = telefon.get(namn, "okänt")\nprint(f"{namn}: {nummer}")\n',
    hints: [
      'namn = input("Vem söker du? ")',
      'nummer = telefon.get(namn, "okänt")',
      'print(f"{namn}: {nummer}")',
    ],
    inputs: ['Bea'],
    tests: [
      {
        description: 'nummer är Beas nummer',
        code: 'nummer',
        expected: '073-222',
      },
      {
        description: 'Skriver ut Bea: 073-222',
        code: '__output',
        expected: ['Bea: 073-222'],
      },
      {
        description: 'Okänt namn ger okänt',
        code: '__output',
        expected: ['Dana: okänt'],
        inputs: ['Dana'],
      },
    ],
    sourceChecks: [{ description: 'Använder get', pattern: /\.get\(/ }],
  },
  {
    id: 'dict-06',
    track: 'dictionaries',
    title: 'Räkna med en dictionary',
    xp: 20,
    description:
      'Ett av de mest användbara mönstren: räkna hur många det finns av varje sak.',
    explain:
      'Börja med en tom dictionary, `{}`. För varje sak: finns den redan, öka med 1. Annars, skapa den med 1.\n\nMed get blir det en enda rad: `antal[rost] = antal.get(rost, 0) + 1`. Båda sätten fungerar – välj det du förstår bäst.',
    example:
      'farger = ["röd", "blå", "röd"]\nantal = {}\nfor farg in farger:\n    antal[farg] = antal.get(farg, 0) + 1\nprint(antal)',
    task: 'Uppgift: Räkna hur många röster varje svar fick i `roster`. Spara det i dictionaryn `antal` och skriv ut den.',
    starterCode: 'roster = ["Ja", "Nej", "Ja", "Ja", "Nej"]\n',
    solution:
      'roster = ["Ja", "Nej", "Ja", "Ja", "Nej"]\nantal = {}\nfor rost in roster:\n    if rost in antal:\n        antal[rost] += 1\n    else:\n        antal[rost] = 1\nprint(antal)\n',
    hints: [
      'antal = {} före loopen, och for rost in roster:',
      'if rost in antal: ökar du med 1, annars sätter du den till 1.',
      'antal[rost] += 1 i if-delen och antal[rost] = 1 i else-delen.',
    ],
    tests: [
      {
        description: 'antal är 3 Ja och 2 Nej',
        code: 'antal',
        expected: { Ja: 3, Nej: 2 },
      },
      {
        description: 'Skriver ut antal',
        code: '__output',
        expected: ["{'Ja': 3, 'Nej': 2}"],
      },
    ],
  },
  {
    id: 'dict-07',
    track: 'dictionaries',
    title: 'Tupler',
    xp: 15,
    description:
      'En tupel är som en lista som inte går att ändra. Den passar för saker som hör ihop, som x och y.',
    explain:
      'En tupel skrivs med vanliga parenteser: `punkt = (3, 5)`. Du kan packa upp den i flera variabler på en gång: `x, y = punkt`.\n\nDu har redan använt det utan att veta om det: `items()` ger tupler med nyckel och värde, och `for namn, poang in …` packar upp dem.',
    example: 'farg = (255, 128, 0)\nrod, gron, bla = farg\nprint(gron)',
    task: 'Uppgift: Skapa tupeln `punkt` med talen 3 och 5. Packa upp den i `x` och `y` och skriv ut `x är 3 och y är 5`.',
    starterCode: '# Skriv din kod här\n',
    solution: 'punkt = (3, 5)\nx, y = punkt\nprint(f"x är {x} och y är {y}")\n',
    hints: [
      'punkt = (3, 5)',
      'x, y = punkt packar upp tupeln.',
      'print(f"x är {x} och y är {y}")',
    ],
    tests: [
      {
        description: 'punkt är en tupel',
        code: 'type(punkt).__name__',
        expected: 'tuple',
      },
      { description: 'x är 3', code: 'x', expected: 3 },
      { description: 'y är 5', code: 'y', expected: 5 },
      {
        description: 'Skriver ut x är 3 och y är 5',
        code: '__output',
        expected: ['x är 3 och y är 5'],
      },
    ],
  },
  {
    id: 'dict-08',
    track: 'dictionaries',
    title: 'En lista med dictionaries',
    xp: 20,
    description:
      'Listor och dictionaries går att kombinera. En lista med dictionaries är som en tabell.',
    explain:
      'Varje dictionary i listan är en rad, och nycklarna är kolumnerna. Loopa över listan och hämta det du behöver: `elev["poang"]`.\n\nI en f-sträng med dubbla citattecken måste nyckeln ha enkla: `f"{elev[\'namn\']}"`. Eller spara värdet i en variabel först, det blir ofta lättare att läsa.',
    example:
      'varor = [{"namn": "te", "pris": 25}, {"namn": "kaffe", "pris": 30}]\nfor vara in varor:\n    print(vara["namn"])',
    task: 'Uppgift: Skriv ut `Ali klarade provet` för varje elev i `elever` som har minst 18 poäng.',
    starterCode:
      'elever = [\n    {"namn": "Ali", "poang": 18},\n    {"namn": "Bea", "poang": 22},\n    {"namn": "Cem", "poang": 15},\n]\n',
    solution:
      'elever = [\n    {"namn": "Ali", "poang": 18},\n    {"namn": "Bea", "poang": 22},\n    {"namn": "Cem", "poang": 15},\n]\nfor elev in elever:\n    if elev["poang"] >= 18:\n        namn = elev["namn"]\n        print(f"{namn} klarade provet")\n',
    hints: [
      'for elev in elever: ger en dictionary i taget.',
      'if elev["poang"] >= 18:',
      'Spara namnet först: namn = elev["namn"], och print(f"{namn} klarade provet").',
    ],
    tests: [
      {
        description: 'Ali och Bea klarade provet',
        code: '__output',
        expected: ['Ali klarade provet', 'Bea klarade provet'],
      },
    ],
  },
  {
    id: 'dict-09',
    track: 'dictionaries',
    title: 'Räkna ord',
    xp: 20,
    description:
      'Nu sätter du ihop allt: en funktion som delar upp en text och räknar orden.',
    explain:
      'split ger orden, och räknemönstret från förut räknar dem. Funktionen returnerar dictionaryn, så att den som anropar kan använda resultatet.\n\nEn sådan ordräknare är början på mycket: sökmotorer, stavningskontroller och textanalys bygger på samma idé.',
    example:
      'def rakna_bokstaver(text):\n    antal = {}\n    for tecken in text:\n        antal[tecken] = antal.get(tecken, 0) + 1\n    return antal\n\nprint(rakna_bokstaver("aba"))',
    task: 'Uppgift: Skapa `rakna_ord(text)` som returnerar en dictionary med hur många gånger varje ord finns i texten.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'def rakna_ord(text):\n    antal = {}\n    for ordet in text.split():\n        antal[ordet] = antal.get(ordet, 0) + 1\n    return antal\n',
    hints: [
      'text.split() ger en lista med orden.',
      'Använd räknemönstret från övningen innan, inne i funktionen.',
      'Glöm inte return antal efter loopen.',
    ],
    tests: [
      {
        description: 'rakna_ord("hej på dig hej") räknar hej två gånger',
        code: 'rakna_ord("hej på dig hej")',
        expected: { hej: 2, på: 1, dig: 1 },
      },
      {
        description: 'En tom text ger en tom dictionary',
        code: 'rakna_ord("")',
        expected: {},
      },
    ],
  },
];
