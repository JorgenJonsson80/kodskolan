// Bana 5: testa AI:ns kod. Eleven skriver en testfunktion test_…(f) med
// assert. Rättningen kör den mot assistentens trasiga version och mot en
// lagad: ett bra test underkänner den trasiga och godkänner den lagade.
// __raises(test, f) i harness.py ger namnet på felet, eller None.
const fails = (test, broken) => ({
  description: 'Testet avslöjar assistentens fel',
  code: `__raises(${test}, ${broken}) is not None`,
  expected: true,
});
const passes = (test, fixed) => ({
  description: 'Testet godkänner den lagade versionen',
  code: `__raises(${test}, ${fixed}) is None`,
  expected: true,
});
const HEAD = '# Rör inte de här: assistentens version och en lagad.\n';

export const TESTA = [
  {
    id: 'kmai-41',
    track: 'testa',
    title: 'Ditt första assert',
    xp: 10,
    description: 'Ett test är kod som kollar att annan kod gör rätt.',
    explain:
      '`assert villkor` gör ingenting om villkoret är sant – och stoppar med `AssertionError` om det är falskt:\n\n```\nassert moms(100) == 125\n```\n\nSamla testerna i en funktion som får koden att testa som `f`. Då kan samma test köras mot olika versioner.',
    example: 'def test_dubbla(f):\n    assert f(3) == 6',
    task: 'Uppgift: Skriv `test_moms(f)` som kollar att `f(100)` blir `125` (25 % moms).',
    starterCode: `${HEAD}def ai_moms(pris):\n    return pris * 1.2\n\ndef lagad_moms(pris):\n    return pris * 1.25\n\n# Skriv test_moms(f) här\n`,
    solution: `${HEAD}def ai_moms(pris):\n    return pris * 1.2\n\ndef lagad_moms(pris):\n    return pris * 1.25\n\ndef test_moms(f):\n    assert f(100) == 125\n`,
    hints: [
      'def test_moms(f):',
      'Inne i den: assert …',
      'assert f(100) == 125',
    ],
    tests: [fails('test_moms', 'ai_moms'), passes('test_moms', 'lagad_moms')],
  },
  {
    id: 'kmai-42',
    track: 'testa',
    title: 'Ett test som inte räcker',
    xp: 15,
    description: 'Testet går igenom – fast koden är fel.',
    explain:
      'Assistentens `dubbla` räknar `x * x`. Testar du bara med `2` får du `4` – rätt svar av fel anledning! Ett test bevisar bara det du testar.\n\nVälj testfall där ett **fel svar syns**: `3` ska bli `6`, inte `9`.',
    example: 'assert f(3) == 6',
    task: 'Uppgift: Testet nedan går igenom för assistentens felaktiga kod. Lägg till ett testfall i `test_dubbla` som avslöjar felet.',
    starterCode: `${HEAD}def ai_dubbla(x):\n    return x * x\n\ndef lagad_dubbla(x):\n    return x * 2\n\ndef test_dubbla(f):\n    assert f(2) == 4\n    assert f(0) == 0\n`,
    solution: `${HEAD}def ai_dubbla(x):\n    return x * x\n\ndef lagad_dubbla(x):\n    return x * 2\n\ndef test_dubbla(f):\n    assert f(2) == 4\n    assert f(0) == 0\n    assert f(3) == 6\n`,
    hints: [
      'Vad ger x * x och x * 2 för 2? För 3?',
      'Välj ett tal där de skiljer sig.',
      'assert f(3) == 6',
    ],
    tests: [
      fails('test_dubbla', 'ai_dubbla'),
      passes('test_dubbla', 'lagad_dubbla'),
    ],
  },
  {
    id: 'kmai-43',
    track: 'testa',
    title: 'Testa gränsen',
    xp: 15,
    description: 'Gränsfel syns bara precis på gränsen. Där ska testet stå.',
    explain:
      'Testa **på gränsen och precis bredvid**: 17, 18 och 19. Testar du bara 10 och 30 går gränsfel rakt igenom.',
    example: 'assert f(18) is True',
    task: 'Uppgift: Skriv `test_myndig(f)` med testfall för 17, 18 och 19.',
    starterCode: `${HEAD}def ai_myndig(alder):\n    return alder > 18\n\ndef lagad_myndig(alder):\n    return alder >= 18\n\n# Skriv test_myndig(f) här\n`,
    solution: `${HEAD}def ai_myndig(alder):\n    return alder > 18\n\ndef lagad_myndig(alder):\n    return alder >= 18\n\ndef test_myndig(f):\n    assert f(17) is False\n    assert f(18) is True\n    assert f(19) is True\n`,
    hints: [
      'Tre assert: 17, 18 och 19.',
      'Myndig från och med 18.',
      'assert f(18) is True',
    ],
    tests: [
      fails('test_myndig', 'ai_myndig'),
      passes('test_myndig', 'lagad_myndig'),
    ],
  },
  {
    id: 'kmai-44',
    track: 'testa',
    title: 'Testa den tomma listan',
    xp: 15,
    description: 'Kantfallen ska alltid ha ett eget test.',
    explain:
      'Skriv ett test för varje kantfall du kan komma på: tom lista, ett enda element, negativa tal. Kraschar koden blir testet underkänt även det – med `ZeroDivisionError` i stället för `AssertionError`.',
    example: 'assert f([]) is None',
    task: 'Uppgift: Skriv `test_medel(f)`: `f([2, 4])` ska bli `3` och `f([])` ska bli `None`.',
    starterCode: `${HEAD}def ai_medel(tal):\n    return sum(tal) / len(tal)\n\ndef lagad_medel(tal):\n    if not tal:\n        return None\n    return sum(tal) / len(tal)\n\n# Skriv test_medel(f) här\n`,
    solution: `${HEAD}def ai_medel(tal):\n    return sum(tal) / len(tal)\n\ndef lagad_medel(tal):\n    if not tal:\n        return None\n    return sum(tal) / len(tal)\n\ndef test_medel(f):\n    assert f([2, 4]) == 3\n    assert f([]) is None\n`,
    hints: [
      'Ett vanligt fall och ett kantfall.',
      'assert f([2, 4]) == 3',
      'assert f([]) is None',
    ],
    tests: [
      fails('test_medel', 'ai_medel'),
      passes('test_medel', 'lagad_medel'),
    ],
  },
  {
    id: 'kmai-45',
    track: 'testa',
    title: 'Många fall i en loop',
    xp: 15,
    description: 'Tio testfall behöver inte vara tio rader.',
    explain:
      'Lägg testfallen i en lista med par: indata och vad som ska komma ut. Loopa över dem:\n\n```\nfall = [(1, 1), (3, 6), (10, 55)]\nfor n, vantat in fall:\n    assert f(n) == vantat\n```\n\nDå är det lätt att lägga till fler.',
    example: 'for n, vantat in fall:\n    assert f(n) == vantat',
    task: 'Uppgift: Skriv `test_summa_till(f)` med en lista `fall` som innehåller minst `(1, 1)`, `(3, 6)` och `(10, 55)`, och en loop med assert.',
    starterCode: `${HEAD}def ai_summa_till(n):\n    return sum(range(1, n))\n\ndef lagad_summa_till(n):\n    return sum(range(1, n + 1))\n\n# Skriv test_summa_till(f) här\n`,
    solution: `${HEAD}def ai_summa_till(n):\n    return sum(range(1, n))\n\ndef lagad_summa_till(n):\n    return sum(range(1, n + 1))\n\ndef test_summa_till(f):\n    fall = [(1, 1), (3, 6), (10, 55)]\n    for n, vantat in fall:\n        assert f(n) == vantat\n`,
    hints: [
      'fall = [(1, 1), (3, 6), (10, 55)]',
      'for n, vantat in fall:',
      '    assert f(n) == vantat',
    ],
    tests: [
      fails('test_summa_till', 'ai_summa_till'),
      passes('test_summa_till', 'lagad_summa_till'),
    ],
    sourceChecks: [
      { description: 'Använder en loop', pattern: /for .+ in fall/ },
    ],
  },
  {
    id: 'kmai-46',
    track: 'testa',
    title: 'Testa att inget annat ändras',
    xp: 20,
    description:
      'Testa inte bara svaret – testa att funktionen inte förstör något.',
    explain:
      'Ett bra test kollar också **sidoeffekter**. Spara en kopia innan, anropa funktionen, och kolla att originalet är som förut:\n\n```\nlista = [5, 9, 1]\nkopia = list(lista)\nf(lista)\nassert lista == kopia\n```',
    example: 'kopia = list(lista)',
    task: 'Uppgift: Skriv `test_topp3(f)` som kollar att `f([5, 9, 1, 7])` ger `[9, 7, 5]` och att listan som skickades in inte ändrats.',
    starterCode: `${HEAD}def ai_topp3(poang):\n    poang.sort(reverse=True)\n    return poang[:3]\n\ndef lagad_topp3(poang):\n    return sorted(poang, reverse=True)[:3]\n\n# Skriv test_topp3(f) här\n`,
    solution: `${HEAD}def ai_topp3(poang):\n    poang.sort(reverse=True)\n    return poang[:3]\n\ndef lagad_topp3(poang):\n    return sorted(poang, reverse=True)[:3]\n\ndef test_topp3(f):\n    lista = [5, 9, 1, 7]\n    kopia = list(lista)\n    assert f(lista) == [9, 7, 5]\n    assert lista == kopia\n`,
    hints: [
      'Spara listan i en variabel och gör en kopia.',
      'Anropa f med listan och kolla svaret.',
      'assert lista == kopia',
    ],
    tests: [
      fails('test_topp3', 'ai_topp3'),
      passes('test_topp3', 'lagad_topp3'),
    ],
  },
  {
    id: 'kmai-47',
    track: 'testa',
    title: 'Testa från beskrivningen',
    xp: 20,
    description:
      'Skriv testerna innan du läser koden – utifrån vad den ska göra.',
    explain:
      'Proffs skriver ofta testerna **först**, utifrån beskrivningen. Då testar man vad koden _ska_ göra, inte vad den råkar göra.\n\nLäs bara beskrivningen och skriv ett test per regel.',
    example: '# Regel: … → assert …',
    task: 'Uppgift: `rabatt(pris, kod)` ska ge 20 % rabatt med koden `"STUDENT"` och ingen rabatt annars. Koden ska fungera oavsett stora och små bokstäver. Skriv `test_rabatt(f)` med ett test per regel.',
    starterCode: `${HEAD}def ai_rabatt(pris, kod):\n    if kod == "STUDENT":\n        return pris * 0.8\n    return pris\n\ndef lagad_rabatt(pris, kod):\n    if kod.upper() == "STUDENT":\n        return pris * 0.8\n    return pris\n\n# Skriv test_rabatt(f) här\n`,
    solution: `${HEAD}def ai_rabatt(pris, kod):\n    if kod == "STUDENT":\n        return pris * 0.8\n    return pris\n\ndef lagad_rabatt(pris, kod):\n    if kod.upper() == "STUDENT":\n        return pris * 0.8\n    return pris\n\ndef test_rabatt(f):\n    assert f(100, "STUDENT") == 80\n    assert f(100, "HEJ") == 100\n    assert f(100, "student") == 80\n`,
    hints: [
      'Tre regler: rabatt med koden, ingen annars, och små bokstäver.',
      'assert f(100, "HEJ") == 100',
      'assert f(100, "student") == 80',
    ],
    tests: [
      fails('test_rabatt', 'ai_rabatt'),
      passes('test_rabatt', 'lagad_rabatt'),
    ],
  },
  {
    id: 'kmai-48',
    track: 'testa',
    title: 'Vilket förslag är rätt?',
    xp: 20,
    description: 'Assistenten gav tre förslag. Låt dina tester välja.',
    explain:
      'Har du bra tester behöver du inte lita på någon: kör testerna mot varje förslag. Det som går igenom vinner.\n\n`__raises(test, f)` finns bara i rättningen. Själv kan du anropa `test_x(forslag_a)` och se om det blir fel.',
    example: 'test_initialer(forslag_a)',
    task: 'Uppgift: Skriv `test_initialer(f)`: `f("Ada Lovelace")` ska ge `"AL"` och `f("bo")` ska ge `"B"`. Kör testet mot de tre förslagen och spara bokstaven för det som klarar det i `ratt`.',
    starterCode: `# Assistentens tre förslag:\ndef forslag_a(namn):\n    return "".join(del_[0] for del_ in namn.split())\n\ndef forslag_b(namn):\n    return "".join(del_[0].upper() for del_ in namn.split())\n\ndef forslag_c(namn):\n    return namn[0].upper() + namn.split()[-1][0].upper()\n\n# Skriv test_initialer(f) här\nratt = None\n`,
    solution: `# Assistentens tre förslag:\ndef forslag_a(namn):\n    return "".join(del_[0] for del_ in namn.split())\n\ndef forslag_b(namn):\n    return "".join(del_[0].upper() for del_ in namn.split())\n\ndef forslag_c(namn):\n    return namn[0].upper() + namn.split()[-1][0].upper()\n\ndef test_initialer(f):\n    assert f("Ada Lovelace") == "AL"\n    assert f("bo") == "B"\n\nratt = "b"\n`,
    hints: [
      'Två assert i testet.',
      'Forslag a gör inte stora bokstäver. Forslag c dubblar ett ensamt namn.',
      'ratt = "b"',
    ],
    tests: [
      {
        description: 'Testet underkänner a',
        code: '__raises(test_initialer, forslag_a) is not None',
        expected: true,
      },
      {
        description: 'Testet underkänner c',
        code: '__raises(test_initialer, forslag_c) is not None',
        expected: true,
      },
      {
        description: 'Testet godkänner b',
        code: '__raises(test_initialer, forslag_b) is None',
        expected: true,
      },
      { description: 'ratt är b', code: 'ratt', expected: 'b' },
    ],
  },
  {
    id: 'kmai-49',
    track: 'testa',
    title: 'Laga tills testet går igenom',
    xp: 20,
    description: 'Nu vänder vi på det: testet finns, laga koden.',
    explain:
      'När testerna finns blir det enkelt att laga AI-kod: ändra, kör testet, upprepa – tills det går igenom. Det kallas att låta testerna **styra**.\n\nKör `test_vokaler(rakna_vokaler)` sist i koden. Blir det inget fel är du klar.',
    example: 'test_vokaler(rakna_vokaler)',
    task: 'Uppgift: Laga `rakna_vokaler` så att testet går igenom. Kör testet sist i koden.',
    starterCode: `# Testet är klart:\ndef test_vokaler(f):\n    assert f("hej") == 1\n    assert f("ÅÄÖ") == 3\n    assert f("") == 0\n\n# Assistentens förslag:\ndef rakna_vokaler(text):\n    return sum(1 for t in text if t in "aeiou")\n\ntest_vokaler(rakna_vokaler)\n`,
    solution: `def test_vokaler(f):\n    assert f("hej") == 1\n    assert f("ÅÄÖ") == 3\n    assert f("") == 0\n\ndef rakna_vokaler(text):\n    return sum(1 for t in text.lower() if t in "aeiouyåäö")\n\ntest_vokaler(rakna_vokaler)\n`,
    hints: [
      'Svenska har fler vokaler: y, å, ä och ö.',
      'Stora bokstäver räknas inte – gör om till små först.',
      'for t in text.lower() if t in "aeiouyåäö"',
    ],
    tests: [
      {
        description: 'Testet går igenom',
        code: '__raises(test_vokaler, rakna_vokaler) is None',
        expected: true,
      },
    ],
  },
];
