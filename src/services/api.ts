const API_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL ?? '/api';
const TOKEN_STORAGE_KEY = 'technical-challenge-jwt';

interface ApiErrorPayload {
  code?: string;
  message?: string;
}

/**
 * Obtiene el JWT guardado para las llamadas al gateway.
 *
 * @returns Token almacenado en la sesión actual o null cuando todavía no fue configurado.
 */
export function getApiToken(): string | null {
  return sessionStorage.getItem(TOKEN_STORAGE_KEY);
}

/**
 * Guarda el JWT únicamente durante la sesión del navegador.
 *
 * @param token Token emitido para el consumidor de prueba.
 */
export function saveApiToken(token: string): void {
  sessionStorage.setItem(TOKEN_STORAGE_KEY, token.trim());
}

/**
 * Elimina el JWT configurado para las llamadas al gateway.
 */
export function clearApiToken(): void {
  sessionStorage.removeItem(TOKEN_STORAGE_KEY);
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
  const token = getApiToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  const body = (await response.json()) as unknown;
  if (!response.ok) {
    const errorBody = body as ApiErrorPayload;
    throw new Error(errorBody.message ?? `El gateway respondió HTTP ${response.status}.`);
  }

  return body;
}

/**
 * Solicita al backend la traducción del endoso recibido a través de APISIX.
 *
 * @param payload Endoso plano ingresado en la interfaz.
 * @returns Contrato transformado para el core.
 */
export async function translateEndorsement(payload: unknown): Promise<unknown> {
  return postJson(`${API_BASE_URL}/v1/endorsements/translate`, payload);
}

/**
 * Solicita al backend el cálculo de la ruta óptima para una grúa a través de APISIX.
 *
 * @param payload Grafo, bases disponibles y ubicación del accidente.
 * @returns Ruta mínima calculada por el servicio.
 */
export async function calculateRoute(payload: unknown): Promise<unknown> {
  return postJson(`${API_BASE_URL}/v1/routes/optimal`, payload);
}
