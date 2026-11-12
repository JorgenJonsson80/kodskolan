import { KASSA } from '../filer';

// Bana 11: från analys till app. Analysen blir en Streamlit-sida som
// ägaren kan använda själv. Rättningen kör Python-kursens låtsas-streamlit
// (harness.py): __shown('metric') ger texterna, __element('bar_chart') hela
// diagrammet och widgets i ett test ställer in reglage och listor.
const READ =
  'import streamlit as st\nimport pandas as pd\n\ndf = pd.read_csv("kassan.csv")\ndf["summa"] = df["antal"] * df["pris"]\n';
const MONTHS = READ + 'df["manad"] = pd.to_datetime(df["datum"]).dt.month\n';

export const APP = [
  {
    id: 'da-101',
    track: 'app',
    title: 'Kaféets första sida',
    xp: 10,
    description:
      'Ägaren vill inte köra Python. Gör analysen till en webbsida med Streamlit.',
    explain:
      'Streamlit gör ett Python-program till en webbsida. `st.title` gör en rubrik, `st.write` text och `st.caption` liten grå text. Allt visas uppifrån och ner, i den ordning koden körs.\n\nPå din egen dator kör du `streamlit run app.py`. Här trycker du på 🚀 Öppna appen i riktig Streamlit under koden.',
    example:
      'import streamlit as st\n\nst.title("Hej")\nst.caption("Liten text")',
    task: 'Uppgift: Gör en sida med rubriken `Kafé Kanel 2025` och texten `Kassan har 9322 rader.` (räkna ut antalet med len), och sist en caption med `Data: kassan.csv`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nst.title("Kafé Kanel 2025")\nst.write(f"Kassan har {len(df)} rader.")\nst.caption("Data: kassan.csv")\n',
    files: KASSA,
    hints: [
      'st.title("Kafé Kanel 2025")',
      'st.write(f"Kassan har {len(df)} rader.")',
      'st.caption("Data: kassan.csv")',
    ],
    tests: [
      {
        description: 'Sidan har rubriken, texten och källan',
        code: '__app',
        expected: [
          ['title', 'Kafé Kanel 2025'],
          ['write', 'Kassan har 9322 rader.'],
          ['caption', 'Data: kassan.csv'],
        ],
      },
    ],
  },
  {
    id: 'da-102',
    track: 'app',
    title: 'Nyckeltal: st.metric',
    xp: 15,
    description:
      'Det första ägaren vill se: intäkten, antalet kunder och snittkvittot. Stort och tydligt.',
    explain:
      '`st.metric("Intäkt", "487373 kr")` visar ett tal stort med en liten rubrik över. Tre i rad gör du med kolumner:\n\n```\nkol1, kol2, kol3 = st.columns(3)\nkol1.metric("Intäkt", f"{intakt} kr")\n```',
    example:
      'import streamlit as st\n\nvanster, hoger = st.columns(2)\nvanster.metric("Kunder", 120)\nhoger.metric("Snitt", "85 kr")',
    task: 'Uppgift: Visa tre nyckeltal i tre kolumner: `Intäkt` (t.ex. `487373 kr`), `Kunder` (antalet kvitton) och `Snittkvitto` (t.ex. `87.4 kr`, avrundat till en decimal).',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nintakt = df["summa"].sum()\nkunder = df["kvitto"].nunique()\nsnitt = round(df.groupby("kvitto")["summa"].sum().mean(), 1)\n\nkol1, kol2, kol3 = st.columns(3)\nkol1.metric("Intäkt", f"{intakt} kr")\nkol2.metric("Kunder", kunder)\nkol3.metric("Snittkvitto", f"{snitt} kr")\n',
    files: KASSA,
    hints: [
      'Räkna ut intakt, kunder och snittet per kvitto först.',
      'kol1, kol2, kol3 = st.columns(3)',
      'kol1.metric("Intäkt", f"{intakt} kr") och likadant för de andra.',
    ],
    tests: [
      {
        description: 'Tre nyckeltal',
        code: "__shown('metric')",
        expected: ['Intäkt: 487373 kr', 'Kunder: 5578', 'Snittkvitto: 87.4 kr'],
      },
    ],
  },
  {
    id: 'da-103',
    track: 'app',
    title: 'En tabell: st.dataframe',
    xp: 10,
    description: 'Topplistan som en tabell på sidan.',
    explain:
      '`st.dataframe(tabell)` visar en DataFrame som en tabell man kan sortera och scrolla i. Gör om en grupperad Series till en tabell med `reset_index()` först, så får båda kolumnerna namn.',
    example: 'st.dataframe(df.head())',
    task: 'Uppgift: Visa en `st.subheader` med `Topp 5`, och sedan de fem produkterna som drog in mest (kolumnerna produkt och summa) med `st.dataframe`. Spara tabellen i `topp`.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\ntopp = df.groupby("produkt")["summa"].sum().sort_values(ascending=False).head(5).reset_index()\nst.subheader("Topp 5")\nst.dataframe(topp)\n',
    files: KASSA,
    hints: [
      'Gruppera, summera, sortera med störst först och ta head(5).',
      'reset_index() gör det till en tabell med kolumnerna produkt och summa.',
      'st.subheader("Topp 5") och st.dataframe(topp)',
    ],
    tests: [
      {
        description: 'Rubriken och tabellen visas',
        code: '__app',
        expected: [
          ['subheader', 'Topp 5'],
          ['dataframe', 'tabell med 5 rader'],
        ],
      },
      {
        description: 'Tabellen börjar med Smörgås och Bryggkaffe',
        code: "__element('dataframe')['rows'][:2]",
        expected: [
          ['Smörgås', 79755],
          ['Bryggkaffe', 72835],
        ],
      },
    ],
  },
  {
    id: 'da-104',
    track: 'app',
    title: 'Staplar: st.bar_chart',
    xp: 10,
    description: 'Streamlit ritar enkla diagram själv, direkt från pandas.',
    explain:
      '`st.bar_chart(serie)` ritar staplar från en Series: index blir etiketterna och värdena höjden. `st.line_chart` ritar en linje. Diagrammen går att hålla musen över och zooma i – det matplotlib inte kan på en webbsida.\n\nSortera först, som i bana 7. (Riktiga Streamlit sorterar ibland om etiketterna själv, men förhandsvisningen här följer din ordning.)',
    example: 'st.bar_chart(df.groupby("betalsatt")["summa"].sum())',
    task: 'Uppgift: Visa antalet sålda per produkt som staplar, med flest först.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nper_produkt = df.groupby("produkt")["antal"].sum().sort_values(ascending=False)\nst.bar_chart(per_produkt)\n',
    files: KASSA,
    hints: [
      'per_produkt = df.groupby("produkt")["antal"].sum()',
      'Sortera med .sort_values(ascending=False).',
      'st.bar_chart(per_produkt)',
    ],
    tests: [
      {
        description: 'Ett stapeldiagram med tolv produkter',
        code: "__shown('bar_chart')",
        expected: ['diagram med 12 staplar'],
      },
      {
        description: 'Bryggkaffe och Kanelbulle först',
        code: "__element('bar_chart')['labels'][:2]",
        expected: ['Bryggkaffe', 'Kanelbulle'],
      },
    ],
  },
  {
    id: 'da-105',
    track: 'app',
    title: 'Året som en linje',
    xp: 10,
    description: 'Intäkten månad för månad, så att säsongerna syns.',
    explain:
      '`st.line_chart(per_manad)` ritar en linje med månaderna längs x-axeln. Ge sidan en rubrik som säger vad linjen visar, med `st.subheader`.',
    example: 'st.line_chart(df.groupby("manad")["antal"].sum())',
    task: 'Uppgift: Visa en `st.subheader` med `Intäkt per månad` och sedan intäkten per månad som en linje.',
    starterCode: MONTHS + '\n# Skriv din kod här\n',
    solution:
      MONTHS +
      '\nper_manad = df.groupby("manad")["summa"].sum()\nst.subheader("Intäkt per månad")\nst.line_chart(per_manad)\n',
    files: KASSA,
    hints: [
      'per_manad = df.groupby("manad")["summa"].sum()',
      'st.subheader("Intäkt per månad")',
      'st.line_chart(per_manad)',
    ],
    tests: [
      {
        description: 'Rubrik och linje',
        code: '__app',
        expected: [
          ['subheader', 'Intäkt per månad'],
          ['line_chart', 'diagram med 12 punkter'],
        ],
      },
      {
        description: 'Linjen börjar med januari och februari',
        code: "list(__element('line_chart')['series'].values())[0][:2]",
        expected: [43197, 41876],
      },
    ],
  },
  {
    id: 'da-106',
    track: 'app',
    title: 'Välj en produkt: selectbox',
    xp: 15,
    description: 'Låt ägaren välja en produkt själv och se hur den sålt.',
    explain:
      '`st.selectbox("Produkt", lista)` visar en lista att välja i och ger tillbaka det valda. Varje gång någon väljer något körs hela programmet om, med det nya valet.\n\n```\nvald = st.selectbox("Produkt", sorted(df["produkt"].unique()))\nst.metric("Sålda", ...)\n```\n\nFrån början är det första alternativet valt.',
    example:
      'val = st.selectbox("Betalsätt", ["kort", "swish"])\nst.write(val)',
    task: 'Uppgift: Gör en selectbox med etiketten `Produkt` och produkterna i bokstavsordning. Visa `st.metric("Sålda", ...)` med hur många av den valda som såldes.',
    starterCode: READ + '\n# Skriv din kod här\n',
    solution:
      READ +
      '\nvald = st.selectbox("Produkt", sorted(df["produkt"].unique()))\nsalda = df[df["produkt"] == vald]["antal"].sum()\nst.metric("Sålda", salda)\n',
    files: KASSA,
    hints: [
      'vald = st.selectbox("Produkt", sorted(df["produkt"].unique()))',
      'Filtrera df på den valda produkten och summera antal.',
      'st.metric("Sålda", salda)',
    ],
    tests: [
      {
        description: 'Från början: Bryggkaffe, 2081 sålda',
        code: "__shown('metric')",
        expected: ['Sålda: 2081'],
      },
      {
        description: 'Väljer man Semla: 189 sålda',
        code: "__shown('metric')",
        expected: ['Sålda: 189'],
        widgets: { Produkt: 'Semla' },
      },
    ],
  },
  {
    id: 'da-107',
    track: 'app',
    title: 'Välj månader: slider',
    xp: 15,
    description:
      'Hur gick sommaren? Låt ägaren välja vilka månader som räknas.',
    explain:
      'En slider kan ha **två** handtag: ge den ett par som startvärde, så får du tillbaka två tal:\n\n```\nfran, till = st.slider("Månader", 1, 12, (1, 12))\n```\n\n`between(fran, till)` ger True för värden från och med `fran` till och med `till`.',
    example:
      'lag, hog = st.slider("Pris", 0, 100, (20, 50))\nst.write(lag, hog)',
    task: 'Uppgift: Gör en slider med etiketten `Månader` från 1 till 12, med hela året valt från början. Visa `st.metric("Intäkt", ...)` för de valda månaderna, t.ex. `487373 kr`.',
    starterCode: MONTHS + '\n# Skriv din kod här\n',
    solution:
      MONTHS +
      '\nfran, till = st.slider("Månader", 1, 12, (1, 12))\nvalda = df[df["manad"].between(fran, till)]\nst.metric("Intäkt", f"{valda[\'summa\'].sum()} kr")\n',
    files: KASSA,
    hints: [
      'fran, till = st.slider("Månader", 1, 12, (1, 12))',
      'valda = df[df["manad"].between(fran, till)]',
      "Inne i en f-sträng med dubbla citattecken: valda['summa'].sum()",
    ],
    tests: [
      {
        description: 'Hela året: 487373 kr',
        code: "__shown('metric')",
        expected: ['Intäkt: 487373 kr'],
      },
      {
        description: 'Juni till augusti: 119474 kr',
        code: "__shown('metric')",
        expected: ['Intäkt: 119474 kr'],
        widgets: { Månader: [6, 8] },
      },
    ],
  },
  {
    id: 'da-108',
    track: 'app',
    title: 'Ditt eget diagram: st.pyplot',
    xp: 15,
    description:
      'Streamlits egna diagram är enkla. Behöver du något mer kan du visa ett matplotlib-diagram i appen.',
    explain:
      'Rita som i bana 7, men med `plt.subplots()` så att du har figuren, och lämna den till Streamlit:\n\n```\nfig, ax = plt.subplots()\nax.hist(kvitton, bins=20)\nax.set_title("Kvittonas storlek")\nst.pyplot(fig)\n```',
    example:
      'import matplotlib.pyplot as plt\n\nfig, ax = plt.subplots()\nax.bar(["a", "b"], [1, 2])\nst.pyplot(fig)',
    task: 'Uppgift: Rita ett histogram med 20 fack över summan per kvitto, med titeln `Kvittonas storlek`, och visa det i appen med `st.pyplot`.',
    starterCode:
      'import matplotlib.pyplot as plt\n' +
      READ +
      'kvitton = df.groupby("kvitto")["summa"].sum()\n\n# Skriv din kod här\n',
    solution:
      'import matplotlib.pyplot as plt\n' +
      READ +
      'kvitton = df.groupby("kvitto")["summa"].sum()\n\nfig, ax = plt.subplots()\nax.hist(kvitton, bins=20)\nax.set_title("Kvittonas storlek")\nst.pyplot(fig)\n',
    files: KASSA,
    hints: [
      'fig, ax = plt.subplots()',
      'ax.hist(kvitton, bins=20) och ax.set_title("Kvittonas storlek")',
      'st.pyplot(fig)',
    ],
    tests: [
      {
        description: 'Diagrammet visas i appen med sin titel',
        code: "__shown('pyplot')",
        expected: ['Kvittonas storlek'],
      },
    ],
    sourceChecks: [
      { description: 'Använder st.pyplot', pattern: /st\.pyplot\(/ },
    ],
  },
  {
    id: 'da-109',
    track: 'app',
    title: 'Ordning på sidan: flikar',
    xp: 15,
    description: 'Sidan växer. Dela upp den i flikar, så hittar ägaren rätt.',
    explain:
      '`st.tabs(["A", "B"])` ger flikar, och du lägger saker i dem med `with`:\n\n```\nprodukter, tider = st.tabs(["Produkter", "Tider"])\nwith produkter:\n    st.bar_chart(...)\n```\n\nAllt som står indraget under `with` hamnar i den fliken.',
    example:
      'a, b = st.tabs(["Ett", "Två"])\nwith a:\n    st.write("Första")\nwith b:\n    st.write("Andra")',
    task: 'Uppgift: Gör två flikar, `Produkter` och `Tider`. I Produkter: staplar med antalet sålda per produkt. I Tider: staplar med antalet kunder per timme.',
    starterCode:
      READ +
      'df["timme"] = df["tid"].str[:2].astype("int64")\nper_produkt = df.groupby("produkt")["antal"].sum()\nper_timme = df.groupby("timme")["kvitto"].nunique()\n\n# Skriv din kod här\n',
    solution:
      READ +
      'df["timme"] = df["tid"].str[:2].astype("int64")\nper_produkt = df.groupby("produkt")["antal"].sum()\nper_timme = df.groupby("timme")["kvitto"].nunique()\n\nprodukter, tider = st.tabs(["Produkter", "Tider"])\nwith produkter:\n    st.bar_chart(per_produkt)\nwith tider:\n    st.bar_chart(per_timme)\n',
    files: KASSA,
    hints: [
      'produkter, tider = st.tabs(["Produkter", "Tider"])',
      'with produkter:\n    st.bar_chart(per_produkt)',
      'Och likadant med tider och per_timme.',
    ],
    tests: [
      {
        description: 'Två flikar: Produkter och Tider',
        code: "__element('tabs')['names']",
        expected: ['Produkter', 'Tider'],
      },
      {
        description: 'Ett diagram i varje',
        code: "__shown('bar_chart')",
        expected: ['diagram med 12 staplar', 'diagram med 11 staplar'],
      },
    ],
  },
];
