import { FIL, KASSA, KASSA_OCH_PRODUKTER } from './filer';

// Projekten för bana 5–8. Varje steg bygger vidare på förra stegets kod.
const PD = 'import pandas as pd\n\n';
const PLT = 'import pandas as pd\nimport matplotlib.pyplot as plt\n\n';
const FILL = '__FILL__';

const KONTO_MANAD =
  PD +
  'df = pd.read_csv("konto.csv")\ndf["manad"] = pd.to_datetime(df["datum"]).dt.month\nutgifter = df[df["belopp"] < 0].copy()\nutgifter["belopp"] = -utgifter["belopp"]\n';
const MANAD_2 =
  KONTO_MANAD +
  'tabell = pd.pivot_table(utgifter, index="kategori", columns="manad", values="belopp", aggfunc="sum", fill_value=0)\nprint(tabell)\n';
const MANAD_3 =
  MANAD_2 +
  'oversikt = utgifter.groupby("kategori").agg(\n    totalt=("belopp", "sum"),\n    kop=("belopp", "count"),\n    snitt=("belopp", "mean"),\n).round(0).sort_values("totalt", ascending=False)\nprint(oversikt)\n';

const VADER = PD + 'df = pd.read_csv("vader.csv")\n';
const STADER_2 =
  VADER +
  'df["regndag"] = df["regn_mm"] > 1\nper_stad = df.groupby("stad").agg(\n    kallast=("temperatur", "min"),\n    varmast=("temperatur", "max"),\n    regndagar=("regndag", "sum"),\n)\nprint(per_stad)\n';
const STADER_3 =
  STADER_2 +
  'tabell = pd.pivot_table(df, index="datum", columns="stad", values="temperatur")\nvarmare = (tabell["Stockholm"] > tabell["Göteborg"]).sum()\nprint(varmare)\n';

const LYSS =
  PD +
  'df = pd.read_csv("lyssning.csv")\ndf["tidpunkt"] = pd.to_datetime(df["tidpunkt"])\ndf["helg"] = df["tidpunkt"].dt.dayofweek >= 5\n';
const ARTIST_2 =
  LYSS +
  'per_artist = df.groupby("artist").agg(\n    spelningar=("sekunder", "count"),\n    minuter=("sekunder", "sum"),\n    langd=("sekunder", "mean"),\n)\nper_artist["minuter"] = (per_artist["minuter"] / 60).round()\nper_artist["langd"] = per_artist["langd"].round()\nprint(per_artist)\n';
const ARTIST_3 =
  ARTIST_2 +
  'helg = pd.crosstab(df["artist"], df["helg"], normalize="index").round(2)\nprint(helg)\n';

const BUDGET =
  KONTO_MANAD +
  'budget = pd.read_csv("budget.csv")\nper_manad = (utgifter.groupby("kategori")["belopp"].sum() / 3).round().reset_index()\n';
const BUDGET_2 =
  BUDGET +
  'jamfor = per_manad.merge(budget, on="kategori", how="left")\nprint(jamfor)\n';
const BUDGET_3 =
  BUDGET_2 +
  'jamfor["kvar"] = jamfor["budget"] - jamfor["belopp"]\nprint(jamfor)\n';

const GENRE =
  PD +
  'df = pd.read_csv("lyssning.csv")\nartister = pd.read_csv("artister.csv")\n';
const GENRE_2 =
  GENRE +
  'ihop = df.merge(artister, on="artist")\nper_genre = (ihop.groupby("genre")["sekunder"].sum() / 60).round().sort_values(ascending=False)\nprint(per_genre)\n';
const GENRE_3 =
  GENRE_2 +
  'andel = (per_genre / per_genre.sum() * 100).round(1)\nprint(andel)\n';

const INKOP =
  PD +
  'df = pd.read_csv("kassan.csv")\nprodukter = pd.read_csv("produkter.csv")\nveckor = 52\n';
const INKOP_2 =
  INKOP +
  'per_vecka = (df.groupby("produkt")["antal"].sum() / veckor).round().reset_index()\nprint(per_vecka)\n';
const INKOP_3 =
  INKOP_2 +
  'lista = per_vecka.merge(produkter[["produkt", "inkop"]], on="produkt")\nlista["kostnad"] = lista["antal"] * lista["inkop"]\nlista = lista.sort_values("kostnad", ascending=False)\nprint(lista)\n';

const KONTO_PLT =
  PLT +
  'df = pd.read_csv("konto.csv")\nutgifter = df[df["belopp"] < 0]\nper_kategori = (-utgifter.groupby("kategori")["belopp"].sum()).sort_values()\n';
const KONTO_PLT_2 =
  KONTO_PLT +
  'plt.barh(per_kategori.index, per_kategori.values)\nplt.title("Utgifter per kategori")\nplt.xlabel("Kronor")\n';

const VADER_PLT =
  PLT +
  'df = pd.read_csv("vader.csv")\ntabell = pd.pivot_table(df, index="datum", columns="stad", values="temperatur")\n';
const VADER_PLT_2 =
  VADER_PLT +
  'for stad in ["Stockholm", "Göteborg", "Kiruna"]:\n    plt.plot(range(1, 31), tabell[stad], label=stad)\nplt.legend()\nplt.title("Juni 2025")\nplt.ylabel("Grader")\n';

const DASH =
  PLT +
  'df = pd.read_csv("kassan.csv")\ndf["summa"] = df["antal"] * df["pris"]\ndf["manad"] = pd.to_datetime(df["datum"]).dt.month\ndf["timme"] = df["tid"].str[:2].astype("int64")\n';
const DASH_2 =
  DASH +
  'fig, rutor = plt.subplots(2, 2, figsize=(10, 7))\nper_manad = df.groupby("manad")["summa"].sum()\nrutor[0, 0].plot(per_manad.index, per_manad.values)\nrutor[0, 0].set_title("Intäkt per månad")\n';
