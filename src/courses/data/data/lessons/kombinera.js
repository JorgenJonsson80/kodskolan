import { KASSA, KASSA_OCH_PRODUKTER, KASSA_OCH_VADER } from '../filer';

// Bana 6: kombinera tabeller. Kassan med prislistan (kategori och
// inköpspris), en meny som saknar säsongsvarorna, vädret varje dag och
// samma data i en SQLite-databas.
const READ =
  'import pandas as pd\n\ndf = pd.read_csv("kassan.csv")\ndf["summa"] = df["antal"] * df["pris"]\n';
const WITH_PRODUCTS = READ + 'produkter = pd.read_csv("produkter.csv")\n';
const WITH_WEATHER = READ + 'vadret = pd.read_csv("vadret.csv")\n';
const PER_DAG =
  WITH_WEATHER +
  'per_dag = df.groupby("datum").agg(summa=("summa", "sum"), kunder=("kvitto", "nunique")).reset_index()\n';

// Menyn på väggen, som glömt säsongsvarorna Iskaffe och Semla.
const MENY = `meny = pd.DataFrame({
    "produkt": ["Bryggkaffe", "Latte", "Cappuccino", "Te", "Juice", "Kanelbulle", "Kardemummabulle", "Kladdkaka", "Smörgås", "Soppa"],
    "kategori": ["kaffe", "kaffe", "kaffe", "dryck", "dryck", "bakverk", "bakverk", "bakverk", "mat", "mat"],
})
`;

