// Bana 1: print, variabler, tal och text, input och if/elif/else.
// Inga f-strängar (bana 5) och inga listor (bana 3) än – text sätts ihop
// med + och str().
export const GRUNDER = [
  {
    id: 'grunder-01',
    track: 'grunder',
    title: 'Ditt första program',
    xp: 10,
    description:
      'Ett program är en lista med instruktioner som datorn gör uppifrån och ner. Den enklaste instruktionen är att skriva ut något.',
    explain:
      '`print(…)` skriver ut det som står inom parentesen. Text måste stå inom citattecken, `"så här"`, annars tror Python att det är namnet på något.\n\nDu tar till print när du vill se vad programmet gör – det är också det bästa sättet att leta fel.',
    example: 'print("Godmorgon!")',
    task: 'Uppgift: Skriv ut texten `Hej, världen!` med print.',
    starterCode: '# Skriv din kod här\n',
    solution: 'print("Hej, världen!")\n',
    hints: [
      'Använd print och sätt texten inom parentesen.',
      'Text ska stå inom citattecken: "…"',
      'print("Hej, …") – fyll i resten, med kommatecken och utropstecken.',
    ],
    tests: [
      {
        description: 'Skriver ut Hej, världen!',
        code: '__output',
        expected: ['Hej, världen!'],
      },
    ],
  },
  {
    id: 'grunder-02',
    track: 'grunder',
    title: 'Flera rader',
    xp: 10,
    description:
      'Python kör raderna i tur och ordning, uppifrån och ner. Varje print blir en egen rad i utskriften.',
    explain:
      'Ordningen spelar roll: det som står först körs först. Vill du ha tre rader i utskriften skriver du tre print efter varandra, en per rad i koden.\n\nRader som börjar med `#` är kommentarer. Python hoppar över dem – de är till för människor som läser koden.',
    example: '# En liten inköpslista\nprint("Mjölk")\nprint("Bröd")',
    task: 'Uppgift: Skriv ut de tre raderna `Klara`, `Färdiga` och `Gå!` i den ordningen.',
    starterCode: '# Skriv din kod här\n',
    solution: 'print("Klara")\nprint("Färdiga")\nprint("Gå!")\n',
    hints: [
      'Du behöver en print per rad.',
      'Tre rader kod, var och en med print("…").',
      'print("Klara") först, sedan Färdiga och sist Gå!',
    ],
    tests: [
      {
        description: 'Skriver ut Klara, Färdiga, Gå! i ordning',
        code: '__output',
        expected: ['Klara', 'Färdiga', 'Gå!'],
      },
    ],
  },
  {
    id: 'grunder-03',
    track: 'grunder',
    title: 'Variabler',
    xp: 10,
    description:
      'En variabel är ett namn på ett värde. Du skapar den med = och kan sedan använda namnet i stället för värdet.',
    explain:
      'Tänk på en variabel som en etikett på en låda. `pris = 25` lägger 25 i lådan pris. Text skrivs inom citattecken, tal utan.\n\nDu tar till en variabel när du behöver samma värde flera gånger, eller när värdet ska kunna ändras – då räcker det att ändra på ett ställe. När du skriver ut en variabel skriver du namnet utan citattecken: `print(pris)`.',
    example: 'husdjur = "katt"\nben = 4\nprint(husdjur)',
    task: 'Uppgift: Skapa variabeln `stad` med värdet `"Malmö"` och variabeln `invanare` med värdet `360000`. Skriv sedan ut `stad`.',
    starterCode: '# Skriv din kod här\n',
    solution: 'stad = "Malmö"\ninvanare = 360000\nprint(stad)\n',
    hints: [
      'En variabel skapas med namn = värde.',
      'Text inom citattecken, tal utan: stad = "Malmö"',
      'Tre rader: stad = …, invanare = … och print(stad).',
    ],
    tests: [
      { description: 'stad är "Malmö"', code: 'stad', expected: 'Malmö' },
      {
        description: 'invanare är 360000',
        code: 'invanare',
        expected: 360000,
      },
      {
        description: 'Skriver ut Malmö',
        code: '__output',
        expected: ['Malmö'],
      },
    ],
  },
  {
    id: 'grunder-04',
    track: 'grunder',
    title: 'Räkna med tal',
    xp: 10,
    description:
      'Python är en utmärkt miniräknare: + plus, - minus, * gånger och / delat med.',
    explain:
      'Du kan räkna med variabler precis som med tal. `summa = pris * antal` räknar ut värdet och sparar det i en ny variabel.\n\nDu tar till en egen variabel för resultatet när du vill använda det igen, eller när ett namn gör koden lättare att läsa än en lång uträkning.',
    example: 'bredd = 4\nhojd = 3\nyta = bredd * hojd\nprint(yta)',
    task: 'Uppgift: Skapa `pris = 25` och `antal = 4`. Räkna ut vad det kostar totalt och spara det i `summa`. Skriv sedan ut `summa`.',
    starterCode: 'pris = 25\nantal = 4\n',
    solution: 'pris = 25\nantal = 4\nsumma = pris * antal\nprint(summa)\n',
    hints: [
      'Totalpriset är priset gånger antalet.',
      'Gånger skrivs med *.',
      'summa = pris * antal och sedan print(summa).',
    ],
    tests: [
      { description: 'summa är 100', code: 'summa', expected: 100 },
      {
        description: 'Skriver ut 100',
        code: '__output',
        expected: ['100'],
      },
    ],
  },
  {
    id: 'grunder-05',
    track: 'grunder',
    title: 'Text och tal tillsammans',
    xp: 15,
    description:
      'Text och tal är olika sorters värden. Python vägrar sätta ihop dem med + innan du gjort om talet till text.',
    explain:
      '`"Du har " + 3` ger felet TypeError, för Python vet inte om du vill räkna eller sätta ihop text. `str(3)` gör om talet till texten `"3"`, och text går att sätta ihop med +.\n\nTänk på mellanslagen: `"Du har " + "3"` blir Du har 3, men `"Du har" + "3"` blir Du har3.',
    example: 'poang = 12\nprint("Du fick " + str(poang) + " poäng")',
    task: 'Uppgift: Variabeln `antal` innehåller 3. Skriv ut `Du har 3 äpplen` genom att sätta ihop text med `antal`.',
    starterCode: 'antal = 3\n',
    solution: 'antal = 3\nprint("Du har " + str(antal) + " äpplen")\n',
    hints: [
      'Sätt ihop tre delar med +: text, antalet och text.',
      'Talet måste göras om till text med str(antal).',
      'print("Du har " + str(antal) + " äpplen") – kolla mellanslagen.',
    ],
    tests: [
      {
        description: 'Skriver ut Du har 3 äpplen',
        code: '__output',
        expected: ['Du har 3 äpplen'],
      },
    ],
    sourceChecks: [
      {
        description: 'Använder variabeln antal',
        pattern: /str\(\s*antal\s*\)|\bantal\b.*\bantal\b/s,
      },
    ],
  },
  {
    id: 'grunder-06',
    track: 'grunder',
    title: 'Fråga användaren',
    xp: 15,
    description:
      'Med input() kan programmet fråga den som kör det och få ett svar tillbaka som text.',
    explain:
      '`input("Fråga? ")` visar frågan och väntar på ett svar. Svaret är alltid text, och du sparar det i en variabel. Text sätts ihop med `+`.\n\nDu tar till input när programmet ska fungera olika beroende på vem som använder det.',
    example:
      'djur = input("Vilket djur gillar du? ")\nprint("Jag gillar också " + djur)',
    task: 'Uppgift: Fråga efter namnet med `input("Vad heter du? ")` och spara svaret i `namn`. Skriv sedan ut `Hej, ` följt av namnet och ett `!`. Svarar man Ada ska det bli `Hej, Ada!`.',
    starterCode: '# Skriv din kod här\n',
    solution: 'namn = input("Vad heter du? ")\nprint("Hej, " + namn + "!")\n',
    hints: [
      'Spara svaret från input i en variabel.',
      'Sätt ihop text med +: "Hej, " + namn',
      'print("Hej, " + namn + "!") – glöm inte utropstecknet.',
    ],
    inputs: ['Ada'],
    tests: [
      {
        description: 'namn är svaret från input',
        code: 'namn',
        expected: 'Ada',
      },
      {
        description: 'Skriver ut Hej, Ada!',
        code: '__output',
        expected: ['Hej, Ada!'],
      },
      {
        description: 'Svarar man Bo blir det Hej, Bo!',
        code: '__output',
        expected: ['Hej, Bo!'],
        inputs: ['Bo'],
      },
    ],
  },
  {
    id: 'grunder-07',
    track: 'grunder',
    title: 'Tal från input',
    xp: 15,
    description:
      'Svaret från input är alltid text, även om man skriver en siffra. För att räkna med det gör du om det till ett tal med int().',
    explain:
      '`"15" + 10` går inte – det ena är text. `int("15")` gör om texten till heltalet 15. Ofta gör man båda sakerna på en gång: `alder = int(input("Ålder? "))`.\n\nDu tar till int() så fort du ska räkna med något användaren skrivit. Ska resultatet sedan skrivas ut tillsammans med text behöver du str() igen.',
    example:
      'kakor = int(input("Hur många kakor? "))\nprint("Två var blir " + str(kakor * 2))',
    task: 'Uppgift: Fråga efter åldern med `input("Hur gammal är du? ")`, gör om svaret till ett tal med `int()` och spara det i variabeln `alder`. Skriv ut hur gammal personen är om 10 år, så här: `Om 10 år är du 25`.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'alder = int(input("Hur gammal är du? "))\nprint("Om 10 år är du " + str(alder + 10))\n',
    hints: [
      'Gör om svaret till ett tal med int(…) runt input(…).',
      'alder + 10 är åldern om tio år. Den måste bli text med str() innan den sätts ihop.',
      'print("Om 10 år är du " + str(alder + 10))',
    ],
    inputs: ['15'],
    tests: [
      { description: 'alder är ett tal', code: 'alder', expected: 15 },
      {
        description: 'Svarar man 15 blir det Om 10 år är du 25',
        code: '__output',
        expected: ['Om 10 år är du 25'],
      },
      {
        description: 'Svarar man 32 blir det Om 10 år är du 42',
        code: '__output',
        expected: ['Om 10 år är du 42'],
        inputs: ['32'],
      },
    ],
  },
  {
    id: 'grunder-08',
    track: 'grunder',
    title: 'Om något är sant: if',
    xp: 15,
    description:
      'Med if gör programmet något bara när ett villkor är sant. Det är så program fattar beslut.',
    explain:
      '`if temperatur > 20:` betyder "om temperaturen är större än 20". Raden slutar med ett kolon, och det som ska hända skrivs på raderna under, indraget med fyra mellanslag. Indraget visar vad som hör till if:en.\n\nJämförelser: `>` större än, `<` mindre än, `>=` större än eller lika med, `==` lika med, `!=` inte lika med. Du tar till if när programmet bara ibland ska göra något.',
    example:
      'saldo = int(input("Saldo? "))\nif saldo < 100:\n    print("Dags att spara!")',
    task: 'Uppgift: Fråga efter temperaturen med `input("Hur varmt är det? ")`, gör om svaret till ett tal med `int()` och spara det i variabeln `temperatur`. Är det varmare än 20 grader ska programmet skriva ut `Ta på shorts!`. Annars ska ingenting skrivas ut.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'temperatur = int(input("Hur varmt är det? "))\nif temperatur > 20:\n    print("Ta på shorts!")\n',
    hints: [
      'Gör om svaret till ett tal med int(input(…)), och jämför sedan med 20.',
      'if temperatur > 20: – glöm inte kolonet.',
      'Raden med print ska vara indragen fyra mellanslag under if-raden.',
    ],
    inputs: ['25'],
    tests: [
      {
        description: 'temperatur är svaret som ett tal',
        code: 'temperatur',
        expected: 25,
      },
      {
        description: '25 grader: Ta på shorts!',
        code: '__output',
        expected: ['Ta på shorts!'],
      },
      {
        description: '12 grader: ingenting skrivs ut',
        code: '__output',
        expected: [],
        inputs: ['12'],
      },
      {
        description: 'Precis 20 grader räknas inte som varmare',
        code: '__output',
        expected: [],
        inputs: ['20'],
      },
    ],
  },
  {
    id: 'grunder-09',
    track: 'grunder',
    title: 'Annars: else',
    xp: 15,
    description:
      'else är det som händer när villkoret i if inte är sant. Då gör programmet alltid exakt en av två saker.',
    explain:
      '`else:` skrivs rakt under if, på samma indrag, och har också ett kolon.\n\nObs: `=` och `==` är olika saker. `svar = "ja"` sparar ett värde, `svar == "ja"` frågar om det är lika. I en if vill du nästan alltid ha `==`. Text jämförs exakt: "Sesam" och "sesam" är inte lika.',
    example:
      'svar = input("Gillar du glass? ")\nif svar == "ja":\n    print("Jag med!")\nelse:\n    print("Synd!")',
    task: 'Uppgift: Fråga efter lösenordet med `input("Lösenord: ")` och spara svaret i variabeln `losenord`. Är det `sesam` ska programmet skriva ut `Välkommen in!`, annars `Fel lösenord`.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'losenord = input("Lösenord: ")\nif losenord == "sesam":\n    print("Välkommen in!")\nelse:\n    print("Fel lösenord")\n',
    hints: [
      'Spara svaret i en variabel och jämför den med "sesam".',
      'Jämför med två likhetstecken: == ',
      'if losenord == "sesam": … else: … – båda med kolon och indragna print-rader.',
    ],
    inputs: ['sesam'],
    tests: [
      {
        description: 'losenord är svaret från input',
        code: 'losenord',
        expected: 'sesam',
      },
      {
        description: 'sesam: Välkommen in!',
        code: '__output',
        expected: ['Välkommen in!'],
      },
      {
        description: 'abc123: Fel lösenord',
        code: '__output',
        expected: ['Fel lösenord'],
        inputs: ['abc123'],
      },
      {
        description: 'Sesam med stort S räknas som fel',
        code: '__output',
        expected: ['Fel lösenord'],
        inputs: ['Sesam'],
      },
    ],
  },
  {
    id: 'grunder-10',
    track: 'grunder',
    title: 'Flera vägar: elif',
    xp: 20,
    description:
      'elif betyder "annars om". Med den kan programmet välja mellan fler än två vägar.',
    explain:
      'Python provar villkoren uppifrån och ner och gör bara det första som är sant. Därför spelar ordningen roll: kolla det minsta först om du jämför med `<`.\n\nDu tar till elif när det finns flera fall som utesluter varandra, som priser för olika åldrar. else sist fångar allt som blev över.',
    example:
      'poang = int(input("Poäng? "))\nif poang >= 90:\n    print("Guld")\nelif poang >= 50:\n    print("Silver")\nelse:\n    print("Brons")',
    task: 'Uppgift: Fråga efter åldern med `input("Ålder? ")`, gör om svaret till ett tal med `int()` och spara det i variabeln `alder`. Under 12 år ska programmet skriva ut `Barnbiljett: 50 kr`, under 65 år `Vuxenbiljett: 120 kr` och annars `Pensionärsbiljett: 80 kr`.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'alder = int(input("Ålder? "))\nif alder < 12:\n    print("Barnbiljett: 50 kr")\nelif alder < 65:\n    print("Vuxenbiljett: 120 kr")\nelse:\n    print("Pensionärsbiljett: 80 kr")\n',
    hints: [
      'Du behöver if, elif och else – tre vägar.',
      'Gör om åldern till ett tal och kolla alder < 12 först, sedan alder < 65.',
      'if alder < 12: … elif alder < 65: … else: … med en print i varje.',
    ],
    inputs: ['8'],
    tests: [
      {
        description: 'alder är svaret som ett tal',
        code: 'alder',
        expected: 8,
      },
      {
        description: '8 år: Barnbiljett: 50 kr',
        code: '__output',
        expected: ['Barnbiljett: 50 kr'],
      },
      {
        description: '30 år: Vuxenbiljett: 120 kr',
        code: '__output',
        expected: ['Vuxenbiljett: 120 kr'],
        inputs: ['30'],
      },
      {
        description: '70 år: Pensionärsbiljett: 80 kr',
        code: '__output',
        expected: ['Pensionärsbiljett: 80 kr'],
        inputs: ['70'],
      },
      {
        description: 'Precis 12 år är vuxen',
        code: '__output',
        expected: ['Vuxenbiljett: 120 kr'],
        inputs: ['12'],
      },
    ],
  },
];
