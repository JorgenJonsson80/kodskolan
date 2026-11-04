// Egna projekt att bygga på Lekplatsen när ett projekt på banan är klart.
// Här finns inga tester – eleven bestämmer själv när det är klart.
// Idéerna använder bara det man lärt sig fram till och med banan.
// goals: vad programmet ska klara. extra: för den som vill ha mer.
export const IDEAS = [
  {
    id: 'idea-humor',
    track: 'grunder',
    emoji: '😊',
    title: 'Humörmätaren',
    summary: 'Fråga hur någon mår och svara olika beroende på svaret.',
    goals: [
      'Fråga efter namnet och hur personen mår på en skala 1–10.',
      'Svara på tre olika sätt beroende på siffran, med namnet i svaret.',
    ],
    extra: 'Säg till om siffran är mindre än 1 eller större än 10.',
  },
  {
    id: 'idea-raknesnurra',
    track: 'grunder',
    emoji: '➗',
    title: 'Räknesnurran',
    summary: 'En miniräknare som frågar efter två tal och ett räknesätt.',
    goals: [
      'Fråga efter två tal och gör om dem med `int()` eller `float()`.',
      'Fråga efter räknesättet: `+`, `-`, `*` eller `/`.',
      'Skriv ut svaret, eller "Okänt räknesätt".',
    ],
    extra: 'Vad händer om man delar med 0? Säg till innan det kraschar.',
  },
  {
    id: 'idea-helg',
    track: 'grunder',
    emoji: '📅',
    title: 'Är det helg?',
    summary: 'Fråga efter veckodagen och svara om det är helg.',
    goals: [
      'Fråga vilken dag det är.',
      'Svara "Helg! 🎉" för lördag och söndag och "Vardag" annars.',
    ],
    extra:
      'Fungerar det om någon skriver "Lördag" med stor bokstav? Tips: `or` låter dig kolla två svar i samma if.',
  },
  {
    id: 'idea-fizzbuzz',
    track: 'loopar',
    emoji: '🐝',
    title: 'FizzBuzz',
    summary: 'Den klassiska uppgiften som många får på sin första kodintervju.',
    goals: [
      'Skriv ut talen 1 till 30.',
      'Skriv "Fizz" i stället för tal som är delbara med 3, och "Buzz" för tal delbara med 5. Tips: `tal % 3 == 0` är sant när talet är delbart med 3.',
      'Skriv "FizzBuzz" för tal som är delbara med både 3 och 5.',
    ],
    extra:
      'Tänk på i vilken ordning villkoren kollas. Vad händer om du byter plats på dem?',
  },
  {
    id: 'idea-primtal',
    track: 'loopar',
    emoji: '🔢',
    title: 'Primtalsjakten',
    summary: 'Ta reda på om ett tal bara är delbart med 1 och sig självt.',
    goals: [
      'Fråga efter ett tal.',
      'Prova att dela med alla tal från 2 och uppåt med en loop.',
      'Skriv ut om talet är ett primtal eller inte.',
    ],
    extra: 'Skriv ut alla primtal under 100.',
  },
  {
    id: 'idea-tabellen',
    track: 'loopar',
    emoji: '✖️',
    title: 'Hela gångertabellen',
    summary: 'Skriv ut gångertabellen 1–10 som ett rutnät.',
    goals: [
      'Använd en loop inuti en annan loop.',
      'Skriv ut en rad per tal, med alla tio produkter på raden.',
    ],
    extra:
      'Få kolumnerna att hamna rakt under varandra. Tips: `str(tal).rjust(4)` fyller ut till fyra tecken.',
  },
  {
    id: 'idea-attgora',
    track: 'listor',
    emoji: '✅',
    title: 'Att göra-listan',
    summary: 'Lägg till och bocka av saker att göra.',
    goals: [
      'Låt användaren skriva in saker tills de trycker Enter.',
      'Skriv ut listan numrerad.',
      'Fråga vilket nummer som är klart och ta bort det med `pop`.',
    ],
    extra:
      'Låt användaren bocka av flera saker, en i taget, tills listan är tom.',
  },
  {
    id: 'idea-vader',
    track: 'listor',
    emoji: '🌦️',
    title: 'Väderstatistik',
    summary: 'Skriv in veckans temperaturer och få statistik.',
    goals: [
      'Fråga efter sju temperaturer och spara dem i en lista.',
      'Skriv ut medel, högsta och lägsta.',
      'Räkna hur många dagar det var minusgrader.',
    ],
    extra: 'Skriv ut vilken dag (1–7) som var varmast.',
  },
  {
    id: 'idea-topplista',
    track: 'listor',
    emoji: '🎮',
    title: 'Topplistan',
    summary: 'Spara resultat och visa de tre bästa.',
    goals: [
      'Skriv in några resultat och spara dem i en lista.',
      'Sortera listan. Tips: `lista.sort(reverse=True)` sorterar störst först.',
      'Skriv ut de tre bästa med en skiva: `lista[:3]`.',
    ],
    extra: 'Vad händer om det finns färre än tre resultat?',
  },
  {
    id: 'idea-skottar',
    track: 'funktioner',
    emoji: '🗓️',
    title: 'Skottår',
    summary: 'En funktion som svarar på om ett år är ett skottår.',
    goals: [
      'Skapa `ar_skottar(ar)` som returnerar True eller False.',
      'Regeln: delbart med 4, men inte med 100 – utom om det är delbart med 400.',
      'Testa med 2024 (ja), 1900 (nej) och 2000 (ja).',
    ],
    extra: 'Skapa `dagar_i_manad(manad, ar)` som använder `ar_skottar`.',
  },
  {
    id: 'idea-enheter',
    track: 'funktioner',
    emoji: '📏',
    title: 'Enhetsomvandlaren',
    summary: 'Funktioner som räknar om mellan enheter.',
    goals: [
      'Skapa minst tre funktioner, t.ex. km till mil och kg till pund.',
      'Fråga användaren vad som ska räknas om och anropa rätt funktion.',
    ],
    extra: 'Avrunda svaret med `round(tal, 2)`.',
  },
  {
    id: 'idea-tarning',
    track: 'funktioner',
    emoji: '🎲',
    title: 'Poängräknaren för Yatzy',
    summary: 'Räkna poäng för fem tärningar.',
    goals: [
      'Skapa `summa_av(tarningar, varde)` som räknar poängen för t.ex. alla treor.',
      'Skapa `chans(tarningar)` som summerar alla tärningar.',
      'Testa med listor som `[3, 3, 5, 1, 3]`.',
    ],
    extra: 'Skapa `ar_yatzy(tarningar)` som är True när alla fem är lika.',
  },
  {
    id: 'idea-palindrom',
    track: 'strangar',
    emoji: '🔁',
    title: 'Palindromkollen',
    summary: 'Är ordet samma framlänges och baklänges?',
    goals: [
      'Skapa `ar_palindrom(text)`. Tips: `text[::-1]` ger texten baklänges.',
      'Strunta i stora och små bokstäver.',
      'Testa med "Anna", "kajak" och "hej".',
    ],
    extra:
      'Klara hela meningar som "Ni talar bra latin" genom att ta bort mellanslagen först.',
  },
  {
    id: 'idea-hanga',
    track: 'strangar',
    emoji: '🪢',
    title: 'Gissa ordet',
    summary: 'Gissa bokstäver tills hela det hemliga ordet syns.',
    goals: [
      'Spara ett hemligt ord och en text med gissade bokstäver.',
      'Visa ordet med `_` för bokstäver som inte gissats än.',
      'Fråga efter bokstäver tills hela ordet är gissat.',
    ],
    extra: 'Ge bara tio felgissningar innan spelet är slut.',
  },
  {
    id: 'idea-kvitto',
    track: 'strangar',
    emoji: '🧾',
    title: 'Kvittot',
    summary: 'Skriv ut ett snyggt kvitto med raka kolumner.',
    goals: [
      'Ha några varor och priser i två listor.',
      'Skriv ut en rad per vara med f-strängar.',
      'Få priserna att hamna rakt under varandra. Tips: `f"{vara:<12}{pris:>6}"`.',
    ],
    extra: 'Lägg till moms och en totalsumma längst ner.',
  },
  {
    id: 'idea-ordraknare',
    track: 'dictionaries',
    emoji: '🔤',
    title: 'Vanligaste ordet',
    summary: 'Klistra in en text och se vilka ord som används mest.',
    goals: [
      'Räkna orden i en lång text med en dictionary.',
      'Strunta i stora och små bokstäver och ta bort punkter och kommatecken.',
      'Skriv ut det vanligaste ordet och hur många gånger det finns.',
    ],
    extra: 'Skriv ut de fem vanligaste orden.',
  },
  {
    id: 'idea-glosor',
    track: 'dictionaries',
    emoji: '🇬🇧',
    title: 'Glosförhöret',
    summary: 'Förhör dig själv på engelska glosor.',
    goals: [
      'Spara glosorna i en dictionary: svenska som nyckel, engelska som värde.',
      'Fråga efter varje glosa och säg om svaret är rätt.',
      'Skriv ut hur många rätt det blev.',
    ],
    extra: 'Spara de felaktiga glosorna och förhör dem igen på slutet.',
  },
  {
    id: 'idea-recept',
    track: 'dictionaries',
    emoji: '🍪',
    title: 'Receptboken',
    summary: 'Recept med ingredienser som räknas om efter antal portioner.',
    goals: [
      'Spara ett recept som en dictionary: ingrediens och mängd för 4 portioner.',
      'Fråga hur många portioner det ska bli.',
      'Skriv ut alla ingredienser med omräknade mängder.',
    ],
    extra:
      'Ha flera recept i en dictionary med recept, och låt användaren välja.',
  },
  {
    id: 'idea-betyg',
    track: 'smidigare',
    emoji: '📊',
    title: 'Klassens resultat',
    summary: 'Elevernas poäng blir godkända, topplista och snitt.',
    goals: [
      'Spara elever och poäng i två listor, eller som tupler i en lista.',
      'Plocka ut de godkända med en list comprehension.',
      'Skriv ut en numrerad topplista med sorted, lambda och enumerate.',
    ],
    extra:
      'Räkna ut snittet med sum() och len(), och skriv ut vilka som ligger över det.',
  },
  {
    id: 'idea-filmlista',
    track: 'smidigare',
    emoji: '🍿',
    title: 'Filmlistan',
    summary: 'Din egen lista med filmer, betyg och längd.',
    goals: [
      'Spara filmerna som tupler: (titel, betyg, minuter).',
      'Fråga efter max antal minuter och visa filmerna som får plats.',
      'Sortera dem efter betyg, bästa först.',
    ],
    extra: 'Fråga efter en genre också, och lägg till genren i tuplerna.',
  },
  {
    id: 'idea-namngenerator',
    track: 'smidigare',
    emoji: '🪪',
    title: 'Namnmaskinen',
    summary: 'Gör smeknamn och användarnamn av en lista med namn.',
    goals: [
      'Fråga efter några namn och dela upp dem med split.',
      'Gör användarnamn av alla på en gång med en list comprehension.',
      'Para ihop namn och användarnamn med zip och skriv ut dem.',
    ],
    extra:
      'Gör en dictionary med namnet som nyckel och användarnamnet som värde.',
  },
  {
    id: 'idea-talfragare',
    track: 'undantag',
    emoji: '🔢',
    title: 'Talfrågaren',
    summary: 'En funktion som frågar efter ett tal tills svaret duger.',
    goals: [
      'Skapa fraga_tal(fraga, minst, mest) som frågar med input() tills svaret är ett heltal.',
      'Säg till om talet är för litet eller för stort, och fråga igen.',
      'Använd den för att fråga efter ålder och skostorlek.',
    ],
    extra:
      'Låt användaren skriva "avbryt" för att sluta, och returnera None då.',
  },
  {
    id: 'idea-losenordsregler',
    track: 'undantag',
    emoji: '🔐',
    title: 'Lösenordsreglerna',
    summary:
      'Kolla ett nytt lösenord mot flera regler och säg vilken som bryts.',
    goals: [
      'Skapa kolla_losenord(losenord) med en raise ValueError per regel.',
      'Regler: minst 8 tecken, minst en siffra och inte samma som användarnamnet.',
      'Fråga tills lösenordet klarar alla regler.',
    ],
    extra: 'Samla alla regler som bryts i en lista och visa dem på en gång.',
  },
  {
    id: 'idea-kvittolasare',
    track: 'undantag',
    emoji: '🧾',
    title: 'Kvittoläsaren',
    summary:
      'Läs rader som "mjölk;15" och räkna ihop ett kvitto, även när raderna är trasiga.',
    goals: [
      'Ha en lista med rader, där några saknar ; eller har ett pris som inte är ett tal.',
      'Gör om varje rad i ett try och hoppa över de trasiga med ett meddelande.',
      'Skriv ut summan av de rader som gick att läsa.',
    ],
    extra: 'Skriv ut på vilket radnummer varje fel fanns, med enumerate.',
  },
  {
    id: 'idea-gissa-talet',
    track: 'moduler',
    emoji: '🎯',
    title: 'Gissa talet',
    summary: 'Datorn tänker på ett tal, och du gissar tills du hittar det.',
    goals: [
      'Slumpa ett tal från 1 till 100 med random.randint.',
      'Fråga efter en gissning tills den är rätt, och säg För högt eller För lågt.',
      'Skriv ut hur många gissningar det tog.',
    ],
    extra:
      'Fånga ValueError när svaret inte är ett tal, och räkna inte den gissningen.',
  },
  {
    id: 'idea-nedrakning',
    track: 'moduler',
    emoji: '⏳',
    title: 'Nedräkningen',
    summary:
      'Hur många dagar är det kvar till jul, sommarlovet och din födelsedag?',
    goals: [
      'Hämta dagens datum med date.today().',
      'Ha en dictionary med händelser och deras datum.',
      'Skriv ut hur många dagar det är kvar till var och en.',
    ],
    extra:
      'Skriv också vilken veckodag det blir, och hoppa över det som redan varit.',
  },
  {
    id: 'idea-lagindelaren',
    track: 'moduler',
    emoji: '🤝',
    title: 'Lagindelaren',
    summary: 'Dela in klassen i lag på måfå, så att ingen kan klaga.',
    goals: [
      'Ha en lista med namn.',
      'Blanda en kopia med random.shuffle.',
      'Dela den i två lag med slicing och skriv ut lagen.',
    ],
    extra:
      'Fråga hur många lag det ska bli, och lotta en lagkapten i varje lag.',
  },
  {
    id: 'idea-roboten',
    track: 'klasser',
    emoji: '🤖',
    title: 'Roboten',
    summary: 'En robot på ett rutnät som du styr med kommandon.',
    goals: [
      'Skapa klassen Robot med x och y som börjar på 0.',
      'Ge den metoderna upp, ner, vanster och hoger som flyttar den ett steg.',
      'Fråga efter kommandon med input() och skriv ut var roboten står efter varje.',
    ],
    extra:
      'Låt rutnätet vara 10 x 10 och gör raise ValueError om roboten försöker gå utanför.',
  },
  {
    id: 'idea-elevregistret',
    track: 'klasser',
    emoji: '🎓',
    title: 'Elevregistret',
    summary: 'Elever med provresultat, och en klass som räknar ut snittet.',
    goals: [
      'Skapa klassen Elev med namn och en tom lista med resultat.',
      'Ge den metoderna nytt_resultat(poang) och snitt().',
      'Lägg några elever i en lista och skriv ut den med högst snitt.',
    ],
    extra: 'Ge Elev en __str__ som visar namnet och snittet med en decimal.',
  },
  {
    id: 'idea-monsterstriden',
    track: 'klasser',
    emoji: '⚔️',
    title: 'Monsterstriden',
    summary: 'Två monster slåss tills det ena inte orkar mer.',
    goals: [
      'Skapa klassen Monster med namn, liv och styrka.',
      'Ge den metoden attackera(annat) som drar random.randint(1, styrka) från det andras liv.',
      'Låt två monster turas om att attackera tills ett har 0 liv, och skriv ut vinnaren.',
    ],
    extra:
      'Lägg till en metod lak() som ger tillbaka lite liv, och låt monstret välja ibland.',
  },
  {
    id: 'idea-buggjakt',
    track: 'felsokning',
    emoji: '🐛',
    title: 'Buggjakt för en kompis',
    summary: 'Gömma buggar är det bästa sättet att lära sig hitta dem.',
    goals: [
      'Ta ett program du byggt tidigare och kopiera det hit.',
      'Lägg in tre buggar: en som kraschar och två som bara ger fel svar.',
      'Låt en kompis hitta dem – eller vänta en vecka och hitta dem själv.',
    ],
    extra:
      'Skriv assert-rader som visar vad programmet ska göra, så att buggarna märks.',
  },
  {
    id: 'idea-assert',
    track: 'felsokning',
    emoji: '✔️',
    title: 'Testa allt med assert',
    summary: 'Skriv tester till dina gamla funktioner och se om de håller.',
    goals: [
      'Välj tre funktioner från tidigare banor.',
      'Skriv minst fem assert för var och en.',
      'Glöm inte de knepiga fallen: 0, negativa tal, tom text och tom lista.',
    ],
    extra:
      'Hittade du en bugg? Laga den, och låt assert-raden stå kvar så att den aldrig kommer tillbaka.',
  },
  {
    id: 'idea-gummianka',
    track: 'felsokning',
    emoji: '🦆',
    title: 'Gummiankan',
    summary:
      'Programmerare förklarar koden rad för rad för en gummianka – och hittar felet medan de pratar.',
    goals: [
      'Ta ett program du tycker är svårt.',
      'Skriv en kommentar ovanför varje rad som förklarar vad den gör och varför.',
      'Stryk under det du inte kan förklara – där brukar buggarna gömma sig.',
    ],
    extra: 'Kör programmet rad för rad och jämför med dina kommentarer.',
  },
  {
    id: 'idea-djurparken',
    track: 'pandas',
    emoji: '🦒',
    title: 'Djurparken',
    summary: 'Utforska djurparkens djur i filen djur.csv.',
    files: {
      'djur.csv': `namn,art,hage,vikt,alder
Gunnar,giraff,Savannen,1100,12
Greta,giraff,Savannen,830,7
Leo,lejon,Savannen,190,9
Lisa,lejon,Savannen,130,4
Pingo,pingvin,Isen,30,3
Pia,pingvin,Isen,25,6
Pelle,pingvin,Isen,28,1
Ella,elefant,Djungeln,5400,25
Elof,elefant,Djungeln,6100,31
Zara,zebra,Savannen,380,5
`,
    },
    goals: [
      'Läs in djur.csv med pd.read_csv och skriv ut tabellen.',
      'Vilket djur är tyngst? Hur gamla är djuren i snitt per art?',
      'Hur många djur bor i varje hage, och vilken hage har mest vikt totalt?',
    ],
    extra:
      'Lägg till kolumnen ung som är True för djur under 5 år, och räkna hur många unga djur varje hage har.',
  },
  {
    id: 'idea-egen-data',
    track: 'pandas',
    emoji: '✍️',
    title: 'Din egen data',
    summary: 'Skriv in data om dig själv och se vad den säger.',
    goals: [
      'Skriv en CSV som text, t.ex. datum, sömn och steg för en vecka.',
      'Läs in den med pd.read_csv(io.StringIO(text)) – io hämtas med import io.',
      'Räkna ut snittet och hitta din bästa och sämsta dag.',
    ],
    extra: 'Gör om datumen med pd.to_datetime och jämför vardagar med helgen.',
  },
  {
    id: 'idea-biblioteket',
    track: 'pandas',
    emoji: '📖',
    title: 'Bibliotekets lån',
    summary: 'Vilka böcker lånas mest, och när?',
    files: {
      'lan.csv': `datum,titel,forfattare,genre,dagar
2026-09-02,Hobbiten,J.R.R. Tolkien,fantasy,21
2026-09-03,Mio min Mio,Astrid Lindgren,barn,14
2026-09-03,Pippi Långstrump,Astrid Lindgren,barn,21
2026-09-10,Hobbiten,J.R.R. Tolkien,fantasy,18
2026-09-12,Dune,Frank Herbert,science fiction,30
2026-09-15,Bröderna Lejonhjärta,Astrid Lindgren,barn,10
2026-09-20,Hobbiten,J.R.R. Tolkien,fantasy,25
2026-09-21,Dune,Frank Herbert,science fiction,28
2026-09-28,Mio min Mio,Astrid Lindgren,barn,7
`,
    },
    goals: [
      'Läs in lan.csv och räkna hur många gånger varje titel lånats.',
      'Vilken författare lånas mest, och vilken genre?',
      'Hur många dagar har böckerna i snitt per genre?',
    ],
    extra:
      'Hitta lånen som var längre än 21 dagar – de var försenade – och räkna dem per författare.',
  },
  {
    id: 'idea-eget-aventyr',
    track: 'slutprojekt',
    emoji: '🏰',
    title: 'Ditt eget äventyr',
    summary: 'Ett textäventyr i en värld du hittar på själv.',
    goals: [
      'Rita kartan på papper först: minst fem rum och hur de hänger ihop.',
      'Skriv rummen som data i RUM, med text, utgångar och saker.',
      'Ge spelet ett mål – en sak att hitta eller en dörr att öppna – och skriv spelloopen.',
    ],
    extra:
      'Spara spelet i en fil med kommandot spara, och fortsätt där du var nästa gång.',
  },
  {
    id: 'idea-egen-fragesport',
    track: 'slutprojekt',
    emoji: '❓',
    title: 'Din egen frågesport',
    summary: 'En frågesport om något du kan mycket om.',
    goals: [
      'Välj ett ämne och skriv minst tio frågor som data, med flera godkända svar.',
      'Blanda frågorna med random.shuffle, så att det blir nytt varje gång.',
      'Spara resultaten i en fil och visa en topplista.',
    ],
    extra:
      'Ge frågorna en svårighetsgrad och mer poäng för de svåra, eller låt spelaren välja ämne.',
  },
  {
    id: 'idea-egen-analys',
    track: 'slutprojekt',
    emoji: '🔬',
    title: 'Din egen analys',
    summary: 'Ställ frågor till data om något du bryr dig om.',
    goals: [
      'Skriv in en egen CSV som text: sömn, träning, matlådor, spelresultat – vad som helst.',
      'Skriv ner tre frågor du vill ha svar på innan du börjar räkna.',
      'Svara på frågorna med pandas och skriv svaren till rapport.txt.',
    ],
    extra:
      'Leta efter samband: blir det fler steg de dagar du sovit mer? Dela upp i två grupper och jämför snittet.',
  },
  {
    id: 'idea-egen-dashboard',
    track: 'streamlit',
    emoji: '🖥️',
    title: 'Din egen dashboard',
    summary: 'En webbapp som visar din egen data med filter och diagram.',
    starterCode: 'import streamlit as st\nimport pandas as pd\n',
    goals: [
      'Skriv en egen CSV som text och läs in den med pd.read_csv(io.StringIO(text)).',
      'Lägg filter i st.sidebar och visa nyckeltal med st.metric i kolumner.',
      'Rita ett diagram som ändras när filtret ändras.',
    ],
    extra:
      'Lägg till st.download_button så att man kan ladda ner urvalet – det fungerar i riktig Streamlit.',
  },
  {
    id: 'idea-eget-verktyg',
    track: 'streamlit',
    emoji: '🛠️',
    title: 'Ett verktyg för dig själv',
    summary: 'En liten app som räknar ut något du ofta behöver.',
    starterCode: 'import streamlit as st\n',
    goals: [
      'Välj något du räknar på ofta: matlåde-portioner, sparande, träningspass.',
      'Ta in värdena med st.number_input, st.slider och st.selectbox.',
      'Visa svaret stort med st.metric och förklara det med st.caption.',
    ],
    extra:
      'Spara historiken i st.session_state och visa den i en tabell under.',
  },
  {
    id: 'idea-webbspel',
    track: 'streamlit',
    emoji: '🕹️',
    title: 'Gissa talet i webbläsaren',
    summary: 'Gissa talet-spelet, men som en app med knappar.',
    starterCode: 'import random\nimport streamlit as st\n',
    goals: [
      'Slumpa talet en gång och spara det i st.session_state.',
      'Låt spelaren gissa med st.number_input och en knapp Gissa.',
      'Säg för högt eller för lågt, räkna gissningarna och kör st.balloons() vid rätt svar.',
    ],
    extra: 'Lägg till en knapp Nytt spel och en svårighetsgrad i sidopanelen.',
  },
];

// Startkoden för en idé: målen som kommentarer, så att de syns medan man
// bygger. Utan idé börjar Lekplatsen med ett litet exempel.
export function ideaStarterCode(idea) {
  if (!idea) {
    return '# Skriv vad du vill och tryck på Kör koden.\nnamn = input("Vad heter du? ")\nprint("Hej " + namn + "!")\n';
  }
  const goals = idea.goals.map(goal => `# - ${goal.replace(/`/g, '')}`);
  return `# ${idea.emoji} ${idea.title}\n${goals.join('\n')}\n\n${idea.starterCode ?? ''}`;
}
