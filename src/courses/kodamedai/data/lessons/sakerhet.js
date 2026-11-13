// Bana 6: säker kod. AI-assistenter skriver gärna kod som fungerar men är
// osäker: hemligheter i koden, SQL-injektion, indata som inte kontrolleras,
// lösenord i klartext och eval. Eleven lagar, och testerna prövar attacken.
const AI = '# Assistentens förslag – fungerar, men är inte säkert:\n';

export const SAKERHET = [
  {
    id: 'kmai-51',
    track: 'sakerhet',
    title: 'Nyckeln i koden',
    xp: 15,
    description:
      'Assistenten skrev in API-nyckeln direkt i koden. Den hamnar i Git – och på GitHub.',
    explain:
      'Hemligheter ska **aldrig** stå i koden. Allt i koden hamnar i Git, och kanske på GitHub där vem som helst kan läsa.\n\nLäs dem i stället från en **miljövariabel**, som sätts utanför koden (t.ex. i en `.env`-fil som ligger i `.gitignore`):\n\n```\nimport os\nnyckel = os.environ.get("API_KEY")\n```',
    example: 'import os\nprint(os.environ.get("HOME"))',
    task: 'Uppgift: Ta bort nyckeln ur koden. `hamta_nyckel()` ska läsa den från miljövariabeln `API_KEY` med `os.environ.get`.',
    starterCode: `${AI}def hamta_nyckel():\n    return "sk-hemlig-123456"\n`,
    solution:
      'import os\n\ndef hamta_nyckel():\n    return os.environ.get("API_KEY")\n',
    hints: [
      'import os',
      'os.environ.get("API_KEY")',
      'Ta bort texten sk-… helt.',
    ],
    tests: [
      {
        description: 'Läser från miljön',
        code: '(lambda: (os.environ.__setitem__("API_KEY", "test"), hamta_nyckel())[1])()',
        expected: 'test',
      },
    ],
    sourceChecks: [
      {
        description: 'Nyckeln står inte i koden',
        pattern: /sk-hemlig/,
        forbidden: true,
      },
      { description: 'Använder os.environ', pattern: /os\.environ/ },
    ],
  },
  {
    id: 'kmai-52',
    track: 'sakerhet',
    title: 'SQL-injektion',
    xp: 20,
    description: 'Skriver någon rätt "namn" visas hela tabellen. Laga hålet.',
    explain:
      "Assistenten byggde SQL-frågan med en f-sträng. Då kan den som skriver namnet skriva **SQL** i stället: `' OR '1'='1` gör villkoret sant för alla rader. Det kallas **SQL-injektion** och är ett av de vanligaste säkerhetshålen.\n\nLåt databasen sätta in värdet med `?`:\n\n```\ndb.execute(\"SELECT * FROM kunder WHERE namn = ?\", (namn,))\n```",
    example: 'db.execute("SELECT * FROM t WHERE id = ?", (id,))',
    task: 'Uppgift: Laga `hitta(namn)` så att den använder `?` i stället för en f-sträng.',
    starterCode: `import sqlite3\n\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE kunder (namn TEXT, kort TEXT)")\ndb.execute("INSERT INTO kunder VALUES ('Ada', '1111'), ('Bo', '2222')")\n\n${AI}def hitta(namn):\n    return db.execute(f"SELECT * FROM kunder WHERE namn = '{namn}'").fetchall()\n`,
    solution: `import sqlite3\n\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE kunder (namn TEXT, kort TEXT)")\ndb.execute("INSERT INTO kunder VALUES ('Ada', '1111'), ('Bo', '2222')")\n\ndef hitta(namn):\n    return db.execute("SELECT * FROM kunder WHERE namn = ?", (namn,)).fetchall()\n`,
    hints: [
      'Byt f-strängen mot en vanlig text med ? där namnet ska stå.',
      'Skicka värdet som en tuple: (namn,)',
      'db.execute("… WHERE namn = ?", (namn,))',
    ],
    tests: [
      {
        description: 'Hittar Ada',
        code: '[list(rad) for rad in hitta("Ada")]',
        expected: [['Ada', '1111']],
      },
      {
        description: 'Attacken ger inga rader',
        code: "hitta(\"' OR '1'='1\")",
        expected: [],
      },
    ],
    sourceChecks: [
      {
        description: 'Ingen f-sträng i frågan',
        pattern: /execute\(f["']/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'kmai-53',
    track: 'sakerhet',
    title: 'Lita aldrig på indata',
    xp: 15,
    description: 'Vad händer om någon skriver "abc" eller -5 som ålder?',
    explain:
      'Allt som kommer från en användare – formulär, adresser, filer – kan vara **vad som helst**: fel, tomt eller elakt. Kontrollera det innan du använder det.\n\n`try` och `except ValueError` fångar text som inte är ett tal.',
    example: 'try:\n    tal = int(text)\nexcept ValueError:\n    return None',
    task: 'Uppgift: `las_alder(text)` ska returnera åldern som tal, eller `None` om texten inte är ett tal eller om åldern inte är mellan 0 och 130.',
    starterCode: `${AI}def las_alder(text):\n    return int(text)\n`,
    solution:
      'def las_alder(text):\n    try:\n        alder = int(text)\n    except ValueError:\n        return None\n    if alder < 0 or alder > 130:\n        return None\n    return alder\n',
    hints: [
      'try: alder = int(text)',
      'except ValueError: return None',
      'Kolla också att 0 <= alder <= 130.',
    ],
    tests: [
      { description: '"42" ger 42', code: 'las_alder("42")', expected: 42 },
      {
        description: '"abc" ger None',
        code: 'las_alder("abc")',
        expected: null,
      },
      { description: '"-5" ger None', code: 'las_alder("-5")', expected: null },
      {
        description: '"999" ger None',
        code: 'las_alder("999")',
        expected: null,
      },
    ],
  },
  {
    id: 'kmai-54',
    track: 'sakerhet',
    title: 'Lösenord i klartext',
    xp: 15,
    description:
      'Assistenten sparar lösenorden som de är. Läcker databasen läcker alla lösenord.',
    explain:
      'Spara aldrig lösenord som de är. Spara en **hash**: ett fingeravtryck som inte går att räkna tillbaka. När någon loggar in hashar man det de skrev och jämför fingeravtrycken.\n\nHär använder vi `hashlib.sha256` för att visa idén. I riktiga system används långsamma hash-funktioner gjorda för lösenord, som bcrypt eller argon2 – fråga gärna assistenten om dem.',
    example:
      'import hashlib\nprint(hashlib.sha256("hej".encode()).hexdigest())',
    task: 'Uppgift: `spara(losenord)` ska returnera sha256-hashen av lösenordet (`hashlib.sha256(losenord.encode()).hexdigest()`), och `ratt(losenord, sparad)` ska jämföra genom att hasha det som skrevs.',
    starterCode: `${AI}def spara(losenord):\n    return losenord\n\ndef ratt(losenord, sparad):\n    return losenord == sparad\n`,
    solution:
      'import hashlib\n\ndef spara(losenord):\n    return hashlib.sha256(losenord.encode()).hexdigest()\n\ndef ratt(losenord, sparad):\n    return spara(losenord) == sparad\n',
    hints: [
      'import hashlib',
      'hashlib.sha256(losenord.encode()).hexdigest()',
      'ratt hashar det som skrevs och jämför: spara(losenord) == sparad',
    ],
    tests: [
      {
        description: 'Lösenordet sparas inte som det är',
        code: 'spara("kanel123") != "kanel123"',
        expected: true,
      },
      {
        description: 'Hashen är 64 tecken',
        code: 'len(spara("kanel123"))',
        expected: 64,
      },
      {
        description: 'Rätt lösenord godkänns',
        code: 'ratt("kanel123", spara("kanel123"))',
        expected: true,
      },
      {
        description: 'Fel lösenord nekas',
        code: 'ratt("fel", spara("kanel123"))',
        expected: false,
      },
    ],
  },
  {
    id: 'kmai-55',
    track: 'sakerhet',
    title: 'Slump som går att gissa',
    xp: 15,
    description:
      'En kod för att återställa lösenordet måste vara omöjlig att gissa.',
    explain:
      '`random` är gjord för spel och simuleringar – den går att förutsäga. För säkerhet (koder, nycklar, lösenord) finns **`secrets`**:\n\n```\nimport secrets\nkod = secrets.token_hex(16)\n```\n\nDet ger 32 slumpade tecken som inte går att räkna ut.',
    example: 'import secrets\nprint(secrets.token_hex(8))',
    task: 'Uppgift: Laga `aterstallningskod()` så att den använder `secrets.token_hex(16)`.',
    starterCode: `${AI}import random\n\ndef aterstallningskod():\n    return str(random.randint(1000, 9999))\n`,
    solution:
      'import secrets\n\ndef aterstallningskod():\n    return secrets.token_hex(16)\n',
    hints: ['import secrets', 'secrets.token_hex(16)', 'Ta bort random.'],
    tests: [
      {
        description: 'Koden är 32 tecken',
        code: 'len(aterstallningskod())',
        expected: 32,
      },
      {
        description: 'Två koder är olika',
        code: 'aterstallningskod() != aterstallningskod()',
        expected: true,
      },
    ],
    sourceChecks: [
      { description: 'Använder secrets', pattern: /secrets\.token/ },
      {
        description: 'Använder inte random',
        pattern: /random\./,
        forbidden: true,
      },
    ],
  },
  {
    id: 'kmai-56',
    track: 'sakerhet',
    title: 'Säg inte för mycket',
    xp: 15,
    description: 'Felmeddelandet avslöjar vilka användarnamn som finns.',
    explain:
      'Säger inloggningen "Användaren finns inte" kan en angripare pröva sig fram till vilka konton som finns. Ge **samma meddelande** för fel användarnamn och fel lösenord:\n\n_Fel användarnamn eller lösenord._',
    example: 'return "Fel användarnamn eller lösenord"',
    task: 'Uppgift: Laga `logga_in(namn, losenord)` så att den ger `"Fel användarnamn eller lösenord"` i båda felfallen, och `"Välkommen"` när allt stämmer.',
    starterCode: `ANVANDARE = {"ada": "kanel123"}\n\n${AI}def logga_in(namn, losenord):\n    if namn not in ANVANDARE:\n        return "Användaren finns inte"\n    if ANVANDARE[namn] != losenord:\n        return "Fel lösenord"\n    return "Välkommen"\n`,
    solution:
      'ANVANDARE = {"ada": "kanel123"}\n\ndef logga_in(namn, losenord):\n    if ANVANDARE.get(namn) != losenord:\n        return "Fel användarnamn eller lösenord"\n    return "Välkommen"\n',
    hints: [
      'Båda felen ska ge samma text.',
      'ANVANDARE.get(namn) ger None om namnet saknas.',
      'if ANVANDARE.get(namn) != losenord: return "Fel användarnamn eller lösenord"',
    ],
    tests: [
      {
        description: 'Okänt namn',
        code: 'logga_in("bo", "x")',
        expected: 'Fel användarnamn eller lösenord',
      },
      {
        description: 'Fel lösenord',
        code: 'logga_in("ada", "x")',
        expected: 'Fel användarnamn eller lösenord',
      },
      {
        description: 'Rätt',
        code: 'logga_in("ada", "kanel123")',
        expected: 'Välkommen',
      },
    ],
  },
  {
    id: 'kmai-57',
    track: 'sakerhet',
    title: 'Sökvägar från användaren',
    xp: 15,
    description: 'Med "../" kan man läsa filer utanför mappen.',
    explain:
      'Låter du användaren välja ett filnamn kan de skriva `../hemligt.txt` och ta sig ut ur mappen. Det kallas **path traversal**.\n\nTillåt bara enkla namn: inga `/`, inga `\\` och inga `..`.',
    example: 'if ".." in namn:\n    return None',
    task: 'Uppgift: Laga `sakert_namn(namn)` så att den returnerar `None` om namnet innehåller `..`, `/` eller `\\`, och annars namnet.',
    starterCode: `${AI}def sakert_namn(namn):\n    return namn\n`,
    solution:
      'def sakert_namn(namn):\n    if ".." in namn or "/" in namn or "\\\\" in namn:\n        return None\n    return namn\n',
    hints: [
      'Kolla tre saker: .., / och \\\\',
      'if ".." in namn or "/" in namn …',
      'Returnera None då.',
    ],
    tests: [
      {
        description: 'Vanligt namn går igenom',
        code: 'sakert_namn("bild.jpg")',
        expected: 'bild.jpg',
      },
      {
        description: '../ stoppas',
        code: 'sakert_namn("../hemligt.txt")',
        expected: null,
      },
      {
        description: 'Sökväg stoppas',
        code: 'sakert_namn("/etc/passwd")',
        expected: null,
      },
      {
        description: 'Bakåtsnedstreck stoppas',
        code: 'sakert_namn("a\\\\b")',
        expected: null,
      },
    ],
  },
  {
    id: 'kmai-58',
    track: 'sakerhet',
    title: 'eval är farligt',
    xp: 20,
    description:
      'Assistentens miniräknare kör vad som helst som användaren skriver.',
    explain:
      '`eval(text)` kör texten som Python-kod. Skriver användaren `__import__("os").remove("viktig.txt")` i stället för `2+3` körs det. Använd **aldrig** `eval` på indata.\n\nGör i stället en tabell över vad som är tillåtet.',
    example: 'RAKNESATT = {"+": lambda a, b: a + b}',
    task: 'Uppgift: Skriv om `rakna(a, tecken, b)` utan `eval`, med en dictionary för `+`, `-`, `*` och `/`. Okända tecken ska ge `None`.',
    starterCode: `${AI}def rakna(a, tecken, b):\n    return eval(f"{a} {tecken} {b}")\n`,
    solution:
      'RAKNESATT = {\n    "+": lambda a, b: a + b,\n    "-": lambda a, b: a - b,\n    "*": lambda a, b: a * b,\n    "/": lambda a, b: a / b,\n}\n\ndef rakna(a, tecken, b):\n    if tecken not in RAKNESATT:\n        return None\n    return RAKNESATT[tecken](a, b)\n',
    hints: [
      'En dictionary från tecken till en funktion.',
      '"+": lambda a, b: a + b',
      'Okänt tecken: return None.',
    ],
    tests: [
      { description: '2 + 3 är 5', code: 'rakna(2, "+", 3)', expected: 5 },
      { description: '6 / 3 är 2', code: 'rakna(6, "/", 3)', expected: 2 },
      {
        description: 'Okänt tecken ger None',
        code: 'rakna(2, "; import os", 3)',
        expected: null,
      },
    ],
    sourceChecks: [
      {
        description: 'Använder inte eval',
        pattern: /\beval\(/,
        forbidden: true,
      },
    ],
  },
  {
    id: 'kmai-59',
    track: 'sakerhet',
    title: 'Be assistenten granska säkerheten',
    xp: 10,
    description: 'Assistenten är bra på att hitta säkerhetshål – om du frågar.',
    explain:
      'Be om en **säkerhetsgranskning** av koden du fått: _Granska koden för säkerhetsproblem: SQL-injektion, hemligheter i koden och indata som inte kontrolleras._\n\nNämn vad du vill att den letar efter – då letar den noggrannare.',
    example: 'fraga = "Granska koden för säkerhetsproblem …"',
    task: 'Uppgift: Skriv en fråga i `fraga` som ber assistenten granska koden för säkerhetsproblem och nämner `SQL-injektion`, `hemligheter` och `indata`.',
    starterCode: 'fraga = ""\n',
    solution:
      'fraga = "Granska koden för säkerhetsproblem: SQL-injektion, hemligheter i koden och indata som inte kontrolleras."\n',
    hints: ['Börja med Granska.', 'Säg säkerhet.', 'Nämn de tre sakerna.'],
    tests: [
      {
        description: 'Ber om en granskning av säkerheten',
        code: '"granska" in fraga.lower() and "säkerhet" in fraga.lower()',
        expected: true,
      },
      {
        description: 'Nämner SQL-injektion',
        code: '"sql-injektion" in fraga.lower()',
        expected: true,
      },
      {
        description: 'Nämner hemligheter och indata',
        code: '"hemlighet" in fraga.lower() and "indata" in fraga.lower()',
        expected: true,
      },
    ],
  },
];
