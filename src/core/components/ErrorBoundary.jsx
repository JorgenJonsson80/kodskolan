import { Component } from 'react';
import { trackEvent } from '../lib/analytics';

// Ett fel i en komponent tar annars bort hela sidan. Här visas i stället
// ett meddelande och en knapp för att ladda om. Elevens kod finns kvar,
// eftersom utkasten sparas i webbläsaren vid varje ändring.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    // Bara feltypen och meddelandet, aldrig elevens kod.
    trackEvent('fel_i_sidan', {
      typ: error?.name ?? 'Error',
      meddelande: String(error?.message ?? '').slice(0, 200),
      adress: window.location.pathname,
    });
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="home">
        <section className="card crash-card" role="alert">
          <h1>Hoppsan, något gick fel</h1>
          <p>
            Sidan stötte på ett fel som inte är ditt. Din kod är sparad i
            webbläsaren, så den finns kvar när du laddar om.
          </p>
          <button
            type="button"
            className="primary-button"
            onClick={() => window.location.reload()}
          >
            Ladda om sidan
          </button>
        </section>
      </main>
    );
  }
}
