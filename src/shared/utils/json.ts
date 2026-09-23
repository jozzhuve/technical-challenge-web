/**
 * Convierte un texto JSON a un valor tipado como desconocido para evitar conversiones inseguras.
 *
 * @param value Texto ingresado por el usuario.
 * @returns Estructura JSON parseada.
 * @throws Error cuando el contenido no es JSON válido.
 */
export function parseJson(value: string): unknown {
  return JSON.parse(value) as unknown;
}

/**
 * Convierte un valor en JSON formateado para presentarlo en la interfaz.
 *
 * @param value Valor recibido desde un servicio.
 * @returns Texto JSON con indentación legible.
 */
export function formatJson(value: unknown): string {
  return JSON.stringify(value, null, 2);
}
