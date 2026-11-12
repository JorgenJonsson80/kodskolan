import { CITY, CITY_OCH_KASSA, CITY_OCH_PRODUKTER } from '../filer';

// Bana 10: slutprojektet. Kafé Kanel har öppnat ett kafé vid kontoren i
// city. Första kvartalets export (city_q1.csv) har ett annat format och
// samma sorts fel som förut. Eleven gör hela analysen, från rå fil till
// slutsats, med allt från banorna 1–9. Varje övning börjar där den förra
// slutade.
const READ =
  'import pandas as pd\n\ncity = pd.read_csv("city_q1.csv", sep=";", decimal=",")\n';
const CLEAN =
  READ +
  'city = city.dropna(how="all").drop_duplicates()\ncity["produkt"] = city["produkt"].str.strip().str.capitalize()\nfor kolumn in ["kvitto", "antal", "pris"]:\n    city[kolumn] = city[kolumn].astype("int64")\ncity["summa"] = city["antal"] * city["pris"]\n';
const TIMES =
  CLEAN +
  'city["tidpunkt"] = pd.to_datetime(city["tidpunkt"])\ncity["datum"] = city["tidpunkt"].dt.strftime("%Y-%m-%d")\ncity["timme"] = city["tidpunkt"].dt.hour\ncity["veckodag"] = city["tidpunkt"].dt.dayofweek\n';
// Gamla kaféet samma kvartal, året innan.
const OLD =
  'gamla = pd.read_csv("kassan.csv")\ngamla["summa"] = gamla["antal"] * gamla["pris"]\ngamla["tidpunkt"] = pd.to_datetime(gamla["datum"])\ngamla["veckodag"] = gamla["tidpunkt"].dt.dayofweek\ngamla = gamla[gamla["tidpunkt"].dt.month <= 3]\n';

