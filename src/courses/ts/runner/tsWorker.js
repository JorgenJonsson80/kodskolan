import { checkAndCompile, createChecker } from './checker';
import { LIB_FILES } from './libs';

// Kompilatorn är stor (1,6 MB komprimerad), så den laddas en gång i en
// egen tråd och används till rättningen, hovern, förslagen och lappen
// med typfel i editorn.
const checker = createChecker(LIB_FILES);
// Första kontrollen läser in JavaScripts typer. Gör den direkt, så att
// elevens första körning går snabbt.
checker.diagnostics('const start = 1;\n');
postMessage({ type: 'ready' });

const jobs = {
  check: ({ code, typeTests }) => checkAndCompile(checker, code, typeTests),
  diagnostics: ({ code }) => checker.diagnostics(code),
  quickInfo: ({ code, pos }) => checker.quickInfo(code, pos),
  completions: ({ code, pos }) => checker.completions(code, pos),
};

onmessage = ({ data }) => {
  let result;
  try {
    result = jobs[data.kind](data);
  } catch (error) {
    result = { crashed: String(error) };
  }
  postMessage({ type: 'result', id: data.id, result });
};
