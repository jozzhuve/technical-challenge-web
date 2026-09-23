import { describe, expect, it } from 'vitest';
import { formatJson, parseJson } from './json';

describe('utilidades JSON', () => {
  it('convierte un texto JSON válido a objeto', () => {
    expect(parseJson('{"ok":true}')).toEqual({ ok: true });
  });

  it('formatea la respuesta con indentación', () => {
    expect(formatJson({ ok: true })).toContain('\n  "ok": true\n');
  });
});
