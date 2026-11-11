import { KASSA } from '../filer';

// Bana 5: gruppera på riktigt. Flera nycklar, flera mått med agg, per
// kvitto i stället för per rad, pivot_table och crosstab, andelar och
// den bästa i varje grupp.
const READ =
  'import pandas as pd\n\ndf = pd.read_csv("kassan.csv")\ndf["summa"] = df["antal"] * df["pris"]\n';
const DATES =
  READ +
  'df["datum"] = pd.to_datetime(df["datum"])\ndf["manad"] = df["datum"].dt.month\ndf["veckodag"] = df["datum"].dt.dayofweek\n';

export const GRUPPERA = [
  {
    id: 'da-41',
    track: 'gruppera',
    title: 'Två nycklar',
    xp: 15,
    description:
      'Hur många lattes betalades med swish? Gruppera på två kolumner på en gång.',
    explain:
      'Ge groupby en lista med kolumner, så blir varje kombination en egen grupp:\n\n```\ng = df.groupby(["produkt", "betalsatt"])["antal"].sum()\n```\n\nSvaret har två nivåer i index. Ett värde hämtas med båda nycklarna: `g["Latte"]["swish"]`. `len(g)` är antalet kombinationer som finns.',
    example:
      'print(df.groupby(["betalsatt", "produkt"])["antal"].sum().head(8))',
    task: 'Uppgift: Spara antalet sålda per produkt och betalsätt i `per_par`. Spara antalet lattes som betalades med swish i `latte_swish`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nper_par = df.groupby(["produkt", "betalsatt"])["antal"].sum()\nlatte_swish = per_par["Latte"]["swish"]\nprint(per_par)\n',
    files: KASSA,
    hints: [
      'groupby får en lista: ["produkt", "betalsatt"].',
      'per_par = df.groupby(["produkt", "betalsatt"])["antal"].sum()',
      'latte_swish = per_par["Latte"]["swish"]',
    ],
    tests: [
      { description: 'latte_swish är 255', code: 'latte_swish', expected: 255 },
      {
        description:
          'per_par har 36 kombinationer (12 produkter × 3 betalsätt)',
        code: 'len(per_par)',
        expected: 36,
      },
    ],
  },
  {
    id: 'da-42',
    track: 'gruppera',
    title: 'Flera mått: agg',
    xp: 15,
    description: 'Summa, medelvärde och antal per produkt – i en enda tabell.',
    explain:
      '`.agg([...])` räknar flera saker per grupp på en gång. Svaret är en tabell med en kolumn per mått:\n\n```\nmatt = df.groupby("produkt")["summa"].agg(["sum", "mean", "count"])\n```\n\nEn rad hämtas med `.loc`: `matt.loc["Latte"]`, och ett värde med `matt.loc["Latte", "mean"]`.',
    example: 'print(df.groupby("betalsatt")["antal"].agg(["sum", "mean"]))',
    task: 'Uppgift: Spara summa, medelvärde och antal av summa per produkt i `matt`. Spara medelvärdet för Latte, avrundat till en decimal, i `latte_snitt`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nmatt = df.groupby("produkt")["summa"].agg(["sum", "mean", "count"])\nlatte_snitt = round(matt.loc["Latte", "mean"], 1)\nprint(matt)\n',
    files: KASSA,
    hints: [
      'matt = df.groupby("produkt")["summa"].agg(["sum", "mean", "count"])',
      'matt.loc["Latte", "mean"] är ett värde.',
      'latte_snitt = round(matt.loc["Latte", "mean"], 1)',
    ],
    tests: [
      {
        description: 'matt har kolumnerna sum, mean och count',
        code: 'list(matt.columns)',
        expected: ['sum', 'mean', 'count'],
      },
      {
        description: 'latte_snitt är 55.4',
        code: 'latte_snitt',
        expected: 55.4,
      },
      {
        description: 'Smörgås har summan 79755 på 1010 rader',
        code: '[matt.loc["Smörgås", "sum"], matt.loc["Smörgås", "count"]]',
        expected: [79755, 1010],
      },
    ],
    sourceChecks: [{ description: 'Använder agg', pattern: /\.agg\(/ }],
  },
  {
    id: 'da-43',
    track: 'gruppera',
    title: 'Egna namn på måtten',
    xp: 15,
    description:
      'Med agg kan varje mått få ett eget namn och räkna på olika kolumner.',
    explain:
      'Skriv `namn=(kolumn, mått)` för varje mått du vill ha:\n\n```\ndf.groupby("produkt").agg(\n    intakt=("summa", "sum"),\n    kvitton=("kvitto", "nunique"),\n)\n```\n\nDå får kolumnerna namn som går att förstå, och du kan räkna olika saker på olika kolumner i samma tabell.',
    example:
      'print(df.groupby("betalsatt").agg(rader=("kvitto", "count"), styck=("antal", "sum")))',
    task: 'Uppgift: Spara en tabell per produkt i `oversikt`, med kolumnerna `intakt` (summan av summa), `styck` (summan av antal) och `kvitton` (antalet olika kvitton).',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\noversikt = df.groupby("produkt").agg(\n    intakt=("summa", "sum"),\n    styck=("antal", "sum"),\n    kvitton=("kvitto", "nunique"),\n)\nprint(oversikt)\n',
    files: KASSA,
    hints: [
      'df.groupby("produkt").agg(intakt=("summa", "sum"), ...)',
      'styck=("antal", "sum")',
      'kvitton=("kvitto", "nunique")',
    ],
    tests: [
      {
        description: 'oversikt har kolumnerna intakt, styck och kvitton',
        code: 'list(oversikt.columns)',
        expected: ['intakt', 'styck', 'kvitton'],
      },
      {
        description: 'Kanelbulle: 57344 kr, 1792 styck, 1438 kvitton',
        code: 'oversikt.loc["Kanelbulle"].tolist()',
        expected: [57344, 1792, 1438],
      },
    ],
  },
  {
    id: 'da-44',
    track: 'gruppera',
    title: 'Per kvitto: snittkvittot',
    xp: 20,
    description:
      'I bana 1 räknade du medelvärdet per rad. Det kaféet vill veta är vad en kund handlar för.',
    explain:
      'Ett kvitto med tre saker är tre rader. Summera först per kvitto, så blir det en rad per kund:\n\n```\nkvitton = df.groupby(["kvitto", "betalsatt"])["summa"].sum().reset_index()\n```\n\nBetalsättet är med som nyckel för att det ska följa med (ett kvitto har bara ett betalsätt). `reset_index()` gör svaret till en tabell igen. Sedan kan du gruppera den nya tabellen.',
    example:
      'kvitton = df.groupby("kvitto")["summa"].sum()\nprint(kvitton.head())',
    task: 'Uppgift: Spara en tabell med en rad per kvitto i `kvitton`, med kolumnerna kvitto, betalsatt och summa. Spara snittkvittot, avrundat till en decimal, i `snittkvitto`, och snittet per betalsätt i `per_betalsatt`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nkvitton = df.groupby(["kvitto", "betalsatt"])["summa"].sum().reset_index()\nsnittkvitto = round(kvitton["summa"].mean(), 1)\nper_betalsatt = kvitton.groupby("betalsatt")["summa"].mean().round(1)\nprint(snittkvitto)\nprint(per_betalsatt)\n',
    files: KASSA,
    hints: [
      'kvitton = df.groupby(["kvitto", "betalsatt"])["summa"].sum().reset_index()',
      'snittkvitto = round(kvitton["summa"].mean(), 1)',
      'per_betalsatt = kvitton.groupby("betalsatt")["summa"].mean().round(1)',
    ],
    tests: [
      {
        description: 'kvitton har 5578 rader',
        code: 'len(kvitton)',
        expected: 5578,
      },
      {
        description: 'snittkvitto är 87.4',
        code: 'snittkvitto',
        expected: 87.4,
      },
      {
        description: 'per_betalsatt är 85.6 kontant, 86.8 kort och 90.4 swish',
        code: 'per_betalsatt.to_dict()',
        expected: { kontant: 85.6, kort: 86.8, swish: 90.4 },
      },
    ],
  },
  {
    id: 'da-45',
    track: 'gruppera',
    title: 'Ett rutnät: pivot_table',
    xp: 20,
    description:
      'Produkter på raderna, veckodagar i kolumnerna. Som en pivottabell i Excel.',
    explain:
      '`pd.pivot_table` gör en tabell där en kolumn blir rader och en annan blir kolumner:\n\n```\nrutnat = pd.pivot_table(df, index="produkt", columns="veckodag", values="antal", aggfunc="sum")\n```\n\n`index` blir raderna, `columns` kolumnerna, `values` det som räknas och `aggfunc` hur. Ett värde hämtas med `rutnat.loc["Latte", 5]`.',
    example:
      'print(pd.pivot_table(df, index="produkt", columns="betalsatt", values="summa", aggfunc="sum"))',
    task: 'Uppgift: Spara antalet sålda per produkt och veckodag i `rutnat`. Spara antalet kanelbullar som såldes på lördagar (veckodag 5) i `bullar_lordag`.',
    starterCode: DATES + '\n# Skriv din kod här\n',
    solution:
      DATES +
      '\nrutnat = pd.pivot_table(df, index="produkt", columns="veckodag", values="antal", aggfunc="sum")\nbullar_lordag = rutnat.loc["Kanelbulle", 5]\nprint(rutnat)\n',
    files: KASSA,
    hints: [
      'index="produkt", columns="veckodag", values="antal", aggfunc="sum"',
      'rutnat = pd.pivot_table(df, index="produkt", columns="veckodag", values="antal", aggfunc="sum")',
      'bullar_lordag = rutnat.loc["Kanelbulle", 5]',
    ],
    tests: [
      {
        description: 'rutnat har 12 rader och 7 kolumner',
        code: 'rutnat.shape',
        expected: [12, 7],
      },
      {
        description: 'bullar_lordag är 355',
        code: 'bullar_lordag',
        expected: 355,
      },
    ],
    sourceChecks: [
      { description: 'Använder pivot_table', pattern: /pivot_table\(/ },
    ],
  },
  {
    id: 'da-46',
    track: 'gruppera',
    title: 'Räkna kombinationer: crosstab',
    xp: 15,
    description:
      'Hur många rader finns det av varje produkt och betalsätt? crosstab räknar direkt.',
    explain:
      '`pd.crosstab(a, b)` räknar hur många rader som har varje kombination av två kolumner. Det är en kortare väg till en pivot_table som räknar:\n\n```\npd.crosstab(df["produkt"], df["betalsatt"])\n```\n\nMed `normalize="index"` blir det andelar per rad i stället.',
    example: 'print(pd.crosstab(df["betalsatt"], df["antal"]))',
    task: 'Uppgift: Spara antalet rader per produkt och betalsätt i `tabell`. Spara antalet rader med Latte och kontant i `latte_kontant`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\ntabell = pd.crosstab(df["produkt"], df["betalsatt"])\nlatte_kontant = tabell.loc["Latte", "kontant"]\nprint(tabell)\n',
    files: KASSA,
    hints: [
      'tabell = pd.crosstab(df["produkt"], df["betalsatt"])',
      'Ett värde hämtas med .loc[rad, kolumn].',
      'latte_kontant = tabell.loc["Latte", "kontant"]',
    ],
    tests: [
      {
        description: 'latte_kontant är 48',
        code: 'latte_kontant',
        expected: 48,
      },
      {
        description: 'Te och swish är 112',
        code: 'tabell.loc["Te", "swish"]',
        expected: 112,
      },
    ],
    sourceChecks: [{ description: 'Använder crosstab', pattern: /crosstab\(/ }],
  },
  {
    id: 'da-47',
    track: 'gruppera',
    title: 'Andelar i procent',
    xp: 15,
    description: 'Hur stor del av kaféets intäkter kommer från smörgåsen?',
    explain:
      'Dela varje grupp med summan av alla, så får du andelen. Gånger 100 blir procent:\n\n```\nper_produkt = df.groupby("produkt")["summa"].sum()\nandel = per_produkt / per_produkt.sum() * 100\n```\n\nRäkningen görs för varje rad på en gång. Kolla att andelarna blir 100 tillsammans.',
    example:
      'antal = df["betalsatt"].value_counts()\nprint(antal / antal.sum() * 100)',
    task: 'Uppgift: Spara andelen av intäkterna per produkt i procent, avrundat till en decimal, i `andel`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nper_produkt = df.groupby("produkt")["summa"].sum()\nandel = (per_produkt / per_produkt.sum() * 100).round(1)\nprint(andel.sort_values(ascending=False))\n',
    files: KASSA,
    hints: [
      'per_produkt = df.groupby("produkt")["summa"].sum()',
      'Dela med per_produkt.sum() och gånger 100.',
      'andel = (per_produkt / per_produkt.sum() * 100).round(1)',
    ],
    tests: [
      {
        description: 'Smörgås är 16.4 %',
        code: 'andel["Smörgås"]',
        expected: 16.4,
      },
      { description: 'Semla är 2.1 %', code: 'andel["Semla"]', expected: 2.1 },
      {
        description: 'andelarna blir 100 tillsammans',
        code: 'round(andel.sum())',
        expected: 100,
      },
    ],
  },
  {
    id: 'da-48',
    track: 'gruppera',
    title: 'Månadens storsäljare',
    xp: 20,
    description:
      'Bryggkaffet säljer mest nästan varje månad. Men inte alltid – vilka månader vinner något annat?',
    explain:
      'Gruppera på månad och produkt, gör svaret till en tabell och sortera med flest först. Gruppera sedan igen på månad och ta `.head(1)`: den första raden i varje grupp, alltså den största.\n\n```\nper = df.groupby(["manad", "produkt"])["antal"].sum().reset_index()\nper = per.sort_values("antal", ascending=False)\nbast = per.groupby("manad").head(1)\n```',
    example: 'print(df.groupby("manad").head(1))',
    task: 'Uppgift: Spara den mest sålda produkten varje månad i `bast`, sorterad efter månad. Spara månaderna där det inte är Bryggkaffe som en lista i `undantag`, och vad som vann dem i `vinnare`.',
    starterCode: DATES + '\n# Skriv din kod här\n',
    solution:
      DATES +
      '\nper = df.groupby(["manad", "produkt"])["antal"].sum().reset_index()\nper = per.sort_values("antal", ascending=False)\nbast = per.groupby("manad").head(1).sort_values("manad")\nandra = bast[bast["produkt"] != "Bryggkaffe"]\nundantag = andra["manad"].tolist()\nvinnare = andra["produkt"].tolist()\nprint(bast)\n',
    files: KASSA,
    hints: [
      'per = df.groupby(["manad", "produkt"])["antal"].sum().reset_index()',
      'Sortera på antal med störst först, och ta per.groupby("manad").head(1).',
      'Filtrera bast där produkten inte är "Bryggkaffe" (!=).',
    ],
    tests: [
      {
        description: 'bast har en rad per månad',
        code: 'len(bast)',
        expected: 12,
      },
      {
        description: 'undantag är [2, 8, 10]',
        code: 'undantag',
        expected: [2, 8, 10],
      },
      {
        description: 'vinnare är Semla, Kanelbulle och Kanelbulle',
        code: 'vinnare',
        expected: ['Semla', 'Kanelbulle', 'Kanelbulle'],
      },
    ],
  },
  {
    id: 'da-49',
    track: 'gruppera',
    title: 'Helg eller vardag?',
    xp: 20,
    description:
      'Hur många fler kunder kommer en helgdag än en vardag – i snitt per dag?',
    explain:
      'En ny kolumn kan vara True eller False: `df["helg"] = df["veckodag"] >= 5`. Gruppera på den, så får du två grupper.\n\nFör ett rättvist snitt delar du antalet kunder med antalet dagar i varje grupp. Två Series med samma index kan delas direkt:\n\n```\nkunder = df.groupby("helg")["kvitto"].nunique()\ndagar = df.groupby("helg")["datum"].nunique()\n```',
    example: 'print(df.groupby(df["veckodag"] >= 5)["summa"].sum())',
    task: 'Uppgift: Lägg till kolumnen `helg`. Spara antalet kunder per dag i snitt, för vardag och helg, avrundat till en decimal, i `per_dag`.',
    starterCode: DATES + '\n# Skriv din kod här\n',
    solution:
      DATES +
      '\ndf["helg"] = df["veckodag"] >= 5\nkunder = df.groupby("helg")["kvitto"].nunique()\ndagar = df.groupby("helg")["datum"].nunique()\nper_dag = (kunder / dagar).round(1)\nprint(per_dag)\n',
    files: KASSA,
    hints: [
      'df["helg"] = df["veckodag"] >= 5',
      'kunder = df.groupby("helg")["kvitto"].nunique() och dagar likadant med datum.',
      'per_dag = (kunder / dagar).round(1)',
    ],
    tests: [
      {
        description: 'per_dag är 14.6 på vardagar och 18.3 på helger',
        code: '[per_dag[False], per_dag[True]]',
        expected: [14.6, 18.3],
      },
    ],
  },
];
