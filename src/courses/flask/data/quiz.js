// Frågor för nivåtestet och för "Testa dig förbi". Fyra frågor per bana.
// Det rätta svaret står alltid först i options. Ordningen blandas när
// frågan visas. En fråga med code och check körs i quiz.test.js: check är
// ett testuttryck (t.ex. "__get('/').status") vars värde ska vara det
// rätta svaret.
export const QUIZ = {
  forsta: [
    {
      question: "Vad gör @app.get('/om')?",
      options: [
        'Kör funktionen under när någon hämtar adressen /om',
        'Hämtar sidan /om från internet',
        'Skapar en fil som heter om',
        'Startar en server på /om',
      ],
      explain:
        'Dekoratorn kopplar adressen till funktionen. Det funktionen returnerar är svaret.',
    },
    {
      question: 'Vilken statuskod får en adress som appen inte har?',
      code: "from flask import Flask\n\napp = Flask(__name__)\n\n@app.get('/')\ndef start():\n    return 'Hej'",
      check: "__get('/finns-inte').status",
      options: ['404', '200', '500', '405'],
      explain:
        'Flask svarar 404 för alla adresser som ingen vägfunktion tar hand om.',
    },
    {
      question: 'Vad svarar appen på POST till en väg med @app.get?',
      code: "from flask import Flask\n\napp = Flask(__name__)\n\n@app.get('/')\ndef start():\n    return 'Hej'",
      check: "__post('/').status",
      options: ['405', '200', '404', '201'],
      explain: '405 betyder att vägen finns, men inte för den metoden.',
    },
    {
      question: 'Varför måste två vägfunktioner ha olika namn?',
      options: [
        'Flask känner igen vägarna på funktionens namn',
        'Python tillåter inte två funktioner',
        'Webbläsaren blir förvirrad',
        'Det behöver de inte',
      ],
      explain:
        'Två lika namn ger AssertionError: View function mapping is overwriting …',
    },
  ],
};
