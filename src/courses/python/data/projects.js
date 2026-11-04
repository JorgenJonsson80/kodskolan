import { projectSteps } from '../../../core/projects';

// Projekt som låses upp när en bana är klar. Eleven väljer ett av tre men
// kan göra alla. Varje projekt byggs i steg, och koden från förra steget
// följer med till nästa. why förklarar varför koden ser ut som den gör.
// reward: priset man får när projektet är klart. Facit följer samma
// regler som övningarna: inga listor före bana 3, ingen def före bana 4
// och inga f-strängar före bana 5.
export const PROJECTS = [
  // Bana 1: Grunderna
  {
    id: 'proj-kaffe',
    track: 'grunder',
    title: 'Kaffeautomaten',
    reward: { emoji: '☕', name: 'Kaffekopp' },
    summary:
      'En automat som visar menyn, tar emot beställningen och ger växel.',
    steps: [
      {
        title: 'Menyn',
        why: 'Priserna ligger i variabler i stället för att skrivas direkt i texten. Höjs priset på kaffe ändrar du på ett enda ställe, och både menyn och kassan blir rätt.',
        xp: 15,
        description:
          'Du bygger en kaffeautomat. Först ska den visa vad som finns och vad det kostar.',
        task: 'Uppgift: Skapa `pris_kaffe` med 25 och `pris_te` med 20. Skriv sedan ut menyn: `1. Kaffe – 25 kr` och `2. Te – 20 kr`, med priserna från variablerna.',
        starterCode: '# Steg 1: menyn\n',
        solution: `pris_kaffe = 25
pris_te = 20
print("1. Kaffe – " + str(pris_kaffe) + " kr")
print("2. Te – " + str(pris_te) + " kr")
`,
        hints: [
          'Börja med två variabler: pris_kaffe = 25 och pris_te = 20.',
          'Talen måste göras om till text med str() innan de sätts ihop med +.',
          'print("1. Kaffe – " + str(pris_kaffe) + " kr")',
        ],
        tests: [
          { description: 'pris_kaffe är 25', code: 'pris_kaffe', expected: 25 },
          { description: 'pris_te är 20', code: 'pris_te', expected: 20 },
          {
            description: 'Skriver ut menyn',
            code: '__output',
            expected: ['1. Kaffe – 25 kr', '2. Te – 20 kr'],
          },
        ],
        sourceChecks: [
          {
            description: 'Priserna hämtas från variablerna',
            pattern: /str\(pris_kaffe\)/,
          },
        ],
      },
      {
        title: 'Beställningen',
        why: 'Svaret från input är alltid text, så det jämförs med "1" och inte med 1. Valet sparar priset i pris, så att nästa steg kan räkna med det utan att fråga om vad kunden valde.',
        xp: 15,
        description:
          'Nu ska kunden kunna välja. Automaten minns priset till betalningen.',
        task: 'Uppgift: Fråga `input("Välj 1 eller 2: ")` och spara svaret i `val`. Vid 1: sätt `pris` till priset på kaffe och skriv ut `Du valde kaffe.` Vid 2 samma sak för te (`Du valde te.`). Annars blir `pris` 0 och du skriver ut `Okänt val – du får ett glas vatten.`',
        solution: `pris_kaffe = 25
pris_te = 20
print("1. Kaffe – " + str(pris_kaffe) + " kr")
print("2. Te – " + str(pris_te) + " kr")

val = input("Välj 1 eller 2: ")
if val == "1":
    pris = pris_kaffe
    print("Du valde kaffe.")
elif val == "2":
    pris = pris_te
    print("Du valde te.")
else:
    pris = 0
    print("Okänt val – du får ett glas vatten.")
`,
        hints: [
          'val = input("Välj 1 eller 2: ") och sedan if, elif och else.',
          'Jämför med text: if val == "1":',
          'I varje gren: sätt pris och skriv ut vad kunden valde.',
        ],
        inputs: ['1'],
        tests: [
          { description: 'Val 1 ger pris 25', code: 'pris', expected: 25 },
          {
            description: 'Val 1 skriver ut Du valde kaffe.',
            code: '__output[-1]',
            expected: 'Du valde kaffe.',
          },
          {
            description: 'Val 2 ger te för 20 kr',
            code: '[pris, __output[-1]]',
            expected: [20, 'Du valde te.'],
            inputs: ['2'],
          },
          {
            description: 'Val 7 ger vatten och pris 0',
            code: '[pris, __output[-1]]',
            expected: [0, 'Okänt val – du får ett glas vatten.'],
            inputs: ['7'],
          },
        ],
      },
      {
        title: 'Betalningen',
        why: 'Växeln räknas ut som betalt - pris i stället för att skrivas in. Då blir den rätt för alla priser och alla belopp, även de du inte testat själv.',
        xp: 20,
        description:
          'Sist ska automaten ta betalt och ge växel – eller säga till om det inte räcker.',
        task: 'Uppgift: Fråga `input("Hur mycket betalar du? ")` och spara svaret som ett tal i `betalt`. Räcker det skriver du ut `Varsågod! Du får 5 kr tillbaka.` (med rätt växel). Annars `Det räcker inte. Det fattas 10 kr.` (med rätt belopp).',
        solution: `pris_kaffe = 25
pris_te = 20
print("1. Kaffe – " + str(pris_kaffe) + " kr")
print("2. Te – " + str(pris_te) + " kr")

val = input("Välj 1 eller 2: ")
if val == "1":
    pris = pris_kaffe
    print("Du valde kaffe.")
elif val == "2":
    pris = pris_te
    print("Du valde te.")
else:
    pris = 0
    print("Okänt val – du får ett glas vatten.")

betalt = int(input("Hur mycket betalar du? "))
if betalt >= pris:
    print("Varsågod! Du får " + str(betalt - pris) + " kr tillbaka.")
else:
    print("Det räcker inte. Det fattas " + str(pris - betalt) + " kr.")
`,
        hints: [
          'betalt = int(input("Hur mycket betalar du? "))',
          'if betalt >= pris: räcker pengarna. Växeln är betalt - pris.',
          'I else fattas pris - betalt kronor.',
        ],
        inputs: ['1', '30'],
        tests: [
          { description: 'betalt är ett tal', code: 'betalt', expected: 30 },
          {
            description: 'Kaffe för 30 kr ger 5 kr tillbaka',
            code: '__output[-1]',
            expected: 'Varsågod! Du får 5 kr tillbaka.',
          },
          {
            description: 'Jämna pengar ger 0 kr tillbaka',
            code: '__output[-1]',
            expected: 'Varsågod! Du får 0 kr tillbaka.',
            inputs: ['1', '25'],
          },
          {
            description: 'Te för 10 kr räcker inte',
            code: '__output[-1]',
            expected: 'Det räcker inte. Det fattas 10 kr.',
            inputs: ['2', '10'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-quiz',
    track: 'grunder',
    title: 'Frågesporten',
    reward: { emoji: '🏅', name: 'Medalj' },
    summary: 'Tre frågor, poäng för varje rätt svar och ett omdöme på slutet.',
    steps: [
      {
        title: 'Första frågan',
        why: 'poang skapas före frågan och ökas bara när svaret är rätt. Det är samma variabel genom hela programmet, så den kan samla poäng från alla frågor.',
        xp: 15,
        description:
          'Du bygger en frågesport. Den börjar med en fråga och en poängräknare.',
        task: 'Uppgift: Skapa `poang` med 0. Fråga `input("Vad heter Sveriges huvudstad? ")` och spara svaret i `svar`. Är svaret `Stockholm`: skriv ut `Rätt!` och öka `poang` med 1. Annars: skriv ut `Fel, det är Stockholm.`',
        starterCode: '# Steg 1: första frågan\n',
        solution: `poang = 0

svar = input("Vad heter Sveriges huvudstad? ")
if svar == "Stockholm":
    print("Rätt!")
    poang = poang + 1
else:
    print("Fel, det är Stockholm.")
`,
        hints: [
          'poang = 0 först, sedan svar = input(…).',
          'if svar == "Stockholm": och else: under.',
          'I if-delen: print("Rätt!") och poang = poang + 1.',
        ],
        inputs: ['Stockholm'],
        tests: [
          { description: 'Rätt svar ger 1 poäng', code: 'poang', expected: 1 },
          {
            description: 'Rätt svar skriver ut Rätt!',
            code: '__output',
            expected: ['Rätt!'],
          },
          {
            description: 'Fel svar ger 0 poäng',
            code: '[poang, __output]',
            expected: [0, ['Fel, det är Stockholm.']],
            inputs: ['Oslo'],
          },
        ],
      },
      {
        title: 'Två frågor till',
        why: 'Svaren på talfrågorna görs om med int() innan de jämförs. "8" och 8 är inte samma sak i Python, så utan int() skulle även rätt svar bli fel.',
        xp: 15,
        description:
          'En fråga är ingen frågesport. Lägg till två till, båda med tal som svar.',
        task: 'Uppgift: Fråga `input("Hur många ben har en spindel? ")` och sedan `input("Vad är 7 gånger 6? ")`. Gör om svaren till tal. Rätt svar (8 och 42) ger `Rätt!` och en poäng. Fel svar ger `Fel, det är 8.` respektive `Fel, det är 42.`',
        solution: `poang = 0

svar = input("Vad heter Sveriges huvudstad? ")
if svar == "Stockholm":
    print("Rätt!")
    poang = poang + 1
else:
    print("Fel, det är Stockholm.")

ben = int(input("Hur många ben har en spindel? "))
if ben == 8:
    print("Rätt!")
    poang = poang + 1
else:
    print("Fel, det är 8.")

produkt = int(input("Vad är 7 gånger 6? "))
if produkt == 42:
    print("Rätt!")
    poang = poang + 1
else:
    print("Fel, det är 42.")
`,
        hints: [
          'Samma mönster som första frågan, två gånger till.',
          'ben = int(input("Hur många ben har en spindel? ")) och if ben == 8:',
          'Glöm inte poang = poang + 1 i varje if-del.',
        ],
        inputs: ['Stockholm', '8', '42'],
        tests: [
          { description: 'Tre rätt ger 3 poäng', code: 'poang', expected: 3 },
          {
            description: 'Tre rätt skriver ut Rätt! tre gånger',
            code: '__output',
            expected: ['Rätt!', 'Rätt!', 'Rätt!'],
          },
          {
            description: 'Bara sista rätt ger 1 poäng',
            code: '[poang, __output]',
            expected: [
              1,
              ['Fel, det är Stockholm.', 'Fel, det är 8.', 'Rätt!'],
            ],
            inputs: ['Oslo', '6', '42'],
          },
        ],
      },
      {
        title: 'Resultatet',
        why: 'Villkoren kollas från det bästa resultatet och neråt. Med elif räcker det att skriva poang >= 1 för mittengruppen, eftersom 3 poäng redan fångats av if-raden ovanför.',
        xp: 20,
        description:
          'Avsluta med att visa poängen och ett omdöme som beror på hur det gick.',
        task: 'Uppgift: Skriv ut `Du fick 3 av 3 poäng.` (med rätt poäng). Skriv sedan ut `Perfekt!` vid 3 poäng, `Bra kämpat!` vid 1 eller 2 och `Öva lite till!` vid 0.',
        solution: `poang = 0

svar = input("Vad heter Sveriges huvudstad? ")
if svar == "Stockholm":
    print("Rätt!")
    poang = poang + 1
else:
    print("Fel, det är Stockholm.")

ben = int(input("Hur många ben har en spindel? "))
if ben == 8:
    print("Rätt!")
    poang = poang + 1
else:
    print("Fel, det är 8.")

produkt = int(input("Vad är 7 gånger 6? "))
if produkt == 42:
    print("Rätt!")
    poang = poang + 1
else:
    print("Fel, det är 42.")

print("Du fick " + str(poang) + " av 3 poäng.")
if poang == 3:
    print("Perfekt!")
elif poang >= 1:
    print("Bra kämpat!")
else:
    print("Öva lite till!")
`,
        hints: [
          'print("Du fick " + str(poang) + " av 3 poäng.")',
          'if poang == 3:, elif poang >= 1: och else:',
          'Ordningen spelar roll – kolla 3 poäng först.',
        ],
        inputs: ['Stockholm', '8', '42'],
        tests: [
          {
            description: 'Tre rätt ger Perfekt!',
            code: '__output[-2:]',
            expected: ['Du fick 3 av 3 poäng.', 'Perfekt!'],
          },
          {
            description: 'Ett rätt ger Bra kämpat!',
            code: '__output[-2:]',
            expected: ['Du fick 1 av 3 poäng.', 'Bra kämpat!'],
            inputs: ['Oslo', '8', '40'],
          },
          {
            description: 'Inga rätt ger Öva lite till!',
            code: '__output[-2:]',
            expected: ['Du fick 0 av 3 poäng.', 'Öva lite till!'],
            inputs: ['Oslo', '6', '40'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-biljett',
    track: 'grunder',
    title: 'Biljettkassan',
    reward: { emoji: '🎟️', name: 'Biljett' },
    summary: 'Räkna ut priset på en biobiljett utifrån ålder och medlemskap.',
    steps: [
      {
        title: 'Åldern',
        why: 'Åldern görs om till ett tal direkt när den läses in. Då kan resten av programmet jämföra med < och >= utan att tänka på att input ger text.',
        xp: 15,
        description:
          'Du bygger kassan på en bio. Priset beror på hur gammal kunden är.',
        task: 'Uppgift: Fråga `input("Hur gammal är du? ")`, gör om svaret till ett tal och spara det i `alder`. Skriv sedan ut `Du är 10 år.` (med rätt ålder).',
        starterCode: '# Steg 1: åldern\n',
        solution: `alder = int(input("Hur gammal är du? "))
print("Du är " + str(alder) + " år.")
`,
        hints: [
          'alder = int(input("Hur gammal är du? "))',
          'Talet behöver str() för att sättas ihop med text.',
          'print("Du är " + str(alder) + " år.")',
        ],
        inputs: ['10'],
        tests: [
          { description: 'alder är ett tal', code: 'alder', expected: 10 },
          {
            description: 'Skriver ut Du är 10 år.',
            code: '__output',
            expected: ['Du är 10 år.'],
          },
        ],
      },
      {
        title: 'Priset',
        why: 'Varje gren sätter samma variabel, pris. Efter if-satsen finns ett pris oavsett vilken väg koden tog, och det skrivs ut på ett enda ställe i stället för tre.',
        xp: 15,
        description: 'Barn och pensionärer får rabatt.',
        task: 'Uppgift: Sätt `pris` till 50 för den som är under 12, 70 för den som är 65 eller äldre och 100 för alla andra. Skriv sedan ut `Biljetten kostar 50 kr.` (med rätt pris).',
        solution: `alder = int(input("Hur gammal är du? "))
print("Du är " + str(alder) + " år.")

if alder < 12:
    pris = 50
elif alder >= 65:
    pris = 70
else:
    pris = 100
print("Biljetten kostar " + str(pris) + " kr.")
`,
        hints: [
          'if alder < 12:, elif alder >= 65: och else:',
          'Sätt bara pris i grenarna. Skriv ut efter if-satsen.',
          'print("Biljetten kostar " + str(pris) + " kr.") utan indrag.',
        ],
        inputs: ['10'],
        tests: [
          { description: '10 år kostar 50 kr', code: 'pris', expected: 50 },
          {
            description: 'Skriver ut priset',
            code: '__output[-1]',
            expected: 'Biljetten kostar 50 kr.',
          },
          {
            description: '30 år kostar 100 kr',
            code: '__output[-1]',
            expected: 'Biljetten kostar 100 kr.',
            inputs: ['30'],
          },
          {
            description: '70 år kostar 70 kr',
            code: '__output[-1]',
            expected: 'Biljetten kostar 70 kr.',
            inputs: ['70'],
          },
        ],
      },
      {
        title: 'Medlemsrabatten',
        why: 'Rabatten dras av från pris i stället för att räknas in i varje gren ovanför. Rabatten och åldersprisen är två olika regler, och hålls de isär blir båda lätta att ändra.',
        xp: 20,
        description:
          'Medlemmar i biografens klubb får 20 kr rabatt, oavsett ålder.',
        task: 'Uppgift: Fråga `input("Är du medlem? ")` och spara svaret i `medlem`. Svarar kunden `ja` minskar `pris` med 20. Skriv sist ut `Att betala: 30 kr` (med rätt belopp).',
        solution: `alder = int(input("Hur gammal är du? "))
print("Du är " + str(alder) + " år.")

if alder < 12:
    pris = 50
elif alder >= 65:
    pris = 70
else:
    pris = 100
print("Biljetten kostar " + str(pris) + " kr.")

medlem = input("Är du medlem? ")
if medlem == "ja":
    pris = pris - 20
print("Att betala: " + str(pris) + " kr")
`,
        hints: [
          'medlem = input("Är du medlem? ")',
          'if medlem == "ja": pris = pris - 20',
          'print("Att betala: " + str(pris) + " kr") sist, utan indrag.',
        ],
        inputs: ['10', 'ja'],
        tests: [
          {
            description: 'Medlem 10 år betalar 30 kr',
            code: 'pris',
            expected: 30,
          },
          {
            description: 'Skriver ut Att betala: 30 kr',
            code: '__output[-1]',
            expected: 'Att betala: 30 kr',
          },
          {
            description: 'Icke-medlem 30 år betalar 100 kr',
            code: '__output[-1]',
            expected: 'Att betala: 100 kr',
            inputs: ['30', 'nej'],
          },
        ],
      },
    ],
  },

  // Bana 2: Loopar
  {
    id: 'proj-spargris',
    track: 'loopar',
    title: 'Spargrisen',
    reward: { emoji: '🐷', name: 'Spargris' },
    summary: 'Räkna ut hur många veckor det tar att spara ihop till något.',
    steps: [
      {
        title: 'Räkna veckorna',
        why: 'while passar här eftersom du inte vet i förväg hur många varv det blir – det är ju det du vill räkna ut. Loopen håller på tills målet är nått.',
        xp: 20,
        description:
          'Du sparar en lika stor summa varje vecka. Hur många veckor tar det att nå målet?',
        task: 'Uppgift: Skapa `veckopeng` (50), `mal` (300), `sparat` (0) och `veckor` (0). Lägg till veckopengen i `sparat` och öka `veckor` med 1 så länge `sparat` är mindre än `mal`. Skriv sedan ut `Klart efter 6 veckor!`',
        starterCode: '# Steg 1: räkna veckorna\n',
        solution: `veckopeng = 50
mal = 300
sparat = 0
veckor = 0

while sparat < mal:
    sparat = sparat + veckopeng
    veckor = veckor + 1

print("Klart efter " + str(veckor) + " veckor!")
`,
        hints: [
          'while sparat < mal: och två rader indragna under.',
          'sparat = sparat + veckopeng och veckor = veckor + 1 i loopen.',
          'print-raden står efter loopen, utan indrag.',
        ],
        tests: [
          { description: 'veckor är 6', code: 'veckor', expected: 6 },
          { description: 'sparat är 300', code: 'sparat', expected: 300 },
          {
            description: 'Skriver ut Klart efter 6 veckor!',
            code: '__output',
            expected: ['Klart efter 6 veckor!'],
          },
        ],
        sourceChecks: [{ description: 'Använder while', pattern: /\bwhile\b/ }],
      },
      {
        title: 'Varje vecka',
        why: 'print inne i loopen körs en gång per varv, print efter loopen bara en gång. Indraget bestämmer vilket – och det är skillnaden mellan en logg och en sammanfattning.',
        xp: 20,
        description:
          'Det är roligare att se pengarna växa. Visa hur mycket som är sparat varje vecka.',
        task: 'Uppgift: Skriv ut `Vecka 1: 50 kr`, `Vecka 2: 100 kr` och så vidare inne i loopen, efter att veckan räknats.',
        solution: `veckopeng = 50
mal = 300
sparat = 0
veckor = 0

while sparat < mal:
    sparat = sparat + veckopeng
    veckor = veckor + 1
    print("Vecka " + str(veckor) + ": " + str(sparat) + " kr")

print("Klart efter " + str(veckor) + " veckor!")
`,
        hints: [
          'Lägg till en print-rad inne i loopen.',
          'Den ska stå efter raderna som ändrar sparat och veckor.',
          'print("Vecka " + str(veckor) + ": " + str(sparat) + " kr")',
        ],
        tests: [
          {
            description: 'Skriver ut varje vecka och sedan summeringen',
            code: '__output',
            expected: [
              'Vecka 1: 50 kr',
              'Vecka 2: 100 kr',
              'Vecka 3: 150 kr',
              'Vecka 4: 200 kr',
              'Vecka 5: 250 kr',
              'Vecka 6: 300 kr',
              'Klart efter 6 veckor!',
            ],
          },
        ],
      },
      {
        title: 'Ditt eget mål',
        why: 'Bara de två första raderna ändras, resten av programmet fungerar som förut. Det är vinsten med att använda variabler i stället för tal i koden: indata kan bytas utan att logiken rörs.',
        xp: 25,
        description: 'Låt användaren bestämma veckopengen och målet.',
        task: 'Uppgift: Byt ut 50 och 300 mot `int(input("Hur mycket sparar du per vecka? "))` och `int(input("Vad vill du spara ihop? "))`.',
        solution: `veckopeng = int(input("Hur mycket sparar du per vecka? "))
mal = int(input("Vad vill du spara ihop? "))
sparat = 0
veckor = 0

while sparat < mal:
    sparat = sparat + veckopeng
    veckor = veckor + 1
    print("Vecka " + str(veckor) + ": " + str(sparat) + " kr")

print("Klart efter " + str(veckor) + " veckor!")
`,
        hints: [
          'Ändra bara de två första raderna.',
          'Glöm inte int() – annars blir veckopeng text.',
          'veckopeng = int(input("Hur mycket sparar du per vecka? "))',
        ],
        inputs: ['100', '350'],
        tests: [
          {
            description: '100 kr i veckan till 350 kr',
            code: '__output',
            expected: [
              'Vecka 1: 100 kr',
              'Vecka 2: 200 kr',
              'Vecka 3: 300 kr',
              'Vecka 4: 400 kr',
              'Klart efter 4 veckor!',
            ],
          },
          {
            description: '50 kr i veckan till 120 kr tar 3 veckor',
            code: '__output[-1]',
            expected: 'Klart efter 3 veckor!',
            inputs: ['50', '120'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-kodlas',
    track: 'loopar',
    title: 'Kodlåset',
    reward: { emoji: '🔑', name: 'Nyckel' },
    summary: 'Ett lås som ger tre försök att slå rätt kod innan larmet går.',
    steps: [
      {
        title: 'Tre försök',
        why: 'for med range(3) ger exakt tre försök, och break avbryter direkt när koden är rätt. Utan break skulle låset fråga igen fast det redan öppnats.',
        xp: 20,
        description: 'Du bygger ett kodlås. Man får tre försök på sig.',
        task: 'Uppgift: Skapa `kod` med texten `1234`. Fråga `input("Kod: ")` upp till tre gånger med en for-loop. Rätt kod: skriv ut `Låset öppnas!` och avbryt loopen. Fel kod: skriv ut `Fel kod.`',
        starterCode: '# Steg 1: tre försök\n',
        solution: `kod = "1234"

for forsok in range(3):
    gissning = input("Kod: ")
    if gissning == kod:
        print("Låset öppnas!")
        break
    print("Fel kod.")
`,
        hints: [
          'for forsok in range(3): och gissning = input("Kod: ") inuti.',
          'if gissning == kod: print och break.',
          'print("Fel kod.") står efter if-satsen, i loopen. Den nås bara om break inte kördes.',
        ],
        inputs: ['0000', '1234'],
        tests: [
          {
            description: 'Fel och sedan rätt kod',
            code: '__output',
            expected: ['Fel kod.', 'Låset öppnas!'],
          },
          {
            description: 'Tre fel ger tre Fel kod.',
            code: '__output',
            expected: ['Fel kod.', 'Fel kod.', 'Fel kod.'],
            inputs: ['1', '2', '3'],
          },
        ],
      },
      {
        title: 'Försök kvar',
        why: 'Loopvariabeln forsok är 0, 1 och 2. Försöken kvar räknas ut från den i stället för att hållas i en egen variabel – en sak mindre att hålla reda på.',
        xp: 20,
        description: 'Den som slår fel vill veta hur många försök som är kvar.',
        task: 'Uppgift: Ändra `Fel kod.` till `Fel kod. 2 försök kvar.`, `Fel kod. 1 försök kvar.` och `Fel kod. 0 försök kvar.` Räkna ut talet från `forsok`.',
        solution: `kod = "1234"

for forsok in range(3):
    gissning = input("Kod: ")
    if gissning == kod:
        print("Låset öppnas!")
        break
    print("Fel kod. " + str(2 - forsok) + " försök kvar.")
`,
        hints: [
          'forsok är 0 första varvet, 1 andra och 2 tredje.',
          'Försök kvar är 2 - forsok.',
          'print("Fel kod. " + str(2 - forsok) + " försök kvar.")',
        ],
        inputs: ['0000', '1234'],
        tests: [
          {
            description: 'Fel och sedan rätt kod',
            code: '__output',
            expected: ['Fel kod. 2 försök kvar.', 'Låset öppnas!'],
          },
          {
            description: 'Tre fel räknar ner till 0',
            code: '__output',
            expected: [
              'Fel kod. 2 försök kvar.',
              'Fel kod. 1 försök kvar.',
              'Fel kod. 0 försök kvar.',
            ],
            inputs: ['1', '2', '3'],
          },
        ],
      },
      {
        title: 'Larmet',
        why: 'Efter loopen vet programmet inte längre varför den tog slut. Variabeln oppen minns det: den sätts till True bara när koden var rätt. Ett sådant sant/falskt-minne kallas en flagga.',
        xp: 25,
        description: 'Tre fel i rad ska utlösa larmet.',
        task: 'Uppgift: Skapa `oppen = False` före loopen och sätt den till True när låset öppnas. Efter loopen: är låset inte öppet skriver du ut `Larmet går!`',
        solution: `kod = "1234"
oppen = False

for forsok in range(3):
    gissning = input("Kod: ")
    if gissning == kod:
        print("Låset öppnas!")
        oppen = True
        break
    print("Fel kod. " + str(2 - forsok) + " försök kvar.")

if not oppen:
    print("Larmet går!")
`,
        hints: [
          'oppen = False före loopen, oppen = True före break.',
          'Efter loopen, utan indrag: if not oppen:',
          'not vänder False till True, så if not oppen: körs när låset är stängt.',
        ],
        inputs: ['1', '2', '3'],
        tests: [
          {
            description: 'Tre fel ger larm',
            code: '__output[-1]',
            expected: 'Larmet går!',
          },
          {
            description: 'Rätt kod direkt ger inget larm',
            code: '[oppen, __output]',
            expected: [true, ['Låset öppnas!']],
            inputs: ['1234'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-granen',
    track: 'loopar',
    title: 'Mönstermaskinen',
    reward: { emoji: '🎄', name: 'Gran' },
    summary: 'Rita en trappa och en julgran av stjärnor med loopar.',
    steps: [
      {
        title: 'En rad',
        why: 'Text gånger tal upprepar texten. "*" * bredd ger lika många stjärnor som bredd, utan någon loop. Det kommer du att använda i varje rad av mönstren.',
        xp: 15,
        description:
          'Text kan multipliceras: `"ha" * 3` blir `"hahaha"`. Det är grunden för mönstren.',
        task: 'Uppgift: Skapa `bredd` med 5 och skriv ut en rad med så många stjärnor (`*****`), med hjälp av `*`.',
        starterCode: '# Steg 1: en rad\n',
        solution: `bredd = 5
print("*" * bredd)
`,
        hints: [
          'bredd = 5',
          'Text gånger tal: "*" * bredd',
          'print("*" * bredd)',
        ],
        tests: [
          {
            description: 'Skriver ut *****',
            code: '__output',
            expected: ['*****'],
          },
        ],
        sourceChecks: [
          {
            description: 'Räknar ut stjärnorna från bredd',
            pattern: /\*\s*bredd/,
          },
        ],
      },
      {
        title: 'Trappan',
        why: 'Loopvariabeln i blir 1, 2, 3, 4 – och det är precis antalet stjärnor på varje rad. Mönster som växer är nästan alltid en loop där något räknas ut från loopvariabeln.',
        xp: 20,
        description: 'Nu ska raderna växa: en stjärna, två, tre, fyra.',
        task: 'Uppgift: Skriv ut en trappa under raden, med en for-loop: `*`, `**`, `***` och `****`.',
        solution: `bredd = 5
print("*" * bredd)

for i in range(1, 5):
    print("*" * i)
`,
        hints: [
          'for i in range(1, 5): ger 1, 2, 3 och 4.',
          'Använd i som antal stjärnor.',
          'print("*" * i) i loopen.',
        ],
        tests: [
          {
            description: 'Raden och sedan trappan',
            code: '__output',
            expected: ['*****', '*', '**', '***', '****'],
          },
        ],
      },
      {
        title: 'Granen',
        why: 'Varje rad är mellanslag följt av stjärnor. Antalet av båda räknas ut från i och hojd, så samma två rader kod ritar en gran av vilken höjd som helst.',
        xp: 25,
        description:
          'Sist en julgran. Den behöver mellanslag före stjärnorna för att bli spetsig.',
        task: 'Uppgift: Fråga `input("Hur hög gran? ")` och spara talet i `hojd`. Rita granen med en loop där rad `i` har `hojd - i` mellanslag och `2 * i - 1` stjärnor. Rita sist stammen: `hojd - 1` mellanslag och `|`.',
        solution: `bredd = 5
print("*" * bredd)

for i in range(1, 5):
    print("*" * i)

hojd = int(input("Hur hög gran? "))
for i in range(1, hojd + 1):
    print(" " * (hojd - i) + "*" * (2 * i - 1))
print(" " * (hojd - 1) + "|")
`,
        hints: [
          'for i in range(1, hojd + 1): ger raderna 1 till hojd.',
          'En rad är " " * (hojd - i) + "*" * (2 * i - 1).',
          'Stammen ritas efter loopen: print(" " * (hojd - 1) + "|")',
        ],
        inputs: ['3'],
        tests: [
          {
            description: 'En gran som är 3 hög',
            code: '__output[-4:]',
            expected: ['  *', ' ***', '*****', '  |'],
          },
          {
            description: 'En gran som är 2 hög',
            code: '__output[-3:]',
            expected: [' *', '***', ' |'],
            inputs: ['2'],
          },
        ],
      },
    ],
  },

  // Bana 3: Listor
  {
    id: 'proj-inkop',
    track: 'listor',
    title: 'Inköpslistan',
    reward: { emoji: '🛒', name: 'Kundvagn' },
    summary: 'Skriv in varor tills du är klar, och få en numrerad lista.',
    steps: [
      {
        title: 'Skriv in varorna',
        why: 'Listan börjar tom eftersom programmet inte vet hur många varor det blir. while True med break låter användaren bestämma när det är slut – ett tomt svar är signalen.',
        xp: 20,
        description:
          'Användaren skriver en vara i taget och trycker bara Enter när listan är klar.',
        task: 'Uppgift: Skapa den tomma listan `varor`. Fråga `input("Vara: ")` om och om igen i en `while True`-loop. Är svaret tomt (`""`) avbryter du loopen, annars lägger du till varan i listan.',
        starterCode: '# Steg 1: skriv in varorna\n',
        solution: `varor = []

while True:
    vara = input("Vara: ")
    if vara == "":
        break
    varor.append(vara)
`,
        hints: [
          'varor = [] och sedan while True:',
          'if vara == "": break',
          'varor.append(vara) efter if-satsen, i loopen.',
        ],
        inputs: ['mjölk', 'bröd', ''],
        tests: [
          {
            description: 'varor är mjölk och bröd',
            code: 'varor',
            expected: ['mjölk', 'bröd'],
          },
          {
            description: 'Tomt direkt ger en tom lista',
            code: 'varor',
            expected: [],
            inputs: [''],
          },
        ],
      },
      {
        title: 'Numrera',
        why: 'nummer räknas upp för hand i loopen eftersom for över en lista ger varorna, inte platsnumren. I bana 7 lär du dig enumerate, som gör samma sak kortare.',
        xp: 20,
        description: 'Skriv ut listan med ett nummer framför varje vara.',
        task: 'Uppgift: Skriv ut varorna så här: `1. mjölk`, `2. bröd`. Använd en for-loop över `varor` och en variabel `nummer` som börjar på 1.',
        solution: `varor = []

while True:
    vara = input("Vara: ")
    if vara == "":
        break
    varor.append(vara)

nummer = 1
for vara in varor:
    print(str(nummer) + ". " + vara)
    nummer = nummer + 1
`,
        hints: [
          'nummer = 1 före loopen.',
          'print(str(nummer) + ". " + vara) i loopen.',
          'Öka nummer med 1 sist i loopen.',
        ],
        inputs: ['mjölk', 'bröd', ''],
        tests: [
          {
            description: 'Skriver ut en numrerad lista',
            code: '__output',
            expected: ['1. mjölk', '2. bröd'],
          },
          {
            description: 'Fungerar med tre varor',
            code: '__output',
            expected: ['1. ost', '2. kaffe', '3. smör'],
            inputs: ['ost', 'kaffe', 'smör', ''],
          },
        ],
      },
      {
        title: 'Sammanfattningen',
        why: 'len räknar varorna åt dig, så sammanfattningen stämmer hur många varor som än skrivs in. Den tomma listan får ett eget meddelande – det är lätt att glömma, men det är så program känns genomtänkta.',
        xp: 25,
        description:
          'Avsluta med hur många varor det blev – eller säg till om listan är tom.',
        task: 'Uppgift: Efter listan: är `varor` tom skriver du ut `Listan är tom!`, annars `Totalt 2 varor.` (med rätt antal).',
        solution: `varor = []

while True:
    vara = input("Vara: ")
    if vara == "":
        break
    varor.append(vara)

nummer = 1
for vara in varor:
    print(str(nummer) + ". " + vara)
    nummer = nummer + 1

if len(varor) == 0:
    print("Listan är tom!")
else:
    print("Totalt " + str(len(varor)) + " varor.")
`,
        hints: [
          'len(varor) ger antalet varor.',
          'if len(varor) == 0: och else:',
          'print("Totalt " + str(len(varor)) + " varor.")',
        ],
        inputs: ['mjölk', 'bröd', ''],
        tests: [
          {
            description: 'Två varor ger Totalt 2 varor.',
            code: '__output[-1]',
            expected: 'Totalt 2 varor.',
          },
          {
            description: 'Ingen vara ger Listan är tom!',
            code: '__output',
            expected: ['Listan är tom!'],
            inputs: [''],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-poang',
    track: 'listor',
    title: 'Poängtavlan',
    reward: { emoji: '🏆', name: 'Pokal' },
    summary:
      'Medel, bästa och sämsta resultat och hur många som klarade gränsen.',
    steps: [
      {
        title: 'Medelvärdet',
        why: 'Medelvärdet delar med len(poang) och inte med 5. Läggs ett resultat till blir det fortfarande rätt.',
        xp: 20,
        description:
          'Du har resultaten från ett prov i en lista. Börja med medelvärdet.',
        task: 'Uppgift: Räkna ihop poängen i `summa` med en loop. Räkna ut `medel` som summan delat med antalet och skriv ut `Medel: 14.4`.',
        starterCode: 'poang = [12, 18, 7, 15, 20]\n\n# Steg 1: medelvärdet\n',
        solution: `poang = [12, 18, 7, 15, 20]

summa = 0
for p in poang:
    summa = summa + p
medel = summa / len(poang)
print("Medel: " + str(medel))
`,
        hints: [
          'summa = 0 och en for-loop som lägger till varje p.',
          'medel = summa / len(poang)',
          'print("Medel: " + str(medel))',
        ],
        tests: [
          { description: 'summa är 72', code: 'summa', expected: 72 },
          { description: 'medel är 14.4', code: 'medel', expected: 14.4 },
          {
            description: 'Skriver ut Medel: 14.4',
            code: '__output',
            expected: ['Medel: 14.4'],
          },
        ],
      },
      {
        title: 'Bäst och sämst',
        why: 'Båda börjar med poang[0], ett värde som säkert finns i listan. Börjar du med 0 blir lägst fel om alla har mer än 0 poäng.',
        xp: 20,
        description: 'Leta upp det högsta och det lägsta resultatet.',
        task: 'Uppgift: Leta upp högsta och lägsta poängen med en loop. Spara dem i `hogst` och `lagst` och skriv ut `Högst: 20, lägst: 7`.',
        solution: `poang = [12, 18, 7, 15, 20]

summa = 0
for p in poang:
    summa = summa + p
medel = summa / len(poang)
print("Medel: " + str(medel))

hogst = poang[0]
lagst = poang[0]
for p in poang:
    if p > hogst:
        hogst = p
    if p < lagst:
        lagst = p
print("Högst: " + str(hogst) + ", lägst: " + str(lagst))
`,
        hints: [
          'Börja med hogst = poang[0] och lagst = poang[0].',
          'Två if-satser i loopen: en för större och en för mindre.',
          'print("Högst: " + str(hogst) + ", lägst: " + str(lagst))',
        ],
        tests: [
          { description: 'hogst är 20', code: 'hogst', expected: 20 },
          { description: 'lagst är 7', code: 'lagst', expected: 7 },
          {
            description: 'Skriver ut Högst: 20, lägst: 7',
            code: '__output[-1]',
            expected: 'Högst: 20, lägst: 7',
          },
        ],
      },
      {
        title: 'Godkända',
        why: 'grans ligger i en variabel, så du kan ändra gränsen på ett ställe. Listan godkanda sparar resultaten och inte bara antalet, så att de går att använda till mer senare.',
        xp: 25,
        description: 'Hur många klarade provet? Gränsen är 10 poäng.',
        task: 'Uppgift: Skapa `grans` med 10. Lägg alla poäng som är minst `grans` i listan `godkanda` och skriv ut `4 av 5 klarade gränsen.`',
        solution: `poang = [12, 18, 7, 15, 20]

summa = 0
for p in poang:
    summa = summa + p
medel = summa / len(poang)
print("Medel: " + str(medel))

hogst = poang[0]
lagst = poang[0]
for p in poang:
    if p > hogst:
        hogst = p
    if p < lagst:
        lagst = p
print("Högst: " + str(hogst) + ", lägst: " + str(lagst))

grans = 10
godkanda = []
for p in poang:
    if p >= grans:
        godkanda.append(p)
print(str(len(godkanda)) + " av " + str(len(poang)) + " klarade gränsen.")
`,
        hints: [
          'grans = 10 och godkanda = [] före loopen.',
          'if p >= grans: godkanda.append(p)',
          'Antalet godkända är len(godkanda).',
        ],
        tests: [
          {
            description: 'godkanda är [12, 18, 15, 20]',
            code: 'godkanda',
            expected: [12, 18, 15, 20],
          },
          {
            description: 'Skriver ut 4 av 5 klarade gränsen.',
            code: '__output[-1]',
            expected: '4 av 5 klarade gränsen.',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-spellista',
    track: 'listor',
    title: 'Spellistan',
    reward: { emoji: '🎧', name: 'Hörlurar' },
    summary: 'Lägg till, ta bort och flytta låtar, och spela upp listan.',
    steps: [
      {
        title: 'Listan',
        why: 'append lägger till sist, precis som när du lägger en låt i kön. Första och antal hämtas från listan, så de stämmer även när den ändras.',
        xp: 20,
        description: 'Du bygger en spellista.',
        task: 'Uppgift: Lägg till `Fernando` sist i `latar` med append. Skriv sedan ut `Först: Dancing Queen` och `Antal låtar: 4`, med index och len.',
        starterCode:
          'latar = ["Dancing Queen", "Waterloo", "Mamma Mia"]\n\n# Steg 1: listan\n',
        solution: `latar = ["Dancing Queen", "Waterloo", "Mamma Mia"]

latar.append("Fernando")
print("Först: " + latar[0])
print("Antal låtar: " + str(len(latar)))
`,
        hints: [
          'latar.append("Fernando")',
          'latar[0] är första låten.',
          'print("Antal låtar: " + str(len(latar)))',
        ],
        tests: [
          {
            description: 'Fernando ligger sist',
            code: 'latar',
            expected: ['Dancing Queen', 'Waterloo', 'Mamma Mia', 'Fernando'],
          },
          {
            description: 'Skriver ut första låten och antalet',
            code: '__output',
            expected: ['Först: Dancing Queen', 'Antal låtar: 4'],
          },
        ],
      },
      {
        title: 'Ändra ordningen',
        why: 'pop(0) både tar bort och ger tillbaka låten, så den kan läggas sist med append. Två metoder tillsammans gör något ingen av dem kan själv.',
        xp: 20,
        description:
          'Listor har fler metoder. `remove("x")` tar bort ett värde. `pop(0)` tar bort första saken och ger tillbaka den.',
        task: 'Uppgift: Ta bort `Waterloo` med remove. Flytta sedan första låten sist: ta bort den med `pop(0)`, spara den i `forsta` och lägg till den sist.',
        solution: `latar = ["Dancing Queen", "Waterloo", "Mamma Mia"]

latar.append("Fernando")
print("Först: " + latar[0])
print("Antal låtar: " + str(len(latar)))

latar.remove("Waterloo")
forsta = latar.pop(0)
latar.append(forsta)
`,
        hints: [
          'latar.remove("Waterloo")',
          'forsta = latar.pop(0)',
          'latar.append(forsta)',
        ],
        tests: [
          {
            description: 'Listan är Mamma Mia, Fernando, Dancing Queen',
            code: 'latar',
            expected: ['Mamma Mia', 'Fernando', 'Dancing Queen'],
          },
          {
            description: 'forsta är Dancing Queen',
            code: 'forsta',
            expected: 'Dancing Queen',
          },
        ],
      },
      {
        title: 'Spela upp',
        why: 'range(len(latar)) ger platsnumren 0, 1, 2. Du behöver numret för att skriva ut "1 av 3", och hämtar låten med latar[i].',
        xp: 25,
        description: 'Spela upp listan och visa var i listan du är.',
        task: 'Uppgift: Skriv ut en rad per låt: `Spelar 1 av 3: Mamma Mia` och så vidare. Använd `for i in range(len(latar)):`.',
        solution: `latar = ["Dancing Queen", "Waterloo", "Mamma Mia"]

latar.append("Fernando")
print("Först: " + latar[0])
print("Antal låtar: " + str(len(latar)))

latar.remove("Waterloo")
forsta = latar.pop(0)
latar.append(forsta)

for i in range(len(latar)):
    print("Spelar " + str(i + 1) + " av " + str(len(latar)) + ": " + latar[i])
`,
        hints: [
          'for i in range(len(latar)): ger i = 0, 1, 2.',
          'Platsnumret för människor är i + 1.',
          'print("Spelar " + str(i + 1) + " av " + str(len(latar)) + ": " + latar[i])',
        ],
        tests: [
          {
            description: 'Spelar alla tre låtarna',
            code: '__output[-3:]',
            expected: [
              'Spelar 1 av 3: Mamma Mia',
              'Spelar 2 av 3: Fernando',
              'Spelar 3 av 3: Dancing Queen',
            ],
          },
        ],
      },
    ],
  },

  // Bana 4: Funktioner
  {
    id: 'proj-raknare',
    track: 'funktioner',
    title: 'Miniräknaren',
    reward: { emoji: '🧮', name: 'Kulram' },
    summary: 'En räknare byggd av små funktioner som samarbetar.',
    steps: [
      {
        title: 'De fyra räknesätten',
        why: 'Varje räknesätt får en egen liten funktion. De är lätta att testa var för sig, och nästa steg kan använda dem utan att bry sig om hur de fungerar.',
        xp: 20,
        description:
          'Du bygger en miniräknare. Börja med tre enkla funktioner.',
        task: 'Uppgift: Skapa `plus(a, b)`, `minus(a, b)` och `ganger(a, b)` som returnerar summan, skillnaden och produkten.',
        starterCode: '# Steg 1: plus, minus och gånger\n',
        solution: `def plus(a, b):
    return a + b


def minus(a, b):
    return a - b


def ganger(a, b):
    return a * b
`,
        hints: [
          'Tre def med två parametrar var.',
          'Varje funktion har en return-rad.',
          'def plus(a, b): och return a + b',
        ],
        tests: [
          { description: 'plus(3, 4) ger 7', code: 'plus(3, 4)', expected: 7 },
          {
            description: 'minus(10, 4) ger 6',
            code: 'minus(10, 4)',
            expected: 6,
          },
          {
            description: 'ganger(3, 5) ger 15',
            code: 'ganger(3, 5)',
            expected: 15,
          },
        ],
      },
      {
        title: 'Division',
        why: 'Att dela med noll kraschar programmet med ZeroDivisionError. Funktionen kollar först och returnerar ett meddelande i stället – den som använder den slipper tänka på det.',
        xp: 20,
        description: 'Division är lurig: det går inte att dela med noll.',
        task: 'Uppgift: Skapa `dela(a, b)` som returnerar a delat med b. Är b noll returnerar den i stället texten `Det går inte att dela med noll`.',
        solution: `def plus(a, b):
    return a + b


def minus(a, b):
    return a - b


def ganger(a, b):
    return a * b


def dela(a, b):
    if b == 0:
        return "Det går inte att dela med noll"
    return a / b
`,
        hints: [
          'Kolla b först: if b == 0:',
          'Returnera texten i if-satsen.',
          'Efter if-satsen: return a / b',
        ],
        tests: [
          {
            description: 'dela(10, 4) ger 2.5',
            code: 'dela(10, 4)',
            expected: 2.5,
          },
          { description: 'dela(9, 3) ger 3', code: 'dela(9, 3)', expected: 3 },
          {
            description: 'dela(5, 0) kraschar inte',
            code: 'dela(5, 0)',
            expected: 'Det går inte att dela med noll',
          },
        ],
      },
      {
        title: 'Räknaren',
        why: 'rakna väljer funktion utifrån tecknet men räknar inget själv. Ska du lägga till ett nytt räknesätt skriver du en ny funktion och en ny elif – resten rörs inte.',
        xp: 25,
        description:
          'Sist en funktion som tar ett räknesätt som text och väljer rätt funktion.',
        task: 'Uppgift: Skapa `rakna(a, tecken, b)`. Tecknet är `+`, `-`, `*` eller `/`, och funktionen returnerar svaret från rätt funktion. Okänt tecken ger `Okänt räknesätt`.',
        solution: `def plus(a, b):
    return a + b


def minus(a, b):
    return a - b


def ganger(a, b):
    return a * b


def dela(a, b):
    if b == 0:
        return "Det går inte att dela med noll"
    return a / b


def rakna(a, tecken, b):
    if tecken == "+":
        return plus(a, b)
    elif tecken == "-":
        return minus(a, b)
    elif tecken == "*":
        return ganger(a, b)
    elif tecken == "/":
        return dela(a, b)
    return "Okänt räknesätt"
`,
        hints: [
          'if tecken == "+": return plus(a, b)',
          'En elif för varje tecken som är kvar.',
          'Sist, efter alla if: return "Okänt räknesätt"',
        ],
        tests: [
          {
            description: 'rakna(3, "+", 4) ger 7',
            code: 'rakna(3, "+", 4)',
            expected: 7,
          },
          {
            description: 'rakna(3, "-", 4) ger -1',
            code: 'rakna(3, "-", 4)',
            expected: -1,
          },
          {
            description: 'rakna(3, "*", 4) ger 12',
            code: 'rakna(3, "*", 4)',
            expected: 12,
          },
          {
            description: 'rakna(3, "/", 4) ger 0.75',
            code: 'rakna(3, "/", 4)',
            expected: 0.75,
          },
          {
            description: 'rakna(3, "?", 4) ger Okänt räknesätt',
            code: 'rakna(3, "?", 4)',
            expected: 'Okänt räknesätt',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-termometer',
    track: 'funktioner',
    title: 'Termometern',
    reward: { emoji: '🌡️', name: 'Termometer' },
    summary: 'Räkna om mellan Celsius och Fahrenheit och gör en tabell.',
    steps: [
      {
        title: 'Till Fahrenheit',
        why: 'Formeln skrivs en enda gång, i funktionen. Alla som behöver räkna om anropar den i stället för att skriva formeln igen – och riskera att skriva fel.',
        xp: 20,
        description:
          'I USA mäts temperatur i Fahrenheit. Formeln är: Celsius gånger 9, delat med 5, plus 32.',
        task: 'Uppgift: Skapa `till_fahrenheit(c)` som returnerar temperaturen i Fahrenheit.',
        starterCode: '# Steg 1: Celsius till Fahrenheit\n',
        solution: `def till_fahrenheit(c):
    return c * 9 / 5 + 32
`,
        hints: [
          'def till_fahrenheit(c):',
          'Formeln är c * 9 / 5 + 32.',
          'return c * 9 / 5 + 32',
        ],
        tests: [
          {
            description: '0 °C är 32 °F',
            code: 'till_fahrenheit(0)',
            expected: 32,
          },
          {
            description: '100 °C är 212 °F',
            code: 'till_fahrenheit(100)',
            expected: 212,
          },
          {
            description: '-40 °C är -40 °F',
            code: 'till_fahrenheit(-40)',
            expected: -40,
          },
        ],
      },
      {
        title: 'Tillbaka till Celsius',
        why: 'Parenteserna gör att 32 dras av före multiplikationen. Utan dem räknar Python gånger först, precis som i matten, och svaret blir fel.',
        xp: 20,
        description:
          'Åt andra hållet: Fahrenheit minus 32, gånger 5, delat med 9.',
        task: 'Uppgift: Skapa `till_celsius(f)` som returnerar temperaturen i Celsius.',
        solution: `def till_fahrenheit(c):
    return c * 9 / 5 + 32


def till_celsius(f):
    return (f - 32) * 5 / 9
`,
        hints: [
          'def till_celsius(f):',
          'Dra av 32 först – det behöver parenteser.',
          'return (f - 32) * 5 / 9',
        ],
        tests: [
          {
            description: '212 °F är 100 °C',
            code: 'till_celsius(212)',
            expected: 100,
          },
          {
            description: '32 °F är 0 °C',
            code: 'till_celsius(32)',
            expected: 0,
          },
          {
            description: 'Fram och tillbaka ger samma tal',
            code: 'till_celsius(till_fahrenheit(25))',
            expected: 25,
          },
        ],
      },
      {
        title: 'Tabellen',
        why: 'tabell returnerar raderna i en lista i stället för att skriva ut dem. Då kan den som anropar välja: skriva ut, spara i en fil eller visa på en webbsida.',
        xp: 25,
        description: 'Gör en omvandlingstabell som går att skriva ut.',
        task: 'Uppgift: Skapa `tabell(fran, till, steg)` som returnerar en lista med rader som `0 °C = 32.0 °F`, från `fran` till och med `till`. Använd `till_fahrenheit`.',
        solution: `def till_fahrenheit(c):
    return c * 9 / 5 + 32


def till_celsius(f):
    return (f - 32) * 5 / 9


def tabell(fran, till, steg):
    rader = []
    for c in range(fran, till + 1, steg):
        rader.append(str(c) + " °C = " + str(till_fahrenheit(c)) + " °F")
    return rader
`,
        hints: [
          'rader = [] och range(fran, till + 1, steg) – till ska vara med.',
          'rader.append(str(c) + " °C = " + str(till_fahrenheit(c)) + " °F")',
          'return rader efter loopen.',
        ],
        tests: [
          {
            description: 'tabell(0, 20, 10) ger tre rader',
            code: 'tabell(0, 20, 10)',
            expected: ['0 °C = 32.0 °F', '10 °C = 50.0 °F', '20 °C = 68.0 °F'],
          },
          {
            description: 'tabell(-10, -10, 5) ger en rad',
            code: 'tabell(-10, -10, 5)',
            expected: ['-10 °C = 14.0 °F'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-losenord',
    track: 'funktioner',
    title: 'Lösenordskollen',
    reward: { emoji: '🛡️', name: 'Sköld' },
    summary: 'Bedöm hur starkt ett lösenord är, en regel i taget.',
    steps: [
      {
        title: 'Tillräckligt långt?',
        why: 'Funktionen returnerar jämförelsen direkt. Den är redan True eller False, så en if som returnerar True eller False vore dubbelt arbete.',
        xp: 20,
        description: 'Ett bra lösenord är minst 8 tecken långt.',
        task: 'Uppgift: Skapa `langt_nog(losenord)` som returnerar True om lösenordet har minst 8 tecken.',
        starterCode: '# Steg 1: tillräckligt långt?\n',
        solution: `def langt_nog(losenord):
    return len(losenord) >= 8
`,
        hints: [
          'len(losenord) ger antalet tecken.',
          'Jämförelsen len(losenord) >= 8 är True eller False.',
          'return len(losenord) >= 8',
        ],
        tests: [
          {
            description: 'abc är för kort',
            code: 'langt_nog("abc")',
            expected: false,
          },
          {
            description: '8 tecken räcker',
            code: 'langt_nog("abcdefgh")',
            expected: true,
          },
        ],
      },
      {
        title: 'Har en siffra?',
        why: 'return True avslutar funktionen så fort en siffra hittas – resten behöver inte kollas. return False nås bara om loopen gått igenom allt utan att hitta någon.',
        xp: 20,
        description:
          'for kan gå igenom en text, ett tecken i taget, och in frågar om ett tecken finns i en annan text.',
        task: 'Uppgift: Skapa `har_siffra(losenord)`. Gå igenom tecknen med `for tecken in losenord:` och returnera True så fort ett tecken finns i `"0123456789"`. Hittas ingen siffra returnerar den False.',
        solution: `def langt_nog(losenord):
    return len(losenord) >= 8


def har_siffra(losenord):
    for tecken in losenord:
        if tecken in "0123456789":
            return True
    return False
`,
        hints: [
          'for tecken in losenord: och if tecken in "0123456789":',
          'return True i if-satsen.',
          'return False efter loopen, med samma indrag som for.',
        ],
        tests: [
          {
            description: 'hemligt har ingen siffra',
            code: 'har_siffra("hemligt")',
            expected: false,
          },
          {
            description: 'hemligt7 har en siffra',
            code: 'har_siffra("hemligt7")',
            expected: true,
          },
          {
            description: '1abc har en siffra',
            code: 'har_siffra("1abc")',
            expected: true,
          },
        ],
      },
      {
        title: 'Styrkan',
        why: 'styrka ger poäng genom att fråga de andra funktionerna. Varje regel finns på ett ställe, och en ny regel är en ny funktion och en if till.',
        xp: 25,
        description:
          'Sätt ihop reglerna. `losenord.lower()` ger lösenordet med små bokstäver – är det inte samma som lösenordet finns det en stor bokstav.',
        task: 'Uppgift: Skapa `styrka(losenord)`. Ge en poäng för varje regel: långt nog, har en siffra och har en stor bokstav. 3 poäng ger `starkt`, 2 ger `okej` och mindre ger `svagt`.',
        solution: `def langt_nog(losenord):
    return len(losenord) >= 8


def har_siffra(losenord):
    for tecken in losenord:
        if tecken in "0123456789":
            return True
    return False


def styrka(losenord):
    poang = 0
    if langt_nog(losenord):
        poang = poang + 1
    if har_siffra(losenord):
        poang = poang + 1
    if losenord != losenord.lower():
        poang = poang + 1

    if poang == 3:
        return "starkt"
    if poang == 2:
        return "okej"
    return "svagt"
`,
        hints: [
          'poang = 0 och sedan tre if-satser, en per regel.',
          'Den stora bokstaven: if losenord != losenord.lower():',
          'Sist: if poang == 3: return "starkt", if poang == 2: return "okej", annars "svagt".',
        ],
        tests: [
          {
            description: 'abc är svagt',
            code: 'styrka("abc")',
            expected: 'svagt',
          },
          {
            description: 'Abc är svagt',
            code: 'styrka("Abc")',
            expected: 'svagt',
          },
          {
            description: 'abcdefg1 är okej',
            code: 'styrka("abcdefg1")',
            expected: 'okej',
          },
          {
            description: 'Abcdefg1 är starkt',
            code: 'styrka("Abcdefg1")',
            expected: 'starkt',
          },
        ],
      },
    ],
  },

  // Bana 5: Strängar
  {
    id: 'proj-rovarsprak',
    track: 'strangar',
    title: 'Rövarspråket',
    reward: { emoji: '🎭', name: 'Mask' },
    summary: 'Översätt till Kalle Blomkvists hemliga språk – och tillbaka.',
    steps: [
      {
        title: 'Konsonanterna',
        why: 'tecken.lower() gör att B och b behandlas lika. Utan den skulle du behöva skriva alla konsonanter två gånger.',
        xp: 20,
        description:
          'I rövarspråket dubbleras varje konsonant med ett o emellan: "hej" blir "hohejoj". Först behöver du veta vad som är en konsonant.',
        task: 'Uppgift: Skapa `ar_konsonant(tecken)` som returnerar True om tecknet finns i `"bcdfghjklmnpqrstvwxz"`, oavsett stor eller liten bokstav.',
        starterCode: '# Steg 1: konsonanterna\n',
        solution: `def ar_konsonant(tecken):
    return tecken.lower() in "bcdfghjklmnpqrstvwxz"
`,
        hints: [
          'in frågar om ett tecken finns i en text.',
          'Gör om tecknet till liten bokstav först.',
          'return tecken.lower() in "bcdfghjklmnpqrstvwxz"',
        ],
        tests: [
          {
            description: 'b är en konsonant',
            code: 'ar_konsonant("b")',
            expected: true,
          },
          {
            description: 'B är en konsonant',
            code: 'ar_konsonant("B")',
            expected: true,
          },
          {
            description: 'a är ingen konsonant',
            code: 'ar_konsonant("a")',
            expected: false,
          },
          {
            description: 'mellanslag är ingen konsonant',
            code: 'ar_konsonant(" ")',
            expected: false,
          },
        ],
      },
      {
        title: 'Översätt',
        why: 'resultat byggs upp bit för bit med +=, precis som en summa. Text kan inte ändras, så du bygger en ny i stället för att ändra den gamla.',
        xp: 20,
        description:
          'Nu översättningen: varje konsonant blir konsonant + o + konsonant.',
        task: 'Uppgift: Skapa `rovarsprak(text)`. Gå igenom texten tecken för tecken. En konsonant blir `tecken + "o" + tecken.lower()`, allt annat lämnas som det är. Returnera den nya texten.',
        solution: `def ar_konsonant(tecken):
    return tecken.lower() in "bcdfghjklmnpqrstvwxz"


def rovarsprak(text):
    resultat = ""
    for tecken in text:
        if ar_konsonant(tecken):
            resultat += tecken + "o" + tecken.lower()
        else:
            resultat += tecken
    return resultat
`,
        hints: [
          'resultat = "" och en loop över texten.',
          'if ar_konsonant(tecken): resultat += tecken + "o" + tecken.lower()',
          'else: resultat += tecken, och return resultat efter loopen.',
        ],
        tests: [
          {
            description: 'hej blir hohejoj',
            code: 'rovarsprak("hej")',
            expected: 'hohejoj',
          },
          {
            description: 'Kalle blir Kokalollole',
            code: 'rovarsprak("Kalle")',
            expected: 'Kokalollole',
          },
          {
            description: 'Vokaler och tecken lämnas',
            code: 'rovarsprak("ai!")',
            expected: 'ai!',
          },
        ],
      },
      {
        title: 'Tillbaka',
        why: 'while med ett eget index passar när du ibland vill hoppa över tecken. En for-loop tar alltid nästa tecken, men här ska två tecken hoppas över efter varje konsonant.',
        xp: 25,
        description:
          'Sist åt andra hållet. Efter varje konsonant står "o" och samma konsonant igen – de ska hoppas över.',
        task: 'Uppgift: Skapa `tillbaka(text)`. Använd en while-loop med ett index `i`. Lägg till `text[i]` i resultatet. Är det en konsonant hoppar du fram 3 steg, annars 1.',
        solution: `def ar_konsonant(tecken):
    return tecken.lower() in "bcdfghjklmnpqrstvwxz"


def rovarsprak(text):
    resultat = ""
    for tecken in text:
        if ar_konsonant(tecken):
            resultat += tecken + "o" + tecken.lower()
        else:
            resultat += tecken
    return resultat


def tillbaka(text):
    resultat = ""
    i = 0
    while i < len(text):
        resultat += text[i]
        if ar_konsonant(text[i]):
            i += 3
        else:
            i += 1
    return resultat
`,
        hints: [
          'resultat = "", i = 0 och while i < len(text):',
          'resultat += text[i] först i loopen.',
          'if ar_konsonant(text[i]): i += 3, annars i += 1.',
        ],
        tests: [
          {
            description: 'hohejoj blir hej',
            code: 'tillbaka("hohejoj")',
            expected: 'hej',
          },
          {
            description: 'Fram och tillbaka ger samma text',
            code: 'tillbaka(rovarsprak("Hej på dig!"))',
            expected: 'Hej på dig!',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-textanalys',
    track: 'strangar',
    title: 'Textanalysen',
    reward: { emoji: '📜', name: 'Pergamentrulle' },
    summary: 'Räkna orden, hitta det längsta och sammanfatta en text.',
    steps: [
      {
        title: 'Antal ord',
        why: 'split() utan något i parentesen delar vid alla mellanslag och hoppar över dubbla. split(" ") skulle ge tomma ord där det står två mellanslag i rad.',
        xp: 20,
        description:
          'Du bygger en liten textanalys. Börja med att räkna orden.',
        task: 'Uppgift: Skapa `antal_ord(text)` som returnerar hur många ord texten har.',
        starterCode: '# Steg 1: antal ord\n',
        solution: `def antal_ord(text):
    return len(text.split())
`,
        hints: [
          'text.split() ger en lista med orden.',
          'len ger antalet saker i listan.',
          'return len(text.split())',
        ],
        tests: [
          {
            description: 'Hej på dig har 3 ord',
            code: 'antal_ord("Hej på dig")',
            expected: 3,
          },
          {
            description: 'En tom text har 0 ord',
            code: 'antal_ord("")',
            expected: 0,
          },
          {
            description: 'Extra mellanslag räknas inte som ord',
            code: 'antal_ord("  många   mellanslag  ")',
            expected: 2,
          },
        ],
      },
      {
        title: 'Längsta ordet',
        why: 'langsta börjar som en tom text, som är kortare än alla ord. Då blir första ordet alltid längst till att börja med, och en tom text ger ett tomt svar i stället för en krasch.',
        xp: 20,
        description:
          'Leta upp textens längsta ord med samma mönster som när du letade efter det största talet.',
        task: 'Uppgift: Skapa `langsta_ord(text)` som returnerar det längsta ordet. Är flera lika långa vinner det första.',
        solution: `def antal_ord(text):
    return len(text.split())


def langsta_ord(text):
    langsta = ""
    for ordet in text.split():
        if len(ordet) > len(langsta):
            langsta = ordet
    return langsta
`,
        hints: [
          'langsta = "" och en loop över text.split().',
          'Jämför längderna: if len(ordet) > len(langsta):',
          'Med > och inte >= vinner det första av två lika långa.',
        ],
        tests: [
          {
            description: 'Längst i Jag gillar glass är gillar',
            code: 'langsta_ord("Jag gillar glass")',
            expected: 'gillar',
          },
          {
            description: 'Det första vinner när de är lika långa',
            code: 'langsta_ord("katt hund")',
            expected: 'katt',
          },
          {
            description: 'En tom text ger en tom text',
            code: 'langsta_ord("")',
            expected: '',
          },
        ],
      },
      {
        title: 'Sammanfattningen',
        why: 'f-strängen anropar funktionerna direkt inne i klammerparenteserna. Allt som går att skriva som ett uttryck går att stoppa in i en f-sträng.',
        xp: 25,
        description: 'Sätt ihop analysen till en mening.',
        task: 'Uppgift: Skapa `sammanfatta(text)` som returnerar t.ex. `3 ord, längst är gillar`. Använd en f-sträng och dina två funktioner.',
        solution: `def antal_ord(text):
    return len(text.split())


def langsta_ord(text):
    langsta = ""
    for ordet in text.split():
        if len(ordet) > len(langsta):
            langsta = ordet
    return langsta


def sammanfatta(text):
    return f"{antal_ord(text)} ord, längst är {langsta_ord(text)}"
`,
        hints: [
          'def sammanfatta(text): och en return med en f-sträng.',
          'Funktionsanrop går att skriva direkt i {}.',
          'return f"{antal_ord(text)} ord, längst är {langsta_ord(text)}"',
        ],
        tests: [
          {
            description: 'Sammanfattar Jag gillar glass',
            code: 'sammanfatta("Jag gillar glass")',
            expected: '3 ord, längst är gillar',
          },
          {
            description: 'Sammanfattar en annan text',
            code: 'sammanfatta("Python är ett programspråk")',
            expected: '4 ord, längst är programspråk',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-namnbricka',
    track: 'strangar',
    title: 'Namnbrickan',
    reward: { emoji: '🏷️', name: 'Namnbricka' },
    summary: 'Städa upp ett namn, ta fram initialerna och rita en namnbricka.',
    steps: [
      {
        title: 'Städa namnet',
        why: 'Det folk skriver kan ha mellanslag och konstiga bokstäver. Att städa det i en egen funktion gör att resten av programmet alltid får ett snyggt namn.',
        xp: 20,
        description: '`title()` ger stor bokstav i början av varje ord.',
        task: 'Uppgift: Skapa `stada(namn)` som tar bort mellanslag i början och slutet och ger stor bokstav i varje ord.',
        starterCode: '# Steg 1: städa namnet\n',
        solution: `def stada(namn):
    return namn.strip().title()
`,
        hints: [
          'strip() tar bort mellanslagen.',
          'title() ger stor bokstav i varje ord.',
          'return namn.strip().title()',
        ],
        tests: [
          {
            description: 'Städar anna andersson',
            code: 'stada("  anna andersson ")',
            expected: 'Anna Andersson',
          },
          { description: 'BO blir Bo', code: 'stada("BO")', expected: 'Bo' },
        ],
      },
      {
        title: 'Initialerna',
        why: 'initialer städar namnet med stada först. Då blir initialerna stora bokstäver även om namnet skrevs med små – utan att den koden behöver skrivas igen.',
        xp: 20,
        description: 'Initialerna är första bokstaven i varje del av namnet.',
        task: 'Uppgift: Skapa `initialer(namn)` som returnerar första bokstaven i varje ord i det städade namnet, t.ex. `AMA` för `anna maria andersson`.',
        solution: `def stada(namn):
    return namn.strip().title()


def initialer(namn):
    resultat = ""
    for delnamn in stada(namn).split():
        resultat += delnamn[0]
    return resultat
`,
        hints: [
          'stada(namn).split() ger delarna av namnet.',
          'delnamn[0] är första bokstaven.',
          'Bygg upp resultat med += och returnera det.',
        ],
        tests: [
          {
            description: 'anna maria andersson ger AMA',
            code: 'initialer("anna maria andersson")',
            expected: 'AMA',
          },
          {
            description: '  bo ger B',
            code: 'initialer("  bo")',
            expected: 'B',
          },
        ],
      },
      {
        title: 'Brickan',
        why: 'Ramens längd räknas ut från raden med len. Då passar ramen alla namn, korta som långa – du behöver aldrig räkna stjärnor för hand.',
        xp: 25,
        description:
          'Sist själva brickan: namnet med initialerna, inramat av stjärnor. `\\n` i en text betyder ny rad.',
        task: 'Uppgift: Skapa `bricka(namn)`. Raden i mitten är `* Anna Andersson (AA) *`. Ramen över och under är lika många stjärnor som raden är lång. Returnera de tre raderna ihopsatta med `"\\n"` emellan.',
        solution: `def stada(namn):
    return namn.strip().title()


def initialer(namn):
    resultat = ""
    for delnamn in stada(namn).split():
        resultat += delnamn[0]
    return resultat


def bricka(namn):
    rad = f"* {stada(namn)} ({initialer(namn)}) *"
    ram = "*" * len(rad)
    return ram + "\\n" + rad + "\\n" + ram
`,
        hints: [
          'rad = f"* {stada(namn)} ({initialer(namn)}) *"',
          'ram = "*" * len(rad)',
          'return ram + "\\n" + rad + "\\n" + ram',
        ],
        tests: [
          {
            description: 'Brickan för anna andersson',
            code: 'bricka("anna andersson")',
            expected: `${'*'.repeat(23)}\n* Anna Andersson (AA) *\n${'*'.repeat(23)}`,
          },
          {
            description: 'Ramen passar ett kort namn',
            code: 'bricka("bo")',
            expected: `${'*'.repeat(10)}\n* Bo (B) *\n${'*'.repeat(10)}`,
          },
        ],
      },
    ],
  },

  // Bana 6: Dictionaries och tupler
  {
    id: 'proj-telefonbok',
    track: 'dictionaries',
    title: 'Telefonboken',
    reward: { emoji: '☎️', name: 'Telefon' },
    summary: 'Sök, lägg till, ta bort och lista kontakter.',
    steps: [
      {
        title: 'Sök',
        why: 'Funktionen får telefonboken som parameter i stället för att använda variabeln utanför. Då fungerar den med vilken telefonbok som helst, och är lätt att testa.',
        xp: 20,
        description:
          'Du bygger en telefonbok. Namnen är nycklar och numren värden.',
        task: 'Uppgift: Skapa `sok(kontakter, namn)` som returnerar numret för namnet, eller `Finns inte` om namnet saknas.',
        starterCode:
          'bok = {"Ali": "070-111", "Bea": "073-222"}\n\n# Steg 1: sök\n',
        solution: `bok = {"Ali": "070-111", "Bea": "073-222"}


def sok(kontakter, namn):
    return kontakter.get(namn, "Finns inte")
`,
        hints: [
          'def sok(kontakter, namn):',
          'get med ett reservvärde gör hela jobbet.',
          'return kontakter.get(namn, "Finns inte")',
        ],
        tests: [
          {
            description: 'Hittar Ali',
            code: 'sok(bok, "Ali")',
            expected: '070-111',
          },
          {
            description: 'Dana finns inte',
            code: 'sok(bok, "Dana")',
            expected: 'Finns inte',
          },
        ],
      },
      {
        title: 'Lägg till och ta bort',
        why: 'En dictionary som skickas in i en funktion är samma dictionary som utanför – ändrar funktionen den syns ändringen överallt. Därför behöver lagg_till och ta_bort inte returnera något.',
        xp: 20,
        description:
          '`del kontakter[namn]` tar bort en nyckel. Finns den inte blir det KeyError.',
        task: 'Uppgift: Skapa `lagg_till(kontakter, namn, nummer)` som lägger till eller ändrar ett nummer, och `ta_bort(kontakter, namn)` som tar bort namnet – men bara om det finns.',
        solution: `bok = {"Ali": "070-111", "Bea": "073-222"}


def sok(kontakter, namn):
    return kontakter.get(namn, "Finns inte")


def lagg_till(kontakter, namn, nummer):
    kontakter[namn] = nummer


def ta_bort(kontakter, namn):
    if namn in kontakter:
        del kontakter[namn]
`,
        hints: [
          'lagg_till är en rad: kontakter[namn] = nummer',
          'ta_bort behöver kolla först: if namn in kontakter:',
          'del kontakter[namn] inne i if-satsen.',
        ],
        tests: [
          {
            description: 'lagg_till lägger till Cem',
            code: '(k := {}, lagg_till(k, "Cem", "076-333"), k)[2]',
            expected: { Cem: '076-333' },
          },
          {
            description: 'ta_bort tar bort Ali',
            code: '(k := {"Ali": "1", "Bea": "2"}, ta_bort(k, "Ali"), k)[2]',
            expected: { Bea: '2' },
          },
          {
            description: 'ta_bort kraschar inte när namnet saknas',
            code: '(k := {"Ali": "1"}, ta_bort(k, "Dana"), k)[2]',
            expected: { Ali: '1' },
          },
        ],
      },
      {
        title: 'Lista alla',
        why: 'sorted ger nycklarna i bokstavsordning utan att ändra telefonboken. Funktionen returnerar raderna, så att den som anropar bestämmer vad som ska hända med dem.',
        xp: 25,
        description: '`sorted(kontakter)` ger namnen i bokstavsordning.',
        task: 'Uppgift: Skapa `lista(kontakter)` som returnerar en lista med rader som `Ali: 070-111`, i bokstavsordning efter namn.',
        solution: `bok = {"Ali": "070-111", "Bea": "073-222"}


def sok(kontakter, namn):
    return kontakter.get(namn, "Finns inte")


def lagg_till(kontakter, namn, nummer):
    kontakter[namn] = nummer


def ta_bort(kontakter, namn):
    if namn in kontakter:
        del kontakter[namn]


def lista(kontakter):
    rader = []
    for namn in sorted(kontakter):
        rader.append(f"{namn}: {kontakter[namn]}")
    return rader
`,
        hints: [
          'rader = [] och for namn in sorted(kontakter):',
          'rader.append(f"{namn}: {kontakter[namn]}")',
          'return rader efter loopen.',
        ],
        tests: [
          {
            description: 'Listar i bokstavsordning',
            code: 'lista({"Bea": "2", "Ali": "1"})',
            expected: ['Ali: 1', 'Bea: 2'],
          },
          {
            description: 'En tom bok ger en tom lista',
            code: 'lista({})',
            expected: [],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-lager',
    track: 'dictionaries',
    title: 'Lagret',
    reward: { emoji: '📦', name: 'Lagerlåda' },
    summary:
      'Håll koll på saldot, plocka varor och se vad som behöver beställas.',
    steps: [
      {
        title: 'Finns det?',
        why: 'get med 0 som reservvärde gör att en vara som inte finns räknas som 0 i lager. Då behövs ingen extra if för okända varor.',
        xp: 20,
        description:
          'Du bygger ett lagersystem. Saldot är en dictionary med vara och antal.',
        task: 'Uppgift: Skapa `finns_i_lager(lager, vara, antal)` som returnerar True om det finns minst så många av varan.',
        starterCode:
          'saldo = {"skruv": 120, "mutter": 80, "bricka": 15}\n\n# Steg 1: finns det?\n',
        solution: `saldo = {"skruv": 120, "mutter": 80, "bricka": 15}


def finns_i_lager(lager, vara, antal):
    return lager.get(vara, 0) >= antal
`,
        hints: [
          'lager.get(vara, 0) ger antalet, eller 0 om varan saknas.',
          'Jämför med antal.',
          'return lager.get(vara, 0) >= antal',
        ],
        tests: [
          {
            description: '100 skruvar finns',
            code: 'finns_i_lager(saldo, "skruv", 100)',
            expected: true,
          },
          {
            description: '20 brickor finns inte',
            code: 'finns_i_lager(saldo, "bricka", 20)',
            expected: false,
          },
          {
            description: 'En okänd vara finns inte',
            code: 'finns_i_lager(saldo, "spik", 1)',
            expected: false,
          },
        ],
      },
      {
        title: 'Plocka',
        why: 'plocka använder finns_i_lager i stället för att kolla själv. Saldot kan aldrig bli negativt, och regeln för vad som räcker finns på ett enda ställe.',
        xp: 20,
        description:
          'När en order plockas ska saldot minska – men bara om det räcker.',
        task: 'Uppgift: Skapa `plocka(lager, vara, antal)`. Finns det tillräckligt minskar saldot och funktionen returnerar True. Annars ändras ingenting och den returnerar False.',
        solution: `saldo = {"skruv": 120, "mutter": 80, "bricka": 15}


def finns_i_lager(lager, vara, antal):
    return lager.get(vara, 0) >= antal


def plocka(lager, vara, antal):
    if finns_i_lager(lager, vara, antal):
        lager[vara] -= antal
        return True
    return False
`,
        hints: [
          'if finns_i_lager(lager, vara, antal):',
          'lager[vara] -= antal och return True i if-satsen.',
          'return False efter if-satsen.',
        ],
        tests: [
          {
            description: 'Plocka 4 av 10 ger True',
            code: 'plocka({"skruv": 10}, "skruv", 4)',
            expected: true,
          },
          {
            description: 'Saldot minskar till 6',
            code: '(l := {"skruv": 10}, plocka(l, "skruv", 4), l)[2]',
            expected: { skruv: 6 },
          },
          {
            description: 'Plocka 4 av 3 ger False och saldot är kvar',
            code: '(l := {"skruv": 3}, plocka(l, "skruv", 4), l)[1:]',
            expected: [false, { skruv: 3 }],
          },
        ],
      },
      {
        title: 'Beställ mer',
        why: 'items() ger vara och antal på en gång. Resultatet är en ny dictionary, så saldot ändras inte bara för att någon frågar vad som behöver beställas.',
        xp: 25,
        description: 'Varor som har mindre än en viss gräns behöver beställas.',
        task: 'Uppgift: Skapa `att_bestalla(lager, grans)` som returnerar en ny dictionary med varorna under gränsen och hur många som behövs för att nå upp till den.',
        solution: `saldo = {"skruv": 120, "mutter": 80, "bricka": 15}


def finns_i_lager(lager, vara, antal):
    return lager.get(vara, 0) >= antal


def plocka(lager, vara, antal):
    if finns_i_lager(lager, vara, antal):
        lager[vara] -= antal
        return True
    return False


def att_bestalla(lager, grans):
    bestallning = {}
    for vara, antal in lager.items():
        if antal < grans:
            bestallning[vara] = grans - antal
    return bestallning
`,
        hints: [
          'bestallning = {} och for vara, antal in lager.items():',
          'if antal < grans: bestallning[vara] = grans - antal',
          'return bestallning efter loopen.',
        ],
        tests: [
          {
            description: 'Brickorna behöver 5 till för att nå 20',
            code: 'att_bestalla(saldo, 20)',
            expected: { bricka: 5 },
          },
          {
            description: 'Två varor under gränsen 10',
            code: 'att_bestalla({"a": 5, "b": 50, "c": 2}, 10)',
            expected: { a: 5, c: 8 },
          },
        ],
      },
    ],
  },
  {
    id: 'proj-resultattavla',
    track: 'dictionaries',
    title: 'Resultattavlan',
    reward: { emoji: '🥇', name: 'Guldmedalj' },
    summary: 'Räkna ihop poängen från flera omgångar och gör en topplista.',
    steps: [
      {
        title: 'Summera',
        why: 'Varje omgång är en tupel med namn och poäng, eftersom de två hör ihop och inte ska ändras. Dictionaryn samlar ihop poängen per namn med räknemönstret.',
        xp: 20,
        description:
          'Ett spel har spelats i flera omgångar. Varje omgång är en tupel: (namn, poäng).',
        task: 'Uppgift: Skapa `totalt(omgangar)` som returnerar en dictionary med varje spelares sammanlagda poäng.',
        starterCode:
          'omgangar = [("Ali", 12), ("Bea", 18), ("Ali", 7), ("Cem", 15), ("Bea", 4)]\n\n# Steg 1: summera\n',
        solution: `omgangar = [("Ali", 12), ("Bea", 18), ("Ali", 7), ("Cem", 15), ("Bea", 4)]


def totalt(omgangar):
    summor = {}
    for namn, poang in omgangar:
        summor[namn] = summor.get(namn, 0) + poang
    return summor
`,
        hints: [
          'for namn, poang in omgangar: packar upp varje tupel.',
          'summor[namn] = summor.get(namn, 0) + poang',
          'return summor efter loopen.',
        ],
        tests: [
          {
            description: 'Summerar alla omgångar',
            code: 'totalt(omgangar)',
            expected: { Ali: 19, Bea: 22, Cem: 15 },
          },
          {
            description: 'Inga omgångar ger {}',
            code: 'totalt([])',
            expected: {},
          },
        ],
      },
      {
        title: 'Vinnaren',
        why: 'basta börjar tom, och första spelaren blir bäst hittills oavsett poäng. Då fungerar det även om alla har 0 eller minuspoäng.',
        xp: 20,
        description: 'Vem har flest poäng?',
        task: 'Uppgift: Skapa `vinnare(summor)` som returnerar namnet på spelaren med flest poäng.',
        solution: `omgangar = [("Ali", 12), ("Bea", 18), ("Ali", 7), ("Cem", 15), ("Bea", 4)]


def totalt(omgangar):
    summor = {}
    for namn, poang in omgangar:
        summor[namn] = summor.get(namn, 0) + poang
    return summor


def vinnare(summor):
    basta = ""
    for namn, poang in summor.items():
        if basta == "" or poang > summor[basta]:
            basta = namn
    return basta
`,
        hints: [
          'basta = "" och en loop över summor.items().',
          'Byt basta när den är tom eller när poang är större än summor[basta].',
          'if basta == "" or poang > summor[basta]: basta = namn',
        ],
        tests: [
          {
            description: 'Bea vinner',
            code: 'vinnare(totalt(omgangar))',
            expected: 'Bea',
          },
          {
            description: 'Fungerar med minuspoäng',
            code: 'vinnare({"Ali": -3, "Bea": -1})',
            expected: 'Bea',
          },
        ],
      },
      {
        title: 'Topplistan',
        why: 'dict(summor) gör en kopia. Funktionen tar bort spelare ur kopian en i taget, och utan kopian skulle den tömma originalet – den som anropar skulle bli av med alla poäng.',
        xp: 25,
        description:
          'Gör en topplista genom att hitta vinnaren, ta bort den och hitta nästa – tills alla är med. `kvar.pop(namn)` tar bort en nyckel.',
        task: 'Uppgift: Skapa `tavla(summor)` som returnerar rader som `1. Bea 22 p`, med flest poäng först. Gör en kopia med `dict(summor)` så att originalet inte ändras.',
        solution: `omgangar = [("Ali", 12), ("Bea", 18), ("Ali", 7), ("Cem", 15), ("Bea", 4)]


def totalt(omgangar):
    summor = {}
    for namn, poang in omgangar:
        summor[namn] = summor.get(namn, 0) + poang
    return summor


def vinnare(summor):
    basta = ""
    for namn, poang in summor.items():
        if basta == "" or poang > summor[basta]:
            basta = namn
    return basta


def tavla(summor):
    kvar = dict(summor)
    rader = []
    plats = 1
    while len(kvar) > 0:
        namn = vinnare(kvar)
        rader.append(f"{plats}. {namn} {kvar.pop(namn)} p")
        plats += 1
    return rader
`,
        hints: [
          'kvar = dict(summor), rader = [] och plats = 1.',
          'while len(kvar) > 0: hitta vinnaren i kvar.',
          'rader.append(f"{plats}. {namn} {kvar.pop(namn)} p") och plats += 1.',
        ],
        tests: [
          {
            description: 'Topplistan för spelet',
            code: 'tavla(totalt(omgangar))',
            expected: ['1. Bea 22 p', '2. Ali 19 p', '3. Cem 15 p'],
          },
          {
            description: 'Originalet ändras inte',
            code: '(s := {"Ali": 1, "Bea": 2}, tavla(s), s)[2]',
            expected: { Ali: 1, Bea: 2 },
          },
        ],
      },
    ],
  },
  {
    id: 'proj-vader',
    track: 'smidigare',
    title: 'Väderrapporten',
    reward: { emoji: '☂️', name: 'Paraply' },
    summary: 'Gör en veckorapport av dagarnas temperaturer.',
    steps: [
      {
        title: 'Varmast och kallast',
        why: 'max och min gör samma sak som loopen du skrev i bana 3, men på en rad och utan risk att glömma ett specialfall som en tom startvariabel.',
        xp: 20,
        description:
          'Veckans dagar och temperaturer ligger i två listor som hör ihop plats för plats.',
        task: 'Uppgift: Skapa `varmast` med max och `kallast` med min av `grader`. Skriv ut `Varmast: 21 grader` och `Kallast: 11 grader` med f-strängar.',
        starterCode:
          'dagar = ["mån", "tis", "ons", "tor", "fre", "lör", "sön"]\ngrader = [14, 17, 12, 19, 21, 16, 11]\n\n# Steg 1: varmast och kallast\n',
        solution: `dagar = ["mån", "tis", "ons", "tor", "fre", "lör", "sön"]
grader = [14, 17, 12, 19, 21, 16, 11]

varmast = max(grader)
kallast = min(grader)
print(f"Varmast: {varmast} grader")
print(f"Kallast: {kallast} grader")
`,
        hints: [
          'varmast = max(grader)',
          'kallast = min(grader)',
          'print(f"Varmast: {varmast} grader") och samma för kallast.',
        ],
        tests: [
          { description: 'varmast är 21', code: 'varmast', expected: 21 },
          { description: 'kallast är 11', code: 'kallast', expected: 11 },
          {
            description: 'Skriver ut båda raderna',
            code: '__output',
            expected: ['Varmast: 21 grader', 'Kallast: 11 grader'],
          },
        ],
      },
      {
        title: 'Varma dagar',
        why: 'zip parar ihop dag och temperatur, så att villkoret kan titta på temperaturen medan det är dagen som hamnar i listan.',
        xp: 20,
        description: 'Vilka dagar var det minst 17 grader?',
        task: 'Uppgift: Skapa `varma` med namnen på dagarna som hade minst 17 grader. Använd en list comprehension med zip och if.',
        solution: `dagar = ["mån", "tis", "ons", "tor", "fre", "lör", "sön"]
grader = [14, 17, 12, 19, 21, 16, 11]

varmast = max(grader)
kallast = min(grader)
print(f"Varmast: {varmast} grader")
print(f"Kallast: {kallast} grader")

varma = [dag for dag, g in zip(dagar, grader) if g >= 17]
`,
        hints: [
          'for dag, g in zip(dagar, grader) ger dag och temperatur ihop.',
          'Det som hamnar i listan är dag, och villkoret är g >= 17.',
          'varma = [dag for dag, g in zip(dagar, grader) if g >= 17]',
        ],
        tests: [
          {
            description: 'varma är ["tis", "tor", "fre"]',
            code: 'varma',
            expected: ['tis', 'tor', 'fre'],
          },
        ],
        sourceChecks: [{ description: 'Använder zip', pattern: /\bzip\s*\(/ }],
      },
      {
        title: 'Rapporten',
        why: 'sorted med en lambda sorterar paren efter temperaturen, och enumerate numrerar dem. Funktionen tar listorna som parametrar, så att den fungerar för nästa vecka också.',
        xp: 25,
        description:
          'Rapporten ska visa dagarna från varmast till kallast, numrerade.',
        task: 'Uppgift: Skapa `rapport(dagar, grader)` som returnerar rader som `1. fre: 21 grader`, varmast först. Använd zip, sorted med key=lambda och reverse=True, och enumerate.',
        solution: `dagar = ["mån", "tis", "ons", "tor", "fre", "lör", "sön"]
grader = [14, 17, 12, 19, 21, 16, 11]

varmast = max(grader)
kallast = min(grader)
print(f"Varmast: {varmast} grader")
print(f"Kallast: {kallast} grader")

varma = [dag for dag, g in zip(dagar, grader) if g >= 17]


def rapport(dagar, grader):
    par = sorted(zip(dagar, grader), key=lambda p: p[1], reverse=True)
    rader = []
    for plats, (dag, g) in enumerate(par, 1):
        rader.append(f"{plats}. {dag}: {g} grader")
    return rader
`,
        hints: [
          'par = sorted(zip(dagar, grader), key=lambda p: p[1], reverse=True)',
          'for plats, (dag, g) in enumerate(par, 1): – parentesen packar upp paret.',
          'rader.append(f"{plats}. {dag}: {g} grader") och return rader.',
        ],
        tests: [
          {
            description: 'De tre varmaste dagarna först',
            code: 'rapport(dagar, grader)[:3]',
            expected: [
              '1. fre: 21 grader',
              '2. tor: 19 grader',
              '3. tis: 17 grader',
            ],
          },
          {
            description: 'Alla sju dagar är med',
            code: 'len(rapport(dagar, grader))',
            expected: 7,
          },
          {
            description: 'Fungerar för en annan vecka',
            code: 'rapport(["a", "b"], [1, 2])',
            expected: ['1. b: 2 grader', '2. a: 1 grader'],
          },
        ],
        sourceChecks: [
          { description: 'Använder lambda', pattern: /\blambda\b/ },
          { description: 'Använder enumerate', pattern: /\benumerate\s*\(/ },
        ],
      },
    ],
  },
  {
    id: 'proj-bokhylla',
    track: 'smidigare',
    title: 'Bokhyllan',
    reward: { emoji: '📚', name: 'Bokhylla' },
    summary: 'Håll ordning på böckerna: sök, räkna och planera läsningen.',
    steps: [
      {
        title: 'Titlarna',
        why: 'Varje bok är en tupel med tre värden. I en list comprehension kan du packa upp dem direkt och bara behålla det du behöver.',
        xp: 20,
        description: 'Varje bok är en tupel: (titel, författare, sidor).',
        task: 'Uppgift: Skapa `titlar` med alla titlar och `alla_sidor` med summan av alla sidor. Använd list comprehensions och sum().',
        starterCode:
          'bocker = [\n    ("Mio min Mio", "Lindgren", 180),\n    ("Hobbit", "Tolkien", 310),\n    ("Momo", "Ende", 280),\n    ("Ronja", "Lindgren", 240),\n    ("Matilda", "Dahl", 230),\n]\n\n# Steg 1: titlarna\n',
        solution: `bocker = [
    ("Mio min Mio", "Lindgren", 180),
    ("Hobbit", "Tolkien", 310),
    ("Momo", "Ende", 280),
    ("Ronja", "Lindgren", 240),
    ("Matilda", "Dahl", 230),
]

titlar = [titel for titel, forfattare, sidor in bocker]
alla_sidor = sum([sidor for titel, forfattare, sidor in bocker])
`,
        hints: [
          'for titel, forfattare, sidor in bocker packar upp varje bok.',
          'titlar = [titel for titel, forfattare, sidor in bocker]',
          'sum() av en list comprehension med sidor.',
        ],
        tests: [
          {
            description: 'titlar har alla fem titlar',
            code: 'titlar',
            expected: ['Mio min Mio', 'Hobbit', 'Momo', 'Ronja', 'Matilda'],
          },
          {
            description: 'alla_sidor är 1240',
            code: 'alla_sidor',
            expected: 1240,
          },
        ],
      },
      {
        title: 'Sök författare',
        why: 'Filtret i comprehensionen jämför författaren, men det är titeln som hamnar i listan. Hittas inget blir listan tom, och det är ett bra svar – inget fel.',
        xp: 20,
        description: 'Vilka böcker har en viss författare skrivit?',
        task: 'Uppgift: Skapa `av(forfattare, bocker)` som returnerar titlarna på böckerna av den författaren.',
        solution: `bocker = [
    ("Mio min Mio", "Lindgren", 180),
    ("Hobbit", "Tolkien", 310),
    ("Momo", "Ende", 280),
    ("Ronja", "Lindgren", 240),
    ("Matilda", "Dahl", 230),
]

titlar = [titel for titel, forfattare, sidor in bocker]
alla_sidor = sum([sidor for titel, forfattare, sidor in bocker])


def av(forfattare, bocker):
    return [titel for titel, namn, sidor in bocker if namn == forfattare]
`,
        hints: [
          'Funktionen kan returnera en list comprehension direkt.',
          'Döp författaren i loopen till något annat än parametern, t.ex. namn.',
          'return [titel for titel, namn, sidor in bocker if namn == forfattare]',
        ],
        tests: [
          {
            description: 'Lindgren har skrivit två',
            code: 'av("Lindgren", bocker)',
            expected: ['Mio min Mio', 'Ronja'],
          },
          {
            description: 'Okänd författare ger []',
            code: 'av("Rowling", bocker)',
            expected: [],
          },
        ],
      },
      {
        title: 'Läsordningen',
        why: 'Sidantalet är tredje värdet i tupeln, så lambda b: b[2] talar om för sorted vad som ska jämföras. Originallistan står kvar i samma ordning.',
        xp: 25,
        description: 'Läs de korta böckerna först!',
        task: 'Uppgift: Skapa `lasordning(bocker)` som returnerar rader som `Mio min Mio (180 s)`, kortast först. Använd sorted med key=lambda.',
        solution: `bocker = [
    ("Mio min Mio", "Lindgren", 180),
    ("Hobbit", "Tolkien", 310),
    ("Momo", "Ende", 280),
    ("Ronja", "Lindgren", 240),
    ("Matilda", "Dahl", 230),
]

titlar = [titel for titel, forfattare, sidor in bocker]
alla_sidor = sum([sidor for titel, forfattare, sidor in bocker])


def av(forfattare, bocker):
    return [titel for titel, namn, sidor in bocker if namn == forfattare]


def lasordning(bocker):
    kortast = sorted(bocker, key=lambda bok: bok[2])
    return [f"{titel} ({sidor} s)" for titel, namn, sidor in kortast]
`,
        hints: [
          'kortast = sorted(bocker, key=lambda bok: bok[2])',
          'Gör sedan rader med en list comprehension och en f-sträng.',
          'return [f"{titel} ({sidor} s)" for titel, namn, sidor in kortast]',
        ],
        tests: [
          {
            description: 'Kortast först',
            code: 'lasordning(bocker)',
            expected: [
              'Mio min Mio (180 s)',
              'Matilda (230 s)',
              'Ronja (240 s)',
              'Momo (280 s)',
              'Hobbit (310 s)',
            ],
          },
          {
            description: 'bocker är i samma ordning som förut',
            code: 'bocker[0][0]',
            expected: 'Mio min Mio',
          },
        ],
        sourceChecks: [
          { description: 'Använder lambda', pattern: /\blambda\b/ },
        ],
      },
    ],
  },
  {
    id: 'proj-ordverkstad',
    track: 'smidigare',
    title: 'Ordverkstaden',
    reward: { emoji: '🧩', name: 'Pussel' },
    summary: 'Ta isär en text och se vilka ord som används mest.',
    steps: [
      {
        title: 'Städa orden',
        why: 'split delar texten, och i samma comprehension tar strip bort skiljetecknen och lower gör "Katten" och "katten" till samma ord. Annars räknas de som olika ord.',
        xp: 20,
        description:
          '`ordet.strip(".,!")` tar bort punkter, kommatecken och utropstecken i början och slutet av ordet.',
        task: 'Uppgift: Skapa `orden` med alla ord i texten, utan skiljetecken och med små bokstäver. Använd en list comprehension med split, strip och lower.',
        starterCode:
          'text = "Katten jagade musen. Musen sprang, och katten somnade!"\n\n# Steg 1: städa orden\n',
        solution: `text = "Katten jagade musen. Musen sprang, och katten somnade!"

orden = [ordet.strip(".,!").lower() for ordet in text.split()]
`,
        hints: [
          'text.split() ger orden med skiljetecknen kvar.',
          'ordet.strip(".,!").lower() städar ett ord.',
          'orden = [ordet.strip(".,!").lower() for ordet in text.split()]',
        ],
        tests: [
          {
            description: 'orden är städade',
            code: 'orden',
            expected: [
              'katten',
              'jagade',
              'musen',
              'musen',
              'sprang',
              'och',
              'katten',
              'somnade',
            ],
          },
        ],
      },
      {
        title: 'Räkna orden',
        why: 'I en dictionary finns varje nyckel bara en gång, så ord som förekommer flera gånger blir en enda nyckel. count räknar hur många gånger ordet finns i listan.',
        xp: 20,
        description:
          '`orden.count("musen")` räknar hur många gånger "musen" finns i listan.',
        task: 'Uppgift: Skapa `antal` med varje ord som nyckel och hur många gånger det finns som värde. Använd en dictionary comprehension och count.',
        solution: `text = "Katten jagade musen. Musen sprang, och katten somnade!"

orden = [ordet.strip(".,!").lower() for ordet in text.split()]

antal = {ordet: orden.count(ordet) for ordet in orden}
`,
        hints: [
          'Nyckeln är ordet och värdet orden.count(ordet).',
          'Börja med {ordet: ... for ordet in orden}.',
          'antal = {ordet: orden.count(ordet) for ordet in orden}',
        ],
        tests: [
          {
            description: 'antal räknar varje ord',
            code: 'antal',
            expected: {
              katten: 2,
              jagade: 1,
              musen: 2,
              sprang: 1,
              och: 1,
              somnade: 1,
            },
          },
        ],
      },
      {
        title: 'Topplistan',
        why: 'items() ger par med ord och antal, och lambda sorterar dem efter antalet. max med key=len fungerar som sorted med key, men ger bara den största.',
        xp: 25,
        description:
          '`max(orden, key=len)` ger det längsta ordet, på samma sätt som key fungerar för sorted.',
        task: 'Uppgift: Skapa `langsta` med det längsta ordet. Skapa sedan `vanligast(antal, n)` som returnerar de n vanligaste orden som `katten: 2`, flest först.',
        solution: `text = "Katten jagade musen. Musen sprang, och katten somnade!"

orden = [ordet.strip(".,!").lower() for ordet in text.split()]

antal = {ordet: orden.count(ordet) for ordet in orden}

langsta = max(orden, key=len)


def vanligast(antal, n):
    par = sorted(antal.items(), key=lambda p: p[1], reverse=True)
    return [f"{ordet}: {st}" for ordet, st in par[:n]]
`,
        hints: [
          'langsta = max(orden, key=len)',
          'par = sorted(antal.items(), key=lambda p: p[1], reverse=True)',
          'Ta de n första med par[:n] i en list comprehension med en f-sträng.',
        ],
        tests: [
          {
            description: 'langsta är somnade',
            code: 'langsta',
            expected: 'somnade',
          },
          {
            description: 'De tre vanligaste',
            code: 'vanligast(antal, 3)',
            expected: ['katten: 2', 'musen: 2', 'jagade: 1'],
          },
          {
            description: 'n = 1 ger bara det vanligaste',
            code: 'vanligast({"a": 1, "b": 5}, 1)',
            expected: ['b: 5'],
          },
        ],
        sourceChecks: [
          { description: 'Använder lambda', pattern: /\blambda\b/ },
        ],
      },
    ],
  },
  {
    id: 'proj-saker-raknare',
    track: 'undantag',
    title: 'Säkra miniräknaren',
    reward: { emoji: '🧯', name: 'Brandsläckare' },
    summary: 'En miniräknare som läser "3 + 4" och aldrig kraschar.',
    steps: [
      {
        title: 'Räkna',
        xp: 20,
        why: 'Ett okänt tecken är inget Python själv märker – då skulle funktionen bara returnera None. raise gör det tydligt direkt vad som är fel.',
        description:
          'Miniräknaren byggs i tre delar: en som räknar, en som läser en rad och en som svarar.',
        task: 'Uppgift: Skapa `rakna(a, tecken, b)` som räknar ut svaret för `+`, `-`, `*` och `/`. Är tecknet något annat: `raise ValueError(f"Okänt tecken: {tecken}")`.',
        starterCode: '# Steg 1: räkna\n',
        solution: `def rakna(a, tecken, b):
    if tecken == "+":
        return a + b
    if tecken == "-":
        return a - b
    if tecken == "*":
        return a * b
    if tecken == "/":
        return a / b
    raise ValueError(f"Okänt tecken: {tecken}")
`,
        hints: [
          'En if per tecken, med return a + b och så vidare.',
          'Efter alla if: raise ValueError(f"Okänt tecken: {tecken}")',
          'Delat med / ger ett decimaltal, och det är rätt här.',
        ],
        tests: [
          {
            description: 'rakna(3, "+", 4) är 7',
            code: 'rakna(3, "+", 4)',
            expected: 7,
          },
          {
            description: 'rakna(6, "*", 7) är 42',
            code: 'rakna(6, "*", 7)',
            expected: 42,
          },
          {
            description: 'rakna(7, "/", 2) är 3.5',
            code: 'rakna(7, "/", 2)',
            expected: 3.5,
          },
          {
            description: 'rakna(1, "%", 2) säger Okänt tecken: %',
            code: '__message(rakna, 1, "%", 2)',
            expected: 'Okänt tecken: %',
          },
        ],
      },
      {
        title: 'Läs en rad',
        xp: 20,
        why: 'int() ger ett krångligt engelskt meddelande. Genom att fånga det och göra en ny raise byter du ut det mot ett som användaren förstår.',
        description:
          '`rad.split()` delar "3 + 4" i tre delar: talet, tecknet och talet.',
        task: 'Uppgift: Skapa `tolka(rad)`. Blir det inte tre delar: `raise ValueError("Skriv som 3 + 4")`. Går talen inte att göra om med int(): fånga ValueError och gör `raise ValueError("Talen måste vara heltal")`. Annars returneras svaret från rakna.',
        solution: `def rakna(a, tecken, b):
    if tecken == "+":
        return a + b
    if tecken == "-":
        return a - b
    if tecken == "*":
        return a * b
    if tecken == "/":
        return a / b
    raise ValueError(f"Okänt tecken: {tecken}")


def tolka(rad):
    delar = rad.split()
    if len(delar) != 3:
        raise ValueError("Skriv som 3 + 4")
    try:
        a = int(delar[0])
        b = int(delar[2])
    except ValueError:
        raise ValueError("Talen måste vara heltal")
    return rakna(a, delar[1], b)
`,
        hints: [
          'delar = rad.split() och kolla len(delar) != 3.',
          'try: a = int(delar[0]) och b = int(delar[2]), except ValueError: raise ett nytt ValueError.',
          'return rakna(a, delar[1], b)',
        ],
        tests: [
          {
            description: 'tolka("3 + 4") är 7',
            code: 'tolka("3 + 4")',
            expected: 7,
          },
          {
            description: 'tolka("10 / 4") är 2.5',
            code: 'tolka("10 / 4")',
            expected: 2.5,
          },
          {
            description: '"3+4" utan mellanslag säger Skriv som 3 + 4',
            code: '__message(tolka, "3+4")',
            expected: 'Skriv som 3 + 4',
          },
          {
            description: '"tre + 4" säger Talen måste vara heltal',
            code: '__message(tolka, "tre + 4")',
            expected: 'Talen måste vara heltal',
          },
          {
            description: '"3 ^ 4" säger Okänt tecken: ^',
            code: '__message(tolka, "3 ^ 4")',
            expected: 'Okänt tecken: ^',
          },
        ],
      },
      {
        title: 'Svara',
        xp: 25,
        why: 'rakna och tolka säger bara ifrån – det är svara som bestämmer vad användaren ska se. ZeroDivisionError kommer från Python själv och ValueError från dina egna raise, men båda fångas på samma ställe.',
        description:
          'Nu ska miniräknaren svara med text, vad användaren än skriver.',
        task: 'Uppgift: Skapa `svara(rad)` som returnerar `= 42` när det gick bra, `Kan inte dela med noll` vid ZeroDivisionError och `Fel: ` följt av meddelandet vid ValueError.',
        solution: `def rakna(a, tecken, b):
    if tecken == "+":
        return a + b
    if tecken == "-":
        return a - b
    if tecken == "*":
        return a * b
    if tecken == "/":
        return a / b
    raise ValueError(f"Okänt tecken: {tecken}")


def tolka(rad):
    delar = rad.split()
    if len(delar) != 3:
        raise ValueError("Skriv som 3 + 4")
    try:
        a = int(delar[0])
        b = int(delar[2])
    except ValueError:
        raise ValueError("Talen måste vara heltal")
    return rakna(a, delar[1], b)


def svara(rad):
    try:
        return f"= {tolka(rad)}"
    except ZeroDivisionError:
        return "Kan inte dela med noll"
    except ValueError as fel:
        return f"Fel: {fel}"
`,
        hints: [
          'try: return f"= {tolka(rad)}"',
          'except ZeroDivisionError: return "Kan inte dela med noll"',
          'except ValueError as fel: return f"Fel: {fel}"',
        ],
        tests: [
          {
            description: 'svara("6 * 7") är "= 42"',
            code: 'svara("6 * 7")',
            expected: '= 42',
          },
          {
            description: 'svara("1 / 0") är "Kan inte dela med noll"',
            code: 'svara("1 / 0")',
            expected: 'Kan inte dela med noll',
          },
          {
            description: 'svara("hej") är "Fel: Skriv som 3 + 4"',
            code: 'svara("hej")',
            expected: 'Fel: Skriv som 3 + 4',
          },
          {
            description: 'svara("2 x 2") är "Fel: Okänt tecken: x"',
            code: 'svara("2 x 2")',
            expected: 'Fel: Okänt tecken: x',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-anmalan',
    track: 'undantag',
    title: 'Anmälan till lägret',
    reward: { emoji: '📝', name: 'Anmälningsblankett' },
    summary:
      'Ett formulär som kollar namn och ålder och säger exakt vad som är fel.',
    steps: [
      {
        title: 'Namnet',
        xp: 20,
        why: 'strip tar bort mellanslagen först, så att "   " räknas som tomt. Funktionen returnerar det städade namnet, så att resten av programmet slipper städa igen.',
        description:
          'Varje fält i formuläret får en egen funktion som kollar det.',
        task: 'Uppgift: Skapa `kolla_namn(namn)` som tar bort mellanslag runt namnet. Är det tomt: `raise ValueError("Namnet saknas")`. Annars returneras namnet med stor första bokstav.',
        starterCode: '# Steg 1: namnet\n',
        solution: `def kolla_namn(namn):
    namn = namn.strip()
    if namn == "":
        raise ValueError("Namnet saknas")
    return namn.capitalize()
`,
        hints: [
          'namn = namn.strip()',
          'if namn == "": raise ValueError("Namnet saknas")',
          'return namn.capitalize()',
        ],
        tests: [
          {
            description: 'kolla_namn("  ada ") är "Ada"',
            code: 'kolla_namn("  ada ")',
            expected: 'Ada',
          },
          {
            description: 'Bara mellanslag säger Namnet saknas',
            code: '__message(kolla_namn, "   ")',
            expected: 'Namnet saknas',
          },
        ],
      },
      {
        title: 'Åldern',
        xp: 20,
        why: 'isdigit kollas före int(), så att du själv bestämmer meddelandet. Reglerna kollas i ordning, och varje regel har sitt eget meddelande.',
        description: 'Lägret är för barn mellan 7 och 15 år.',
        task: 'Uppgift: Skapa `kolla_alder(text)`. Är texten inte bara siffror: `raise ValueError("Åldern måste vara ett tal")`. Är åldern under 7 eller över 15: `raise ValueError("Lägret är för 7–15 år")`. Annars returneras åldern som tal.',
        solution: `def kolla_namn(namn):
    namn = namn.strip()
    if namn == "":
        raise ValueError("Namnet saknas")
    return namn.capitalize()


def kolla_alder(text):
    if not text.isdigit():
        raise ValueError("Åldern måste vara ett tal")
    alder = int(text)
    if alder < 7 or alder > 15:
        raise ValueError("Lägret är för 7–15 år")
    return alder
`,
        hints: [
          'if not text.isdigit(): raise …',
          'alder = int(text) och kolla alder < 7 or alder > 15.',
          'return alder',
        ],
        tests: [
          {
            description: 'kolla_alder("9") är 9',
            code: 'kolla_alder("9")',
            expected: 9,
          },
          {
            description: '"nio" säger Åldern måste vara ett tal',
            code: '__message(kolla_alder, "nio")',
            expected: 'Åldern måste vara ett tal',
          },
          {
            description: '"30" säger Lägret är för 7–15 år',
            code: '__message(kolla_alder, "30")',
            expected: 'Lägret är för 7–15 år',
          },
          {
            description: '"6" säger Lägret är för 7–15 år',
            code: '__message(kolla_alder, "6")',
            expected: 'Lägret är för 7–15 år',
          },
          {
            description: '"15" går bra',
            code: 'kolla_alder("15")',
            expected: 15,
          },
        ],
      },
      {
        title: 'Anmäl',
        xp: 25,
        why: 'Båda kollarna står i samma try. Den första som säger ifrån stoppar resten, och else körs bara när båda gick igenom.',
        description: 'Nu sätts formuläret ihop.',
        task: 'Uppgift: Skapa `anmal(namn, alder_text)` som kollar båda i ett try. Vid ValueError returneras `Ej anmäld: ` och meddelandet, annars (else) `Bo, 9 år, är anmäld!`.',
        solution: `def kolla_namn(namn):
    namn = namn.strip()
    if namn == "":
        raise ValueError("Namnet saknas")
    return namn.capitalize()


def kolla_alder(text):
    if not text.isdigit():
        raise ValueError("Åldern måste vara ett tal")
    alder = int(text)
    if alder < 7 or alder > 15:
        raise ValueError("Lägret är för 7–15 år")
    return alder


def anmal(namn, alder_text):
    try:
        namn = kolla_namn(namn)
        alder = kolla_alder(alder_text)
    except ValueError as fel:
        return f"Ej anmäld: {fel}"
    else:
        return f"{namn}, {alder} år, är anmäld!"
`,
        hints: [
          'try: namn = kolla_namn(namn) och alder = kolla_alder(alder_text)',
          'except ValueError as fel: return f"Ej anmäld: {fel}"',
          'else: return f"{namn}, {alder} år, är anmäld!"',
        ],
        tests: [
          {
            description: 'anmal("bo", "9") är anmäld',
            code: 'anmal("bo", "9")',
            expected: 'Bo, 9 år, är anmäld!',
          },
          {
            description: 'Tomt namn',
            code: 'anmal("", "9")',
            expected: 'Ej anmäld: Namnet saknas',
          },
          {
            description: 'Åldern nio',
            code: 'anmal("bo", "nio")',
            expected: 'Ej anmäld: Åldern måste vara ett tal',
          },
          {
            description: 'För gammal',
            code: 'anmal("bo", "30")',
            expected: 'Ej anmäld: Lägret är för 7–15 år',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-bio',
    track: 'undantag',
    title: 'Biobokningen',
    reward: { emoji: '💺', name: 'Biostol' },
    summary: 'Boka platser i en liten biosalong utan att någon får samma stol.',
    steps: [
      {
        title: 'Finns platsen?',
        xp: 20,
        why: 'len kollas först. Med or slutar Python så fort något är sant, så plats[0] körs aldrig på en tom text.',
        description:
          'Salongen har raderna A–C och stolarna 1–5, så B3 är rad B, stol 3. `x not in "ABC"` är True om x inte finns i texten.',
        task: 'Uppgift: Skapa `kolla_plats(plats)` som gör om platsen till stora bokstäver. Är den inte två tecken, raden A–C och stolen 1–5: `raise ValueError(f"{plats} finns inte")`. Annars returneras platsen.',
        starterCode: '# Steg 1: finns platsen?\n',
        solution: `def kolla_plats(plats):
    plats = plats.upper()
    if len(plats) != 2 or plats[0] not in "ABC" or plats[1] not in "12345":
        raise ValueError(f"{plats} finns inte")
    return plats
`,
        hints: [
          'plats = plats.upper()',
          'if len(plats) != 2 or plats[0] not in "ABC" or plats[1] not in "12345":',
          'raise ValueError(f"{plats} finns inte") och annars return plats.',
        ],
        tests: [
          {
            description: 'kolla_plats("b3") är "B3"',
            code: 'kolla_plats("b3")',
            expected: 'B3',
          },
          {
            description: '"d1" finns inte',
            code: '__message(kolla_plats, "d1")',
            expected: 'D1 finns inte',
          },
          {
            description: '"A10" finns inte',
            code: '__message(kolla_plats, "A10")',
            expected: 'A10 finns inte',
          },
          {
            description: 'Tom text finns inte',
            code: '__raises(kolla_plats, "")',
            expected: 'ValueError',
          },
        ],
      },
      {
        title: 'Boka',
        xp: 20,
        why: 'boka låter kolla_plats säga ifrån om platsen inte finns – felet går vidare upp till den som anropade boka. Själv kollar den bara det nya: om platsen är tagen.',
        description: '`bokade` är listan med platser som redan är bokade.',
        task: 'Uppgift: Skapa `boka(plats, bokade)` som kollar platsen med kolla_plats. Är den redan i bokade: `raise ValueError(f"{plats} är redan bokad")`. Annars läggs den till i bokade och returneras.',
        solution: `def kolla_plats(plats):
    plats = plats.upper()
    if len(plats) != 2 or plats[0] not in "ABC" or plats[1] not in "12345":
        raise ValueError(f"{plats} finns inte")
    return plats


def boka(plats, bokade):
    plats = kolla_plats(plats)
    if plats in bokade:
        raise ValueError(f"{plats} är redan bokad")
    bokade.append(plats)
    return plats
`,
        hints: [
          'plats = kolla_plats(plats) först.',
          'if plats in bokade: raise …',
          'bokade.append(plats) och return plats.',
        ],
        tests: [
          {
            description: 'Bokar A1 i en tom lista',
            code: '(b := [], boka("a1", b), b)[2]',
            expected: ['A1'],
          },
          {
            description: 'A1 är redan bokad',
            code: '__message(boka, "a1", ["A1"])',
            expected: 'A1 är redan bokad',
          },
          {
            description: 'Felaktig plats säger ifrån',
            code: '__message(boka, "x9", [])',
            expected: 'X9 finns inte',
          },
        ],
      },
      {
        title: 'Boka alla',
        xp: 25,
        why: 'try står inuti loopen, så ett fel stoppar bara den bokningen. Stod loopen inuti try skulle allt efter första felet hoppas över.',
        description: 'Nu kommer en hel lista med önskemål på en gång.',
        task: 'Uppgift: Skapa `boka_alla(onskningar)` som bokar platserna i ordning och returnerar en lista med svar: `A1: bokad` eller `Nej: ` följt av felmeddelandet.',
        solution: `def kolla_plats(plats):
    plats = plats.upper()
    if len(plats) != 2 or plats[0] not in "ABC" or plats[1] not in "12345":
        raise ValueError(f"{plats} finns inte")
    return plats


def boka(plats, bokade):
    plats = kolla_plats(plats)
    if plats in bokade:
        raise ValueError(f"{plats} är redan bokad")
    bokade.append(plats)
    return plats


def boka_alla(onskningar):
    bokade = []
    svar = []
    for plats in onskningar:
        try:
            svar.append(f"{boka(plats, bokade)}: bokad")
        except ValueError as fel:
            svar.append(f"Nej: {fel}")
    return svar
`,
        hints: [
          'bokade = [] och svar = [] före loopen.',
          'Inuti for-loopen: try: svar.append(f"{boka(plats, bokade)}: bokad")',
          'except ValueError as fel: svar.append(f"Nej: {fel}")',
        ],
        tests: [
          {
            description: 'Fyra önskemål',
            code: 'boka_alla(["a1", "b2", "A1", "z9"])',
            expected: [
              'A1: bokad',
              'B2: bokad',
              'Nej: A1 är redan bokad',
              'Nej: Z9 finns inte',
            ],
          },
          { description: 'Inga önskemål', code: 'boka_alla([])', expected: [] },
        ],
      },
    ],
  },
  {
    id: 'proj-tarningsspel',
    track: 'moduler',
    title: 'Tärningsspelet',
    reward: { emoji: '🎲', name: 'Tärning' },
    summary: 'Kasta fem tärningar, räkna poäng och se vem som vinner.',
    steps: [
      {
        title: 'Kasta',
        xp: 20,
        why: 'Spelet kastar många gånger. Med kasten i en egen funktion skriver du randint på ett enda ställe.',
        description:
          'Spelet byggs i tre delar: en som kastar, en som räknar poäng och en som utser vinnaren.',
        task: 'Uppgift: Hämta random och skapa `kasta(antal)` som returnerar en lista med `antal` slumpade tal från 1 till 6.',
        starterCode: '# Steg 1: kasta\n',
        solution: `import random


def kasta(antal):
    return [random.randint(1, 6) for _ in range(antal)]
`,
        hints: [
          'Börja med import random.',
          'En list comprehension med range(antal) ger rätt antal tal.',
          'return [random.randint(1, 6) for _ in range(antal)]',
        ],
        tests: [
          {
            description: 'kasta(5) ger fem tärningar',
            code: 'len(kasta(5))',
            expected: 5,
          },
          {
            description: 'Alla tärningar visar 1 till 6',
            code: 'all(1 <= tarning <= 6 for tarning in kasta(100))',
            expected: true,
          },
          {
            description: 'Alla sex sidor kommer upp på 100 kast',
            code: 'sorted(set(kasta(100)))',
            expected: [1, 2, 3, 4, 5, 6],
          },
        ],
      },
      {
        title: 'Poäng',
        xp: 20,
        why: 'Poängen räknas från en färdig lista, utan slump. Därför går poang att testa med exakt de tärningar du vill.',
        description:
          'Fem tärningar som alla visar samma är en Yatzy. Alla är lika när den minsta och den största är samma.',
        task: 'Uppgift: Skapa `poang(tarningar)` som returnerar summan av tärningarna. Visar alla fem samma ger det 50 poäng i stället.',
        solution: `import random


def kasta(antal):
    return [random.randint(1, 6) for _ in range(antal)]


def poang(tarningar):
    if min(tarningar) == max(tarningar):
        return 50
    return sum(tarningar)
`,
        hints: [
          'sum(tarningar) ger summan.',
          'Alla är lika om min(tarningar) == max(tarningar).',
          'Kolla det först och return 50, annars return sum(tarningar).',
        ],
        tests: [
          {
            description: 'poang([1, 2, 3, 4, 5]) är 15',
            code: 'poang([1, 2, 3, 4, 5])',
            expected: 15,
          },
          {
            description: 'poang([6, 6, 6, 6, 5]) är 29',
            code: 'poang([6, 6, 6, 6, 5])',
            expected: 29,
          },
          {
            description: 'poang([4, 4, 4, 4, 4]) är 50',
            code: 'poang([4, 4, 4, 4, 4])',
            expected: 50,
          },
        ],
      },
      {
        title: 'Vinnaren',
        xp: 20,
        why: 'max med key letar fram nyckeln med störst värde, precis som sorted med key sorterar efter värdet.',
        description:
          'Resultatet sparas i en dictionary med namnet som nyckel och poängen som värde.',
        task: 'Uppgift: Skapa `vinnare(resultat)` som returnerar namnet med flest poäng. Skapa sedan `resultat` där Ada och Bo får `poang(kasta(5))` var, och skriv ut vinnaren.',
        solution: `import random


def kasta(antal):
    return [random.randint(1, 6) for _ in range(antal)]


def poang(tarningar):
    if min(tarningar) == max(tarningar):
        return 50
    return sum(tarningar)


def vinnare(resultat):
    return max(resultat, key=lambda namn: resultat[namn])


resultat = {namn: poang(kasta(5)) for namn in ["Ada", "Bo"]}
print(resultat)
print(f"Vinnare: {vinnare(resultat)}")
`,
        hints: [
          'max(resultat, key=lambda namn: resultat[namn]) ger namnet med flest poäng.',
          'resultat = {namn: poang(kasta(5)) for namn in ["Ada", "Bo"]}',
          'print(f"Vinnare: {vinnare(resultat)}")',
        ],
        tests: [
          {
            description: 'vinnare({"Ada": 12, "Bo": 50}) är Bo',
            code: 'vinnare({"Ada": 12, "Bo": 50})',
            expected: 'Bo',
          },
          {
            description: 'vinnare({"Ada": 30, "Bo": 8, "Cy": 22}) är Ada',
            code: 'vinnare({"Ada": 30, "Bo": 8, "Cy": 22})',
            expected: 'Ada',
          },
          {
            description: 'resultat har Ada och Bo',
            code: 'sorted(resultat)',
            expected: ['Ada', 'Bo'],
          },
          {
            description: 'Poängen är från 5 till 50',
            code: 'all(5 <= varde <= 50 for varde in resultat.values())',
            expected: true,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-losenordsgenerator',
    track: 'moduler',
    title: 'Lösenordsgeneratorn',
    reward: { emoji: '🗝️', name: 'Gammal nyckel' },
    summary: 'Slumpa fram lösenord och betygsätt hur starka de är.',
    steps: [
      {
        title: 'Slumpa tecken',
        xp: 20,
        why: 'join sätter ihop en lista med tecken till en text. Det går mycket fortare än att lägga till ett tecken i taget med +.',
        description:
          'Ett lösenord är slumpade tecken i rad. Först en funktion som slumpar ett visst antal tecken ur en text.',
        task: 'Uppgift: Hämta random och skapa `slumpa(tecken, antal)` som returnerar en text med `antal` tecken, vart och ett valt med `random.choice(tecken)`.',
        starterCode: '# Steg 1: slumpa tecken\n',
        solution: `import random


def slumpa(tecken, antal):
    return "".join([random.choice(tecken) for _ in range(antal)])
`,
        hints: [
          'random.choice fungerar på en text också, och ger då ett tecken.',
          'Gör en lista med antal tecken med en list comprehension.',
          'return "".join([random.choice(tecken) for _ in range(antal)])',
        ],
        tests: [
          {
            description: 'slumpa("ab", 8) har 8 tecken',
            code: 'len(slumpa("ab", 8))',
            expected: 8,
          },
          {
            description: 'slumpa("x", 3) är xxx',
            code: 'slumpa("x", 3)',
            expected: 'xxx',
          },
          {
            description: 'Alla tre tecknen i abc kommer med',
            code: 'sorted(set(slumpa("abc", 60)))',
            expected: ['a', 'b', 'c'],
          },
        ],
      },
      {
        title: 'Minst en siffra',
        xp: 20,
        why: 'Ibland blir slumpen fel, t.ex. ett lösenord helt utan siffror. Då slumpar man om tills det blir rätt i stället för att försöka styra slumpen.',
        description:
          'Modulen string har färdiga texter: `string.ascii_letters` är alla bokstäver a–z och A–Z, `string.digits` är 0123456789.',
        task: 'Uppgift: Hämta string. Skapa `har(text, tecken)` som returnerar True om något tecken i text finns i tecken. Skapa sedan `losenord(langd)` som slumpar ur bokstäver och siffror tills lösenordet har minst en siffra, och returnerar det.',
        solution: `import random
import string


def slumpa(tecken, antal):
    return "".join([random.choice(tecken) for _ in range(antal)])


def har(text, tecken):
    for t in text:
        if t in tecken:
            return True
    return False


def losenord(langd):
    while True:
        forslag = slumpa(string.ascii_letters + string.digits, langd)
        if har(forslag, string.digits):
            return forslag
`,
        hints: [
          'har: loopa över text och return True så fort ett tecken finns i tecken. Efter loopen: return False.',
          'losenord: en while True som slumpar ett förslag ur string.ascii_letters + string.digits.',
          'if har(forslag, string.digits): return forslag',
        ],
        tests: [
          {
            description: 'har("abc1", "0123456789") är True',
            code: 'har("abc1", "0123456789")',
            expected: true,
          },
          {
            description: 'har("abc", "0123456789") är False',
            code: 'har("abc", "0123456789")',
            expected: false,
          },
          {
            description: 'losenord(12) har 12 tecken',
            code: 'len(losenord(12))',
            expected: 12,
          },
          {
            description: '50 lösenord har alla minst en siffra',
            code: 'all(har(losenord(4), "0123456789") for _ in range(50))',
            expected: true,
          },
          {
            description: 'Bara bokstäver och siffror',
            code: 'losenord(40).isalnum()',
            expected: true,
          },
        ],
      },
      {
        title: 'Hur starkt?',
        xp: 20,
        why: 'Varje regel ger ett poäng för sig, så det är lätt att lägga till en regel till senare utan att ändra de andra.',
        description:
          '`string.ascii_uppercase` är de stora bokstäverna och `string.punctuation` tecken som !?#%.',
        task: 'Uppgift: Skapa `styrka(losenord)`. Ett poäng var för: minst 12 tecken, en siffra, en stor bokstav och ett specialtecken. 0–1 poäng ger `svagt`, 2–3 `medel` och 4 `starkt`.',
        solution: `import random
import string


def slumpa(tecken, antal):
    return "".join([random.choice(tecken) for _ in range(antal)])


def har(text, tecken):
    for t in text:
        if t in tecken:
            return True
    return False


def losenord(langd):
    while True:
        forslag = slumpa(string.ascii_letters + string.digits, langd)
        if har(forslag, string.digits):
            return forslag


def styrka(losenord):
    poang = 0
    if len(losenord) >= 12:
        poang += 1
    if har(losenord, string.digits):
        poang += 1
    if har(losenord, string.ascii_uppercase):
        poang += 1
    if har(losenord, string.punctuation):
        poang += 1
    if poang <= 1:
        return "svagt"
    if poang <= 3:
        return "medel"
    return "starkt"
`,
        hints: [
          'Börja med poang = 0 och en if per regel som gör poang += 1.',
          'Använd har med string.digits, string.ascii_uppercase och string.punctuation.',
          'if poang <= 1: return "svagt", if poang <= 3: return "medel", annars "starkt".',
        ],
        tests: [
          {
            description: 'abc är svagt',
            code: 'styrka("abc")',
            expected: 'svagt',
          },
          {
            description: 'losenordlosenord är svagt',
            code: 'styrka("losenordlosenord")',
            expected: 'svagt',
          },
          {
            description: 'abc123ABC är medel',
            code: 'styrka("abc123ABC")',
            expected: 'medel',
          },
          {
            description: 'Hemligt123!xyz är starkt',
            code: 'styrka("Hemligt123!xyz")',
            expected: 'starkt',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-fodelsedagar',
    track: 'moduler',
    title: 'Födelsedagskalendern',
    reward: { emoji: '📅', name: 'Kalender' },
    summary: 'Håll koll på när kompisarna fyller år och hur länge det är kvar.',
    steps: [
      {
        title: 'Nästa födelsedag',
        xp: 20,
        why: 'idag skickas in i stället för att hämtas med date.today(). Då blir svaret samma varje gång, och funktionen går att testa.',
        description:
          'Den som är född 5 mars 2012 fyller år 5 mars varje år. Har dagen redan varit i år är nästa födelsedag nästa år.',
        task: 'Uppgift: Hämta date och skapa `nasta_fodelsedag(fodd, idag)` som returnerar datumet för nästa födelsedag. Är det idag gäller idag.',
        starterCode: '# Steg 1: nästa födelsedag\n',
        solution: `from datetime import date


def nasta_fodelsedag(fodd, idag):
    dag = date(idag.year, fodd.month, fodd.day)
    if dag < idag:
        dag = date(idag.year + 1, fodd.month, fodd.day)
    return dag
`,
        hints: [
          'date(idag.year, fodd.month, fodd.day) är födelsedagen i år.',
          'Datum kan jämföras med <. Ett tidigare datum är mindre.',
          'Har den varit: samma sak med idag.year + 1.',
        ],
        tests: [
          {
            description: 'Född 24 december: 2026-12-24',
            code: 'str(nasta_fodelsedag(date(2010, 12, 24), date(2026, 10, 31)))',
            expected: '2026-12-24',
          },
          {
            description: 'Född 5 mars: 2027-03-05',
            code: 'str(nasta_fodelsedag(date(2012, 3, 5), date(2026, 10, 31)))',
            expected: '2027-03-05',
          },
          {
            description: 'Född 31 oktober: idag',
            code: 'str(nasta_fodelsedag(date(2011, 10, 31), date(2026, 10, 31)))',
            expected: '2026-10-31',
          },
        ],
      },
      {
        title: 'Dagar kvar',
        xp: 20,
        why: 'dagar_kvar återanvänder nasta_fodelsedag. Små funktioner som bygger på varandra är lättare att få rätt än en stor.',
        description:
          'Två datum minus varandra ger en tidsrymd, och `.days` ger antalet dagar.',
        task: 'Uppgift: Skapa `dagar_kvar(fodd, idag)` som returnerar hur många dagar det är kvar till nästa födelsedag.',
        solution: `from datetime import date


def nasta_fodelsedag(fodd, idag):
    dag = date(idag.year, fodd.month, fodd.day)
    if dag < idag:
        dag = date(idag.year + 1, fodd.month, fodd.day)
    return dag


def dagar_kvar(fodd, idag):
    return (nasta_fodelsedag(fodd, idag) - idag).days
`,
        hints: [
          'Anropa nasta_fodelsedag(fodd, idag).',
          'Dra bort idag från den.',
          'return (nasta_fodelsedag(fodd, idag) - idag).days',
        ],
        tests: [
          {
            description: 'Född 24 december: 54 dagar kvar',
            code: 'dagar_kvar(date(2010, 12, 24), date(2026, 10, 31))',
            expected: 54,
          },
          {
            description: 'Född 5 mars: 125 dagar kvar',
            code: 'dagar_kvar(date(2012, 3, 5), date(2026, 10, 31))',
            expected: 125,
          },
          {
            description: 'Född 30 oktober: 364 dagar kvar',
            code: 'dagar_kvar(date(2011, 10, 30), date(2026, 10, 31))',
            expected: 364,
          },
        ],
      },
      {
        title: 'Kalendern',
        xp: 20,
        why: 'kalender returnerar raderna i stället för att skriva ut dem. Då kan samma rader visas på en skärm, skickas i ett mejl eller testas.',
        description:
          'Kompisarna ligger i en dictionary med namnet som nyckel och födelsedagen som värde.',
        task: `Uppgift: Skapa \`DAGAR\` med veckodagarna (måndag först) och \`kalender(personer, idag)\` som returnerar en lista med en rad per person, den som fyller först överst:
  – 0 dagar kvar: \`Cy fyller år idag!\`
  – 1 dag kvar: \`Cy fyller år imorgon!\`
  – annars: \`Bo: om 54 dagar, en torsdag\``,
        solution: `from datetime import date

DAGAR = ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag", "söndag"]


def nasta_fodelsedag(fodd, idag):
    dag = date(idag.year, fodd.month, fodd.day)
    if dag < idag:
        dag = date(idag.year + 1, fodd.month, fodd.day)
    return dag


def dagar_kvar(fodd, idag):
    return (nasta_fodelsedag(fodd, idag) - idag).days


def kalender(personer, idag):
    rader = []
    for namn in sorted(personer, key=lambda namn: dagar_kvar(personer[namn], idag)):
        dagar = dagar_kvar(personer[namn], idag)
        if dagar == 0:
            rader.append(f"{namn} fyller år idag!")
        elif dagar == 1:
            rader.append(f"{namn} fyller år imorgon!")
        else:
            dag = DAGAR[nasta_fodelsedag(personer[namn], idag).weekday()]
            rader.append(f"{namn}: om {dagar} dagar, en {dag}")
    return rader
`,
        hints: [
          'sorted(personer, key=lambda namn: dagar_kvar(personer[namn], idag)) ger namnen i rätt ordning.',
          'Veckodagen: DAGAR[nasta_fodelsedag(…).weekday()]',
          'Börja med rader = [] och append en rad per person, med if, elif och else.',
        ],
        tests: [
          {
            description: 'Tre kompisar i rätt ordning',
            code: 'kalender({"Ada": date(2012, 3, 5), "Bo": date(2010, 12, 24), "Cy": date(2011, 10, 31)}, date(2026, 10, 31))',
            expected: [
              'Cy fyller år idag!',
              'Bo: om 54 dagar, en torsdag',
              'Ada: om 125 dagar, en fredag',
            ],
          },
          {
            description: 'Imorgon',
            code: 'kalender({"Dani": date(2013, 11, 1)}, date(2026, 10, 31))',
            expected: ['Dani fyller år imorgon!'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-kortleken',
    track: 'klasser',
    title: 'Kortleken',
    reward: { emoji: '🃏', name: 'Spelkort' },
    summary: 'En kortlek med 52 kort som går att blanda och dra ur.',
    steps: [
      {
        title: 'Kortet',
        xp: 20,
        why: 'Ett kort är två värden som hör ihop: färg och valör. En klass håller ihop dem och vet själv hur kortet ska skrivas ut.',
        description:
          'Leken byggs i tre delar: ett kort, en lek med 52 kort och sedan blandning och dragning.',
        task: 'Uppgift: Skapa `Kort` med `__init__(self, farg, valor)`. `__str__` returnerar t.ex. `hjärter 7`, men valör 1 är `ess`, 11 `knekt`, 12 `dam` och 13 `kung`.',
        starterCode: '# Steg 1: kortet\n',
        solution: `NAMN = {1: "ess", 11: "knekt", 12: "dam", 13: "kung"}


class Kort:
    def __init__(self, farg, valor):
        self.farg = farg
        self.valor = valor

    def __str__(self):
        if self.valor in NAMN:
            return f"{self.farg} {NAMN[self.valor]}"
        return f"{self.farg} {self.valor}"
`,
        hints: [
          'En dictionary NAMN = {1: "ess", 11: "knekt", 12: "dam", 13: "kung"} gör __str__ kort.',
          'I __str__: if self.valor in NAMN: använd NAMN[self.valor].',
          'Annars: return f"{self.farg} {self.valor}"',
        ],
        tests: [
          {
            description: 'Kort("hjärter", 7) skrivs hjärter 7',
            code: 'str(Kort("hjärter", 7))',
            expected: 'hjärter 7',
          },
          {
            description: 'Kort("spader", 1) skrivs spader ess',
            code: 'str(Kort("spader", 1))',
            expected: 'spader ess',
          },
          {
            description: 'Kort("ruter", 12) skrivs ruter dam',
            code: 'str(Kort("ruter", 12))',
            expected: 'ruter dam',
          },
        ],
      },
      {
        title: 'Leken',
        xp: 20,
        why: 'Leken är ett objekt som innehåller andra objekt. Den som använder leken frågar bara leken, och behöver inte veta hur korten ligger.',
        description:
          'Två for-loopar i varandra ger alla kombinationer: varje färg med varje valör från 1 till 13.',
        task: 'Uppgift: Skapa `FARGER = ["hjärter", "ruter", "klöver", "spader"]` och klassen `Kortlek`. `__init__` skapar listan `self.kort` med alla 52 kort, färg för färg och valör för valör. `antal(self)` returnerar hur många kort som finns kvar.',
        solution: `NAMN = {1: "ess", 11: "knekt", 12: "dam", 13: "kung"}
FARGER = ["hjärter", "ruter", "klöver", "spader"]


class Kort:
    def __init__(self, farg, valor):
        self.farg = farg
        self.valor = valor

    def __str__(self):
        if self.valor in NAMN:
            return f"{self.farg} {NAMN[self.valor]}"
        return f"{self.farg} {self.valor}"


class Kortlek:
    def __init__(self):
        self.kort = []
        for farg in FARGER:
            for valor in range(1, 14):
                self.kort.append(Kort(farg, valor))

    def antal(self):
        return len(self.kort)
`,
        hints: [
          'Börja __init__ med self.kort = []',
          'for farg in FARGER: och inuti den for valor in range(1, 14):',
          'Innerst: self.kort.append(Kort(farg, valor))',
        ],
        tests: [
          {
            description: 'Kort("klöver", 13) skrivs klöver kung',
            code: 'str(Kort("klöver", 13))',
            expected: 'klöver kung',
          },
          {
            description: 'En ny lek har 52 kort',
            code: 'Kortlek().antal()',
            expected: 52,
          },
          {
            description: 'Första kortet är hjärter ess',
            code: 'str(Kortlek().kort[0])',
            expected: 'hjärter ess',
          },
          {
            description: 'Sista kortet är spader kung',
            code: 'str(Kortlek().kort[-1])',
            expected: 'spader kung',
          },
        ],
      },
      {
        title: 'Blanda och dra',
        xp: 20,
        why: 'dra gör raise när leken är slut. Annars skulle pop ge ett IndexError som inte säger något om kortlekar.',
        description:
          '`lista.pop()` tar bort det sista i listan och ger tillbaka det – som att ta översta kortet.',
        task: 'Uppgift: Hämta random. Ge `Kortlek` metoden `blanda(self)` som blandar korten, och `dra(self)` som tar bort och returnerar det sista kortet. Är leken tom: `raise ValueError("Leken är slut")`.',
        solution: `import random

NAMN = {1: "ess", 11: "knekt", 12: "dam", 13: "kung"}
FARGER = ["hjärter", "ruter", "klöver", "spader"]


class Kort:
    def __init__(self, farg, valor):
        self.farg = farg
        self.valor = valor

    def __str__(self):
        if self.valor in NAMN:
            return f"{self.farg} {NAMN[self.valor]}"
        return f"{self.farg} {self.valor}"


class Kortlek:
    def __init__(self):
        self.kort = []
        for farg in FARGER:
            for valor in range(1, 14):
                self.kort.append(Kort(farg, valor))

    def antal(self):
        return len(self.kort)

    def blanda(self):
        random.shuffle(self.kort)

    def dra(self):
        if self.antal() == 0:
            raise ValueError("Leken är slut")
        return self.kort.pop()
`,
        hints: [
          'blanda: random.shuffle(self.kort) – och glöm inte import random överst.',
          'dra: if self.antal() == 0: raise ValueError("Leken är slut")',
          'Sedan: return self.kort.pop()',
        ],
        tests: [
          {
            description: 'Kort("ruter", 11) skrivs ruter knekt',
            code: 'str(Kort("ruter", 11))',
            expected: 'ruter knekt',
          },
          {
            description: 'Översta kortet i en oblandad lek är spader kung',
            code: 'str(Kortlek().dra())',
            expected: 'spader kung',
          },
          {
            description: 'Efter ett drag finns 51 kort kvar',
            code: '(lek := Kortlek(), lek.dra(), lek.antal())[-1]',
            expected: 51,
          },
          {
            description: '52 drag ger 52 olika kort',
            code: '(lek := Kortlek(), len(set(str(lek.dra()) for _ in range(52))))[-1]',
            expected: 52,
          },
          {
            description: 'Ett drag ur en tom lek säger Leken är slut',
            code: '(lek := Kortlek(), [lek.dra() for _ in range(52)], __message(lek.dra))[-1]',
            expected: 'Leken är slut',
          },
          {
            description: 'Blandade lekar ligger i olika ordning',
            code: 'len(set(str((lek := Kortlek(), lek.blanda(), lek.dra())[-1]) for _ in range(20))) > 1',
            expected: true,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-biblioteket',
    track: 'klasser',
    title: 'Biblioteket',
    reward: { emoji: '🔖', name: 'Bokmärke' },
    summary:
      'Ett litet bibliotek som håller reda på vilka böcker som är utlånade.',
    steps: [
      {
        title: 'Boken',
        xp: 20,
        why: 'utlanad är ett attribut som ändras medan programmet kör. Boken vet själv om den är utlånad, och visar det i sin __str__.',
        description:
          'Biblioteket byggs i tre delar: en bok, ett bibliotek med böcker och sedan lån.',
        task: 'Uppgift: Skapa `Bok` med `__init__(self, titel, forfattare)` som också sätter `utlanad` till False. `__str__` returnerar t.ex. `Hobbiten av J.R.R. Tolkien`, med ` (utlånad)` sist om boken är utlånad.',
        starterCode: '# Steg 1: boken\n',
        solution: `class Bok:
    def __init__(self, titel, forfattare):
        self.titel = titel
        self.forfattare = forfattare
        self.utlanad = False

    def __str__(self):
        text = f"{self.titel} av {self.forfattare}"
        if self.utlanad:
            text += " (utlånad)"
        return text
`,
        hints: [
          'Tre rader i __init__, den sista är self.utlanad = False.',
          'I __str__: text = f"{self.titel} av {self.forfattare}"',
          'if self.utlanad: text += " (utlånad)" och sedan return text.',
        ],
        tests: [
          {
            description: 'En ny bok är inte utlånad',
            code: 'Bok("Hobbiten", "J.R.R. Tolkien").utlanad',
            expected: false,
          },
          {
            description: 'str ger Hobbiten av J.R.R. Tolkien',
            code: 'str(Bok("Hobbiten", "J.R.R. Tolkien"))',
            expected: 'Hobbiten av J.R.R. Tolkien',
          },
          {
            description: 'En utlånad bok säger det',
            code: '(bok := Bok("Mio min Mio", "Astrid Lindgren"), setattr(bok, "utlanad", True), str(bok))[-1]',
            expected: 'Mio min Mio av Astrid Lindgren (utlånad)',
          },
        ],
      },
      {
        title: 'Hyllan',
        xp: 20,
        why: 'hitta gör raise när boken saknas, i stället för att returnera None. Då märks ett felstavat namn direkt, och inte först när någon försöker använda boken.',
        description:
          'Biblioteket har en lista med böcker, precis som spellistan hade låtar.',
        task: `Uppgift: Skapa \`Bibliotek\` med en tom lista \`bocker\`, metoden \`lagg_till(self, bok)\` och \`hitta(self, titel)\` som returnerar boken med den titeln. Finns den inte: \`raise ValueError(f"{titel} finns inte")\`. Skapa sedan \`bibliotek\` och lägg till:
  – Mio min Mio av Astrid Lindgren
  – Pippi Långstrump av Astrid Lindgren
  – Hobbiten av J.R.R. Tolkien`,
        solution: `class Bok:
    def __init__(self, titel, forfattare):
        self.titel = titel
        self.forfattare = forfattare
        self.utlanad = False

    def __str__(self):
        text = f"{self.titel} av {self.forfattare}"
        if self.utlanad:
            text += " (utlånad)"
        return text


class Bibliotek:
    def __init__(self):
        self.bocker = []

    def lagg_till(self, bok):
        self.bocker.append(bok)

    def hitta(self, titel):
        for bok in self.bocker:
            if bok.titel == titel:
                return bok
        raise ValueError(f"{titel} finns inte")


bibliotek = Bibliotek()
bibliotek.lagg_till(Bok("Mio min Mio", "Astrid Lindgren"))
bibliotek.lagg_till(Bok("Pippi Långstrump", "Astrid Lindgren"))
bibliotek.lagg_till(Bok("Hobbiten", "J.R.R. Tolkien"))
`,
        hints: [
          'lagg_till: self.bocker.append(bok)',
          'hitta: loopa över self.bocker och return bok när bok.titel == titel.',
          'Efter loopen, när inget hittats: raise ValueError(f"{titel} finns inte")',
        ],
        tests: [
          {
            description: 'Biblioteket har tre böcker',
            code: 'len(bibliotek.bocker)',
            expected: 3,
          },
          {
            description: 'hitta("Hobbiten") ger boken av Tolkien',
            code: 'bibliotek.hitta("Hobbiten").forfattare',
            expected: 'J.R.R. Tolkien',
          },
          {
            description: 'hitta("Dune") säger Dune finns inte',
            code: '__message(bibliotek.hitta, "Dune")',
            expected: 'Dune finns inte',
          },
        ],
      },
      {
        title: 'Låna',
        xp: 20,
        why: 'lana använder hitta, så felet för en bok som inte finns kommer gratis. Varje metod gör en sak, och de bygger på varandra.',
        description:
          'Att låna en bok är att sätta `utlanad` till True – men bara om ingen annan redan lånat den.',
        task: 'Uppgift: Ge `Bibliotek` metoderna `lana(self, titel)` (gör `raise ValueError(f"{titel} är redan utlånad")` om den är utlånad), `lamna_tillbaka(self, titel)` och `lediga(self)` som returnerar en lista med titlarna som går att låna. Låna sedan Hobbiten längst ner i programmet.',
        solution: `class Bok:
    def __init__(self, titel, forfattare):
        self.titel = titel
        self.forfattare = forfattare
        self.utlanad = False

    def __str__(self):
        text = f"{self.titel} av {self.forfattare}"
        if self.utlanad:
            text += " (utlånad)"
        return text


class Bibliotek:
    def __init__(self):
        self.bocker = []

    def lagg_till(self, bok):
        self.bocker.append(bok)

    def hitta(self, titel):
        for bok in self.bocker:
            if bok.titel == titel:
                return bok
        raise ValueError(f"{titel} finns inte")

    def lana(self, titel):
        bok = self.hitta(titel)
        if bok.utlanad:
            raise ValueError(f"{titel} är redan utlånad")
        bok.utlanad = True

    def lamna_tillbaka(self, titel):
        self.hitta(titel).utlanad = False

    def lediga(self):
        return [bok.titel for bok in self.bocker if not bok.utlanad]


bibliotek = Bibliotek()
bibliotek.lagg_till(Bok("Mio min Mio", "Astrid Lindgren"))
bibliotek.lagg_till(Bok("Pippi Långstrump", "Astrid Lindgren"))
bibliotek.lagg_till(Bok("Hobbiten", "J.R.R. Tolkien"))
bibliotek.lana("Hobbiten")
`,
        hints: [
          'lana: bok = self.hitta(titel), sedan if bok.utlanad: raise …, annars bok.utlanad = True.',
          'lamna_tillbaka: self.hitta(titel).utlanad = False',
          'lediga: [bok.titel for bok in self.bocker if not bok.utlanad]',
        ],
        tests: [
          {
            description: 'Hobbiten är utlånad, de andra är lediga',
            code: 'bibliotek.lediga()',
            expected: ['Mio min Mio', 'Pippi Långstrump'],
          },
          {
            description: 'Hobbiten går inte att låna igen',
            code: '__message(bibliotek.lana, "Hobbiten")',
            expected: 'Hobbiten är redan utlånad',
          },
          {
            description: 'En bok som inte finns går inte att låna',
            code: '__message(bibliotek.lana, "Dune")',
            expected: 'Dune finns inte',
          },
          {
            description: 'Efter lamna_tillbaka är alla tre lediga',
            code: '(bibliotek.lamna_tillbaka("Hobbiten"), bibliotek.lediga())[-1]',
            expected: ['Mio min Mio', 'Pippi Långstrump', 'Hobbiten'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-fotbollsligan',
    track: 'klasser',
    title: 'Fotbollsligan',
    reward: { emoji: '🥅', name: 'Fotbollsmål' },
    summary:
      'Spela in matcherna och få fram en tabell med poäng och målskillnad.',
    steps: [
      {
        title: 'Laget',
        xp: 20,
        why: 'Laget räknar sina egna poäng. Då finns reglerna (3 för vinst, 1 för oavgjort) på ett enda ställe.',
        description:
          'Ligan byggs i tre delar: ett lag, en liga med lag och sedan tabellen.',
        task: 'Uppgift: Skapa `Lag` med `__init__(self, namn)` som sätter `poang`, `gjorda` och `inslappta` till 0. `match(self, gjorda, inslappta)` lägger till målen och ger 3 poäng för vinst och 1 för oavgjort. `malskillnad(self)` returnerar gjorda minus insläppta.',
        starterCode: '# Steg 1: laget\n',
        solution: `class Lag:
    def __init__(self, namn):
        self.namn = namn
        self.poang = 0
        self.gjorda = 0
        self.inslappta = 0

    def match(self, gjorda, inslappta):
        self.gjorda += gjorda
        self.inslappta += inslappta
        if gjorda > inslappta:
            self.poang += 3
        elif gjorda == inslappta:
            self.poang += 1

    def malskillnad(self):
        return self.gjorda - self.inslappta
`,
        hints: [
          'Fyra rader i __init__: namn och tre attribut som börjar på 0.',
          'I match: lägg till målen med +=, sedan if för vinst och elif för oavgjort.',
          'malskillnad: return self.gjorda - self.inslappta',
        ],
        tests: [
          {
            description: 'Ett nytt lag har 0 poäng',
            code: 'Lag("AIK").poang',
            expected: 0,
          },
          {
            description: 'Vinst 2–1 ger 3 poäng',
            code: '(lag := Lag("AIK"), lag.match(2, 1), lag.poang)[-1]',
            expected: 3,
          },
          {
            description: 'Vinst och oavgjort ger 4 poäng och målskillnad 1',
            code: '(lag := Lag("AIK"), lag.match(2, 1), lag.match(3, 3), [lag.poang, lag.malskillnad()])[-1]',
            expected: [4, 1],
          },
          {
            description: 'Förlust ger 0 poäng',
            code: '(lag := Lag("AIK"), lag.match(0, 2), lag.poang)[-1]',
            expected: 0,
          },
        ],
      },
      {
        title: 'Ligan',
        xp: 20,
        why: 'En match påverkar två lag. Ligan ser till att båda får resultatet, med målen åt rätt håll för var och en.',
        description:
          'Ligan har en dictionary med lagets namn som nyckel och Lag-objektet som värde.',
        task: 'Uppgift: Skapa `Liga` med en tom dictionary `lag`, `lagg_till(self, namn)` som skapar ett Lag, och `match(self, hemma, borta, hemmamal, bortamal)` som ger resultatet till båda lagen. Skapa sedan `liga` med AIK, Hammarby och Malmö, och spela AIK–Hammarby 2–1, Hammarby–Malmö 3–3 och Malmö–AIK 2–0.',
        solution: `class Lag:
    def __init__(self, namn):
        self.namn = namn
        self.poang = 0
        self.gjorda = 0
        self.inslappta = 0

    def match(self, gjorda, inslappta):
        self.gjorda += gjorda
        self.inslappta += inslappta
        if gjorda > inslappta:
            self.poang += 3
        elif gjorda == inslappta:
            self.poang += 1

    def malskillnad(self):
        return self.gjorda - self.inslappta


class Liga:
    def __init__(self):
        self.lag = {}

    def lagg_till(self, namn):
        self.lag[namn] = Lag(namn)

    def match(self, hemma, borta, hemmamal, bortamal):
        self.lag[hemma].match(hemmamal, bortamal)
        self.lag[borta].match(bortamal, hemmamal)


liga = Liga()
for namn in ["AIK", "Hammarby", "Malmö"]:
    liga.lagg_till(namn)
liga.match("AIK", "Hammarby", 2, 1)
liga.match("Hammarby", "Malmö", 3, 3)
liga.match("Malmö", "AIK", 2, 0)
`,
        hints: [
          'lagg_till: self.lag[namn] = Lag(namn)',
          'match: self.lag[hemma].match(hemmamal, bortamal) – och tvärtom för borta.',
          'Skapa liga = Liga(), lägg till lagen och spela de tre matcherna.',
        ],
        tests: [
          {
            description: 'Malmö har 4 poäng',
            code: 'liga.lag["Malmö"].poang',
            expected: 4,
          },
          {
            description: 'AIK har 3 poäng och målskillnad -1',
            code: '[liga.lag["AIK"].poang, liga.lag["AIK"].malskillnad()]',
            expected: [3, -1],
          },
          {
            description: 'Hammarby har gjort 4 mål',
            code: 'liga.lag["Hammarby"].gjorda',
            expected: 4,
          },
        ],
      },
      {
        title: 'Tabellen',
        xp: 20,
        why: 'En tuple som key sorterar på poängen först, och på målskillnaden bara när poängen är lika – precis som en riktig tabell.',
        description:
          '`key=lambda lag: (lag.poang, lag.malskillnad())` sorterar på poängen först och målskillnaden sedan.',
        task: 'Uppgift: Ge `Liga` metoden `tabell(self)` som returnerar en lista med en rad per lag, t.ex. `Malmö: 4 p, målskillnad 2`. Flest poäng överst, och vid lika poäng störst målskillnad.',
        solution: `class Lag:
    def __init__(self, namn):
        self.namn = namn
        self.poang = 0
        self.gjorda = 0
        self.inslappta = 0

    def match(self, gjorda, inslappta):
        self.gjorda += gjorda
        self.inslappta += inslappta
        if gjorda > inslappta:
            self.poang += 3
        elif gjorda == inslappta:
            self.poang += 1

    def malskillnad(self):
        return self.gjorda - self.inslappta


class Liga:
    def __init__(self):
        self.lag = {}

    def lagg_till(self, namn):
        self.lag[namn] = Lag(namn)

    def match(self, hemma, borta, hemmamal, bortamal):
        self.lag[hemma].match(hemmamal, bortamal)
        self.lag[borta].match(bortamal, hemmamal)

    def tabell(self):
        ordning = sorted(
            self.lag.values(),
            key=lambda lag: (lag.poang, lag.malskillnad()),
            reverse=True,
        )
        return [
            f"{lag.namn}: {lag.poang} p, målskillnad {lag.malskillnad()}"
            for lag in ordning
        ]


liga = Liga()
for namn in ["AIK", "Hammarby", "Malmö"]:
    liga.lagg_till(namn)
liga.match("AIK", "Hammarby", 2, 1)
liga.match("Hammarby", "Malmö", 3, 3)
liga.match("Malmö", "AIK", 2, 0)
for rad in liga.tabell():
    print(rad)
`,
        hints: [
          'sorted(self.lag.values(), key=…, reverse=True) ger lagen med flest poäng först.',
          'key=lambda lag: (lag.poang, lag.malskillnad())',
          'Gör om varje lag till en rad med en list comprehension och en f-sträng.',
        ],
        tests: [
          {
            description: 'Tabellen efter tre matcher',
            code: 'liga.tabell()',
            expected: [
              'Malmö: 4 p, målskillnad 2',
              'AIK: 3 p, målskillnad -1',
              'Hammarby: 1 p, målskillnad -1',
            ],
          },
          {
            description: 'Lika poäng: störst målskillnad först',
            code: '(l := Liga(), l.lagg_till("A"), l.lagg_till("B"), l.lagg_till("C"), l.match("A", "C", 1, 0), l.match("B", "C", 3, 0), l.tabell()[0])[-1]',
            expected: 'B: 3 p, målskillnad 3',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-betygsrapport',
    track: 'felsokning',
    title: 'Betygsrapporten',
    reward: {
      emoji: '🖍️',
      name: 'Krita',
    },
    summary:
      'Laga lärarens program som räknar ut snitt och betyg – en bugg i taget.',
    steps: [
      {
        title: 'Snittet kraschar',
        xp: 20,
        why: 'Tomma listor är ett av de vanligaste fallen som ingen tänkt på. Testa alltid med en tom lista när en funktion delar med len.',
        description:
          'Läraren har skrivit ett program med tre buggar. Du lagar dem en i taget, och varje steg lägger till lite mer av programmet.',
        task: 'Uppgift: `snitt(poang)` kraschar för en elev som inte gjort några prov. Laga den så att `snitt([])` ger 0.',
        starterCode: `# Steg 1: snittet kraschar
def snitt(poang):
    return round(sum(poang) / len(poang), 1)
`,
        solution: `def snitt(poang):
    if len(poang) == 0:
        return 0
    return round(sum(poang) / len(poang), 1)
`,
        hints: [
          'Prova snitt([]) och läs felmeddelandet.',
          'len([]) är 0, och det går inte att dela med 0.',
          'if len(poang) == 0: return 0 först i funktionen.',
        ],
        tests: [
          {
            description: 'snitt([80, 90]) är 85.0',
            code: 'snitt([80, 90])',
            expected: 85.0,
          },
          {
            description: 'snitt([]) är 0',
            code: 'snitt([])',
            expected: 0,
          },
        ],
      },
      {
        title: 'Alla får E',
        xp: 20,
        why: 'Python provar villkoren uppifrån och tar det första som stämmer. Det strängaste villkoret måste därför komma först.',
        description:
          'Nu finns betyg också. Inget felmeddelande – men alla med minst 50 får E.',
        task: 'Uppgift: `betyg(snittet)` ska ge A från 90, C från 70, E från 50 och annars F. Laga den.',
        starterCode: `def snitt(poang):
    if len(poang) == 0:
        return 0
    return round(sum(poang) / len(poang), 1)


# Steg 2: alla får E
def betyg(snittet):
    if snittet >= 50:
        return "E"
    elif snittet >= 70:
        return "C"
    elif snittet >= 90:
        return "A"
    return "F"
`,
        solution: `def snitt(poang):
    if len(poang) == 0:
        return 0
    return round(sum(poang) / len(poang), 1)


def betyg(snittet):
    if snittet >= 90:
        return "A"
    elif snittet >= 70:
        return "C"
    elif snittet >= 50:
        return "E"
    return "F"
`,
        hints: [
          'Prova betyg(95). Vilken rad tar Python?',
          '95 >= 50 är sant, så de andra provas aldrig.',
          'Vänd på ordningen: kolla 90 först och 50 sist.',
        ],
        tests: [
          {
            description: 'betyg(95) är A',
            code: 'betyg(95)',
            expected: 'A',
          },
          {
            description: 'betyg(75) är C',
            code: 'betyg(75)',
            expected: 'C',
          },
          {
            description: 'betyg(55) är E',
            code: 'betyg(55)',
            expected: 'E',
          },
          {
            description: 'betyg(10) är F',
            code: 'betyg(10)',
            expected: 'F',
          },
        ],
      },
      {
        title: 'Rapporten',
        xp: 20,
        why: 'sort() ändrar listan och returnerar None, medan sorted() returnerar en ny sorterad lista. Det är lätt att blanda ihop.',
        description:
          'Sista delen gör en rad per elev, sorterade efter namn. Den har två buggar.',
        task: 'Uppgift: `rapport(elever)` ska returnera t.ex. `["Ada: 50.0 E", "Bo: 90.0 A"]`, sorterade efter namn. Laga den.',
        starterCode: `def snitt(poang):
    if len(poang) == 0:
        return 0
    return round(sum(poang) / len(poang), 1)


def betyg(snittet):
    if snittet >= 90:
        return "A"
    elif snittet >= 70:
        return "C"
    elif snittet >= 50:
        return "E"
    return "F"


# Steg 3: rapporten
def rapport(elever):
    rader = []
    for namn, poang in elever.items():
        rader.append(namn + ": " + snitt(poang) + " " + betyg(snitt(poang)))
    return rader.sort()
`,
        solution: `def snitt(poang):
    if len(poang) == 0:
        return 0
    return round(sum(poang) / len(poang), 1)


def betyg(snittet):
    if snittet >= 90:
        return "A"
    elif snittet >= 70:
        return "C"
    elif snittet >= 50:
        return "E"
    return "F"


def rapport(elever):
    rader = []
    for namn, poang in elever.items():
        rader.append(namn + ": " + str(snitt(poang)) + " " + betyg(snitt(poang)))
    return sorted(rader)
`,
        hints: [
          'Först kraschar den: snitt ger ett tal som sätts ihop med text.',
          'str(snitt(poang)) löser den första buggen.',
          'rader.sort() ger None. Returnera sorted(rader) i stället.',
        ],
        tests: [
          {
            description: 'Tre elever, sorterade efter namn',
            code: 'rapport({"Bo": [80, 100], "Ada": [40, 60], "Cy": []})',
            expected: ['Ada: 50.0 E', 'Bo: 90.0 A', 'Cy: 0 F'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-vackarklockan',
    track: 'felsokning',
    title: 'Väckarklockan',
    reward: {
      emoji: '⏰',
      name: 'Väckarklocka',
    },
    summary:
      'Laga väckarklockan som räknar ut hur länge det är kvar tills den ringer.',
    steps: [
      {
        title: 'Klockslag till minuter',
        xp: 20,
        why: 'Med allt i minuter blir det lätt att räkna. Det är vanligt att göra om till en enda enhet, räkna, och göra om tillbaka på slutet.',
        description:
          'Klockan räknar med minuter sedan midnatt: 07:30 är 450 minuter. Den första funktionen har två buggar.',
        task: 'Uppgift: `till_minuter(klockslag)` ska ge t.ex. 450 för `"07:30"`. Laga den.',
        starterCode: `# Steg 1: klockslag till minuter
def till_minuter(klockslag):
    timmar, minuter = klockslag.split(":")
    return timmar * 100 + minuter
`,
        solution: `def till_minuter(klockslag):
    timmar, minuter = klockslag.split(":")
    return int(timmar) * 60 + int(minuter)
`,
        hints: [
          'Vad är timmar och minuter för sort efter split?',
          'int() gör om dem till tal.',
          'En timme är 60 minuter, inte 100.',
        ],
        tests: [
          {
            description: 'till_minuter("07:30") är 450',
            code: 'till_minuter("07:30")',
            expected: 450,
          },
          {
            description: 'till_minuter("00:05") är 5',
            code: 'till_minuter("00:05")',
            expected: 5,
          },
          {
            description: 'till_minuter("23:59") är 1439',
            code: 'till_minuter("23:59")',
            expected: 1439,
          },
        ],
      },
      {
        title: 'Minuter till klockslag',
        xp: 20,
        why: 'zfill fyller på med nollor framifrån tills texten är så lång som du säger. Bra för klockslag, datum och kvittonummer.',
        description:
          '`str(5).zfill(2)` ger `05`. Den andra funktionen gör tvärtom mot den första, men ger svar som `7.5:30`.',
        task: 'Uppgift: `till_klockslag(minuter)` ska ge t.ex. `"07:30"` för 450, med två siffror för både timmar och minuter. Laga den.',
        starterCode: `def till_minuter(klockslag):
    timmar, minuter = klockslag.split(":")
    return int(timmar) * 60 + int(minuter)


# Steg 2: minuter till klockslag
def till_klockslag(minuter):
    timmar = minuter / 60
    rest = minuter % 60
    return str(timmar) + ":" + str(rest)
`,
        solution: `def till_minuter(klockslag):
    timmar, minuter = klockslag.split(":")
    return int(timmar) * 60 + int(minuter)


def till_klockslag(minuter):
    timmar = minuter // 60
    rest = minuter % 60
    return str(timmar).zfill(2) + ":" + str(rest).zfill(2)
`,
        hints: [
          'Prova till_klockslag(450). Varför blir timmarna 7.5?',
          '// ger hela timmar, utan decimaler.',
          'Lägg till .zfill(2) efter båda str().',
        ],
        tests: [
          {
            description: 'till_klockslag(450) är 07:30',
            code: 'till_klockslag(450)',
            expected: '07:30',
          },
          {
            description: 'till_klockslag(5) är 00:05',
            code: 'till_klockslag(5)',
            expected: '00:05',
          },
          {
            description: 'till_klockslag(1439) är 23:59',
            code: 'till_klockslag(1439)',
            expected: '23:59',
          },
        ],
      },
      {
        title: 'Över midnatt',
        xp: 20,
        why: '% (resten vid division) får tal att börja om, som en klocka. -90 % 1440 blir 1350 – alltså 22:30.',
        description:
          'Sista funktionen fungerar på dagen, men inte när man ställer klockan på kvällen.',
        task: 'Uppgift: `ringer_om(nu, larm)` ger konstiga svar när larmet är efter midnatt. Laga den så att `ringer_om("22:00", "06:30")` ger `Larmet ringer om 08:30`.',
        starterCode: `def till_minuter(klockslag):
    timmar, minuter = klockslag.split(":")
    return int(timmar) * 60 + int(minuter)


def till_klockslag(minuter):
    timmar = minuter // 60
    rest = minuter % 60
    return str(timmar).zfill(2) + ":" + str(rest).zfill(2)


# Steg 3: över midnatt
def ringer_om(nu, larm):
    kvar = till_minuter(larm) - till_minuter(nu)
    return "Larmet ringer om " + till_klockslag(kvar)
`,
        solution: `def till_minuter(klockslag):
    timmar, minuter = klockslag.split(":")
    return int(timmar) * 60 + int(minuter)


def till_klockslag(minuter):
    timmar = minuter // 60
    rest = minuter % 60
    return str(timmar).zfill(2) + ":" + str(rest).zfill(2)


def ringer_om(nu, larm):
    kvar = (till_minuter(larm) - till_minuter(nu)) % (24 * 60)
    return "Larmet ringer om " + till_klockslag(kvar)
`,
        hints: [
          'Räkna ut kvar för 22:00 och 06:30. Det blir negativt.',
          'Ett dygn är 24 * 60 minuter.',
          'kvar = (till_minuter(larm) - till_minuter(nu)) % (24 * 60)',
        ],
        tests: [
          {
            description: '22:00 till 06:30 är 08:30',
            code: 'ringer_om("22:00", "06:30")',
            expected: 'Larmet ringer om 08:30',
          },
          {
            description: '06:00 till 06:45 är 00:45',
            code: 'ringer_om("06:00", "06:45")',
            expected: 'Larmet ringer om 00:45',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-lagerhyllan',
    track: 'felsokning',
    title: 'Lagerhyllan',
    reward: {
      emoji: '🗃️',
      name: 'Kartotek',
    },
    summary:
      'Laga en klass för hyllor i ett lager, där alla hyllor av någon anledning har samma saker.',
    steps: [
      {
        title: 'Alla hyllor är samma',
        xp: 20,
        why: 'En lista som skapas direkt i klassen delas av alla objekt. En lista som skapas i __init__ med self blir en egen för varje objekt.',
        description:
          'Lagret har många hyllor. Men lägger man en skruv på en hylla dyker den upp på alla.',
        task: 'Uppgift: Laga `Hylla` så att varje hylla har sin egen lista med varor.',
        starterCode: `# Steg 1: alla hyllor är samma
class Hylla:
    varor = []

    def __init__(self, namn):
        self.namn = namn

    def lagg_till(self, vara):
        self.varor.append(vara)
`,
        solution: `class Hylla:
    def __init__(self, namn):
        self.namn = namn
        self.varor = []

    def lagg_till(self, vara):
        self.varor.append(vara)
`,
        hints: [
          'Skapa två hyllor, lägg något på den ena och skriv ut den andras varor.',
          'varor = [] står i klassen, inte i __init__.',
          'Flytta den till __init__ som self.varor = []',
        ],
        tests: [
          {
            description: 'En hylla får det som läggs dit',
            code: '(a := Hylla("A"), a.lagg_till("skruv"), a.varor)[-1]',
            expected: ['skruv'],
          },
          {
            description: 'En annan hylla förblir tom',
            code: '(a := Hylla("A"), b := Hylla("B"), a.lagg_till("skruv"), b.varor)[-1]',
            expected: [],
          },
        ],
      },
      {
        title: 'Ta bort',
        xp: 20,
        why: 'Ett villkor som är precis tvärtom är en klassisk bugg. Testa båda vägarna: när det ska gå och när det inte ska gå.',
        description: 'Nu går det att ta bort varor – eller inte.',
        task: 'Uppgift: `ta_bort(vara)` säger att varan inte finns fast den gör det. Laga den.',
        starterCode: `class Hylla:
    def __init__(self, namn):
        self.namn = namn
        self.varor = []

    def lagg_till(self, vara):
        self.varor.append(vara)

    # Steg 2: ta bort
    def ta_bort(self, vara):
        if vara in self.varor:
            raise ValueError(vara + " finns inte på hyllan")
        self.varor.remove(vara)
`,
        solution: `class Hylla:
    def __init__(self, namn):
        self.namn = namn
        self.varor = []

    def lagg_till(self, vara):
        self.varor.append(vara)

    def ta_bort(self, vara):
        if vara not in self.varor:
            raise ValueError(vara + " finns inte på hyllan")
        self.varor.remove(vara)
`,
        hints: [
          'Läs if-raden högt: "om varan finns på hyllan …"',
          'Felet ska bara göras när varan inte finns.',
          'if vara not in self.varor:',
        ],
        tests: [
          {
            description: 'En vara som finns tas bort',
            code: '(a := Hylla("A"), a.lagg_till("skruv"), a.lagg_till("mutter"), a.ta_bort("skruv"), a.varor)[-1]',
            expected: ['mutter'],
          },
          {
            description: 'En vara som saknas ger ett fel',
            code: '__message(Hylla("A").ta_bort, "spik")',
            expected: 'spik finns inte på hyllan',
          },
        ],
      },
      {
        title: 'Utskriften',
        xp: 20,
        why: '__str__ används av print, str() och f-strängar. Den ska bara ge texten – vad som görs med den bestämmer koden som anropar.',
        description: 'Till sist ska en hylla gå att skriva ut snyggt.',
        task: 'Uppgift: `str(hylla)` kraschar. Laga `__str__` så att den ger t.ex. `A: skruv, mutter`, eller `B: tom` för en tom hylla.',
        starterCode: `class Hylla:
    def __init__(self, namn):
        self.namn = namn
        self.varor = []

    def lagg_till(self, vara):
        self.varor.append(vara)

    def ta_bort(self, vara):
        if vara not in self.varor:
            raise ValueError(vara + " finns inte på hyllan")
        self.varor.remove(vara)

    # Steg 3: utskriften
    def __str__(self):
        print(self.namn + ": " + ", ".join(self.varor))
`,
        solution: `class Hylla:
    def __init__(self, namn):
        self.namn = namn
        self.varor = []

    def lagg_till(self, vara):
        self.varor.append(vara)

    def ta_bort(self, vara):
        if vara not in self.varor:
            raise ValueError(vara + " finns inte på hyllan")
        self.varor.remove(vara)

    def __str__(self):
        if len(self.varor) == 0:
            return self.namn + ": tom"
        return self.namn + ": " + ", ".join(self.varor)
`,
        hints: [
          'Läs felmeddelandet: vad returnerar __str__?',
          'Byt print mot return.',
          'Lägg till if len(self.varor) == 0: return self.namn + ": tom" först.',
        ],
        tests: [
          {
            description: 'En hylla med två varor',
            code: '(a := Hylla("A"), a.lagg_till("skruv"), a.lagg_till("mutter"), str(a))[-1]',
            expected: 'A: skruv, mutter',
          },
          {
            description: 'En tom hylla',
            code: 'str(Hylla("B"))',
            expected: 'B: tom',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-vaderstationen',
    track: 'pandas',
    title: 'Väderstationen',
    reward: { emoji: '🌈', name: 'Regnbåge' },
    summary:
      'Tre dagars väder i tre städer – vilken är varmast och var regnar det mest?',
    files: {
      'vader.csv': `datum,stad,temp,regn
2026-10-01,Malmö,12,0
2026-10-01,Kiruna,2,4
2026-10-01,Göteborg,10,8
2026-10-02,Malmö,11,3
2026-10-02,Kiruna,-1,0
2026-10-02,Göteborg,9,12
2026-10-03,Malmö,13,0
2026-10-03,Kiruna,0,2
2026-10-03,Göteborg,11,5
`,
    },
    steps: [
      {
        title: 'Varmast',
        xp: 20,
        why: 'Medelvärdet säger mer än en enda dag. En kall dag i Malmö gör inte Malmö kallare än Kiruna.',
        description:
          '`vader.csv` har temperatur (grader) och regn (mm) per stad och dag. Rapporten byggs i tre steg.',
        task: 'Uppgift: Läs in `vader.csv` till `df`. Spara medeltemperaturen per stad i `medeltemp`, avrundad till en decimal, och den varmaste staden i `varmast`.',
        starterCode: 'import pandas as pd\n\n# Steg 1: varmast\n',
        solution: `import pandas as pd

df = pd.read_csv("vader.csv")
medeltemp = df.groupby("stad")["temp"].mean().round(1)
varmast = medeltemp.idxmax()
print(medeltemp)
`,
        hints: [
          'df = pd.read_csv("vader.csv")',
          'medeltemp = df.groupby("stad")["temp"].mean().round(1)',
          'varmast = medeltemp.idxmax()',
        ],
        tests: [
          {
            description: 'Medeltemperaturen i varje stad',
            code: 'medeltemp.to_dict()',
            expected: { Göteborg: 10.0, Kiruna: 0.3, Malmö: 12.0 },
          },
          {
            description: 'varmast är Malmö',
            code: 'varmast',
            expected: 'Malmö',
          },
        ],
      },
      {
        title: 'Regnet',
        xp: 20,
        why: 'Samma data kan svara på många frågor. Det är bara att gruppera eller filtrera på ett nytt sätt.',
        description:
          'Nu regnet: hur mycket föll i varje stad, och hur många dagar regnade det?',
        task: 'Uppgift: Spara regnet per stad i `regn`, staden med mest regn i `blotast` och antalet rader med regn (mer än 0 mm) i `regniga_dagar`.',
        solution: `import pandas as pd

df = pd.read_csv("vader.csv")
medeltemp = df.groupby("stad")["temp"].mean().round(1)
varmast = medeltemp.idxmax()

regn = df.groupby("stad")["regn"].sum()
blotast = regn.idxmax()
regniga_dagar = len(df[df["regn"] > 0])
print(regn)
`,
        hints: [
          'regn = df.groupby("stad")["regn"].sum()',
          'blotast = regn.idxmax()',
          'Filtrera på df["regn"] > 0 och ta len av svaret.',
        ],
        tests: [
          {
            description: 'Regnet per stad',
            code: 'regn.to_dict()',
            expected: { Göteborg: 25, Kiruna: 6, Malmö: 3 },
          },
          {
            description: 'blotast är Göteborg',
            code: 'blotast',
            expected: 'Göteborg',
          },
          {
            description: 'regniga_dagar är 6',
            code: 'regniga_dagar',
            expected: 6,
          },
        ],
      },
      {
        title: 'Rapporten',
        xp: 20,
        why: 'En funktion som tar tabellen som parameter fungerar på vilken del av datan som helst – en dag, en vecka eller ett helt år.',
        description:
          'En Series kan loopas över med `.items()`, precis som en dictionary.',
        task: 'Uppgift: Skapa `rapport(df)` som returnerar en rad per stad, varmast först, t.ex. `Malmö: 12.0 grader, 3 mm regn`.',
        solution: `import pandas as pd

df = pd.read_csv("vader.csv")
medeltemp = df.groupby("stad")["temp"].mean().round(1)
varmast = medeltemp.idxmax()

regn = df.groupby("stad")["regn"].sum()
blotast = regn.idxmax()
regniga_dagar = len(df[df["regn"] > 0])


def rapport(df):
    medel = df.groupby("stad")["temp"].mean().round(1).sort_values(ascending=False)
    mm = df.groupby("stad")["regn"].sum()
    return [f"{stad}: {temp} grader, {mm[stad]} mm regn" for stad, temp in medel.items()]


for rad in rapport(df):
    print(rad)
`,
        hints: [
          'Räkna ut medeltemperaturen och regnet inuti funktionen, från parametern df.',
          'Sortera medeltemperaturen med sort_values(ascending=False).',
          'En list comprehension över medel.items(), med mm[stad] för regnet.',
        ],
        tests: [
          {
            description: 'Rapporten för alla tre dagarna',
            code: 'rapport(df)',
            expected: [
              'Malmö: 12.0 grader, 3 mm regn',
              'Göteborg: 10.0 grader, 25 mm regn',
              'Kiruna: 0.3 grader, 6 mm regn',
            ],
          },
          {
            description: 'Rapporten för bara 1 oktober',
            code: 'rapport(df[df["datum"] == "2026-10-01"])',
            expected: [
              'Malmö: 12.0 grader, 0 mm regn',
              'Göteborg: 10.0 grader, 8 mm regn',
              'Kiruna: 2.0 grader, 4 mm regn',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-provresultaten',
    track: 'pandas',
    title: 'Provresultaten',
    reward: { emoji: '📐', name: 'Linjal' },
    summary: 'Fyra elever, tre ämnen: snitt, bäst i varje ämne och betyg.',
    files: {
      'prov.csv': `namn,amne,poang
Ada,matte,92
Ada,svenska,78
Ada,engelska,85
Bo,matte,55
Bo,svenska,88
Bo,engelska,70
Cy,matte,74
Cy,svenska,61
Cy,engelska,95
Dani,matte,40
Dani,svenska,52
Dani,engelska,66
`,
    },
    steps: [
      {
        title: 'Snittet',
        xp: 20,
        why: 'Varje elev har flera rader, en per ämne. groupby samlar ihop dem så att varje elev får ett enda värde.',
        description:
          '`prov.csv` har en rad per elev och ämne, med poäng från 0 till 100.',
        task: 'Uppgift: Läs in `prov.csv` till `df`. Spara varje elevs snitt i `snitt`, avrundat till en decimal, och eleven med högst snitt i `etta`.',
        starterCode: 'import pandas as pd\n\n# Steg 1: snittet\n',
        solution: `import pandas as pd

df = pd.read_csv("prov.csv")
snitt = df.groupby("namn")["poang"].mean().round(1)
etta = snitt.idxmax()
print(snitt)
`,
        hints: [
          'df = pd.read_csv("prov.csv")',
          'snitt = df.groupby("namn")["poang"].mean().round(1)',
          'etta = snitt.idxmax()',
        ],
        tests: [
          {
            description: 'Snittet för varje elev',
            code: 'snitt.to_dict()',
            expected: { Ada: 85.0, Bo: 71.0, Cy: 76.7, Dani: 52.7 },
          },
          { description: 'etta är Ada', code: 'etta', expected: 'Ada' },
        ],
      },
      {
        title: 'Bäst i varje ämne',
        xp: 20,
        why: 'Sortera först och ta bort dubbletter sedan: då blir den första raden för varje ämne den med högst poäng.',
        description:
          '`drop_duplicates("amne")` behåller bara den första raden för varje ämne. `dict(zip(a, b))` gör två kolumner till en dictionary.',
        task: 'Uppgift: Skapa `basta_per_amne(df)` som returnerar en dictionary med ämnet som nyckel och namnet på den som fick högst poäng som värde.',
        solution: `import pandas as pd

df = pd.read_csv("prov.csv")
snitt = df.groupby("namn")["poang"].mean().round(1)
etta = snitt.idxmax()


def basta_per_amne(df):
    basta = df.sort_values("poang", ascending=False).drop_duplicates("amne")
    return dict(zip(basta["amne"], basta["namn"]))


print(basta_per_amne(df))
`,
        hints: [
          'Sortera på poang med störst först.',
          'drop_duplicates("amne") behåller den första – alltså den bästa – raden per ämne.',
          'return dict(zip(basta["amne"], basta["namn"]))',
        ],
        tests: [
          {
            description: 'Bäst i varje ämne',
            code: 'basta_per_amne(df)',
            expected: { matte: 'Ada', svenska: 'Bo', engelska: 'Cy' },
          },
          {
            description: 'Utan Ada är Cy bäst i matte',
            code: 'basta_per_amne(df[df["namn"] != "Ada"])["matte"]',
            expected: 'Cy',
          },
        ],
      },
      {
        title: 'Betygen',
        xp: 20,
        why: 'apply kör en vanlig Python-funktion på varje värde i en kolumn. Så kan allt du lärt dig tidigare användas på en hel tabell.',
        description:
          '`df["poang"].apply(betyg)` anropar `betyg` en gång per rad och ger en ny kolumn med svaren.',
        task: 'Uppgift: Skapa `betyg(poang)` som ger A från 90, C från 70, E från 50 och annars F. Lägg till kolumnen `betyg` med `apply`, och spara hur många av varje betyg det blev i `fordelning` med `value_counts()`.',
        solution: `import pandas as pd

df = pd.read_csv("prov.csv")
snitt = df.groupby("namn")["poang"].mean().round(1)
etta = snitt.idxmax()


def basta_per_amne(df):
    basta = df.sort_values("poang", ascending=False).drop_duplicates("amne")
    return dict(zip(basta["amne"], basta["namn"]))


def betyg(poang):
    if poang >= 90:
        return "A"
    if poang >= 70:
        return "C"
    if poang >= 50:
        return "E"
    return "F"


df["betyg"] = df["poang"].apply(betyg)
fordelning = df["betyg"].value_counts()
print(df)
`,
        hints: [
          'betyg är en vanlig funktion med if och return, som i bana 4.',
          'df["betyg"] = df["poang"].apply(betyg) – utan parenteser efter betyg.',
          'fordelning = df["betyg"].value_counts()',
        ],
        tests: [
          {
            description: 'betyg(95) är A och betyg(49) är F',
            code: '[betyg(95), betyg(49)]',
            expected: ['A', 'F'],
          },
          {
            description: 'Adas betyg',
            code: 'df[df["namn"] == "Ada"]["betyg"].tolist()',
            expected: ['A', 'C', 'C'],
          },
          {
            description: 'Fördelningen',
            code: 'fordelning.to_dict()',
            expected: { C: 5, E: 4, A: 2, F: 1 },
          },
        ],
      },
    ],
  },
  {
    id: 'proj-lyssningen',
    track: 'pandas',
    title: 'Lyssningsstatistiken',
    reward: { emoji: '📻', name: 'Radio' },
    summary:
      'En veckas musiklyssning: favoritartisten, bästa dagen och hur mycket som är på helgen.',
    files: {
      'lyssning.csv': `datum,artist,minuter
2026-10-05,ABBA,35
2026-10-05,Robyn,20
2026-10-06,ABBA,15
2026-10-07,Veronica Maggio,40
2026-10-07,Robyn,25
2026-10-08,ABBA,10
2026-10-09,Veronica Maggio,30
2026-10-10,Robyn,45
2026-10-11,ABBA,50
2026-10-11,Veronica Maggio,5
`,
    },
    steps: [
      {
        title: 'Favoriten',
        xp: 20,
        why: 'Sortera efter groupby, så hamnar svaret på frågan "vem lyssnade jag mest på?" överst.',
        description:
          '`lyssning.csv` är en vecka, måndag 5 oktober till söndag 11 oktober, med minuter per artist och dag.',
        task: 'Uppgift: Läs in `lyssning.csv` till `df`. Spara minuterna per artist i `per_artist`, med mest först, och den totala tiden i timmar i `timmar`, avrundad till en decimal.',
        starterCode: 'import pandas as pd\n\n# Steg 1: favoriten\n',
        solution: `import pandas as pd

df = pd.read_csv("lyssning.csv")
per_artist = df.groupby("artist")["minuter"].sum().sort_values(ascending=False)
timmar = round(df["minuter"].sum() / 60, 1)
print(per_artist)
print(timmar)
`,
        hints: [
          'per_artist = df.groupby("artist")["minuter"].sum()',
          'Lägg till .sort_values(ascending=False) sist.',
          'timmar = round(df["minuter"].sum() / 60, 1)',
        ],
        tests: [
          {
            description: 'Artisterna med mest först',
            code: 'per_artist.index.tolist()',
            expected: ['ABBA', 'Robyn', 'Veronica Maggio'],
          },
          {
            description: 'ABBA har 110 minuter',
            code: 'per_artist["ABBA"]',
            expected: 110,
          },
          { description: 'timmar är 4.6', code: 'timmar', expected: 4.6 },
        ],
      },
      {
        title: 'Veckodagen',
        xp: 20,
        why: 'Datum i en CSV är bara text. pd.to_datetime gör om dem till riktiga datum, och då vet pandas vilken veckodag det är.',
        description:
          'Efter `pd.to_datetime` ger `df["datum"].dt.dayofweek` veckodagen som tal: 0 för måndag till 6 för söndag – precis som `weekday()` i bana 9.',
        task: 'Uppgift: Gör om datum med `pd.to_datetime`. Skapa `DAGAR` (måndag först) och kolumnen `dag` med veckodagens namn, med `.apply`. Spara minuterna per dag i `per_dag` och dagen med mest lyssning i `basta_dag`.',
        solution: `import pandas as pd

DAGAR = ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag", "söndag"]

df = pd.read_csv("lyssning.csv")
per_artist = df.groupby("artist")["minuter"].sum().sort_values(ascending=False)
timmar = round(df["minuter"].sum() / 60, 1)

df["datum"] = pd.to_datetime(df["datum"])
df["dag"] = df["datum"].dt.dayofweek.apply(lambda nummer: DAGAR[nummer])
per_dag = df.groupby("dag")["minuter"].sum()
basta_dag = per_dag.idxmax()
print(per_dag)
`,
        hints: [
          'df["datum"] = pd.to_datetime(df["datum"])',
          'df["dag"] = df["datum"].dt.dayofweek.apply(lambda nummer: DAGAR[nummer])',
          'Gruppera på "dag" och summera minuterna. idxmax ger dagen.',
        ],
        tests: [
          {
            description: 'De tre första raderna är måndag, måndag och tisdag',
            code: 'df["dag"].tolist()[:3]',
            expected: ['måndag', 'måndag', 'tisdag'],
          },
          {
            description: 'Onsdag har 65 minuter',
            code: 'per_dag["onsdag"]',
            expected: 65,
          },
          {
            description: 'basta_dag är onsdag',
            code: 'basta_dag',
            expected: 'onsdag',
          },
        ],
      },
      {
        title: 'Helgen',
        xp: 20,
        why: 'En kolumn med True och False är ett filter som går att återanvända – och sum() räknar hur många True det finns.',
        description: 'Lördag och söndag har dayofweek 5 och 6, alltså minst 5.',
        task: 'Uppgift: Lägg till kolumnen `helg` som är True på lördag och söndag. Spara hur stor del av minuterna som är på helgen i `helg_procent`, i hela procent med `round`, och skriv ut t.ex. `36 % av lyssningen är på helgen`.',
        solution: `import pandas as pd

DAGAR = ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag", "söndag"]

df = pd.read_csv("lyssning.csv")
per_artist = df.groupby("artist")["minuter"].sum().sort_values(ascending=False)
timmar = round(df["minuter"].sum() / 60, 1)

df["datum"] = pd.to_datetime(df["datum"])
df["dag"] = df["datum"].dt.dayofweek.apply(lambda nummer: DAGAR[nummer])
per_dag = df.groupby("dag")["minuter"].sum()
basta_dag = per_dag.idxmax()

df["helg"] = df["datum"].dt.dayofweek >= 5
helg_minuter = df[df["helg"]]["minuter"].sum()
helg_procent = round(helg_minuter / df["minuter"].sum() * 100)
print(f"{helg_procent} % av lyssningen är på helgen")
`,
        hints: [
          'df["helg"] = df["datum"].dt.dayofweek >= 5',
          'df[df["helg"]]["minuter"].sum() är minuterna på helgen.',
          'Dela med alla minuter, gånger 100, och round().',
        ],
        tests: [
          {
            description: 'Tre rader är på helgen',
            code: 'df["helg"].sum()',
            expected: 3,
          },
          {
            description: 'helg_procent är 36',
            code: 'helg_procent',
            expected: 36,
          },
          {
            description: 'Sista raden i utskriften',
            code: '__output[-1]',
            expected: '36 % av lyssningen är på helgen',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-quizmastaren',
    track: 'slutprojekt',
    title: 'Quizmästaren',
    reward: {
      emoji: '🎤',
      name: 'Mikrofon',
    },
    summary:
      'En frågesport med frågorna som data, flera godkända svar och en topplista som sparas i en fil.',
    files: {
      'topplista.txt': `Cy;1
Dani;3
`,
    },
    steps: [
      {
        title: 'Rätta svaret',
        xp: 25,
        why: 'Med en lista med godkända svar kan samma fråga ta emot både 8 och åtta. Det gör spelet schysstare utan att koden blir krångligare.',
        description:
          'Frågorna finns redan som data. Varje fråga har en lista med godkända svar, i små bokstäver.',
        task: 'Uppgift: Skapa `ratta(fraga, svar)` som returnerar True om svaret – utan mellanslag runt och med små bokstäver – finns bland frågans godkända svar.',
        starterCode: `FRAGOR = [
    {"fraga": "Vad heter Sveriges huvudstad?", "svar": ["stockholm"]},
    {"fraga": "Hur många ben har en spindel?", "svar": ["8", "åtta"]},
    {"fraga": "Vilket språk lär du dig nu?", "svar": ["python"]},
]

# Steg 1: rätta svaret
`,
        solution: `FRAGOR = [
    {"fraga": "Vad heter Sveriges huvudstad?", "svar": ["stockholm"]},
    {"fraga": "Hur många ben har en spindel?", "svar": ["8", "åtta"]},
    {"fraga": "Vilket språk lär du dig nu?", "svar": ["python"]},
]


def ratta(fraga, svar):
    return svar.strip().lower() in fraga["svar"]
`,
        hints: [
          'svar.strip().lower() gör om svaret.',
          'in kollar om det finns i listan fraga["svar"].',
          'return svar.strip().lower() in fraga["svar"]',
        ],
        tests: [
          {
            description: '" Åtta " är rätt på spindelfrågan',
            code: 'ratta(FRAGOR[1], " Åtta ")',
            expected: true,
          },
          {
            description: '8 är också rätt',
            code: 'ratta(FRAGOR[1], "8")',
            expected: true,
          },
          {
            description: 'Göteborg är fel',
            code: 'ratta(FRAGOR[0], "Göteborg")',
            expected: false,
          },
        ],
      },
      {
        title: 'Spela',
        xp: 25,
        why: 'kor_quiz använder ratta i stället för att jämföra själv. Ändras reglerna för vad som är rätt behöver bara ratta ändras.',
        description: 'Nu ska frågorna ställas en i taget.',
        task: 'Uppgift: Skapa `kor_quiz(fragor)` som ställer varje fråga med `input(fraga["fraga"] + " ")`, skriver `Rätt!` eller t.ex. `Fel, rätt svar är 8` (det första godkända svaret) och returnerar poängen. Skriv till sist ut `Du fick 2 av 3`.',
        solution: `FRAGOR = [
    {"fraga": "Vad heter Sveriges huvudstad?", "svar": ["stockholm"]},
    {"fraga": "Hur många ben har en spindel?", "svar": ["8", "åtta"]},
    {"fraga": "Vilket språk lär du dig nu?", "svar": ["python"]},
]


def ratta(fraga, svar):
    return svar.strip().lower() in fraga["svar"]


def kor_quiz(fragor):
    poang = 0
    for fraga in fragor:
        svar = input(fraga["fraga"] + " ")
        if ratta(fraga, svar):
            print("Rätt!")
            poang += 1
        else:
            print(f"Fel, rätt svar är {fraga['svar'][0]}")
    return poang


poang = kor_quiz(FRAGOR)
print(f"Du fick {poang} av {len(FRAGOR)}")
`,
        hints: [
          'Börja med poang = 0 och en for-loop över fragor.',
          'if ratta(fraga, svar): print("Rätt!") och poang += 1',
          'Felet visar fraga["svar"][0].',
        ],
        inputs: ['Stockholm', 'sex', 'Python'],
        tests: [
          {
            description: 'Två rätt och ett fel',
            code: '__output',
            expected: [
              'Rätt!',
              'Fel, rätt svar är 8',
              'Rätt!',
              'Du fick 2 av 3',
            ],
          },
          {
            description: 'Alla rätt',
            code: '__output[-1]',
            expected: 'Du fick 3 av 3',
            inputs: ['stockholm', 'åtta', 'PYTHON'],
          },
        ],
      },
      {
        title: 'Topplistan',
        xp: 25,
        why: 'Filen gör att topplistan finns kvar till nästa gång någon spelar. Det är skillnaden mellan ett program och ett spel man vill spela igen.',
        description:
          '`topplista.txt` har redan två resultat. Ditt resultat läggs till, och de tre bästa visas.',
        task: 'Uppgift: Skapa `spara(namn, poang)` som lägger till `namn;poang` sist i `topplista.txt`, och `topplista()` som returnerar de tre bästa som t.ex. `Dani: 3`. Fråga först `Vad heter du? `, spara resultatet efter quizet och skriv ut `Topplista:` följt av listan.',
        solution: `FRAGOR = [
    {"fraga": "Vad heter Sveriges huvudstad?", "svar": ["stockholm"]},
    {"fraga": "Hur många ben har en spindel?", "svar": ["8", "åtta"]},
    {"fraga": "Vilket språk lär du dig nu?", "svar": ["python"]},
]


def ratta(fraga, svar):
    return svar.strip().lower() in fraga["svar"]


def kor_quiz(fragor):
    poang = 0
    for fraga in fragor:
        svar = input(fraga["fraga"] + " ")
        if ratta(fraga, svar):
            print("Rätt!")
            poang += 1
        else:
            print(f"Fel, rätt svar är {fraga['svar'][0]}")
    return poang


def spara(namn, poang):
    with open("topplista.txt", "a") as fil:
        fil.write(f"{namn};{poang}\\n")


def topplista():
    resultat = []
    with open("topplista.txt") as fil:
        for rad in fil:
            namn, poang = rad.strip().split(";")
            resultat.append((namn, int(poang)))
    basta = sorted(resultat, key=lambda par: par[1], reverse=True)[:3]
    return [f"{namn}: {poang}" for namn, poang in basta]


namn = input("Vad heter du? ")
poang = kor_quiz(FRAGOR)
print(f"Du fick {poang} av {len(FRAGOR)}")
spara(namn, poang)
print("Topplista:")
for rad in topplista():
    print(rad)
`,
        hints: [
          'spara: with open("topplista.txt", "a") as fil: fil.write(f"{namn};{poang}\\n")',
          'topplista: läs raderna, split(";"), int(poang), sortera med key och reverse=True och ta [:3].',
          'Huvudprogrammet: input för namnet först, spara(namn, poang) efter quizet.',
        ],
        inputs: ['Ada', 'Stockholm', 'sex', 'Python'],
        tests: [
          {
            description: 'Ada får 2 och hamnar i mitten',
            code: '__output',
            expected: [
              'Rätt!',
              'Fel, rätt svar är 8',
              'Rätt!',
              'Du fick 2 av 3',
              'Topplista:',
              'Dani: 3',
              'Ada: 2',
              'Cy: 1',
            ],
          },
          {
            description: 'Ada;2 sparas sist i filen',
            code: 'open("topplista.txt").read()',
            expected: `Cy;1
Dani;3
Ada;2
`,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-cykeluthyrningen',
    track: 'slutprojekt',
    title: 'Cykeluthyrningen',
    reward: {
      emoji: '🚲',
      name: 'Cykel',
    },
    summary:
      'En dataanalys från början till slut: rensa datan, räkna och skriv en rapport till en fil.',
    files: {
      'uthyrning.csv': `datum,station,minuter,kund
2026-09-01,Centralen,25,medlem
2026-09-01,Hamnen,40,engång
2026-09-01,Centralen,,medlem
2026-09-02,Parken,15,medlem
2026-09-02,Centralen,30,engång
2026-09-03,Hamnen,55,engång
2026-09-03,Parken,20,medlem
2026-09-05,Centralen,10,medlem
2026-09-06,Hamnen,35,medlem
2026-09-06,Parken,60,engång
2026-09-06,Centralen,20,medlem
`,
    },
    steps: [
      {
        title: 'Rensa datan',
        xp: 25,
        why: 'Riktig data är nästan aldrig felfri. Kolla alltid efter tomma värden först – annars blir alla summor och snitt fel utan att något säger till.',
        description:
          '`uthyrning.csv` har en rad per cykelresa. En rad saknar minuter, och den måste bort innan du räknar.',
        task: 'Uppgift: Läs in filen till `df`. Spara antalet rader som saknar minuter i `saknas` med `.isna().sum()`, ta bort dem med `df = df.dropna()` och gör om minuter till heltal med `.astype(int)`. Spara antalet resor som är kvar i `antal_resor`.',
        starterCode: `import pandas as pd

# Steg 1: rensa datan
`,
        solution: `import pandas as pd

df = pd.read_csv("uthyrning.csv")
saknas = df["minuter"].isna().sum()
df = df.dropna()
df["minuter"] = df["minuter"].astype(int)
antal_resor = len(df)
print(f"{saknas} rad saknade minuter, {antal_resor} resor kvar")
`,
        hints: [
          'saknas = df["minuter"].isna().sum()',
          'df = df.dropna() – dropna ger en ny tabell, så spara den i df.',
          'df["minuter"] = df["minuter"].astype(int)',
        ],
        tests: [
          {
            description: 'En rad saknar minuter',
            code: 'saknas',
            expected: 1,
          },
          {
            description: '10 resor är kvar',
            code: 'antal_resor',
            expected: 10,
          },
          {
            description: 'minuter är heltal',
            code: 'df["minuter"].dtype.kind',
            expected: 'i',
          },
        ],
      },
      {
        title: 'Räkna',
        xp: 25,
        why: 'Flest resor och flest minuter är olika frågor med olika svar. En bra analys säger vilken fråga den svarar på.',
        description: 'Nu kan datan räknas på.',
        task: 'Uppgift: Spara minuterna per station i `per_station`, stationen med flest resor i `flest_resor` och medeltiden per kundtyp i `snitt_kund`, avrundad till en decimal.',
        solution: `import pandas as pd

df = pd.read_csv("uthyrning.csv")
saknas = df["minuter"].isna().sum()
df = df.dropna()
df["minuter"] = df["minuter"].astype(int)
antal_resor = len(df)
print(f"{saknas} rad saknade minuter, {antal_resor} resor kvar")

per_station = df.groupby("station")["minuter"].sum()
flest_resor = df["station"].value_counts().idxmax()
snitt_kund = df.groupby("kund")["minuter"].mean().round(1)
print(per_station)
`,
        hints: [
          'per_station = df.groupby("station")["minuter"].sum()',
          'flest_resor = df["station"].value_counts().idxmax()',
          'snitt_kund: groupby("kund"), mean() och round(1).',
        ],
        tests: [
          {
            description: 'Minuter per station',
            code: 'per_station.to_dict()',
            expected: {
              Centralen: 85,
              Hamnen: 130,
              Parken: 95,
            },
          },
          {
            description: 'Flest resor från Centralen',
            code: 'flest_resor',
            expected: 'Centralen',
          },
          {
            description: 'Medlemmar cyklar 20.8 minuter i snitt',
            code: 'snitt_kund["medlem"]',
            expected: 20.8,
          },
        ],
      },
      {
        title: 'Rapporten',
        xp: 25,
        why: 'En rapport i en fil kan skickas till någon som aldrig sett koden. Det är oftast det som är målet med en analys.',
        description: 'Till sist ska resultatet skrivas till `rapport.txt`.',
        task: 'Uppgift: Skapa `skriv_rapport(df, filnamn)` som skriver `Resor: 10`, `Minuter totalt: 310`, `Flest resor: Centralen` och sedan en rad per station med flest minuter först, t.ex. `Hamnen: 130 min`.',
        solution: `import pandas as pd

df = pd.read_csv("uthyrning.csv")
saknas = df["minuter"].isna().sum()
df = df.dropna()
df["minuter"] = df["minuter"].astype(int)
antal_resor = len(df)
print(f"{saknas} rad saknade minuter, {antal_resor} resor kvar")

per_station = df.groupby("station")["minuter"].sum()
flest_resor = df["station"].value_counts().idxmax()
snitt_kund = df.groupby("kund")["minuter"].mean().round(1)
print(per_station)


def skriv_rapport(df, filnamn):
    per_station = df.groupby("station")["minuter"].sum().sort_values(ascending=False)
    with open(filnamn, "w") as fil:
        fil.write(f"Resor: {len(df)}\\n")
        fil.write(f"Minuter totalt: {df['minuter'].sum()}\\n")
        fil.write(f"Flest resor: {df['station'].value_counts().idxmax()}\\n")
        for station, minuter in per_station.items():
            fil.write(f"{station}: {minuter} min\\n")


skriv_rapport(df, "rapport.txt")
print(open("rapport.txt").read())
`,
        hints: [
          'with open(filnamn, "w") as fil: och en fil.write per rad, med \\n sist.',
          'Sortera minuterna per station med sort_values(ascending=False).',
          'Loopa med for station, minuter in per_station.items():',
        ],
        tests: [
          {
            description: 'rapport.txt',
            code: 'open("rapport.txt").read()',
            expected: `Resor: 10
Minuter totalt: 310
Flest resor: Centralen
Hamnen: 130 min
Parken: 95 min
Centralen: 85 min
`,
          },
          {
            description: 'Rapporten för bara medlemmar',
            code: '(skriv_rapport(df[df["kund"] == "medlem"], "medlem.txt"), open("medlem.txt").read().split("\\n")[:2])[-1]',
            expected: ['Resor: 6', 'Minuter totalt: 125'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-traningsdagboken',
    track: 'slutprojekt',
    title: 'Träningsdagboken',
    reward: {
      emoji: '👟',
      name: 'Löparskor',
    },
    summary:
      'Ett eget verktyg med klasser, en meny och en fil som minns alla träningspass.',
    files: {
      'dagbok.txt': `2026-10-28;löpning;30
2026-10-30;styrka;45
`,
    },
    steps: [
      {
        title: 'Klasserna',
        xp: 25,
        why: 'Ett pass och en dagbok är två olika saker. Två små klasser är lättare att förstå än en stor som gör allt.',
        description:
          'Dagboken byggs i tre steg: klasserna, filen och sedan menyn.',
        task: 'Uppgift: Skapa `Pass(datum, typ, minuter)` med en `__str__` som ger t.ex. `2026-11-01 löpning 25 min`. Skapa `Dagbok` med en tom lista `traningar` och metoderna `lagg_till(traning)`, `totalt()` (alla minuter) och `per_typ()` (en dictionary med minuter per typ).',
        starterCode: '# Steg 1: klasserna\n',
        solution: `class Pass:
    def __init__(self, datum, typ, minuter):
        self.datum = datum
        self.typ = typ
        self.minuter = minuter

    def __str__(self):
        return f"{self.datum} {self.typ} {self.minuter} min"


class Dagbok:
    def __init__(self):
        self.traningar = []

    def lagg_till(self, traning):
        self.traningar.append(traning)

    def totalt(self):
        return sum([traning.minuter for traning in self.traningar])

    def per_typ(self):
        resultat = {}
        for traning in self.traningar:
            resultat[traning.typ] = resultat.get(traning.typ, 0) + traning.minuter
        return resultat
`,
        hints: [
          'Pass är som Vara i bana 10, med tre attribut och en __str__.',
          'totalt: sum([traning.minuter for traning in self.traningar])',
          'per_typ: resultat.get(traning.typ, 0) + traning.minuter för varje pass.',
        ],
        tests: [
          {
            description: 'Ett pass skrivs ut snyggt',
            code: 'str(Pass("2026-11-01", "löpning", 25))',
            expected: '2026-11-01 löpning 25 min',
          },
          {
            description: 'totalt och per_typ',
            code: '(d := Dagbok(), d.lagg_till(Pass("a", "löpning", 30)), d.lagg_till(Pass("b", "yoga", 20)), d.lagg_till(Pass("c", "löpning", 10)), [d.totalt(), d.per_typ()])[-1]',
            expected: [
              60,
              {
                löpning: 40,
                yoga: 20,
              },
            ],
          },
          {
            description: 'En ny dagbok är tom',
            code: 'Dagbok().totalt()',
            expected: 0,
          },
        ],
      },
      {
        title: 'Filen',
        xp: 25,
        why: 'Läsa och spara är varandras spegelbild: samma format åt båda hållen. Testa alltid att det som sparats går att läsa in igen.',
        description:
          '`dagbok.txt` har ett pass per rad, som `2026-10-28;löpning;30`.',
        task: 'Uppgift: Ge `Dagbok` metoden `spara(filnamn)` som skriver ett pass per rad i det formatet. Skapa `las_dagbok(filnamn)` som läser filen och returnerar en Dagbok. Läs sedan in `dagbok.txt`, lägg till löpning 25 minuter den 2026-11-01 och spara.',
        solution: `class Pass:
    def __init__(self, datum, typ, minuter):
        self.datum = datum
        self.typ = typ
        self.minuter = minuter

    def __str__(self):
        return f"{self.datum} {self.typ} {self.minuter} min"


class Dagbok:
    def __init__(self):
        self.traningar = []

    def lagg_till(self, traning):
        self.traningar.append(traning)

    def totalt(self):
        return sum([traning.minuter for traning in self.traningar])

    def per_typ(self):
        resultat = {}
        for traning in self.traningar:
            resultat[traning.typ] = resultat.get(traning.typ, 0) + traning.minuter
        return resultat

    def spara(self, filnamn):
        with open(filnamn, "w") as fil:
            for traning in self.traningar:
                fil.write(f"{traning.datum};{traning.typ};{traning.minuter}\\n")


def las_dagbok(filnamn):
    dagbok = Dagbok()
    with open(filnamn) as fil:
        for rad in fil:
            datum, typ, minuter = rad.strip().split(";")
            dagbok.lagg_till(Pass(datum, typ, int(minuter)))
    return dagbok


dagbok = las_dagbok("dagbok.txt")
dagbok.lagg_till(Pass("2026-11-01", "löpning", 25))
dagbok.spara("dagbok.txt")
`,
        hints: [
          'spara: with open(filnamn, "w") och en fil.write(f"{traning.datum};{traning.typ};{traning.minuter}\\n") per pass.',
          'las_dagbok: split(";") per rad och int(minuter).',
          'Huvudprogrammet: las_dagbok, lagg_till och spara.',
        ],
        tests: [
          {
            description: 'Filen har tre pass',
            code: 'open("dagbok.txt").read()',
            expected: `2026-10-28;löpning;30
2026-10-30;styrka;45
2026-11-01;löpning;25
`,
          },
          {
            description: 'Det sparade går att läsa in igen',
            code: 'las_dagbok("dagbok.txt").per_typ()',
            expected: {
              löpning: 55,
              styrka: 45,
            },
          },
        ],
      },
      {
        title: 'Menyn',
        xp: 25,
        why: 'Menyn är det enda användaren ser. Allt det svåra finns redan i klasserna, så menyn blir kort och lätt att ändra.',
        description:
          'Byt de tre sista raderna mot en meny. Felaktiga minuter får inte krascha programmet.',
        task: 'Uppgift: Läs in dagboken och visa menyn `1 = nytt pass, 2 = statistik, 3 = spara och sluta: ` tills användaren väljer 3.\n  – 1 frågar `Datum? `, `Typ? ` och `Minuter? `, och skriver t.ex. `Sparat: 2026-11-01 löpning 25 min`. Är minuterna inget tal: `Minuter måste vara ett tal`.\n  – 2 skriver `Totalt: 100 min` och en rad per typ, t.ex. `löpning: 55 min`.\n  – 3 sparar, skriver `Hej då!` och slutar. Annat ger `Välj 1, 2 eller 3`.',
        solution: `class Pass:
    def __init__(self, datum, typ, minuter):
        self.datum = datum
        self.typ = typ
        self.minuter = minuter

    def __str__(self):
        return f"{self.datum} {self.typ} {self.minuter} min"


class Dagbok:
    def __init__(self):
        self.traningar = []

    def lagg_till(self, traning):
        self.traningar.append(traning)

    def totalt(self):
        return sum([traning.minuter for traning in self.traningar])

    def per_typ(self):
        resultat = {}
        for traning in self.traningar:
            resultat[traning.typ] = resultat.get(traning.typ, 0) + traning.minuter
        return resultat

    def spara(self, filnamn):
        with open(filnamn, "w") as fil:
            for traning in self.traningar:
                fil.write(f"{traning.datum};{traning.typ};{traning.minuter}\\n")


def las_dagbok(filnamn):
    dagbok = Dagbok()
    with open(filnamn) as fil:
        for rad in fil:
            datum, typ, minuter = rad.strip().split(";")
            dagbok.lagg_till(Pass(datum, typ, int(minuter)))
    return dagbok


dagbok = las_dagbok("dagbok.txt")
while True:
    val = input("1 = nytt pass, 2 = statistik, 3 = spara och sluta: ")
    if val == "1":
        datum = input("Datum? ")
        typ = input("Typ? ")
        try:
            minuter = int(input("Minuter? "))
        except ValueError:
            print("Minuter måste vara ett tal")
            continue
        dagbok.lagg_till(Pass(datum, typ, minuter))
        print("Sparat: " + str(dagbok.traningar[-1]))
    elif val == "2":
        print(f"Totalt: {dagbok.totalt()} min")
        for typ, minuter in dagbok.per_typ().items():
            print(f"{typ}: {minuter} min")
    elif val == "3":
        dagbok.spara("dagbok.txt")
        print("Hej då!")
        break
    else:
        print("Välj 1, 2 eller 3")
`,
        hints: [
          'Menyn är som i övningen En meny, med while True och break.',
          'Lägg int(input("Minuter? ")) i ett try med except ValueError och continue.',
          'Val 3: dagbok.spara("dagbok.txt") före break.',
        ],
        inputs: [
          '1',
          '2026-11-01',
          'löpning',
          '25',
          '1',
          '2026-11-02',
          'yoga',
          'länge',
          '2',
          '9',
          '3',
        ],
        tests: [
          {
            description:
              'Nytt pass, felaktiga minuter, statistik, fel val och sluta',
            code: '__output',
            expected: [
              'Sparat: 2026-11-01 löpning 25 min',
              'Minuter måste vara ett tal',
              'Totalt: 100 min',
              'löpning: 55 min',
              'styrka: 45 min',
              'Välj 1, 2 eller 3',
              'Hej då!',
            ],
          },
          {
            description: 'Det nya passet sparas i filen',
            code: 'open("dagbok.txt").read().split("\\n")[-2]',
            expected: '2026-11-01;löpning;25',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-lanekalkylatorn',
    track: 'streamlit',
    title: 'Lånekalkylatorn',
    reward: { emoji: '💰', name: 'Pengapåse' },
    summary:
      'En app där man ställer in ett lån med reglage och direkt ser vad det kostar, månad för månad och år för år.',
    steps: [
      {
        title: 'Ställ in lånet',
        xp: 25,
        why: 'Med widgetar kan användaren inte skriva fel: reglaget har en lägsta och högsta gräns, och svaret är redan ett tal.',
        description:
          'En kalkylator börjar med det användaren vill ställa in. Varje värde blir en widget.',
        task: 'Uppgift: Skapa `belopp` med `st.number_input("Lånebelopp", value=100000, step=10000)`, `ranta` med ett reglage `Ränta (%)` från 0.0 till 10.0 som börjar på 4.0, och `ar` med ett reglage `År` från 1 till 30 som börjar på 10. Skriv `Du lånar 100000 kr i 10 år`.',
        starterCode: 'import streamlit as st\n\nst.title("Lånekalkylatorn")\n',
        solution: `import streamlit as st

st.title("Lånekalkylatorn")
belopp = st.number_input("Lånebelopp", value=100000, step=10000)
ranta = st.slider("Ränta (%)", 0.0, 10.0, 4.0)
ar = st.slider("År", 1, 30, 10)
st.write(f"Du lånar {belopp} kr i {ar} år")
`,
        hints: [
          'belopp = st.number_input("Lånebelopp", value=100000, step=10000)',
          'ranta = st.slider("Ränta (%)", 0.0, 10.0, 4.0) och ar = st.slider("År", 1, 30, 10)',
          'st.write(f"Du lånar {belopp} kr i {ar} år")',
        ],
        tests: [
          {
            description: 'Från början: Du lånar 100000 kr i 10 år',
            code: "__shown('write')",
            expected: ['Du lånar 100000 kr i 10 år'],
          },
          {
            description: '250000 kr i 25 år',
            code: "__shown('write')",
            expected: ['Du lånar 250000 kr i 25 år'],
            widgets: { Lånebelopp: 250000, År: 25 },
          },
          {
            description: 'Räntan börjar på 4.0',
            code: 'ranta',
            expected: 4,
          },
        ],
      },
      {
        title: 'Första månaden',
        xp: 25,
        why: 'Tre nyckeltal bredvid varandra svarar på frågan man faktiskt har – vad kostar det i månaden – utan att man behöver läsa en enda mening.',
        description:
          'Med rak amortering betalar man av lika mycket varje månad, plus ränta på det man har kvar.',
        task: 'Uppgift: Räkna ut `amortering` (beloppet delat med antal månader) och `ranta_kr` (beloppet gånger räntan / 100, delat med 12). Visa tre `st.metric` i tre kolumner, avrundade med `round`: `Amortering`, `Ränta` och `Att betala` (summan av de två), t.ex. `833 kr`.',
        solution: `import streamlit as st

st.title("Lånekalkylatorn")
belopp = st.number_input("Lånebelopp", value=100000, step=10000)
ranta = st.slider("Ränta (%)", 0.0, 10.0, 4.0)
ar = st.slider("År", 1, 30, 10)
st.write(f"Du lånar {belopp} kr i {ar} år")

amortering = belopp / (ar * 12)
ranta_kr = belopp * ranta / 100 / 12
kol1, kol2, kol3 = st.columns(3)
kol1.metric("Amortering", f"{round(amortering)} kr")
kol2.metric("Ränta", f"{round(ranta_kr)} kr")
kol3.metric("Att betala", f"{round(amortering + ranta_kr)} kr")
`,
        hints: [
          'amortering = belopp / (ar * 12) och ranta_kr = belopp * ranta / 100 / 12',
          'kol1, kol2, kol3 = st.columns(3)',
          'kol1.metric("Amortering", f"{round(amortering)} kr") – och likadant för de andra två.',
        ],
        tests: [
          {
            description: 'Från början: 833 kr, 333 kr och 1167 kr',
            code: "__shown('metric')",
            expected: [
              'Amortering: 833 kr',
              'Ränta: 333 kr',
              'Att betala: 1167 kr',
            ],
          },
          {
            description: '120000 kr i 5 år med 6 %: 2000, 600 och 2600 kr',
            code: "__shown('metric')",
            expected: [
              'Amortering: 2000 kr',
              'Ränta: 600 kr',
              'Att betala: 2600 kr',
            ],
            widgets: { Lånebelopp: 120000, År: 5, 'Ränta (%)': 6.0 },
          },
        ],
      },
      {
        title: 'Skulden år för år',
        xp: 30,
        why: 'Ett diagram visar på en sekund det som tar en hel tabell att förklara: att skulden går ner lika mycket varje år, och att räntan därför blir lägre för varje år.',
        description:
          'Varje år betalar man av beloppet delat med antal år. Räntan för ett år är räntan på skulden när året börjar.',
        task: 'Uppgift: Gör listan `skuld` med skulden vid varje års början, från år 0 till sista året (då den är 0), avrundad med `round`. Rita den med `st.line_chart(skuld)`. Räkna ut `ranta_totalt`: summan av räntan på skulden i början av år 1 till sista året. Visa `st.metric("Ränta totalt", "22000 kr")` med rätt summa.',
        solution: `import streamlit as st

st.title("Lånekalkylatorn")
belopp = st.number_input("Lånebelopp", value=100000, step=10000)
ranta = st.slider("Ränta (%)", 0.0, 10.0, 4.0)
ar = st.slider("År", 1, 30, 10)
st.write(f"Du lånar {belopp} kr i {ar} år")

amortering = belopp / (ar * 12)
ranta_kr = belopp * ranta / 100 / 12
kol1, kol2, kol3 = st.columns(3)
kol1.metric("Amortering", f"{round(amortering)} kr")
kol2.metric("Ränta", f"{round(ranta_kr)} kr")
kol3.metric("Att betala", f"{round(amortering + ranta_kr)} kr")

skuld = [round(belopp - belopp / ar * nummer) for nummer in range(ar + 1)]
st.line_chart(skuld)
ranta_totalt = round(sum(kvar * ranta / 100 for kvar in skuld[:-1]))
st.metric("Ränta totalt", f"{ranta_totalt} kr")
`,
        hints: [
          'skuld = [round(belopp - belopp / ar * nummer) for nummer in range(ar + 1)]',
          'skuld[:-1] är skulden i början av varje år – utan den sista nollan.',
          'ranta_totalt = round(sum(kvar * ranta / 100 for kvar in skuld[:-1]))',
        ],
        tests: [
          {
            description: 'Skulden går från 100000 ner till 0 på 10 år',
            code: '[skuld[0], skuld[1], skuld[-1], len(skuld)]',
            expected: [100000, 90000, 0, 11],
          },
          {
            description: 'Ett linjediagram med 11 punkter',
            code: "__shown('line_chart')",
            expected: ['diagram med 11 punkter'],
          },
          {
            description: 'Ränta totalt: 22000 kr',
            code: "__shown('metric')[-1]",
            expected: 'Ränta totalt: 22000 kr',
          },
          {
            description: '50000 kr i 2 år med 5 %: 3750 kr',
            code: "__shown('metric')[-1]",
            expected: 'Ränta totalt: 3750 kr',
            widgets: { Lånebelopp: 50000, År: 2, 'Ränta (%)': 5.0 },
          },
        ],
      },
    ],
  },
  {
    id: 'proj-att-gora-appen',
    track: 'streamlit',
    title: 'Att göra-appen',
    reward: { emoji: '📋', name: 'Skrivplatta' },
    summary:
      'En att göra-lista som minns uppgifterna mellan klicken, där man kan bocka av och rensa bort det som är klart.',
    steps: [
      {
        title: 'Lägg till',
        xp: 25,
        why: 'Utan st.session_state skulle listan vara tom igen efter varje klick, eftersom hela programmet körs om. Det är det viktigaste att förstå i Streamlit.',
        description:
          'Listan måste ligga i st.session_state, annars försvinner den vid nästa klick.',
        task: 'Uppgift: Skapa listan `st.session_state.uppgifter` första gången. En `st.text_input("Ny uppgift")` och en knapp `Lägg till` som lägger till texten – men bara om den inte är tom. Visa varje uppgift med `st.write`. Är listan tom: `st.caption("Inget att göra – skönt!")`.',
        starterCode: 'import streamlit as st\n\nst.title("Att göra")\n',
        solution: `import streamlit as st

st.title("Att göra")
if "uppgifter" not in st.session_state:
    st.session_state.uppgifter = []

ny = st.text_input("Ny uppgift")
if st.button("Lägg till") and ny:
    st.session_state.uppgifter.append(ny)

if not st.session_state.uppgifter:
    st.caption("Inget att göra – skönt!")
for uppgift in st.session_state.uppgifter:
    st.write(uppgift)
`,
        hints: [
          'if "uppgifter" not in st.session_state: st.session_state.uppgifter = []',
          'if st.button("Lägg till") and ny: st.session_state.uppgifter.append(ny)',
          'for uppgift in st.session_state.uppgifter: st.write(uppgift)',
        ],
        tests: [
          {
            description: 'Från början: Inget att göra – skönt!',
            code: "__shown('caption') + __shown('write')",
            expected: ['Inget att göra – skönt!'],
          },
          {
            description: 'Lägg till diska och handla',
            code: "__shown('write')",
            expected: ['diska', 'handla'],
            widgets: [
              { 'Ny uppgift': 'diska', 'Lägg till': true },
              { 'Ny uppgift': 'handla', 'Lägg till': true },
            ],
          },
          {
            description: 'En tom uppgift läggs inte till',
            code: "__shown('write')",
            expected: [],
            widgets: [{ 'Lägg till': true }],
          },
        ],
      },
      {
        title: 'Bocka av',
        xp: 25,
        why: 'En kryssruta per uppgift gör listan till något man använder, inte bara läser. Och siffran högst upp säger direkt hur mycket som är kvar.',
        description:
          'Varje uppgift blir en kryssruta i stället för en text. Kryssrutan har uppgiftens text som namn.',
        task: 'Uppgift: Byt `st.write(uppgift)` mot `st.checkbox(uppgift)` och räkna hur många som är ikryssade. Visa `st.metric("Kvar att göra", …)` med antalet som inte är klara, efter listan.',
        solution: `import streamlit as st

st.title("Att göra")
if "uppgifter" not in st.session_state:
    st.session_state.uppgifter = []

ny = st.text_input("Ny uppgift")
if st.button("Lägg till") and ny:
    st.session_state.uppgifter.append(ny)

if not st.session_state.uppgifter:
    st.caption("Inget att göra – skönt!")
klara = 0
for uppgift in st.session_state.uppgifter:
    if st.checkbox(uppgift):
        klara += 1
st.metric("Kvar att göra", len(st.session_state.uppgifter) - klara)
`,
        hints: [
          'klara = 0 före loopen.',
          'if st.checkbox(uppgift): klara += 1',
          'st.metric("Kvar att göra", len(st.session_state.uppgifter) - klara)',
        ],
        tests: [
          {
            description: 'Två uppgifter, ingen klar: 2 kvar',
            code: "__shown('checkbox') + __shown('metric')",
            expected: ['diska: False', 'handla: False', 'Kvar att göra: 2'],
            widgets: [
              { 'Ny uppgift': 'diska', 'Lägg till': true },
              { 'Ny uppgift': 'handla', 'Lägg till': true },
            ],
          },
          {
            description: 'Bocka av diska: 1 kvar',
            code: "__shown('metric')",
            expected: ['Kvar att göra: 1'],
            widgets: [
              { 'Ny uppgift': 'diska', 'Lägg till': true },
              { 'Ny uppgift': 'handla', 'Lägg till': true },
              { diska: true },
            ],
          },
        ],
      },
      {
        title: 'Rensa klara',
        xp: 30,
        why: 'Efter att listan ändrats ritar st.rerun() om sidan direkt, så att det man ser alltid stämmer med listan.',
        description:
          'Knappen Rensa klara tar bort de ikryssade uppgifterna. Sedan körs appen om med st.rerun(), så att de försvinner från sidan på en gång.',
        task: 'Uppgift: Spara de ikryssade uppgifterna i listan `klara` i stället för att räkna dem. Lägg till en knapp `Rensa klara` sist som behåller bara uppgifterna som inte är klara och sedan kör `st.rerun()`.',
        solution: `import streamlit as st

st.title("Att göra")
if "uppgifter" not in st.session_state:
    st.session_state.uppgifter = []

ny = st.text_input("Ny uppgift")
if st.button("Lägg till") and ny:
    st.session_state.uppgifter.append(ny)

if not st.session_state.uppgifter:
    st.caption("Inget att göra – skönt!")
klara = []
for uppgift in st.session_state.uppgifter:
    if st.checkbox(uppgift):
        klara.append(uppgift)
st.metric("Kvar att göra", len(st.session_state.uppgifter) - len(klara))

if st.button("Rensa klara"):
    st.session_state.uppgifter = [
        uppgift for uppgift in st.session_state.uppgifter if uppgift not in klara
    ]
    st.rerun()
`,
        hints: [
          'klara = [] och klara.append(uppgift) när kryssrutan är ikryssad.',
          'En comprehension: [uppgift for uppgift in st.session_state.uppgifter if uppgift not in klara]',
          'Spara den i st.session_state.uppgifter och kör st.rerun() direkt efter.',
        ],
        tests: [
          {
            description: 'Rensa klara tar bort diska',
            code: "__shown('checkbox') + __shown('metric')",
            expected: ['handla: False', 'Kvar att göra: 1'],
            widgets: [
              { 'Ny uppgift': 'diska', 'Lägg till': true },
              { 'Ny uppgift': 'handla', 'Lägg till': true },
              { diska: true, 'Rensa klara': true },
            ],
          },
          {
            description: 'Utan ikryssade händer inget',
            code: 'st.session_state.uppgifter',
            expected: ['diska'],
            widgets: [
              { 'Ny uppgift': 'diska', 'Lägg till': true },
              { 'Rensa klara': true },
            ],
          },
        ],
        sourceChecks: [
          { description: 'Använder st.rerun()', pattern: /st\.rerun\(\)/ },
        ],
      },
    ],
  },
  {
    id: 'proj-vaderpanelen',
    track: 'streamlit',
    title: 'Väderpanelen',
    reward: { emoji: '⛅', name: 'Moln' },
    summary:
      'En väderpanel för tre städer: välj stad och se temperaturen, hur den ändrats, ett diagram och de regniga dagarna.',
    files: {
      'vader.csv': `datum,stad,temp,regn
2026-10-01,Göteborg,12,4
2026-10-01,Kiruna,2,0
2026-10-01,Malmö,14,0
2026-10-02,Göteborg,11,8
2026-10-02,Kiruna,-1,2
2026-10-02,Malmö,13,3
2026-10-03,Göteborg,13,0
2026-10-03,Kiruna,0,0
2026-10-03,Malmö,15,0
2026-10-04,Göteborg,10,6
2026-10-04,Kiruna,-3,1
2026-10-04,Malmö,16,5
`,
    },
    steps: [
      {
        title: 'Välj stad',
        xp: 25,
        why: 'Ett st.metric med ändring visar både läget och riktningen – är det kallare eller varmare än i går? – med ett ord och en pil.',
        description:
          'vader.csv har temperatur och regn per stad och dag. Städerna i rullgardinsmenyn tas från datan, så att en ny stad i filen dyker upp av sig själv.',
        task: 'Uppgift: Låt användaren välja `Stad` bland städerna i bokstavsordning. Spara stadens rader i `data`. Räkna ut `senaste` (sista temperaturen) och `andring` (sista minus näst sista), som vanliga tal med `int()`. Visa `st.metric("Temperatur", "10 °C", "-3 °C")` med rätt värden.',
        starterCode: `import streamlit as st
import pandas as pd

df = pd.read_csv("vader.csv")
st.title("Väderpanelen")
`,
        solution: `import streamlit as st
import pandas as pd

df = pd.read_csv("vader.csv")
st.title("Väderpanelen")

stad = st.selectbox("Stad", sorted(df["stad"].unique()))
data = df[df["stad"] == stad]
senaste = int(data["temp"].iloc[-1])
andring = senaste - int(data["temp"].iloc[-2])
st.metric("Temperatur", f"{senaste} °C", f"{andring} °C")
`,
        hints: [
          'stad = st.selectbox("Stad", sorted(df["stad"].unique()))',
          'data = df[df["stad"] == stad] och data["temp"].iloc[-1] är sista temperaturen.',
          'st.metric("Temperatur", f"{senaste} °C", f"{andring} °C")',
        ],
        tests: [
          {
            description: 'Göteborg först: 10 °C, 3 grader kallare',
            code: "[__shown('metric'), andring]",
            expected: [['Temperatur: 10 °C'], -3],
          },
          {
            description: 'Malmö: 16 °C, 1 grad varmare',
            code: "[__shown('metric'), andring]",
            expected: [['Temperatur: 16 °C'], 1],
            widgets: { Stad: 'Malmö' },
          },
          {
            description: 'Städerna i bokstavsordning',
            code: "__shown('selectbox')",
            expected: ['Stad: Göteborg'],
          },
        ],
      },
      {
        title: 'Diagram och regn',
        xp: 25,
        why: 'En linje över dagarna visar om det blir varmare eller kallare – det syns inte i en enda siffra.',
        description:
          'Med datumen som index blir de etiketterna längs diagrammets botten.',
        task: 'Uppgift: Rita temperaturen med `st.line_chart(data.set_index("datum")["temp"])`. Visa också `st.metric("Regn totalt", "18 mm")` med summan av `regn` för staden.',
        solution: `import streamlit as st
import pandas as pd

df = pd.read_csv("vader.csv")
st.title("Väderpanelen")

stad = st.selectbox("Stad", sorted(df["stad"].unique()))
data = df[df["stad"] == stad]
senaste = int(data["temp"].iloc[-1])
andring = senaste - int(data["temp"].iloc[-2])
st.metric("Temperatur", f"{senaste} °C", f"{andring} °C")

st.line_chart(data.set_index("datum")["temp"])
st.metric("Regn totalt", f"{data['regn'].sum()} mm")
`,
        hints: [
          'st.line_chart(data.set_index("datum")["temp"])',
          'data["regn"].sum() är regnet för staden.',
          "Inne i en f-sträng med \" runt: data['regn'] med enkla citattecken.",
        ],
        tests: [
          {
            description: 'Ett linjediagram med fyra dagar',
            code: "__shown('line_chart')",
            expected: ['diagram med 4 punkter'],
          },
          {
            description: 'Göteborg: 18 mm',
            code: "__shown('metric')[-1]",
            expected: 'Regn totalt: 18 mm',
          },
          {
            description: 'Kiruna: 3 mm',
            code: "__shown('metric')[-1]",
            expected: 'Regn totalt: 3 mm',
            widgets: { Stad: 'Kiruna' },
          },
        ],
      },
      {
        title: 'De regniga dagarna',
        xp: 30,
        why: 'En kryssruta som filtrerar tabellen låter användaren ställa sin egen fråga – det är skillnaden mellan en rapport och en app.',
        description:
          'Kryssrutan avgör vilka rader som visas i tabellen. Raden under säger hur många det blev.',
        task: 'Uppgift: Lägg till en kryssruta `Bara regniga dagar`. Är den ikryssad är `visa` stadens rader där `regn` är större än 0, annars alla. Visa `visa` med `st.dataframe` och skriv `st.caption("3 av 4 dagar")` med rätt antal.',
        solution: `import streamlit as st
import pandas as pd

df = pd.read_csv("vader.csv")
st.title("Väderpanelen")

stad = st.selectbox("Stad", sorted(df["stad"].unique()))
data = df[df["stad"] == stad]
senaste = int(data["temp"].iloc[-1])
andring = senaste - int(data["temp"].iloc[-2])
st.metric("Temperatur", f"{senaste} °C", f"{andring} °C")

st.line_chart(data.set_index("datum")["temp"])
st.metric("Regn totalt", f"{data['regn'].sum()} mm")

visa = data
if st.checkbox("Bara regniga dagar"):
    visa = data[data["regn"] > 0]
st.dataframe(visa)
st.caption(f"{len(visa)} av {len(data)} dagar")
`,
        hints: [
          'visa = data först.',
          'if st.checkbox("Bara regniga dagar"): visa = data[data["regn"] > 0]',
          'st.dataframe(visa) och st.caption(f"{len(visa)} av {len(data)} dagar")',
        ],
        tests: [
          {
            description: 'Utan kryss: alla 4 dagar',
            code: "__shown('caption')",
            expected: ['4 av 4 dagar'],
          },
          {
            description: 'Göteborg med kryss: 3 av 4 dagar',
            code: "__shown('caption') + __shown('dataframe')",
            expected: ['3 av 4 dagar', 'tabell med 3 rader'],
            widgets: { 'Bara regniga dagar': true },
          },
          {
            description: 'Malmö med kryss: 2 av 4 dagar',
            code: "__shown('caption')",
            expected: ['2 av 4 dagar'],
            widgets: { Stad: 'Malmö', 'Bara regniga dagar': true },
          },
        ],
      },
    ],
  },
];

// Stegen som vanliga övningar, så att samma editor och rättning kan
// användas. Ett steg utan egen startkod börjar med förra stegets lösning.
export const PROJECT_STEPS = projectSteps(PROJECTS, text => `# ${text}`);
