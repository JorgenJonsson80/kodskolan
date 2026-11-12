import { CITY_OCH_KASSA, FIL, KASSA, KASSA_OCH_PRODUKTER } from './filer';

// Projekten för bana 9–11. Varje steg bygger vidare på förra stegets kod.
const PD = 'import pandas as pd\n\n';
const ST = 'import streamlit as st\nimport pandas as pd\n\n';

const GENRE = PD + 'df = pd.read_csv("bibliotek.csv")\n';
const GENRE_2 = GENRE + 'lan = df["genre"].value_counts()\nprint(lan)\n';
const GENRE_3 =
  GENRE_2 + 'titlar = df.groupby("genre")["titel"].nunique()\nprint(titlar)\n';

const ENKAT_REN =
  'import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("enkat.csv")\ndf["kafe"] = df["kafe"].str.strip().str.lower().replace({"gamla stan": "Gamla stan", "city": "City"})\ndf["betyg"] = df["betyg"].replace({"ett": "1", "två": "2", "tre": "3", "fyra": "4", "fem": "5"})\ndf = df.dropna(subset=["betyg"])\ndf["betyg"] = df["betyg"].astype("int64")\nsnitt = df.groupby("kafe")["betyg"].mean().round(2)\n';
const LURAR =
  ENKAT_REN + '\nplt.bar(snitt.index, snitt.values)\nplt.ylim(3.5, 4.1)\n';
const LURAR_2 =
  ENKAT_REN +
  '\nplt.bar(snitt.index, snitt.values)\nplt.ylim(0, 5)\nplt.title("Snittbetyg (skala 1–5)")\n';

const KONTO =
  PD +
  'df = pd.read_csv("konto.csv")\ndf["manad"] = pd.to_datetime(df["datum"]).dt.month\n';
const KONTO_2 =
  KONTO + 'over = df.groupby("manad")["belopp"].sum()\nprint(over)\n';
const KONTO_3 =
  KONTO_2 +
  'stora = df[df["belopp"] < -5000]\nstora = stora[stora["kategori"] != "boende"]\nprint(stora)\n';

const VINST =
  PD +
  'df = pd.read_csv("kassan.csv")\nprodukter = pd.read_csv("produkter.csv")\nihop = df.merge(produkter[["produkt", "inkop"]], on="produkt")\nihop["vinst"] = (ihop["pris"] - ihop["inkop"]) * ihop["antal"]\n';
const VINST_2 =
  VINST +
  'per_produkt = ihop.groupby("produkt")["vinst"].sum()\nandel = (per_produkt / per_produkt.sum() * 100).round(1).sort_values()\nprint(andel)\n';
const VINST_3 =
  VINST_2 +
  'sasong = ["Semla", "Iskaffe"]\nsvaga = andel[andel < 4]\nsluta = [p for p in svaga.index if p not in sasong]\nprint(sluta)\n';

const BEMANNING =
  'import numpy as np\n' +
  PD +
  'df = pd.read_csv("kassan.csv")\ndf["veckodag"] = pd.to_datetime(df["datum"]).dt.dayofweek\ndf["timme"] = df["tid"].str[:2].astype("int64")\n';
const BEMANNING_2 =
  BEMANNING +
  'helg = df[df["veckodag"] >= 5]\ndagar = helg["datum"].nunique()\nper_timme = (helg.groupby("timme")["kvitto"].nunique() / dagar).round(1)\nprint(per_timme)\n';
const BEMANNING_3 =
  BEMANNING_2 +
  'personal = pd.Series(np.where(per_timme > 2, 2, 1), index=per_timme.index)\nprint(personal)\n';

const CITY =
  PD +
  'city = pd.read_csv("city_q1.csv", sep=";", decimal=",")\ncity = city.dropna(how="all").drop_duplicates()\ncity["produkt"] = city["produkt"].str.strip().str.capitalize()\ncity["summa"] = city["antal"] * city["pris"]\ngamla = pd.read_csv("kassan.csv")\ngamla["summa"] = gamla["antal"] * gamla["pris"]\ngamla = gamla[pd.to_datetime(gamla["datum"]).dt.month <= 3]\n';
const CITY_2 =
  CITY +
  'snitt_city = round(city.groupby("kvitto")["summa"].sum().mean(), 1)\nsnitt_gamla = round(gamla.groupby("kvitto")["summa"].sum().mean(), 1)\nprint(snitt_city, snitt_gamla)\n';
