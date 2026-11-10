import { beforeAll, describe, expect, it } from 'vitest';
import { nodeRunFastapi } from '../test/nodeFastapi';

let run;
beforeAll(async () => {
  run = await nodeRunFastapi();
}, 120000);

const APP = `from fastapi import FastAPI, HTTPException, Depends, Header
from pydantic import BaseModel
import uvicorn

app = FastAPI(title='Hundpensionatet')

class Hund(BaseModel):
    namn: str
    alder: int = 1

hundar = [{'id': 1, 'namn': 'Bamse', 'alder': 3}]

def nyckel(x_api_nyckel: str = Header()):
    if x_api_nyckel != 'hemlig':
        raise HTTPException(status_code=401, detail='Fel nyckel')
    return x_api_nyckel

@app.get('/')
def hem():
    return {'meddelande': 'Hej!'}

@app.get('/text')
def text():
    return 'Hej'

@app.get('/hundar')
def lista(min_alder: int = 0):
    return [h for h in hundar if h['alder'] >= min_alder]

@app.get('/hundar/{id}')
async def en(id: int):
    for hund in hundar:
        if hund['id'] == id:
            return hund
    raise HTTPException(status_code=404, detail='Hunden finns inte')

@app.post('/hundar', status_code=201)
def ny(hund: Hund, _=Depends(nyckel)):
    ny = {'id': len(hundar) + 1, **hund.model_dump()}
    hundar.append(ny)
    return ny

@app.delete('/hundar/{id}', status_code=204)
def bort(id: int):
    hundar[:] = [h for h in hundar if h['id'] != id]

@app.get('/krasch')
def krasch():
    return 1 / 0

if __name__ == '__main__':
    uvicorn.run(app)
`;

const test = (code, expected) => ({ code, expected });

function check(tests, request = null) {
  const result = run({ code: APP, tests, request });
  expect(result.error).toBeNull();
  return result;
}

describe('FastAPI i Pyodide', () => {
  it('svarar med JSON från en dict, en lista och en text', () => {
    const { tests } = check([
      test("__get('/').json", { meddelande: 'Hej!' }),
      test("__get('/').typ", 'application/json'),
      test("__get('/text').json", 'Hej'),
      test("__get('/hundar').json[0]['namn']", 'Bamse'),
    ]);
    expect(tests.map(entry => entry.passed)).toEqual([true, true, true, true]);
  });

  it('läser adressen och frågan med typer, och svarar 422 på fel typ', () => {
    const { tests } = check([
      test("__get('/hundar/1').json['namn']", 'Bamse'),
      test("__get('/hundar/9').status", 404),
      test("__get('/hundar/9').json", { detail: 'Hunden finns inte' }),
      test("__get('/hundar/ett').status", 422),
      test("len(__get('/hundar?min_alder=5').json)", 0),
    ]);
    expect(tests.map(entry => entry.passed)).toEqual([
      true,
      true,
      true,
      true,
      true,
    ]);
  });

  it('tar emot en Pydantic-modell, med headers och Depends', () => {
    const { tests } = check([
      // Utan header är anropet ofullständigt (422), med fel nyckel 401.
      test("__post('/hundar', {'namn': 'Saga'}).status", 422),
      test(
        "__post('/hundar', {'namn': 'Saga'}, {'x-api-nyckel': 'fel'}).status",
        401,
      ),
      test(
        "__post('/hundar', {'namn': 'Saga'}, {'x-api-nyckel': 'hemlig'}).json",
        { id: 2, namn: 'Saga', alder: 1 },
      ),
      test(
        "__klient({'x-api-nyckel': 'hemlig'}).post('/hundar', {'alder': 2}).status",
        422,
      ),
      test("__get('/hundar/2').json['namn']", 'Saga'),
      test("__delete('/hundar/2').status", 204),
      test("__get('/hundar/2').status", 404),
    ]);
    expect(tests.map(entry => entry.passed)).toEqual(Array(7).fill(true));
  });

  it('svarar 404 och 405 som en riktig app', () => {
    const { tests } = check([
      test("__get('/finns-inte').status", 404),
      test("__post('/').status", 405),
    ]);
    expect(tests.map(entry => entry.passed)).toEqual([true, true]);
  });

  it('visar ett fel i en vägfunktion som ett Python-fel med rad', () => {
    const { tests } = check([test("__get('/krasch').status", 500)]);
    expect(tests[0].error.type).toBe('ZeroDivisionError');
    expect(tests[0].error.line).toBe(49);
  });

  it('har vägarna och dokumentationen', () => {
    const { tests } = check([
      test('__vagar()', [
        ['GET', '/'],
        ['GET POST', '/hundar'],
        ['GET DELETE', '/hundar/{id}'],
        ['GET', '/krasch'],
        ['GET', '/text'],
      ]),
      test("__openapi()['info']['title']", 'Hundpensionatet'),
    ]);
    expect(tests.map(entry => entry.passed)).toEqual([true, true]);
  });

  it('ger svaret på 📮 Anropa, och läser å, ä och ö i adressen', () => {
    const result = run({
      code: `from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get('/hej/{namn}')\ndef hej(namn: str, glad: bool = False):\n    return {'hälsning': 'Hej ' + namn + ('!' if glad else '')}\n`,
      request: { method: 'GET', path: '/hej/Åsa?glad=true' },
    });
    expect(result.response.status).toBe(200);
    expect(JSON.parse(result.response.text)).toEqual({ hälsning: 'Hej Åsa!' });
    expect(result.response.routes).toEqual([['GET', '/hej/{namn}']]);
  });

  it('säger till när det som skickas inte är JSON', () => {
    const result = run({
      code: `from fastapi import FastAPI\n\napp = FastAPI()\n`,
      request: { method: 'POST', path: '/', body: '{namn: Saga}' },
    });
    expect(result.response.bodyError).toMatch(/inte giltig JSON/);
  });

  it('säger till när det inte finns någon app', () => {
    const { tests } = run({
      code: 'x = 1',
      tests: [test("__get('/').status", 200)],
    });
    expect(tests[0].error.message).toMatch(/Hittar ingen FastAPI-app/);
  });

  it('kör async med låtsastid: gather väntar som det längsta anropet', () => {
    const code = `import asyncio
from fastapi import FastAPI

app = FastAPI()

async def fraga(sekunder):
    await asyncio.sleep(sekunder)
    return sekunder

@app.get('/samtidigt')
async def samtidigt():
    loop = asyncio.get_running_loop()
    start = loop.time()
    svar = await asyncio.gather(fraga(1), fraga(2), fraga(3))
    return {'svar': svar, 'tid': loop.time() - start}
`;
    const { tests, error } = run({
      code,
      tests: [test("__get('/samtidigt').json", { svar: [1, 2, 3], tid: 3 })],
    });
    expect(error).toBeNull();
    expect(tests[0].passed).toBe(true);
  });

  it('klarar Depends med yield, som en databasanslutning', () => {
    const code = `import sqlite3
from fastapi import FastAPI, Depends

app = FastAPI()

def databas():
    db = sqlite3.connect(':memory:')
    try:
        yield db
    finally:
        db.close()

@app.get('/summa')
def summa(db = Depends(databas)):
    return {'summa': db.execute('select 1 + 2').fetchone()[0]}
`;
    const { tests, error } = run({
      code,
      tests: [test("__get('/summa').json", { summa: 3 })],
    });
    expect(error).toBeNull();
    expect(tests[0].error ?? null).toBeNull();
    expect(tests[0].passed).toBe(true);
  });
});
