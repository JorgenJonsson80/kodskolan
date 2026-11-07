# TypeScript-kursen

JavaScript med typer, från första `: string` till generics, data från
nätet och React. För den som gått JS-kursen eller kan lite JavaScript.

Eleven skriver TypeScript som kontrolleras av TypeScripts egen kompilator
i webbläsaren. Är typerna rätt görs koden om till JavaScript och körs med
JS-kursens rättning, så att också vad koden gör kontrolleras.

## Kompilatorn

TypeScript 6.0.3 från npm (`typescript`, låst version). TypeScript 7 är
omskriven i Go och går inte att köra i webbläsaren på samma sätt. Språket
är detsamma, och första övningen säger det. Kompilatorn är 1,1 MB
komprimerad och laddas i en egen worker när kursen öppnas.

Inställningarna (`runner/checker.js`): `strict`, ES2022, `lib.es2023`,
`jsx: react-jsx`. I stället för `lib.dom` (1,5 MB) finns
`runner/globals.d.ts` med det eleven når: `console`, timers, `fetch`,
`localStorage` och värdet i formulärens element. React-typerna kommer
från `@types/react`, utan `csstype`.

Koden är `main.tsx` när den har JSX eller importerar från react, annars
`main.ts` (i en .tsx-fil betyder `<T>` ett element).

## Banorna

| #  | id            | Bana                 | Lär ut                                                       |
| -- | ------------- | -------------------- | ------------------------------------------------------------ |
| 1  | `typer`       | Första typerna       | `: string`, `: number`, `: boolean`, typinferens, typfel    |
| 2  | `funktioner`  | Typade funktioner    | parametrar, returtyp, valfria `?`, standardvärden, `void`    |
| 3  | `objekt`      | Arrayer och objekt   | `string[]`, objekttyper, valfria egenskaper, `readonly`      |
| 4  | `egna`        | Egna typer           | `type`, `interface`, `extends`, `&`                          |
| 5  | `unioner`     | Antingen eller       | `\|`, literaltyper, `typeof`, `in`, avsmalning               |
| 6  | `saknas`      | Det som kan saknas   | `null`, `undefined`, `?.`, `??`, `!`                         |
| 7  | `fall`        | Sorterade fall       | unioner med `kind`, `switch`, `never`                        |
| 8  | `generics`    | Generics             | `<T>`, generiska funktioner, `Array<T>`, `extends` som krav  |
| 9  | `verktyg`     | Verktygstyper        | `Partial`, `Pick`, `Omit`, `Record`, `keyof`, `typeof`       |
| 10 | `data`        | Data utifrån         | `Promise<T>`, `fetch`, `unknown`, `x is T`                   |
| 11 | `felsok`      | Felsökning           | typfel att laga (startkoden är trasig), `any`, `as`          |
| 12 | `react`       | React med TypeScript | typade props, `useState<T>`, händelser, `children`           |
| 13 | `slutprojekt` | Slutprojektet        | en typad app från grunden                                    |

Varje bana: 9 övningar och en boss, tre projekt med tre steg, tre idéer
till Lekplatsen, fyra quizfrågor och minst två länkar i Fastnat?.

## En övning

Som i JS-kursen (`id`, `track`, `title`, `xp`, `description`, `explain`,
`example`, `task`, `starterCode`, `solution`, `hints`, `tests`,
`sourceChecks`), och:

- `typeTests: [{ description, code, fails }]` – kod som läggs efter
  elevens kod, var och en i ett eget block, och typkontrolleras. Utan
  `fails` ska den gå igenom, med `fails: true` ska den ge typfel (en
  rad, den får `// @ts-expect-error` före sig). Så rättas själva
  typerna: `{ code: "const s: Storlek = 'jätte';", fails: true }`.
  Lägg alltid ett test utan `fails` bredvid, för en typ som inte finns
  alls ger också fel.
- `tests` körs som i JS-kursen (`code` är ett uttryck, `__logs` är
  konsolen) på JavaScript-versionen av koden.
- `sourceChecks` kollas på TypeScript-koden, t.ex. att en typ är
  skriven (`/alder\s*:\s*number/`) eller inte (`forbidden: true`).
- Ett typfel i elevens kod stoppar körningen, som när man bygger ett
  riktigt projekt. Felet visas med rad och förklaras på svenska
  (`runner/friendlyErrors.js`, efter felets nummer).
- Facit får inte använda något före sin bana (`test/concepts.js`):
  inga typade parametrar före bana 2, inga `[]`-typer, objekttyper
  eller `readonly` före 3, ingen `type`/`interface` före 4, ingen union
  före 5, ingen `| null` eller `!` före 6, ingen `never` före 7, inga
  generics före 8, inga verktygstyper eller `keyof` före 9, ingen
  `unknown`, `Promise<…>` eller `x is T` före 10 och ingen React före 12.
  I bana 1 finns inga funktioner med parametrar alls, för utan typer
  blir det typfel.
