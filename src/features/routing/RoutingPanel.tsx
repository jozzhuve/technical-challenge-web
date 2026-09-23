import { routingExample } from '../../data/examples';
import { calculateRoute } from '../../services/api';
import { JsonWorkbench } from '../../shared/components/JsonWorkbench';

/**
 * Presenta el ejercicio de rutas óptimas con el grafo de ejemplo definido en el reto.
 *
 * @returns Panel interactivo del servicio de cálculo de rutas.
 */
export function RoutingPanel(): React.ReactElement {
  return (
    <JsonWorkbench
      title="Ruta óptima de grúa"
      description="Evalúa múltiples bases y calcula el camino mínimo hasta la ubicación del accidente mediante Dijkstra."
      actionLabel="Calcular ruta"
      initialValue={routingExample}
      onSubmit={calculateRoute}
    />
  );
}
