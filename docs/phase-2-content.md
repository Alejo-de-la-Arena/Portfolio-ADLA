# Fase 2: contenido

15 trabajos documentados: 7 de Zetenta y 8 de trabajo independiente. FORMAT queda provisional hasta confirmar modalidad. Las entradas con fecha se ordenan de más reciente a más antigua; Don Teófilo y FORMAT encabezan provisionalmente la lista con fechas pendientes. Kyriazis queda último. La navegación entre subpáginas usa el mismo orden.

## Marcadores abiertos

- Don Teófilo: fechas de inicio y fin.
- FORMAT: fechas de inicio y fin.
- FORMAT: confirmar trabajo pago para cliente o proyecto propio.

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

- Don Teófilo: 1902×916 y 850×1660.
- FORMAT: 1904×912 y 850×1660.
- Kyriazis: 1906×918 y 850×1660.

Las capturas registradas no muestran registros privados de personas ni finanzas internas de clientes. Kyriazis muestra su denominación profesional; MDV, contacto comercial público; Yacoub, precios y direcciones públicas de inmuebles. No equivalen a registros de compradores ni a facturación del cliente. Los archivos excluidos permanecen en disco, sin referencias de renderizado; al estar en public, un build puede copiarlos aunque no se rendericen.

## Copy nuevo

### Don Teófilo Amoblamientos

#### ES — tarjeta

Don Teófilo trabajaba solo por WhatsApp, sin un lugar donde mostrar su catálogo y trabajos terminados. Desarrollé un sitio que el cliente puede actualizar desde un panel, con permisos de publicación en la base de datos y consultas contextualizadas por WhatsApp.

#### ES — detalle

Don Teófilo realiza carpintería a medida en Buenos Aires y Tandil. El contacto ocurría por WhatsApp, pero faltaba un lugar donde consultar productos y ver trabajos terminados antes de preguntar. El sitio reúne ese material y mantiene WhatsApp como canal de consulta, con mensajes preparados según la sección.

Separé contenido público y privado mediante políticas RLS de Supabase. El visitante solo puede leer registros publicados, incluidas sus imágenes y detalles relacionados. Elegí aplicar esa regla en la base de datos para que ocultar un borrador no dependa de lo que muestre el frontend.

Para comparar el antes y el después de una obra, implementé un control que actualiza el DOM durante el arrastre sin pasar por el estado de React. Así evité un render de React por cada movimiento. El comparador también expone un slider operable por teclado, para que la interacción no dependa del mouse.

El cliente puede cargar y publicar el catálogo y los proyectos desde el panel, sin tocar código ni pedir un nuevo despliegue. Pasó de compartir todo por chat a tener una referencia pública para sus consultas. El sitio está entregado y desplegado; queda a la espera del dominio del cliente.

#### EN — tarjeta

Don Teófilo worked entirely through WhatsApp, with nowhere to display its catalog and completed work. I built a website the client can update through an admin panel, with publication permissions enforced in the database and contextual WhatsApp inquiries.

#### EN — detalle

Don Teófilo builds custom furniture in Buenos Aires and Tandil. Customers contacted the business through WhatsApp, but had nowhere to browse products and completed work before asking. The website brings that material together and keeps WhatsApp as the inquiry channel, with messages prepared for each section.

I separated public and private content through Supabase RLS policies. Visitors can only read published records, including their related images and details. I enforced this rule in the database so keeping a draft private does not depend on what the frontend displays.

For before-and-after project comparisons, I built a control that updates the DOM during dragging without going through React state. This avoids a React render for each movement. The comparator also exposes a keyboard-operated slider, so the interaction does not depend on a mouse.

The client can upload and publish catalog items and projects through the panel without editing code or requesting another deployment. The business moved from sharing everything in chats to having a public reference for inquiries. The site is delivered and deployed, awaiting the client’s domain.

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
