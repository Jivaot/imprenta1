# Frontend - ImpactoPrint Studio

Frontend React + Vite para una imprenta con enfoque comercial, presencia visual fuerte y una home pensada para convertir visitas en cotizaciones.

## Estado actual

La base incluye una landing visual lista para desarrollo comercial:

- Hero de alto impacto con narrativa enfocada en ventas
- Secciones para catálogo, ventajas, proceso, testimonios y CTA
- Estética premium con gradientes, tipografía expresiva y cards editoriales
- Estructura inicial de Vite para extender hacia catálogo, checkout y panel
- Dockerfile funcional para integrarse con `docker-compose`

## Stack Tecnológico Base

- **React 18** - Biblioteca de UI
- **Vite** - Build tool ultrarrápido
- **CSS custom** - Identidad visual y layout comercial
- **React Router / Redux / Stripe** - Dependencias listas para crecimiento

## Estructura de Carpetas

```
frontend/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── Dockerfile
├── vite.config.js
└── package.json
```

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

La aplicación se abre en `http://localhost:3000`

## Build para Producción

```bash
npm run build
```

El build genera la carpeta `dist/`, lista para despliegue estatico.

## Cloudflare Pages

Configuracion recomendada si el repositorio raiz es `imprenta-estampados/`:

- Root directory: `frontend`
- Build command: `npm run build`
- Build output directory: `dist`

La app ya incluye `public/_redirects` para que las rutas de React Router funcionen al recargar paginas internas.

## Siguientes extensiones recomendadas

- Conectar formulario/CTA con WhatsApp o CRM
- Agregar catálogo filtrable por tipo de impresión
- Integrar cotizador por cantidad, material y acabado
- Crear página de producto con mockups y prueba social

## Licencia

MIT
