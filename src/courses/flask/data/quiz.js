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
  vagar: [
    {
      question:
        "Vad får parametern namn för värde vid anrop till /hej/Ada med @app.get('/hej/<namn>')?",
      options: ["'Ada'", "'/hej/Ada'", "'<namn>'", 'None'],
      explain: 'Det som står på variabelns plats i adressen blir parametern.',
    },
    {
      question: 'Vad svarar appen på /dubbla/fyra?',
      code: "from flask import Flask\n\napp = Flask(__name__)\n\n@app.get('/dubbla/<int:tal>')\ndef dubbla(tal):\n    return str(tal * 2)",
      check: "__get('/dubbla/fyra').status",
      options: ['404', '200', '500', '400'],
      explain: 'fyra är inget heltal, så vägen matchar inte.',
    },
    {
      question: "Vad ger url_for('hund', nr=2) om vägen är /hund/<int:nr>?",
      options: ["'/hund/2'", "'hund'", "'/hund/<int:nr>'", "'2'"],
      explain: 'url_for bygger adressen utifrån funktionens namn och värdena.',
    },
    {
      question: 'Vad svarar appen?',
      code: "from flask import Flask\n\napp = Flask(__name__)\n\n@app.get('/hej')\n@app.get('/hej/<namn>')\ndef hej(namn='du'):\n    return f'Hej {namn}!'",
      check: "__get('/hej').text",
      options: ['Hej du!', 'Hej namn!', 'Hej !', '404'],
      explain: 'Utan namn i adressen används standardvärdet.',
    },
  ],
  json: [
    {
      question: 'Vad blir svaret om vägfunktionen returnerar en dictionary?',
      options: ['JSON', 'HTML', 'Text med Pythons utskrift', 'Ett fel'],
      explain: 'Flask gör om dict och list till JSON själv.',
    },
    {
      question: 'Vilken statuskod får svaret?',
      code: "from flask import Flask\n\napp = Flask(__name__)\n\n@app.get('/')\ndef start():\n    return {'fel': 'Finns inte'}, 404",
      check: "__get('/').status",
      options: ['404', '200', '500', '201'],
      explain: 'Det andra värdet efter kommat är statuskoden.',
    },
    {
      question: 'Vad händer om en vägfunktion inte returnerar något?',
      options: [
        'Flask kraschar: did not return a valid response',
        'Svaret blir tomt med 200',
        'Svaret blir 404',
        'Flask returnerar None som JSON',
      ],
      explain: 'Python returnerar None, och det kan Flask inte skicka.',
    },
    {
      question: 'Vad är typen på svaret?',
      code: "from flask import Flask\n\napp = Flask(__name__)\n\n@app.get('/')\ndef start():\n    return ['a', 'b']",
      check: "__get('/').typ",
      options: ['application/json', 'text/html', 'text/plain', 'list'],
      explain: 'En lista blir också JSON.',
    },
  ],
};
