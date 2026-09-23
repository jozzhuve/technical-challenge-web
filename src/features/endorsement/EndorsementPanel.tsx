import { endorsementExample } from '../../data/examples';
import { translateEndorsement } from '../../services/api';
import { JsonWorkbench } from '../../shared/components/JsonWorkbench';

/**
 * Presenta el ejercicio de traducción de endosos con el ejemplo definido en el reto.
 *
 * @returns Panel interactivo del servicio de endosos.
 */
export function EndorsementPanel(): React.ReactElement {
  return (
    <JsonWorkbench
      title="Traductor de endosos"
      description="Transforma datos planos usando la plantilla dinámica configurada para producto y tipo de endoso."
      actionLabel="Traducir endoso"
      initialValue={endorsementExample}
      onSubmit={translateEndorsement}
    />
  );
}
