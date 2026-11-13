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
};
