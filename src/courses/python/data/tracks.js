// Banorna i ordning. `teaches` används av kvalitetstestet senare: facit får
// inte använda något före sin bana. reward är föremålet eleven får när
// banan är klar, och canBuild avslutar meningen "Nu kan du t.ex. bygga …"
// i firandet. docs länkar till Pythons egen guide för den som vill
// läsa mer.
const TUTORIAL = 'https://docs.python.org/3/tutorial/';

export const TRACKS = [
  {
    id: 'grunder',
    title: 'Grunderna i Python',
    teaches: ['print', 'input', 'if'],
    reward: { emoji: '🧸', name: 'Nalle' },
    canBuild:
      'ett program som frågar vad någon heter och hur gammal hen är, och svarar olika beroende på svaret',
    docs: [
      { title: 'Python som miniräknare', url: `${TUTORIAL}introduction.html` },
      {
        title: 'input()',
        url: 'https://docs.python.org/3/library/functions.html#input',
      },
      { title: 'if-satser', url: `${TUTORIAL}controlflow.html#if-statements` },
    ],
  },
  {
    id: 'loopar',
    title: 'Loopar',
    teaches: ['for', 'range', 'while', 'break'],
    reward: { emoji: '🎒', name: 'Ryggsäck' },
    canBuild:
      'en gissningslek som frågar tills svaret är rätt, eller en hel gångertabell',
    docs: [
      {
        title: 'for-loopar',
        url: `${TUTORIAL}controlflow.html#for-statements`,
      },
      {
        title: 'range()',
        url: `${TUTORIAL}controlflow.html#the-range-function`,
      },
      {
        title: 'break',
        url: `${TUTORIAL}controlflow.html#break-and-continue-statements`,
      },
    ],
  },
  {
    id: 'listor',
    title: 'Listor',
    teaches: ['list', 'append', 'len', 'in'],
    reward: { emoji: '🧺', name: 'Korg' },
    canBuild: 'en att göra-lista eller en topplista som räknar ut medelvärdet',
    docs: [
      { title: 'Listor', url: `${TUTORIAL}introduction.html#lists` },
      {
        title: 'Mer om listor',
        url: `${TUTORIAL}datastructures.html#more-on-lists`,
      },
    ],
  },
  {
    id: 'funktioner',
    title: 'Funktioner',
    teaches: ['def', 'return'],
    reward: { emoji: '🧰', name: 'Verktygslåda' },
    canBuild:
      'en miniräknare eller ett poängsystem av små funktioner som går att använda om och om igen',
    docs: [
      {
        title: 'Att skapa funktioner',
        url: `${TUTORIAL}controlflow.html#defining-functions`,
      },
      {
        title: 'Standardvärden',
        url: `${TUTORIAL}controlflow.html#default-argument-values`,
      },
    ],
  },
  {
    id: 'strangar',
    title: 'Strängar',
    teaches: ['f-strängar', 'slicing', 'split', 'join'],
    reward: { emoji: '🧶', name: 'Garnnystan' },
    canBuild:
      'en palindromkoll, en ordräknare eller ett snyggt kvitto med f-strängar',
    docs: [
      { title: 'Text', url: `${TUTORIAL}introduction.html#text` },
      {
        title: 'f-strängar',
        url: `${TUTORIAL}inputoutput.html#formatted-string-literals`,
      },
      {
        title: 'Alla textmetoder',
        url: 'https://docs.python.org/3/library/stdtypes.html#string-methods',
      },
    ],
  },
  {
    id: 'dictionaries',
    title: 'Dictionaries och tupler',
    teaches: ['dict', 'items', 'tuple'],
    reward: { emoji: '📒', name: 'Uppslagsbok' },
    canBuild:
      'en telefonbok, ett glosförhör eller ett lager där varje vara har sitt antal',
    docs: [
      {
        title: 'Dictionaries',
        url: `${TUTORIAL}datastructures.html#dictionaries`,
      },
      {
        title: 'Tupler',
        url: `${TUTORIAL}datastructures.html#tuples-and-sequences`,
      },
      {
        title: 'Loopa i dictionaries',
        url: `${TUTORIAL}datastructures.html#looping-techniques`,
      },
    ],
  },
  {
    id: 'smidigare',
    title: 'Smidigare Python',
    teaches: ['comprehension', 'enumerate', 'zip', 'sorted', 'lambda'],
    reward: { emoji: '🪄', name: 'Trollstav' },
    canBuild:
      'en topplista som sorterar på vad du vill, med kortare och tydligare kod',
    docs: [
      {
        title: 'List comprehensions',
        url: `${TUTORIAL}datastructures.html#list-comprehensions`,
      },
      {
        title: 'enumerate och zip',
        url: `${TUTORIAL}datastructures.html#looping-techniques`,
      },
      {
        title: 'Sortera med key',
        url: 'https://docs.python.org/3/howto/sorting.html',
      },
      {
        title: 'lambda',
        url: `${TUTORIAL}controlflow.html#lambda-expressions`,
      },
    ],
  },
  {
    id: 'undantag',
    title: 'Fel och undantag',
    teaches: ['try', 'except', 'raise'],
    reward: { emoji: '🪖', name: 'Hjälm' },
    canBuild:
      'en bankomat eller ett formulär som aldrig kraschar, vad användaren än skriver',
    docs: [
      { title: 'Fel och undantag', url: `${TUTORIAL}errors.html` },
      {
        title: 'Fånga fel med try',
        url: `${TUTORIAL}errors.html#handling-exceptions`,
      },
      {
        title: 'Skapa fel med raise',
        url: `${TUTORIAL}errors.html#raising-exceptions`,
      },
      {
        title: 'Pythons inbyggda fel',
        url: 'https://docs.python.org/3/library/exceptions.html',
      },
    ],
  },
  {
    id: 'moduler',
    title: 'Moduler',
    teaches: ['import', 'random', 'math', 'datetime'],
    reward: { emoji: '🔧', name: 'Skiftnyckel' },
    canBuild:
      'ett tärningsspel, en lösenordsgenerator eller en nedräkning till sommarlovet',
    docs: [
      { title: 'Moduler och import', url: `${TUTORIAL}modules.html` },
      {
        title: 'random – slump',
        url: 'https://docs.python.org/3/library/random.html',
      },
      {
        title: 'math – matematik',
        url: 'https://docs.python.org/3/library/math.html',
      },
      {
        title: 'datetime – datum och tid',
        url: 'https://docs.python.org/3/library/datetime.html',
      },
    ],
  },
  {
    id: 'klasser',
    title: 'Klasser',
    teaches: ['class', '__init__', 'self'],
    reward: { emoji: '🏗️', name: 'Byggkran' },
    canBuild:
      'ett husdjur i datorn, ett bankkonto eller en kortlek – saker som har både egna värden och egna metoder',
    docs: [
      { title: 'Klasser', url: `${TUTORIAL}classes.html` },
      {
        title: 'Klasser och objekt',
        url: `${TUTORIAL}classes.html#a-first-look-at-classes`,
      },
      {
        title: 'Attribut för varje objekt',
        url: `${TUTORIAL}classes.html#class-and-instance-variables`,
      },
    ],
  },
  {
    id: 'felsokning',
    title: 'Felsökning',
    teaches: ['traceback', 'assert'],
    reward: { emoji: '🔦', name: 'Ficklampa' },
    canBuild:
      'program som du själv kan laga när de går sönder – du läser felmeddelandet, stegar rad för rad och testar med assert',
    docs: [
      { title: 'Fel och felmeddelanden', url: `${TUTORIAL}errors.html` },
      {
        title: 'assert',
        url: 'https://docs.python.org/3/reference/simple_stmts.html#the-assert-statement',
      },
      {
        title: 'Vanliga frågor om Python-kod',
        url: 'https://docs.python.org/3/faq/programming.html',
      },
    ],
  },
  {
    id: 'pandas',
    title: 'Data med pandas',
    teaches: ['pandas', 'DataFrame', 'groupby'],
    reward: { emoji: '🐼', name: 'Panda' },
    canBuild:
      'en rapport från en riktig CSV- eller Excel-fil: summor, topplistor och vad som säljer bäst – utan en enda formel i Excel',
    docs: [
      {
        title: 'pandas på tio minuter',
        url: 'https://pandas.pydata.org/docs/user_guide/10min.html',
      },
      {
        title: 'Läsa in data',
        url: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/02_read_write.html',
      },
      {
        title: 'Filtrera rader',
        url: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/03_subset_data.html',
      },
      {
        title: 'Gruppera och summera',
        url: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/06_calculate_statistics.html',
      },
    ],
  },
  {
    id: 'slutprojekt',
    title: 'Slutprojektet',
    teaches: ['open', 'with'],
    reward: { emoji: '🎓', name: 'Studentmössa' },
    canBuild:
      'precis vad du vill – ett spel, ett verktyg eller en analys, planerat i funktioner och klasser och sparat i filer',
    docs: [
      {
        title: 'Läsa och skriva filer',
        url: `${TUTORIAL}inputoutput.html#reading-and-writing-files`,
      },
      {
        title: 'Pythons standardbibliotek',
        url: 'https://docs.python.org/3/library/index.html',
      },
      {
        title: 'PEP 8 – hur Python-kod brukar se ut',
        url: 'https://peps.python.org/pep-0008/',
      },
    ],
  },
  {
    id: 'streamlit',
    title: 'Webbappar med Streamlit',
    teaches: ['streamlit', 'st.session_state'],
    reward: { emoji: '🎈', name: 'Ballong' },
    canBuild:
      'en riktig webbapp: en dashboard med filter och diagram, en kalkylator eller ett spel som andra kan använda i webbläsaren',
    docs: [
      {
        title: 'Streamlit – grunderna',
        url: 'https://docs.streamlit.io/get-started/fundamentals/main-concepts',
      },
      {
        title: 'Alla st-funktioner',
        url: 'https://docs.streamlit.io/develop/api-reference',
      },
      {
        title: 'Session state',
        url: 'https://docs.streamlit.io/develop/concepts/architecture/session-state',
      },
    ],
  },
];
