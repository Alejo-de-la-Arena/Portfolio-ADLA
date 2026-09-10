# Auditoría del portfolio de Alejo de la Arena — Fase 1

**Fecha:** 9–10 de septiembre de 2026. **Proyecto:** `portfolio-dev`, en su ubicación actual.

**Dictamen:** la experiencia comercial existe, pero el sitio la comunica peor que sus efectos visuales. El problema principal es de selección y credibilidad del contenido: se promete impacto medible, se destacan landings de Vyzon y se esconden decisiones de negocio más convincentes en páginas secundarias o datos que ya no se renderizan. La prioridad debería ser hacer evidente qué hiciste para clientes reales, qué responsabilidad asumiste y qué estás buscando.

Esta entrega es únicamente una auditoría. No reescribí copy, no modifiqué componentes, no instalé dependencias ni cambié de branch. Las fases siguientes requieren tu aprobación expresa.

## Alcance, evidencia y límites

Revisé las rutas, todos los archivos de `src`, configuración, dependencias declaradas e instaladas, documentación del proyecto y assets de `public`. Leí el contenido ES/EN, incluidos textos de modales, validaciones, labels accesibles y datos antiguos que no alimentan las vistas actuales. No confundí el contenido de los proyectos exhibidos con el código del portfolio.

Comprobaciones realizadas:

- `npm run build`: **falla** por un error de TypeScript en el carrusel de experiencia.
- Typecheck equivalente a `npx tsc --noEmit`, ejecutando el compilador local sin descargar paquetes: **mismo error**.
- Vite directamente, con salida temporal independiente de `dist`: **empaqueta, con warning de tamaño**. Sirve para medir el bundle; no convierte en exitoso el build oficial.
- ESLint sobre `src`, con cero warnings permitidos: **4 warnings; salida fallida**. No lo presento como ejecución del script completo `npm run lint`, que recorre `.` e incluye otros directorios.
- Servidor Vite: inicia. HTTP 200 para `/`, `/experiencia/zetenta` y `/experiencia/renova-tu-cocina`.
- Lectura de dimensiones reales de los 26 WebP y descarga en memoria de los cuatro PNG externos de Proyectos.
- Contrastes calculados a partir de los colores CSS, con luminancia relativa sRGB.

**Límite relevante:** no hubo navegador conectado disponible, incluso después de consultar la recuperación indicada por la herramienta. No pude observar el render, medir scrolls reales, registrar errores de consola, probar teclado o verificar ES/EN interactuando. Un HTTP 200 de Vite devuelve el shell HTML; **no demuestra que React renderice bien**. Las observaciones de UX se fundamentan en el código y las estimaciones se identifican como tales. No hay resultados inventados de Lighthouse, LCP, CLS, INP o framerate.

El árbol ya tenía modificaciones en `package-lock.json`, `Experience.tsx` y `experiences.ts`, dos capturas nuevas de Manantial y un worktree antiguo bajo `.claude`. Audité el estado actual, sin tocar esos cambios ni trabajar dentro de ese worktree. El `dist` existente está versionado y no es evidencia del código actual.

## 1.1 Inventario

### Rutas y secciones

En `src/App.tsx` hay tres patrones:

1. `/`: Hero → Sobre mí → Experiencia → Proyectos → Habilidades → Contacto → Footer.
2. `/experiencia/:slug`: detalle con encabezado, resumen, destacados, proyectos con capturas, enlaces y navegación anterior/siguiente; luego Footer global.
3. `*`: renderiza la home como fallback, sin Footer global. No es una página 404 general.

Slugs existentes, en el orden efectivo de la home y de la navegación entre experiencias:

- `solution`
- `zetenta`
- `espacio-boa`
- `renova-tu-cocina`
- `mdvproyectos`
- `fefe-bakes`

Un slug de experiencia inexistente sí muestra una vista de “Experiencia no encontrada”. El estado HTTP de producción para esas URLs no se comprobó.

La home contiene **6 experiencias y 4 proyectos de Vyzon**. Zetenta agrupa 7 trabajos: Manantial, Yacoub, Madero Walk, Exagon Impact, Aeroclub, Zetenta.com y Go Building. Las otras 5 experiencias contienen un proyecto cada una: **12 bloques de trabajo en total**.

La sección Proyectos ofrece un slider automático, una grilla, tres ordenamientos, un filtro por tag y un modal. Sus cuatro entradas son Vyzon, AURA AI, Obsidian y TaskFlow. Vyzon está fijado primero mediante `PINNED_ID = 0`.

Navbar, loader, cursor, command palette y toast se montan globalmente, incluso en los detalles. El modo de lectura tiene dos valores: recruiter y deep; recruiter es el inicial. Idioma y modo persisten en localStorage. Existe tema claro además del oscuro; el inicial depende de la preferencia guardada o del sistema.

### Dónde vive el contenido

| Pieza | Fuente efectiva | Observación |
|---|---|---|
| Nombre, rol, hero, About, redes, proyectos ES, skills | `src/data/content.ts` | También conserva experiencias antiguas y `seoMetadata` sin consumidor. |
| Home EN y labels ES/EN | `src/data/localizedContent.ts` | Mezcla traducciones completas, herencia por índice y strings de interfaz. |
| Timeline y detalles actuales ES/EN | `src/data/experiences.ts` | Fuente activa de las 6 experiencias, fechas, trabajos, capturas y alt. |
| Idioma y selección de datos | `LocaleContext.tsx`, `useLocalizedContent.ts` | `document.lang` se actualiza; no hay URL específica por idioma. |
| Labels de detalle, navegación y lightbox | `ExperienceDetailPage.tsx` | Segundo diccionario ES/EN dentro del componente. |
| Validaciones del formulario | `src/lib/validators.ts` | Mensajes ES/EN; esquema Zod. |
| Textos residuales sin traducir | `Projects.tsx`, `Navbar.tsx`, skills en `content.ts` | Ejemplos en 1.2 e i18n. |
| SEO inicial | `index.html` | Title, description, OG y Twitter estáticos. |
| SEO de detalle | `ExperienceDetailPage.tsx` | Cambia title y description en cliente. |
| Imágenes de experiencia | `public/images/experiencia/` | 26 WebP, de los que 24 están registrados en datos. |
| Imágenes de Proyectos | URLs Cloudinary de `content.ts` | Cuatro PNG sin transformaciones de tamaño/formato. |
| Iconos de tecnologías | `Skills.tsx` y metadatos de skills | Devicon vía jsDelivr, Lucide y fallbacks de texto. |

Hay **dos modelos `Experience` incompatibles**, en `src/types/index.ts` y `src/data/experiences.ts`. Uno usa `employment`, IDs y períodos en texto; el otro `empresa`, slugs y fechas estructuradas. Consolidarlos exige conservar las rutas y migrar datos, no borrar un archivo entero: `content.ts` sigue siendo necesario para otras secciones.

La documentación está desactualizada: `QUICK-START.md` afirma que `content.ts` es el “único archivo” a editar. README y CHECKLIST dan por completados code splitting, teclado, contrastes y reduced motion; el código y las comprobaciones no sostienen esas afirmaciones.

### Sistema de diseño

**Paleta oscura efectiva**, en `src/styles/index.css`, conectada a Tailwind mediante variables RGB:

