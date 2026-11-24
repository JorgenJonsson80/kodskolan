// Bana 5: brancher. Prova saker på en egen branch utan att röra main, och
// merga när det är klart.
const START = '# Skriv kommandona här, ett per rad\n';
const REPO =
  'mkdir hemsida\ncd hemsida\ngit init\necho "<h1>Hej</h1>" > index.html\ngit add .\ngit commit -m "Första versionen"';

export const GRENAR = [
  {
    id: 'git-41',
    track: 'grenar',
    title: 'Brancherna: git branch',
    xp: 10,
    description:
      'En branch är en egen version av projektet, där du kan prova saker.',
    explain:
      'Alla repon börjar med en branch, som brukar heta **main**. `git branch` listar brancherna, och `*` visar vilken du står på.\n\nTänk dig main som den färdiga hemsidan. En ny branch är en kopia där du kan bygga något nytt – utan att den färdiga sidan påverkas förrän du vill.',
    example: 'git branch',
    task: 'Uppgift: Lista brancherna med `git branch`.',
    setup: REPO,
    setupNote: '📁 Du står i repot hemsida.',
    starterCode: START,
    solution: 'git branch\n',
    hints: [
      'Två ord.',
      'git branch',
      'Utan något efter listar den brancherna.',
    ],
    tests: [{ description: 'Visar * main', output: '* main' }],
  },
  {
    id: 'git-42',
    track: 'grenar',
    title: 'Ny branch: git branch namn',
    xp: 10,
    description: 'Skapa en branch för en ny meny.',
    explain:
      '`git branch meny` skapar branchen `meny`, som börjar där du står. Du står kvar på den branch du var på – den nya branchen finns bara.\n\nGe brancher namn som säger vad du gör på dem: `meny`, `kontaktsida`, `ratta-lanken`.',
    example: 'git branch ny-sida\ngit branch',
    task: 'Uppgift: Skapa branchen `meny` och lista brancherna.',
    setup: REPO,
    setupNote: '📁 Du står på main i repot hemsida.',
    starterCode: START,
    solution: 'git branch meny\ngit branch\n',
    hints: [
      'git branch följt av namnet.',
      'git branch meny',
      'git branch igen för att lista.',
    ],
    tests: [
      {
        description: 'Brancherna är main och meny',
        branches: ['main', 'meny'],
      },
      { description: 'Du står kvar på main', branch: 'main' },
    ],
  },
  {
    id: 'git-43',
    track: 'grenar',
    title: 'Byt branch: git switch',
    xp: 10,
    description: 'Gå över till branchen du skapade.',
    explain:
      '`git switch meny` byter till branchen `meny`. Allt du committar nu hamnar där, inte på main.\n\nDu kan också se `git checkout meny` i äldre guider – det gör samma sak.',
    example: 'git switch meny',
    task: 'Uppgift: Byt till branchen `meny`.',
    setup: `${REPO}\ngit branch meny`,
    setupNote: '📁 Branchen meny finns. Du står på main.',
    starterCode: START,
    solution: 'git switch meny\n',
    hints: [
      'git switch följt av namnet.',
      'git switch meny',
      'Kolla med git branch.',
    ],
    tests: [{ description: 'Du står på meny', branch: 'meny' }],
  },
  {
    id: 'git-44',
    track: 'grenar',
    title: 'Skapa och byt: switch -c',
    xp: 10,
    description:
      'Oftast vill du skapa en branch och börja jobba på den direkt.',
    explain:
      '`git switch -c kontakt` (_create_) skapar branchen och byter till den, på en gång. Det är så man brukar göra.',
    example: 'git switch -c ny-funktion',
    task: 'Uppgift: Skapa branchen `kontakt` och byt till den med ett kommando.',
    setup: REPO,
    setupNote: '📁 Du står på main.',
    starterCode: START,
    solution: 'git switch -c kontakt\n',
    hints: [
      '-c skapar en ny branch.',
      'git switch -c följt av namnet.',
      'git switch -c kontakt',
    ],
    tests: [
      { description: 'Du står på kontakt', branch: 'kontakt' },
      {
        description: 'Brancherna är kontakt och main',
        branches: ['kontakt', 'main'],
      },
    ],
  },
  {
    id: 'git-45',
    track: 'grenar',
    title: 'Jobba på en branch',
    xp: 15,
    description: 'Committa på branchen och se att main är orörd.',
    explain:
      'Det du committar på en branch finns bara där. Byter du tillbaka till main försvinner filerna från mappen – och kommer tillbaka när du byter till branchen igen. Git byter ut filerna åt dig.',
    example: 'git switch main\nls',
    task: 'Uppgift: På branchen `kontakt`: skapa `kontakt.html` med texten `<h1>Kontakt</h1>` och committa med `Lägg till kontaktsida`. Byt sedan till main och lista filerna.',
    setup: `${REPO}\ngit switch -c kontakt`,
    setupNote: '📁 Du står på branchen kontakt.',
    starterCode: START,
    solution:
      'echo "<h1>Kontakt</h1>" > kontakt.html\ngit add kontakt.html\ngit commit -m "Lägg till kontaktsida"\ngit switch main\nls\n',
    hints: [
      'Skapa filen med echo och committa som vanligt.',
      'git switch main',
      'ls visar bara index.html.',
    ],
    tests: [
      { description: 'Du står på main', branch: 'main' },
      {
        description: 'kontakt.html syns inte på main',
        missing: 'kontakt.html',
      },
      { description: 'ls visade bara index.html', output: '$ ls\nindex.html' },
    ],
  },
  {
    id: 'git-46',
    track: 'grenar',
    title: 'Merga: git merge',
    xp: 15,
    description: 'Kontaktsidan är klar. Ta in den i main.',
    explain:
      'Stå på branchen som ska **få** ändringarna, och merga den andra – **merge** betyder att slå ihop:\n\n```\ngit switch main\ngit merge kontakt\n```\n\nHar ingen ändrat main under tiden kan Git bara flytta fram main till branchens senaste commit. Det kallas **fast-forward**.',
    example: 'git switch main\ngit merge ny-sida',
    task: 'Uppgift: Merga branchen `kontakt` med main.',
    setup: `${REPO}\ngit switch -c kontakt\necho "<h1>Kontakt</h1>" > kontakt.html\ngit add .\ngit commit -m "Lägg till kontaktsida"\ngit switch main`,
    setupNote: '📁 Branchen kontakt har en ny sida. Du står på main.',
    starterCode: START,
    solution: 'git merge kontakt\n',
    hints: [
      'Du står redan på main.',
      'git merge följt av branchen.',
      'git merge kontakt',
    ],
    tests: [
      { description: 'kontakt.html finns på main', exists: 'kontakt.html' },
      { description: 'main har två commits', commits: 2 },
      { description: 'Det blev en fast-forward', output: 'Fast-forward' },
    ],
  },
  {
    id: 'git-47',
    track: 'grenar',
    title: 'Städa: branch -d',
    xp: 10,
    description: 'En branch som är mergad behövs inte längre.',
    explain:
      '`git branch -d kontakt` tar bort branchen. Commitsen finns kvar i main – det är bara namnet som försvinner.\n\nGit vägrar ta bort en branch som har commits som inte finns någon annanstans, så att inget arbete försvinner av misstag.',
    example: 'git branch -d gammal-gren',
    task: 'Uppgift: Ta bort branchen `kontakt`, som redan är mergad med main.',
    setup: `${REPO}\ngit switch -c kontakt\ntouch kontakt.html\ngit add .\ngit commit -m "Lägg till kontaktsida"\ngit switch main\ngit merge kontakt`,
    setupNote: '📁 kontakt är mergad med main.',
    starterCode: START,
    solution: 'git branch -d kontakt\n',
    hints: [
      'git branch med -d.',
      'git branch -d följt av namnet.',
      'git branch -d kontakt',
    ],
    tests: [{ description: 'Bara main finns kvar', branches: ['main'] }],
  },
  {
    id: 'git-48',
    track: 'grenar',
    title: 'Två brancher på en gång',
    xp: 20,
    description: 'Två saker byggs samtidigt. Merga båda.',
    explain:
      'Har main fått nya commits sedan branchen skapades går det inte att bara flytta fram. Då gör Git en **merge-commit**: en commit med två föräldrar, som binder ihop brancherna.\n\nSå länge brancherna ändrar olika filer (eller olika delar av filerna) klarar Git det själv.',
    example: 'git merge meny\ngit merge kontakt',
    task: 'Uppgift: Brancherna `meny` och `kontakt` har var sin ny fil. Merga båda med main, först `meny` och sedan `kontakt`.',
    setup: `${REPO}\ngit switch -c meny\ntouch meny.html\ngit add .\ngit commit -m "Lägg till meny"\ngit switch main\ngit switch -c kontakt\ntouch kontakt.html\ngit add .\ngit commit -m "Lägg till kontaktsida"\ngit switch main`,
    setupNote: '📁 Brancherna meny och kontakt utgår båda från main.',
    starterCode: START,
    solution: 'git merge meny\ngit merge kontakt\ngit log --oneline\n',
    hints: [
      'git merge meny först – det blir en fast-forward.',
      'Sedan git merge kontakt.',
      'Den andra blir en merge-commit.',
    ],
    tests: [
      { description: 'Båda filerna finns', exists: 'meny.html' },
      { description: 'kontakt.html också', exists: 'kontakt.html' },
      { description: 'Senaste commit är en merge', merged: true },
    ],
  },
  {
    id: 'git-49',
    track: 'grenar',
    title: 'Brancherna i loggen',
    xp: 10,
    description: 'Var står varje branch? Loggen visar det.',
    explain:
      'I `git log --oneline` står branchernas namn inom parentes vid den commit de pekar på. `HEAD -> main` betyder att du står på main.\n\nEn branch är alltså bara en **etikett** på en commit, som flyttas fram när du committar.',
    example: 'git log --oneline',
    task: 'Uppgift: Skapa branchen `test` (utan att byta till den) och visa loggen med `git log --oneline`.',
    setup: REPO,
    setupNote: '📁 Du står på main.',
    starterCode: START,
    solution: 'git branch test\ngit log --oneline\n',
    hints: [
      'git branch test',
      'git log --oneline',
      'Båda brancherna pekar på samma commit.',
    ],
    tests: [
      {
        description: 'Båda brancherna syns vid commiten',
        output: '(HEAD -> main, test) Första versionen',
      },
    ],
  },
];
