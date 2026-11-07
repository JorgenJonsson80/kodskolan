# Körs efter Python-kursens harness.py (samma Pyodide). Elevens Flask-app
# körs aldrig som en server. Testerna och 📮 Anropa skickar anropen direkt
# till appen med Flasks testklient, så allt sker i webbläsaren.
import hashlib
import hmac
import json

import flask
import werkzeug.security
from werkzeug.exceptions import HTTPException

# Pyodide saknar OpenSSL, och därmed hashlib.scrypt och pbkdf2_hmac som
# Werkzeug hashar lösenord med. pbkdf2 skrivs här i ren Python, och
# generate_password_hash använder det med färre varv, så att en inloggning
# hinner inom tidsgränsen. Eleven skriver samma kod som i en riktig app.
def _pbkdf2_hmac(hash_name, password, salt, iterations, dklen=None):
    mac = hmac.new(password, digestmod=hash_name)
    size = mac.digest_size
    dklen = dklen or size
    key = b''
    block = 1
    while len(key) < dklen:
        first = mac.copy()
        first.update(salt + block.to_bytes(4, 'big'))
        u = first.digest()
        total = int.from_bytes(u, 'big')
        for _ in range(iterations - 1):
            nxt = mac.copy()
            nxt.update(u)
            u = nxt.digest()
            total ^= int.from_bytes(u, 'big')
        key += total.to_bytes(size, 'big')
        block += 1
    return key[:dklen]


if not hasattr(hashlib, 'pbkdf2_hmac'):
    hashlib.pbkdf2_hmac = _pbkdf2_hmac

if not hasattr(hashlib, 'scrypt'):
    _generate_password_hash = werkzeug.security.generate_password_hash

    def _generate(password, method='pbkdf2:sha256:1000', salt_length=16):
        return _generate_password_hash(password, method, salt_length)

    werkzeug.security.generate_password_hash = _generate


# app.run() startar en riktig server, och den står och väntar för alltid.
# Här behövs den inte, så elever som skriver den som i en riktig app ska
# inte råka låsa sidan.
flask.Flask.run = lambda self, *args, **kwargs: None


class Svar:
    """Svaret på ett anrop, så som testerna läser det: __get('/').status."""

    def __init__(self, response):
        self.status = response.status_code
        self.text = response.get_data(as_text=True)
        self.json = response.get_json(silent=True)
        self.typ = response.mimetype
        self.location = response.headers.get('Location')

    def __repr__(self):
        return f'<Svar {self.status}>'


def _app(namespace):
    app = namespace.get('app')
    if isinstance(app, flask.Flask):
        return app
    for value in namespace.values():
        if isinstance(value, flask.Flask):
            return value
    raise NameError('Hittar ingen Flask-app. Skapa den med app = Flask(__name__)')


def _send(client, method, path, data=None, form=None):
    kwargs = {}
    if data is not None:
        kwargs['json'] = data
    if form is not None:
        kwargs['data'] = form
    return Svar(client.open(path, method=method, **kwargs))


class Klient:
    """Som en webbläsare: behåller cookies (och därmed session) mellan
    anropen. __klient() i ett test."""

    def __init__(self, app):
        self._client = app.test_client()

    def get(self, path):
        return _send(self._client, 'GET', path)

    def post(self, path, data=None, form=None):
        return _send(self._client, 'POST', path, data, form)

    def put(self, path, data=None, form=None):
        return _send(self._client, 'PUT', path, data, form)

    def patch(self, path, data=None, form=None):
        return _send(self._client, 'PATCH', path, data, form)

    def delete(self, path):
        return _send(self._client, 'DELETE', path)


def _prepare(app):
    # Ett fel i elevens vägfunktion ska synas som ett Python-fel med rad och
    # förklaring, inte som en anonym "500 Internal Server Error".
    app.config['PROPAGATE_EXCEPTIONS'] = True
    return app


def _routes(app):
    # En rad per adress, t.ex. ['GET POST', '/hundar'].
    methods = {}
    for rule in app.url_map.iter_rules():
        if rule.endpoint == 'static':
            continue
        methods.setdefault(rule.rule, set()).update(m for m in rule.methods if m not in ('HEAD', 'OPTIONS'))
    order = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    return [
        [' '.join(sorted(found, key=lambda m: order.index(m) if m in order else 9)), path]
        for path, found in sorted(methods.items())
    ]


