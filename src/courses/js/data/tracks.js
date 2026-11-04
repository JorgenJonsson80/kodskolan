// reward: föremålet eleven får till sin samling när banan är klar.
// docs: länkar till MDN (JavaScript) och react.dev för den som vill läsa mer.
export const tracks = [
  {
    id: 'js-basics',
    title: 'Grunderna i JavaScript',
    reward: { emoji: '🧸', name: 'Nalle' },
    docs: [
      {
        title: 'console.log',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/console/log_static',
      },
      {
        title: 'Variabler och datatyper',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types',
      },
      {
        title: 'if och else',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling',
      },
      {
        title: 'Loopar',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration',
      },
    ],
  },
  {
    id: 'arrays',
    title: 'Arrayer & objekt',
    reward: { emoji: '🎒', name: 'Ryggsäck' },
    docs: [
      {
        title: 'Arrayer',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
      },
      {
        title: 'Objekt',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects',
      },
    ],
  },
  {
    id: 'functions',
    title: 'Funktioner',
    reward: { emoji: '🛹', name: 'Skateboard' },
    docs: [
      {
        title: 'Funktioner',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions',
      },
      {
        title: 'Arrow functions',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions',
      },
      {
        title: 'Standardvärden för parametrar',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters',
      },
    ],
  },
  {
    id: 'strings',
    title: 'Strängar & jämförelser',
    reward: { emoji: '🔤', name: 'Bokstavsklossar' },
    docs: [
      {
        title: 'Strängar och deras metoder',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String',
      },
      {
        title: 'Template literals',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals',
      },
      {
        title: '=== och ==',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness',
      },
      {
        title: 'Falsy-värden',
        url: 'https://developer.mozilla.org/en-US/docs/Glossary/Falsy',
      },
      {
        title: '?? (nullish coalescing)',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing',
      },
      {
        title: '?. (optional chaining)',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining',
      },
    ],
  },
  {
    id: 'array-methods',
    title: 'Array-metoder',
    reward: { emoji: '🎧', name: 'Hörlurar' },
    docs: [
      {
        title: 'map',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
      },
      {
        title: 'filter',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
      },
      {
        title: 'find',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find',
      },
      {
        title: 'reduce',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
      },
    ],
  },
  {
    id: 'modern-js',
    title: 'Modern JS för React',
    reward: { emoji: '☕', name: 'Kaffekopp' },
    docs: [
      {
        title: 'Destructuring',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring',
      },
      {
        title: 'Spread',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax',
      },
      {
        title: 'Rest-parametrar',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters',
      },
      {
        title: '? : (villkorsoperatorn)',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator',
      },
      {
        title: '&& (logiskt och)',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND',
      },
    ],
  },
  {
    id: 'immutable',
    title: 'Data utan mutation',
    reward: { emoji: '🧊', name: 'Isbit' },
    docs: [
      {
        title: 'some',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some',
      },
      {
        title: 'toSorted',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted',
      },
      {
        title: 'Object.entries',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries',
      },
      {
        title: 'Closures',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures',
      },
      {
        title: 'Uppdatera arrayer i state',
        url: 'https://react.dev/learn/updating-arrays-in-state',
      },
    ],
  },
  {
    id: 'modules',
    title: 'Moduler: import & export',
    reward: { emoji: '🪪', name: 'Passerkort' },
    docs: [
      {
        title: 'Moduler',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules',
      },
      {
        title: 'import',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import',
      },
      {
        title: 'export',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export',
      },
      {
        title: 'Importera och exportera komponenter',
        url: 'https://react.dev/learn/importing-and-exporting-components',
      },
    ],
  },
  {
    id: 'async',
    title: 'Async: Promises & fetch',
    reward: { emoji: '⏳', name: 'Timglas' },
    docs: [
      {
        title: 'Promises',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises',
      },
      {
        title: 'async function',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function',
      },
      {
        title: 'fetch',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
      },
      {
        title: 'Promise.all',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all',
      },
    ],
  },
  {
    id: 'debug-js',
    title: 'Felsökning: JavaScript',
    reward: { emoji: '🔍', name: 'Förstoringsglas' },
    docs: [
      {
        title: 'Hitta och rätta fel i JavaScript',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong',
      },
      {
        title: 'Vanliga felmeddelanden',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors',
      },
    ],
  },
  {
    id: 'jsx',
    title: 'React: JSX',
    reward: { emoji: '💻', name: 'Laptop' },
    docs: [
      {
        title: 'Skriva JSX',
        url: 'https://react.dev/learn/writing-markup-with-jsx',
      },
      {
        title: 'JavaScript i JSX med { }',
        url: 'https://react.dev/learn/javascript-in-jsx-with-curly-braces',
      },
      {
        title: 'Din första komponent',
        url: 'https://react.dev/learn/your-first-component',
      },
    ],
  },
  {
    id: 'props',
    title: 'React: Komponenter & props',
    reward: { emoji: '🧩', name: 'Pusselbit' },
    docs: [
      {
        title: 'Skicka props till en komponent',
        url: 'https://react.dev/learn/passing-props-to-a-component',
      },
    ],
  },
  {
    id: 'lists',
    title: 'React: Listor',
    reward: { emoji: '📋', name: 'Checklista' },
    docs: [
      {
        title: 'Rendera listor',
        url: 'https://react.dev/learn/rendering-lists',
      },
    ],
  },
  {
    id: 'conditionals',
    title: 'React: Villkor',
    reward: { emoji: '🚦', name: 'Trafikljus' },
    docs: [
      {
        title: 'Villkorlig rendering',
        url: 'https://react.dev/learn/conditional-rendering',
      },
    ],
  },
  {
    id: 'state',
    title: 'React: State & händelser',
    reward: { emoji: '🎮', name: 'Handkontroll' },
    docs: [
      {
        title: 'Reagera på händelser',
        url: 'https://react.dev/learn/responding-to-events',
      },
      {
        title: 'State: en komponents minne',
        url: 'https://react.dev/learn/state-a-components-memory',
      },
      {
        title: 'Uppdatera objekt i state',
        url: 'https://react.dev/learn/updating-objects-in-state',
      },
      {
        title: 'Uppdatera arrayer i state',
        url: 'https://react.dev/learn/updating-arrays-in-state',
      },
      { title: 'useState', url: 'https://react.dev/reference/react/useState' },
    ],
  },
  {
    id: 'lifting',
    title: 'React: Lyfta state',
    reward: { emoji: '🤝', name: 'Handslag' },
    docs: [
      {
        title: 'Dela state mellan komponenter',
        url: 'https://react.dev/learn/sharing-state-between-components',
      },
      {
        title: 'Välj hur state ska se ut',
        url: 'https://react.dev/learn/choosing-the-state-structure',
      },
    ],
  },
  {
    id: 'effects',
    title: 'React: Effekter',
    reward: { emoji: '⏰', name: 'Väckarklocka' },
    docs: [
      {
        title: 'Synkronisera med effekter',
        url: 'https://react.dev/learn/synchronizing-with-effects',
      },
      {
        title: 'Du kanske inte behöver en effekt',
        url: 'https://react.dev/learn/you-might-not-need-an-effect',
      },
      {
        title: 'Effekters livscykel',
        url: 'https://react.dev/learn/lifecycle-of-reactive-effects',
      },
      {
        title: 'useEffect',
        url: 'https://react.dev/reference/react/useEffect',
      },
    ],
  },
  {
    id: 'data',
    title: 'React: Hämta data',
    reward: { emoji: '📡', name: 'Antenn' },
    docs: [
      {
        title: 'Hämta data i en effekt',
        url: 'https://react.dev/learn/synchronizing-with-effects',
      },
      {
        title: 'Du kanske inte behöver en effekt',
        url: 'https://react.dev/learn/you-might-not-need-an-effect',
      },
    ],
  },
  {
    id: 'debug-react',
    title: 'Felsökning: React',
    reward: { emoji: '🐞', name: 'Nyckelpiga' },
    docs: [
      {
        title: 'Uppdatera arrayer i state',
        url: 'https://react.dev/learn/updating-arrays-in-state',
      },
      {
        title: 'Flera state-uppdateringar i rad',
        url: 'https://react.dev/learn/queueing-a-series-of-state-updates',
      },
      {
        title: 'Keys i listor',
        url: 'https://react.dev/learn/rendering-lists',
      },
    ],
  },
];
