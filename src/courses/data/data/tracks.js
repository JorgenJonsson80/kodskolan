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
];
