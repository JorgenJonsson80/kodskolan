// Editorn för terminalkommandon: ingen färgning behövs, men hovern
// förklarar varje kommando.
const COMMANDS = {
  pwd: [
    'pwd',
    'Skriver ut var du står: mappen du är i just nu (print working directory).',
  ],
  ls: [
    'ls',
    'Listar filerna och mapparna där du står. `ls -a` visar också dolda filer som börjar med punkt.',
  ],
  cd: [
    'cd',
    'Byter mapp. `cd projekt` går in, `cd ..` går upp ett steg och `cd ~` hem.',
  ],
  mkdir: [
    'mkdir',
    'Skapar en mapp (make directory). `mkdir -p a/b` skapar flera nivåer.',
  ],
  touch: ['touch', 'Skapar en tom fil.'],
  cat: ['cat', 'Skriver ut vad en fil innehåller.'],
  echo: [
    'echo',
    'Skriver ut text. Med `>` hamnar texten i en fil i stället, och `>>` lägger till sist.',
  ],
  cp: ['cp', 'Kopierar en fil: `cp från till`. Mappar kopieras med `cp -r`.'],
  mv: ['mv', 'Flyttar eller döper om: `mv gammal.txt ny.txt`.'],
  rm: [
    'rm',
    'Tar bort en fil – för gott, ingen papperskorg. `rm -r mapp` tar bort en mapp med allt i.',
  ],
  clear: ['clear', 'Tömmer skärmen.'],
  git: ['git', 'Git håller reda på alla versioner av dina filer.'],
  init: [
    'git init',
    'Gör mappen till ett Git-repo, så att Git börjar hålla koll.',
  ],
  status: [
    'git status',
    'Visar vad som har ändrats, vad som är tillagt för nästa commit och vad Git inte följer.',
  ],
  add: [
    'git add',
    'Lägger till ändringar i nästa commit. `git add .` lägger till allt.',
  ],
  commit: [
    'git commit',
    'Sparar en version med ett meddelande: `git commit -m "Vad du gjorde"`.',
  ],
  log: [
    'git log',
    'Visar historiken, senaste commit först. `--oneline` ger en rad per commit.',
  ],
  diff: [
    'git diff',
    'Visar exakt vad som ändrats sedan förra commit: + för nya rader, - för borttagna.',
  ],
  restore: [
    'git restore',
    'Ångrar ändringar i en fil tillbaka till senaste commit.',
  ],
  branch: [
    'git branch',
    'Listar grenarna, eller skapar en ny: `git branch namn`.',
  ],
  switch: [
    'git switch',
    'Byter gren. `git switch -c namn` skapar en ny och byter till den.',
  ],
  checkout: [
    'git checkout',
    'Äldre sätt att byta gren. `git switch` gör samma sak och är lättare att läsa.',
  ],
  merge: ['git merge', 'Slår ihop en annan gren med den du står på.'],
  remote: [
    'git remote',
    'Fjärrar är kopior av repot på en server, t.ex. GitHub.',
  ],
  push: ['git push', 'Skickar dina commits till servern.'],
  pull: [
    'git pull',
    'Hämtar nya commits från servern och slår ihop dem med dina.',
  ],
  clone: ['git clone', 'Hämtar ett helt repo från en server till en ny mapp.'],
};

export const gitExtensions = () => [];

export function gitHover(state, pos) {
  const line = state.doc.lineAt(pos);
  const text = line.text;
  const offset = pos - line.from;
  let start = offset;
  let end = offset;
  while (start > 0 && /[\w-]/.test(text[start - 1])) start -= 1;
  while (end < text.length && /[\w-]/.test(text[end])) end += 1;
  const word = text.slice(start, end);
  const words = text.trim().split(/\s+/);
  const isCommand =
    words[0] === word || (words[0] === 'git' && words[1] === word);
  const found = isCommand ? COMMANDS[word] : null;
  if (!found) return null;
  return {
    from: line.from + start,
    to: line.from + end,
    title: found[0],
    body: found[1],
  };
}
