// Testa dig förbi: fyra frågor per bana. Det första svaret är det rätta
// (Quiz.jsx blandar dem). Koden körs i testerna, så svaret måste stämma.
export const QUIZ = {
  pandas: [
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"antal": [2, 1, 3], "pris": [30, 45, 10]})\ndf["summa"] = df["antal"] * df["pris"]\nprint(df["summa"].sum())',
      options: ['135', '76', '6', '[60, 45, 30]'],
      explain: 'Raderna blir 60, 45 och 30, och sum() lägger ihop dem.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"kvitto": [1, 1, 2, 3, 3], "produkt": ["Latte", "Bulle", "Te", "Latte", "Te"]})\nprint(df["kvitto"].nunique())',
      options: ['3', '5', '2', '1'],
      explain: 'Det finns fem rader men bara tre olika kvitton: 1, 2 och 3.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"tid": ["08:10", "12:30", "09:05", "15:00"]})\nprint(len(df[df["tid"] < "09:30"]))',
      options: ['2', '1', '3', '4'],
      explain:
        '08:10 och 09:05 kommer före 09:30 när texten jämförs tecken för tecken.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"produkt": ["Te", "Latte", "Te"], "antal": [1, 4, 2]})\nprint(df.groupby("produkt")["antal"].sum()["Te"])',
      options: ['3', '1', '2', '7'],
      explain: 'Gruppen Te har raderna med antal 1 och 2.',
    },
  ],
  forsta: [
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"a": [1, 2, 3], "b": ["x", "y", "z"]})\nprint(df.shape)',
      options: ['(3, 2)', '(2, 3)', '6', '3'],
      explain: 'shape är (rader, kolumner): tre rader och två kolumner.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"p": ["Te", "Latte", "Te", "Te"]})\nprint(df["p"].nunique())',
      options: ['2', '4', '3', '1'],
      explain: 'Det finns fyra rader men bara två olika värden: Te och Latte.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"p": ["Te", "Latte", "Te", "Te"]})\nprint(df["p"].value_counts(normalize=True)["Te"])',
      options: ['0.75', '3', '0.25', '75'],
      explain: 'Tre av fyra rader är Te, alltså andelen 0.75.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"datum": ["2025-03-04", "2025-01-10", "2025-12-01"]})\nprint(df["datum"].min())',
      options: ['2025-01-10', '2025-03-04', '2025-12-01', '1'],
      explain: 'Datum skrivna som år-månad-dag sorteras rätt även som text.',
    },
  ],
  stada: [
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"a": [1, None, 3], "b": [None, None, 6]})\nprint(len(df.dropna()))',
      options: ['1', '2', '3', '0'],
      explain:
        'dropna() tar bort varje rad där något saknas. Bara sista raden är hel.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"p": ["Te", "Te", "Latte", "Te"], "n": [1, 1, 1, 2]})\nprint(df.duplicated().sum())',
      options: ['1', '2', '3', '0'],
      explain:
        'Bara andra raden är en exakt kopia av en tidigare. Sista raden har ett annat n.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"p": [" latte", "LATTE", "Latte "]})\nprint(df["p"].str.strip().str.capitalize().nunique())',
      options: ['1', '3', '2', '0'],
      explain: 'Efter strip och capitalize heter alla tre "Latte".',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"antal": [2, None, 3]})\nprint(df["antal"].fillna(1).sum())',
      options: ['6.0', '5.0', '6', 'nan'],
      explain:
        'Det tomma värdet blir 1: 2 + 1 + 3 = 6. Kolumnen är decimaltal, eftersom den hade ett NaN.',
    },
  ],
  datum: [
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\nd = pd.to_datetime("2025-03-04")\nprint(d.month)',
      options: ['3', '4', '2025', 'mars'],
      explain: 'Datumet är år-månad-dag, så månaden är 3.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\nd = pd.to_datetime("2025-01-06")\nprint(d.dayofweek)',
      options: ['0', '1', '6', '7'],
      explain: '6 januari 2025 var en måndag, och måndag är 0.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\nd = pd.to_datetime("2025-10-04 15:30")\nprint(d.strftime("%d/%m kl %H"))',
      options: ['04/10 kl 15', '10/04 kl 15', '04/10 kl 30', '2025-10-04'],
      explain: '%d är dagen, %m månaden och %H timmen.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"datum": pd.to_datetime(["2025-01-01", "2025-01-15", "2025-02-01"]), "n": [1, 2, 3]})\nprint(df[df["datum"] < "2025-02-01"]["n"].sum())',
      options: ['3', '6', '1', '5'],
      explain: 'De två datumen i januari är före 1 februari: 1 + 2 = 3.',
    },
  ],
  gruppera: [
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"p": ["Te", "Te", "Latte"], "b": ["kort", "swish", "kort"], "n": [1, 2, 3]})\nprint(len(df.groupby(["p", "b"])["n"].sum()))',
      options: ['3', '2', '4', '6'],
      explain: 'Kombinationerna är Te/kort, Te/swish och Latte/kort.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"kvitto": [1, 1, 2], "summa": [30, 50, 40]})\nprint(df.groupby("kvitto")["summa"].sum().mean())',
      options: ['60.0', '40.0', '120', '80'],
      explain:
        'Kvitto 1 är 80 kr och kvitto 2 är 40 kr. Snittet per kvitto är 60.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ns = pd.Series({"a": 30, "b": 10})\nprint((s / s.sum() * 100)["a"])',
      options: ['75.0', '30', '0.75', '25.0'],
      explain: '30 av 40 är 75 procent.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"p": ["Te", "Te", "Latte"], "b": ["kort", "swish", "kort"]})\nprint(pd.crosstab(df["p"], df["b"]).loc["Latte", "swish"])',
      options: ['0', '1', '2', 'NaN'],
      explain: 'Ingen rad har både Latte och swish, så crosstab räknar 0.',
    },
  ],
  kombinera: [
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\na = pd.DataFrame({"p": ["Te", "Latte", "Semla"]})\nb = pd.DataFrame({"p": ["Te", "Latte"], "k": ["dryck", "kaffe"]})\nprint(len(a.merge(b, on="p")))',
      options: ['2', '3', '5', '1'],
      explain:
        'En vanlig merge tar bara med nycklar som finns i båda. Semla saknas i b.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\na = pd.DataFrame({"p": ["Te", "Latte", "Semla"]})\nb = pd.DataFrame({"p": ["Te", "Latte"], "k": ["dryck", "kaffe"]})\nprint(a.merge(b, on="p", how="left")["k"].isna().sum())',
      options: ['1', '0', '2', '3'],
      explain: 'how="left" behåller Semla, men den får ingen kategori.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\na = pd.DataFrame({"n": [1, 2]})\nb = pd.DataFrame({"n": [3, 4, 5]})\nprint(len(pd.concat([a, b])))',
      options: ['5', '2', '3', '6'],
      explain: 'concat lägger tabellerna på varandra: 2 + 3 rader.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\na = pd.DataFrame({"p": ["Te"], "pris": [30]})\nb = pd.DataFrame({"p": ["Te"], "pris": [32]})\nprint(list(a.merge(b, on="p").columns))',
      options: [
        "['p', 'pris_x', 'pris_y']",
        "['p', 'pris']",
        "['p', 'pris', 'pris']",
        "['pris_x', 'pris_y']",
      ],
      explain:
        'Kolumnen pris finns i båda, så pandas döper om dem till pris_x och pris_y.',
    },
  ],
};
