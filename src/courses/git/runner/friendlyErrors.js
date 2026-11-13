// Felen från terminalen (shell.js och git.js) förklarade på svenska. Varje
// fel har ett kind, och details med t.ex. sökvägen eller kommandot.
const code = text => `\`${text}\``;

const TEXTS = {
  unknownCommand: e =>
    `Terminalen känner inte till ${code(e.command)}.${e.suggestion ? ` Menade du ${code(e.suggestion)}?` : ' Kolla stavningen – kommandon skrivs med små bokstäver.'}`,
  unknownGit: e =>
    `${code(`git ${e.command}`)} finns inte.${e.suggestion ? ` Menade du ${code(`git ${e.suggestion}`)}?` : ''}`,
  notFound: e =>
    `${code(e.path)} finns inte där du står. Kolla var du är med ${code('pwd')} och vad som finns med ${code('ls')}.`,
  notDir: e =>
    `${code(e.path)} är en fil, inte en mapp. Du kan bara gå in i mappar med ${code('cd')}.`,
  isDir: e =>
    `${code(e.path)} är en mapp, inte en fil. Titta i den med ${code(`ls ${e.path}`)}.`,
  exists: e =>
    `${code(e.path)} finns redan. Välj ett annat namn, eller använd den som finns.`,
  missingArg: e =>
    `${code(e.command)} behöver veta vad det ska göra något med. Skriv namnet efter kommandot.`,
  rmDir: e =>
    `${code(e.path)} är en mapp. Mappar tas bort med ${code(`rm -r ${e.path}`)} – och då försvinner allt i den.`,
  rmCwd: e =>
    `Du står i ${code(e.path)}. Gå ut ur den med ${code('cd ..')} först.`,
  cpDir: e => `Mappar kopieras med ${code(`cp -r ${e.path} …`)}.`,
  quote: () =>
    'Ett citattecken är inte stängt. Text inom citattecken ska ha ett " i början och ett i slutet.',
  redirect: () =>
    `Efter ${code('>')} ska det stå filen som texten ska hamna i, t.ex. ${code('echo "Hej" > hej.txt')}.`,
  notRepo: () =>
    `Mappen är inte ett Git-repo än. Gå till projektmappen, eller skapa ett repo där med ${code('git init')}.`,
  noMessage: () =>
    `En commit behöver ett meddelande: ${code('git commit -m "Vad du gjorde"')}.`,
  addNothing: () =>
    `Säg vad som ska läggas till: ${code('git add fil.txt')}, eller ${code('git add .')} för allt.`,
  pathspec: e =>
    `Git hittar inte ${code(e.path ?? 'filen')}. Kolla stavningen och var du står med ${code('ls')}.`,
  noCommits: () =>
    'Det finns inga commits än. Lägg till filer och gör din första commit först.',
  noBranch: e =>
    `Grenen ${code(e.branch)} finns inte. Se vilka som finns med ${code('git branch')}.`,
  badBranch: e =>
    `${code(e.branch)} går inte att använda som grennamn. Använd bokstäver, siffror och bindestreck, utan mellanslag.`,
  branchExists: e =>
    `Grenen ${code(e.branch)} finns redan. Byt till den med ${code(`git switch ${e.branch}`)}.`,
  deleteCurrent: e =>
    `Du står på ${code(e.branch)}. Byt till en annan gren innan du tar bort den.`,
  notMerged: e =>
    `${code(e.branch)} har commits som inte finns någon annanstans. Slå ihop den först med ${code(`git merge ${e.branch}`)}, så att inget arbete försvinner.`,
  dirtySwitch: () =>
    'Du har ändringar som inte är committade. Committa dem först, annars skulle de skrivas över när du byter gren.',
  dirtyMerge: () =>
    'Du har ändringar som inte är committade. Committa dem innan du slår ihop grenar.',
  unmerged: e =>
    `Det finns olösta konflikter i ${(e.paths ?? []).map(code).join(', ')}. Ta bort markeringarna (<<<<<<<, ======= och >>>>>>>), spara filen och kör ${code('git add')} innan du committar.`,
  badUrl: () => 'Adressen ska se ut som https://github.com/namn/repo.',
  noRemote: e =>
    `Repot har ingen fjärr som heter ${code(e.remote)}. Lägg till den med ${code('git remote add origin https://github.com/…')}.`,
  remoteExists: e =>
    `Fjärren ${code(e.remote)} finns redan. Se vilka som finns med ${code('git remote -v')}.`,
  rejected: () =>
    `Servern har commits som du inte har. Hämta dem först med ${code('git pull')}, och pusha sedan igen.`,
};

export function explainError(error) {
  return (
    TEXTS[error.kind]?.(error) ??
    'Läs meddelandet ovan – det säger vad som gick fel.'
  );
}

export function errorTitle(error) {
  return error.line
    ? `Kommandot på rad ${error.line} gick inte`
    : 'Ett kommando gick inte';
}
