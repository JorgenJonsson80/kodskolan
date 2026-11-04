// Förklarar på svenska vad som hände mellan två steg i Kör rad för rad,
// och vilken fråga eleven kan gissa på innan nästa steg. Allt räknas fram
// ur stegen från harness.py: variablerna, utskriften, flow (om ett villkor
// var sant och vilket varv en loop är på), call och returned.

const MAX_CHANGES = 4;

const depth = frame => frame.outer?.length ?? 0;

// Förra steget i samma anrop. Var steget innan inne i en annan funktion
// (eller i programmet runt om) ska variablerna jämföras med hur det såg
// ut här senast, inte med den andra funktionens variabler.
export function baselineFor(frames, index) {
  const frame = frames[index];
  for (let i = index - 1; i >= 0; i -= 1) {
    const earlier = frames[i];
    if (depth(earlier) < depth(frame)) return null;
    if (depth(earlier) === depth(frame) && earlier.call === frame.call) {
      return earlier;
    }
  }
  // Sista steget efter ett exempelanrop har inget program runt om att
  // jämföra med, och inget nytt har hänt där.
  return frame?.line === null ? frame : null;
}

// Steget går in i en funktion. Vid exempelanropet (koden består bara av
// funktioner) finns inget program runt om, så djupet är detsamma.
function entersCall(previous, frame) {
  if (previous.returned !== undefined) return false;
  return (
    depth(frame) > depth(previous) ||
    (frame.call != null && frame.call !== previous.call)
  );
}

export function changesBetween(baseline, frame) {
  const before = Object.fromEntries(baseline?.vars ?? []);
  return frame.vars
    .filter(([name, value]) => before[name] !== value)
    .map(([name, value]) => ({
      name,
      value,
      before: name in before ? before[name] : null,
    }));
}

const isDefinition = value => /^(funktion|klass|modul) /.test(value);

function describeChange({ name, value, before }, isCall) {
  if (before !== null) {
    return `\`${name}\` ändras från \`${before}\` till \`${value}\`.`;
  }
  if (value.startsWith('funktion ')) {
    return `Funktionen \`${name}\` skapas. Koden i den körs först när den anropas.`;
  }
  if (value.startsWith('klass ')) return `Klassen \`${name}\` skapas.`;
  if (value.startsWith('modul ')) return `Modulen \`${name}\` importeras.`;
  if (isCall) return `Parametern \`${name}\` får värdet \`${value}\`.`;
  return `\`${name}\` skapas och får värdet \`${value}\`.`;
}

function describeFlow(flow) {
  const { kind, taken, round, hasElse } = flow;
  if (kind === 'for') {
    if (taken) return `🔁 Varv ${round} i for-loopen.`;
    return round === 0
      ? '🔁 For-loopen hade inget att gå igenom, så den hoppas över.'
      : `🔁 For-loopen är klar efter ${round} varv.`;
  }
  if (kind === 'while') {
    return taken
      ? `🔁 Villkoret i while-loopen är sant, så varv ${round} körs.`
      : `🔁 Villkoret i while-loopen är falskt, så loopen slutar efter ${round} varv.`;
  }
  if (taken) {
    return `🔀 Villkoret är sant (\`True\`), så koden under \`${kind}\` körs.`;
  }
  return hasElse
    ? '🔀 Villkoret är falskt (`False`), så Python hoppar över blocket under och går vidare till nästa `elif` eller `else`.'
    : '🔀 Villkoret är falskt (`False`), så Python hoppar över blocket under.';
}

const shorten = (text, max) =>
  text.length > max ? text.slice(0, max - 1) + '…' : text;

const printedText = text => text.replace(/\n$/, '').split('\n').join(' ⏎ ');

