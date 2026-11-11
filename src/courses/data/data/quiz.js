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
};
