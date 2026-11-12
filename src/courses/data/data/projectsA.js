import { FIL, KASSA } from './filer';

// Projekten för bana 1–4. Varje steg bygger vidare på förra stegets kod.
// Datan kommer från scripts/data/projekt.py (kontot, vädret, spellistan,
// biblioteket och enkäten) och från kaféets kassa.
const PD = 'import pandas as pd\n\n';

const KONTO = PD + 'df = pd.read_csv("konto.csv")\n';
const KONTO_2 =
  KONTO +
  'utgifter = df[df["belopp"] < 0]\ntotalt = -utgifter["belopp"].sum()\nprint(f"Utgifter: {totalt} kr")\n';
const KONTO_3 =
  KONTO_2 +
  'per_kategori = utgifter.groupby("kategori")["belopp"].sum().sort_values()\nprint(per_kategori)\n';

const VADER = PD + 'df = pd.read_csv("vader.csv")\n';
const VADER_2 =
  VADER +
  'medel = round(df["temperatur"].mean(), 1)\nvarmast = df["temperatur"].max()\nprint(medel, varmast)\n';
const VADER_3 =
  VADER_2 +
  'per_stad = df.groupby("stad")["temperatur"].mean().round(1)\nprint(per_stad)\n';

const LYSSNING = PD + 'df = pd.read_csv("lyssning.csv")\n';
const LYSSNING_2 =
  LYSSNING +
  'spelningar = len(df)\nminuter = round(df["sekunder"].sum() / 60)\nprint(spelningar, minuter)\n';
const LYSSNING_3 =
  LYSSNING_2 +
  'per_artist = df["artist"].value_counts()\nfavorit = per_artist.index[0]\nprint(per_artist)\n';

const BIBLIOTEK = PD + 'df = pd.read_csv("bibliotek.csv")\n';
const BIBLIOTEK_2 =
  BIBLIOTEK +
  'storlek = df.shape\ntyp_lanad = str(df["lanad"].dtype)\nprint(df.dtypes)\n';
const BIBLIOTEK_3 =
  BIBLIOTEK_2 +
  'genrer = sorted(df["genre"].unique())\nbocker = df["titel"].nunique()\nprint(genrer, bocker)\n';

const ENKAT = PD + 'df = pd.read_csv("enkat.csv")\n';
const ENKAT_FORSTA_2 =
  ENKAT + 'svar = len(df)\nsaknas = svar - df.count()\nprint(saknas)\n';
const ENKAT_FORSTA_3 =
  ENKAT_FORSTA_2 +
  'kafeer = df["kafe"].unique()\nbetyg = df["betyg"].unique()\nprint(kafeer)\nprint(betyg)\n';

const KASSAN =
  PD +
  'df = pd.read_csv("kassan.csv")\ndf["summa"] = df["antal"] * df["pris"]\n';
const SORTIMENT_2 =
  KASSAN +
  'priser = df.groupby("produkt")["pris"].max().sort_values()\nbilligast = priser.index[0]\ndyrast = priser.index[-1]\nprint(priser)\n';
const SORTIMENT_3 =
  SORTIMENT_2 +
  'andelar = (df["produkt"].value_counts(normalize=True) * 100).round(1)\nprint(andelar)\n';

const ENKAT_2 =
  ENKAT +
  'df["kafe"] = df["kafe"].str.strip().str.lower()\ndf["kafe"] = df["kafe"].replace({"gamla stan": "Gamla stan", "city": "City"})\nper_kafe = df["kafe"].value_counts()\nprint(per_kafe)\n';
const ENKAT_3 =
  ENKAT_2 +
  'ord = {"ett": "1", "två": "2", "tre": "3", "fyra": "4", "fem": "5"}\ndf["betyg"] = df["betyg"].replace(ord)\ndf = df.dropna(subset=["betyg"])\ndf["betyg"] = df["betyg"].astype("int64")\nprint(len(df), df["betyg"].mean())\n';

const BANK = PD + 'df = pd.read_csv("konto_rorig.csv", sep=";")\n';
const BANK_2 =
  BANK +
  'kopior = df.duplicated().sum()\ndf = df.drop_duplicates()\nprint(kopior, len(df))\n';
const BANK_3 =
  BANK_2 +
  'df["belopp"] = df["belopp"].str.replace(",00 kr", "").astype("int64")\nsaldo = df["belopp"].sum()\nprint(saldo)\n';

const LUCKOR_2 =
  VADER +
  'saknas = df.groupby("stad")["temperatur"].apply(lambda t: t.isna().sum())\nprint(saknas)\n';
const LUCKOR_3 =
  LUCKOR_2 +
  'kiruna = df[df["stad"] == "Kiruna"]\nfore = round(kiruna["temperatur"].mean(), 1)\nmedel = kiruna["temperatur"].mean()\ndf["temperatur"] = df["temperatur"].fillna(round(medel, 1))\nprint(fore)\n';

const KASSA_TIMME =
  KASSAN +
  'df["datum"] = pd.to_datetime(df["datum"])\ndf["veckodag"] = df["datum"].dt.dayofweek\ndf["timme"] = df["tid"].str[:2].astype("int64")\n';
const OPPET_2 =
  KASSA_TIMME +
  'tidigt = df[df["timme"] == 7]\nper_dag = tidigt.groupby("veckodag")["kvitto"].nunique()\nprint(per_dag)\n';
const OPPET_3 =
  OPPET_2 +
  'vardagar = df[df["veckodag"] < 5]\ndagar = vardagar["datum"].nunique()\nkl7 = round(vardagar[vardagar["timme"] == 7]["kvitto"].nunique() / dagar, 1)\nkl8 = round(vardagar[vardagar["timme"] == 8]["kvitto"].nunique() / dagar, 1)\nprint(kl7, kl8)\n';

const LAN_2 =
  BIBLIOTEK +
  'df["lanad"] = pd.to_datetime(df["lanad"])\ndf["tillbaka"] = pd.to_datetime(df["tillbaka"])\ndf["dagar"] = (df["tillbaka"] - df["lanad"]).dt.days\nsnitt = round(df["dagar"].mean(), 1)\nprint(snitt)\n';
