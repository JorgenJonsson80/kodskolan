import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { createClock } from './fakes';
import { createMount } from './mount';

const mount = createMount(createClock());

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

function Form() {
  const [name, setName] = useState('');
  const [agree, setAgree] = useState(false);
  const [sent, setSent] = useState('');
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        setSent(name);
      }}
    >
      <input value={name} onChange={event => setName(event.target.value)} />
      <input
        type="checkbox"
        checked={agree}
        onChange={event => setAgree(event.target.checked)}
      />
      <p className="status">{agree ? 'Ja' : 'Nej'}</p>
      <output>{sent}</output>
    </form>
  );
}

describe('mount', () => {
  it('klickar och läser av texten', () => {
    const app = mount(<Counter />);
    app.click('+1').click('+1');
    expect(app.text('p')).toBe('2');
    expect(app.html()).toBe('<div><p>2</p><button>+1</button></div>');
  });

  it('skriver, kryssar i och skickar formulär', () => {
    const app = mount(<Form />);
    app.type('Ada').check(1);
    expect(app.text('p')).toBe('Ja');
    expect(app.submit()).toBe(true);
    expect(app.text('output')).toBe('Ada');
    expect(app.html()).toContain('<input value="Ada"/>');
  });

  it('ger begripliga fel', () => {
    const app = mount(<Counter />);
    expect(() => app.click('-1')).toThrow('Hittar ingen knapp med texten "-1"');
    expect(() => app.type('x')).toThrow('Hittar inget fält');
    expect(() => mount(<p>Hej</p>).click('Hej')).toThrow('Hittar ingen knapp');
  });

  it('säger till när en händelse saknar hanterare', () => {
    const app = mount(<button>Spara</button>);
    expect(() => app.click('Spara')).toThrow('Glömde du onClick');
  });
});
