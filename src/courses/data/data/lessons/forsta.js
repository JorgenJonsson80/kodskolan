import { KASSA } from '../filer';

// Bana 2: första mötet med ny data. Det man gör de första fem minuterna
// med en fil man inte sett förut: hur stor, vilka kolumner och typer,
// vilka värden, vad som ser konstigt ut – och vilka frågor den alls kan
// svara på.
const READ = 'import pandas as pd\n\ndf = pd.read_csv("kassan.csv")\n';

export const FORSTA = [
  {
    id: 'da-11',
    track: 'forsta',
    title: 'Hur stor? shape',
    xp: 10,
    description:
      'Det första du vill veta om en ny tabell: hur många rader och kolumner har den?',
    explain:
      '`df.shape` är tabellens storlek som ett par: `(rader, kolumner)`. Inga parenteser efter, för det är ett värde och inte en metod.\n\nParet kan delas upp direkt:\n\n```\nrader, kolumner = df.shape\n```',
    example: 'print(df.shape)',
    task: 'Uppgift: Spara tabellens storlek i `storlek`, och dela sedan upp den i `rader` och `kolumner`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nstorlek = df.shape\nrader, kolumner = df.shape\nprint(storlek)\n',
    files: KASSA,
    hints: [
      'storlek = df.shape',
      'df.shape är ett par, som går att dela upp i två variabler.',
      'rader, kolumner = df.shape',
    ],
    tests: [
      {
        description: 'storlek är (9322, 7)',
        code: 'storlek',
        expected: [9322, 7],
      },
      { description: 'rader är 9322', code: 'rader', expected: 9322 },
      { description: 'kolumner är 7', code: 'kolumner', expected: 7 },
    ],
    sourceChecks: [{ description: 'Använder df.shape', pattern: /\.shape/ }],
  },
  {
    id: 'da-12',
    track: 'forsta',
    title: 'Början och slutet: head och tail',
    xp: 10,
    description:
      'Titta på några rader i början och slutet. Det avslöjar mycket om hur filen är ordnad.',
    explain:
      '`df.head(3)` ger de tre första raderna och `df.tail(3)` de tre sista. Utan tal blir det fem.\n\nKassan är sorterad efter tid, så de sista raderna är årets sista kunder. Det är värt att kolla: en fil kan lika gärna vara sorterad efter produkt, eller inte alls.',
    example: 'print(df.head(3))\nprint(df.tail(3))',
    task: 'Uppgift: Spara de tre första raderna i `forsta` och de tre sista i `sista`. Spara det sista kvittots nummer i `sista_kvittot`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nforsta = df.head(3)\nsista = df.tail(3)\nsista_kvittot = sista["kvitto"].tolist()[-1]\nprint(forsta)\nprint(sista)\n',
    files: KASSA,
    hints: [
      'forsta = df.head(3) och sista = df.tail(3)',
      'sista["kvitto"].tolist() är en vanlig lista, och [-1] är det sista i den.',
      'sista_kvittot = sista["kvitto"].tolist()[-1]',
    ],
    tests: [
      { description: 'forsta har 3 rader', code: 'len(forsta)', expected: 3 },
      {
        description: 'sista är årets tre sista rader',
        code: 'sista["datum"].tolist()',
        expected: ['2025-12-31', '2025-12-31', '2025-12-31'],
      },
      {
        description: 'sista_kvittot är 6578',
        code: 'sista_kvittot',
        expected: 6578,
      },
    ],
    sourceChecks: [{ description: 'Använder tail', pattern: /\.tail\(/ }],
  },
  {
    id: 'da-13',
    track: 'forsta',
    title: 'Vilken sorts värden? dtype',
    xp: 10,
    description:
      'Varje kolumn har en typ. Är den fel går det inte att räkna som du tänkt.',
    explain:
      '`df.dtypes` visar typen för varje kolumn och `df["antal"].dtype` för en. De vanligaste:\n\n- `int64` – heltal\n- `float64` – decimaltal\n- `str` – text\n\nTitta på datum: det är `str`, alltså text. Det gick bra att sortera och jämföra det i förra banan, men pandas vet inte att det är ett datum. Vilken veckodag var 2025-03-04? Det lär du dig i banan om datum.\n\n`str(…)` gör om typen till text, så att den går att jämföra.',
    example: 'print(df.dtypes)\nprint(df["pris"].dtype)',
    task: 'Uppgift: Spara typen för kolumnen antal som text i `typ_antal`, och för kolumnen datum i `typ_datum`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nprint(df.dtypes)\ntyp_antal = str(df["antal"].dtype)\ntyp_datum = str(df["datum"].dtype)\n',
    files: KASSA,
    hints: [
      'df["antal"].dtype är typen för en kolumn.',
      'str(...) gör om typen till text.',
      'typ_datum = str(df["datum"].dtype)',
    ],
    tests: [
      {
        description: 'typ_antal är "int64"',
        code: 'typ_antal',
        expected: 'int64',
      },
      { description: 'typ_datum är "str"', code: 'typ_datum', expected: 'str' },
    ],
  },
  {
    id: 'da-14',
    track: 'forsta',
    title: 'Allt på en gång: info',
    xp: 10,
    description:
      'info() visar kolumnerna, typerna och hur många värden som finns i varje – på en gång.',
    explain:
      '`df.info()` skriver ut en sammanfattning: varje kolumn, dess typ och hur många rader som har ett värde (_Non-Null Count_). Saknas värden blir den siffran mindre än antalet rader.\n\n`df.count()` ger samma siffror som en Series, så att du kan räkna med dem. I kassan finns ett värde på varje rad. Så är det sällan med riktig data – nästa bana handlar om det.',
    example: 'df.info()',
    task: 'Uppgift: Kör `df.info()`. Spara antalet värden per kolumn i `varden` med count(), och antalet värden i kolumnen produkt i `produkter`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\ndf.info()\nvarden = df.count()\nprodukter = varden["produkt"]\n',
    files: KASSA,
    hints: [
      'df.info() skriver ut sammanfattningen själv, utan print.',
      'varden = df.count()',
      'produkter = varden["produkt"]',
    ],
    tests: [
      { description: 'produkter är 9322', code: 'produkter', expected: 9322 },
      {
        description: 'varden har en siffra per kolumn',
        code: 'len(varden)',
        expected: 7,
      },
    ],
    sourceChecks: [
      { description: 'Använder df.info()', pattern: /\.info\(\)/ },
    ],
  },
  {
    id: 'da-15',
    track: 'forsta',
    title: 'Siffrorna i korthet: describe',
    xp: 15,
    description:
      'describe() räknar ut medelvärde, minsta, största och mer för alla sifferkolumner. Men alla siffror betyder inte något.',
    explain:
      '`df.describe()` ger en tabell med en kolumn per sifferkolumn och rader som `count`, `mean` (medelvärde), `min`, `max` och `50%` (medianen, värdet i mitten). Ett värde hämtas med två hakparenteser:\n\n```\nbeskrivning["pris"]["max"]\n```\n\nTitta på kvitto: pandas räknar gärna ut medelvärdet av kvittonumren, men det betyder ingenting. Kvittonumret är en etikett, inte en mängd. Att tänka efter vad en siffra betyder är halva jobbet.',
    example: 'beskrivning = df.describe()\nprint(beskrivning)',
    task: 'Uppgift: Spara `df.describe()` i `beskrivning`. Spara medelvärdet av antal avrundat till två decimaler i `snitt_antal`, och medianpriset i `median_pris`. Spara namnet på kolumnen vars medelvärde inte betyder något i `meningslos`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nbeskrivning = df.describe()\nprint(beskrivning)\nsnitt_antal = round(beskrivning["antal"]["mean"], 2)\nmedian_pris = beskrivning["pris"]["50%"]\nmeningslos = "kvitto"\n',
    files: KASSA,
    hints: [
      'beskrivning["antal"]["mean"] är medelvärdet av antal.',
      'Medianen står på raden "50%".',
      'Vilken kolumn är ett nummer på något, inte en mängd?',
    ],
    tests: [
      {
        description: 'snitt_antal är 1.24',
        code: 'snitt_antal',
        expected: 1.24,
      },
      { description: 'median_pris är 35', code: 'median_pris', expected: 35 },
      {
        description: 'meningslos är kolumnen kvitto',
        code: 'meningslos',
        expected: 'kvitto',
      },
    ],
    sourceChecks: [
      { description: 'Använder describe', pattern: /\.describe\(/ },
    ],
  },
  {
    id: 'da-16',
    track: 'forsta',
    title: 'Vilka finns? unique',
    xp: 10,
    description:
      'Vilka produkter säljer kaféet, och hur många dagar finns med i filen?',
    explain:
      '`df["produkt"].unique()` ger varje värde en gång. `sorted(…)` gör det till en sorterad lista.\n\n`nunique()` ger bara antalet. Kolla alltid unika värden i en textkolumn: det är där stavfel och dubbletter syns, som "Latte" och "latte".',
    example:
      'print(df["betalsatt"].unique())\nprint(df["betalsatt"].nunique())',
    task: 'Uppgift: Spara produkterna som en sorterad lista i `produkter`, och antalet olika datum i `dagar`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nprodukter = sorted(df["produkt"].unique())\ndagar = df["datum"].nunique()\nprint(produkter)\nprint(dagar)\n',
    files: KASSA,
    hints: [
      'df["produkt"].unique() ger varje produkt en gång.',
      'produkter = sorted(df["produkt"].unique())',
      'dagar = df["datum"].nunique()',
    ],
    tests: [
      {
        description: 'produkter är de tolv produkterna i bokstavsordning',
        code: 'produkter',
        expected: [
          'Bryggkaffe',
          'Cappuccino',
          'Iskaffe',
          'Juice',
          'Kanelbulle',
          'Kardemummabulle',
          'Kladdkaka',
          'Latte',
          'Semla',
          'Smörgås',
          'Soppa',
          'Te',
        ],
      },
      { description: 'dagar är 356', code: 'dagar', expected: 356 },
    ],
  },
  {
    id: 'da-17',
    track: 'forsta',
    title: 'Vad saknas? Stängda dagar',
    xp: 15,
    description: 'Ett år har 365 dagar, men filen har 356. Vad säger det?',
    explain:
      'Det som **inte** finns i datan är också information. `min()` och `max()` fungerar på text också, och för datum som `"2025-03-04"` blir det första och sista dagen.\n\nFinns hela året med men nio dagar saknas, var kaféet troligen stängt de dagarna – eller så har kassan tappat dem. Sådant tar man reda på innan man räknar ut snittet per dag.',
    example: 'print(df["tid"].min(), df["tid"].max())',
    task: 'Uppgift: Spara första och sista datumet i `forsta_dag` och `sista_dag`. Spara antalet dagar utan försäljning (365 minus antalet olika datum) i `stangt`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nforsta_dag = df["datum"].min()\nsista_dag = df["datum"].max()\nstangt = 365 - df["datum"].nunique()\nprint(forsta_dag, sista_dag, stangt)\n',
    files: KASSA,
    hints: [
      'forsta_dag = df["datum"].min()',
      'max() ger den sista.',
      'stangt = 365 - df["datum"].nunique()',
    ],
    tests: [
      {
        description: 'forsta_dag är "2025-01-01"',
        code: 'forsta_dag',
        expected: '2025-01-01',
      },
      {
        description: 'sista_dag är "2025-12-31"',
        code: 'sista_dag',
        expected: '2025-12-31',
      },
      { description: 'stangt är 9', code: 'stangt', expected: 9 },
    ],
  },
  {
    id: 'da-18',
    track: 'forsta',
    title: 'Fördelningen: andelar',
    xp: 15,
    description:
      'Hur stor del av raderna betalas med kort? Andelar säger ofta mer än antal.',
    explain:
      '`value_counts(normalize=True)` ger andelar i stället för antal: 0.5 betyder hälften. Avrunda med `.round(3)` och gör om till en dictionary med `.to_dict()`.\n\nGånger 100 blir det procent: `andelar["kort"] * 100`.',
    example: 'print(df["produkt"].value_counts(normalize=True).round(2))',
    task: 'Uppgift: Spara andelen rader per betalsätt, avrundat till tre decimaler, i `andelar`. Spara andelen kort i procent, avrundat till en decimal, i `kort_procent`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nandelar = df["betalsatt"].value_counts(normalize=True).round(3)\nkort_procent = round(andelar["kort"] * 100, 1)\nprint(andelar)\nprint(kort_procent)\n',
    files: KASSA,
    hints: [
      'df["betalsatt"].value_counts(normalize=True) ger andelar.',
      'Lägg till .round(3) sist.',
      'kort_procent = round(andelar["kort"] * 100, 1)',
    ],
    tests: [
      {
        description: 'andelar är 0.782 kort, 0.178 swish och 0.04 kontant',
        code: 'andelar.to_dict()',
        expected: { kort: 0.782, swish: 0.178, kontant: 0.04 },
      },
      {
        description: 'kort_procent är 78.2',
        code: 'kort_procent',
        expected: 78.2,
      },
    ],
    sourceChecks: [
      {
        description: 'Använder normalize=True',
        pattern: /normalize\s*=\s*True/,
      },
    ],
  },
  {
    id: 'da-19',
    track: 'forsta',
    title: 'Vilka frågor kan datan svara på?',
    xp: 15,
    description:
      'Innan du räknar: vilka frågor går alls att besvara med den här filen?',
    explain:
      'Kassan vet vad som såldes, när, för hur mycket och hur kunden betalade. Den vet **inte** vem kunden var, vad kunden tyckte eller vad som fanns i lager.\n\nEn bra analys börjar med att ställa frågor som datan kan svara på – och säga ärligt vilka den inte kan svara på. Annars blir svaret en gissning som ser ut som ett faktum.',
    example: 'svar = {"Vad kostar en latte?": True}\nprint(svar)',
    task: 'Uppgift: Byt `None` mot `True` eller `False` i `kan_svara`: kan kassan svara på frågan?',
    starterCode:
      'kan_svara = {\n    "Vilken produkt säljer mest?": None,\n    "Vem är kaféets bästa stamkund?": None,\n    "Vilken timme kommer flest kunder?": None,\n    "Är kunderna nöjda med kaffet?": None,\n    "Hur många semlor såldes på fettisdagen?": None,\n    "Tog kanelbullarna slut någon dag?": None,\n}\n',
    solution:
      'kan_svara = {\n    "Vilken produkt säljer mest?": True,\n    "Vem är kaféets bästa stamkund?": False,\n    "Vilken timme kommer flest kunder?": True,\n    "Är kunderna nöjda med kaffet?": False,\n    "Hur många semlor såldes på fettisdagen?": True,\n    "Tog kanelbullarna slut någon dag?": False,\n}\n',
    hints: [
      'Kolumnerna är kvitto, datum, tid, produkt, antal, pris och betalsatt.',
      'Det finns inget kundnummer och ingen kolumn om vad kunden tyckte.',
      'Kassan visar vad som såldes, inte vad som fanns kvar i lager.',
    ],
    tests: [
      {
        description: 'Rätt på frågorna om produkter, timmar och semlor',
        code: '[kan_svara["Vilken produkt säljer mest?"], kan_svara["Vilken timme kommer flest kunder?"], kan_svara["Hur många semlor såldes på fettisdagen?"]]',
        expected: [true, true, true],
      },
      {
        description: 'Rätt på frågorna om kunder, nöjdhet och lager',
        code: '[kan_svara["Vem är kaféets bästa stamkund?"], kan_svara["Är kunderna nöjda med kaffet?"], kan_svara["Tog kanelbullarna slut någon dag?"]]',
        expected: [false, false, false],
      },
    ],
  },
];
