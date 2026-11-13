import { IMPORT, M, project } from './projectHelper';

// Projekten för bana 1–5: språkmodellen, prompter, samtal, strukturerade
// svar och verktyg.
const TEXT = "next(b.text for b in svar.content if b.type == 'text')";
const call = (messages, extra = '') =>
  `client.messages.create(\n        model='${M}',\n        max_tokens=1000,\n${extra}        messages=${messages},\n    )`;

export const PROJECTS_A = [
  // Bana 1: språkmodellen
  project({
    id: 'ai-proj-ordbok',
    track: 'modell',
    title: 'Ordboken',
    reward: { emoji: '📖', name: 'Ordbok' },
    summary: 'En ordbok som frågar modellen – och vet vad varje fråga kostar.',
    modell: [
      { om: 'algoritm', fel: 'RateLimitError', ganger: 1 },
      {
        om: 'Förklara ordet katt',
        svar: 'En katt är ett litet rovdjur som ofta är husdjur.',
      },
      {
        om: 'Förklara ordet algoritm',
        svar: 'En algoritm är en beskrivning steg för steg av hur man löser ett problem.',
      },
    ],
    steps: [
      {
        title: 'Fråga om ett ord',
        why: 'En funktion runt anropet gör att resten av programmet inte behöver veta något om API:et.',
        xp: 15,
        description: 'Ordboken frågar modellen vad ett ord betyder.',
        task: "Uppgift: Skriv `anropa(text)` som skickar texten och returnerar hela svaret, och `forklara(ord)` som skickar `'Förklara ordet ' + ord` med `anropa` och returnerar texten.",
        add: `def anropa(text):\n    return ${call("[{'role': 'user', 'content': text}]")}\n\n\ndef forklara(ord):\n    svar = anropa('Förklara ordet ' + ord)\n    return svar.content[0].text\n`,
        hints: [
          'anropa gör client.messages.create och returnerar svaret.',
          "forklara anropar anropa('Förklara ordet ' + ord).",
          'return svar.content[0].text',
        ],
        tests: [
          {
            description: "forklara('katt')",
            code: "forklara('katt')",
            expected: 'En katt är ett litet rovdjur som ofta är husdjur.',
          },
          {
            description: 'Frågan som skickades',
            code: "__anrop()[-1]['messages'][0]['content']",
            expected: 'Förklara ordet katt',
          },
        ],
      },
      {
        title: 'Vad kostar det?',
        why: 'Du betalar per token, både för det du skickar och det du får. Output kostar mer – därför lönar sig korta svar.',
        xp: 15,
        description:
          'claude-opus-5-5 kostar 4 dollar per miljon input-tokens och 20 per miljon output-tokens.',
        task: 'Uppgift: Skriv `kostnad(svar)` som räknar ut vad ett svar kostade i dollar från `svar.usage`.',
        add: 'def kostnad(svar):\n    return (svar.usage.input_tokens * 4 + svar.usage.output_tokens * 20) / 1_000_000\n',
        hints: [
          'svar.usage.input_tokens och svar.usage.output_tokens',
          'Gånger 4 och gånger 20, delat med en miljon.',
          'return (svar.usage.input_tokens * 4 + svar.usage.output_tokens * 20) / 1_000_000',
        ],
        tests: [
          {
            description: 'Kostnaden räknas ut från usage',
            code: "(lambda s: kostnad(s) == (s.usage.input_tokens * 4 + s.usage.output_tokens * 20) / 1_000_000)(anropa('Förklara ordet katt'))",
            expected: true,
          },
          {
            description: 'Ett svar om katt',
            code: "round(kostnad(anropa('Förklara ordet katt')) * 1_000_000)",
            expected: 212,
          },
        ],
      },
      {
        title: 'Försök igen',
        why: 'RateLimitError betyder att API:et är upptaget just nu. Ett nytt försök brukar gå bra – men bara ett par gånger.',
        xp: 20,
        description: 'Ibland är API:et upptaget.',
        task: 'Uppgift: Skriv `forklara_sakert(ord)` som anropar `forklara` och, om det ger `anthropic.RateLimitError`, försöker en gång till.',
        add: 'def forklara_sakert(ord):\n    try:\n        return forklara(ord)\n    except anthropic.RateLimitError:\n        return forklara(ord)\n',
        hints: [
          'try: … except anthropic.RateLimitError:',
          'I except anropar du forklara igen.',
          'return forklara(ord) på båda ställena.',
        ],
        tests: [
          {
            description: "forklara_sakert('algoritm')",
            code: "forklara_sakert('algoritm')",
            expected:
              'En algoritm är en beskrivning steg för steg av hur man löser ett problem.',
          },
          {
            description: 'Två anrop: ett misslyckat och ett lyckat',
            code: 'len(__anrop())',
            expected: 2,
          },
        ],
      },
    ],
  }),
  project({
    id: 'ai-proj-sammanfatta',
    track: 'modell',
    title: 'Sammanfattaren',
    reward: { emoji: '📝', name: 'Anteckning' },
    summary: 'Korta ner långa texter – och märk när svaret klipptes av.',
    modell: [
      {
        om: '^Sammanfatta',
        svar: 'Kaféet har öppet varje dag och bakar allt själva.',
      },
    ],
    steps: [
      {
        title: 'Sammanfatta',
        why: 'En tydlig instruktion först i meddelandet säger vad modellen ska göra med texten.',
        xp: 15,
        description: 'En funktion som sammanfattar en text.',
        task: "Uppgift: Skriv `sammanfatta(text, max_tokens=1000)` som skickar `'Sammanfatta: ' + text` med den `max_tokens` och returnerar hela svaret.",
        add: `def sammanfatta(text, max_tokens=1000):\n    return client.messages.create(\n        model='${M}',\n        max_tokens=max_tokens,\n        messages=[{'role': 'user', 'content': 'Sammanfatta: ' + text}],\n    )\n`,
        hints: [
          'max_tokens=max_tokens i anropet.',
          "'Sammanfatta: ' + text",
          'Returnera hela svaret, inte bara texten.',
        ],
        tests: [
          {
            description: 'Texten i svaret',
            code: "sammanfatta('Kafé Kod har öppet alla dagar.').content[0].text",
            expected: 'Kaféet har öppet varje dag och bakar allt själva.',
          },
          {
            description: 'max_tokens skickas med',
            code: "(sammanfatta('x', 50), __anrop()[-1]['max_tokens'])[1]",
            expected: 50,
          },
        ],
      },
      {
        title: 'Avklippt?',
        why: "När svaret blir längre än max_tokens klipps det mitt i, och stop_reason blir 'max_tokens'. Ett halvt svar är ofta värre än inget.",
        xp: 20,
        description: 'Märk när svaret inte fick plats.',
        task: "Uppgift: Skriv `kort(text, max_tokens)` som returnerar sammanfattningens text, eller `None` om `stop_reason` är `'max_tokens'`.",
        add: "def kort(text, max_tokens):\n    svar = sammanfatta(text, max_tokens)\n    if svar.stop_reason == 'max_tokens':\n        return None\n    return svar.content[0].text\n",
        hints: [
          'Anropa sammanfatta med max_tokens.',
          "if svar.stop_reason == 'max_tokens': return None",
          'Annars svar.content[0].text.',
        ],
        tests: [
          {
            description: 'För få tokens',
            code: "kort('Lång text', 3)",
            expected: null,
          },
          {
            description: 'Tillräckligt',
            code: "kort('Lång text', 100)",
            expected: 'Kaféet har öppet varje dag och bakar allt själva.',
          },
        ],
      },
      {
        title: 'Många texter',
        why: 'Varje anrop kostar. Räkna tokens innan du kör på tusen texter.',
        xp: 15,
        description: 'Hur många tokens går åt för flera texter?',
        task: 'Uppgift: Skriv `tokens_for(texter)` som sammanfattar varje text och returnerar summan av input- och output-tokens.',
        add: 'def tokens_for(texter):\n    total = 0\n    for text in texter:\n        svar = sammanfatta(text)\n        total += svar.usage.input_tokens + svar.usage.output_tokens\n    return total\n',
        hints: [
          'En loop över texterna.',
          'svar.usage.input_tokens + svar.usage.output_tokens',
          'Summera i total.',
        ],
        tests: [
          {
            description: 'Två texter',
            code: "tokens_for(['Kaffe är gott.', 'Bullar är goda.'])",
            expected: 26,
          },
          {
            description: 'Två anrop',
            code: "(lambda fore: (tokens_for(['a', 'b']), len(__anrop()) - fore)[1])(len(__anrop()))",
            expected: 2,
          },
        ],
      },
    ],
  }),
  project({
    id: 'ai-proj-oversatt',
    track: 'modell',
    title: 'Översättaren',
    reward: { emoji: '🌍', name: 'Jordglob' },
    summary: 'Översätt fraser – en i taget och många på en gång.',
    modell: [
      { om: 'God morgon', svar: 'Good morning' },
      { om: 'Tack', svar: 'Thank you' },
    ],
    steps: [
      {
        title: 'En fras',
        why: 'Samma enkla anrop, med en instruktion i början. Det mesta du bygger med språkmodeller börjar så.',
        xp: 10,
        description: 'Från svenska till engelska.',
        task: "Uppgift: Skriv `oversatt(fras)` som skickar `'Översätt till engelska: ' + fras` och returnerar texten.",
        add: `def oversatt(fras):\n    svar = ${call("[{'role': 'user', 'content': 'Översätt till engelska: ' + fras}]")}\n    return ${TEXT}\n`,
        hints: [
          "'Översätt till engelska: ' + fras",
          'Samma anrop som förut.',
          `return ${TEXT}`,
        ],
        tests: [
          {
            description: "oversatt('God morgon')",
            code: "oversatt('God morgon')",
            expected: 'Good morning',
          },
        ],
      },
      {
        title: 'Många fraser',
        why: 'Ett anrop per fras är enkelt men kostar ett anrop var. Räkna med det när listan blir lång.',
        xp: 15,
        description: 'En hel lista.',
        task: 'Uppgift: Skriv `oversatt_alla(fraser)` som returnerar en lista med översättningarna.',
        add: 'def oversatt_alla(fraser):\n    return [oversatt(fras) for fras in fraser]\n',
        hints: [
          'En list comprehension.',
          'oversatt(fras) for fras in fraser',
          'return [oversatt(fras) for fras in fraser]',
        ],
        tests: [
          {
            description: 'Två fraser',
            code: "oversatt_alla(['God morgon', 'Tack'])",
            expected: ['Good morning', 'Thank you'],
          },
          {
            description: 'Ett anrop per fras',
            code: "(lambda fore: (oversatt_alla(['Tack', 'Tack', 'Tack']), len(__anrop()) - fore)[1])(len(__anrop()))",
            expected: 3,
          },
        ],
      },
      {
        title: 'Spara anrop',
        why: 'Samma fras två gånger ska inte kosta två anrop. En dictionary som minns svaren – en cache – sparar pengar.',
        xp: 20,
        description: 'Fråga inte om det du redan vet.',
        task: 'Uppgift: Skriv `oversatt_med_minne(fras)` som sparar svaren i dictionaryn `MINNE` och bara anropar modellen första gången för en fras.',
        add: 'MINNE = {}\n\n\ndef oversatt_med_minne(fras):\n    if fras not in MINNE:\n        MINNE[fras] = oversatt(fras)\n    return MINNE[fras]\n',
        hints: [
          'MINNE = {} överst.',
          'if fras not in MINNE: spara översättningen.',
          'return MINNE[fras]',
        ],
        tests: [
          {
            description: 'Rätt svar',
            code: "oversatt_med_minne('Tack')",
            expected: 'Thank you',
          },
          {
            description: 'Bara ett anrop för samma fras tre gånger',
            code: "(lambda fore: [oversatt_med_minne('God morgon') for _ in range(3)] and len(__anrop()) - fore)(len(__anrop()))",
            expected: 1,
          },
        ],
      },
    ],
  }),

  // Bana 2: prompter
  project({
    id: 'ai-proj-kundtjanst',
    track: 'prompter',
    title: 'Kundtjänsten',
    reward: { emoji: '🎧', name: 'Hörlurar' },
    summary: 'En kundtjänst för Kafé Kod, styrd med en systemprompt.',
    steps: [
      {
        title: 'Systemprompten',
        why: 'Systemprompten säger vem modellen är och hur den ska svara – för alla frågor, utan att kunden ser den.',
        xp: 15,
        description: 'Säg vem modellen är.',
        task: "Uppgift: Gör konstanten `SYSTEM = 'Du är kundtjänst för Kafé Kod. Svara kort och vänligt.'` och `svara(fraga)` som skickar frågan med `system=SYSTEM` och returnerar texten.",
        add: `SYSTEM = 'Du är kundtjänst för Kafé Kod. Svara kort och vänligt.'\n\n\ndef svara(fraga):\n    svar = ${call("[{'role': 'user', 'content': fraga}]", '        system=SYSTEM,\n')}\n    return ${TEXT}\n`,
        hints: ['SYSTEM = …', 'system=SYSTEM i anropet.', `return ${TEXT}`],
        tests: [
          {
            description: 'Systemprompten skickas',
            code: "(svara('Hej'), __anrop()[-1]['system'])[1]",
            expected: 'Du är kundtjänst för Kafé Kod. Svara kort och vänligt.',
          },
          { description: 'Svaret', code: "svara('Hej')", expected: 'Hej!' },
        ],
      },
      {
        title: 'Kundens text i taggar',
        why: 'Taggar som <meddelande> visar var kundens text börjar och slutar. Då blandas den inte ihop med dina instruktioner.',
        xp: 15,
        description: 'Lägg kundens meddelande i en tagg.',
        task: "Uppgift: Skriv `bygg_prompt(text)` som ger `'<meddelande>' + text + '</meddelande>'`, och låt `svara` skicka `bygg_prompt(fraga)`.",
        change: [["'content': fraga}", "'content': bygg_prompt(fraga)}"]],
        add: "def bygg_prompt(text):\n    return '<meddelande>' + text + '</meddelande>'\n",
        hints: [
          "def bygg_prompt(text): return '<meddelande>' + text + '</meddelande>'",
          "I svara: 'content': bygg_prompt(fraga)",
          'Kolla vad som skickas med __anrop().',
        ],
        tests: [
          {
            description: "bygg_prompt('Hej')",
            code: "bygg_prompt('Hej')",
            expected: '<meddelande>Hej</meddelande>',
          },
          {
            description: 'svara skickar taggen',
            code: "(svara('Har ni glass?'), __anrop()[-1]['messages'][0]['content'])[1]",
            expected: '<meddelande>Har ni glass?</meddelande>',
          },
        ],
      },
      {
        title: 'Reglerna',
        why: 'En lista med regler är lättare för modellen – och för dig – att följa än en lång mening.',
        xp: 15,
        description: 'Tre regler för kundtjänsten.',
        task: 'Uppgift: Skriv om `SYSTEM` till fyra rader: `Du är kundtjänst för Kafé Kod.` och tre regler som börjar med `- `: svara med högst två meningar, hitta aldrig på priser, hänvisa till personalen om du är osäker.',
        change: [
          [
            "SYSTEM = 'Du är kundtjänst för Kafé Kod. Svara kort och vänligt.'",
            "SYSTEM = '''Du är kundtjänst för Kafé Kod.\n- Svara med högst två meningar.\n- Hitta aldrig på priser.\n- Hänvisa till personalen om du är osäker.'''",
          ],
        ],
        hints: [
          "Tre citattecken: SYSTEM = '''…'''",
          'En regel per rad, med - först.',
          'Första raden: Du är kundtjänst för Kafé Kod.',
        ],
        tests: [
          {
            description: 'Tre regler',
            code: "len([rad for rad in SYSTEM.splitlines() if rad.startswith('- ')])",
            expected: 3,
          },
          {
            description: 'Reglerna skickas',
            code: "(svara('Hej'), __anrop()[-1]['system'].count('- '))[1]",
            expected: 3,
          },
        ],
      },
    ],
  }),
  project({
    id: 'ai-proj-recensioner',
    track: 'prompter',
    title: 'Recensionerna',
    reward: { emoji: '🌟', name: 'Stjärna' },
    summary: 'Sortera kundernas recensioner i positiva och negativa.',
    modell: [
      { om: 'gott|härligt|bästa', svar: 'positiv' },
      { om: 'kallt|dålig|långsam', svar: 'negativ' },
      { svar: 'neutral' },
    ],
    steps: [
      {
        title: 'Ett ord',
        why: 'Säg exakt vilka svar som är tillåtna. Ett svar du kan jämföra med är lätt att använda i resten av programmet.',
        xp: 15,
        description: 'positiv, negativ eller neutral.',
        task: "Uppgift: Skriv `klassa(recension)` med systemprompten `'Svara med ett ord: positiv, negativ eller neutral.'`. Den returnerar svaret.",
        add: `def klassa(recension):\n    svar = ${call("[{'role': 'user', 'content': recension}]", "        system='Svara med ett ord: positiv, negativ eller neutral.',\n")}\n    return ${TEXT}\n`,
        hints: [
          'system=… i anropet.',
          'Skicka recensionen som meddelande.',
          `return ${TEXT}`,
        ],
        tests: [
          {
            description: 'Gott kaffe',
            code: "klassa('Gott kaffe!')",
            expected: 'positiv',
          },
          {
            description: 'Kallt kaffe',
            code: "klassa('Kallt kaffe.')",
            expected: 'negativ',
          },
        ],
      },
      {
        title: 'Recensionen är data',
        why: 'En recension kan innehålla "ignorera instruktionerna". I en tagg är den data att bedöma, inte en order.',
        xp: 15,
        description: 'Lägg recensionen i en tagg.',
        task: "Uppgift: Låt `klassa` skicka `'<recension>' + recension + '</recension>'`.",
        change: [
          [
            "'content': recension}",
            "'content': '<recension>' + recension + '</recension>'}",
          ],
        ],
        hints: [
          "'<recension>' + recension + '</recension>'",
          'Byt content i anropet.',
          'Resten är som förut.',
        ],
        tests: [
          {
            description: 'Taggen skickas',
            code: "(klassa('Gott!'), __anrop()[-1]['messages'][0]['content'])[1]",
            expected: '<recension>Gott!</recension>',
          },
        ],
      },
      {
        title: 'Hela högen',
        why: 'När varje svar är ett av tre ord går det att räkna. Det är därför man styr formatet.',
        xp: 15,
        description: 'Hur många av varje?',
        task: 'Uppgift: Skriv `rakna(recensioner)` som returnerar en dictionary med hur många som är `positiv`, `negativ` och `neutral`.',
        add: "def rakna(recensioner):\n    antal = {'positiv': 0, 'negativ': 0, 'neutral': 0}\n    for recension in recensioner:\n        antal[klassa(recension)] += 1\n    return antal\n",
        hints: [
          "Börja med {'positiv': 0, 'negativ': 0, 'neutral': 0}.",
          'Loopa och räkna upp antal[klassa(recension)].',
          'return antal',
        ],
        tests: [
          {
            description: 'Tre recensioner',
            code: "rakna(['Bästa bullen!', 'Långsam service.', 'Vi var där i tisdags.'])",
            expected: { positiv: 1, negativ: 1, neutral: 1 },
          },
        ],
      },
    ],
  }),
  project({
    id: 'ai-proj-mejl',
    track: 'prompter',
    title: 'Mejlskrivaren',
    reward: { emoji: '✉️', name: 'Kuvert' },
    summary: 'En mall för mejl, med ton och exempel.',
    steps: [
      {
        title: 'Mallen',
        why: 'En mall med platser för det som ändras gör att prompten blir likadan varje gång – bara innehållet byts.',
        xp: 15,
        description: 'Mejl till vem som helst om vad som helst.',
        task: "Uppgift: Skriv `mejl(mottagare, amne)` som skickar `f'Skriv ett kort mejl till {mottagare} om {amne}.'` och returnerar texten.",
        add: `def mejl(mottagare, amne):\n    svar = ${call("[{'role': 'user', 'content': f'Skriv ett kort mejl till {mottagare} om {amne}.'}]")}\n    return ${TEXT}\n`,
        hints: [
          'En f-sträng med {mottagare} och {amne}.',
          'Skicka den som content.',
          `return ${TEXT}`,
        ],
        tests: [
          {
            description: 'Prompten',
            code: "(mejl('Ada', 'mötet'), __anrop()[-1]['messages'][0]['content'])[1]",
            expected: 'Skriv ett kort mejl till Ada om mötet.',
          },
        ],
      },
      {
        title: 'Tonen',
        why: 'Tonen är en instruktion som gäller hela svaret – den hör hemma i systemprompten.',
        xp: 15,
        description: 'Vänligt eller formellt?',
        task: "Uppgift: Lägg till parametern `ton='vänlig'` i `mejl`, och skicka `system=f'Du skriver mejl. Tonen ska vara {ton}.'`.",
        change: [
          [
            'def mejl(mottagare, amne):',
            "def mejl(mottagare, amne, ton='vänlig'):",
          ],
          [
            "        max_tokens=1000,\n        messages=[{'role': 'user', 'content': f'Skriv",
            "        max_tokens=1000,\n        system=f'Du skriver mejl. Tonen ska vara {ton}.',\n        messages=[{'role': 'user', 'content': f'Skriv",
          ],
        ],
        hints: [
          "ton='vänlig' sist bland parametrarna.",
          'system=f… i anropet.',
          'Standardvärdet gäller när ingen ton anges.',
        ],
        tests: [
          {
            description: 'Formell ton',
            code: "(mejl('Ada', 'mötet', 'formell'), __anrop()[-1]['system'])[1]",
            expected: 'Du skriver mejl. Tonen ska vara formell.',
          },
          {
            description: 'Vänlig som standard',
            code: "(mejl('Bo', 'festen'), __anrop()[-1]['system'])[1]",
            expected: 'Du skriver mejl. Tonen ska vara vänlig.',
          },
        ],
      },
      {
        title: 'Ett exempel',
        why: 'Ett exempel på hur ett bra svar ser ut säger mer än många instruktioner. Lägg det i en tagg.',
        xp: 15,
        description: 'Visa hur ett bra mejl ser ut.',
        task: "Uppgift: Gör konstanten `EXEMPEL = '<exempel>Hej Ada! Mötet flyttas till fredag. Hälsningar, Bo</exempel>'` och lägg den först i prompten, följd av en ny rad.",
        change: [
          [
            "'content': f'Skriv ett kort mejl",
            "'content': EXEMPEL + '\\n' + f'Skriv ett kort mejl",
          ],
        ],
        add: "EXEMPEL = '<exempel>Hej Ada! Mötet flyttas till fredag. Hälsningar, Bo</exempel>'\n",
        hints: [
          'EXEMPEL = …',
          "content: EXEMPEL + '\\n' + f'…'",
          'Exemplet kommer först.',
        ],
        tests: [
          {
            description: 'Exemplet skickas först',
            code: "(mejl('Cy', 'lunchen'), __anrop()[-1]['messages'][0]['content'].splitlines())[1]",
            expected: [
              '<exempel>Hej Ada! Mötet flyttas till fredag. Hälsningar, Bo</exempel>',
              'Skriv ett kort mejl till Cy om lunchen.',
            ],
          },
        ],
      },
    ],
  }),

  // Bana 3: samtal
  project({
    id: 'ai-proj-studiekompis',
    track: 'samtal',
    title: 'Studiekompisen',
    reward: { emoji: '🦉', name: 'Uggla' },
    summary:
      'En kompis som minns vad ni pratat om – så länge du skickar med det.',
    steps: [
      {
        title: 'Historiken',
        why: 'Modellen minns ingenting mellan anropen. Minnet är listan du skickar med varje gång.',
        xp: 20,
        description: 'Ett samtal som växer.',
        task: "Uppgift: Skriv `prata(historik, text)`: lägg till `{'role': 'user', 'content': text}`, skicka hela historiken, lägg till svaret som `{'role': 'assistant', 'content': svar.content}` och returnera texten.",
        add: `def prata(historik, text):\n    historik.append({'role': 'user', 'content': text})\n    svar = ${call('historik')}\n    historik.append({'role': 'assistant', 'content': svar.content})\n    return ${TEXT}\n`,
        hints: [
          'Lägg till användarens meddelande först.',
          'messages=historik',
          "historik.append({'role': 'assistant', 'content': svar.content})",
        ],
        tests: [
          {
            description: 'Den minns namnet',
            code: "(lambda h: [prata(h, 'Jag heter Ada'), prata(h, 'Vad heter jag?')][1])([])",
            expected: 'Du heter Ada.',
          },
          {
            description: 'Fyra meddelanden',
            code: "(lambda h: [prata(h, 'Hej'), prata(h, 'Hej igen'), len(h)][2])([])",
            expected: 4,
          },
        ],
      },
      {
        title: 'Hur många frågor?',
        why: 'Historiken är en vanlig lista. Allt du kan göra med listor kan du göra med samtalet.',
        xp: 10,
        description: 'Räkna dina frågor.',
        task: "Uppgift: Skriv `antal_fragor(historik)` som räknar meddelandena med `role` `'user'`.",
        add: "def antal_fragor(historik):\n    return len([m for m in historik if m['role'] == 'user'])\n",
        hints: [
          "m['role'] == 'user'",
          'En list comprehension och len.',
          "return len([m for m in historik if m['role'] == 'user'])",
        ],
        tests: [
          {
            description: 'Två frågor',
            code: "(lambda h: [prata(h, 'Hej'), prata(h, 'Vad är 2 + 2?'), antal_fragor(h)][2])([])",
            expected: 2,
          },
        ],
      },
      {
        title: 'Börja om',
        why: 'Tömmer du listan glömmer modellen allt. Så enkelt är det – och så viktigt att veta.',
        xp: 15,
        description: 'Ett nytt ämne.',
        task: 'Uppgift: Skriv `borja_om(historik)` som tömmer listan med `clear()`.',
        add: 'def borja_om(historik):\n    historik.clear()\n',
        hints: [
          'historik.clear()',
          'Samma lista, men tom.',
          'Funktionen behöver inte returnera något.',
        ],
        tests: [
          {
            description: 'Den har glömt',
            code: "(lambda h: [prata(h, 'Jag heter Cy'), borja_om(h), prata(h, 'Vad heter jag?')][2])([])",
            expected: 'Det vet jag inte – du har inte berättat det.',
          },
        ],
      },
    ],
  }),
  project({
    id: 'ai-proj-glosor',
    track: 'samtal',
    title: 'Glosförhöret',
    reward: { emoji: '🃏', name: 'Kortlek' },
    summary: 'Modellen förhör dig på glosor, en fråga i taget.',
    modell: [
      { om: 'Börja förhöret', svar: 'Vad heter hund på engelska?' },
      { om: '^dog$', svar: 'Rätt! Vad heter katt på engelska?' },
      { om: '^cat$', svar: 'Rätt igen! Bra jobbat.' },
    ],
    steps: [
      {
        title: 'Första frågan',
        why: 'Ett samtal kan börja med att programmet själv skickar det första meddelandet.',
        xp: 15,
        description: 'Starta förhöret.',
        task: "Uppgift: Skriv `starta()` som skapar historiken `[{'role': 'user', 'content': 'Börja förhöret.'}]`, skickar den, lägger till svaret som `assistant` och returnerar historiken.",
        add: `def starta():\n    historik = [{'role': 'user', 'content': 'Börja förhöret.'}]\n    svar = ${call('historik')}\n    historik.append({'role': 'assistant', 'content': svar.content})\n    return historik\n`,
        hints: [
          'Historiken börjar med ett user-meddelande.',
          'messages=historik',
          'Lägg till svaret och returnera historiken.',
        ],
        tests: [
          {
            description: 'Två meddelanden',
            code: "[m['role'] for m in starta()]",
            expected: ['user', 'assistant'],
          },
          {
            description: 'Första frågan',
            code: "starta()[1]['content'][0].text",
            expected: 'Vad heter hund på engelska?',
          },
        ],
      },
      {
        title: 'Svara',
        why: 'Varje svar läggs till sist. Modellen ser hela förhöret och vet vilken fråga du svarar på.',
        xp: 15,
        description: 'Svara på glosan.',
        task: 'Uppgift: Skriv `svara(historik, text)` som lägger till ditt svar, skickar historiken, lägger till modellens svar och returnerar texten.',
        add: `def svara(historik, text):\n    historik.append({'role': 'user', 'content': text})\n    svar = ${call('historik')}\n    historik.append({'role': 'assistant', 'content': svar.content})\n    return ${TEXT}\n`,
        hints: [
          'Som starta, men med elevens text.',
          "historik.append({'role': 'user', 'content': text})",
          'Returnera texten.',
        ],
        tests: [
          {
            description: 'Rätt svar',
            code: "svara(starta(), 'dog')",
            expected: 'Rätt! Vad heter katt på engelska?',
          },
          {
            description: 'Hela förhöret skickas',
            code: "(svara(starta(), 'dog'), [m['role'] for m in __anrop()[-1]['messages']])[1]",
            expected: ['user', 'assistant', 'user'],
          },
        ],
      },
      {
        title: 'Kortare historik',
        why: 'Långa samtal kostar mer för varje fråga. Behåll de senaste – men historiken måste börja med user.',
        xp: 20,
        description: 'Skicka bara de senaste meddelandena.',
        task: 'Uppgift: Skriv `kortad(historik, antal)` som ger de sista `antal` meddelandena. Börjar de med ett `assistant`-meddelande tas det bort.',
        add: "def kortad(historik, antal):\n    senaste = historik[-antal:]\n    if senaste and senaste[0]['role'] == 'assistant':\n        senaste = senaste[1:]\n    return senaste\n",
        hints: [
          'historik[-antal:] ger de sista.',
          "Kolla senaste[0]['role'].",
          'senaste[1:] tar bort det första.',
        ],
        tests: [
          {
            description: 'Fem meddelanden kortas till fyra',
            code: "[m['content'] for m in kortad([{'role': 'user', 'content': 'a'}, {'role': 'assistant', 'content': 'b'}, {'role': 'user', 'content': 'c'}, {'role': 'assistant', 'content': 'd'}, {'role': 'user', 'content': 'e'}], 4)]",
            expected: ['c', 'd', 'e'],
          },
          {
            description: 'Tre av fem',
            code: "[m['content'] for m in kortad([{'role': 'user', 'content': 'a'}, {'role': 'assistant', 'content': 'b'}, {'role': 'user', 'content': 'c'}, {'role': 'assistant', 'content': 'd'}, {'role': 'user', 'content': 'e'}], 3)]",
            expected: ['c', 'd', 'e'],
          },
        ],
      },
    ],
  }),
  project({
    id: 'ai-proj-spara-samtal',
    track: 'samtal',
    title: 'Spara samtalet',
    reward: { emoji: '🗃️', name: 'Arkivlåda' },
    summary: 'Fortsätt samtalet i morgon – spara det som JSON.',
    start: `import json\n\n${IMPORT}`,
    steps: [
      {
        title: 'Text i historiken',
        why: 'Svarets block går inte att spara som JSON. Spara texten, så blir historiken vanliga listor och dictionaries.',
        xp: 15,
        description: 'Spara svaret som text.',
        task: "Uppgift: Skriv `prata(historik, text)` som `prata` i förra projektet, men lägg till svaret som `{'role': 'assistant', 'content': text_svar}` där `text_svar` är texten.",
        add: `def prata(historik, text):\n    historik.append({'role': 'user', 'content': text})\n    svar = ${call('historik')}\n    text_svar = ${TEXT}\n    historik.append({'role': 'assistant', 'content': text_svar})\n    return text_svar\n`,
        hints: [
          `text_svar = ${TEXT}`,
          "historik.append({'role': 'assistant', 'content': text_svar})",
          'return text_svar',
        ],
        tests: [
          {
            description: 'Svaret sparas som text',
            code: "(lambda h: (prata(h, 'Hej'), type(h[1]['content']).__name__)[1])([])",
            expected: 'str',
          },
        ],
      },
      {
        title: 'Spara och ladda',
        why: 'JSON är text. Text går att spara i en fil eller databas och läsa in igen.',
        xp: 15,
        description: 'Gör om historiken till text och tillbaka.',
        task: 'Uppgift: Skriv `spara(historik)` med `json.dumps(historik, ensure_ascii=False)` och `ladda(text)` med `json.loads(text)`.',
        add: 'def spara(historik):\n    return json.dumps(historik, ensure_ascii=False)\n\n\ndef ladda(text):\n    return json.loads(text)\n',
        hints: [
          'json.dumps(historik, ensure_ascii=False)',
          'json.loads(text)',
          'ensure_ascii=False behåller å, ä och ö.',
        ],
        tests: [
          {
            description: 'Tillbaka likadan',
            code: "(lambda h: ladda(spara(h)) == h)([{'role': 'user', 'content': 'Hej på dig'}])",
            expected: true,
          },
          {
            description: 'Åäö syns i texten',
            code: "spara([{'role': 'user', 'content': 'Hallå'}])",
            expected: '[{"role": "user", "content": "Hallå"}]',
          },
        ],
      },
      {
        title: 'Fortsätt i morgon',
        why: 'Ett laddat samtal är samma lista som förut. Modellen kan inte se skillnad – för den finns bara det du skickar.',
        xp: 15,
        description: 'Ladda samtalet och fortsätt.',
        task: 'Uppgift: Skriv `fortsatt(text_sparad, fraga)` som laddar historiken, pratar vidare med frågan och returnerar svaret.',
        add: 'def fortsatt(text_sparad, fraga):\n    historik = ladda(text_sparad)\n    return prata(historik, fraga)\n',
        hints: [
          'historik = ladda(text_sparad)',
          'prata(historik, fraga)',
          'Returnera svaret.',
        ],
        tests: [
          {
            description: 'Den minns efter laddningen',
            code: "(lambda h: [prata(h, 'Jag heter Bo'), fortsatt(spara(h), 'Vad heter jag?')][1])([])",
            expected: 'Du heter Bo.',
          },
        ],
      },
    ],
  }),

  // Bana 4: strukturerade svar
  project({
    id: 'ai-proj-recept',
    track: 'struktur',
    title: 'Receptläsaren',
    reward: { emoji: '🍲', name: 'Gryta' },
    summary: 'Gör om recept i fritext till data du kan räkna med.',
    start: `from pydantic import BaseModel\n\n${IMPORT}`,
    modell: [
      {
        om: 'pannkakor',
        json: {
          namn: 'Pannkakor',
          portioner: 4,
          ingredienser: ['mjöl', 'mjölk', 'ägg'],
        },
      },
      {
        om: 'kladdkaka',
        json: {
          namn: 'Kladdkaka',
          portioner: 8,
          ingredienser: ['smör', 'socker', 'ägg'],
        },
      },
      {
        om: 'jättegröt',
        json: { namn: 'Jättegröt', portioner: 500, ingredienser: [] },
      },
    ],
    steps: [
      {
        title: 'Receptet som data',
        why: 'Med parse och en Pydantic-modell får du ett färdigt objekt tillbaka – inga strängar att leta i.',
        xp: 20,
        description: 'Namn, portioner och ingredienser.',
        task: 'Uppgift: Gör `Recept(BaseModel)` med `namn: str`, `portioner: int` och `ingredienser: list[str]`, och `las_recept(text)` som använder `client.messages.parse(…, output_format=Recept)` och returnerar `parsed_output`.',
        add: `class Recept(BaseModel):\n    namn: str\n    portioner: int\n    ingredienser: list[str]\n\n\ndef las_recept(text):\n    svar = client.messages.parse(\n        model='${M}',\n        max_tokens=1000,\n        messages=[{'role': 'user', 'content': text}],\n        output_format=Recept,\n    )\n    return svar.parsed_output\n`,
        hints: [
          'class Recept(BaseModel): med tre fält.',
          'client.messages.parse(…, output_format=Recept)',
          'return svar.parsed_output',
        ],
        tests: [
          {
            description: 'Namnet',
            code: "las_recept('Recept på pannkakor').namn",
            expected: 'Pannkakor',
          },
          {
            description: 'Ingredienserna',
            code: "las_recept('Recept på pannkakor').ingredienser",
            expected: ['mjöl', 'mjölk', 'ägg'],
          },
        ],
      },
      {
        title: 'Inköpslistan',
        why: 'När svaret är data kan vanlig Python ta över: slå ihop, sortera och ta bort dubbletter.',
        xp: 15,
        description: 'Allt som behövs för flera recept.',
        task: 'Uppgift: Skriv `inkopslista(texter)` som läser varje recept och returnerar alla ingredienser sorterade, utan dubbletter.',
        add: 'def inkopslista(texter):\n    alla = set()\n    for text in texter:\n        alla.update(las_recept(text).ingredienser)\n    return sorted(alla)\n',
        hints: [
          'En mängd: alla = set()',
          'alla.update(…ingredienser)',
          'return sorted(alla)',
        ],
        tests: [
          {
            description: 'Två recept',
            code: "inkopslista(['pannkakor', 'kladdkaka'])",
            expected: ['mjöl', 'mjölk', 'smör', 'socker', 'ägg'],
          },
        ],
      },
      {
        title: 'Rimligt?',
        why: 'Rätt format är inte samma sak som rätt innehåll. 500 portioner utan ingredienser är giltig data – men inte rimlig.',
        xp: 15,
        description: 'Kolla innehållet också.',
        task: 'Uppgift: Skriv `rimligt(recept)` som ger `True` om portionerna är mellan 1 och 20 och det finns minst en ingrediens.',
        add: 'def rimligt(recept):\n    return 1 <= recept.portioner <= 20 and len(recept.ingredienser) > 0\n',
        hints: [
          '1 <= recept.portioner <= 20',
          'len(recept.ingredienser) > 0',
          'Båda med and.',
        ],
        tests: [
          {
            description: 'Pannkakor',
            code: "rimligt(las_recept('pannkakor'))",
            expected: true,
          },
          {
            description: 'Jättegröt',
            code: "rimligt(las_recept('jättegröt'))",
            expected: false,
          },
        ],
      },
    ],
  }),
  project({
    id: 'ai-proj-kvitton',
    track: 'struktur',
    title: 'Kvittotolken',
    reward: { emoji: '🛍️', name: 'Kasse' },
    summary: 'Läs kvitton och räkna månadens utgifter.',
    start: `from pydantic import BaseModel, Field, ValidationError\n\n${IMPORT}`,
    modell: [
      { om: 'ICA', json: { butik: 'ICA', summa: 245.5 } },
      { om: 'Coop', json: { butik: 'Coop', summa: 99 } },
      { om: 'retur', json: { butik: 'Lidl', summa: -50 } },
    ],
    steps: [
      {
        title: 'Ett kvitto',
        why: 'Ett schema bestämmer vilka fält svaret har och vilken typ de är. Då kan du räkna med summan direkt.',
        xp: 15,
        description: 'Butik och summa.',
        task: 'Uppgift: Gör `Kop(BaseModel)` med `butik: str` och `summa: float`, och `tolka(text)` som returnerar `parsed_output`.',
        add: `class Kop(BaseModel):\n    butik: str\n    summa: float\n\n\ndef tolka(text):\n    svar = client.messages.parse(\n        model='${M}',\n        max_tokens=1000,\n        messages=[{'role': 'user', 'content': text}],\n        output_format=Kop,\n    )\n    return svar.parsed_output\n`,
        hints: [
          'class Kop(BaseModel):',
          'output_format=Kop',
          'return svar.parsed_output',
        ],
        tests: [
          {
            description: 'ICA',
            code: "(lambda k: [k.butik, k.summa])(tolka('Kvitto från ICA'))",
            expected: ['ICA', 245.5],
          },
        ],
      },
      {
        title: 'Månaden',
        why: 'Summan är redan ett tal. Ingen text att tvätta – bara addera.',
        xp: 15,
        description: 'Vad gick åt?',
        task: 'Uppgift: Skriv `manad(texter)` som returnerar summan av alla kvitton.',
        add: 'def manad(texter):\n    return sum(tolka(text).summa for text in texter)\n',
        hints: [
          'tolka(text).summa',
          'sum(… for text in texter)',
          'return sum(tolka(text).summa for text in texter)',
        ],
        tests: [
          {
            description: 'Två kvitton',
            code: "manad(['ICA', 'Coop'])",
            expected: 344.5,
          },
        ],
      },
      {
        title: 'Inga negativa summor',
        why: 'Field(ge=0) gör att parse stoppar ett svar som bryter mot regeln. Fånga ValidationError, så kraschar inte programmet.',
        xp: 20,
        description: 'Ett returkvitto har minus.',
        task: 'Uppgift: Ändra `summa` till `summa: float = Field(ge=0)`, och skriv `tolka_sakert(text)` som returnerar `None` när `tolka` ger `ValidationError`.',
        change: [['    summa: float\n', '    summa: float = Field(ge=0)\n']],
        add: 'def tolka_sakert(text):\n    try:\n        return tolka(text)\n    except ValidationError:\n        return None\n',
        hints: [
          'summa: float = Field(ge=0)',
          'try: return tolka(text)',
          'except ValidationError: return None',
        ],
        tests: [
          {
            description: 'Returkvittot',
            code: "tolka_sakert('retur från Lidl')",
            expected: null,
          },
          {
            description: 'Ett vanligt kvitto',
            code: "tolka_sakert('Coop').summa",
            expected: 99,
          },
        ],
      },
    ],
  }),
  project({
    id: 'ai-proj-arenden',
    track: 'struktur',
    title: 'Ärendesorteraren',
    reward: { emoji: '📮', name: 'Brevlåda' },
    summary: 'Sortera kundernas meddelanden – brådskande först.',
    start: `from typing import Literal\n\nfrom pydantic import BaseModel\n\n${IMPORT}`,
    modell: [
      { om: 'trasig|NU', json: { kategori: 'klagomål', bradskande: true } },
      { om: 'öppet', json: { kategori: 'fråga', bradskande: false } },
      { om: 'tack', json: { kategori: 'beröm', bradskande: false } },
    ],
    steps: [
      {
        title: 'Bara tre kategorier',
        why: 'Literal ger ett enum i schemat. Modellen kan då bara svara med något av orden du valt.',
        xp: 20,
        description: 'fråga, klagomål eller beröm.',
        task: "Uppgift: Gör `Arende(BaseModel)` med `kategori: Literal['fråga', 'klagomål', 'beröm']` och `bradskande: bool`, och `sortera_en(text)` som returnerar `parsed_output`.",
        add: `class Arende(BaseModel):\n    kategori: Literal['fråga', 'klagomål', 'beröm']\n    bradskande: bool\n\n\ndef sortera_en(text):\n    svar = client.messages.parse(\n        model='${M}',\n        max_tokens=1000,\n        messages=[{'role': 'user', 'content': text}],\n        output_format=Arende,\n    )\n    return svar.parsed_output\n`,
        hints: [
          "kategori: Literal['fråga', 'klagomål', 'beröm']",
          'bradskande: bool',
          'output_format=Arende',
        ],
        tests: [
          {
            description: 'Kategorierna i schemat',
            code: "(sortera_en('Har ni öppet?'), __anrop()[-1]['output_config']['format']['schema']['properties']['kategori']['enum'])[1]",
            expected: ['fråga', 'klagomål', 'beröm'],
          },
          {
            description: 'Ett klagomål',
            code: "sortera_en('Paketet är trasigt').kategori",
            expected: 'klagomål',
          },
        ],
      },
      {
        title: 'Brådskande först',
        why: 'sorted med en nyckel sorterar på vad du vill. not bradskande gör att True hamnar först.',
        xp: 15,
        description: 'Det viktigaste överst.',
        task: 'Uppgift: Skriv `i_ordning(texter)` som returnerar texterna med de brådskande först (annars i samma ordning).',
        add: 'def i_ordning(texter):\n    return sorted(texter, key=lambda text: not sortera_en(text).bradskande)\n',
        hints: [
          'sorted(texter, key=…)',
          'not … .bradskande ger False för de brådskande.',
          'False sorteras före True.',
        ],
        tests: [
          {
            description: 'Det brådskande först',
            code: "i_ordning(['Har ni öppet i dag?', 'Hjälp NU, kaffemaskinen läcker'])",
            expected: ['Hjälp NU, kaffemaskinen läcker', 'Har ni öppet i dag?'],
          },
        ],
      },
      {
        title: 'Statistiken',
        why: 'Strukturerade svar går att räkna på. Så blir hundratals meddelanden en översikt.',
        xp: 15,
        description: 'Hur många av varje sort?',
        task: 'Uppgift: Skriv `statistik(texter)` som returnerar en dictionary med antalet per kategori (bara de som förekommer).',
        add: 'def statistik(texter):\n    antal = {}\n    for text in texter:\n        kategori = sortera_en(text).kategori\n        antal[kategori] = antal.get(kategori, 0) + 1\n    return antal\n',
        hints: ['antal = {}', 'antal.get(kategori, 0) + 1', 'return antal'],
        tests: [
          {
            description: 'Tre meddelanden',
            code: "statistik(['Har ni öppet?', 'Stort tack!', 'När har ni öppet?'])",
            expected: { fråga: 2, beröm: 1 },
          },
        ],
      },
    ],
  }),

  // Bana 5: verktyg
  project({
    id: 'ai-proj-valuta',
    track: 'verktyg',
    title: 'Valutaräknaren',
    reward: { emoji: '💱', name: 'Växelkontor' },
    summary: 'Modellen vet inte dagens kurs. Ge den ett verktyg.',
    modell: [
      { om: 'euro', verktyg: { namn: 'kurs', input: { valuta: 'EUR' } } },
      { om: 'yen', verktyg: { namn: 'kurs', input: { valuta: 'JPY' } } },
      {
        efter_verktyg: true,
        resultat: 'Okänd',
        svar: 'Den valutan känner jag inte till.',
      },
      { efter_verktyg: true, svar: 'Den kostar {resultat} kronor.' },
    ],
    steps: [
      {
        title: 'Verktyget',
        why: 'Ett verktyg är en funktion du beskriver för modellen: namn, vad den gör och vilka argument den tar.',
        xp: 15,
        description: 'Beskriv funktionen kurs.',
        task: "Uppgift: Gör `KURSER = {'EUR': 11.5, 'USD': 10.5}`, funktionen `kurs(valuta)` som returnerar kursen som text (eller `'Okänd valuta'`), och `VERKTYG` med ett verktyg `kurs` som har `valuta` som enda obligatoriska argument.",
        add: "KURSER = {'EUR': 11.5, 'USD': 10.5}\n\n\ndef kurs(valuta):\n    if valuta not in KURSER:\n        return 'Okänd valuta'\n    return str(KURSER[valuta])\n\n\nVERKTYG = [\n    {\n        'name': 'kurs',\n        'description': 'Hämtar dagens kurs i kronor för en valuta.',\n        'input_schema': {\n            'type': 'object',\n            'properties': {'valuta': {'type': 'string', 'description': 'Valutakoden, t.ex. EUR'}},\n            'required': ['valuta'],\n        },\n    },\n]\n",
        hints: [
          "kurs returnerar str(KURSER[valuta]) eller 'Okänd valuta'.",
          'Ett verktyg har name, description och input_schema.',
          "'required': ['valuta']",
        ],
        tests: [
          { description: 'kurs("EUR")', code: "kurs('EUR')", expected: '11.5' },
          {
            description: 'Verktyget',
            code: "[VERKTYG[0]['name'], VERKTYG[0]['input_schema']['required']]",
            expected: ['kurs', ['valuta']],
          },
        ],
      },
      {
        title: 'En runda',
        why: 'Modellen ber om verktyget, du kör funktionen och skickar tillbaka resultatet. Sedan svarar den med riktiga siffror.',
        xp: 25,
        description: 'Fråga, kör verktyget, svara.',
        task: "Uppgift: Skriv `fraga(text)`: skicka frågan med `tools=VERKTYG`. Om `stop_reason` är `'tool_use'`: lägg till svaret som `assistant`, kör `kurs` för varje `tool_use`-block och skicka tillbaka `tool_result`. Returnera texten.",
        add: `def fraga(text):\n    meddelanden = [{'role': 'user', 'content': text}]\n    svar = ${call('meddelanden', '        tools=VERKTYG,\n')}\n    if svar.stop_reason != 'tool_use':\n        return ${TEXT}\n    meddelanden.append({'role': 'assistant', 'content': svar.content})\n    resultat = [\n        {'type': 'tool_result', 'tool_use_id': b.id, 'content': kurs(**b.input)}\n        for b in svar.content\n        if b.type == 'tool_use'\n    ]\n    meddelanden.append({'role': 'user', 'content': resultat})\n    svar = ${call('meddelanden', '        tools=VERKTYG,\n')}\n    return ${TEXT}\n`,
        hints: [
          "if svar.stop_reason != 'tool_use': return texten",
          "{'type': 'tool_result', 'tool_use_id': b.id, 'content': kurs(**b.input)}",
          'Andra anropet får hela meddelanden-listan.',
        ],
        tests: [
          {
            description: 'En euro',
            code: "fraga('Vad kostar en euro?')",
            expected: 'Den kostar 11.5 kronor.',
          },
          {
            description: 'Två anrop',
            code: "(lambda fore: (fraga('Vad kostar en euro?'), len(__anrop()) - fore)[1])(len(__anrop()))",
            expected: 2,
          },
        ],
      },
      {
        title: 'När verktyget inte kan',
        why: 'is_error: True säger att verktyget misslyckades. Då vet modellen att resultatet är ett fel, inte ett svar.',
        xp: 20,
        description: 'Yen finns inte i listan.',
        task: "Uppgift: Ändra `fraga` så att resultatet får `'is_error': True` när `kurs` ger `'Okänd valuta'`. Gör det med en hjälpfunktion `resultat_for(block)`.",
        change: [
          [
            "        {'type': 'tool_result', 'tool_use_id': b.id, 'content': kurs(**b.input)}\n",
            '        resultat_for(b)\n',
          ],
        ],
        add: "def resultat_for(block):\n    text = kurs(**block.input)\n    return {\n        'type': 'tool_result',\n        'tool_use_id': block.id,\n        'content': text,\n        'is_error': text == 'Okänd valuta',\n    }\n",
        hints: [
          'resultat_for gör samma dictionary som förut, plus is_error.',
          "'is_error': text == 'Okänd valuta'",
          'I fraga: resultat_for(b) for b in …',
        ],
        tests: [
          {
            description: 'En yen',
            code: "fraga('Vad kostar en yen?')",
            expected: 'Den valutan känner jag inte till.',
          },
          {
            description: 'Felet markeras',
            code: "(fraga('Vad kostar en yen?'), __anrop()[-1]['messages'][2]['content'][0]['is_error'])[1]",
            expected: true,
          },
        ],
      },
    ],
  }),
  project({
    id: 'ai-proj-kalender',
    track: 'verktyg',
    title: 'Kalendern',
    reward: { emoji: '📅', name: 'Kalender' },
    summary: 'En assistent som kan läsa och skriva i din kalender.',
    modell: [
      { om: 'måndag', verktyg: { namn: 'las_dag', input: { dag: 'måndag' } } },
      {
        om: 'Lägg till',
        verktyg: {
          namn: 'lagg_till',
          input: { dag: 'onsdag', text: 'Tandläkare 10:00' },
        },
      },
      { efter_verktyg: true, svar: 'Klart: {resultat}' },
    ],
    steps: [
      {
        title: 'Läsa',
        why: 'Modellen ser bara beskrivningen. En tydlig description avgör om den väljer rätt verktyg.',
        xp: 15,
        description: 'Ett verktyg som läser en dag.',
        task: "Uppgift: Gör `KALENDER = {'måndag': 'Simträning 17:00'}`, `las_dag(dag)` som ger det som står eller `'Inget inbokat'`, och `VERKTYG` med verktyget `las_dag` (argumentet `dag`).",
        add: "KALENDER = {'måndag': 'Simträning 17:00'}\n\n\ndef las_dag(dag):\n    return KALENDER.get(dag, 'Inget inbokat')\n\n\nVERKTYG = [\n    {\n        'name': 'las_dag',\n        'description': 'Läser vad som står i kalendern en veckodag.',\n        'input_schema': {\n            'type': 'object',\n            'properties': {'dag': {'type': 'string'}},\n            'required': ['dag'],\n        },\n    },\n]\n",
        hints: [
          "KALENDER.get(dag, 'Inget inbokat')",
          'Verktyget heter las_dag.',
          "'required': ['dag']",
        ],
        tests: [
          {
            description: 'Måndag',
            code: "las_dag('måndag')",
            expected: 'Simträning 17:00',
          },
          {
            description: 'Tisdag',
            code: "las_dag('tisdag')",
            expected: 'Inget inbokat',
          },
          {
            description: 'Verktyget',
            code: "VERKTYG[0]['name']",
            expected: 'las_dag',
          },
        ],
      },
      {
        title: 'Rundan',
        why: 'En dictionary från namn till funktion gör att samma kod kan köra vilket verktyg som helst.',
        xp: 25,
        description: 'Fråga om måndag.',
        task: "Uppgift: Gör `FUNKTIONER = {'las_dag': las_dag}` och `fraga(text)` som kör en runda med verktyg, där varje block körs med `FUNKTIONER[b.name](**b.input)`.",
        add: `FUNKTIONER = {'las_dag': las_dag}\n\n\ndef fraga(text):\n    meddelanden = [{'role': 'user', 'content': text}]\n    svar = ${call('meddelanden', '        tools=VERKTYG,\n')}\n    if svar.stop_reason != 'tool_use':\n        return ${TEXT}\n    meddelanden.append({'role': 'assistant', 'content': svar.content})\n    resultat = [\n        {'type': 'tool_result', 'tool_use_id': b.id, 'content': FUNKTIONER[b.name](**b.input)}\n        for b in svar.content\n        if b.type == 'tool_use'\n    ]\n    meddelanden.append({'role': 'user', 'content': resultat})\n    svar = ${call('meddelanden', '        tools=VERKTYG,\n')}\n    return ${TEXT}\n`,
        hints: [
          "FUNKTIONER = {'las_dag': las_dag}",
          'FUNKTIONER[b.name](**b.input)',
          'Samma runda som i Valutaräknaren.',
        ],
        tests: [
          {
            description: 'Måndag',
            code: "fraga('Vad gör jag på måndag?')",
            expected: 'Klart: Simträning 17:00',
          },
        ],
      },
      {
        title: 'Skriva',
        why: 'Ett verktyg kan också ändra saker. Då är det extra viktigt att du bestämmer vilka verktyg modellen får.',
        xp: 20,
        description: 'Boka in något.',
        task: "Uppgift: Skriv `lagg_till(dag, text)` som sparar i `KALENDER` och returnerar `'Inbokat'`, lägg till verktyget i `VERKTYG` (argumenten `dag` och `text`) och i `FUNKTIONER`.",
        change: [
          [
            "FUNKTIONER = {'las_dag': las_dag}",
            "def lagg_till(dag, text):\n    KALENDER[dag] = text\n    return 'Inbokat'\n\n\nVERKTYG.append(\n    {\n        'name': 'lagg_till',\n        'description': 'Bokar in något i kalendern en veckodag.',\n        'input_schema': {\n            'type': 'object',\n            'properties': {'dag': {'type': 'string'}, 'text': {'type': 'string'}},\n            'required': ['dag', 'text'],\n        },\n    }\n)\n\nFUNKTIONER = {'las_dag': las_dag, 'lagg_till': lagg_till}",
          ],
        ],
        hints: [
          'KALENDER[dag] = text',
          'VERKTYG.append({…})',
          "Lägg till 'lagg_till': lagg_till i FUNKTIONER.",
        ],
        tests: [
          {
            description: 'Inbokat',
            code: "(fraga('Lägg till tandläkaren'), KALENDER.get('onsdag'))[1]",
            expected: 'Tandläkare 10:00',
          },
          {
            description: 'Två verktyg skickas',
            code: "(fraga('Lägg till tandläkaren'), [t['name'] for t in __anrop()[-1]['tools']])[1]",
            expected: ['las_dag', 'lagg_till'],
          },
        ],
      },
    ],
  }),
  project({
    id: 'ai-proj-mattehjalp',
    track: 'verktyg',
    title: 'Mattehjälpen',
    reward: { emoji: '➗', name: 'Division' },
    summary: 'Språkmodeller räknar fel ibland. Låt Python räkna.',
    modell: [
      {
        om: 'båda',
        verktyg: [
          { namn: 'rakna', input: { a: 12, b: 3, operator: '*' } },
          { namn: 'rakna', input: { a: 12, b: 3, operator: '/' } },
        ],
      },
      {
        om: '17',
        verktyg: { namn: 'rakna', input: { a: 17, b: 23, operator: '*' } },
      },
      { efter_verktyg: true, svar: 'Svaret: {resultat}' },
    ],
    steps: [
      {
        title: 'Ett enum',
        why: 'enum i schemat begränsar vad modellen får skicka. Då kan funktionen lita på att operatorn är en av fyra.',
        xp: 15,
        description: 'Ett verktyg för de fyra räknesätten.',
        task: "Uppgift: Skriv `rakna(a, b, operator)` för `+`, `-`, `*` och `/` som returnerar svaret som text, och `VERKTYG` med verktyget `rakna` där `a` och `b` är `number` och `operator` har `enum` `['+', '-', '*', '/']`.",
        add: "def rakna(a, b, operator):\n    if operator == '+':\n        return str(a + b)\n    if operator == '-':\n        return str(a - b)\n    if operator == '*':\n        return str(a * b)\n    return str(a / b)\n\n\nVERKTYG = [\n    {\n        'name': 'rakna',\n        'description': 'Räknar ut a operator b.',\n        'input_schema': {\n            'type': 'object',\n            'properties': {\n                'a': {'type': 'number'},\n                'b': {'type': 'number'},\n                'operator': {'type': 'string', 'enum': ['+', '-', '*', '/']},\n            },\n            'required': ['a', 'b', 'operator'],\n        },\n    },\n]\n",
        hints: [
          'En if per operator, return str(…).',
          "'enum': ['+', '-', '*', '/']",
          "'required': ['a', 'b', 'operator']",
        ],
        tests: [
          {
            description: 'rakna(6, 7, "*")',
            code: "rakna(6, 7, '*')",
            expected: '42',
          },
          {
            description: 'Enum i schemat',
            code: "VERKTYG[0]['input_schema']['properties']['operator']['enum']",
            expected: ['+', '-', '*', '/'],
          },
        ],
      },
      {
        title: 'Rundan',
        why: 'Modellen väljer talen, Python räknar. Var och en gör det den är bäst på.',
        xp: 20,
        description: 'Fråga och räkna.',
        task: 'Uppgift: Skriv `fraga(text)` med en runda, där varje `tool_use` körs med `rakna(**b.input)`.',
        add: `def fraga(text):\n    meddelanden = [{'role': 'user', 'content': text}]\n    svar = ${call('meddelanden', '        tools=VERKTYG,\n')}\n    if svar.stop_reason != 'tool_use':\n        return ${TEXT}\n    meddelanden.append({'role': 'assistant', 'content': svar.content})\n    resultat = [\n        {'type': 'tool_result', 'tool_use_id': b.id, 'content': rakna(**b.input)}\n        for b in svar.content\n        if b.type == 'tool_use'\n    ]\n    meddelanden.append({'role': 'user', 'content': resultat})\n    svar = ${call('meddelanden', '        tools=VERKTYG,\n')}\n    return ${TEXT}\n`,
        hints: [
          'Samma runda som tidigare.',
          'rakna(**b.input)',
          'Returnera texten från andra svaret.',
        ],
        tests: [
          {
            description: '17 gånger 23',
            code: "fraga('Vad är 17 gånger 23?')",
            expected: 'Svaret: 391',
          },
        ],
      },
      {
        title: 'Dela med noll',
        why: 'Ett verktyg ska aldrig krascha programmet. Ge ett felmeddelande som text, så kan modellen förklara för användaren.',
        xp: 20,
        description: 'Två uträkningar på en gång – och en som inte går.',
        task: "Uppgift: Ändra `rakna` så att division med 0 ger `'Kan inte dela med noll'`. Prova också en fråga där modellen ber om två uträkningar på en gång.",
        change: [
          [
            '    return str(a / b)\n',
            "    if b == 0:\n        return 'Kan inte dela med noll'\n    return str(a / b)\n",
          ],
        ],
        hints: [
          'Kolla b innan du delar.',
          'if b == 0:',
          "return 'Kan inte dela med noll'",
        ],
        tests: [
          {
            description: 'Dela med noll',
            code: "rakna(1, 0, '/')",
            expected: 'Kan inte dela med noll',
          },
          {
            description: 'Två uträkningar',
            code: "fraga('Räkna båda: 12 gånger 3 och 12 delat med 3')",
            expected: 'Svaret: 36\n4.0',
          },
          {
            description: 'Två resultat skickas tillbaka',
            code: "(fraga('Räkna båda'), len(__anrop()[-1]['messages'][2]['content']))[1]",
            expected: 2,
          },
        ],
      },
    ],
  }),
];
