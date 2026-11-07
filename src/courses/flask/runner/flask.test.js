import { beforeAll, describe, expect, it } from 'vitest';
import { nodeRunFlask } from '../test/nodeFlask';

let run;
beforeAll(async () => {
  run = await nodeRunFlask();
}, 120000);

const APP = `from flask import Flask, jsonify, request, session, redirect, render_template

app = Flask(__name__)
app.secret_key = 'hemligt'
hundar = [{'id': 1, 'namn': 'Bamse'}]

@app.get('/')
def hem():
    return 'Hej!'

@app.get('/hundar')
def lista():
    return hundar

@app.post('/hundar')
def ny():
    data = request.get_json()
    hundar.append({'id': len(hundar) + 1, 'namn': data['namn']})
    return hundar[-1], 201

@app.post('/logga-in')
def logga_in():
    session['namn'] = request.form['namn']
    return redirect('/jag')

@app.get('/jag')
def jag():
    return session.get('namn', 'ingen')

@app.get('/sida')
def sida():
    return render_template('sida.html', namn='Ada')

@app.get('/krasch')
def krasch():
    return 1 / 0

if __name__ == '__main__':
    app.run(debug=True)
`;

const test = code => ({ code, expected: null });

describe('flask_harness', () => {
  it('anropar appen i testerna', () => {
    const result = run({
      code: APP,
      files: { 'templates/sida.html': '<h1>Hej {{ namn }}</h1>' },
      tests: [
        { code: "__get('/').text", expected: 'Hej!' },
        { code: "__get('/hundar').json", expected: [{ id: 1, namn: 'Bamse' }] },
        { code: "__post('/hundar', {'namn': 'Saga'}).status", expected: 201 },
        { code: "__get('/finns-inte').status", expected: 404 },
        { code: "__get('/sida').text", expected: '<h1>Hej Ada</h1>' },
        {
          code: "(k := __klient(), k.post('/logga-in', form={'namn': 'Bo'}), k.get('/jag').text)[-1]",
          expected: 'Bo',
        },
        { code: "__get('/jag').text", expected: 'ingen' },
        { code: '__vagar()[0]', expected: ['GET', '/'] },
      ],
    });
    expect(result.error).toBeNull();
    expect(result.tests.map(entry => entry.passed)).toEqual(
      Array(8).fill(true),
    );
  });

  it('ett fel i en väg blir ett Python-fel med rad', () => {
    const result = run({ code: APP, tests: [test("__get('/krasch')")] });
    expect(result.tests[0].error.type).toBe('ZeroDivisionError');
    expect(result.tests[0].error.line).toBe(36);
  });

  it('svarar 📮 Anropa', () => {
    const result = run({
      code: APP,
      request: { method: 'POST', path: '/hundar', body: '{"namn": "Saga"}' },
    });
    expect(result.response).toMatchObject({
      status: 201,
      type: 'application/json',
    });
    expect(JSON.parse(result.response.text)).toEqual({ id: 2, namn: 'Saga' });
    expect(result.response.routes).toContainEqual(['GET POST', '/hundar']);
  });

  it('hashar lösenord fast Pyodide saknar OpenSSL', () => {
    const result = run({
      code: `import hashlib
from werkzeug.security import generate_password_hash, check_password_hash
h = generate_password_hash('hemligt123')
`,
      tests: [
        { code: "check_password_hash(h, 'hemligt123')", expected: true },
        { code: "check_password_hash(h, 'fel')", expected: false },
        {
          code: "hashlib.pbkdf2_hmac('sha256', b'password', b'salt', 2).hex()",
          expected:
            'ae4d0c95af6b46d32d0adff928f06dd02a303f8ef3c251dfd6e2d85a95474c43',
        },
      ],
    });
    expect(result.tests.map(entry => entry.passed)).toEqual([true, true, true]);
  });

  it('säger till om appen saknas', () => {
    const result = run({ code: 'x = 1\n', tests: [test("__get('/')")] });
    expect(result.tests[0].error.message).toMatch(/Flask-app/);
  });
});
