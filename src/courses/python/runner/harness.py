# Körs inne i Pyodide (i webbläsarens worker och i testerna i Node).
# JavaScript anropar run_student(kod, tester_som_json, inputs_som_json) och
# får tillbaka ett JSON-svar. Elevens kod får ett eget namespace per
# körning, så att inget läcker mellan körningar.
import ast
import builtins
import difflib
import json
import os
import sys
import traceback
import types

# Diagram ritas till bilder, aldrig till ett fönster.
os.environ.setdefault('MPLBACKEND', 'Agg')

STUDENT_FILE = '<elev>'
TEST_FILE = '<test>'
# En loop som skriver ut i all evighet ska inte fylla minnet innan
# timeouten i JavaScript hinner stoppa den.
MAX_CHARS = 200_000
# Andra kurser kan ge testerna fler hjälpare, t.ex. Flask-kursens __get.
# Varje funktion får elevens namespace och svarar med ett dict.
TEST_GLOBALS = []


class _Capture:
    """Fångar print. `printed` är bara det print skrev, `console` även
    det som input() visade, så som det ser ut i en riktig terminal."""

    def __init__(self):
        self.printed = []
        self.console = []
        self.size = 0

    def write(self, text):
        self.size += len(text)
        if self.size <= MAX_CHARS:
            self.printed.append(text)
            self.console.append(text)
        return len(text)

    def flush(self):
        pass


def _lines(chunks):
    text = ''.join(chunks)
    return text.splitlines()


def _suggestion(error, namespace):
    # Pyodide saknar Pythons inbyggda "Did you mean …?", så vi räknar fram
    # det på samma sätt: närmaste namn som faktiskt finns.
    name = getattr(error, 'name', None)
    if not isinstance(name, str):
        return None
    if isinstance(error, NameError):
        candidates = list(namespace) + dir(builtins)
    elif isinstance(error, AttributeError):
        candidates = [item for item in dir(error.obj) if not item.startswith('_')]
    else:
        return None
    matches = difflib.get_close_matches(name, candidates, n=1, cutoff=0.6)
    return matches[0] if matches else None


def _error_info(error, filename, namespace=None):
    message = ''.join(
        traceback.TracebackException.from_exception(error).format_exception_only()
    ).strip()
    if 'Did you mean' not in message and namespace is not None:
        suggestion = _suggestion(error, namespace)
        if suggestion:
            message += f". Did you mean: '{suggestion}'?"
    line = getattr(error, 'lineno', None) if isinstance(error, SyntaxError) else None
    if line is None:
        for frame, lineno in traceback.walk_tb(error.__traceback__):
            if frame.f_code.co_filename == filename:
                line = lineno
    return {'type': type(error).__name__, 'message': message, 'line': line}


def _plain(value):
    # numpy-tal från pandas, som np.int64(87), visas och skickas som vanliga
    # tal. De jämförs redan rätt med ==.
    if type(value).__module__ == 'numpy' and hasattr(value, 'item'):
        try:
            return value.item()
        except Exception:
            return value
    return value


def _jsonable(value):
    value = _plain(value)
    if isinstance(value, (str, int, float, bool)) or value is None:
        return value
    if isinstance(value, (list, tuple)):
        return [_jsonable(item) for item in value]
    if isinstance(value, dict):
        return {str(key): _jsonable(item) for key, item in value.items()}
    return repr(value)


def _same(actual, expected):
    # JSON har inga tupler, så (1, 2) jämförs som [1, 2].
    if isinstance(actual, tuple):
        actual = list(actual)
    try:
        return bool(actual == expected)
    except Exception:
        return False


def _raises(func, *args, **kwargs):
    """__raises(f, 1, 2) i ett test: namnet på felet f(1, 2) ger, annars None."""
    try:
        func(*args, **kwargs)
    except Exception as error:
        return type(error).__name__
    return None


def _message(func, *args, **kwargs):
    """__message(f, 1, 2) i ett test: felmeddelandet från f(1, 2), annars None."""
    try:
        func(*args, **kwargs)
    except Exception as error:
        return str(error)
    return None


