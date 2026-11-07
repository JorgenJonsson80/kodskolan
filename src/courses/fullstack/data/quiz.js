// Frågor för nivåtestet och för "Testa dig förbi". Fyra frågor per bana.
// Det rätta svaret står alltid först i options. Ordningen blandas när
// frågan visas.
export const QUIZ = {
  api: [
    {
      question: 'Vad gör Flask om en vägfunktion returnerar en lista?',
      options: [
        'Gör om den till JSON',
        'Gör om den till HTML',
        'Ger ett fel',
        'Skickar bara första saken',
      ],
      explain:
        'Listor och dictionaries blir JSON, som sidan läser med svar.json().',
    },
    {
      question: 'Varför ska felen från ett API vara JSON?',
      options: [
        'Så att sidan kan läsa felet och visa det',
        'Det går fortare',
        'Flask kräver det',
        'Webbläsaren visar annars ingenting',
      ],
      explain:
        'Flasks egna felsidor är HTML. Med @app.errorhandler blir de {"fel": …}, som sidan kan visa.',
    },
    {
      question: 'Vilken statuskod passar när hunden redan är bokad de dagarna?',
      options: ['409', '404', '400', '500'],
      explain:
        '409 Conflict: anropet är rätt, men krockar med något som redan finns.',
    },
    {
      question: 'Hur vet API:t att nästa anrop kommer från personalen?',
      options: [
        'session sparas i en cookie som webbläsaren skickar med',
        'Sidan skickar koden med varje anrop',
        'Flask kommer ihåg datorns namn',
        'Det går inte att veta',
      ],
      explain:
        'Efter inloggningen skickar Flask en cookie med sessionen, och webbläsaren skickar den med varje anrop efter det.',
    },
  ],
  sidan: [
    {
      question: 'Vad är fetch-svaret när API:t svarar 404?',
      options: [
        'Ett vanligt svar där svar.ok är false',
        'Ett fel som måste fångas med catch',
        'null',
        'Ingenting, fetch väntar för alltid',
      ],
      explain:
        'fetch blir bara fel om nätverket inte svarar alls. 404 och 400 är svar, och sidan måste kolla svar.ok själv.',
    },
    {
      question: 'Vad ger svar.json() för typ i TypeScript?',
      options: [
        'any – därför skriver man en egen typ',
        'Exakt det API:t skickar',
        'string',
        'unknown[]',
      ],
      explain:
        'TypeScript kan inte läsa app.py. Typen, som Hund[], är sidans löfte om vad API:t skickar.',
    },
    {
      question: 'När körs useEffect(() => { … }, [])?',
      options: [
        'En gång, när komponenten visas',
        'Varje gång komponenten ritas om',
        'Aldrig',
        'När användaren klickar',
      ],
      explain:
        'Den tomma listan betyder att effekten inte beror på något, så den körs bara när komponenten dyker upp.',
    },
    {
      question: 'Varför JSON.stringify i body?',
      options: [
        'body är text, och objektet måste göras om till JSON-text',
        'Det krypterar datan',
        'Flask kan bara läsa listor',
        'Det behövs inte',
      ],
      explain:
        'Det som skickas är text. Med Content-Type: application/json vet Flask att det är JSON och request.get_json() läser det.',
    },
  ],
  ihop: [
    {
      question: 'API:t skickar ett nytt fält. Vad behöver ändras i sidan?',
      options: [
        'Typen, och där fältet ska visas',
        'Ingenting',
        'Hela komponenten',
        'Bara CSS:en',
      ],
      explain:
        'Typen är sidans bild av svaret. Ändras svaret ska typen ändras, annars säger TypeScript att fältet inte finns.',
    },
    {
      question: 'Var ska kontrollen av en bokning finnas?',
      options: [
        'I API:t – sidan visar vad API:t svarade',
        'Bara i sidan',
        'Bara i databasen',
        'Ingenstans',
      ],
      explain:
        'Vem som helst kan anropa API:t direkt, utan sidan. Därför måste API:t kontrollera, och sidan visar felet.',
    },
    {
      question: 'Vad gör [storlek] sist i useEffect?',
      options: [
        'Effekten körs igen när storlek ändras',
        'storlek blir en lista',
        'Effekten körs bara en gång',
        'storlek sparas i API:t',
      ],
      explain:
        'Listan säger vad effekten beror på. Ändras storleken hämtas listan igen med den nya frågan.',
    },
    {
      question: 'Vilken ordning är vanligast för en ny funktion?',
      options: [
        'API:t först, sedan typen och sidan',
        'Sidan först, sedan API:t',
        'Databasen sist',
        'Det spelar ingen roll',
      ],
      explain:
        'Med API:t klart går det att testa med 📮 innan sidan finns, och typen kan skrivas efter det API:t faktiskt svarar.',
    },
  ],
};
