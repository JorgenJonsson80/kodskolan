// Andra sätt att lära sig banans ämnen, för den som kört fast.
// read: ett avsnitt i Pythons egen guide (på engelska).
// video: en sökning på YouTube. Vi länkar till en sökning i stället för
// enskilda videor, eftersom videor kan försvinna men sökningen finns kvar.
const TUTORIAL = 'https://docs.python.org/3/tutorial/';

export const RESOURCES = {
  grunder: [
    {
      topic: 'print och variabler',
      read: `${TUTORIAL}introduction.html`,
      video: 'python print variabler nybörjare',
    },
    {
      topic: 'input och int',
      read: 'https://docs.python.org/3/library/functions.html#input',
      video: 'python input int beginners',
    },
    {
      topic: 'if, elif och else',
      read: `${TUTORIAL}controlflow.html#if-statements`,
      video: 'python if elif else explained',
    },
  ],
  loopar: [
    {
      topic: 'for och range',
      read: `${TUTORIAL}controlflow.html#for-statements`,
      video: 'python for loop range explained',
    },
    {
      topic: 'while och break',
      read: `${TUTORIAL}controlflow.html#break-and-continue-statements`,
      video: 'python while loop break beginners',
    },
  ],
  listor: [
    {
      topic: 'Listor',
      read: `${TUTORIAL}introduction.html#lists`,
      video: 'python lists for beginners',
    },
    {
      topic: 'Listmetoder',
      read: `${TUTORIAL}datastructures.html#more-on-lists`,
      video: 'python list methods append remove pop',
    },
  ],
  funktioner: [
    {
      topic: 'def och return',
      read: `${TUTORIAL}controlflow.html#defining-functions`,
      video: 'python functions def return explained',
    },
    {
      topic: 'Parametrar och standardvärden',
      read: `${TUTORIAL}controlflow.html#default-argument-values`,
      video: 'python function parameters default values',
    },
  ],
  strangar: [
    {
      topic: 'f-strängar',
      read: `${TUTORIAL}inputoutput.html#formatted-string-literals`,
      video: 'python f-strings beginners',
    },
    {
      topic: 'Index och skivor',
      read: `${TUTORIAL}introduction.html#text`,
      video: 'python string slicing explained',
    },
    {
      topic: 'Textmetoder',
      read: 'https://docs.python.org/3/library/stdtypes.html#string-methods',
      video: 'python string methods split join strip',
    },
  ],
  dictionaries: [
    {
      topic: 'Dictionaries',
      read: `${TUTORIAL}datastructures.html#dictionaries`,
      video: 'python dictionary beginners',
    },
    {
      topic: 'Tupler',
      read: `${TUTORIAL}datastructures.html#tuples-and-sequences`,
      video: 'python tuples explained',
    },
  ],
  smidigare: [
    {
      topic: 'List comprehensions',
      read: `${TUTORIAL}datastructures.html#list-comprehensions`,
      video: 'python list comprehension beginners',
    },
    {
      topic: 'enumerate och zip',
      read: `${TUTORIAL}datastructures.html#looping-techniques`,
      video: 'python enumerate zip explained',
    },
    {
      topic: 'sorted med key och lambda',
      read: 'https://docs.python.org/3/howto/sorting.html',
      video: 'python sorted key lambda',
    },
  ],
  undantag: [
    {
      topic: 'try och except',
      read: `${TUTORIAL}errors.html#handling-exceptions`,
      video: 'python try except beginners',
    },
    {
      topic: 'raise',
      read: `${TUTORIAL}errors.html#raising-exceptions`,
      video: 'python raise exception explained',
    },
  ],
  moduler: [
    {
      topic: 'import och moduler',
      read: `${TUTORIAL}modules.html`,
      video: 'python import modules beginners',
    },
    {
      topic: 'random',
      read: 'https://docs.python.org/3/library/random.html',
      video: 'python random module beginners',
    },
    {
      topic: 'datetime',
      read: 'https://docs.python.org/3/library/datetime.html',
      video: 'python datetime date timedelta beginners',
    },
  ],
  klasser: [
    {
      topic: 'class och __init__',
      read: `${TUTORIAL}classes.html#a-first-look-at-classes`,
      video: 'python classes and objects beginners',
    },
    {
      topic: 'self och metoder',
      read: `${TUTORIAL}classes.html#method-objects`,
      video: 'python self explained beginners',
    },
  ],
  felsokning: [
    {
      topic: 'Läsa felmeddelanden',
      read: `${TUTORIAL}errors.html`,
      video: 'how to read python traceback beginners',
    },
    {
      topic: 'assert',
      read: 'https://docs.python.org/3/reference/simple_stmts.html#the-assert-statement',
      video: 'python assert statement beginners',
    },
  ],
  pandas: [
    {
      topic: 'DataFrame och read_csv',
      read: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/02_read_write.html',
      video: 'pandas tutorial beginners read csv',
    },
    {
      topic: 'Filtrera rader',
      read: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/03_subset_data.html',
      video: 'pandas filter rows beginners',
    },
    {
      topic: 'groupby',
      read: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/06_calculate_statistics.html',
      video: 'pandas groupby explained',
    },
  ],
  slutprojekt: [
    {
      topic: 'Filer med open och with',
      read: `${TUTORIAL}inputoutput.html#reading-and-writing-files`,
      video: 'python read write files beginners',
    },
    {
      topic: 'Planera ett större program',
      read: `${TUTORIAL}controlflow.html#defining-functions`,
      video: 'python text adventure game beginners',
    },
  ],
  streamlit: [
    {
      topic: 'Streamlit från början',
      read: 'https://docs.streamlit.io/get-started/fundamentals/main-concepts',
      video: 'streamlit tutorial beginners',
    },
    {
      topic: 'Widgetar och session state',
      read: 'https://docs.streamlit.io/develop/concepts/architecture/session-state',
      video: 'streamlit session state explained',
    },
    {
      topic: 'Dashboards med pandas',
      read: 'https://docs.streamlit.io/develop/api-reference/charts',
      video: 'streamlit dashboard pandas tutorial',
    },
  ],
};
