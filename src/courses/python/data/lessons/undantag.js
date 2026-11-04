// Bana 8: fel och undantag – fånga fel med try/except och skapa egna med raise.
export const UNDANTAG = [
  {
    id: 'und-01',
    track: 'undantag',
    title: 'Fånga ett fel: try och except',
    xp: 10,
    description:
      'Skriver användaren något som inte är ett tal kraschar int(). Med try och except kan programmet fortsätta i stället.',
    explain:
      'Koden under `try:` körs som vanligt. Går något fel hoppar Python direkt till `except ValueError:` i stället för att stoppa programmet. Går inget fel hoppas except över.\n\nDu tar till try när något *kan* gå fel och du inte kan styra det – oftast det användaren skriver. Skriv namnet på felet efter except, så fångar du bara det du väntar dig. Namnet står i felmeddelandet, t.ex. ValueError.',
    example:
      'try:\n    pris = int("gratis")\nexcept ValueError:\n    print("Priset måste vara ett tal")',
    task: 'Uppgift: Programmet kraschar när svaret inte är ett tal. Lägg koden som gör om och skriver ut i ett `try:`, och skriv ut `Det där var inget tal` i `except ValueError:`.',
    starterCode:
      'svar = input("Hur många? ")\nantal = int(svar)\nprint(f"Dubbelt: {antal * 2}")\n',
    solution:
      'svar = input("Hur många? ")\ntry:\n    antal = int(svar)\n    print(f"Dubbelt: {antal * 2}")\nexcept ValueError:\n    print("Det där var inget tal")\n',
    hints: [
      'Skriv try: på en egen rad och dra in de två raderna under.',
      'except ValueError: står på samma nivå som try:.',
      'Under except: print("Det där var inget tal")',
    ],
    inputs: ['tio'],
    tests: [
      {
        description: 'Svaret tio ger Det där var inget tal',
        code: '__output',
        expected: ['Det där var inget tal'],
      },
      {
        description: 'Svaret 12 ger Dubbelt: 24',
        code: '__output',
        expected: ['Dubbelt: 24'],
        inputs: ['12'],
      },
    ],
    sourceChecks: [
      { description: 'Använder try', pattern: /\btry\s*:/ },
      { description: 'Fångar ValueError', pattern: /except\s+ValueError/ },
    ],
  },
  {
    id: 'und-02',
    track: 'undantag',
    title: 'Dela med noll',
    xp: 10,
    description:
      'Att dela med noll ger ZeroDivisionError. En funktion kan fånga det och ge ett vettigt svar.',
    explain:
      'Varje sorts fel har ett eget namn: ValueError när ett värde är fel, ZeroDivisionError när man delar med noll, KeyError när en nyckel saknas. Du väljer vilket fel du fångar genom att skriva namnet efter except.\n\n`return` fungerar som vanligt inuti try och except. Funktionen avslutas där, oavsett vilken av dem som körs.',
    example:
      'def snitt(summa, antal):\n    try:\n        return summa // antal\n    except ZeroDivisionError:\n        return 0',
    task: 'Uppgift: Skapa `per_person(summa, personer)` som returnerar summan delad med `//` på personerna. Är personerna 0 ska den skriva ut `Ingen att dela med` och returnera 0.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'def per_person(summa, personer):\n    try:\n        return summa // personer\n    except ZeroDivisionError:\n        print("Ingen att dela med")\n        return 0\n',
    hints: [
      'Lägg return summa // personer i ett try.',
      'Felet heter ZeroDivisionError.',
      'I except: skriv ut texten och return 0.',
    ],
    tests: [
      {
        description: 'per_person(300, 3) är 100',
        code: 'per_person(300, 3)',
        expected: 100,
      },
      {
        description: 'per_person(300, 0) är 0',
        code: 'per_person(300, 0)',
        expected: 0,
      },
    ],
    sourceChecks: [
      {
        description: 'Fångar ZeroDivisionError',
        pattern: /except\s+ZeroDivisionError/,
      },
      {
        description: 'Skriver Ingen att dela med',
        pattern: /print\(\s*["']Ingen att dela med["']\s*\)/,
      },
    ],
  },
  {
    id: 'und-03',
    track: 'undantag',
    title: 'Fråga igen tills det blir rätt',
    xp: 15,
    description:
      'Med while True, try och break frågar programmet om och om igen tills svaret går att använda.',
    explain:
      'Mönstret är: `while True:` med ett try inuti. Lyckas int() kommer programmet till `break` och lämnar loopen. Går det fel hoppar Python över break till except, skriver ut ett tips, och loopen frågar igen.\n\nDu tar till det här när programmet måste få ett giltigt svar för att kunna fortsätta.',
    example:
      'while True:\n    try:\n        tal = int(input("Tal? "))\n        break\n    except ValueError:\n        print("Försök igen")',
    task: 'Uppgift: Fråga `input("Ålder? ")` tills svaret går att göra om till ett tal, och spara det i `alder`. Vid fel skriver programmet `Skriv ålder med siffror`. Skriv till sist ut `Du är 12 år`.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'while True:\n    try:\n        alder = int(input("Ålder? "))\n        break\n    except ValueError:\n        print("Skriv ålder med siffror")\nprint(f"Du är {alder} år")\n',
    hints: [
      'while True: och inuti den ett try:.',
      'I try: alder = int(input("Ålder? ")) och sedan break.',
      'except ValueError: print("Skriv ålder med siffror"), och efter loopen skrivs åldern ut.',
    ],
    inputs: ['tolv', '12 år', '12'],
    tests: [
      { description: 'alder är 12', code: 'alder', expected: 12 },
      {
        description: 'Två fel svar, sedan rätt',
        code: '__output',
        expected: [
          'Skriv ålder med siffror',
          'Skriv ålder med siffror',
          'Du är 12 år',
        ],
      },
      {
        description: 'Rätt direkt: inget tips',
        code: '__output',
        expected: ['Du är 40 år'],
        inputs: ['40'],
      },
    ],
  },
  {
    id: 'und-04',
    track: 'undantag',
    title: 'Olika fel, olika svar',
    xp: 15,
    description:
      'Ett try kan ha flera except. Python väljer den som passar felet som hände.',
    explain:
      'Skriv en except för varje sorts fel du vill hantera. IndexError betyder att platsen inte finns i listan, TypeError att värdet är av fel typ – som text i stället för tal.\n\nPython provar dem uppifrån och ner och kör bara den första som passar.',
    example:
      'try:\n    print(lista[plats])\nexcept IndexError:\n    print("För långt")\nexcept TypeError:\n    print("Inte ett tal")',
    task: 'Uppgift: Skapa `hamta(lista, plats)` som returnerar saken på platsen. Finns inte platsen ska den returnera `Finns inte`, och är platsen inte ett tal `Platsen måste vara ett tal`.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'def hamta(lista, plats):\n    try:\n        return lista[plats]\n    except IndexError:\n        return "Finns inte"\n    except TypeError:\n        return "Platsen måste vara ett tal"\n',
    hints: [
      'try: return lista[plats]',
      'except IndexError: för en plats som inte finns.',
      'except TypeError: för en plats som är text.',
    ],
    tests: [
      {
        description: 'hamta(["a", "b"], 1) är "b"',
        code: 'hamta(["a", "b"], 1)',
        expected: 'b',
      },
      {
        description: 'hamta(["a"], 5) är "Finns inte"',
        code: 'hamta(["a"], 5)',
        expected: 'Finns inte',
      },
      {
        description: 'hamta(["a"], "1") är "Platsen måste vara ett tal"',
        code: 'hamta(["a"], "1")',
        expected: 'Platsen måste vara ett tal',
      },
    ],
  },
  {
    id: 'und-05',
    track: 'undantag',
    title: 'Vad var felet? except … as',
    xp: 15,
    description:
      'Med except KeyError as fel sparas felet i en variabel, så att du kan visa vad som gick fel.',
    explain:
      '`except KeyError as fel:` fångar felet och sparar det i `fel`. Skriver du ut `fel` får du felets meddelande. För en KeyError är meddelandet nyckeln som saknades, med citattecken runt.\n\nDu tar till `as` när svaret beror på vad som gick fel, eller när du vill visa det för användaren.',
    example: 'try:\n    int("tre")\nexcept ValueError as fel:\n    print(fel)',
    task: 'Uppgift: Fråga `input("Vara? ")` och skriv ut `Pris: 20 kr` med priset från `priser`. Finns inte varan ska programmet skriva ut `Finns inte: \'choklad\'` med `except KeyError as fel`.',
    starterCode: 'priser = {"kaffe": 30, "te": 20}\n',
    solution:
      'priser = {"kaffe": 30, "te": 20}\nvara = input("Vara? ")\ntry:\n    print(f"Pris: {priser[vara]} kr")\nexcept KeyError as fel:\n    print(f"Finns inte: {fel}")\n',
    hints: [
      'vara = input("Vara? ") och sedan try:.',
      'priser[vara] ger KeyError om varan inte finns.',
      'except KeyError as fel: print(f"Finns inte: {fel}")',
    ],
    inputs: ['choklad'],
    tests: [
      {
        description: "choklad ger Finns inte: 'choklad'",
        code: '__output',
        expected: ["Finns inte: 'choklad'"],
      },
      {
        description: 'te ger Pris: 20 kr',
        code: '__output',
        expected: ['Pris: 20 kr'],
        inputs: ['te'],
      },
    ],
    sourceChecks: [
      {
        description: 'Använder except … as',
        pattern: /except\s+KeyError\s+as\s+\w+/,
      },
    ],
  },
  {
    id: 'und-06',
    track: 'undantag',
    title: 'Skapa ett fel: raise',
    xp: 15,
    description:
      'Med raise skapar du ett fel själv, när någon försöker använda din funktion på fel sätt.',
    explain:
      '`raise ValueError("Åldern kan inte vara negativ")` stoppar funktionen direkt med ett fel och ett meddelande som förklarar varför. Koden efter raise körs inte.\n\nDu tar till raise när en funktion får ett värde den inte kan göra något vettigt med. Hellre ett tydligt fel direkt än ett konstigt svar som ställer till det senare. ValueError passar när värdet är fel.',
    example:
      'def satt_pris(pris):\n    if pris < 0:\n        raise ValueError("Priset kan inte vara negativt")\n    return pris',
    task: 'Uppgift: Skapa `satt_alder(alder)` som returnerar åldern. Är åldern mindre än 0 ska den göra `raise ValueError("Åldern kan inte vara negativ")`.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'def satt_alder(alder):\n    if alder < 0:\n        raise ValueError("Åldern kan inte vara negativ")\n    return alder\n',
    hints: [
      'Kolla först med if alder < 0:.',
      'raise ValueError("Åldern kan inte vara negativ")',
      'Efter if:en: return alder.',
    ],
    tests: [
      { description: 'satt_alder(5) är 5', code: 'satt_alder(5)', expected: 5 },
      { description: 'satt_alder(0) är 0', code: 'satt_alder(0)', expected: 0 },
      {
        description: 'satt_alder(-1) ger ValueError',
        code: '__raises(satt_alder, -1)',
        expected: 'ValueError',
      },
      {
        description: 'Meddelandet är Åldern kan inte vara negativ',
        code: '__message(satt_alder, -1)',
        expected: 'Åldern kan inte vara negativ',
      },
    ],
  },
  {
    id: 'und-07',
    track: 'undantag',
    title: 'Fånga ditt eget fel',
    xp: 15,
    description:
      'Ett fel från raise fångas med try och except, precis som Pythons egna fel.',
    explain:
      'Funktionen säger ifrån med raise, och den som anropar den bestämmer vad som ska hända med try och except. Så kan samma funktion användas i en app som visar en ruta och i ett program som skriver ut text.\n\nMeddelandet du skrev i raise får du tillbaka med `except ValueError as fel`.',
    example:
      'try:\n    satt_pris(-5)\nexcept ValueError as fel:\n    print(f"Fel: {fel}")',
    task: 'Uppgift: Anropa `ta_ut(100, 500)` inuti ett try och spara svaret i `saldo`. Fånga felet med `except ValueError as fel` och skriv ut `Nekad: Täckning saknas`.',
    starterCode:
      'def ta_ut(saldo, belopp):\n    if belopp > saldo:\n        raise ValueError("Täckning saknas")\n    return saldo - belopp\n\n',
    solution:
      'def ta_ut(saldo, belopp):\n    if belopp > saldo:\n        raise ValueError("Täckning saknas")\n    return saldo - belopp\n\n\ntry:\n    saldo = ta_ut(100, 500)\nexcept ValueError as fel:\n    print(f"Nekad: {fel}")\n',
    hints: [
      'try: saldo = ta_ut(100, 500)',
      'except ValueError as fel: sparar felet i fel.',
      'print(f"Nekad: {fel}")',
    ],
    tests: [
      {
        description: 'Skriver ut Nekad: Täckning saknas',
        code: '__output',
        expected: ['Nekad: Täckning saknas'],
      },
      {
        description: 'ta_ut gör fortfarande raise',
        code: '__raises(ta_ut, 100, 500)',
        expected: 'ValueError',
      },
    ],
    sourceChecks: [
      {
        description: 'Anropar ta_ut(100, 500)',
        pattern: /ta_ut\(\s*100\s*,\s*500\s*\)/,
      },
      {
        description: 'Använder except … as',
        pattern: /except\s+ValueError\s+as\s+\w+/,
      },
    ],
  },
  {
    id: 'und-08',
    track: 'undantag',
    title: 'När allt gick bra: else och finally',
    xp: 15,
    description:
      'else körs när inget fel hände, och finally körs alltid – oavsett vad.',
    explain:
      'Ett try kan sluta med två delar till. `else:` körs bara om inget fel hände i try. `finally:` körs alltid, både när det gick bra och när det gick fel.\n\nDu tar till else för att hålla try kort – bara det som kan gå fel ska stå där. finally används för det som måste hända till sist, som att stänga en fil eller säga att man är klar.',
    example:
      'try:\n    tal = int("5")\nexcept ValueError:\n    print("Fel")\nelse:\n    print(tal)\nfinally:\n    print("Slut")',
    task: 'Uppgift: Skapa `las_in(text)`. Den gör om text till ett tal i ett try. Vid ValueError skriver den `Inget tal`, annars (else) `Tal: 7`, och alltid (finally) `Klart`. Anropa sedan `las_in("7")` och `las_in("sju")`.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'def las_in(text):\n    try:\n        tal = int(text)\n    except ValueError:\n        print("Inget tal")\n    else:\n        print(f"Tal: {tal}")\n    finally:\n        print("Klart")\n\n\nlas_in("7")\nlas_in("sju")\n',
    hints: [
      'try: tal = int(text) och except ValueError: print("Inget tal").',
      'else: print(f"Tal: {tal}")',
      'finally: print("Klart"), sedan anropen utanför funktionen.',
    ],
    tests: [
      {
        description: 'Skriver ut rätt för 7 och sju',
        code: '__output',
        expected: ['Tal: 7', 'Klart', 'Inget tal', 'Klart'],
      },
    ],
    sourceChecks: [
      { description: 'Använder else', pattern: /^\s*else\s*:/m },
      { description: 'Använder finally', pattern: /\bfinally\s*:/ },
    ],
  },
  {
    id: 'und-09',
    track: 'undantag',
    title: 'Kolla det användaren skriver',
    xp: 20,
    description:
      'En funktion kan kolla flera regler och säga ifrån med olika meddelanden. `text.isdigit()` är True om texten bara består av siffror.',
    explain:
      'Varje regel blir en if med en egen raise. Funktionen stoppar vid första regeln som bryts, och meddelandet säger exakt vad som är fel.\n\nResten av programmet behöver inte känna till reglerna. Det anropar funktionen i ett try och visar meddelandet om något gick fel.',
    example:
      'def kolla_namn(namn):\n    if namn == "":\n        raise ValueError("Namnet saknas")\n    return namn',
    task: 'Uppgift: Skapa `kolla_pin(pin)`. Är pin inte 4 tecken lång: `raise ValueError("PIN ska ha fyra siffror")`. Är den inte bara siffror: `raise ValueError("PIN får bara innehålla siffror")`. Annars returneras pin. Fråga sedan `input("PIN? ")` och kolla svaret i ett try: skriv `PIN sparad` om det gick, annars felmeddelandet.',
    starterCode: '# Skriv din kod här\n',
    solution:
      'def kolla_pin(pin):\n    if len(pin) != 4:\n        raise ValueError("PIN ska ha fyra siffror")\n    if not pin.isdigit():\n        raise ValueError("PIN får bara innehålla siffror")\n    return pin\n\n\ntry:\n    kolla_pin(input("PIN? "))\n    print("PIN sparad")\nexcept ValueError as fel:\n    print(fel)\n',
    hints: [
      'Två if, en för längden och en med not pin.isdigit().',
      'try: kolla_pin(input("PIN? ")) och print("PIN sparad").',
      'except ValueError as fel: print(fel)',
    ],
    inputs: ['12a4'],
    tests: [
      {
        description: '12a4: PIN får bara innehålla siffror',
        code: '__output',
        expected: ['PIN får bara innehålla siffror'],
      },
      {
        description: '123: PIN ska ha fyra siffror',
        code: '__output',
        expected: ['PIN ska ha fyra siffror'],
        inputs: ['123'],
      },
      {
        description: '1234: PIN sparad',
        code: '__output',
        expected: ['PIN sparad'],
        inputs: ['1234'],
      },
      {
        description: 'kolla_pin("1234") returnerar "1234"',
        code: 'kolla_pin("1234")',
        expected: '1234',
      },
    ],
  },
];
