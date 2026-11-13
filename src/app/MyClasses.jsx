import { useEffect, useState } from 'react';
import { fetchMyClasses, leaveClass } from './classes';

// På /konto: klasserna eleven gått med i, och att lämna dem.
export default function MyClasses({ account }) {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    let ignore = false;
    fetchMyClasses().then(
      list => !ignore && setClasses(list),
      () => {},
    );
    return () => {
      ignore = true;
    };
  }, []);

  if (classes.length === 0) return null;

  async function handleLeave(item) {
    try {
      await leaveClass(item.class_id, account.user.id);
      setClasses(list =>
        list.filter(other => other.class_id !== item.class_id),
      );
    } catch {
      // Står kvar i listan, så att eleven kan försöka igen.
    }
  }

  return (
    <section id="klasser">
      <h2>Dina klasser</h2>
      <p>Lärarna i de här klasserna ser vilka övningar du klarat.</p>
      <ul>
        {classes.map(item => (
          <li key={`klass-${item.class_id}`}>
            <strong>{item.name}</strong> (som {item.display_name}){' '}
            <button
              type="button"
              className="link-button"
              onClick={() => handleLeave(item)}
            >
              Lämna klassen
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