# --- Streamlit utan Streamlit ---
# Riktiga Streamlit behöver en server. För rättningen ersätts det med en
# modul som bara antecknar vad appen visar (st.title, st.write …) och
# låter widgetarna ge sina standardvärden, precis som när en riktig app
# öppnas första gången. Ett test kan ge widgetarna andra värden, se
# _app_run. Förhandsvisningen med riktig Streamlit görs av stlite.

class _SessionState(dict):
    def __getattr__(self, name):
        try:
            return self[name]
        except KeyError:
            raise AttributeError(
                f'st.session_state has no attribute "{name}". '
                'Did you forget to initialize it?'
            ) from None

    def __setattr__(self, name, value):
        self[name] = value

    def __delattr__(self, name):
        del self[name]


class _App:
    """Det en Streamlit-app visar under en körning."""

    def __init__(self, widgets=None, session=None):
        self.elements = []
        self.widgets = widgets or {}
        self.session = session if session is not None else _SessionState()
        # Var nya saker hamnar: {} är sidan, annars sidopanelen eller en
        # kolumn. with col1: lägger till här.
        self.places = [{}]
        self.groups = 0
        self.buttons = set()

    def add(self, where, kind, text='', **fields):
        element = {'type': kind, 'text': text, **where, **fields}
        self.elements.append(element)
        return element

    def widget(self, where, kind, label, default, **fields):
        label = str(label)
        value = self.widgets.get(label, default)
        self.add(where, kind, f'{label}: {value}', label=label, value=_jsonable(value), **fields)
        return value

    def group(self):
        self.groups += 1
        return self.groups


_APP = _App()
# Hur många gånger st.rerun() får starta om, så att en rerun utan villkor
# inte fastnar.
_MAX_RERUNS = 10


class _Stop(BaseException):
    """st.stop(): resten av programmet körs inte, men det är inget fel."""


class _Rerun(BaseException):
    """st.rerun(): programmet körs om från början, utan knapptryck."""


def _stop():
    raise _Stop()


def _rerun():
    raise _Rerun()

_TEXT_KINDS = (
    'title', 'header', 'subheader', 'caption', 'text', 'markdown', 'code',
    'success', 'info', 'warning', 'error',
)
_MAX_ROWS = 50


def _is_table(value):
    return type(value).__name__ in ('DataFrame', 'Series')


def _table(data):
    # Tabellen till förhandsvisningen: kolumnerna och de första raderna.
    kind = type(data).__name__
    if kind == 'Series':
        data = data.to_frame()
        kind = 'DataFrame'
    if kind == 'DataFrame':
        if data.index.name is not None or type(data.index).__name__ != 'RangeIndex':
            data = data.reset_index()
        columns = [str(column) for column in data.columns]
        rows = [[_jsonable(item) for item in row] for row in data.head(_MAX_ROWS).itertuples(index=False)]
        return columns, rows, len(data)
    if isinstance(data, dict):
        columns = [str(key) for key in data]
        values = [list(item) if isinstance(item, (list, tuple)) else [item] for item in data.values()]
        count = max((len(item) for item in values), default=0)
        rows = [[_jsonable(item[i]) if i < len(item) else None for item in values] for i in range(count)]
        return columns, rows[:_MAX_ROWS], count
    items = list(data)
    if items and isinstance(items[0], dict):
        columns = [str(key) for key in items[0]]
        rows = [[_jsonable(item.get(key)) for key in items[0]] for item in items]
        return columns, rows[:_MAX_ROWS], len(rows)
    return ['värde'], [[_jsonable(item)] for item in items[:_MAX_ROWS]], len(items)


def _chart(data, x=None, y=None):
    # Ett diagram blir etiketter och en serie tal per kolumn.
    if type(data).__name__ == 'Series':
        return [str(label) for label in data.index], {str(data.name or 'värde'): [_jsonable(v) for v in data]}
    if type(data).__name__ == 'DataFrame':
        frame = data.set_index(x) if x is not None else data
        names = [y] if isinstance(y, str) else list(y) if y is not None else list(frame.columns)
        labels = [str(label) for label in frame.index]
        return labels, {str(name): [_jsonable(v) for v in frame[name]] for name in names}
    if isinstance(data, dict):
        return [str(key) for key in data], {'värde': [_jsonable(v) for v in data.values()]}
    values = list(data)
    return [str(i) for i in range(len(values))], {'värde': [_jsonable(v) for v in values]}


