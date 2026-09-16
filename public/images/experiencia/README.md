# Capturas de experiencia

Cada archivo WebP se registra en `src/data/experiences.ts` sin el prefijo `public/`.

- `<proyecto>.webp`: captura desktop.
- `<proyecto>-mobile.webp`: captura mobile del mismo proyecto.
- `NN-<proyecto>.webp`: vista numerada; `NN-` define el orden del slider dentro de un proyecto.
- `NN-<proyecto>-mobile.webp`: versión mobile de esa misma vista numerada.
- Formato: WebP.
- Desktop recomendado: 1600 px de ancho o más, con alto real de la captura.
- Mobile recomendado: entre 390 y 430 px de ancho, con alto real de la captura.

Zetenta usa tres vistas ordenadas: `01-zetenta-web-portfolio`, `02-zetenta-web-servicios-desarrollo-web` y `03-zetenta-web-servicios-redes-y-marketing`.

Manantial usa el par `zetenta/manantial-home.webp` (2526 × 1274) y `zetenta/manantial-home-mobile.webp` (850 × 1100) en un mismo objeto ProjectMedia. El cambio entre mobile y desktop se realiza con `<picture>` en el breakpoint de 1024 px.
