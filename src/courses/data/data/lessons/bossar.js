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
};
