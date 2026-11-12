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
  stada: [
    {
      topic: 'Saknade värden',
      read: 'https://pandas.pydata.org/docs/user_guide/missing_data.html',
      video: 'pandas missing values dropna fillna',
    },
    {
      topic: 'Städa text',
      read: 'https://pandas.pydata.org/docs/user_guide/text.html',
      video: 'pandas data cleaning beginners',
    },
  ],
  datum: [
    {
      topic: 'Datum i pandas',
      read: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/09_timeseries.html',
      video: 'pandas datetime tutorial beginners',
    },
    {
      topic: 'resample',
      read: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.resample.html',
      video: 'pandas resample explained',
    },
  ],
  gruppera: [
    {
      topic: 'groupby och agg',
      read: 'https://pandas.pydata.org/docs/user_guide/groupby.html',
      video: 'pandas groupby agg multiple columns',
    },
    {
      topic: 'pivot_table',
      read: 'https://pandas.pydata.org/docs/user_guide/reshaping.html',
      video: 'pandas pivot table tutorial',
    },
  ],
  kombinera: [
    {
      topic: 'merge',
      read: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/08_combine_dataframes.html',
      video: 'pandas merge tutorial left join',
    },
    {
      topic: 'SQL i pandas',
      read: 'https://pandas.pydata.org/docs/reference/api/pandas.read_sql.html',
      video: 'pandas read_sql sqlite3 tutorial',
    },
  ],
  diagram: [
    {
      topic: 'Kom igång med matplotlib',
      read: 'https://matplotlib.org/stable/tutorials/pyplot.html',
      video: 'matplotlib tutorial beginners',
    },
    {
      topic: 'Flera diagram i en figur',
      read: 'https://matplotlib.org/stable/gallery/subplots_axes_and_figures/subplots_demo.html',
      video: 'matplotlib subplots explained',
    },
  ],
  statistik: [
    {
      topic: 'Medel, median och spridning',
      read: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/06_calculate_statistics.html',
      video: 'mean median standard deviation explained',
    },
    {
      topic: 'Korrelation',
      read: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.corr.html',
      video: 'correlation explained simply statistics',
    },
  ],
  beratta: [
    {
      topic: 'Diagram som lurar',
      read: 'https://callingbullshit.org/tools/tools_misleading_axes.html',
      video: 'misleading graphs explained',
    },
    {
      topic: 'Korrelation och orsak',
      read: 'https://www.tylervigen.com/spurious-correlations',
      video: 'correlation does not imply causation explained',
    },
  ],
};
