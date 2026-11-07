// Egna program att skriva på Lekplatsen när ett projekt på banan är klart.
// Här finns inga tester – eleven bestämmer själv när det är klart.
// Idéerna använder bara det man lärt sig fram till och med banan.
// goals: vad programmet ska göra. extra: för den som vill ha mer.
export const IDEAS = [
  {
    id: 'idea-utforska-typer',
    track: 'typer',
    emoji: '🔍',
    title: 'Typjakten',
    summary: 'Skriv olika värden och se vad TypeScript tror att de är.',
    goals: [
      'Skapa fem variabler utan typ: text, tal, sant/falskt, en jämförelse och en uträkning.',
      'Håll musen över varje namn och se typen.',
      'Gör samma sak med const och let, och jämför typerna.',
    ],
    extra: 'Vad blir typen av `10 / 3`? Och av `(10 / 3).toFixed(1)`?',
  },
  {
    id: 'idea-omvandlare',
    track: 'typer',
    emoji: '📏',
    title: 'Omvandlaren',
    summary: 'Gör om enheter: kilometer till mil, minuter till timmar.',
    goals: [
      'Skapa `km` (`number`) och räkna ut `mil` (en mil är 10 km).',
      'Skapa `minuter` och räkna ut hela timmar med `Math.floor`.',
      'Skriv ut svaren med console.log i en template literal.',
    ],
    extra:
      'Läs in värdet som text först, som från ett formulär, och gör om det med `Number`.',
  },
  {
    id: 'idea-fel-med-flit',
    track: 'typer',
    emoji: '💥',
    title: 'Fel med flit',
    summary: 'Skapa typfel med flit och läs vad TypeScript säger.',
    goals: [
      'Ge en `number` en text och läs felet.',
      'Stava fel på en metod, som `toUppercase`, och se förslaget.',
      'Ändra en `const` och läs felet.',
    ],
    extra:
      'Hitta ett fel som JavaScript bara hade kört, men som TypeScript stoppar.',
  },
];

const goalLines = idea =>
  idea.goals
    .map((goal, index) => `// ${index + 1}. ${goal.replace(/`/g, '')}`)
    .join('\n');

export function ideaStarterCode(idea) {
  if (!idea) {
    return "// Skriv vilken TypeScript du vill.\n// Håll musen över namnen för att se typerna.\nconst hej: string = 'Hej, TypeScript!';\nconsole.log(hej);\n";
  }
  return `// ${idea.emoji} ${idea.title}\n${goalLines(idea)}\n\n`;
}
