// Bana 2: beställ rätt. Eleven skriver en beställning (prompt) som en
// Python-text. Rättningen kollar att den innehåller delarna en bra
// beställning har: vad, exempel, kantfall, ramar – inte att den är
// "perfekt". Förklaringarna säger det.
const NOTE =
  '\n\nRättningen kollar att beställningen innehåller rätt delar – den läser den inte som en människa. Skriv som till en kollega.';

export const BESTALL = [
  {
    id: 'kmai-11',
    track: 'bestall',
    title: 'Säg vad du vill ha',
    xp: 10,
    description:
      '"Gör en funktion" kan bli vad som helst. Säg exakt vad den ska göra.',
    explain:
      'Assistenten gissar allt du inte säger. En tydlig beställning säger **vad funktionen heter**, **vad den får in** och **vad den ska ge tillbaka**:\n\n_Skriv en Python-funktion `medel(tal)` som får en lista med tal och returnerar medelvärdet._' +
      NOTE,
    example:
      'bestallning = "Skriv en funktion moms(pris) som returnerar priset med 25 % moms."',
    task: 'Uppgift: Skriv en beställning i `bestallning` av en funktion `storst(tal)` som får en lista med tal och returnerar det största. Nämn funktionens namn, att den får en lista och vad den returnerar.',
    starterCode: 'bestallning = "Gör en funktion"\n',
    solution:
      'bestallning = "Skriv en Python-funktion storst(tal) som får en lista med tal och returnerar det största talet."\n',
    hints: [
      'Skriv funktionens namn: storst(tal).',
      'Säg att den får en lista.',
      'Säg vad den returnerar.',
    ],
    tests: [
      {
        description: 'Nämner storst(tal)',
        code: '"storst(tal)" in bestallning',
        expected: true,
      },
      {
        description: 'Säger att den får en lista',
        code: '"lista" in bestallning.lower()',
        expected: true,
      },
      {
        description: 'Säger vad den returnerar',
        code: '"return" in bestallning.lower()',
        expected: true,
      },
    ],
  },
  {
    id: 'kmai-12',
    track: 'bestall',
    title: 'Ge ett exempel',
    xp: 10,
    description: 'Ett exempel säger mer än tio ord.',
    explain:
      'Visa ett **exempel på indata och vad som ska komma ut**. Det tar bort missförstånd direkt:\n\n_Exempel: `kortaste(["hej", "på", "dig"])` ska ge `"på"`._' +
      NOTE,
    example: 'bestallning = "… Exempel: moms(100) ska ge 125."',
    task: 'Uppgift: Beställ en funktion `initialer(namn)` som gör om ett namn till initialer. Ta med ordet `Exempel` och exemplet att `initialer("Ada Lovelace")` ska ge `"AL"`.',
    starterCode:
      'bestallning = "Skriv en funktion initialer(namn) som ger initialerna."\n',
    solution:
      'bestallning = "Skriv en Python-funktion initialer(namn) som returnerar initialerna i ett namn. Exempel: initialer(\\"Ada Lovelace\\") ska ge \\"AL\\"."\n',
    hints: [
      'Lägg till en mening som börjar med Exempel:',
      'Skriv både anropet och svaret.',
      'Citattecken i texten skrivs \\" när texten själv är inom "."',
    ],
    tests: [
      {
        description: 'Har ett exempel',
        code: '"exempel" in bestallning.lower()',
        expected: true,
      },
      {
        description: 'Visar anropet',
        code: '"Ada Lovelace" in bestallning',
        expected: true,
      },
      {
        description: 'Visar svaret',
        code: '"AL" in bestallning',
        expected: true,
      },
    ],
  },
  {
    id: 'kmai-13',
    track: 'bestall',
    title: 'Kantfallen',
    xp: 15,
    description:
      'Vad ska hända med en tom lista? Assistenten gissar – om du inte säger det.',
    explain:
      '**Kantfall** är de konstiga fallen: tom lista, noll, negativa tal, tom text. Det är där koden oftast går sönder.\n\nSäg vad som ska hända: _Om listan är tom ska funktionen returnera `None`._' +
      NOTE,
    example: 'bestallning = "… Om listan är tom ska den returnera 0."',
    task: 'Uppgift: Beställ `medel(tal)` som returnerar medelvärdet av en lista. Säg att den ska returnera `None` om listan är tom.',
    starterCode:
      'bestallning = "Skriv en funktion medel(tal) som returnerar medelvärdet."\n',
    solution:
      'bestallning = "Skriv en Python-funktion medel(tal) som får en lista med tal och returnerar medelvärdet. Om listan är tom ska den returnera None."\n',
    hints: [
      'Vad händer med en tom lista?',
      'Skriv ordet tom.',
      'Säg att den ska returnera None då.',
    ],
    tests: [
      {
        description: 'Nämner den tomma listan',
        code: '"tom" in bestallning.lower()',
        expected: true,
      },
      {
        description: 'Säger vad som ska hända',
        code: '"None" in bestallning',
        expected: true,
      },
    ],
  },
  {
    id: 'kmai-14',
    track: 'bestall',
    title: 'En sak i taget',
    xp: 15,
    description:
      'Be om en hel app på en gång, och du får en hel app du inte förstår.',
    explain:
      'Stora beställningar ger stora svar fulla av saker du inte bett om. Dela upp:\n\n1. Läs in filen.\n2. Räkna ut summan.\n3. Skriv ut resultatet.\n\nBe om en bit, läs och testa den, och be sedan om nästa.',
    example: 'delar = ["Läs in filen", "Räkna summan"]',
    task: 'Uppgift: Dela upp beställningen _"Gör ett program som läser betyg från en fil, räknar snittet och skriver ut vem som har högst"_ i en lista `delar` med tre mindre beställningar.',
    starterCode: 'delar = []\n',
    solution:
      'delar = [\n    "Skriv en funktion som läser betygen från en fil och returnerar en lista.",\n    "Skriv en funktion som räknar snittet av en lista med betyg.",\n    "Skriv en funktion som returnerar namnet på den med högst betyg.",\n]\n',
    hints: [
      'Tre delar: läsa, räkna snitt, hitta högst.',
      'En text per del i listan.',
      'delar = ["…", "…", "…"]',
    ],
    tests: [
      { description: 'Tre delar', code: 'len(delar)', expected: 3 },
      {
        description: 'Varje del är en egen beställning',
        code: 'all(isinstance(d, str) and len(d) > 15 for d in delar)',
        expected: true,
      },
    ],
  },
  {
    id: 'kmai-15',
    track: 'bestall',
    title: 'Ramarna',
    xp: 10,
    description: 'Vilket språk? Får den använda bibliotek? Säg det.',
    explain:
      'Säg vilka **ramar** som gäller: språket, versionen och vad den inte får använda. Annars kan du få JavaScript när du ville ha Python, eller ett bibliotek du inte har.\n\n_I Python, utan bibliotek, och bara med det vi lärt oss: loopar och listor._' +
      NOTE,
    example: 'bestallning = "… Använd Python och inga bibliotek."',
    task: 'Uppgift: Beställ `rakna_vokaler(text)`. Säg att den ska vara i Python och att den inte får använda några bibliotek (skriv `utan bibliotek`).',
    starterCode: 'bestallning = "Skriv rakna_vokaler(text)."\n',
    solution:
      'bestallning = "Skriv en funktion rakna_vokaler(text) i Python, utan bibliotek, som returnerar hur många vokaler texten har."\n',
    hints: [
      'Nämn Python.',
      'Skriv utan bibliotek.',
      'Säg också vad den returnerar.',
    ],
    tests: [
      {
        description: 'Nämner Python',
        code: '"python" in bestallning.lower()',
        expected: true,
      },
      {
        description: 'Säger utan bibliotek',
        code: '"utan bibliotek" in bestallning.lower()',
        expected: true,
      },
    ],
  },
  {
    id: 'kmai-16',
    track: 'bestall',
    title: 'Visa din kod',
    xp: 15,
    description: 'Ska assistenten ändra din kod? Klistra in den.',
    explain:
      'Assistenten ser bara det du visar. Ska den laga eller bygga vidare på din kod: **klistra in koden** och säg vad den ska ändra – och vad den ska låta vara.\n\n_Här är min funktion: … Lägg till att den hoppar över tomma rader. Ändra inget annat._' +
      NOTE,
    example: 'bestallning = f"Här är min kod:\\n{kod}\\nLägg till …"',
    task: 'Uppgift: Bygg `bestallning` med en f-sträng: texten `Här är min funktion:`, sedan koden i `kod`, och sist `Gör så att den fungerar för negativa tal. Ändra inget annat.`',
    starterCode:
      'kod = "def dubbla(x):\\n    return x + x"\nbestallning = ""\n',
    solution:
      'kod = "def dubbla(x):\\n    return x + x"\nbestallning = f"Här är min funktion:\\n{kod}\\nGör så att den fungerar för negativa tal. Ändra inget annat."\n',
    hints: [
      'En f-sträng: f"…{kod}…"',
      'Börja med Här är min funktion:',
      'Sluta med Ändra inget annat.',
    ],
    tests: [
      {
        description: 'Koden är med',
        code: 'kod in bestallning',
        expected: true,
      },
      {
        description: 'Säger vad som ska ändras',
        code: '"negativa" in bestallning',
        expected: true,
      },
      {
        description: 'Säger vad som inte ska ändras',
        code: '"Ändra inget annat" in bestallning',
        expected: true,
      },
    ],
  },
  {
    id: 'kmai-17',
    track: 'bestall',
    title: 'Be om tester',
    xp: 15,
    description: 'Be assistenten visa hur du kan veta att koden fungerar.',
    explain:
      'Be om **testfall** tillsammans med koden: ett par vanliga exempel och kantfallen. Då ser du direkt om assistenten tänkt på samma saker som du – och du kan köra dem.\n\n_Ge också tre testfall med assert, varav ett för en tom lista._' +
      NOTE,
    example: 'bestallning = "… och tre testfall med assert."',
    task: 'Uppgift: Beställ `summa_jamna(tal)` som returnerar summan av de jämna talen i en lista. Be om testfall med `assert`, och att ett av dem ska gälla en tom lista.',
    starterCode: 'bestallning = "Skriv summa_jamna(tal)."\n',
    solution:
      'bestallning = "Skriv en Python-funktion summa_jamna(tal) som returnerar summan av de jämna talen i en lista. Ge också tre testfall med assert, varav ett för en tom lista."\n',
    hints: ['Be om testfall.', 'Skriv assert.', 'Nämn den tomma listan.'],
    tests: [
      {
        description: 'Ber om testfall',
        code: '"test" in bestallning.lower()',
        expected: true,
      },
      {
        description: 'Nämner assert',
        code: '"assert" in bestallning',
        expected: true,
      },
      {
        description: 'Nämner den tomma listan',
        code: '"tom" in bestallning.lower()',
        expected: true,
      },
    ],
  },
  {
    id: 'kmai-18',
    track: 'bestall',
    title: 'Be om en förklaring',
    xp: 10,
    description:
      'Förstår du inte svaret? Fråga – det är det assistenten är bäst på.',
    explain:
      'Be assistenten **förklara** koden rad för rad, med enkla ord, eller förklara ett begrepp den använde. Det är ett av de bästa sätten att lära sig med AI.\n\n_Förklara rad för rad vad den här koden gör, som för en nybörjare._' +
      NOTE,
    example: 'fraga = "Förklara vad … gör"',
    task: 'Uppgift: Skriv en fråga i `fraga` som ber assistenten förklara `sorted(namn, key=len)` rad för rad, för en nybörjare.',
    starterCode: 'fraga = ""\n',
    solution:
      'fraga = "Förklara rad för rad vad sorted(namn, key=len) gör, för en nybörjare."\n',
    hints: [
      'Börja med Förklara.',
      'Ta med koden.',
      'Säg rad för rad och för en nybörjare.',
    ],
    tests: [
      {
        description: 'Ber om en förklaring',
        code: '"förklara" in fraga.lower()',
        expected: true,
      },
      {
        description: 'Koden är med',
        code: '"sorted(namn, key=len)" in fraga',
        expected: true,
      },
      {
        description: 'För en nybörjare',
        code: '"nybörjare" in fraga.lower()',
        expected: true,
      },
    ],
  },
  {
    id: 'kmai-19',
    track: 'bestall',
    title: 'Laga en dålig beställning',
    xp: 20,
    description:
      'Den här beställningen kommer att ge ett dåligt svar. Skriv om den.',
    explain:
      'Allt från banan på en gång: **vad** (namn, indata, utdata), **exempel**, **kantfall** och **ramar**.\n\nEn bra beställning är ofta tre–fem meningar. Det tar en minut att skriva och sparar tio minuter av att laga fel svar.' +
      NOTE,
    example: '',
    task: 'Uppgift: Skriv om `"fixa en funktion för lösenord"` till en bra beställning av `starkt(losenord)`, som returnerar `True` om lösenordet har minst 12 tecken och minst en siffra. Ta med ett exempel, ett kantfall (tom text) och att den ska vara i Python.',
    starterCode: 'bestallning = "fixa en funktion för lösenord"\n',
    solution:
      'bestallning = "Skriv en Python-funktion starkt(losenord) som returnerar True om lösenordet har minst 12 tecken och minst en siffra, annars False. Exempel: starkt(\\"kanelbulle2026\\") ska ge True. Om lösenordet är en tom text ska den returnera False."\n',
    hints: [
      'Namn, vad den får och vad den returnerar.',
      'Exempel: … ska ge True.',
      'Kantfallet: en tom text.',
    ],
    tests: [
      {
        description: 'Nämner starkt(losenord)',
        code: '"starkt(losenord)" in bestallning',
        expected: true,
      },
      {
        description: 'Säger reglerna',
        code: '"12" in bestallning and "siffra" in bestallning',
        expected: true,
      },
      {
        description: 'Har ett exempel',
        code: '"exempel" in bestallning.lower()',
        expected: true,
      },
      {
        description: 'Har kantfallet',
        code: '"tom" in bestallning.lower()',
        expected: true,
      },
      {
        description: 'Nämner Python',
        code: '"python" in bestallning.lower()',
        expected: true,
      },
    ],
  },
];
