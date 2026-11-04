// Bana 12: data med pandas. Alla övningar använder samma lilla CSV-fil
// från ett kafé, så att eleven lär känna datan och kan räkna efter själv.
// Testerna jämför vanliga värden (tal, listor, dictionaries via
// .to_dict()), aldrig hela tabeller.
export const FORSALJNING = `datum,produkt,kategori,antal,pris
2026-10-01,kaffe,dryck,12,30
2026-10-01,bulle,bröd,8,25
2026-10-01,te,dryck,5,25
2026-10-02,kaffe,dryck,15,30
2026-10-02,smörgås,mat,6,55
2026-10-02,bulle,bröd,10,25
2026-10-03,kaffe,dryck,9,30
2026-10-03,te,dryck,7,25
2026-10-03,smörgås,mat,4,55
2026-10-03,kaka,bröd,11,20
`;

const FILES = { 'forsaljning.csv': FORSALJNING };
const READ = 'import pandas as pd\n\ndf = pd.read_csv("forsaljning.csv")\n';

export const PANDAS = [
  {
    id: 'pd-01',
    track: 'pandas',
    title: 'Läs in en tabell: read_csv',
    xp: 10,
    description:
      'pandas gör Python till ett kalkylark. Du läser in en hel tabell med en rad och kan sedan räkna på den.',
    explain:
      '`import pandas as pd` hämtar pandas med det korta namnet pd, som alla använder. `pd.read_csv("fil.csv")` läser en CSV-fil – en textfil där värdena skiljs med komma – och ger en **DataFrame**: en tabell med rader och kolumner.\n\n`len(df)` ger antalet rader, `df.columns` kolumnernas namn och `df.head()` de första raderna. Excel-filer läses likadant med `pd.read_excel("fil.xlsx")`.\n\nFilen här är kaféets försäljning under tre dagar. Kör `print(df)` och titta på den!',
    example:
      'import pandas as pd\n\ndf = pd.read_csv("forsaljning.csv")\nprint(df.head())',
    task: 'Uppgift: Läs in `forsaljning.csv` till `df`. Spara antalet rader i `antal_rader` och kolumnernas namn som en lista i `kolumner` med `list(df.columns)`.',
    starterCode: 'import pandas as pd\n\n# Skriv din kod här\n',
    solution:
      'import pandas as pd\n\ndf = pd.read_csv("forsaljning.csv")\nantal_rader = len(df)\nkolumner = list(df.columns)\nprint(df)\n',
    files: FILES,
    hints: [
      'df = pd.read_csv("forsaljning.csv")',
      'len(df) ger antalet rader.',
      'kolumner = list(df.columns)',
    ],
    tests: [
      { description: 'antal_rader är 10', code: 'antal_rader', expected: 10 },
      {
        description: 'kolumner är datum, produkt, kategori, antal och pris',
        code: 'kolumner',
        expected: ['datum', 'produkt', 'kategori', 'antal', 'pris'],
      },
    ],
    sourceChecks: [
      { description: 'Använder pd.read_csv', pattern: /pd\.read_csv\(/ },
    ],
  },
  {
    id: 'pd-02',
    track: 'pandas',
    title: 'En kolumn: df["antal"]',
    xp: 10,
    description:
      'Med hakparenteser och kolumnens namn får du en hel kolumn. Den kan summeras och räknas på direkt.',
    explain:
      '`df["antal"]` är kolumnen antal – i pandas kallas en kolumn för **Series**. Den fungerar ungefär som en lista, men har egna metoder: `.sum()`, `.mean()` (medelvärde), `.min()` och `.max()`.\n\nDu behöver ingen loop. pandas räknar på hela kolumnen på en gång.',
    example: 'print(df["pris"].max())\nprint(df["pris"].mean())',
    task: 'Uppgift: Spara hur många saker som såldes totalt i `totalt`, och det största antalet på en rad i `mest`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\ntotalt = df["antal"].sum()\nmest = df["antal"].max()\nprint(totalt, mest)\n',
    files: FILES,
    hints: [
      'Kolumnen heter "antal".',
      'totalt = df["antal"].sum()',
      'mest = df["antal"].max()',
    ],
    tests: [
      { description: 'totalt är 87', code: 'totalt', expected: 87 },
      { description: 'mest är 15', code: 'mest', expected: 15 },
    ],
  },
  {
    id: 'pd-03',
    track: 'pandas',
    title: 'En ny kolumn',
    xp: 10,
    description:
      'Räkna ut en ny kolumn från de andra, på alla rader på en gång.',
    explain:
      '`df["antal"] * df["pris"]` multiplicerar rad för rad: första radens antal med första radens pris, och så vidare. Spara svaret som en ny kolumn med `df["summa"] = …`.\n\n`.tolist()` gör om en kolumn till en vanlig lista, bra när du vill titta på värdena.',
    example: 'df["pris_med_moms"] = df["pris"] * 1.25\nprint(df.head())',
    task: 'Uppgift: Lägg till kolumnen `summa` med antal gånger pris. Spara sedan kaféets totala intäkt i `intakt`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\ndf["summa"] = df["antal"] * df["pris"]\nintakt = df["summa"].sum()\nprint(df)\n',
    files: FILES,
    hints: [
      'df["summa"] = df["antal"] * df["pris"]',
      'Den nya kolumnen summeras som de andra.',
      'intakt = df["summa"].sum()',
    ],
    tests: [
      {
        description: 'summa är antal gånger pris på varje rad',
        code: 'df["summa"].tolist()',
        expected: [360, 200, 125, 450, 330, 250, 270, 175, 220, 220],
      },
      { description: 'intakt är 2600', code: 'intakt', expected: 2600 },
    ],
  },
  {
    id: 'pd-04',
    track: 'pandas',
    title: 'Filtrera rader',
    xp: 10,
    description:
      'Plocka ut bara raderna som uppfyller ett villkor, som ett filter i Excel.',
    explain:
      '`df["produkt"] == "kaffe"` ger True eller False för varje rad. Sätter du det inom `df[…]` får du bara raderna där det är True: `df[df["produkt"] == "kaffe"]`.\n\nSvaret är en ny, mindre tabell. Den gamla är oförändrad.',
    example: 'dyra = df[df["pris"] > 40]\nprint(dyra)',
    task: 'Uppgift: Spara raderna med kaffe i `kaffe`, och hur många koppar kaffe som såldes totalt i `koppar`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nkaffe = df[df["produkt"] == "kaffe"]\nkoppar = kaffe["antal"].sum()\nprint(kaffe)\n',
    files: FILES,
    hints: [
      'kaffe = df[df["produkt"] == "kaffe"]',
      'kaffe är en tabell, så kaffe["antal"] fungerar.',
      'koppar = kaffe["antal"].sum()',
    ],
    tests: [
      { description: 'kaffe har 3 rader', code: 'len(kaffe)', expected: 3 },
      { description: 'koppar är 36', code: 'koppar', expected: 36 },
    ],
  },
  {
    id: 'pd-05',
    track: 'pandas',
    title: 'Flera villkor: & och |',
    xp: 10,
    description:
      'Två villkor på en gång skrivs med & (och) och | (eller) – inte med and och or.',
    explain:
      'I pandas skriver du `&` för "och" och `|` för "eller". Varje villkor måste stå inom egna parenteser: `df[(df["kategori"] == "dryck") & (df["antal"] >= 7)]`.\n\nGlömmer du parenteserna eller skriver `and` blir det ett fel om att "the truth value of a Series is ambiguous".',
    example:
      'billigt_brod = df[(df["kategori"] == "bröd") & (df["pris"] < 25)]\nprint(billigt_brod)',
    task: 'Uppgift: Spara raderna med drycker där minst 7 såldes i `bra_dryck`. Spara raderna som är mat eller kostar 20 kr i `mat_eller_billigt`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nbra_dryck = df[(df["kategori"] == "dryck") & (df["antal"] >= 7)]\nmat_eller_billigt = df[(df["kategori"] == "mat") | (df["pris"] == 20)]\nprint(bra_dryck)\n',
    files: FILES,
    hints: [
      'Två villkor, var och ett inom parenteser, med & emellan.',
      'bra_dryck = df[(df["kategori"] == "dryck") & (df["antal"] >= 7)]',
      'För "eller" används | på samma sätt.',
    ],
    tests: [
      {
        description: 'bra_dryck har 4 rader',
        code: 'len(bra_dryck)',
        expected: 4,
      },
      {
        description: 'bra_dryck är kaffe tre gånger och te en gång',
        code: 'bra_dryck["produkt"].tolist()',
        expected: ['kaffe', 'kaffe', 'kaffe', 'te'],
      },
      {
        description: 'mat_eller_billigt är två smörgåsar och en kaka',
        code: 'mat_eller_billigt["produkt"].tolist()',
        expected: ['smörgås', 'smörgås', 'kaka'],
      },
    ],
  },
  {
    id: 'pd-06',
    track: 'pandas',
    title: 'Sortera: sort_values',
    xp: 10,
    description:
      'Sortera tabellen efter en kolumn och ta de översta raderna – en topplista.',
    explain:
      '`df.sort_values("antal")` sorterar från minst till störst. Med `ascending=False` blir det tvärtom. `.head(3)` ger de tre första raderna.\n\nMetoderna kan kedjas efter varandra: `df.sort_values(…).head(3)` sorterar först och tar sedan topp tre.',
    example: 'print(df.sort_values("pris").head(2))',
    task: 'Uppgift: Spara de tre raderna där mest såldes i `topp`, med störst först.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\ntopp = df.sort_values("antal", ascending=False).head(3)\nprint(topp)\n',
    files: FILES,
    hints: [
      'df.sort_values("antal", ascending=False) sorterar störst först.',
      '.head(3) tar de tre översta.',
      'topp = df.sort_values("antal", ascending=False).head(3)',
    ],
    tests: [
      {
        description: 'topp är kaffe, kaffe och kaka',
        code: 'topp["produkt"].tolist()',
        expected: ['kaffe', 'kaffe', 'kaka'],
      },
      {
        description: 'topp har antalen 15, 12 och 11',
        code: 'topp["antal"].tolist()',
        expected: [15, 12, 11],
      },
    ],
  },
  {
    id: 'pd-07',
    track: 'pandas',
    title: 'Gruppera: groupby',
    xp: 10,
    description:
      'Summera per produkt, per dag eller per kategori. Det är det man oftast gör med data.',
    explain:
      '`df.groupby("produkt")["antal"].sum()` delar upp raderna i en grupp per produkt och summerar antalet i varje grupp. Det motsvarar en pivottabell i Excel.\n\nSvaret är en Series där produkterna är nycklar: `per_produkt["kaffe"]`. Med `.to_dict()` blir den en vanlig dictionary.',
    example: 'per_dag = df.groupby("datum")["antal"].sum()\nprint(per_dag)',
    task: 'Uppgift: Spara hur många av varje produkt som såldes i `per_produkt`, med `groupby`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nper_produkt = df.groupby("produkt")["antal"].sum()\nprint(per_produkt)\n',
    files: FILES,
    hints: [
      'Gruppera på kolumnen "produkt".',
      'Välj kolumnen "antal" och summera.',
      'per_produkt = df.groupby("produkt")["antal"].sum()',
    ],
    tests: [
      {
        description: 'per_produkt["kaffe"] är 36',
        code: 'per_produkt["kaffe"]',
        expected: 36,
      },
      {
        description: 'Alla fem produkterna',
        code: 'per_produkt.to_dict()',
        expected: { bulle: 18, kaffe: 36, kaka: 11, smörgås: 10, te: 12 },
      },
    ],
    sourceChecks: [{ description: 'Använder groupby', pattern: /groupby\(/ }],
  },
  {
    id: 'pd-08',
    track: 'pandas',
    title: 'Medelvärde och bästa gruppen',
    xp: 10,
    description:
      'En grupp kan räknas på fler sätt än summa. Och pandas kan säga vilken grupp som vann.',
    explain:
      'Efter `groupby` fungerar `.mean()`, `.min()`, `.max()` och `.count()` precis som `.sum()`. `.round(1)` avrundar alla värden till en decimal.\n\n`.idxmax()` ger *namnet* på gruppen med störst värde, inte själva värdet. `.max()` ger värdet.',
    example:
      'snittpris = df.groupby("kategori")["pris"].mean()\nprint(snittpris.idxmax())',
    task: 'Uppgift: Spara medelantalet per rad för varje kategori i `snitt`, avrundat till en decimal. Spara kategorin med högst snitt i `basta`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nsnitt = df.groupby("kategori")["antal"].mean().round(1)\nbasta = snitt.idxmax()\nprint(snitt)\nprint(basta)\n',
    files: FILES,
    hints: [
      'Som förra övningen, men med .mean() i stället för .sum().',
      'Lägg till .round(1) sist.',
      'basta = snitt.idxmax()',
    ],
    tests: [
      {
        description: 'snitt per kategori',
        code: 'snitt.to_dict()',
        expected: { bröd: 9.7, dryck: 9.6, mat: 5.0 },
      },
      { description: 'basta är bröd', code: 'basta', expected: 'bröd' },
    ],
  },
  {
    id: 'pd-09',
    track: 'pandas',
    title: 'Räkna: value_counts och nunique',
    xp: 10,
    description:
      'Hur många gånger förekommer varje värde? Och hur många olika värden finns det?',
    explain:
      '`df["produkt"].value_counts()` räknar hur många rader varje produkt har, med flest först. `df["datum"].nunique()` ger hur många *olika* datum som finns.\n\nDet är ofta det första man gör med ny data: hur ser den ut, och finns det något konstigt i den?',
    example: 'print(df["kategori"].value_counts())',
    task: 'Uppgift: Spara antalet olika dagar i `dagar` och hur många rader varje produkt har i `rader_per_produkt`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\ndagar = df["datum"].nunique()\nrader_per_produkt = df["produkt"].value_counts()\nprint(rader_per_produkt)\n',
    files: FILES,
    hints: [
      'dagar = df["datum"].nunique()',
      'value_counts() på kolumnen "produkt".',
      'rader_per_produkt = df["produkt"].value_counts()',
    ],
    tests: [
      { description: 'dagar är 3', code: 'dagar', expected: 3 },
      {
        description: 'kaffe finns på 3 rader',
        code: 'rader_per_produkt["kaffe"]',
        expected: 3,
      },
      {
        description: 'Alla produkterna',
        code: 'rader_per_produkt.to_dict()',
        expected: { kaffe: 3, bulle: 2, te: 2, smörgås: 2, kaka: 1 },
      },
    ],
  },
];