class _Place:
    """Ett ställe i appen: sidan, st.sidebar eller en kolumn. Har samma
    funktioner som st, så att både st.write och col1.write fungerar."""

    def __init__(self, where=None):
        self._where = where

    def _at(self):
        return self._where if self._where is not None else _APP.places[-1]

    def __enter__(self):
        _APP.places.append(self._at())
        return self

    def __exit__(self, *exc):
        _APP.places.pop()
        return False

    def _text(self, kind, body):
        _APP.add(self._at(), kind, str(body))

    def title(self, body, **kwargs):
        self._text('title', body)

    def header(self, body, **kwargs):
        self._text('header', body)

    def subheader(self, body, **kwargs):
        self._text('subheader', body)

    def caption(self, body, **kwargs):
        self._text('caption', body)

    def text(self, body, **kwargs):
        self._text('text', body)

    def markdown(self, body, **kwargs):
        self._text('markdown', body)

    def code(self, body, **kwargs):
        self._text('code', body)

    def success(self, body, **kwargs):
        self._text('success', body)

    def info(self, body, **kwargs):
        self._text('info', body)

    def warning(self, body, **kwargs):
        self._text('warning', body)

    def error(self, body, **kwargs):
        self._text('error', body)

    def write(self, *args, **kwargs):
        if len(args) == 1 and _is_table(args[0]):
            return self.dataframe(args[0])
        self._text('write', ' '.join(str(arg) for arg in args))

    def metric(self, label, value, delta=None, **kwargs):
        _APP.add(
            self._at(), 'metric', f'{label}: {value}',
            label=str(label), value=str(value), delta=None if delta is None else str(delta),
        )

    def dataframe(self, data=None, **kwargs):
        columns, rows, count = _table(data)
        _APP.add(self._at(), 'dataframe', f'tabell med {count} rader', columns=columns, rows=rows, count=count)

    table = dataframe

    def _chart(self, kind, data, x=None, y=None):
        labels, series = _chart(data, x, y)
        unit = 'staplar' if kind == 'bar_chart' else 'punkter'
        _APP.add(self._at(), kind, f'diagram med {len(labels)} {unit}', labels=labels, series=series)

    def bar_chart(self, data=None, x=None, y=None, **kwargs):
        self._chart('bar_chart', data, x, y)

    def line_chart(self, data=None, x=None, y=None, **kwargs):
        self._chart('line_chart', data, x, y)

    def pyplot(self, fig=None, **kwargs):
        # Ett matplotlib-diagram i appen. Bilden följer med elementet och
        # figuren stängs, så att den inte visas en gång till under appen.
        plt = _pyplot()
        if plt is None:
            return
        import base64
        import io
        figure = fig if fig is not None else plt.gcf()
        titles = [ax.get_title() for ax in figure.axes if ax.get_title()]
        buffer = io.BytesIO()
        figure.savefig(buffer, format='png', dpi=80, bbox_inches='tight')
        _APP.add(
            self._at(), 'pyplot', ', '.join(titles) or 'diagram',
            png=base64.b64encode(buffer.getvalue()).decode('ascii'),
        )
        plt.close(figure)

    def divider(self):
        _APP.add(self._at(), 'divider')

    def balloons(self):
        _APP.add(self._at(), 'balloons', '🎈')

    def text_input(self, label, value='', **kwargs):
        return _APP.widget(self._at(), 'text_input', label, value)

    def text_area(self, label, value='', **kwargs):
        return _APP.widget(self._at(), 'text_area', label, value)

    def number_input(self, label, min_value=None, max_value=None, value='min', step=None, **kwargs):
        if value == 'min':
            value = min_value if min_value is not None else 0
        return _APP.widget(self._at(), 'number_input', label, value)

    def slider(self, label, min_value=None, max_value=None, value=None, step=None, **kwargs):
        low = 0 if min_value is None else min_value
        high = 100 if max_value is None else max_value
        return _APP.widget(
            self._at(), 'slider', label, low if value is None else value, min=low, max=high,
        )

    def selectbox(self, label, options, index=0, **kwargs):
        options = list(options)
        default = options[index] if options and index is not None else None
        return _APP.widget(self._at(), 'selectbox', label, default, options=[str(o) for o in options])

    def radio(self, label, options, index=0, **kwargs):
        options = list(options)
        default = options[index] if options and index is not None else None
        return _APP.widget(self._at(), 'radio', label, default, options=[str(o) for o in options])

    def multiselect(self, label, options, default=None, **kwargs):
        return _APP.widget(self._at(), 'multiselect', label, list(default or []), options=[str(o) for o in options])

    def checkbox(self, label, value=False, **kwargs):
        return _APP.widget(self._at(), 'checkbox', label, value)

    def toggle(self, label, value=False, **kwargs):
        return _APP.widget(self._at(), 'checkbox', label, value)

    def download_button(self, label, data=None, **kwargs):
        return self.button(label)

    def link_button(self, label, url='', **kwargs):
        _APP.add(self._at(), 'button', str(label), label=str(label), value=False)

    def image(self, image=None, caption=None, **kwargs):
        _APP.add(self._at(), 'caption', f'🖼️ {caption or "bild"}')

    def json(self, body, **kwargs):
        _APP.add(self._at(), 'code', json.dumps(_jsonable(body), ensure_ascii=False, indent=2))

    def progress(self, value, text=None, **kwargs):
        _APP.add(self._at(), 'slider', f'{text or ""}: {value}', label=str(text or ''), value=_jsonable(value), min=0, max=100 if isinstance(value, int) else 1)

    def spinner(self, text=''):
        return _Place(self._at())

    def button(self, label, **kwargs):
        _APP.buttons.add(str(label))
        return _APP.widget(self._at(), 'button', label, False)

    def columns(self, spec, **kwargs):
        count = spec if isinstance(spec, int) else len(spec)
        group = _APP.group()
        where = self._at()
        _APP.add(where, 'columns', group_id=group, count=count)
        return [_Place({**where, 'group': group, 'col': i}) for i in range(count)]

    def tabs(self, names):
        names = [str(name) for name in names]
        group = _APP.group()
        where = self._at()
        _APP.add(where, 'tabs', group_id=group, count=len(names), names=names)
        return [_Place({**where, 'group': group, 'col': i}) for i in range(len(names))]

    def expander(self, label, expanded=False):
        group = _APP.group()
        where = self._at()
        _APP.add(where, 'expander', str(label), group_id=group, count=1)
        return _Place({**where, 'group': group, 'col': 0})

    def container(self, **kwargs):
        return _Place(self._at())


