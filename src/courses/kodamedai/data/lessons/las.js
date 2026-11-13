// Bana 3: läs koden du får. Eleven förutsäger vad assistentens kod gör –
// utan att köra den. Testerna jämför gissningen med vad koden faktiskt
// ger, och en kontroll stoppar den som bara anropar funktionen.
const NO_CALL = {
  description: 'Gissningen är skriven för hand, inte uträknad med funktionen',
  pattern: /^\s*(svar|gissning)\w*\s*=\s*[A-Za-z_]\w*\(/m,
  forbidden: true,
};
const AI = '# Assistentens kod:\n';

export const LAS = [
  {
    id: 'kmai-21',
    track: 'las',
    title: 'Förutsäg resultatet',
    xp: 10,
    description: 'Läs koden och gissa vad den ger – innan du kör den.',
    explain:
      'Att kunna förutsäga vad koden gör är det viktigaste när du granskar AI-kod. Gissar du fel har du hittat något du inte förstår – eller ett fel.\n\nLäs funktionen rad för rad och räkna i huvudet. Skriv sedan svaret själv, utan att anropa funktionen.',
    example: 'svar = [10, 20]',
    task: 'Uppgift: Vad ger `dubbla_alla([1, 2, 3])`? Skriv svaret själv i `svar`.',
    starterCode: `${AI}def dubbla_alla(tal):\n    return [t * 2 for t in tal]\n\nsvar = None\n`,
    solution: `${AI}def dubbla_alla(tal):\n    return [t * 2 for t in tal]\n\nsvar = [2, 4, 6]\n`,
    hints: [
      'Varje tal i listan gångras med 2.',
      'Svaret är en lista.',
      'svar = [2, 4, 6]',
    ],
    tests: [
      {
        description: 'svar stämmer med funktionen',
        code: 'svar == dubbla_alla([1, 2, 3])',
        expected: true,
      },
    ],
    sourceChecks: [NO_CALL],
  },
  {
    id: 'kmai-22',
    track: 'las',
    title: 'Följ loopen',
    xp: 10,
    description: 'Räkna varv för varv.',
    explain:
      'En loop läser du genom att följa den **varv för varv**: vad är variablerna före, och vad blir de efter?\n\nSkriv gärna upp det på ett papper. 👣 Kör rad för rad visar samma sak – använd den för att kolla din gissning efteråt.',
    example: 'gissning = 0',
    task: 'Uppgift: Vad ger `rakna("banan")`? Skriv svaret i `svar`.',
    starterCode: `${AI}def rakna(text):\n    antal = 0\n    for tecken in text:\n        if tecken == "a":\n            antal += 1\n    return antal\n\nsvar = None\n`,
    solution: `${AI}def rakna(text):\n    antal = 0\n    for tecken in text:\n        if tecken == "a":\n            antal += 1\n    return antal\n\nsvar = 2\n`,
    hints: [
      'Den räknar något i texten.',
      'Hur många a finns i banan?',
      'svar = 2',
    ],
    tests: [
      {
        description: 'svar stämmer',
        code: 'svar == rakna("banan")',
        expected: true,
      },
    ],
    sourceChecks: [NO_CALL],
  },
  {
    id: 'kmai-23',
    track: 'las',
    title: 'När inget hittas',
    xp: 15,
    description:
      'Vad returnerar funktionen när det den letar efter inte finns?',
    explain:
      'En funktion som når slutet utan `return` returnerar **`None`**. Assistenten glömmer ofta att säga vad som händer när inget hittas – och då kraschar koden som använder svaret längre bort.\n\nLeta alltid efter vägen genom funktionen där inget `return` körs.',
    example: 'svar = None',
    task: 'Uppgift: Vad ger `hitta("Bo", ["Ada", "Cy"])`? Skriv svaret i `svar`. Sätt också `saknas` till vad funktionen ger när namnet saknas – oavsett vilket namn.',
    starterCode: `${AI}def hitta(namn, lista):\n    for plats, annat in enumerate(lista):\n        if annat == namn:\n            return plats\n\nsvar = "?"\nsaknas = "?"\n`,
    solution: `${AI}def hitta(namn, lista):\n    for plats, annat in enumerate(lista):\n        if annat == namn:\n            return plats\n\nsvar = None\nsaknas = None\n`,
    hints: [
      'Bo finns inte i listan.',
      'Loopen tar slut utan return.',
      'Då returneras None.',
    ],
    tests: [
      {
        description: 'svar stämmer',
        code: 'svar == hitta("Bo", ["Ada", "Cy"])',
        expected: true,
      },
      { description: 'saknas är None', code: 'saknas is None', expected: true },
    ],
    sourceChecks: [NO_CALL],
  },
  {
    id: 'kmai-24',
    track: 'las',
    title: 'Läs villkoren noga',
    xp: 15,
    description: '>= eller >? Det är där felen gömmer sig.',
    explain:
      'Gränserna i villkor är det AI-kod oftast har fel på: `>=` mot `>`, `<` mot `<=`. Testa alltid i huvudet med **talet precis på gränsen**.',
    example: 'svar_75 = "B"',
    task: 'Uppgift: Vad ger `betyg(90)`, `betyg(75)` och `betyg(74)`? Skriv svaren i `svar_90`, `svar_75` och `svar_74`.',
    starterCode: `${AI}def betyg(poang):\n    if poang > 90:\n        return "A"\n    elif poang >= 75:\n        return "B"\n    else:\n        return "C"\n\nsvar_90 = None\nsvar_75 = None\nsvar_74 = None\n`,
    solution: `${AI}def betyg(poang):\n    if poang > 90:\n        return "A"\n    elif poang >= 75:\n        return "B"\n    else:\n        return "C"\n\nsvar_90 = "B"\nsvar_75 = "B"\nsvar_74 = "C"\n`,
    hints: ['Är 90 större än 90?', '75 >= 75 är sant.', '74 kommer till else.'],
    tests: [
      {
        description: 'svar_90 (på gränsen!)',
        code: 'svar_90 == betyg(90)',
        expected: true,
      },
      { description: 'svar_75', code: 'svar_75 == betyg(75)', expected: true },
      { description: 'svar_74', code: 'svar_74 == betyg(74)', expected: true },
    ],
    sourceChecks: [NO_CALL],
  },
  {
    id: 'kmai-25',
    track: 'las',
    title: 'Ändrar den min lista?',
    xp: 15,
    description:
      'Vissa funktioner ändrar det du skickar in. Det kallas en sidoeffekt.',
    explain:
      'En lista som skickas till en funktion är **samma lista** – inte en kopia. Gör funktionen `.append` eller `.sort()` på den ändras din lista också.\n\nDet är lätt att missa när man läser AI-kod, och ger konstiga fel långt bort.',
    example: 'efter = [1, 2]',
    task: 'Uppgift: Vad innehåller `mina` efter koden nedan? Skriv svaret i `svar`.',
    starterCode: `${AI}def lagg_till_noll(tal):\n    tal.append(0)\n    return len(tal)\n\nmina = [5, 3]\nantal = lagg_till_noll(mina)\n\nsvar = None\n`,
    solution: `${AI}def lagg_till_noll(tal):\n    tal.append(0)\n    return len(tal)\n\nmina = [5, 3]\nantal = lagg_till_noll(mina)\n\nsvar = [5, 3, 0]\n`,
    hints: [
      'append ändrar listan den får.',
      'tal och mina är samma lista.',
      'svar = [5, 3, 0]',
    ],
    tests: [
      {
        description: 'svar stämmer med mina',
        code: 'svar == mina',
        expected: true,
      },
    ],
    sourceChecks: [
      {
        description: 'Gissningen är skriven för hand',
        pattern: /^\s*svar\s*=\s*mina/m,
        forbidden: true,
      },
    ],
  },
  {
    id: 'kmai-26',
    track: 'las',
    title: 'Vad gör funktionen?',
    xp: 10,
    description:
      'Assistenten gav funktionen ett dåligt namn. Vad gör den egentligen?',
    explain:
      'AI-kod har ibland namn som `f`, `process` eller `handle_data`. Läs vad den **gör** och beskriv det med egna ord – sedan kan du ge den ett bättre namn.',
    example: 'beskrivning = "…"',
    task: 'Uppgift: Välj den beskrivning som stämmer och spara bokstaven (`"a"`, `"b"`, `"c"` eller `"d"`) i `ratt`.',
    starterCode: `${AI}def process(ord):\n    return sorted(set(ord))\n\n# a) Sorterar orden efter längd\n# b) Tar bort dubbletter och sorterar i bokstavsordning\n# c) Räknar hur många ord det finns\n# d) Vänder på listan\nratt = None\n`,
    solution: `${AI}def process(ord):\n    return sorted(set(ord))\n\nratt = "b"\n`,
    hints: [
      'set tar bort dubbletter.',
      'sorted sorterar i bokstavsordning.',
      'ratt = "b"',
    ],
    tests: [{ description: 'Rätt beskrivning', code: 'ratt', expected: 'b' }],
  },
  {
    id: 'kmai-27',
    track: 'las',
    title: 'Hitta raden',
    xp: 15,
    description: 'Var i koden händer det? Hitta raden.',
    explain:
      'När du ska ändra eller laga AI-kod måste du hitta **var** något händer. Läs uppifrån och fråga dig vid varje rad: är det här raden som gör det?',
    example: 'rad = 2',
    task: 'Uppgift: På vilken rad (i assistentens funktion, där `def` är rad 1) räknas rabatten ut? Spara radnumret i `rad`.',
    starterCode: `${AI}def pris_efter_rabatt(pris, medlem):\n    moms = pris * 0.25\n    if medlem:\n        pris = pris * 0.9\n    return pris + moms\n\nrad = None\n`,
    solution: `${AI}def pris_efter_rabatt(pris, medlem):\n    moms = pris * 0.25\n    if medlem:\n        pris = pris * 0.9\n    return pris + moms\n\nrad = 4\n`,
    hints: [
      'Rabatten är 10 procent.',
      'Gånger 0.9 är priset minus 10 procent.',
      'Räkna: def är rad 1.',
    ],
    tests: [{ description: 'Rätt rad', code: 'rad', expected: 4 }],
  },
  {
    id: 'kmai-28',
    track: 'las',
    title: 'Den lilla skillnaden',
    xp: 15,
    description:
      'Assistenten gav två förslag. De ser lika ut – men ger olika svar.',
    explain:
      'Små skillnader kan ändra allt. Jämför två förslag rad för rad och leta efter det som skiljer: ett tecken, en ordning, en indentering.',
    example: 'olika = True',
    task: 'Uppgift: Vad ger `summa_a([1, 2, 3])` och `summa_b([1, 2, 3])`? Skriv svaren i `svar_a` och `svar_b`.',
    starterCode: `${AI}def summa_a(tal):\n    total = 0\n    for t in tal:\n        total += t\n    return total\n\ndef summa_b(tal):\n    total = 0\n    for t in tal:\n        total += t\n        return total\n\nsvar_a = None\nsvar_b = None\n`,
    solution: `${AI}def summa_a(tal):\n    total = 0\n    for t in tal:\n        total += t\n    return total\n\ndef summa_b(tal):\n    total = 0\n    for t in tal:\n        total += t\n        return total\n\nsvar_a = 6\nsvar_b = 1\n`,
    hints: [
      'Titta på indraget på return.',
      'I summa_b ligger return inne i loopen.',
      'Den returnerar redan efter första varvet.',
    ],
    tests: [
      {
        description: 'svar_a',
        code: 'svar_a == summa_a([1, 2, 3])',
        expected: true,
      },
      {
        description: 'svar_b',
        code: 'svar_b == summa_b([1, 2, 3])',
        expected: true,
      },
    ],
    sourceChecks: [NO_CALL],
  },
  {
    id: 'kmai-29',
    track: 'las',
    title: 'Fråga om det du inte förstår',
    xp: 10,
    description:
      'Koden använder något du inte sett. Fråga hellre än att gissa.',
    explain:
      'Ser du något okänt i AI-kod: **fråga** innan du använder koden. _Vad gör `zip` här? Ge ett enkelt exempel._ Assistenten förklarar gärna – och du lär dig något.',
    example: 'fraga = "Vad gör … här?"',
    task: 'Uppgift: Koden använder `zip`. Skriv en fråga i `fraga` som ber assistenten förklara vad `zip` gör i koden och ge ett enkelt exempel.',
    starterCode: `${AI}namn = ["Ada", "Bo"]\npoang = [90, 75]\nfor n, p in zip(namn, poang):\n    print(n, p)\n\nfraga = ""\n`,
    solution: `${AI}namn = ["Ada", "Bo"]\npoang = [90, 75]\nfor n, p in zip(namn, poang):\n    print(n, p)\n\nfraga = "Vad gör zip i den här koden? Förklara och ge ett enkelt exempel."\n`,
    hints: ['Nämn zip.', 'Be om en förklaring.', 'Be om ett exempel.'],
    tests: [
      { description: 'Frågar om zip', code: '"zip" in fraga', expected: true },
      {
        description: 'Ber om ett exempel',
        code: '"exempel" in fraga.lower()',
        expected: true,
      },
    ],
  },
];
