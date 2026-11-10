// Frågor för nivåtestet och för "Testa dig förbi". Fyra frågor per bana.
// Det rätta svaret står alltid först i options. En fråga med code och check
// körs i quiz.test.js mot låtsasmodellen (modell är dess regler).
export const QUIZ = {
  modell: [
    {
      question: 'Vad betyder stop_reason "max_tokens"?',
      options: [
        'Svaret klipptes för att det nådde taket',
        'Modellen var klar',
        'Modellen vill använda ett verktyg',
        'Anropet var fel',
      ],
      explain: 'Höj max_tokens eller be om ett kortare svar.',
    },
    {
      question: 'Vad skrivs ut?',
      code: "import anthropic\n\nclient = anthropic.Anthropic()\nsvar = client.messages.create(model='claude-opus-5-5', max_tokens=100, messages=[{'role': 'user', 'content': 'Vad är 9 + 1?'}])",
      check: 'svar.content[0].text',
      options: ['Det blir 10.', 'Det blir 91.', '10', 'end_turn'],
      explain: 'Texten står i textblocket i svar.content.',
    },
    {
      question: 'Var ska API-nyckeln stå?',
      options: [
        'I en miljövariabel, som ANTHROPIC_API_KEY',
        'Överst i koden',
        'I en kommentar',
        'I prompten',
      ],
      explain: 'En nyckel i koden kan läcka, till exempel när koden delas.',
    },
    {
      question: 'Vilket fel är värt att försöka igen?',
      options: [
        'RateLimitError',
        'BadRequestError',
        'NotFoundError',
        'AuthenticationError',
      ],
      explain: 'För många anrop går över. Ett fel i anropet blir fel igen.',
    },
  ],
  prompter: [
    {
      question: 'Vad skrivs ut?',
      code: "import anthropic\n\nclient = anthropic.Anthropic()\nsvar = client.messages.create(model='claude-opus-5-5', max_tokens=100, system='Svara med ett ord.', messages=[{'role': 'user', 'content': 'Hej'}])",
      check: 'svar.content[0].text',
      options: [
        'Hej',
        'Hej! Hur kan jag hjälpa dig?',
        'Ett ord',
        'Svara med ett ord.',
      ],
      explain:
        'Låtsasmodellen följer stilorden i systemprompten, som en riktig modell följer instruktioner.',
    },
    {
      question:
        'Var hör instruktionerna hemma när användarens text kan innehålla vad som helst?',
      options: [
        'I systemprompten, med användarens text i taggar',
        'Sist i användarens text',
        'I max_tokens',
        'Det spelar ingen roll',
      ],
      explain: 'Så skyddar du dig mot promptinjektion.',
    },
    {
      question: 'Vad är few-shot?',
      options: [
        'Att ge några exempel i prompten som modellen följer',
        'Att ställa få frågor',
        'Att sänka max_tokens',
        'Att använda en liten modell',
      ],
      explain: 'Exempel visar formatet bättre än en lång förklaring.',
    },
    {
      question: 'Varför be om kortare svar i stället för att sänka max_tokens?',
      options: [
        'max_tokens klipper svaret mitt i, en instruktion ger ett helt men kortare svar',
        'max_tokens kostar extra',
        'Det går inte att ändra max_tokens',
        'Det finns ingen skillnad',
      ],
      explain: 'Kolla stop_reason – max_tokens betyder att svaret klipptes.',
    },
  ],
  samtal: [
    {
      question: 'Varför minns inte modellen vad du sa i förra anropet?',
      options: [
        'API:et har inget minne – historiken måste skickas med varje gång',
        'Modellen glömmer efter en minut',
        'Det gör den, om man väntar',
        'max_tokens är för lågt',
      ],
      explain: 'Minnet är listan med meddelanden du skickar.',
    },
    {
      question: 'Vad svarar modellen?',
      code: "import anthropic\n\nclient = anthropic.Anthropic()\nsvar = client.messages.create(model='claude-opus-5-5', max_tokens=100, messages=[{'role': 'user', 'content': 'Jag heter Ada'}, {'role': 'assistant', 'content': 'Hej!'}, {'role': 'user', 'content': 'Vad heter jag?'}])",
      check: 'svar.content[0].text',
      options: [
        'Du heter Ada.',
        'Det vet jag inte – du har inte berättat det.',
        'Hej!',
        'Jag heter Ada',
      ],
      explain: 'Namnet finns i historiken som skickades med.',
    },
    {
      question: 'Varför blir långa samtal dyrare för varje fråga?',
      options: [
        'Hela historiken skickas med, så input-tokens växer',
        'Modellen blir trött',
        'Output-tokens dubblas',
        'Det blir de inte',
      ],
      explain: 'Därför kortar appar historiken eller börjar om.',
    },
    {
      question: 'Vilken roll måste det första meddelandet ha?',
      options: ['user', 'assistant', 'system', 'Vilken som helst'],
      explain: 'Kortar du historiken, ta bort assistant-meddelanden i början.',
    },
  ],
  struktur: [
    {
      question:
        'Varför använda output_config med ett JSON-schema i stället för att be om JSON i prompten?',
      options: [
        'Då blir svaret alltid giltig JSON i rätt form',
        'Det blir billigare',
        'Modellen svarar snabbare',
        'Det finns ingen skillnad',
      ],
      explain:
        'Ber man bara i prompten kan modellen skriva en mening före JSON:en.',
    },
    {
      question: 'Var hittar du det färdiga objektet efter messages.parse?',
      options: [
        'svar.parsed_output',
        'svar.content[0].text',
        'svar.json',
        'svar.usage',
      ],
      explain:
        'parsed_output är ett objekt av Pydantic-modellen du skickade som output_format.',
    },
    {
      question: 'Vad betyder Literal["lätt", "medel", "svår"]?',
      options: [
        'Bara något av de tre orden är tillåtet',
        'Fältet är valfritt',
        'Fältet är en lista',
        'Texten måste vara exakt "lätt medel svår"',
      ],
      explain:
        'Bra för klassificering, där svaret ska vara en av några kategorier.',
    },
    {
      question: 'Vem ska räkna ut summan av ett kvitto?',
      options: [
        'Python, efter att modellen plockat ut raderna',
        'Modellen, i samma svar',
        'Användaren',
        'Det spelar ingen roll',
      ],
      explain: 'Modeller kan räkna fel. Python räknar rätt varje gång.',
    },
  ],
  verktyg: [
    {
      question: 'Vem kör verktygets funktion?',
      options: ['Ditt program', 'Modellen', 'Anthropics servrar', 'Användaren'],
      explain:
        'Modellen ber bara om verktyget – ditt program kör det och skickar tillbaka resultatet.',
    },
    {
      question: 'Vad är stop_reason när modellen vill använda ett verktyg?',
      options: ['tool_use', 'end_turn', 'max_tokens', 'tool_result'],
      explain: 'Då finns ett tool_use-block med name, input och id i svaret.',
    },
    {
      question: 'Hur skickas resultaten från tre verktygsanrop tillbaka?',
      options: [
        'Alla tre tool_result i ett user-meddelande',
        'Ett user-meddelande per resultat',
        'I systemprompten',
        'Som ett assistant-meddelande',
      ],
      explain:
        'Annars lär sig modellen att sluta be om flera verktyg samtidigt.',
    },
    {
      question: 'Varför ska man aldrig köra eval på det modellen skickar?',
      options: [
        'Då kan modellen få programmet att köra vilken kod som helst',
        'eval är för långsamt',
        'eval fungerar inte med tal',
        'Det går bra',
      ],
      explain: 'Ge verktyg bestämda delar, som a, operator och b med en enum.',
    },
  ],
  embeddings: [
    {
      question: 'Vad är en embedding?',
      options: [
        'En lista med tal som beskriver vad en text betyder',
        'En komprimerad textfil',
        'En sorts prompt',
        'Ett verktyg som modellen kan använda',
      ],
      explain:
        'Texter med liknande betydelse får vektorer som pekar åt samma håll.',
    },
    {
      question: 'Vad blir cosinuslikheten?',
      code: 'import math\n\ndef likhet(a, b):\n    return sum(x * y for x, y in zip(a, b)) / (math.sqrt(sum(x * x for x in a)) * math.sqrt(sum(x * x for x in b)))',
      check: 'round(likhet([1, 0], [0, 1]), 1)',
      options: ['0.0', '1.0', '0.5', '-1.0'],
      explain:
        'Vektorerna pekar åt helt olika håll – texterna har inget gemensamt.',
    },
    {
      question: 'Varför sparar man embeddings i ett index?',
      options: [
        'De kostar ett anrop att räkna ut, så man gör det en gång',
        'Annars försvinner texterna',
        'Modellen kräver det',
        'Det gör sökningen mindre exakt',
      ],
      explain: 'Bara frågan behöver en ny embedding vid varje sökning.',
    },
    {
      question:
        'Vad klarar riktiga embeddings som våra ordvektorer inte klarar?',
      options: [
        'Att se att olika ord betyder samma sak',
        'Att räkna ord',
        'Att jämföra två texter',
        'Att sortera träffar',
      ],
      explain:
        '"Katt" och "kissemiss" hamnar nära varandra med en embeddingsmodell.',
    },
  ],
};