export const KOMBINERA = [
  {
    id: 'da-51',
    track: 'kombinera',
    title: 'Slå ihop med prislistan: merge',
    xp: 15,
    description:
      'Kassan vet inte vilken kategori en produkt hör till. Det gör prislistan. Slå ihop dem.',
    explain:
      '`produkter.csv` har en rad per produkt: kategori, pris och inköpspris. `merge` slår ihop två tabeller där en kolumn har samma värde:\n\n```\nihop = df.merge(produkter[["produkt", "kategori", "inkop"]], on="produkt")\n```\n\nVarje rad i kassan får kategorin och inköpspriset från sin produkts rad i prislistan. `on` är kolumnen som binder ihop dem: **nyckeln**.',
    example: 'print(produkter)',
    task: 'Uppgift: Slå ihop kassan med kolumnerna produkt, kategori och inkop från prislistan och spara i `ihop`. Spara intäkterna per kategori i `per_kategori`.',
    starterCode: WITH_PRODUCTS + '\n# Skriv din kod här\n',
    solution:
      WITH_PRODUCTS +
      '\nihop = df.merge(produkter[["produkt", "kategori", "inkop"]], on="produkt")\nper_kategori = ihop.groupby("kategori")["summa"].sum()\nprint(per_kategori)\n',
    files: KASSA_OCH_PRODUKTER,
    hints: [
      'Välj kolumnerna först: produkter[["produkt", "kategori", "inkop"]]',
      'ihop = df.merge(..., on="produkt")',
      'per_kategori = ihop.groupby("kategori")["summa"].sum()',
    ],
    tests: [
      {
        description: 'ihop har lika många rader som kassan',
        code: 'len(ihop)',
        expected: 9322,
      },
      {
        description:
          'per_kategori: kaffe 195759, bakverk 136597, mat 111010, dryck 44007',
        code: 'per_kategori.to_dict()',
        expected: { bakverk: 136597, dryck: 44007, kaffe: 195759, mat: 111010 },
      },
    ],
    sourceChecks: [{ description: 'Använder merge', pattern: /\.merge\(/ }],
  },
  {
    id: 'da-52',
    track: 'kombinera',
    title: 'Vinsten, inte bara intäkten',
    xp: 15,
    description:
      'Soppan är dyr, men vad tjänar kaféet egentligen på varje produkt?',
    explain:
      'Med inköpspriset på varje rad kan du räkna vinsten: det kunden betalar minus det kaféet betalade, gånger antalet:\n\n```\nihop["vinst"] = (ihop["pris"] - ihop["inkop"]) * ihop["antal"]\n```\n\nIntäkt och vinst ger ofta olika topplistor. Det är därför det lönar sig att slå ihop tabeller.',
    example:
      'ihop = df.merge(produkter[["produkt", "inkop"]], on="produkt")\nprint(ihop.head())',
    task: 'Uppgift: Slå ihop kassan med produkt och inkop från prislistan i `ihop`, och lägg till kolumnen `vinst`. Spara vinsten per produkt, störst först, i `per_produkt`, och årets totala vinst i `total_vinst`.',
    starterCode: WITH_PRODUCTS + '\n# Skriv din kod här\n',
    solution:
      WITH_PRODUCTS +
      '\nihop = df.merge(produkter[["produkt", "inkop"]], on="produkt")\nihop["vinst"] = (ihop["pris"] - ihop["inkop"]) * ihop["antal"]\nper_produkt = ihop.groupby("produkt")["vinst"].sum().sort_values(ascending=False)\ntotal_vinst = ihop["vinst"].sum()\nprint(per_produkt)\n',
    files: KASSA_OCH_PRODUKTER,
    hints: [
      'ihop = df.merge(produkter[["produkt", "inkop"]], on="produkt")',
      'ihop["vinst"] = (ihop["pris"] - ihop["inkop"]) * ihop["antal"]',
      'Gruppera på produkt, summera vinst och sortera med störst först.',
    ],
    tests: [
      {
        description: 'per_produkt börjar med Bryggkaffe, Smörgås och Latte',
        code: 'list(per_produkt.index[:3])',
        expected: ['Bryggkaffe', 'Smörgås', 'Latte'],
      },
      {
        description: 'Bryggkaffe gav 60349 kr i vinst',
        code: 'per_produkt["Bryggkaffe"]',
        expected: 60349,
      },
      {
        description: 'total_vinst är 365454',
        code: 'total_vinst',
        expected: 365454,
      },
    ],
  },
  {
    id: 'da-53',
    track: 'kombinera',
    title: 'Samma namn i båda: _x och _y',
    xp: 15,
    description:
      'Både kassan och prislistan har en kolumn som heter pris. Vad händer då?',
    explain:
      'Slår du ihop hela prislistan finns kolumnen pris i båda tabellerna. pandas behåller båda och döper om dem till `pris_x` (från vänster tabell) och `pris_y` (från höger).\n\nDet är ett bra tillfälle att kontrollera datan: stämmer priset i kassan med prislistan på varje rad? `(a == b).all()` är True bara om alla rader är lika.',
    example: 'print((df["antal"] >= 1).all())',
    task: 'Uppgift: Slå ihop kassan med hela prislistan i `ihop`. Spara kolumnernas namn som en lista i `kolumner`, och om priserna stämmer på alla rader i `stammer`.',
    starterCode: WITH_PRODUCTS + '\n# Skriv din kod här\n',
    solution:
      WITH_PRODUCTS +
      '\nihop = df.merge(produkter, on="produkt")\nkolumner = list(ihop.columns)\nstammer = (ihop["pris_x"] == ihop["pris_y"]).all()\nprint(kolumner, stammer)\n',
    files: KASSA_OCH_PRODUKTER,
    hints: [
      'ihop = df.merge(produkter, on="produkt")',
      'kolumner = list(ihop.columns)',
      'stammer = (ihop["pris_x"] == ihop["pris_y"]).all()',
    ],
    tests: [
      {
        description: 'kolumner har pris_x och pris_y',
        code: '"pris_x" in kolumner and "pris_y" in kolumner',
        expected: true,
      },
      { description: 'stammer är True', code: 'stammer', expected: true },
    ],
  },
  {
    id: 'da-54',
    track: 'kombinera',
    title: 'När nyckeln saknas',
    xp: 15,
    description:
      'Menyn på väggen har glömt säsongsvarorna. Vad händer med iskaffet och semlorna när du slår ihop?',
    explain:
      '`merge` tar som standard bara med rader där nyckeln finns i **båda** tabellerna (`how="inner"`). Rader i kassan med en produkt som saknas i menyn försvinner – utan varning.\n\nRäkna alltid rader före och efter en merge. Blir det färre än du väntade dig saknas nycklar någonstans.',
    example: 'print(meny)',
    task: 'Uppgift: Slå ihop kassan med `meny` i `ihop`. Spara antalet rader som försvann i `borta`.',
    starterCode: READ + MENY + '\n# Skriv din kod här\n',
    solution:
      READ +
      MENY +
      '\nihop = df.merge(meny, on="produkt")\nborta = len(df) - len(ihop)\nprint(len(df), len(ihop), borta)\n',
    files: KASSA,
    hints: [
      'ihop = df.merge(meny, on="produkt")',
      'Jämför len(df) med len(ihop).',
      'borta = len(df) - len(ihop)',
    ],
    tests: [
      { description: 'ihop har 8992 rader', code: 'len(ihop)', expected: 8992 },
      { description: 'borta är 330', code: 'borta', expected: 330 },
    ],
  },
  {
    id: 'da-55',
    track: 'kombinera',
    title: 'Behåll allt: how="left"',
    xp: 15,
    description:
      'Behåll alla rader i kassan, och hitta vilka produkter som saknas i menyn.',
    explain:
      '`how="left"` behåller varje rad i den vänstra tabellen. Där nyckeln saknas i den högra blir de nya kolumnerna tomma (`NaN`):\n\n```\nihop = df.merge(meny, on="produkt", how="left")\n```\n\nSedan hittar du de saknade med `isna()` – nu vet du vad som behöver läggas till i menyn.',
    example: 'print(df.merge(meny, on="produkt", how="left").tail())',
    task: 'Uppgift: Slå ihop med `how="left"` i `ihop`. Spara produkterna som saknar kategori som en sorterad lista i `saknas`.',
    starterCode: READ + MENY + '\n# Skriv din kod här\n',
    solution:
      READ +
      MENY +
      '\nihop = df.merge(meny, on="produkt", how="left")\nutan = ihop[ihop["kategori"].isna()]\nsaknas = sorted(utan["produkt"].unique())\nprint(len(ihop), saknas)\n',
    files: KASSA,
    hints: [
      'ihop = df.merge(meny, on="produkt", how="left")',
      'ihop[ihop["kategori"].isna()] är raderna utan kategori.',
      'saknas = sorted(utan["produkt"].unique())',
    ],
    tests: [
      {
        description: 'ihop har alla 9322 rader',
        code: 'len(ihop)',
        expected: 9322,
      },
      {
        description: 'saknas är Iskaffe och Semla',
        code: 'saknas',
        expected: ['Iskaffe', 'Semla'],
      },
    ],
  },
  {
    id: 'da-56',
    track: 'kombinera',
    title: 'Varje dag, med vädret',
    xp: 20,
    description:
      'Vädret finns för alla 365 dagar, kassan bara för de 356 kaféet hade öppet. Gör en tabell med alla dagar.',
    explain:
      'Börja med tabellen som har alla dagar, vädret, och slå ihop med `how="left"`. Stängda dagar får `NaN` i summa och kunder – och där är 0 rätt svar, för kaféet sålde ingenting:\n\n```\ndagar = vadret.merge(per_dag, on="datum", how="left")\ndagar = dagar.fillna({"summa": 0, "kunder": 0})\n```\n\n`fillna` med en dictionary fyller olika kolumner med olika värden.',
    example: 'print(per_dag.head())\nprint(vadret.head())',
    task: 'Uppgift: Spara alla dagar med vädret och försäljningen i `dagar`, med 0 de dagar kaféet var stängt. Spara antalet dagar med 0 kr i `noll_dagar`.',
    starterCode: PER_DAG + '\n# Skriv din kod här\n',
    solution:
      PER_DAG +
      '\ndagar = vadret.merge(per_dag, on="datum", how="left")\ndagar = dagar.fillna({"summa": 0, "kunder": 0})\nnoll_dagar = len(dagar[dagar["summa"] == 0])\nprint(dagar.head())\n',
    files: KASSA_OCH_VADER,
    hints: [
      'Börja med vadret: vadret.merge(per_dag, on="datum", how="left")',
      'dagar = dagar.fillna({"summa": 0, "kunder": 0})',
      'noll_dagar = len(dagar[dagar["summa"] == 0])',
    ],
    tests: [
      { description: 'dagar har 365 rader', code: 'len(dagar)', expected: 365 },
      { description: 'noll_dagar är 9', code: 'noll_dagar', expected: 9 },
      {
        description: 'summan är fortfarande 487373',
        code: 'dagar["summa"].sum()',
        expected: 487373,
      },
    ],
  },
  {
    id: 'da-57',
    track: 'kombinera',
    title: 'Regnar det bort kunderna?',
    xp: 15,
    description:
      'Kommer det färre kunder när det regnar? Nu går det att svara på.',
    explain:
      'Med vädret och kunderna i samma tabell grupperar du på regn och tar medelvärdet.\n\nTa bara med dagar kaféet hade öppet. De stängda dagarna har 0 kunder för att dörren var låst, inte för att det regnade – och skulle dra ner snittet.',
    example: 'print(vadret["regn"].value_counts())',
    task: 'Uppgift: Slå ihop vädret med `per_dag` (bara öppna dagar, så vanlig merge räcker) i `oppna`. Spara snittet av kunder per dag med och utan regn, avrundat till en decimal, i `kunder_regn`.',
    starterCode: PER_DAG + '\n# Skriv din kod här\n',
    solution:
      PER_DAG +
      '\noppna = vadret.merge(per_dag, on="datum")\nkunder_regn = oppna.groupby("regn")["kunder"].mean().round(1)\nprint(kunder_regn)\n',
    files: KASSA_OCH_VADER,
    hints: [
      'oppna = vadret.merge(per_dag, on="datum")',
      'Gruppera på "regn" och ta medelvärdet av "kunder".',
      'kunder_regn = oppna.groupby("regn")["kunder"].mean().round(1)',
    ],
    tests: [
      { description: 'oppna har 356 dagar', code: 'len(oppna)', expected: 356 },
      {
        description: 'kunder_regn är 14.1 när det regnar och 16.5 annars',
        code: 'kunder_regn.to_dict()',
        expected: { ja: 14.1, nej: 16.5 },
      },
    ],
  },
  {
    id: 'da-58',
    track: 'kombinera',
    title: 'Lägg tabeller på varandra: concat',
    xp: 15,
    description:
      'Ofta kommer data i flera filer, en per månad eller kvartal. Lägg ihop dem till en.',
    explain:
      '`merge` lägger tabeller **bredvid** varandra. `pd.concat` lägger dem **på** varandra – rad efter rad – när de har samma kolumner:\n\n```\nhalvar = pd.concat([q1, q2])\n```\n\nHär låtsas vi att kassan kom i två filer per kvartal, genom att dela den först.',
    example: 'print(pd.concat([df.head(2), df.tail(2)]))',
    task: 'Uppgift: `q1` och `q2` är årets två första kvartal. Lägg ihop dem i `halvar`. Spara intäkterna för första halvåret i `forsta_halvaret`.',
    starterCode:
      READ +
      'df["datum"] = pd.to_datetime(df["datum"])\nq1 = df[df["datum"].dt.month <= 3]\nq2 = df[(df["datum"].dt.month >= 4) & (df["datum"].dt.month <= 6)]\n\n# Skriv din kod här\n',
    solution:
      READ +
      'df["datum"] = pd.to_datetime(df["datum"])\nq1 = df[df["datum"].dt.month <= 3]\nq2 = df[(df["datum"].dt.month >= 4) & (df["datum"].dt.month <= 6)]\n\nhalvar = pd.concat([q1, q2])\nforsta_halvaret = halvar["summa"].sum()\nprint(len(q1), len(q2), len(halvar))\n',
    files: KASSA,
    hints: [
      'pd.concat får en lista med tabeller.',
      'halvar = pd.concat([q1, q2])',
      'forsta_halvaret = halvar["summa"].sum()',
    ],
    tests: [
      {
        description: 'halvar har 4796 rader',
        code: 'len(halvar)',
        expected: 4796,
      },
      {
        description: 'forsta_halvaret är 252314',
        code: 'forsta_halvaret',
        expected: 252314,
      },
    ],
    sourceChecks: [{ description: 'Använder pd.concat', pattern: /concat\(/ }],
  },
  {
    id: 'da-59',
    track: 'kombinera',
    title: 'SQL in i pandas',
    xp: 20,
    description:
      'Mycket data ligger i databaser. Ställ en SQL-fråga och få svaret som en DataFrame.',
    explain:
      'Python har SQLite inbyggt i modulen `sqlite3`. Här läggs kassan i en databas i minnet med `to_sql`, och sedan frågar du den med `pd.read_sql`:\n\n```\nsvar = pd.read_sql("SELECT produkt, SUM(antal) AS styck FROM kassan GROUP BY produkt", conn)\n```\n\nSvaret är en vanlig DataFrame. Har du gått SQL-kursen känner du igen frågan – ofta räknar man i databasen och fortsätter i pandas.',
    example: 'print(pd.read_sql("SELECT COUNT(*) AS rader FROM kassan", conn))',
    task: 'Uppgift: Fråga databasen efter antalet sålda per produkt, med flest först. Spara svaret i `svar`, och den mest sålda produkten i `etta`.',
    starterCode:
      'import sqlite3\nimport pandas as pd\n\nconn = sqlite3.connect(":memory:")\npd.read_csv("kassan.csv").to_sql("kassan", conn, index=False)\n\n# Skriv din kod här\n',
    solution:
      'import sqlite3\nimport pandas as pd\n\nconn = sqlite3.connect(":memory:")\npd.read_csv("kassan.csv").to_sql("kassan", conn, index=False)\n\nsvar = pd.read_sql("SELECT produkt, SUM(antal) AS styck FROM kassan GROUP BY produkt ORDER BY styck DESC", conn)\netta = svar["produkt"].tolist()[0]\nprint(svar)\n',
    files: KASSA,
    hints: [
      'SELECT produkt, SUM(antal) AS styck FROM kassan GROUP BY produkt',
      'ORDER BY styck DESC sorterar med flest först.',
      'svar = pd.read_sql("SELECT ...", conn) och etta = svar["produkt"].tolist()[0]',
    ],
    tests: [
      { description: 'svar har 12 rader', code: 'len(svar)', expected: 12 },
      {
        description: 'svar har kolumnerna produkt och styck',
        code: 'list(svar.columns)',
        expected: ['produkt', 'styck'],
      },
      {
        description: 'etta är "Bryggkaffe"',
        code: 'etta',
        expected: 'Bryggkaffe',
      },
    ],
    sourceChecks: [
      { description: 'Använder pd.read_sql', pattern: /read_sql\(/ },
    ],
  },
];
