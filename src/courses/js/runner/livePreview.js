// Kör elevens komponent på riktigt i förhandsvisningen, så att man kan
// klicka och skriva i den. Rättningen sker fortfarande i workern; hit
// kommer bara kod som inte fastnade i en oändlig loop där.
//
// localStorage, document.title och fetch är låtsasversioner, så att
// elevens kod aldrig kan röra appens egen sparade progress.
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createFetch, createStorage } from './fakes';
import { transformJsx } from './jsx';
import { createModuleSystem } from './modules';
import { createRenderTracker } from './renderTracker';

class ErrorCatcher extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (!this.state.error) return this.props.children;
    return React.createElement(
      'pre',
      { className: 'preview-error' },
      `${this.state.error.name}: ${this.state.error.message}`,
    );
  }
}

function showError(container, error) {
  const pre = container.ownerDocument.createElement('pre');
  pre.className = 'preview-error';
  pre.textContent = `${error.name}: ${error.message}`;
  container.replaceChildren(pre);
}

// Startar förhandsvisningen i container och returnerar en funktion som
// stänger den: komponenten tas bort och elevens timers stoppas.
// onRenderEvent får veta varför komponenterna renderar, se renderTracker.
export function startLivePreview(
  container,
  { code, fileName, files, preview },
  onRenderEvent,
) {
  const timers = new Set();
  const StudentReact = onRenderEvent
    ? createRenderTracker(onRenderEvent).React
    : { ...React, default: React };
  const runtime = {
    packages: { react: StudentReact },
    globals: {
      __React: StudentReact,
      localStorage: createStorage(),
      document: { title: '' },
      fetch: createFetch({ delay: 600 }),
      setTimeout: (callback, ms) => {
        const id = setTimeout(callback, ms);
        timers.add(id);
        return id;
      },
      setInterval: (callback, ms) => {
        const id = setInterval(callback, ms);
        timers.add(id);
        return id;
      },
      clearTimeout: id => clearTimeout(id),
      clearInterval: id => clearInterval(id),
    },
  };

  let root = null;
  try {
    const modules = createModuleSystem(
      { ...files, [fileName ?? 'main.js']: code },
      runtime,
    );
    const element = modules.runFile(
      fileName ?? 'main.js',
      code,
      `return ${transformJsx(`(${preview})`)};`,
    );
    // En ny ruta varje gång, så att den förra roten kan tas bort efteråt
    // (se städningen nedan) utan att röra den nya.
    const host = container.ownerDocument.createElement('div');
    container.replaceChildren(host);
    root = createRoot(host);
    root.render(React.createElement(ErrorCatcher, null, element));
  } catch (error) {
    showError(container, error);
  }

  return () => {
    // Städningen kan ske medan appens React ritar om (när man byter
    // övning), och en rot får inte tas bort mitt i en annan rots
    // rendering. Därför väntar vi tills den är klar.
    if (root) setTimeout(() => root.unmount());
    for (const id of timers) {
      clearTimeout(id);
      clearInterval(id);
    }
  };
}
