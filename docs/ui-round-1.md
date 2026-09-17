# Ajustes de UI: bloques 1–7

Aplicados sobre Fase 2 (6ad8dd1), sin dependencias nuevas ni cambios al diseño del hero 3D.

- 4bb1112: header en una línea, etiquetas cortas, sin CTA redundante; ADLA tipográfico y variante de footer. Drawer por debajo de 1024px.
- 797c583: panel del hero con rol destacado, descripción, metadatos y disponibilidad al cierre.
- 25685fb: cards de casos con evidencia destacada, imagen, hover y profundidad; bajada ES/EN.
- b6f84bb: introducción de trayectoria y reveal de línea e hitos al entrar al viewport, con reduced-motion.
- ceba668: Sobre mí en tres párrafos ES/EN, sin listas ni fecha repetida.
- a69e4ed: slider de proyectos compacto, dos columnas desde 768px, imagen móvil acotada y controles reunidos; bajada ES/EN.
- 042c4ad: eliminación de toggle, contexto, provider, estado y variantes de lectura. Una limpieza al montar borra la antigua clave portfolio_mode; no se vuelve a leer ni guardar. Los detalles permanecen en casos y modales. Las listas repetidas de About se reemplazaron por los párrafos nuevos; las tarjetas conservan dos tags y el modal muestra el stack completo.
- 807996a: regreso al inicio desde el logo también restablece el scroll desde subpáginas.

## Verificación

TypeScript estricto, ESLint y renderizado ES/EN verificados. El script cubre 15 trabajos, diez rutas, anclas, navegación entre entradas, dimensiones de 30 capturas locales y conservación del slider de Zetenta. También verifica el enlace de ADLA a home y la ausencia del modo retirado.

Build de producción completado. Persiste el aviso previo de chunk mayor de 500 kB. No se modificó dist ni se desplegó. El navegador no está disponible (descubrimiento vacío): no se pudo verificar visualmente 375, 768, 1024, 1280 y 1440px, ausencia de scroll horizontal ni consola real, en ningún tema o idioma. La revisión de clases responsive no sustituye esa validación.

## Punto 8: propuestas, sin implementar

Entrada, solo en la primera visita de sesión; los tiempos son duraciones propuestas, no métricas de carga:

1. Firma ADLA: el monograma se resuelve tipográficamente durante 250–350 ms en su lugar del header, mientras el contenido ya está visible. Bloqueo añadido: 0 ms.
2. Apertura editorial: nombre y panel se revelan por capas durante 350–450 ms; los enlaces permanecen operables. Bloqueo añadido: 0 ms; la lectura completa del texto animado tarda hasta 450 ms.
3. Trazo de encuadre: una línea violeta recorre el borde del panel durante 450–600 ms, sin ocultar contenido. Bloqueo añadido: 0 ms; mayor presencia visual.

Las tres omiten la animación con reduced-motion y muestran la versión final si el almacenamiento de sesión no está disponible. Ninguna necesita una pantalla de carga.

Hero:

1. Composición tipográfica ADLA en SVG/CSS, con capas de contornos y un único desplazamiento sutil. Identidad compartida con la marca, sin WebGL. Versión estática en móviles modestos y con reduced-motion. Es la opción de menor complejidad.
2. Campo de líneas en Canvas 2D que sugiere el monograma, con respuesta al puntero solo en escritorio. Más orgánico, pero requiere limitar densidad, resolución y frecuencia. Fallback SVG estático si no hay contexto 2D; misma salida estática con reduced-motion.
3. Monograma escultórico con Three.js. Más profundidad y continuidad con el sistema actual; conserva dependencia y costo GPU. Precisa fallback SVG al fallar WebGL y versión estática para móviles modestos y reduced-motion. No hay ahorro de bundle demostrado para esta opción.

Comparación medida con el código actual, usando una transformación de compilación en memoria que omite únicamente la escena del hero y conserva Skills: 1.498.886 → 1.090.477 bytes de JavaScript; gzip 433.636 → 311.514 bytes. Diferencia: 408.409 bytes sin comprimir y 122.122 bytes gzip (28,2%). Este es el margen antes de añadir el código de una alternativa SVG/Canvas 2D, no el peso final prometido de una implementación. No se alteraron los archivos del hero para medirlo.
