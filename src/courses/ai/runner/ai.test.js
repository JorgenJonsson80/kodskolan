import { beforeAll, describe, expect, it } from 'vitest';
import { nodeRunAi } from '../test/nodeAi';

let run;
beforeAll(async () => {
  run = await nodeRunAi();
}, 120000);

const test = (code, expected) => ({ code, expected });
const START =
  'import anthropic\n\nclient = anthropic.Anthropic()\n\ndef fraga(text, **extra):\n    return client.messages.create(model="claude-opus-5-5", max_tokens=1000, messages=[{"role": "user", "content": text}], **extra)\n';

function passed(code, tests, modell) {
  const result = run({ code, tests, modell });
  expect(result.syntaxError).toBeNull();
  expect(result.error).toBeNull();
  for (const entry of result.tests) expect(entry.error ?? null).toBeNull();
  return result.tests.map(entry => entry.passed);
}

describe('låtsasmodellen', () => {
  it('svarar som SDK:t: Message med content-block, stop_reason och usage', () => {
    expect(
      passed(START, [
        test("fraga('Hej').content[0].type", 'text'),
        test("fraga('Hej').content[0].text", 'Hej! Hur kan jag hjälpa dig?'),
        test("fraga('Hej').stop_reason", 'end_turn'),
        test("fraga('Hej').role", 'assistant'),
        test("fraga('Hej').usage.output_tokens > 0", true),
        test("fraga('Vad är 7 * 6?').content[0].text", 'Det blir 42.'),
      ]),
    ).toEqual(Array(6).fill(true));
  });

  it('kollar anropet som det riktiga API:et', () => {
    const code = `${START}\ndef fel(**kw):\n    try:\n        client.messages.create(**kw)\n    except anthropic.APIStatusError as e:\n        return [type(e).__name__, e.status_code]\n`;
    expect(
      passed(code, [
        test(
          "fel(model='claude-opus-5-5', messages=[{'role': 'user', 'content': 'x'}])",
          ['BadRequestError', 400],
        ),
        test(
          "fel(model='gpt', max_tokens=10, messages=[{'role': 'user', 'content': 'x'}])",
          ['NotFoundError', 404],
        ),
        test(
          "fel(model='claude-opus-5-5', max_tokens=10, messages=[{'role': 'assistant', 'content': 'x'}])",
          ['BadRequestError', 400],
        ),
      ]),
    ).toEqual([true, true, true]);
  });

  it('styrs av systemprompten', () => {
    expect(
      passed(START, [
        test(
          "fraga('Hej', system='Du är en pirat.').content[0].text",
          'Arrr! Hej! Hur kan jag hjälpa dig?',
        ),
        test(
          "fraga('Hej', system='Svara med ett ord.').content[0].text",
          'Hej',
        ),
        test(
          "fraga('Hej', system='Svara på engelska.').content[0].text",
          'Hi! How can I help you?',
        ),
      ]),
    ).toEqual([true, true, true]);
  });

  it('minns bara det som skickas med i historiken', () => {
    const code = `${START}\nhistorik = [{'role': 'user', 'content': 'Jag heter Ada'}]\nsvar = client.messages.create(model='claude-opus-5-5', max_tokens=100, messages=historik)\nhistorik.append({'role': 'assistant', 'content': svar.content})\nhistorik.append({'role': 'user', 'content': 'Vad heter jag?'})\nmed = client.messages.create(model='claude-opus-5-5', max_tokens=100, messages=historik)\n`;
    expect(
      passed(code, [
        test('med.content[0].text', 'Du heter Ada.'),
        test(
          "fraga('Vad heter jag?').content[0].text",
          'Det vet jag inte – du har inte berättat det.',
        ),
        test("__anrop()[1]['messages'][1]['content'][0]['type']", 'text'),
      ]),
    ).toEqual([true, true, true]);
  });

  it('klipper svaret vid max_tokens', () => {
    expect(
      passed(START, [
        test(
          "(lambda s: [s.stop_reason, s.content[0].text])(client.messages.create(model='claude-opus-5-5', max_tokens=3, messages=[{'role': 'user', 'content': 'Berätta om rymden'}]))",
          ['max_tokens', 'Jag är Kodskolans'],
        ),
      ]),
    ).toEqual([true]);
  });

  it('använder verktyg enligt övningens regler, och svarar på resultatet', () => {
    const modell = [
      {
        om: 'väder',
        verktyg: { namn: 'hamta_vader', input: { stad: 'Malmö' } },
      },
      { efter_verktyg: true, svar: 'I Malmö är det {resultat}.' },
    ];
    const code = `${START}\nVERKTYG = [{'name': 'hamta_vader', 'description': 'Vädret i en stad', 'input_schema': {'type': 'object', 'properties': {'stad': {'type': 'string'}}, 'required': ['stad']}}]\nmeddelanden = [{'role': 'user', 'content': 'Vad är det för väder i Malmö?'}]\nforsta = client.messages.create(model='claude-opus-5-5', max_tokens=500, tools=VERKTYG, messages=meddelanden)\nanrop = next(b for b in forsta.content if b.type == 'tool_use')\nmeddelanden.append({'role': 'assistant', 'content': forsta.content})\nmeddelanden.append({'role': 'user', 'content': [{'type': 'tool_result', 'tool_use_id': anrop.id, 'content': 'sol'}]})\nandra = client.messages.create(model='claude-opus-5-5', max_tokens=500, tools=VERKTYG, messages=meddelanden)\n`;
    expect(
      passed(
        code,
        [
          test('forsta.stop_reason', 'tool_use'),
          test('[anrop.name, anrop.input]', ['hamta_vader', { stad: 'Malmö' }]),
          test('andra.content[0].text', 'I Malmö är det sol.'),
          test('andra.stop_reason', 'end_turn'),
        ],
        modell,
      ),
    ).toEqual([true, true, true, true]);
  });

  it('säger till när tool_use_id inte finns', () => {
    const code = `${START}\ntry:\n    client.messages.create(model='claude-opus-5-5', max_tokens=10, messages=[{'role': 'user', 'content': [{'type': 'tool_result', 'tool_use_id': 'toolu_x', 'content': '1'}]}])\n    fel = None\nexcept anthropic.BadRequestError as e:\n    fel = 'tool_use_id' in str(e)\n`;
    expect(passed(code, [test('fel', true)])).toEqual([true]);
  });

  it('ger strukturerade svar med parse och Pydantic', () => {
    const modell = [{ om: 'Ada', json: { namn: 'Ada', alder: 36 } }];
    const code = `${START}\nfrom pydantic import BaseModel\n\nclass Person(BaseModel):\n    namn: str\n    alder: int\n\nsvar = client.messages.parse(model='claude-opus-5-5', max_tokens=500, messages=[{'role': 'user', 'content': 'Ada är 36 år'}], output_format=Person)\n`;
    expect(
      passed(
        code,
        [
          test('svar.parsed_output.namn', 'Ada'),
          test('svar.parsed_output.alder', 36),
          test(
            "__anrop()[0]['output_config']['format']['type']",
            'json_schema',
          ),
        ],
        modell,
      ),
    ).toEqual([true, true, true]);
  });

  it('kör AsyncAnthropic med låtsastid, och asyncio.run fungerar', () => {
    const code = `import asyncio\nimport anthropic\n\nclient = anthropic.AsyncAnthropic()\n\nasync def fraga(text):\n    svar = await client.messages.create(model='claude-opus-5-5', max_tokens=100, messages=[{'role': 'user', 'content': text}])\n    return svar.content[0].text\n\nasync def tre():\n    return await asyncio.gather(fraga('1 + 1'), fraga('2 + 2'), fraga('3 + 3'))\n\nsvar = asyncio.run(tre())\n`;
    expect(
      passed(code, [
        test('svar', ['Det blir 2.', 'Det blir 4.', 'Det blir 6.']),
        test('__sekunder(lambda: asyncio.run(tre()))', 1),
      ]),
    ).toEqual([true, true]);
  });

  it('räknar tiden för vanliga anrop också', () => {
    expect(
      passed(START, [
        test("__sekunder(lambda: [fraga('Hej') for _ in range(3)])", 3),
      ]),
    ).toEqual([true]);
  });
});
