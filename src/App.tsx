import { useState } from 'react';
import { EndorsementPanel } from './features/endorsement/EndorsementPanel';
import { RoutingPanel } from './features/routing/RoutingPanel';

type Exercise = 'endorsement' | 'routing';

/**
 * Componente raíz que permite alternar entre los dos ejercicios implementados.
 *
 * @returns Interfaz principal del reto técnico.
 */
export function App(): React.ReactElement {
  const [exercise, setExercise] = useState<Exercise>('endorsement');

  return (
    <main className="page">
      <header className="hero">
        <span className="hero__eyebrow">Reto técnico</span>
        <h1>Evolution Services</h1>
        <p>Validación interactiva de traducción de endosos y asignación óptima de grúas.</p>
      </header>

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
