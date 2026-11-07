// Ett fetch som skickar anropen vidare med send, t.ex. till en riktig
// Flask-app i en annan worker (Fullstack-kursen). send får { method, path,
// kind, body } och svarar som Flask-kursens 📮 Anropa: { status, type,
// text }. idle() väntar in anropen som är på väg, så att
// __mount(…).settle() hinner få svaren, och svarar true om det fanns några.
export function createBridgeFetch(send) {
  const pending = new Set();

  function bridgeFetch(url, init = {}) {
    const { pathname, search } = new URL(String(url), 'http://kodskolan.test');
    bridgeFetch.calls.push(String(url));
    const promise = Promise.resolve(
      send({
        method: String(init.method ?? 'GET').toUpperCase(),
        path: pathname + search,
        kind: 'json',
        body: typeof init.body === 'string' ? init.body : '',
      }),
    ).then(toResponse);
    pending.add(promise);
    const done = () => pending.delete(promise);
    promise.then(done, done);
    return promise;
  }

  bridgeFetch.calls = [];
  bridgeFetch.idle = async () => {
    if (pending.size === 0) return false;
    await Promise.allSettled([...pending]);
    return true;
  };
  return bridgeFetch;
}

// Svaret i samma form som webbläsarens Response, så långt övningarna når.
function toResponse(answer) {
  const status = answer.bodyError ? 400 : (answer.status ?? 500);
  const text = answer.bodyError ?? answer.text ?? '';
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: {
      get: name =>
        String(name).toLowerCase() === 'content-type'
          ? (answer.type ?? null)
          : null,
    },
    json: async () => JSON.parse(text),
    text: async () => text,
  };
}
