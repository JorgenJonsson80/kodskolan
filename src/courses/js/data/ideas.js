// Egna projekt att bygga på Lekplatsen när banans tre projekt är klara.
// Här finns inga tester – eleven bestämmer själv när det är klart.
// Idéerna använder bara det man lärt sig fram till och med banan.
// goals: vad programmet ska klara. extra: för den som vill ha mer.
export const ideas = [
  {
    id: 'idea-guess',
    track: 'js-basics',
    emoji: '🎲',
    title: 'Gissa talet',
    summary:
      'Ett hemligt tal och en lista med gissningar. Vilken gissning träffar?',
    goals: [
      'Spara ett hemligt tal i en konstant.',
      'Gå igenom några gissningar med en loop.',
      'Skriv ut "för högt", "för lågt" eller "rätt!" för varje gissning.',
    ],
    extra: 'Räkna hur många gissningar det tog och skriv ut det på slutet.',
  },
  {
    id: 'idea-times-table',
    track: 'js-basics',
    emoji: '✖️',
    title: 'Multiplikationstabellen',
    summary: 'Skriv ut gångertabellen för ett valfritt tal.',
    goals: [
      'Välj ett tal och spara det i en variabel.',
      'Skriv ut raderna 1 × talet till 10 × talet med en loop.',
    ],
    extra:
      'Markera raderna där svaret är ett jämnt tal. Tips: `svar % 2 === 0` är sant för jämna tal (% ger resten vid division).',
  },
  {
    id: 'idea-fizzbuzz',
    track: 'js-basics',
    emoji: '🐝',
    title: 'FizzBuzz',
    summary: 'Den klassiska uppgiften som många får på sin första kodintervju.',
    goals: [
      'Skriv ut talen 1 till 30.',
      'Skriv "Fizz" i stället för tal som är delbara med 3, och "Buzz" för tal delbara med 5. Tips: `tal % 3 === 0` är sant när talet är delbart med 3.',
      'Skriv "FizzBuzz" för tal som är delbara med både 3 och 5.',
    ],
    extra:
      'Tänk på i vilken ordning villkoren kollas. Vad händer om du byter plats på dem?',
  },
  {
    id: 'idea-contacts',
    track: 'arrays',
    emoji: '📇',
    title: 'Kontaktboken',
    summary: 'En lista med personer där du kan leta upp ett telefonnummer.',
    goals: [
      'Skapa en array med minst tre objekt som har name och phone.',
      'Lägg till en ny kontakt med push.',
      'Leta upp en kontakt med ett visst namn och skriv ut numret.',
    ],
    extra: 'Skriv "Hittade ingen" om namnet inte finns i listan.',
  },
  {
    id: 'idea-gradebook',
    track: 'arrays',
    emoji: '📚',
    title: 'Betygsboken',
    summary: 'Håll koll på dina provresultat och räkna ut snittet.',
    goals: [
      'Spara några provresultat som objekt med subject och score.',
      'Skriv ut varje ämne och resultat.',
      'Räkna ut och skriv ut medelvärdet.',
    ],
    extra: 'Skriv ut ämnet med högst resultat.',
  },
  {
    id: 'idea-shopping',
    track: 'arrays',
    emoji: '🧺',
    title: 'Inköpslistan',
    summary: 'Varor med pris och antal, och vad allt kostar tillsammans.',
    goals: [
      'Skapa en array med varor som har name, price och quantity.',
      'Skriv ut varje vara med totalpris för just den varan.',
      'Räkna ut vad hela listan kostar.',
    ],
    extra:
      'Ta bort den sista varan med `pop()` och räkna om summan. pop tar bort det sista elementet i en array.',
  },
  {
    id: 'idea-currency',
    track: 'functions',
    emoji: '💱',
    title: 'Valutaomvandlaren',
    summary: 'Gör om kronor till euro och dollar – och tillbaka.',
    goals: [
      'Skriv en funktion som gör om kronor till euro.',
      'Skriv en funktion som gör om kronor till dollar.',
      'Anropa funktionerna med några belopp och skriv ut svaren.',
    ],
    extra:
      'Gör en enda funktion som tar valutan som parameter, med euro som standardvärde.',
  },
  {
    id: 'idea-calculator',
    track: 'functions',
    emoji: '🧮',
    title: 'Miniräknaren',
    summary: 'De fyra räknesätten, en funktion för varje.',
    goals: [
      'Skriv funktionerna add, subtract, multiply och divide.',
      'Skriv en funktion calculate(a, operator, b) som väljer rätt funktion.',
      'Testa med några tal och skriv ut svaren.',
    ],
    extra:
      'Låt divide returnera ett meddelande i stället för Infinity när man delar med 0.',
  },
  {
    id: 'idea-temperature',
    track: 'functions',
    emoji: '🌡️',
    title: 'Temperaturomvandlaren',
    summary: 'Celsius till Fahrenheit, och ett omdöme om vädret.',
    goals: [
      'Skriv en arrow function som gör om Celsius till Fahrenheit (C × 9 / 5 + 32).',
      'Skriv en funktion som gör tvärtom.',
      'Skriv en funktion som returnerar "kallt", "lagom" eller "varmt".',
    ],
    extra: 'Avrunda svaren till heltal med `Math.round()`.',
  },
  {
    id: 'idea-palindrome',
    track: 'strings',
    emoji: '🔁',
    title: 'Palindromkollen',
    summary: 'Är ordet likadant baklänges, som "kajak" och "Anna"?',
    goals: [
      'Skriv en funktion som tar emot ett ord.',
      'Gör ordet till små bokstäver så att "Anna" också räknas.',
      "Returnera true om ordet är ett palindrom, annars false. Tips: `ord.split('').reverse().join('')` vänder på ordet.",
    ],
    extra:
      "Få det att fungera för meningar som \"Ni talar bra latin\". Tips: `text.replaceAll(' ', '')` tar bort alla mellanslag.",
  },
  {
    id: 'idea-vowels',
    track: 'strings',
    emoji: '🔤',
    title: 'Räkna vokaler',
    summary: 'Hur många vokaler finns det i en mening?',
    goals: [
      'Skriv en funktion som tar emot en text.',
      "Gå igenom bokstäverna med for...of och räkna vokalerna. Tips: `'aeiouyåäö'.includes(bokstav)`.",
      'Skriv ut svaret med en template literal.',
    ],
    extra: 'Räkna också konsonanterna och skriv ut båda.',
  },
  {
    id: 'idea-username',
    track: 'strings',
    emoji: '🪪',
    title: 'Användarnamnsgeneratorn',
    summary: 'Gör ett användarnamn av för- och efternamn.',
    goals: [
      'Skriv en funktion som tar emot förnamn och efternamn.',
      'Ta de tre första bokstäverna från båda och sätt ihop dem med små bokstäver. Tips: `namn.slice(0, 3)` ger de tre första.',
      'Om efternamnet saknas, använd bara förnamnet (tips: ??).',
    ],
    extra: 'Lägg till ett årtal på slutet med en template literal.',
  },
  {
    id: 'idea-movies',
    track: 'array-methods',
    emoji: '🎬',
    title: 'Filmbiblioteket',
    summary: 'En samling filmer som du kan filtrera och räkna på.',
    goals: [
      'Skapa en array med filmer som har title, genre och rating.',
      'Plocka ut alla filmer i en viss genre med filter.',
      'Gör en lista med bara titlarna med map.',
      'Räkna ut snittbetyget med reduce.',
    ],
    extra: 'Hitta den första filmen med betyg 5 med find.',
  },
  {
    id: 'idea-students',
    track: 'array-methods',
    emoji: '🎓',
    title: 'Elevlistan',
    summary: 'Vilka elever klarade provet?',
    goals: [
      'Skapa en array med elever som har name och points.',
      'Plocka ut eleverna som har minst 20 poäng.',
      'Gör texter som "Ada: 25 poäng" med map.',
    ],
    extra: 'Räkna ut hur många poäng klassen har tillsammans.',
  },
  {
    id: 'idea-receipt',
    track: 'array-methods',
    emoji: '🧾',
    title: 'Kvittot',
    summary: 'Gör ett kvitto av en varukorg – helt utan for-loopar.',
    goals: [
      'Skapa en varukorg med objekt som har name, price och quantity.',
      'Gör en rad per vara med map, t.ex. "2 × Mjölk: 30 kr".',
      'Räkna ut totalen med reduce.',
    ],
    extra: 'Ge 10 % rabatt på varor som kostar mer än 100 kr.',
  },
  {
    id: 'idea-profile',
    track: 'modern-js',
    emoji: '👤',
    title: 'Profilkortet',
    summary: 'Gör en text om en person, med olika texter beroende på data.',
    goals: [
      'Skapa ett objekt med name, age och city.',
      'Skriv en funktion som plockar ut värdena med destructuring.',
      'Använd ? : för att skriva "vuxen" eller "barn".',
    ],
    extra:
      'Lägg till en hobby som kanske saknas, och visa den bara om den finns (&&).',
  },
  {
    id: 'idea-cart',
    track: 'modern-js',
    emoji: '🛍️',
    title: 'Varukorgen',
    summary: 'Lägg till varor i en korg utan att ändra den gamla.',
    goals: [
      'Skapa en varukorg som en array.',
      'Skriv en funktion som returnerar en ny korg med en vara till, med spread.',
      'Skriv ut både den gamla och den nya korgen och se att den gamla är oförändrad.',
    ],
    extra:
      'Skriv en funktion som tar emot hur många varor som helst med rest-parametrar.',
  },
  {
    id: 'idea-settings',
    track: 'modern-js',
    emoji: '⚙️',
    title: 'Inställningarna',
    summary: 'Standardinställningar som användaren kan ändra.',
    goals: [
      'Skapa ett objekt med standardinställningar, t.ex. theme och fontSize.',
      'Skapa ett objekt med det användaren valt.',
      'Slå ihop dem med spread så att användarens val vinner.',
    ],
    extra: 'Skriv ut "Mörkt läge" eller "Ljust läge" med ? :.',
  },
  {
    id: 'idea-todo',
    track: 'immutable',
    emoji: '✅',
    title: 'Att göra-listan',
    summary: 'Precis som i React: varje ändring ger en ny lista.',
    goals: [
      'Skapa en lista med uppgifter som har id, text och done.',
      'Skriv en funktion som lägger till en uppgift och returnerar en ny lista.',
      'Skriv en funktion som bockar av en uppgift med map.',
      'Skriv en funktion som tar bort en uppgift med filter.',
    ],
    extra: 'Kolla om alla uppgifter är klara med every.',
  },
  {
    id: 'idea-scoreboard',
    track: 'immutable',
    emoji: '🏆',
    title: 'Poängtavlan',
    summary: 'Spelare med poäng, sorterade utan att originalet ändras.',
    goals: [
      'Skapa en array med spelare som har name och score.',
      'Gör en sorterad kopia med toSorted, högst poäng först.',
      'Skriv en funktion som ger en spelare fler poäng utan att ändra originalet.',
    ],
    extra: 'Kolla med some om någon spelare har över 100 poäng.',
  },
  {
    id: 'idea-inventory',
    track: 'immutable',
    emoji: '📦',
    title: 'Lagret',
    summary: 'Håll koll på vad som finns i lager i en liten butik.',
    goals: [
      'Skapa en array med produkter som har name och stock.',
      'Skriv en funktion som säljer en produkt och minskar stock i en ny lista.',
      'Plocka ut produkterna som är slut.',
    ],
    extra:
      'Skriv ut produkterna sorterade på namn med toSorted, utan att ändra originalet.',
  },
];

// Startkoden på Lekplatsen: målen som kommentarer att bocka av.
export function ideaStarterCode(idea) {
  if (!idea) return '// Skriv vad du vill och tryck på Kör koden.\n';
  const goals = idea.goals.map((goal, index) => `// ${index + 1}. ${goal}`);
  return `// ${idea.emoji} ${idea.title}\n${goals.join('\n')}\n// Extra: ${idea.extra}\n\n`;
}
