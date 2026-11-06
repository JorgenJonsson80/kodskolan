import initSqlJs from 'sql.js';
import wasmUrl from 'sql.js/dist/sql-wasm-browser.wasm?url';
import { describeDatabase, runSql } from './engine';

// SQLite i WebAssembly, ungefär 1 MB. Den ingår i sajten, så den fungerar
// utan andra servrar och ligger i webbläsarens cache efter första gången.
const ready = initSqlJs({ locateFile: () => wasmUrl });

ready.then(
  () => postMessage({ type: 'ready' }),
  error => postMessage({ type: 'failed', message: String(error) }),
);

onmessage = async ({ data }) => {
  const SQL = await ready;
  const result =
    data.kind === 'describe'
      ? describeDatabase(SQL, data.setup)
      : runSql(SQL, data);
  postMessage({ type: 'result', id: data.id, result });
};
