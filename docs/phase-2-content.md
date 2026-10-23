# Fase 2: contenido

15 trabajos documentados: 7 de Zetenta y 8 de trabajo independiente. FORMAT fue un trabajo pago para cliente. Las entradas con fecha se ordenan de más reciente a más antigua; Don Teófilo va primero, de septiembre a octubre de 2026, seguido de FORMAT, de agosto de 2026. Kyriazis queda último. La navegación entre subpáginas usa el mismo orden.

## Marcadores abiertos

- Ninguno.

## Afirmaciones eliminadas o acotadas

- Aeroclub: cifra de performance del 95%.
- TaskFlow: validación en producción en EN, resultados de clientes ficticios y cifras de Lighthouse o tamaño de bundle sin evidencia.
- VYZON: presentación como agencia con clientes. TaskFlow, AURA AI y OBSIDIAN quedan como demos de briefs ficticios.
- AURA AI y OBSIDIAN: resultados comerciales ficticios, garantías de rendimiento y superlativos sin respaldo.
- Renová: cifra de 13 rutas y promesas absolutas de disponibilidad o autonomía. El fallback queda limitado a lectura de contenido; duración confirmada de un mes.
- Solution: datos desactualizados sobre pasarelas, envíos y estado de lanzamiento; atribución causal del crecimiento a la plataforma; adopción del mayorista no confirmada. Se conservan las cifras confirmadas al 14/09/2026.
- BOA: cifras y marcadores de uso, adopción sugerida de gift cards y referencias a múltiples administradores.
- Manantial, Yacoub, Madero, MDV y Fefe: mejoras de conversión, tiempos, fluidez o escalabilidad presentadas como resultados sin medición. Se describen las decisiones implementadas.
- Presentación general: promesas absolutas de calidad, ausencia de deuda o fricción y resultados de alto impacto sin respaldo.
- Datos duplicados de experiencia ES/EN que contenían versiones anteriores de estas afirmaciones.

## Capturas

Se revisaron visualmente las capturas registradas. Se excluyen los tres paneles de BOA y solution-metricas.png. Fefe sigue sin registro: ambos archivos muestran un retrato identificable y el desktop también un nombre completo. No se modificaron esas imágenes.

Se incorporan seis PNG, en tres objetos ProjectMedia desktop/mobile, con dimensiones leídas del encabezado del archivo y alt ES/EN. El contrato usa dimensiones explícitas por Screenshot; ya no existe el helper screenshot() ni su mapa dimensions. Se mantiene picture y el breakpoint de 1024px.

- Don Teófilo: 2516×1257 y 850×1100.
- FORMAT: 1904×912 y 850×1660.
- Kyriazis: 1906×918 y 850×1660.

Las capturas registradas no muestran registros privados de personas ni finanzas internas de clientes. Kyriazis muestra su denominación profesional; MDV, contacto comercial público; Yacoub, precios y direcciones públicas de inmuebles. No equivalen a registros de compradores ni a facturación del cliente. Los archivos excluidos permanecen en disco, sin referencias de renderizado; al estar en public, un build puede copiarlos aunque no se rendericen.

## Copy nuevo

### Don Teófilo Amoblamientos

#### ES — tarjeta

Don Teófilo mostraba su trabajo solo por WhatsApp. Diseñé la identidad visual y desarrollé el sitio y su panel de administración: un lenguaje tomado de los planos de carpintería, reglas de publicación aplicadas en la base de datos y consultas por WhatsApp según la sección.

#### ES — detalle

Don Teófilo hace carpintería a medida en Buenos Aires y Tandil. Las consultas llegaban por WhatsApp, pero no había dónde ver el catálogo ni los trabajos terminados antes de escribir. Además de desarrollar el sitio, diseñé su identidad visual, «Al milímetro», que lleva a la interfaz el lenguaje de los planos de taller: cotas, medidas y dibujos técnicos.

Los dibujos no son ilustraciones exportadas. Cada categoría está descrita como datos en milímetros reales, módulo por módulo: puertas, cajones, estantes. Un componente calcula la escala para el espacio disponible y dibuja el SVG en píxeles del contenedor, así los trazos y las cotas no se deforman en ninguna pantalla. Lo que queda oculto va punteado, como en un plano real, y sumar una categoría es escribir su especificación, no dibujarla a mano.

El antes y después tiene dos versiones porque resuelven problemas distintos. En la portada, el cambio avanza con el scroll dentro de una sección fijada y sin arrastre, para no competir con el desplazamiento en el celular. En el detalle de cada obra hay un comparador arrastrable que espera unos píxeles de movimiento para decidir si el gesto es horizontal o vertical: solo toma el horizontal, así el dedo no queda atrapado al scrollear. Durante el arrastre actualiza el DOM sin pasar por el estado de React y también se puede usar con teclado.