def _helpers(namespace):
    def client():
        return _prepare(_app(namespace)).test_client()

    return {
        '__get': lambda path: _send(client(), 'GET', path),
        '__post': lambda path, data=None, form=None: _send(client(), 'POST', path, data, form),
        '__put': lambda path, data=None, form=None: _send(client(), 'PUT', path, data, form),
        '__patch': lambda path, data=None, form=None: _send(client(), 'PATCH', path, data, form),
        '__delete': lambda path: _send(client(), 'DELETE', path),
        '__klient': lambda: Klient(_prepare(_app(namespace))),
        '__vagar': lambda: _routes(_app(namespace)),
        '__anropa': lambda request_json: _anropa(namespace, request_json),
    }


TEST_GLOBALS.append(_helpers)


def _body(request):
    text = (request.get('body') or '').strip()
    if not text:
        return None, None
    if request.get('kind') == 'form':
        pairs = [part.split('=', 1) for part in text.replace('\n', '&').split('&') if part]
        return None, {key.strip(): value.strip() for key, value in (p + [''] for p in pairs)}
    return json.loads(text), None


def _anropa(namespace, request_json, client=None):
    # 📮 Anropa: ett anrop som eleven själv valt, och vägarna appen har.
    # client är fullstackens klient, som behåller cookies mellan anropen.
    request = json.loads(request_json)
    app = _app(namespace)
    try:
        data, form = _body(request)
    except ValueError as error:
        return {'bodyError': f'Det som ska skickas är inte giltig JSON: {error}', 'routes': _routes(app)}
    try:
        svar = _send(client or _prepare(app).test_client(), request.get('method', 'GET'), request.get('path') or '/', data, form)
    except HTTPException as error:
        return {'status': error.code, 'type': 'text/plain', 'text': str(error), 'routes': _routes(app)}
    return {
        'method': request.get('method', 'GET'),
        'path': request.get('path') or '/',
        'status': svar.status,
        'type': svar.typ,
        'text': svar.text[:20_000],
        'location': svar.location,
        'routes': _routes(app),
    }


def run_flask(code, tests_json, inputs_json, files_json, request_json=None):
    tests = json.loads(tests_json)
    request = json.loads(request_json) if request_json else None
    if request is not None:
        tests.append({'code': f'__anropa({json.dumps(request_json)})', 'expected': None})
    result = json.loads(run_student(code, json.dumps(tests), inputs_json, files_json))
    if request is not None and len(result['tests']) == len(tests):
        entry = result['tests'].pop()
        result['response'] = {'error': entry['error']} if 'error' in entry else entry.get('actual')
    return json.dumps(result)


# --- En app som kör hela tiden (fullstack) ---
# React-sidan i fullstack-projektet anropar appen med fetch, och appen
# ska komma ihåg det som skickats till den mellan anropen. Därför körs
# elevens kod en gång, och anropen går sedan till samma namespace. Klienten
# behåller cookies som en webbläsare, så att en inloggning håller.

_served = None
_served_client = None


def serve_start(code, files_json='{}'):
    global _served, _served_client
    _served_client = None
    _write_files(files_json)
    try:
        compiled = compile(code, STUDENT_FILE, 'exec')
    except SyntaxError as error:
        _served = None
        return json.dumps({'error': _error_info(error, STUDENT_FILE)})
    _served = _Run(compiled, [])
    return json.dumps({'error': _served.error})


def serve_request(request_json):
    global _served_client
    if _served is None or _served.error is not None:
        return json.dumps({'status': 503, 'type': 'text/plain', 'text': 'Flask-appen kör inte', 'stopped': True})
    with _served:
        try:
            if _served_client is None:
                _served_client = _prepare(_app(_served.namespace)).test_client()
            result = _anropa(_served.namespace, request_json, _served_client)
        except BaseException as error:
            result = {'status': 500, 'type': 'text/plain', 'text': str(error),
                      'error': _error_info(error, STUDENT_FILE, _served.namespace)}
    return json.dumps(result, default=str)
