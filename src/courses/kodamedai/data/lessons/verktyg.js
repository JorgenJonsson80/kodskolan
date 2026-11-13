// Bana 1: AI-verktygen. Vad en AI-assistent är, vilka sorter som finns,
// vad man får skicka till den och vem som ansvarar för koden. Eleven
// svarar genom att fylla i Python-variabler, som rättas med tester.
export const VERKTYG = [
  {
    id: 'kmai-01',
    track: 'verktyg',
    title: 'Vad är en AI-assistent?',
    xp: 10,
    description:
      'En AI-assistent skriver kod åt dig när du beskriver vad du vill ha. Men vad är den egentligen?',
    explain:
      'Assistenter som Claude, ChatGPT och Copilot bygger på **språkmodeller**: program som har läst enorma mängder text och kod, och som skriver det som mest sannolikt kommer härnäst.\n\nDärför är de bra på vanlig kod de sett många gånger – och kan låta lika säkra när de har fel. De **förstår inte** ditt projekt om du inte berättar om det, och de kan inte köra koden i huvudet.',
    example: 'svar = {"Kan läsa min dator utan att jag visar något": False}',
    task: 'Uppgift: Byt `None` mot `True` eller `False`: stämmer påståendet om en AI-assistent?',
    starterCode:
      'stammer = {\n    "Den kan skriva vanlig kod snabbt": None,\n    "Den vet alltid om koden fungerar": None,\n    "Den kan låta säker fast den har fel": None,\n    "Den känner till mitt projekt utan att jag berättar": None,\n}\n',
    solution:
      'stammer = {\n    "Den kan skriva vanlig kod snabbt": True,\n    "Den vet alltid om koden fungerar": False,\n    "Den kan låta säker fast den har fel": True,\n    "Den känner till mitt projekt utan att jag berättar": False,\n}\n',
    hints: [
      'Den skriver det som sannolikt kommer härnäst – den kör inte koden.',
      'Säker ton betyder inte rätt svar.',
      'Den vet bara det du har visat den.',
    ],
    tests: [
      {
        description: 'Rätt på alla fyra',
        code: 'list(stammer.values())',
        expected: [true, false, true, false],
      },
    ],
  },
  {
    id: 'kmai-02',
    track: 'verktyg',
    title: 'Olika sorters verktyg',
    xp: 10,
    description:
      'Det finns tre huvudsorter av AI-verktyg för kod. Para ihop dem.',
    explain:
      '- **Chatt** (Claude, ChatGPT): du beskriver, den svarar med kod som du kopierar.\n- **I editorn** (Copilot, Cursor): förslag dyker upp medan du skriver, och du kan be om ändringar i filen.\n- **Agent** (Claude Code, Codex): den läser projektet, ändrar flera filer och kör kommandon själv – du godkänner stegen.\n\nJu mer verktyget gör själv, desto viktigare är det att du granskar.',
    example: 'sort = {"Claude i webbläsaren": "chatt"}',
    task: 'Uppgift: Byt `None` mot `"chatt"`, `"editor"` eller `"agent"`.',
    starterCode:
      'sort = {\n    "Föreslår nästa rad medan du skriver": None,\n    "Du klistrar in en fråga och kopierar svaret": None,\n    "Ändrar flera filer och kör testerna själv": None,\n}\n',
    solution:
      'sort = {\n    "Föreslår nästa rad medan du skriver": "editor",\n    "Du klistrar in en fråga och kopierar svaret": "chatt",\n    "Ändrar flera filer och kör testerna själv": "agent",\n}\n',
    hints: [
      'Förslag medan du skriver: i editorn.',
      'Fråga och svar: chatt.',
      'Gör saker själv i projektet: agent.',
    ],
    tests: [
      {
        description: 'Rätt sort för alla tre',
        code: 'list(sort.values())',
        expected: ['editor', 'chatt', 'agent'],
      },
    ],
  },
  {
    id: 'kmai-03',
    track: 'verktyg',
    title: 'Vad får du skicka?',
    xp: 15,
    description:
      'Allt du klistrar in skickas till ett företags servrar. Vad är okej?',
    explain:
      'Det du skriver till en AI-tjänst lämnar din dator. Skicka aldrig:\n\n- **lösenord, API-nycklar och hemligheter** (`.env`-filer!)\n- **personuppgifter** om andra: kunders namn, adresser, personnummer\n- **företagshemligheter**, om din arbetsgivare inte godkänt verktyget\n\nKod du skrivit själv, felmeddelanden och påhittade exempel är oftast helt okej.',
    example: 'ok = {"Ett felmeddelande": True}',
    task: 'Uppgift: Byt `None` mot `True` (okej att skicka) eller `False`.',
    starterCode:
      'ok = {\n    "Min egen kod för en övning": None,\n    "Filen .env med API-nyckeln": None,\n    "Ett felmeddelande från Python": None,\n    "En lista med kundernas namn och telefonnummer": None,\n    "Påhittade exempeldata": None,\n}\n',
    solution:
      'ok = {\n    "Min egen kod för en övning": True,\n    "Filen .env med API-nyckeln": False,\n    "Ett felmeddelande från Python": True,\n    "En lista med kundernas namn och telefonnummer": False,\n    "Påhittade exempeldata": True,\n}\n',
    hints: [
      'Hemligheter och nycklar: aldrig.',
      'Personuppgifter om andra: aldrig.',
      'Egen kod, fel och påhittat: okej.',
    ],
    tests: [
      {
        description: 'Rätt på alla fem',
        code: 'list(ok.values())',
        expected: [true, false, true, false, true],
      },
    ],
  },
  {
    id: 'kmai-04',
    track: 'verktyg',
    title: 'Påhittade saker',
    xp: 15,
    description:
      'Ibland hittar assistenten på en funktion som inte finns – och låter helt säker.',
    explain:
      'Det kallas att **hallucinera**. Assistenten skriver något som _ser ut_ som rätt kod: en funktion med ett rimligt namn, ett bibliotek som borde finnas.\n\nKör man koden blir det ett fel som `AttributeError` eller `ModuleNotFoundError`. Kör den här koden och se: `str` har ingen `reverse`.',
    example: 'text = "hej"\nprint(text[::-1])',
    task: 'Uppgift: Assistenten föreslog `text.reverse()` för att vända en text. Kör koden, se felet, och laga den så att `baklanges` blir texten baklänges (med `[::-1]`).',
    starterCode:
      '# Assistentens förslag:\ntext = "Kodskolan"\nbaklanges = text.reverse()\nprint(baklanges)\n',
    solution: 'text = "Kodskolan"\nbaklanges = text[::-1]\nprint(baklanges)\n',
    hints: [
      'Kör koden först och läs felet.',
      'Text har ingen reverse – men slicing fungerar.',
      'baklanges = text[::-1]',
    ],
    tests: [
      {
        description: 'baklanges är "naloksdoK"',
        code: 'baklanges',
        expected: 'naloksdoK',
      },
    ],
    sourceChecks: [
      {
        description: 'Använder inte .reverse()',
        pattern: /\.reverse\(/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'kmai-05',
    track: 'verktyg',
    title: 'Vem är ansvarig?',
    xp: 10,
    description: 'Koden fungerade inte i produktion. Vems fel är det?',
    explain:
      'Använder du kod från en assistent är den **din kod**. Du ansvarar för att den gör rätt, är säker och går att förstå – precis som om du skrivit den själv.\n\nTumregel: committa aldrig kod du inte kan förklara.',
    example: 'ansvarig = "?"',
    task: 'Uppgift: Sätt `ansvarig` till `"jag"`, `"assistenten"` eller `"företaget som gjort AI:n"`. Sätt `committa_okand_kod` till `True` eller `False`: är det okej att committa kod du inte förstår?',
    starterCode: 'ansvarig = None\ncommitta_okand_kod = None\n',
    solution: 'ansvarig = "jag"\ncommitta_okand_kod = False\n',
    hints: [
      'Vem bestämde att koden skulle användas?',
      'Det är din kod när du använder den.',
      'Kod du inte förstår kan du inte ansvara för.',
    ],
    tests: [
      { description: 'ansvarig', code: 'ansvarig', expected: 'jag' },
      {
        description: 'committa_okand_kod',
        code: 'committa_okand_kod',
        expected: false,
      },
    ],
  },
  {
    id: 'kmai-06',
    track: 'verktyg',
    title: 'Paket som inte finns',
    xp: 15,
    description:
      'Assistenten föreslår pip install på ett paket. Kolla innan du installerar.',
    explain:
      'Ibland föreslår assistenten ett paket som **inte finns**. Elaka personer har börjat registrera sådana påhittade namn med skadlig kod i – så att den som litar blint installerar den.\n\nKolla alltid att paketet finns, är välkänt och används av många, till exempel på pypi.org eller npmjs.com, innan du installerar.',
    example: 'kolla_forst = True',
    task: 'Uppgift: Byt `None` mot `True` eller `False`: är det ett bra skäl att lita på paketet?',
    starterCode:
      'bra_skal = {\n    "Assistenten föreslog det": None,\n    "Det har miljontals nedladdningar och en känd utvecklare": None,\n    "Namnet låter rimligt": None,\n    "Dokumentationen finns på den officiella sidan": None,\n}\n',
    solution:
      'bra_skal = {\n    "Assistenten föreslog det": False,\n    "Det har miljontals nedladdningar och en känd utvecklare": True,\n    "Namnet låter rimligt": False,\n    "Dokumentationen finns på den officiella sidan": True,\n}\n',
    hints: [
      'Påhittade paket har ofta rimliga namn.',
      'Att assistenten föreslog det bevisar inget.',
      'Kolla användning och officiella källor.',
    ],
    tests: [
      {
        description: 'Rätt på alla fyra',
        code: 'list(bra_skal.values())',
        expected: [false, true, false, true],
      },
    ],
  },
  {
    id: 'kmai-07',
    track: 'verktyg',
    title: 'Agenter: godkänn stegen',
    xp: 15,
    description:
      'En agent vill köra kommandon i ditt projekt. Vilka ska du titta extra noga på?',
    explain:
      'En agent kan köra kommandon i terminalen. De flesta är ofarliga – men vissa går inte att ångra.\n\nTitta extra noga innan du godkänner sådant som **tar bort** (`rm -r`), **skriver över historiken** (`git push --force`), **skickar ut** något (`git push`, mejl, betalningar) eller **installerar** paket.',
    example: 'farligt = {"ls": False}',
    task: 'Uppgift: Byt `None` mot `True` om kommandot ska granskas extra noga, annars `False`.',
    starterCode:
      'granska_noga = {\n    "ls": None,\n    "rm -r src": None,\n    "git status": None,\n    "git push --force": None,\n    "pip install okant-paket": None,\n    "cat README.md": None,\n}\n',
    solution:
      'granska_noga = {\n    "ls": False,\n    "rm -r src": True,\n    "git status": False,\n    "git push --force": True,\n    "pip install okant-paket": True,\n    "cat README.md": False,\n}\n',
    hints: [
      'Att titta (ls, cat, git status) är ofarligt.',
      'Att ta bort och skriva över går inte att ångra.',
      'Installera okända paket: granska.',
    ],
    tests: [
      {
        description: 'Rätt på alla sex',
        code: 'list(granska_noga.values())',
        expected: [false, true, false, true, true, false],
      },
    ],
  },
  {
    id: 'kmai-08',
    track: 'verktyg',
    title: 'Lär dig – eller bara bli klar?',
    xp: 10,
    description: 'AI kan göra läxan åt dig. Men vad lär du dig då?',
    explain:
      'När du lär dig koda är målet att **du** ska kunna. Låter du AI skriva allt blir du klar fortare – men kan inte mer efteråt.\n\nBra sätt att använda AI när du lär dig: be om en förklaring, en ledtråd eller ett liknande exempel. Be den granska **din** kod. Skriv sedan själv.',
    example: 'bra = "Förklara vad en for-loop gör"',
    task: 'Uppgift: Byt `None` mot `True` om det hjälper dig att lära dig, annars `False`.',
    starterCode:
      'lar_mig = {\n    "Skriv hela uppgiften åt mig": None,\n    "Förklara varför min loop aldrig tar slut": None,\n    "Ge mig en ledtråd, inte svaret": None,\n    "Granska min lösning och säg vad som kan bli bättre": None,\n}\n',
    solution:
      'lar_mig = {\n    "Skriv hela uppgiften åt mig": False,\n    "Förklara varför min loop aldrig tar slut": True,\n    "Ge mig en ledtråd, inte svaret": True,\n    "Granska min lösning och säg vad som kan bli bättre": True,\n}\n',
    hints: [
      'Vem gör tänkandet?',
      'Förklaringar och ledtrådar låter dig tänka själv.',
      'Färdiga svar gör det inte.',
    ],
    tests: [
      {
        description: 'Rätt på alla fyra',
        code: 'list(lar_mig.values())',
        expected: [false, true, true, true],
      },
    ],
  },
  {
    id: 'kmai-09',
    track: 'verktyg',
    title: 'Ditt arbetssätt',
    xp: 15,
    description: 'Sätt stegen i rätt ordning – så jobbar proffsen med AI.',
    explain:
      'Ett bra arbetssätt med AI-assistenter:\n\n1. **Beställ** tydligt: vad, med exempel och kantfall.\n2. **Läs** koden du får, rad för rad.\n3. **Testa** den med egna exempel.\n4. **Laga** eller be om ändringar.\n5. **Committa** när du förstår och har testat.\n\nResten av kursen tränar varje steg.',
    example: 'steg = ["…"]',
    task: 'Uppgift: Sätt stegen `"laga"`, `"testa"`, `"beställ"`, `"committa"` och `"läs"` i rätt ordning i listan `steg`.',
    starterCode: 'steg = ["laga", "testa", "beställ", "committa", "läs"]\n',
    solution: 'steg = ["beställ", "läs", "testa", "laga", "committa"]\n',
    hints: [
      'Först måste du be om något.',
      'Läs innan du testar.',
      'Committa sist.',
    ],
    tests: [
      {
        description: 'Stegen i rätt ordning',
        code: 'steg',
        expected: ['beställ', 'läs', 'testa', 'laga', 'committa'],
      },
    ],
  },
];
