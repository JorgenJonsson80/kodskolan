import { KASSA, KASSA_OCH_VADER } from '../filer';

// Bana 8: statistik. Medel och median, spridning, percentiler,
// korrelation, avvikande dagar, rullande medelvärde, numpy och
// förändring i procent – och hela tiden: vad betyder siffran?
const READ =
  'import pandas as pd\n\ndf = pd.read_csv("kassan.csv")\ndf["summa"] = df["antal"] * df["pris"]\n';
const KVITTON = READ + 'kvitton = df.groupby("kvitto")["summa"].sum()\n';
const PER_DAG =
  READ +
  'per_dag = df.groupby("datum").agg(summa=("summa", "sum"), kunder=("kvitto", "nunique")).reset_index()\n';
const WEATHER =
  PER_DAG +
  'vadret = pd.read_csv("vadret.csv")\niskaffe = df[df["produkt"] == "Iskaffe"].groupby("datum")["antal"].sum().reset_index()\ndagar = per_dag.merge(vadret, on="datum").merge(iskaffe, on="datum", how="left").fillna({"antal": 0})\n';

export const STATISTIK = [
  {
    id: 'da-71',
    track: 'statistik',
    title: 'Medel eller median?',
    xp: 15,
    description: 'Snittkvittot är 87 kr. Men vad handlar en vanlig kund för?',
    explain:
      '**Medelvärdet** (`mean`) är summan delad med antalet. **Medianen** (`median`) är värdet i mitten när allt är sorterat: hälften är mindre och hälften större.\n\nNågra få stora kvitton drar upp medelvärdet, men flyttar knappt medianen. När de skiljer sig mycket säger medianen bättre vad som är _vanligt_. Löner och huspriser redovisas ofta med median av samma skäl.',
    example: 'print(kvitton.mean(), kvitton.median())',
    task: 'Uppgift: Spara snittkvittot avrundat till en decimal i `medel` och medianen i `median`. Spara True i `skeva` om medelvärdet är större än medianen.',
    starterCode: KVITTON + '\n# Skriv din kod här\n',
    solution:
      KVITTON +
      '\nmedel = round(kvitton.mean(), 1)\nmedian = kvitton.median()\nskeva = medel > median\nprint(medel, median)\n',
    files: KASSA,
    hints: [
      'medel = round(kvitton.mean(), 1)',
      'median = kvitton.median()',
      'skeva = medel > median',
    ],
    tests: [
      { description: 'medel är 87.4', code: 'medel', expected: 87.4 },
      { description: 'median är 77', code: 'median', expected: 77 },
      { description: 'skeva är True', code: 'skeva', expected: true },
    ],
  },
  {
    id: 'da-72',
    track: 'statistik',
    title: 'Spridning: std',
    xp: 15,
    description:
      'Ett snitt på 1369 kr per dag. Men är alla dagar ungefär så, eller skiljer de sig mycket?',
    explain:
      '**Standardavvikelsen** (`std`) mäter hur långt från medelvärdet värdena brukar ligga. Liten std: dagarna liknar varandra. Stor std: de skiljer sig mycket.\n\nEn tumregel: ungefär två av tre värden ligger inom en std från medelvärdet. Visa alltid spridningen tillsammans med snittet – annars vet ingen om snittet är typiskt.',
    example: 'print(per_dag["kunder"].std())',
    task: 'Uppgift: Spara medelvärdet och standardavvikelsen för intäkten per dag, avrundade till en decimal, i `medel` och `spridning`. Spara den sämsta och bästa dagens intäkt i `samst` och `bast`.',
    starterCode: PER_DAG + '\n# Skriv din kod här\n',
    solution:
      PER_DAG +
      '\nmedel = round(per_dag["summa"].mean(), 1)\nspridning = round(per_dag["summa"].std(), 1)\nsamst = per_dag["summa"].min()\nbast = per_dag["summa"].max()\nprint(medel, spridning, samst, bast)\n',
    files: KASSA,
    hints: [
      'per_dag["summa"] är intäkten per dag.',
      'spridning = round(per_dag["summa"].std(), 1)',
      'samst och bast får du med min() och max().',
    ],
    tests: [
      { description: 'medel är 1369', code: 'medel', expected: 1369 },
      { description: 'spridning är 392', code: 'spridning', expected: 392 },
      {
        description: 'samst är 477 och bast 2675',
        code: '[samst, bast]',
        expected: [477, 2675],
      },
    ],
    sourceChecks: [{ description: 'Använder std', pattern: /\.std\(/ }],
  },
  {
    id: 'da-73',
    track: 'statistik',
    title: 'Percentiler: 90 procent av kvittona',
    xp: 15,
    description:
      'Kaféet vill ge en present till de största kunderna – de 10 procent som handlar mest. Var går gränsen?',
    explain:
      '`quantile(0.9)` ger värdet som 90 procent ligger under: den **90:e percentilen**. `quantile(0.5)` är medianen.\n\nPercentiler är bra för gränser: "9 av 10 kunder handlar för mindre än …". De påverkas inte av ett enstaka jättekvitto.',
    example: 'print(kvitton.quantile(0.25))',
    task: 'Uppgift: Spara gränsen för de 10 procent största kvittona i `grans`. Spara antalet kvitton över gränsen i `storkunder`.',
    starterCode: KVITTON + '\n# Skriv din kod här\n',
    solution:
      KVITTON +
      '\ngrans = kvitton.quantile(0.9)\nstorkunder = len(kvitton[kvitton > grans])\nprint(grans, storkunder)\n',
    files: KASSA,
    hints: [
      'grans = kvitton.quantile(0.9)',
      'Filtrera kvitton som är större än grans.',
      'storkunder = len(kvitton[kvitton > grans])',
    ],
    tests: [
      { description: 'grans är 154', code: 'grans', expected: 154 },
      { description: 'storkunder är 545', code: 'storkunder', expected: 545 },
    ],
    sourceChecks: [{ description: 'Använder quantile', pattern: /quantile\(/ }],
  },
  {
    id: 'da-74',
    track: 'statistik',
    title: 'En vanlig dag: mellersta hälften',
    xp: 15,
    description:
      'Vad är en helt vanlig dag på kaféet? Ta bort den bästa och sämsta fjärdedelen och se vad som blir kvar.',
    explain:
      'Mellan 25:e och 75:e percentilen ligger den **mellersta hälften** av dagarna. Skillnaden kallas _interkvartilavståndet_ (IQR).\n\nDet är ett bra svar på "vad är normalt?": hälften av dagarna drar in mellan de två gränserna. Det är samma tal som `describe()` visar på raderna 25% och 75%.',
    example: 'print(per_dag["summa"].describe())',
    task: 'Uppgift: Spara den 25:e och 75:e percentilen för intäkten per dag i `nedre` och `ovre`, och skillnaden mellan dem i `iqr`.',
    starterCode: PER_DAG + '\n# Skriv din kod här\n',
    solution:
      PER_DAG +
      '\nnedre = per_dag["summa"].quantile(0.25)\novre = per_dag["summa"].quantile(0.75)\niqr = ovre - nedre\nprint(nedre, ovre, iqr)\n',
    files: KASSA,
    hints: [
      'nedre = per_dag["summa"].quantile(0.25)',
      'ovre är quantile(0.75).',
      'iqr = ovre - nedre',
    ],
    tests: [
      { description: 'nedre är 1122.25', code: 'nedre', expected: 1122.25 },
      { description: 'ovre är 1609', code: 'ovre', expected: 1609 },
      { description: 'iqr är 486.75', code: 'iqr', expected: 486.75 },
    ],
  },
  {
    id: 'da-75',
    track: 'statistik',
    title: 'Hänger det ihop? corr',
    xp: 20,
    description:
      'Värme och iskaffe såg ut att hänga ihop i punktdiagrammet. Hur starkt? Och påverkar värmen hela kaféets intäkt?',
    explain:
      '**Korrelationen** är ett tal mellan -1 och 1 som säger hur väl två kolumner följer varandra:\n\n- nära 1: när den ena går upp gör den andra det också\n- nära 0: inget samband\n- nära -1: när den ena går upp går den andra ner\n\n```\ndagar["temperatur"].corr(dagar["antal"])\n```\n\nKorrelation säger inget om **varför**. Det kommer i nästa bana.',
    example: 'print(dagar["temperatur"].corr(dagar["kunder"]))',
    task: 'Uppgift: Spara korrelationen mellan temperatur och antal iskaffe i `iskaffe_corr`, och mellan temperatur och dagens intäkt (summa) i `intakt_corr`. Avrunda båda till två decimaler.',
    starterCode: WEATHER + '\n# Skriv din kod här\n',
    solution:
      WEATHER +
      '\niskaffe_corr = round(dagar["temperatur"].corr(dagar["antal"]), 2)\nintakt_corr = round(dagar["temperatur"].corr(dagar["summa"]), 2)\nprint(iskaffe_corr, intakt_corr)\n',
    files: KASSA_OCH_VADER,
    hints: [
      'dagar["temperatur"].corr(dagar["antal"])',
      'Byt "antal" mot "summa" för intäkten.',
      'Avrunda med round(..., 2).',
    ],
    tests: [
      {
        description: 'iskaffe_corr är 0.57',
        code: 'iskaffe_corr',
        expected: 0.57,
      },
      {
        description: 'intakt_corr är 0.01',
        code: 'intakt_corr',
        expected: 0.01,
      },
    ],
    sourceChecks: [{ description: 'Använder corr', pattern: /\.corr\(/ }],
  },
  {
    id: 'da-76',
    track: 'statistik',
    title: 'Dagar som sticker ut',
    xp: 20,
    description:
      'Vilka dagar var ovanligt bra eller dåliga? Leta efter dem som ligger långt från snittet.',
    explain:
      'En vanlig gräns för "ovanlig": mer än **två standardavvikelser** från medelvärdet. Räkna ut gränserna och filtrera:\n\n```\nhog = medel + 2 * std\nlag = medel - 2 * std\n```\n\nTitta sedan på vilka dagar du hittade. Är det verkligen konstiga dagar – eller bara en sorts dag som alltid är stor?',
    example: 'print(per_dag.sort_values("summa").head(3))',
    task: 'Uppgift: Spara dagarna med en intäkt över `hog` eller under `lag` i `avvikande`. Spara hur många av dem som är lördagar i `lordagar`.',
    starterCode:
      PER_DAG +
      'medel = per_dag["summa"].mean()\nstd = per_dag["summa"].std()\nper_dag["veckodag"] = pd.to_datetime(per_dag["datum"]).dt.dayofweek\n\n# Skriv din kod här\n',
    solution:
      PER_DAG +
      'medel = per_dag["summa"].mean()\nstd = per_dag["summa"].std()\nper_dag["veckodag"] = pd.to_datetime(per_dag["datum"]).dt.dayofweek\n\nhog = medel + 2 * std\nlag = medel - 2 * std\navvikande = per_dag[(per_dag["summa"] > hog) | (per_dag["summa"] < lag)]\nlordagar = len(avvikande[avvikande["veckodag"] == 5])\nprint(avvikande)\n',
    files: KASSA,
    hints: [
      'hog = medel + 2 * std och lag = medel - 2 * std',
      'Två villkor med |: (per_dag["summa"] > hog) | (per_dag["summa"] < lag)',
      'lordagar = len(avvikande[avvikande["veckodag"] == 5])',
    ],
    tests: [
      {
        description: 'avvikande har 18 dagar',
        code: 'len(avvikande)',
        expected: 18,
      },
      { description: 'lordagar är 13', code: 'lordagar', expected: 13 },
    ],
  },
  {
    id: 'da-77',
    track: 'statistik',
    title: 'Jämna ut: rullande medelvärde',
    xp: 15,
    description:
      'Dag för dag hoppar intäkten upp och ner. Ett rullande medelvärde visar trenden.',
    explain:
      '`rolling(7).mean()` räknar medelvärdet av de senaste sju värdena, för varje rad. De sex första raderna har inte sju värden bakåt och blir `NaN`.\n\nEtt sjudagarsmedel är vanligt för data per dag: varje värde innehåller precis en av varje veckodag, så lördagarna jämnas ut.',
    example: 'print(per_dag["summa"].rolling(3).mean().head())',
    task: 'Uppgift: Lägg till kolumnen `vecka` i `per_dag`: det rullande medelvärdet över sju dagar av summa. Spara antalet tomma värden i den i `tomma`, och det högsta värdet avrundat till en decimal i `topp`.',
    starterCode: PER_DAG + '\n# Skriv din kod här\n',
    solution:
      PER_DAG +
      '\nper_dag["vecka"] = per_dag["summa"].rolling(7).mean()\ntomma = per_dag["vecka"].isna().sum()\ntopp = round(per_dag["vecka"].max(), 1)\nprint(per_dag.head(10))\n',
    files: KASSA,
    hints: [
      'per_dag["vecka"] = per_dag["summa"].rolling(7).mean()',
      'tomma = per_dag["vecka"].isna().sum()',
      'topp = round(per_dag["vecka"].max(), 1)',
    ],
    tests: [
      { description: 'tomma är 6', code: 'tomma', expected: 6 },
      { description: 'topp är 1754.1', code: 'topp', expected: 1754.1 },
    ],
    sourceChecks: [{ description: 'Använder rolling', pattern: /rolling\(/ }],
  },
  {
    id: 'da-78',
    track: 'statistik',
    title: 'numpy: np.where',
    xp: 15,
    description:
      'pandas bygger på numpy. Ibland är numpy det enklaste verktyget – som för att sätta en etikett på varje rad.',
    explain:
      '**numpy** är biblioteket för tal i Python, och pandas kolumner är numpy-listor inuti. Det importeras som `np`.\n\n`np.where(villkor, a, b)` ger `a` där villkoret är sant och `b` annars – för varje rad:\n\n```\nkvitton["storlek"] = np.where(kvitton["summa"] >= 100, "stort", "litet")\n```\n\n`np.mean` och `np.median` fungerar också, på allt som är en lista med tal.',
    example:
      'import numpy as np\n\ntal = np.array([1, 5, 3])\nprint(np.where(tal > 2, "ja", "nej"))',
    task: 'Uppgift: Lägg till kolumnen `storlek` i `kvitton`: `stort` för kvitton på 100 kr eller mer, annars `litet`. Spara antalet av varje i `antal`.',
    starterCode:
      'import numpy as np\n' +
      READ +
      'kvitton = df.groupby("kvitto")["summa"].sum().reset_index()\n\n# Skriv din kod här\n',
    solution:
      'import numpy as np\n' +
      READ +
      'kvitton = df.groupby("kvitto")["summa"].sum().reset_index()\n\nkvitton["storlek"] = np.where(kvitton["summa"] >= 100, "stort", "litet")\nantal = kvitton["storlek"].value_counts()\nprint(antal)\n',
    files: KASSA,
    hints: [
      'np.where(villkor, "stort", "litet")',
      'Villkoret är kvitton["summa"] >= 100.',
      'antal = kvitton["storlek"].value_counts()',
    ],
    tests: [
      {
        description: 'antal är 3731 litet och 1847 stort',
        code: 'antal.to_dict()',
        expected: { litet: 3731, stort: 1847 },
      },
    ],
    sourceChecks: [
      { description: 'Använder np.where', pattern: /np\.where\(/ },
    ],
  },
  {
    id: 'da-79',
    track: 'statistik',
    title: 'Förändring i procent',
    xp: 15,
    description:
      'Hur mycket sjönk intäkten i juli, och hur mycket studsade den tillbaka i augusti?',
    explain:
      '`pct_change()` räknar förändringen från förra raden, som en andel. Gånger 100 blir det procent:\n\n```\nforandring = (per_manad.pct_change() * 100).round(1)\n```\n\nFörsta raden har ingen före sig och blir `NaN`. Procent säger mer än kronor när du jämför: 10 000 kr är mycket för ett kafé men lite för en mataffär.',
    example: 'print(pd.Series([100, 150, 120]).pct_change())',
    task: 'Uppgift: Spara intäkterna per månad i `per_manad` och förändringen mot månaden innan, i procent med en decimal, i `forandring`.',
    starterCode:
      READ +
      'df["manad"] = pd.to_datetime(df["datum"]).dt.month\n\n# Skriv din kod här\n',
    solution:
      READ +
      'df["manad"] = pd.to_datetime(df["datum"]).dt.month\n\nper_manad = df.groupby("manad")["summa"].sum()\nforandring = (per_manad.pct_change() * 100).round(1)\nprint(forandring)\n',
    files: KASSA,
    hints: [
      'per_manad = df.groupby("manad")["summa"].sum()',
      'per_manad.pct_change() ger förändringen som andel.',
      'forandring = (per_manad.pct_change() * 100).round(1)',
    ],
    tests: [
      {
        description: 'juli sjönk 32.2 % och augusti ökade 46.9 %',
        code: '[forandring[7], forandring[8]]',
        expected: [-32.2, 46.9],
      },
    ],
    sourceChecks: [
      { description: 'Använder pct_change', pattern: /pct_change\(/ },
    ],
  },
];