- Fondos: `#07070b`, `#0e0f16`, `#151726`.
- Texto: `#f5f7ff`, `#b4b9d0`, `#7f869f`.
- Acento: `#7c5cff`; hover `#987dff`; claro `#c8bcff`.
- Bordes: `#23263a`, `#313550`.
- Superficies adicionales: transparencias, blur y gradientes radiales. La paleta clara vive en `:root`.

**Fuentes:** Inter para cuerpo y Sora para display, por Google Fonts mediante `@import`. Se solicita Rubik Glitch, pero no encontré uso en componentes. Esa familia agrega una solicitud declarada en CSS; no atribuyo descarga de su archivo de fuente si el navegador no la utiliza.

**Tipografía:** hero fluido `clamp(2.25rem, 7vw, 7rem)`, line-height 0,95. Secciones generalmente 30/36 px; detalles llegan a 60 px. Cuerpo 14/16/18 px según bloque. Labels de 9, 10 y 11 px conviven con tamaños de Tailwind. Hay convenciones parciales, no una escala semántica única.

**Spacing:** Tailwind aporta la base; `.section-space` usa `clamp(5rem, 10vw, 8rem)` —80 a 128 px por lado con raíz de 16 px—. Contenedor editorial de 72 rem. Hero, Contacto y Footer usan anchos y paddings propios.

`src/lib/designSystem.ts` declara colores, radios 6/10/16/24 px, spacing 6/10/16/24/32/48/72 y gutters, pero **no tiene importaciones consumidoras**. Los radios efectivos combinan `rounded-lg` —8 px—, `xl` —12 px—, `2xl` —16 px—, `3xl` —24 px—, 1,35 rem y pills. El archivo no gobierna la UI.

### Componentes reutilizables

En uso: `Button`, `Card`, `Badge`, `Modal`, `Toast`, `ModeToggle`, `MagneticButton`; Navbar, Footer y CommandPalette; `ExperienceProjectBlock`, `ExperienceImage`, `ExperiencePlaceholder`, `DeviceShowcase`, `ExperienceCarousel` e `ImageLightbox`.

Construidos pero sin consumidores encontrados: `Container`, `Divider`, `SectionHeader`, `TextLink` y `ParticleField`. El hero actual implementa sus orbes directamente; borrar `ParticleField` no elimina el 3D activo.

### i18n: cobertura real

La estructura principal tiene ES/EN: hero, About, proyectos, contacto, validaciones, navegación y las 6 experiencias. Los labels de detalles y lightbox también están traducidos. **Cobertura funcional amplia, cobertura editorial y accesible incompleta.** No asigno un porcentaje sin definir una unidad de conteo fiable.

Huecos verificables:

- `Projects.tsx`: “Ver detalle”, “Proyecto anterior”, “Proyecto siguiente”, “Ir al proyecto …” y `alt="Preview de …"` permanecen en español al elegir EN.
- `Navbar.tsx`: el diálogo móvil conserva “Menú de navegación” y “Cerrar menú”.
- Skills traduce títulos y descripciones de categorías, pero hereda nombres como “CI/CD básico”, “Docker (básico)”, “Agentes IA”, “RAG básico” y “LangChain (básico)”. `CORE/STRONG/FAMILIAR` se muestran iguales en ambos idiomas.
- En ES aparecen “Move”, “Performance-first”, “UI craft”, “Product-minded” y bastante mezcla de idiomas. Los nombres de herramientas pueden quedar; el copy explicativo necesita coherencia.
- La versión EN cambia el orden inicial de proyectos frente a ES. Cambiar de idioma también puede cambiar el proyecto mostrado en la misma posición del slider.
- Un modal abierto conserva el objeto `selectedProject`; cambiar el idioma no vuelve a localizar ese objeto. Existe riesgo de labels y contenido en idiomas distintos.
- ES es el valor inicial, incluso para visitantes internacionales sin preferencia guardada. EN está dentro de Preferencias, no a la vista. No se puede compartir un enlace que fuerce EN.
- Metadata de home sigue en ES. El cambio de `lang` no traduce title, description u Open Graph.

## 1.2 Diagnóstico de contenido

### El posicionamiento habla de intenciones, no de tu experiencia

Las citas siguientes pertenecen al contenido del repositorio. Indico cuándo un texto está almacenado pero no se renderiza.

**Hero y Footer — `content.ts`, inicio; `localizedContent.ts`, inicio:**

- “Construyo productos web de alto impacto, con foco en performance, UX y decisiones técnicas que mueven métricas.” No nombra un cliente, una decisión ni una métrica. Podría firmarlo cualquier dev.
- “Diseño y construyo experiencias frontend de alta complejidad para equipos de producto: desde arquitectura y design systems hasta optimización, observabilidad e iteración continua.” Amplía las promesas sin vincularlas a casos. “Observabilidad” necesita evidencia concreta si se mantiene.
- “Interfaces sólidas, producto claro y ejecución técnica orientada a impacto.” El Footer repite el posicionamiento abstracto del hero, con estructura de tres partes.
- “Performance-first”, “UI craft”, “Product-minded”. Son autodefiniciones bajo una propiedad llamada `proof`; no son pruebas.
- EN: “technical decisions that move business metrics” refuerza la promesa cuantitativa, sin respaldo visible.
- EN: “I design and build interfaces with product criteria”. Se entiende, pero suena trasladado del español. “Product thinking” o una decisión real comunicarían mejor la idea; la reescritura queda para Fase 2.

`tagline` sí aparece en Footer. `valueLine`, `bio`, `location` y `availability` existen en los datos personales pero no se muestran mediante esos campos en las secciones actuales. No hay que confundir “dato cargado” con “dato comunicado”.

**Sobre mí — `content.ts`, objeto `about`:**

- “rápidas, claras y mantenibles”: tríada que repite el hero y no diferencia.
- “patrones que soportan crecimiento sin deuda”: promesa absoluta poco defendible. Una arquitectura puede limitar deuda; no garantizar su ausencia.
- “Motion con intención (no decorativo)”: contradice el protagonismo de los orbes, el cursor y el fondo de Skills.
- “Experiencia antes que ‘efectos’”: vuelve a la misma afirmación en otra tarjeta.
- “feedback inmediato, estados bien definidos y cero fricción”: nueva tríada y absoluto imposible de demostrar sin contexto.
- “Buenas prácticas, naming claro y componentes reutilizables para que el equipo pueda iterar sin miedo.” Enumera estándares esperables, sin ejemplo de colaboración.
- “Se siente premium y funciona para todos.” Autovaloración y generalización contradicha por las barreras de teclado.

Hay 5 highlights y 5 principios. El modo recruiter muestra los primeros 3 de cada grupo: **6 bloques de autodescripción antes de la primera experiencia**. El modo deep llega a 10, pero no agrega casos verificables.

No identifiqué “apasionado” ni “always learning” en el copy activo. El problema no depende de esas palabras: abunda lenguaje intercambiable y autoevaluación.

### Revisión de los trabajos reales

**SOLUTION — `experiences.ts`, líneas 41–44.**

La separación retail/B2B y la logística por zona sí son decisiones relevantes. El bloque las presenta como catálogo de funcionalidades: “Desarrollé catálogo, carrito persistente, checkout con estados explícitos de pago, logística diferenciada por zona y un portal mayorista con registro, aprobación y panel por plan.” Falta explicar el proceso anterior y qué cambió en la operación.

