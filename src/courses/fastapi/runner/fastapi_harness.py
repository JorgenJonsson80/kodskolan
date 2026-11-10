# Körs efter Python-kursens harness.py (samma Pyodide). Elevens FastAPI-app
# körs aldrig som en server. Testerna och 📮 Anropa skickar anropen direkt
# till appen (ASGI), så allt sker i webbläsaren.
import asyncio
import json
import sys
import types
from urllib.parse import quote, unquote, urlsplit

import anyio.to_thread
import fastapi
from fastapi.routing import APIRoute


# FastAPI kör vanliga def-funktioner (och Depends med yield) i en tråd via
# anyio, och Pyodide har inga trådar. Här körs de direkt i stället. Eleven
# skriver samma kod som i en riktig app, och svaret blir detsamma.
async def _direkt(func, *args, **kwargs):
    return func(*args)


anyio.to_thread.run_sync = _direkt


class _Selector:
    def __init__(self, loop):
        self.loop = loop

    def select(self, timeout=None):
        if timeout is None:
            raise RuntimeError(
                'Appen väntar på något som aldrig blir klart. '
                'Kolla att allt som väntas på med await faktiskt får ett svar.'
            )
        # Tiden är på låtsas: asyncio.sleep(2) går direkt, men i rätt
        # ordning, och loop.time() visar att två sekunder gått.
        self.loop._now += max(timeout, 0)
        return []


class _Loop(asyncio.BaseEventLoop):
    """En händelseloop utan sockets och med låtsastid. Pyodides vanliga loop
    kan inte vänta klart på ett anrop, och asyncio:s egen behöver sockets."""

    def __init__(self):
        super().__init__()
        self._now = 0.0
        self._selector = _Selector(self)

    def time(self):
        return self._now

    def _process_events(self, events):
        pass

    def _write_to_self(self):
        pass

    def run(self, coroutine):
        # Pyodides egen loop räknas som igång hela tiden, och asyncio
        # vägrar starta en loop till medan en annan kör.
        outer = asyncio.events._get_running_loop()
        asyncio.events._set_running_loop(None)
        try:
            return self.run_until_complete(coroutine)
        finally:
            asyncio.events._set_running_loop(outer)


_LOOP = _Loop()

# uvicorn.run(app) startar en riktig server, och den står och väntar för
# alltid. Här behövs den inte, så elever som skriver den som i en riktig
# app ska inte råka låsa sidan.
_uvicorn = types.ModuleType('uvicorn')
_uvicorn.run = lambda *args, **kwargs: None
sys.modules['uvicorn'] = _uvicorn


class Svar:
    """Svaret på ett anrop, så som testerna läser det: __get('/').json."""

    def __init__(self, status, headers, body):
        self.status = status
        self.headers = headers
        self.text = body.decode('utf-8', errors='replace')
        self.typ = headers.get('content-type', '').split(';')[0].strip()
        self.location = headers.get('location')
        try:
            self.json = json.loads(self.text) if self.typ == 'application/json' else None
        except ValueError:
            self.json = None

    def __repr__(self):
        return f'<Svar {self.status}>'


def _call(app, method, path, data=None, headers=None):
    parts = urlsplit(path or '/')
    body = b'' if data is None else json.dumps(data).encode('utf-8')
    raw_headers = [(b'host', b'kodskolan')]
    if data is not None:
        raw_headers.append((b'content-type', b'application/json'))
    for key, value in (headers or {}).items():
        raw_headers.append((str(key).lower().encode('latin-1'), str(value).encode('latin-1', errors='replace')))
    scope = {
        'type': 'http',
        'asgi': {'version': '3.0'},
        'http_version': '1.1',
        'method': method.upper(),
        'scheme': 'http',
        'path': unquote(parts.path or '/'),
        'raw_path': quote(unquote(parts.path or '/')).encode('ascii'),
        'query_string': quote(parts.query, safe='=&+%').encode('ascii'),
        'root_path': '',
        'headers': raw_headers,
        'client': ('kodskolan', 1),
        'server': ('kodskolan', 80),
    }
    sent = False

    async def receive():
        nonlocal sent
        if not sent:
            sent = True
            return {'type': 'http.request', 'body': body, 'more_body': False}
        return {'type': 'http.disconnect'}

    response = {'status': None, 'headers': {}, 'body': b''}

    async def send(message):
        if message['type'] == 'http.response.start':
            response['status'] = message['status']
            response['headers'] = {
                key.decode('latin-1').lower(): value.decode('latin-1')
                for key, value in message.get('headers', [])
            }
        elif message['type'] == 'http.response.body':
            response['body'] += message.get('body', b'')

    # Ett fel i elevens vägfunktion når hit som ett vanligt Python-fel, med
    # rad och förklaring, i stället för som en anonym 500.
    _LOOP.run(app(scope, receive, send))
    return Svar(response['status'], response['headers'], response['body'])


