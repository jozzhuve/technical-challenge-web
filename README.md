# Frontend del reto técnico

Frontend React + TypeScript + Vite que permite ejecutar los dos ejercicios implementados desde una única interfaz.

## Funcionalidad

- Traductor de endosos con entrada JSON editable.
- Calculador de rutas óptimas con grafo editable.
- Visualización formateada de respuestas y errores.
- Ejemplos precargados a partir de los contratos del reto.

## Ejecución local

```bash
npm install
npm run dev
```

Vite redirige las llamadas locales hacia:

- Endosos: `http://localhost:8080`
- Rutas: `http://localhost:8081`

En Docker, Nginx realiza el proxy interno hacia ambos contenedores.

## Calidad

```bash
npm run lint
npm run test
npm run test:coverage
npm run build
npm run quality
```
