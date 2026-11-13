// Bana 8: slutprojektet. Kaféets kassa byggs tillsammans med assistenten,
// en bit i taget: beställ, granska, testa, säkra och städa. Varje övning
// bygger på förra, och koden som redan är klar står överst.
const PRISER = 'PRISER = {"kaffe": 35, "bulle": 32, "te": 30}\n\n';
const LAGG_TILL =
  'def lagg_till(vagn, produkt, antal):\n    if produkt not in PRISER:\n        return None\n    vagn[produkt] = vagn.get(produkt, 0) + antal\n    return vagn\n\n';
const SUMMA =
  'def summa(vagn):\n    return sum(PRISER[produkt] * antal for produkt, antal in vagn.items())\n\n';
const RABATT =
  'def rabatt(summa, kod):\n    if kod.strip().upper() == "KANEL10":\n        return summa * 0.9\n    return summa\n\n';
const KLART = PRISER + LAGG_TILL + SUMMA + RABATT;

export const SLUTPROJEKT = [
  {
    id: 'kmai-71',
    track: 'slutprojekt',
    title: 'Beställningen',
    xp: 15,
    description:
      'Kafé Kanel vill ha en enkel kassa. Börja som proffsen: med en tydlig beställning till assistenten.',
    explain:
      'Hela kursen på en gång. Först beställningen av första biten: en funktion som lägger till en vara i varukorgen.\n\nKom ihåg delarna: namn och vad den får och returnerar, ett exempel, ett kantfall och ramarna.',
    example: '',
    task: 'Uppgift: Beställ `lagg_till(vagn, produkt, antal)` som lägger till varor i en vagn (en dictionary). Ta med ett exempel (`Exempel`), kantfallet att produkten inte finns i prislistan och att den ska returnera vagnen (ordet `returnera`).',
    starterCode: 'bestallning = ""\n',
    solution:
      'bestallning = "Skriv en Python-funktion lagg_till(vagn, produkt, antal) som lägger till antal av produkten i vagnen, en dictionary, och ska returnera vagnen. Exempel: lagg_till({}, \\"kaffe\\", 2) ska ge {\\"kaffe\\": 2}. Om produkten inte finns i prislistan PRISER ska den returnera None."\n',
    hints: [
      'Namn och vad den returnerar.',
      'Exempel: … ska ge …',
      'Kantfallet: produkten finns inte.',
    ],
    tests: [
      {
        description: 'Nämner lagg_till',
        code: '"lagg_till(vagn, produkt, antal)" in bestallning',
        expected: true,
      },
      {
        description: 'Säger vad den returnerar',
        code: '"returnera" in bestallning.lower()',
        expected: true,
      },
      {
        description: 'Har ett exempel',
        code: '"exempel" in bestallning.lower()',
        expected: true,
      },
      {
        description: 'Har kantfallet',
        code: '"finns inte" in bestallning.lower() or "inte finns" in bestallning.lower()',
        expected: true,
      },
    ],
  },
  {
    id: 'kmai-72',
    track: 'slutprojekt',
    title: 'Första förslaget',
    xp: 20,
    description: 'Assistenten svarade. Läs – det finns två fel.',
    explain:
      'Läs förslaget rad för rad med beställningen bredvid. Gör den allt du bad om? Testa i huvudet: vad händer om samma vara läggs till två gånger? Och en vara som inte finns?',
    example: '',
    task: 'Uppgift: Laga `lagg_till`. Lägger man till samma vara igen ska antalet öka, och en vara som inte finns i `PRISER` ska ge `None`.',
    starterCode: `${PRISER}# Assistentens förslag:\ndef lagg_till(vagn, produkt, antal):\n    vagn[produkt] = antal\n    return vagn\n`,
    solution: PRISER + LAGG_TILL,
    hints: [
      'Vad händer med lagg_till({"kaffe": 1}, "kaffe", 2)?',
      'vagn.get(produkt, 0) + antal',
      'Kolla först: if produkt not in PRISER: return None',
    ],
    tests: [
      {
        description: 'Ny vara',
        code: 'lagg_till({}, "kaffe", 2)',
        expected: { kaffe: 2 },
      },
      {
        description: 'Samma vara igen ökar antalet',
        code: 'lagg_till({"kaffe": 1}, "kaffe", 2)',
        expected: { kaffe: 3 },
      },
      {
        description: 'Okänd vara ger None',
        code: 'lagg_till({}, "pizza", 1)',
        expected: null,
      },
    ],
  },
  {
    id: 'kmai-73',
    track: 'slutprojekt',
    title: 'Testa vagnen',
    xp: 20,
    description:
      'Skriv testerna som hade fångat felen – så att de aldrig kommer tillbaka.',
    explain:
      'Ett fel som du har lagat ska få ett test. Då märks det direkt om det kommer tillbaka, till exempel när assistenten ändrar koden nästa gång.',
    example: 'def test_x(f):\n    assert …',
    task: 'Uppgift: Skriv `test_lagg_till(f)` som kollar båda felen från förra övningen. Det ska underkänna assistentens förslag (`ai_lagg_till`) och godkänna ditt.',
    starterCode: `${PRISER}${LAGG_TILL}# Assistentens första förslag:\ndef ai_lagg_till(vagn, produkt, antal):\n    vagn[produkt] = antal\n    return vagn\n\n# Skriv test_lagg_till(f) här\n`,
    solution: `${PRISER}${LAGG_TILL}def ai_lagg_till(vagn, produkt, antal):\n    vagn[produkt] = antal\n    return vagn\n\ndef test_lagg_till(f):\n    assert f({"kaffe": 1}, "kaffe", 2) == {"kaffe": 3}\n    assert f({}, "pizza", 1) is None\n`,
    hints: [
      'Ett test för samma vara två gånger.',
      'Ett test för en okänd vara.',
      'assert f({}, "pizza", 1) is None',
    ],
    tests: [
      {
        description: 'Underkänner assistentens förslag',
        code: '__raises(test_lagg_till, ai_lagg_till) is not None',
        expected: true,
      },
      {
        description: 'Godkänner din lagade',
        code: '__raises(test_lagg_till, lagg_till) is None',
        expected: true,
      },
    ],
  },
  {
    id: 'kmai-74',
    track: 'slutprojekt',
    title: 'Summan',
    xp: 15,
    description: 'Assistenten skrev summan. Förutsäg först, kör sedan.',
    explain:
      'Läs innan du litar: vad tror du att `summa({"kaffe": 2, "bulle": 1})` blir? Räkna i huvudet, och skriv sedan in ditt svar. Stämmer det med koden har du förstått den.',
    example: '',
    task: 'Uppgift: Skriv in vad du tror `summa({"kaffe": 2, "bulle": 1})` blir i `gissning`, utan att anropa funktionen.',
    starterCode: `${PRISER}${LAGG_TILL}# Assistentens förslag:\n${SUMMA}gissning = None\n`,
    solution: `${PRISER}${LAGG_TILL}${SUMMA}gissning = 102\n`,
    hints: [
      'Kaffe kostar 35 och bulle 32.',
      '2 kaffe och 1 bulle.',
      '35 · 2 + 32 = 102',
    ],
    tests: [
      {
        description: 'Gissningen stämmer',
        code: 'gissning == summa({"kaffe": 2, "bulle": 1})',
        expected: true,
      },
    ],
    sourceChecks: [
      {
        description: 'Gissningen är skriven för hand',
        pattern: /^\s*gissning\s*=\s*summa\(/m,
        forbidden: true,
      },
    ],
  },
  {
    id: 'kmai-75',
    track: 'slutprojekt',
    title: 'Rabattkoden',
    xp: 20,
    description:
      'Kunderna skriver koden på olika sätt. Assistentens kod klarar bara ett.',
    explain:
      'Kunder skriver `kanel10`, `KANEL10 ` med mellanslag och allt däremellan. Gör om till samma form innan du jämför: `.strip().upper()`.',
    example: 'kod.strip().upper()',
    task: 'Uppgift: Laga `rabatt(summa, kod)` så att koden `KANEL10` ger 10 % rabatt oavsett stora och små bokstäver och mellanslag.',
    starterCode: `${PRISER}${LAGG_TILL}${SUMMA}# Assistentens förslag:\ndef rabatt(summa, kod):\n    if kod == "KANEL10":\n        return summa * 0.9\n    return summa\n`,
    solution: KLART,
    hints: [
      'Vad ger rabatt(100, "kanel10")?',
      'kod.strip().upper()',
      'if kod.strip().upper() == "KANEL10":',
    ],
    tests: [
      { description: 'KANEL10', code: 'rabatt(100, "KANEL10")', expected: 90 },
      {
        description: 'kanel10 med mellanslag',
        code: 'rabatt(100, " kanel10 ")',
        expected: 90,
      },
      {
        description: 'Annan kod ger ingen rabatt',
        code: 'rabatt(100, "GRATIS")',
        expected: 100,
      },
    ],
  },
  {
    id: 'kmai-76',
    track: 'slutprojekt',
    title: 'Antalet från kassan',
    xp: 20,
    description: 'Antalet skrivs in av personalen. Lita inte på det.',
    explain:
      'Indata från en människa kan vara text, negativ eller absurt stor. Skriv en funktion som kontrollerar den – och använd den innan något läggs i vagnen.',
    example: '',
    task: 'Uppgift: Skriv `las_antal(text)` som returnerar antalet som heltal, eller `None` om texten inte är ett tal eller om antalet inte är mellan 1 och 50.',
    starterCode: `${KLART}# Skriv las_antal(text) här\n`,
    solution: `${KLART}def las_antal(text):\n    try:\n        antal = int(text)\n    except ValueError:\n        return None\n    if antal < 1 or antal > 50:\n        return None\n    return antal\n`,
    hints: [
      'try: antal = int(text) except ValueError: return None',
      'Kolla 1 <= antal <= 50.',
      'Returnera antal annars.',
    ],
    tests: [
      { description: '"3" ger 3', code: 'las_antal("3")', expected: 3 },
      {
        description: '"tre" ger None',
        code: 'las_antal("tre")',
        expected: null,
      },
      { description: '"0" ger None', code: 'las_antal("0")', expected: null },
      {
        description: '"1000" ger None',
        code: 'las_antal("1000")',
        expected: null,
      },
    ],
  },
  {
    id: 'kmai-77',
    track: 'slutprojekt',
    title: 'Kvittot',
    xp: 20,
    description: 'Sista biten: ett kvitto att skriva ut.',
    explain:
      'Nu när delarna är testade kan de sättas ihop. `kvitto(vagn, kod)` använder `summa` och `rabatt` – ingen ny räkning behövs. Avrunda till hela kronor med `round`.',
    example: '',
    task: 'Uppgift: Skriv `kvitto(vagn, kod)` som returnerar en lista med en rad per vara (t.ex. `"kaffe x2: 70 kr"`) och sist `"Att betala: 92 kr"` (efter rabatt, avrundat).',
    starterCode: `${KLART}# Skriv kvitto(vagn, kod) här\n`,
    solution: `${KLART}def kvitto(vagn, kod):\n    rader = [f"{produkt} x{antal}: {PRISER[produkt] * antal} kr" for produkt, antal in vagn.items()]\n    rader.append(f"Att betala: {round(rabatt(summa(vagn), kod))} kr")\n    return rader\n`,
    hints: [
      'En rad per vara: f"{produkt} x{antal}: {PRISER[produkt] * antal} kr"',
      'Sist: rabatt(summa(vagn), kod)',
      'round(...) ger hela kronor.',
    ],
    tests: [
      {
        description: 'Kvittot med rabatt',
        code: 'kvitto({"kaffe": 2, "bulle": 1}, "kanel10")',
        expected: ['kaffe x2: 70 kr', 'bulle x1: 32 kr', 'Att betala: 92 kr'],
      },
      {
        description: 'Utan rabatt',
        code: 'kvitto({"te": 1}, "")[-1]',
        expected: 'Att betala: 30 kr',
      },
    ],
  },
  {
    id: 'kmai-78',
    track: 'slutprojekt',
    title: 'Granskningen',
    xp: 15,
    description: 'Innan du committar: granska hela kassan med assistenten.',
    explain:
      'Sista steget innan koden går live: be assistenten granska **hela** koden – säkerhet, kantfall och läsbarhet – och lista problemen. Laga det som är rimligt, och skriv test för det du lagar.\n\nOch kom ihåg: det är du som avgör. En granskning från AI är förslag, inte sanning.',
    example: '',
    task: 'Uppgift: Skriv en fråga i `granskning` som ber assistenten granska kassans kod och nämner `säkerhet`, `kantfall` och `läsbarhet`, och ber om en `lista`.',
    starterCode: 'granskning = ""\n',
    solution:
      'granskning = "Granska koden för kassan. Leta efter problem med säkerhet, kantfall och läsbarhet, och ge mig en lista med det viktigaste först."\n',
    hints: [
      'Börja med Granska.',
      'Nämn säkerhet, kantfall och läsbarhet.',
      'Be om en lista.',
    ],
    tests: [
      {
        description: 'Ber om en granskning',
        code: '"granska" in granskning.lower()',
        expected: true,
      },
      {
        description: 'Nämner de tre',
        code: 'all(ord in granskning.lower() for ord in ["säkerhet", "kantfall", "läsbarhet"])',
        expected: true,
      },
      {
        description: 'Ber om en lista',
        code: '"lista" in granskning.lower()',
        expected: true,
      },
    ],
  },
  {
    id: 'kmai-79',
    track: 'slutprojekt',
    title: 'Alla tester gröna',
    xp: 20,
    description:
      'Hela testsviten för kassan. Två tester går inte igenom – laga koden.',
    explain:
      'Proffs kör **alla** tester innan något committas. Här är kassans testsvit. Assistenten har "förbättrat" två funktioner, och nu går två tester inte igenom. Hitta dem och laga koden – inte testerna.',
    example: 'kor_alla_tester()',
    task: 'Uppgift: Laga koden så att `kor_alla_tester()` sist i koden går igenom. Ändra inte testerna.',
    starterCode: `${PRISER}def lagg_till(vagn, produkt, antal):\n    if produkt not in PRISER:\n        return None\n    vagn[produkt] = antal\n    return vagn\n\n${SUMMA}def rabatt(summa, kod):\n    if kod.strip().upper() == "KANEL10":\n        return summa * 0.1\n    return summa\n\ndef kor_alla_tester():\n    assert lagg_till({"te": 1}, "te", 1) == {"te": 2}\n    assert lagg_till({}, "pizza", 1) is None\n    assert summa({"kaffe": 2}) == 70\n    assert rabatt(100, "kanel10") == 90\n    assert rabatt(100, "") == 100\n\nkor_alla_tester()\n`,
    solution: `${KLART}def kor_alla_tester():\n    assert lagg_till({"te": 1}, "te", 1) == {"te": 2}\n    assert lagg_till({}, "pizza", 1) is None\n    assert summa({"kaffe": 2}) == 70\n    assert rabatt(100, "kanel10") == 90\n    assert rabatt(100, "") == 100\n\nkor_alla_tester()\n`,
    hints: [
      'Kör och se vilket assert som stoppar.',
      'lagg_till skriver över antalet igen.',
      'rabatt ger 10 % av priset i stället för 10 % rabatt.',
    ],
    tests: [
      {
        description: 'Alla tester går igenom',
        code: '__raises(kor_alla_tester) is None',
        expected: true,
      },
    ],
    sourceChecks: [
      {
        description: 'Testerna är oförändrade',
        pattern: /assert rabatt\(100, "kanel10"\) == 90/,
      },
    ],
  },
];
