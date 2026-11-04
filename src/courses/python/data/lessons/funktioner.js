// Bana 4: funktioner. Testerna anropar funktionerna direkt, så Kör rad för
// rad kan visa dem med första testets anrop. Fortfarande inga f-strängar.
export const FUNKTIONER = [
  {
    id: 'funktioner-01',
    track: 'funktioner',
    title: 'Din första funktion',
    xp: 10,
    description:
      'En funktion är kod med ett namn. Du skapar den en gång och kör den hur många gånger du vill.',
    explain:
      '`def halsa():` skapar funktionen. Raderna som hör till den är indragna, precis som i en if eller loop. Att skapa funktionen kör inte koden – det gör du genom att *anropa* den: `halsa()`.\n\nDu tar till en funktion när du skriver samma kod på flera ställen. Ska den ändras behöver du bara ändra på ett ställe.',
    example: 'def klappa():\n    print("Klapp klapp!")\n\nklappa()',
    task: 'Uppgift: Skapa funktionen `halsa` som skriver ut `Hej från funktionen!`. Anropa den sedan två gånger.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'def halsa():\n    print("Hej från funktionen!")\n\n\nhalsa()\nhalsa()\n',
    hints: [
      'def halsa(): och print-raden indragen under.',
      'Anropet halsa() står efter funktionen, utan indrag.',
      'Skriv halsa() två gånger längst ner.',
    ],
    tests: [
      {
        description: 'Skriver ut hälsningen två gånger',
        code: '__output',
        expected: ['Hej från funktionen!', 'Hej från funktionen!'],
      },
    ],
    sourceChecks: [
      { description: 'Skapar funktionen halsa', pattern: /\bdef\s+halsa\s*\(/ },
    ],
  },
  {
    id: 'funktioner-02',
    track: 'funktioner',
    title: 'Parametrar',
    xp: 10,
    description:
      'En parameter är en variabel som funktionen får av den som anropar den.',
    explain:
      '`def halsa(namn):` betyder att funktionen tar emot ett värde och kallar det `namn`. Anropar du `halsa("Ali")` innehåller `namn` texten "Ali" medan funktionen körs.\n\nDet gör funktionen användbar: samma kod, men olika resultat beroende på vad du skickar in.',
    example: 'def ropa(ord):\n    print(ord + "!!!")\n\nropa("Hej")',
    task: 'Uppgift: Ändra `halsa` så att den tar parametern `namn` och skriver ut `Hej Ali!` med rätt namn. Anropa den med `"Ali"` och sedan med `"Bea"`.',
    starterCode: 'def halsa():\n    print("Hej!")\n',
    solution:
      'def halsa(namn):\n    print("Hej " + namn + "!")\n\n\nhalsa("Ali")\nhalsa("Bea")\n',
    hints: [
      'Parametern skrivs inom parentesen: def halsa(namn):',
      'Sätt ihop texten med namn: "Hej " + namn + "!"',
      'Anropa med halsa("Ali") och halsa("Bea").',
    ],
    tests: [
      {
        description: 'Hälsar på Ali och Bea',
        code: '__output',
        expected: ['Hej Ali!', 'Hej Bea!'],
      },
    ],
  },
  {
    id: 'funktioner-03',
    track: 'funktioner',
    title: 'Ge tillbaka med return',
    xp: 15,
    description:
      'return skickar tillbaka ett svar från funktionen, så att resten av programmet kan använda det.',
    explain:
      '`return tal * 2` avslutar funktionen och ger tillbaka svaret. Den som anropar kan spara det: `svar = dubbla(4)`.\n\nSkillnaden mot print: print visar något för människor, return ger ett värde till programmet. En funktion som räknar ut något ska nästan alltid använda return – då kan svaret användas vidare.',
    example: 'def tredubbla(tal):\n    return tal * 3\n\nprint(tredubbla(5))',
    task: 'Uppgift: Gör klart funktionen `dubbla` så att den returnerar talet gånger 2. `dubbla(4)` ska ge 8.',
    starterCode: 'def dubbla(tal):\n    # Skriv din kod här\n    pass\n',
    solution: 'def dubbla(tal):\n    return tal * 2\n',
    hints: [
      'pass gör ingenting – byt ut det mot en return.',
      'return följt av det som ska ges tillbaka.',
      'return tal * 2',
    ],
    tests: [
      { description: 'dubbla(4) ger 8', code: 'dubbla(4)', expected: 8 },
      { description: 'dubbla(0) ger 0', code: 'dubbla(0)', expected: 0 },
      { description: 'dubbla(-3) ger -6', code: 'dubbla(-3)', expected: -6 },
    ],
  },
  {
    id: 'funktioner-04',
    track: 'funktioner',
    title: 'Flera parametrar',
    xp: 15,
    description:
      'En funktion kan ta flera värden. De skiljs åt med kommatecken.',
    explain:
      '`def area(bredd, hojd):` tar två parametrar. Vid anropet hamnar värdena i samma ordning: `area(3, 4)` ger `bredd` värdet 3 och `hojd` värdet 4.\n\nOrdningen spelar roll. Välj namn som gör det tydligt vad som är vad.',
    example: 'def plus(a, b):\n    return a + b\n\nprint(plus(2, 3))',
    task: 'Uppgift: Skapa funktionen `area(bredd, hojd)` som returnerar arean av en rektangel, alltså bredd gånger höjd.',
    starterCode: '# Skriv din kod här\n',
    solution: 'def area(bredd, hojd):\n    return bredd * hojd\n',
    hints: [
      'def area(bredd, hojd):',
      'Arean är bredd * hojd.',
      'return bredd * hojd indraget under def-raden.',
    ],
    tests: [
      { description: 'area(3, 4) ger 12', code: 'area(3, 4)', expected: 12 },
      { description: 'area(10, 2) ger 20', code: 'area(10, 2)', expected: 20 },
      { description: 'area(5, 0) ger 0', code: 'area(5, 0)', expected: 0 },
    ],
  },
  {
    id: 'funktioner-05',
    track: 'funktioner',
    title: 'Svara ja eller nej',
    xp: 15,
    description:
      'En funktion kan returnera True eller False. Då passar den perfekt i en if.',
    explain:
      'En jämförelse som `alder >= 18` är redan True eller False. Du kan returnera den direkt: `return alder >= 18`.\n\nSådana funktioner får gärna namn som låter som en fråga, till exempel `ar_myndig`. Då läses koden nästan som svenska: `if ar_myndig(alder):`.',
    example:
      'def ar_negativ(tal):\n    return tal < 0\n\nprint(ar_negativ(-5))',
    task: 'Uppgift: Skapa funktionen `ar_myndig(alder)` som returnerar True om åldern är 18 eller mer, annars False.',
    starterCode: '# Skriv din kod här\n',
    solution: 'def ar_myndig(alder):\n    return alder >= 18\n',
    hints: [
      'Jämförelsen alder >= 18 är redan True eller False.',
      'Du behöver ingen if – returnera jämförelsen direkt.',
      'return alder >= 18',
    ],
    tests: [
      {
        description: 'ar_myndig(20) ger True',
        code: 'ar_myndig(20)',
        expected: true,
      },
      {
        description: 'ar_myndig(18) ger True',
        code: 'ar_myndig(18)',
        expected: true,
      },
      {
        description: 'ar_myndig(12) ger False',
        code: 'ar_myndig(12)',
        expected: false,
      },
    ],
  },
  {
    id: 'funktioner-06',
    track: 'funktioner',
    title: 'Flera return',
    xp: 15,
    description:
      'En funktion kan ha flera return. Den första som körs avslutar funktionen.',
    explain:
      'Med if och elif i en funktion kan varje gren ha sin egen return. När en return körs är funktionen klar – resten hoppas över.\n\nDet gör att du ofta kan strunta i else: kommer koden förbi alla if-satser vet du redan att inget av villkoren stämde.',
    example:
      'def tecken(tal):\n    if tal > 0:\n        return "plus"\n    if tal < 0:\n        return "minus"\n    return "noll"\n\nprint(tecken(-2))',
    task: 'Uppgift: Skapa `vader(temp)` som returnerar `kallt` under 10 grader, `lagom` från 10 upp till 24 och `varmt` från 25.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'def vader(temp):\n    if temp < 10:\n        return "kallt"\n    elif temp < 25:\n        return "lagom"\n    return "varmt"\n',
    hints: [
      'Kolla det lägsta först: if temp < 10: return "kallt"',
      'Kommer du förbi den vet du att temp är minst 10. Nästa: elif temp < 25:',
      'Sist en return "varmt" utan villkor.',
    ],
    tests: [
      {
        description: 'vader(3) ger kallt',
        code: 'vader(3)',
        expected: 'kallt',
      },
      {
        description: 'vader(10) ger lagom',
        code: 'vader(10)',
        expected: 'lagom',
      },
      {
        description: 'vader(24) ger lagom',
        code: 'vader(24)',
        expected: 'lagom',
      },
      {
        description: 'vader(25) ger varmt',
        code: 'vader(25)',
        expected: 'varmt',
      },
    ],
  },
  {
    id: 'funktioner-07',
    track: 'funktioner',
    title: 'Standardvärden',
    xp: 15,
    description:
      'En parameter kan ha ett standardvärde. Då får den som anropar välja om den vill skicka med något.',
    explain:
      '`def halsning(namn, ord="Hej"):` gör att `ord` blir "Hej" om man inte skickar med något annat. `halsning("Ali")` och `halsning("Ali", "Tjena")` fungerar båda.\n\nParametrar med standardvärde ska stå sist. Du känner igen det från `print`, som har standardvärden du sällan ändrar.',
    example:
      'def bestall(vara, antal=1):\n    return str(antal) + " st " + vara\n\nprint(bestall("bulle"))\nprint(bestall("kaka", 3))',
    task: 'Uppgift: Skapa `halsning(namn, halsningsord="Hej")` som returnerar t.ex. `Hej Ali!` eller `God morgon Bea!`.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'def halsning(namn, halsningsord="Hej"):\n    return halsningsord + " " + namn + "!"\n',
    hints: [
      'Standardvärdet skrivs i parentesen: halsningsord="Hej"',
      'Sätt ihop halsningsord, ett mellanslag, namn och ett utropstecken.',
      'return halsningsord + " " + namn + "!"',
    ],
    tests: [
      {
        description: 'halsning("Ali") ger Hej Ali!',
        code: 'halsning("Ali")',
        expected: 'Hej Ali!',
      },
      {
        description: 'halsning("Bea", "God morgon") ger God morgon Bea!',
        code: 'halsning("Bea", "God morgon")',
        expected: 'God morgon Bea!',
      },
    ],
  },
  {
    id: 'funktioner-08',
    track: 'funktioner',
    title: 'En funktion som tar en lista',
    xp: 20,
    description:
      'Parametrar kan vara vad som helst, även listor. Då kan funktionen räkna på många värden.',
    explain:
      'Inne i funktionen loopar du över listan precis som förut. Variabler som skapas i funktionen, som `total`, finns bara där – de kallas *lokala*. Utanför funktionen syns de inte.\n\nDet är en fördel: funktionen kan inte råka ändra variabler i resten av programmet.',
    example:
      'def antal_stora(tal):\n    antal = 0\n    for t in tal:\n        if t > 10:\n            antal += 1\n    return antal\n\nprint(antal_stora([5, 12, 30]))',
    task: 'Uppgift: Skapa `summa(tal)` som räknar ihop alla tal i listan med en loop och returnerar summan. En tom lista ska ge 0.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'def summa(tal):\n    total = 0\n    for t in tal:\n        total += t\n    return total\n',
    hints: [
      'Samma mönster som i bana 3: total = 0 och en loop.',
      'Glöm inte att returnera total – efter loopen, inte inuti.',
      'return total ska ha samma indrag som for-raden.',
    ],
    tests: [
      {
        description: 'summa([1, 2, 3]) ger 6',
        code: 'summa([1, 2, 3])',
        expected: 6,
      },
      {
        description: 'summa([10, -4]) ger 6',
        code: 'summa([10, -4])',
        expected: 6,
      },
      { description: 'summa([]) ger 0', code: 'summa([])', expected: 0 },
    ],
  },
  {
    id: 'funktioner-09',
    track: 'funktioner',
    title: 'Funktioner som anropar funktioner',
    xp: 20,
    description:
      'En funktion kan använda en annan. Så bygger man stora program av små, enkla delar.',
    explain:
      'När `medel` behöver en summa anropar den bara `summa(tal)`. Den behöver inte veta hur summan räknas ut.\n\n`/` ger alltid ett decimaltal: `6 / 3` blir 2.0. Det är samma tal som 2, så testerna godkänner båda.',
    example:
      'def dubbla(tal):\n    return tal * 2\n\ndef fyrdubbla(tal):\n    return dubbla(dubbla(tal))\n\nprint(fyrdubbla(3))',
    task: 'Uppgift: Skapa `medel(tal)` som returnerar medelvärdet av listan: summan delat med antalet. Använd funktionen `summa` som redan finns.',
    starterCode:
      'def summa(tal):\n    total = 0\n    for t in tal:\n        total += t\n    return total\n',
    solution:
      'def summa(tal):\n    total = 0\n    for t in tal:\n        total += t\n    return total\n\n\ndef medel(tal):\n    return summa(tal) / len(tal)\n',
    hints: [
      'Medelvärdet är summan delat med antalet.',
      'summa(tal) ger summan och len(tal) antalet.',
      'return summa(tal) / len(tal)',
    ],
    tests: [
      {
        description: 'medel([2, 4, 6]) ger 4',
        code: 'medel([2, 4, 6])',
        expected: 4,
      },
      {
        description: 'medel([1, 2]) ger 1.5',
        code: 'medel([1, 2])',
        expected: 1.5,
      },
    ],
  },
];
