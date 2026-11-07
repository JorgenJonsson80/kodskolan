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
  {
    id: 'idea-krascha-inte',
    track: 'saknas',
    emoji: '🧯',
    title: 'Krascha inte',
    summary: 'Ta JavaScript-kod som kan krascha och låt TypeScript visa var.',
    goals: [
      'Skriv en lista med objekt där en del saknar en egenskap.',
      'Använd `find` och läs egenskaper på svaret – se var TypeScript säger till.',
      'Laga varje ställe med `if`, `?.` eller `??`.',
    ],
    extra: 'Prova `!` och se när koden kraschar ändå.',
  },
  {
    id: 'idea-profilsida',
    track: 'saknas',
    emoji: '👤',
    title: 'Profilsidan',
    summary: 'En profil där nästan allt är valfritt.',
    goals: [
      'Skapa en typ för en profil med många valfria fält: bio, hemsida, födelsedag …',
      'Skriv en funktion som bygger en text av det som finns, och hoppar över resten.',
      'Testa med en tom profil och en full.',
    ],
    extra: 'Låt hela profilen kunna vara `null` för en utloggad besökare.',
  },
  {
    id: 'idea-nollor',
    track: 'saknas',
    emoji: '0️⃣',
    title: 'Nollor och tomma texter',
    summary: 'Hitta skillnaden mellan ?? och || med egna exempel.',
    goals: [
      'Skriv ut `0 ?? 5` och `0 || 5`.',
      "Gör samma sak med `''`, `false`, `null` och `undefined`.",
      'Skriv en funktion där `||` ger fel svar och laga den med `??`.',
    ],
    extra: 'Läs om `??=` och prova den.',
  },
  {
    id: 'idea-tillstand',
    track: 'fall',
    emoji: '⏳',
    title: 'Laddar, klart, fel',
    summary: 'De tre lägen alla appar som hämtar data har.',
    goals: [
      "Skapa en union: `{ lage: 'laddar' }`, `{ lage: 'klart'; data: string[] }` och `{ lage: 'fel'; meddelande: string }`.",
      'Skriv en funktion som ger en text för varje läge.',
      'Lägg till ett `never` i default och sedan ett fjärde läge – se felet.',
    ],
    extra: 'Lägg till `tom` för när data är en tom lista.',
  },
  {
    id: 'idea-fordon',
    track: 'fall',
    emoji: '🚲',
    title: 'Fordonsparken',
    summary: 'Cyklar, bilar och båtar med olika egenskaper.',
    goals: [
      'Skapa en union av fordon med en gemensam etikett.',
      'Skriv en funktion som räknar ut hur många personer varje fordon tar.',
      'Sortera ut bara bilarna med `filter`.',
    ],
    extra: 'Räkna hur många hjul det finns i hela parken.',
  },
  {
    id: 'idea-tarningsspel',
    track: 'fall',
    emoji: '🎮',
    title: 'Spelets händelser',
    summary: 'Ett litet spel som drivs av händelser.',
    goals: [
      "Skapa händelser som `{ typ: 'poang'; antal: number }`, `{ typ: 'miste_liv' }` och `{ typ: 'nästa_nivå' }`.",
      'Skriv en funktion som tar spelets läge och en händelse och ger ett nytt läge.',
      'Kör en lista med händelser med `reduce`.',
    ],
    extra: "Lägg till `{ typ: 'game_over' }` när liven tar slut.",
  },
  {
    id: 'idea-egna-arraymetoder',
    track: 'generics',
    emoji: '🔁',
    title: 'Egna arraymetoder',
    summary: 'Skriv egna versioner av filter, find och reduce med generics.',
    goals: [
      'Skriv `filtrera<T>(lista: T[], test: (x: T) => boolean): T[]`.',
      'Skriv `hitta<T>(lista: T[], test: (x: T) => boolean): T | undefined`.',
      'Jämför typerna med de riktiga metoderna genom att hålla musen över dem.',
    ],
    extra:
      'Skriv `reducera<T, U>(lista: T[], f: (summa: U, x: T) => U, start: U): U`.',
  },
  {
    id: 'idea-stack',
    track: 'generics',
    emoji: '🥞',
    title: 'Högen',
    summary:
      'En hög där det sista som lades dit tas först, för vilken typ som helst.',
    goals: [
      'Skapa `type Hog<T> = { saker: T[] }`.',
      'Skriv `lagg<T>` och `ta<T>` som ger en ny hög.',
      'Använd högen för att vända på ett ord, bokstav för bokstav.',
    ],
    extra:
      'Använd högen för att kolla att alla parenteser i en text är parade.',
  },
  {
    id: 'idea-ordfrekvens',
    track: 'generics',
    emoji: '📊',
    title: 'Ordräknaren',
    summary: 'Räkna orden i en text och visa de vanligaste.',
    goals: [
      'Dela upp en text i ord.',
      'Räkna dem i en `Map<string, number>`.',
      'Visa de fem vanligaste.',
    ],
    extra: 'Gör räknaren generisk: `rakna<T>(lista: T[]): Map<T, number>`.',
  },
  {
    id: 'idea-typverkstad',
    track: 'verktyg',
    emoji: '🔬',
    title: 'Typverkstaden',
    summary: 'Gör nya typer av en gammal och håll musen över resultatet.',
    goals: [
      'Skapa en stor typ, t.ex. en `Film` med många fält.',
      'Gör `Partial`, `Pick`, `Omit` och `Readonly` av den, och håll musen över varje.',
      "Kombinera två: `Partial<Omit<Film, 'id'>>`.",
    ],
    extra:
      'Prova `Required`, `NonNullable` och `Awaited` och läs vad de gör i handboken.',
  },
  {
    id: 'idea-schema',
    track: 'verktyg',
    emoji: '🗓️',
    title: 'Veckoschemat',
    summary: 'Ett schema där varje dag måste finnas.',
    goals: [
      "Skapa `type Dag = 'mån' | 'tis' | 'ons' | 'tor' | 'fre'`.",
      'Skapa ett `Record<Dag, string[]>` med lektioner.',
      'Skriv en funktion som räknar lektionerna under veckan.',
    ],
    extra:
      'Lägg till lördag i typen och se var TypeScript säger att schemat är ofullständigt.',
  },
  {
    id: 'idea-config',
    track: 'verktyg',
    emoji: '🎛️',
    title: 'Inställningar med standardvärden',
    summary: 'Låt typen komma från standardvärdena med typeof.',
    goals: [
      'Skapa ett objekt med standardinställningar.',
      'Gör `type Installningar = typeof standard`.',
      'Skriv en funktion som tar en `Partial<Installningar>` och fyller i resten.',
    ],
    extra:
      'Lägg till en ny inställning i standardobjektet och se att typen följer med.',
  },
  {
    id: 'idea-api-utforskare',
    track: 'data',
    emoji: '🗺️',
    title: 'API-utforskaren',
    summary: 'Hämta allt låtsas-API:t har och skriv typer som passar.',
    goals: [
      'Hämta `/api/users`, `/api/todos` och `/api/users/1/todos` och skriv ut svaren.',
      'Skriv en typ för varje sorts svar.',
      'Skriv en typkontroll för varje typ och testa den på svaren.',
    ],
    extra: 'Hämta `/api/broken` och visa ett snällt felmeddelande.',
  },
  {
    id: 'idea-json-validering',
    track: 'data',
    emoji: '🧪',
    title: 'JSON-testaren',
    summary: 'Klistra in JSON och se om den passar din typ.',
    goals: [
      'Skriv några JSON-texter, en del rätt och en del fel.',
      'Läs dem med `JSON.parse` som `unknown`.',
      'Kolla dem med en egen typkontroll och skriv ut vad som var fel.',
    ],
    extra:
      'Låt kontrollen säga vilket fält som var fel, inte bara att något var det.',
  },
  {
    id: 'idea-langsam-server',
    track: 'data',
    emoji: '🐢',
    title: 'Den långsamma servern',
    summary: 'Löften som tar tid, och flera på en gång.',
    goals: [
      'Skriv `vanta(ms: number): Promise<void>` med `setTimeout`.',
      'Hämta tre användare en i taget, och sedan med `Promise.all`.',
      'Skriv ut i vilken ordning de blir klara.',
    ],
    extra: 'Läs om `Promise.race` och prova den.',
  },
  {
    id: 'idea-typfel-samling',
    track: 'felsok',
    emoji: '📚',
    title: 'Din felsamling',
    summary: 'Samla typfelen du stött på och skriv egna förklaringar.',
    goals: [
      'Skriv fem rader kod som ger fem olika typfel.',
      'Skriv en kommentar ovanför varje med vad felet betyder.',
      'Laga dem en i taget.',
    ],
    extra: 'Hitta ett fel som TypeScript inte ser, och förklara varför.',
  },
  {
    id: 'idea-any-jakt',
    track: 'felsok',
    emoji: '🕵️',
    title: 'any-jakten',
    summary: 'Ta kod full av any och gör den typad, steg för steg.',
    goals: [
      'Skriv ett litet program där allt är `any`.',
      'Byt ett `any` i taget mot en riktig typ.',
      'Räkna hur många fel TypeScript hittar på vägen.',
    ],
    extra: 'Byt `any` mot `unknown` först, och se vad som händer.',
  },
  {
    id: 'idea-as-test',
    track: 'felsok',
    emoji: '🎭',
    title: 'as på prov',
    summary: 'När är as okej, och när ljuger det?',
    goals: [
      'Skriv tre exempel där `as` gör att koden kraschar.',
      'Skriv ett exempel där `as` faktiskt behövs.',
      'Byt de farliga mot `satisfies` eller en typkontroll.',
    ],
    extra: 'Läs om `as const` och prova den på en lista.',
  },
  {
    id: 'idea-react-kort',
    track: 'react',
    emoji: '🃏',
    title: 'Kortleken',
    summary: 'En kortlek med typade kort och en hand att visa.',
    goals: [
      "Skapa `type Kort = { farg: '♥' | '♠' | '♦' | '♣'; varde: number }`.",
      'Skriv en komponent som visar ett kort.',
      'Visa en hand med fem kort och en knapp som drar ett nytt.',
    ],
    extra: 'Räkna ut om handen har ett par.',
  },
  {
    id: 'idea-react-formular',
    track: 'react',
    emoji: '🗒️',
    title: 'Anmälningsformuläret',
    summary: 'Ett formulär med typade fält och fel per fält.',
    goals: [
      'Skapa en typ för formulärets fält.',
      'Bygg formuläret med ett state per fält och typade händelser.',
      'Visa ett fel under varje fält som är fel.',
    ],
    extra: 'Spara allt i ett enda state-objekt och uppdatera med `Partial`.',
  },
  {
    id: 'idea-react-hamta',
    track: 'react',
    emoji: '🔄',
    title: 'Hämta och visa',
    summary: 'En komponent som hämtar data och visar laddar, klart och fel.',
    goals: [
      'Skapa en union för de tre lägena.',
      'Hämta `/api/users` i en `useEffect`.',
      'Visa varje läge på sitt sätt.',
    ],
    extra: 'Lägg till en knapp som hämtar igen.',
  },
  {
    id: 'idea-pensionat-vidare',
    track: 'slutprojekt',
    emoji: '🐕',
    title: 'Pensionatet, del 2',
    summary: 'Bygg vidare på bokningsappen.',
    goals: [
      'Lägg till ett val av hund i bokningsformuläret.',
      'Visa alla bokningar med `BokningsKort`.',
      'Lägg till en knapp som avbokar.',
    ],
    extra: 'Lägg till rum, och se till att ett rum inte kan dubbelbokas.',
  },
  {
    id: 'idea-egen-app',
    track: 'slutprojekt',
    emoji: '🚀',
    title: 'Din egen app',
    summary: 'Planera och bygg en egen liten app – typerna först.',
    goals: [
      'Välj något du bryr dig om: träning, spel, recept …',
      'Skriv alla typer innan du skriver någon logik.',
      'Bygg logiken och sedan en komponent som visar den.',
    ],
    extra: 'Låt en kompis använda appen och se var den behöver bli tydligare.',
  },
  {
    id: 'idea-js-till-ts',
    track: 'slutprojekt',
    emoji: '🔁',
    title: 'Från JavaScript till TypeScript',
    summary: 'Ta ett program från JS-kursen och gör om det till TypeScript.',
    goals: [
      'Klistra in ett program du skrivit i JavaScript.',
      'Lägg till typer tills alla röda linjer är borta.',
      'Skriv ner felen TypeScript hittade som JavaScript missade.',
    ],
    extra: 'Gör en typ du kan återanvända i ett annat program.',
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