const DASH_3 =
  DASH_2 +
  'per_produkt = df.groupby("produkt")["summa"].sum().sort_values()\nrutor[0, 1].barh(per_produkt.index, per_produkt.values)\nrutor[0, 1].set_title("Intäkt per produkt")\n';

const STABIL = PD + 'df = pd.read_csv("vader.csv")\n';
const STABIL_2 =
  STABIL +
  'spridning = df.groupby("stad")["temperatur"].std().round(1).sort_values()\nprint(spridning)\n';
const STABIL_3 =
  STABIL_2 +
  'skillnad = (df.groupby("stad")["temperatur"].max() - df.groupby("stad")["temperatur"].min()).round(1)\nprint(skillnad)\n';

const MAT =
  PD +
  'df = pd.read_csv("konto.csv")\nmat = df[df["kategori"] == "mat"].copy()\nmat["belopp"] = -mat["belopp"]\n';
const MAT_2 =
  MAT +
  'medel = round(mat["belopp"].mean())\nmedian = mat["belopp"].median()\nprint(medel, median)\n';
const MAT_3 =
  MAT_2 +
  'kop = df[(df["belopp"] < 0) & (df["kategori"] != "boende")].copy()\nkop["belopp"] = -kop["belopp"]\ngrans = kop["belopp"].mean() + 2 * kop["belopp"].std()\nstora = kop[kop["belopp"] > grans]\nprint(stora)\n';

const LANGD = PD + 'df = pd.read_csv("lyssning.csv")\n';
const LANGD_2 =
  LANGD +
  'median = df["sekunder"].median()\nlang = df["sekunder"].quantile(0.9)\nprint(median, lang)\n';
const LANGD_3 =
  LANGD_2 +
  'per_artist = df.groupby("artist")["sekunder"].median().sort_values(ascending=False)\nprint(per_artist)\n';