class _StreamlitModule(types.ModuleType):
    @property
    def session_state(self):
        return _APP.session


def _make_streamlit():
    module = _StreamlitModule('streamlit')
    main = _Place()
    for name in dir(_Place):
        if not name.startswith('_'):
            setattr(module, name, getattr(main, name))
    module.sidebar = _Place({'sidebar': True})

    def cache_data(func=None, **kwargs):
        return func if func is not None else (lambda inner: inner)

    module.cache_data = cache_data
    module.cache_resource = cache_data
    module.set_page_config = lambda **kwargs: None
    module.stop = _stop
    module.rerun = _rerun
    return module


sys.modules['streamlit'] = _make_streamlit()


class _Run:
    """En körning av elevens program med egna svar till input()."""

    def __init__(self, compiled, answers, run=True, widgets=None, session=None):
        self.capture = _Capture()
        self.app = _App(widgets, session)
        self.answers = [str(answer) for answer in answers]
        self.namespace = {
            '__name__': '__main__',
            '__builtins__': builtins,
            'input': self._input,
        }
        self.error = None
        if not run:
            return
        with self:
            self._execute(compiled)
        # Det programmet skrev ut, innan testerna anropar något.
        self.output = _lines(self.capture.printed)

    def _execute(self, compiled):
        for _ in range(_MAX_RERUNS):
            try:
                exec(compiled, self.namespace)
            except _Stop:
                pass
            except _Rerun:
                # Som i Streamlit: sidan ritas om och knappar är inte
                # tryckta längre, men session_state finns kvar.
                self.app.elements.clear()
                self.app.widgets = {
                    label: value for label, value in self.app.widgets.items()
                    if label not in self.app.buttons
                }
                continue
            except BaseException as error:
                self.error = _error_info(error, STUDENT_FILE, self.namespace)
            return

    def _input(self, prompt=''):
        console = self.capture.console
        console.append(str(prompt))
        if not self.answers:
            console.append('\n')
            raise EOFError('input() fick inget svar – det finns inga fler svar att läsa')
        answer = self.answers.pop(0)
        console.append(answer + '\n')
        return answer

    # print under körningen och testerna hamnar i capture.
    def __enter__(self):
        global _APP
        self._old_stdout = sys.stdout
        sys.stdout = self.capture
        _APP = self.app

    def __exit__(self, *exc):
        sys.stdout = self._old_stdout
        return False

    def element(self, kind, index=0):
        found = [e for e in self.app.elements if e['type'] == kind]
        return found[index] if index < len(found) else None

    def shown(self, kind=None):
        return [e['text'] for e in self.app.elements if kind is None or e['type'] == kind]

    def evaluate(self, test):
        entry = {'passed': False}
        if self.error is not None:
            entry['error'] = self.error
            return entry
        with self:
            try:
                if test['code'] == '__output':
                    actual = self.output
                else:
                    # Så att ett test kan titta på en del av utskriften,
                    # t.ex. __output[-1].
                    self.namespace['__output'] = self.output
                    # Så att ett test kan kolla att en funktion gör raise.
                    self.namespace['__raises'] = _raises
                    self.namespace['__message'] = _message
                    # Det en Streamlit-app visade, t.ex. __shown('title').
                    self.namespace['__app'] = [[e['type'], e['text']] for e in self.app.elements]
                    self.namespace['__shown'] = self.shown
                    # Hela elementet, t.ex. __element('bar_chart')['labels'].
                    self.namespace['__element'] = self.element
                    # Det ett matplotlib-diagram visar, t.ex. __figur()["titel"].
                    self.namespace['__figur'] = _figure_info
                    for extra in TEST_GLOBALS:
                        self.namespace.update(extra(self.namespace))
                    actual = eval(compile(test['code'], TEST_FILE, 'eval'), self.namespace)
                entry['passed'] = _same(actual, test['expected'])
                entry['actual'] = _jsonable(actual)
                entry['repr'] = repr(_plain(actual))
            except BaseException as error:
                entry['error'] = _error_info(error, STUDENT_FILE, self.namespace)
        return entry


