import { KASSA } from '../filer';

// Bana 4: datum och tid. Datumet i kassan är text tills det görs om med
// pd.to_datetime. Sedan går det att fråga efter månad, veckodag och
// timme, filtrera på datum och summera per vecka.
const READ =
  'import pandas as pd\n\ndf = pd.read_csv("kassan.csv")\ndf["summa"] = df["antal"] * df["pris"]\n';
const DATES = READ + 'df["datum"] = pd.to_datetime(df["datum"])\n';

export const DATUM = [
  {
    id: 'da-31',
    track: 'datum',
    title: 'Text till datum: to_datetime',
    xp: 10,
    description:
      'Datumet i kassan är bara text. Gör om det till riktiga datum, så att pandas vet vad det är.',
    explain:
      '`pd.to_datetime(df["datum"])` gör om texten "2025-03-04" till ett datum. Spara tillbaka i kolumnen:\n\n```\ndf["datum"] = pd.to_datetime(df["datum"])\n```\n\nNu har kolumnen typen `datetime64` och en egen verktygslåda, `.dt`. `df["datum"].dt.year` ger året för varje rad.',
    example:
      'df["datum"] = pd.to_datetime(df["datum"])\nprint(df["datum"].dtype)',
    task: 'Uppgift: Gör om kolumnen datum till datum. Spara de olika år som finns som en lista i `ar`, med `.dt.year.unique()` och `list(...)`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\ndf["datum"] = pd.to_datetime(df["datum"])\nar = list(df["datum"].dt.year.unique())\nprint(df["datum"].dtype, ar)\n',
    files: KASSA,
    hints: [
      'df["datum"] = pd.to_datetime(df["datum"])',
      'df["datum"].dt.year ger året på varje rad.',
      'ar = list(df["datum"].dt.year.unique())',
    ],
    tests: [
      {
        description: 'datum är datum, inte text',
        code: 'str(df["datum"].dtype).startswith("datetime64")',
        expected: true,
      },
      { description: 'ar är [2025]', code: 'ar', expected: [2025] },
    ],
    sourceChecks: [
      { description: 'Använder pd.to_datetime', pattern: /to_datetime\(/ },
    ],
  },
  {
    id: 'da-32',
    track: 'datum',
    title: 'Per månad: dt.month',
    xp: 15,
    description: 'Vilken månad drog kaféet in mest pengar?',
    explain:
      '`df["datum"].dt.month` ger månaden som ett tal, 1 för januari till 12 för december. Spara den i en egen kolumn och gruppera på den:\n\n```\ndf["manad"] = df["datum"].dt.month\nper_manad = df.groupby("manad")["summa"].sum()\n```\n\nPå samma sätt finns `.dt.day` (dagen i månaden) och `.dt.year`.',
    example: 'print(df["datum"].dt.month.head())',
    task: 'Uppgift: Lägg till kolumnen `manad`. Spara intäkterna per månad i `per_manad`, och numret på månaden som drog in mest i `basta_manad`.',
    starterCode: DATES + '\n# Skriv din kod här\n',
    solution:
      DATES +
      '\ndf["manad"] = df["datum"].dt.month\nper_manad = df.groupby("manad")["summa"].sum()\nbasta_manad = per_manad.sort_values(ascending=False).index[0]\nprint(per_manad)\n',
    files: KASSA,
    hints: [
      'df["manad"] = df["datum"].dt.month',
      'per_manad = df.groupby("manad")["summa"].sum()',
      'Sortera med störst först och ta .index[0].',
    ],
    tests: [
      {
        description: 'per_manad[7] är 30294 (juli, med en vecka stängt)',
        code: 'per_manad[7]',
        expected: 30294,
      },
      {
        description: 'basta_manad är 6 (juni)',
        code: 'basta_manad',
        expected: 6,
      },
    ],
  },
  {
    id: 'da-33',
    track: 'datum',
    title: 'Veckodagen: dt.dayofweek',
    xp: 15,
    description: 'Vilken veckodag kommer flest kunder?',
    explain:
      '`df["datum"].dt.dayofweek` ger veckodagen som ett tal: **0 är måndag** och 6 är söndag. Det finns också `.dt.day_name()`, men den ger namnen på engelska.\n\nVill du ha svenska namn kan du hämta dem ur en lista:\n\n```\nDAGAR = ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag", "söndag"]\nprint(DAGAR[5])\n```',
    example: 'print(df["datum"].dt.dayofweek.head())',
    task: 'Uppgift: Lägg till kolumnen `veckodag`. Spara antalet kunder (olika kvitton) per veckodag i `kunder`, och namnet på veckodagen med flest i `basta_dag` med hjälp av `DAGAR`.',
    starterCode:
      DATES +
      'DAGAR = ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag", "söndag"]\n\n# Skriv din kod här\n',
    solution:
      DATES +
      'DAGAR = ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag", "söndag"]\n\ndf["veckodag"] = df["datum"].dt.dayofweek\nkunder = df.groupby("veckodag")["kvitto"].nunique()\nbasta_dag = DAGAR[kunder.sort_values(ascending=False).index[0]]\nprint(kunder)\nprint(basta_dag)\n',
    files: KASSA,
    hints: [
      'df["veckodag"] = df["datum"].dt.dayofweek',
      'Antalet kunder är antalet olika kvitton: groupby("veckodag")["kvitto"].nunique()',
      'Talet för den bästa dagen är index[0] efter sortering. Slå upp det i DAGAR.',
    ],
    tests: [
      {
        description: 'kunder är 698 på måndagar och 1101 på lördagar',
        code: '[kunder[0], kunder[5]]',
        expected: [698, 1101],
      },
      {
        description: 'basta_dag är "lördag"',
        code: 'basta_dag',
        expected: 'lördag',
      },
    ],
  },
  {
    id: 'da-34',
    track: 'datum',
    title: 'Klockslaget: datum och tid ihop',
    xp: 15,
    description:
      'Datum och tid står i två kolumner. Sätt ihop dem, så kan du fråga efter timmen.',
    explain:
      'Text sätts ihop med `+`, även hela kolumner. Läs in datum som text, lägg till ett mellanslag och tiden, och gör om alltihop till en tidpunkt:\n\n```\ndf["tidpunkt"] = pd.to_datetime(df["datum"] + " " + df["tid"])\n```\n\n`.dt.hour` ger timmen, 12 för allt mellan 12:00 och 12:59.',
    example: 'print((df["datum"] + " " + df["tid"]).head())',
    task: 'Uppgift: Lägg till kolumnen `tidpunkt` och kolumnen `timme`. Spara antalet kunder per timme i `per_timme`, och den timme då flest kommer i `rusning`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\ndf["tidpunkt"] = pd.to_datetime(df["datum"] + " " + df["tid"])\ndf["timme"] = df["tidpunkt"].dt.hour\nper_timme = df.groupby("timme")["kvitto"].nunique()\nrusning = per_timme.sort_values(ascending=False).index[0]\nprint(per_timme)\n',
    files: KASSA,
    hints: [
      'df["datum"] + " " + df["tid"] ger text som "2025-01-01 08:24".',
      'df["timme"] = df["tidpunkt"].dt.hour',
      'per_timme = df.groupby("timme")["kvitto"].nunique()',
    ],
    tests: [
      {
        description: 'per_timme[12] är 940 och per_timme[15] är 768',
        code: '[per_timme[12], per_timme[15]]',
        expected: [940, 768],
      },
      { description: 'rusning är 12', code: 'rusning', expected: 12 },
    ],
  },
  {
    id: 'da-35',
    track: 'datum',
    title: 'Bara februari',
    xp: 10,
    description:
      'Semlorna säljs bara i februari och fram till fettisdagen. Hur många blev det i februari?',
    explain:
      'Med ett datum kan du filtrera på delar av det:\n\n```\nfeb = df[df["datum"].dt.month == 2]\n```\n\nSedan filtrerar du vidare som vanligt, till exempel på produkt.',
    example: 'jan = df[df["datum"].dt.month == 1]\nprint(len(jan))',
    task: 'Uppgift: Spara februaris rader i `feb`, och antalet sålda semlor i februari (summan av antal) i `semlor`.',
    starterCode: DATES + '\n# Skriv din kod här\n',
    solution:
      DATES +
      '\nfeb = df[df["datum"].dt.month == 2]\nsemlor = feb[feb["produkt"] == "Semla"]["antal"].sum()\nprint(len(feb), semlor)\n',
    files: KASSA,
    hints: [
      'feb = df[df["datum"].dt.month == 2]',
      'Filtrera feb på produkten "Semla".',
      'semlor = feb[feb["produkt"] == "Semla"]["antal"].sum()',
    ],
    tests: [
      { description: 'feb har 752 rader', code: 'len(feb)', expected: 752 },
      { description: 'semlor är 162', code: 'semlor', expected: 162 },
    ],
  },
  {
    id: 'da-36',
    track: 'datum',
    title: 'Mellan två datum',
    xp: 15,
    description:
      'Juli var en svag månad. Hur många dagar var kaféet öppet i juli?',
    explain:
      'En datumkolumn kan jämföras med text som ser ut som ett datum. pandas gör om texten själv:\n\n```\njuli = df[(df["datum"] >= "2025-07-01") & (df["datum"] <= "2025-07-31")]\n```\n\nRäkna sedan olika datum med `nunique()`. Juli har 31 dagar, så skillnaden är dagarna kaféet var stängt.',
    example: 'print(len(df[df["datum"] < "2025-01-08"]))',
    task: 'Uppgift: Spara raderna från 1 till 31 juli i `juli`. Spara antalet dagar kaféet hade öppet i juli i `oppet`, och antalet stängda dagar i `stangt`.',
    starterCode: DATES + '\n# Skriv din kod här\n',
    solution:
      DATES +
      '\njuli = df[(df["datum"] >= "2025-07-01") & (df["datum"] <= "2025-07-31")]\noppet = juli["datum"].nunique()\nstangt = 31 - oppet\nprint(oppet, stangt)\n',
    files: KASSA,
    hints: [
      'Två villkor med & och parenteser runt vart och ett.',
      'oppet = juli["datum"].nunique()',
      'stangt = 31 - oppet',
    ],
    tests: [
      { description: 'oppet är 24', code: 'oppet', expected: 24 },
      { description: 'stangt är 7', code: 'stangt', expected: 7 },
    ],
  },
  {
    id: 'da-37',
    track: 'datum',
    title: 'Datum till text: strftime',
    xp: 15,
    description:
      'Vilken dag såldes flest semlor? Och hur skriver man ut ett datum snyggt?',
    explain:
      'När du grupperar på datum blir index datum. `.index[0]` är då ett datum, som skrivs ut med klockslag: `2025-03-04 00:00:00`.\n\n`.strftime("%Y-%m-%d")` gör om ett datum till text i det format du vill: `%Y` är året, `%m` månaden och `%d` dagen. `"%d/%m"` ger "04/03".',
    example:
      'forsta = df["datum"].min()\nprint(forsta.strftime("%Y-%m-%d"))\nprint(forsta.strftime("%d/%m"))',
    task: 'Uppgift: Spara antalet sålda semlor per datum i `per_dag`. Spara dagen med flest som text, som "2025-03-04", i `semmeldag`.',
    starterCode: DATES + '\n# Skriv din kod här\n',
    solution:
      DATES +
      '\nsemlor = df[df["produkt"] == "Semla"]\nper_dag = semlor.groupby("datum")["antal"].sum()\nbasta = per_dag.sort_values(ascending=False).index[0]\nsemmeldag = basta.strftime("%Y-%m-%d")\nprint(semmeldag)\n',
    files: KASSA,
    hints: [
      'Filtrera fram semlorna och gruppera på datum.',
      'per_dag.sort_values(ascending=False).index[0] är den bästa dagen.',
      'semmeldag = basta.strftime("%Y-%m-%d")',
    ],
    tests: [
      {
        description: 'semmeldag är "2025-03-04" – fettisdagen',
        code: 'semmeldag',
        expected: '2025-03-04',
      },
      {
        description: 'per_dag har 14 semlor den dagen',
        code: 'per_dag.max()',
        expected: 14,
      },
    ],
    sourceChecks: [{ description: 'Använder strftime', pattern: /strftime\(/ }],
  },
  {
    id: 'da-38',
    track: 'datum',
    title: 'Per vecka: resample',
    xp: 15,
    description:
      'Hur gick det vecka för vecka? Hitta veckan då kaféet var stängt.',
    explain:
      '`resample` delar in tiden i lika långa bitar, till exempel veckor, och räknar på varje bit. Datumet måste vara index först:\n\n```\nveckor = df.set_index("datum").resample("W")["summa"].sum()\n```\n\n`"W"` betyder vecka (som slutar på söndag) och `"MS"` månad. En vecka utan försäljning får summan 0. Den syns alltså, i stället för att försvinna som i groupby.',
    example: 'print(df.set_index("datum").resample("MS")["summa"].sum())',
    task: 'Uppgift: Spara intäkterna per vecka i `veckor`. Spara den sämsta veckans summa i `samst`, och söndagen den veckan slutade som text i `stangd_vecka`.',
    starterCode: DATES + '\n# Skriv din kod här\n',
    solution:
      DATES +
      '\nveckor = df.set_index("datum").resample("W")["summa"].sum()\nsamst = veckor.min()\nstangd_vecka = veckor.sort_values().index[0].strftime("%Y-%m-%d")\nprint(veckor)\n',
    files: KASSA,
    hints: [
      'veckor = df.set_index("datum").resample("W")["summa"].sum()',
      'samst = veckor.min()',
      'Sortera minst först, ta .index[0] och gör om till text med strftime.',
    ],
    tests: [
      {
        description: 'veckor har 53 veckor',
        code: 'len(veckor)',
        expected: 53,
      },
      { description: 'samst är 0', code: 'samst', expected: 0 },
      {
        description: 'stangd_vecka är "2025-07-20"',
        code: 'stangd_vecka',
        expected: '2025-07-20',
      },
    ],
    sourceChecks: [{ description: 'Använder resample', pattern: /resample\(/ }],
  },
  {
    id: 'da-39',
    track: 'datum',
    title: 'Snitt per dag, inte summa',
    xp: 20,
    description:
      'Summan per veckodag beror på hur många sådana dagar kaféet hade öppet. Jämför rättvist: snittet per dag.',
    explain:
      'Veckodagarna har inte lika många dagar i datan: 2025 hade 53 onsdagar men 52 av de andra, och kaféet var stängt en vecka i juli och över jul. En veckodag med fler öppna dagar får en större summa, utan att den är en bättre dag. Jämför i stället **snittet per dag**:\n\n1. Summera per datum: `df.groupby("datum")["summa"].sum()`.\n2. `.reset_index()` gör om svaret till en tabell igen, med datum som kolumn.\n3. Lägg till veckodagen och ta medelvärdet per veckodag.',
    example:
      'dagar = df.groupby("datum")["summa"].sum().reset_index()\nprint(dagar.head())',
    task: 'Uppgift: Spara en tabell med intäkterna per datum i `dagar`, med kolumnerna datum och summa. Lägg till kolumnen `veckodag`. Spara snittet per veckodag, avrundat till heltal med `.round()`, i `snitt`.',
    starterCode: DATES + '\n# Skriv din kod här\n',
    solution:
      DATES +
      '\ndagar = df.groupby("datum")["summa"].sum().reset_index()\ndagar["veckodag"] = dagar["datum"].dt.dayofweek\nsnitt = dagar.groupby("veckodag")["summa"].mean().round()\nprint(snitt)\n',
    files: KASSA,
    hints: [
      'dagar = df.groupby("datum")["summa"].sum().reset_index()',
      'dagar["veckodag"] = dagar["datum"].dt.dayofweek',
      'snitt = dagar.groupby("veckodag")["summa"].mean().round()',
    ],
    tests: [
      { description: 'dagar har 356 rader', code: 'len(dagar)', expected: 356 },
      {
        description:
          'snitt är 1190 på tisdagar, 1219 på onsdagar och 1908 på lördagar',
        code: '[snitt[1], snitt[2], snitt[5]]',
        expected: [1190, 1219, 1908],
      },
    ],
  },
];
