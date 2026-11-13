// Testa dig förbi: fyra frågor per bana. Det första svaret är det rätta
// (Quiz.jsx blandar dem).
export const QUIZ = {
  verktyg: [
    {
      question: 'Vem ansvarar för kod som en AI-assistent skrivit åt dig?',
      options: [
        'Du, när du använder den',
        'Assistenten',
        'Företaget bakom AI:n',
        'Ingen',
      ],
      explain: 'Kod du använder är din kod, vem som än skrev den.',
    },
    {
      question: 'Vad ska du aldrig klistra in i en AI-chatt?',
      options: [
        'API-nycklar och lösenord',
        'Ett felmeddelande',
        'Din egen övningskod',
        'Påhittade exempel',
      ],
      explain:
        'Allt du skickar lämnar din dator. Hemligheter ska aldrig följa med.',
    },
    {
      question: 'Vad är en hallucination?',
      options: [
        'När AI:n hittar på något som låter rätt',
        'När koden är för lång',
        'Ett fel i Python',
        'När AI:n vägrar svara',
      ],
      explain: 'T.ex. en funktion eller ett paket som inte finns.',
    },
    {
      question: 'Vilket kommando från en agent ska du granska extra noga?',
      options: ['git push --force', 'ls', 'git status', 'cat README.md'],
      explain: 'Det skriver över historiken på servern och går inte att ångra.',
    },
  ],
  bestall: [
    {
      question: 'Vad gör en beställning tydligast?',
      options: [
        'Ett exempel på indata och vad som ska komma ut',
        'Fler utropstecken',
        'Att skriva "gör det bra"',
        'Att den är kort',
      ],
      explain: 'Exempel tar bort missförstånd.',
    },
    {
      question: 'Vad är ett kantfall?',
      options: [
        'Ett konstigt fall, som en tom lista',
        'Den vanligaste indatan',
        'Ett fel i Python',
        'Sista raden i koden',
      ],
      explain: 'Kantfall är där koden oftast går sönder.',
    },
    {
      question: 'Du vill att AI:n ska laga din funktion. Vad behöver den?',
      options: [
        'Din kod, och vad som ska ändras',
        'Bara funktionens namn',
        'Ditt lösenord',
        'Inget, den vet redan',
      ],
      explain: 'Assistenten ser bara det du visar.',
    },
    {
      question: 'Hur ber du om ett stort program?',
      options: [
        'En bit i taget',
        'Allt på en gång',
        'Med så få ord som möjligt',
        'Med kod på engelska',
      ],
      explain: 'Små bitar går att läsa, förstå och testa.',
    },
  ],
  las: [
    {
      question: 'Vad returnerar en Python-funktion som når slutet utan return?',
      options: ['None', '0', 'Ett fel', 'En tom lista'],
      explain: 'Utan return blir svaret None.',
    },
    {
      question:
        'Vilket tal ska du testa först i huvudet när ett villkor säger poang > 90?',
      options: ['90, precis på gränsen', '0', '1000', '-1'],
      explain: 'Gränsen är där felen gömmer sig.',
    },
    {
      question:
        'En funktion gör lista.append(0) på listan den får. Vad händer med din lista?',
      options: [
        'Den får en nolla till',
        'Inget, funktionen får en kopia',
        'Den töms',
        'Ett fel',
      ],
      explain: 'Listan skickas som den är, inte som en kopia.',
    },
    {
      question: 'Return ligger indraget inne i en for-loop. Vad händer?',
      options: [
        'Funktionen returnerar redan efter första varvet',
        'Loopen körs klart först',
        'Ett syntaxfel',
        'Inget alls',
      ],
      explain: 'return avslutar funktionen direkt, mitt i loopen.',
    },
  ],
  fel: [
    {
      question: 'Vad ger range(1, 5)?',
      options: ['1, 2, 3, 4', '1, 2, 3, 4, 5', '0, 1, 2, 3, 4', '2, 3, 4, 5'],
      explain: 'range går till men inte med slutet.',
    },
    {
      question: 'Vad ger input() alltid?',
      options: [
        'Text',
        'Ett tal',
        'Ett tal eller text beroende på vad man skriver',
        'En lista',
      ],
      explain: 'Gör om med int() om du vill räkna.',
    },
    {
      question: 'Vad skiljer lista.sort() från sorted(lista)?',
      options: [
        'sort ändrar listan, sorted gör en ny',
        'Inget',
        'sorted ändrar listan, sort gör en ny',
        'sort sorterar baklänges',
      ],
      explain: 'sorted låter originalet vara.',
    },
    {
      question: 'Varför kan 0.1 + 0.2 == 0.3 bli False?',
      options: [
        'Decimaltal lagras inte exakt',
        'Python räknar fel med flit',
        'Det är ett syntaxfel',
        'Man måste skriva 0,1',
      ],
      explain: 'Avrunda innan du jämför decimaltal.',
    },
  ],
  testa: [
    {
      question: 'Vad händer när assert-villkoret är falskt?',
      options: [
        'Ett AssertionError stoppar koden',
        'Ingenting',
        'Det skrivs ut en varning',
        'Villkoret blir sant',
      ],
      explain: 'assert stoppar direkt när något inte stämmer.',
    },
    {
      question: 'dubbla(x) räknar x * x. Vilket test avslöjar felet?',
      options: [
        'assert f(3) == 6',
        'assert f(2) == 4',
        'assert f(0) == 0',
        'assert f(1) == 1',
      ],
      explain: '2·2 och 2+2 är båda 4. Med 3 skiljer de sig.',
    },
    {
      question: 'Var ska du testa när regeln är "från och med 18"?',
      options: ['17, 18 och 19', 'Bara 30', '0 och 100', 'Bara 18'],
      explain: 'På gränsen och precis bredvid.',
    },
    {
      question: 'Varför skriva testerna först, utifrån beskrivningen?',
      options: [
        'Då testar du vad koden ska göra, inte vad den råkar göra',
        'Det går fortare att skriva',
        'Python kräver det',
        'Då behövs ingen kod',
      ],
      explain:
        'Tester skrivna efter koden testar ofta bara det koden redan gör.',
    },
  ],
};
