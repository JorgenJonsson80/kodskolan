import { KASSA } from '../filer';

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
};