const CITY_3 =
  CITY_2 +
  'andel_city = (city.groupby("produkt")["summa"].sum() / city["summa"].sum() * 100).round(1)\nandel_gamla = (gamla.groupby("produkt")["summa"].sum() / gamla["summa"].sum() * 100).round(1)\nskillnad = (andel_city - andel_gamla).dropna().sort_values(ascending=False)\nprint(skillnad)\n';

const KONTOAPP =
  ST +
  'df = pd.read_csv("konto.csv")\ndf["manad"] = pd.to_datetime(df["datum"]).dt.month\n';
const KONTOAPP_1 =
  KONTOAPP +
  'st.title("Mitt konto")\ninkomster = df[df["belopp"] > 0]["belopp"].sum()\nutgifter = -df[df["belopp"] < 0]["belopp"].sum()\nkol1, kol2, kol3 = st.columns(3)\nkol1.metric("Inkomster", f"{inkomster} kr")\nkol2.metric("Utgifter", f"{utgifter} kr")\nkol3.metric("Över", f"{inkomster - utgifter} kr")\n';
const KONTOAPP_2 =
  KONTOAPP +
  'st.title("Mitt konto")\nval = st.selectbox("Månad", ["Alla", 1, 2, 3])\nif val != "Alla":\n    df = df[df["manad"] == val]\ninkomster = df[df["belopp"] > 0]["belopp"].sum()\nutgifter = -df[df["belopp"] < 0]["belopp"].sum()\nkol1, kol2, kol3 = st.columns(3)\nkol1.metric("Inkomster", f"{inkomster} kr")\nkol2.metric("Utgifter", f"{utgifter} kr")\nkol3.metric("Över", f"{inkomster - utgifter} kr")\n';

const VADERAPP = ST + 'df = pd.read_csv("vader.csv")\n';
const VADERAPP_1 =
  VADERAPP +
  'stad = st.selectbox("Stad", ["Stockholm", "Göteborg", "Kiruna"])\nvald = df[df["stad"] == stad]\nst.metric("Medeltemperatur", f"{round(vald[\'temperatur\'].mean(), 1)} °C")\n';
const VADERAPP_2 =
  VADERAPP_1 + 'st.line_chart(vald.set_index("datum")["temperatur"])\n';

const SPELAPP = ST + 'df = pd.read_csv("lyssning.csv")\n';
const SPELAPP_1 =
  SPELAPP + 'st.title("Min musik")\nst.metric("Spelningar", len(df))\n';
const SPELAPP_2 =
  SPELAPP_1 +
  'antal = st.slider("Visa topp", 1, 7, 3)\ntopp = df["artist"].value_counts().head(antal).reset_index()\nst.dataframe(topp)\n';

