// Bana 7: gör om och förbättra. AI-kod fungerar ofta men är svår att läsa:
// dåliga namn, upprepningar, magiska tal och långa funktioner. Eleven
// städar utan att ändra vad koden gör – testerna kollar beteendet, och
// källkontroller kollar att städningen är gjord.
const AI = '# Assistentens kod – den fungerar, men gör den lättare att läsa:\n';

export const REFAKTOR = [
  {
    id: 'kmai-61',
    track: 'refaktor',
    title: 'Bättre namn',
    xp: 10,
    description: 'f, x och temp säger ingenting. Ge dem namn som berättar.',
    explain:
      'Bra namn är den billigaste förbättringen som finns. Ett funktionsnamn säger **vad** den gör, och variabelnamn säger **vad de innehåller**.\n\nAtt göra om kod utan att ändra vad den gör kallas att **refaktorera**.',
    example: 'def pris_med_moms(pris):\n    return pris * 1.25',
    task: 'Uppgift: Döp om `f` till `pris_med_moms` och `x` till `pris`. Funktionen ska göra precis samma sak.',
    starterCode: `${AI}def f(x):\n    return x * 1.25\n`,
    solution: 'def pris_med_moms(pris):\n    return pris * 1.25\n',
    hints: [
      'Byt namnet efter def.',
      'Byt x mot pris på båda ställena.',
      'def pris_med_moms(pris):',
    ],
    tests: [
      {
        description: 'pris_med_moms(100) är 125',
        code: 'pris_med_moms(100)',
        expected: 125,
      },
    ],
    sourceChecks: [
      {
        description: 'Funktionen heter inte f längre',
        pattern: /def f\(/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'kmai-62',
    track: 'refaktor',
    title: 'Magiska tal',
    xp: 15,
    description: 'Vad betyder 0.25 och 49? Ge talen namn.',
    explain:
      'Ett tal mitt i koden utan förklaring kallas ett **magiskt tal**. Lägg det i en konstant med ett namn, med stora bokstäver, överst i filen:\n\n```\nMOMS = 0.25\nFRI_FRAKT_FRAN = 499\n```\n\nNu går det att förstå – och att ändra på ett ställe.',
    example: 'MOMS = 0.25',
    task: 'Uppgift: Lägg talen i konstanterna `MOMS = 0.25`, `FRAKT = 49` och `FRI_FRAKT_FRAN = 499`, och använd dem i funktionen.',
    starterCode: `${AI}def att_betala(summa):\n    if summa >= 499:\n        return summa * 1.25\n    return summa * 1.25 + 49\n`,
    solution:
      'MOMS = 0.25\nFRAKT = 49\nFRI_FRAKT_FRAN = 499\n\ndef att_betala(summa):\n    med_moms = summa * (1 + MOMS)\n    if summa >= FRI_FRAKT_FRAN:\n        return med_moms\n    return med_moms + FRAKT\n',
    hints: [
      'Tre konstanter överst.',
      'summa * (1 + MOMS)',
      'Använd FRI_FRAKT_FRAN och FRAKT i villkoret.',
    ],
    tests: [
      {
        description: '100 kr blir 174',
        code: 'att_betala(100)',
        expected: 174,
      },
      {
        description: '500 kr blir 625',
        code: 'att_betala(500)',
        expected: 625,
      },
    ],
    sourceChecks: [
      {
        description: 'Har konstanterna',
        pattern:
          /MOMS\s*=\s*0\.25[\s\S]*FRAKT\s*=\s*49[\s\S]*FRI_FRAKT_FRAN\s*=\s*499/,
      },
      {
        description: 'Inga magiska tal i funktionen',
        pattern: /def att_betala[\s\S]*(1\.25|499|49)/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'kmai-63',
    track: 'refaktor',
    title: 'Ta bort upprepning',
    xp: 15,
    description: 'Samma rader tre gånger. Gör en loop.',
    explain:
      'Upprepad kod betyder att ett fel måste lagas på flera ställen. Lägg det som skiljer i en lista och loopa – eller gör en funktion.',
    example: 'for namn in ["Ada", "Bo"]:\n    print(f"Hej {namn}!")',
    task: 'Uppgift: Gör om koden till en loop över listan `PRODUKTER`, med en enda `print`. Utskriften ska bli densamma.',
    starterCode: `${AI}print("Kaffe: 35 kr")\nprint("Te: 30 kr")\nprint("Bulle: 32 kr")\n`,
    solution:
      'PRODUKTER = [("Kaffe", 35), ("Te", 30), ("Bulle", 32)]\n\nfor namn, pris in PRODUKTER:\n    print(f"{namn}: {pris} kr")\n',
    hints: [
      'PRODUKTER = [("Kaffe", 35), …]',
      'for namn, pris in PRODUKTER:',
      'print(f"{namn}: {pris} kr")',
    ],
    tests: [
      {
        description: 'Samma utskrift',
        code: '__output',
        expected: ['Kaffe: 35 kr', 'Te: 30 kr', 'Bulle: 32 kr'],
      },
    ],
    sourceChecks: [
      {
        description: 'Bara en print',
        pattern: /print\([\s\S]*print\(/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'kmai-64',
    track: 'refaktor',
    title: 'Förenkla villkoren',
    xp: 15,
    description: 'Fem rader if och else för något som är en enda jämförelse.',
    explain:
      'AI-kod skriver gärna\n\n```\nif x > 5:\n    return True\nelse:\n    return False\n```\n\nJämförelsen ger redan `True` eller `False`. Skriv bara `return x > 5`.',
    example: 'return poang >= 50',
    task: 'Uppgift: Förenkla `godkand(poang, narvaro)` till en enda rad med `return`. Den ska ge `True` om poängen är minst 50 och närvaron minst 80.',
    starterCode: `${AI}def godkand(poang, narvaro):\n    if poang >= 50:\n        if narvaro >= 80:\n            return True\n        else:\n            return False\n    else:\n        return False\n`,
    solution:
      'def godkand(poang, narvaro):\n    return poang >= 50 and narvaro >= 80\n',
    hints: [
      'Båda villkoren måste vara sanna: and.',
      'return poang >= 50 and …',
      'Inga if behövs.',
    ],
    tests: [
      {
        description: '60 och 90 är godkänt',
        code: 'godkand(60, 90)',
        expected: true,
      },
      {
        description: '60 och 70 är inte godkänt',
        code: 'godkand(60, 70)',
        expected: false,
      },
      {
        description: '40 och 90 är inte godkänt',
        code: 'godkand(40, 90)',
        expected: false,
      },
    ],
    sourceChecks: [
      { description: 'Inga if kvar', pattern: /\bif\b/, forbidden: true },
    ],
  },
  {
    id: 'kmai-65',
    track: 'refaktor',
    title: 'Dela upp en lång funktion',
    xp: 20,
    description:
      'En funktion som gör tre saker är svår att testa. Dela upp den.',
    explain:
      'En funktion ska helst göra **en sak**. Gör den flera, bryt ut delarna till egna funktioner med bra namn. Då kan varje del testas för sig, och huvudfunktionen läses som en sammanfattning.',
    example: 'def rapport(rader):\n    return format(summera(rader))',
    task: 'Uppgift: Bryt ut `summera(rader)` (summan av pris × antal) och `formatera(summa)` (texten `Totalt: 120 kr`), och låt `kvitto(rader)` använda dem.',
    starterCode: `${AI}def kvitto(rader):\n    summa = 0\n    for pris, antal in rader:\n        summa += pris * antal\n    return f"Totalt: {summa} kr"\n`,
    solution:
      'def summera(rader):\n    return sum(pris * antal for pris, antal in rader)\n\ndef formatera(summa):\n    return f"Totalt: {summa} kr"\n\ndef kvitto(rader):\n    return formatera(summera(rader))\n',
    hints: [
      'def summera(rader): … return summan',
      'def formatera(summa): return f"Totalt: {summa} kr"',
      'kvitto returnerar formatera(summera(rader)).',
    ],
    tests: [
      {
        description: 'summera fungerar',
        code: 'summera([(30, 2), (60, 1)])',
        expected: 120,
      },
      {
        description: 'formatera fungerar',
        code: 'formatera(120)',
        expected: 'Totalt: 120 kr',
      },
      {
        description: 'kvitto ger samma som förut',
        code: 'kvitto([(30, 2), (60, 1)])',
        expected: 'Totalt: 120 kr',
      },
    ],
  },
  {
    id: 'kmai-66',
    track: 'refaktor',
    title: 'Behåll testerna gröna',
    xp: 20,
    description: 'Gör om koden – men testet måste gå igenom hela tiden.',
    explain:
      'Tester är skyddsnätet när du gör om kod. Kör dem efter varje ändring. Går de igenom gör koden fortfarande samma sak.\n\nTestet står överst och körs sist i koden.',
    example: 'test_rakna(rakna)',
    task: 'Uppgift: Skriv om `rakna(ord)` så att den blir högst tre rader lång (med `def`). Den ska räkna hur många gånger varje ord förekommer. Testet ska fortfarande gå igenom.',
    starterCode: `def test_rakna(f):\n    assert f(["a", "b", "a"]) == {"a": 2, "b": 1}\n    assert f([]) == {}\n\n${AI}def rakna(ord):\n    resultat = {}\n    for o in ord:\n        if o in resultat:\n            resultat[o] = resultat[o] + 1\n        else:\n            resultat[o] = 1\n    return resultat\n\ntest_rakna(rakna)\n`,
    solution:
      'def test_rakna(f):\n    assert f(["a", "b", "a"]) == {"a": 2, "b": 1}\n    assert f([]) == {}\n\ndef rakna(ord):\n    return {o: ord.count(o) for o in ord}\n\ntest_rakna(rakna)\n',
    hints: [
      'En dictionary comprehension: {o: … for o in ord}',
      'ord.count(o) räknar hur många gånger o finns.',
      'return {o: ord.count(o) for o in ord}',
    ],
    tests: [
      {
        description: 'Testet går igenom',
        code: '__raises(test_rakna, rakna) is None',
        expected: true,
      },
    ],
    sourceChecks: [
      {
        description: 'rakna är högst tre rader',
        pattern: /def rakna\(ord\):\n(?:[ \t]+.*\n){3,}/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'kmai-67',
    track: 'refaktor',
    title: 'Förklara med en docstring',
    xp: 10,
    description: 'Skriv vad funktionen gör direkt i den.',
    explain:
      'En **docstring** är en text inom tre citattecken direkt efter `def`. Den visas när man håller musen över funktionen i editorn, och med `help(funktion)`.\n\nSkriv vad funktionen gör, vad den får och vad den returnerar.',
    example:
      'def dubbla(x):\n    """Returnerar x gånger två."""\n    return x * 2',
    task: 'Uppgift: Ge `rabatt(pris, procent)` en docstring som innehåller orden `Returnerar` och `procent`.',
    starterCode: `${AI}def rabatt(pris, procent):\n    return pris * (1 - procent / 100)\n`,
    solution:
      'def rabatt(pris, procent):\n    """Returnerar priset efter att procent dragits av."""\n    return pris * (1 - procent / 100)\n',
    hints: [
      'Tre citattecken direkt under def.',
      '"""Returnerar …"""',
      'Nämn procent i texten.',
    ],
    tests: [
      {
        description: 'Har en docstring med Returnerar',
        code: '"Returnerar" in (rabatt.__doc__ or "")',
        expected: true,
      },
      {
        description: 'Nämner procent',
        code: '"procent" in (rabatt.__doc__ or "")',
        expected: true,
      },
      { description: 'Gör samma sak', code: 'rabatt(200, 10)', expected: 180 },
    ],
  },
  {
    id: 'kmai-68',
    track: 'refaktor',
    title: 'Död kod',
    xp: 10,
    description: 'Assistenten lämnade kvar kod som aldrig används.',
    explain:
      'Kod som aldrig körs – gamla funktioner, oanvända variabler, bortkommenterade rader – gör det svårare att läsa. Den finns ändå kvar i Git om du behöver den. **Ta bort den.**',
    example: '# Ta bort det som inte används',
    task: 'Uppgift: Ta bort funktionen `gammal_moms` och variabeln `TEST_LAGE`, som aldrig används. `moms` ska finnas kvar.',
    starterCode: `${AI}TEST_LAGE = True\n\ndef gammal_moms(pris):\n    return pris * 1.12\n\ndef moms(pris):\n    return pris * 1.25\n`,
    solution: 'def moms(pris):\n    return pris * 1.25\n',
    hints: [
      'Vad används aldrig?',
      'Ta bort gammal_moms.',
      'Ta bort TEST_LAGE.',
    ],
    tests: [{ description: 'moms fungerar', code: 'moms(100)', expected: 125 }],
    sourceChecks: [
      {
        description: 'gammal_moms är borta',
        pattern: /gammal_moms/,
        forbidden: true,
      },
      {
        description: 'TEST_LAGE är borta',
        pattern: /TEST_LAGE/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'kmai-69',
    track: 'refaktor',
    title: 'Be om en liten ändring',
    xp: 10,
    description: 'Be assistenten ändra en sak – annars skriver den om allt.',
    explain:
      'Ber du "gör koden bättre" skriver assistenten ofta om allt, och du måste läsa allt igen. Be om **en** ändring och säg vad som ska vara kvar:\n\n_Döp om variabeln x till pris. Ändra inget annat, och behåll alla tester._',
    example: 'bestallning = "Döp om … Ändra inget annat."',
    task: 'Uppgift: Skriv en beställning i `bestallning` som ber assistenten bryta ut uträkningen av moms till en egen funktion, och säger `Ändra inget annat` och att testerna ska gå igenom (ordet `tester`).',
    starterCode: 'bestallning = "Gör koden bättre."\n',
    solution:
      'bestallning = "Bryt ut uträkningen av moms till en egen funktion som heter moms. Ändra inget annat, och se till att alla tester fortfarande går igenom."\n',
    hints: [
      'En ändring: bryt ut momsen.',
      'Ändra inget annat.',
      'Testerna ska gå igenom.',
    ],
    tests: [
      {
        description: 'Nämner momsen',
        code: '"moms" in bestallning.lower()',
        expected: true,
      },
      {
        description: 'Ändra inget annat',
        code: '"ändra inget annat" in bestallning.lower()',
        expected: true,
      },
      {
        description: 'Nämner testerna',
        code: '"test" in bestallning.lower()',
        expected: true,
      },
    ],
  },
];
