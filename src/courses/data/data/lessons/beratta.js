import { KASSA, KASSA_OCH_VADER } from '../filer';

// Bana 9: berätta med data. Inget nytt i pandas – i stället omdöme: rätt
// diagram, staplar från noll, andelar och snitt per dag i stället för
// summor, korrelation som inte är orsak, slutsatser i en mening och
// osäkerhet. Varje exempel bygger på kaféets riktiga siffror.
const READ =
  'import pandas as pd\n\ndf = pd.read_csv("kassan.csv")\ndf["summa"] = df["antal"] * df["pris"]\n';
const PER_DAG =
  READ +
  'per_dag = df.groupby("datum")["summa"].sum().reset_index()\nper_dag["veckodag"] = pd.to_datetime(per_dag["datum"]).dt.dayofweek\n';

export const BERATTA = [
  {
    id: 'da-81',
    track: 'beratta',
    title: 'Rätt diagram för frågan',
    xp: 10,
    description:
      'Frågan bestämmer diagrammet. Para ihop varje fråga med den sort som svarar bäst.',
    explain:
      'En tumregel:\n\n- **linje** – hur något ändras över tid\n- **staplar** – jämföra olika saker\n- **histogram** – hur värdena fördelar sig, vad som är vanligt\n- **punkter** – om två mått hänger ihop\n\nFinns det ett tårtdiagram i huvudet: staplar är nästan alltid lättare att läsa.',
    example: 'svar = {"Hur har kunderna ändrats under året?": "linje"}',
    task: 'Uppgift: Byt `None` mot `"linje"`, `"staplar"`, `"histogram"` eller `"punkter"` i `diagram`.',
    starterCode:
      'diagram = {\n    "Hur ändrades intäkterna vecka för vecka?": None,\n    "Vilket betalsätt är vanligast?": None,\n    "Hur stora brukar kvittona vara?": None,\n    "Säljs det mer soppa när det är kallt?": None,\n    "Vilken produkt drar in mest?": None,\n}\n',
    solution:
      'diagram = {\n    "Hur ändrades intäkterna vecka för vecka?": "linje",\n    "Vilket betalsätt är vanligast?": "staplar",\n    "Hur stora brukar kvittona vara?": "histogram",\n    "Säljs det mer soppa när det är kallt?": "punkter",\n    "Vilken produkt drar in mest?": "staplar",\n}\n',
    hints: [
      'Tid på x-axeln: linje.',
      'Jämföra saker: staplar. Formen på datan: histogram.',
      'Två mått som kanske hänger ihop, som temperatur och soppa: punkter.',
    ],
    tests: [
      {
        description: 'Tid och fördelning',
        code: '[diagram["Hur ändrades intäkterna vecka för vecka?"], diagram["Hur stora brukar kvittona vara?"]]',
        expected: ['linje', 'histogram'],
      },
      {
        description: 'Jämförelser',
        code: '[diagram["Vilket betalsätt är vanligast?"], diagram["Vilken produkt drar in mest?"]]',
        expected: ['staplar', 'staplar'],
      },
      {
        description: 'Samband',
        code: 'diagram["Säljs det mer soppa när det är kallt?"]',
        expected: 'punkter',
      },
    ],
  },
  {
    id: 'da-82',
    track: 'beratta',
    title: 'Staplar börjar på noll',
    xp: 15,
    description:
      'Den här bilden ser ut som att swishkunderna handlar för mycket mer. Gör den?',
    explain:
      'Staplarnas **längd** är det ögat jämför. Börjar y-axeln på 84 i stället för 0 ser en skillnad på 5 procent ut som flera gånger så stor.\n\nmatplotlib börjar staplar på noll om du inte säger något annat. Ta bort raden med `plt.ylim(...)`, eller skriv `plt.ylim(bottom=0)`.\n\n(En linje får gärna börja högre upp – där är det lutningen man läser, inte längden.)',
    example: 'plt.bar(["a", "b"], [98, 100])\nplt.ylim(bottom=0)',
    task: 'Uppgift: Laga diagrammet så att y-axeln börjar på 0. Ge det titeln `Snittkvitto per betalsätt` och y-axeln `Kronor`.',
    starterCode:
      'import matplotlib.pyplot as plt\n' +
      READ +
      'kvitton = df.groupby(["kvitto", "betalsatt"])["summa"].sum().reset_index()\nsnitt = kvitton.groupby("betalsatt")["summa"].mean()\n\nplt.bar(snitt.index, snitt.values)\nplt.ylim(84, 91)\n',
    solution:
      'import matplotlib.pyplot as plt\n' +
      READ +
      'kvitton = df.groupby(["kvitto", "betalsatt"])["summa"].sum().reset_index()\nsnitt = kvitton.groupby("betalsatt")["summa"].mean()\n\nplt.bar(snitt.index, snitt.values)\nplt.title("Snittkvitto per betalsätt")\nplt.ylabel("Kronor")\n',
    files: KASSA,
    hints: [
      'plt.ylim(84, 91) är det som lurar ögat.',
      'Ta bort den raden, så börjar staplarna på 0.',
      'plt.title("Snittkvitto per betalsätt") och plt.ylabel("Kronor")',
    ],
    tests: [
      {
        description: 'y-axeln börjar på 0',
        code: '__figur()["y_min"]',
        expected: 0,
      },
      {
        description: 'Titel och y-axel',
        code: '[__figur()["titel"], __figur()["y"]]',
        expected: ['Snittkvitto per betalsätt', 'Kronor'],
      },
    ],
  },
  {
    id: 'da-83',
    track: 'beratta',
    title: 'Andelar, inte antal',
    xp: 15,
    description:
      'Kortkunderna köpte 790 smörgåsar och swishkunderna bara 175. Gillar kortkunder smörgås mer?',
    explain:
      'Nästan fyra av fem rader betalas med kort. Då blir **antalet** av allt störst för kort – det säger inget om vad kortkunder föredrar.\n\nJämför **andelar** i stället: hur stor del av varje grupps köp som är smörgås. `pd.crosstab(..., normalize="index")` ger andelen per rad.',
    example: 'print(pd.crosstab(df["betalsatt"], df["produkt"]))',
    task: 'Uppgift: Spara andelen av raderna som är varje produkt, per betalsätt, i `andelar` med crosstab och `normalize="index"`, avrundat till tre decimaler. Spara andelen smörgås för kort och swish i `smorgas`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nandelar = pd.crosstab(df["betalsatt"], df["produkt"], normalize="index").round(3)\nsmorgas = [andelar.loc["kort", "Smörgås"], andelar.loc["swish", "Smörgås"]]\nprint(andelar["Smörgås"])\n',
    files: KASSA,
    hints: [
      'pd.crosstab(df["betalsatt"], df["produkt"], normalize="index")',
      'Avrunda med .round(3).',
      'smorgas = [andelar.loc["kort", "Smörgås"], andelar.loc["swish", "Smörgås"]]',
    ],
    tests: [
      {
        description:
          'smorgas är 0.108 för kort och 0.105 för swish – nästan lika',
        code: 'smorgas',
        expected: [0.108, 0.105],
      },
    ],
    sourceChecks: [
      { description: 'Använder normalize', pattern: /normalize\s*=/ },
    ],
  },
  {
    id: 'da-84',
    track: 'beratta',
    title: 'Februari var bättre än mars',
    xp: 15,
    description:
      'Mars drog in nästan lika mycket som februari. Men mars har tre dagar fler.',
    explain:
      'Månader, veckor och grupper är olika stora. Att jämföra summor straffar den kortare. Dela med antalet dagar, så jämför du samma sak: **per dag**.\n\nSamma sak gäller butiker med olika öppettider, klasser med olika många elever och länder med olika många invånare.',
    example: 'feb = df[df["manad"] == 2]\nprint(feb["datum"].nunique())',
    task: 'Uppgift: Spara intäkten per öppen dag för februari och mars, avrundad till en decimal, i `feb_per_dag` och `mars_per_dag`. Spara True i `feb_battre` om februari var bättre per dag.',
    starterCode:
      READ +
      'df["manad"] = pd.to_datetime(df["datum"]).dt.month\nfeb = df[df["manad"] == 2]\nmars = df[df["manad"] == 3]\n\n# Skriv din kod här\n',
    solution:
      READ +
      'df["manad"] = pd.to_datetime(df["datum"]).dt.month\nfeb = df[df["manad"] == 2]\nmars = df[df["manad"] == 3]\n\nfeb_per_dag = round(feb["summa"].sum() / feb["datum"].nunique(), 1)\nmars_per_dag = round(mars["summa"].sum() / mars["datum"].nunique(), 1)\nfeb_battre = feb_per_dag > mars_per_dag\nprint(feb_per_dag, mars_per_dag)\n',
    files: KASSA,
    hints: [
      'Intäkten är feb["summa"].sum(), dagarna feb["datum"].nunique().',
      'feb_per_dag = round(feb["summa"].sum() / feb["datum"].nunique(), 1)',
      'feb_battre = feb_per_dag > mars_per_dag',
    ],
    tests: [
      {
        description: 'februari 1495.6 och mars 1345.5 kr per dag',
        code: '[feb_per_dag, mars_per_dag]',
        expected: [1495.6, 1345.5],
      },
      { description: 'feb_battre är True', code: 'feb_battre', expected: true },
    ],
  },
  {
    id: 'da-85',
    track: 'beratta',
    title: 'Skrämmer soppan bort iskaffet?',
    xp: 20,
    description:
      'Dagar med mycket soppa säljer lite iskaffe. Ska kaféet sluta med soppa för att sälja mer iskaffe?',
    explain:
      'Soppa och iskaffe har en negativ korrelation. Men ingen kund låter bli iskaffe för att någon annan åt soppa. Båda styrs av en tredje sak: **vädret**. Kallt ger soppa, varmt ger iskaffe.\n\nEn sådan tredje sak kallas en **förväxlingsfaktor**. Innan du säger att A orsakar B: finns det något C som kan styra båda?',
    example: 'print(dagar[["iskaffe", "soppa", "temperatur"]].corr().round(2))',
    task: 'Uppgift: Spara korrelationen mellan iskaffe och soppa i `corr_iskaffe_soppa`, och mellan temperatur och soppa i `corr_temp_soppa`, båda med två decimaler. Spara det som styr båda, `"temperaturen"`, `"soppan"` eller `"iskaffet"`, i `orsak`.',
    starterCode:
      READ +
      'vadret = pd.read_csv("vadret.csv")\nper_dag = df.groupby("datum")["summa"].sum().reset_index()\niskaffe = df[df["produkt"] == "Iskaffe"].groupby("datum")["antal"].sum().reset_index(name="iskaffe")\nsoppa = df[df["produkt"] == "Soppa"].groupby("datum")["antal"].sum().reset_index(name="soppa")\ndagar = per_dag.merge(vadret, on="datum").merge(iskaffe, on="datum", how="left").merge(soppa, on="datum", how="left").fillna({"iskaffe": 0, "soppa": 0})\n\n# Skriv din kod här\n',
    solution:
      READ +
      'vadret = pd.read_csv("vadret.csv")\nper_dag = df.groupby("datum")["summa"].sum().reset_index()\niskaffe = df[df["produkt"] == "Iskaffe"].groupby("datum")["antal"].sum().reset_index(name="iskaffe")\nsoppa = df[df["produkt"] == "Soppa"].groupby("datum")["antal"].sum().reset_index(name="soppa")\ndagar = per_dag.merge(vadret, on="datum").merge(iskaffe, on="datum", how="left").merge(soppa, on="datum", how="left").fillna({"iskaffe": 0, "soppa": 0})\n\ncorr_iskaffe_soppa = round(dagar["iskaffe"].corr(dagar["soppa"]), 2)\ncorr_temp_soppa = round(dagar["temperatur"].corr(dagar["soppa"]), 2)\norsak = "temperaturen"\nprint(corr_iskaffe_soppa, corr_temp_soppa)\n',
    files: KASSA_OCH_VADER,
    hints: [
      'dagar["iskaffe"].corr(dagar["soppa"])',
      'dagar["temperatur"].corr(dagar["soppa"])',
      'Vad gör att folk vill ha både mindre soppa och mer iskaffe?',
    ],
    tests: [
      {
        description: 'iskaffe och soppa: -0.26',
        code: 'corr_iskaffe_soppa',
        expected: -0.26,
      },
      {
        description: 'temperatur och soppa: -0.64',
        code: 'corr_temp_soppa',
        expected: -0.64,
      },
      {
        description: 'orsak är temperaturen',
        code: 'orsak',
        expected: 'temperaturen',
      },
    ],
  },
  {
    id: 'da-86',
    track: 'beratta',
    title: 'Slutsatsen i en mening',
    xp: 15,
    description:
      'Ägaren läser inte tabeller. Säg det viktigaste i en mening, med siffran i.',
    explain:
      'En bra slutsats är **en mening** som svarar på frågan, med en siffra som går att kontrollera och en jämförelse: "mer än vad?".\n\n"Lördagar är bra" säger inget. "En lördag drar in 51 procent mer än en vanlig vardag" går att fatta beslut på. Räkna ut siffran i koden och sätt in den med en f-sträng, så stämmer meningen alltid med datan.',
    example:
      'okning = round((150 / 100 - 1) * 100)\nprint(f"Det ökade med {okning} procent.")',
    task: 'Uppgift: Spara snittet per lördag och per vardag (måndag till fredag) i `lordag` och `vardag`. Spara hur många procent mer en lördag drar in, avrundat till heltal, i `mer`, och skriv ut: `En lördag drar in 51 procent mer än en vanlig vardag.`',
    starterCode: PER_DAG + '\n# Skriv din kod här\n',
    solution:
      PER_DAG +
      '\nlordag = per_dag[per_dag["veckodag"] == 5]["summa"].mean()\nvardag = per_dag[per_dag["veckodag"] < 5]["summa"].mean()\nmer = round((lordag / vardag - 1) * 100)\nprint(f"En lördag drar in {mer} procent mer än en vanlig vardag.")\n',
    files: KASSA,
    hints: [
      'lordag = per_dag[per_dag["veckodag"] == 5]["summa"].mean()',
      'Vardagar har veckodag under 5.',
      'mer = round((lordag / vardag - 1) * 100)',
    ],
    tests: [
      { description: 'mer är 51', code: 'mer', expected: 51 },
      {
        description: 'Meningen skrivs ut',
        code: '__output',
        expected: ['En lördag drar in 51 procent mer än en vanlig vardag.'],
      },
    ],
    sourceChecks: [
      {
        description: 'Skriver inte in 51 för hand',
        pattern: /^(?![\s\S]*\b51\b)/,
      },
    ],
  },
  {
    id: 'da-87',
    track: 'beratta',
    title: 'Hur många dagar bygger det på?',
    xp: 15,
    description:
      'Iskaffet säljer tio gånger mer på varma dagar. Men det fanns bara 18 varma dagar.',
    explain:
      'Ett snitt av 18 dagar är mer osäkert än ett av 338: några få ovanliga dagar kan flytta det mycket. Det betyder inte att svaret är fel – men läsaren behöver veta.\n\nSkriv alltid hur många värden ett snitt bygger på, till exempel `4.4 iskaffe per dag (18 dagar)`. Är antalet litet: säg det, och var försiktig med starka ord som "alltid".',
    example: 'print(f"{4.4} per dag ({18} dagar)")',
    task: 'Uppgift: Spara snittet av iskaffe per dag och antalet dagar för varma och svala dagar. Skriv ut två rader: `Varma dagar: 4.4 iskaffe per dag (18 dagar)` och `Svala dagar: 0.4 iskaffe per dag (338 dagar)`.',
    starterCode:
      READ +
      'vadret = pd.read_csv("vadret.csv")\noppna = df.groupby("datum")["kvitto"].nunique().reset_index()\niskaffe = df[df["produkt"] == "Iskaffe"].groupby("datum")["antal"].sum().reset_index()\ndagar = oppna.merge(vadret, on="datum").merge(iskaffe, on="datum", how="left").fillna({"antal": 0})\nvarma = dagar[dagar["temperatur"] >= 20]\nsvala = dagar[dagar["temperatur"] < 20]\n\n# Skriv din kod här\n',
    solution:
      READ +
      'vadret = pd.read_csv("vadret.csv")\noppna = df.groupby("datum")["kvitto"].nunique().reset_index()\niskaffe = df[df["produkt"] == "Iskaffe"].groupby("datum")["antal"].sum().reset_index()\ndagar = oppna.merge(vadret, on="datum").merge(iskaffe, on="datum", how="left").fillna({"antal": 0})\nvarma = dagar[dagar["temperatur"] >= 20]\nsvala = dagar[dagar["temperatur"] < 20]\n\nprint(f"Varma dagar: {round(varma[\'antal\'].mean(), 1)} iskaffe per dag ({len(varma)} dagar)")\nprint(f"Svala dagar: {round(svala[\'antal\'].mean(), 1)} iskaffe per dag ({len(svala)} dagar)")\n',
    files: KASSA_OCH_VADER,
    hints: [
      'Snittet är varma["antal"].mean(), antalet dagar len(varma).',
      'Avrunda snittet med round(..., 1).',
      "Inne i en f-sträng med dubbla citattecken: använd enkla runt kolumnnamnet, varma['antal'].",
    ],
    tests: [
      {
        description: 'Båda raderna med antalet dagar',
        code: '__output',
        expected: [
          'Varma dagar: 4.4 iskaffe per dag (18 dagar)',
          'Svala dagar: 0.4 iskaffe per dag (338 dagar)',
        ],
      },
    ],
    sourceChecks: [
      { description: 'Räknar antalet dagar med len', pattern: /len\(/ },
    ],
  },
  {
    id: 'da-88',
    track: 'beratta',
    title: 'Procent av vad?',
    xp: 15,
    description:
      '"Iskaffet ökade med 321 procent i juni!" Låter enormt. Från vad?',
    explain:
      'Procent av ett litet tal blir snabbt stora procent. Från 14 till 59 är +321 %, men det är bara 45 iskaffe till.\n\nSkriv båda: **från och till** och procenten. Då kan läsaren själv bedöma om det är mycket.',
    example:
      'fran, till = 2, 6\nprint(f"från {fran} till {till} ({round((till / fran - 1) * 100)} %)")',
    task: 'Uppgift: Spara antalet iskaffe i maj och juni i `maj` och `juni`, och ökningen i procent, avrundad till heltal, i `okning`. Skriv ut: `Iskaffe i juni: från 14 till 59 st (+321 %)`.',
    starterCode:
      READ +
      'df["manad"] = pd.to_datetime(df["datum"]).dt.month\nper_manad = df[df["produkt"] == "Iskaffe"].groupby("manad")["antal"].sum()\n\n# Skriv din kod här\n',
    solution:
      READ +
      'df["manad"] = pd.to_datetime(df["datum"]).dt.month\nper_manad = df[df["produkt"] == "Iskaffe"].groupby("manad")["antal"].sum()\n\nmaj = per_manad[5]\njuni = per_manad[6]\nokning = round((juni / maj - 1) * 100)\nprint(f"Iskaffe i juni: från {maj} till {juni} st (+{okning} %)")\n',
    files: KASSA,
    hints: [
      'maj = per_manad[5] och juni = per_manad[6]',
      'okning = round((juni / maj - 1) * 100)',
      'print(f"Iskaffe i juni: från {maj} till {juni} st (+{okning} %)")',
    ],
    tests: [
      { description: 'okning är 321', code: 'okning', expected: 321 },
      {
        description: 'Både antalen och procenten skrivs ut',
        code: '__output',
        expected: ['Iskaffe i juni: från 14 till 59 st (+321 %)'],
      },
    ],
  },
  {
    id: 'da-89',
    track: 'beratta',
    title: 'Ska kaféet stänga på tisdagar?',
    xp: 20,
    description:
      'Praktikanten föreslår att stänga den sämsta dagen. Kolla påståendena innan någon fattar beslut.',
    explain:
      'Praktikanten skrev: _"Tisdag drar in minst av alla dagar, 60 687 kr på ett år. Den är alltid sämst, så vi förlorar inget på att stänga."_\n\nKolla varje del för sig med datan. Ett påstående kan vara sant och ändå leda till fel slutsats: att en dag är sämst betyder inte att den går med förlust.',
    example: 'print(per_dag.groupby("veckodag")["summa"].sum())',
    task: 'Uppgift: Byt `None` mot `True` eller `False` i `stammer`: stämmer påståendet med datan? Räkna ut det du behöver.',
    starterCode:
      PER_DAG +
      '\nstammer = {\n    "Tisdag drar in minst totalt": None,\n    "Tisdag drar in minst per dag i snitt": None,\n    "Tisdag är sämst varje vecka": None,\n    "En tisdag drar in mer än 1000 kr i snitt": None,\n}\n',
    solution:
      PER_DAG +
      '\nsumma = per_dag.groupby("veckodag")["summa"].sum()\nsnitt = per_dag.groupby("veckodag")["summa"].mean()\nprint(summa)\nprint(snitt)\n\nstammer = {\n    "Tisdag drar in minst totalt": True,\n    "Tisdag drar in minst per dag i snitt": True,\n    "Tisdag är sämst varje vecka": False,\n    "En tisdag drar in mer än 1000 kr i snitt": True,\n}\n',
    files: KASSA,
    hints: [
      'Räkna summan och snittet per veckodag. Tisdag är veckodag 1.',
      'Ett snitt kan vara lägst utan att dagen är sämst varje vecka – det räcker med en vecka där en annan dag var sämre.',
      'Snittet för tisdag står i snitt[1].',
    ],
    tests: [
      {
        description: 'Totalt och per dag',
        code: '[stammer["Tisdag drar in minst totalt"], stammer["Tisdag drar in minst per dag i snitt"]]',
        expected: [true, true],
      },
      {
        description: 'Varje vecka och över 1000 kr',
        code: '[stammer["Tisdag är sämst varje vecka"], stammer["En tisdag drar in mer än 1000 kr i snitt"]]',
        expected: [false, true],
      },
    ],
  },
];
