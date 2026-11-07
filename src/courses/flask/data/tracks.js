// Banorna i ordning. reward är föremålet eleven får när banan är klar, och
// canBuild avslutar meningen "Nu kan du t.ex. bygga …" i firandet. docs
// länkar till Flasks dokumentation (på engelska).
const FLASK = 'https://flask.palletsprojects.com/en/stable/';
const QUICK = `${FLASK}quickstart/`;

export const TRACKS = [
  {
    id: 'forsta',
    title: 'Första appen',
    teaches: ['Flask(__name__)', '@app.get', 'return', '404', '405'],
    reward: { emoji: '🌱', name: 'Grodd' },
    canBuild: 'en liten sajt med flera sidor, som svarar när någon frågar',
    docs: [
      { title: 'A Minimal Application', url: `${QUICK}#a-minimal-application` },
      { title: 'Routing', url: `${QUICK}#routing` },
    ],
  },
  {
    id: 'vagar',
    title: 'Vägar',
    teaches: ['<namn>', '<int:id>', 'flera vägar', 'url_for'],
    reward: { emoji: '🛤️', name: 'Räls' },
    canBuild: 'sidor som ändras efter adressen, som /hund/Bamse eller /bok/3',
    docs: [
      { title: 'Variable Rules', url: `${QUICK}#variable-rules` },
      { title: 'URL Building', url: `${QUICK}#url-building` },
    ],
  },
  {
    id: 'json',
    title: 'JSON',
    teaches: ['returnera dict', 'returnera list', 'jsonify', 'statuskoder'],
    reward: { emoji: '📦', name: 'Paket' },
    canBuild: 'ett API som en app eller en annan sajt kan hämta data från',
    docs: [
      { title: 'APIs with JSON', url: `${QUICK}#apis-with-json` },
      { title: 'About Responses', url: `${QUICK}#about-responses` },
    ],
  },
  {
    id: 'fragor',
    title: 'Frågor i adressen',
    teaches: ['request.args', 'get med standardvärde', 'type=int', 'sökning'],
    reward: { emoji: '🔍', name: 'Lupp' },
    canBuild: 'en sökning och filter, som /hundar?storlek=liten&sida=2',
    docs: [{ title: 'The Request Object', url: `${QUICK}#the-request-object` }],
  },
  {
    id: 'skicka',
    title: 'Ta emot data',
    teaches: [
      '@app.post',
      'request.get_json()',
      '201',
      '400',
      'kontrollera data',
    ],
    reward: { emoji: '📬', name: 'Brevlåda' },
    canBuild: 'ett API som tar emot nya saker och säger ifrån när något saknas',
    docs: [
      { title: 'HTTP Methods', url: `${QUICK}#http-methods` },
      { title: 'The Request Object', url: `${QUICK}#the-request-object` },
    ],
  },
  {
    id: 'api',
    title: 'Ett helt API',
    teaches: ['GET', 'POST', 'PUT', 'DELETE', 'id', 'CRUD'],
    reward: { emoji: '🔌', name: 'Kontakt' },
    canBuild:
      'ett komplett API där man kan läsa, lägga till, ändra och ta bort',
    docs: [
      { title: 'HTTP Methods', url: `${QUICK}#http-methods` },
      {
        title: 'HTTP-metoder (MDN)',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods',
      },
    ],
  },
  {
    id: 'fel',
    title: 'Fel',
    teaches: ['abort', '@app.errorhandler', 'felsvar i JSON', 'statuskoder'],
    reward: { emoji: '🚧', name: 'Vägspärr' },
    canBuild: 'ett API som svarar snällt och tydligt även när något går fel',
    docs: [
      { title: 'Redirects and Errors', url: `${QUICK}#redirects-and-errors` },
      { title: 'Handling Application Errors', url: `${FLASK}errorhandling/` },
    ],
  },
  {
    id: 'mallar',
    title: 'HTML med mallar',
    teaches: ['render_template', '{{ }}', '{% for %}', '{% if %}', 'filter'],
    reward: { emoji: '🖼️', name: 'Tavla' },
    canBuild:
      'riktiga webbsidor som fylls med data, som en lista med alla hundar',
    docs: [
      { title: 'Rendering Templates', url: `${QUICK}#rendering-templates` },
      {
        title: 'Jinja: Template Designer',
        url: 'https://jinja.palletsprojects.com/en/stable/templates/',
      },
    ],
  },
  {
    id: 'formular',
    title: 'Formulär',
    teaches: ['request.form', 'POST från ett formulär', 'redirect', 'url_for'],
    reward: { emoji: '🖊️', name: 'Reservoarpenna' },
    canBuild: 'en sida där besökare fyller i ett formulär och skickas vidare',
    docs: [
      { title: 'The Request Object', url: `${QUICK}#the-request-object` },
      { title: 'Redirects and Errors', url: `${QUICK}#redirects-and-errors` },
    ],
  },
  {
    id: 'databas',
    title: 'Databas',
    teaches: [
      'sqlite3',
      'execute',
      '?-parametrar',
      'SQL-injektion',
      'row_factory',
    ],
    reward: { emoji: '🗃️', name: 'Arkivskåp' },
    canBuild:
      'ett API som sparar i en riktig databas, säkert mot SQL-injektion',
    docs: [
      { title: 'Using SQLite 3 with Flask', url: `${FLASK}patterns/sqlite3/` },
      {
        title: 'sqlite3 (Python)',
        url: 'https://docs.python.org/3/library/sqlite3.html',
      },
    ],
  },
  {
    id: 'felsok',
    title: 'Felsökning',
    teaches: [
      'läsa statuskoder',
      '404 eller 405',
      'fel i vägfunktionen',
      'mallfel',
    ],
    reward: { emoji: '🩹', name: 'Plåster' },
    canBuild:
      'en lugn felsökning av vilken Flask-app som helst, ett anrop i taget',
    docs: [
      { title: 'Debugging Application Errors', url: `${FLASK}debugging/` },
    ],
  },
  {
    id: 'inloggning',
    title: 'Inloggning',
    teaches: ['session', 'secret_key', 'hashade lösenord', 'skyddade vägar'],
    reward: { emoji: '🔐', name: 'Hänglås' },
    canBuild: 'en inloggning med hashade lösenord och sidor bara inloggade ser',
    docs: [
      { title: 'Sessions', url: `${QUICK}#sessions` },
      { title: 'View Decorators', url: `${FLASK}patterns/viewdecorators/` },
    ],
  },
  {
    id: 'slutprojekt',
    title: 'Slutprojektet',
    teaches: ['allt i kursen'],
    reward: { emoji: '🏁', name: 'Målflagga' },
    canBuild: 'ett helt boknings-API med databas, felhantering och inloggning',
    docs: [{ title: 'Flask Tutorial', url: `${FLASK}tutorial/` }],
  },
];
