// En boss per bana: en större uppgift utan ledtrådar. index.js lägger
// varje boss sist i sin bana.
const BOSS_INTRO = 'Bossen har inga ledtrådar – visa vad du kan! ';

export const BOSSES = {
  verktyg: {
    id: 'kmai-boss-verktyg',
    track: 'verktyg',
    title: 'Boss: Teamets AI-regler',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Teamet ska börja använda AI-assistenter och behöver regler. Skriv dem.',
    task: `Uppgift: Fyll i \`regler\`. Byt varje \`None\` mot \`True\` (regeln ska gälla) eller \`False\` (regeln är fel).`,
    starterCode:
      'regler = {\n    "Klistra aldrig in lösenord, nycklar eller .env-filer": None,\n    "Kod från AI behöver inte granskas om testerna går igenom": None,\n    "Den som committar koden ansvarar för den": None,\n    "Kolla att ett paket finns och är välkänt innan du installerar det": None,\n    "Agenter får köra git push --force utan att någon tittar": None,\n    "Kunddata får klistras in om man tar bort namnen ibland": None,\n    "Committa aldrig kod du inte kan förklara": None,\n}\n',
    solution:
      'regler = {\n    "Klistra aldrig in lösenord, nycklar eller .env-filer": True,\n    "Kod från AI behöver inte granskas om testerna går igenom": False,\n    "Den som committar koden ansvarar för den": True,\n    "Kolla att ett paket finns och är välkänt innan du installerar det": True,\n    "Agenter får köra git push --force utan att någon tittar": False,\n    "Kunddata får klistras in om man tar bort namnen ibland": False,\n    "Committa aldrig kod du inte kan förklara": True,\n}\n',
    hints: [],
    tests: [
      {
        description: 'Rätt på alla sju',
        code: 'list(regler.values())',
        expected: [true, false, true, true, false, false, true],
      },
    ],
  },
  bestall: {
    id: 'kmai-boss-bestall',
    track: 'bestall',
    title: 'Boss: Den perfekta beställningen',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO + 'Skriv en beställning som ett proffs, med allt från banan.',
    task: `Uppgift: Beställ en Python-funktion \`rabatt(pris, kod)\` som returnerar priset efter rabatt: koden \`"STUDENT"\` ger 20 % rabatt, alla andra koder ingen rabatt. Beställningen ska ha:
  - funktionens namn och vad den returnerar (ordet \`returnera\`)
  - ett exempel (ordet \`Exempel\`) med \`rabatt(100, "STUDENT")\` som ger \`80\`
  - ett kantfall: vad som händer med ett negativt pris (ordet \`negativt\`)
  - att den ska vara i Python utan bibliotek
  - en begäran om testfall med \`assert\``,
    starterCode: 'bestallning = ""\n',
    solution:
      'bestallning = "Skriv en Python-funktion rabatt(pris, kod), utan bibliotek, som ska returnera priset efter rabatt. Koden STUDENT ger 20 % rabatt och alla andra koder ingen rabatt. Exempel: rabatt(100, \\"STUDENT\\") ska ge 80. Om priset är negativt ska den ge ValueError. Ge också tre testfall med assert."\n',
    hints: [],
    tests: [
      {
        description: 'Nämner rabatt(pris, kod)',
        code: '"rabatt(pris, kod)" in bestallning',
        expected: true,
      },
      {
        description: 'Säger vad den returnerar',
        code: '"returnera" in bestallning.lower()',
        expected: true,
      },
      {
        description: 'Har exemplet',
        code: '"exempel" in bestallning.lower() and "80" in bestallning',
        expected: true,
      },
      {
        description: 'Har kantfallet',
        code: '"negativt" in bestallning.lower()',
        expected: true,
      },
      {
        description: 'Python utan bibliotek',
        code: '"python" in bestallning.lower() and "utan bibliotek" in bestallning.lower()',
        expected: true,
      },
      {
        description: 'Ber om tester med assert',
        code: '"assert" in bestallning',
        expected: true,
      },
    ],
  },
  las: {
    id: 'kmai-boss-las',
    track: 'las',
    title: 'Boss: Läs innan du litar',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Assistenten skrev en funktion för kundvagnen. Förutsäg vad den gör – utan att köra den.',
    task: `Uppgift: Läs \`total\` och skriv svaren själv:
  - \`svar_1\`: vad ger \`total([("bulle", 25, 2), ("kaffe", 30, 1)], False)\`?
  - \`svar_2\`: vad ger samma vagn med \`True\`?
  - \`svar_3\`: vad ger \`total([], True)\`?
  - \`rabattrad\`: på vilken rad (def är rad 1) dras rabatten av?`,
    starterCode:
      '# Assistentens kod:\ndef total(vagn, kampanj):\n    summa = 0\n    for namn, pris, antal in vagn:\n        summa += pris * antal\n    if kampanj and summa >= 50:\n        summa -= 10\n    return summa\n\nsvar_1 = None\nsvar_2 = None\nsvar_3 = None\nrabattrad = None\n',
    solution:
      '# Assistentens kod:\ndef total(vagn, kampanj):\n    summa = 0\n    for namn, pris, antal in vagn:\n        summa += pris * antal\n    if kampanj and summa >= 50:\n        summa -= 10\n    return summa\n\nsvar_1 = 80\nsvar_2 = 70\nsvar_3 = 0\nrabattrad = 6\n',
    hints: [],
    tests: [
      {
        description: 'svar_1',
        code: 'svar_1 == total([("bulle", 25, 2), ("kaffe", 30, 1)], False)',
        expected: true,
      },
      {
        description: 'svar_2',
        code: 'svar_2 == total([("bulle", 25, 2), ("kaffe", 30, 1)], True)',
        expected: true,
      },
      {
        description: 'svar_3',
        code: 'svar_3 == total([], True)',
        expected: true,
      },
      { description: 'rabattrad', code: 'rabattrad', expected: 6 },
    ],
    sourceChecks: [
      {
        description: 'Gissningarna är skrivna för hand',
        pattern: /^\s*svar_\d\s*=\s*total\(/m,
        forbidden: true,
      },
    ],
  },
  fel: {
    id: 'kmai-boss-fel',
    track: 'fel',
    title: 'Boss: Tre fel i en funktion',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Assistenten skrev en funktion för biljettpriser. Den har tre av felen från banan.',
    task: `Uppgift: \`biljettpris(alder_text)\` får åldern som text från ett formulär och ska returnera priset:
  - 0 kr för barn under 7 år
  - 60 kr från och med 7 till och med 17 år
  - 120 kr från och med 18 år
  - \`None\` om texten är tom
Laga funktionen.`,
    starterCode:
      '# Assistentens förslag – hitta och laga felen:\ndef biljettpris(alder_text):\n    alder = alder_text\n    if alder < 7:\n        return 0\n    elif alder < 17:\n        return 60\n    else:\n        return 120\n',
    solution:
      'def biljettpris(alder_text):\n    if not alder_text:\n        return None\n    alder = int(alder_text)\n    if alder < 7:\n        return 0\n    elif alder <= 17:\n        return 60\n    else:\n        return 120\n',
    hints: [],
    tests: [
      {
        description: 'Tom text ger None',
        code: 'biljettpris("")',
        expected: null,
      },
      { description: '"6" ger 0', code: 'biljettpris("6")', expected: 0 },
      { description: '"7" ger 60', code: 'biljettpris("7")', expected: 60 },
      { description: '"17" ger 60', code: 'biljettpris("17")', expected: 60 },
      { description: '"18" ger 120', code: 'biljettpris("18")', expected: 120 },
    ],
  },
  testa: {
    id: 'kmai-boss-testa',
    track: 'testa',
    title: 'Boss: Testet som fångar allt',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Assistenten har gett tre versioner av biljettpris, alla med olika fel. Skriv ett test som fångar alla tre.',
    task: `Uppgift: Skriv \`test_biljett(f)\`. Reglerna för \`f(alder)\` (ett heltal):
  - 0 kr under 7 år
  - 60 kr från och med 7 till och med 17 år
  - 120 kr från och med 18 år
Testet ska underkänna \`fel_1\`, \`fel_2\` och \`fel_3\` och godkänna \`lagad\`.`,
    starterCode:
      '# Rör inte de här:\ndef fel_1(alder):\n    return 0 if alder <= 7 else 60 if alder <= 17 else 120\n\ndef fel_2(alder):\n    return 0 if alder < 7 else 60 if alder < 17 else 120\n\ndef fel_3(alder):\n    return 0 if alder < 7 else 60 if alder <= 18 else 120\n\ndef lagad(alder):\n    return 0 if alder < 7 else 60 if alder <= 17 else 120\n\n# Skriv test_biljett(f) här\n',
    solution:
      '# Rör inte de här:\ndef fel_1(alder):\n    return 0 if alder <= 7 else 60 if alder <= 17 else 120\n\ndef fel_2(alder):\n    return 0 if alder < 7 else 60 if alder < 17 else 120\n\ndef fel_3(alder):\n    return 0 if alder < 7 else 60 if alder <= 18 else 120\n\ndef lagad(alder):\n    return 0 if alder < 7 else 60 if alder <= 17 else 120\n\ndef test_biljett(f):\n    fall = [(6, 0), (7, 60), (17, 60), (18, 120)]\n    for alder, pris in fall:\n        assert f(alder) == pris\n',
    hints: [],
    tests: [
      {
        description: 'Fångar fel_1',
        code: '__raises(test_biljett, fel_1) is not None',
        expected: true,
      },
      {
        description: 'Fångar fel_2',
        code: '__raises(test_biljett, fel_2) is not None',
        expected: true,
      },
      {
        description: 'Fångar fel_3',
        code: '__raises(test_biljett, fel_3) is not None',
        expected: true,
      },
      {
        description: 'Godkänner lagad',
        code: '__raises(test_biljett, lagad) is None',
        expected: true,
      },
    ],
  },
  sakerhet: {
    id: 'kmai-boss-sakerhet',
    track: 'sakerhet',
    title: 'Boss: Granska inloggningen',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Assistenten skrev en inloggning med tre säkerhetshål. Laga alla.',
    task: `Uppgift: Laga koden så att:
  1. Admin-lösenordet inte står i koden – det läses från miljövariabeln \`ADMIN_LOSENORD\`.
  2. Användarnas lösenord sparas som sha256-hashar, och \`registrera\` och \`logga_in\` använder hashen.
  3. \`logga_in\` ger \`"Fel användarnamn eller lösenord"\` vid alla fel och \`"Välkommen"\` när det stämmer.`,
    starterCode:
      '# Assistentens förslag:\nANVANDARE = {}\nADMIN = "admin123"\n\ndef registrera(namn, losenord):\n    ANVANDARE[namn] = losenord\n\ndef logga_in(namn, losenord):\n    if namn == "admin":\n        return "Välkommen" if losenord == ADMIN else "Fel lösenord"\n    if namn not in ANVANDARE:\n        return "Användaren finns inte"\n    if ANVANDARE[namn] != losenord:\n        return "Fel lösenord"\n    return "Välkommen"\n',
    solution:
      'import hashlib\nimport os\n\nANVANDARE = {}\n\ndef hasha(losenord):\n    return hashlib.sha256(losenord.encode()).hexdigest()\n\ndef registrera(namn, losenord):\n    ANVANDARE[namn] = hasha(losenord)\n\ndef logga_in(namn, losenord):\n    if namn == "admin":\n        ratt = os.environ.get("ADMIN_LOSENORD")\n        if ratt and losenord == ratt:\n            return "Välkommen"\n        return "Fel användarnamn eller lösenord"\n    if ANVANDARE.get(namn) != hasha(losenord):\n        return "Fel användarnamn eller lösenord"\n    return "Välkommen"\n',
    hints: [],
    tests: [
      {
        description: 'Lösenordet sparas som en hash',
        code: '(registrera("ada", "kanel"), ANVANDARE["ada"] != "kanel" and len(ANVANDARE["ada"]) == 64)[1]',
        expected: true,
      },
      {
        description: 'Rätt lösenord loggar in',
        code: '(registrera("ada", "kanel"), logga_in("ada", "kanel"))[1]',
        expected: 'Välkommen',
      },
      {
        description: 'Fel lösenord',
        code: '(registrera("ada", "kanel"), logga_in("ada", "x"))[1]',
        expected: 'Fel användarnamn eller lösenord',
      },
      {
        description: 'Okänd användare',
        code: 'logga_in("okand", "x")',
        expected: 'Fel användarnamn eller lösenord',
      },
      {
        description: 'Admin läses från miljön',
        code: '(os.environ.__setitem__("ADMIN_LOSENORD", "superhemligt"), logga_in("admin", "superhemligt"))[1]',
        expected: 'Välkommen',
      },
    ],
    sourceChecks: [
      {
        description: 'Admin-lösenordet står inte i koden',
        pattern: /admin123/,
        forbidden: true,
      },
    ],
  },
  refaktor: {
    id: 'kmai-boss-refaktor',
    track: 'refaktor',
    title: 'Boss: Städa kassan',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Assistentens kassakod fungerar, men ingen vågar röra den. Städa den – testet ska gå igenom hela tiden.',
    task: `Uppgift: Gör om koden så att:
  1. Funktionen heter \`att_betala\` och parametrarna \`rader\` och \`medlem\`.
  2. Talen ligger i konstanterna \`MOMS = 0.25\` och \`MEDLEMSRABATT = 0.1\`.
  3. Summan räknas i en egen funktion \`summera(rader)\`.
  4. Testet längst ner går igenom (byt namnet i anropet).`,
    starterCode:
      'def test_kassan(f):\n    assert f([(100, 2)], False) == 250\n    assert f([(100, 2)], True) == 225\n    assert f([], True) == 0\n\n# Assistentens kod:\ndef k(r, m):\n    s = 0\n    for x in r:\n        s = s + x[0] * x[1]\n    if m == True:\n        s = s - s * 0.1\n    return s + s * 0.25\n\ntest_kassan(k)\n',
    solution:
      'MOMS = 0.25\nMEDLEMSRABATT = 0.1\n\ndef test_kassan(f):\n    assert f([(100, 2)], False) == 250\n    assert f([(100, 2)], True) == 225\n    assert f([], True) == 0\n\ndef summera(rader):\n    return sum(pris * antal for pris, antal in rader)\n\ndef att_betala(rader, medlem):\n    summa = summera(rader)\n    if medlem:\n        summa = summa * (1 - MEDLEMSRABATT)\n    return summa * (1 + MOMS)\n\ntest_kassan(att_betala)\n',
    hints: [],
    tests: [
      {
        description: 'Testet går igenom',
        code: '__raises(test_kassan, att_betala) is None',
        expected: true,
      },
      {
        description: 'summera finns',
        code: 'summera([(30, 2)])',
        expected: 60,
      },
      {
        description: 'Konstanterna',
        code: '[MOMS, MEDLEMSRABATT]',
        expected: [0.25, 0.1],
      },
    ],
    sourceChecks: [
      {
        description: 'Den gamla funktionen k är borta',
        pattern: /def k\(/,
        forbidden: true,
      },
      {
        description: 'Inga magiska tal i att_betala',
        pattern: /def att_betala[\s\S]*(0\.25|0\.1)/,
        forbidden: true,
      },
    ],
  },
};
