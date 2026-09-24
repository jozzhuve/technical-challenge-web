import { useState } from 'react';
import { EndorsementPanel } from './features/endorsement/EndorsementPanel';
import { RoutingPanel } from './features/routing/RoutingPanel';
import { clearApiToken, getApiToken, saveApiToken } from './services/api';

type Exercise = 'endorsement' | 'routing';

/**
 * Componente raíz que permite alternar entre los dos ejercicios implementados.
 *
 * @returns Interfaz principal del reto técnico.
 */
export function App(): React.ReactElement {
  const [exercise, setExercise] = useState<Exercise>('endorsement');
  const [token, setToken] = useState<string>(() => getApiToken() ?? '');
  const [tokenConfigured, setTokenConfigured] = useState<boolean>(() => Boolean(getApiToken()));

  /**
   * Guarda el token ingresado para utilizarlo en las llamadas protegidas por APISIX.
   */
  const handleSaveToken = (): void => {
    const normalizedToken = token.trim();
    if (!normalizedToken) {
      clearApiToken();
      setTokenConfigured(false);
      return;
    }

    saveApiToken(normalizedToken);
    setTokenConfigured(true);
  };

  /**
   * Limpia el token de la sesión actual.
   */
  const handleClearToken = (): void => {
    clearApiToken();
    setToken('');
    setTokenConfigured(false);
  };

  return (
    <main className="page">
      <header className="hero">
        <span className="hero__eyebrow">Reto técnico</span>
        <h1>Evolution Services</h1>
        <p>Validación interactiva de traducción de endosos y asignación óptima de grúas.</p>
      </header>

      <section className="security-card" aria-label="Seguridad del API Gateway">
        <div>
          <strong>Acceso por API Gateway</strong>
          <p>
            Las operaciones pasan por Apache APISIX y requieren un JWT válido. El token se guarda
            solo durante esta sesión del navegador.
          </p>
        </div>
        <div className="security-card__controls">
          <input
            type="password"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder="Pega aquí el JWT de prueba"
            aria-label="JWT de prueba"
          />
          <button type="button" onClick={handleSaveToken}>
            Guardar JWT
          </button>
          <button type="button" className="button-secondary" onClick={handleClearToken}>
            Limpiar
          </button>
        </div>
        <span className={tokenConfigured ? 'security-status security-status--ok' : 'security-status'}>
          {tokenConfigured ? 'JWT configurado para esta sesión' : 'JWT pendiente'}
        </span>
      </section>

      <nav className="tabs" aria-label="Ejercicios disponibles">
        <button
          type="button"
          className={exercise === 'endorsement' ? 'tab tab--active' : 'tab'}
          onClick={() => setExercise('endorsement')}
        >
          Endosos
        </button>
        <button
          type="button"
          className={exercise === 'routing' ? 'tab tab--active' : 'tab'}
          onClick={() => setExercise('routing')}
        >
          Rutas óptimas
        </button>
      </nav>

      {exercise === 'endorsement' ? <EndorsementPanel /> : <RoutingPanel />}
    </main>
  );
}
