import { FORSALJNING } from './pandas';

// En boss per bana: en större uppgift som använder allt från banan, utan
// ledtrådar. Banan räknas inte som klar förrän bossen är besegrad.
// index.js lägger varje boss sist i sin bana.

const BOSS_INTRO = 'Bossen har inga ledtrådar – visa vad du kan! ';

export const BOSSES = {
  grunder: {
    id: 'grunder-boss',
    track: 'grunder',
    title: 'Boss: Pizzabeställningen',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Här behöver du allt från banan: input, tal, räkning, text med + och str() och if/else.',
    task: `Uppgift: Bygg en pizzabeställning.
  1. Fråga efter namnet med \`input("Vad heter du? ")\` och spara det i \`namn\`.
  2. Fråga \`input("Hur många pizzor? ")\`, gör om svaret till ett tal och spara det i \`antal\`.
  3. En pizza kostar 95 kr. Räkna ut priset och spara det i \`summa\`.
  4. Beställer man 3 pizzor eller fler blir det 50 kr billigare.
  5. Skriv ut \`Hej Ada!\` (med namnet) och sedan \`Att betala: 190 kr\` (med summan).
  6. Kostar det mer än 300 kr skriver programmet \`Gratis leverans!\`, annars \`Leverans: 39 kr\`.`,
    starterCode: '# Skriv din kod här\n',
    solution: `namn = input("Vad heter du? ")
antal = int(input("Hur många pizzor? "))
summa = antal * 95
if antal >= 3:
    summa = summa - 50
print("Hej " + namn + "!")
print("Att betala: " + str(summa) + " kr")
if summa > 300:
    print("Gratis leverans!")
else:
    print("Leverans: 39 kr")
`,
    hints: [],
    inputs: ['Ada', '2'],
    tests: [
      {
        description: 'antal är svaret som ett tal',
        code: 'antal',
        expected: 2,
      },
      { description: '2 pizzor: summa är 190', code: 'summa', expected: 190 },
      {
        description: 'Ada och 2 pizzor skriver rätt',
        code: '__output',
        expected: ['Hej Ada!', 'Att betala: 190 kr', 'Leverans: 39 kr'],
      },
      {
        description: '3 pizzor: 50 kr rabatt',
        code: 'summa',
        expected: 235,
        inputs: ['Bo', '3'],
      },
      {
        description: 'Cy och 4 pizzor får gratis leverans',
        code: '__output',
        expected: ['Hej Cy!', 'Att betala: 330 kr', 'Gratis leverans!'],
        inputs: ['Cy', '4'],
      },
    ],
  },

  loopar: {
    id: 'loopar-boss',
    track: 'loopar',
    title: 'Boss: Raketen',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Här behöver du både for med range och while – och veta när man tar vilken.',
    task: `Uppgift: Skjut upp en raket.
  1. Fråga \`input("Räkna ner från? ")\`, gör om svaret till ett tal och spara det i \`start\`.
  2. Räkna ner med en for-loop och range: skriv ut start, start - 1 … ner till 1.
  3. Skriv ut \`Lyft!\`.
  4. Skapa \`hojd\` = 0 och \`sekunder\` = 0. Så länge hojd är mindre än 100 ökar hojd med 30 och sekunder med 1, och programmet skriver ut \`Höjd: 30\` (med höjden).
  5. Skriv till sist ut \`Rymden efter 4 sekunder\` (med antalet sekunder).`,
    starterCode: '# Skriv din kod här\n',
    solution: `start = int(input("Räkna ner från? "))
for i in range(start, 0, -1):
    print(i)
print("Lyft!")
hojd = 0
sekunder = 0
while hojd < 100:
    hojd += 30
    sekunder += 1
    print("Höjd: " + str(hojd))
print("Rymden efter " + str(sekunder) + " sekunder")
`,
    hints: [],
    inputs: ['5'],
    tests: [
      {
        description: 'Från 5: nedräkning, flygning och rymden',
        code: '__output',
        expected: [
          '5',
          '4',
          '3',
          '2',
          '1',
          'Lyft!',
          'Höjd: 30',
          'Höjd: 60',
          'Höjd: 90',
          'Höjd: 120',
          'Rymden efter 4 sekunder',
        ],
      },
      { description: 'hojd är 120 till sist', code: 'hojd', expected: 120 },
      { description: 'sekunder är 4 till sist', code: 'sekunder', expected: 4 },
      {
        description: 'Från 3 räknas det ner 3, 2, 1',
        code: '__output[:4]',
        expected: ['3', '2', '1', 'Lyft!'],
        inputs: ['3'],
      },
    ],
    sourceChecks: [
      { description: 'Räknar ner med range', pattern: /\brange\s*\(/ },
      { description: 'Flyger med while', pattern: /\bwhile\b/ },
    ],
  },

  listor: {
    id: 'listor-boss',
    track: 'listor',
    title: 'Boss: Provresultaten',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Gå igenom en lista en gång och räkna ut flera saker samtidigt.',
    task: `Uppgift: Sammanställ provresultaten.
  1. Skapa listan \`poang\` med talen 72, 45, 90, 58 och 81.
  2. Skapa den tomma listan \`godkanda\`, \`summa\` = 0 och \`hogst\` = första talet i listan.
  3. Loopa över poang: lägg ihop alla i summa, lägg till poäng på 60 eller mer i godkanda, och uppdatera hogst om du hittar ett större tal.
  4. Skriv ut \`Godkända: 3 av 5\`, \`Högst: 90\` och \`Summa: 346\` – med len() och variablerna, inte siffror du räknat själv.`,
    starterCode: '# Skriv din kod här\n',
    solution: `poang = [72, 45, 90, 58, 81]
godkanda = []
summa = 0
hogst = poang[0]
for p in poang:
    summa += p
    if p >= 60:
        godkanda.append(p)
    if p > hogst:
        hogst = p
print("Godkända: " + str(len(godkanda)) + " av " + str(len(poang)))
print("Högst: " + str(hogst))
print("Summa: " + str(summa))
`,
    hints: [],
    tests: [
      {
        description: 'godkanda är [72, 90, 81]',
        code: 'godkanda',
        expected: [72, 90, 81],
      },
      { description: 'summa är 346', code: 'summa', expected: 346 },
      { description: 'hogst är 90', code: 'hogst', expected: 90 },
      {
        description: 'Skriver ut de tre raderna',
        code: '__output',
        expected: ['Godkända: 3 av 5', 'Högst: 90', 'Summa: 346'],
      },
    ],
    sourceChecks: [
      {
        description: 'Loopar över listan',
        pattern: /\bfor\s+\w+\s+in\s+poang\b/,
      },
      { description: 'Lägger till med append', pattern: /godkanda\.append\(/ },
      { description: 'Räknar med len()', pattern: /len\(\s*godkanda\s*\)/ },
    ],
  },

  funktioner: {
    id: 'funktioner-boss',
    track: 'funktioner',
    title: 'Boss: Kassan',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Tre funktioner som arbetar ihop: en räknar, en bestämmer och en använder de andra två.',
    task: `Uppgift: Bygg kassan i en webbutik.
  1. \`summa(priser)\` tar en lista med priser och returnerar dem ihoplagda.
  2. \`frakt(belopp, grans=500)\` returnerar 0 om belopp är minst grans, annars 49.
  3. \`att_betala(priser)\` returnerar summan plus frakten. Använd dina två andra funktioner.`,
    starterCode: '# Skriv din kod här\n',
    solution: `def summa(priser):
    total = 0
    for pris in priser:
        total += pris
    return total


def frakt(belopp, grans=500):
    if belopp >= grans:
        return 0
    return 49


def att_betala(priser):
    belopp = summa(priser)
    return belopp + frakt(belopp)
`,
    hints: [],
    tests: [
      {
        description: 'summa([100, 250]) är 350',
        code: 'summa([100, 250])',
        expected: 350,
      },
      { description: 'summa([]) är 0', code: 'summa([])', expected: 0 },
      { description: 'frakt(600) är 0', code: 'frakt(600)', expected: 0 },
      { description: 'frakt(500) är 0', code: 'frakt(500)', expected: 0 },
      { description: 'frakt(499) är 49', code: 'frakt(499)', expected: 49 },
      {
        description: 'frakt(300, 200) är 0',
        code: 'frakt(300, 200)',
        expected: 0,
      },
      {
        description: 'att_betala([100, 200]) är 349',
        code: 'att_betala([100, 200])',
        expected: 349,
      },
      {
        description: 'att_betala([300, 250]) är 550',
        code: 'att_betala([300, 250])',
        expected: 550,
      },
    ],
    sourceChecks: [
      {
        description: 'att_betala använder summa och frakt',
        pattern:
          /def\s+att_betala[\s\S]*summa\([\s\S]*frakt\(|def\s+att_betala[\s\S]*frakt\([\s\S]*summa\(/,
      },
    ],
  },

  strangar: {
    id: 'strangar-boss',
    track: 'strangar',
    title: 'Boss: Välkomstskylten',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Städa upp ett namn som skrivits slarvigt och gör ett användarnamn av det.',
    task: `Uppgift: Skriv tre funktioner.
  1. \`snyggt_namn(fullt_namn)\` returnerar namnet med stor första bokstav i varje ord och ett mellanslag mellan orden: \`"  ada   LOVELACE "\` blir \`"Ada Lovelace"\`.
  2. \`anvandarnamn(fullt_namn)\` returnerar de tre första bokstäverna i första ordet och i sista ordet, med små bokstäver: \`"Ada Lovelace"\` blir \`"adalov"\`.
  3. \`valkomst(fullt_namn)\` returnerar \`"Välkommen Ada Lovelace! Ditt användarnamn är adalov."\` – med en f-sträng och dina två andra funktioner.`,
    starterCode: '# Skriv din kod här\n',
    solution: `def snyggt_namn(fullt_namn):
    orden = []
    for ordet in fullt_namn.split():
        orden.append(ordet.capitalize())
    return " ".join(orden)


def anvandarnamn(fullt_namn):
    orden = fullt_namn.lower().split()
    return orden[0][:3] + orden[-1][:3]


def valkomst(fullt_namn):
    return f"Välkommen {snyggt_namn(fullt_namn)}! Ditt användarnamn är {anvandarnamn(fullt_namn)}."
`,
    hints: [],
    tests: [
      {
        description: 'snyggt_namn("ada lovelace") är "Ada Lovelace"',
        code: 'snyggt_namn("ada lovelace")',
        expected: 'Ada Lovelace',
      },
      {
        description: 'snyggt_namn("  grace   HOPPER ") är "Grace Hopper"',
        code: 'snyggt_namn("  grace   HOPPER ")',
        expected: 'Grace Hopper',
      },
      {
        description: 'anvandarnamn("Ada Lovelace") är "adalov"',
        code: 'anvandarnamn("Ada Lovelace")',
        expected: 'adalov',
      },
      {
        description: 'Med tre ord tas första och sista: "grahop"',
        code: 'anvandarnamn("Grace Brewster Hopper")',
        expected: 'grahop',
      },
      {
        description: 'valkomst("  ada lovelace") blir hela meningen',
        code: 'valkomst("  ada lovelace")',
        expected: 'Välkommen Ada Lovelace! Ditt användarnamn är adalov.',
      },
    ],
    sourceChecks: [
      {
        description: 'valkomst är en f-sträng',
        pattern: /\bf["']/,
      },
    ],
  },

  dictionaries: {
    id: 'dictionaries-boss',
    track: 'dictionaries',
    title: 'Boss: Turneringen',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Resultaten kommer som tupler i en lista. Räkna ihop dem i en dictionary och kora en vinnare.',
    task: `Uppgift: Räkna ihop turneringen.
  1. Skapa listan \`resultat\` med tuplerna ("Ada", 8), ("Bo", 5), ("Ada", 6), ("Cy", 9) och ("Bo", 7).
  2. \`summera(resultat)\` returnerar en dictionary med varje spelares totala poäng, t.ex. \`{"Ada": 14, ...}\`. Tips från banan: get med reservvärde.
  3. \`vinnare(poang)\` tar en sådan dictionary och returnerar namnet med flest poäng.
  4. Spara \`summera(resultat)\` i \`poang\`. Skriv ut varje spelare som \`Ada: 14\` och sist \`Vinnare: Ada\`.`,
    starterCode: '# Skriv din kod här\n',
    solution: `resultat = [("Ada", 8), ("Bo", 5), ("Ada", 6), ("Cy", 9), ("Bo", 7)]


def summera(resultat):
    poang = {}
    for namn, p in resultat:
        poang[namn] = poang.get(namn, 0) + p
    return poang


def vinnare(poang):
    basta = ""
    hogst = 0
    for namn, p in poang.items():
        if p > hogst:
            basta = namn
            hogst = p
    return basta


poang = summera(resultat)
for namn, p in poang.items():
    print(f"{namn}: {p}")
print(f"Vinnare: {vinnare(poang)}")
`,
    hints: [],
    tests: [
      {
        description: 'poang är {"Ada": 14, "Bo": 12, "Cy": 9}',
        code: 'poang',
        expected: { Ada: 14, Bo: 12, Cy: 9 },
      },
      {
        description: 'summera([("Al", 1), ("Al", 2)]) är {"Al": 3}',
        code: 'summera([("Al", 1), ("Al", 2)])',
        expected: { Al: 3 },
      },
      {
        description: 'vinnare({"Ek": 3, "Ur": 7}) är "Ur"',
        code: 'vinnare({"Ek": 3, "Ur": 7})',
        expected: 'Ur',
      },
      {
        description: 'Skriver ut alla spelare och vinnaren',
        code: '__output',
        expected: ['Ada: 14', 'Bo: 12', 'Cy: 9', 'Vinnare: Ada'],
      },
    ],
  },
  smidigare: {
    id: 'smidigare-boss',
    track: 'smidigare',
    title: 'Boss: Filmkvällen',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Inga for-loopar med append den här gången – bara de smidiga sätten från banan.',
    task: `Uppgift: Planera filmkvällen. Varje film är en tupel (titel, betyg, minuter).
  1. Skapa \`korta\` med titlarna på filmerna som är högst 120 minuter, med en list comprehension.
  2. Skapa \`langder\` med titel som nyckel och minuter som värde, med en dictionary comprehension.
  3. Skapa \`basta\` med filmerna sorterade efter betyg, högst först. Använd sorted, lambda och reverse=True.
  4. Skriv ut de tre bästa numrerade med enumerate: \`1. Dune (5)\`.
  5. Skriv till sist ut \`Total speltid: 597 min\` med sum().`,
    starterCode:
      'filmer = [("Dune", 5, 155), ("Up", 4, 96), ("Cars", 3, 117), ("Coco", 5, 105), ("Jaws", 4, 124)]\n',
    solution: `filmer = [("Dune", 5, 155), ("Up", 4, 96), ("Cars", 3, 117), ("Coco", 5, 105), ("Jaws", 4, 124)]
korta = [titel for titel, betyg, minuter in filmer if minuter <= 120]
langder = {titel: minuter for titel, betyg, minuter in filmer}
basta = sorted(filmer, key=lambda film: film[1], reverse=True)
for plats, film in enumerate(basta[:3], 1):
    print(f"{plats}. {film[0]} ({film[1]})")
print(f"Total speltid: {sum(langder.values())} min")
`,
    hints: [],
    tests: [
      {
        description: 'korta är ["Up", "Cars", "Coco"]',
        code: 'korta',
        expected: ['Up', 'Cars', 'Coco'],
      },
      {
        description: 'langder har alla filmers minuter',
        code: 'langder',
        expected: { Dune: 155, Up: 96, Cars: 117, Coco: 105, Jaws: 124 },
      },
      {
        description: 'basta har högst betyg först',
        code: '[film[0] for film in basta]',
        expected: ['Dune', 'Coco', 'Up', 'Jaws', 'Cars'],
      },
      {
        description: 'Skriver ut topp tre och speltiden',
        code: '__output',
        expected: [
          '1. Dune (5)',
          '2. Coco (5)',
          '3. Up (4)',
          'Total speltid: 597 min',
        ],
      },
    ],
    sourceChecks: [
      { description: 'Använder lambda', pattern: /\blambda\b/ },
      { description: 'Använder enumerate', pattern: /\benumerate\s*\(/ },
      { description: 'Använder sum()', pattern: /\bsum\s*\(/ },
      {
        description: 'Ingen append – bara comprehensions',
        pattern: /\.append\(/,
        forbidden: true,
      },
    ],
  },
  undantag: {
    id: 'undantag-boss',
    track: 'undantag',
    title: 'Boss: Bankomaten',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'En bankomat får aldrig krascha, vad kunden än skriver. Funktionen säger ifrån med raise, och programmet fångar felen.',
    task: `Uppgift: Bygg en bankomat.
  1. Skapa \`ta_ut(saldo, text)\` som kollar reglerna i den här ordningen och gör raise ValueError med meddelandet:
     – inte bara siffror: \`Skriv ett tal\`
     – beloppet är 0: \`Beloppet måste vara större än 0\`
     – inte jämna hundratal: \`Bara hela hundralappar\`
     – mer än saldot: \`Täckning saknas\`
     Annars returnerar den det nya saldot.
  2. Skapa \`saldo\` = 1000. Fråga \`input("Belopp? ")\` om och om igen tills svaret är \`klar\`.
  3. Gick uttaget bra skrivs \`Saldo: 700 kr\` ut, annars \`Nekad: \` följt av felmeddelandet.
  4. Skriv till sist ut \`Kvar: 700 kr\`.`,
    starterCode: '# Skriv din kod här\n',
    solution: `def ta_ut(saldo, text):
    if not text.isdigit():
        raise ValueError("Skriv ett tal")
    belopp = int(text)
    if belopp == 0:
        raise ValueError("Beloppet måste vara större än 0")
    if belopp % 100 != 0:
        raise ValueError("Bara hela hundralappar")
    if belopp > saldo:
        raise ValueError("Täckning saknas")
    return saldo - belopp


saldo = 1000
while True:
    text = input("Belopp? ")
    if text == "klar":
        break
    try:
        saldo = ta_ut(saldo, text)
        print(f"Saldo: {saldo} kr")
    except ValueError as fel:
        print(f"Nekad: {fel}")
print(f"Kvar: {saldo} kr")
`,
    hints: [],
    inputs: ['300', 'abc', '250', '900', 'klar'],
    tests: [
      {
        description: 'Ett uttag, tre nekade och sedan klar',
        code: '__output',
        expected: [
          'Saldo: 700 kr',
          'Nekad: Skriv ett tal',
          'Nekad: Bara hela hundralappar',
          'Nekad: Täckning saknas',
          'Kvar: 700 kr',
        ],
      },
      { description: 'saldo är 700', code: 'saldo', expected: 700 },
      {
        description: 'ta_ut(1000, "0") säger ifrån',
        code: '__message(ta_ut, 1000, "0")',
        expected: 'Beloppet måste vara större än 0',
      },
      {
        description: 'ta_ut(500, "-100") är inget tal',
        code: '__message(ta_ut, 500, "-100")',
        expected: 'Skriv ett tal',
      },
      {
        description: 'ta_ut(500, "500") ger 0',
        code: 'ta_ut(500, "500")',
        expected: 0,
      },
      {
        description: 'Klar direkt: bara Kvar: 1000 kr',
        code: '__output',
        expected: ['Kvar: 1000 kr'],
        inputs: ['klar'],
      },
    ],
    sourceChecks: [
      { description: 'Använder raise', pattern: /\braise\s+ValueError/ },
      { description: 'Fångar felen med try', pattern: /\btry\s*:/ },
    ],
  },
  moduler: {
    id: 'moduler-boss',
    track: 'moduler',
    title: 'Boss: Klassresan',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Klassen ska åka på resa. Programmet räknar bussar med math, lottar en ledare med random och håller koll på datumen med datetime.',
    task: `Uppgift: Planera klassresan.
  1. Skapa \`bussar(elever)\`. Varje buss har 40 platser, och alla måste få plats.
  2. Skapa \`ledare(namn)\` som lottar fram en av namnen i listan.
  3. Skapa \`idag\` = 31 oktober 2026 och \`avresa\` = 1 juni 2027, som date.
  4. Fråga \`input("Hur många elever? ")\`. Är svaret inget tal skrivs bara \`Skriv ett tal\` ut.
  5. Annars skrivs tre rader ut: \`Bussar: 3\`, \`Dagar kvar: 213\` (från idag till avresan) och \`Hemresa: 2027-06-04\` (tre dagar efter avresan).`,
    starterCode: '# Skriv din kod här\n',
    solution: `import math
import random
from datetime import date, timedelta


def bussar(elever):
    return math.ceil(elever / 40)


def ledare(namn):
    return random.choice(namn)


idag = date(2026, 10, 31)
avresa = date(2027, 6, 1)

svar = input("Hur många elever? ")
try:
    elever = int(svar)
    print(f"Bussar: {bussar(elever)}")
    print(f"Dagar kvar: {(avresa - idag).days}")
    print(f"Hemresa: {avresa + timedelta(days=3)}")
except ValueError:
    print("Skriv ett tal")
`,
    hints: [],
    inputs: ['95'],
    tests: [
      {
        description: '95 elever',
        code: '__output',
        expected: ['Bussar: 3', 'Dagar kvar: 213', 'Hemresa: 2027-06-04'],
      },
      {
        description: 'Svaret många ger Skriv ett tal',
        code: '__output',
        expected: ['Skriv ett tal'],
        inputs: ['många'],
      },
      { description: 'bussar(80) är 2', code: 'bussar(80)', expected: 2 },
      { description: 'bussar(81) är 3', code: 'bussar(81)', expected: 3 },
      {
        description: 'ledare(["Ada"]) är Ada',
        code: 'ledare(["Ada"])',
        expected: 'Ada',
      },
      {
        description: 'Alla tre kan bli ledare',
        code: 'sorted(set(ledare(["Ada", "Bo", "Cy"]) for _ in range(200)))',
        expected: ['Ada', 'Bo', 'Cy'],
      },
      {
        description: 'avresa är 2027-06-01',
        code: 'str(avresa)',
        expected: '2027-06-01',
      },
    ],
    sourceChecks: [
      { description: 'Avrundar uppåt med ceil', pattern: /\bceil\(/ },
      { description: 'Använder timedelta', pattern: /\btimedelta\(/ },
    ],
  },
  klasser: {
    id: 'klasser-boss',
    track: 'klasser',
    title: 'Boss: Husdjuret',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Ett husdjur i datorn som blir hungrigt och vill leka. Djuret håller själv reda på hur det mår – programmet säger bara vad du gör med det.',
    task: `Uppgift: Bygg ett husdjur.
  1. Skapa klassen \`Husdjur\`. \`__init__(self, namn)\` sparar namnet och sätter \`hunger\` och \`gladje\` till 5.
  2. \`mata(self)\` minskar hunger med 3, men aldrig under 0.
  3. \`leka(self)\` ökar gladje med 2, men aldrig över 10, och ökar hunger med 1.
  4. \`__str__\` returnerar t.ex. \`Fido: hunger 2, glädje 5\`.
  5. Fråga \`input("Vad heter djuret? ")\` och skapa \`djur\`. Fråga sedan \`input("mata, leka eller klar? ")\` om och om igen tills svaret är \`klar\`.
  6. Efter mata eller leka skrivs djuret ut. Annat ger \`Okänt kommando\`.
  7. Skriv till sist ut \`Hej då från Fido!\`.`,
    starterCode: '# Skriv din kod här\n',
    solution: `class Husdjur:
    def __init__(self, namn):
        self.namn = namn
        self.hunger = 5
        self.gladje = 5

    def mata(self):
        self.hunger = max(self.hunger - 3, 0)

    def leka(self):
        self.gladje = min(self.gladje + 2, 10)
        self.hunger += 1

    def __str__(self):
        return f"{self.namn}: hunger {self.hunger}, glädje {self.gladje}"


djur = Husdjur(input("Vad heter djuret? "))
while True:
    kommando = input("mata, leka eller klar? ")
    if kommando == "klar":
        break
    if kommando == "mata":
        djur.mata()
        print(djur)
    elif kommando == "leka":
        djur.leka()
        print(djur)
    else:
        print("Okänt kommando")
print(f"Hej då från {djur.namn}!")
`,
    hints: [],
    inputs: ['Fido', 'mata', 'leka', 'dansa', 'mata', 'klar'],
    tests: [
      {
        description: 'Mata, leka, dansa, mata och klar',
        code: '__output',
        expected: [
          'Fido: hunger 2, glädje 5',
          'Fido: hunger 3, glädje 7',
          'Okänt kommando',
          'Fido: hunger 0, glädje 7',
          'Hej då från Fido!',
        ],
      },
      {
        description: 'Ett nytt djur har hunger 5 och glädje 5',
        code: 'str(Husdjur("Rex"))',
        expected: 'Rex: hunger 5, glädje 5',
      },
      {
        description: 'Glädjen går aldrig över 10',
        code: '(rex := Husdjur("Rex"), rex.leka(), rex.leka(), rex.leka(), rex.gladje)[-1]',
        expected: 10,
      },
      {
        description: 'Klar direkt: bara Hej då från Måns!',
        code: '__output',
        expected: ['Hej då från Måns!'],
        inputs: ['Måns', 'klar'],
      },
    ],
    sourceChecks: [
      { description: 'Skapar klassen Husdjur', pattern: /class\s+Husdjur\b/ },
      { description: 'Har en __str__', pattern: /def\s+__str__\s*\(\s*self/ },
    ],
  },
  felsokning: {
    id: 'felsokning-boss',
    track: 'felsokning',
    title: 'Boss: Buggjakten',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Kassan på kaféet har fyra buggar. En kraschar, de andra ger bara fel svar. Hitta och laga alla.',
    task: `Uppgift: Laga kassan. Så här ska den fungera:
  1. \`radsumma(antal, pris)\` ger vad en rad kostar: antal gånger pris.
  2. \`rabatt(summa)\` ger en tiondel av summan (med //) när summan är 500 kr eller mer, annars 0.
  3. Programmet skriver ut en rad per vara, t.ex. \`kaffe: 90 kr\`, och sedan summan, rabatten och vad som ska betalas.`,
    starterCode: `def radsumma(antal, pris):
    return antal + pris


def rabatt(summa):
    if summa > 500:
        return summa // 10
    return 0


varor = [("kaffe", 2, 45), ("bulle", 4, 15), ("tårta", 1, 350)]
summa = 0
for namn, antal, pris in varor:
    summa = radsumma(antal, pris)
    print(namn + ": " + radsumma(antal, pris) + " kr")
print("Summa: " + str(summa) + " kr")
print("Rabatt: " + str(rabatt(summa)) + " kr")
print("Att betala: " + str(summa - rabatt(summa)) + " kr")
`,
    solution: `def radsumma(antal, pris):
    return antal * pris


def rabatt(summa):
    if summa >= 500:
        return summa // 10
    return 0


varor = [("kaffe", 2, 45), ("bulle", 4, 15), ("tårta", 1, 350)]
summa = 0
for namn, antal, pris in varor:
    summa += radsumma(antal, pris)
    print(namn + ": " + str(radsumma(antal, pris)) + " kr")
print("Summa: " + str(summa) + " kr")
print("Rabatt: " + str(rabatt(summa)) + " kr")
print("Att betala: " + str(summa - rabatt(summa)) + " kr")
`,
    hints: [],
    tests: [
      {
        description: 'Kvittot stämmer',
        code: '__output',
        expected: [
          'kaffe: 90 kr',
          'bulle: 60 kr',
          'tårta: 350 kr',
          'Summa: 500 kr',
          'Rabatt: 50 kr',
          'Att betala: 450 kr',
        ],
      },
      {
        description: 'radsumma(3, 20) är 60',
        code: 'radsumma(3, 20)',
        expected: 60,
      },
      { description: 'rabatt(499) är 0', code: 'rabatt(499)', expected: 0 },
      { description: 'rabatt(500) är 50', code: 'rabatt(500)', expected: 50 },
      {
        description: 'rabatt(1234) är 123',
        code: 'rabatt(1234)',
        expected: 123,
      },
    ],
  },
  pandas: {
    id: 'pandas-boss',
    track: 'pandas',
    title: 'Boss: Kaféets rapport',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Kaféets ägare vill veta vad som säljer bäst och vilken dag som var bäst. Allt finns i forsaljning.csv.',
    task: `Uppgift: Gör ägarens rapport.
  1. Läs in \`forsaljning.csv\` till \`df\` och lägg till kolumnen \`summa\` (antal gånger pris).
  2. Spara intäkten per kategori i \`per_kategori\`, med den största först.
  3. Skriv ut en rad per kategori i den ordningen, t.ex. \`dryck: 1380 kr\`.
  4. Spara intäkten per dag i \`per_dag\`, och skriv till sist ut \`Bästa dagen: 2026-10-02 (1030 kr)\` – med den dag som drog in mest.`,
    starterCode: 'import pandas as pd\n\n# Skriv din kod här\n',
    solution: `import pandas as pd

df = pd.read_csv("forsaljning.csv")
df["summa"] = df["antal"] * df["pris"]

per_kategori = df.groupby("kategori")["summa"].sum().sort_values(ascending=False)
for kategori, summa in per_kategori.items():
    print(f"{kategori}: {summa} kr")

per_dag = df.groupby("datum")["summa"].sum()
basta = per_dag.idxmax()
print(f"Bästa dagen: {basta} ({per_dag.max()} kr)")
`,
    files: { 'forsaljning.csv': FORSALJNING },
    hints: [],
    tests: [
      {
        description: 'Rapporten',
        code: '__output',
        expected: [
          'dryck: 1380 kr',
          'bröd: 670 kr',
          'mat: 550 kr',
          'Bästa dagen: 2026-10-02 (1030 kr)',
        ],
      },
      {
        description: 'per_kategori har den största först',
        code: 'per_kategori.index.tolist()',
        expected: ['dryck', 'bröd', 'mat'],
      },
      {
        description: 'per_dag',
        code: 'per_dag.to_dict()',
        expected: { '2026-10-01': 685, '2026-10-02': 1030, '2026-10-03': 885 },
      },
    ],
    sourceChecks: [{ description: 'Använder groupby', pattern: /groupby\(/ }],
  },
  slutprojekt: {
    id: 'slutprojekt-boss',
    track: 'slutprojekt',
    title: 'Boss: Grottan',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Den sista bossen är ett riktigt textäventyr. Rummen finns redan som data – du skriver spelet.',
    task: `Uppgift: Bygg spelet. Du börjar i ingången och skriver ut rummets text.
  1. Fråga \`input("> ")\` om och om igen. Gör om svaret med \`.strip().lower()\`.
  2. \`sluta\` skriver \`Hej då!\` och avslutar.
  3. Annars ska svaret vara två ord, som \`gå norr\` eller \`ta nyckel\`. Är det inte det: \`Skriv t.ex. gå norr eller ta nyckel\`.
  4. \`gå\`: finns ingen utgång åt det hållet skrivs \`Du kan inte gå åt det hållet.\` Till skattkammaren behövs nyckeln, annars \`Dörren är låst.\` Annars flyttar du dit och rummets text skrivs ut. I skattkammaren skrivs också \`Du vann!\` och spelet slutar.
  5. \`ta\`: finns saken i rummet flyttas den till ryggsäcken och det står t.ex. \`Du tar nyckel.\` Annars \`Här finns ingen guld.\`
  6. Alla andra ord: \`Jag förstår inte.\``,
    starterCode: `RUM = {
    "ingången": {
        "text": "Du står vid grottans ingång.",
        "utgangar": {"norr": "gången"},
        "saker": [],
    },
    "gången": {
        "text": "En smal gång. Det droppar från taket.",
        "utgangar": {"söder": "ingången", "öster": "skattkammaren"},
        "saker": ["nyckel"],
    },
    "skattkammaren": {
        "text": "Guld överallt! Du har hittat skatten!",
        "utgangar": {"väster": "gången"},
        "saker": [],
    },
}
# Skriv spelet här
`,
    solution: `RUM = {
    "ingången": {
        "text": "Du står vid grottans ingång.",
        "utgangar": {"norr": "gången"},
        "saker": [],
    },
    "gången": {
        "text": "En smal gång. Det droppar från taket.",
        "utgangar": {"söder": "ingången", "öster": "skattkammaren"},
        "saker": ["nyckel"],
    },
    "skattkammaren": {
        "text": "Guld överallt! Du har hittat skatten!",
        "utgangar": {"väster": "gången"},
        "saker": [],
    },
}

plats = "ingången"
ryggsack = []
print(RUM[plats]["text"])
while True:
    kommando = input("> ").strip().lower()
    if kommando == "sluta":
        print("Hej då!")
        break
    delar = kommando.split()
    if len(delar) != 2:
        print("Skriv t.ex. gå norr eller ta nyckel")
        continue
    verb, sak = delar
    if verb == "gå":
        utgangar = RUM[plats]["utgangar"]
        if sak not in utgangar:
            print("Du kan inte gå åt det hållet.")
            continue
        nytt = utgangar[sak]
        if nytt == "skattkammaren" and "nyckel" not in ryggsack:
            print("Dörren är låst.")
            continue
        plats = nytt
        print(RUM[plats]["text"])
        if plats == "skattkammaren":
            print("Du vann!")
            break
    elif verb == "ta":
        if sak in RUM[plats]["saker"]:
            RUM[plats]["saker"].remove(sak)
            ryggsack.append(sak)
            print(f"Du tar {sak}.")
        else:
            print(f"Här finns ingen {sak}.")
    else:
        print("Jag förstår inte.")
`,
    hints: [],
    inputs: [
      'gå väster',
      'gå norr',
      'gå öster',
      'Ta nyckel',
      'hoppa',
      'gå öster',
    ],
    tests: [
      {
        description: 'Hela vägen till skatten',
        code: '__output',
        expected: [
          'Du står vid grottans ingång.',
          'Du kan inte gå åt det hållet.',
          'En smal gång. Det droppar från taket.',
          'Dörren är låst.',
          'Du tar nyckel.',
          'Skriv t.ex. gå norr eller ta nyckel',
          'Guld överallt! Du har hittat skatten!',
          'Du vann!',
        ],
      },
      {
        description: 'Nyckeln ligger i ryggsäcken',
        code: 'ryggsack',
        expected: ['nyckel'],
      },
      {
        description: 'Ta något som inte finns, dansa och sluta',
        code: '__output',
        expected: [
          'Du står vid grottans ingång.',
          'Här finns ingen guld.',
          'Jag förstår inte.',
          'Hej då!',
        ],
        inputs: ['ta guld', 'dansa runt', 'sluta'],
      },
    ],
  },
  streamlit: {
    id: 'streamlit-boss',
    track: 'streamlit',
    title: 'Boss: Kaféets dashboard',
    isBoss: true,
    xp: 50,
    description:
      BOSS_INTRO +
      'Ägaren vill slippa be dig om rapporter. Bygg en dashboard där hen själv kan välja vad hen vill se.',
    task: `Uppgift: Bygg dashboarden från forsaljning.csv.
  1. Rubriken \`Kaféets dashboard\`.
  2. I sidopanelen: en \`st.selectbox\` med \`Kategori\` (\`alla\` och sedan kategorierna i bokstavsordning) och en \`st.slider\` med \`Minst antal\` från 0 till 20 som börjar på 0.
  3. Urvalet är raderna i vald kategori (alla om \`alla\`) där \`antal\` är minst det valda.
  4. Är urvalet tomt: \`st.warning("Inga rader matchar")\` och \`st.stop()\`.
  5. Annars tre \`st.metric\` i tre kolumner: \`Sålda\` (summan av antal), \`Intäkt\` (t.ex. \`2600 kr\`) och \`Bästsäljare\` (produkten med flest sålda i urvalet).
  6. Sist ett stapeldiagram med antal per produkt i urvalet.`,
    starterCode: `import streamlit as st
import pandas as pd

df = pd.read_csv("forsaljning.csv")
`,
    solution: `import streamlit as st
import pandas as pd

df = pd.read_csv("forsaljning.csv")

st.title("Kaféets dashboard")
with st.sidebar:
    kategori = st.selectbox("Kategori", ["alla"] + sorted(df["kategori"].unique()))
    minst = st.slider("Minst antal", 0, 20, 0)

urval = df[df["antal"] >= minst]
if kategori != "alla":
    urval = urval[urval["kategori"] == kategori]

if urval.empty:
    st.warning("Inga rader matchar")
    st.stop()

per_produkt = urval.groupby("produkt")["antal"].sum()
kol1, kol2, kol3 = st.columns(3)
kol1.metric("Sålda", int(urval["antal"].sum()))
kol2.metric("Intäkt", f"{(urval['antal'] * urval['pris']).sum()} kr")
kol3.metric("Bästsäljare", per_produkt.idxmax())
st.bar_chart(per_produkt)
`,
    files: { 'forsaljning.csv': FORSALJNING },
    hints: [],
    tests: [
      {
        description: 'Rubriken och filtren',
        code: "__shown('title') + __shown('selectbox') + __shown('slider')",
        expected: ['Kaféets dashboard', 'Kategori: alla', 'Minst antal: 0'],
      },
      {
        description: 'Allt: 87 sålda, 2600 kr, kaffe bäst',
        code: "__shown('metric')",
        expected: ['Sålda: 87', 'Intäkt: 2600 kr', 'Bästsäljare: kaffe'],
      },
      {
        description: 'Bröd: 29 sålda, 670 kr, bulle bäst',
        code: "__shown('metric')",
        expected: ['Sålda: 29', 'Intäkt: 670 kr', 'Bästsäljare: bulle'],
        widgets: { Kategori: 'bröd' },
      },
      {
        description: 'Minst 10: 48 sålda, 1280 kr',
        code: "__shown('metric')[:2]",
        expected: ['Sålda: 48', 'Intäkt: 1280 kr'],
        widgets: { 'Minst antal': 10 },
      },
      {
        description: 'Diagram med en stapel per produkt',
        code: "__shown('bar_chart')",
        expected: ['diagram med 5 staplar'],
      },
      {
        description: 'Mat och minst 10: varning och inga nyckeltal',
        code: "__shown('warning') + __shown('metric')",
        expected: ['Inga rader matchar'],
        widgets: { Kategori: 'mat', 'Minst antal': 10 },
      },
    ],
    sourceChecks: [
      { description: 'Filtren ligger i sidopanelen', pattern: /st\.sidebar/ },
      { description: 'Nyckeltalen står i kolumner', pattern: /st\.columns\(/ },
    ],
  },
};
