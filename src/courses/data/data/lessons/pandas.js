import { KASSA } from '../filer';

// Bana 1: pandas igen. Repetition av Python-kursens bana 12, men med
// kaféets riktiga kassa: ett helt år och tusentals rader, så att det
// märks varför man inte räknar för hand. Testerna jämför vanliga värden
// (tal, listor, dictionaries via .to_dict()), aldrig hela tabeller.
const READ = 'import pandas as pd\n\ndf = pd.read_csv("kassan.csv")\n';
const WITH_SUM = READ + 'df["summa"] = df["antal"] * df["pris"]\n';

export const PANDAS = [
  {
    id: 'da-01',
    track: 'pandas',
    title: 'Kaféets kassa: read_csv',
    xp: 10,
    description:
      'Välkommen till Kafé Kanel! Kassan har sparat varje sak som sålts under ett helt år. Börja med att läsa in den.',
    explain:
      'Kassan är en CSV-fil, `kassan.csv`. Varje rad är en sak på ett kvitto: kvittots nummer, datum, tid, produkt, hur många, styckpris och hur kunden betalade. Ett kvitto med en latte och två bullar blir två rader.\n\n`pd.read_csv("kassan.csv")` läser in hela filen som en **DataFrame**, en tabell. `len(df)` ger antalet rader och `df.columns` kolumnernas namn.\n\nKör `print(df)`: pandas visar de första och sista raderna och hur stor tabellen är.',
    example:
      'import pandas as pd\n\ndf = pd.read_csv("kassan.csv")\nprint(df.head())',
    task: 'Uppgift: Läs in `kassan.csv` till `df`. Spara antalet rader i `antal_rader` och kolumnernas namn som en lista i `kolumner`.',
    starterCode: 'import pandas as pd\n\n# Skriv din kod här\n',
    solution:
      'import pandas as pd\n\ndf = pd.read_csv("kassan.csv")\nantal_rader = len(df)\nkolumner = list(df.columns)\nprint(df)\n',
    files: KASSA,
    hints: [
      'df = pd.read_csv("kassan.csv")',
      'len(df) ger antalet rader.',
      'kolumner = list(df.columns)',
    ],
    tests: [
      {
        description: 'antal_rader är 9322',
        code: 'antal_rader',
        expected: 9322,
      },
      {
        description:
          'kolumner är kvitto, datum, tid, produkt, antal, pris och betalsatt',
        code: 'kolumner',
        expected: [
          'kvitto',
          'datum',
          'tid',
          'produkt',
          'antal',
          'pris',
          'betalsatt',
        ],
      },
    ],
    sourceChecks: [
      { description: 'Använder pd.read_csv', pattern: /pd\.read_csv\(/ },
    ],
  },
  {
    id: 'da-02',
    track: 'pandas',
    title: 'Hur mycket såldes?',
    xp: 10,
    description:
      'En kolumn räknar du på direkt, utan loop: summa, största och minsta värdet.',
    explain:
      '`df["antal"]` är kolumnen antal, en **Series**. Den har metoder som räknar på alla rader på en gång: `.sum()`, `.mean()`, `.min()` och `.max()`.\n\nMed över 9 000 rader är det här skillnaden mot att räkna i en lista med en loop: en rad kod, och pandas gör resten.',
    example: 'print(df["antal"].mean())\nprint(df["pris"].min())',
    task: 'Uppgift: Spara hur många saker kaféet sålde under året i `totalt`, och det högsta styckpriset i `dyrast`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\ntotalt = df["antal"].sum()\ndyrast = df["pris"].max()\nprint(totalt, dyrast)\n',
    files: KASSA,
    hints: [
      'Kolumnerna heter "antal" och "pris".',
      'totalt = df["antal"].sum()',
      'dyrast = df["pris"].max()',
    ],
    tests: [
      { description: 'totalt är 11541', code: 'totalt', expected: 11541 },
      { description: 'dyrast är 95', code: 'dyrast', expected: 95 },
    ],
  },
  {
    id: 'da-03',
    track: 'pandas',
    title: 'En ny kolumn: summa',
    xp: 10,
    description:
      'Kassan har antal och styckpris, men inte vad raden kostade. Räkna ut det för alla rader på en gång.',
    explain:
      '`df["antal"] * df["pris"]` multiplicerar rad för rad. Sparar du svaret med `df["summa"] = …` får tabellen en ny kolumn.\n\nNu kan du räkna ut kaféets intäkter: summan av alla rader.',
    example: 'df["dubbelt"] = df["antal"] * 2\nprint(df.head())',
    task: 'Uppgift: Lägg till kolumnen `summa` (antal gånger pris) och spara årets intäkter, summan av den, i `intakter`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\ndf["summa"] = df["antal"] * df["pris"]\nintakter = df["summa"].sum()\nprint(intakter)\n',
    files: KASSA,
    hints: [
      'df["summa"] = df["antal"] * df["pris"]',
      'Summera den nya kolumnen med .sum().',
      'intakter = df["summa"].sum()',
    ],
    tests: [
      {
        description: 'df har kolumnen summa',
        code: '"summa" in df.columns',
        expected: true,
      },
      {
        description: 'första radens summa är 45',
        code: 'df["summa"].tolist()[0]',
        expected: 45,
      },
      { description: 'intakter är 487373', code: 'intakter', expected: 487373 },
    ],
  },
  {
    id: 'da-04',
    track: 'pandas',
    title: 'Bara kanelbullar',
    xp: 10,
    description:
      'Filtrera fram raderna du är intresserad av och räkna bara på dem.',
    explain:
      '`df["produkt"] == "Kanelbulle"` ger True eller False för varje rad. Sätter du det inom `df[…]` blir det kvar bara raderna där det är True:\n\n```\nbullar = df[df["produkt"] == "Kanelbulle"]\n```\n\n`bullar` är en ny, mindre tabell med samma kolumner. Stavningen måste vara exakt som i filen, med stor bokstav.',
    example: 'latte = df[df["produkt"] == "Latte"]\nprint(len(latte))',
    task: 'Uppgift: Spara raderna med kanelbullar i `bullar`. Spara hur många kanelbullar som såldes (summan av antal) i `antal_bullar`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nbullar = df[df["produkt"] == "Kanelbulle"]\nantal_bullar = bullar["antal"].sum()\nprint(antal_bullar)\n',
    files: KASSA,
    hints: [
      'bullar = df[df["produkt"] == "Kanelbulle"]',
      'Antalet bullar är summan av kolumnen antal i bullar, inte antalet rader.',
      'antal_bullar = bullar["antal"].sum()',
    ],
    tests: [
      {
        description: 'bullar har 1438 rader',
        code: 'len(bullar)',
        expected: 1438,
      },
      {
        description: 'antal_bullar är 1792',
        code: 'antal_bullar',
        expected: 1792,
      },
    ],
  },
  {
    id: 'da-05',
    track: 'pandas',
    title: 'Två villkor: & och |',
    xp: 15,
    description:
      'Hur mycket bryggkaffe säljs före nio? Och hur många betalar inte med kort?',
    explain:
      'Två villkor sätts ihop med `&` (och) eller `|` (eller), och varje villkor måste ha egna parenteser:\n\n```\ndf[(df["produkt"] == "Latte") & (df["antal"] > 1)]\n```\n\nTiden är text som `"08:45"`. Text jämförs tecken för tecken, så `df["tid"] < "09:00"` fungerar när alla tider har två siffror för timmen.',
    example:
      'helg = df[(df["betalsatt"] == "kort") & (df["antal"] >= 2)]\nprint(len(helg))',
    task: 'Uppgift: Spara antalet bryggkaffe (summan av antal) som såldes före kl 09:00 i `tidigt_kaffe`. Spara antalet rader där kunden betalade med swish eller kontant i `inte_kort`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\ntidigt = df[(df["produkt"] == "Bryggkaffe") & (df["tid"] < "09:00")]\ntidigt_kaffe = tidigt["antal"].sum()\n\nandra = df[(df["betalsatt"] == "swish") | (df["betalsatt"] == "kontant")]\ninte_kort = len(andra)\nprint(tidigt_kaffe, inte_kort)\n',
    files: KASSA,
    hints: [
      'Varje villkor inom egna parenteser: (df["produkt"] == "Bryggkaffe") & (df["tid"] < "09:00")',
      'Swish eller kontant: (df["betalsatt"] == "swish") | (df["betalsatt"] == "kontant")',
      'tidigt_kaffe är summan av antal i det första urvalet, inte_kort är len() av det andra.',
    ],
    tests: [
      {
        description: 'tidigt_kaffe är 376',
        code: 'tidigt_kaffe',
        expected: 376,
      },
      { description: 'inte_kort är 2034', code: 'inte_kort', expected: 2034 },
    ],
    sourceChecks: [
      { description: 'Använder &', pattern: /\)\s*&\s*\(/ },
      { description: 'Använder |', pattern: /\)\s*\|\s*\(/ },
    ],
  },
  {
    id: 'da-06',
    track: 'pandas',
    title: 'Sortera: Kanelbullens dag',
    xp: 15,
    description:
      'Den 4 oktober är det Kanelbullens dag. När kom den första kunden, och när gick den sista?',
    explain:
      '`df.sort_values("tid")` sorterar raderna efter tiden, minst först. `ascending=False` vänder på ordningen.\n\nDatumet är text som `"2025-10-04"`, så du filtrerar fram dagen som vilken text som helst. Sedan sorterar du och tittar på första raden: `["tid"].tolist()[0]`.',
    example:
      'dag = df[df["datum"] == "2025-01-02"]\nprint(dag.sort_values("tid").head(3))',
    task: 'Uppgift: Spara raderna från 2025-10-04 i `dagen`. Spara den första tiden på dagen i `forsta` och den sista i `sista`, med sort_values.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\ndagen = df[df["datum"] == "2025-10-04"]\nforsta = dagen.sort_values("tid")["tid"].tolist()[0]\nsista = dagen.sort_values("tid", ascending=False)["tid"].tolist()[0]\nprint(forsta, sista)\n',
    files: KASSA,
    hints: [
      'dagen = df[df["datum"] == "2025-10-04"]',
      'dagen.sort_values("tid")["tid"].tolist()[0] är den första tiden.',
      'Med ascending=False kommer den sista tiden först.',
    ],
    tests: [
      { description: 'dagen har 39 rader', code: 'len(dagen)', expected: 39 },
      { description: 'forsta är "08:45"', code: 'forsta', expected: '08:45' },
      { description: 'sista är "16:17"', code: 'sista', expected: '16:17' },
    ],
    sourceChecks: [
      { description: 'Använder sort_values', pattern: /sort_values\(/ },
    ],
  },
  {
    id: 'da-07',
    track: 'pandas',
    title: 'Gruppera: per produkt',
    xp: 15,
    description:
      'Hur många av varje produkt såldes under året? En rad kod i stället för tolv filter.',
    explain:
      '`df.groupby("produkt")["antal"].sum()` delar upp raderna efter produkt och summerar antal i varje grupp. Svaret är en Series med produkterna som index:\n\n```\nper_produkt["Latte"]\n```\n\nger antalet lattes. `.to_dict()` gör om den till en dictionary.',
    example: 'print(df.groupby("betalsatt")["antal"].sum())',
    task: 'Uppgift: Spara antalet sålda av varje produkt i `per_produkt`, med groupby.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nper_produkt = df.groupby("produkt")["antal"].sum()\nprint(per_produkt)\n',
    files: KASSA,
    hints: [
      'Gruppera efter kolumnen "produkt".',
      'Välj kolumnen "antal" och summera.',
      'per_produkt = df.groupby("produkt")["antal"].sum()',
    ],
    tests: [
      {
        description: 'per_produkt["Kanelbulle"] är 1792',
        code: 'per_produkt["Kanelbulle"]',
        expected: 1792,
      },
      {
        description: 'per_produkt["Semla"] är 189',
        code: 'per_produkt["Semla"]',
        expected: 189,
      },
      {
        description: 'per_produkt har alla tolv produkter',
        code: 'len(per_produkt)',
        expected: 12,
      },
    ],
    sourceChecks: [{ description: 'Använder groupby', pattern: /groupby\(/ }],
  },
  {
    id: 'da-08',
    track: 'pandas',
    title: 'Medelvärde per betalsätt',
    xp: 15,
    description:
      'Handlar den som betalar med swish för mer än den som betalar kontant?',
    explain:
      'Byt `.sum()` mot `.mean()` så får du medelvärdet i varje grupp. Medelvärden får ofta många decimaler, så avrunda med `.round(1)`:\n\n```\ndf.groupby("betalsatt")["summa"].mean().round(1)\n```\n\nSvaret här är per rad på kvittot. Medelvärdet per kvitto kommer senare i kursen.',
    example: 'print(df.groupby("produkt")["antal"].mean().round(2))',
    task: 'Uppgift: Spara medelvärdet av summa per betalsätt, avrundat till en decimal, i `snitt`.',
    starterCode: WITH_SUM + '\n# Skriv din kod här\n',
    solution:
      WITH_SUM +
      '\nsnitt = df.groupby("betalsatt")["summa"].mean().round(1)\nprint(snitt)\n',
    files: KASSA,
    hints: [
      'Gruppera efter "betalsatt" och välj kolumnen "summa".',
      '.mean() ger medelvärdet, .round(1) avrundar.',
      'snitt = df.groupby("betalsatt")["summa"].mean().round(1)',
    ],
    tests: [
      {
        description:
          'snitt är 53.2 för swish, 52.1 för kort och 51.6 för kontant',
        code: 'snitt.to_dict()',
        expected: { kontant: 51.6, kort: 52.1, swish: 53.2 },
      },
    ],
  },
  {
    id: 'da-09',
    track: 'pandas',
    title: 'Räkna: nunique och value_counts',
    xp: 15,
    description:
      'Hur många kunder hade kaféet? Och vilken produkt finns på flest kvitton?',
    explain:
      'Ett kvitto kan ha flera rader, så `len(df)` är inte antalet kunder. `df["kvitto"].nunique()` räknar hur många **olika** kvitton det finns.\n\n`df["produkt"].value_counts()` räknar hur många rader varje produkt har, störst först. `.index[0]` är den första: den vanligaste.',
    example:
      'print(df["betalsatt"].nunique())\nprint(df["betalsatt"].value_counts())',
    task: 'Uppgift: Spara antalet kvitton i `kunder` och namnet på produkten som finns på flest rader i `vanligast`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nkunder = df["kvitto"].nunique()\nvanligast = df["produkt"].value_counts().index[0]\nprint(kunder, vanligast)\n',
    files: KASSA,
    hints: [
      'kunder = df["kvitto"].nunique()',
      'df["produkt"].value_counts() sorterar redan med flest först.',
      'vanligast = df["produkt"].value_counts().index[0]',
    ],
    tests: [
      { description: 'kunder är 5578', code: 'kunder', expected: 5578 },
      {
        description: 'vanligast är "Bryggkaffe"',
        code: 'vanligast',
        expected: 'Bryggkaffe',
      },
    ],
  },
];
