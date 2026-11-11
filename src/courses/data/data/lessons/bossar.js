import { KASSA, RORIG_OCH_REN } from '../filer';

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
};
