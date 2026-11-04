// Rättar elevens kod. Ren logik utan koppling till workern,
// så att den kan testas direkt med Vitest.
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { checkSyntax, transformJsx } from './jsx';
import { createModuleSystem } from './modules';
import { styleNotes } from './style';
import { createClock, createFetch, createStorage } from './fakes';
import { createMount } from './mount';
import { instrument } from './instrument';

// React 19 lägger till <link rel="preload"> för bilder när den
// renderar till HTML. Det har inget med elevens kod att göra.
function render(element) {
  return renderToStaticMarkup(element).replace(
    /<link rel="preload"[^>]*\/>/g,
    '',
  );
}

// JSX blir anrop av __React.createElement. Här kontrolleras samma regel
// som React själv varnar för: element i en array, t.ex. från map,
// måste ha en key och keys får inte förekomma två gånger.
function createKeyChecker() {
  const keyProblems = [];

  function createElement(type, props, ...children) {
    for (const child of children) {
      if (!Array.isArray(child)) continue;
      const elements = child.filter(React.isValidElement);
      const keys = elements.map(element => element.key);
      if (keys.includes(null)) {
        keyProblems.push('Ett element i en lista saknar key');
      }
      const usedKeys = keys.filter(key => key !== null);
      if (new Set(usedKeys).size !== usedKeys.length) {
        keyProblems.push('Två element i en lista har samma key');
      }
    }
    return React.createElement(type, props, ...children);
  }

  return { keyProblems, React: { ...React, createElement } };
}

// Det som all kod i övningarna når. Testerna kan rendera en komponent
// till HTML med __render(<Greeting />) och läsa __keyProblems efteråt.
// Med __mount(<Counter />) kan de klicka och skriva, se mount.js.
// Skapas på nytt för varje körning, så att keyProblems börjar tomt.
// localStorage, document.title och timers är låtsasversioner, se fakes.js.
// console samlar det eleven skriver ut i logs, så att det kan visas i
// appen och testerna kan läsa det med __logs.
function createRuntime(logs = []) {
  const keyChecker = createKeyChecker();
  const clock = createClock();
  const log = (...values) => {
    if (logs.length < MAX_LOGS) logs.push(values.map(formatLogValue).join(' '));
  };
  return {
    packages: { react: { ...React, default: React } },
    globals: {
      __React: keyChecker.React,
      __render: render,
      __mount: createMount(clock),
      __keyProblems: keyChecker.keyProblems,
      __clock: clock,
      localStorage: createStorage(),
      document: { title: '' },
      setTimeout: clock.setTimeout,
      setInterval: clock.setInterval,
      clearTimeout: clock.clearTimeout,
      clearInterval: clock.clearInterval,
      fetch: createFetch(),
      console: { log, info: log, warn: log, error: log },
      __logs: logs,
    },
  };
}

const MAX_LOGS = 50;

// Som i webbläsarens konsol: text visas som den är, allt annat som kod.
function formatLogValue(value) {
  return typeof value === 'string' ? value : format(value);
}

