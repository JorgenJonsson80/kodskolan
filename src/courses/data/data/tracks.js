// Banorna i ordning, se docs/kurser/data.md. reward är föremålet eleven
// får när banan är klar, och canBuild avslutar meningen "Nu kan du t.ex.
// bygga …" i firandet. Fylls på bana för bana.
const PANDAS = 'https://pandas.pydata.org/docs/';

export const TRACKS = [
  {
    id: 'pandas',
    title: 'pandas igen',
    teaches: ['read_csv', 'filtrera', 'sort_values', 'groupby'],
    reward: { emoji: '☕', name: 'Kaffekopp' },
    canBuild:
      'en topplista över vad kaféet säljer mest av och tjänar mest på, från en fil med tusentals kvitton',
    docs: [
      {
        title: 'pandas på tio minuter',
        url: `${PANDAS}user_guide/10min.html`,
      },
      {
        title: 'Välja och filtrera',
        url: `${PANDAS}getting_started/intro_tutorials/03_subset_data.html`,
      },
      {
        title: 'Gruppera och summera',
        url: `${PANDAS}getting_started/intro_tutorials/06_calculate_statistics.html`,
      },
    ],
  },
  {
    id: 'forsta',
    title: 'Första mötet',
    teaches: ['shape', 'dtypes', 'info', 'describe', 'unique'],
    reward: { emoji: '🔍', name: 'Förstoringsglas' },
    canBuild:
      'en faktaruta om vilken CSV-fil som helst på en minut, och veta vilka frågor den kan svara på innan du börjar räkna',
    docs: [
      {
        title: 'Hur ser tabellen ut?',
        url: `${PANDAS}getting_started/intro_tutorials/01_table_oriented.html`,
      },
      {
        title: 'describe',
        url: `${PANDAS}reference/api/pandas.DataFrame.describe.html`,
      },
    ],
  },
  {
    id: 'stada',
    title: 'Städa data',
    teaches: [
      'isna',
      'dropna',
      'fillna',
      'drop_duplicates',
      'to_numeric',
      'astype',
      '.str',
    ],
    reward: { emoji: '🧹', name: 'Kvast' },
    canBuild:
      'en ren tabell av en rörig export: tomma rader, dubbletter, priser som text och samma sak stavad på fem sätt',
    docs: [
      {
        title: 'Saknade värden',
        url: `${PANDAS}user_guide/missing_data.html`,
      },
      {
        title: 'Text i kolumner (.str)',
        url: `${PANDAS}user_guide/text.html`,
      },
    ],
  },
  {
    id: 'datum',
    title: 'Datum och tid',
    teaches: ['to_datetime', '.dt', 'strftime', 'resample'],
    reward: { emoji: '📅', name: 'Kalender' },
    canBuild:
      'svar på när-frågor: bästa månaden, veckodagen och timmen, vecka för vecka och rättvist jämfört',
    docs: [
      {
        title: 'Datum och tid i pandas',
        url: `${PANDAS}user_guide/timeseries.html`,
      },
      {
        title: 'Kom igång med datum',
        url: `${PANDAS}getting_started/intro_tutorials/09_timeseries.html`,
      },
    ],
  },
  {
    id: 'gruppera',
    title: 'Gruppera på riktigt',
    teaches: [
      'groupby med flera nycklar',
      'agg',
      'pivot_table',
      'crosstab',
      'andelar',
    ],
    reward: { emoji: '🧮', name: 'Kulram' },
    canBuild:
      'en månadsrapport med topplista, andelar och snittkvitto, och pivottabeller utan Excel',
    docs: [
      {
        title: 'Gruppera: split-apply-combine',
        url: `${PANDAS}user_guide/groupby.html`,
      },
      {
        title: 'pivot_table och crosstab',
        url: `${PANDAS}user_guide/reshaping.html`,
      },
    ],
  },
  {
    id: 'kombinera',
    title: 'Kombinera tabeller',
    teaches: ['merge', 'how="left"', 'concat', 'read_sql'],
    reward: { emoji: '🧩', name: 'Pusselbit' },
    canBuild:
      'svar som kräver flera källor: vinst med inköpspriser, försäljning mot vädret och data direkt ur en databas',
    docs: [
      {
        title: 'merge, join och concat',
        url: `${PANDAS}user_guide/merging.html`,
      },
      {
        title: 'Kombinera tabeller',
        url: `${PANDAS}getting_started/intro_tutorials/08_combine_dataframes.html`,
      },
    ],
  },
  {
    id: 'diagram',
    title: 'Diagram',
    teaches: ['plt.plot', 'plt.bar', 'plt.hist', 'plt.scatter', 'plt.subplots'],
    reward: { emoji: '📈', name: 'Diagram' },
    canBuild:
      'diagram som går att förstå utan att du står bredvid: rätt sort för frågan, sorterade, med titel och enheter',
    docs: [
      {
        title: 'Kom igång med pyplot',
        url: 'https://matplotlib.org/stable/tutorials/pyplot.html',
      },
      {
        title: 'Diagram från pandas',
        url: `${PANDAS}getting_started/intro_tutorials/04_plotting.html`,
      },
    ],
  },
  {
    id: 'statistik',
    title: 'Statistik',
    teaches: ['median', 'std', 'quantile', 'corr', 'rolling', 'numpy'],
    reward: { emoji: '🎲', name: 'Tärning' },
    canBuild:
      'svar på hur vanligt, hur säkert och hur ovanligt: medianer, spridning, percentiler och dagar som verkligen sticker ut',
    docs: [
      {
        title: 'Statistik i pandas',
        url: `${PANDAS}getting_started/intro_tutorials/06_calculate_statistics.html`,
      },
      {
        title: 'numpy för nybörjare',
        url: 'https://numpy.org/doc/stable/user/absolute_beginners.html',
      },
    ],
  },
  {
    id: 'beratta',
    title: 'Berätta med data',
    teaches: [
      'rätt diagram',
      'rättvisa jämförelser',
      'orsak och samband',
      'slutsatser',
    ],
    reward: { emoji: '📣', name: 'Megafon' },
    canBuild:
      'slutsatser som håller: rätt diagram, rättvisa jämförelser, ärliga om osäkerheten och utan fällorna som lurar läsaren',
    docs: [
      {
        title: 'Välja diagram (Data Viz Project)',
        url: 'https://datavizproject.com/',
      },
      {
        title: 'Diagram som lurar (Calling Bullshit)',
        url: 'https://callingbullshit.org/tools/tools_misleading_axes.html',
      },
    ],
  },
  {
    id: 'slutprojekt',
    title: 'Slutprojektet',
    teaches: ['hela analysen'],
    reward: { emoji: '🏆', name: 'Pokal' },
    canBuild:
      'en hel analys av en fil du aldrig sett: läsa in, städa, räkna, jämföra, rita och skriva slutsatsen',
    docs: [
      {
        title: 'read_csv och alla dess argument',
        url: `${PANDAS}reference/api/pandas.read_csv.html`,
      },
      {
        title: 'pandas kokbok',
        url: `${PANDAS}user_guide/cookbook.html`,
      },
    ],
  },
  {
    id: 'app',
    title: 'Från analys till app',
    teaches: [
      'streamlit',
      'st.metric',
      'st.bar_chart',
      'selectbox',
      'slider',
      'st.pyplot',
    ],
    reward: { emoji: '🚀', name: 'Raket' },
    canBuild:
      'en dashboard som andra kan använda själva: nyckeltal, diagram och filter, uppdaterad med ny data',
    docs: [
      {
        title: 'Streamlit: kom igång',
        url: 'https://docs.streamlit.io/get-started',
      },
      {
        title: 'Diagram i Streamlit',
        url: 'https://docs.streamlit.io/develop/api-reference/charts',
      },
    ],
  },
];
