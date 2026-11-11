import { KASSA, KASSA_OCH_VADER } from '../filer';

// Bana 7: diagram med matplotlib. Rättningen tittar aldrig på pixlar:
// __figur() i harness.py läser vad diagrammet visar (typ, titel,
// etiketter, staplarnas höjder, linjernas värden, antal punkter).
const READ =
  'import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("kassan.csv")\ndf["summa"] = df["antal"] * df["pris"]\n';
const MONTHS =
  READ +
  'df["datum"] = pd.to_datetime(df["datum"])\ndf["manad"] = df["datum"].dt.month\n';
const PER_PRODUKT =
  READ + 'per_produkt = df.groupby("produkt")["antal"].sum()\n';

const PER_MANAD = [
  43197, 41876, 41712, 36729, 44133, 44667, 30294, 44513, 40298, 39224, 42936,
  37794,
];

export const DIAGRAM = [
  {
    id: 'da-61',
    track: 'diagram',
    title: 'Din första linje: plt.plot',
    xp: 10,
    description:
      'Siffror i en tabell är svåra att se mönster i. Rita intäkterna per månad som en linje.',
    explain:
      '`matplotlib.pyplot` är Pythons vanligaste verktyg för diagram, och alla importerar det som `plt`. `plt.plot(x, y)` ritar en linje genom punkterna:\n\n```\nplt.plot(per_manad.index, per_manad.values)\n```\n\n`.index` är månaderna (x-axeln) och `.values` intäkterna (y-axeln). Diagrammet visas under utskriften när du kör koden.',
    example: 'plt.plot([1, 2, 3], [10, 30, 20])',
    task: 'Uppgift: Spara intäkterna per månad i `per_manad` och rita dem som en linje.',
    starterCode: MONTHS + '\n# Skriv din kod här\n',
    solution:
      MONTHS +
      '\nper_manad = df.groupby("manad")["summa"].sum()\nplt.plot(per_manad.index, per_manad.values)\n',
    files: KASSA,
    hints: [
      'per_manad = df.groupby("manad")["summa"].sum()',
      'plt.plot(x, y) ritar en linje.',
      'plt.plot(per_manad.index, per_manad.values)',
    ],
    tests: [
      {
        description: 'Ett linjediagram',
        code: '__figur()["typ"]',
        expected: ['linje'],
      },
      {
        description: 'Linjen visar intäkterna per månad',
        code: '__figur()["linjer"]',
        expected: [PER_MANAD],
      },
    ],
  },
  {
    id: 'da-62',
    track: 'diagram',
    title: 'Staplar: plt.bar',
    xp: 10,
    description:
      'Att jämföra produkter är ett jobb för staplar, inte för en linje.',
    explain:
      'En linje passar när x-axeln är tid och punkterna hör ihop. När du jämför saker – produkter, betalsätt – är staplar bättre:\n\n```\nplt.bar(per_produkt.index, per_produkt.values)\n```\n\nNamnen hamnar under staplarna. Är de långa kan de gå in i varandra. `plt.xticks(rotation=45)` lutar dem.',
    example: 'plt.bar(["Te", "Latte"], [3, 7])',
    task: 'Uppgift: Rita antalet sålda per produkt (`per_produkt`) som staplar, och luta namnen 45 grader.',
    starterCode: PER_PRODUKT + '\n# Skriv din kod här\n',
    solution:
      PER_PRODUKT +
      '\nplt.bar(per_produkt.index, per_produkt.values)\nplt.xticks(rotation=45)\n',
    files: KASSA,
    hints: [
      'plt.bar(x, höjder) ritar staplar.',
      'plt.bar(per_produkt.index, per_produkt.values)',
      'plt.xticks(rotation=45)',
    ],
    tests: [
      {
        description: 'Ett stapeldiagram',
        code: '__figur()["typ"]',
        expected: ['staplar'],
      },
      {
        description: 'En stapel per produkt',
        code: 'len(__figur()["staplar"])',
        expected: 12,
      },
      {
        description: 'Staplarna har produkternas namn',
        code: '__figur()["etiketter"][:3]',
        expected: ['Bryggkaffe', 'Cappuccino', 'Iskaffe'],
      },
    ],
  },
  {
    id: 'da-63',
    track: 'diagram',
    title: 'Titel och axlar',
    xp: 10,
    description:
      'Ett diagram utan titel och axlar är en gissningslek. Säg vad det visar.',
    explain:
      'Tre rader gör diagrammet begripligt för någon annan:\n\n```\nplt.title("Intäkter per månad 2025")\nplt.xlabel("Månad")\nplt.ylabel("Kronor")\n```\n\nSkriv alltid enheten: kronor, styck, kunder. Utan den vet ingen om 40 000 är bra.',
    example: 'plt.plot([1, 2], [3, 4])\nplt.title("Test")\nplt.ylabel("Styck")',
    task: 'Uppgift: Rita intäkterna per månad som en linje med titeln `Intäkter per månad 2025`, x-axeln `Månad` och y-axeln `Kronor`.',
    starterCode:
      MONTHS +
      'per_manad = df.groupby("manad")["summa"].sum()\nplt.plot(per_manad.index, per_manad.values)\n\n# Skriv din kod här\n',
    solution:
      MONTHS +
      'per_manad = df.groupby("manad")["summa"].sum()\nplt.plot(per_manad.index, per_manad.values)\n\nplt.title("Intäkter per månad 2025")\nplt.xlabel("Månad")\nplt.ylabel("Kronor")\n',
    files: KASSA,
    hints: [
      'plt.title("Intäkter per månad 2025")',
      'plt.xlabel(...) är x-axeln, plt.ylabel(...) y-axeln.',
      'plt.ylabel("Kronor")',
    ],
    tests: [
      {
        description: 'Titeln är "Intäkter per månad 2025"',
        code: '__figur()["titel"]',
        expected: 'Intäkter per månad 2025',
      },
      {
        description: 'Axlarna heter Månad och Kronor',
        code: '[__figur()["x"], __figur()["y"]]',
        expected: ['Månad', 'Kronor'],
      },
    ],
  },
  {
    id: 'da-64',
    track: 'diagram',
    title: 'Sortera innan du ritar',
    xp: 15,
    description:
      'Staplar i bokstavsordning är svåra att läsa. Sortera dem, så syns topplistan direkt.',
    explain:
      'Staplarna ritas i den ordning värdena kommer. Sorterar du först blir det en topplista, och ögat ser genast vad som är störst och minst:\n\n```\nsorterad = per_produkt.sort_values(ascending=False)\n```\n\nDet är den enklaste förbättringen av nästan alla stapeldiagram.',
    example: 'print(per_produkt.sort_values(ascending=False).head(3))',
    task: 'Uppgift: Rita antalet sålda per produkt som staplar, med flest först. Ge diagrammet titeln `Sålda 2025` och y-axeln `Styck`.',
    starterCode: PER_PRODUKT + '\n# Skriv din kod här\n',
    solution:
      PER_PRODUKT +
      '\nsorterad = per_produkt.sort_values(ascending=False)\nplt.bar(sorterad.index, sorterad.values)\nplt.xticks(rotation=45)\nplt.title("Sålda 2025")\nplt.ylabel("Styck")\n',
    files: KASSA,
    hints: [
      'sorterad = per_produkt.sort_values(ascending=False)',
      'Rita sorterad i stället för per_produkt.',
      'plt.title("Sålda 2025") och plt.ylabel("Styck")',
    ],
    tests: [
      {
        description: 'Staplarna är sorterade med flest först',
        code: '__figur()["staplar"]',
        expected: [
          2081, 1792, 1385, 1227, 1199, 1112, 865, 690, 463, 329, 209, 189,
        ],
      },
      {
        description: 'Titeln och y-axeln',
        code: '[__figur()["titel"], __figur()["y"]]',
        expected: ['Sålda 2025', 'Styck'],
      },
    ],
  },
  {
    id: 'da-65',
    track: 'diagram',
    title: 'Liggande staplar: barh',
    xp: 10,
    description:
      'Långa namn som Kardemummabulle får plats bättre när staplarna ligger ner.',
    explain:
      '`plt.barh` ritar liggande staplar: namnen står till vänster och går att läsa utan att luta huvudet.\n\nDen första stapeln hamnar längst **ner**. Vill du ha den största överst sorterar du med minst först: `sort_values()`.',
    example: 'plt.barh(["Te", "Kardemummabulle"], [3, 7])',
    task: 'Uppgift: Rita antalet sålda per produkt som liggande staplar, med den största överst. Ge diagrammet titeln `Sålda 2025`.',
    starterCode: PER_PRODUKT + '\n# Skriv din kod här\n',
    solution:
      PER_PRODUKT +
      '\nsorterad = per_produkt.sort_values()\nplt.barh(sorterad.index, sorterad.values)\nplt.title("Sålda 2025")\n',
    files: KASSA,
    hints: [
      'plt.barh(namn, värden) ritar liggande staplar.',
      'Sortera med minst först, så hamnar den största överst.',
      'sorterad = per_produkt.sort_values()',
    ],
    tests: [
      {
        description: 'Liggande staplar',
        code: '__figur()["typ"]',
        expected: ['liggande staplar'],
      },
      {
        description: 'Bryggkaffe överst (sist i listan)',
        code: '__figur()["y_etiketter"][-1]',
        expected: 'Bryggkaffe',
      },
      {
        description: 'Titeln är "Sålda 2025"',
        code: '__figur()["titel"]',
        expected: 'Sålda 2025',
      },
    ],
  },
  {
    id: 'da-66',
    track: 'diagram',
    title: 'Histogram: hur stora är kvittona?',
    xp: 15,
    description:
      'Snittkvittot är 87 kr. Men handlar de flesta för ungefär det, eller är det några få stora?',
    explain:
      'Ett **histogram** delar in värdena i lika breda fack och visar hur många som hamnar i varje. Det visar formen på datan – något ett medelvärde aldrig kan:\n\n```\nplt.hist(kvitton, bins=20)\n```\n\n`bins` är antalet fack. Staplarna står kant i kant, eftersom facken gör det.',
    example: 'plt.hist([1, 2, 2, 3, 3, 3, 4], bins=4)',
    task: 'Uppgift: Spara summan per kvitto i `kvitton` och rita den som ett histogram med 20 fack. Titeln ska vara `Kvittonas storlek` och x-axeln `Kronor`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nkvitton = df.groupby("kvitto")["summa"].sum()\nplt.hist(kvitton, bins=20)\nplt.title("Kvittonas storlek")\nplt.xlabel("Kronor")\n',
    files: KASSA,
    hints: [
      'kvitton = df.groupby("kvitto")["summa"].sum()',
      'plt.hist(kvitton, bins=20)',
      'plt.title(...) och plt.xlabel("Kronor")',
    ],
    tests: [
      {
        description: 'Ett histogram',
        code: '__figur()["typ"]',
        expected: ['histogram'],
      },
      {
        description: '20 fack',
        code: 'len(__figur()["staplar"])',
        expected: 20,
      },
      {
        description: 'Alla 5578 kvitton är med',
        code: 'sum(__figur()["staplar"])',
        expected: 5578,
      },
      {
        description: 'Titeln och x-axeln',
        code: '[__figur()["titel"], __figur()["x"]]',
        expected: ['Kvittonas storlek', 'Kronor'],
      },
    ],
  },
  {
    id: 'da-67',
    track: 'diagram',
    title: 'Punkter: värme och iskaffe',
    xp: 15,
    description:
      'Bossen i förra banan delade dagarna i varma och svala. Ett punktdiagram visar alla dagar på en gång.',
    explain:
      '`plt.scatter(x, y)` ritar en punkt per rad. Det passar när du vill se om två saker hänger ihop: går punkterna uppåt åt höger ökar det ena med det andra.\n\n```\nplt.scatter(dagar["temperatur"], dagar["antal"])\n```',
    example: 'plt.scatter([1, 2, 3], [2, 4, 5])',
    task: 'Uppgift: Rita ett punktdiagram med temperaturen på x-axeln och antalet iskaffe på y-axeln, en punkt per öppen dag. Axlarna ska heta `Temperatur` och `Iskaffe`.',
    starterCode:
      READ +
      'vadret = pd.read_csv("vadret.csv")\niskaffe = df[df["produkt"] == "Iskaffe"].groupby("datum")["antal"].sum().reset_index()\noppna = df.groupby("datum")["kvitto"].nunique().reset_index()\ndagar = oppna.merge(vadret, on="datum").merge(iskaffe, on="datum", how="left").fillna({"antal": 0})\n\n# Skriv din kod här\n',
    solution:
      READ +
      'vadret = pd.read_csv("vadret.csv")\niskaffe = df[df["produkt"] == "Iskaffe"].groupby("datum")["antal"].sum().reset_index()\noppna = df.groupby("datum")["kvitto"].nunique().reset_index()\ndagar = oppna.merge(vadret, on="datum").merge(iskaffe, on="datum", how="left").fillna({"antal": 0})\n\nplt.scatter(dagar["temperatur"], dagar["antal"])\nplt.xlabel("Temperatur")\nplt.ylabel("Iskaffe")\n',
    files: KASSA_OCH_VADER,
    hints: [
      'plt.scatter(x, y) ritar punkter.',
      'plt.scatter(dagar["temperatur"], dagar["antal"])',
      'plt.xlabel("Temperatur") och plt.ylabel("Iskaffe")',
    ],
    tests: [
      {
        description: 'Ett punktdiagram',
        code: '__figur()["typ"]',
        expected: ['punkter'],
      },
      {
        description: 'En punkt per öppen dag',
        code: '__figur()["punkter"]',
        expected: 356,
      },
      {
        description: 'Axlarna heter Temperatur och Iskaffe',
        code: '[__figur()["x"], __figur()["y"]]',
        expected: ['Temperatur', 'Iskaffe'],
      },
    ],
  },
  {
    id: 'da-68',
    track: 'diagram',
    title: 'Två linjer och en förklaring',
    xp: 20,
    description:
      'Latte säljer hela året, iskaffe bara på sommaren. Rita båda i samma diagram.',
    explain:
      'Anropa `plt.plot` två gånger, så hamnar båda linjerna i samma diagram. Ge varje linje ett namn med `label=`, och visa namnen med `plt.legend()`:\n\n```\nplt.plot(tabell.index, tabell["Latte"], label="Latte")\nplt.legend()\n```\n\nTabellen gör du med pivot_table. `fill_value=0` ger 0 de månader en produkt inte såldes alls, i stället för `NaN`.',
    example:
      'plt.plot([1, 2], [3, 4], label="A")\nplt.plot([1, 2], [4, 1], label="B")\nplt.legend()',
    task: 'Uppgift: Spara antalet sålda per månad och produkt i `tabell` med pivot_table och `fill_value=0`. Rita Latte och Iskaffe som två linjer med namnen `Latte` och `Iskaffe`, och visa förklaringen.',
    starterCode: MONTHS + '\n# Skriv din kod här\n',
    solution:
      MONTHS +
      '\ntabell = pd.pivot_table(df, index="manad", columns="produkt", values="antal", aggfunc="sum", fill_value=0)\nplt.plot(tabell.index, tabell["Latte"], label="Latte")\nplt.plot(tabell.index, tabell["Iskaffe"], label="Iskaffe")\nplt.legend()\n',
    files: KASSA,
    hints: [
      'tabell = pd.pivot_table(df, index="manad", columns="produkt", values="antal", aggfunc="sum", fill_value=0)',
      'plt.plot(tabell.index, tabell["Latte"], label="Latte") och likadant för Iskaffe.',
      'plt.legend() visar namnen.',
    ],
    tests: [
      {
        description: 'Två linjer: Latte och Iskaffe',
        code: '__figur()["linjer"]',
        expected: [
          [106, 85, 105, 124, 137, 148, 89, 112, 121, 139, 106, 113],
          [0, 0, 0, 0, 14, 59, 40, 53, 39, 4, 0, 0],
        ],
      },
      {
        description: 'Förklaringen visar Latte och Iskaffe',
        code: '__figur()["forklaring"]',
        expected: ['Latte', 'Iskaffe'],
      },
    ],
  },
  {
    id: 'da-69',
    track: 'diagram',
    title: 'Två diagram bredvid varandra',
    xp: 20,
    description: 'När två diagram hör ihop vill man se dem sida vid sida.',
    explain:
      '`plt.subplots(1, 2)` gör en figur med en rad och två diagram. Du får figuren och de två diagrammen (**axes**) tillbaka:\n\n```\nfig, (vanster, hoger) = plt.subplots(1, 2, figsize=(10, 4))\nvanster.bar(...)\nvanster.set_title("...")\n```\n\nPå ett axes heter metoderna nästan som förut, men med `set_`: `set_title`, `set_xlabel`, `set_ylabel`. `figsize` är storleken i tum.',
    example:
      'fig, (a, b) = plt.subplots(1, 2)\na.bar(["x", "y"], [1, 2])\nb.plot([1, 2, 3])',
    task: 'Uppgift: Gör en figur med två diagram. Till vänster staplar med antalet kunder per timme, med titeln `Kunder per timme`. Till höger en linje med intäkterna per månad, med titeln `Intäkter per månad`.',
    starterCode:
      MONTHS +
      'df["timme"] = df["tid"].str[:2].astype("int64")\nper_timme = df.groupby("timme")["kvitto"].nunique()\nper_manad = df.groupby("manad")["summa"].sum()\n\n# Skriv din kod här\n',
    solution:
      MONTHS +
      'df["timme"] = df["tid"].str[:2].astype("int64")\nper_timme = df.groupby("timme")["kvitto"].nunique()\nper_manad = df.groupby("manad")["summa"].sum()\n\nfig, (vanster, hoger) = plt.subplots(1, 2, figsize=(10, 4))\nvanster.bar(per_timme.index, per_timme.values)\nvanster.set_title("Kunder per timme")\nhoger.plot(per_manad.index, per_manad.values)\nhoger.set_title("Intäkter per månad")\n',
    files: KASSA,
    hints: [
      'fig, (vanster, hoger) = plt.subplots(1, 2, figsize=(10, 4))',
      'vanster.bar(per_timme.index, per_timme.values) och vanster.set_title(...)',
      'hoger.plot(per_manad.index, per_manad.values) och hoger.set_title(...)',
    ],
    tests: [
      {
        description: 'Två diagram i figuren',
        code: '__figur()["diagram"]',
        expected: 2,
      },
      {
        description: 'Vänster: staplar med kunder per timme',
        code: '[__figur(0)["typ"], __figur(0)["titel"], __figur(0)["staplar"]]',
        expected: [
          ['staplar'],
          'Kunder per timme',
          [189, 527, 440, 341, 506, 940, 692, 511, 768, 457, 207],
        ],
      },
      {
        description: 'Höger: en linje med intäkter per månad',
        code: '[__figur(1)["typ"], __figur(1)["titel"], __figur(1)["linjer"]]',
        expected: [['linje'], 'Intäkter per månad', [PER_MANAD]],
      },
    ],
    sourceChecks: [
      { description: 'Använder plt.subplots', pattern: /subplots\(/ },
    ],
  },
];