def _app(namespace):
    app = namespace.get('app')
    if isinstance(app, fastapi.FastAPI):
        return app
    for value in namespace.values():
        if isinstance(value, fastapi.FastAPI):
            return value
    raise NameError('Hittar ingen FastAPI-app. Skapa den med app = FastAPI()')


class Klient:
    """Skickar samma headers med varje anrop, som en inloggad app.
    __klient({'x-api-nyckel': 'hemlig'}) i ett test."""

    def __init__(self, app, headers=None):
        self._app = app
        self._headers = dict(headers or {})

    def _send(self, method, path, data=None, headers=None):
        return _call(self._app, method, path, data, {**self._headers, **(headers or {})})

    def get(self, path, headers=None):
        return self._send('GET', path, None, headers)

    def post(self, path, data=None, headers=None):
        return self._send('POST', path, data, headers)

    def put(self, path, data=None, headers=None):
        return self._send('PUT', path, data, headers)

    def patch(self, path, data=None, headers=None):
        return self._send('PATCH', path, data, headers)

    def delete(self, path, headers=None):
        return self._send('DELETE', path, None, headers)


def _routes(app):
    # En rad per adress, t.ex. ['GET POST', '/hundar']. /docs och
    # /openapi.json räknas inte, de gör FastAPI själv.
    methods = {}
    for route in app.routes:
        if isinstance(route, APIRoute):
            methods.setdefault(route.path, set()).update(
                m for m in route.methods if m not in ('HEAD', 'OPTIONS')
            )
    order = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    return [
        [' '.join(sorted(found, key=lambda m: order.index(m) if m in order else 9)), path]
        for path, found in sorted(methods.items())
    ]


def _helpers(namespace):
    def send(method, path, data=None, headers=None):
        return _call(_app(namespace), method, path, data, headers)

    def seconds(path, headers=None):
        # Hur många (låtsas)sekunder ett GET tar, eller ett anrop i en
        # lambda: __tid(lambda: __post('/x', {})). Bana 9 visar med den att
        # asyncio.gather väntar på flera saker samtidigt.
        start = _LOOP.time()
        if callable(path):
            path()
        else:
            send('GET', path, None, headers)
        return round(_LOOP.time() - start, 2)

    return {
        '__tid': seconds,
        '__get': lambda path, headers=None: send('GET', path, None, headers),
        '__post': lambda path, data=None, headers=None: send('POST', path, data, headers),
        '__put': lambda path, data=None, headers=None: send('PUT', path, data, headers),
        '__patch': lambda path, data=None, headers=None: send('PATCH', path, data, headers),
        '__delete': lambda path, headers=None: send('DELETE', path, None, headers),
        '__klient': lambda headers=None: Klient(_app(namespace), headers),
        '__vagar': lambda: _routes(_app(namespace)),
        '__openapi': lambda: _app(namespace).openapi(),
        '__anropa': lambda request_json: _anropa(namespace, request_json),
    }


TEST_GLOBALS.append(_helpers)


def _anropa(namespace, request_json):
    # 📮 Anropa: ett anrop som eleven själv valt, och vägarna appen har.
    request = json.loads(request_json)
    app = _app(namespace)
    text = (request.get('body') or '').strip()
    method = request.get('method', 'GET')
    try:
        data = json.loads(text) if text and method in ('POST', 'PUT', 'PATCH') else None
    except ValueError as error:
        return {'bodyError': f'Det som ska skickas är inte giltig JSON: {error}', 'routes': _routes(app)}
    svar = _call(app, method, request.get('path') or '/', data, request.get('headers'))
    return {
        'method': method,
        'path': request.get('path') or '/',
        'status': svar.status,
        'type': svar.typ,
        'text': svar.text[:20_000],
        'location': svar.location,
        'routes': _routes(app),
    }


def run_fastapi(code, tests_json, inputs_json, files_json, request_json=None):
    tests = json.loads(tests_json)
    request = json.loads(request_json) if request_json else None
    if request is not None:
        tests.append({'code': f'__anropa({json.dumps(request_json)})', 'expected': None})
    result = json.loads(run_student(code, json.dumps(tests), inputs_json, files_json))
    if request is not None and len(result['tests']) == len(tests):
        entry = result['tests'].pop()
        result['response'] = {'error': entry['error']} if 'error' in entry else entry.get('actual')
    return json.dumps(result)
