// Testa dig förbi: fyra frågor per bana. Det första svaret är det rätta
// (Quiz.jsx blandar dem).
export const QUIZ = {
  terminal: [
    {
      question: 'Du står i /hem/skola. Vad skriver pwd ut efter cd ..?',
      options: ['/hem', '/hem/skola', '/', '..'],
      explain: '.. är mappen ovanför, alltså /hem.',
    },
    {
      question: 'Vad gör echo "Hej" > fil.txt om fil.txt redan finns?',
      options: [
        'Skriver över filen så att bara Hej står där',
        'Lägger till Hej sist i filen',
        'Ger ett fel',
        'Skapar en fil till',
      ],
      explain: '> skriver över. >> lägger till sist.',
    },
    {
      question: 'Vilket kommando visar vad som finns i mappen du står i?',
      options: ['ls', 'pwd', 'cat', 'cd'],
      explain: 'ls listar filer och mappar. pwd visar var du står.',
    },
    {
      question: 'Vad betyder ~ i en sökväg?',
      options: [
        'Din hemmapp',
        'Mappen ovanför',
        'Mappen du står i',
        'Den översta mappen',
      ],
      explain: '~ är hemmappen, var du än står. .. är mappen ovanför.',
    },
  ],
  filer: [
    {
      question: 'Hur döper du om a.txt till b.txt?',
      options: [
        'mv a.txt b.txt',
        'cp a.txt b.txt',
        'rename a.txt b.txt',
        'rm a.txt b.txt',
      ],
      explain:
        'mv flyttar filen till ett nytt namn. cp skulle göra en kopia och låta a.txt vara kvar.',
    },
    {
      question: 'Varför ger rm mapp ett fel?',
      options: [
        'Mappar måste tas bort med rm -r',
        'Mappen är tom',
        'rm fungerar bara på dolda filer',
        'Mappen måste heta något med punkt',
      ],
      explain:
        'rm tar inte bort mappar för säkerhets skull. -r tar bort mappen med allt i den.',
    },
    {
      question: 'Vilken fil syns inte med vanlig ls?',
      options: ['.gitignore', 'index.html', 'README.md', 'style.css'],
      explain: 'Namn som börjar med punkt är dolda. ls -a visar dem.',
    },
    {
      question: 'Vad gör mkdir -p a/b/c när a inte finns?',
      options: [
        'Skapar a, b och c',
        'Ger ett fel',
        'Skapar bara c',
        'Skapar a och stannar',
      ],
      explain: '-p skapar alla mappar som fattas på vägen.',
    },
  ],
  commit: [
    {
      question: 'I vilken ordning sparar du en version?',
      options: [
        'git add, sedan git commit',
        'git commit, sedan git add',
        'git init varje gång',
        'git log, sedan git commit',
      ],
      explain:
        'Först väljer du vad som ska med (add), sedan sparar du (commit).',
    },
    {
      question: 'Vad betyder Untracked files i git status?',
      options: [
        'Filer som Git inte följer än',
        'Filer som är borttagna',
        'Filer som är committade',
        'Dolda filer',
      ],
      explain: 'Git följer bara filer du lagt till med git add.',
    },
    {
      question: 'Vilket commit-meddelande är bäst?',
      options: ['Lägg till kontaktformulär', 'fix', 'ändringar', 'asdf'],
      explain:
        'Ett bra meddelande säger vad commiten gör, kort, som en uppmaning.',
    },
    {
      question: 'Hur ofta kör du git init i ett projekt?',
      options: [
        'En gång, i början',
        'Före varje commit',
        'Varje dag',
        'Aldrig',
      ],
      explain: 'git init gör mappen till ett repo. Det räcker en gång.',
    },
  ],
};