# --- Diagram (matplotlib) ---

def _pyplot():
    # Bara om eleven redan använt matplotlib: att importera det är långsamt.
    return sys.modules.get('matplotlib.pyplot')


def _close_figures():
    plt = _pyplot()
    if plt is not None:
        plt.close('all')


def _figures():
    """Varje figur programmet ritade, som PNG i base64."""
    plt = _pyplot()
    if plt is None:
        return []
    import base64
    import io
    images = []
    for number in plt.get_fignums():
        buffer = io.BytesIO()
        plt.figure(number).savefig(buffer, format='png', dpi=80, bbox_inches='tight')
        images.append(base64.b64encode(buffer.getvalue()).decode('ascii'))
    return images


def _bars(ax):
    # Staplar från bar, barh och hist: höjden, eller bredden när de ligger ner.
    from matplotlib.container import BarContainer
    values = []
    for container in ax.containers:
        if isinstance(container, BarContainer):
            horizontal = getattr(container, 'orientation', 'vertical') == 'horizontal'
            for patch in container.patches:
                value = patch.get_width() if horizontal else patch.get_height()
                values.append(round(float(value), 2))
    return values


def _touching(patches):
    # hist ritar staplar kant i kant, bar lämnar ett mellanrum.
    edges = sorted((p.get_x(), p.get_x() + p.get_width()) for p in patches)
    return len(edges) > 1 and all(
        abs(right - edges[i + 1][0]) < 1e-9 for i, (_, right) in enumerate(edges[:-1])
    )


