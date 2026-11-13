// Bana 5: grenar. Prova saker på en egen gren utan att röra main, och
// slå ihop när det är klart.
const START = '# Skriv kommandona här, ett per rad\n';
const REPO =
  'mkdir hemsida\ncd hemsida\ngit init\necho "<h1>Hej</h1>" > index.html\ngit add .\ngit commit -m "Första versionen"';

export const GRENAR = [
  {
    id: 'git-41',
    track: 'grenar',
    title: 'Grenarna: git branch',
    xp: 10,
    description:
      'En gren är en egen version av projektet, där du kan prova saker.',
    explain:
      'Alla repon börjar med en gren, som brukar heta **main**. `git branch` listar grenarna, och `*` visar vilken du står på.\n\nTänk dig main som den färdiga hemsidan. En ny gren är en kopia där du kan bygga något nytt – utan att den färdiga sidan påverkas förrän du vill.',
    example: 'git branch',
    task: 'Uppgift: Lista grenarna med `git branch`.',
    setup: REPO,
    setupNote: '📁 Du står i repot hemsida.',
    starterCode: START,
    solution: 'git branch\n',
    hints: ['Två ord.', 'git branch', 'Utan något efter listar den grenarna.'],
    tests: [{ description: 'Visar * main', output: '* main' }],
  },
  {
    id: 'git-42',
    track: 'grenar',
    title: 'Ny gren: git branch namn',
    xp: 10,
    description: 'Skapa en gren för en ny meny.',
    explain:
      '`git branch meny` skapar grenen `meny`, som börjar där du står. Du står kvar på den gren du var på – den nya grenen finns bara.\n\nGe grenar namn som säger vad du gör på dem: `meny`, `kontaktsida`, `ratta-lanken`.',
    example: 'git branch ny-sida\ngit branch',
    task: 'Uppgift: Skapa grenen `meny` och lista grenarna.',
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
      { description: 'Grenarna är main och meny', branches: ['main', 'meny'] },
      { description: 'Du står kvar på main', branch: 'main' },
    ],
  },
  {
    id: 'git-43',
    track: 'grenar',
    title: 'Byt gren: git switch',
    xp: 10,
    description: 'Gå över till grenen du skapade.',
    explain:
      '`git switch meny` byter till grenen `meny`. Allt du committar nu hamnar där, inte på main.\n\nDu kan också se `git checkout meny` i äldre guider – det gör samma sak.',
    example: 'git switch meny',
    task: 'Uppgift: Byt till grenen `meny`.',
    setup: `${REPO}\ngit branch meny`,
    setupNote: '📁 Grenen meny finns. Du står på main.',
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
    description: 'Oftast vill du skapa en gren och börja jobba på den direkt.',
    explain:
      '`git switch -c kontakt` (_create_) skapar grenen och byter till den, på en gång. Det är så man brukar göra.',
    example: 'git switch -c ny-funktion',
    task: 'Uppgift: Skapa grenen `kontakt` och byt till den med ett kommando.',
    setup: REPO,
    setupNote: '📁 Du står på main.',
    starterCode: START,
    solution: 'git switch -c kontakt\n',
    hints: [
      '-c skapar en ny gren.',
      'git switch -c följt av namnet.',
      'git switch -c kontakt',
    ],
    tests: [
      { description: 'Du står på kontakt', branch: 'kontakt' },
      {
        description: 'Grenarna är kontakt och main',
        branches: ['kontakt', 'main'],
      },
    ],
  },
  {
    id: 'git-45',
    track: 'grenar',
    title: 'Jobba på en gren',
    xp: 15,
    description: 'Committa på grenen och se att main är orörd.',
    explain:
      'Det du committar på en gren finns bara där. Byter du tillbaka till main försvinner filerna från mappen – och kommer tillbaka när du byter till grenen igen. Git byter ut filerna åt dig.',
    example: 'git switch main\nls',
    task: 'Uppgift: På grenen `kontakt`: skapa `kontakt.html` med texten `<h1>Kontakt</h1>` och committa med `Lägg till kontaktsida`. Byt sedan till main och lista filerna.',
    setup: `${REPO}\ngit switch -c kontakt`,
    setupNote: '📁 Du står på grenen kontakt.',
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
    title: 'Slå ihop: git merge',
    xp: 15,
    description: 'Kontaktsidan är klar. Ta in den i main.',
    explain:
      'Stå på grenen som ska **få** ändringarna, och slå ihop den andra:\n\n```\ngit switch main\ngit merge kontakt\n```\n\nHar ingen ändrat main under tiden kan Git bara flytta fram main till grenens senaste commit. Det kallas **fast-forward**.',
    example: 'git switch main\ngit merge ny-sida',
    task: 'Uppgift: Slå ihop grenen `kontakt` med main.',
    setup: `${REPO}\ngit switch -c kontakt\necho "<h1>Kontakt</h1>" > kontakt.html\ngit add .\ngit commit -m "Lägg till kontaktsida"\ngit switch main`,
    setupNote: '📁 Grenen kontakt har en ny sida. Du står på main.',
    starterCode: START,
    solution: 'git merge kontakt\n',
    hints: [
      'Du står redan på main.',
      'git merge följt av grenen.',
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
    description: 'En gren som är ihopslagen behövs inte längre.',
    explain:
      '`git branch -d kontakt` tar bort grenen. Commitsen finns kvar i main – det är bara namnet som försvinner.\n\nGit vägrar ta bort en gren som har commits som inte finns någon annanstans, så att inget arbete försvinner av misstag.',
    example: 'git branch -d gammal-gren',
    task: 'Uppgift: Ta bort grenen `kontakt`, som redan är ihopslagen med main.',
    setup: `${REPO}\ngit switch -c kontakt\ntouch kontakt.html\ngit add .\ngit commit -m "Lägg till kontaktsida"\ngit switch main\ngit merge kontakt`,
    setupNote: '📁 kontakt är ihopslagen med main.',
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
    title: 'Två grenar på en gång',
    xp: 20,
    description: 'Två saker byggs samtidigt. Slå ihop båda.',
    explain:
      'Har main fått nya commits sedan grenen skapades går det inte att bara flytta fram. Då gör Git en **merge-commit**: en commit med två föräldrar, som binder ihop grenarna.\n\nSå länge grenarna ändrar olika filer (eller olika delar av filerna) klarar Git det själv.',
    example: 'git merge meny\ngit merge kontakt',
    task: 'Uppgift: Grenarna `meny` och `kontakt` har var sin ny fil. Slå ihop båda med main, först `meny` och sedan `kontakt`.',
    setup: `${REPO}\ngit switch -c meny\ntouch meny.html\ngit add .\ngit commit -m "Lägg till meny"\ngit switch main\ngit switch -c kontakt\ntouch kontakt.html\ngit add .\ngit commit -m "Lägg till kontaktsida"\ngit switch main`,
    setupNote: '📁 Grenarna meny och kontakt utgår båda från main.',
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
      { description: 'Senaste commit är en sammanslagning', merged: true },
    ],
  },
  {
    id: 'git-49',
    track: 'grenar',
    title: 'Grenarna i loggen',
    xp: 10,
    description: 'Var står varje gren? Loggen visar det.',
    explain:
      'I `git log --oneline` står grenarnas namn inom parentes vid den commit de pekar på. `HEAD -> main` betyder att du står på main.\n\nEn gren är alltså bara en **etikett** på en commit, som flyttas fram när du committar.',
    example: 'git log --oneline',
    task: 'Uppgift: Skapa grenen `test` (utan att byta till den) och visa loggen med `git log --oneline`.',
    setup: REPO,
    setupNote: '📁 Du står på main.',
    starterCode: START,
    solution: 'git branch test\ngit log --oneline\n',
    hints: [
      'git branch test',
      'git log --oneline',
      'Båda grenarna pekar på samma commit.',
    ],
    tests: [
      {
        description: 'Båda grenarna syns vid commiten',
        output: '(HEAD -> main, test) Första versionen',
      },
    ],
  },
];