“El negocio opera venta minorista y mayorista en un mismo producto, con flujos y reglas aisladas” es un resultado funcional comprensible; falta confirmar publicación y uso. **Contradicción:** el contenido activo dice “E-commerce en producción”; la experiencia antigua en `content.ts` dice “Proyecto finalizado, próximo a publicación”. La versión actual también incorpora Mercado Pago además de NAVE. No corresponde elegir qué es verdad sin confirmación. No hay enlace al sitio en el bloque activo.

Datos útiles a pedir: fecha de lanzamiento, URL, alcance propio y de terceros, pedidos procesados, cuentas mayoristas, incidencias de pago/envío y proceso previo. No hacen falta todos; un antes/después comprobable alcanza.

**Zetenta — resumen y sus 7 proyectos, `experiences.ts`, líneas 47–57.**

“frontends pixel-perfect”, “Performance, accesibilidad y SEO técnico … desde el inicio” describe una práctica, no su resultado. Hay material para reemplazarlo por alcance real: páginas, plantillas, integraciones y responsabilidades.

| Trabajo | Cita textual actual | Qué falta o qué corregir |
|---|---|---|
| Manantial | “Sitio completo (+45 páginas)” y “Sitio 100% editable, consistencia visual y publicación más rápida.” | +45 páginas es alcance útil, sujeto a confirmación. “100% editable” necesita límites; “más rápida” necesita comparación de tiempo o pasos. No se usa ninguna captura aunque existen dos archivos nuevos. |
| Yacoub | “Datos actualizados y navegación fluida para la búsqueda de propiedades.” | La normalización de una API basada en Excel es el punto fuerte. Falta periodicidad, volumen y cómo se actualizaban antes los datos. “Fluida” no aporta evidencia. |
| Madero Walk | “Mensajes claros por sector y mejor captura de leads.” | “Mejor” afirma una mejora. Pedir tasa/cantidad de consultas, período y fuente; si no existen, describir el flujo entregado sin atribuir conversión. |
| Exagon Impact | “Creé la sección de portfolio, actualicé la home y desarrollé el bloque ‘Conocé al equipo’.” | Aporta alcance, pero no necesidad inicial ni cambio operativo. No forzar métricas de negocio si fue una actualización editorial. |
| Aeroclub | “Aproximadamente 95% de performance según la medición realizada.” | Pedir herramienta, dispositivo, fecha, URL, condiciones y valor previo. Si fue Lighthouse, aclarar que se trata de un puntaje sobre 100, no un porcentaje de velocidad. |
| Zetenta.com | “Construí dos landing pages de servicios y contribuí al portfolio del sitio de Zetenta.” | Distinguir qué fue propio, qué existía y qué componentes se reutilizaron. “Consistentes con la comunicación” es un criterio, no un resultado medido. |
| Go Building | “Captura de consultas directamente conectada al proceso comercial.” | La integración Kommo tiene sentido de negocio. Pedir si eliminó carga manual, cuántos formularios y qué reglas de pipeline/estado resolviste. |

**Espacio BOA — `experiences.ts`, líneas 61–63.**

“Construí el menú, las secciones de espacios, el sistema de actividades y eventos, las inscripciones, autenticación, gift cards y el CRUD interno para operación diaria.” Es una lista larga. El caso mejoraría explicando primero cómo se coordinaban cupos, reservas o gift cards; después, una regla difícil y el cambio para el equipo.

“Producto operativo en producción, con flujos completos para usuarios y autonomía del equipo interno” es plausible como resultado funcional, pero requiere alcance de esa autonomía. EN lo transforma en “A production-ready product”, que comunica preparación y no necesariamente funcionamiento en producción. Pedir usuarios internos, actividades/inscripciones, reglas de cupos y uso de gift cards, sin publicar datos privados.

**Renová Tu Cocina — `experiences.ts`, líneas 66–68; datos antiguos en `content.ts`, líneas 258–318.**

Es uno de los casos con mejor materia prima: edición autónoma, consulta contextualizada por WhatsApp y fallback de datos. “El cliente publica y ordena obras sin intervención de desarrollo” explica un cambio concreto. Puede fortalecerse con frecuencia de publicación o tiempo ahorrado.

“el sitio se mantiene disponible incluso ante una falla de base de datos” necesita acotar qué páginas/flujos cubre el fallback; no equivale a garantizar disponibilidad total. La versión antigua llega a “el sitio nunca se cae por un problema de base de datos”, una afirmación demasiado absoluta.

**Fechas contradictorias:** `content.ts` indica marzo–agosto de 2026; la fuente activa indica marzo–marzo de 2026 y formatea **1 mes**. Además, “13 rutas públicas y privadas” omite que la descripción antigua incluye route handlers dentro de esas 13. Hay que definir qué se contó antes de usarlo como alcance.

La decisión de usar WhatsApp porque era el canal existente del equipo aparece mejor explicada en los datos antiguos. Es el tipo de razonamiento que conviene recuperar y mostrar.

**MDVproyectos — `experiences.ts`, líneas 71–72.**

“Optimización continua del sitio, mejoras de estructura y funcionalidad, y desarrollo de landings de campaña orientadas a conversión.” “Mejoras sostenidas para las campañas y la navegación diaria del sitio.” No sabemos qué estaba mal, qué cambió ni cómo se comprobó. Pedir páginas concretas, una intervención técnica y una evidencia antes/después. No tiene enlace activo.

**Fefe Bakes — `experiences.ts`, líneas 75–76.**

“E-commerce a medida, construido con frontend en React y backend Node/Express sobre PostgreSQL y Sequelize.” Es el ejemplo más claro de tecnologías ocupando el lugar del relato. Resumen, highlights y contribución repiten frontend/backend y stack.

“Base funcional lista para evolucionar catálogo, pedidos y contenido” deja incierto si la tienda llegó a vender o fue una entrega parcial. Pedir estado, responsabilidades, problema de la clienta, pagos/envíos incluidos y resultado de la entrega. No hay URL ni repositorio específico.

### Revisión de los cuatro proyectos de la home

**Vyzon.** “mi laboratorio personal de servicios web donde desarrollo proyectos frontend de alto nivel” y “estética premium y claridad de mensaje” son valoraciones. El problema “no un template genérico, sino un sitio que en sí mismo demostrara la calidad del trabajo” se responde a sí mismo. El caso vuelve a decir “stack moderno, performance cuidada y diseño que comunica valor”. No agrega evidencia nueva. Aclarar si se presenta como agencia operativa, marca personal o laboratorio; hoy alterna esas identidades. Su posición fija prioriza tu agencia sobre tu experiencia como candidato.

**AURA AI.** La descripción explica Next, TypeScript y dos motores de animación, pero no distingue con claridad producto real, concepto o demo. “El producto promete conectar … a cualquier LLM” puede hacer creer que implementaste esa plataforma. Debe quedar claro qué construiste vos. “Landing funcional con 11 secciones … lista para producción” convive con “En desarrollo” y, en datos no renderizados, “Pendiente: integración de formularios y deploy a producción”, aunque hay un enlace desplegado.

El campo Métricas contiene “Particle count adaptivo según capacidad del dispositivo…” y “Animaciones exclusivamente vía transforms…”. Son decisiones o afirmaciones técnicas, **no mediciones**. El cierre “Es un proyecto que un reclutador técnico puede revisar capa por capa y encontrar decisiones fundamentadas” le dice al recruiter qué debería pensar, en vez de darle evidencia para decidir.