def _kinds(ax):
    from matplotlib.collections import PathCollection
    from matplotlib.container import BarContainer
    kinds = []
    for container in ax.containers:
        if isinstance(container, BarContainer):
            if getattr(container, 'orientation', 'vertical') == 'horizontal':
                kinds.append('liggande staplar')
            elif _touching(container.patches):
                kinds.append('histogram')
            else:
                kinds.append('staplar')
    if ax.lines:
        kinds.append('linje')
    if any(isinstance(item, PathCollection) for item in ax.collections):
        kinds.append('punkter')
    return sorted(set(kinds))


def _figure_info(index=0):
    """__figur() i ett test: det diagrammet visar, utan att titta på pixlar.

    index väljer diagram när en figur har flera (plt.subplots).
    """
    plt = _pyplot()
    if plt is None or not plt.get_fignums():
        return None
    figure = plt.gcf()
    figure.canvas.draw()
    if index >= len(figure.axes):
        return None
    ax = figure.axes[index]
    legend = ax.get_legend()
    return {
        'typ': _kinds(ax),
        'titel': ax.get_title(),
        'x': ax.get_xlabel(),
        'y': ax.get_ylabel(),
        'staplar': _bars(ax),
        'etiketter': [label.get_text() for label in ax.get_xticklabels()],
        'y_etiketter': [label.get_text() for label in ax.get_yticklabels()],
        'linjer': [[round(float(v), 2) for v in line.get_ydata()] for line in ax.lines],
        'punkter': sum(len(item.get_offsets()) for item in ax.collections),
        'forklaring': [text.get_text() for text in legend.get_texts()] if legend else [],
        'diagram': len(figure.axes),
        'y_min': round(float(ax.get_ylim()[0]), 2),
    }


def _app_run(compiled, test, answers):
    # widgets är vad eleven ställt in, t.ex. {"Antal": 3, "Räkna": True}.
    # En lista är flera klick efter varandra: Streamlit kör om hela
    # programmet efter varje, och st.session_state finns kvar mellan dem.
    widgets = test['widgets']
    session = _SessionState()
    for clicks in widgets if isinstance(widgets, list) else [widgets]:
        run = _Run(compiled, test.get('inputs', answers), widgets=clicks, session=session)
        if run.error is not None:
            break
    return run


def run_student(code, tests_json, inputs_json, files_json='{}'):
    _write_files(files_json)
    tests = json.loads(tests_json)
    result = {'syntaxError': None, 'error': None, 'tests': []}

    try:
        compiled = compile(code, STUDENT_FILE, 'exec')
    except SyntaxError as error:
        result['syntaxError'] = _error_info(error, STUDENT_FILE)
        return json.dumps(result)

    _close_figures()
    main = _Run(compiled, json.loads(inputs_json))
    result['error'] = main.error
    if main.error is None:
        # Ett test med egna inputs kör programmet en gång till med de
        # svaren, så att alla grenar i en if går att rätta.
        for test in tests:
            if 'widgets' in test:
                run = _app_run(compiled, test, json.loads(inputs_json))
            elif 'inputs' in test:
                run = _Run(compiled, test['inputs'])
            else:
                run = main
            result['tests'].append(run.evaluate(test))

    result['output'] = main.output
    result['console'] = _lines(main.capture.console)
    result['app'] = main.app.elements
    result['figures'] = _figures()
    _close_figures()
    return json.dumps(result)


# --- Kör rad för rad ---

MAX_STEPS = 300
# Namn som finns i namespace men inte är elevens egna variabler.
_HIDDEN = {'input', '__builtins__', '__name__', '__output', '__raises', '__message', '__app', '__shown', '__figur', '__element'}


class _StepLimit(Exception):
    pass


def _write_files(files_json):
    # Datafiler som övningen behöver, t.ex. en CSV till pandas. De skrivs
    # om vid varje körning, så att eleven inte kan förstöra dem.
    for name, text in json.loads(files_json or '{}').items():
        # Flask läser mallarna från mappen templates/.
        os.makedirs(os.path.dirname(name) or '.', exist_ok=True)
        with open(name, 'w', encoding='utf-8') as file:
            file.write(text)


