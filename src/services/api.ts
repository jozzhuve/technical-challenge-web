const ENDORSEMENT_BASE_URL = import.meta.env.VITE_ENDORSEMENT_API_URL ?? '/api/endorsement';
const ROUTING_BASE_URL = import.meta.env.VITE_ROUTING_API_URL ?? '/api/routing';

interface ApiErrorPayload {
  code?: string;
  message?: string;
}

/**
 * Ejecuta una solicitud POST JSON y normaliza los errores HTTP en mensajes legibles.
 *
 * @param url Endpoint destino.
 * @param payload Objeto JSON que será enviado.
 * @returns Respuesta JSON del servicio.
 * @throws Error cuando la respuesta HTTP no es exitosa.
 */
async function postJson(url: string, payload: unknown): Promise<unknown> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const body = (await response.json()) as unknown;
  if (!response.ok) {
    const errorBody = body as ApiErrorPayload;
    throw new Error(errorBody.message ?? `El servicio respondió HTTP ${response.status}.`);
  }

  return body;
}

/**
 * Solicita al backend la traducción del endoso recibido.
 *
 * @param payload Endoso plano ingresado en la interfaz.
 * @returns Contrato transformado para el core.
 */
export async function translateEndorsement(payload: unknown): Promise<unknown> {
  return postJson(`${ENDORSEMENT_BASE_URL}/api/v1/endorsements/translate`, payload);
}

/**
 * Solicita al backend el cálculo de la ruta óptima para una grúa.
 *
 * @param payload Grafo, bases disponibles y ubicación del accidente.
 * @returns Ruta mínima calculada por el servicio.
 */
export async function calculateRoute(payload: unknown): Promise<unknown> {
  return postJson(`${ROUTING_BASE_URL}/api/v1/routes/optimal`, payload);
}