function format(value) {
  if (typeof value === 'function') return 'en funktion';
  if (value === undefined) return 'undefined';
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function isEqual(actual, expected) {
  // === räknar 0 och -0 som lika, men NaN måste hanteras separat.
  if (actual === expected) return true;
  if (Number.isNaN(actual) && Number.isNaN(expected)) return true;
  if (
    typeof actual !== 'object' ||
    typeof expected !== 'object' ||
    actual === null ||
    expected === null
  ) {
    return false;
  }
  return JSON.stringify(actual) === JSON.stringify(expected);
}

// Elevens kod och uttrycket körs i samma scope, så uttrycket kan läsa
// variabler och anropa funktioner eleven skapat. De andra filerna nås
// med __require('./app.js').
function runExpression(code, expression, { fileName = 'main.js', files = {} }) {
  const modules = createModuleSystem(
    { ...files, [fileName]: code },
    createRuntime(),
  );
  return modules.runFile(
    fileName,
    code,
    `return ${transformJsx(`(${expression})`)};`,
  );
}

// Kör elevens kod en gång och samlar det som skrivs ut med console.log.
async function collectOutput(code, { fileName = 'main.js', files = {} }) {
  const logs = [];
  try {
    const modules = createModuleSystem(
      { ...files, [fileName]: code },
      createRuntime(logs),
    );
    modules.runFile(fileName, code, '');
    // Vänta in det som loggas efter en await.
    await new Promise(resolve => setTimeout(resolve, 0));
  } catch (error) {
    logs.push(`${error.name}: ${error.message}`);
  }
  return logs;
}

// Testet kan returnera ett Promise, t.ex. från en async-funktion.
// Då väntar vi in värdet innan det jämförs.
async function runTest(code, test, options) {
  try {
    const actual = await runExpression(code, test.code, options);

    const result = {
      description: test.description,
      passed: isEqual(actual, test.expected),
      actual: format(actual),
      expected: format(test.expected),
    };
    // Konsoltester visas som raderna i konsolen, inte som en array.
    if (test.code === '__logs' && Array.isArray(test.expected)) {
      result.consoleActual = actual;
      result.consoleExpected = test.expected;
    }
    return result;
  } catch (error) {
    return {
      description: test.description,
      passed: false,
      actual: `${error.name}: ${error.message}`,
      expected: format(test.expected),
    };
  }
}

// Kontrollerar hur koden är skriven, t.ex. att den använder en for-loop.
// Används bara där det inte går att se på resultatet när koden körs.
function runSourceCheck(code, check) {
  const found = check.pattern.test(code);
  return {
    description: check.description,
    passed: check.forbidden ? !found : found,
  };
}

// Renderar det lektionen vill visa, t.ex. <Greeting name="Ada" />,
// så att eleven ser vad koden ger.
function renderPreview(code, options) {
  if (!options.preview) return {};
  try {
    return {
      preview: render(runExpression(code, options.preview, options)),
    };
  } catch (error) {
    return { previewError: `${error.name}: ${error.message}` };
  }
}

// options:
//   fileName, files – för övningar med import och export
//   preview – JSX som renderas och visas för eleven
export async function evaluate(code, tests, sourceChecks = [], options = {}) {
  try {
    checkSyntax(code);
  } catch (error) {
    return {
      error: `Koden går inte att tolka. Kontrollera stavningen och att alla ( ) och { } är parade.\n${error.name}: ${error.message}`,
      results: [],
    };
  }

  // Testerna körs ett i taget, så att ett långsamt test inte blandas
  // ihop med nästa.
  const results = [];
  for (const test of tests) {
    results.push(await runTest(code, test, options));
  }

  return {
    error: null,
    output: await collectOutput(code, options),
    notes: styleNotes(code),
    ...renderPreview(code, options),
    results: [
      ...results,
      ...sourceChecks.map(check => runSourceCheck(code, check)),
    ],
  };
}

const MAX_STEPS = 300;
const MAX_VALUE_LENGTH = 80;

class StepLimitError extends Error {}

// Sparar ett steg för varje __trace som den instrumenterade koden gör:
// raden som ska köras, variablernas värden just då och hur mycket som
// skrivits ut i konsolen. Värdena görs om till text direkt, så att ett
// objekt som ändras senare inte ändrar gamla steg.
function createTracer(logs) {
  const steps = [];
  function trace(line, getters) {
    const vars = [];
    for (const [name, read] of getters) {
      let value;
      try {
        value = read();
      } catch {
        continue; // Variabeln är inte skapad än.
      }
      if (typeof value === 'function') continue;
      const text = format(value);
      vars.push([
        name,
        text.length > MAX_VALUE_LENGTH
          ? `${text.slice(0, MAX_VALUE_LENGTH)}…`
          : text,
      ]);
    }
    steps.push({ line, vars, logCount: logs.length });
    if (steps.length >= MAX_STEPS) throw new StepLimitError();
  }
  return { steps, trace };
}

// Kör koden och sparar ett steg före varje rad, för Kör rad för rad.
// Det sista steget har line: null och visar läget när koden är klar.
// Består koden bara av funktioner blir det inget att stega igenom. Då
// anropas de med example, t.ex. 'addBonus(10)' från lektionens test,
// och svaret kommer med som result.
export async function stepThrough(code, options = {}) {
  const firstRun = await stepOnce(code, options);
  if (firstRun.steps.length > 1 || firstRun.error || !options.example) {
    return firstRun;
  }
  return {
    ...(await stepOnce(code, options, options.example)),
    example: options.example,
  };
}

async function stepOnce(
  code,
  { fileName = 'main.js', files = {} },
  example = null,
) {
  try {
    checkSyntax(code);
  } catch (error) {
    return {
      error: `Koden går inte att tolka. Kontrollera stavningen och att alla ( ) och { } är parade.\n${error.name}: ${error.message}`,
      steps: [],
      logs: [],
    };
  }

  const logs = [];
  const tracer = createTracer(logs);
  const runtime = createRuntime(logs);
  runtime.globals.__trace = tracer.trace;
  let result;
  runtime.globals.__traceResult = value => {
    result = format(value);
  };
  const instrumented = instrument(code, {
    after: example ? `__traceResult(${example});` : '',
  });
  let error = null;
  try {
    createModuleSystem({ ...files, [fileName]: instrumented }, runtime).runFile(
      fileName,
      instrumented,
      '',
    );
    await new Promise(resolve => setTimeout(resolve, 0));
  } catch (caught) {
    error =
      caught instanceof StepLimitError
        ? `Stoppade efter ${MAX_STEPS} steg. Har du en oändlig loop, eller väldigt många varv?`
        : `${caught.name}: ${caught.message}`;
  }
  return { steps: tracer.steps, logs, error, result };
}
