import type { CaseSections, Localized, LocalizedList } from './experiences'

// `caseSections`, when present, replaces `body` on the detail page.
// `summary` always feeds the home card.
type CaseStudy = { summary: Localized; body?: LocalizedList; caseSections?: CaseSections }

export const caseStudies: Record<'solution' | 'espacio-boa' | 'manantial', CaseStudy> = {
  "solution": {
    "summary": {
      "es": "Desarrollé la plataforma de e-commerce propia de Solution, que entró en producción a principios de abril de 2026. La marca pasó de unos 80 pedidos mensuales en Tienda Nube a unos 300, y al 14 de septiembre de 2026 la plataforma había procesado 1.086 pedidos de 1.006 compradores únicos. Estuvo en producción hasta el 5 de octubre de 2026, cuando el cliente migró a Shopify para simplificar las integraciones con sus proveedores logísticos.",
      "en": "I built Solution’s custom e-commerce platform, which went live in early April 2026. The brand went from around 80 monthly orders on Tienda Nube to around 300, and as of September 14, 2026, the platform had processed 1,086 orders from 1,006 unique buyers. It ran in production until October 5, 2026, when the client moved to Shopify to simplify integrations with its logistics providers."
    },
    "caseSections": {
      "title": {
        "es": "Solution Perfumes: e-commerce a medida, de ~80 a ~300 pedidos por mes",
        "en": "Solution Perfumes: custom e-commerce, from ~80 to ~300 orders a month"
      },
      "meta": {
        "es": "Desarrollador full-stack · en producción abr–oct 2026",
        "en": "Full-stack developer · in production Apr–Oct 2026"
      },
      "sections": [
        {
          "heading": { "es": "Contexto", "en": "Context" },
          "blocks": [
            {
              "type": "paragraph",
              "text": {
                "es": "Solution vendía en Tienda Nube y procesaba unos 80 pedidos por mes. Necesitaba cosas que la plataforma no le daba: un canal mayorista con reglas propias, envíos con su cuenta de Correo Argentino y una atribución confiable de compras para Meta Ads, su principal canal de venta.",
                "en": "Solution sold on Tienda Nube and handled around 80 orders a month. They needed things the platform didn’t give them: a wholesale channel with its own rules, shipping through their own Correo Argentino account, and reliable purchase attribution for Meta ads, their main sales channel."
              }
            }
          ]
        },
        {
          "heading": { "es": "Qué construí", "en": "What I built" },
          "blocks": [
            {
              "type": "paragraph",
              "text": {
                "es": "Una tienda propia de punta a punta: SPA en React, API en Node/Express y Supabase (Postgres, Auth, Storage). Checkout con Mercado Pago; envíos con Correo Argentino, con cotización en vivo, retiro en sucursal y despacho; un portal mayorista con aprobación de cuentas y acceso por plan; y un panel de administración que los dueños usaban a diario para pedidos, productos, métricas y rentabilidad. Después del lanzamiento seguí sumando mejoras a partir de reuniones de seguimiento con el cliente cada dos o tres semanas.",
                "en": "A custom store, end to end: React SPA, Node/Express API, and Supabase (Postgres, Auth, Storage). Mercado Pago checkout; Correo Argentino shipping with live quotes, branch pickup and dispatch; a wholesale portal with account approval and plan-based access; and an admin panel the owners used daily for orders, products, metrics and profit. After launch I kept shipping improvements based on check-ins with the client every two to three weeks."
              }
            }
          ]
        },
        {
          "heading": { "es": "Decisiones que importaron", "en": "Decisions that mattered" },
          "blocks": [
            {
              "type": "list",
              "items": [
                {
                  "lead": { "es": "El pago lo confirma Mercado Pago, no la redirección.", "en": "A payment is confirmed by Mercado Pago, not by the redirect." },
                  "text": {
                    "es": "Volver a la URL de “éxito” no marca un pedido como pagado. El servidor consulta el pago en Mercado Pago, verifica que corresponda a ese pedido y recién ahí lo confirma. Los webhooks se validan con firma HMAC.",
                    "en": "Landing on the “success” URL doesn’t mark an order as paid. The server asks Mercado Pago for the payment, checks that it belongs to that order, and only then confirms it. Webhooks are verified with an HMAC signature."
                  }
                },
                {
                  "lead": { "es": "Reintentar un timeout, nunca un 5xx, al crear un envío.", "en": "Retry a timeout, never a 5xx, when creating a shipment." },
                  "text": {
                    "es": "Crear un envío en Correo despacha un paquete real, así que solo reintento errores de red, con backoff. Cada falla guarda el request y la respuesta exactos para que el administrador vea qué pasó. Esto reduce los despachos duplicados pero no los elimina, porque un timeout también puede significar que el envío se creó (ver abajo).",
                    "en": "Creating a shipment with Correo dispatches a real package, so I only retry network errors, with backoff. Every failure stores the exact request and response so the admin can see what went wrong. This reduces duplicate dispatches but doesn’t eliminate them, since a timeout can also mean the shipment was created (see below)."
                  }
                },
                {
                  "lead": { "es": "Seguimiento de compras desde el servidor sin contar dos veces.", "en": "Server-side purchase tracking without double counting." },
                  "text": {
                    "es": "Los bloqueadores de anuncios e iOS rompían la atribución. Sumé la Conversions API de Meta desde el servidor, con datos del cliente hasheados y el mismo ID de evento que el pixel del navegador (purchase_<orderId>), para que Meta cuente cada venta una sola vez.",
                    "en": "Ad blockers and iOS were breaking attribution. I added Meta’s Conversions API from the server with hashed customer data, sharing the same event ID as the browser pixel (purchase_<orderId>) so Meta counts each sale once."
                  }
                },
                {
                  "lead": { "es": "Un problema de costos real.", "en": "Fixing a real cost problem." },
                  "text": {
                    "es": "Los videos de productos y testimonios nos llevaron muy por encima de la cuota de egress de Supabase. Los moví a Cloudflare R2, que no cobra egress, y agregué posters y carga diferida. El consumo bajó fuerte después del cambio.",
                    "en": "Product and testimonial videos pushed us well over the Supabase egress quota. I moved them to Cloudflare R2, which has free egress, and added posters and deferred loading. Egress dropped sharply after the change."
                  }
                },
                {
                  "lead": { "es": "Rentabilidad, no solo facturación.", "en": "Profit, not just revenue." },
                  "text": {
                    "es": "La calculadora del panel guarda el costo de cada producto al momento de la venta, usa las comisiones que efectivamente cobró Mercado Pago y el costo real de envío aunque sea gratis para el comprador, y prorratea los gastos fijos por día.",
                    "en": "The admin calculator snapshots each product’s cost at the moment of sale, uses the actual fees Mercado Pago charged and the real shipping cost even when shipping is free for the buyer, and prorates fixed expenses by day."
                  }
                }
              ]
            }
          ]
        },
        {
          "heading": { "es": "Resultados", "en": "Results" },
          "blocks": [
            {
              "type": "paragraph",
              "text": {
                "es": "Salió a producción a principios de abril de 2026. Al 14 de septiembre había procesado 1.086 pedidos de 1.006 compradores únicos, y la marca pasó de ~80 a ~300 pedidos por mes.",
                "en": "Went live in early April 2026. By September 14 it had processed 1,086 orders from 1,006 unique buyers, and the brand went from ~80 to ~300 orders a month."
              }
            }
          ]
        },
        {
          "heading": { "es": "Por qué pasó a Shopify", "en": "Why it moved to Shopify" },
          "blocks": [
            {
              "type": "paragraph",
              "text": {
                "es": "El cliente iba a cambiar Correo Argentino por Andreani, y los proveedores de logística cambiaban seguido. Dimensioné y coticé con honestidad la integración con Andreani: en una plataforma propia, cada cambio de logística es trabajo de desarrollo. Lo evaluaron y migraron a Shopify, donde cambiar de proveedor son unos pocos clics. Estuve de acuerdo. El desarrollo a medida rindió mientras el negocio crecía; cuando la logística pasó a ser lo que cambiaba todo el tiempo, comprar tuvo más sentido que construir.",
                "en": "The client was switching from Correo Argentino to Andreani, and logistics providers kept changing. I scoped and quoted the Andreani integration honestly: on a custom platform, every carrier change means development work. After weighing it, they moved to Shopify, where changing carriers is a few clicks. I agreed with the call. Building custom paid off while the business grew; once logistics became the part that kept changing, buying made more sense than building."
              }
            }
          ]
        },
        {
          "heading": { "es": "Qué haría distinto", "en": "What I’d do differently" },
          "blocks": [
            {
              "type": "paragraph",
              "text": { "es": "Mirando el código hoy:", "en": "Looking at the code today:" }
            },
            {
              "type": "list",
              "items": [
                { "text": { "es": "Los precios y el costo de envío deberían salir solo del servidor, nunca del navegador.", "en": "Prices and shipping cost should come only from the server, never from the browser." } },
                { "text": { "es": "El pedido y sus ítems deberían crearse en una sola transacción, con una clave de idempotencia que sobreviva a los reintentos.", "en": "Orders and their items should be created in one transaction, with an idempotency key that survives retries." } },
                { "text": { "es": "Los webhooks deberían guardarse antes de confirmarse y procesarse desde una cola.", "en": "Webhooks should be stored before being acknowledged, and processed from a queue." } },
                { "text": { "es": "Todos los endpoints de administración deberían estar autenticados en la API, no solo ocultos en la interfaz.", "en": "Every admin endpoint should be authenticated at the API, not just hidden in the UI." } },
                { "text": { "es": "La creación de envíos debería conciliar los resultados inciertos (un timeout que en realidad creó el envío) en vez de adivinar.", "en": "Shipment creation should reconcile uncertain results (a timeout that actually created the shipment) instead of guessing." } },
                { "text": { "es": "Tests para las invariantes críticas: webhooks duplicados, envíos con resultado incierto y parseo de direcciones.", "en": "Tests for the critical invariants: duplicate webhooks, uncertain shipment creation, and address parsing." } }
              ]
            }
          ]
        }
      ]
    }
  },
  "espacio-boa": {
    "summary": {
      "es": "En BOA, las actividades del centro holístico se descubrían leyendo un calendario colgado en el café. Desarrollé una plataforma que reúne ambos espacios, publica la agenda y permite inscribirse con anticipación. Hoy funciona en producción y uno de los dueños administra las actividades desde el panel.",
      "en": "At BOA, discovering the holistic center’s activities meant reading a calendar on the café wall. I built a platform that brings both spaces together, publishes the schedule, and supports advance registration. It’s now live, with one of the owners managing activities through the dashboard."
    },
    "body": {
      "es": [
        "Espacio BOA reúne un café y un centro holístico, pero no tenía un sistema para organizar sus actividades. Para conocer la programación había que acercarse y leer el calendario de la pared. El proyecto nació para reunir ambos espacios en un canal y permitir inscripciones previas con control de cupos.",
        "Desarrollé la plataforma con Next.js y Supabase, integrando el menú del café, los espacios y la agenda. Modelé cada actividad con fechas, horarios, visibilidad y capacidad. Esos datos alimentan el calendario y las inscripciones: publicar una actividad también define cuándo ocurre y cuántas personas pueden participar.",
        "Implementé validaciones de cupo, confirmaciones y una cuenta donde cada persona puede consultar o cancelar sus inscripciones. Para la gestión interna, construí un panel de actividades. También incluye gift cards con códigos únicos y estados de canje para distinguir las disponibles de las utilizadas.",
        "Hoy la plataforma está en producción y uno de los dueños la administra. La programación puede consultarse sin pasar por el café, y las inscripciones permiten organizar la participación antes de cada actividad. El cambio fue pasar de un calendario en la pared a un sistema de publicación y gestión."
      ],
      "en": [
        "Espacio BOA combines a café and a holistic center, but had no system for organizing its activities. Finding out what was happening meant visiting and reading the calendar on the wall. The project brought both spaces into one channel and introduced advance registration with capacity limits.",
        "I developed the platform with Next.js and Supabase, bringing together the café menu, spaces, and activity schedule. I modeled each activity with dates, times, visibility, and capacity. Those fields drive both the calendar and registration: publishing an activity also defines when it happens and how many people can join.",
        "I implemented capacity checks, confirmations, and an account area where participants can review or cancel their registrations. For internal operations, I built an activity dashboard. It also includes gift cards with unique codes and redemption states to distinguish available cards from those already used.",
        "The platform is now live and managed by one of the owners. People can check the schedule without visiting the café, and registrations help organize attendance before each activity. The change was from a calendar on the wall to a publishing and management system."
      ]
    }
  },
  "manantial": {
    "summary": {
      "es": "Manantial tenía su contenido dentro del sitio de otra organización, sin una web propia. En Zetenta, desarrollé íntegramente su sitio de más de 45 páginas con WordPress, Gutenberg y ACF. Hoy el equipo edita todas las páginas sin tocar código.",
      "en": "Manantial’s content lived on another organization’s website, without a site of its own. At Zetenta, I developed its entire website of more than 45 pages using WordPress, Gutenberg, and ACF. The team now edits every page without touching code."
    },
    "body": {
      "es": [
        "Manantial se presentaba mediante una subpágina dentro del sitio de la Red Gerontológica. Ese espacio tenía poco contenido y no ofrecía una identidad propia. Dentro de Zetenta, desarrollé íntegramente un sitio de más de 45 páginas a partir de los diseños de Figma.",
        "Elegí Gutenberg y ACF para separar la edición de contenido de la estructura visual definida en el tema. En lugar de depender de un page builder, el equipo trabaja con bloques y campos preparados para cada contenido. Así puede actualizar las páginas sin reconstruir el diseño.",
        "Resolví los encabezados y pies como variantes dinámicas según el tipo de página, para reutilizar su estructura donde corresponde. También construí plantillas por departamento: el contenido cambia, pero la estructura se comparte. Sumar contenido no exige volver a desarrollar esa estructura para cada página.",
        "Manantial pasó de una subpágina dentro de otra organización a un sitio propio que su equipo administra desde WordPress. El 100% de las páginas es editable sin tocar código. La entrega incluyó tanto la implementación de Figma como las herramientas para mantener el contenido después."
      ],
      "en": [
        "Manantial was presented through a subpage on the Red Gerontológica website. That space offered limited content and no distinct identity. At Zetenta, I developed the entire website of more than 45 pages from Figma designs.",
        "I chose Gutenberg and ACF to separate content editing from the visual structure defined in the theme. Instead of relying on a page builder, the team uses blocks and fields prepared for each type of content. This lets them update pages without rebuilding the design.",
        "I implemented dynamic header and footer variants based on page type, reusing their structure where appropriate. I also built department templates: the content changes, while the structure is shared. Adding content doesn’t require developing that structure again for every page.",
        "Manantial moved from a subpage within another organization’s website to its own site, managed by its team through WordPress. Every page is editable without touching code. The delivery covered both the Figma implementation and the tools to maintain the content afterward."
      ]
    }
  }
}
