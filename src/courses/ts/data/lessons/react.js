// Bana 12: React med TypeScript. Eleven kan React från JS-kursen; här får
// props, state och händelser typer. Testerna använder JS-kursens __render
// och __mount (se ../../../js/runner/mount.js), och preview visar
// komponenten efteråt.

export const REACT = [
  {
    id: 'react-01',
    track: 'react',
    title: 'Typade props',
    xp: 15,
    description:
      'En komponents props är ett objekt, och objekt kan få en typ. Då kan ingen skicka fel props.',
    explain:
      '`type Props = { namn: string }` och `function Halsning({ namn }: Props)` – precis som en vanlig funktion med en objektparameter.\n\nSkriver någon `<Halsning namn={5} />` blir det typfel, och editorn föreslår `namn` när du skriver `<Halsning `.',
    example:
      'type Props = { titel: string };\n\nfunction Rubrik({ titel }: Props) {\n  return <h1>{titel}</h1>;\n}',
    task: 'Uppgift: Skriv `type Props = { namn: string }` och komponenten `Halsning` som visar `<h1>Hej {namn}!</h1>`.',
    starterCode: '// Skriv din kod här\n',
    solution:
      'type Props = { namn: string };\n\nfunction Halsning({ namn }: Props) {\n  return <h1>Hej {namn}!</h1>;\n}\n',
    hints: [
      'type Props = { namn: string };',
      'function Halsning({ namn }: Props) { … }',
      'return <h1>Hej {namn}!</h1>;',
    ],
    tests: [
      {
        description: 'Hälsar på Ada',
        code: '__mount(<Halsning namn="Ada" />).text(\'h1\')',
        expected: 'Hej Ada!',
      },
    ],
    typeTests: [
      {
        description: 'namn måste vara text',
        code: '<Halsning namn={5} />;',
        fails: true,
      },
      { description: 'namn måste finnas', code: '<Halsning />;', fails: true },
    ],
    preview: '<Halsning namn="Ada" />',
  },
  {
    id: 'react-02',
    track: 'react',
    title: 'Valfria props',
    xp: 15,
    description:
      'En valfri prop får ett `?` i typen och ofta ett standardvärde i parametern.',
    explain:
      '`farg?: string` gör att `<Knapp text="OK" />` fungerar utan färg. Med `{ text, farg = \'blå\' }` blir `farg` alltid en `string` inne i komponenten.',
    example:
      'type Props = { text: string; storlek?: number };\n\nfunction Text({ text, storlek = 16 }: Props) {\n  return <p style={{ fontSize: storlek }}>{text}</p>;\n}',
    task: "Uppgift: Skriv `Knapp` med props `text: string` och valfri `farg: string` (standard `'blå'`). Den visar `<button className={farg}>{text}</button>`.",
    starterCode: '// Skriv din kod här\n',
    solution:
      "type Props = { text: string; farg?: string };\n\nfunction Knapp({ text, farg = 'blå' }: Props) {\n  return <button className={farg}>{text}</button>;\n}\n",
    hints: [
      'farg?: string i typen.',
      "{ text, farg = 'blå' }: Props",
      'return <button className={farg}>{text}</button>;',
    ],
    tests: [
      {
        description: 'Utan färg',
        code: '__render(<Knapp text="OK" />)',
        expected: '<button class="blå">OK</button>',
      },
      {
        description: 'Med färg',
        code: '__render(<Knapp text="Nej" farg="röd" />)',
        expected: '<button class="röd">Nej</button>',
      },
    ],
    typeTests: [
      { description: 'farg kan hoppas över', code: '<Knapp text="a" />;' },
    ],
    preview: '<Knapp text="Spara" />',
  },
  {
    id: 'react-03',
    track: 'react',
    title: 'Prop som saknas',
    xp: 10,
    description: 'Komponenten används utan en prop som den kräver.',
    explain:
      'I JavaScript hade kortet visat en tom text. TypeScript säger vilken prop som saknas – där komponenten används, inte där den skrivs.',
    example: '<Kort titel="Hej" text="Välkommen" />',
    task: "Uppgift: Laga `App` så att kortet får texten `'Välkommen hit'`.",
    starterCode:
      'type Props = { titel: string; text: string };\n\nfunction Kort({ titel, text }: Props) {\n  return (\n    <div>\n      <h2>{titel}</h2>\n      <p>{text}</p>\n    </div>\n  );\n}\n\nfunction App() {\n  return <Kort titel="Hej" />;\n}\n',
    solution:
      'type Props = { titel: string; text: string };\n\nfunction Kort({ titel, text }: Props) {\n  return (\n    <div>\n      <h2>{titel}</h2>\n      <p>{text}</p>\n    </div>\n  );\n}\n\nfunction App() {\n  return <Kort titel="Hej" text="Välkommen hit" />;\n}\n',
    hints: [
      'Läs felet: vilken prop saknas?',
      'Lägg till text="…" på Kort.',
      '<Kort titel="Hej" text="Välkommen hit" />',
    ],
    tests: [
      {
        description: 'Texten syns',
        code: "__mount(<App />).text('p')",
        expected: 'Välkommen hit',
      },
    ],
    preview: '<App />',
  },
  {
    id: 'react-04',
    track: 'react',
    title: 'children',
    xp: 15,
    description:
      'Det som står mellan komponentens taggar heter `children`. Dess typ heter `ReactNode`.',
    explain:
      "`ReactNode` är allt React kan visa: text, tal, element, listor, `null`. Den importeras från react: `import type { ReactNode } from 'react'`.\n\n`import type` betyder att det bara är en typ – den försvinner när koden körs.",
    example:
      "import type { ReactNode } from 'react';\n\nfunction Fet({ children }: { children: ReactNode }) {\n  return <strong>{children}</strong>;\n}",
    task: 'Uppgift: Skriv `Ruta` med props `titel: string` och `children: ReactNode`. Den visar `<section>` med en `<h2>` och sedan `children`.',
    starterCode: "import type { ReactNode } from 'react';\n",
    solution:
      "import type { ReactNode } from 'react';\n\ntype Props = { titel: string; children: ReactNode };\n\nfunction Ruta({ titel, children }: Props) {\n  return (\n    <section>\n      <h2>{titel}</h2>\n      {children}\n    </section>\n  );\n}\n",
    hints: [
      'children: ReactNode i typen.',
      '<section><h2>{titel}</h2>{children}</section>',
      'type Props = { titel: string; children: ReactNode };',
    ],
    tests: [
      {
        description: 'Visar rubrik och innehåll',
        code: '__render(<Ruta titel="Nyheter"><p>Inget nytt</p></Ruta>)',
        expected: '<section><h2>Nyheter</h2><p>Inget nytt</p></section>',
      },
    ],
    typeTests: [
      {
        description: 'children måste finnas',
        code: '<Ruta titel="a" />;',
        fails: true,
      },
    ],
    preview: '<Ruta titel="Nyheter"><p>Inget nytt i dag.</p></Ruta>',
  },
  {
    id: 'react-05',
    track: 'react',
    title: 'useState<T>',
    xp: 15,
    description:
      'Oftast räknar `useState` ut typen från startvärdet. Men startar det med `null` behöver du säga vad det ska bli.',
    explain:
      '`useState(0)` blir ett `number`. Men `useState(null)` blir bara `null` – och då går det aldrig att sätta en frukt.\n\n`useState<string | null>(null)` säger: det är `null` nu, men kan bli en text.',
    example: 'const [vald, setVald] = useState<string | null>(null);',
    task: "Uppgift: Skriv `Val` med `useState<string | null>(null)`. Två knappar, `Äpple` och `Päron`, sätter frukten. En `<p>` visar frukten, eller `'Inget valt'`.",
    starterCode: "import { useState } from 'react';\n",
    solution:
      "import { useState } from 'react';\n\nfunction Val() {\n  const [frukt, setFrukt] = useState<string | null>(null);\n  return (\n    <div>\n      <button onClick={() => setFrukt('Äpple')}>Äpple</button>\n      <button onClick={() => setFrukt('Päron')}>Päron</button>\n      <p>{frukt ?? 'Inget valt'}</p>\n    </div>\n  );\n}\n",
    hints: [
      'useState<string | null>(null)',
      "onClick={() => setFrukt('Äpple')}",
      "<p>{frukt ?? 'Inget valt'}</p>",
    ],
    tests: [
      {
        description: 'Börjar utan val',
        code: "__mount(<Val />).text('p')",
        expected: 'Inget valt',
      },
      {
        description: 'Päron',
        code: "__mount(<Val />).click('Päron').text('p')",
        expected: 'Päron',
      },
    ],
    sourceChecks: [
      {
        description: 'Säger typen till useState',
        pattern: /useState\s*<\s*string\s*\|\s*null\s*>/,
      },
    ],
    preview: '<Val />',
  },
  {
    id: 'react-06',
    track: 'react',
    title: 'Händelser',
    xp: 20,
    description:
      'En funktion som tar emot en händelse behöver typen på händelsen, t.ex. `ChangeEvent<HTMLInputElement>`.',
    explain:
      'Skriver du händelsen direkt i JSX (`onChange={e => …}`) räknar TypeScript ut typen själv. Men en egen funktion behöver den: `function andra(e: ChangeEvent<HTMLInputElement>)`.\n\nDå vet TypeScript att `e.target.value` är en `string`.',
    example:
      "import type { ChangeEvent } from 'react';\n\nfunction andra(e: ChangeEvent<HTMLInputElement>) {\n  console.log(e.target.value);\n}",
    task: 'Uppgift: Skriv `Eko` med en `<input>` och en `<p>` som visar det som skrivs. Hantera ändringen i en egen funktion `andra(e: ChangeEvent<HTMLInputElement>)`.',
    starterCode:
      "import { useState } from 'react';\nimport type { ChangeEvent } from 'react';\n",
    solution:
      "import { useState } from 'react';\nimport type { ChangeEvent } from 'react';\n\nfunction Eko() {\n  const [text, setText] = useState('');\n\n  function andra(e: ChangeEvent<HTMLInputElement>) {\n    setText(e.target.value);\n  }\n\n  return (\n    <div>\n      <input value={text} onChange={andra} />\n      <p>{text}</p>\n    </div>\n  );\n}\n",
    hints: [
      "const [text, setText] = useState('');",
      'function andra(e: ChangeEvent<HTMLInputElement>) { setText(e.target.value); }',
      '<input value={text} onChange={andra} />',
    ],
    tests: [
      {
        description: 'Ekar det som skrivs',
        code: "__mount(<Eko />).type('Hej').text('p')",
        expected: 'Hej',
      },
    ],
    sourceChecks: [
      {
        description: 'andra har en typ på e',
        pattern: /e\s*:\s*ChangeEvent\s*<\s*HTMLInputElement\s*>/,
      },
    ],
    preview: '<Eko />',
  },
  {
    id: 'react-07',
    track: 'react',
    title: 'En funktion som prop',
    xp: 20,
    description:
      'En komponent kan säga till sin förälder att något hänt, via en funktion i props. Typen säger vad den skickar med.',
    explain:
      '`onValj: (farg: string) => void` betyder: en funktion som får en färg och inte returnerar något. Föräldern bestämmer vad som händer.\n\nI `<FargValjare onValj={f => …} />` vet TypeScript redan att `f` är en `string`.',
    example: 'type Props = { onKlick: () => void };',
    task: "Uppgift: Skriv `FargValjare` med props `onValj: (farg: string) => void`. Två knappar, `Röd` och `Blå`, anropar `onValj('röd')` och `onValj('blå')`.",
    starterCode: '// Skriv din kod här\n',
    solution:
      "type Props = { onValj: (farg: string) => void };\n\nfunction FargValjare({ onValj }: Props) {\n  return (\n    <div>\n      <button onClick={() => onValj('röd')}>Röd</button>\n      <button onClick={() => onValj('blå')}>Blå</button>\n    </div>\n  );\n}\n",
    hints: [
      'type Props = { onValj: (farg: string) => void };',
      "onClick={() => onValj('röd')}",
      'Två knappar.',
    ],
    tests: [
      {
        description: 'Röd',
        code: "(() => { let vald = ''; __mount(<FargValjare onValj={f => { vald = f; }} />).click('Röd'); return vald; })()",
        expected: 'röd',
      },
      {
        description: 'Blå',
        code: "(() => { let vald = ''; __mount(<FargValjare onValj={f => { vald = f; }} />).click('Blå'); return vald; })()",
        expected: 'blå',
      },
    ],
    typeTests: [
      {
        description: 'onValj får text',
        code: '<FargValjare onValj={f => f.toUpperCase()} />;',
      },
      {
        description: 'onValj måste finnas',
        code: '<FargValjare />;',
        fails: true,
      },
    ],
    preview: '<FargValjare onValj={f => console.log(f)} />',
  },
  {
    id: 'react-08',
    track: 'react',
    title: 'Props som är antingen eller',
    xp: 20,
    description:
      'Props kan också vara en union med en etikett, precis som i bana 7. Då kan bara rätt kombinationer skickas.',
    explain:
      'En statusruta som laddar har ingen data, och en som är klar har inget felmeddelande. Med en union går det inte att skicka `lage="klart"` utan `data`.\n\nKomponenten smalnar av på `props.lage` och vet då vad som finns.',
    example: "type Props = { lage: 'av' } | { lage: 'på'; styrka: number };",
    task: 'Uppgift: Skriv `Status(props: Props)`: laddar visar `<p>Laddar…</p>`, klart en `<ul>` med en `<li>` per text i `data` och fel `<p>Fel: {meddelande}</p>`.',
    starterCode:
      "type Props =\n  | { lage: 'laddar' }\n  | { lage: 'klart'; data: string[] }\n  | { lage: 'fel'; meddelande: string };\n",
    solution:
      "type Props =\n  | { lage: 'laddar' }\n  | { lage: 'klart'; data: string[] }\n  | { lage: 'fel'; meddelande: string };\n\nfunction Status(props: Props) {\n  if (props.lage === 'laddar') {\n    return <p>Laddar…</p>;\n  }\n  if (props.lage === 'fel') {\n    return <p>Fel: {props.meddelande}</p>;\n  }\n  return (\n    <ul>\n      {props.data.map(text => (\n        <li key={text}>{text}</li>\n      ))}\n    </ul>\n  );\n}\n",
    hints: [
      "if (props.lage === 'laddar') { … }",
      'Efter två if-satser är det klart som är kvar.',
      'props.data.map(text => <li key={text}>{text}</li>)',
    ],
    tests: [
      {
        description: 'Laddar',
        code: '__render(<Status lage="laddar" />)',
        expected: '<p>Laddar…</p>',
      },
      {
        description: 'Fel',
        code: '__mount(<Status lage="fel" meddelande="Ingen kontakt" />).text(\'p\')',
        expected: 'Fel: Ingen kontakt',
      },
      {
        description: 'Klart',
        code: "__render(<Status lage=\"klart\" data={['Ada', 'Bo']} />)",
        expected: '<ul><li>Ada</li><li>Bo</li></ul>',
      },
      {
        description: 'Inga key-problem',
        code: "(__render(<Status lage=\"klart\" data={['a', 'b']} />), __keyProblems)",
        expected: [],
      },
    ],
    typeTests: [
      {
        description: 'klart kräver data',
        code: '<Status lage="klart" />;',
        fails: true,
      },
      {
        description: 'laddar har inget meddelande',
        code: '<Status lage="laddar" meddelande="x" />;',
        fails: true,
      },
    ],
    preview: "<Status lage=\"klart\" data={['Ada', 'Bo', 'Cia']} />",
  },
  {
    id: 'react-09',
    track: 'react',
    title: 'En typad lista',
    xp: 20,
    description:
      'En lista med objekt av en egen typ, där varje rad visas som ett element.',
    explain:
      'Med `uppgifter: Uppgift[]` i props vet TypeScript att varje `u` i `map` har `id`, `text` och `klar`. `key={u.id}` ger React ett unikt id per rad.',
    example:
      'type Vara = { id: number; namn: string };\n\nfunction Varor({ varor }: { varor: Vara[] }) {\n  return <ul>{varor.map(v => <li key={v.id}>{v.namn}</li>)}</ul>;\n}',
    task: "Uppgift: Skriv `Lista` med props `uppgifter: Uppgift[]`. Den visar en `<ul>` med en `<li>` per uppgift: texten, och `' ✓'` efter om den är klar.",
    starterCode:
      'type Uppgift = { id: number; text: string; klar: boolean };\n',
    solution:
      "type Uppgift = { id: number; text: string; klar: boolean };\n\nfunction Lista({ uppgifter }: { uppgifter: Uppgift[] }) {\n  return (\n    <ul>\n      {uppgifter.map(u => (\n        <li key={u.id}>\n          {u.text}\n          {u.klar ? ' ✓' : ''}\n        </li>\n      ))}\n    </ul>\n  );\n}\n",
    hints: [
      '{ uppgifter }: { uppgifter: Uppgift[] }',
      'uppgifter.map(u => <li key={u.id}>…</li>)',
      "{u.klar ? ' ✓' : ''}",
    ],
    tests: [
      {
        description: 'Två uppgifter',
        code: "__render(<Lista uppgifter={[{ id: 1, text: 'Handla', klar: true }, { id: 2, text: 'Städa', klar: false }]} />)",
        expected: '<ul><li>Handla ✓</li><li>Städa</li></ul>',
      },
      {
        description: 'Inga key-problem',
        code: "(__render(<Lista uppgifter={[{ id: 1, text: 'a', klar: true }, { id: 2, text: 'b', klar: true }]} />), __keyProblems)",
        expected: [],
      },
    ],
    typeTests: [
      {
        description: 'En uppgift måste ha klar',
        code: "<Lista uppgifter={[{ id: 1, text: 'a' }]} />;",
        fails: true,
      },
    ],
    preview:
      "<Lista uppgifter={[{ id: 1, text: 'Handla', klar: true }, { id: 2, text: 'Städa', klar: false }]} />",
  },
];
