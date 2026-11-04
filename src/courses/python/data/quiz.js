// Frågor för nivåtestet och för "Testa dig förbi". Fyra frågor per bana.
// Det rätta svaret står alltid först i options. Ordningen blandas när
// frågan visas. quiz.test.js kör koden med riktig Python och kollar att
// det rätta svaret är precis det som skrivs ut, eller felet med error.
export const QUIZ = {
  grunder: [
    {
      question: 'Vad skrivs ut?',
      code: 'x = 5\nx = x + 3\nprint(x)',
      options: ['8', '5', '53', 'x'],
      explain: 'x får först värdet 5. Sedan får den värdet 5 + 3, alltså 8.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'print("3" + "4")',
      options: ['34', '7', '3 + 4', 'Ett felmeddelande'],
      explain: '"3" och "4" är text. + sätter ihop text, det räknar inte.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'alder = 15\nif alder >= 18:\n    print("Vuxen")\nelse:\n    print("Ung")',
      options: ['Ung', 'Vuxen', 'Vuxen\nUng', 'Ingenting'],
      explain: '15 >= 18 är falskt, så koden under else körs.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'print(7 // 2, 7 % 2)',
      options: ['3 1', '3.5 0', '3 0.5', '4 1'],
      explain:
        '// delar och kastar bort decimalerna, % ger resten: 7 = 2 · 3 + 1.',
    },
  ],
  loopar: [
    {
      question: 'Vad skrivs ut?',
      code: 'total = 0\nfor i in range(1, 4):\n    total += i\nprint(total)',
      options: ['6', '10', '3', '4'],
      explain: 'range(1, 4) är 1, 2 och 3 – 4 är inte med. 1 + 2 + 3 = 6.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'n = 0\nwhile n < 10:\n    n += 3\nprint(n)',
      options: ['12', '9', '10', '3'],
      explain: 'n blir 3, 6, 9 och 12. Först när n är 12 är villkoret falskt.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'for bokstav in "abc":\n    if bokstav == "b":\n        break\n    print(bokstav)',
      options: ['a', 'a\nb', 'b', 'a\nb\nc'],
      explain:
        'break avbryter loopen direkt när bokstaven är b, innan den skrivs ut.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'antal = 0\nfor i in range(10):\n    if i % 3 == 0:\n        antal += 1\nprint(antal)',
      options: ['4', '3', '10', '9'],
      explain: 'range(10) börjar på 0. 0, 3, 6 och 9 är delbara med 3.',
    },
  ],
  listor: [
    {
      question: 'Vad skrivs ut?',
      code: 'tal = [4, 8, 15]\ntal.append(16)\nprint(len(tal))',
      options: ['4', '3', '16', '5'],
      explain: 'append lägger till 16 sist. Listan har då fyra värden.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'namn = ["Ada", "Bo", "Cy"]\nprint(namn[1])',
      options: ['Bo', 'Ada', 'Cy', 'Ett felmeddelande'],
      explain: 'Index börjar på 0, så namn[1] är det andra namnet.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'namn = ["Ada", "Bo", "Cy"]\nprint(namn[-1])',
      options: ['Cy', 'Ada', 'Ett felmeddelande', '-1'],
      explain: 'Negativa index räknar bakifrån. -1 är det sista.',
    },
    {
      question: 'Vad händer?',
      code: 'tal = [3, 1, 2]\nprint(tal[3])',
      options: ['Ett felmeddelande (IndexError)', '2', 'None', '3'],
      error: 'IndexError',
      explain: 'Tre värden har index 0, 1 och 2. Index 3 finns inte.',
    },
  ],
  funktioner: [
    {
      question: 'Vad skrivs ut?',
      code: 'def dubbla(x):\n    x * 2\n\n\nprint(dubbla(4))',
      options: ['None', '8', '4', 'Ett felmeddelande'],
      explain:
        'Funktionen räknar ut x * 2 men returnerar det aldrig. Utan return blir svaret None.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'def halsa(namn="du"):\n    return "Hej " + namn\n\n\nprint(halsa())',
      options: ['Hej du', 'Hej', 'Hej namn', 'Ett felmeddelande'],
      explain: 'Inget namn skickas med, så standardvärdet "du" används.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'def plus(a, b):\n    return a + b\n\n\nprint(plus(2, plus(3, 4)))',
      options: ['9', '7', '5', '234'],
      explain:
        'Det inre anropet körs först: plus(3, 4) är 7. Sedan plus(2, 7).',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'x = 10\n\n\ndef andra():\n    x = 5\n\n\nandra()\nprint(x)',
      options: ['10', '5', 'None', 'Ett felmeddelande'],
      explain:
        'x = 5 inuti funktionen skapar en ny, lokal variabel. x utanför är kvar på 10.',
    },
  ],
  strangar: [
    {
      question: 'Vad skrivs ut?',
      code: 'ord = "Python"\nprint(ord[0:3])',
      options: ['Pyt', 'Pyth', 'yth', 'P'],
      explain:
        '[0:3] tar tecknen på plats 0, 1 och 2. Sista talet är inte med.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'print("hej".upper())',
      options: ['HEJ', 'Hej', 'hej', 'HEj'],
      explain: 'upper() gör alla bokstäver stora.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'namn = "Ada"\nprint(f"{namn} har {len(namn)} bokstäver")',
      options: [
        'Ada har 3 bokstäver',
        '{namn} har {len(namn)} bokstäver',
        'Ada har len(namn) bokstäver',
        'Ett felmeddelande',
      ],
      explain:
        'I en f-sträng byts allt inom { } ut mot värdet – även uträkningar som len(namn).',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'print("-".join(["a", "b", "c"]))',
      options: ['a-b-c', 'abc', '-a-b-c-', '["a", "b", "c"]'],
      explain:
        'join sätter texten före punkten mellan sakerna i listan, inte runt dem.',
    },
  ],
  dictionaries: [
    {
      question: 'Vad skrivs ut?',
      code: 'lager = {"äpple": 3, "päron": 5}\nprint(lager["päron"])',
      options: ['5', '3', 'päron', 'Ett felmeddelande'],
      explain: 'Nyckeln "päron" ger värdet som hör till den.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'lager = {"äpple": 3}\nlager["äpple"] += 2\nprint(lager)',
      options: ["{'äpple': 5}", "{'äpple': 3}", "{'äpple': 32}", '5'],
      explain: 'Värdet för äpple ökas med 2, och hela dictionaryn skrivs ut.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'lager = {"äpple": 3}\nprint(lager.get("kiwi", 0))',
      options: ['0', 'None', 'Ett felmeddelande (KeyError)', 'kiwi'],
      explain:
        'get ger standardvärdet, här 0, när nyckeln saknas. lager["kiwi"] hade gett KeyError.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'punkt = (3, 4)\nx, y = punkt\nprint(y)',
      options: ['4', '3', '(3, 4)', 'Ett felmeddelande'],
      explain: 'Tupeln packas upp: x får 3 och y får 4.',
    },
  ],
  smidigare: [
    {
      question: 'Vad skrivs ut?',
      code: 'print([x * 2 for x in [1, 2, 3]])',
      options: ['[2, 4, 6]', '[1, 2, 3, 1, 2, 3]', '12', '[2, 4, 6, 8]'],
      explain:
        'En list comprehension gör x * 2 för varje x och samlar svaren i en ny lista.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'print([x for x in range(6) if x % 2 == 0])',
      options: ['[0, 2, 4]', '[1, 3, 5]', '[2, 4, 6]', '[0, 2, 4, 6]'],
      explain: 'range(6) är 0 till 5. if behåller bara de jämna.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'print(list(zip([1, 2], ["a", "b"])))',
      options: [
        "[(1, 'a'), (2, 'b')]",
        "[1, 2, 'a', 'b']",
        "[(1, 2), ('a', 'b')]",
        "['1a', '2b']",
      ],
      explain:
        'zip parar ihop första med första och andra med andra, som tupler.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'print(sorted(["kiwi", "fikon", "äpple"], key=len))',
      options: [
        "['kiwi', 'fikon', 'äpple']",
        "['fikon', 'kiwi', 'äpple']",
        "['äpple', 'fikon', 'kiwi']",
        '[4, 5, 5]',
      ],
      explain:
        'key=len sorterar efter längden. fikon och äpple är lika långa och behåller sin ordning.',
    },
  ],
  undantag: [
    {
      question: 'Vad skrivs ut?',
      code: 'try:\n    tal = int("tio")\n    print("klart")\nexcept ValueError:\n    print("inget tal")',
      options: ['inget tal', 'klart', 'klart\ninget tal', 'Ett felmeddelande'],
      explain:
        'int("tio") ger ValueError, så Python hoppar direkt till except. print("klart") körs aldrig.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'try:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print("noll")\nfinally:\n    print("slut")',
      options: ['noll\nslut', 'slut', 'noll', 'inf\nslut'],
      explain: 'Delat med 0 fångas av except, och finally körs alltid sist.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'def kolla(x):\n    if x < 0:\n        raise ValueError("negativt")\n    return x\n\n\ntry:\n    kolla(-1)\nexcept ValueError as fel:\n    print(fel)',
      options: ['negativt', 'ValueError', '-1', 'Ingenting'],
      explain:
        'fel är felet från raise, och när det skrivs ut syns meddelandet.',
    },
    {
      question: 'Vad händer?',
      code: 'try:\n    print(["a"][5])\nexcept KeyError:\n    print("fångat")',
      options: ['Ett felmeddelande (IndexError)', 'fångat', 'a', 'None'],
      error: 'IndexError',
      explain:
        'Felet är ett IndexError, och except fångar bara KeyError. Då stoppar programmet ändå.',
    },
  ],
  moduler: [
    {
      question: 'Vad skrivs ut?',
      code: 'import math\nprint(math.ceil(4.1))',
      options: ['5', '4', '4.1', '4.0'],
      explain: 'ceil avrundar alltid uppåt till ett heltal.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'from datetime import date\nprint((date(2026, 1, 10) - date(2026, 1, 1)).days)',
      options: ['9', '10', '1', 'Ett felmeddelande'],
      explain: 'Från 1 till 10 januari är det 9 dagar.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import random\ntal = random.randint(1, 3)\nprint(tal in [1, 2, 3])',
      options: ['True', 'False', 'Det beror på slumpen', 'Ett felmeddelande'],
      explain:
        'randint(1, 3) ger 1, 2 eller 3 – båda gränserna är med. Talet finns alltid i listan.',
    },
    {
      question: 'Vad händer?',
      code: 'import math\nprint(sqrt(16))',
      options: ['Ett felmeddelande (NameError)', '4.0', '4', '16'],
      error: 'NameError',
      explain:
        'Med import math heter den math.sqrt. Bara sqrt kräver from math import sqrt.',
    },
  ],
  klasser: [
    {
      question: 'Vad skrivs ut?',
      code: 'class Hund:\n    def __init__(self, namn):\n        self.namn = namn\n\n\nfido = Hund("Fido")\nprint(fido.namn)',
      options: ['Fido', 'namn', 'Hund', 'Ett felmeddelande'],
      explain: '__init__ sparar namnet i objektet, och fido.namn hämtar det.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'class Raknare:\n    def __init__(self):\n        self.antal = 0\n\n    def oka(self):\n        self.antal += 1\n\n\na = Raknare()\nb = Raknare()\na.oka()\na.oka()\nprint(a.antal, b.antal)',
      options: ['2 0', '2 2', '1 1', '0 0'],
      explain: 'Varje objekt har sina egna attribut. Bara a ökades.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'class Vara:\n    def __init__(self, namn):\n        self.namn = namn\n\n    def __str__(self):\n        return "Vara: " + self.namn\n\n\nprint(Vara("mjölk"))',
      options: [
        'Vara: mjölk',
        'mjölk',
        '<__main__.Vara object>',
        'Ett felmeddelande',
      ],
      explain: 'print använder __str__ för att visa objektet.',
    },
    {
      question: 'Vad händer?',
      code: 'class Katt:\n    def jama():\n        return "mjau"\n\n\nprint(Katt().jama())',
      options: ['Ett felmeddelande (TypeError)', 'mjau', 'None', 'jama'],
      error: 'TypeError',
      explain:
        'Metoden saknar self. Python skickar in objektet ändå, och då får jama ett värde för mycket.',
    },
  ],
  felsokning: [
    {
      question: 'Vad skrivs ut?',
      code: 'for i in range(1, 5):\n    pass\nprint(i)',
      options: ['4', '5', '0', 'Ett felmeddelande'],
      explain:
        'Loopvariabeln finns kvar efter loopen, med sitt sista värde. range(1, 5) slutar på 4.',
    },
    {
      question: 'Vad händer?',
      code: 'def snitt(tal):\n    return sum(tal) / len(tal)\n\n\nprint(snitt([]))',
      options: ['Ett felmeddelande (ZeroDivisionError)', '0', 'None', '0.0'],
      error: 'ZeroDivisionError',
      explain: 'En tom lista har längden 0, och det går inte att dela med 0.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'print(max(["9", "10"]))',
      options: ['9', '10', 'Ett felmeddelande', '["9", "10"]'],
      explain:
        'Text jämförs tecken för tecken. "9" kommer efter "1", så "9" är störst.',
    },
    {
      question: 'Vad händer?',
      code: 'x = 3\nassert x > 5\nprint("ok")',
      options: [
        'Ett felmeddelande (AssertionError)',
        'ok',
        'False',
        'Ingenting',
      ],
      error: 'AssertionError',
      explain: 'x > 5 är falskt, så assert stoppar programmet innan print.',
    },
  ],
  pandas: [
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"antal": [3, 5, 2]})\nprint(df["antal"].sum())',
      options: ['10', '[3, 5, 2]', '3', '5'],
      explain: 'df["antal"] är kolumnen, och sum() lägger ihop alla värden.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"x": [1, 5, 8, 2]})\nprint(len(df[df["x"] > 2]))',
      options: ['2', '3', '4', '13'],
      explain: 'Filtret behåller raderna där x är större än 2: 5 och 8.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"typ": ["a", "b", "a"], "n": [1, 2, 3]})\nprint(df.groupby("typ")["n"].sum()["a"])',
      options: ['4', '1', '3', '6'],
      explain: 'Gruppen a har raderna med n = 1 och n = 3.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"namn": ["Bo", "Ada", "Cy"], "p": [5, 9, 7]})\nprint(df.sort_values("p", ascending=False)["namn"].tolist()[0])',
      options: ['Ada', 'Bo', 'Cy', '9'],
      explain: 'Störst p först: Ada har 9.',
    },
  ],
  slutprojekt: [
    {
      question: 'Vad skrivs ut?',
      code: 'with open("test.txt", "w") as fil:\n    fil.write("hej")\n\nwith open("test.txt", "w") as fil:\n    fil.write("då")\n\nprint(open("test.txt").read())',
      options: ['då', 'hejdå', 'hej', 'hej\ndå'],
      explain:
        '"w" börjar om med en tom fil varje gång, så bara det sista finns kvar.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'with open("test.txt", "w") as fil:\n    fil.write("hej")\n\nwith open("test.txt", "a") as fil:\n    fil.write("då")\n\nprint(open("test.txt").read())',
      options: ['hejdå', 'då', 'hej', 'hej\ndå'],
      explain:
        '"a" lägger till sist. write lägger inte till någon radbrytning själv.',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'rum = {"hallen": {"norr": "köket"}}\nprint(rum["hallen"].get("söder", "vägg"))',
      options: ['vägg', 'köket', 'None', 'Ett felmeddelande'],
      explain:
        'Det finns ingen utgång söderut, så get ger standardvärdet "vägg".',
    },
    {
      question: 'Vad skrivs ut?',
      code: 'svar = "  JA "\nprint(svar.strip().lower() == "ja")',
      options: ['True', 'False', 'ja', 'Ett felmeddelande'],
      explain:
        'strip tar bort mellanslagen och lower gör om till små bokstäver. Kvar blir "ja".',
    },
  ],
  streamlit: [
    {
      question: 'Vad skrivs ut när appen öppnas?',
      code: 'import streamlit as st\n\nantal = st.slider("Antal", 1, 10, 3)\nprint(antal * 2)',
      options: ['6', '2', '20', 'Ett felmeddelande'],
      explain:
        'Reglaget börjar på sitt startvärde, 3, tills någon flyttar det.',
    },
    {
      question: 'Vad skrivs ut när appen öppnas?',
      code: 'import streamlit as st\n\nif st.button("Klicka"):\n    print("klickad")\nelse:\n    print("inte än")',
      options: ['inte än', 'klickad', 'Klicka', 'Ingenting'],
      explain:
        'st.button är True bara i körningen direkt efter ett klick. När appen öppnas har ingen klickat.',
    },
    {
      question: 'Vad skrivs ut när appen öppnas?',
      code: 'import streamlit as st\n\nnamn = st.text_input("Namn")\nprint(len(namn))',
      options: ['0', '4', 'None', 'Ett felmeddelande'],
      explain:
        'Rutan är tom från början, så namn är den tomma texten "" – med längden 0.',
    },
    {
      question: 'Vad skrivs ut första gången appen körs?',
      code: 'import streamlit as st\n\nif "n" not in st.session_state:\n    st.session_state.n = 0\nst.session_state.n += 1\nprint(st.session_state.n)',
      options: ['1', '0', '2', 'Ett felmeddelande'],
      explain:
        'Första gången finns inget n, så det blir 0 och sedan 1. Vid nästa omkörning finns n kvar, och då blir det 2.',
    },
  ],
};