def _show(value):
    # repr direkt, så att en lista som ändras senare inte ändrar gamla steg.
    if isinstance(value, type):
        return f'klass {value.__name__}'
    # En hel tabell blir för lång. Visa storleken och kolumnerna i stället.
    kind = type(value).__name__
    if kind == 'DataFrame':
        return f'tabell med {len(value)} rader: ' + ', '.join(map(str, value.columns))
    if kind == 'Series':
        return f'kolumn {value.name} med {len(value)} rader'
    value = _plain(value)
    if callable(value) and hasattr(value, '__name__'):
        return f'funktion {value.__name__}'
    if isinstance(value, types.ModuleType):
        return f'modul {value.__name__}'
    # Egna objekt utan __repr__ visas med sina attribut, inte som
    # <__main__.Hund object at 0x…>.
    if type(value).__repr__ is object.__repr__ and hasattr(value, '__dict__'):
        fields = ', '.join(f'{key}={item!r}' for key, item in vars(value).items())
        text = f'{type(value).__name__}({fields})'
    else:
        text = repr(value)
    return text if len(text) <= 200 else text[:197] + '…'


def _variables(names):
    return [
        [name, _show(value)]
        for name, value in list(names.items())
        if name not in _HIDDEN and not name.startswith('__')
    ]


# Funktioner som kod (inte modulen, en klassdefinition eller en generator),
# så att bara riktiga return blir ett eget steg.
_CO_OPTIMIZED = 0x1
_CO_GENERATORS = 0x20 | 0x80 | 0x200


def _branches(code):
    """Raderna där koden väljer väg (if, elif, for, while) och raderna i
    blocket under. Så kan stegen säga om villkoret var sant och vilket varv
    en loop är på."""
    lines = code.splitlines()
    found = {}
    for node in ast.walk(ast.parse(code)):
        if not isinstance(node, (ast.If, ast.For, ast.While)):
            continue
        # if x: y = 1 på en rad går inte att se i spåret.
        if node.body[0].lineno == node.lineno:
            continue
        kind = type(node).__name__.lower()
        if kind == 'if' and lines[node.lineno - 1].lstrip().startswith('elif'):
            kind = 'elif'
        found[node.lineno] = (kind, node.body[0].lineno, node.body[-1].end_lineno, bool(node.orelse))
    return found


def _call_label(frame):
    # dubbla(tal=4): funktionen med värdena den fick. self visas inte, det
    # är objektet som redan syns bland variablerna.
    code = frame.f_code
    count = code.co_argcount + code.co_kwonlyargcount
    args = [
        f'{name}={_show(frame.f_locals[name])}'
        for name in code.co_varnames[:count]
        if name != 'self' and name in frame.f_locals
    ]
    return f'{code.co_name}({", ".join(args)})'


