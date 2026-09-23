import { useState } from 'react';
import { formatJson, parseJson } from '../utils/json';

interface JsonWorkbenchProps {
  title: string;
  description: string;
  actionLabel: string;
  initialValue: unknown;
  onSubmit: (payload: unknown) => Promise<unknown>;
}

/**
 * Editor reutilizable que permite modificar un JSON, enviarlo a un servicio y visualizar su respuesta.
 *
 * @param props Configuración funcional y visual del ejercicio.
 * @returns Componente de trabajo JSON para una operación del reto.
 */
export function JsonWorkbench(props: JsonWorkbenchProps): React.ReactElement {
  const [input, setInput] = useState(formatJson(props.initialValue));
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Valida el JSON ingresado, ejecuta la operación y presenta el resultado.
   */
  async function handleSubmit(): Promise<void> {
    setLoading(true);
    setError('');
    try {
      const payload = parseJson(input);
      const response = await props.onSubmit(payload);
      setOutput(formatJson(response));
    } catch (requestError: unknown) {
      const message = requestError instanceof Error ? requestError.message : 'Ocurrió un error inesperado.';
      setError(message);
      setOutput('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="workbench">
      <header className="workbench__header">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </header>

      <div className="workbench__grid">
        <label className="editor">
          <span>Entrada</span>
          <textarea value={input} onChange={(event) => setInput(event.target.value)} spellCheck={false} />
        </label>

        <div className="editor">
          <span>Salida</span>
          <pre>{output || 'La respuesta del servicio aparecerá aquí.'}</pre>
        </div>
      </div>

      {error ? <div className="error" role="alert">{error}</div> : null}

      <button type="button" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Procesando...' : props.actionLabel}
      </button>
    </section>
  );
}
