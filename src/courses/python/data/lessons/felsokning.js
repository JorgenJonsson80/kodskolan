// Bana 11: felsökning – startkoden är trasig och eleven hittar felet.
// Hälften av buggarna ger inget felmeddelande alls, bara fel svar, eftersom
// det är de som är svårast att hitta på riktigt.
export const FELSOKNING = [
  {
    id: 'fel-01',
    track: 'felsokning',
    title: 'Läs felmeddelandet',
    xp: 10,
    description:
      'Ett felmeddelande ser krångligt ut, men det säger nästan alltid exakt vad som är fel och var.',
    explain:
      'Läs felmeddelandet nerifrån och upp. Sista raden säger *vilket* fel det är och varför, t.ex. `NameError: name \'totla\' is not defined`. Radnumret säger *var* det hände.\n\nNameError betyder att Python inte känner till ett namn. Oftast är det felstavat. Står det "Did you mean" har Python redan gissat vad du menade.',
    example:
      "antal = 3\nprint(antl)\n# NameError: name 'antl' is not defined. Did you mean: 'antal'?",
    task: 'Uppgift: Programmet kraschar. Kör det, läs felmeddelandet och laga felet så att det skriver ut `Totalt: 70`.',
    starterCode:
      'priser = [20, 35, 15]\ntotal = 0\nfor pris in priser:\n    total = total + pris\nprint("Totalt: " + str(totla))\n',
    solution:
      'priser = [20, 35, 15]\ntotal = 0\nfor pris in priser:\n    total = total + pris\nprint("Totalt: " + str(total))\n',
    hints: [
      'Kör koden först och titta på felmeddelandet.',
      'Vilket namn känner Python inte till? Jämför med namnen ovanför.',
      'totla ska vara total.',
    ],
    tests: [
      {
        description: 'Programmet skriver Totalt: 70',
        code: '__output',
        expected: ['Totalt: 70'],
      },
    ],
  },
  {
    id: 'fel-02',
    track: 'felsokning',
    title: 'Text och tal blandas',
    xp: 10,
    description:
      'TypeError betyder att något är av fel sort – t.ex. ett tal där det ska vara text.',
    explain:
      'Ett TypeError säger vilka sorter som krockar, t.ex. `can only concatenate str (not "int") to str`: du försöker sätta ihop text med ett tal.\n\nKolla raden och fråga för varje värde: är det här text eller ett tal? Ett tal blir text med `str(…)`, och en f-sträng gör om allt själv.',
    example: 'antal = 3\nprint("Du har " + str(antal) + " äpplen")',
    task: 'Uppgift: Laga programmet så att svaren Ada och 12 ger `Ada fyller 13 nästa år`.',
    starterCode:
      'namn = input("Vad heter du? ")\nalder = int(input("Hur gammal är du? "))\nprint(namn + " fyller " + alder + 1 + " nästa år")\n',
    solution:
      'namn = input("Vad heter du? ")\nalder = int(input("Hur gammal är du? "))\nprint(namn + " fyller " + str(alder + 1) + " nästa år")\n',
    hints: [
      'alder är ett tal. Vad händer när det sätts ihop med text?',
      'Räkna ut alder + 1 först och gör om svaret till text.',
      'str(alder + 1)',
    ],
    inputs: ['Ada', '12'],
    tests: [
      {
        description: 'Ada och 12 ger Ada fyller 13 nästa år',
        code: '__output',
        expected: ['Ada fyller 13 nästa år'],
      },
      {
        description: 'Bo och 7 ger Bo fyller 8 nästa år',
        code: '__output',
        expected: ['Bo fyller 8 nästa år'],
        inputs: ['Bo', '7'],
      },
    ],
  },
  {
    id: 'fel-03',
    track: 'felsokning',
    title: 'Ett för lite',
    xp: 10,
    description:
      'Den värsta sortens bugg ger inget felmeddelande. Programmet kör – men svaret är fel.',
    explain:
      'När inget felmeddelande hjälper dig: prova med ett litet värde som du kan räkna ut i huvudet. `summa_till(3)` ska bli 1 + 2 + 3 = 6. Blir det 3 vet du att något saknas.\n\nKolla gränserna först. `range(1, n)` slutar *före* n – det är en av de vanligaste buggarna som finns, och den har ett eget namn: off-by-one.',
    example: 'print(list(range(1, 4)))\n# [1, 2, 3] – 4 är inte med',
    task: 'Uppgift: `summa_till(n)` ska räkna ihop alla tal från 1 till och med n, men svaret blir för litet. Hitta och laga felet.',
    starterCode:
      'def summa_till(n):\n    total = 0\n    for tal in range(1, n):\n        total += tal\n    return total\n\n\nprint(summa_till(3))\n',
    solution:
      'def summa_till(n):\n    total = 0\n    for tal in range(1, n + 1):\n        total += tal\n    return total\n\n\nprint(summa_till(3))\n',
    hints: [
      'Kör koden. summa_till(3) borde bli 6 – vad blir det?',
      'Vilka tal går loopen igenom? Är n med?',
      'range(1, n + 1)',
    ],
    tests: [
      { description: 'summa_till(3) är 6', code: 'summa_till(3)', expected: 6 },
      {
        description: 'summa_till(10) är 55',
        code: 'summa_till(10)',
        expected: 55,
      },
      { description: 'summa_till(1) är 1', code: 'summa_till(1)', expected: 1 },
    ],
  },
  {
    id: 'fel-04',
    track: 'felsokning',
    title: 'Indraget bestämmer',
    xp: 10,
    description:
      'I Python avgör indraget vad som hör till loopen. Ett mellanslag för mycket kan ändra allt.',
    explain:
      'Allt som är indraget under `for` körs varje varv. En `return` inuti loopen avslutar hela funktionen redan första varvet.\n\nAnvänd 👣 Kör rad för rad: då ser du exakt när funktionen slutar, och vilket värde den har då.',
    example:
      'for tal in [1, 2, 3]:\n    print(tal)\nprint("klar")  # inte indragen: körs en gång, efter loopen',
    task: 'Uppgift: `storst(tal)` ska returnera det största talet i listan, men ger fel svar. Stega igenom den och laga felet.',
    starterCode:
      'def storst(tal):\n    storsta = tal[0]\n    for t in tal:\n        if t > storsta:\n            storsta = t\n        return storsta\n',
    solution:
      'def storst(tal):\n    storsta = tal[0]\n    for t in tal:\n        if t > storsta:\n            storsta = t\n    return storsta\n',
    hints: [
      'Kör rad för rad med [3, 9, 4]. När slutar funktionen?',
      'return står inuti loopen.',
      'Flytta return så att den står lika långt in som for.',
    ],
    tests: [
      {
        description: 'storst([3, 9, 4]) är 9',
        code: 'storst([3, 9, 4])',
        expected: 9,
      },
      {
        description: 'storst([1, 2, 3, 8]) är 8',
        code: 'storst([1, 2, 3, 8])',
        expected: 8,
      },
      { description: 'storst([5]) är 5', code: 'storst([5])', expected: 5 },
    ],
  },
  {
    id: 'fel-05',
    track: 'felsokning',
    title: 'print är inte return',
    xp: 10,
    description:
      'En funktion som skriver ut svaret i stället för att returnera det ger None tillbaka.',
    explain:
      '`print` visar ett värde på skärmen – för människor. `return` skickar tillbaka värdet till koden som anropade funktionen – för programmet.\n\nSer du `NoneType` i ett felmeddelande har något gett None. Oftast är det en funktion som saknar return.',
    example:
      'def dubbla(x):\n    return x * 2\n\n\nsvar = dubbla(4) + 1\nprint(svar)',
    task: 'Uppgift: Programmet kraschar med NoneType. Laga `moms(pris)` så att programmet skriver ut `125.0`.',
    starterCode:
      'def moms(pris):\n    print(pris * 0.25)\n\n\ntotalt = 100 + moms(100)\nprint(totalt)\n',
    solution:
      'def moms(pris):\n    return pris * 0.25\n\n\ntotalt = 100 + moms(100)\nprint(totalt)\n',
    hints: [
      'Läs felmeddelandet: vad är NoneType här?',
      'moms skriver ut momsen men ger inget tillbaka.',
      'Byt print mot return.',
    ],
    tests: [
      { description: 'moms(100) är 25.0', code: 'moms(100)', expected: 25.0 },
      {
        description: 'Programmet skriver bara ut 125.0',
        code: '__output',
        expected: ['125.0'],
      },
    ],
  },
  {
    id: 'fel-06',
    track: 'felsokning',
    title: 'Titta på värdena med print',
    xp: 10,
    description:
      'När du inte förstår vad koden gör: skriv ut värdena medan den kör och se var det går fel.',
    explain:
      'Lägg en `print` inuti loopen, t.ex. `print("varv", p, summa)`, och kör. Nu ser du hur variablerna ändras varje varv – och var de slutar göra det du tänkt.\n\nTa bort felsöknings-utskrifterna när du hittat felet, så att programmet bara skriver ut det det ska. 👣 Kör rad för rad visar samma sak utan att du ändrar koden.',
    example:
      'tal = [2, 4]\nsumma = 0\nfor t in tal:\n    summa += t\n    print("varv", t, summa)  # tas bort sedan',
    task: 'Uppgift: Summan av poängen ska bli 10, men blir 2. Hitta felet, gärna med en print i loopen, och laga det. Programmet ska till sist bara skriva ut `10`.',
    starterCode:
      'poang = [3, 5, 2]\nfor p in poang:\n    summa = 0\n    summa = summa + p\nprint(summa)\n',
    solution:
      'poang = [3, 5, 2]\nsumma = 0\nfor p in poang:\n    summa = summa + p\nprint(summa)\n',
    hints: [
      'Lägg print(p, summa) inuti loopen och kör.',
      'summa blir 0 igen varje varv.',
      'Flytta summa = 0 till före loopen.',
    ],
    tests: [
      {
        description: 'Programmet skriver bara ut 10',
        code: '__output',
        expected: ['10'],
      },
    ],
  },
  {
    id: 'fel-07',
    track: 'felsokning',
    title: 'Text som ser ut som tal',
    xp: 10,
    description:
      '"100" och 100 ser likadana ut när de skrivs ut, men Python jämför dem på helt olika sätt.',
    explain:
      'Text jämförs tecken för tecken, som i en ordlista. Därför är `"9" > "100"`: 9 kommer efter 1. Tal jämförs efter storlek.\n\nAllt från `input()` och `split()` är text. Gör om det till tal med `int()` innan du jämför, sorterar eller räknar. Felet syns inte – det blir bara fel svar.',
    example: 'print(max(["9", "100"]))  # 9\nprint(max([9, 100]))  # 100',
    task: 'Uppgift: Programmet säger att bästa resultatet är 9. Laga det så att det skriver ut `Bäst: 100`.',
    starterCode:
      'rad = "8 12 100 9"\nresultat = rad.split()\nprint("Bäst: " + max(resultat))\n',
    solution:
      'rad = "8 12 100 9"\nresultat = [int(tal) for tal in rad.split()]\nprint("Bäst: " + str(max(resultat)))\n',
    hints: [
      'Vad är det för sort i resultat? Prova print(resultat).',
      'Gör om varje del till ett tal: [int(tal) for tal in rad.split()]',
      'max ger då ett tal, så det behöver str() i utskriften.',
    ],
    tests: [
      {
        description: 'Programmet skriver Bäst: 100',
        code: '__output',
        expected: ['Bäst: 100'],
      },
      {
        description: 'resultat innehåller tal',
        code: 'resultat',
        expected: [8, 12, 100, 9],
      },
    ],
  },
  {
    id: 'fel-08',
    track: 'felsokning',
    title: 'Ändra inte listan du loopar över',
    xp: 10,
    description:
      'Att ta bort saker ur en lista medan man loopar över den gör att loopen hoppar över saker.',
    explain:
      'När `remove` tar bort något flyttar resten av listan ett steg åt vänster. Loopen går ändå vidare till nästa plats – och hoppar då över det som just flyttades dit.\n\nBygg hellre en ny lista med det du vill behålla: `[t for t in tal if t != 0]`. Då ändras inte originalet heller.',
    example:
      'tal = [1, 0, 2]\nutan = [t for t in tal if t != 0]\nprint(utan, tal)',
    task: 'Uppgift: `utan_noll(tal)` ska returnera en ny lista utan nollor, men missar några och ändrar dessutom listan som skickas in. Laga den.',
    starterCode:
      'def utan_noll(tal):\n    for t in tal:\n        if t == 0:\n            tal.remove(t)\n    return tal\n\n\nprint(utan_noll([0, 0, 1, 0, 2]))\n',
    solution:
      'def utan_noll(tal):\n    return [t for t in tal if t != 0]\n\n\nprint(utan_noll([0, 0, 1, 0, 2]))\n',
    hints: [
      'Kör rad för rad och titta på tal och t varje varv.',
      'Bygg en ny lista i stället för att ändra den gamla.',
      'return [t for t in tal if t != 0]',
    ],
    tests: [
      {
        description: 'utan_noll([0, 0, 1, 0, 2]) är [1, 2]',
        code: 'utan_noll([0, 0, 1, 0, 2])',
        expected: [1, 2],
      },
      {
        description: 'Listan som skickas in ändras inte',
        code: '(lista := [0, 3], utan_noll(lista), lista)[-1]',
        expected: [0, 3],
      },
    ],
  },
  {
    id: 'fel-09',
    track: 'felsokning',
    title: 'Testa själv med assert',
    xp: 10,
    description:
      'Med assert skriver du ner vad koden ska göra. Python säger till direkt om det inte stämmer.',
    explain:
      '`assert villkor` gör ingenting om villkoret är sant. Är det falskt stoppar Python med AssertionError och radnumret – då vet du exakt vilket fall som är fel.\n\nSkriv assert för de knepiga fallen: noll, tomma listor, gränserna. Det är så riktiga program testas, och precis det som händer när du trycker på Kolla lösning här.',
    example:
      'def dubbla(x):\n    return x * 2\n\n\nassert dubbla(3) == 6\nassert dubbla(0) == 0',
    task: 'Uppgift: Ett år är skottår om det är delbart med 4 – men inte om det är delbart med 100, utom när det är delbart med 400. En assert säger att `ar_skottar` är fel. Laga funktionen och låt alla assert stå kvar.',
    starterCode:
      'def ar_skottar(ar):\n    return ar % 4 == 0\n\n\nassert ar_skottar(2024) == True\nassert ar_skottar(2023) == False\nassert ar_skottar(1900) == False\nassert ar_skottar(2000) == True\n',
    solution:
      'def ar_skottar(ar):\n    return ar % 4 == 0 and (ar % 100 != 0 or ar % 400 == 0)\n\n\nassert ar_skottar(2024) == True\nassert ar_skottar(2023) == False\nassert ar_skottar(1900) == False\nassert ar_skottar(2000) == True\n',
    hints: [
      'Vilken rad stoppar? Det är det fallet som är fel.',
      '1900 är delbart med 100 men inte med 400, så det är inget skottår.',
      'return ar % 4 == 0 and (ar % 100 != 0 or ar % 400 == 0)',
    ],
    tests: [
      {
        description: '2024 är skottår',
        code: 'ar_skottar(2024)',
        expected: true,
      },
      {
        description: '1900 är inte skottår',
        code: 'ar_skottar(1900)',
        expected: false,
      },
      {
        description: '2000 är skottår',
        code: 'ar_skottar(2000)',
        expected: true,
      },
      {
        description: '2100 är inte skottår',
        code: 'ar_skottar(2100)',
        expected: false,
      },
    ],
    sourceChecks: [
      {
        description: 'assert för 1900 står kvar',
        pattern: /assert\s+ar_skottar\(1900\)/,
      },
    ],
  },
];