export const PROJECTS_C = [
  // Bana 9: berätta med data
  {
    id: 'da-proj-genre-rattvis',
    track: 'beratta',
    title: 'Den populäraste genren',
    reward: { emoji: '🏅', name: 'Medalj' },
    summary: 'Fantasy lånas mest. Men är den populärast?',
    files: FIL.bibliotek,
    steps: [
      {
        title: 'Flest lån',
        why: 'value_counts svarar på "vad lånades flest gånger" – men inte på "vad är populärast", om det finns olika många böcker att låna.',
        xp: 10,
        description: 'Räkna lånen per genre.',
        task: 'Uppgift: Läs in `bibliotek.csv` och spara antalet lån per genre i `lan`.',
        starterCode: PD + '# Steg 1: flest lån\n',
        solution: GENRE_2,
        hints: [
          'df = pd.read_csv("bibliotek.csv")',
          'value_counts räknar per genre.',
          'lan = df["genre"].value_counts()',
        ],
        tests: [
          {
            description: 'lan',
            code: 'lan.to_dict()',
            expected: { fantasy: 21, barn: 14, deckare: 14, fakta: 11 },
          },
        ],
      },
      {
        title: 'Hur många böcker?',
        why: 'Fyra fantasyböcker får fler lån än två barnböcker bara för att de är fler. Antalet titlar är det som behövs för att jämföra rättvist.',
        xp: 15,
        description: 'Hur många olika böcker finns i varje genre?',
        task: 'Uppgift: Spara antalet olika titlar per genre i `titlar`.',
        solution: GENRE_3,
        hints: [
          'Gruppera på "genre".',
          'nunique räknar olika titlar.',
          'titlar = df.groupby("genre")["titel"].nunique()',
        ],
        tests: [
          {
            description: 'titlar',
            code: 'titlar.to_dict()',
            expected: { barn: 2, deckare: 2, fakta: 2, fantasy: 4 },
          },
        ],
      },
      {
        title: 'Per bok',
        why: 'Lån per titel jämför samma sak i alla genrer. Det vänder på svaret: fantasy lånas mest totalt men minst per bok.',
        xp: 20,
        description: 'Vilken genre lånas mest per bok?',
        task: 'Uppgift: Spara lån per titel, avrundat till en decimal och störst först, i `per_titel`. Skriv ut `Fantasy: 21 lån men 5.2 per bok`.',
        solution:
          GENRE_3 +
          "per_titel = (lan / titlar).round(1).sort_values(ascending=False)\nprint(f\"Fantasy: {lan['fantasy']} lån men {per_titel['fantasy']} per bok\")\n",
        hints: [
          'lan / titlar delar genre för genre.',
          'Avrunda och sortera med störst först.',
          'per_titel["fantasy"] är fantasyns siffra.',
        ],
        tests: [
          {
            description: 'per_titel',
            code: 'per_titel.to_dict()',
            expected: { barn: 7, deckare: 7, fakta: 5.5, fantasy: 5.2 },
          },
          {
            description: 'Utskriften',
            code: '__output[-1]',
            expected: 'Fantasy: 21 lån men 5.2 per bok',
          },
        ],
      },
    ],
  },
  {
    id: 'da-proj-lurar',
    track: 'beratta',
    title: 'Diagrammet som lurar',
    reward: { emoji: '🪞', name: 'Spegel' },
    summary: 'Enkätens diagram får City att se mycket sämre ut. Laga det.',
    files: FIL.enkat,
    steps: [
      {
        title: 'Hitta felet',
        why: 'Betyget går från 1 till 5. En axel från 3.5 får en skillnad på en tredjedels poäng att se ut som en avgrund.',
        xp: 15,
        description:
          'Koden städar enkäten (som i projektet Kundenkäten) och ritar snittbetyget per kafé.',
        task: 'Uppgift: Ta bort raden med `plt.ylim(3.5, 4.1)` och sätt i stället y-axeln från 0 till 5 med `plt.ylim(0, 5)`. Ge diagrammet titeln `Snittbetyg (skala 1–5)`.',
        starterCode: LURAR,
        solution: LURAR_2,
        hints: [
          'plt.ylim(3.5, 4.1) är raden som lurar.',
          'plt.ylim(0, 5) visar hela skalan.',
          'plt.title("Snittbetyg (skala 1–5)")',
        ],
        tests: [
          {
            description: 'Axeln börjar på 0',
            code: '__figur()["y_min"]',
            expected: 0,
          },
          {
            description: 'Titeln',
            code: '__figur()["titel"]',
            expected: 'Snittbetyg (skala 1–5)',
          },
        ],
      },
      {
        title: 'Hur många svarade?',
        why: 'Ett snitt av 29 svar är osäkrare än ett av 46. Antalet i etiketten låter läsaren väga in det.',
        xp: 15,
        description: 'Skriv antalet svar under staplarna.',
        task: 'Uppgift: Spara antalet svar per kafé i `antal`. Ändra staplarnas etiketter till t.ex. `City (46)` med en lista: `[f"{k} ({antal[k]})" for k in snitt.index]`.',
        solution:
          ENKAT_REN +
          'antal = df["kafe"].value_counts()\netiketter = [f"{k} ({antal[k]})" for k in snitt.index]\n\nplt.bar(etiketter, snitt.values)\nplt.ylim(0, 5)\nplt.title("Snittbetyg (skala 1–5)")\n',
        hints: [
          'antal = df["kafe"].value_counts()',
          'etiketter = [f"{k} ({antal[k]})" for k in snitt.index]',
          'Rita plt.bar(etiketter, snitt.values) i stället.',
        ],
        tests: [
          {
            description: 'Etiketterna',
            code: '__figur()["etiketter"]',
            expected: ['City (46)', 'Gamla stan (29)'],
          },
        ],
      },
      {
        title: 'Meningen under',
        why: 'Diagrammet visar skillnaden, meningen säger hur stor den är. Med skalan i meningen blir 0.34 lätt att förstå.',
        xp: 15,
        description: 'Skriv en mening som hör till diagrammet.',
        task: 'Uppgift: Skriv ut `Gamla stan 3.97 mot City 3.63: 0.34 poäng skillnad på en skala 1–5.` med siffrorna från `snitt`.',
        solution:
          ENKAT_REN +
          'antal = df["kafe"].value_counts()\netiketter = [f"{k} ({antal[k]})" for k in snitt.index]\n\nplt.bar(etiketter, snitt.values)\nplt.ylim(0, 5)\nplt.title("Snittbetyg (skala 1–5)")\n\nskillnad = round(snitt["Gamla stan"] - snitt["City"], 2)\nprint(f"Gamla stan {snitt[\'Gamla stan\']} mot City {snitt[\'City\']}: {skillnad} poäng skillnad på en skala 1–5.")\n',
        hints: [
          'skillnad = round(snitt["Gamla stan"] - snitt["City"], 2)',
          "Inne i en f-sträng med dubbla citattecken: snitt['City']",
          'Kopiera meningen och byt siffrorna mot {...}.',
        ],
        tests: [
          {
            description: 'Meningen',
            code: '__output[-1]',
            expected:
              'Gamla stan 3.97 mot City 3.63: 0.34 poäng skillnad på en skala 1–5.',
          },
        ],
      },
    ],
  },
  {
    id: 'da-proj-konto-slutsats',
    track: 'beratta',
    title: 'Slutsatsen om kontot',
    reward: { emoji: '💬', name: 'Pratbubbla' },
    summary:
      'Februari såg dålig ut. Var det ett dåligt sparande – eller ett enda köp?',
    files: FIL.konto,
    steps: [
      {
        title: 'Över per månad',
        why: 'Summan av alla belopp en månad är inkomster minus utgifter: det som blev över.',
        xp: 10,
        description: 'Hur mycket blev över varje månad?',
        task: 'Uppgift: Läs in `konto.csv` och lägg till `manad`. Spara summan av beloppen per månad i `over`.',
        starterCode: PD + '# Steg 1: över per månad\n',
        solution: KONTO_2,
        hints: [
          'df["manad"] = pd.to_datetime(df["datum"]).dt.month',
          'Summera "belopp" per månad.',
          'over = df.groupby("manad")["belopp"].sum()',
        ],
        tests: [
          {
            description: 'over',
            code: 'over.tolist()',
            expected: [12738, 7019, 13515],
          },
        ],
      },
      {
        title: 'Vad hände i februari?',
        why: 'Ett enda stort köp kan ge en hel månad fel stämpel. Ta bort fasta kostnader som hyran och titta på det som är kvar.',
        xp: 15,
        description: 'Leta efter stora köp som inte är hyran.',
        task: 'Uppgift: Spara köpen över 5000 kr (belopp under -5000) som inte är kategorin boende i `stora`.',
        solution: KONTO_3,
        hints: [
          'stora = df[df["belopp"] < -5000]',
          'Ta bort boende: stora[stora["kategori"] != "boende"]',
          'Skriv ut och titta.',
        ],
        tests: [
          {
            description: 'stora',
            code: 'stora["text"].tolist()',
            expected: ['Elgiganten'],
          },
        ],
      },
      {
        title: 'Slutsatsen',
        why: 'Med köpet borträknat syns att februari egentligen var en vanlig månad. Slutsatsen säger både vad som hände och varför.',
        xp: 20,
        description: 'Skriv slutsatsen.',
        task: 'Uppgift: Spara februaris överskott utan köpet i `utan_kopet` (överskottet minus köpets belopp). Skriv ut `Februari: 7019 kr över, men 14014 kr utan köpet på Elgiganten.`',
        solution:
          KONTO_3 +
          'kopet = stora["belopp"].tolist()[0]\nutan_kopet = over[2] - kopet\nprint(f"Februari: {over[2]} kr över, men {utan_kopet} kr utan köpet på {stora[\'text\'].tolist()[0]}.")\n',
        hints: [
          'kopet = stora["belopp"].tolist()[0] är negativt.',
          'utan_kopet = over[2] - kopet',
          'Namnet på butiken: stora["text"].tolist()[0]',
        ],
        tests: [
          { description: 'utan_kopet', code: 'utan_kopet', expected: 14014 },
          {
            description: 'Meningen',
            code: '__output[-1]',
            expected:
              'Februari: 7019 kr över, men 14014 kr utan köpet på Elgiganten.',
          },
        ],
      },
    ],
  },

  // Bana 10: slutprojektet
  {
    id: 'da-proj-sortimentet',
    track: 'slutprojekt',
    title: 'Sortimentet',
    reward: { emoji: '🍰', name: 'Tårta' },
    summary: 'Vad ska kaféet sluta sälja?',
    files: KASSA_OCH_PRODUKTER,
    steps: [
      {
        title: 'Vinsten',
        why: 'Det är vinsten, inte intäkten, som avgör om en produkt lönar sig. Därför behövs inköpspriset.',
        xp: 15,
        description: 'Räkna vinsten för hela året.',
        task: 'Uppgift: Slå ihop kassan med inköpspriset i `ihop` och lägg till `vinst`. Spara årets vinst i `total`.',
        starterCode: PD + '# Steg 1: vinsten\n',
        solution: VINST + 'total = ihop["vinst"].sum()\nprint(total)\n',
        hints: [
          'ihop = df.merge(produkter[["produkt", "inkop"]], on="produkt")',
          'ihop["vinst"] = (ihop["pris"] - ihop["inkop"]) * ihop["antal"]',
          'total = ihop["vinst"].sum()',
        ],
        tests: [{ description: 'total', code: 'total', expected: 365454 }],
      },
      {
        title: 'Andelen',
        why: 'Andelen av vinsten visar hur mycket kaféet skulle förlora på att ta bort en produkt.',
        xp: 15,
        description: 'Hur stor del av vinsten ger varje produkt?',
        task: 'Uppgift: Spara vinsten per produkt i `per_produkt` och andelen i procent, avrundad till en decimal och minst först, i `andel`.',
        solution: VINST_2,
        hints: [
          'per_produkt = ihop.groupby("produkt")["vinst"].sum()',
          'andel = (per_produkt / per_produkt.sum() * 100).round(1)',
          'Sortera med .sort_values().',
        ],
        tests: [
          {
            description: 'De tre minsta',
            code: 'andel.head(3).to_dict()',
            expected: { Semla: 1.9, Iskaffe: 2.2, Juice: 3.2 },
          },
        ],
      },
      {
        title: 'Förslaget',
        why: 'Semlan och iskaffet ger lite över året, men de säljs bara en del av året och lockar kunder då. Ett förslag som tar hänsyn till det håller bättre.',
        xp: 20,
        description: 'Föreslå vad som ska bort, men inte säsongsvarorna.',
        task: 'Uppgift: Spara produkterna med under 4 procent av vinsten i `svaga`. Spara de som inte är säsongsvaror (Semla och Iskaffe) i `sluta`, som en lista.',
        solution: VINST_3,
        hints: [
          'svaga = andel[andel < 4]',
          'sasong = ["Semla", "Iskaffe"]',
          'sluta = [p for p in svaga.index if p not in sasong]',
        ],
        tests: [{ description: 'sluta', code: 'sluta', expected: ['Juice'] }],
      },
    ],
  },
  {
    id: 'da-proj-bemanning',
    track: 'slutprojekt',
    title: 'Bemanningen',
    reward: { emoji: '👥', name: 'Lag' },
    summary: 'Hur många behöver jobba varje timme en lördag eller söndag?',
    files: KASSA,
    steps: [
      {
        title: 'Helgdagarna',
        why: 'Helgen har fler kunder än vardagarna. Ett snitt för hela veckan skulle ge för lite personal på helgen.',
        xp: 15,
        description: 'Börja med helgdagarna.',
        task: 'Uppgift: Läs in kassan och lägg till `veckodag` och `timme`. Spara antalet helgdagar kaféet hade öppet i `dagar`.',
        starterCode: 'import numpy as np\n' + PD + '# Steg 1: helgdagarna\n',
        solution:
          BEMANNING +
          'helg = df[df["veckodag"] >= 5]\ndagar = helg["datum"].nunique()\nprint(dagar)\n',
        hints: [
          'df["timme"] = df["tid"].str[:2].astype("int64")',
          'helg = df[df["veckodag"] >= 5]',
          'dagar = helg["datum"].nunique()',
        ],
        tests: [{ description: 'dagar', code: 'dagar', expected: 102 }],
      },
      {
        title: 'Kunder per timme',
        why: 'Antalet kunder per timme en vanlig helgdag är det som personalen faktiskt möter.',
        xp: 15,
        description: 'Hur många kunder kommer varje timme en helgdag?',
        task: 'Uppgift: Spara antalet kunder per timme och helgdag, avrundat till en decimal, i `per_timme`.',
        solution: BEMANNING_2,
        hints: [
          'helg.groupby("timme")["kvitto"].nunique() räknar kunder per timme.',
          'Dela med dagar.',
          'Avrunda med .round(1).',
        ],
        tests: [{ description: 'Kl 12', code: 'per_timme[12]', expected: 3.3 }],
      },
      {
        title: 'Hur många ska jobba?',
        why: 'En person klarar kaféet själv, men när det kommer fler än två kunder i timmen blir det kö. np.where ger 2 där villkoret stämmer och 1 annars, för varje timme.',
        xp: 20,
        description: 'Räkna ut personalbehovet.',
        task: 'Uppgift: Spara antalet som behöver jobba varje timme i `personal`: 2 när det kommer fler än 2 kunder, annars 1. Använd `np.where` och gör svaret till en Series med timmarna som index. Spara timmarna som behöver två i `tva`.',
        solution:
          BEMANNING_3 +
          'tva = list(personal[personal >= 2].index)\nprint(tva)\n',
        hints: [
          'np.where(per_timme > 2, 2, 1) ger 2 eller 1 för varje timme.',
          'personal = pd.Series(np.where(per_timme > 2, 2, 1), index=per_timme.index)',
          'tva = list(personal[personal >= 2].index)',
        ],
        tests: [
          {
            description: 'personal',
            code: 'personal.tolist()',
            expected: [1, 1, 1, 1, 2, 2, 1, 2, 1, 1],
          },
          { description: 'tva', code: 'tva', expected: [12, 13, 15] },
        ],
      },
    ],
  },
  {
    id: 'da-proj-city-mer',
    track: 'slutprojekt',
    title: 'Vad säljer city?',
    reward: { emoji: '🏙️', name: 'Skyskrapa' },
    summary: 'Är city-kunderna annorlunda än gamla kaféets?',
    files: CITY_OCH_KASSA,
    steps: [
      {
        title: 'Två kaféer',
        why: 'Gamla kaféet filtreras till januari–mars, så att samma del av året jämförs.',
        xp: 10,
        description: 'Läs in båda kaféerna. Koden är redan skriven.',
        task: 'Uppgift: Spara antalet kvitton i varje kafé i `kvitton_city` och `kvitton_gamla`.',
        starterCode: CITY + '\n# Steg 1: två kaféer\n',
        solution:
          CITY +
          'kvitton_city = city["kvitto"].nunique()\nkvitton_gamla = gamla["kvitto"].nunique()\nprint(kvitton_city, kvitton_gamla)\n',
        hints: [
          'nunique räknar kvitton.',
          'kvitton_city = city["kvitto"].nunique()',
          'Likadant för gamla.',
        ],
        tests: [
          {
            description: 'Kvitton',
            code: '[kvitton_city, kvitton_gamla]',
            expected: [2116, 1383],
          },
        ],
      },
      {
        title: 'Snittkvittot',
        why: 'Ett lägre snittkvitto i city kan betyda att kunderna köper en sak i taget på väg till jobbet.',
        xp: 15,
        description: 'Handlar kunderna för mer eller mindre i city?',
        task: 'Uppgift: Spara snittkvittot i varje kafé, avrundat till en decimal, i `snitt_city` och `snitt_gamla`.',
        solution: CITY_2,
        hints: [
          'Summera per kvitto först.',
          'Ta medelvärdet och avrunda.',
          'snitt_city = round(city.groupby("kvitto")["summa"].sum().mean(), 1)',
        ],
        tests: [
          {
            description: 'Snittkvitton',
            code: '[snitt_city, snitt_gamla]',
            expected: [82.5, 91.7],
          },
        ],
      },
      {
        title: 'Mer i city',
        why: 'Andelar går att jämföra mellan kaféer av olika storlek. Skillnaden visar vad city-kunderna köper mer av.',
        xp: 20,
        description:
          'Vilka produkter står för en större del av intäkten i city?',
        task: 'Uppgift: Spara varje produkts andel av intäkten i procent i `andel_city` och `andel_gamla`. Spara skillnaden (city minus gamla, utan tomma värden), störst först, i `skillnad`.',
        solution: CITY_3,
        hints: [
          'andel_city = (city.groupby("produkt")["summa"].sum() / city["summa"].sum() * 100).round(1)',
          'Likadant för gamla.',
          'skillnad = (andel_city - andel_gamla).dropna().sort_values(ascending=False)',
        ],
        tests: [
          {
            description: 'Mest mer i city',
            code: 'list(skillnad.index[:2])',
            expected: ['Smörgås', 'Soppa'],
          },
        ],
      },
    ],
  },

  // Bana 11: från analys till app
  {
    id: 'da-proj-kontoapp',
    track: 'app',
    title: 'Kontoappen',
    reward: { emoji: '💰', name: 'Sparbössa' },
    summary: 'Kontoutdraget som en app med nyckeltal och filter.',
    files: FIL.konto,
    steps: [
      {
        title: 'Nyckeltalen',
        why: 'Tre stora siffror överst är det första man ser. Resten av appen förklarar dem.',
        xp: 15,
        description: 'Rubrik och tre nyckeltal.',
        task: 'Uppgift: Gör en app med rubriken `Mitt konto` och tre `st.metric` i kolumner: `Inkomster`, `Utgifter` (positivt) och `Över`, t.ex. `85500 kr`.',
        starterCode: KONTOAPP + '\n# Steg 1: nyckeltalen\n',
        solution: KONTOAPP_1,
        hints: [
          'inkomster = df[df["belopp"] > 0]["belopp"].sum()',
          'utgifter = -df[df["belopp"] < 0]["belopp"].sum()',
          'kol1, kol2, kol3 = st.columns(3) och en metric i varje.',
        ],
        tests: [
          {
            description: 'Nyckeltalen',
            code: "__shown('metric')",
            expected: [
              'Inkomster: 85500 kr',
              'Utgifter: 52228 kr',
              'Över: 33272 kr',
            ],
          },
        ],
      },
      {
        title: 'Välj månad',
        why: 'Filtret ligger före räkningen, så att samma kod räknar för en månad eller alla.',
        xp: 20,
        description: 'Låt användaren välja en månad.',
        task: 'Uppgift: Lägg en selectbox med etiketten `Månad` och alternativen `"Alla"`, 1, 2 och 3 direkt under rubriken. Räkna bara den valda månaden när det inte är Alla.',
        solution: KONTOAPP_2,
        hints: [
          'val = st.selectbox("Månad", ["Alla", 1, 2, 3])',
          'if val != "Alla":\n    df = df[df["manad"] == val]',
          'Filtret ska stå före raderna som räknar.',
        ],
        tests: [
          {
            description: 'Februari',
            code: "__shown('metric')",
            expected: [
              'Inkomster: 28500 kr',
              'Utgifter: 21481 kr',
              'Över: 7019 kr',
            ],
            widgets: { Månad: 2 },
          },
        ],
      },
      {
        title: 'Utgifterna',
        why: 'Diagrammet följer filtret, eftersom det ritas från samma df.',
        xp: 15,
        description: 'Visa utgifterna per kategori.',
        task: 'Uppgift: Lägg till en `st.subheader` med `Utgifter per kategori` och staplar med utgifterna per kategori (positiva), störst först.',
        solution:
          KONTOAPP_2 +
          '\nst.subheader("Utgifter per kategori")\nper_kategori = (-df[df["belopp"] < 0].groupby("kategori")["belopp"].sum()).sort_values(ascending=False)\nst.bar_chart(per_kategori)\n',
        hints: [
          'st.subheader("Utgifter per kategori")',
          'Gruppera utgifterna per kategori och gör summan positiv.',
          'st.bar_chart(per_kategori)',
        ],
        tests: [
          {
            description: 'Staplarna',
            code: "__element('bar_chart')['labels'][:2]",
            expected: ['boende', 'mat'],
          },
        ],
      },
    ],
  },
  {
    id: 'da-proj-vaderapp',
    track: 'app',
    title: 'Väderappen',
    reward: { emoji: '⛅', name: 'Moln' },
    summary: 'Välj en stad och se juni.',
    files: FIL.vader,
    steps: [
      {
        title: 'Välj stad',
        why: 'Allt som räknas efter selectboxen gäller den valda staden, så samma kod fungerar för alla tre.',
        xp: 15,
        description: 'En lista med städer och medeltemperaturen.',
        task: 'Uppgift: Gör en selectbox med etiketten `Stad` och de tre städerna. Visa `st.metric("Medeltemperatur", ...)` för den valda, t.ex. `17.5 °C`.',
        starterCode: VADERAPP + '\n# Steg 1: välj stad\n',
        solution: VADERAPP_1,
        hints: [
          'stad = st.selectbox("Stad", ["Stockholm", "Göteborg", "Kiruna"])',
          'vald = df[df["stad"] == stad]',
          'round(vald["temperatur"].mean(), 1)',
        ],
        tests: [
          {
            description: 'Stockholm',
            code: "__shown('metric')",
            expected: ['Medeltemperatur: 17.5 °C'],
          },
          {
            description: 'Kiruna',
            code: "__shown('metric')",
            expected: ['Medeltemperatur: 10.3 °C'],
            widgets: { Stad: 'Kiruna' },
          },
        ],
      },
      {
        title: 'Månaden som linje',
        why: 'set_index("datum") gör datumen till x-axeln, så att linjen visar dag för dag.',
        xp: 15,
        description: 'Temperaturen dag för dag.',
        task: 'Uppgift: Visa den valda stadens temperatur som en linje med `st.line_chart`, med datum som index.',
        solution: VADERAPP_2,
        hints: [
          'vald.set_index("datum")["temperatur"]',
          'st.line_chart(...)',
          'Linjen ska ha 30 punkter.',
        ],
        tests: [
          {
            description: 'Linjen',
            code: "__shown('line_chart')",
            expected: ['diagram med 30 punkter'],
          },
        ],
      },
      {
        title: 'Visa regnet',
        why: 'En kryssruta låter användaren välja mer information utan att sidan blir rörig från början.',
        xp: 20,
        description: 'Regnet visas bara om man vill.',
        task: 'Uppgift: Lägg till `st.checkbox("Visa regn")`. När den är ikryssad: visa regnet per dag som staplar.',
        solution:
          VADERAPP_2 +
          'if st.checkbox("Visa regn"):\n    st.bar_chart(vald.set_index("datum")["regn_mm"])\n',
        hints: [
          'if st.checkbox("Visa regn"):',
          '    st.bar_chart(vald.set_index("datum")["regn_mm"])',
          'Utan kryss syns inga staplar.',
        ],
        tests: [
          {
            description: 'Utan kryss: inga staplar',
            code: "__shown('bar_chart')",
            expected: [],
          },
          {
            description: 'Med kryss: staplar',
            code: "__shown('bar_chart')",
            expected: ['diagram med 30 staplar'],
            widgets: { 'Visa regn': true },
          },
        ],
      },
    ],
  },
  {
    id: 'da-proj-spelapp',
    track: 'app',
    title: 'Spellisteappen',
    reward: { emoji: '🎶', name: 'Noter' },
    summary: 'Din musik som en app med topplista.',
    files: FIL.lyssning,
    steps: [
      {
        title: 'Rubrik och antal',
        why: 'En siffra med rubrik säger direkt hur mycket datan bygger på.',
        xp: 10,
        description: 'Börja med rubriken och antalet spelningar.',
        task: 'Uppgift: Gör en app med rubriken `Min musik` och `st.metric("Spelningar", ...)`.',
        starterCode: SPELAPP + '\n# Steg 1: rubrik och antal\n',
        solution: SPELAPP_1,
        hints: [
          'st.title("Min musik")',
          'len(df) är antalet spelningar.',
          'st.metric("Spelningar", len(df))',
        ],
        tests: [
          {
            description: 'Appen',
            code: '__app',
            expected: [
              ['title', 'Min musik'],
              ['metric', 'Spelningar: 86'],
            ],
          },
        ],
      },
      {
        title: 'Topplistan',
        why: 'Slidern bestämmer hur många rader head() tar. Användaren väljer själv hur lång listan ska vara.',
        xp: 20,
        description: 'En topplista med valfri längd.',
        task: 'Uppgift: Lägg till `st.slider("Visa topp", 1, 7, 3)` och visa så många artister med flest spelningar i en tabell med `st.dataframe`.',
        solution: SPELAPP_2,
        hints: [
          'antal = st.slider("Visa topp", 1, 7, 3)',
          'df["artist"].value_counts().head(antal).reset_index()',
          'st.dataframe(topp)',
        ],
        tests: [
          {
            description: 'Tre från början',
            code: "__shown('dataframe')",
            expected: ['tabell med 3 rader'],
          },
          {
            description: 'Fem med slidern på 5',
            code: "__shown('dataframe')",
            expected: ['tabell med 5 rader'],
            widgets: { 'Visa topp': 5 },
          },
        ],
      },
      {
        title: 'Räkna i minuter',
        why: 'En radioknapp med två val passar när användaren ska välja mellan två sätt att räkna. Samma tabell, olika mått.',
        xp: 20,
        description:
          'Låt användaren välja om topplistan räknas i spelningar eller minuter.',
        task: 'Uppgift: Lägg till `st.radio("Räkna i", ["spelningar", "minuter"])` före slidern. Med minuter: sortera artisterna efter summan av sekunder delat med 60, avrundat.',
        solution:
          SPELAPP_1 +
          'satt = st.radio("Räkna i", ["spelningar", "minuter"])\nantal = st.slider("Visa topp", 1, 7, 3)\nif satt == "minuter":\n    serie = (df.groupby("artist")["sekunder"].sum() / 60).sort_values(ascending=False).round()\nelse:\n    serie = df["artist"].value_counts()\ntopp = serie.head(antal).reset_index()\nst.dataframe(topp)\n',
        hints: [
          'satt = st.radio("Räkna i", ["spelningar", "minuter"])',
          'Med if/else väljer du vilken serie som ska visas.',
          'Minuter: (df.groupby("artist")["sekunder"].sum() / 60).sort_values(ascending=False).round()',
        ],
        tests: [
          {
            description: 'Minuter: Veronica Maggio överst med 79 minuter',
            code: "__element('dataframe')['rows'][0]",
            expected: ['Veronica Maggio', 79],
            widgets: { 'Räkna i': 'minuter' },
          },
          {
            description: 'En radioknapp med spelningar och minuter',
            code: "__element('radio')['options']",
            expected: ['spelningar', 'minuter'],
          },
        ],
      },
    ],
  },
];
