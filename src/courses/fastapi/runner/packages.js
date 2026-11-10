// FastAPI och allt det behöver (Starlette, Pydantic, anyio …) ingår i
// Pyodide, så inga egna wheel-filer behövs som för Flask. Pyodide hämtar
// beroendena själv.
export const PYODIDE_PACKAGES = ['fastapi', 'pydantic'];
