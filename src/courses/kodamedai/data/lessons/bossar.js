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
};
