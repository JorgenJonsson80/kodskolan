// Banorna i ordning. reward är föremålet eleven får när banan är klar, och
// canBuild avslutar meningen "Nu kan du t.ex. bygga …" i firandet. docs
// länkar till FastAPI:s dokumentation (på engelska). Banorna som inte är
// byggda än står i docs/kurser/fastapi.md.
const FASTAPI = 'https://fastapi.tiangolo.com/';

export const TRACKS = [
  {
    id: 'forsta',
    title: 'Första API:et',
    teaches: ['FastAPI()', '@app.get', 'dict blir JSON', '404', '405', '/docs'],
    reward: { emoji: '⚡', name: 'Blixt' },
    canBuild: 'ett litet API som en app kan hämta menyer och listor från',
    docs: [
      { title: 'First Steps', url: `${FASTAPI}tutorial/first-steps/` },
      { title: 'Metadata and Docs', url: `${FASTAPI}tutorial/metadata/` },
    ],
  },
  {
    id: 'vagar',
    title: 'Vägar och typer',
    teaches: ['{id} i adressen', 'id: int', 'float', '422', 'Enum'],
    reward: { emoji: '🧭', name: 'Kompass' },
    canBuild: 'ett API med en adress per sak, som /bocker/3 eller /pris/kaffe',
    docs: [
      { title: 'Path Parameters', url: `${FASTAPI}tutorial/path-params/` },
      {
        title: 'Order matters',
        url: `${FASTAPI}tutorial/path-params/#order-matters`,
      },
    ],
  },
  {
    id: 'fragor',
    title: 'Frågor i adressen',
    teaches: ['?namn=Ada', 'standardvärden', 'str | None', 'bool', 'sidor'],
    reward: { emoji: '🔎', name: 'Förstoringsglas' },
    canBuild: 'ett API där man kan söka, filtrera och sortera, som en webbutik',
    docs: [
      { title: 'Query Parameters', url: `${FASTAPI}tutorial/query-params/` },
      {
        title: 'Query Parameters and String Validations',
        url: `${FASTAPI}tutorial/query-params-str-validations/`,
      },
    ],
  },
  {
    id: 'modeller',
    title: 'Pydantic-modeller',
    teaches: ['BaseModel', '@app.post', 'model_dump', 'Field', 'list[str]'],
    reward: { emoji: '🧩', name: 'Pusselbit' },
    canBuild:
      'ett API som tar emot beställningar och bokningar och kontrollerar dem',
    docs: [
      { title: 'Request Body', url: `${FASTAPI}tutorial/body/` },
      { title: 'Body - Fields', url: `${FASTAPI}tutorial/body-fields/` },
      {
        title: 'Body - Nested Models',
        url: `${FASTAPI}tutorial/body-nested-models/`,
      },
    ],
  },
  {
    id: 'svar',
    title: 'Svar och fel',
    teaches: [
      'status_code=201',
      'HTTPException',
      '404 och 409',
      'response_model',
    ],
    reward: { emoji: '📬', name: 'Brevlåda' },
    canBuild:
      'ett API som säger tydligt vad som gick fel, och aldrig visar hemliga uppgifter',
    docs: [
      { title: 'Handling Errors', url: `${FASTAPI}tutorial/handling-errors/` },
      {
        title: 'Response Status Code',
        url: `${FASTAPI}tutorial/response-status-code/`,
      },
      { title: 'Response Model', url: `${FASTAPI}tutorial/response-model/` },
    ],
  },
  {
    id: 'crud',
    title: 'Ett helt API',
    teaches: ['PUT', 'PATCH', 'exclude_unset', 'DELETE', '204', 'CRUD'],
    reward: { emoji: '🛠️', name: 'Verktygslåda' },
    canBuild:
      'ryggraden i nästan varje app: ett API där man skapar, läser, ändrar och tar bort',
    docs: [
      { title: 'Body - Updates', url: `${FASTAPI}tutorial/body-updates/` },
      {
        title: 'Response Status Code',
        url: `${FASTAPI}tutorial/response-status-code/`,
      },
    ],
  },
  {
    id: 'beroenden',
    title: 'Beroenden',
    teaches: [
      'Depends',
      'Header',
      'API-nyckel',
      '401 och 403',
      'dependency_overrides',
    ],
    reward: { emoji: '🔑', name: 'Nyckel' },
    canBuild: 'ett API med inloggning, där varje användare ser sina egna saker',
    docs: [
      { title: 'Dependencies', url: `${FASTAPI}tutorial/dependencies/` },
      { title: 'Header Parameters', url: `${FASTAPI}tutorial/header-params/` },
      {
        title: 'Testing Dependencies with Overrides',
        url: `${FASTAPI}advanced/testing-dependencies/`,
      },
    ],
  },
  {
    id: 'databas',
    title: 'Databas',
    teaches: [
      'sqlite3',
      '? i SQL',
      'SQL-injektion',
      'Depends med yield',
      'JOIN',
    ],
    reward: { emoji: '🗄️', name: 'Arkivskåp' },
    canBuild: 'ett API som sparar allt i en riktig databas',
    docs: [
      {
        title: 'SQL (Relational) Databases',
        url: `${FASTAPI}tutorial/sql-databases/`,
      },
      {
        title: 'Dependencies with yield',
        url: `${FASTAPI}tutorial/dependencies/dependencies-with-yield/`,
      },
    ],
  },
  {
    id: 'async',
    title: 'async',
    teaches: [
      'async def',
      'await',
      'asyncio.gather',
      'wait_for',
      'BackgroundTasks',
    ],
    reward: { emoji: '⏱️', name: 'Tidtagarur' },
    canBuild:
      'en tjänst som frågar flera långsamma tjänster – eller en AI – på en gång',
    docs: [
      { title: 'Concurrency and async / await', url: `${FASTAPI}async/` },
      {
        title: 'Background Tasks',
        url: `${FASTAPI}tutorial/background-tasks/`,
      },
    ],
  },
  {
    id: 'felsok',
    title: 'Felsökning',
    teaches: [
      'läsa 404 och 422',
      'repr',
      'response_model',
      'Depends(f)',
      'gather',
    ],
    reward: { emoji: '🐞', name: 'Nyckelpiga' },
    canBuild:
      'nästan vad som helst – för nu hittar du felen när något går snett',
    docs: [
      { title: 'Debugging', url: `${FASTAPI}tutorial/debugging/` },
      { title: 'Handling Errors', url: `${FASTAPI}tutorial/handling-errors/` },
    ],
  },
  {
    id: 'slutprojekt',
    title: 'Slutprojektet',
    teaches: ['allt i kursen', 'en AI som beroende', 'RAG', 'drift'],
    reward: { emoji: '🏆', name: 'Pokal' },
    canBuild:
      'en egen AI-tjänst som svarar på frågor med hjälp av dina egna texter',
    docs: [
      {
        title: 'Bigger Applications',
        url: `${FASTAPI}tutorial/bigger-applications/`,
      },
      { title: 'Deployment', url: `${FASTAPI}deployment/` },
    ],
  },
];
