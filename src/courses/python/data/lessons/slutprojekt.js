// Bana 13: slutprojektet – verktygen för att bygga något större: planera
// med funktioner, menyer, spelets läge, data som styr programmet, en
// klass för helheten och filer som sparar mellan körningarna.
const TOPPLISTA = 'Ada;12\nCy;9\n';

export const SLUTPROJEKT = [
  {
    id: 'slut-01',
    track: 'slutprojekt',
    title: 'Planera uppifrån',
    xp: 10,
    description:
      'Ett större program börjar med en plan. Skriv först vad programmet gör, med funktioner som inte finns än – och fyll i dem sedan.',
    explain:
      'Börja med huvudprogrammet längst ner: tre rader som läses som en plan. Varje rad anropar en funktion som gör *en* sak.\n\nFunktionerna kan först vara tomma med `pass`. Då går programmet att köra hela tiden, och du fyller i en funktion i taget. Det kallas att bygga uppifrån och ner, och det är så nästan alla större program byggs.',
    example:
      'def las_in():\n    pass  # fylls i sedan\n\n\ndef rakna(data):\n    pass\n\n\ndata = las_in()\nprint(rakna(data))',
    task: 'Uppgift: Planen längst ner är klar, men funktionerna är tomma. Fyll i dem:\n  – `fraga_namn()` frågar `Namn? ` och tar bort mellanslag och gör stor första bokstav med `.strip().title()`\n  – `fraga_storlek()` frågar `Liten eller stor? ` och gör om till små bokstäver\n  – `kvitto(namn, storlek)` ger t.ex. `Ada: stor kaffe, 40 kr` – liten kostar 30 kr och stor 40 kr',
    starterCode:
      'def fraga_namn():\n    pass\n\n\ndef fraga_storlek():\n    pass\n\n\ndef kvitto(namn, storlek):\n    pass\n\n\nnamn = fraga_namn()\nstorlek = fraga_storlek()\nprint(kvitto(namn, storlek))\n',
    solution:
      'def fraga_namn():\n    return input("Namn? ").strip().title()\n\n\ndef fraga_storlek():\n    return input("Liten eller stor? ").lower()\n\n\ndef kvitto(namn, storlek):\n    pris = 40 if storlek == "stor" else 30\n    return f"{namn}: {storlek} kaffe, {pris} kr"\n\n\nnamn = fraga_namn()\nstorlek = fraga_storlek()\nprint(kvitto(namn, storlek))\n',
    hints: [
      'Byt pass mot return i varje funktion.',
      'return input("Namn? ").strip().title()',
      'I kvitto: välj pris med if, och returnera en f-sträng.',
    ],
    inputs: ['  ada ', 'STOR'],
    tests: [
      {
        description: 'Svaren "  ada " och "STOR" ger Ada: stor kaffe, 40 kr',
        code: '__output',
        expected: ['Ada: stor kaffe, 40 kr'],
      },
      {
        description: 'kvitto("Bo", "liten") är Bo: liten kaffe, 30 kr',
        code: 'kvitto("Bo", "liten")',
        expected: 'Bo: liten kaffe, 30 kr',
      },
    ],
  },
  {
    id: 'slut-02',
    track: 'slutprojekt',
    title: 'En meny',
    xp: 10,
    description:
      'Nästan alla program med input har en meny: välj något, gör det, och visa menyn igen.',
    explain:
      'En meny är en `while True` som frågar efter ett val. En `if` och `elif` per val gör det som valts, och `break` avslutar.\n\nSista `else` tar hand om allt annat användaren kan skriva. Utan den händer ingenting när någon skriver fel, och då tror de att programmet hängt sig.',
    example:
      'while True:\n    val = input("1 = hej, 2 = sluta: ")\n    if val == "1":\n        print("Hej!")\n    elif val == "2":\n        break\n    else:\n        print("Välj 1 eller 2")',
    task: 'Uppgift: Att göra-listan kan bara lägga till och sluta. Lägg till val `2` som skriver ut uppgifterna numrerade (`1. diska`), och ett `else` som skriver `Välj 1, 2 eller 3`.',
    starterCode:
      'uppgifter = []\nwhile True:\n    val = input("1 = lägg till, 2 = visa, 3 = sluta: ")\n    if val == "1":\n        uppgifter.append(input("Vad? "))\n    elif val == "3":\n        break\nprint("Hej då!")\n',
    solution:
      'uppgifter = []\nwhile True:\n    val = input("1 = lägg till, 2 = visa, 3 = sluta: ")\n    if val == "1":\n        uppgifter.append(input("Vad? "))\n    elif val == "2":\n        for nummer, uppgift in enumerate(uppgifter, start=1):\n            print(f"{nummer}. {uppgift}")\n    elif val == "3":\n        break\n    else:\n        print("Välj 1, 2 eller 3")\nprint("Hej då!")\n',
    hints: [
      'Lägg till elif val == "2": mellan de två som finns.',
      'for nummer, uppgift in enumerate(uppgifter, start=1): print(f"{nummer}. {uppgift}")',
      'Sist: else: print("Välj 1, 2 eller 3")',
    ],
    inputs: ['1', 'diska', '1', 'handla', '2', '7', '3'],
    tests: [
      {
        description: 'Lägg till två, visa, fel val och sluta',
        code: '__output',
        expected: ['1. diska', '2. handla', 'Välj 1, 2 eller 3', 'Hej då!'],
      },
      {
        description: 'Visa en tom lista och sluta',
        code: '__output',
        expected: ['Hej då!'],
        inputs: ['2', '3'],
      },
    ],
  },
  {
    id: 'slut-03',
    track: 'slutprojekt',
    title: 'Spelets läge i en dictionary',
    xp: 10,
    description:
      'Ett spel har många värden som ändras: liv, poäng, saker. Samla dem på ett ställe.',
    explain:
      'I stället för en massa lösa variabler samlas allt som beskriver spelaren i en dictionary: `spelare = {"liv": 3, "poang": 0, "saker": []}`.\n\nFunktionerna får dictionaryn och ändrar i den. Eftersom det är samma dictionary syns ändringen överallt – du behöver inte returnera den.',
    example:
      'spelare = {"liv": 3}\n\n\ndef aj(spelare):\n    spelare["liv"] -= 1\n\n\naj(spelare)\nprint(spelare["liv"])',
    task: 'Uppgift: Skapa `ny_spelare()` som returnerar `{"liv": 3, "poang": 0, "saker": []}`, `hitta(spelare, sak)` som lägger saken i saker och ger 10 poäng, och `status(spelare)` som ger t.ex. `Liv: 3, poäng: 10, saker: nyckel`. Utan saker står det `saker: inga`.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'def ny_spelare():\n    return {"liv": 3, "poang": 0, "saker": []}\n\n\ndef hitta(spelare, sak):\n    spelare["saker"].append(sak)\n    spelare["poang"] += 10\n\n\ndef status(spelare):\n    saker = ", ".join(spelare["saker"]) or "inga"\n    return f"Liv: {spelare[\'liv\']}, poäng: {spelare[\'poang\']}, saker: {saker}"\n\n\nspelare = ny_spelare()\nhitta(spelare, "nyckel")\nprint(status(spelare))\n',
    hints: [
      'ny_spelare returnerar en ny dictionary varje gång.',
      'hitta: spelare["saker"].append(sak) och spelare["poang"] += 10',
      'status: ", ".join(spelare["saker"]) – och "inga" om listan är tom.',
    ],
    tests: [
      {
        description: 'En ny spelare',
        code: 'status(ny_spelare())',
        expected: 'Liv: 3, poäng: 0, saker: inga',
      },
      {
        description: 'Två saker ger 20 poäng',
        code: '(s := ny_spelare(), hitta(s, "nyckel"), hitta(s, "lampa"), status(s))[-1]',
        expected: 'Liv: 3, poäng: 20, saker: nyckel, lampa',
      },
      {
        description: 'Två nya spelare delar inte saker',
        code: '(a := ny_spelare(), b := ny_spelare(), hitta(a, "nyckel"), b["saker"])[-1]',
        expected: [],
      },
    ],
  },
  {
    id: 'slut-04',
    track: 'slutprojekt',
    title: 'Data som styr programmet',
    xp: 10,
    description:
      'Ett textäventyr med tio rum behöver inte tio if-satser. Beskriv rummen som data, så räcker en funktion.',
    explain:
      'Varje rum är en dictionary med en text och utgångarna: vilket rum varje riktning leder till. Alla rum ligger i en stor dictionary, `RUM`.\n\nFunktionen `ga` behöver inte känna till ett enda rum. Den slår bara upp i datan. Vill du ha ett nytt rum lägger du till det i `RUM` – koden ändras inte alls.',
    example:
      'RUM = {\n    "hallen": {"text": "En hall.", "utgangar": {"norr": "köket"}},\n    "köket": {"text": "Det luktar kaffe.", "utgangar": {"söder": "hallen"}},\n}\nprint(RUM["hallen"]["utgangar"]["norr"])',
    task: 'Uppgift: Skapa `ga(rum, riktning)` som returnerar namnet på rummet åt det hållet. Finns ingen utgång åt det hållet: `raise ValueError("Du kan inte gå åt det hållet")`.',
    starterCode:
      'RUM = {\n    "hallen": {"text": "En stor hall.", "utgangar": {"norr": "köket", "öster": "biblioteket"}},\n    "köket": {"text": "Det luktar kaffe.", "utgangar": {"söder": "hallen"}},\n    "biblioteket": {"text": "Böcker överallt.", "utgangar": {"väster": "hallen"}},\n}\n',
    solution:
      'RUM = {\n    "hallen": {"text": "En stor hall.", "utgangar": {"norr": "köket", "öster": "biblioteket"}},\n    "köket": {"text": "Det luktar kaffe.", "utgangar": {"söder": "hallen"}},\n    "biblioteket": {"text": "Böcker överallt.", "utgangar": {"väster": "hallen"}},\n}\n\n\ndef ga(rum, riktning):\n    utgangar = RUM[rum]["utgangar"]\n    if riktning not in utgangar:\n        raise ValueError("Du kan inte gå åt det hållet")\n    return utgangar[riktning]\n',
    hints: [
      'RUM[rum]["utgangar"] är utgångarna från rummet.',
      'if riktning not in utgangar: raise ValueError(…)',
      'return utgangar[riktning]',
    ],
    tests: [
      {
        description: 'Norr från hallen är köket',
        code: 'ga("hallen", "norr")',
        expected: 'köket',
      },
      {
        description: 'Väster från biblioteket är hallen',
        code: 'ga("biblioteket", "väster")',
        expected: 'hallen',
      },
      {
        description: 'Norr från köket går inte',
        code: '__message(ga, "köket", "norr")',
        expected: 'Du kan inte gå åt det hållet',
      },
      {
        description: 'Ett nytt rum fungerar utan att ga ändras',
        code: '(RUM["hallen"]["utgangar"].update({"ner": "källaren"}), ga("hallen", "ner"))[-1]',
        expected: 'källaren',
      },
    ],
  },
  {
    id: 'slut-05',
    track: 'slutprojekt',
    title: 'Frågor som data',
    xp: 10,
    description:
      'En frågesport är en lista med frågor. Med frågorna som data kan du byta eller lägga till frågor utan att röra koden.',
    explain:
      'Varje fråga är en dictionary med frågan och svaret, och alla ligger i en lista. En loop ställer dem i tur och ordning.\n\nJämför svaret med `.strip().lower()` på båda sidor. Annars blir `Stockholm ` (med mellanslag) fel, och det känns orättvist för den som spelar.',
    example:
      'FRAGOR = [{"fraga": "2 + 2?", "svar": "4"}]\nfor fraga in FRAGOR:\n    print(fraga["fraga"])',
    task: 'Uppgift: Skapa `kor_quiz(fragor)` som ställer varje fråga med `input(fraga["fraga"] + " ")`. Rätt svar skriver `Rätt!`, fel skriver t.ex. `Fel, det var 8`. Funktionen returnerar antalet rätt, och programmet skriver till sist `Du fick 2 av 3`.',
    starterCode:
      'FRAGOR = [\n    {"fraga": "Vad heter Sveriges huvudstad?", "svar": "Stockholm"},\n    {"fraga": "Hur många ben har en spindel?", "svar": "8"},\n    {"fraga": "Vilket språk lär du dig nu?", "svar": "Python"},\n]\n',
    solution:
      'FRAGOR = [\n    {"fraga": "Vad heter Sveriges huvudstad?", "svar": "Stockholm"},\n    {"fraga": "Hur många ben har en spindel?", "svar": "8"},\n    {"fraga": "Vilket språk lär du dig nu?", "svar": "Python"},\n]\n\n\ndef kor_quiz(fragor):\n    ratt = 0\n    for fraga in fragor:\n        svar = input(fraga["fraga"] + " ")\n        if svar.strip().lower() == fraga["svar"].lower():\n            print("Rätt!")\n            ratt += 1\n        else:\n            print(f"Fel, det var {fraga[\'svar\']}")\n    return ratt\n\n\npoang = kor_quiz(FRAGOR)\nprint(f"Du fick {poang} av {len(FRAGOR)}")\n',
    hints: [
      'Börja med ratt = 0 och en for-loop över fragor.',
      'Jämför svar.strip().lower() med fraga["svar"].lower().',
      'Efter loopen: return ratt. Längst ner: anropa och skriv ut resultatet.',
    ],
    inputs: [' stockholm ', 'sex', 'python'],
    tests: [
      {
        description: 'Två rätt och ett fel',
        code: '__output',
        expected: ['Rätt!', 'Fel, det var 8', 'Rätt!', 'Du fick 2 av 3'],
      },
      {
        description: 'Alla rätt',
        code: '__output[-1]',
        expected: 'Du fick 3 av 3',
        inputs: ['Stockholm', '8', 'PYTHON'],
      },
    ],
  },
  {
    id: 'slut-06',
    track: 'slutprojekt',
    title: 'Fråga tills svaret duger',
    xp: 10,
    description:
      'En hjälpfunktion som frågar om och om igen tills svaret är ett av valen. Skriv den en gång, använd den överallt.',
    explain:
      'I ett större program frågar du användaren många gånger. Om varje fråga har sin egen loop och sina egna kontroller blir det mycket kod som gör samma sak.\n\nEn funktion `fraga_val(fraga, val)` tar hand om allt: frågar, kollar och frågar igen. Resten av programmet kan lita på att svaret alltid är ett av valen.',
    example:
      'farg = fraga_val("Färg? ", ["röd", "blå"])\nstorlek = fraga_val("Storlek? ", ["S", "M", "L"])',
    task: 'Uppgift: Skapa `fraga_val(fraga, val)` som frågar med `input(fraga)` tills svaret finns i listan val, och då returnerar det. Vid fel svar skrivs t.ex. `Välj en av: sten, sax, påse`.',
    starterCode:
      '# Skriv fraga_val här\n\n\ndrag = fraga_val("Sten, sax eller påse? ", ["sten", "sax", "påse"])\nprint("Du valde " + drag)\n',
    solution:
      'def fraga_val(fraga, val):\n    while True:\n        svar = input(fraga)\n        if svar in val:\n            return svar\n        print("Välj en av: " + ", ".join(val))\n\n\ndrag = fraga_val("Sten, sax eller påse? ", ["sten", "sax", "påse"])\nprint("Du valde " + drag)\n',
    hints: [
      'En while True med input inuti.',
      'if svar in val: return svar – return avslutar loopen också.',
      'Annars: print("Välj en av: " + ", ".join(val))',
    ],
    inputs: ['papper', 'sax'],
    tests: [
      {
        description: 'Ett fel svar och sedan sax',
        code: '__output',
        expected: ['Välj en av: sten, sax, påse', 'Du valde sax'],
      },
      {
        description: 'Rätt direkt',
        code: '__output',
        expected: ['Du valde sten'],
        inputs: ['sten'],
      },
    ],
  },
  {
    id: 'slut-07',
    track: 'slutprojekt',
    title: 'En klass för hela spelet',
    xp: 10,
    description:
      'När ett spel har både data och regler är en klass ett bra hem för dem.',
    explain:
      'En `Quiz`-klass håller reda på frågorna, vilken fråga som är på tur och poängen. Koden som använder den behöver bara fråga: vad är nästa fråga, är det här rätt, är vi klara?\n\nDet gör det lätt att byta gränssnitt. Samma klass fungerar med input, i en webbsida eller i ett test.',
    example:
      'quiz = Quiz(FRAGOR)\nwhile not quiz.klar():\n    svar = input(quiz.fraga() + " ")\n    quiz.svara(svar)\nprint(quiz.poang)',
    task: 'Uppgift: Skapa klassen `Quiz` med `__init__(self, fragor)` som också sätter `nummer` och `poang` till 0. Metoder: `fraga(self)` ger texten för frågan på tur, `svara(self, svar)` rättar (som förra övningen), ökar poang vid rätt, går vidare och returnerar True eller False, och `klar(self)` är True när alla frågor är ställda.',
    starterCode:
      'FRAGOR = [\n    {"fraga": "Vad heter Sveriges huvudstad?", "svar": "Stockholm"},\n    {"fraga": "Hur många ben har en spindel?", "svar": "8"},\n]\n',
    solution:
      'FRAGOR = [\n    {"fraga": "Vad heter Sveriges huvudstad?", "svar": "Stockholm"},\n    {"fraga": "Hur många ben har en spindel?", "svar": "8"},\n]\n\n\nclass Quiz:\n    def __init__(self, fragor):\n        self.fragor = fragor\n        self.nummer = 0\n        self.poang = 0\n\n    def fraga(self):\n        return self.fragor[self.nummer]["fraga"]\n\n    def svara(self, svar):\n        ratt = svar.strip().lower() == self.fragor[self.nummer]["svar"].lower()\n        if ratt:\n            self.poang += 1\n        self.nummer += 1\n        return ratt\n\n    def klar(self):\n        return self.nummer == len(self.fragor)\n',
    hints: [
      'fraga: return self.fragor[self.nummer]["fraga"]',
      'svara: räkna ut ratt, öka poang om det är rätt, öka nummer och return ratt.',
      'klar: return self.nummer == len(self.fragor)',
    ],
    tests: [
      {
        description: 'Första frågan',
        code: 'Quiz(FRAGOR).fraga()',
        expected: 'Vad heter Sveriges huvudstad?',
      },
      {
        description: 'Rätt svar ger True och går vidare',
        code: '(q := Quiz(FRAGOR), q.svara(" stockholm"), q.fraga(), q.poang)[1:]',
        expected: [true, 'Hur många ben har en spindel?', 1],
      },
      {
        description: 'Klar efter två svar',
        code: '(q := Quiz(FRAGOR), q.klar(), q.svara("x"), q.svara("8"), q.klar(), q.poang)[1:]',
        expected: [false, false, true, true, 1],
      },
    ],
  },
  {
    id: 'slut-08',
    track: 'slutprojekt',
    title: 'Spara i en fil',
    xp: 10,
    description:
      'Allt i variablerna försvinner när programmet slutar. Det som skrivs till en fil finns kvar.',
    explain:
      '`with open("kvitto.txt", "w") as fil:` öppnar filen för skrivning ("w" som i write). Allt som är indraget under har tillgång till `fil`, och efter blocket stängs filen av sig själv.\n\n`fil.write("text\\n")` skriver en rad. `write` lägger inte till någon radbrytning själv, så skriv `\\n` sist. "w" börjar om från en tom fil varje gång.',
    example:
      'with open("hej.txt", "w") as fil:\n    fil.write("Hej!\\n")\n\nwith open("hej.txt") as fil:\n    print(fil.read())',
    task: 'Uppgift: Skapa `skriv_kvitto(varor, filnamn)` där varor är en dictionary med namn och pris. Skriv en rad per vara, t.ex. `kaffe: 30 kr`, och sist `Totalt: 55 kr`, till filen.',
    starterCode:
      '# Skriv skriv_kvitto här\n\n\nskriv_kvitto({"kaffe": 30, "bulle": 25}, "kvitto.txt")\n',
    solution:
      'def skriv_kvitto(varor, filnamn):\n    with open(filnamn, "w") as fil:\n        for namn, pris in varor.items():\n            fil.write(f"{namn}: {pris} kr\\n")\n        fil.write(f"Totalt: {sum(varor.values())} kr\\n")\n\n\nskriv_kvitto({"kaffe": 30, "bulle": 25}, "kvitto.txt")\n',
    hints: [
      'with open(filnamn, "w") as fil:',
      'En for-loop över varor.items() med fil.write(f"{namn}: {pris} kr\\n").',
      'Efter loopen men inuti with: fil.write(f"Totalt: {sum(varor.values())} kr\\n")',
    ],
    tests: [
      {
        description: 'kvitto.txt har varorna och totalen',
        code: 'open("kvitto.txt").read()',
        expected: 'kaffe: 30 kr\nbulle: 25 kr\nTotalt: 55 kr\n',
      },
      {
        description: 'Ett nytt kvitto skriver över det gamla',
        code: '(skriv_kvitto({"te": 20}, "kvitto.txt"), open("kvitto.txt").read())[-1]',
        expected: 'te: 20 kr\nTotalt: 20 kr\n',
      },
    ],
    sourceChecks: [
      { description: 'Använder with open', pattern: /with\s+open\(/ },
    ],
  },
  {
    id: 'slut-09',
    track: 'slutprojekt',
    title: 'En topplista som finns kvar',
    xp: 10,
    description:
      'Läs en fil, lägg till en rad och läs igen. Så fungerar topplistor, sparade spel och inställningar.',
    explain:
      'Med `"a"` (append) läggs det nya till sist i filen, i stället för att skriva över den. Utan något efter filnamnet öppnas filen för läsning.\n\nEn fil går att loopa över rad för rad: `for rad in fil:`. Varje rad slutar med `\\n`, så ta bort det med `.strip()` innan du delar upp den med `split(";")`.',
    example:
      'with open("logg.txt", "a") as fil:\n    fil.write("en rad till\\n")\n\nwith open("logg.txt") as fil:\n    for rad in fil:\n        print(rad.strip())',
    task: 'Uppgift: `topplista.txt` har rader som `Ada;12`. Skapa `spara(namn, poang)` som lägger till en rad sist, och `topplista()` som returnerar de tre bästa som t.ex. `["Bo: 15", "Ada: 12", "Cy: 9"]`, med flest poäng först.',
    starterCode:
      '# Skriv spara och topplista här\n\n\nspara("Bo", 15)\nfor rad in topplista():\n    print(rad)\n',
    solution:
      'def spara(namn, poang):\n    with open("topplista.txt", "a") as fil:\n        fil.write(f"{namn};{poang}\\n")\n\n\ndef topplista():\n    resultat = []\n    with open("topplista.txt") as fil:\n        for rad in fil:\n            namn, poang = rad.strip().split(";")\n            resultat.append((namn, int(poang)))\n    basta = sorted(resultat, key=lambda par: par[1], reverse=True)[:3]\n    return [f"{namn}: {poang}" for namn, poang in basta]\n\n\nspara("Bo", 15)\nfor rad in topplista():\n    print(rad)\n',
    files: { 'topplista.txt': TOPPLISTA },
    hints: [
      'spara: with open("topplista.txt", "a") as fil: fil.write(f"{namn};{poang}\\n")',
      'topplista: loopa över raderna och gör namn, poang = rad.strip().split(";"). Glöm inte int(poang).',
      'Sortera med key=lambda par: par[1], reverse=True och ta [:3].',
    ],
    tests: [
      {
        description: 'Programmet skriver ut topplistan',
        code: '__output',
        expected: ['Bo: 15', 'Ada: 12', 'Cy: 9'],
      },
      {
        description: 'Bo;15 finns sist i filen',
        code: 'open("topplista.txt").read()',
        expected: 'Ada;12\nCy;9\nBo;15\n',
      },
      {
        description: 'Bara de tre bästa visas',
        code: '(spara("Dani", 20), topplista())[-1]',
        expected: ['Dani: 20', 'Bo: 15', 'Ada: 12'],
      },
    ],
  },
];
