// Bana 4: AI:ns vanliga fel. Assistentens förslag har ett fel som
// riktiga assistenter ofta gör. Eleven lagar det, och testerna prövar
// just det fall där felet syns.
const AI = '# Assistentens förslag – hitta och laga felet:\n';

export const FEL = [
  {
    id: 'kmai-31',
    track: 'fel',
    title: 'Gränsen',
    xp: 15,
    description:
      'Man blir myndig när man fyller 18. Assistentens kod håller inte med.',
    explain:
      'Det vanligaste felet i all kod – och i AI-kod: **fel på gränsen**. `>` och `>=` skiljer sig bara när talet är precis på gränsen.\n\nTesta därför alltid gränsen: 17, 18 och 19.',
    example: 'print(myndig(18))',
    task: 'Uppgift: `myndig(alder)` ska ge `True` från och med 18 år. Laga funktionen.',
    starterCode: `${AI}def myndig(alder):\n    return alder > 18\n`,
    solution: 'def myndig(alder):\n    return alder >= 18\n',
    hints: ['Vad ger myndig(18)?', '18 > 18 är falskt.', 'return alder >= 18'],
    tests: [
      { description: 'myndig(18) är True', code: 'myndig(18)', expected: true },
      {
        description: 'myndig(17) är False',
        code: 'myndig(17)',
        expected: false,
      },
      { description: 'myndig(30) är True', code: 'myndig(30)', expected: true },
    ],
  },
  {
    id: 'kmai-32',
    track: 'fel',
    title: 'Den tomma listan',
    xp: 15,
    description: 'Fungerar perfekt – tills listan är tom.',
    explain:
      'Assistenten skriver koden för det vanliga fallet. Med en tom lista blir `len(tal)` noll, och division med noll ger `ZeroDivisionError`.\n\nBestäm vad som ska hända och skriv det först i funktionen:\n\n```\nif not tal:\n    return None\n```',
    example: 'if not lista:\n    return 0',
    task: 'Uppgift: `medel(tal)` ska returnera `None` för en tom lista. Laga den.',
    starterCode: `${AI}def medel(tal):\n    return sum(tal) / len(tal)\n`,
    solution:
      'def medel(tal):\n    if not tal:\n        return None\n    return sum(tal) / len(tal)\n',
    hints: [
      'Vad händer med medel([])?',
      'Kolla om listan är tom först.',
      'if not tal: return None',
    ],
    tests: [
      { description: 'medel([]) är None', code: 'medel([])', expected: null },
      { description: 'medel([2, 4]) är 3', code: 'medel([2, 4])', expected: 3 },
    ],
  },
  {
    id: 'kmai-33',
    track: 'fel',
    title: 'Text eller tal?',
    xp: 15,
    description:
      'Det kommer från input(), så det är text. Det glömde assistenten.',
    explain:
      '`input()` ger alltid **text**. `"17" + 1` går inte. Assistenten vet inte var värdet kommer ifrån om du inte säger det.\n\nGör om texten till ett tal med `int(...)` innan du räknar.',
    example: 'alder = int(input("Ålder? "))',
    task: 'Uppgift: `nasta_ar(svar)` får svaret från `input()` som text och ska returnera åldern nästa år som ett tal. Laga den.',
    starterCode: `${AI}def nasta_ar(svar):\n    return svar + 1\n`,
    solution: 'def nasta_ar(svar):\n    return int(svar) + 1\n',
    hints: [
      'svar är text, t.ex. "17".',
      'int(svar) gör om den till ett tal.',
      'return int(svar) + 1',
    ],
    tests: [
      {
        description: 'nasta_ar("17") är 18',
        code: 'nasta_ar("17")',
        expected: 18,
      },
    ],
  },
  {
    id: 'kmai-34',
    track: 'fel',
    title: 'Metoden som inte finns',
    xp: 10,
    description: 'Assistenten använde en metod från ett annat språk.',
    explain:
      "Assistenter blandar ihop språk. I JavaScript har listor `.length`, i Python använder man `len(...)`. Felet blir `AttributeError: 'list' object has no attribute 'length'`.\n\nLäs felet – det säger exakt vad som inte finns.",
    example: 'print(len([1, 2, 3]))',
    task: 'Uppgift: Laga `antal_ord(text)` så att den returnerar hur många ord texten har.',
    starterCode: `${AI}def antal_ord(text):\n    return text.split().length()\n`,
    solution: 'def antal_ord(text):\n    return len(text.split())\n',
    hints: [
      'Kör den och läs felet.',
      'Python har len(), inte .length().',
      'return len(text.split())',
    ],
    tests: [
      {
        description: 'antal_ord("hej på dig") är 3',
        code: 'antal_ord("hej på dig")',
        expected: 3,
      },
    ],
  },
  {
    id: 'kmai-35',
    track: 'fel',
    title: 'Ett för lite: range',
    xp: 15,
    description: 'Summan av 1 till 10 ska bli 55. Den blir 45.',
    explain:
      '`range(1, n)` går till **men inte med** `n`. Det är ett klassiskt "ett för lite"-fel (_off by one_), och assistenter gör det ofta.\n\nTesta med ett litet tal du kan räkna själv: summan av 1 till 3 är 6.',
    example: 'print(list(range(1, 4)))',
    task: 'Uppgift: `summa_till(n)` ska returnera summan 1 + 2 + … + n. Laga den.',
    starterCode: `${AI}def summa_till(n):\n    total = 0\n    for i in range(1, n):\n        total += i\n    return total\n`,
    solution:
      'def summa_till(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total\n',
    hints: [
      'Vad ger summa_till(3)?',
      'range(1, 3) är 1 och 2.',
      'range(1, n + 1)',
    ],
    tests: [
      { description: 'summa_till(3) är 6', code: 'summa_till(3)', expected: 6 },
      {
        description: 'summa_till(10) är 55',
        code: 'summa_till(10)',
        expected: 55,
      },
    ],
  },
  {
    id: 'kmai-36',
    track: 'fel',
    title: 'Den ändrade min lista',
    xp: 15,
    description: 'Topplistan blev rätt – men originalet blev också sorterat.',
    explain:
      '`lista.sort()` sorterar **listan du skickade in**. `sorted(lista)` gör en ny, sorterad lista och låter originalet vara.\n\nNär en funktion ska returnera något nytt ska den inte ändra det den fick.',
    example: 'ny = sorted(gammal)',
    task: 'Uppgift: Laga `topp3(poang)` så att den returnerar de tre högsta, störst först, utan att ändra listan den får.',
    starterCode: `${AI}def topp3(poang):\n    poang.sort(reverse=True)\n    return poang[:3]\n`,
    solution: 'def topp3(poang):\n    return sorted(poang, reverse=True)[:3]\n',
    hints: [
      '.sort() ändrar listan.',
      'sorted(...) gör en ny lista.',
      'return sorted(poang, reverse=True)[:3]',
    ],
    tests: [
      {
        description: 'Ger de tre högsta',
        code: 'topp3([5, 9, 1, 7])',
        expected: [9, 7, 5],
      },
      {
        description: 'Ändrar inte listan',
        code: '(lambda lista: (topp3(lista), lista)[1])([5, 9, 1, 7])',
        expected: [5, 9, 1, 7],
      },
    ],
  },
  {
    id: 'kmai-37',
    track: 'fel',
    title: 'Den tomma texten',
    xp: 15,
    description: 'Första bokstaven – men vad händer om det inte finns någon?',
    explain:
      '`text[0]` ger `IndexError` om texten är tom. Ett tomt formulärfält är vanligare än man tror.\n\nKolla först: `if not text:`.',
    example: 'if not text:\n    return ""',
    task: 'Uppgift: Laga `forsta_stor(text)` så att den ger `""` för en tom text.',
    starterCode: `${AI}def forsta_stor(text):\n    return text[0].upper() + text[1:]\n`,
    solution:
      'def forsta_stor(text):\n    if not text:\n        return ""\n    return text[0].upper() + text[1:]\n',
    hints: [
      'Vad ger forsta_stor("")?',
      'Kolla om texten är tom först.',
      'if not text: return ""',
    ],
    tests: [
      {
        description: 'Tom text ger tom text',
        code: 'forsta_stor("")',
        expected: '',
      },
      {
        description: 'Vanlig text',
        code: 'forsta_stor("ada")',
        expected: 'Ada',
      },
    ],
  },
  {
    id: 'kmai-38',
    track: 'fel',
    title: 'Decimaltal som nästan är lika',
    xp: 15,
    description: '0.1 + 0.2 är inte 0.3 i datorn. Assistentens kod tror det.',
    explain:
      'Decimaltal lagras inte exakt: `0.1 + 0.2` blir `0.30000000000000004`. Att jämföra decimaltal med `==` går därför ibland fel.\n\nAvrunda innan du jämför: `round(a, 2) == round(b, 2)`. För pengar räknar man ofta i ören, som heltal.',
    example: 'print(0.1 + 0.2)\nprint(round(0.1 + 0.2, 2) == 0.3)',
    task: 'Uppgift: `rakt_belopp(a, b, total)` ska ge `True` om `a + b` blir `total`, avrundat till två decimaler. Laga den.',
    starterCode: `${AI}def rakt_belopp(a, b, total):\n    return a + b == total\n`,
    solution:
      'def rakt_belopp(a, b, total):\n    return round(a + b, 2) == round(total, 2)\n',
    hints: [
      'Vad ger rakt_belopp(0.1, 0.2, 0.3)?',
      'Avrunda båda sidor.',
      'round(a + b, 2) == round(total, 2)',
    ],
    tests: [
      {
        description: 'rakt_belopp(0.1, 0.2, 0.3) är True',
        code: 'rakt_belopp(0.1, 0.2, 0.3)',
        expected: true,
      },
      {
        description: 'rakt_belopp(1.5, 1.5, 4.0) är False',
        code: 'rakt_belopp(1.5, 1.5, 4.0)',
        expected: false,
      },
    ],
  },
  {
    id: 'kmai-39',
    track: 'fel',
    title: 'Stora och små bokstäver',
    xp: 15,
    description:
      'Söker du "Ada" hittas inte "ada". Assistenten tänkte inte på det.',
    explain:
      'Text jämförs tecken för tecken, så `"Ada" == "ada"` är falskt. Ska sökningen inte bry sig om stora och små bokstäver: gör om båda till små bokstäver först med `.lower()`.',
    example: 'print("Ada".lower() == "ada".lower())',
    task: 'Uppgift: Laga `finns(namn, lista)` så att den hittar namnet oavsett stora och små bokstäver.',
    starterCode: `${AI}def finns(namn, lista):\n    return namn in lista\n`,
    solution:
      'def finns(namn, lista):\n    return namn.lower() in [annat.lower() for annat in lista]\n',
    hints: [
      'Gör om namnet till små bokstäver.',
      'Och varje namn i listan.',
      'namn.lower() in [annat.lower() for annat in lista]',
    ],
    tests: [
      {
        description: 'Hittar ada i ["Ada", "Bo"]',
        code: 'finns("ada", ["Ada", "Bo"])',
        expected: true,
      },
      {
        description: 'Hittar inte Cy',
        code: 'finns("Cy", ["Ada", "Bo"])',
        expected: false,
      },
    ],
  },
];
