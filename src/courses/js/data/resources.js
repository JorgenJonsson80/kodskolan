// Andra sätt att lära sig banans ämnen, för den som kört fast.
// read: ett kapitel på javascript.info, som ofta förklarar lugnare än MDN.
// video: en sökning på YouTube. Vi länkar till en sökning i stället för
// enskilda videor, eftersom videor kan försvinna men sökningen finns kvar.
const info = path => `https://javascript.info/${path}`;

export const resources = {
  'js-basics': [
    {
      topic: 'console.log',
      read: info('hello-world'),
      video: 'javascript console.log for beginners',
    },
    {
      topic: 'Variabler och datatyper',
      read: info('variables'),
      video: 'javascript let const variables explained',
    },
    {
      topic: 'if och else',
      read: info('ifelse'),
      video: 'javascript if else explained',
    },
    {
      topic: 'Loopar',
      read: info('while-for'),
      video: 'javascript for loop explained',
    },
  ],
  arrays: [
    {
      topic: 'Arrayer',
      read: info('array'),
      video: 'javascript arrays for beginners',
    },
    {
      topic: 'Objekt',
      read: info('object'),
      video: 'javascript objects explained',
    },
  ],
  functions: [
    {
      topic: 'Funktioner',
      read: info('function-basics'),
      video: 'javascript functions for beginners',
    },
    {
      topic: 'Arrow functions',
      read: info('arrow-functions-basics'),
      video: 'javascript arrow functions explained',
    },
    {
      topic: 'Standardvärden',
      read: info('function-basics'),
      video: 'javascript default parameters',
    },
  ],
  strings: [
    {
      topic: 'Strängar',
      read: info('string'),
      video: 'javascript string methods',
    },
    {
      topic: '=== och ==',
      read: info('comparison'),
      video: 'javascript == vs ===',
    },
    {
      topic: 'Truthy och falsy',
      read: info('logical-operators'),
      video: 'javascript truthy falsy explained',
    },
    {
      topic: '??',
      read: info('nullish-coalescing-operator'),
      video: 'javascript nullish coalescing operator',
    },
    {
      topic: '?.',
      read: info('optional-chaining'),
      video: 'javascript optional chaining',
    },
  ],
  'array-methods': [
    {
      topic: 'map, filter och find',
      read: info('array-methods'),
      video: 'javascript map filter find explained',
    },
    {
      topic: 'reduce',
      read: info('array-methods'),
      video: 'javascript reduce explained',
    },
  ],
  'modern-js': [
    {
      topic: 'Destructuring',
      read: info('destructuring-assignment'),
      video: 'javascript destructuring explained',
    },
    {
      topic: 'Spread och rest',
      read: info('rest-parameters-spread'),
      video: 'javascript spread rest operator',
    },
    {
      topic: '? : och &&',
      read: info('ifelse'),
      video: 'javascript ternary operator',
    },
  ],
  immutable: [
    {
      topic: 'Kopiera i stället för att ändra',
      read: info('object-copy'),
      video: 'javascript immutability explained',
    },
    {
      topic: 'Object.entries',
      read: info('keys-values-entries'),
      video: 'javascript Object.entries',
    },
    {
      topic: 'Closures',
      read: info('closure'),
      video: 'javascript closures explained',
    },
  ],
  modules: [
    {
      topic: 'Moduler',
      read: info('modules-intro'),
      video: 'javascript modules import export',
    },
    {
      topic: 'import och export',
      read: info('import-export'),
      video: 'javascript import export explained',
    },
  ],
  async: [
    {
      topic: 'Promises',
      read: info('promise-basics'),
      video: 'javascript promises explained',
    },
    {
      topic: 'async och await',
      read: info('async-await'),
      video: 'javascript async await explained',
    },
    {
      topic: 'fetch',
      read: info('fetch'),
      video: 'javascript fetch api tutorial',
    },
    {
      topic: 'Promise.all',
      read: info('promise-api'),
      video: 'javascript Promise.all',
    },
  ],
  'debug-js': [
    {
      topic: 'Felsöka i webbläsaren',
      read: info('debugging-chrome'),
      video: 'javascript debugging for beginners',
    },
    {
      topic: 'Fel och try...catch',
      read: info('try-catch'),
      video: 'javascript try catch explained',
    },
  ],
  jsx: [
    {
      topic: 'JSX och komponenter',
      video: 'react jsx explained for beginners',
    },
  ],
  props: [{ topic: 'Props', video: 'react props explained' }],
  lists: [{ topic: 'Listor och keys', video: 'react rendering lists map key' }],
  conditionals: [
    { topic: 'Villkorlig rendering', video: 'react conditional rendering' },
  ],
  state: [
    { topic: 'useState', video: 'react useState explained' },
    { topic: 'Händelser', video: 'react onClick event handling' },
  ],
  lifting: [{ topic: 'Lyfta state', video: 'react lifting state up' }],
  effects: [{ topic: 'useEffect', video: 'react useEffect explained' }],
  data: [{ topic: 'Hämta data', video: 'react fetch data useEffect' }],
  'debug-react': [
    { topic: 'Vanliga React-buggar', video: 'common react mistakes beginners' },
  ],
  forms: [
    { topic: 'Formulär i React', video: 'react forms controlled inputs' },
  ],
  reducer: [{ topic: 'useReducer', video: 'react useReducer explained' }],
  context: [{ topic: 'Context', video: 'react useContext tutorial' }],
  hooks: [{ topic: 'Egna hooks', video: 'react custom hooks tutorial' }],
  performance: [
    {
      topic: 'memo, useMemo och useCallback',
      video: 'react memo usememo usecallback explained',
    },
  ],
  'react-final': [
    { topic: 'Bygga en hel app', video: 'react project tutorial beginners' },
  ],
};
