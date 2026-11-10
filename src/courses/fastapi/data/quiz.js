// Frågor för nivåtestet och för "Testa dig förbi". Fyra frågor per bana.
// Det rätta svaret står alltid först i options. Ordningen blandas när
// frågan visas. En fråga med code och check körs i quiz.test.js: check är
// ett testuttryck (t.ex. "__get('/').status") vars värde ska vara det
// rätta svaret.
const APP =
  "from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get('/')\ndef start():\n    return {'hej': True}";

export const QUIZ = {
  forsta: [
    {
      question: 'Vad svarar API:et när en vägfunktion returnerar en dict?',
      options: [
        'JSON',
        'En HTML-sida',
        'Python-kod',
        'Ingenting, en dict går inte att skicka',
      ],
      explain:
        'FastAPI gör om dicts och listor till JSON, som alla språk och appar kan läsa.',
    },
    {
      question: 'Vilken statuskod får en adress som appen inte har?',
      code: APP,
      check: "__get('/finns-inte').status",
      options: ['404', '200', '500', '405'],
      explain:
        'FastAPI svarar 404 för alla adresser som ingen vägfunktion tar hand om.',
    },
    {
      question: 'Vad svarar appen på POST till en väg med @app.get?',
      code: APP,
      check: "__post('/').status",
      options: ['405', '200', '404', '201'],
      explain: '405 betyder att vägen finns, men inte för den metoden.',
    },
    {
      question: 'Var hittar man dokumentationen som FastAPI gör själv?',
      options: ['/docs', '/hjalp', '/api', 'Den måste man skriva själv'],
      explain:
        'FastAPI läser vägarna och visar dem på /docs, där man också kan prova dem.',
    },
  ],
  vagar: [
    {
      question: 'Vad svarar /dubbla/hej?',
      code: "from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get('/dubbla/{tal}')\ndef dubbla(tal: int):\n    return tal * 2",
      check: "__get('/dubbla/hej').status",
      options: ['422', '200', '404', '500'],
      explain:
        'hej är inget heltal, så FastAPI svarar 422 innan funktionen ens körs.',
    },
    {
      question: 'Vad svarar /dubbla/21 om typen : int saknas?',
      code: "from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get('/dubbla/{tal}')\ndef dubbla(tal):\n    return tal * 2",
      check: "__get('/dubbla/21').json",
      options: ['2121', '42', '21', '422'],
      explain:
        'Utan typ är allt i adressen text, och text gånger två skrivs två gånger.',
    },
    {
      question:
        "Vägarna '/filmer/{titel}' och '/filmer/senaste' står i den ordningen. Vad händer med /filmer/senaste?",
      options: [
        "Den första vägen svarar, med titel = 'senaste'",
        'Den andra vägen svarar',
        'FastAPI svarar 409',
        'Båda vägarna svarar',
      ],
      explain:
        'FastAPI tar den första vägen som passar. Den fasta vägen ska stå först.',
    },
    {
      question: 'Vad är en Enum bra för i en väg?',
      options: [
        'Att bara tillåta några bestämda värden',
        'Att räkna antalet anrop',
        'Att göra vägen snabbare',
        'Att dölja vägen i dokumentationen',
      ],
      explain:
        'Med en Enum som typ svarar FastAPI 422 för alla värden som inte finns i den.',
    },
  ],
  fragor: [
    {
      question: 'Vad svarar /hej om namn saknas?',
      code: "from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get('/hej')\ndef hej(namn: str):\n    return 'Hej ' + namn",
      check: "__get('/hej').status",
      options: ['422', '200', '404', '400'],
      explain:
        'Utan standardvärde är frågan obligatorisk, och FastAPI svarar 422 när den saknas.',
    },
    {
      question: 'Vad svarar /hej om namn har standardvärdet du?',
      code: "from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get('/hej')\ndef hej(namn: str = 'du'):\n    return 'Hej ' + namn",
      check: "__get('/hej').json",
      options: ['Hej du', 'Hej ', 'Hej None', '422'],
      explain: 'Saknas frågan används standardvärdet.',
    },
    {
      question: 'Hur skickar man två frågor i samma adress?',
      options: [
        '/rakna?a=2&b=3',
        '/rakna?a=2?b=3',
        '/rakna/a=2/b=3',
        '/rakna?a=2,b=3',
      ],
      explain: 'Den första frågan börjar med ? och resten skiljs åt med &.',
    },
    {
      question: 'Vad betyder str | None = None?',
      options: [
        'En text eller ingenting, och ingenting om den inte skickas',
        'En text som alltid måste skickas',
        'Texten None',
        'Antingen str eller int',
      ],
      explain: '| betyder eller i en typ, och None är standardvärdet.',
    },
  ],
  modeller: [
    {
      question: 'Vad svarar POST /hundar om alder saknas?',
      code: "from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass Hund(BaseModel):\n    namn: str\n    alder: int\n\n@app.post('/hundar')\ndef ny(hund: Hund):\n    return hund",
      check: "__post('/hundar', {'namn': 'Bamse'}).status",
      options: ['422', '200', '400', '500'],
      explain:
        'Modellen kontrollerar JSON:en innan funktionen körs, och ett saknat fält ger 422.',
    },
    {
      question: 'Vad gör hund.model_dump()?',
      options: [
        'Gör om modellen till en vanlig dict',
        'Raderar modellen',
        'Skriver ut modellen',
        'Sparar modellen i en fil',
      ],
      explain: 'En dict går att lägga i en lista eller spara på andra sätt.',
    },
    {
      question: 'Vad betyder Field(ge=0, le=30)?',
      options: [
        'Minst 0 och högst 30',
        'Mer än 0 och mindre än 30',
        'Exakt 0 eller 30',
        'Mellan 0 och 30 tecken',
      ],
      explain: 'ge är greater or equal och le är less or equal.',
    },
    {
      question:
        'Vilken metod används oftast för att skicka ny data till ett API?',
      options: ['POST', 'GET', 'DELETE', 'HEAD'],
      explain: 'GET hämtar, POST skickar något nytt. Samma adress kan ha båda.',
    },
  ],
  svar: [
    {
      question: 'Vilken statuskod får svaret?',
      code: "from fastapi import FastAPI, HTTPException\n\napp = FastAPI()\n\n@app.get('/hundar/{id}')\ndef hund(id: int):\n    raise HTTPException(status_code=404, detail='Finns inte')",
      check: "__get('/hundar/1').status",
      options: ['404', '200', '500', '422'],
      explain:
        'raise HTTPException stoppar funktionen och svarar med statuskoden.',
    },
    {
      question: 'Vilken statuskod passar när ett användarnamn redan är taget?',
      options: ['409', '404', '201', '200'],
      explain: '409 Conflict betyder att anropet krockar med något som finns.',
    },
    {
      question: 'Vad gör response_model=AnvandareUt?',
      options: [
        'Skickar bara fälten i AnvandareUt, även om funktionen returnerar mer',
        'Kontrollerar det som skickas in',
        'Byter statuskoden',
        'Sparar användaren',
      ],
      explain:
        'Så kan ett lösenord tas emot utan att någonsin skickas tillbaka.',
    },
    {
      question: 'Vilken statuskod passar när något nytt har skapats?',
      options: ['201', '200', '204', '302'],
      explain: '201 Created säger att anropet skapade något.',
    },
  ],
  crud: [
    {
      question: 'Vad är skillnaden mellan PUT och PATCH?',
      options: [
        'PUT byter ut hela saken, PATCH ändrar bara det som skickas',
        'PUT tar bort, PATCH lägger till',
        'Det finns ingen skillnad',
        'PATCH byter ut hela saken, PUT ändrar en del',
      ],
      explain:
        'Med PATCH räcker det att skicka {"klar": true} för att bocka av en uppgift.',
    },
    {
      question: 'Vad skickar DELETE med status_code=204 tillbaka?',
      code: "from fastapi import FastAPI\n\napp = FastAPI()\nSAKER = [1, 2]\n\n@app.delete('/saker', status_code=204)\ndef rensa():\n    SAKER.clear()",
      check: "__delete('/saker').text",
      options: ['', 'null', '204', '[]'],
      explain: '204 No Content betyder att svaret är tomt.',
    },
    {
      question: 'Vad gör model_dump(exclude_unset=True)?',
      options: [
        'Ger bara fälten som faktiskt skickades',
        'Tar bort alla fält som är None',
        'Ger alla fält med standardvärden',
        'Kontrollerar fälten igen',
      ],
      explain:
        'Annars skulle fält som inte skickades skriva över det gamla med None.',
    },
    {
      question: 'Vad står bokstäverna i CRUD för?',
      options: [
        'Create, Read, Update, Delete',
        'Copy, Run, Use, Debug',
        'Client, Request, Update, Data',
        'Create, Return, Upload, Delete',
      ],
      explain: 'Skapa, läsa, ändra och ta bort – det nästan varje app behöver.',
    },
  ],
  beroenden: [
    {
      question: 'Vad är skillnaden mellan 401 och 403?',
      options: [
        '401: vi vet inte vem du är. 403: du får inte',
        '401: du får inte. 403: vi vet inte vem du är',
        '401: sidan finns inte. 403: servern kraschade',
        'Det finns ingen skillnad',
      ],
      explain:
        'Med 401 hjälper det att logga in. Med 403 hjälper det inte – du saknar behörighet.',
    },
    {
      question: 'Vad svarar /hemligt utan header?',
      code: "from fastapi import FastAPI, Depends, Header, HTTPException\n\napp = FastAPI()\n\ndef nyckel(x_api_nyckel: str | None = Header(default=None)):\n    if x_api_nyckel != 'hemlig':\n        raise HTTPException(status_code=401, detail='Fel nyckel')\n\n@app.get('/hemligt', dependencies=[Depends(nyckel)])\ndef hemligt():\n    return 42",
      check: "__get('/hemligt').status",
      options: ['401', '200', '422', '403'],
      explain: 'Beroendet körs före vägen och gör raise, så vägen körs aldrig.',
    },
    {
      question: 'Vilken header läser parametern x_api_nyckel: str = Header()?',
      options: ['x-api-nyckel', 'x_api_nyckel', 'X_API_NYCKEL', 'api-nyckel'],
      explain: 'FastAPI byter _ mot - i namnet på headern.',
    },
    {
      question: 'Vad används app.dependency_overrides till?',
      options: [
        'Att byta ut ett beroende, t.ex. en riktig AI mot en låtsas-AI i tester',
        'Att stänga av alla beroenden',
        'Att köra beroenden två gånger',
        'Att visa beroenden i dokumentationen',
      ],
      explain: 'Vägarna ändras inte – de får bara en annan sak från Depends.',
    },
  ],
  databas: [
    {
      question: 'Varför ska värden sättas in med ? i SQL?',
      options: [
        'Så att ingen kan lura databasen med SQL-injektion',
        'För att det går snabbare att skriva',
        'För att sqlite3 inte klarar f-strängar',
        'Det spelar ingen roll',
      ],
      explain:
        'Med ? skickas värdet alltid som ett värde och aldrig som en del av SQL:en.',
    },
    {
      question: 'Vad ger fetchone() om ingen rad hittades?',
      code: "import sqlite3\n\ndb = sqlite3.connect(':memory:')\ndb.execute('create table t (id integer)')",
      check: "db.execute('select * from t where id = 1').fetchone()",
      options: ['None', '[]', '0', 'Ett fel'],
      explain: 'Kolla om raden är None och svara då 404.',
    },
    {
      question: 'Vad betyder rowcount == 0 efter en UPDATE?',
      options: [
        'Ingen rad ändrades – det fanns inget med det id:t',
        'Alla rader ändrades',
        'Ändringen sparades inte',
        'Databasen är tom',
      ],
      explain: 'Då passar det att svara 404.',
    },
    {
      question: 'När körs koden efter yield i ett beroende?',
      options: [
        'När vägen är klar, t.ex. för att stänga databasen',
        'Före vägen',
        'Aldrig',
        'Bara om vägen kraschar',
      ],
      explain:
        'Det före yield förbereder, det efter städar upp – oftast i en finally.',
    },
  ],
  async: [
    {
      question:
        'Tre anrop som tar 1, 2 och 3 sekunder körs med asyncio.gather. Hur lång tid tar det?',
      code: "import asyncio\n\nfrom fastapi import FastAPI\n\napp = FastAPI()\n\nasync def vanta(s):\n    await asyncio.sleep(s)\n\n@app.get('/')\nasync def alla():\n    await asyncio.gather(vanta(1), vanta(2), vanta(3))",
      check: "str(round(__tid('/'))) + ' sekunder'",
      options: ['3 sekunder', '6 sekunder', '1 sekunder', '2 sekunder'],
      explain:
        'gather väntar på alla samtidigt, så det tar som det långsammaste.',
    },
    {
      question: 'Vad får du om du glömmer await framför en async-funktion?',
      options: [
        'En coroutine – ett löfte om ett svar som ingen väntar in',
        'Svaret, fast långsammare',
        'None',
        'Ett svar från förra anropet',
      ],
      explain: 'Funktionen körs inte förrän någon väntar in den med await.',
    },
    {
      question:
        'Vilken statuskod passar när en tjänst bakom API:et inte svarar i tid?',
      options: ['504', '404', '401', '201'],
      explain: '504 Gateway Timeout. Fånga TimeoutError från asyncio.wait_for.',
    },
    {
      question: 'Varför byggs AI-tjänster ofta med async?',
      options: [
        'Ett modellanrop tar sekunder, och servern kan göra annat medan den väntar',
        'AI-modeller kräver async för att fungera',
        'async gör svaren från modellen bättre',
        'async gör anropen billigare',
      ],
      explain:
        'Med async och gather kan flera frågor till modellen skickas på en gång.',
    },
  ],
  felsok: [
    {
      question: 'Vad svarar POST /hundar?',
      code: "from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.post('/hundar')\ndef ny():\n    return {'namn': 'Bamse'}, 201",
      check: "__post('/hundar').status",
      options: ['200', '201', '422', '500'],
      explain:
        'return x, 201 är Flask-stil. I FastAPI blir det en lista, och statuskoden 200.',
    },
    {
      question: 'Vad svarar en vägfunktion som saknar return?',
      code: "from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get('/')\ndef start():\n    svar = {'hej': True}",
      check: "__get('/').text",
      options: ['null', '{}', '""', '404'],
      explain: 'Utan return blir det None, och None blir null i JSON.',
    },
    {
      question: 'Vad är fel i Depends(inloggad())?',
      options: [
        'Funktionen anropas en gång när appen startar, i stället för vid varje anrop',
        'Ingenting, det är samma sak',
        'Det måste stå depends med litet d',
        'Beroenden får inte ha parametrar',
      ],
      explain: 'Ge funktionen till Depends: Depends(inloggad).',
    },
    {
      question: 'Vad är det första du ska göra när ett anrop svarar fel?',
      options: [
        'Läsa statuskoden och svaret',
        'Skriva om hela appen',
        'Byta från FastAPI till Flask',
        'Ta bort alla typer',
      ],
      explain:
        '404, 405, 422 och 500 betyder helt olika saker – och 422 säger exakt var felet är.',
    },
  ],
  slutprojekt: [
    {
      question: 'Vad betyder RAG?',
      options: [
        'Hämta passande text och skicka med den till modellen som underlag',
        'Att modellen svarar slumpmässigt',
        'Att spara alla svar i en databas',
        'Ett sätt att göra API:et snabbare',
      ],
      explain:
        'Retrieval-Augmented Generation: modellen svarar utifrån dina texter, inte bara sitt eget minne.',
    },
    {
      question: 'Varför kopplas AI-modellen in med Depends(hamta_ai)?',
      options: [
        'Så att den kan bytas mot en låtsasmodell i tester, eller en annan modell, utan att ändra vägarna',
        'Annars fungerar inte await',
        'Depends gör modellen snabbare',
        'Det krävs av Pydantic',
      ],
      explain: 'Vägarna bryr sig bara om att de får något med rätt metoder.',
    },
    {
      question: 'Vilka vägar ska kräva en nyckel i ett API där alla får läsa?',
      options: [
        'POST, PATCH och DELETE – de som ändrar något',
        'Bara GET',
        'Alla vägar',
        'Inga vägar',
      ],
      explain: 'Läsvägarna är öppna, skrivvägarna skyddas.',
    },
    {
      question: 'Varför loggas frågor med BackgroundTasks?',
      options: [
        'Så att den som frågar får svaret utan att vänta på loggningen',
        'Annars sparas inte loggen',
        'BackgroundTasks krypterar loggen',
        'Det måste man med async',
      ],
      explain: 'Bakgrundsjobb körs efter att svaret har skickats.',
    },
  ],
};
