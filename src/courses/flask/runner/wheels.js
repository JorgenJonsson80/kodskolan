// Flask och det Flask behöver som inte finns i Pyodide. De ligger i
// public/wheels, så att sajten inte är beroende av PyPI, och versionerna
// är låsta. Jinja2, MarkupSafe och click kommer med Pyodide.
export const WHEELS = [
  'flask-3.1.3-py3-none-any.whl',
  'werkzeug-3.1.9-py3-none-any.whl',
  'itsdangerous-2.2.0-py3-none-any.whl',
  'blinker-1.9.0-py3-none-any.whl',
];

export const PYODIDE_PACKAGES = ['jinja2', 'markupsafe', 'click'];
