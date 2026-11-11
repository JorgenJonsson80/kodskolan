import { RORIG } from '../filer';

// Bana 3: städa data. kassan_rorig.csv är kaféets mars med felen riktig
// data har (se scripts/data/kafe.py). Varje övning börjar där den förra
// slutade, så att eleven städar samma fil steg för steg. Bossen gör allt
// på en gång och jämför med den rena filen.
const READ = 'import pandas as pd\n\ndf = pd.read_csv("kassan_rorig.csv")\n';
const STEG = [
  'df = df.dropna(how="all")\n',
  'df["antal"] = df["antal"].fillna(1)\n',
  'df = df.drop_duplicates()\n',
  'df["pris"] = pd.to_numeric(df["pris"].str.replace(" kr", "").str.replace(",", "."))\n',
  'df["kvitto"] = df["kvitto"].astype("int64")\ndf["antal"] = df["antal"].astype("int64")\ndf["pris"] = df["pris"].astype("int64")\n',
  'df["betalsatt"] = df["betalsatt"].str.strip().str.lower()\n',
];
// Filen inläst och städad med de första n stegen.
const after = n => READ + STEG.slice(0, n).join('');

export const STADA = [
  {
    id: 'da-21',
    track: 'stada',
    title: 'Hitta tomma värden: isna',
    xp: 10,
    description:
      'Kassan har krånglat i mars. Börja med att ta reda på var värden saknas.',
    explain:
      'En tom ruta i en CSV-fil blir `NaN` i pandas: _not a number_, inget värde. `df.isna()` ger True för varje tom ruta, och `.sum()` räknar dem per kolumn (True räknas som 1):\n\n```\ndf.isna().sum()\n```\n\nTitta på svaret: nio rader saknar allt, men kolumnen antal saknar fler. Det är två olika problem.',
    example: 'print(df.isna().sum())',
    task: 'Uppgift: Läs in `kassan_rorig.csv` till `df`. Spara antalet tomma värden per kolumn i `saknas`.',
    starterCode: 'import pandas as pd\n\n# Skriv din kod här\n',
    solution: READ + 'saknas = df.isna().sum()\nprint(saknas)\n',
    files: RORIG,
    hints: [
      'df = pd.read_csv("kassan_rorig.csv")',
      'df.isna() ger True där ett värde saknas.',
      'saknas = df.isna().sum()',
    ],
    tests: [
      {
        description: 'saknas["antal"] är 33',
        code: 'saknas["antal"]',
        expected: 33,
      },
      {
        description: 'saknas["produkt"] är 9',
        code: 'saknas["produkt"]',
        expected: 9,
      },
    ],
    sourceChecks: [{ description: 'Använder isna', pattern: /\.isna\(\)/ }],
  },
  {
    id: 'da-22',
    track: 'stada',
    title: 'Ta bort tomma rader: dropna',
    xp: 15,
    description:
      'De helt tomma raderna ska bort. Men se upp: dropna() tar mer än du tror.',
    explain:
      '`df.dropna()` tar bort varje rad där **något** värde saknas. Här skulle det slänga riktiga köp, bara för att antalet råkade vara tomt.\n\n`df.dropna(how="all")` tar bara bort rader där **allt** saknas. Tänk alltid efter: vad är det jag tar bort?\n\nSvaret är en ny tabell, så spara den: `df = df.dropna(how="all")`.',
    example: 'print(len(df), len(df.dropna(how="all")))',
    task: 'Uppgift: Spara antalet rader som blir kvar med vanlig `dropna()` i `for_mycket`. Ta sedan bort bara de helt tomma raderna från `df`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nfor_mycket = len(df.dropna())\ndf = df.dropna(how="all")\nprint(for_mycket, len(df))\n',
    files: RORIG,
    hints: [
      'for_mycket = len(df.dropna())',
      'how="all" tar bara bort rader där allt saknas.',
      'df = df.dropna(how="all")',
    ],
    tests: [
      { description: 'for_mycket är 776', code: 'for_mycket', expected: 776 },
      { description: 'df har 800 rader kvar', code: 'len(df)', expected: 800 },
    ],
  },
  {
    id: 'da-23',
    track: 'stada',
    title: 'Fyll i ett värde: fillna',
    xp: 15,
    description:
      'Antalet saknas på några rader. Kaféet vet varför: kassan skriver inget när man köper en.',
    explain:
      '`df["antal"].fillna(1)` byter varje tomt värde i kolumnen mot 1. Spara tillbaka i kolumnen:\n\n```\ndf["antal"] = df["antal"].fillna(1)\n```\n\nFyll bara i när du **vet** vad som ska stå där. Här har kaféet berättat att tomt betyder en. Att gissa, till exempel med medelvärdet, ändrar svaret utan att någon märker det.',
    example: 'print(df["antal"].fillna(0).sum())',
    task: 'Uppgift: Fyll i 1 där antal saknas. Spara antalet tomma värden i kolumnen efteråt i `tomma` och summan av antal i `totalt`.',
    starterCode: after(1) + '\n# Skriv din kod här\n',
    solution:
      after(1) +
      '\ndf["antal"] = df["antal"].fillna(1)\ntomma = df["antal"].isna().sum()\ntotalt = df["antal"].sum()\nprint(tomma, totalt)\n',
    files: RORIG,
    hints: [
      'df["antal"] = df["antal"].fillna(1)',
      'tomma = df["antal"].isna().sum()',
      'totalt = df["antal"].sum()',
    ],
    tests: [
      { description: 'tomma är 0', code: 'tomma', expected: 0 },
      { description: 'totalt är 989', code: 'totalt', expected: 989 },
    ],
    sourceChecks: [{ description: 'Använder fillna', pattern: /\.fillna\(/ }],
  },
  {
    id: 'da-24',
    track: 'stada',
    title: 'Hitta dubbletter: duplicated',
    xp: 10,
    description:
      'Ibland har kassan slagit in samma rad två gånger. Hur många gånger?',
    explain:
      '`df.duplicated()` ger True för varje rad som är exakt lika med en rad tidigare i tabellen. Den första förekomsten räknas inte, bara kopiorna. `.sum()` räknar dem.\n\nTänk efter innan du tar bort: två lika rader kan vara två riktiga köp. Här är det samma kvitto, samma tid och samma produkt, och kassan har varje produkt bara en gång per kvitto. Då är det kopior.',
    example: 'print(df[df.duplicated()].head())',
    task: 'Uppgift: Spara antalet dubbletter i `dubbletter`, och dubblettraderna i `kopior`.',
    starterCode: after(2) + '\n# Skriv din kod här\n',
    solution:
      after(2) +
      '\ndubbletter = df.duplicated().sum()\nkopior = df[df.duplicated()]\nprint(kopior)\n',
    files: RORIG,
    hints: [
      'df.duplicated() ger True för varje kopia.',
      'dubbletter = df.duplicated().sum()',
      'kopior = df[df.duplicated()]',
    ],
    tests: [
      { description: 'dubbletter är 14', code: 'dubbletter', expected: 14 },
      { description: 'kopior har 14 rader', code: 'len(kopior)', expected: 14 },
    ],
  },
  {
    id: 'da-25',
    track: 'stada',
    title: 'Ta bort dubbletter',
    xp: 10,
    description: 'Ta bort kopiorna, så att varje köp räknas en gång.',
    explain:
      '`df.drop_duplicates()` tar bort kopiorna och behåller den första av varje. Spara tillbaka i `df`.\n\nKolla alltid med `len(df)` före och efter, så att det försvann så många rader som du väntade dig.',
    example: 'print(len(df.drop_duplicates()))',
    task: 'Uppgift: Ta bort dubbletterna från `df`. Spara antalet rader efteråt i `rader`.',
    starterCode: after(2) + '\n# Skriv din kod här\n',
    solution:
      after(2) +
      '\nfore = len(df)\ndf = df.drop_duplicates()\nrader = len(df)\nprint(fore, rader)\n',
    files: RORIG,
    hints: [
      'df = df.drop_duplicates()',
      'Glöm inte df = – annars ändras inte df.',
      'rader = len(df)',
    ],
    tests: [
      { description: 'rader är 786', code: 'rader', expected: 786 },
      {
        description: 'inga dubbletter kvar',
        code: 'df.duplicated().sum()',
        expected: 0,
      },
    ],
  },
  {
    id: 'da-26',
    track: 'stada',
    title: 'Text till tal: priset',
    xp: 15,
    description:
      'Några priser står som "45 kr" och "45,00". Då blir hela kolumnen text, och den går inte att räkna med.',
    explain:
      'Står det text på en enda rad blir hela kolumnen `str`. Laga texten först och gör sedan om den till tal:\n\n```\ntext = df["pris"].str.replace(" kr", "").str.replace(",", ".")\ndf["pris"] = pd.to_numeric(text)\n```\n\n`.str` ger textmetoderna för hela kolumnen på en gång, som `replace`. `pd.to_numeric` gör om text till tal. Python använder punkt, inte komma, för decimaler.',
    example: 'print(df[df["pris"].str.contains("kr")].head())',
    task: 'Uppgift: Gör om kolumnen pris till tal. Spara summan av pris i `summa_pris`.',
    starterCode: after(3) + '\n# Skriv din kod här\n',
    solution:
      after(3) +
      '\ntext = df["pris"].str.replace(" kr", "").str.replace(",", ".")\ndf["pris"] = pd.to_numeric(text)\nsumma_pris = df["pris"].sum()\nprint(summa_pris)\n',
    files: RORIG,
    hints: [
      'df["pris"].str.replace(" kr", "") tar bort " kr".',
      'Byt sedan "," mot "." och använd pd.to_numeric(...).',
      'df["pris"] = pd.to_numeric(df["pris"].str.replace(" kr", "").str.replace(",", "."))',
    ],
    tests: [
      {
        description: 'summa_pris är 34016',
        code: 'summa_pris',
        expected: 34016,
      },
      {
        description: 'pris är tal',
        code: 'str(df["pris"].dtype)',
        expected: 'float64',
      },
    ],
    sourceChecks: [
      { description: 'Använder pd.to_numeric', pattern: /to_numeric\(/ },
    ],
  },
  {
    id: 'da-27',
    track: 'stada',
    title: 'Rätt typ: astype',
    xp: 10,
    description:
      'Kvitto, antal och pris är decimaltal nu, fast de bara är hela tal. Gör om dem till heltal.',
    explain:
      'En kolumn med ett enda tomt värde blir `float64` när den läses in, eftersom `NaN` är ett decimaltal. Nu när de tomma värdena är borta kan du byta typ till `int64`, samma heltal som `read_csv` ger:\n\n```\ndf["antal"] = df["antal"].astype("int64")\n```\n\n`astype` fungerar bara om alla värden går att göra om. Finns det fortfarande ett `NaN` blir det fel – och det är bra, för då vet du att något inte är städat.',
    example: 'print(df.dtypes)',
    task: 'Uppgift: Gör om kolumnerna kvitto, antal och pris till heltal. Spara typerna som text i en lista, `typer`.',
    starterCode: after(4) + '\n# Skriv din kod här\n',
    solution:
      after(4) +
      '\ndf["kvitto"] = df["kvitto"].astype("int64")\ndf["antal"] = df["antal"].astype("int64")\ndf["pris"] = df["pris"].astype("int64")\ntyper = [str(df["kvitto"].dtype), str(df["antal"].dtype), str(df["pris"].dtype)]\nprint(df.dtypes)\n',
    files: RORIG,
    hints: [
      'df["kvitto"] = df["kvitto"].astype("int64")',
      'Gör likadant för antal och pris.',
      'typer = [str(df["kvitto"].dtype), str(df["antal"].dtype), str(df["pris"].dtype)]',
    ],
    tests: [
      {
        description: 'typer är int64 tre gånger',
        code: 'typer',
        expected: ['int64', 'int64', 'int64'],
      },
    ],
    sourceChecks: [{ description: 'Använder astype', pattern: /\.astype\(/ }],
  },
  {
    id: 'da-28',
    track: 'stada',
    title: 'Mellanslag och stora bokstäver',
    xp: 15,
    description:
      'Betalsätten står som "Kort", "KORT" och " kort". För pandas är det tre olika saker.',
    explain:
      'Kolla med `df["betalsatt"].unique()` – där syns varianterna. `.str.strip()` tar bort mellanslag i början och slutet, och `.str.lower()` gör allt till små bokstäver. Kedja dem:\n\n```\ndf["betalsatt"] = df["betalsatt"].str.strip().str.lower()\n```',
    example: 'print(df["betalsatt"].unique())',
    task: 'Uppgift: Städa kolumnen betalsatt. Spara antalet rader per betalsätt i `per_betalsatt` med value_counts.',
    starterCode: after(5) + '\n# Skriv din kod här\n',
    solution:
      after(5) +
      '\nprint(df["betalsatt"].unique())\ndf["betalsatt"] = df["betalsatt"].str.strip().str.lower()\nper_betalsatt = df["betalsatt"].value_counts()\nprint(per_betalsatt)\n',
    files: RORIG,
    hints: [
      '.str.strip() tar bort mellanslagen.',
      '.str.lower() gör om till små bokstäver.',
      'df["betalsatt"] = df["betalsatt"].str.strip().str.lower()',
    ],
    tests: [
      {
        description: 'per_betalsatt är 603 kort, 161 swish och 22 kontant',
        code: 'per_betalsatt.to_dict()',
        expected: { kort: 603, swish: 161, kontant: 22 },
      },
    ],
  },
  {
    id: 'da-29',
    track: 'stada',
    title: 'Samma sak, olika stavning',
    xp: 15,
    description:
      'Produkterna är värst: "latte", "Latte " och "Kanelbullar". Gör så att varje produkt heter en sak.',
    explain:
      'Steg för steg:\n\n1. `.str.strip()` tar bort mellanslagen.\n2. `.str.capitalize()` gör första bokstaven stor och resten små: "latte" blir "Latte".\n3. `.replace({"Kanelbullar": "Kanelbulle"})` byter hela värden mot andra. Dictionaryn säger vad som ska bli vad.\n\nRäkna unika värden före och efter. Kaféet säljer elva produkter i mars, så det ska bli 11.',
    example: 'print(sorted(df["produkt"].unique()))',
    task: 'Uppgift: Städa kolumnen produkt. Spara antalet olika produkter efteråt i `produkter`, och antalet rader med Kanelbulle i `bullrader`.',
    starterCode: after(6) + '\n# Skriv din kod här\n',
    solution:
      after(6) +
      '\nprint(sorted(df["produkt"].unique()))\ndf["produkt"] = df["produkt"].str.strip().str.capitalize()\ndf["produkt"] = df["produkt"].replace({"Kanelbullar": "Kanelbulle"})\nprodukter = df["produkt"].nunique()\nbullrader = len(df[df["produkt"] == "Kanelbulle"])\nprint(produkter, bullrader)\n',
    files: RORIG,
    hints: [
      'df["produkt"].str.strip().str.capitalize()',
      'Byt sedan "Kanelbullar" mot "Kanelbulle" med .replace({...}).',
      'produkter = df["produkt"].nunique()',
    ],
    tests: [
      { description: 'produkter är 11', code: 'produkter', expected: 11 },
      { description: 'bullrader är 110', code: 'bullrader', expected: 110 },
    ],
  },
];
