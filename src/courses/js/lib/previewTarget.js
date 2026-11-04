// Vilken komponent Lekplatsen ska visa, t.ex. '<App />', eller null om
// koden inte har någon komponent. App går först, sedan default-exporten
// och annars den sista komponenten i filen.
const COMPONENT =
  /(?:^|\n)\s*(export\s+default\s+)?(?:function\s+([A-Z][\w$]*)|(?:const|let)\s+([A-Z][\w$]*)\s*=\s*(?:\([^)]*\)|[\w$]+)\s*=>)/g;

export function previewTarget(code) {
  if (!/<[A-Za-z>]/.test(code)) return null;
  const components = [...code.matchAll(COMPONENT)].map(match => ({
    name: match[2] ?? match[3],
    isDefault: Boolean(match[1]),
  }));
  if (components.length === 0) return null;
  const chosen =
    components.find(item => item.name === 'App') ??
    components.find(item => item.isDefault) ??
    components.at(-1);
  return `<${chosen.name} />`;
}
