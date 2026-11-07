// Bana 8: HTML med mallar. render_template med filer i templates/ (files
// på övningen) och render_template_string för mallar eleven skriver själv.

export const MALLAR = [
  {
    id: 'mallar-01',
    track: 'mallar',
    title: 'Din första mall',
    xp: 10,
    description:
      'En mall är en HTML-fil med luckor. `render_template` fyller i luckorna och skickar sidan.',
    explain:
      "Mallarna ligger i mappen `templates/`. Öppna 📁 ovanför editorn för att se dem.\n\n`{{ namn }}` är en lucka. `render_template('hej.html', namn='Ada')` fyller den med `Ada`.\n\nMallspråket heter **Jinja** och följer med Flask.",
    example: "return render_template('profil.html', namn='Ada', alder=36)",
    task: 'Uppgift: Skapa `/hej/<namn>` som svarar med mallen `hej.html` och skickar med `namn`.',
    starterCode:
      'from flask import Flask, render_template\n\napp = Flask(__name__)\n',
    solution:
      "from flask import Flask, render_template\n\napp = Flask(__name__)\n\n@app.get('/hej/<namn>')\ndef hej(namn):\n    return render_template('hej.html', namn=namn)\n",
    hints: [
      'from flask import … render_template',
      "render_template('hej.html', namn=namn)",
      'Funktionen tar namn från adressen.',
    ],
    tests: [
      {
        description: 'Ada',
        code: "__get('/hej/Ada').text",
        expected: '<h1>Hej Ada!</h1>',
      },
    ],
    request: { path: '/hej/Ada' },
    files: { 'templates/hej.html': '<h1>Hej {{ namn }}!</h1>' },
  },
  {
    id: 'mallar-02',
    track: 'mallar',
    title: 'En mall i koden',
    xp: 10,
    description:
      '`render_template_string` gör samma sak, men mallen står i koden. Bra för korta mallar – och för att öva.',
    explain:
      'Allt du lär dig om mallar fungerar likadant i en fil och i en text. Här skriver du mallen själv.',
    example: "render_template_string('<p>{{ text }}</p>', text='Hej')",
    task: "Uppgift: Skapa `/antal` som svarar med mallen `'<p>{{ antal }} hundar</p>'` och skickar med `antal=len(hundar)`.",
    starterCode:
      "from flask import Flask, render_template_string\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n",
    solution:
      "from flask import Flask, render_template_string\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\n@app.get('/antal')\ndef antal():\n    return render_template_string('<p>{{ antal }} hundar</p>', antal=len(hundar))\n",
    hints: [
      "render_template_string('<p>{{ antal }} hundar</p>', …)",
      'antal=len(hundar)',
      "return render_template_string('<p>{{ antal }} hundar</p>', antal=len(hundar))",
    ],
    tests: [
      {
        description: 'Två hundar',
        code: "__get('/antal').text",
        expected: '<p>2 hundar</p>',
      },
    ],
    request: { path: '/antal' },
  },
  {
    id: 'mallar-03',
    track: 'mallar',
    title: 'En lista i mallen',
    xp: 15,
    description:
      'Mallen kan gå igenom en lista med `{% for %}`. Du skickar bara med listan.',
    explain:
      'Öppna 📁 och läs `hundar.html`. `{% for hund in hundar %}` upprepar raden för varje hund, och `{{ hund.namn }}` hämtar namnet.\n\nI Jinja fungerar `hund.namn` även för en dictionary.',
    example: "return render_template('lista.html', saker=saker)",
    task: 'Uppgift: Skapa `/` som svarar med `hundar.html` och skickar med `hundar`.',
    starterCode:
      "from flask import Flask, render_template\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n",
    solution:
      "from flask import Flask, render_template\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\n@app.get('/')\ndef start():\n    return render_template('hundar.html', hundar=hundar)\n",
    hints: [
      "render_template('hundar.html', …)",
      'hundar=hundar',
      "return render_template('hundar.html', hundar=hundar)",
    ],
    tests: [
      {
        description: 'Två rader',
        code: "__get('/').text.count('<li>')",
        expected: 2,
      },
      {
        description: 'Bamse',
        code: "'Bamse (berner)' in __get('/').text",
        expected: true,
      },
    ],
    files: {
      'templates/hundar.html':
        '<ul>\n{% for hund in hundar %}\n  <li>{{ hund.namn }} ({{ hund.ras }})</li>\n{% endfor %}\n</ul>\n',
    },
  },
  {
    id: 'mallar-04',
    track: 'mallar',
    title: 'Skriv en for-loop',
    xp: 15,
    description: 'Nu skriver du loopen själv.',
    explain:
      '`{% for … %}` och `{% endfor %}` står runt det som ska upprepas. `{% %}` är kod, `{{ }}` är något som skrivs ut.',
    example: '{% for stad in stader %}<li>{{ stad }}</li>{% endfor %}',
    task: 'Uppgift: `/` ska svara med en `<ul>` med en `<li>` per hund med namnet. Skriv mallen i `render_template_string`.',
    starterCode:
      "from flask import Flask, render_template_string\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n",
    solution:
      "from flask import Flask, render_template_string\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\nMALL = '<ul>{% for hund in hundar %}<li>{{ hund.namn }}</li>{% endfor %}</ul>'\n\n\n@app.get('/')\ndef start():\n    return render_template_string(MALL, hundar=hundar)\n",
    hints: [
      'Spara mallen i en variabel, t.ex. MALL.',
      "'<ul>{% for hund in hundar %}<li>{{ hund.namn }}</li>{% endfor %}</ul>'",
      'return render_template_string(MALL, hundar=hundar)',
    ],
    tests: [
      {
        description: 'Listan',
        code: "__get('/').text",
        expected: '<ul><li>Bamse</li><li>Saga</li></ul>',
      },
    ],
  },
  {
    id: 'mallar-05',
    track: 'mallar',
    title: 'if i mallen',
    xp: 15,
    description: '`{% if %}` visar olika saker beroende på datan.',
    explain:
      '`{% if oppet %}Öppet{% else %}Stängt{% endif %}`. Precis som i Python, men med `{% endif %}` som slut.',
    example: '{% if antal == 0 %}Slut{% else %}{{ antal }} kvar{% endif %}',
    task: "Uppgift: `/status/<int:timme>` ska svara `'<p>Öppet</p>'` från 8 till och med 16, annars `'<p>Stängt</p>'`. Skicka med `oppet` som sant eller falskt och låt mallen välja.",
    starterCode:
      'from flask import Flask, render_template_string\n\napp = Flask(__name__)\n',
    solution:
      "from flask import Flask, render_template_string\n\napp = Flask(__name__)\n\nMALL = '<p>{% if oppet %}Öppet{% else %}Stängt{% endif %}</p>'\n\n\n@app.get('/status/<int:timme>')\ndef status(timme):\n    return render_template_string(MALL, oppet=8 <= timme <= 16)\n",
    hints: [
      'oppet=8 <= timme <= 16',
      '{% if oppet %}Öppet{% else %}Stängt{% endif %}',
      'return render_template_string(MALL, oppet=…)',
    ],
    tests: [
      {
        description: 'Klockan 10',
        code: "__get('/status/10').text",
        expected: '<p>Öppet</p>',
      },
      {
        description: 'Klockan 20',
        code: "__get('/status/20').text",
        expected: '<p>Stängt</p>',
      },
    ],
    request: { path: '/status/10' },
    sourceChecks: [{ description: 'Mallen har if', pattern: /\{%\s*if/ }],
  },
  {
    id: 'mallar-06',
    track: 'mallar',
    title: 'Filter',
    xp: 15,
    description:
      'Ett filter ändrar värdet när det skrivs ut: `{{ namn|upper }}`.',
    explain:
      "Några vanliga filter:\n- `upper` – stora bokstäver\n- `length` – antal\n- `join(', ')` – sätt ihop en lista\n- `default('okänd')` – om värdet saknas",
    example: "{{ stader|join(', ') }}",
    task: "Uppgift: `/` ska svara `'<p>BAMSE, SAGA (2)</p>'` – namnen med `upper` och `join`, och antalet med `length`. Skicka med `namn` som en lista med namnen.",
    starterCode:
      "from flask import Flask, render_template_string\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n",
    solution:
      "from flask import Flask, render_template_string\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\nMALL = \"<p>{{ namn|join(', ')|upper }} ({{ namn|length }})</p>\"\n\n\n@app.get('/')\ndef start():\n    return render_template_string(MALL, namn=[h['namn'] for h in hundar])\n",
    hints: [
      "namn=[h['namn'] for h in hundar]",
      "{{ namn|join(', ')|upper }}",
      '({{ namn|length }})',
    ],
    tests: [
      {
        description: 'Raden',
        code: "__get('/').text",
        expected: '<p>BAMSE, SAGA (2)</p>',
      },
    ],
    sourceChecks: [
      { description: 'Använder filter', pattern: /\|\s*(upper|length|join)/ },
    ],
  },
  {
    id: 'mallar-07',
    track: 'mallar',
    title: 'Mallar skyddar',
    xp: 20,
    description:
      'Med en f-sträng kan en besökare stoppa in egen HTML – och JavaScript. En mall skyddar mot det.',
    explain:
      'Anropa `/hej/<i>Ada` med 📮. Med f-strängen blir namnet kursivt: besökaren styr sidan. Med `<script>` hade de kunnat köra kod hos alla som öppnar länken. Det kallas **XSS**.\n\nJinja gör om `<` till `&lt;` i allt som skrivs ut med `{{ }}`, så det visas som text.',
    example: "render_template_string('<h1>Hej {{ namn }}!</h1>', namn=namn)",
    task: 'Uppgift: Byt f-strängen mot `render_template_string`, så att HTML i namnet visas som text.',
    starterCode:
      "from flask import Flask, render_template_string\n\napp = Flask(__name__)\n\n@app.get('/hej/<namn>')\ndef hej(namn):\n    return f'<h1>Hej {namn}!</h1>'\n",
    solution:
      "from flask import Flask, render_template_string\n\napp = Flask(__name__)\n\n@app.get('/hej/<namn>')\ndef hej(namn):\n    return render_template_string('<h1>Hej {{ namn }}!</h1>', namn=namn)\n",
    hints: [
      'Samma HTML, men som mall.',
      '{{ namn }} i stället för {namn}',
      "render_template_string('<h1>Hej {{ namn }}!</h1>', namn=namn)",
    ],
    tests: [
      {
        description: 'Vanligt namn',
        code: "__get('/hej/Ada').text",
        expected: '<h1>Hej Ada!</h1>',
      },
      {
        description: 'HTML blir text',
        code: "__get('/hej/<i>Ada').text",
        expected: '<h1>Hej &lt;i&gt;Ada!</h1>',
      },
    ],
    request: { path: '/hej/<i>Ada' },
  },
  {
    id: 'mallar-08',
    track: 'mallar',
    title: 'En mall att bygga på',
    xp: 20,
    description:
      'Alla sidor ska ha samma sidhuvud. `{% extends %}` låter en mall bygga på en annan.',
    explain:
      "`bas.html` (öppna 📁) har sidhuvudet och en lucka: `{% block innehall %}{% endblock %}`. En mall som börjar med `{% extends 'bas.html' %}` fyller luckan med sitt eget `{% block innehall %}`.\n\nÄndras sidhuvudet i `bas.html` ändras det på alla sidor.",
    example:
      "{% extends 'bas.html' %}\n{% block innehall %}<p>Hej!</p>{% endblock %}",
    task: 'Uppgift: `/om` ska bygga på `bas.html` och fylla `innehall` med `<p>Ett pensionat för hundar.</p>`.',
    starterCode:
      'from flask import Flask, render_template_string\n\napp = Flask(__name__)\n',
    solution:
      "from flask import Flask, render_template_string\n\napp = Flask(__name__)\n\nOM = \"{% extends 'bas.html' %}{% block innehall %}<p>Ett pensionat för hundar.</p>{% endblock %}\"\n\n\n@app.get('/om')\ndef om():\n    return render_template_string(OM)\n",
    hints: [
      "{% extends 'bas.html' %} först.",
      '{% block innehall %}…{% endblock %}',
      'return render_template_string(OM)',
    ],
    tests: [
      {
        description: 'Sidhuvudet finns',
        code: "'🐾 Tassen' in __get('/om').text",
        expected: true,
      },
      {
        description: 'Innehållet',
        code: "'<main><p>Ett pensionat för hundar.</p></main>' in __get('/om').text",
        expected: true,
      },
    ],
    request: { path: '/om' },
    files: {
      'templates/bas.html':
        '<!doctype html>\n<title>Tassen</title>\n<header>🐾 Tassen</header>\n<main>{% block innehall %}{% endblock %}</main>\n',
    },
  },
  {
    id: 'mallar-09',
    track: 'mallar',
    title: 'Länkar i mallen',
    xp: 20,
    description:
      '`url_for` finns också i mallarna. Då pekar länkarna alltid rätt.',
    explain:
      "`{{ url_for('hund', id=h.id) }}` bygger adressen till vägen `hund`. Det är samma `url_for` som i Python.",
    example: '<a href="{{ url_for(\'bok\', id=b.id) }}">{{ b.titel }}</a>',
    task: 'Uppgift: `/` ska visa en `<a>` per hund som länkar till `hund` med hundens id, med namnet som text.',
    starterCode:
      "from flask import Flask, render_template_string\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\n@app.get('/hund/<int:id>')\ndef hund(id):\n    return render_template_string('<h1>{{ h.namn }}</h1>', h=hundar[id - 1])\n",
    solution:
      "from flask import Flask, render_template_string\n\napp = Flask(__name__)\n\nhundar = [\n    {'id': 1, 'namn': 'Bamse', 'ras': 'berner'},\n    {'id': 2, 'namn': 'Saga', 'ras': 'tax'},\n]\n\n\n@app.get('/hund/<int:id>')\ndef hund(id):\n    return render_template_string('<h1>{{ h.namn }}</h1>', h=hundar[id - 1])\n\n\nLISTA = \"{% for h in hundar %}<a href=\\\"{{ url_for('hund', id=h.id) }}\\\">{{ h.namn }}</a>{% endfor %}\"\n\n\n@app.get('/')\ndef start():\n    return render_template_string(LISTA, hundar=hundar)\n",
    hints: [
      '{% for h in hundar %} … {% endfor %}',
      "url_for('hund', id=h.id)",
      '<a href="{{ url_for(\'hund\', id=h.id) }}">{{ h.namn }}</a>',
    ],
    tests: [
      {
        description: 'Länkarna',
        code: "__get('/').text",
        expected: '<a href="/hund/1">Bamse</a><a href="/hund/2">Saga</a>',
      },
    ],
  },
];