const LAN_3 =
  LAN_2 +
  'per_genre = df.groupby("genre")["dagar"].mean().round(1).sort_values(ascending=False)\nprint(per_genre)\n';

const VANOR_2 =
  LYSSNING +
  'df["tidpunkt"] = pd.to_datetime(df["tidpunkt"])\ndf["timme"] = df["tidpunkt"].dt.hour\nper_timme = df["timme"].value_counts().sort_index()\nprint(per_timme)\n';
const VANOR_3 =
  VANOR_2 +
  'df["helg"] = df["tidpunkt"].dt.dayofweek >= 5\nper_dag = (df.groupby("helg").size() / df.groupby("helg")["tidpunkt"].apply(lambda t: t.dt.date.nunique())).round(1)\nprint(per_dag)\n';

export const PROJECTS_A = [
  // Bana 1: pandas igen
  {
    id: 'da-proj-konto',
    track: 'pandas',
    title: 'Kontoutdraget',
    reward: { emoji: '💳', name: 'Bankkort' },
    summary: 'Vart tar pengarna vägen? Tre månader på ett lönekonto.',
    files: FIL.konto,
    steps: [
      {
        title: 'Utgifterna',
        why: 'Utgifter är negativa belopp i ett kontoutdrag. Minustecknet framför summan gör den positiv, så att den läses som "så mycket gick åt".',
        xp: 15,
        description:
          'Kontoutdraget har datum, text, belopp och kategori. Inkomster är plus och utgifter minus.',
        task: 'Uppgift: Läs in `konto.csv` till `df`. Spara raderna med negativt belopp i `utgifter`, och summan av dem som ett positivt tal i `totalt`. Skriv ut `Utgifter: 52228 kr`.',
        starterCode: PD + '# Steg 1: utgifterna\n',
        solution: KONTO_2,
        hints: [
          'utgifter = df[df["belopp"] < 0]',
          'totalt = -utgifter["belopp"].sum()',
          'print(f"Utgifter: {totalt} kr")',
        ],
        tests: [
          { description: 'totalt', code: 'totalt', expected: 52228 },
          {
            description: 'Utskriften',
            code: '__output',
            expected: ['Utgifter: 52228 kr'],
          },
        ],
      },
      {
        title: 'Per kategori',
        why: 'sort_values() sorterar minst först, och den minsta summan är den mest negativa – alltså den största utgiften. Den hamnar överst.',
        xp: 15,
        description: 'Vilka kategorier kostar mest?',
        task: 'Uppgift: Spara summan av utgifterna per kategori i `per_kategori`, sorterad med den största utgiften först.',
        solution: KONTO_3,
        hints: [
          'Gruppera utgifter på "kategori" och summera "belopp".',
          'Utgifterna är negativa, så sort_values() ger den största först.',
          'per_kategori = utgifter.groupby("kategori")["belopp"].sum().sort_values()',
        ],
        tests: [
          {
            description: 'per_kategori',
            code: 'per_kategori.to_dict()',
            expected: {
              boende: -28497,
              mat: -10269,
              hem: -6995,
              kläder: -3958,
              nöjen: -1510,
              resor: -999,
            },
          },
          {
            description: 'Den största utgiften kommer först',
            code: 'per_kategori.index[0]',
            expected: 'boende',
          },
        ],
      },
      {
        title: 'Hur mycket blev över?',
        why: 'Inkomster minus utgifter är det som blev kvar. Att räkna fram det i stället för att titta på saldot fungerar även när utdraget bara är en del av året.',
        xp: 20,
        description: 'Sist: hur mycket kom in, och hur mycket blev över?',
        task: 'Uppgift: Spara summan av alla positiva belopp i `inkomster` och det som blev över (inkomster minus totalt) i `over`. Skriv ut `Inkomster: 85500 kr` och `Över: 33272 kr`.',
        solution:
          KONTO_3 +
          'inkomster = df[df["belopp"] > 0]["belopp"].sum()\nover = inkomster - totalt\nprint(f"Inkomster: {inkomster} kr")\nprint(f"Över: {over} kr")\n',
        hints: [
          'inkomster = df[df["belopp"] > 0]["belopp"].sum()',
          'over = inkomster - totalt',
          'Två print med f-strängar.',
        ],
        tests: [
          { description: 'over', code: 'over', expected: 33272 },
          {
            description: 'De två sista raderna',
            code: '__output[-2:]',
            expected: ['Inkomster: 85500 kr', 'Över: 33272 kr'],
          },
        ],
      },
    ],
  },
  {
    id: 'da-proj-vader',
    track: 'pandas',
    title: 'Väderstationen',
    reward: { emoji: '🌦️', name: 'Väderflöjel' },
    summary:
      'Juni i Stockholm, Göteborg och Kiruna: var var det varmast och blötast?',
    files: FIL.vader,
    steps: [
      {
        title: 'Hela månaden',
        why: 'mean() hoppar över tomma värden, så de tre dagarna utan mätning i Kiruna förstör inte snittet. Det är bra att veta – men det betyder också att snittet bygger på färre dagar.',
        xp: 15,
        description:
          'Filen har en rad per stad och dag i juni: temperatur och regn i millimeter.',
        task: 'Uppgift: Läs in `vader.csv` till `df`. Spara medeltemperaturen för alla städer, avrundad till en decimal, i `medel` och den högsta temperaturen i `varmast`.',
        starterCode: PD + '# Steg 1: hela månaden\n',
        solution: VADER_2,
        hints: [
          'df = pd.read_csv("vader.csv")',
          'medel = round(df["temperatur"].mean(), 1)',
          'varmast = df["temperatur"].max()',
        ],
        tests: [
          { description: 'medel', code: 'medel', expected: 14.7 },
          { description: 'varmast', code: 'varmast', expected: 24.2 },
        ],
      },
      {
        title: 'Per stad',
        why: 'Ett snitt för tre städer säger inget om någon av dem. groupby delar upp det så att varje stad får sitt eget.',
        xp: 15,
        description: 'Hur skiljer sig städerna?',
        task: 'Uppgift: Spara medeltemperaturen per stad, avrundad till en decimal, i `per_stad`.',
        solution: VADER_3,
        hints: [
          'Gruppera på "stad".',
          'Ta medelvärdet av "temperatur" och avrunda med .round(1).',
          'per_stad = df.groupby("stad")["temperatur"].mean().round(1)',
        ],
        tests: [
          {
            description: 'per_stad',
            code: 'per_stad.to_dict()',
            expected: { Göteborg: 16, Kiruna: 10.3, Stockholm: 17.5 },
          },
        ],
      },
      {
        title: 'Regnigast',
        why: 'Regn summeras, temperatur tas medel på. 30 dagars regn ska läggas ihop, men 30 dagars temperatur blir inte varmare av att adderas.',
        xp: 20,
        description: 'Vilken stad fick mest regn i juni?',
        task: 'Uppgift: Spara regnet per stad, summerat och avrundat till en decimal, sorterat med mest först, i `regn`. Skriv ut `Regnigast: Göteborg (90.9 mm)` med staden och mängden från `regn`.',
        solution:
          VADER_3 +
          'regn = df.groupby("stad")["regn_mm"].sum().round(1).sort_values(ascending=False)\nprint(f"Regnigast: {regn.index[0]} ({regn.tolist()[0]} mm)")\n',
        hints: [
          'regn = df.groupby("stad")["regn_mm"].sum().round(1)',
          'Sortera med .sort_values(ascending=False).',
          'regn.index[0] är staden och regn.tolist()[0] mängden.',
        ],
        tests: [
          {
            description: 'regn',
            code: 'regn.to_dict()',
            expected: { Göteborg: 90.9, Stockholm: 49.6, Kiruna: 38.6 },
          },
          {
            description: 'Utskriften',
            code: '__output[-1]',
            expected: 'Regnigast: Göteborg (90.9 mm)',
          },
        ],
      },
    ],
  },
  {
    id: 'da-proj-spellista',
    track: 'pandas',
    title: 'Spellistan',
    reward: { emoji: '🎧', name: 'Hörlurar' },
    summary: 'Två veckor med en musikapp: vem lyssnade du mest på?',
    files: FIL.lyssning,
    steps: [
      {
        title: 'Hur mycket?',
        why: 'Sekunder blir minuter genom att dela med 60. round() utan decimaler ger ett heltal, som är lättare att läsa än 335.97 minuter.',
        xp: 15,
        description:
          'Varje rad är en låt som spelades: när, vem och hur många sekunder.',
        task: 'Uppgift: Läs in `lyssning.csv` till `df`. Spara antalet spelningar i `spelningar` och den totala tiden i hela minuter i `minuter`.',
        starterCode: PD + '# Steg 1: hur mycket?\n',
        solution: LYSSNING_2,
        hints: [
          'spelningar = len(df)',
          'Summera "sekunder" och dela med 60.',
          'minuter = round(df["sekunder"].sum() / 60)',
        ],
        tests: [
          { description: 'spelningar', code: 'spelningar', expected: 86 },
          { description: 'minuter', code: 'minuter', expected: 336 },
        ],
      },
      {
        title: 'Favoriten',
        why: 'value_counts sorterar redan med flest först, så den första är favoriten. Ingen sortering behövs.',
        xp: 15,
        description: 'Vilken artist spelades flest gånger?',
        task: 'Uppgift: Spara antalet spelningar per artist i `per_artist` och den mest spelade artisten i `favorit`.',
        solution: LYSSNING_3,
        hints: [
          'per_artist = df["artist"].value_counts()',
          'value_counts sorterar med flest först.',
          'favorit = per_artist.index[0]',
        ],
        tests: [
          {
            description: 'favorit',
            code: 'favorit',
            expected: 'Veronica Maggio',
          },
          {
            description: 'per_artist',
            code: 'per_artist.to_dict()',
            expected: {
              'Veronica Maggio': 23,
              Kent: 18,
              'Håkan Hellström': 16,
              ABBA: 10,
              'Miriam Bryant': 8,
              Robyn: 6,
              Bach: 5,
            },
          },
        ],
      },
      {
        title: 'Topp 3 i minuter',
        why: 'Flest spelningar är inte samma sak som mest tid: långa låtar väger mer. Därför summeras sekunderna per artist.',
        xp: 20,
        description:
          'Räkna i minuter i stället för spelningar. Blir topplistan densamma?',
        task: 'Uppgift: Spara minuterna per artist (sekunder delat med 60, avrundat till heltal), störst först, i `minuter_per_artist`. Skriv ut de tre första som `1. Veronica Maggio: 79 min`.',
        solution:
          LYSSNING_3 +
          'minuter_per_artist = (df.groupby("artist")["sekunder"].sum() / 60).sort_values(ascending=False).round()\nplats = 1\nfor artist, min in minuter_per_artist.head(3).items():\n    print(f"{plats}. {artist}: {int(min)} min")\n    plats += 1\n',
        hints: [
          'Gruppera på "artist", summera "sekunder" och dela med 60.',
          'Sortera med störst först och avrunda sist med .round(), så att lika långa hamnar i samma ordning varje gång.',
          'Loopa över .head(3).items() och skriv ut med int(min).',
        ],
        tests: [
          {
            description: 'minuter_per_artist börjar rätt',
            code: 'list(minuter_per_artist.index[:3])',
            expected: ['Veronica Maggio', 'Kent', 'Håkan Hellström'],
          },
          {
            description: 'Topp 3',
            code: '__output[-3:]',
            expected: [
              '1. Veronica Maggio: 79 min',
              '2. Kent: 79 min',
              '3. Håkan Hellström: 63 min',
            ],
          },
        ],
      },
    ],
  },

  // Bana 2: första mötet
  {
    id: 'da-proj-bibliotek',
    track: 'forsta',
    title: 'Biblioteket',
    reward: { emoji: '📚', name: 'Bokhylla' },
    summary: 'Skolbibliotekets lån under våren: en faktaruta på en minut.',
    files: FIL.bibliotek,
    steps: [
      {
        title: 'Storlek och typer',
        why: 'Datumen läses in som text. Det märks först när man vill räkna med dem – därför är det bra att titta på typerna direkt.',
        xp: 15,
        description:
          'Filen har ett lånenummer, titel, genre och när boken lånades och lämnades tillbaka.',
        task: 'Uppgift: Läs in `bibliotek.csv` till `df`. Spara storleken i `storlek` och typen för kolumnen lanad som text i `typ_lanad`.',
        starterCode: PD + '# Steg 1: storlek och typer\n',
        solution: BIBLIOTEK_2,
        hints: [
          'storlek = df.shape',
          'typ_lanad = str(df["lanad"].dtype)',
          'print(df.dtypes) visar alla typer.',
        ],
        tests: [
          { description: 'storlek', code: 'storlek', expected: [60, 5] },
          { description: 'typ_lanad', code: 'typ_lanad', expected: 'str' },
        ],
      },
      {
        title: 'Vad finns?',
        why: 'Antalet lån och antalet böcker är olika saker: samma bok kan lånas många gånger. nunique räknar böckerna.',
        xp: 15,
        description: 'Vilka genrer finns, och hur många olika böcker?',
        task: 'Uppgift: Spara genrerna som en sorterad lista i `genrer` och antalet olika titlar i `bocker`.',
        solution: BIBLIOTEK_3,
        hints: [
          'genrer = sorted(df["genre"].unique())',
          'nunique räknar olika värden.',
          'bocker = df["titel"].nunique()',
        ],
        tests: [
          {
            description: 'genrer',
            code: 'genrer',
            expected: ['barn', 'deckare', 'fakta', 'fantasy'],
          },
          { description: 'bocker', code: 'bocker', expected: 10 },
        ],
      },
      {
        title: 'Faktarutan',
        why: 'Texten byggs av siffror som räknas fram. Kommer det nya lån nästa termin blir faktarutan rätt utan att någon skriver om den.',
        xp: 20,
        description: 'Skriv ut faktarutan för bibliotekarien.',
        task: 'Uppgift: Skriv ut `Lån: 60`, `Böcker: 10`, `Genrer: barn, deckare, fakta, fantasy` och `Period: 2025-01-09 till 2025-04-22` (första och sista lånedatumet). Använd `", ".join(genrer)` för genrerna.',
        solution:
          BIBLIOTEK_3 +
          'print(f"Lån: {len(df)}")\nprint(f"Böcker: {bocker}")\nprint(f"Genrer: {\', \'.join(genrer)}")\nprint(f"Period: {df[\'lanad\'].min()} till {df[\'lanad\'].max()}")\n',
        hints: [
          'print(f"Lån: {len(df)}")',
          '", ".join(genrer) sätter ihop listan med komma emellan.',
          'Första och sista datumet: df["lanad"].min() och .max().',
        ],
        tests: [
          {
            description: 'Faktarutan',
            code: '__output[-4:]',
            expected: [
              'Lån: 60',
              'Böcker: 10',
              'Genrer: barn, deckare, fakta, fantasy',
              'Period: 2025-01-09 till 2025-04-22',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'da-proj-enkat-forsta',
    track: 'forsta',
    title: 'Kundenkäten: första blicken',
    reward: { emoji: '📝', name: 'Anteckningsblock' },
    summary: 'Kaféets enkät är inskriven för hand. Vad är fel i den?',
    files: FIL.enkat,
    steps: [
      {
        title: 'Vad saknas?',
        why: 'count() räknar värdena i varje kolumn, så antalet rader minus count() är det som saknas. Ett betyg som saknas kan inte räknas in i ett snitt, så det måste du veta innan du räknar.',
        xp: 15,
        description:
          'Enkäten har svarets nummer, kaféet, betyget och en kommentar.',
        task: 'Uppgift: Läs in `enkat.csv` till `df`. Spara antalet svar i `svar` och antalet tomma värden per kolumn i `saknas`.',
        starterCode: PD + '# Steg 1: vad saknas?\n',
        solution: ENKAT_FORSTA_2,
        hints: [
          'svar = len(df)',
          'df.count() räknar värdena i varje kolumn.',
          'saknas = svar - df.count()',
        ],
        tests: [
          { description: 'svar', code: 'svar', expected: 80 },
          {
            description: 'saknas',
            code: 'saknas.to_dict()',
            expected: { svar: 0, kafe: 0, betyg: 5, kommentar: 12 },
          },
        ],
      },
      {
        title: 'Konstiga värden',
        why: 'unique visar varje variant en gång. Där syns felen som ett snitt aldrig avslöjar: samma kafé stavat på flera sätt och betyg skrivna med ord.',
        xp: 15,
        description: 'Titta på vilka värden som finns i kafe och betyg.',
        task: 'Uppgift: Spara de olika värdena i kolumnerna kafe och betyg i `kafeer` och `betyg`. Skriv ut dem.',
        solution: ENKAT_FORSTA_3,
        hints: [
          'kafeer = df["kafe"].unique()',
          'betyg = df["betyg"].unique()',
          'Skriv ut båda och titta.',
        ],
        tests: [
          {
            description: 'kafeer har sex stavningar',
            code: 'len(kafeer)',
            expected: 6,
          },
          {
            description: 'betyg är text, inte tal',
            code: 'str(df["betyg"].dtype)',
            expected: 'str',
          },
        ],
      },
      {
        title: 'Vad kan enkäten svara på?',
        why: 'Enkäten är anonym och har bara betyg och en kort kommentar. Frågor om vem som svarade eller varför går inte att besvara med den.',
        xp: 15,
        description: 'Innan du städar: vilka frågor kan enkäten svara på?',
        task: 'Uppgift: Byt `None` mot `True` eller `False` i `kan_svara`.',
        solution:
          ENKAT_FORSTA_3 +
          '\nkan_svara = {\n    "Vilket kafé får bäst betyg?": True,\n    "Hur många svarade?": True,\n    "Vilka kunder svarade?": False,\n    "Varför gav de låga betyg?": False,\n}\n',
        hints: [
          'Kolumnerna är svar, kafe, betyg och kommentar.',
          'Det finns inget namn eller kundnummer.',
          'En kort kommentar är inte en förklaring till varför.',
        ],
        tests: [
          {
            description: 'Rätt svar',
            code: 'list(kan_svara.values())',
            expected: [true, true, false, false],
          },
        ],
      },
    ],
  },
  {
    id: 'da-proj-sortiment',
    track: 'forsta',
    title: 'Kaféets sortiment',
    reward: { emoji: '🧾', name: 'Kvitto' },
    summary: 'Vad säljer kaféet, och vad kostar det?',
    files: KASSA,
    steps: [
      {
        title: 'Priserna i korthet',
        why: 'describe på en enda kolumn ger samma rader som på hela tabellen: antal, medel, min, max och percentilerna.',
        xp: 15,
        description: 'Börja med priserna i kassan.',
        task: 'Uppgift: Läs in kassan och lägg till `summa`. Spara `df["pris"].describe()` i `priser_kort`, och lägsta och högsta pris i `lagst` och `hogst`.',
        starterCode: PD + '# Steg 1: priserna i korthet\n',
        solution:
          KASSAN +
          'priser_kort = df["pris"].describe()\nlagst = priser_kort["min"]\nhogst = priser_kort["max"]\nprint(priser_kort)\n',
        hints: [
          'priser_kort = df["pris"].describe()',
          'lagst = priser_kort["min"]',
          'hogst = priser_kort["max"]',
        ],
        tests: [
          {
            description: 'lagst och hogst',
            code: '[lagst, hogst]',
            expected: [30, 95],
          },
        ],
      },
      {
        title: 'Billigast och dyrast',
        why: 'Varje produkt har ett pris, så max per produkt är dess pris. Sorterat blir första och sista den billigaste och dyraste.',
        xp: 15,
        description: 'Vilken produkt är billigast och vilken dyrast?',
        task: 'Uppgift: Spara priset per produkt, sorterat med lägst först, i `priser`. Spara den billigaste i `billigast` och den dyraste i `dyrast`.',
        solution: SORTIMENT_2,
        hints: [
          'priser = df.groupby("produkt")["pris"].max().sort_values()',
          'billigast = priser.index[0]',
          'dyrast = priser.index[-1]',
        ],
        tests: [
          {
            description: 'billigast och dyrast',
            code: '[billigast, dyrast]',
            expected: ['Te', 'Soppa'],
          },
        ],
      },
      {
        title: 'Hur stor del?',
        why: 'Andelar i procent går att jämföra med andra månader och andra kaféer, även när antalet rader skiljer sig.',
        xp: 15,
        description: 'Hur stor del av raderna är varje produkt?',
        task: 'Uppgift: Spara andelen rader per produkt i procent, avrundad till en decimal, i `andelar`.',
        solution: SORTIMENT_3,
        hints: [
          'value_counts(normalize=True) ger andelar.',
          'Gånger 100 och .round(1).',
          'andelar = (df["produkt"].value_counts(normalize=True) * 100).round(1)',
        ],
        tests: [
          {
            description: 'De tre största',
            code: 'andelar.head(3).to_dict()',
            expected: { Bryggkaffe: 17.9, Kanelbulle: 15.4, Latte: 12.1 },
          },
        ],
      },
    ],
  },

  // Bana 3: städa data
  {
    id: 'da-proj-enkat',
    track: 'stada',
    title: 'Kundenkäten',
    reward: { emoji: '🗳️', name: 'Valurna' },
    summary: 'Städa enkäten och ta reda på vilket kafé kunderna gillar mest.',
    files: FIL.enkat,
    steps: [
      {
        title: 'Ett kafé, ett namn',
        why: 'Först lower och strip, så att alla varianter blir likadana. Sedan replace till de riktiga namnen. Två enkla steg är lättare att kontrollera än ett krångligt.',
        xp: 15,
        description: 'Kaféerna är stavade på sex sätt. Gör om dem till två.',
        task: 'Uppgift: Läs in `enkat.csv` till `df`. Städa kolumnen kafe så att den bara innehåller `Gamla stan` och `City`. Spara antalet svar per kafé i `per_kafe`.',
        starterCode: PD + '# Steg 1: ett kafé, ett namn\n',
        solution: ENKAT_2,
        hints: [
          'df["kafe"].str.strip().str.lower() ger "gamla stan" och "city".',
          'replace({"gamla stan": "Gamla stan", "city": "City"})',
          'per_kafe = df["kafe"].value_counts()',
        ],
        tests: [
          {
            description: 'per_kafe',
            code: 'per_kafe.to_dict()',
            expected: { City: 50, 'Gamla stan': 30 },
          },
        ],
      },
      {
        title: 'Betyg som tal',
        why: 'replace med en dictionary byter bara hela värden, så "fem" blir "5" men "5" lämnas i fred. Tomma betyg tas bort med dropna(subset=...) – bara de raderna, inte de med tom kommentar.',
        xp: 20,
        description: 'Några betyg är skrivna med ord, några saknas.',
        task: 'Uppgift: Byt orden mot siffror, ta bort raderna utan betyg (bara de) och gör om betyg till heltal.',
        solution: ENKAT_3,
        hints: [
          'ord = {"ett": "1", "två": "2", "tre": "3", "fyra": "4", "fem": "5"} och df["betyg"].replace(ord)',
          'df = df.dropna(subset=["betyg"]) tar bara bort rader där betyget saknas.',
          'df["betyg"] = df["betyg"].astype("int64")',
        ],
        tests: [
          { description: 'Rader kvar', code: 'len(df)', expected: 75 },
          {
            description: 'betyg är heltal',
            code: 'str(df["betyg"].dtype)',
            expected: 'int64',
          },
        ],
      },
      {
        title: 'Vem vinner?',
        why: 'Snittet per kafé jämför rättvist även om kaféerna fick olika många svar. Antalet svar visas ändå, så att läsaren vet vad snittet bygger på.',
        xp: 20,
        description: 'Vilket kafé får bäst betyg?',
        task: 'Uppgift: Spara snittbetyget per kafé, avrundat till två decimaler, i `snitt`. Skriv ut en rad per kafé, t.ex. `City: 3.63 (46 svar)`.',
        solution:
          ENKAT_3 +
          'snitt = df.groupby("kafe")["betyg"].mean().round(2)\nantal = df["kafe"].value_counts()\nfor kafe in snitt.index:\n    print(f"{kafe}: {snitt[kafe]} ({antal[kafe]} svar)")\n',
        hints: [
          'snitt = df.groupby("kafe")["betyg"].mean().round(2)',
          'antal = df["kafe"].value_counts()',
          'Loopa över snitt.index och skriv ut snitt[kafe] och antal[kafe].',
        ],
        tests: [
          {
            description: 'snitt',
            code: 'snitt.to_dict()',
            expected: { City: 3.63, 'Gamla stan': 3.97 },
          },
          {
            description: 'Utskriften',
            code: '__output[-2:]',
            expected: ['City: 3.63 (46 svar)', 'Gamla stan: 3.97 (29 svar)'],
          },
        ],
      },
    ],
  },
  {
    id: 'da-proj-bank',
    track: 'stada',
    title: 'Bankens export',
    reward: { emoji: '🏦', name: 'Bank' },
    summary: 'Samma kontoutdrag, men som banken exporterar det: rörigt.',
    files: FIL.kontoRorig,
    steps: [
      {
        title: 'Kopiorna',
        why: 'Banken har exporterat några rader två gånger. drop_duplicates tar bort dem, men räkna först – så vet du hur många det var.',
        xp: 15,
        description:
          'Exporten använder semikolon mellan värdena. Raden som läser in den är redan skriven.',
        task: 'Uppgift: Spara antalet dubbletter i `kopior` och ta bort dem från `df`.',
        starterCode: BANK + '\n# Steg 1: kopiorna\n',
        solution: BANK_2,
        hints: [
          'kopior = df.duplicated().sum()',
          'df = df.drop_duplicates()',
          'Kolla len(df) efteråt.',
        ],
        tests: [
          { description: 'kopior', code: 'kopior', expected: 2 },
          { description: 'Rader kvar', code: 'len(df)', expected: 52 },
        ],
      },
      {
        title: 'Beloppen',
        why: 'Beloppen står som "-490,00 kr". När ",00 kr" är borta står bara heltalet kvar, som astype kan göra om.',
        xp: 20,
        description: 'Gör om beloppen till tal.',
        task: 'Uppgift: Gör om kolumnen belopp till heltal och spara summan av alla belopp i `saldo`.',
        solution: BANK_3,
        hints: [
          'df["belopp"].str.replace(",00 kr", "")',
          'Sedan .astype("int64")',
          'saldo = df["belopp"].sum()',
        ],
        tests: [{ description: 'saldo', code: 'saldo', expected: 33272 }],
      },
      {
        title: 'Butikerna',
        why: 'Små bokstäver och inga mellanslag gör "ICA", " ICA" och "ica" till samma butik. Antalet unika visar om städningen fungerade.',
        xp: 20,
        description: 'Butiksnamnen är stavade på olika sätt.',
        task: 'Uppgift: Städa kolumnen text med strip och lower. Spara antalet olika butiker i `butiker`, och vad som handlades på "ica" totalt (som ett positivt tal) i `ica`.',
        solution:
          BANK_3 +
          'df["text"] = df["text"].str.strip().str.lower()\nbutiker = df["text"].nunique()\nica = -df[df["text"] == "ica"]["belopp"].sum()\nprint(butiker, ica)\n',
        hints: [
          'df["text"] = df["text"].str.strip().str.lower()',
          'butiker = df["text"].nunique()',
          'ica = -df[df["text"] == "ica"]["belopp"].sum()',
        ],
        tests: [
          { description: 'butiker', code: 'butiker', expected: 16 },
          { description: 'ica', code: 'ica', expected: 3497 },
        ],
      },
    ],
  },
  {
    id: 'da-proj-luckor',
    track: 'stada',
    title: 'Luckor i vädret',
    reward: { emoji: '🕳️', name: 'Spade' },
    summary: 'Väderstationen i Kiruna missade några dagar. Vad gör man åt det?',
    files: FIL.vader,
    steps: [
      {
        title: 'Var saknas det?',
        why: 'apply kör en funktion på varje grupp. Här räknar den tomma värden per stad, så att du ser att det bara är Kiruna.',
        xp: 15,
        description: 'Ta reda på vilken stad som saknar mätningar.',
        task: 'Uppgift: Läs in `vader.csv` till `df`. Spara antalet saknade temperaturer per stad i `saknas`, med `groupby("stad")["temperatur"].apply(lambda t: t.isna().sum())`.',
        starterCode: PD + '# Steg 1: var saknas det?\n',
        solution: LUCKOR_2,
        hints: [
          'df = pd.read_csv("vader.csv")',
          'lambda t: t.isna().sum() räknar tomma i en grupp.',
          'saknas = df.groupby("stad")["temperatur"].apply(lambda t: t.isna().sum())',
        ],
        tests: [
          {
            description: 'saknas',
            code: 'saknas.to_dict()',
            expected: { Göteborg: 0, Kiruna: 3, Stockholm: 0 },
          },
        ],
      },
      {
        title: 'Fyll i med Kirunas snitt',
        why: 'Kirunas egna snitt är en bättre gissning än hela landets – men det är fortfarande en gissning. Fyll i med stadens eget, inte med allas.',
        xp: 20,
        description: 'Fyll i de saknade dagarna med Kirunas medeltemperatur.',
        task: 'Uppgift: Spara Kirunas medeltemperatur, avrundad till en decimal, i `fore`. Fyll i de tomma temperaturerna med det värdet.',
        solution: LUCKOR_3,
        hints: [
          'kiruna = df[df["stad"] == "Kiruna"]',
          'fore = round(kiruna["temperatur"].mean(), 1)',
          'df["temperatur"] = df["temperatur"].fillna(fore)',
        ],
        tests: [
          { description: 'fore', code: 'fore', expected: 10.3 },
          {
            description: 'Inga tomma kvar',
            code: 'df["temperatur"].isna().sum()',
            expected: 0,
          },
        ],
      },
      {
        title: 'Vad ändrades?',
        why: 'Att fylla i med snittet ändrar inte snittet, men det gör att datan ser mer säker ut än den är. Skriv alltid hur många värden som är ifyllda.',
        xp: 15,
        description: 'Ändrade ifyllningen Kirunas snitt?',
        task: 'Uppgift: Spara Kirunas medeltemperatur efter ifyllningen, avrundad till en decimal, i `efter`. Skriv ut `Kiruna: 10.3 grader (3 dagar ifyllda)`.',
        solution:
          LUCKOR_3 +
          'efter = round(df[df["stad"] == "Kiruna"]["temperatur"].mean(), 1)\nprint(f"Kiruna: {efter} grader ({saknas[\'Kiruna\']} dagar ifyllda)")\n',
        hints: [
          'efter = round(df[df["stad"] == "Kiruna"]["temperatur"].mean(), 1)',
          'saknas["Kiruna"] är antalet ifyllda dagar.',
          "Inne i en f-sträng med dubbla citattecken: saknas['Kiruna']",
        ],
        tests: [
          {
            description: 'Snittet är detsamma',
            code: 'efter == fore',
            expected: true,
          },
          {
            description: 'Utskriften',
            code: '__output[-1]',
            expected: 'Kiruna: 10.3 grader (3 dagar ifyllda)',
          },
        ],
      },
    ],
  },

  // Bana 4: datum och tid
  {
    id: 'da-proj-oppettider',
    track: 'datum',
    title: 'Öppettiderna',
    reward: { emoji: '⏰', name: 'Väckarklocka' },
    summary: 'Ska kaféet fortsätta öppna klockan sju på vardagar?',
    files: KASSA,
    steps: [
      {
        title: 'Kunderna klockan sju',
        why: 'Kunder räknas som olika kvitton, inte rader. En kund som köper kaffe och bulle ska räknas en gång.',
        xp: 15,
        description:
          'Kaféet öppnar 7 på vardagar och 8 på helger. Hur många kommer klockan sju?',
        task: 'Uppgift: Läs in kassan, lägg till `summa`, gör om datum och lägg till `veckodag` och `timme` (`df["tid"].str[:2].astype("int64")`). Spara antalet kunder kl 7 per veckodag i `per_dag`.',
        starterCode: PD + '# Steg 1: kunderna klockan sju\n',
        solution: OPPET_2,
        hints: [
          'df["timme"] = df["tid"].str[:2].astype("int64")',
          'tidigt = df[df["timme"] == 7]',
          'per_dag = tidigt.groupby("veckodag")["kvitto"].nunique()',
        ],
        tests: [
          {
            description: 'Kunder kl 7, måndag till fredag (helgen öppnar kl 8)',
            code: '[list(per_dag.index), per_dag.tolist()]',
            expected: [
              [0, 1, 2, 3, 4],
              [28, 36, 39, 31, 55],
            ],
          },
        ],
      },
      {
        title: 'Per vardag',
        why: 'Ett snitt per dag går att jämföra med andra timmar. 189 kunder på ett år låter mycket, men det är under en per morgon.',
        xp: 20,
        description:
          'Hur många kommer kl 7 en vanlig vardag, jämfört med kl 8?',
        task: 'Uppgift: Spara antalet kunder per vardag kl 7 och kl 8, avrundat till en decimal, i `kl7` och `kl8`.',
        solution: OPPET_3,
        hints: [
          'vardagar = df[df["veckodag"] < 5] och dagar = vardagar["datum"].nunique()',
          'Kunder kl 7: vardagar[vardagar["timme"] == 7]["kvitto"].nunique()',
          'Dela med dagar och avrunda.',
        ],
        tests: [
          {
            description: 'kl7 och kl8',
            code: '[kl7, kl8]',
            expected: [0.7, 1.4],
          },
        ],
      },
      {
        title: 'Förslaget',
        why: 'Ett förslag blir lättare att ta ställning till när siffran och jämförelsen står i samma mening.',
        xp: 15,
        description: 'Skriv ditt förslag till ägaren.',
        task: 'Uppgift: Om det kommer färre än 2 kunder kl 7 en vardag skriver du ut `Kl 7 kommer 0.7 kunder per vardag, mot 1.4 kl 8. Öppna kl 8.` – annars samma mening men `Behåll kl 7.` sist.',
        solution:
          OPPET_3 +
          'beslut = "Öppna kl 8." if kl7 < 2 else "Behåll kl 7."\nprint(f"Kl 7 kommer {kl7} kunder per vardag, mot {kl8} kl 8. {beslut}")\n',
        hints: [
          'beslut = "Öppna kl 8." if kl7 < 2 else "Behåll kl 7."',
          'Sätt ihop meningen med en f-sträng.',
          'Siffrorna kommer från kl7 och kl8.',
        ],
        tests: [
          {
            description: 'Förslaget',
            code: '__output[-1]',
            expected:
              'Kl 7 kommer 0.7 kunder per vardag, mot 1.4 kl 8. Öppna kl 8.',
          },
        ],
      },
    ],
  },
  {
    id: 'da-proj-lanetid',
    track: 'datum',
    title: 'Lånetiden',
    reward: { emoji: '📖', name: 'Bok' },
    summary: 'Hur länge har eleverna böckerna hemma?',
    files: FIL.bibliotek,
    steps: [
      {
        title: 'Antal dagar',
        why: 'Två datum kan dras från varandra. Svaret är en tidslängd, och .dt.days gör om den till ett heltal dagar.',
        xp: 15,
        description: 'Räkna ut hur många dagar varje bok var utlånad.',
        task: 'Uppgift: Läs in `bibliotek.csv`, gör om lanad och tillbaka till datum och lägg till kolumnen `dagar`. Spara snittet, avrundat till en decimal, i `snitt`.',
        starterCode: PD + '# Steg 1: antal dagar\n',
        solution: LAN_2,
        hints: [
          'Gör om båda kolumnerna med pd.to_datetime.',
          'df["dagar"] = (df["tillbaka"] - df["lanad"]).dt.days',
          'snitt = round(df["dagar"].mean(), 1)',
        ],
        tests: [{ description: 'snitt', code: 'snitt', expected: 12.6 }],
      },
      {
        title: 'Per genre',
        why: 'Tjocka böcker tar längre tid att läsa. Snittet per genre visar om det syns i datan.',
        xp: 15,
        description: 'Vilken genre har eleverna hemma längst?',
        task: 'Uppgift: Spara snittet av dagar per genre, avrundat till en decimal och störst först, i `per_genre`.',
        solution: LAN_3,
        hints: [
          'Gruppera på "genre" och ta medelvärdet av "dagar".',
          'Avrunda med .round(1).',
          'Sortera med .sort_values(ascending=False).',
        ],
        tests: [
          {
            description: 'per_genre',
            code: 'per_genre.to_dict()',
            expected: { fantasy: 15.8, fakta: 13.8, barn: 10.3, deckare: 9.1 },
          },
        ],
      },
      {
        title: 'Försenade',
        why: 'Lånetiden är 21 dagar. En filtrering med ett villkor på dagar räcker för att hitta alla som var sena.',
        xp: 20,
        description: 'Lånetiden är tre veckor. Hur många kom för sent?',
        task: 'Uppgift: Spara lånen med fler än 21 dagar i `sena`. Skriv ut `Försenade: 6 av 60 lån` med rätt antal.',
        solution:
          LAN_3 +
          'sena = df[df["dagar"] > 21]\nprint(f"Försenade: {len(sena)} av {len(df)} lån")\n',
        hints: [
          'sena = df[df["dagar"] > 21]',
          'len(sena) och len(df) ger antalen.',
          'print(f"Försenade: {len(sena)} av {len(df)} lån")',
        ],
        tests: [
          { description: 'sena', code: 'len(sena)', expected: 6 },
          {
            description: 'Utskriften',
            code: '__output[-1]',
            expected: 'Försenade: 6 av 60 lån',
          },
        ],
      },
    ],
  },
  {
    id: 'da-proj-vanor',
    track: 'datum',
    title: 'Lyssningsvanor',
    reward: { emoji: '🕐', name: 'Klocka' },
    summary: 'När på dygnet och veckan lyssnar du på musik?',
    files: FIL.lyssning,
    steps: [
      {
        title: 'Per timme',
        why: 'value_counts sorterar efter antal. sort_index sorterar efter timmen i stället, så att dygnet kommer i ordning.',
        xp: 15,
        description: 'Vilka timmar på dygnet spelas det musik?',
        task: 'Uppgift: Läs in `lyssning.csv`, gör om tidpunkt och lägg till `timme`. Spara antalet spelningar per timme, i timordning, i `per_timme`.',
        starterCode: PD + '# Steg 1: per timme\n',
        solution: VANOR_2,
        hints: [
          'df["tidpunkt"] = pd.to_datetime(df["tidpunkt"])',
          'df["timme"] = df["tidpunkt"].dt.hour',
          'per_timme = df["timme"].value_counts().sort_index()',
        ],
        tests: [
          {
            description: 'per_timme i timordning',
            code: '[list(per_timme.index), per_timme.tolist()]',
            expected: [
              [7, 8, 12, 17, 18, 21, 22],
              [17, 17, 9, 21, 12, 8, 2],
            ],
          },
        ],
      },
      {
        title: 'Helg eller vardag',
        why: 'Det finns fler vardagar än helgdagar, så antalet spelningar måste delas med antalet dagar i varje grupp för att jämföras rättvist.',
        xp: 20,
        description: 'Lyssnar du mer på helgen?',
        task: 'Uppgift: Lägg till kolumnen `helg`. Spara spelningar per dag för vardag och helg, avrundat till en decimal, i `per_dag`. Antalet dagar i en grupp räknar du med `apply(lambda t: t.dt.date.nunique())`.',
        solution: VANOR_3,
        hints: [
          'df["helg"] = df["tidpunkt"].dt.dayofweek >= 5',
          'Spelningar per grupp: df.groupby("helg").size()',
          'Dagar per grupp: df.groupby("helg")["tidpunkt"].apply(lambda t: t.dt.date.nunique())',
        ],
        tests: [
          {
            description: 'per_dag för vardag och helg',
            code: '[per_dag[False], per_dag[True]]',
            expected: [6.3, 5.8],
          },
        ],
      },
      {
        title: 'Morgonmänniska?',
        why: 'En andel säger mer än ett antal när du vill beskriva en vana: "en tredjedel av musiken på morgonen".',
        xp: 15,
        description: 'Hur stor del av musiken spelas före tio på förmiddagen?',
        task: 'Uppgift: Spara andelen spelningar före kl 10, i procent med en decimal, i `morgon`. Skriv ut `Före kl 10: 39.5 % av spelningarna`.',
        solution:
          VANOR_3 +
          'morgon = round(len(df[df["timme"] < 10]) / len(df) * 100, 1)\nprint(f"Före kl 10: {morgon} % av spelningarna")\n',
        hints: [
          'df[df["timme"] < 10] är spelningarna före tio.',
          'Dela med len(df) och gånger 100.',
          'morgon = round(len(df[df["timme"] < 10]) / len(df) * 100, 1)',
        ],
        tests: [
          { description: 'morgon', code: 'morgon', expected: 39.5 },
          {
            description: 'Utskriften',
            code: '__output[-1]',
            expected: 'Före kl 10: 39.5 % av spelningarna',
          },
        ],
      },
    ],
  },
];
