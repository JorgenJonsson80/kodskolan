// Bana 5: strängar. Här kommer f-strängarna, och från och med nu får facit
// använda dem.
export const STRANGAR = [
  {
    id: 'strangar-01',
    track: 'strangar',
    title: 'f-strängar',
    xp: 10,
    description:
      'Ett enklare sätt att sätta ihop text och variabler: skriv variabeln direkt i texten.',
    explain:
      'Sätt ett `f` framför citattecknet och skriv variabler inom klammerparenteser: `f"{namn} är {alder} år"`. Python byter ut `{namn}` mot värdet.\n\nDu slipper både `+` och `str()` – tal görs om till text automatiskt. Det är så de flesta skriver Python i dag, så från och med nu används f-strängar i facit.',
    example:
      'stad = "Luleå"\ngrader = -12\nprint(f"I {stad} är det {grader} grader")',
    task: 'Uppgift: Skriv ut `Ali är 12 år.` med en f-sträng och variablerna `namn` och `alder`.',
    starterCode: 'namn = "Ali"\nalder = 12\n',
    solution: 'namn = "Ali"\nalder = 12\nprint(f"{namn} är {alder} år.")\n',
    hints: [
      'En f-sträng börjar med f före citattecknet: f"…"',
      'Variablerna skrivs inom { och }.',
      'print(f"{namn} är {alder} år.")',
    ],
    tests: [
      {
        description: 'Skriver ut Ali är 12 år.',
        code: '__output',
        expected: ['Ali är 12 år.'],
      },
    ],
    sourceChecks: [
      { description: 'Använder en f-sträng', pattern: /\bf["']/ },
      {
        description: 'Använder variablerna, inte texten Ali',
        pattern: /print\([^)]*Ali/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'strangar-02',
    track: 'strangar',
    title: 'Stora och små bokstäver',
    xp: 10,
    description:
      'Text har egna metoder. upper och lower ger texten med stora eller små bokstäver.',
    explain:
      '`svar.lower()` ger en kopia av texten med bara små bokstäver. Originalet ändras inte – text i Python går aldrig att ändra, metoderna ger alltid en ny text.\n\nDu tar till lower när du jämför det någon skrivit. Då spelar det ingen roll om de skriver "JA", "Ja" eller "ja".',
    example:
      'halsning = "Hej"\nprint(halsning.upper())\nprint(halsning.lower())',
    task: 'Uppgift: Fråga `input("Vill du fortsätta? ")` och spara svaret i `svar`. Är svaret ja – oavsett stora eller små bokstäver – skriver du ut `Då kör vi!`, annars `Hej då!`.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'svar = input("Vill du fortsätta? ")\nif svar.lower() == "ja":\n    print("Då kör vi!")\nelse:\n    print("Hej då!")\n',
    hints: [
      'Gör om svaret till små bokstäver innan du jämför.',
      'svar.lower() == "ja" är sant för JA, Ja och ja.',
      'if svar.lower() == "ja": och else: under.',
    ],
    inputs: ['JA'],
    tests: [
      {
        description: 'JA ger Då kör vi!',
        code: '__output',
        expected: ['Då kör vi!'],
      },
      {
        description: 'Ja ger Då kör vi!',
        code: '__output',
        expected: ['Då kör vi!'],
        inputs: ['Ja'],
      },
      {
        description: 'nej ger Hej då!',
        code: '__output',
        expected: ['Hej då!'],
        inputs: ['nej'],
      },
    ],
  },
  {
    id: 'strangar-03',
    track: 'strangar',
    title: 'Tecken med index',
    xp: 10,
    description:
      'En text är en rad med tecken. Du hämtar ett tecken precis som i en lista.',
    explain:
      '`ordet[0]` är första tecknet och `ordet[-1]` det sista, precis som med listor. `len(ordet)` ger antalet tecken.\n\nMellanslag och skiljetecken räknas också som tecken.',
    example: 'stad = "Umeå"\nprint(stad[0])\nprint(len(stad))',
    task: 'Uppgift: Skriv ut första tecknet i `ordet`, sedan sista tecknet och sist antalet tecken – ett per rad.',
    starterCode: 'ordet = "Python"\n',
    solution:
      'ordet = "Python"\nprint(ordet[0])\nprint(ordet[-1])\nprint(len(ordet))\n',
    hints: [
      'ordet[0] är första tecknet.',
      'ordet[-1] är sista tecknet och len(ordet) antalet.',
      'Tre print-rader: ordet[0], ordet[-1] och len(ordet).',
    ],
    tests: [
      {
        description: 'Skriver ut P, n och 6',
        code: '__output',
        expected: ['P', 'n', '6'],
      },
    ],
  },
  {
    id: 'strangar-04',
    track: 'strangar',
    title: 'Klipp ut en bit',
    xp: 15,
    description:
      'Med en skiva (slice) klipper du ut en bit av en text – eller av en lista.',
    explain:
      '`text[0:4]` ger tecknen från index 0 till 4, men inte 4 – precis som range. `text[4:6]` ger index 4 och 5.\n\nUtelämnar du ett tal går skivan till början eller slutet: `text[:4]` är de fyra första och `text[9:]` allt från index 9.',
    example: 'datum = "2026-10-29"\nprint(datum[5:7])',
    task: 'Uppgift: Klipp ut året (de fyra första tecknen) till `ar` och månaden (de två nästa) till `manad`. Skriv sedan ut `Född 2012, månad 03`.',
    starterCode: 'personnummer = "20120315-1234"\n',
    solution:
      'personnummer = "20120315-1234"\nar = personnummer[0:4]\nmanad = personnummer[4:6]\nprint(f"Född {ar}, månad {manad}")\n',
    hints: [
      'Året är index 0 till 3, alltså personnummer[0:4].',
      'Månaden är index 4 och 5: personnummer[4:6].',
      'print(f"Född {ar}, månad {manad}")',
    ],
    tests: [
      { description: 'ar är 2012', code: 'ar', expected: '2012' },
      { description: 'manad är 03', code: 'manad', expected: '03' },
      {
        description: 'Skriver ut Född 2012, månad 03',
        code: '__output',
        expected: ['Född 2012, månad 03'],
      },
    ],
  },
  {
    id: 'strangar-05',
    track: 'strangar',
    title: 'Dela upp med split',
    xp: 15,
    description:
      'split delar en text i en lista. Perfekt för text med kommatecken eller ord.',
    explain:
      '`rad.split(",")` delar texten vid varje kommatecken och ger en lista. Utan något inom parentesen delar split vid mellanslag: `"hej på dig".split()` blir `["hej", "på", "dig"]`.\n\nDu tar till split när du får data som en lång text, till exempel en rad från en fil eller det någon skrivit i en input.',
    example: 'tid = "12:45"\ndelar = tid.split(":")\nprint(delar)',
    task: 'Uppgift: Dela `rad` vid kommatecknen och spara listan i `frukter`. Skriv sedan ut varje frukt på en egen rad.',
    starterCode: 'rad = "äpple,banan,päron"\n',
    solution:
      'rad = "äpple,banan,päron"\nfrukter = rad.split(",")\nfor frukt in frukter:\n    print(frukt)\n',
    hints: [
      'rad.split(",") ger en lista.',
      'Spara listan: frukter = rad.split(",")',
      'Loopa sedan: for frukt in frukter: och print(frukt).',
    ],
    tests: [
      {
        description: 'frukter är en lista med tre frukter',
        code: 'frukter',
        expected: ['äpple', 'banan', 'päron'],
      },
      {
        description: 'Skriver ut en frukt per rad',
        code: '__output',
        expected: ['äpple', 'banan', 'päron'],
      },
    ],
    sourceChecks: [{ description: 'Använder split', pattern: /\.split\(/ }],
  },
  {
    id: 'strangar-06',
    track: 'strangar',
    title: 'Sätt ihop med join',
    xp: 15,
    description:
      'join gör tvärtom mot split: den sätter ihop en lista till en text.',
    explain:
      '`" ".join(orden)` sätter ihop orden med ett mellanslag emellan. Texten före punkten är det som hamnar *mellan* sakerna, så `", ".join(lista)` ger en lista med kommatecken.\n\nDet ser bakvänt ut första gången. Tänk: "lim".join(bitarna).',
    example: 'bokstaver = ["a", "b", "c"]\nprint("-".join(bokstaver))',
    task: 'Uppgift: Sätt ihop orden i listan `orden` med mellanslag emellan, spara texten i `mening` och skriv ut den.',
    starterCode: 'orden = ["Python", "är", "kul"]\n',
    solution:
      'orden = ["Python", "är", "kul"]\nmening = " ".join(orden)\nprint(mening)\n',
    hints: [
      'Det som ska stå mellan orden skrivs före .join.',
      'mening = " ".join(orden)',
      'Glöm inte print(mening).',
    ],
    tests: [
      {
        description: 'mening är Python är kul',
        code: 'mening',
        expected: 'Python är kul',
      },
      {
        description: 'Skriver ut meningen',
        code: '__output',
        expected: ['Python är kul'],
      },
    ],
    sourceChecks: [{ description: 'Använder join', pattern: /\.join\(/ }],
  },
  {
    id: 'strangar-07',
    track: 'strangar',
    title: 'Städa upp text',
    xp: 15,
    description:
      'Det folk skriver är sällan snyggt. strip och capitalize städar upp det.',
    explain:
      '`text.strip()` tar bort mellanslag i början och slutet. `text.capitalize()` ger stor första bokstav och små på resten.\n\nMetoderna går att kedja: `text.strip().capitalize()` kör strip först och capitalize på resultatet.',
    example: 'stad = "  gÖteborg "\nprint(stad.strip().capitalize())',
    task: 'Uppgift: Fråga `input("Ditt namn: ")` och spara svaret i `inmatning`. Städa det med strip och capitalize, spara i `namn` och skriv ut `Hej Anna!`.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'inmatning = input("Ditt namn: ")\nnamn = inmatning.strip().capitalize()\nprint(f"Hej {namn}!")\n',
    hints: [
      'Börja med inmatning = input("Ditt namn: ").',
      'namn = inmatning.strip().capitalize()',
      'print(f"Hej {namn}!")',
    ],
    inputs: ['  anna  '],
    tests: [
      { description: 'namn är Anna', code: 'namn', expected: 'Anna' },
      {
        description: 'Skriver ut Hej Anna!',
        code: '__output',
        expected: ['Hej Anna!'],
      },
      {
        description: 'BO blir Bo',
        code: '__output',
        expected: ['Hej Bo!'],
        inputs: ['BO'],
      },
    ],
  },
  {
    id: 'strangar-08',
    track: 'strangar',
    title: 'Loopa över tecken',
    xp: 15,
    description: 'for kan gå igenom en text, ett tecken i taget.',
    explain:
      '`for tecken in ordet:` ger variabeln `tecken` en bokstav per varv. Det fungerar precis som med en lista.\n\nText har också metoden `count`, som räknar åt dig. Men loopen behövs när du vill göra något mer, till exempel räkna alla vokaler.',
    example:
      'antal = 0\nfor tecken in "hej hopp":\n    if tecken == " ":\n        antal += 1\nprint(antal)',
    task: 'Uppgift: Räkna hur många `a` det finns i `ordet` med en loop. Spara antalet i `antal` och skriv ut `Antal a: 3`.',
    starterCode: 'ordet = "ananas"\n',
    solution:
      'ordet = "ananas"\nantal = 0\nfor tecken in ordet:\n    if tecken == "a":\n        antal += 1\nprint(f"Antal a: {antal}")\n',
    hints: [
      'antal = 0 före loopen.',
      'for tecken in ordet: och if tecken == "a": inuti.',
      'print(f"Antal a: {antal}") efter loopen.',
    ],
    tests: [
      { description: 'antal är 3', code: 'antal', expected: 3 },
      {
        description: 'Skriver ut Antal a: 3',
        code: '__output',
        expected: ['Antal a: 3'],
      },
    ],
    sourceChecks: [{ description: 'Använder en for-loop', pattern: /\bfor\b/ }],
  },
  {
    id: 'strangar-09',
    track: 'strangar',
    title: 'Byt ut med replace',
    xp: 15,
    description:
      'replace byter ut en bit text mot en annan – som sök och ersätt.',
    explain:
      '`text.replace("NAMN", namn)` ger en ny text där varje NAMN har bytts ut. Finns biten inte händer ingenting.\n\nDu tar till replace när du har en mall som ska fyllas i, eller när du vill rensa bort tecken, till exempel mellanslag i ett telefonnummer.',
    example: 'nummer = "070 123 45 67"\nprint(nummer.replace(" ", ""))',
    task: 'Uppgift: Fråga `input("Vad heter du? ")` och spara svaret i `namn`. Byt ut `NAMN` i `mall` mot namnet och skriv ut resultatet.',
    starterCode: 'mall = "Hej NAMN, välkommen till klubben!"\n',
    solution:
      'mall = "Hej NAMN, välkommen till klubben!"\nnamn = input("Vad heter du? ")\nprint(mall.replace("NAMN", namn))\n',
    hints: [
      'Börja med namn = input("Vad heter du? ").',
      'mall.replace("NAMN", namn) ger den ifyllda texten.',
      'print(mall.replace("NAMN", namn))',
    ],
    inputs: ['Bea'],
    tests: [
      {
        description: 'Skriver ut Hej Bea, välkommen till klubben!',
        code: '__output',
        expected: ['Hej Bea, välkommen till klubben!'],
      },
      {
        description: 'Fungerar med ett annat namn',
        code: '__output',
        expected: ['Hej Cem, välkommen till klubben!'],
        inputs: ['Cem'],
      },
    ],
    sourceChecks: [{ description: 'Använder replace', pattern: /\.replace\(/ }],
  },
];
