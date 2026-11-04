// Bana 5: formulär. I förhandsvisningen skickas formuläret ingenstans –
// PagePreview visar i stället vad som skulle ha skickats. Ingen CSS än.

// Texten i fältets etikett, oavsett om label står runt fältet eller
// pekar på det med for.
const label = selector =>
  `$('${selector}')?.labels?.[0]?.textContent.trim() ?? null`;

const NAME_FIELD = `<label for="namn">Namn</label>
<input type="text" id="namn">
`;

const SIGNUP = `<form>
  <label for="namn">Namn</label>
  <input type="text" id="namn" name="namn">
  <label for="epost">E-post</label>
  <input type="email" id="epost" name="epost">
  <button>Skicka</button>
</form>
`;

export const FORMULAR = [
  {
    id: 'formular-01',
    track: 'formular',
    title: 'Textfält och etikett',
    xp: 15,
    description:
      'Formulär är hur sidan frågar besökaren något: ett namn, en sökning, en beställning. Det börjar med ett fält att skriva i.',
    explain:
      '`<input type="text">` är ett textfält. Det har inget innehåll och stängs aldrig.\n\nVarje fält behöver en `<label>` som säger vad man ska skriva. `for` på etiketten pekar på fältets `id`: `<label for="namn">` hör till `<input id="namn">`. Då läser skärmläsaren upp "Namn" när man hamnar i fältet, och klickar man på ordet hoppar markören in i fältet.',
    example: '<label for="stad">Stad</label>\n<input type="text" id="stad">',
    task: 'Uppgift: Skriv ett textfält med id:t `namn` och en etikett som säger `Namn` och hör till fältet.',
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: NAME_FIELD,
    hints: [
      'Två taggar: label och input.',
      'for på label och id på input ska ha samma värde: namn.',
      '<label for="namn">Namn</label>\n<input type="text" id="namn">',
    ],
    tests: [
      {
        description: 'Ett textfält med id:t namn',
        code: "$('input#namn')?.type ?? null",
        expected: 'text',
      },
      {
        description: 'Etiketten Namn hör till fältet',
        code: label('#namn'),
        expected: 'Namn',
      },
    ],
  },
  {
    id: 'formular-02',
    track: 'formular',
    title: 'Olika sorters fält',
    xp: 15,
    description:
      'Ett fält för e-post, ett för siffror, ett för lösenord. Rätt typ gör det lättare att fylla i – särskilt på mobilen.',
    explain:
      'Attributet `type` bestämmer vilket fält det blir:\n\n- `email` – mobilen visar ett tangentbord med @, och webbläsaren kollar att det ser ut som en adress\n- `number` – bara siffror, med pilar för att öka och minska\n- `password` – det man skriver syns som prickar\n\nSkriver du en typ som inte finns blir det ett vanligt textfält.',
    example: '<label for="tel">Telefon</label>\n<input type="tel" id="tel">',
    task: 'Uppgift: Alla tre fälten är textfält nu. Ändra dem till `email`, `number` och `password`, så att de passar etiketterna.',
    starterCode: `<label for="epost">E-post</label>
<input type="text" id="epost">
<label for="alder">Ålder</label>
<input type="text" id="alder">
<label for="losen">Lösenord</label>
<input type="text" id="losen">
`,
    solution: `<label for="epost">E-post</label>
<input type="email" id="epost">
<label for="alder">Ålder</label>
<input type="number" id="alder">
<label for="losen">Lösenord</label>
<input type="password" id="losen">
`,
    hints: [
      'Det är bara type som ska ändras.',
      'E-post är email och ålder är number.',
      '<input type="password" id="losen">',
    ],
    tests: [
      {
        description: 'Fälten har typerna email, number och password',
        code: "$$('input').map(input => input.type)",
        expected: ['email', 'number', 'password'],
      },
      {
        description: 'Etiketterna hör fortfarande till fälten',
        code: "$$('input').map(input => input.labels?.[0]?.textContent.trim() ?? null)",
        expected: ['E-post', 'Ålder', 'Lösenord'],
      },
    ],
  },
  {
    id: 'formular-03',
    track: 'formular',
    title: 'placeholder är ingen etikett',
    xp: 15,
    description:
      'Text inuti fältet ser snyggt ut, men den försvinner när man börjar skriva. Vad var det nu man skulle fylla i?',
    explain:
      '`placeholder` är grå text inuti fältet som syns tills man skriver. Den är bra för ett exempel – `ada@example.com` – men den ersätter aldrig `label`.\n\nNär texten försvinner glömmer man vad fältet var till för, och många skärmläsare läser inte upp den alls.',
    example:
      '<label for="stad">Stad</label>\n<input type="text" id="stad" placeholder="Till exempel Lund">',
    task: 'Uppgift: Fältet har bara en placeholder. Ge det id:t `epost` och en etikett som säger `E-post`, och ändra placeholdern till ett exempel: `ada@example.com`.',
    starterCode: '<input type="email" placeholder="E-post">\n',
    solution:
      '<label for="epost">E-post</label>\n<input type="email" id="epost" placeholder="ada@example.com">\n',
    hints: [
      'Lägg till en label före fältet, och ett id på fältet.',
      '<label for="epost">E-post</label>',
      'placeholder="ada@example.com"',
    ],
    tests: [
      {
        description: 'Fältet har etiketten E-post',
        code: label('input'),
        expected: 'E-post',
      },
      {
        description: 'Placeholdern är ett exempel',
        code: "attr('input', 'placeholder')",
        expected: 'ada@example.com',
      },
    ],
  },
  {
    id: 'formular-04',
    track: 'formular',
    title: 'Formulär och knapp',
    xp: 20,
    description:
      'Fälten behöver ett formulär runt sig och en knapp, så att svaren kan skickas.',
    explain:
      '`<form>` samlar fälten, och `<button>` skickar formuläret. Det som skickas är varje fälts `name` och det som står i fältet: `namn=Ada`.\n\n`id` är till för etiketten, `name` för det som skickas. Ett fält utan `name` skickas inte alls. Prova: fyll i fälten i rutan och tryck på knappen, så ser du vad som skulle ha skickats.',
    example:
      '<form>\n  <label for="sok">Sök</label>\n  <input type="text" id="sok" name="q">\n  <button>Sök</button>\n</form>',
    task: 'Uppgift: Lägg fälten i en `form`, ge dem `name` (`namn` och `epost`) och lägg till en knapp som säger `Skicka`. Prova sedan att skicka.',
    starterCode: `<label for="namn">Namn</label>
<input type="text" id="namn">
<label for="epost">E-post</label>
<input type="email" id="epost">
`,
    solution: SIGNUP,
    hints: [
      '<form> före första etiketten och </form> sist.',
      'name="namn" och name="epost" på fälten.',
      '<button>Skicka</button> före </form>.',
    ],
    tests: [
      {
        description: 'Fälten ligger i ett formulär',
        code: "count('form input')",
        expected: 2,
      },
      {
        description: 'Fälten har name: namn och epost',
        code: "$$('form input').map(input => input.name)",
        expected: ['namn', 'epost'],
      },
      {
        description: 'En knapp som säger Skicka',
        code: "text('form button')",
        expected: 'Skicka',
      },
    ],
  },
  {
    id: 'formular-05',
    track: 'formular',
    title: 'Måste fyllas i',
    xp: 15,
    description:
      'Vissa fält får inte vara tomma. Webbläsaren kan kolla det åt dig innan något skickas.',
    explain:
      'Attributet `required` betyder "måste fyllas i". Det behöver inget värde. Trycker man på knappen med fältet tomt stoppar webbläsaren och säger till.\n\nTala om det i etiketten också, till exempel med en stjärna: `Namn *`. Annars får man inte veta förrän man försöker skicka.',
    example: '<input type="email" id="epost" name="epost" required>',
    task: 'Uppgift: Gör båda fälten obligatoriska och lägg till ` *` sist i båda etiketterna. Prova sedan att skicka med ett tomt fält.',
    starterCode: SIGNUP,
    solution: `<form>
  <label for="namn">Namn *</label>
  <input type="text" id="namn" name="namn" required>
  <label for="epost">E-post *</label>
  <input type="email" id="epost" name="epost" required>
  <button>Skicka</button>
</form>
`,
    hints: [
      'required står sist i input-taggen, utan värde.',
      'Etiketterna blir Namn * och E-post *.',
      '<input type="text" id="namn" name="namn" required>',
    ],
    tests: [
      {
        description: 'Båda fälten måste fyllas i',
        code: "$$('input').map(input => input.required)",
        expected: [true, true],
      },
      {
        description: 'Etiketterna visar en stjärna',
        code: "texts('label')",
        expected: ['Namn *', 'E-post *'],
      },
    ],
  },
  {
    id: 'formular-06',
    track: 'formular',
    title: 'Stort textfält',
    xp: 15,
    description:
      'Ett meddelande får inte plats på en rad. Då behövs ett fält med flera rader.',
    explain:
      '`<textarea>` är ett textfält med flera rader. Till skillnad från `input` har det en stängande tagg: `<textarea></textarea>`. Det som står emellan är fältets starttext, så oftast står ingenting där.\n\n`rows` säger hur många rader högt fältet är.',
    example:
      '<label for="hej">Hälsning</label>\n<textarea id="hej" name="halsning" rows="3"></textarea>',
    task: 'Uppgift: Lägg till ett `textarea` före knappen, med id:t och name:t `meddelande`, 5 rader högt och med etiketten `Meddelande`.',
    starterCode: SIGNUP,
    solution: `<form>
  <label for="namn">Namn</label>
  <input type="text" id="namn" name="namn">
  <label for="epost">E-post</label>
  <input type="email" id="epost" name="epost">
  <label for="meddelande">Meddelande</label>
  <textarea id="meddelande" name="meddelande" rows="5"></textarea>
  <button>Skicka</button>
</form>
`,
    hints: [
      'En label och ett textarea, mellan sista input och button.',
      'textarea stängs med </textarea>.',
      '<textarea id="meddelande" name="meddelande" rows="5"></textarea>',
    ],
    tests: [
      {
        description: 'Ett textarea med name:t meddelande',
        code: "$('form textarea')?.name ?? null",
        expected: 'meddelande',
      },
      {
        description: 'Det har etiketten Meddelande',
        code: label('textarea'),
        expected: 'Meddelande',
      },
      {
        description: 'Det är 5 rader högt',
        code: "attr('textarea', 'rows')",
        expected: '5',
      },
    ],
  },
  {
    id: 'formular-07',
    track: 'formular',
    title: 'Kryssrutor',
    xp: 15,
    description:
      'Ja eller nej, på eller av. En kryssruta är för val man kan klicka i eller låta bli.',
    explain:
      '`<input type="checkbox">` är en kryssruta. Här står etiketten oftast efter rutan, och ett snabbt sätt är att lägga `label` runt både rutan och texten: `<label><input type="checkbox"> Ja tack</label>`. Då behövs inget `for` eller `id`.\n\nEn kryssruta skickas bara om den är ikryssad, och då med värdet i `value`.',
    example:
      '<label>\n  <input type="checkbox" name="kvitto" value="ja"> Jag vill ha kvitto\n</label>',
    task: 'Uppgift: Lägg till en kryssruta före knappen, med `name="nyhetsbrev"` och `value="ja"`, och etiketten `Jag vill ha nyhetsbrevet`.',
    starterCode: SIGNUP,
    solution: `<form>
  <label for="namn">Namn</label>
  <input type="text" id="namn" name="namn">
  <label for="epost">E-post</label>
  <input type="email" id="epost" name="epost">
  <label>
    <input type="checkbox" name="nyhetsbrev" value="ja"> Jag vill ha nyhetsbrevet
  </label>
  <button>Skicka</button>
</form>
`,
    hints: [
      'label runt både kryssrutan och texten.',
      'type="checkbox", name="nyhetsbrev" och value="ja".',
      '<label><input type="checkbox" name="nyhetsbrev" value="ja"> Jag vill ha nyhetsbrevet</label>',
    ],
    tests: [
      {
        description: 'En kryssruta med name nyhetsbrev och value ja',
        code: "(() => { const box = $('input[type=checkbox]'); return box ? [box.name, box.value] : null; })()",
        expected: ['nyhetsbrev', 'ja'],
      },
      {
        description: 'Den har etiketten Jag vill ha nyhetsbrevet',
        code: label('input[type=checkbox]'),
        expected: 'Jag vill ha nyhetsbrevet',
      },
    ],
  },
  {
    id: 'formular-08',
    track: 'formular',
    title: 'Radioknappar',
    xp: 20,
    description:
      'Liten, mellan eller stor? När man ska välja exakt en sak av några få blir det radioknappar.',
    explain:
      '`<input type="radio">` är en radioknapp. Knappar med samma `name` hör ihop: väljer du en släcks de andra. Det är `name` som gör dem till en grupp.\n\n`value` är det som skickas. Utan `value` skickas bara `on`, och då vet ingen vad du valde.',
    example:
      '<label><input type="radio" name="dryck" value="kaffe"> Kaffe</label>\n<label><input type="radio" name="dryck" value="te"> Te</label>',
    task: 'Uppgift: Skriv tre radioknappar i formuläret, före knappen, med `name="storlek"`. Värdena är `liten`, `mellan` och `stor` och etiketterna `Liten`, `Mellan` och `Stor`.',
    starterCode: `<form>
  <p>Vilken storlek?</p>
  <button>Beställ</button>
</form>
`,
    solution: `<form>
  <p>Vilken storlek?</p>
  <label><input type="radio" name="storlek" value="liten"> Liten</label>
  <label><input type="radio" name="storlek" value="mellan"> Mellan</label>
  <label><input type="radio" name="storlek" value="stor"> Stor</label>
  <button>Beställ</button>
</form>
`,
    hints: [
      'Tre input med type="radio", var och en i en egen label.',
      'Alla tre har samma name: storlek.',
      '<label><input type="radio" name="storlek" value="liten"> Liten</label>',
    ],
    tests: [
      {
        description: 'Tre radioknappar i gruppen storlek',
        code: "$$('input[type=radio]').map(input => input.name)",
        expected: ['storlek', 'storlek', 'storlek'],
      },
      {
        description: 'Värdena är liten, mellan och stor',
        code: "$$('input[type=radio]').map(input => input.value)",
        expected: ['liten', 'mellan', 'stor'],
      },
      {
        description: 'Etiketterna är Liten, Mellan och Stor',
        code: "$$('input[type=radio]').map(input => input.labels?.[0]?.textContent.trim() ?? null)",
        expected: ['Liten', 'Mellan', 'Stor'],
      },
    ],
  },
  {
    id: 'formular-09',
    track: 'formular',
    title: 'Rullgardinsmeny',
    xp: 20,
    description:
      'När det finns många val tar radioknappar för stor plats. En rullgardinsmeny visar bara det valda.',
    explain:
      '`<select>` är menyn och varje val är en `<option>`. Som för andra fält står `name` på `select`, och det som skickas är `value` på det valda alternativet.\n\nTexten mellan `<option>` och `</option>` är det man ser, `value` är det som skickas.',
    example:
      '<label for="land">Land</label>\n<select id="land" name="land">\n  <option value="se">Sverige</option>\n  <option value="no">Norge</option>\n</select>',
    task: 'Uppgift: Skriv en `select` före knappen med id:t och name:t `vecka` och etiketten `Vecka`. Alternativen är `Vecka 26`, `Vecka 27` och `Vecka 28`, med värdena `26`, `27` och `28`.',
    starterCode: `<form>
  <button>Anmäl</button>
</form>
`,
    solution: `<form>
  <label for="vecka">Vecka</label>
  <select id="vecka" name="vecka">
    <option value="26">Vecka 26</option>
    <option value="27">Vecka 27</option>
    <option value="28">Vecka 28</option>
  </select>
  <button>Anmäl</button>
</form>
`,
    hints: [
      'En label och en select före knappen.',
      'I select: tre option, var och en med ett value.',
      '<option value="26">Vecka 26</option>',
    ],
    tests: [
      {
        description: 'En meny med name:t vecka och etiketten Vecka',
        code: `[$('select')?.name ?? null, ${label('select')}]`,
        expected: ['vecka', 'Vecka'],
      },
      {
        description: 'Tre alternativ',
        code: "texts('select option')",
        expected: ['Vecka 26', 'Vecka 27', 'Vecka 28'],
      },
      {
        description: 'Värdena är 26, 27 och 28',
        code: "$$('option').map(option => option.value)",
        expected: ['26', '27', '28'],
      },
    ],
  },
];