**Obsidian.** “El proyecto opera en el límite del stack web” y “El proyecto técnicamente más ambicioso del portfolio” son grandilocuentes. La solución describe shader, HUD, timelines, caché, botones magnéticos y scroll horizontal; falta un criterio verificable de éxito para semejante costo. Las “métricas” vuelven a ser técnicas —pixel ratio limitado, cacheado de GLTF, resize con debounce— sin valores o mediciones.

El caso termina con “no como especialidades separadas, sino integradas en un producto coherente con un criterio de diseño premium claro”: paralelismo y autoelogio. También hay un enlace de demo mientras los datos de resultados dicen que falta deploy. Aclarar si la marca es real, concepto interno o encargo, y qué está terminado.

**TaskFlow.** Es el único que declara inequívocamente “brief ficticio”; conservar esa honestidad y hacerla escaneable. “equipos remotos de 5–50 personas” es audiencia del brief, no usuarios reales. “Landing lista para producción” y presupuesto de JS son alcance/objetivos técnicos, no impacto comercial.

**Error de credibilidad ES/EN:** ES dice “Metas explícitas: Lighthouse performance ≥90 y a11y ≥95 (medir en entorno de producción)”; EN dice “Explicit quality goals: Lighthouse performance >=90 and accessibility >=95 (validated in production).” La traducción convierte un objetivo en validación. Hay que pedir evidencia o corregir EN; nunca inferir un logro.

### Redundancia y señales de redacción artificial

No se puede determinar autoría por el estilo. Sí hay patrones que suenan prefabricados:

- Hero → About → intro de Experiencia → Footer repiten producto, performance, calidad y claridad.
- Experiencias de un solo proyecto repiten el mismo trabajo en resumen, highlights, contribución y stack.
- Las cuatro landings aparecen en slider y grilla. En el modal se acumulan alcance, solución, highlights, stack, métricas y caso con información superpuesta.
- Abundan tríadas (“rápidas, claras y mantenibles”), absolutos (“cero fricción”, “sin deuda”), inglés ornamental (“afterthought”, “delivery”, “flows que cierran”) y autoevaluaciones (“dominio real”, “premium”, “alto nivel”).
- Los campos `decisions` y `results` de Proyectos **no se renderizan en el modal**, aunque las introducciones prometen decisiones y resultados. Parte de la sustancia está guardada pero oculta.

### Datos que necesita un recruiter

| Dato | Situación actual | Acción propuesta |
|---|---|---|
| Nombre y especialidad | Visibles: Full Stack Developer · Frontend Specialist | Conservar la claridad y añadir contexto concreto. |
| ~4 años | Dato de tu pedido, no del sitio visible | Incorporarlo tras precisar desde cuándo se cuenta. La cronología mostrada empieza en octubre de 2024; no prueba por sí sola cuatro años. |
| Seniority declarado | No encontrado | Confirmar nivel objetivo; no inferir Senior por los años. |
| Ubicación personal | Buenos Aires está en datos, no en hero; aparecen ubicaciones de trabajos en detalles | Mostrar Buenos Aires junto a zona horaria y disponibilidad de solapamiento confirmada. |
| Modalidad buscada | `availability` dice freelance y roles remotos, pero no se renderiza | Aclarar full-time/freelance y remoto; híbrido histórico no implica preferencia actual. |
| Disponibilidad de ingreso | No hay fecha, preaviso ni dedicación | Pedir dato. Evitar “disponible ya” sin confirmación. |
| Zona horaria/horas de overlap | No están | Confirmar cómo querés comunicarlas para mercado internacional. |
| Permiso de trabajo / contratación internacional | No está | Pedir mercados y modalidad aplicables; resumir solo lo relevante, sin datos personales innecesarios. |
| Relocalización | No está | Confirmar si está dentro de tu búsqueda; no asumir disposición. |
| Nivel de inglés | No está | Pedir nivel operativo, particularmente conversación/reuniones. |
| CV descargable | No encontré archivo ni enlace | Incorporar un CV real en hero y contacto; no un botón vacío. |
| Contacto directo | Email visible en Contacto; copia al hacer clic. WhatsApp, GitHub y LinkedIn existen | Agregar enlace `mailto:` y controles accesibles. “Directo” existe, pero su operación por teclado es incompleta. |
| Código de proyectos | Componente preparado, datos sin `githubUrl` | Pedir repositorios públicos o una muestra autorizada. El GitHub general no sustituye un enlace específico. |

El contacto actual habla solo a clientes: “Si tenés un proyecto en mente, escribime. Te respondo rápido y con propuesta concreta.” No menciona búsquedas laborales. “Rápido” es además una promesa sin plazo definido.

## 1.3 Diagnóstico de UX y jerarquía

### Primeros cinco segundos y fold

El hero prioriza el nombre enorme, el rol, un párrafo abstracto, dos CTAs y una escena de orbes. Se entiende quién sos y que hacés frontend/full stack. **No alcanza para identificar stack principal, años, ubicación, disponibilidad y tipo de búsqueda.** El recruiter tiene que reconstruirlo después.

El loader agrega **950 ms programados** en la primera visita de sesión, salvo reduced motion. No espera una necesidad de carga concreta. Su tiempo no es una medición de red ni de LCP.

El hero mide como mínimo `100dvh` y tiene delante el espaciador de Navbar de 64 px. Por construcción, la siguiente sección empieza después de una pantalla completa más ese espaciador, antes de considerar desbordes de contenido. En mobile se agrega un canvas de 280 px debajo del texto y se ocultan las redes y los badges del hero. Entre 769 y 1023 px, el canvas pasa antes del texto porque aún no existe la grilla de dos columnas `lg`: riesgo de que la decoración ocupe el primer pantallazo. **Necesita verificación visual.**

### Distancia hasta la primera prueba

Hay dos respuestas distintas:

- Primer trabajo concreto: SOLUTION, después de todo Hero y About. Desde el inicio hay que superar un hero de una pantalla, los 160–256 px de padding total de About, su contenido y la introducción de Experiencia.
- Primera captura de trabajo real: no está en el timeline de home. Requiere abrir un detalle y atravesar su encabezado/resumen. Seguir scrolleando en home conduce a capturas de Vyzon, no a capturas de los clientes de Experiencia.

**Estimación de diseño, no medición:** el primer resumen de cliente puede quedar a unas 2–3 alturas de viewport desde el comienzo en desktop; mobile puede necesitar más por el apilado. No hay un número de “scrolls” certificado: depende de viewport, idioma, modo, fuentes y cuánto desplaza cada gesto. La prueba pendiente debe registrar posiciones en píxeles y dividirlas por la altura del viewport, con tamaños acordados, por ejemplo 1440×900 y 390×844.

El CTA primario “Ver proyectos” salta a las landings de Vyzon. Para este objetivo, debería llevar a una selección de casos reales, conservando acceso a los experimentos como evidencia complementaria.

### Contacto y navegación

