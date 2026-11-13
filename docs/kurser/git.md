# Git och terminalen

Terminalen och Git från noll – det som alla som ska koda på riktigt
behöver, och som ingen annan kurs i Kodskolan lär ut. Eleven skriver
kommandon i en låtsasterminal i webbläsaren och ser resultatet direkt.

Id `git`, adressen `/git`, `storagePrefix` `kodskolan-git-`, övningarnas id
börjar med `git-`. `plannedTracks: 8`, `freeTracks: 3` (terminalen och
första commiten är gratis).

## Terminalen och Git i webbläsaren

`runner/shell.js` är en liten terminal med ett filsystem i minnet och en
egen förenklad Git (`runner/git.js`). Inget installeras och inget skickas
någonstans. Allt är förutsägbart: commit-id räknas fram ur innehållet,
och tiden står still (`2026-01-05 09:00`, en minut per commit).

- Terminalen: `pwd`, `ls` (`-a`), `cd`, `mkdir` (`-p`), `touch`, `cat`,
  `echo "text" > fil` och `>>`, `cp`, `mv`, `rm` (`-r`), `clear`.
- Git: `init`, `status`, `add`, `commit -m`, `log` (`--oneline`), `diff`,
  `restore`, `branch`, `switch` (`-c`), `checkout`, `merge` (snabbspolning
  och vanlig sammanslagning, med konflikter), `remote add`, `push`,
  `pull`, `clone` (mot en låtsasserver, `https://github.com/…`).
- Okända kommandon och fel ger en förklaring på svenska, med förslag
  ("menade du `git commit`?").

En övning har `setup` (kommandon som körs först, osynligt, t.ex. ett
projekt som redan finns) och `tests` med kontroller av läget efteråt:

| Kontroll | Godkänd när |
| --- | --- |
| `{ cwd: '/hem/projekt' }` | eleven står i mappen |
| `{ exists: 'fil' }` / `{ missing: 'fil' }` | filen eller mappen finns / finns inte |
| `{ file: 'fil', content: 'text' }` | filen innehåller exakt texten |
| `{ commits: 2 }` | grenen har så många commits |
| `{ message: 'text' }` | senaste commitens meddelande |
| `{ clean: true }` | inget att committa |
| `{ staged: ['fil'] }` | precis de filerna är tillagda men inte committade |
| `{ branch: 'namn' }` | eleven står på grenen |
| `{ branches: ['main', 'ny'] }` | grenarna som finns |
| `{ output: 'text' }` | utskriften innehåller texten |
| `{ pushed: true }` | servern har samma commits som grenen |

## Banorna

| # | id | Bana | Lär ut |
| -- | -- | -- | -- |
| 1 | `terminal` | Terminalen | `pwd`, `ls`, `cd`, `mkdir`, `touch`, `echo >`, `cat`, sökvägar och `..` |
| 2 | `filer` | Filer i terminalen | `cp`, `mv`, `rm`, `rm -r`, `ls -a`, `>>`, dolda filer |
| 3 | `commit` | Din första commit | `git init`, `status`, `add`, `commit -m`, `log` |
| 4 | `andringar` | Ändringar | `diff`, lägga till en fil i taget, `restore`, `log --oneline`, `.gitignore` |
| 5 | `grenar` | Grenar | `branch`, `switch -c`, `switch`, `merge`, `branch -d` |
| 6 | `konflikter` | Konflikter | när två grenar ändrar samma rad: läsa markeringarna, laga, committa |
| 7 | `github` | GitHub | `remote add`, `push`, `clone`, `pull`, README |
| 8 | `arbetsflode` | Arbetsflödet | en gren per ändring, bra commit-meddelanden, pull requests (förklaras), slutprojekt |

Alla åtta banorna är klara ✅.