export const SLUTPROJEKT = [
  {
    id: 'da-91',
    track: 'slutprojekt',
    title: 'Ett nytt kafé, ett nytt format',
    xp: 15,
    description:
      'Kafé Kanel har öppnat vid kontoren i city. Exporten från den nya kassan ser annorlunda ut. Läs in den rätt.',
    explain:
      'Öppna `city_q1.csv` i huvudet: värdena skiljs med **semikolon**, och priserna skrivs med **decimalkomma**, `45,00`. Så exporterar svenska Excel och många kassor.\n\n`read_csv` klarar det med två argument:\n\n```\npd.read_csv("city_q1.csv", sep=";", decimal=",")\n```\n\nUtan dem blir hela raden en enda kolumn. Datum och tid står dessutom ihop i kolumnen `tidpunkt`.',
    example: 'print(pd.read_csv("city_q1.csv").head(2))',
    task: 'Uppgift: Läs in `city_q1.csv` till `city` med rätt avgränsare och decimaltecken. Spara kolumnernas namn i `kolumner` och typen för pris som text i `typ_pris`.',
    starterCode: 'import pandas as pd\n\n# Skriv din kod här\n',
    solution:
      READ +
      'kolumner = list(city.columns)\ntyp_pris = str(city["pris"].dtype)\nprint(city.head())\n',
    files: CITY,
    hints: [
      'sep=";" säger att värdena skiljs med semikolon.',
      'decimal="," gör att 45,00 läses som ett tal.',
      'city = pd.read_csv("city_q1.csv", sep=";", decimal=",")',
    ],
    tests: [
      {
        description:
          'kolumner är kvitto, tidpunkt, produkt, antal, pris och betalsatt',
        code: 'kolumner',
        expected: [
          'kvitto',
          'tidpunkt',
          'produkt',
          'antal',
          'pris',
          'betalsatt',
        ],
      },
      { description: 'pris är ett tal', code: 'typ_pris', expected: 'float64' },
    ],
    sourceChecks: [
      { description: 'Använder sep', pattern: /sep\s*=/ },
      { description: 'Använder decimal', pattern: /decimal\s*=/ },
    ],
  },
  {
    id: 'da-92',
    track: 'slutprojekt',
    title: 'Första mötet med city',
    xp: 15,
    description: 'Innan du räknar: hur ser filen ut, och vad är fel i den?',
    explain:
      'Samma frågor som i bana 2 och 3: hur stor är filen, vad saknas och finns det kopior? Kolla dubbletterna efter att de tomma raderna är borta – annars räknas de tomma raderna som kopior av varandra.',
    example: 'print(city.shape)\nprint(city.isna().sum())',
    task: 'Uppgift: Spara antalet rader i `rader`, antalet helt tomma rader i `tomma` och antalet dubbletter bland de andra raderna i `kopior`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nrader = len(city)\nhela = city.dropna(how="all")\ntomma = rader - len(hela)\nkopior = hela.duplicated().sum()\nprint(rader, tomma, kopior)\n',
    files: CITY,
    hints: [
      'hela = city.dropna(how="all") är raderna som inte är tomma.',
      'tomma = rader - len(hela)',
      'kopior = hela.duplicated().sum()',
    ],
    tests: [
      { description: 'rader är 3412', code: 'rader', expected: 3412 },
      { description: 'tomma är 17', code: 'tomma', expected: 17 },
      { description: 'kopior är 31', code: 'kopior', expected: 31 },
    ],
  },
  {
    id: 'da-93',
    track: 'slutprojekt',
    title: 'Städa city',
    xp: 15,
    description:
      'Samma fel som i mars: tomma rader, kopior och produkter med olika stavning.',
    explain:
      'Ta bort tomma rader och kopior, städa produktnamnen och gör om kvitto, antal och pris till heltal. En loop över kolumnnamnen sparar tre nästan likadana rader:\n\n```\nfor kolumn in ["kvitto", "antal", "pris"]:\n    city[kolumn] = city[kolumn].astype("int64")\n```\n\nLägg till sist till `summa`.',
    example: 'print(sorted(city["produkt"].dropna().unique()))',
    task: 'Uppgift: Städa `city` och lägg till kolumnen `summa`. Spara antalet rader i `rader`, antalet olika produkter i `produkter` och kvartalets intäkt i `intakt`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      CLEAN +
      '\nrader = len(city)\nprodukter = city["produkt"].nunique()\nintakt = city["summa"].sum()\nprint(rader, produkter, intakt)\n',
    files: CITY,
    hints: [
      'city = city.dropna(how="all").drop_duplicates()',
      'city["produkt"] = city["produkt"].str.strip().str.capitalize()',
      'Gör om kvitto, antal och pris med astype("int64"), och räkna summa = antal * pris.',
    ],
    tests: [
      { description: 'rader är 3364', code: 'rader', expected: 3364 },
      { description: 'produkter är 11', code: 'produkter', expected: 11 },
      { description: 'intakt är 174494', code: 'intakt', expected: 174494 },
      {
        description: 'antal är heltal',
        code: 'str(city["antal"].dtype)',
        expected: 'int64',
      },
    ],
  },
  {
    id: 'da-94',
    track: 'slutprojekt',
    title: 'Tidpunkten i delar',
    xp: 15,
    description:
      'Datum och tid står ihop. Dela upp tidpunkten så att du kan fråga om dag, timme och veckodag.',
    explain:
      '`pd.to_datetime` klarar "2026-01-02 07:32" direkt. Sedan plockar du ut delarna med `.dt`:\n\n- `.dt.strftime("%Y-%m-%d")` – datumet som text, för att räkna dagar\n- `.dt.hour` – timmen\n- `.dt.dayofweek` – veckodagen\n\nTitta sedan på vilka veckodagar som finns. Det säger något om kaféet.',
    example: 'print(pd.to_datetime(city["tidpunkt"]).dt.hour.head())',
    task: 'Uppgift: Gör om tidpunkt och lägg till kolumnerna `datum`, `timme` och `veckodag`. Spara antalet öppna dagar i `dagar` och de veckodagar som finns, sorterade, i `veckodagar`.',
    starterCode: CLEAN + '\n# Skriv din kod här\n',
    solution:
      TIMES +
      '\ndagar = city["datum"].nunique()\nveckodagar = sorted(city["veckodag"].unique())\nprint(dagar, veckodagar)\n',
    files: CITY,
    hints: [
      'city["tidpunkt"] = pd.to_datetime(city["tidpunkt"])',
      'city["datum"] = city["tidpunkt"].dt.strftime("%Y-%m-%d"), och likadant med .dt.hour och .dt.dayofweek.',
      'veckodagar = sorted(city["veckodag"].unique())',
    ],
    tests: [
      { description: 'dagar är 63', code: 'dagar', expected: 63 },
      {
        description: 'veckodagar är bara måndag till fredag',
        code: 'veckodagar',
        expected: [0, 1, 2, 3, 4],
      },
    ],
  },
  {
    id: 'da-95',
    track: 'slutprojekt',
    title: 'Vad säljer city?',
    xp: 15,
    description:
      'I gamla kaféet var kaffe störst. Är det likadant vid kontoren?',
    explain:
      'Slå ihop med prislistan för kategorin och inköpspriset, som i bana 6. Räkna intäkten per kategori och vinsten per produkt.',
    example: 'print(produkter)',
    task: 'Uppgift: Slå ihop `city` med produkt, kategori och inkop från prislistan i `ihop`, och lägg till `vinst`. Spara intäkten per kategori i `per_kategori` och de tre produkterna med störst vinst, i ordning, i `topp_vinst`.',
    starterCode:
      TIMES +
      'produkter = pd.read_csv("produkter.csv")\n\n# Skriv din kod här\n',
    solution:
      TIMES +
      'produkter = pd.read_csv("produkter.csv")\n\nihop = city.merge(produkter[["produkt", "kategori", "inkop"]], on="produkt")\nihop["vinst"] = (ihop["pris"] - ihop["inkop"]) * ihop["antal"]\nper_kategori = ihop.groupby("kategori")["summa"].sum()\nvinst = ihop.groupby("produkt")["vinst"].sum().sort_values(ascending=False)\ntopp_vinst = list(vinst.index[:3])\nprint(per_kategori)\nprint(vinst)\n',
    files: CITY_OCH_PRODUKTER,
    hints: [
      'ihop = city.merge(produkter[["produkt", "kategori", "inkop"]], on="produkt")',
      'ihop["vinst"] = (ihop["pris"] - ihop["inkop"]) * ihop["antal"]',
      'Sortera vinsten per produkt med störst först och ta list(vinst.index[:3]).',
    ],
    tests: [
      {
        description:
          'per_kategori: mat 70185, kaffe 54763, bakverk 34036, dryck 15510',
        code: 'per_kategori.to_dict()',
        expected: { bakverk: 34036, dryck: 15510, kaffe: 54763, mat: 70185 },
      },
      {
        description: 'topp_vinst är Smörgås, Soppa och Bryggkaffe',
        code: 'topp_vinst',
        expected: ['Smörgås', 'Soppa', 'Bryggkaffe'],
      },
    ],
  },
  {
    id: 'da-96',
    track: 'slutprojekt',
    title: 'Ett lunchkafé',
    xp: 15,
    description: 'Hur stor del av kunderna kommer vid lunch?',
    explain:
      'Lunch är timmarna 11, 12 och 13. `isin` kollar om ett värde finns i en lista:\n\n```\ncity[city["timme"].isin([11, 12, 13])]\n```\n\nRäkna kunder som olika kvitton, både vid lunch och totalt, och dela.',
    example: 'print(city["timme"].isin([7, 8]).sum())',
    task: 'Uppgift: Spara antalet kunder per timme i `per_timme`. Spara andelen kunder som kommer kl 11–13, i procent med en decimal, i `lunch_procent`.',
    starterCode: TIMES + '\n# Skriv din kod här\n',
    solution:
      TIMES +
      '\nper_timme = city.groupby("timme")["kvitto"].nunique()\nlunch = city[city["timme"].isin([11, 12, 13])]\nlunch_procent = round(lunch["kvitto"].nunique() / city["kvitto"].nunique() * 100, 1)\nprint(per_timme)\nprint(lunch_procent)\n',
    files: CITY,
    hints: [
      'per_timme = city.groupby("timme")["kvitto"].nunique()',
      'lunch = city[city["timme"].isin([11, 12, 13])]',
      'Dela lunch["kvitto"].nunique() med city["kvitto"].nunique() och gånger 100.',
    ],
    tests: [
      {
        description: 'per_timme[12] är 550',
        code: 'per_timme[12]',
        expected: 550,
      },
      {
        description: 'lunch_procent är 51.6',
        code: 'lunch_procent',
        expected: 51.6,
      },
    ],
  },
  {
    id: 'da-97',
    track: 'slutprojekt',
    title: 'Jämför med gamla kaféet',
    xp: 20,
    description:
      'City drog in mer än gamla kaféet samma kvartal – fast det bara har öppet på vardagar. Hur mycket mer per dag?',
    explain:
      'Jämför per öppen dag, inte totalt (bana 9). Lägg kaféerna på varandra med `concat` och en kolumn som säger vilket kafé raden kommer från, så kan du gruppera på den:\n\n```\ncity["kafe"] = "City"\ngamla["kafe"] = "Gamla"\nbada = pd.concat([city[["kafe", "datum", "summa"]], gamla[["kafe", "datum", "summa"]]])\n```',
    example: 'print(gamla["datum"].nunique())',
    task: 'Uppgift: Lägg ihop kaféerna i `bada` med kolumnerna kafe, datum och summa. Spara intäkten per öppen dag för varje kafé, avrundad till heltal, i `per_dag`.',
    starterCode: TIMES + OLD + '\n# Skriv din kod här\n',
    solution:
      TIMES +
      OLD +
      '\ncity["kafe"] = "City"\ngamla["kafe"] = "Gamla"\nbada = pd.concat([city[["kafe", "datum", "summa"]], gamla[["kafe", "datum", "summa"]]])\nper_dag = (bada.groupby("kafe")["summa"].sum() / bada.groupby("kafe")["datum"].nunique()).round()\nprint(per_dag)\n',
    files: CITY_OCH_KASSA,
    hints: [
      'city["kafe"] = "City" och gamla["kafe"] = "Gamla"',
      'bada = pd.concat([city[["kafe", "datum", "summa"]], gamla[["kafe", "datum", "summa"]]])',
      'Dela summan per kafé med antalet olika datum per kafé.',
    ],
    tests: [
      { description: 'bada har 5692 rader', code: 'len(bada)', expected: 5692 },
      {
        description: 'per_dag är 2770 för City och 1409 för Gamla',
        code: 'per_dag.to_dict()',
        expected: { City: 2770, Gamla: 1409 },
      },
    ],
    sourceChecks: [{ description: 'Använder pd.concat', pattern: /concat\(/ }],
  },
  {
    id: 'da-98',
    track: 'slutprojekt',
    title: 'Veckan i två kaféer',
    xp: 20,
    description: 'Rita snittet per veckodag för båda kaféerna i samma diagram.',
    explain:
      'Två linjer med förklaring, som i bana 7. City saknar helgen, så dess linje blir kortare – och det syns direkt att lördagen, gamla kaféets bästa dag, inte finns i city.',
    example: 'print(snitt_city)\nprint(snitt_gamla)',
    task: 'Uppgift: Rita `snitt_city` och `snitt_gamla` som två linjer med namnen `City` och `Gamla`, och visa förklaringen. Titeln ska vara `Snitt per veckodag` och y-axeln `Kronor`.',
    starterCode:
      'import matplotlib.pyplot as plt\n' +
      TIMES +
      OLD +
      'gamla["datum"] = gamla["tidpunkt"].dt.strftime("%Y-%m-%d")\nsnitt_city = city.groupby(["datum", "veckodag"])["summa"].sum().reset_index().groupby("veckodag")["summa"].mean().round()\nsnitt_gamla = gamla.groupby(["datum", "veckodag"])["summa"].sum().reset_index().groupby("veckodag")["summa"].mean().round()\n\n# Skriv din kod här\n',
    solution:
      'import matplotlib.pyplot as plt\n' +
      TIMES +
      OLD +
      'gamla["datum"] = gamla["tidpunkt"].dt.strftime("%Y-%m-%d")\nsnitt_city = city.groupby(["datum", "veckodag"])["summa"].sum().reset_index().groupby("veckodag")["summa"].mean().round()\nsnitt_gamla = gamla.groupby(["datum", "veckodag"])["summa"].sum().reset_index().groupby("veckodag")["summa"].mean().round()\n\nplt.plot(snitt_city.index, snitt_city.values, label="City")\nplt.plot(snitt_gamla.index, snitt_gamla.values, label="Gamla")\nplt.legend()\nplt.title("Snitt per veckodag")\nplt.ylabel("Kronor")\n',
    files: CITY_OCH_KASSA,
    hints: [
      'plt.plot(snitt_city.index, snitt_city.values, label="City")',
      'Likadant för snitt_gamla, och sedan plt.legend().',
      'plt.title("Snitt per veckodag") och plt.ylabel("Kronor")',
    ],
    tests: [
      {
        description: 'Två linjer: City och Gamla',
        code: '__figur()["forklaring"]',
        expected: ['City', 'Gamla'],
      },
      {
        description: 'City har fem dagar och Gamla sju',
        code: '[len(linje) for linje in __figur()["linjer"]]',
        expected: [5, 7],
      },
      {
        description: 'Titel och y-axel',
        code: '[__figur()["titel"], __figur()["y"]]',
        expected: ['Snitt per veckodag', 'Kronor'],
      },
    ],
  },
  {
    id: 'da-99',
    track: 'slutprojekt',
    title: 'Slutsatsen',
    xp: 20,
    description:
      'Ägaren undrar om det var rätt att öppna i city. Svara i en mening.',
    explain:
      'En mening med siffran, jämförelsen och det viktigaste förbehållet (bana 9). Räkna ut siffrorna i koden.\n\nTänk på vad som skiljer: city jämförs med gamla kaféet ett år tidigare, och har bara öppet fem dagar i veckan. Därför: per öppen dag.',
    example: 'ganger = round(2770 / 1409, 1)\nprint(ganger)',
    task: 'Uppgift: Spara hur många gånger mer city drar in per öppen dag, avrundat till en decimal, i `ganger`. Skriv ut: `City drar in 2770 kr per öppen dag, 2.0 gånger så mycket som gamla kaféet (1409 kr), trots att det bara har öppet vardagar.`',
    starterCode:
      TIMES +
      OLD +
      'gamla["datum"] = gamla["tidpunkt"].dt.strftime("%Y-%m-%d")\ncity_dag = round(city["summa"].sum() / city["datum"].nunique())\ngamla_dag = round(gamla["summa"].sum() / gamla["datum"].nunique())\n\n# Skriv din kod här\n',
    solution:
      TIMES +
      OLD +
      'gamla["datum"] = gamla["tidpunkt"].dt.strftime("%Y-%m-%d")\ncity_dag = round(city["summa"].sum() / city["datum"].nunique())\ngamla_dag = round(gamla["summa"].sum() / gamla["datum"].nunique())\n\nganger = round(city_dag / gamla_dag, 1)\nprint(f"City drar in {city_dag} kr per öppen dag, {ganger} gånger så mycket som gamla kaféet ({gamla_dag} kr), trots att det bara har öppet vardagar.")\n',
    files: CITY_OCH_KASSA,
    hints: [
      'ganger = round(city_dag / gamla_dag, 1)',
      'Sätt in city_dag, ganger och gamla_dag med en f-sträng.',
      'Kopiera meningen från uppgiften och byt siffrorna mot {…}.',
    ],
    tests: [
      { description: 'ganger är 2.0', code: 'ganger', expected: 2 },
      {
        description: 'Slutsatsen skrivs ut',
        code: '__output',
        expected: [
          'City drar in 2770 kr per öppen dag, 2.0 gånger så mycket som gamla kaféet (1409 kr), trots att det bara har öppet vardagar.',
        ],
      },
    ],
    sourceChecks: [
      {
        description: 'Skriver inte in 2770 för hand',
        pattern: /^(?![\s\S]*2770)/,
      },
    ],
  },
];
