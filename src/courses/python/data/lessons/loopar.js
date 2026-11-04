// Bana 2: for med range, while och break. Inga listor än (bana 3), så
// looparna går över tal.
export const LOOPAR = [
  {
    id: 'loopar-01',
    track: 'loopar',
    title: 'Upprepa med for',
    xp: 10,
    description:
      'En loop gör samma sak flera gånger. Med for och range bestämmer du hur många.',
    explain:
      '`for i in range(3):` kör raderna under tre gånger. Precis som vid if slutar raden med kolon, och det som ska upprepas är indraget.\n\nDu tar till en loop när du märker att du skulle skriva samma rad flera gånger. Tio print-rader är jobbigt, hundra omöjligt – en loop är lika kort oavsett hur många varv.',
    example: 'for i in range(2):\n    print("Knack knack")',
    task: 'Uppgift: Skriv ut `Hipp hipp hurra!` tre gånger med en for-loop.',
    starterCode: '# Skriv din kod här\n',
    solution: 'for i in range(3):\n    print("Hipp hipp hurra!")\n',
    hints: [
      'range(3) ger tre varv.',
      'for i in range(3): och sedan print på nästa rad.',
      'print-raden måste vara indragen fyra mellanslag.',
    ],
    tests: [
      {
        description: 'Skriver ut Hipp hipp hurra! tre gånger',
        code: '__output',
        expected: ['Hipp hipp hurra!', 'Hipp hipp hurra!', 'Hipp hipp hurra!'],
      },
    ],
    sourceChecks: [{ description: 'Använder en for-loop', pattern: /\bfor\b/ }],
  },
  {
    id: 'loopar-02',
    track: 'loopar',
    title: 'Räkna med range',
    xp: 10,
    description:
      'Variabeln i en for-loop får ett nytt värde för varje varv. range bestämmer vilka värden.',
    explain:
      '`range(1, 6)` ger talen 1, 2, 3, 4, 5 – det sista talet är inte med. Det känns konstigt först, men gör att `range(1, 6)` blir precis fem varv.\n\n`range(5)` utan starttal börjar på 0: 0, 1, 2, 3, 4. Variabeln (ofta `i`) innehåller talet för varvet du är på.',
    example: 'for nummer in range(3, 6):\n    print(nummer)',
    task: 'Uppgift: Skriv ut talen 1 till 5, ett per rad, med en for-loop och range.',
    starterCode: '# Skriv din kod här\n',
    solution: 'for i in range(1, 6):\n    print(i)\n',
    hints: [
      'range(start, stopp) – stopp är inte med.',
      'Vill du ha 1 till 5 blir det range(1, 6).',
      'for i in range(1, 6): och print(i) indraget under.',
    ],
    tests: [
      {
        description: 'Skriver ut 1 till 5',
        code: '__output',
        expected: ['1', '2', '3', '4', '5'],
      },
    ],
    sourceChecks: [{ description: 'Använder range', pattern: /\brange\(/ }],
  },
  {
    id: 'loopar-03',
    track: 'loopar',
    title: 'Steg i range',
    xp: 10,
    description: 'range kan ta ett tredje tal: hur stora steg den ska ta.',
    explain:
      '`range(0, 20, 5)` ger 0, 5, 10, 15. Stegen kan också vara negativa: `range(3, 0, -1)` ger 3, 2, 1.\n\nDu tar till steg när du bara vill ha vart annat, vart femte eller räkna baklänges – i stället för att hoppa över varv med if.',
    example: 'for i in range(10, 31, 10):\n    print(i)',
    task: 'Uppgift: Skriv ut de jämna talen 2, 4, 6, 8 och 10, ett per rad.',
    starterCode: '# Skriv din kod här\n',
    solution: 'for i in range(2, 11, 2):\n    print(i)\n',
    hints: [
      'Börja på 2 och ta steg om 2.',
      'Stopptalet är inte med, så det måste vara större än 10.',
      'range(2, 11, 2)',
    ],
    tests: [
      {
        description: 'Skriver ut 2, 4, 6, 8, 10',
        code: '__output',
        expected: ['2', '4', '6', '8', '10'],
      },
    ],
  },
  {
    id: 'loopar-04',
    track: 'loopar',
    title: 'Summera i en loop',
    xp: 15,
    description:
      'Ett av de vanligaste mönstren: en variabel som samlar ihop något, varv för varv.',
    explain:
      'Skapa variabeln före loopen, `summa = 0`, och lägg till i varje varv: `summa = summa + i`. Det går också att skriva kortare: `summa += i`.\n\nVariabeln måste skapas före loopen. Skapar du den inuti börjar den om på 0 varje varv. Du tar till mönstret när du vill räkna ihop, räkna antal eller hitta det största.',
    example: 'antal = 0\nfor i in range(4):\n    antal += 1\nprint(antal)',
    task: 'Uppgift: Räkna ut summan av alla tal från 1 till 100 i variabeln `summa`, med en loop. Skriv sedan ut `summa`.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'summa = 0\nfor i in range(1, 101):\n    summa += i\nprint(summa)\n',
    hints: [
      'Börja med summa = 0 före loopen.',
      'Loopa över range(1, 101) och lägg till i varje varv med summa += i.',
      'print(summa) ska stå efter loopen, utan indrag – annars skrivs den ut 100 gånger.',
    ],
    tests: [
      { description: 'summa är 5050', code: 'summa', expected: 5050 },
      {
        description: 'Skriver ut 5050 en gång',
        code: '__output',
        expected: ['5050'],
      },
    ],
    sourceChecks: [
      { description: 'Använder en loop', pattern: /\b(for|while)\b/ },
    ],
  },
  {
    id: 'loopar-05',
    track: 'loopar',
    title: 'Multiplikationstabellen',
    xp: 15,
    description:
      'Loopvariabeln går att räkna med. Tillsammans med input blir en loop ett riktigt litet verktyg.',
    explain:
      'I varje varv kan du räkna med `i`: `tal * i`. För att skriva ut resultatet tillsammans med text behövs `str()` runt talen, precis som i förra banan.\n\nTips: bygg raden lite i taget. Skriv först bara `print(i)`, kör, och lägg sedan till resten.',
    example:
      'tal = 5\nfor i in range(1, 4):\n    print(str(i) + " gånger " + str(tal) + " är " + str(i * tal))',
    task: 'Uppgift: Fråga efter ett tal med `input("Vilken tabell? ")`, gör om svaret till ett tal med `int()` och spara det i variabeln `tal`. Skriv ut tabellen från 1 till 10 så här: `3 x 1 = 3`, `3 x 2 = 6` … `3 x 10 = 30`.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'tal = int(input("Vilken tabell? "))\nfor i in range(1, 11):\n    print(str(tal) + " x " + str(i) + " = " + str(tal * i))\n',
    hints: [
      'Gör om svaret till ett tal med int, och loopa över range(1, 11).',
      'Raden byggs av fem delar: tal, " x ", i, " = " och tal * i.',
      'print(str(tal) + " x " + str(i) + " = " + str(tal * i))',
    ],
    inputs: ['3'],
    tests: [
      { description: 'tal är svaret som ett tal', code: 'tal', expected: 3 },
      {
        description: 'Tabellen för 3',
        code: '__output',
        expected: [
          '3 x 1 = 3',
          '3 x 2 = 6',
          '3 x 3 = 9',
          '3 x 4 = 12',
          '3 x 5 = 15',
          '3 x 6 = 18',
          '3 x 7 = 21',
          '3 x 8 = 24',
          '3 x 9 = 27',
          '3 x 10 = 30',
        ],
      },
      {
        description: 'Tabellen för 7 slutar med 7 x 10 = 70',
        code: '__output[-1]',
        expected: '7 x 10 = 70',
        inputs: ['7'],
      },
    ],
  },
  {
    id: 'loopar-06',
    track: 'loopar',
    title: 'Udda eller jämnt',
    xp: 15,
    description: 'En if inuti en loop gör att varje varv kan bli olika.',
    explain:
      '`%` ger resten vid division: `7 % 2` är 1, `8 % 2` är 0. Ett tal är jämnt när resten vid delning med 2 är 0, alltså `i % 2 == 0`.\n\nNär if står inuti en loop blir det två indrag: if-raden är indragen en gång under for, och det som hör till if:en två gånger.',
    example:
      'for i in range(1, 7):\n    if i % 3 == 0:\n        print(str(i) + " går jämnt upp i 3")',
    task: 'Uppgift: För talen 1 till 6, skriv ut `1 är udda`, `2 är jämnt` och så vidare.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'for i in range(1, 7):\n    if i % 2 == 0:\n        print(str(i) + " är jämnt")\n    else:\n        print(str(i) + " är udda")\n',
    hints: [
      'Loopa över range(1, 7) och använd if/else inuti.',
      'i % 2 == 0 är sant för jämna tal.',
      'print(str(i) + " är jämnt") i if-delen och " är udda" i else-delen.',
    ],
    tests: [
      {
        description: 'Skriver ut udda och jämnt för 1–6',
        code: '__output',
        expected: [
          '1 är udda',
          '2 är jämnt',
          '3 är udda',
          '4 är jämnt',
          '5 är udda',
          '6 är jämnt',
        ],
      },
    ],
  },
  {
    id: 'loopar-07',
    track: 'loopar',
    title: 'Så länge: while',
    xp: 15,
    description:
      'while upprepar så länge ett villkor är sant. Den passar när du inte vet i förväg hur många varv det blir.',
    explain:
      '`while kvar > 0:` kör om och om igen tills villkoret blir falskt. Därför måste något i loopen ändra variabeln – annars tar loopen aldrig slut. Glömmer du det stoppar Academy koden efter tre sekunder.\n\nTumregel: vet du antalet varv, ta for. Ska loopen hålla på tills något händer, ta while.',
    example:
      'vatten = 3\nwhile vatten > 0:\n    print("Klunk")\n    vatten = vatten - 1\nprint("Tomt!")',
    task: 'Uppgift: Gör en nedräkning med while. Börja med `nedrakning = 5` och skriv ut 5, 4, 3, 2, 1. Skriv sedan ut `Lyft!`.',
    starterCode: 'nedrakning = 5\n',
    solution:
      'nedrakning = 5\nwhile nedrakning > 0:\n    print(nedrakning)\n    nedrakning -= 1\nprint("Lyft!")\n',
    hints: [
      'Loopa så länge nedrakning > 0.',
      'I varje varv: skriv ut talet, och minska det sedan med 1 (nedrakning -= 1).',
      'print("Lyft!") ska stå efter loopen, utan indrag.',
    ],
    tests: [
      {
        description: 'Skriver ut 5, 4, 3, 2, 1, Lyft!',
        code: '__output',
        expected: ['5', '4', '3', '2', '1', 'Lyft!'],
      },
      {
        description: 'nedrakning är 0 till slut',
        code: 'nedrakning',
        expected: 0,
      },
    ],
    sourceChecks: [{ description: 'Använder while', pattern: /\bwhile\b/ }],
  },
  {
    id: 'loopar-08',
    track: 'loopar',
    title: 'Avbryt med break',
    xp: 15,
    description: 'break hoppar ur loopen direkt, även om det finns varv kvar.',
    explain:
      'Ofta söker man efter något i en loop. När man hittat det finns ingen anledning att fortsätta – då tar du till `break`. Koden fortsätter på raden efter loopen.\n\nbreak står nästan alltid inuti en if: "om jag hittat det jag letar efter, sluta".',
    example:
      'for i in range(1, 100):\n    if i * i > 50:\n        print(i)\n        break',
    task: 'Uppgift: Du sparar 150 kr i veckan, med start på `sparat = 0`. Loopa över veckorna 1 till 52 och lägg till 150 varje vecka. Så fort `sparat` är 1000 eller mer, skriv ut `Vecka 7: nu räcker det!` (med rätt vecka) och avbryt loopen.',
    starterCode: 'sparat = 0\n',
    solution:
      'sparat = 0\nfor vecka in range(1, 53):\n    sparat += 150\n    if sparat >= 1000:\n        print("Vecka " + str(vecka) + ": nu räcker det!")\n        break\n',
    hints: [
      'for vecka in range(1, 53): och sparat += 150 i varje varv.',
      'Efter att du lagt till pengarna: if sparat >= 1000:',
      'Inuti if:en: print("Vecka " + str(vecka) + ": nu räcker det!") och sedan break.',
    ],
    tests: [
      {
        description: 'Skriver ut Vecka 7: nu räcker det! en gång',
        code: '__output',
        expected: ['Vecka 7: nu räcker det!'],
      },
      {
        description: 'Loopen stannar på 1050 kr',
        code: 'sparat',
        expected: 1050,
      },
    ],
    sourceChecks: [{ description: 'Använder break', pattern: /\bbreak\b/ }],
  },
  {
    id: 'loopar-09',
    track: 'loopar',
    title: 'Gissa talet',
    xp: 20,
    description:
      'while True med break är en loop som håller på tills något inträffar – perfekt när man frågar tills svaret är rätt.',
    explain:
      '`while True:` är en loop som aldrig tar slut av sig själv. I stället avslutar du den med break när du är klar. Mönstret passar när du inte kan veta svaret förrän inne i loopen, som när användaren gissar.\n\nHär kombinerar du allt från banan: input, int, if/elif/else, while och break.',
    example:
      'while True:\n    svar = input("Säg hej: ")\n    if svar == "hej":\n        print("Tack!")\n        break\n    print("Försök igen")',
    task: 'Uppgift: Det hemliga talet är `hemligt = 7`. Inuti en loop: fråga med `input("Gissa: ")`, gör om svaret till ett tal med `int()` och spara det i variabeln `gissning`. Är gissningen för låg, skriv `För lågt`. För hög, skriv `För högt`. Rätt, skriv `Rätt!` och avsluta loopen.',
    starterCode: 'hemligt = 7\n',
    solution:
      'hemligt = 7\nwhile True:\n    gissning = int(input("Gissa: "))\n    if gissning < hemligt:\n        print("För lågt")\n    elif gissning > hemligt:\n        print("För högt")\n    else:\n        print("Rätt!")\n        break\n',
    hints: [
      'while True: och läs en gissning med int(input(…)) först i varje varv.',
      'if gissning < hemligt: … elif gissning > hemligt: … else: …',
      'I else-delen: print("Rätt!") och break på varsin rad.',
    ],
    inputs: ['3', '9', '7'],
    tests: [
      {
        description: 'gissning är den sista gissningen, som ett tal',
        code: 'gissning',
        expected: 7,
      },
      {
        description: 'Gissar 3, 9 och 7',
        code: '__output',
        expected: ['För lågt', 'För högt', 'Rätt!'],
      },
      {
        description: 'Rätt på första försöket',
        code: '__output',
        expected: ['Rätt!'],
        inputs: ['7'],
      },
      {
        description: 'Gissar 1, 2, 10 och 7',
        code: '__output',
        expected: ['För lågt', 'För lågt', 'För högt', 'Rätt!'],
        inputs: ['1', '2', '10', '7'],
      },
    ],
  },
];