- En desktop, “Hablemos” está en Navbar fija y en hero. **No está enterrado en la home.**
- En mobile, el CTA persistente queda dentro del menú. Después del hero hay un paso adicional para encontrarlo.
- Desde detalles, Navbar hace `navigate('/#contact')`, pero `Home` solo maneja explícitamente `#experience`. No hay implementación equivalente que asegure el scroll a Contacto después del montaje. Debe comprobarse y resolverse para todos los hashes.
- Footer y CommandPalette llaman a `scrollToSection` sin cambiar de ruta. En una experiencia no existen `about`, `projects` o `contact`: esas acciones no encuentran destino.
- El nombre en Navbar solo scrollea arriba; no vuelve a home desde un detalle.
- El formulario exige más esfuerzo que un email directo. El email se puede copiar con mouse; falta un enlace convencional y operación por teclado.
- Preferencias agrupa idioma, modo y tema. Para un visitante internacional, el cambio de idioma merece más visibilidad que una preferencia cosmética.

### Orden y densidad

El orden actual pone autodescripción antes de evidencia. El timeline tampoco es cronológico: SOLUTION → Zetenta → BOA → Renová, mezclando 2026 y 2025. Un orden editorial puede ser válido, pero una línea temporal con fechas comunica cronología; hay que elegir un criterio y hacerlo evidente.

Orden propuesto: **Hero factual → casos de clientes seleccionados → trayectoria compacta → skills esenciales → About breve → Contacto**. Los experimentos pueden quedar como grupo secundario dentro de proyectos. Evitar duplicar el caso completo en selección y trayectoria: la primera explica problema/decisión/resultado; la segunda, fechas, rol y vínculo al detalle.

La selección inicial más defendible sería Renová Tu Cocina, Espacio BOA y un caso de Zetenta. SOLUTION también puede ser central cuando se confirme estado, alcance y URL. Esto es una propuesta de selección, no una afirmación de que los otros proyectos sean débiles técnicamente.

Conteo del texto español almacenado que se muestra en cada modal, sin labels de interfaz ni tags, mediante separación por espacios:

| Proyecto | Palabras en solución | Palabras en cierre de caso | Palabras aproximadas en modal |
|---|---:|---:|---:|
| Vyzon | 28 | 35 | 177 |
| AURA AI | 98 | 91 | 458 |
| Obsidian | 124 | 104 | 538 |
| TaskFlow | 104 | 95 | 420 |

Las tarjetas truncan descripción a dos líneas, pero los modales concentran los muros de texto. El cierre suele volver a explicar lo ya leído. Reducir primero la repetición, no solamente convertirla en bullets.

Skills contiene **61 entradas** repartidas en 6 tarjetas; 43 están visibles sin desplegar “Ver más”. Hay repetición de Three.js entre Frontend y Explorando. Mezcla tecnologías de producción, herramientas de asistencia y aprendizaje; “STRONG” dentro de “Explorando” vuelve ambiguo el nivel. Para un recruiter conviene empezar por el stack usado en los casos y dejar lo demás como detalle.

Los filtros actuales no justifican su complejidad para cuatro proyectos relacionados: todos están marcados `featured`, todos son de 2026, “Impacto” ordena alfabéticamente el texto y Vyzon aparece aunque no coincida con el tag. El slider ni siquiera responde al filtro de la grilla. Recomiendo simplificar antes de agregar nuevos controles.

## 1.4 Diagnóstico de UI

### Consistencia y apariencia de plantilla

Hay una identidad aprovechable: oscuro, violeta, Inter/Sora y contenedores editoriales. Lo inconsistente es su aplicación: header de sección construido a mano pese a existir `SectionHeader`, varios anchos máximos, radios sin regla semántica, espaciados propios y dos definiciones de `.text-gradient` en capas distintas.

La combinación de orbes 3D, spotlight, grilla reactiva, botones magnéticos, pills, badges genéricos, tarjetas con glass, marco de navegador y encabezados con palabra violeta repite convenciones frecuentes de portfolios. El problema no es un elemento aislado: varios compiten por atención sin aportar una historia propia de tu trabajo.

**Un gesto propuesto:** que las capturas desktop/mobile existentes sean la pieza distintiva, acompañadas de una decisión concreta por caso. Conservar slider y lightbox; tratar la evidencia visual de tus entregas como protagonista. No propongo otra identidad ni sumar cinco efectos.

### Contraste: números calculados

