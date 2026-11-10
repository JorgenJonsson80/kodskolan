// Andra sätt att lära sig banans ämnen, för den som kört fast.
// read: en sida i FastAPI:s dokumentation (på engelska).
// video: en sökning på YouTube. Vi länkar till en sökning i stället för
// enskilda videor, eftersom videor kan försvinna men sökningen finns kvar.
const FASTAPI = 'https://fastapi.tiangolo.com/';

export const RESOURCES = {
  forsta: [
    {
      topic: 'Ditt första API',
      read: `${FASTAPI}tutorial/first-steps/`,
      video: 'fastapi tutorial för nybörjare',
    },
    {
      topic: 'Vad är JSON?',
      read: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON',
      video: 'what is json explained',
    },
    {
      topic: 'Statuskoder',
      read: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status',
      video: 'http status codes explained',
    },
  ],
  vagar: [
    {
      topic: 'Variabler i adressen',
      read: `${FASTAPI}tutorial/path-params/`,
      video: 'fastapi path parameters tutorial',
    },
    {
      topic: 'Typer i Python',
      read: `${FASTAPI}python-types/`,
      video: 'python type hints tutorial',
    },
  ],
  fragor: [
    {
      topic: 'Frågor i adressen',
      read: `${FASTAPI}tutorial/query-params/`,
      video: 'fastapi query parameters tutorial',
    },
    {
      topic: 'List comprehensions och sorted',
      read: 'https://docs.python.org/3/howto/sorting.html',
      video: 'python list comprehension sorted lambda',
    },
  ],
  modeller: [
    {
      topic: 'Ta emot JSON med en modell',
      read: `${FASTAPI}tutorial/body/`,
      video: 'fastapi pydantic models tutorial',
    },
    {
      topic: 'Pydantic',
      read: 'https://docs.pydantic.dev/latest/concepts/models/',
      video: 'pydantic tutorial python',
    },
  ],
  svar: [
    {
      topic: 'Fel och HTTPException',
      read: `${FASTAPI}tutorial/handling-errors/`,
      video: 'fastapi httpexception error handling',
    },
    {
      topic: 'Vad som skickas tillbaka',
      read: `${FASTAPI}tutorial/response-model/`,
      video: 'fastapi response model tutorial',
    },
  ],
  crud: [
    {
      topic: 'Ändra med PUT och PATCH',
      read: `${FASTAPI}tutorial/body-updates/`,
      video: 'fastapi crud tutorial',
    },
    {
      topic: 'HTTP-metoderna',
      read: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods',
      video: 'http methods get post put patch delete explained',
    },
  ],
  beroenden: [
    {
      topic: 'Depends',
      read: `${FASTAPI}tutorial/dependencies/`,
      video: 'fastapi dependency injection tutorial',
    },
    {
      topic: 'Inloggning med token',
      read: `${FASTAPI}tutorial/security/first-steps/`,
      video: 'fastapi authentication bearer token',
    },
  ],
  databas: [
    {
      topic: 'sqlite3 i Python',
      read: 'https://docs.python.org/3/library/sqlite3.html',
      video: 'python sqlite3 tutorial',
    },
    {
      topic: 'SQL-injektion',
      read: 'https://owasp.org/www-community/attacks/SQL_Injection',
      video: 'sql injection explained',
    },
  ],
  async: [
    {
      topic: 'async och await',
      read: `${FASTAPI}async/`,
      video: 'python async await explained',
    },
    {
      topic: 'asyncio.gather',
      read: 'https://docs.python.org/3/library/asyncio-task.html#running-tasks-concurrently',
      video: 'python asyncio gather tutorial',
    },
  ],
  felsok: [
    {
      topic: 'Felsöka en FastAPI-app',
      read: `${FASTAPI}tutorial/debugging/`,
      video: 'fastapi debugging tutorial',
    },
    {
      topic: 'Läsa ett Python-fel',
      read: 'https://docs.python.org/3/tutorial/errors.html',
      video: 'how to read python traceback',
    },
  ],
  slutprojekt: [
    {
      topic: 'Större FastAPI-appar',
      read: `${FASTAPI}tutorial/bigger-applications/`,
      video: 'fastapi project structure',
    },
    {
      topic: 'Vad är RAG?',
      read: 'https://en.wikipedia.org/wiki/Retrieval-augmented_generation',
      video: 'what is retrieval augmented generation rag',
    },
  ],
};
