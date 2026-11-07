import globals from './globals.d.ts?raw';

// Typerna som kompilatorn läser utöver elevens kod: JavaScript självt
// (ES2023 och de äldre filerna den hänvisar till), låtsas-webbläsaren i
// globals.d.ts och React. Sökvägarna är de kompilatorn letar på.
const es = import.meta.glob(
  [
    '/node_modules/typescript/lib/lib.es5.d.ts',
    '/node_modules/typescript/lib/lib.es20{15,16,17,18,19,20,21,22,23}*.d.ts',
    '/node_modules/typescript/lib/lib.decorators*.d.ts',
  ],
  { query: '?raw', import: 'default', eager: true },
);

const react = import.meta.glob(
  [
    '/node_modules/@types/react/{index,global,jsx-runtime}.d.ts',
    '/node_modules/@types/react/package.json',
  ],
  { query: '?raw', import: 'default', eager: true },
);

const fileName = path => path.slice(path.lastIndexOf('/') + 1);

export const LIB_FILES = {
  ...Object.fromEntries(
    Object.entries(es).map(([path, text]) => [`/${fileName(path)}`, text]),
  ),
  '/globals.d.ts': globals,
  ...Object.fromEntries(
    Object.entries(react).map(([path, text]) => [path, text]),
  ),
  // React-typerna läser stilarna från csstype (800 kB). Här räcker det att
  // style={{ … }} tar emot vad som helst.
  '/node_modules/csstype/index.d.ts':
    'export interface Properties<TLength = string | 0, TTime = string> { [key: string]: any }\n',
};
