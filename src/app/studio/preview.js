// Appen visas i en sandlåda utan origin (som JS-förhandsvisningen), och där
// finns ingen localStorage. Därför får appen en egen lagring som börjar med
// det som sparats förut (data) och skickar varje ändring till Byggstudion,
// som sparar den med projektet. Den nedladdade filen har inte det här –
// där fungerar webbläsarens vanliga localStorage.
export const DATA_MESSAGE = 'kodskolan-app-data';

export function withStorage(html, data) {
  const json = JSON.stringify(data ?? {}).replace(/</g, '\\u003c');
  const shim = `<script>
(function () {
  var data = ${json};
  function save() {
    parent.postMessage({ type: '${DATA_MESSAGE}', data: data }, '*');
  }
  var store = {
    getItem: function (key) {
      return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : null;
    },
    setItem: function (key, value) { data[String(key)] = String(value); save(); },
    removeItem: function (key) { delete data[key]; save(); },
    clear: function () { data = {}; save(); },
    key: function (index) { return Object.keys(data)[index] || null; },
    get length() { return Object.keys(data).length; },
  };
  try {
    Object.defineProperty(window, 'localStorage', { value: store, configurable: true });
  } catch (error) {}
})();
</script>`;
  return /<head[^>]*>/i.test(html)
    ? html.replace(/<head[^>]*>/i, match => `${match}\n${shim}`)
    : `${shim}\n${html}`;
}
