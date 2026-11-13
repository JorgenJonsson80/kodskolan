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
};