Método: RGB sRGB → luminancia lineal → `(L mayor + 0,05) / (L menor + 0,05)`. AA exige 4,5:1 para texto normal y 3:1 para texto grande; AAA de cuerpo, 7:1. Los umbrales se compararon sin redondear; la tabla redondea para lectura. Referencia: [W3C, contraste mínimo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

**Colores sólidos de la paleta oscura:**

| Texto | Fondo `#07070b` | Fondo `#0e0f16` | Fondo `#151726` | Lectura |
|---|---:|---:|---:|---|
| Principal `#f5f7ff` | 18,80:1 | 17,87:1 | 16,60:1 | AAA cuerpo |
| Secundario `#b4b9d0` | 10,33:1 | 9,82:1 | 9,13:1 | AAA cuerpo |
| Terciario `#7f869f` | 5,57:1 | 5,29:1 | 4,92:1 | AA cuerpo; no AAA |
| Violeta `#7c5cff` | 4,63:1 | 4,40:1 | 4,09:1 | Falla AA de texto normal sobre los dos fondos elevados |

No corresponde aclarar todos los grises indiscriminadamente: **los grises base no son el principal problema de contraste**. Sí lo son los labels de 9–11 px por legibilidad y los colores de acento en ciertas superficies.

Estados concretos:

- `Button` primario, blanco sobre `#7c5cff`: **4,35:1**, falla AA normal.
- Hover del mismo botón, blanco sobre `#987dff`: **3,13:1**, falla AA normal. Aclarar el fondo manteniendo blanco empeora la lectura.
- Badge de acento sobre acento al 15% compuesto sobre fondo secundario sólido: **3,81:1**, falla AA normal. Es cálculo de esa composición, no de todas las tarjetas con efectos detrás.
- Borde `#23263a` sobre fondo terciario: **1,19:1**. No toda línea decorativa necesita 3:1, pero conviene revisar bordes que sean la única indicación de un input o control.

Los fondos reales también incluyen transparencias, cursor luminoso y gradientes. Estos valores son exactos para los pares/composición declarados; **no certifican el peor contraste de cada píxel del sitio animado**. La validación final debe revisar estados y fondos compuestos en navegador. El tema claro requiere su propia pasada porque hoy forma parte de la app.

### Estados interactivos

| Estado | Qué existe | Falta o riesgo |
|---|---|---|
| Hover | Buttons, links, cards, imágenes y tiles | Inconsistente; en botones primarios reduce contraste. Los tiles no accionables parecen interactivos. |
| Focus visible | Regla global y anillo en `Button` | Un `div` clickeable no recibe Tab por tener esa regla. Cards de contacto/proyectos quedan fuera. |
| Active / pressed | Algunos `whileTap`, modo con `aria-pressed`, dots con `aria-current` | `Button` no define estilo activo común; ordenamientos no exponen selección con `aria-pressed`. |
| Disabled | `Button`; flechas de experiencia en extremos | Bien previsto donde aplica. No hay que inventar estados disabled para links sin necesidad. |
| Loading | Envío con texto/disabled; skeleton de previews | Lightbox no tiene feedback específico; falla de WebGL no tiene recuperación propia. |
| Empty | CommandPalette sin resultados; captura pendiente | Grilla no contempla mensaje vacío para una futura colección/consulta sin resultados. El pin actual disimula el problema. |
| Error | Validaciones, toast al fallar envío, fallback de imágenes | Error de imagen no distingue carga fallida de captura pendiente; falla al copiar email se silencia; no hay error boundary de WebGL. |

En `Skills.tsx` hay un defecto de tokens: se usa `color: 'var(--accent)'` cuando esa variable contiene `124 92 255`, no un color CSS completo. También se concatena `18` o `44` para opacidad, lo que solo funciona para ciertos hex, no para `var(--accent)`. Los nombres usan `var(--foreground-tertiary, #888)` con el mismo problema. Puede heredar un color distinto del esperado; no hay que atribuirles el ratio del token deseado sin comprobar el color computado.

## 1.5 Diagnóstico técnico

### Build, TypeScript y lint

Node usado: 20.20.2. Versiones del lock: React 18.3.1, `@types/react` 18.3.28, Vite 5.4.21, Framer Motion 11.18.2, Three.js 0.161.0, Fiber 8.18.0 y Drei 9.122.0.

El build se detiene en `src/components/experience/ExperienceCarousel.tsx:23:126`:

> Property 'inert' does not exist on type 'DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>'.

El código intenta sacar las slides inactivas de la interacción, una intención correcta. La solución futura debe preservar esa conducta y resolver compatibilidad de tipos/DOM; **quitar `inert` para silenciar TypeScript no es una solución aceptable**.

`strict`, `noUnusedLocals` y `noUnusedParameters` están activos. Aun así, `src/lib/utils.ts:36` declara dos `any` explícitos en `debounce`. Strict no los prohíbe por sí solo. ESLint los marca como warnings. Los otros dos warnings son `react-refresh/only-export-components` en ambos contextos.

No hay script de tests ni suite propia encontrada. El checklist no reemplaza una prueba ejecutada.

### Bundle y lo que lo infla

Empaquetado diagnóstico con los archivos actuales, minificación de producción y gzip informado por Vite. Unidades decimales: 1 kB = 1.000 bytes.

| Salida | Minificado / bytes de archivo | Gzip |
|---|---:|---:|
| JavaScript, un único chunk | 1.512,31 kB | 439,80 kB |
| CSS | 44,04 kB | 8,24 kB |
| HTML | 2,31 kB | 0,84 kB |

Vite transforma 2.545 módulos y advierte que el chunk supera 500 kB minificado. JS + CSS representan **448,04 kB gzip**, sin imágenes, fuentes ni recursos de la escena 3D. Gzip es una compresión calculada, no una captura de transferencia del hosting.

Un segundo análisis en memoria examinó `renderedLength` de módulos conservados por Rollup. **Estas contribuciones son previas a la minificación final y no se pueden sumar como gzip ni presentar como ahorro garantizado:**

- Three.js: 1.273.462 bytes de código renderizado intermedio.
- Framer Motion: 344.481 bytes.
- Código del proyecto: 256.748 bytes.
- React DOM: 135.080 bytes; Zod: 132.680 bytes.
- React reconciler: 94.563 bytes; React Hook Form: 76.621 bytes; tailwind-merge: 72.001 bytes.
- Fiber: 68.941 bytes; three-stdlib: 64.770 bytes; gainmap-js: 47.598 bytes.

La familia 3D es el contribuyente más claro. Hero importa Canvas, Float, MeshDistortMaterial, Environment y Three; Skills importa Three directamente. Hay dos superficies WebGL activas en home. Skills inicia su render loop al montar y continúa aunque esté fuera de pantalla; reduced motion detiene rotación, pero no el render continuo. Hero no desactiva sus orbes ni sus `useFrame` con reduced motion.

`Suspense` alrededor de la escena no equivale a `React.lazy` ni a un import dinámico del motor 3D. `Environment preset="city"` requiere además un recurso de entorno; su transferencia no está en la tabla.

`emailjs-com` está instalado, pero el sitio importa `@emailjs/browser`. Es candidato a limpieza de dependencias; no atribuyo ahorro del bundle sin presencia en su grafo. Lo mismo vale para componentes muertos: sacarlos mejora mantenimiento, pero un bundler puede haberlos eliminado ya.

### GSAP y Framer Motion

**No conviven como dependencias ejecutadas de este portfolio. GSAP no está en package.json, lock ni importaciones activas.** Aparece en el texto y stack de proyectos externos y en Skills. Framer Motion sí controla buena parte de la UI.

Por tanto, retirar GSAP del portfolio actual ahorraría **0 kB de biblioteca**: no hay nada instalado que retirar. No hace falta unificar esos motores aquí. La decisión técnica real es cuánto 3D decorativo mantener y cuándo cargarlo. Propongo medir un antes/después tras aprobar el cambio; no inventar ahora un ahorro comprimido de Three.js.

### Imágenes y layout shift

Los **26 WebP locales suman 4.255.850 bytes —4,26 MB—**. Incluyen dos capturas de Manantial no registradas. Las 24 referenciadas suman 3.908.846 bytes; no se descargan todas en una sola página por el solo hecho de estar en `public`.

Los mayores son BOA desktop 532,45 kB, Zetenta portfolio desktop 477,05 kB, Renová desktop 319,49 kB y Fefe desktop 253,81 kB. Las capturas móviles llegan a 231,51 kB para Zetenta y 214,61 kB para BOA. Casi todas las móviles miden 850×1100; hay dos excepciones de 824/827 px. Conviene generar tamaños según el ancho de presentación, después de evaluar nitidez.

Las dimensiones declaradas de los 24 WebP registrados coinciden con sus cabeceras. Manantial existe a 2526×1274 y 850×1100, pero `media: []` sigue mostrando “Captura pendiente”. El README de imágenes también dice que no tiene captura: está atrasado.

Cuatro PNG remotos medidos por descarga de sus URLs exactas —HTTP 200, `image/png`—:

| Imagen | Dimensiones reales | Peso |
|---|---|---:|
| Vyzon | 2560×1274 | 1.400,87 kB |
| AURA AI | 2530×1262 | 790,70 kB |
| Obsidian | 2532×1276 | 1.869,22 kB |
| TaskFlow | 2526×1280 | 578,94 kB |

Total: **4.639.726 bytes, 4,64 MB**, sin contar HTTP. No tienen `f_auto`, reducción de ancho ni variantes responsive en las URLs actuales. No prometo un porcentaje de ahorro sin generar y revisar derivados.

`ProjectPreviewImage` declara 2530×1260 para los cuatro, aunque no coincide exactamente con ninguno. Los wrappers sí reservan aspect-ratio, así que esto **no prueba CLS por sí solo**. ExperienceImage, previews e ImageLightbox tienen dimensiones y lazy loading; no corresponde afirmar que faltan en todas las imágenes. El lightbox carga lazy aun cuando ya fue abierto; conviene priorizar la imagen activa.

El swap usa `<picture>` con desktop desde 1024 px, y el lightbox usa la misma frontera mediante `useMediaQuery`. Faltan variantes de resolución dentro de cada familia, pero la selección desktop/mobile ya existe y se debe preservar. El `alt` del `<img>` usa el texto mobile si lo hay, incluso cuando `<source>` presenta desktop; el nombre accesible del botón usa desktop. Debe describir el contenido sin depender de un dispositivo incorrecto.

Riesgos de CLS a medir: carga de fuentes, cambios de contenido por restauración de locale/modo, alturas de la información del slider automático y fallbacks de imagen. No se midió CLS real.

### Accesibilidad

**Estructura:** home y detalles tienen un `main` y un `h1` propio; el problema no es multiplicidad actual de H1. En home hay H2 de sección y H3 de tarjetas. El modal abre con H2 pero sus subsecciones usan H4, saltando un nivel. Footer usa H3/H4 para estructura visual. No hay enlace “Saltar al contenido”.

**Teclado y diálogos:**

- `Card` es un `div`. Las tarjetas de proyecto y las cuatro opciones de contacto dependen de `onClick`, sin `tabIndex` ni semántica de botón/enlace. No se operan completamente con teclado.
- Botones de demo de la grilla muestran solo icono `ExternalLink`, sin nombre accesible. Los controles de imagen de experiencia sí tienen labels.
- `Modal` tiene Escape y bloqueo de scroll, pero no `role="dialog"`, `aria-modal`, etiquetado asociado, foco inicial, trampa de foco ni restauración al disparador.
- Lightbox y drawer móvil sí declaran diálogo, pero tampoco gestionan foco. El lightbox no bloquea scroll del fondo. `aria-modal` no implementa ese comportamiento por sí solo.
- CommandPalette usa `Command`, no un `Command.Dialog`. Muestra la indicación ESC, pero su lógica propia solo registra Ctrl/Cmd+K; no hay cierre explícito por Escape ni gestión modal completa. Debe probarse la conducta de la versión instalada antes de darla por buena.
- Carrusel de experiencia: flechas por teclado, contador `aria-live`, controles disabled en extremos y slides inactivas con `aria-hidden`/`inert`. Preservar estos aciertos al resolver el error de tipos.
- Slider de Proyectos: avanza cada 5 segundos; pausa por hover y reduced motion, pero no por foco ni mediante botón visible de pausa. Es incómodo para lectura y teclado. No confundir este slider con el carrusel manual de experiencia que pediste conservar.
- Dots de 8–10 px tienen un área de pulsación pequeña. No toda interacción necesita un gran botón visual; sí conviene ampliar el target.

El patrón esperado para un diálogo incluye foco dentro de él y retorno al invocador; referencia: [W3C APG, Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

**Formulario:** labels HTML y mensajes ES/EN presentes, submit deshabilitado durante envío y toasts de éxito/error. Faltan `aria-invalid`, asociación de error con `aria-describedby` y contexto de recuperación accesible. La prueba de envío real no se realizó: no se enviaron mensajes externos.

**Reduced motion:** soporte parcial. El CSS reduce animaciones/transiciones CSS, pero no detiene automáticamente animaciones de Framer Motion ni loops WebGL. About, Contacto, Navbar, Footer y Lightbox mantienen animaciones sin consultar preferencia; Hero solo condiciona parte del título. `scrollToSection` y el logo siguen pidiendo scroll suave. Hay que completar la política de movimiento, no confiar en la media query global como certificación.

### SEO

- Existen title, description, author, keywords, OG y Twitter iniciales en `index.html`.
- **No existe `public/og-image.jpg`**, aunque OG y Twitter lo referencian. También es una URL relativa.
- No encontré canonical, JSON-LD Person, hreflang ni sitemap real.
- `robots.txt` apunta a `https://tu-portfolio.vercel.app/sitemap.xml`, un placeholder distinto del dominio configurado en OG.
- `seoMetadata` de `content.ts` no tiene consumidor; editarlo solo no modifica la metadata efectiva.
- Detalles cambian title/description con un efecto en cliente, pero dejan OG/Twitter de la home.
- Al volver a home no hay efecto que restaure title/description; pueden quedar los del último detalle. El fallback 404 de experiencia tampoco reinicia description.
- Para previews sociales por ruta, los tags deben estar disponibles para el consumidor del HTML. Hay que definir render/prerender por ruta y configuración de hosting; no prometer que un efecto React por sí solo resuelve previews.
- El fallback global presenta home para cualquier ruta no reconocida. Riesgo de soft 404 y contenido duplicado; verificar comportamiento HTTP y rewrites del hosting real.
- No se comprobó deployment, indexación o dominio canónico real. Esos datos requieren confirmación; no hace falta cambiar de framework para decidirlos.

### Riesgos de regresión

1. **Fuente de datos duplicada.** Las experiencias antiguas EN se construyen con índices. Al agregar Renová en ES se desplazaron asociaciones: el registro con empresa Renová hereda rol/fechas de MDV; MDV recibe período de Fefe y Fefe recibe texto de otro CRUD. Ese array **no alimenta el timeline actual**; es deuda latente, no un bug visible que deba imputarse al detalle actual.
2. **Mapa de capturas.** `screenshot()` desestructura `dimensions[file]` sin fallback. Agregar un nombre a `media` sin dimensiones puede romper la evaluación del módulo. Manantial necesita registrar sus nombres exactos y medidas.
3. **Contrato de media.** Conservar breakpoint 1024, orden de slides, índice abierto y navegación de lightbox. Los proyectos con varias vistas y sin mobile en algunas de ellas son casos obligatorios de prueba.
4. **Orden de experiencias.** Cambiar el array cambia también anterior/siguiente. Separar criterio editorial de cronología si se necesitan ambos.
5. **Interacciones globales.** Scroll locks de Navbar y Modal escriben directamente `document.body.style.overflow`; podrían interferir. Lightbox usa listeners globales. Revisar cierre, foco y navegación al cambiar ruta.
6. **Código comprimido manualmente en una línea.** Experience y varios componentes de detalle son difíciles de revisar; incluso una edición pequeña produce diffs extensos. Formatear solo los archivos tocados y en un cambio identificable.
7. **`dist` versionado.** No usar su contenido antiguo para validar, ni mezclar un nuevo build con cambios editoriales en un commit accidental.
8. **Tema claro y persistencia.** No eliminar una variante funcional ni cambiar preferencias guardadas por accidente al refinar la paleta oscura.
9. **WebGL sin fallback propio.** Un error de contexto en Skills o de recursos de escena necesita recuperación que conserve el contenido. No se observó un fallo de runtime; es un riesgo de la implementación.

## 1.6 Propuesta priorizada

Esfuerzo orientativo para ejecución y validación local: **bajo** hasta medio día; **medio** medio día a 2 días; **alto** 2–4 días. No es presupuesto contractual y excluye esperas por información. Impacto refiere a claridad para contratarte y confiabilidad del sitio. Riesgo supone conservar la arquitectura y comprobar las regresiones señaladas.

Orden por beneficio frente a esfuerzo, con un bloqueante técnico adelantado como excepción explícita. **Todos los cambios están propuestos; ninguno está aplicado.**

| ID | Cambio propuesto | Impacto esperado | Esfuerzo | Riesgo de romper algo |
|---|---|---|---|---|
| P01 | Corregir compatibilidad de `inert` preservando exclusión de slides inactivas; resolver warnings de `src` | Alto: recuperar validación de entrega | Bajo | Medio: carrusel/teclado |
| P02 | Confirmar y corregir estados, fechas y contradicción de métricas ES/EN; retirar afirmaciones sin respaldo | Alto: credibilidad inmediata | Bajo técnico; depende de datos | Bajo |
| P03 | Hero factual: rol, experiencia, stack principal, ubicación, búsqueda y disponibilidad; CV real y contacto | Alto: escaneo inicial | Medio | Bajo |
| P04 | Dirigir el CTA principal a casos reales y adelantar evidencia respecto de About | Alto: primera prueba más cerca | Bajo–medio | Medio: anclas y orden |
| P05 | Reparar navegación a secciones desde detalles, Footer y CommandPalette; logo con retorno a home | Alto: contacto alcanzable | Bajo | Medio: rutas/hash |
| P06 | Registrar capturas existentes de Manantial y añadir enlaces públicos confirmados | Alto: evidencia hoy ausente | Bajo | Medio: mapa de media |
| P07 | Reescribir clientes como problema → aporte propio → cambio; recuperar decisiones útiles hoy ocultas | Alto: evaluación técnica | Medio | Bajo |
| P08 | Reescribir y acortar landings; indicar concepto/cliente/estado; quitar métricas que son técnicas o metas | Alto: evitar sobrepromesas | Medio | Bajo |
| P09 | Convertir cards accionables en controles semánticos; gestionar foco y nombre de modales, lightbox y botones | Alto: uso por teclado | Medio | Medio: overlays y sliders |
| P10 | Corregir contraste de botones/acento y sintaxis RGB de Skills; comprobar ambos temas | Alto: lectura/AA | Bajo–medio | Bajo–medio |
| P11 | Entregar variantes optimizadas de los 4 PNG y tamaños apropiados de capturas grandes | Alto: transferencia de imágenes | Medio | Bajo–medio: calidad/crop |
| P12 | Completar i18n visible y accesible; hacer EN fácil de encontrar; evitar objetos de modal desactualizados | Alto para remoto internacional | Medio | Medio: estado e idioma |
| P13 | Unificar experiencia por identificador estable, eliminando asociaciones EN por índice | Medio–alto: prevenir errores editoriales | Medio | Medio–alto: contratos de datos |
| P14 | Simplificar filtros/ordenamientos y duplicación slider–grilla; quitar autoplay o agregar control de pausa | Medio | Bajo–medio | Medio: estado de proyectos |
| P15 | Reducir About y Skills; vincular stack principal a casos, mantener aprendizaje como detalle | Medio–alto | Medio | Bajo |
| P16 | Completar reduced motion, quitar demora decorativa y pausar render fuera de pantalla | Medio–alto: lectura y consumo | Medio | Medio: animación/3D |
| P17 | Code splitting por ruta y carga diferida de 3D; medir bundle antes/después | Alto técnico | Medio | Medio: carga y fallbacks |
| P18 | Metadata correcta por página, imagen OG real, canonical, Person y sitemap; resolver entrega de tags por ruta | Medio–alto | Medio–alto según hosting | Medio: rutas/SEO |
| P19 | Aplicar escala tipográfica y espaciado semánticos usando Inter/Sora y paleta actual; destacar capturas como gesto único | Medio | Medio | Medio: responsive |
| P20 | Limpiar código/dependencias sin uso y actualizar documentación | Bajo–medio | Bajo | Bajo; revisar consumidores |

### Paquetes sugeridos para aprobar

**Contenido — Fase 2:** P02, P03 en su parte editorial, P07, P08 y copy de P12/P15. Antes de redactar resultados se completan los datos o se dejan marcadores. No hace falta esperar números de todo para escribir un caso funcional honesto.

**UX — Fase 3:** P03 en CTAs/CV, P04, P05, P06, P14 y estructura de P15. Mantener `/experiencia/:slug`, slider de experiencia, swap y lightbox. Reducir el slider de Proyectos no implica tocar el de experiencia.

**UI — Fase 4:** P10, P19 y parte visual de estados. La propuesta preserva familias tipográficas y acento violeta.

**Técnico — Fase 5:** P09, P11, resto de P12, P13, P16, P17, P18 y P20.

**Excepción recomendada al orden:** aprobar P01 como corrección previa y separada. El estado inicial ya no compila; sin ese arreglo no se puede exigir build limpio al final de Fase 2. No lo ejecuté por adelantado. La consolidación de datos P13 puede adelantarse si se aprueba reescritura extensa para no editar el mismo contenido dos veces.

Cada fase de implementación debe tener un commit acotado con su validación; los cambios preexistentes requieren mantenerse fuera de esos commits salvo que formen parte explícita del alcance aprobado.

### Información necesaria para la próxima fase

Son preguntas de contenido para resolver al aprobar; **todavía no inserté estos marcadores en la web**:

1. `[NECESITO: seniority objetivo, fecha de inicio de experiencia profesional y antecedentes anteriores a octubre de 2024 que respalden ~4 años.]`
2. `[NECESITO: disponibilidad de ingreso/preaviso, dedicación full-time o freelance, aceptación de híbrido y horas de solapamiento internacional.]`
3. `[NECESITO: nivel de inglés operativo, mercados habilitados para trabajar/contratar y disponibilidad de relocalización si aplica.]`
4. `[NECESITO: CV actualizado en PDF, versiones ES/EN disponibles y nombre profesional preferido en la descarga.]`
5. `[NECESITO: estado y URL de SOLUTION, fecha de lanzamiento, pasarelas efectivamente integradas y responsabilidad propia.]`
6. `[NECESITO: fechas correctas de Renová Tu Cocina, qué incluye el conteo de 13 rutas y alcance real del fallback.]`
7. `[NECESITO: medición de Aeroclub con herramienta, fecha, dispositivo, condiciones y antes/después.]`
8. `[NECESITO: alcance editable y tiempo/proceso de publicación de Manantial; confirmación de +45 páginas.]`
9. `[NECESITO: proceso anterior y resultado comprobable de BOA, Yacoub, Madero Walk, Go Building, MDV y Fefe; pueden ser cambios operativos, no necesariamente cifras.]`
10. `[NECESITO: URLs faltantes, repositorios públicos o muestras autorizadas y participación individual/equipo en cada caso.]`
11. `[NECESITO: naturaleza real/conceptual y estado actual de AURA AI y Obsidian; rol de Vyzon como agencia o laboratorio.]`
12. `[NECESITO: evidencia de métricas TaskFlow; si no hay medición, mantenerlas como objetivos y corregir EN.]`
13. `[NECESITO: dominio canónico y hosting/configuración de rutas actuales para SEO por página.]`

No recomiendo publicar información migratoria extensa ni exigir un número para cada trabajo. Para algunos casos, describir el paso manual que desapareció o quién puede administrar contenido ya demuestra valor. Tampoco recomiendo conservar “impacto medible” como título si se van a mostrar mayormente entregables y objetivos.

### Criterios de verificación después de aprobar cambios

- Home, Zetenta y Renová Tu Cocina en ES y EN; además, un slug inexistente.
- Desktop y mobile, con especial atención a 768 y 1024 px; primera pantalla, overflow, anclas y contacto desde detalles.
- Zetenta.com con tres capturas: flechas, contador, primera/última, teclado, imagen abierta y regreso de foco.
- Captura con mobile y otra sin mobile: comprobar `currentSrc` y lightbox a ambos lados de 1024 px.
- Formularios vacíos/erróneos, errores de imagen y copia, y navegación por Tab/Enter/Escape. Envío externo real solo cuando corresponda autorizarlo.
- Reduced motion y cambio de idioma/tema, incluidos modal abierto y navegación de vuelta a home.
- TypeScript limpio, build oficial sin warnings, contraste comprobado en estados reales y consola sin errores en la matriz anterior.

**Corte de fase:** auditoría entregada; implementación pendiente de tu aprobación por IDs o paquetes. Las pruebas visuales y de consola no realizadas quedan señaladas, no aprobadas implícitamente.