La regla de qué es público vive en la base de datos. Las políticas RLS de Supabase solo dejan que los visitantes lean productos y proyectos publicados, y la galería y la ficha de cada obra heredan esa condición desde su proyecto. Un trigger garantiza un único proyecto destacado en la portada, sin depender de que el panel lo valide. El cliente carga, ordena y publica catálogo, obras y la sección «Del taller» sin tocar código ni pedir un nuevo despliegue, y pasó de mandar fotos por chat a tener un sitio propio que respalda cada consulta.

#### EN — tarjeta

Don Teófilo only showed its work through WhatsApp. I designed the visual identity and built the website and its admin panel: a visual language drawn from carpentry plans, publishing rules enforced in the database, and WhatsApp inquiries tailored to each section.

#### EN — detalle

Don Teófilo builds custom furniture in Buenos Aires and Tandil. Inquiries came in through WhatsApp, but there was nowhere to browse the catalog or finished work before reaching out. Beyond building the site, I designed its visual identity, "Al milímetro" (down to the millimeter), which brings the language of workshop plans into the interface: dimension lines, measurements and technical drawings.

The drawings aren't exported illustrations. Each category is described as data in real millimeters, module by module: doors, drawers, shelves. A component computes the scale for the available space and draws the SVG in the container's own pixels, so strokes and dimension labels never distort on any screen. Hidden parts are dashed, as on a real plan, and adding a category means writing its spec, not drawing it by hand.

The before-and-after has two versions because they solve different problems. On the homepage, the change advances with scrolling inside a pinned section, with no dragging, so it never competes with scrolling on a phone. On each project page there is a draggable comparator that waits a few pixels of movement to decide whether a gesture is horizontal or vertical: it only takes horizontal ones, so the finger doesn't get trapped while scrolling. While dragging it updates the DOM without going through React state, and it also works with a keyboard.

The rule for what is public lives in the database. Supabase RLS policies only let visitors read published products and projects, and each project's gallery and details inherit that condition from their project. A trigger guarantees a single featured project on the homepage, without relying on the panel to validate it. The client uploads, orders and publishes catalog items, projects and the "Del taller" section without touching code or requesting a new deployment, and went from sending photos over chat to having their own site to back every inquiry.

### FORMAT

#### ES — tarjeta

FORMAT necesitaba reunir la próxima fecha, su lineup y flyer, sin perder el archivo de ediciones anteriores. Organicé el contenido en Seasons mensuales que también definen la identidad visual, con publicación desde el panel sin redeploy.

#### ES — detalle

FORMAT es un ciclo de música electrónica en Buenos Aires. El sitio debía permitir encontrar la próxima fecha, su lineup y flyer, y recorrer las ediciones anteriores desde una misma identidad de marca. Esa necesidad guio la relación entre agenda, calendario y archivo.

Modelé el contenido en Seasons mensuales que agrupan varios viernes. Cada Season define colores, formas, stickers y fondos que se trasladan a sus páginas y componentes. Así, una nueva edición puede tener identidad propia sin construir otra interfaz desde cero: el contenido determina su presentación.

El hero usa Three.js y un shader GLSL propio para dibujar una trama halftone animada que responde a la Season activa. Elegí vincular ese recurso al mismo modelo de contenido para que la portada forme parte de la identidad de cada edición.

La gestión se resuelve con Server Actions y revalidación de rutas: al publicar desde el panel, las páginas afectadas incorporan los cambios sin redeploy. Quedó un canal que reúne lo que viene y conserva lo que ya pasó, con una estructura que permite al administrador actualizar cada edición.

#### EN — tarjeta

FORMAT needed to bring together its next event, lineup and flyer while preserving an archive of past editions. I organized the content into monthly Seasons that also define the visual identity, with publishing through the admin panel without redeployment.

#### EN — detalle

FORMAT is an electronic music event series in Buenos Aires. The website needed to make the next event, lineup and flyer easy to find while presenting past editions within the same brand identity. That need guided the relationship between the event listings, calendar and archive.

I modeled the content as monthly Seasons grouping several Fridays. Each Season defines colors, shapes, stickers and backgrounds used across its pages and components. A new edition can therefore have its own identity without building another interface from scratch: the content determines its presentation.

The hero uses Three.js and a custom GLSL shader to draw an animated halftone pattern that responds to the active Season. I connected that visual element to the same content model so the homepage belongs to each edition’s identity.

Content management uses Server Actions and route revalidation: publishing through the panel updates the affected pages without redeployment. The result is a channel that brings together upcoming events and preserves past editions, with a structure the administrator can update for each edition.