export const PROJECTS_B = [
  // Bana 5: gruppera på riktigt
  {
    id: 'da-proj-manad',
    track: 'gruppera',
    title: 'Månadens pengar',
    reward: { emoji: '📊', name: 'Stapel' },
    summary: 'Kontoutdragets utgifter per kategori och månad, i en tabell.',
    files: FIL.konto,
    steps: [
      {
        title: 'Utgifterna som plus',
        why: '.copy() gör en egen tabell av urvalet, så att du kan ändra i den utan att pandas varnar för att du ändrar i en bit av df. Positiva belopp är lättare att läsa i en rapport.',
        xp: 15,
        description: 'Gör utgifterna positiva och lägg till månaden.',
        task: 'Uppgift: Läs in `konto.csv` och lägg till `manad`. Spara utgifterna (negativa belopp) i `utgifter` med `.copy()`, och gör beloppen positiva. Spara summan per månad i `per_manad`.',
        starterCode: PD + '# Steg 1: utgifterna som plus\n',
        solution:
          KONTO_MANAD +
          'per_manad = utgifter.groupby("manad")["belopp"].sum()\nprint(per_manad)\n',
        hints: [
          'df["manad"] = pd.to_datetime(df["datum"]).dt.month',
          'utgifter = df[df["belopp"] < 0].copy() och utgifter["belopp"] = -utgifter["belopp"]',
          'per_manad = utgifter.groupby("manad")["belopp"].sum()',
        ],
        tests: [
          {
            description: 'per_manad',
            code: 'per_manad.tolist()',
            expected: [15762, 21481, 14985],
          },
        ],
      },
      {
        title: 'Kategori mot månad',
        why: 'fill_value=0 ger 0 där en kategori saknas en månad. Utan den blir det NaN, och då går raden inte att summera rätt.',
        xp: 15,
        description:
          'En pivottabell med kategorier på raderna och månader i kolumnerna.',
        task: 'Uppgift: Spara utgifterna per kategori och månad i `tabell` med pivot_table och `fill_value=0`.',
        solution: MANAD_2,
        hints: [
          'pd.pivot_table(utgifter, index="kategori", columns="manad", values="belopp", aggfunc="sum", fill_value=0)',
          'tabell.loc["mat"] är matens tre månader.',
          'Skriv ut tabellen och titta på hem i februari.',
        ],
        tests: [
          {
            description: 'Mat per månad',
            code: 'tabell.loc["mat"].tolist()',
            expected: [3695, 3174, 3400],
          },
          {
            description: 'Hem bara i februari',
            code: 'tabell.loc["hem"].tolist()',
            expected: [0, 6995, 0],
          },
        ],
      },
      {
        title: 'Översikten',
        why: 'Totalt, antal köp och snitt per köp berättar olika saker: mat är många små köp, hem ett enda stort.',
        xp: 20,
        description: 'Tre mått per kategori i samma tabell.',
        task: 'Uppgift: Spara en tabell per kategori i `oversikt` med `totalt` (summa), `kop` (antal) och `snitt` (medel), avrundat till heltal och sorterad med störst totalt först.',
        solution: MANAD_3,
        hints: [
          'utgifter.groupby("kategori").agg(totalt=("belopp", "sum"), kop=("belopp", "count"), snitt=("belopp", "mean"))',
          '.round(0) avrundar alla tre.',
          '.sort_values("totalt", ascending=False)',
        ],
        tests: [
          {
            description: 'Ordningen',
            code: 'list(oversikt.index)',
            expected: ['boende', 'mat', 'hem', 'kläder', 'nöjen', 'resor'],
          },
          {
            description: 'Mat',
            code: 'oversikt.loc["mat"].tolist()',
            expected: [10269, 23, 446],
          },
        ],
      },
    ],
  },
  {
    id: 'da-proj-stader',
    track: 'gruppera',
    title: 'Tre städer',
    reward: { emoji: '🗺️', name: 'Karta' },
    summary:
      'Kallast, varmast och flest regndagar – och vilken stad var varmast flest dagar?',
    files: FIL.vader,
    steps: [
      {
        title: 'Regndagar',
        why: 'En kolumn med True och False kan summeras: True räknas som 1. Det är det enklaste sättet att räkna hur många rader som uppfyller ett villkor.',
        xp: 15,
        description: 'En regndag är en dag med mer än 1 mm regn.',
        task: 'Uppgift: Läs in `vader.csv` och lägg till kolumnen `regndag` (True när regn_mm är över 1). Spara antalet regndagar per stad i `regndagar`.',
        starterCode: PD + '# Steg 1: regndagar\n',
        solution:
          VADER +
          'df["regndag"] = df["regn_mm"] > 1\nregndagar = df.groupby("stad")["regndag"].sum()\nprint(regndagar)\n',
        hints: [
          'df["regndag"] = df["regn_mm"] > 1',
          'True räknas som 1 när du summerar.',
          'regndagar = df.groupby("stad")["regndag"].sum()',
        ],
        tests: [
          {
            description: 'regndagar',
            code: 'regndagar.to_dict()',
            expected: { Göteborg: 25, Kiruna: 14, Stockholm: 16 },
          },
        ],
      },
      {
        title: 'Ytterligheterna',
        why: 'agg med egna namn ger en tabell som går att läsa direkt, utan att man behöver komma ihåg vad min och max gällde.',
        xp: 15,
        description: 'Kallast, varmast och regndagar per stad i samma tabell.',
        task: 'Uppgift: Spara en tabell per stad i `per_stad` med `kallast` (minsta temperatur), `varmast` (största) och `regndagar`.',
        solution: STADER_2,
        hints: [
          'df.groupby("stad").agg(kallast=("temperatur", "min"), ...)',
          'varmast=("temperatur", "max")',
          'regndagar=("regndag", "sum")',
        ],
        tests: [
          {
            description: 'Kiruna',
            code: 'per_stad.loc["Kiruna"].tolist()',
            expected: [4, 18.6, 14],
          },
        ],
      },
      {
        title: 'Dag för dag',
        why: 'Med städerna som kolumner står samma dag på samma rad, och två kolumner kan jämföras rad för rad.',
        xp: 20,
        description: 'Hur många dagar var Stockholm varmare än Göteborg?',
        task: 'Uppgift: Spara en pivot_table med datum som index och städerna som kolumner i `tabell`. Spara antalet dagar Stockholm var varmare än Göteborg i `varmare`.',
        solution: STADER_3,
        hints: [
          'pd.pivot_table(df, index="datum", columns="stad", values="temperatur")',
          'tabell["Stockholm"] > tabell["Göteborg"] ger True eller False per dag.',
          'varmare = (tabell["Stockholm"] > tabell["Göteborg"]).sum()',
        ],
        tests: [{ description: 'varmare', code: 'varmare', expected: 19 }],
      },
    ],
  },
  {
    id: 'da-proj-artister',
    track: 'gruppera',
    title: 'Artisterna',
    reward: { emoji: '🎤', name: 'Mikrofon' },
    summary:
      'Spelningar, minuter och låtlängd per artist – och vem som hörs på helgen.',
    files: FIL.lyssning,
    steps: [
      {
        title: 'Helg eller vardag',
        why: 'dayofweek är 5 och 6 för lördag och söndag. Kolumnen helg gör det lätt att gruppera på senare.',
        xp: 10,
        description: 'Förbered datan.',
        task: 'Uppgift: Läs in `lyssning.csv`, gör om tidpunkt och lägg till kolumnen `helg`. Spara antalet spelningar på helgen i `pa_helgen`.',
        starterCode: PD + '# Steg 1: helg eller vardag\n',
        solution: LYSS + 'pa_helgen = df["helg"].sum()\nprint(pa_helgen)\n',
        hints: [
          'df["tidpunkt"] = pd.to_datetime(df["tidpunkt"])',
          'df["helg"] = df["tidpunkt"].dt.dayofweek >= 5',
          'pa_helgen = df["helg"].sum()',
        ],
        tests: [{ description: 'pa_helgen', code: 'pa_helgen', expected: 23 }],
      },
      {
        title: 'Tre mått per artist',
        why: 'Samma kolumn, sekunder, kan ge tre olika mått: antal, summa och medel. agg låter dig namnge vart och ett.',
        xp: 20,
        description: 'Spelningar, minuter och låtlängd per artist.',
        task: 'Uppgift: Spara en tabell per artist i `per_artist` med `spelningar` (antal), `minuter` (summan av sekunder delat med 60, avrundat) och `langd` (snittlängd i sekunder, avrundat).',
        solution: ARTIST_2,
        hints: [
          'df.groupby("artist").agg(spelningar=("sekunder", "count"), minuter=("sekunder", "sum"), langd=("sekunder", "mean"))',
          'per_artist["minuter"] = (per_artist["minuter"] / 60).round()',
          'per_artist["langd"] = per_artist["langd"].round()',
        ],
        tests: [
          {
            description: 'Bach',
            code: 'per_artist.loc["Bach"].tolist()',
            expected: [5, 28, 338],
          },
        ],
      },
      {
        title: 'Helgartister',
        why: 'normalize="index" gör varje rad till andelar som blir 1 tillsammans. Då syns vilken artist som hörs mest på helgen, oavsett hur ofta den spelas totalt.',
        xp: 20,
        description: 'Vilken andel av varje artists spelningar är på helgen?',
        task: 'Uppgift: Spara andelen spelningar på vardag och helg per artist i `helg` med crosstab och `normalize="index"`, avrundat till två decimaler.',
        solution: ARTIST_3,
        hints: [
          'pd.crosstab(df["artist"], df["helg"], normalize="index")',
          'Avrunda med .round(2).',
          'helg[True] är andelen på helgen.',
        ],
        tests: [
          {
            description: 'Andel på helgen per artist',
            code: 'helg[True].to_dict()',
            expected: {
              ABBA: 0.2,
              Bach: 0.2,
              'Håkan Hellström': 0.31,
              Kent: 0.39,
              'Miriam Bryant': 0.12,
              Robyn: 0.33,
              'Veronica Maggio': 0.22,
            },
          },
        ],
      },
    ],
  },

  // Bana 6: kombinera tabeller
  {
    id: 'da-proj-budget',
    track: 'kombinera',
    title: 'Budgeten',
    reward: { emoji: '🎯', name: 'Måltavla' },
    summary:
      'Håller kontot budgeten? Slå ihop utgifterna med budgeten per kategori.',
    files: FIL.kontoBudget,
    steps: [
      {
        title: 'Utgift per månad',
        why: 'Budgeten är per månad, så utgifterna för tre månader delas med 3 innan de jämförs.',
        xp: 15,
        description:
          'Budgeten säger hur mycket varje kategori får kosta per månad.',
        task: 'Uppgift: Läs in kontot (med positiva utgifter, som i förra banans projekt) och `budget.csv`. Spara utgifterna per kategori och månad i snitt, avrundade, som en tabell i `per_manad`.',
        starterCode: PD + '# Steg 1: utgift per månad\n',
        solution: BUDGET,
        hints: [
          'utgifter = df[df["belopp"] < 0].copy() och gör beloppen positiva.',
          'Summera per kategori och dela med 3.',
          '(... / 3).round().reset_index()',
        ],
        tests: [
          {
            description: 'Mat per månad',
            code: 'per_manad[per_manad["kategori"] == "mat"]["belopp"].tolist()',
            expected: [3423],
          },
        ],
      },
      {
        title: 'Bredvid budgeten',
        why: 'how="left" behåller alla kategorier som har utgifter, även om budgeten skulle sakna någon.',
        xp: 15,
        description: 'Slå ihop utgifterna med budgeten.',
        task: 'Uppgift: Spara utgifterna och budgeten i samma tabell, `jamfor`, med merge på kategori och `how="left"`.',
        solution: BUDGET_2,
        hints: [
          'per_manad.merge(budget, on="kategori", how="left")',
          'jamfor har kolumnerna kategori, belopp och budget.',
          'Skriv ut och titta.',
        ],
        tests: [
          {
            description: 'jamfor har sex kategorier',
            code: 'len(jamfor)',
            expected: 6,
          },
          {
            description: 'Kolumnerna',
            code: 'list(jamfor.columns)',
            expected: ['kategori', 'belopp', 'budget'],
          },
        ],
      },
      {
        title: 'Över budget',
        why: 'Ett negativt "kvar" betyder att budgeten sprack. Filtret plockar ut just de kategorierna.',
        xp: 20,
        description: 'Vilka kategorier gick över budgeten?',
        task: 'Uppgift: Lägg till kolumnen `kvar` (budget minus belopp). Spara kategorierna med negativt kvar, i bokstavsordning, i `over`.',
        solution:
          BUDGET_3 +
          'over = sorted(jamfor[jamfor["kvar"] < 0]["kategori"])\nprint(over)\n',
        hints: [
          'jamfor["kvar"] = jamfor["budget"] - jamfor["belopp"]',
          'jamfor[jamfor["kvar"] < 0] är kategorierna över budget.',
          'over = sorted(jamfor[jamfor["kvar"] < 0]["kategori"])',
        ],
        tests: [
          { description: 'over', code: 'over', expected: ['hem', 'kläder'] },
        ],
      },
    ],
  },
  {
    id: 'da-proj-genrer',
    track: 'kombinera',
    title: 'Genrerna',
    reward: { emoji: '🎼', name: 'Not' },
    summary:
      'Spellistan vet inte vilken genre artisterna har. Det gör en annan fil.',
    files: FIL.lyssningArtister,
    steps: [
      {
        title: 'Två filer',
        why: 'artister.csv har en rad per artist. Det är en typisk uppslagstabell: liten, och den finns för att slås ihop med en större.',
        xp: 10,
        description: 'Titta på de två filerna.',
        task: 'Uppgift: Läs in `lyssning.csv` till `df` och `artister.csv` till `artister`. Spara antalet artister i uppslagstabellen i `antal_artister` och genrerna, sorterade, i `genrer`.',
        starterCode: PD + '# Steg 1: två filer\n',
        solution:
          GENRE +
          'antal_artister = len(artister)\ngenrer = sorted(artister["genre"].unique())\nprint(artister)\n',
        hints: [
          'artister = pd.read_csv("artister.csv")',
          'antal_artister = len(artister)',
          'genrer = sorted(artister["genre"].unique())',
        ],
        tests: [
          {
            description: 'antal_artister',
            code: 'antal_artister',
            expected: 7,
          },
          {
            description: 'genrer',
            code: 'genrer',
            expected: ['klassiskt', 'pop', 'rock'],
          },
        ],
      },
      {
        title: 'Minuter per genre',
        why: 'Efter merge har varje spelning sin genre, och då kan du gruppera på den som på vilken kolumn som helst.',
        xp: 20,
        description: 'Hur många minuter av varje genre?',
        task: 'Uppgift: Slå ihop i `ihop`. Spara minuterna per genre (sekunder delat med 60, avrundat), störst först, i `per_genre`.',
        solution: GENRE_2,
        hints: [
          'ihop = df.merge(artister, on="artist")',
          'Gruppera på "genre" och summera "sekunder".',
          'Dela med 60, avrunda och sortera.',
        ],
        tests: [
          {
            description: 'per_genre',
            code: 'per_genre.to_dict()',
            expected: { pop: 166, rock: 141, klassiskt: 28 },
          },
        ],
      },
      {
        title: 'Andelen pop',
        why: 'Andelen i procent blir lika lätt att förstå om du lyssnat i två veckor eller ett år.',
        xp: 15,
        description: 'Hur stor del av tiden är pop?',
        task: 'Uppgift: Spara andelen minuter per genre i procent, avrundat till en decimal, i `andel`.',
        solution: GENRE_3,
        hints: [
          'Dela per_genre med per_genre.sum().',
          'Gånger 100 och avrunda till en decimal.',
          'andel = (per_genre / per_genre.sum() * 100).round(1)',
        ],
        tests: [
          {
            description: 'andel',
            code: 'andel.to_dict()',
            expected: { pop: 49.6, rock: 42.1, klassiskt: 8.4 },
          },
        ],
      },
    ],
  },
  {
    id: 'da-proj-inkop',
    track: 'kombinera',
    title: 'Inköpslistan',
    reward: { emoji: '🛒', name: 'Kundvagn' },
    summary: 'Vad behöver kaféet köpa in en vanlig vecka, och vad kostar det?',
    files: KASSA_OCH_PRODUKTER,
    steps: [
      {
        title: 'Per vecka',
        why: 'Året har 52 veckor. Snittet per vecka är en bra utgångspunkt för en beställning, även om sommar och vinter skiljer sig.',
        xp: 15,
        description: 'Hur mycket säljs av varje produkt en vanlig vecka?',
        task: 'Uppgift: Läs in kassan och prislistan. Spara antalet sålda per produkt och vecka (summan delat med `veckor`, avrundat) som en tabell i `per_vecka`.',
        starterCode: PD + '# Steg 1: per vecka\n',
        solution: INKOP_2,
        hints: [
          'df.groupby("produkt")["antal"].sum() / veckor',
          'Avrunda med .round().',
          '.reset_index() gör det till en tabell.',
        ],
        tests: [
          {
            description: 'Bryggkaffe per vecka',
            code: 'per_vecka[per_vecka["produkt"] == "Bryggkaffe"]["antal"].tolist()',
            expected: [40],
          },
        ],
      },
      {
        title: 'Vad kostar det?',
        why: 'Inköpspriset finns bara i prislistan. Merge sätter det bredvid antalet, så att kostnaden kan räknas rad för rad.',
        xp: 20,
        description: 'Räkna ut inköpskostnaden per vecka.',
        task: 'Uppgift: Slå ihop med produkt och inkop från prislistan i `lista`. Lägg till `kostnad` (antal gånger inkop) och sortera med störst först.',
        solution: INKOP_3,
        hints: [
          'per_vecka.merge(produkter[["produkt", "inkop"]], on="produkt")',
          'lista["kostnad"] = lista["antal"] * lista["inkop"]',
          'Sortera på "kostnad" med störst först.',
        ],
        tests: [
          {
            description: 'Dyrast att köpa in',
            code: 'lista["produkt"].tolist()[:3]',
            expected: ['Smörgås', 'Kanelbulle', 'Latte'],
          },
        ],
      },
      {
        title: 'Veckans beställning',
        why: 'Summan av kostnaden är vad kaféet behöver betala varje vecka. Den kan jämföras med intäkten för att se marginalen.',
        xp: 15,
        description: 'Vad kostar en veckas inköp?',
        task: 'Uppgift: Spara den totala kostnaden i `totalt` och skriv ut `Inköp per vecka: 2346 kr`. Summan blir ett decimaltal, eftersom antalet per vecka är avrundat – gör om den med `int(...)`.',
        solution:
          INKOP_3 +
          'totalt = int(lista["kostnad"].sum())\nprint(f"Inköp per vecka: {totalt} kr")\n',
        hints: [
          'totalt = int(lista["kostnad"].sum())',
          'print(f"Inköp per vecka: {totalt} kr")',
          'Kostnaden räknades i förra steget.',
        ],
        tests: [
          { description: 'totalt', code: 'totalt', expected: 2346 },
          {
            description: 'Utskriften',
            code: '__output[-1]',
            expected: 'Inköp per vecka: 2346 kr',
          },
        ],
      },
    ],
  },

  // Bana 7: diagram
  {
    id: 'da-proj-kontobild',
    track: 'diagram',
    title: 'Kontot i bilder',
    reward: { emoji: '🖼️', name: 'Tavla' },
    summary: 'Utgifterna som staplar och saldot som en linje.',
    files: FIL.konto,
    steps: [
      {
        title: 'Utgifterna',
        why: 'Liggande staplar sorterade med minst först ger den största utgiften överst, där ögat börjar läsa.',
        xp: 15,
        description: 'Utgifterna per kategori som liggande staplar.',
        task: 'Uppgift: Rita `per_kategori` som liggande staplar med titeln `Utgifter per kategori` och x-axeln `Kronor`.',
        starterCode: KONTO_PLT + '\n# Steg 1: utgifterna\n',
        solution: KONTO_PLT_2,
        hints: [
          'plt.barh(per_kategori.index, per_kategori.values)',
          'plt.title("Utgifter per kategori")',
          'plt.xlabel("Kronor")',
        ],
        tests: [
          {
            description: 'Liggande staplar',
            code: '__figur()["typ"]',
            expected: ['liggande staplar'],
          },
          {
            description: 'Boende överst',
            code: '__figur()["y_etiketter"][-1]',
            expected: 'boende',
          },
        ],
      },
      {
        title: 'Saldot över tid',
        why: 'cumsum lägger ihop beloppen rad för rad: efter varje rad står hur mycket som kommit in minus gått ut hittills. Det är saldot.',
        xp: 20,
        description: 'Hur förändras saldot under de tre månaderna?',
        task: 'Uppgift: Gör en ny figur med `plt.figure()`. Spara saldot efter varje rad i `df["saldo"]` med `df["belopp"].cumsum()`, och rita det som en linje med titeln `Saldo`.',
        solution:
          KONTO_PLT_2 +
          '\nplt.figure()\ndf["saldo"] = df["belopp"].cumsum()\nplt.plot(range(len(df)), df["saldo"])\nplt.title("Saldo")\n',
        hints: [
          'plt.figure() börjar ett nytt diagram.',
          'df["saldo"] = df["belopp"].cumsum()',
          'plt.plot(range(len(df)), df["saldo"]) och plt.title("Saldo")',
        ],
        tests: [
          {
            description: 'Sista saldot',
            code: 'df["saldo"].tolist()[-1]',
            expected: 33272,
          },
          {
            description: 'Linjen har titeln Saldo',
            code: '__figur()["titel"]',
            expected: 'Saldo',
          },
        ],
      },
      {
        title: 'Bredvid varandra',
        why: 'Två diagram som hör ihop blir lättare att jämföra i samma figur än i två.',
        xp: 20,
        description: 'Sätt de två diagrammen bredvid varandra.',
        task: 'Uppgift: Ta bort de två diagrammen och rita dem i stället i en figur med `plt.subplots(1, 2)`: utgifterna till vänster och saldot till höger, med samma titlar.',
        solution:
          KONTO_PLT +
          'df["saldo"] = df["belopp"].cumsum()\n\nfig, (vanster, hoger) = plt.subplots(1, 2, figsize=(10, 4))\nvanster.barh(per_kategori.index, per_kategori.values)\nvanster.set_title("Utgifter per kategori")\nhoger.plot(range(len(df)), df["saldo"])\nhoger.set_title("Saldo")\n',
        hints: [
          'fig, (vanster, hoger) = plt.subplots(1, 2, figsize=(10, 4))',
          'vanster.barh(...) och vanster.set_title(...)',
          'hoger.plot(...) och hoger.set_title("Saldo")',
        ],
        tests: [
          {
            description: 'Två diagram',
            code: '__figur()["diagram"]',
            expected: 2,
          },
          {
            description: 'Titlarna',
            code: '[__figur(0)["titel"], __figur(1)["titel"]]',
            expected: ['Utgifter per kategori', 'Saldo'],
          },
        ],
        sourceChecks: [
          { description: 'Använder subplots', pattern: /subplots\(/ },
        ],
      },
    ],
  },
  {
    id: 'da-proj-vaderbild',
    track: 'diagram',
    title: 'Juni i tre städer',
    reward: { emoji: '🌍', name: 'Jordglob' },
    summary:
      'Temperaturen i tre städer som tre linjer, och regnet som staplar.',
    files: FIL.vader,
    steps: [
      {
        title: 'Tre linjer',
        why: 'En loop över städerna ritar tre linjer med samma kod. label= ger varje linje sitt namn i förklaringen.',
        xp: 15,
        description: 'Temperaturen dag för dag i varje stad.',
        task: 'Uppgift: Rita en linje per stad (Stockholm, Göteborg, Kiruna) med dagarna 1–30 på x-axeln, med förklaring, titeln `Juni 2025` och y-axeln `Grader`.',
        starterCode: VADER_PLT + '\n# Steg 1: tre linjer\n',
        solution: VADER_PLT_2,
        hints: [
          'for stad in ["Stockholm", "Göteborg", "Kiruna"]:',
          '    plt.plot(range(1, 31), tabell[stad], label=stad)',
          'plt.legend(), plt.title("Juni 2025") och plt.ylabel("Grader")',
        ],
        tests: [
          {
            description: 'Tre linjer med namn',
            code: '__figur()["forklaring"]',
            expected: ['Stockholm', 'Göteborg', 'Kiruna'],
          },
          {
            description: 'Titeln',
            code: '__figur()["titel"]',
            expected: 'Juni 2025',
          },
        ],
      },
      {
        title: 'Regnet',
        why: 'Regnet för en månad är en summa per stad – en jämförelse mellan saker, alltså staplar.',
        xp: 15,
        description: 'Hur mycket regnade det i varje stad?',
        task: 'Uppgift: Gör en ny figur och rita regnet per stad (summan, sorterad med mest först) som staplar med titeln `Regn i juni`.',
        solution:
          VADER_PLT_2 +
          '\nplt.figure()\nregn = df.groupby("stad")["regn_mm"].sum().sort_values(ascending=False)\nplt.bar(regn.index, regn.values)\nplt.title("Regn i juni")\n',
        hints: [
          'plt.figure() börjar ett nytt diagram.',
          'regn = df.groupby("stad")["regn_mm"].sum().sort_values(ascending=False)',
          'plt.bar(regn.index, regn.values) och plt.title("Regn i juni")',
        ],
        tests: [
          {
            description: 'Staplarna i ordning',
            code: '__figur()["etiketter"]',
            expected: ['Göteborg', 'Stockholm', 'Kiruna'],
          },
          {
            description: 'Titeln',
            code: '__figur()["titel"]',
            expected: 'Regn i juni',
          },
        ],
      },
      {
        title: 'En figur',
        why: 'När allt finns i en figur kan den sparas som en bild och skickas vidare.',
        xp: 20,
        description: 'Sätt ihop dem i en figur.',
        task: 'Uppgift: Rita i stället båda i en figur med `plt.subplots(1, 2)`: linjerna till vänster (med förklaring) och regnet till höger, med samma titlar.',
        solution:
          VADER_PLT +
          'regn = df.groupby("stad")["regn_mm"].sum().sort_values(ascending=False)\n\nfig, (vanster, hoger) = plt.subplots(1, 2, figsize=(11, 4))\nfor stad in ["Stockholm", "Göteborg", "Kiruna"]:\n    vanster.plot(range(1, 31), tabell[stad], label=stad)\nvanster.legend()\nvanster.set_title("Juni 2025")\nhoger.bar(regn.index, regn.values)\nhoger.set_title("Regn i juni")\n',
        hints: [
          'fig, (vanster, hoger) = plt.subplots(1, 2, figsize=(11, 4))',
          'Loopen ritar på vanster: vanster.plot(...), och vanster.legend()',
          'hoger.bar(regn.index, regn.values)',
        ],
        tests: [
          {
            description: 'Två diagram',
            code: '__figur()["diagram"]',
            expected: 2,
          },
          {
            description: 'Linjer till vänster, staplar till höger',
            code: '[__figur(0)["typ"], __figur(1)["typ"]]',
            expected: [['linje'], ['staplar']],
          },
        ],
      },
    ],
  },
  {
    id: 'da-proj-dashboard',
    track: 'diagram',
    title: 'Dashboarden',
    reward: { emoji: '🖥️', name: 'Skärm' },
    summary: 'Fyra diagram om kaféet i en figur, två och två.',
    files: KASSA,
    steps: [
      {
        title: 'Den första rutan',
        why: 'plt.subplots(2, 2) ger ett rutnät. rutor[0, 0] är rutan uppe till vänster: rad 0, kolumn 0.',
        xp: 15,
        description: 'Ett rutnät med fyra diagram. Börja uppe till vänster.',
        task: 'Uppgift: Gör ett rutnät med `fig, rutor = plt.subplots(2, 2, figsize=(10, 7))`. Rita intäkten per månad som en linje i `rutor[0, 0]` med titeln `Intäkt per månad`.',
        starterCode: DASH + '\n# Steg 1: den första rutan\n',
        solution: DASH_2,
        hints: [
          'fig, rutor = plt.subplots(2, 2, figsize=(10, 7))',
          'per_manad = df.groupby("manad")["summa"].sum()',
          'rutor[0, 0].plot(...) och rutor[0, 0].set_title(...)',
        ],
        tests: [
          {
            description: 'Fyra rutor',
            code: '__figur()["diagram"]',
            expected: 4,
          },
          {
            description: 'Uppe till vänster',
            code: '__figur(0)["titel"]',
            expected: 'Intäkt per månad',
          },
        ],
      },
      {
        title: 'Produkterna',
        why: 'Rutorna numreras rad för rad: uppe till höger är rutor[0, 1], och i __figur() är det diagram nummer 1.',
        xp: 15,
        description: 'Uppe till höger: intäkten per produkt.',
        task: 'Uppgift: Rita intäkten per produkt som liggande staplar (minst först) i `rutor[0, 1]` med titeln `Intäkt per produkt`.',
        solution: DASH_3,
        hints: [
          'per_produkt = df.groupby("produkt")["summa"].sum().sort_values()',
          'rutor[0, 1].barh(per_produkt.index, per_produkt.values)',
          'rutor[0, 1].set_title("Intäkt per produkt")',
        ],
        tests: [
          {
            description: 'Liggande staplar uppe till höger',
            code: '[__figur(1)["typ"], __figur(1)["titel"]]',
            expected: [['liggande staplar'], 'Intäkt per produkt'],
          },
        ],
      },
      {
        title: 'Den nedre raden',
        why: 'Med alla fyra fyllda svarar figuren på fyra frågor på en gång: när, vad, vilken tid och hur stort.',
        xp: 20,
        description:
          'Nere till vänster kunder per timme, nere till höger kvittonas storlek.',
        task: 'Uppgift: Rita kunder (olika kvitton) per timme som staplar i `rutor[1, 0]` med titeln `Kunder per timme`, och ett histogram med 20 fack över summan per kvitto i `rutor[1, 1]` med titeln `Kvittonas storlek`.',
        solution:
          DASH_3 +
          'per_timme = df.groupby("timme")["kvitto"].nunique()\nrutor[1, 0].bar(per_timme.index, per_timme.values)\nrutor[1, 0].set_title("Kunder per timme")\nkvitton = df.groupby("kvitto")["summa"].sum()\nrutor[1, 1].hist(kvitton, bins=20)\nrutor[1, 1].set_title("Kvittonas storlek")\n',
        hints: [
          'per_timme = df.groupby("timme")["kvitto"].nunique()',
          'rutor[1, 0].bar(...) och rutor[1, 0].set_title(...)',
          'rutor[1, 1].hist(kvitton, bins=20)',
        ],
        tests: [
          {
            description: 'Den nedre raden',
            code: '[__figur(2)["typ"], __figur(3)["typ"]]',
            expected: [['staplar'], ['histogram']],
          },
          {
            description: 'Titlarna',
            code: '[__figur(2)["titel"], __figur(3)["titel"]]',
            expected: ['Kunder per timme', 'Kvittonas storlek'],
          },
        ],
      },
    ],
  },

  // Bana 8: statistik
  {
    id: 'da-proj-stabil',
    track: 'statistik',
    title: 'Stabilt väder',
    reward: { emoji: '🌡️', name: 'Termometer' },
    summary: 'Vilken stad har jämnast väder?',
    files: FIL.vader,
    steps: [
      {
        title: 'Snittet',
        why: 'Medianen och medelvärdet ligger nära varandra när värdena är jämnt fördelade, som temperaturer brukar vara.',
        xp: 10,
        description: 'Börja med snittet per stad, både medel och median.',
        task: 'Uppgift: Läs in `vader.csv`. Spara medianen av temperaturen per stad i `median`.',
        starterCode: PD + '# Steg 1: snittet\n',
        solution:
          STABIL +
          'median = df.groupby("stad")["temperatur"].median()\nprint(median)\n',
        hints: [
          'df = pd.read_csv("vader.csv")',
          'Gruppera på "stad".',
          'median = df.groupby("stad")["temperatur"].median()',
        ],
        tests: [
          {
            description: 'median',
            code: 'median.to_dict()',
            expected: { Göteborg: 15.2, Kiruna: 10.6, Stockholm: 17.35 },
          },
        ],
      },
      {
        title: 'Spridningen',
        why: 'Liten standardavvikelse betyder att dagarna liknar varandra – jämnt väder.',
        xp: 15,
        description: 'Vilken stad har minst spridning?',
        task: 'Uppgift: Spara standardavvikelsen per stad, avrundad till en decimal, med minst först, i `spridning`.',
        solution: STABIL_2,
        hints: [
          'df.groupby("stad")["temperatur"].std()',
          'Avrunda och sortera.',
          'spridning.index[0] är den jämnaste.',
        ],
        tests: [
          {
            description: 'spridning',
            code: 'spridning.to_dict()',
            expected: { Kiruna: 3.5, Göteborg: 3.6, Stockholm: 3.7 },
          },
        ],
      },
      {
        title: 'Från kallast till varmast',
        why: 'Skillnaden mellan största och minsta säger hur långt vädret kan svänga. Den påverkas av en enda konstig dag, standardavvikelsen gör det mindre.',
        xp: 15,
        description:
          'Hur stor var skillnaden mellan varmaste och kallaste dagen?',
        task: 'Uppgift: Spara skillnaden mellan högsta och lägsta temperatur per stad, avrundad till en decimal, i `skillnad`.',
        solution: STABIL_3,
        hints: [
          'df.groupby("stad")["temperatur"].max() ger högsta per stad.',
          'Dra ifrån .min() på samma sätt.',
          'Avrunda med .round(1).',
        ],
        tests: [
          {
            description: 'skillnad',
            code: 'skillnad.to_dict()',
            expected: { Göteborg: 13.1, Kiruna: 14.6, Stockholm: 12.4 },
          },
        ],
      },
    ],
  },
  {
    id: 'da-proj-ovanliga',
    track: 'statistik',
    title: 'Ovanliga köp',
    reward: { emoji: '🔎', name: 'Lupp' },
    summary: 'Hitta köpen i kontoutdraget som sticker ut.',
    files: FIL.konto,
    steps: [
      {
        title: 'Matköpen',
        why: 'Positiva belopp är lättare att räkna med när det handlar om storlek på köp.',
        xp: 10,
        description: 'Börja med matköpen.',
        task: 'Uppgift: Läs in `konto.csv`. Spara matköpen i `mat` med `.copy()` och gör beloppen positiva. Spara antalet i `antal`.',
        starterCode: PD + '# Steg 1: matköpen\n',
        solution: MAT + 'antal = len(mat)\nprint(antal)\n',
        hints: [
          'mat = df[df["kategori"] == "mat"].copy()',
          'mat["belopp"] = -mat["belopp"]',
          'antal = len(mat)',
        ],
        tests: [{ description: 'antal', code: 'antal', expected: 23 }],
      },
      {
        title: 'Medel eller median',
        why: 'Ligger medel och median nära varandra är köpen jämnt fördelade, utan några enstaka jättestora. Då säger båda ungefär samma sak.',
        xp: 15,
        description: 'Vad kostar ett vanligt matköp?',
        task: 'Uppgift: Spara medelvärdet (avrundat till heltal) och medianen av matköpen i `medel` och `median`.',
        solution: MAT_2,
        hints: [
          'medel = round(mat["belopp"].mean())',
          'median = mat["belopp"].median()',
          'Jämför dem.',
        ],
        tests: [
          {
            description: 'medel och median',
            code: '[medel, median]',
            expected: [446, 457],
          },
        ],
      },
      {
        title: 'Stora köp',
        why: 'Hyran är stor men inte ovanlig: den är likadan varje månad. Fasta kostnader tas därför bort först. Sedan är medel plus två standardavvikelser en enkel gräns för "ovanligt stort".',
        xp: 20,
        description: 'Vilka köp är ovanligt stora bland alla utgifter?',
        task: 'Uppgift: Spara alla utgifter utom kategorin boende, med positiva belopp, i `kop`. Spara köpen över medel plus två standardavvikelser i `stora`.',
        solution: MAT_3,
        hints: [
          'kop = df[(df["belopp"] < 0) & (df["kategori"] != "boende")].copy() och gör beloppen positiva.',
          'grans = kop["belopp"].mean() + 2 * kop["belopp"].std()',
          'stora = kop[kop["belopp"] > grans]',
        ],
        tests: [
          {
            description: 'Stora köp',
            code: 'stora["text"].tolist()',
            expected: ['Elgiganten'],
          },
        ],
      },
    ],
  },
  {
    id: 'da-proj-langd',
    track: 'statistik',
    title: 'Låtlängder',
    reward: { emoji: '⏱️', name: 'Stoppur' },
    summary: 'Hur lång är en vanlig låt, och vem gör de längsta?',
    files: FIL.lyssning,
    steps: [
      {
        title: 'Snittlängden',
        why: 'Medelvärdet i sekunder är svårt att föreställa sig. Delat i minuter och sekunder blir det något man känner igen.',
        xp: 10,
        description: 'Hur lång är en låt i snitt?',
        task: 'Uppgift: Läs in `lyssning.csv`. Spara snittlängden i hela sekunder i `snitt`, och skriv ut den som minuter och sekunder: `3:54`.',
        starterCode: PD + '# Steg 1: snittlängden\n',
        solution:
          LANGD +
          'snitt = round(df["sekunder"].mean())\nprint(f"{snitt // 60}:{snitt % 60:02d}")\n',
        hints: [
          'snitt = round(df["sekunder"].mean())',
          'snitt // 60 är minuterna och snitt % 60 sekunderna.',
          ':02d skriver sekunderna med två siffror.',
        ],
        tests: [
          { description: 'snitt', code: 'snitt', expected: 234 },
          { description: 'Utskriften', code: '__output[-1]', expected: '3:54' },
        ],
      },
      {
        title: 'Median och percentil',
        why: 'Den 90:e percentilen säger var de längsta låtarna börjar. Det är ett bra sätt att beskriva "långa" utan att välja en gräns själv.',
        xp: 15,
        description: 'Var går gränsen för en lång låt?',
        task: 'Uppgift: Spara medianen i `median` och den 90:e percentilen i `lang`.',
        solution: LANGD_2,
        hints: [
          'median = df["sekunder"].median()',
          'lang = df["sekunder"].quantile(0.9)',
          'Skriv ut båda.',
        ],
        tests: [
          {
            description: 'median och lang',
            code: '[median, lang]',
            expected: [230, 283.5],
          },
        ],
      },
      {
        title: 'Längst per artist',
        why: 'Medianen per artist påverkas inte av en enstaka extra lång låt, så den beskriver artistens vanliga låtar.',
        xp: 15,
        description: 'Vem gör de längsta låtarna?',
        task: 'Uppgift: Spara medianlängden per artist, längst först, i `per_artist`.',
        solution: LANGD_3,
        hints: [
          'df.groupby("artist")["sekunder"].median()',
          'Sortera med .sort_values(ascending=False).',
          'per_artist.index[0] är artisten med de längsta låtarna.',
        ],
        tests: [
          {
            description: 'Längst först',
            code: 'list(per_artist.index[:2])',
            expected: ['Bach', 'Kent'],
          },
        ],
      },
    ],
  },
];