def step_student(code, inputs_json, example, files_json='{}'):
    """Kör koden med sys.settrace och sparar ett steg per rad: raden som
    körs härnäst, variablerna just då och hur mycket som skrivits ut.
    Ett return blir också ett steg, med värdet funktionen lämnar tillbaka."""
    try:
        compiled = compile(code, STUDENT_FILE, 'exec')
    except SyntaxError as error:
        return json.dumps({'syntaxError': _error_info(error, STUDENT_FILE), 'steps': []})

    _write_files(files_json)
    run = _Run(compiled, json.loads(inputs_json), run=False)
    branches = _branches(code)
    steps = []
    last_line = {}  # frame -> förra raden i samma anrop
    rounds = {}  # (frame, rad) -> varv i loopen
    calls = {}  # frame -> 'dubbla(tal=4)'
    failing = set()  # frames där ett fel är på väg ut
    ending = {}  # flow när programmet tar slut, till sista steget

    def is_function(frame):
        flags = frame.f_code.co_flags
        return bool(flags & _CO_OPTIMIZED) and not flags & _CO_GENERATORS

    def scope_vars(frame):
        # I en funktion visas dess lokala variabler, annars programmets.
        if frame.f_code.co_name == '<module>':
            return _variables(run.namespace)
        return _variables(frame.f_locals)

    def outer_frames(frame):
        # Anropen som väntar på att den här funktionen ska bli klar,
        # yttersta först.
        found = []
        frame = frame.f_back
        while frame is not None:
            if frame.f_code.co_filename == STUDENT_FILE:
                found.append({'call': calls.get(frame), 'vars': scope_vars(frame)})
            frame = frame.f_back
        return found[::-1]

    def flow_to(frame, line):
        # line är None när anropet är slut, t.ex. efter en loop sist i koden.
        previous = last_line.get(frame)
        last_line[frame] = line
        # Kommer vi in i en loop utifrån börjar varven om från noll.
        branch = branches.get(line)
        if branch and branch[0] in ('for', 'while'):
            if previous is None or not branch[1] <= previous <= branch[2]:
                rounds[(frame, line)] = 0
        if previous not in branches or previous == line:
            return None
        kind, start, end, has_else = branches[previous]
        taken = line is not None and start <= line <= end
        flow = {'line': previous, 'kind': kind, 'taken': taken, 'hasElse': has_else}
        if kind in ('for', 'while'):
            key = (frame, previous)
            if taken:
                rounds[key] = rounds.get(key, 0) + 1
            flow['round'] = rounds.get(key, 0)
        return flow

    def record(frame, line, **extra):
        if len(steps) >= MAX_STEPS:
            raise _StepLimit()
        name = frame.f_code.co_name
        step = {
            'line': line,
            'scope': None if name == '<module>' else name,
            'call': calls.get(frame),
            'vars': scope_vars(frame),
            'outer': outer_frames(frame),
            'out': len(''.join(run.capture.console)),
        }
        step.update({key: value for key, value in extra.items() if value is not None})
        steps.append(step)

    def local_trace(frame, event, arg):
        if event == 'line':
            failing.discard(frame)
            line = frame.f_lineno
            record(frame, line, flow=flow_to(frame, line))
        elif event == 'exception':
            failing.add(frame)
        elif event == 'return' and frame not in failing:
            flow = flow_to(frame, None)
            if is_function(frame):
                record(frame, frame.f_lineno, returned=_show(arg), flow=flow)
            elif frame.f_code.co_name == '<module>' and flow:
                ending['flow'] = flow
        return local_trace

    def global_trace(frame, event, arg):
        # Bara elevens egen kod spåras, inte print, input eller harness.
        if frame.f_code.co_filename != STUDENT_FILE:
            return None
        if is_function(frame):
            calls[frame] = _call_label(frame)
        return local_trace

    result = {'syntaxError': None, 'error': None, 'example': None, 'result': None}

    def traced(callback):
        with run:
            sys.settrace(global_trace)
            try:
                return callback()
            except (_Stop, _Rerun):
                # Kör rad för rad följer bara första varvet.
                pass
            except _StepLimit:
                result['error'] = {
                    'type': 'StepLimit',
                    'message': f'Stoppade efter {MAX_STEPS} steg.',
                    'line': steps[-1]['line'] if steps else None,
                }
            except BaseException as error:
                result['error'] = _error_info(error, STUDENT_FILE, run.namespace)
            finally:
                sys.settrace(None)

    traced(lambda: exec(compiled, run.namespace))
    # Består koden bara av funktioner händer inget när den körs. Då anropar
    # vi den som testet gör och visar vad den returnerade.
    definitions = (ast.FunctionDef, ast.ClassDef, ast.Import, ast.ImportFrom)
    only_definitions = all(isinstance(stmt, definitions) for stmt in ast.parse(code).body)
    if result['error'] is None and example and only_definitions:
        result['example'] = example
        value = traced(lambda: eval(compile(example, TEST_FILE, 'eval'), run.namespace))
        if result['error'] is None:
            result['result'] = _show(value)

    if result['error'] is None:
        steps.append({
            'line': None,
            'scope': None,
            'call': None,
            'vars': _variables(run.namespace),
            'outer': [],
            'out': len(''.join(run.capture.console)),
            **ending,
        })
    result['steps'] = steps
    result['console'] = ''.join(run.capture.console)
    return json.dumps(result)
