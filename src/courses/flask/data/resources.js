// Andra sätt att lära sig banans ämnen, för den som kört fast.
// read: en sida i Flasks dokumentation (på engelska).
// video: en sökning på YouTube. Vi länkar till en sökning i stället för
// enskilda videor, eftersom videor kan försvinna men sökningen finns kvar.
const QUICK = 'https://flask.palletsprojects.com/en/stable/quickstart/';

export const RESOURCES = {
  forsta: [
    {
      topic: 'Din första Flask-app',
      read: `${QUICK}#a-minimal-application`,
      video: 'flask tutorial nybörjare svenska',
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
      read: `${QUICK}#variable-rules`,
      video: 'flask url variables routes tutorial',
    },
    {
      topic: 'url_for',
      read: `${QUICK}#url-building`,
      video: 'flask url_for explained',
    },
  ],
  json: [
    {
      topic: 'API:er med JSON',
      read: `${QUICK}#apis-with-json`,
      video: 'flask json api tutorial',
    },
    {
      topic: 'Vad är JSON?',
      read: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON',
      video: 'vad är json',
    },
  ],
};
