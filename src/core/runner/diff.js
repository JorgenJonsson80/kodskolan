// Visar vilka tecken som skiljer mellan elevens resultat och det rätta, så
// att ett missat mellanslag syns direkt i stället för att eleven får
// jämföra tecken för tecken.

// Över den här storleken blir tabellen för tung – då markeras hela raden.
const MAX_CELLS = 4_000_000;

// Längsta gemensamma delföljd: det som finns i båda, i samma ordning,
// räknas som lika. Resten markeras. Fungerar på både strängar och arrayer.
function markChanges(a, b) {
  const n = a.length;
  const m = b.length;
  if (n * m > MAX_CELLS) {
    return { a: Array(n).fill(true), b: Array(m).fill(true) };
  }
  const table = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      table[i][j] =
        a[i] === b[j]
          ? table[i + 1][j + 1] + 1
          : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }
  const marksA = Array(n).fill(true);
  const marksB = Array(m).fill(true);
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      marksA[i++] = false;
      marksB[j++] = false;
    } else if (table[i + 1][j] >= table[i][j + 1]) {
      i++;
    } else {
      j++;
    }
  }
  return { a: marksA, b: marksB };
}

// Slår ihop tecken i följd med samma markering till en bit.
function toParts(text, marks) {
  const parts = [];
  for (let k = 0; k < text.length; k++) {
    const last = parts.at(-1);
    if (last && last.changed === marks[k]) last.text += text[k];
    else parts.push({ text: text[k], changed: marks[k] });
  }
  return parts;
}

export function diffText(actual, expected) {
  const marks = markChanges(actual, expected);
  return {
    actual: toParts(actual, marks.a),
    expected: toParts(expected, marks.b),
  };
}

// Rad för rad. Rader som finns i båda står bredvid varandra. En saknad
// rad i mitten ska inte göra att alla rader efter den ser fel ut, därför
// matchas raderna först och bara de som blir över jämförs tecken för tecken.
// En rad som bara finns på ena sidan får null på den andra.
export function diffLines(actualLines, expectedLines) {
  const marks = markChanges(actualLines, expectedLines);
  const rows = [];
  let i = 0;
  let j = 0;
  while (i < actualLines.length || j < expectedLines.length) {
    if (
      i < actualLines.length &&
      j < expectedLines.length &&
      !marks.a[i] &&
      !marks.b[j]
    ) {
      const same = [{ text: actualLines[i], changed: false }];
      rows.push({ actual: same, expected: same });
      i++;
      j++;
      continue;
    }
    const extra = [];
    const missing = [];
    while (i < actualLines.length && marks.a[i]) extra.push(actualLines[i++]);
    while (j < expectedLines.length && marks.b[j]) {
      missing.push(expectedLines[j++]);
    }
    for (let k = 0; k < Math.max(extra.length, missing.length); k++) {
      if (k < extra.length && k < missing.length) {
        rows.push(diffText(extra[k], missing[k]));
      } else if (k < extra.length) {
        rows.push({
          actual: [{ text: extra[k], changed: true }],
          expected: null,
        });
      } else {
        rows.push({
          actual: null,
          expected: [{ text: missing[k], changed: true }],
        });
      }
    }
  }
  return rows;
}
