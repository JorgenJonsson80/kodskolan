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
  fragor: [
    {
      topic: 'request.args',
      read: `${QUICK}#the-request-object`,
      video: 'flask request args query parameters',
    },
    {
      topic: 'Query string',
      read: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL',
      video: 'what is a query string url',
    },
  ],
  skicka: [
    {
      topic: 'POST och JSON',
      read: `${QUICK}#http-methods`,
      video: 'flask post request json tutorial',
    },
    {
      topic: 'Statuskoder 201 och 400',
      read: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status',
      video: 'http status codes 201 400 explained',
    },
  ],
  api: [
    {
      topic: 'REST och CRUD',
      read: 'https://developer.mozilla.org/en-US/docs/Glossary/REST',
      video: 'rest api crud explained',
    },
    {
      topic: 'PUT, PATCH och DELETE',
      read: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods',
      video: 'flask rest api put delete tutorial',
    },
  ],
  fel: [
    {
      topic: 'abort och errorhandler',
      read: 'https://flask.palletsprojects.com/en/stable/errorhandling/',
      video: 'flask error handling errorhandler',
    },
    {
      topic: 'Statuskoder för fel',
      read: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses',
      video: 'http 4xx status codes explained',
    },
  ],
  mallar: [
    {
      topic: 'render_template och Jinja',
      read: `${QUICK}#rendering-templates`,
      video: 'flask jinja templates tutorial',
    },
    {
      topic: 'Jinjas filter och extends',
      read: 'https://jinja.palletsprojects.com/en/stable/templates/',
      video: 'jinja2 template inheritance extends block',
    },
  ],
  formular: [
    {
      topic: 'request.form',
      read: `${QUICK}#the-request-object`,
      video: 'flask forms request.form tutorial',
    },
    {
      topic: 'redirect och url_for',
      read: `${QUICK}#redirects-and-errors`,
      video: 'flask redirect url_for post redirect get',
    },
  ],
  databas: [
    {
      topic: 'SQLite med Flask',
      read: 'https://flask.palletsprojects.com/en/stable/patterns/sqlite3/',
      video: 'flask sqlite3 tutorial',
    },
    {
      topic: 'SQL-injektion',
      read: 'https://docs.python.org/3/library/sqlite3.html#sqlite3-placeholders',
      video: 'sql injection explained',
    },
  ],
  felsok: [
    {
      topic: 'Felsöka en Flask-app',
      read: 'https://flask.palletsprojects.com/en/stable/debugging/',
      video: 'flask debugging tutorial',
    },
    {
      topic: 'Statuskoder',
      read: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status',
      video: 'http status codes explained',
    },
  ],
};
