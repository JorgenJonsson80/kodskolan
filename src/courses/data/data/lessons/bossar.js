import { KASSA, KASSA_OCH_VADER, RORIG_OCH_REN } from '../filer';

// En boss per bana: en större uppgift som använder allt från banan, utan
// ledtrådar. Banan räknas inte som klar förrän bossen är besegrad.
// index.js lägger varje boss sist i sin bana.

const BOSS_INTRO = 'Bossen har inga ledtrådar – visa vad du kan! ';

export const BOSSES = {
  pandas: {
    id: 'da-boss-pandas',
    track: 'pandas',
    title: 'Boss: Kaféets topplista',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Ägaren till Kafé Kanel vill veta vad kaféet tjänar mest pengar på, och vilken dag som var årets bästa.',
    task: `Uppgift: Gör ägarens topplista.
  1. Läs in \`kassan.csv\` till \`df\` och lägg till kolumnen \`summa\` (antal gånger pris).
  2. Spara intäkterna per produkt i \`topp5\`: de fem som drog in mest, störst först.
  3. Skriv ut en rad per produkt, t.ex. \`1. Smörgås: 79755 kr\`.
  4. Spara intäkterna per datum i \`per_dag\`, och skriv till sist ut \`Bästa dagen: 2025-09-27 (2675 kr)\` – med den dag som drog in mest.`,
    starterCode: 'import pandas as pd\n\n# Skriv din kod här\n',
    solution: `import pandas as pd

df = pd.read_csv("kassan.csv")
df["summa"] = df["antal"] * df["pris"]

per_produkt = df.groupby("produkt")["summa"].sum()
topp5 = per_produkt.sort_values(ascending=False).head(5)
plats = 1
for produkt, summa in topp5.items():
    print(f"{plats}. {produkt}: {summa} kr")
    plats += 1

per_dag = df.groupby("datum")["summa"].sum()
basta = per_dag.sort_values(ascending=False)
print(f"Bästa dagen: {basta.index[0]} ({basta.tolist()[0]} kr)")
`,
    files: KASSA,
    hints: [],
    tests: [
      {
        description: 'topp5 är de fem produkterna som drog in mest',
        code: 'topp5.to_dict()',
        expected: {
          Smörgås: 79755,
          Bryggkaffe: 72835,
          Latte: 62325,
          Kanelbulle: 57344,
          Cappuccino: 50358,
        },
      },
      {
        description: 'topp5 är sorterad med störst först',
        code: 'list(topp5.index)',
        expected: [
          'Smörgås',
          'Bryggkaffe',
          'Latte',
          'Kanelbulle',
          'Cappuccino',
        ],
      },
      {
        description: 'per_dag har en rad per dag kaféet var öppet',
        code: 'len(per_dag)',
        expected: 356,
      },
      {
        description: 'Topplistan och bästa dagen skrivs ut',
        code: '__output',
        expected: [
          '1. Smörgås: 79755 kr',
          '2. Bryggkaffe: 72835 kr',
          '3. Latte: 62325 kr',
          '4. Kanelbulle: 57344 kr',
          '5. Cappuccino: 50358 kr',
          'Bästa dagen: 2025-09-27 (2675 kr)',
        ],
      },
    ],
  },
  forsta: {
    id: 'da-boss-forsta',
    track: 'forsta',
    title: 'Boss: Faktarutan',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'En ny analytiker börjar på kaféet i morgon. Gör en faktaruta om kassan som hen kan läsa på en minut.',
    task: `Uppgift: Läs in \`kassan.csv\` till \`df\` och skriv ut faktarutan, rad för rad:
  1. \`Kafé Kanel 2025\`
  2. \`Rader: 9322\` – antalet rader, från shape
  3. \`Kvitton: 5578\` – antalet olika kvitton
  4. \`Öppet: 356 dagar, 2025-01-01 till 2025-12-31\` – antalet olika datum, första och sista
  5. \`Produkter: 12\` – antalet olika produkter
  6. \`Vanligast betalsätt: kort (78.2 %)\` – det vanligaste betalsättet och dess andel av raderna i procent, med en decimal

Spara siffrorna i \`rader\`, \`kvitton\`, \`dagar\` och \`produkter\` också. Inga siffror får skrivas in för hand.`,
    starterCode: 'import pandas as pd\n\n# Skriv din kod här\n',
    solution: `import pandas as pd

df = pd.read_csv("kassan.csv")
rader = df.shape[0]
kvitton = df["kvitto"].nunique()
dagar = df["datum"].nunique()
produkter = df["produkt"].nunique()
andelar = df["betalsatt"].value_counts(normalize=True)
vanligast = andelar.index[0]
procent = round(andelar.tolist()[0] * 100, 1)

print("Kafé Kanel 2025")
print(f"Rader: {rader}")
print(f"Kvitton: {kvitton}")
print(f"Öppet: {dagar} dagar, {df['datum'].min()} till {df['datum'].max()}")
print(f"Produkter: {produkter}")
print(f"Vanligast betalsätt: {vanligast} ({procent} %)")
`,
    files: KASSA,
    hints: [],
    tests: [
      { description: 'rader är 9322', code: 'rader', expected: 9322 },
      { description: 'kvitton är 5578', code: 'kvitton', expected: 5578 },
      { description: 'dagar är 356', code: 'dagar', expected: 356 },
      { description: 'produkter är 12', code: 'produkter', expected: 12 },
      {
        description: 'Faktarutan skrivs ut',
        code: '__output',
        expected: [
          'Kafé Kanel 2025',
          'Rader: 9322',
          'Kvitton: 5578',
          'Öppet: 356 dagar, 2025-01-01 till 2025-12-31',
          'Produkter: 12',
          'Vanligast betalsätt: kort (78.2 %)',
        ],
      },
    ],
    sourceChecks: [
      {
        description: 'Skriver inte in 9322 för hand',
        pattern: /^(?![\s\S]*9322)/,
      },
      {
        description: 'Skriver inte in 5578 för hand',
        pattern: /^(?![\s\S]*5578)/,
      },
    ],
  },
  stada: {
    id: 'da-boss-stada',
    track: 'stada',
    title: 'Boss: Den stökiga kassan',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Kaféets bokförare har fått den riktiga marsfilen, kassan_mars.csv. Din städade fil ska bli exakt likadan – rad för rad.',
    task: `Uppgift: Läs in \`kassan_rorig.csv\` till \`df\` och städa den:
  1. Ta bort raderna där allt saknas.
  2. Ett tomt antal betyder 1.
  3. Ta bort dubbletterna.
  4. Gör om pris till tal, och kvitto, antal och pris till heltal.
  5. Betalsätten ska vara med små bokstäver utan mellanslag.
  6. Produkterna ska heta som i den rena filen: stor första bokstav, inga mellanslag, och Kanelbulle i stället för Kanelbullar.
  7. Läs in \`kassan_mars.csv\` till \`ren\`. Spara \`df.values.tolist() == ren.values.tolist()\` i \`lika\` och skriv ut \`Städad: 786 rader. Lika med kassan_mars.csv: True\`.`,
    starterCode: 'import pandas as pd\n\n# Skriv din kod här\n',
    solution: `import pandas as pd

df = pd.read_csv("kassan_rorig.csv")
df = df.dropna(how="all")
df["antal"] = df["antal"].fillna(1)
df = df.drop_duplicates()

text = df["pris"].str.replace(" kr", "").str.replace(",", ".")
df["pris"] = pd.to_numeric(text)
df["kvitto"] = df["kvitto"].astype("int64")
df["antal"] = df["antal"].astype("int64")
df["pris"] = df["pris"].astype("int64")

df["betalsatt"] = df["betalsatt"].str.strip().str.lower()
df["produkt"] = df["produkt"].str.strip().str.capitalize()
df["produkt"] = df["produkt"].replace({"Kanelbullar": "Kanelbulle"})

ren = pd.read_csv("kassan_mars.csv")
lika = df.values.tolist() == ren.values.tolist()
print(f"Städad: {len(df)} rader. Lika med kassan_mars.csv: {lika}")
`,
    files: RORIG_OCH_REN,
    hints: [],
    tests: [
      { description: 'df har 786 rader', code: 'len(df)', expected: 786 },
      {
        description: 'kvitto, antal och pris är heltal',
        code: '[str(df[k].dtype) for k in ["kvitto", "antal", "pris"]]',
        expected: ['int64', 'int64', 'int64'],
      },
      {
        description: 'df är exakt lika med kassan_mars.csv',
        code: 'df.values.tolist() == pd.read_csv("kassan_mars.csv").values.tolist()',
        expected: true,
      },
      { description: 'lika är True', code: 'lika', expected: true },
      {
        description: 'Resultatet skrivs ut',
        code: '__output',
        expected: ['Städad: 786 rader. Lika med kassan_mars.csv: True'],
      },
    ],
  },
  datum: {
    id: 'da-boss-datum',
    track: 'datum',
    title: 'Boss: Kaféets kalender',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Ägaren ska planera nästa år: vilken månad är bäst, vilken veckodag och när på lördagen behövs flest händer?',
    task: `Uppgift: Läs in \`kassan.csv\`, lägg till \`summa\` och gör om datum. Skriv sedan ut, rad för rad:
  1. \`Bästa månaden: juni (44667 kr)\` – månaden med störst intäkt, med namnet från \`MANADER\`.
  2. \`Bästa veckodagen: lördag (1908 kr per dag)\` – veckodagen med störst snitt per dag (avrundat till heltal), med namnet från \`DAGAR\`.
  3. \`Rusning på lördagar: kl 12 (203 kunder)\` – timmen på lördagar med flest kunder (olika kvitton).

Spara månadens nummer i \`manad\`, veckodagens nummer i \`veckodag\` och timmen i \`timme\`.`,
    starterCode:
      'import pandas as pd\n\nMANADER = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"]\nDAGAR = ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag", "söndag"]\n\n# Skriv din kod här\n',
    solution: `import pandas as pd

MANADER = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"]
DAGAR = ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag", "söndag"]

df = pd.read_csv("kassan.csv")
df["summa"] = df["antal"] * df["pris"]
df["tidpunkt"] = pd.to_datetime(df["datum"] + " " + df["tid"])
df["datum"] = pd.to_datetime(df["datum"])

per_manad = df.groupby(df["datum"].dt.month)["summa"].sum().sort_values(ascending=False)
manad = per_manad.index[0]
print(f"Bästa månaden: {MANADER[manad - 1]} ({per_manad.tolist()[0]} kr)")

dagar = df.groupby("datum")["summa"].sum().reset_index()
dagar["veckodag"] = dagar["datum"].dt.dayofweek
snitt = dagar.groupby("veckodag")["summa"].mean().round().sort_values(ascending=False)
veckodag = snitt.index[0]
print(f"Bästa veckodagen: {DAGAR[veckodag]} ({int(snitt.tolist()[0])} kr per dag)")

lordag = df[df["datum"].dt.dayofweek == 5]
per_timme = lordag.groupby(lordag["tidpunkt"].dt.hour)["kvitto"].nunique().sort_values(ascending=False)
timme = per_timme.index[0]
print(f"Rusning på lördagar: kl {timme} ({per_timme.tolist()[0]} kunder)")
`,
    files: KASSA,
    hints: [],
    tests: [
      { description: 'manad är 6', code: 'manad', expected: 6 },
      { description: 'veckodag är 5', code: 'veckodag', expected: 5 },
      { description: 'timme är 12', code: 'timme', expected: 12 },
      {
        description: 'Kalendern skrivs ut',
        code: '__output',
        expected: [
          'Bästa månaden: juni (44667 kr)',
          'Bästa veckodagen: lördag (1908 kr per dag)',
          'Rusning på lördagar: kl 12 (203 kunder)',
        ],
      },
    ],
  },
  gruppera: {
    id: 'da-boss-gruppera',
    track: 'gruppera',
    title: 'Boss: Månadsrapporten',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Varje månad vill ägaren ha en kort rapport. Gör den för mars.',
    task: `Uppgift: Läs in \`kassan.csv\`, lägg till \`summa\` och spara marsraderna i \`mars\`.
  1. Spara en tabell per produkt i \`rapport\` med kolumnerna \`antal\` (summan av antal) och \`intakt\` (summan av summa), sorterad med störst intäkt först.
  2. Lägg till kolumnen \`andel\`: produktens del av marsintäkterna i procent, avrundad till en decimal.
  3. Spara snittkvittot i mars, avrundat till en decimal, i \`snittkvitto\`.
  4. Skriv ut rapporten:
\`\`\`
Månadsrapport: mars
1. Bryggkaffe: 6755 kr (16.2 %)
2. Smörgås: 5525 kr (13.2 %)
3. Soppa: 4845 kr (11.6 %)
Totalt: 41712 kr på 470 kvitton
Snittkvitto: 88.7 kr
\`\`\``,
    starterCode: 'import pandas as pd\n\n# Skriv din kod här\n',
    solution: `import pandas as pd

df = pd.read_csv("kassan.csv")
df["summa"] = df["antal"] * df["pris"]
df["datum"] = pd.to_datetime(df["datum"])
mars = df[df["datum"].dt.month == 3]

rapport = mars.groupby("produkt").agg(
    antal=("antal", "sum"),
    intakt=("summa", "sum"),
).sort_values("intakt", ascending=False)
rapport["andel"] = (rapport["intakt"] / rapport["intakt"].sum() * 100).round(1)

kvitton = mars.groupby("kvitto")["summa"].sum()
snittkvitto = round(kvitton.mean(), 1)

print("Månadsrapport: mars")
topp = rapport.head(3)
plats = 1
for produkt, intakt, andel in zip(topp.index, topp["intakt"], topp["andel"]):
    print(f"{plats}. {produkt}: {intakt} kr ({andel} %)")
    plats += 1
print(f"Totalt: {rapport['intakt'].sum()} kr på {len(kvitton)} kvitton")
print(f"Snittkvitto: {snittkvitto} kr")
`,
    files: KASSA,
    hints: [],
    tests: [
      {
        description: 'rapport har kolumnerna antal, intakt och andel',
        code: 'list(rapport.columns)',
        expected: ['antal', 'intakt', 'andel'],
      },
      {
        description: 'rapport är sorterad med störst intäkt först',
        code: 'list(rapport.index[:3])',
        expected: ['Bryggkaffe', 'Smörgås', 'Soppa'],
      },
      {
        description: 'snittkvitto är 88.7',
        code: 'snittkvitto',
        expected: 88.7,
      },
      {
        description: 'Rapporten skrivs ut',
        code: '__output',
        expected: [
          'Månadsrapport: mars',
          '1. Bryggkaffe: 6755 kr (16.2 %)',
          '2. Smörgås: 5525 kr (13.2 %)',
          '3. Soppa: 4845 kr (11.6 %)',
          'Totalt: 41712 kr på 470 kvitton',
          'Snittkvitto: 88.7 kr',
        ],
      },
    ],
  },
  kombinera: {
    id: 'da-boss-kombinera',
    track: 'kombinera',
    title: 'Boss: Iskaffe och värme',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Ägaren tror att iskaffet säljer när det är varmt. Ta reda på om det stämmer, med kassan och vädret.',
    task: `Uppgift: Läs in \`kassan.csv\` och \`vadret.csv\`.
  1. Spara antalet sålda iskaffe per datum i en tabell, \`iskaffe\`, med kolumnerna datum och antal.
  2. Spara alla dagar kaféet hade öppet, med temperaturen och antalet iskaffe, i \`dagar\`. En öppen dag utan iskaffe ska ha antal 0.
  3. Lägg till kolumnen \`varmt\`: True när det var 20 grader eller mer.
  4. Spara snittet av iskaffe per dag för svala och varma dagar, avrundat till en decimal, i \`snitt\`.
  5. Skriv ut:
\`\`\`
Varma dagar: 18 st, 4.4 iskaffe per dag
Svala dagar: 338 st, 0.4 iskaffe per dag
Ägaren har rätt: True
\`\`\`
(Ägaren har rätt om varma dagar säljer minst dubbelt så mycket.)`,
    starterCode: 'import pandas as pd\n\n# Skriv din kod här\n',
    solution: `import pandas as pd

df = pd.read_csv("kassan.csv")
vadret = pd.read_csv("vadret.csv")

iskaffe = df[df["produkt"] == "Iskaffe"]
iskaffe = iskaffe.groupby("datum")["antal"].sum().reset_index()

oppna = df.groupby("datum")["kvitto"].nunique().reset_index()
dagar = oppna.merge(vadret, on="datum")
dagar = dagar.merge(iskaffe, on="datum", how="left")
dagar = dagar.fillna({"antal": 0})
dagar["varmt"] = dagar["temperatur"] >= 20

snitt = dagar.groupby("varmt")["antal"].mean().round(1)
antal = dagar["varmt"].value_counts()
print(f"Varma dagar: {antal[True]} st, {snitt[True]} iskaffe per dag")
print(f"Svala dagar: {antal[False]} st, {snitt[False]} iskaffe per dag")
print(f"Ägaren har rätt: {snitt[True] >= 2 * snitt[False]}")
`,
    files: KASSA_OCH_VADER,
    hints: [],
    tests: [
      {
        description: 'dagar har en rad per öppen dag',
        code: 'len(dagar)',
        expected: 356,
      },
      {
        description: 'alla iskaffe är med',
        code: 'dagar["antal"].sum()',
        expected: 209,
      },
      {
        description: 'snitt är 0.4 svala och 4.4 varma dagar',
        code: '[snitt[False], snitt[True]]',
        expected: [0.4, 4.4],
      },
      {
        description: 'Svaret skrivs ut',
        code: '__output',
        expected: [
          'Varma dagar: 18 st, 4.4 iskaffe per dag',
          'Svala dagar: 338 st, 0.4 iskaffe per dag',
          'Ägaren har rätt: True',
        ],
      },
    ],
  },
  diagram: {
    id: 'da-boss-diagram',
    track: 'diagram',
    title: 'Boss: Kaféets vecka i en figur',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Ägaren ska bemanna kaféet nästa år och vill se veckan i en enda figur, som går att sätta upp i personalrummet.',
    task: `Uppgift: Läs in \`kassan.csv\`, lägg till \`summa\` och gör om datum. Gör en figur med två diagram bredvid varandra:
  1. Till vänster: staplar med snittintäkten per dag för varje veckodag (som i bana 4, avrundat till heltal), med namnen från \`DAGAR\` under staplarna. Titeln ska vara \`Snitt per dag\` och y-axeln \`Kronor\`.
  2. Till höger: en linje med antalet kunder (olika kvitton) per timme på lördagar. Titeln ska vara \`Kunder på lördagar\` och x-axeln \`Timme\`.`,
    starterCode:
      'import pandas as pd\nimport matplotlib.pyplot as plt\n\nDAGAR = ["mån", "tis", "ons", "tor", "fre", "lör", "sön"]\n\n# Skriv din kod här\n',
    solution: `import pandas as pd
import matplotlib.pyplot as plt

DAGAR = ["mån", "tis", "ons", "tor", "fre", "lör", "sön"]

df = pd.read_csv("kassan.csv")
df["summa"] = df["antal"] * df["pris"]
df["tidpunkt"] = pd.to_datetime(df["datum"] + " " + df["tid"])
df["datum"] = pd.to_datetime(df["datum"])

dagar = df.groupby("datum")["summa"].sum().reset_index()
dagar["veckodag"] = dagar["datum"].dt.dayofweek
snitt = dagar.groupby("veckodag")["summa"].mean().round()

lordag = df[df["datum"].dt.dayofweek == 5]
per_timme = lordag.groupby(lordag["tidpunkt"].dt.hour)["kvitto"].nunique()

fig, (vanster, hoger) = plt.subplots(1, 2, figsize=(10, 4))
vanster.bar(DAGAR, snitt.values)
vanster.set_title("Snitt per dag")
vanster.set_ylabel("Kronor")
hoger.plot(per_timme.index, per_timme.values)
hoger.set_title("Kunder på lördagar")
hoger.set_xlabel("Timme")
`,
    files: KASSA,
    hints: [],
    tests: [
      {
        description: 'Två diagram i figuren',
        code: '__figur()["diagram"]',
        expected: 2,
      },
      {
        description: 'Vänster: snittet per veckodag som staplar',
        code: '__figur(0)["staplar"]',
        expected: [1206, 1190, 1219, 1271, 1447, 1908, 1340],
      },
      {
        description: 'Vänster: veckodagarnas namn under staplarna',
        code: '__figur(0)["etiketter"]',
        expected: ['mån', 'tis', 'ons', 'tor', 'fre', 'lör', 'sön'],
      },
      {
        description: 'Vänster: titel och y-axel',
        code: '[__figur(0)["titel"], __figur(0)["y"]]',
        expected: ['Snitt per dag', 'Kronor'],
      },
      {
        description: 'Höger: kunder per timme på lördagar som en linje',
        code: '__figur(1)["linjer"]',
        expected: [[105, 83, 68, 102, 203, 139, 107, 159, 93, 42]],
      },
      {
        description: 'Höger: titel och x-axel',
        code: '[__figur(1)["titel"], __figur(1)["x"]]',
        expected: ['Kunder på lördagar', 'Timme'],
      },
    ],
  },
  statistik: {
    id: 'da-boss-statistik',
    track: 'statistik',
    title: 'Boss: Vilka dagar var konstiga?',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'I banan hittade du 18 dagar som stack ut – men 13 var bara lördagar, som alltid är stora. Jämför i stället varje dag med andra dagar av samma veckodag.',
    task: `Uppgift: Utgå från \`per_dag\` (intäkten per datum, med kolumnen \`veckodag\`).
  1. Spara medelvärdet och standardavvikelsen av summa per veckodag i \`normalt\`, en tabell med kolumnerna veckodag, mean och std.
  2. Slå ihop \`per_dag\` med \`normalt\` på veckodag och spara i \`dagar\`.
  3. Lägg till kolumnen \`avvikelse\`: (summa minus mean) delat med std, avrundat till en decimal. Det är hur många standardavvikelser dagen ligger från en vanlig dag av samma sort.
  4. Spara dagarna där avvikelsen är större än 2.5 eller mindre än -2.5 i \`konstiga\`, sorterade efter datum.
  5. Skriv ut en rad per dag, t.ex. \`2025-04-04 fredag: 549 kr (-2.8)\`, med namnet från \`DAGAR\`.`,
    starterCode:
      'import pandas as pd\n\nDAGAR = ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag", "söndag"]\n\ndf = pd.read_csv("kassan.csv")\ndf["summa"] = df["antal"] * df["pris"]\nper_dag = df.groupby("datum")["summa"].sum().reset_index()\nper_dag["veckodag"] = pd.to_datetime(per_dag["datum"]).dt.dayofweek\n\n# Skriv din kod här\n',
    solution: `import pandas as pd

DAGAR = ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag", "söndag"]

df = pd.read_csv("kassan.csv")
df["summa"] = df["antal"] * df["pris"]
per_dag = df.groupby("datum")["summa"].sum().reset_index()
per_dag["veckodag"] = pd.to_datetime(per_dag["datum"]).dt.dayofweek

normalt = per_dag.groupby("veckodag")["summa"].agg(["mean", "std"]).reset_index()
dagar = per_dag.merge(normalt, on="veckodag")
dagar["avvikelse"] = ((dagar["summa"] - dagar["mean"]) / dagar["std"]).round(1)
konstiga = dagar[(dagar["avvikelse"] > 2.5) | (dagar["avvikelse"] < -2.5)]
konstiga = konstiga.sort_values("datum")

for datum, veckodag, summa, avvikelse in zip(konstiga["datum"], konstiga["veckodag"], konstiga["summa"], konstiga["avvikelse"]):
    print(f"{datum} {DAGAR[veckodag]}: {summa} kr ({avvikelse})")
`,
    files: KASSA,
    hints: [],
    tests: [
      {
        description: 'normalt har en rad per veckodag',
        code: 'len(normalt)',
        expected: 7,
      },
      {
        description: 'konstiga är tre dagar',
        code: 'konstiga["datum"].tolist()',
        expected: ['2025-04-04', '2025-05-18', '2025-07-25'],
      },
      {
        description: 'Dagarna skrivs ut',
        code: '__output',
        expected: [
          '2025-04-04 fredag: 549 kr (-2.8)',
          '2025-05-18 söndag: 2036 kr (2.6)',
          '2025-07-25 fredag: 2285 kr (2.6)',
        ],
      },
    ],
  },
};
