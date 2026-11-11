import harness from './harness.py?raw';
import { PYODIDE_URL } from './pyodideVersion';

// Pyodide laddas från jsDelivr. Första gången är det cirka 10 MB, sedan
// ligger det i webbläsarens cache.
const ready = (async () => {
  const { loadPyodide } = await import(
    /* @vite-ignore */ `${PYODIDE_URL}pyodide.mjs`
  );
  const pyodide = await loadPyodide({ indexURL: PYODIDE_URL });
  pyodide.runPython(harness);
  return {
    pyodide,
    run: pyodide.globals.get('run_student'),
    step: pyodide.globals.get('step_student'),
  };
})();

ready.then(
  () => postMessage({ type: 'ready' }),
  error => postMessage({ type: 'failed', message: String(error) }),
);

// Paket som inte ingår i Python, som pandas. De laddas första gången
// koden importerar dem, och importeras direkt så att elevens import går
// fort. Medan det pågår pausas tidsgränsen (se python.js). matplotlib
// bygger sin fontcache vid första importen av pyplot, och det tar längre
// än tidsgränsen – därför importeras pyplot också här.
const PACKAGES = ['pandas', 'matplotlib'];
const WARM_IMPORTS = {
  // pandas egen plot() tar också en stund första gången.
  matplotlib:
    'import matplotlib\nmatplotlib.use("Agg")\nimport matplotlib.pyplot\ntry:\n    import pandas.plotting._matplotlib\nexcept ImportError:\n    pass',
};
const loaded = new Set();

async function loadPackagesFor(python, id, code) {
  let wanted = [];
  try {
    // I PACKAGES ordning: pandas före matplotlib, så att pandas plot()
    // hinner värmas upp.
    const imports = python.pyodide.pyodide_py.code.find_imports(code).toJs();
    wanted = PACKAGES.filter(
      name => imports.includes(name) && !loaded.has(name),
    );
  } catch {
    // Syntaxfel: körningen säger själv vad som är fel.
  }
  if (wanted.length === 0) return;
  postMessage({ type: 'loading', id, packages: wanted });
  try {
    await python.pyodide.loadPackage(wanted);
    wanted.forEach(name => {
      python.pyodide.runPython(WARM_IMPORTS[name] ?? `import ${name}`);
      loaded.add(name);
    });
  } catch {
    // Utan nät blir det ModuleNotFoundError i körningen, med förklaring.
  }
  postMessage({ type: 'loaded', id });
}

onmessage = async ({ data }) => {
  const python = await ready;
  await loadPackagesFor(python, data.id, data.code);
  const inputs = JSON.stringify(data.inputs ?? []);
  const files = JSON.stringify(data.files ?? {});
  const json =
    data.kind === 'step'
      ? python.step(data.code, inputs, data.example ?? null, files)
      : python.run(data.code, JSON.stringify(data.tests ?? []), inputs, files);
  postMessage({ type: 'result', id: data.id, result: JSON.parse(json) });
};
