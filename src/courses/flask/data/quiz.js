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
  fragor: [
    {
      question: 'Vad är q i adressen /sok?q=ada?',
      options: [
        'En fråga till appen, som läses med request.args',
        'En del av vägen',
        'Ett fel',
        'Ett id',
      ],
      explain: 'Allt efter ? är frågor: namn och värden, åtskilda med &.',
    },
    {
      question: "Vad ger request.args.get('nr', 1, type=int) för /sida?nr=x?",
      code: "from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.get('/sida')\ndef sida():\n    return str(request.args.get('nr', 1, type=int))",
      check: "__get('/sida?nr=x').text",
      options: ['1', 'x', '0', 'Ett fel'],
      explain:
        'Går värdet inte att göra om till ett tal blir det standardvärdet.',
    },
    {
      question: 'Vad betyder statuskoden 400?',
      options: [
        'Att anropet är fel',
        'Att sidan inte finns',
        'Att appen kraschade',
        'Att allt gick bra',
      ],
      explain:
        '400 Bad Request: den som frågar har skickat något appen inte kan använda.',
    },
    {
      question: 'Vad svarar appen på /sok utan ?q=?',
      code: "from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.get('/sok')\ndef sok():\n    return request.args['q']",
      check: "__get('/sok').status",
      options: ['400', '200', '404', '500'],
      explain: 'request.args[…] med hakparenteser kräver att frågan finns.',
    },
  ],
  skicka: [
    {
      question:
        'Vilken metod använder man för att skicka något nytt till ett API?',
      options: ['POST', 'GET', 'DELETE', 'HEAD'],
      explain: 'GET hämtar, POST skickar.',
    },
    {
      question: 'Vilken statuskod är vanlig när något nytt har skapats?',
      options: ['201', '200', '204', '302'],
      explain: '201 Created, och svaret innehåller det nya.',
    },
    {
      question: 'Vad svarar appen när den får ett formulär i stället för JSON?',
      code: "from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.post('/')\ndef ta_emot():\n    return request.get_json()",
      check: "__post('/', form={'a': '1'}).status",
      options: ['415', '400', '200', '500'],
      explain:
        'get_json vägrar läsa något som inte är JSON. Med silent=True blir det None i stället.',
    },
    {
      question: 'Varför ska appen ge id:t och inte den som skickar?',
      options: [
        'Den som skickar vet inte vilka id:n som är tagna',
        'JSON kan inte innehålla id',
        'Det går fortare',
        'Det spelar ingen roll',
      ],
      explain:
        'Bara appen vet vad som finns, så bara den kan ge ett id som säkert är nytt.',
    },
  ],
};
