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
  {
    id: 'idea-verktygslada',
    track: 'funktioner',
    emoji: '🛠️',
    title: 'Din verktygslåda',
    summary: 'Små funktioner du kan ha nytta av, alla med typer.',
    goals: [
      'Skriv `arJamnt(tal: number): boolean`.',
      'Skriv `initialer(fornamn: string, efternamn: string): string`.',
      'Skriv `upprepa(text: string, ganger = 2): string`.',
    ],
    extra:
      'Skriv en funktion som tar en annan funktion som parameter och kör den tre gånger.',
  },
  {
    id: 'idea-tarning',
    track: 'funktioner',
    emoji: '🎲',
    title: 'Tärningen',
    summary: 'Slå tärningar med typer på allt.',
    goals: [
      'Skriv `sla(sidor = 6): number` med `Math.random`.',
      'Skriv `slaFlera(antal: number): number` som slår och summerar.',
      'Skriv `visa(resultat: number): void` som skriver ut resultatet.',
    ],
    extra: 'Låt `sla` ta en funktion som bestämmer vad som händer vid en sexa.',
  },
  {
    id: 'idea-any',
    track: 'funktioner',
    emoji: '🕳️',
    title: 'Hålet any',
    summary: 'Se vad som händer när TypeScript slutar kontrollera.',
    goals: [
      'Skriv en funktion med en parameter av typen `any`.',
      'Anropa den med text, ett tal och ingenting, och se att TypeScript inte säger något.',
      'Byt `any` mot rätt typ och se vilka anrop som nu blir fel.',
    ],
    extra:
      'Hitta ett anrop som kraschar när koden körs, men som `any` släppte igenom.',
  },
  {
    id: 'idea-spellista',
    track: 'objekt',
    emoji: '🎵',
    title: 'Spellistan',
    summary: 'En spellista med låtar, längder och favoriter.',
    goals: [
      'Skapa en lista med låtar: titel, artist, sekunder och kanske `favorit?: boolean`.',
      'Räkna ut hur lång hela listan är i minuter.',
      'Skriv ut bara favoriterna.',
    ],
    extra: 'Gör listan `readonly` och se vilka metoder som försvinner.',
  },
  {
    id: 'idea-garderob',
    track: 'objekt',
    emoji: '👕',
    title: 'Garderoben',
    summary: 'Håll koll på kläder, storlekar och vad som behöver tvättas.',
    goals: [
      'Skapa en lista med plagg: namn, storlek och `ren: boolean`.',
      'Skriv en funktion som ger alla plagg som behöver tvättas.',
      'Skriv en funktion som räknar plaggen i en viss storlek.',
    ],
    extra: 'Ge varje plagg ett `readonly id` och försök ändra det.',
  },
  {
    id: 'idea-recept',
    track: 'objekt',
    emoji: '🥞',
    title: 'Receptet',
    summary: 'Ett recept som kan räknas om för fler portioner.',
    goals: [
      'Skapa ett recept: namn, portioner och en lista med ingredienser (namn, mängd, enhet).',
      'Skriv en funktion som räknar om mängderna till ett annat antal portioner.',
      'Skriv ut ingredienslistan snyggt.',
    ],
    extra: 'Gör enheten valfri, för "3 ägg" har ingen enhet.',
  },
  {
    id: 'idea-typbibliotek',
    track: 'egna',
    emoji: '🏫',
    title: 'Skolan i typer',
    summary:
      'Beskriv en skola med egna typer, utan att skriva någon logik alls först.',
    goals: [
      'Skapa typer för `Elev`, `Larare` och `Kurs`.',
      'Låt `Elev` och `Larare` bygga på en gemensam `Person` med `extends`.',
      'Skapa några objekt och se att TypeScript kollar dem.',
    ],
    extra: 'Lägg till en `Klass` med en lärare och en lista med elever.',
  },
  {
    id: 'idea-kalender',
    track: 'egna',
    emoji: '📅',
    title: 'Kalendern',
    summary: 'Händelser med datum, plats och deltagare.',
    goals: [
      'Skapa `type Handelse` med titel, datum (text) och plats.',
      'Skapa en lista med händelser.',
      'Skriv en funktion som ger alla händelser på en viss plats.',
    ],
    extra: 'Lägg till `type MedId = { id: number }` och sätt ihop med `&`.',
  },
  {
    id: 'idea-interface-vs-type',
    track: 'egna',
    emoji: '⚖️',
    title: 'type eller interface?',
    summary: 'Skriv samma typ på båda sätten och hitta skillnaderna.',
    goals: [
      'Skriv en `Bil` som `type` och som `interface`.',
      'Bygg vidare på båda: `extends` för interface och `&` för type.',
      'Försök skriva två `interface Bil` efter varandra. Vad händer? Prova samma med `type`.',
    ],
    extra: 'Läs om "declaration merging" i handboken.',
  },
  {
    id: 'idea-sten-sax-pase',
    track: 'unioner',
    emoji: '✂️',
    title: 'Sten, sax, påse',
    summary: 'Spelet där bara tre drag är tillåtna.',
    goals: [
      "Skapa `type Drag = 'sten' | 'sax' | 'påse'`.",
      'Skriv `vinnare(a: Drag, b: Drag)` som säger vem som vann, eller oavgjort.',
      'Låt datorn slumpa ett drag och spela mot den.',
    ],
    extra:
      "Lägg till 'ödla' och 'Spock' och se var TypeScript säger att koden behöver ändras.",
  },
  {
    id: 'idea-enheter',
    track: 'unioner',
    emoji: '📐',
    title: 'Enhetsomvandlaren',
    summary: 'Längder i olika enheter, med en union av enheterna.',
    goals: [
      "Skapa `type Enhet = 'mm' | 'cm' | 'm' | 'km'`.",
      'Skriv en funktion som gör om en längd från en enhet till en annan.',
      'Låt längden få komma som text eller tal.',
    ],
    extra: 'Lägg till tum och fot.',
  },
  {
    id: 'idea-dagens-humor',
    track: 'unioner',
    emoji: '😊',
    title: 'Dagens humör',
    summary: 'En dagbok där humöret bara kan vara vissa värden.',
    goals: [
      'Skapa en union med fem humör.',
      'Skapa en lista med dagar och humör.',
      'Räkna hur många dagar av varje humör det blev.',
    ],
    extra: 'Ge varje humör en emoji och skriv ut veckan som en rad.',
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
