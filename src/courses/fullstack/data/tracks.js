// Banorna i ordning. reward är föremålet eleven får när banan är klar, och
// canBuild avslutar meningen "Nu kan du t.ex. bygga …" i firandet.
const FLASK = 'https://flask.palletsprojects.com/en/stable/';
const REACT = 'https://react.dev/';

export const TRACKS = [
  {
    id: 'api',
    title: 'API:t',
    teaches: [
      'JSON till en sida',
      '/api/…',
      'fel som JSON',
      '201, 400, 404, 409',
      'session',
    ],
    reward: { emoji: '🔧', name: 'Skiftnyckel' },
    canBuild:
      'ett API som en riktig sida kan hämta från, skicka till och logga in mot',
    docs: [
      { title: 'APIs with JSON', url: `${FLASK}quickstart/#apis-with-json` },
      { title: 'Handling Application Errors', url: `${FLASK}errorhandling/` },
    ],
  },
  {
    id: 'sidan',
    title: 'Sidan',
    teaches: [
      'typen för svaret',
      'fetch i useEffect',
      'laddar och fel',
      'POST med JSON',
      'Svar<T>',
    ],
    reward: { emoji: '🪟', name: 'Fönster' },
    canBuild:
      'en React-sida i TypeScript som hämtar, visar och skickar data till ett API',
    docs: [
      {
        title: 'Synchronizing with Effects',
        url: `${REACT}learn/synchronizing-with-effects`,
      },
      {
        title: 'Using the Fetch API (MDN)',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
      },
    ],
  },
  {
    id: 'ihop',
    title: 'Ihop',
    teaches: [
      'ett nytt fält hela vägen',
      'filter',
      'inloggning',
      'en hel funktion',
    ],
    reward: { emoji: '🌉', name: 'Bro' },
    canBuild:
      'en hel app där sidan och API:t växer tillsammans, en funktion i taget',
    docs: [
      {
        title: 'Flask: The Request Object',
        url: `${FLASK}quickstart/#the-request-object`,
      },
      {
        title: 'React: Thinking in React',
        url: `${REACT}learn/thinking-in-react`,
      },
    ],
  },
];
