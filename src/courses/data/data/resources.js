// Andra sätt att lära sig banans ämnen, för den som kört fast.
// read: en sida i dokumentationen (på engelska). video: en sökning på
// YouTube, eftersom videor kan försvinna men sökningen finns kvar.
const PANDAS =
  'https://pandas.pydata.org/docs/getting_started/intro_tutorials/';

export const RESOURCES = {
  pandas: [
    {
      topic: 'Filtrera rader',
      read: `${PANDAS}03_subset_data.html`,
      video: 'pandas filter rows beginners',
    },
    {
      topic: 'groupby',
      read: `${PANDAS}06_calculate_statistics.html`,
      video: 'pandas groupby explained',
    },
  ],
  forsta: [
    {
      topic: 'Utforska en ny tabell',
      read: `${PANDAS}01_table_oriented.html`,
      video: 'pandas exploratory data analysis beginners',
    },
    {
      topic: 'describe och info',
      read: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.describe.html',
      video: 'pandas describe info explained',
    },
  ],
};