// Vad raden som just kördes gjorde. line är raden, sentences meningarna
// med `kod` i backticks och note en kort text som visas på raden i editorn.
export function explainStep(frames, index, console = '') {
  const frame = frames[index];
  const previous = frames[index - 1];
  if (!frame || !previous || frame.timedOut) return null;
  // Efter ett return är det raden med anropet som blir klar, inte return.
  const line =
    previous.returned !== undefined
      ? (baselineFor(frames, index)?.line ?? previous.line)
      : previous.line;
  if (line === null) return null;

  if (frame.returned !== undefined) {
    return {
      line,
      sentences: [
        ...(frame.flow ? [describeFlow(frame.flow)] : []),
        `↩️ \`${frame.scope}\` är klar och lämnar tillbaka \`${frame.returned}\` till där den anropades.`,
      ],
      note: `↩ ${shorten(frame.returned, 40)}`,
    };
  }

  const sentences = [];
  const notes = [];
  const isCall = entersCall(previous, frame);
  if (isCall) {
    sentences.push(
      `📞 Funktionen anropas: \`${frame.call}\`. Nu körs koden inne i den.`,
    );
    notes.push(`anropar ${frame.scope}`);
  } else if (previous.returned !== undefined) {
    sentences.push(
      frame.call
        ? `Tillbaka i \`${frame.call}\`, som får svaret \`${previous.returned}\`.`
        : `Tillbaka i programmet, som får svaret \`${previous.returned}\`.`,
    );
  }
  if (frame.flow && !isCall) {
    sentences.push(describeFlow(frame.flow));
    const { kind, taken, round } = frame.flow;
    if (kind === 'for' && taken) notes.push(`varv ${round}`);
    else if (kind === 'for') notes.push('klar');
    else notes.push(taken ? 'sant' : 'falskt');
  }

  // Efter exempelanropet är programmet bara funktionerna, och att de
  // skapades är inget nytt just då. Exemplet anropas utan program runt om,
  // så funktionen som returnerade har inga väntande anrop.
  const afterExample =
    frame.line === null &&
    previous.returned !== undefined &&
    depth(previous) === 0;
  const changes =
    frame.error || afterExample
      ? []
      : changesBetween(baselineFor(frames, index), frame);
  for (const change of changes.slice(0, MAX_CHANGES)) {
    sentences.push(describeChange(change, isCall));
  }
  if (changes.length > MAX_CHANGES) {
    sentences.push(`…och ${changes.length - MAX_CHANGES} variabler till.`);
  }
  if (!isCall) {
    notes.push(
      ...changes
        .filter(change => !isDefinition(change.value))
        .slice(0, 2)
        .map(change => `${change.name} = ${shorten(change.value, 30)}`),
    );
  }

  const printed = console.slice(previous.out, frame.out);
  if (printed) {
    sentences.push(`🖨️ Skriver ut \`${printedText(printed)}\`.`);
    if (notes.length === 0)
      notes.push(`skriver ut ${shorten(printedText(printed), 30)}`);
  }
  if (sentences.length === 0 && !frame.error) {
    sentences.push(
      'Raden körs, men ingen variabel ändras och inget skrivs ut.',
    );
  }
  return { line, sentences, note: notes.length ? notes.join(' · ') : null };
}

// Frågan att gissa på innan steget efter index visas, eller null om
// steget inte har något att gissa på.
export function questionFor(frames, index, console = '') {
  const frame = frames[index];
  const next = frames[index + 1];
  if (!frame || !next || next.error || next.timedOut) return null;
  if (frame.line === null) return null;

  const isCall = entersCall(frame, next);
  if (next.flow && next.flow.line === frame.line && !isCall) {
    const { kind, taken } = next.flow;
    if (kind === 'for') {
      return {
        prompt: `Blir det ett varv till i for-loopen på rad ${frame.line}?`,
        options: ['Ja', 'Nej'],
        answer: taken ? 'Ja' : 'Nej',
      };
    }
    return {
      prompt: `Är villkoret på rad ${frame.line} sant eller falskt?`,
      options: ['Sant', 'Falskt'],
      answer: taken ? 'Sant' : 'Falskt',
    };
  }
  if (next.returned !== undefined) {
    return {
      prompt: `Vad lämnar \`${next.scope}\` tillbaka?`,
      answer: next.returned,
    };
  }
  if (!isCall) {
    const change = changesBetween(baselineFor(frames, index + 1), next).find(
      item => !isDefinition(item.value),
    );
    if (change) {
      return {
        prompt: `Vad blir \`${change.name}\` när rad ${frame.line} har körts?`,
        answer: change.value,
      };
    }
  }
  const printed = console.slice(frame.out, next.out);
  if (printed && !isCall) {
    return {
      prompt: `Vad skriver rad ${frame.line} ut?`,
      answer: printedText(printed),
    };
  }
  return null;
}

const normalize = text =>
  text
    .trim()
    .replace(/"/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/ ?([,:]) ?/g, '$1 ');

// Rätt om gissningen är samma värde, även om eleven skriver "hej" i
// stället för 'hej', glömmer citattecknen runt en text, skriver 2 för
// 2.0 eller true för True.
export function isGuessRight(guess, answer) {
  const a = normalize(guess);
  const b = normalize(answer);
  if (a === b) return true;
  if (/^'.*'$/.test(b) && a === b.slice(1, -1)) return true;
  if (/^(true|false|none)$/i.test(b))
    return a.toLowerCase() === b.toLowerCase();
  if (a !== '' && !Number.isNaN(Number(a)) && Number(a) === Number(b))
    return true;
  return a.replace(/ /g, '') === b.replace(/ /g, '');
}
