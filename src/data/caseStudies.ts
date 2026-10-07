import type { Localized, LocalizedList } from './experiences'

export const caseStudies: Record<'solution' | 'espacio-boa' | 'manantial', { summary: Localized; body: LocalizedList }> = {
  "solution": {
    "summary": {
      "es": "Desarrollé la plataforma de e-commerce propia de Solution, que entró en producción a principios de abril de 2026. La marca pasó de unos 80 pedidos mensuales en Tienda Nube a unos 300, y al 14 de septiembre de 2026 la plataforma había procesado 1.086 pedidos de 1.006 compradores únicos. Estuvo en producción hasta el 5 de octubre de 2026, cuando el cliente migró a Shopify para simplificar las integraciones con sus proveedores logísticos.",
      "en": "I built Solution’s custom e-commerce platform, which went live in early April 2026. The brand went from around 80 monthly orders on Tienda Nube to around 300, and as of September 14, 2026, the platform had processed 1,086 orders from 1,006 unique buyers. It ran in production until October 5, 2026, when the client moved to Shopify to simplify integrations with its logistics providers."
    },
    "body": {
      "es": [
        "Solution vendía en Tienda Nube y procesaba unos 80 pedidos mensuales. Desarrollé de punta a punta una plataforma de e-commerce propia, con checkout, pagos, envíos, panel de administración y portal mayorista, adaptada a la operación de la marca.",
        "Modelé el checkout con estados explícitos de pago: pendiente, aprobado y rechazado. Así, iniciar un pago no equivalía a confirmar una compra, y cada estado tenía una respuesta visible para quien compra. Integré Mercado Pago como pasarela y Correo Argentino para los envíos a todo el país.",
        "Separé las reglas minoristas de las mayoristas para que las condiciones de un canal no se aplicaran al otro. El portal mayorista incluía solicitud de cuenta, aprobación y acceso según el plan asignado.",
        "La plataforma entró en producción a principios de abril de 2026. Al 14 de septiembre, había procesado 1.086 pedidos de 1.006 compradores únicos, y la marca llegó a unos 300 pedidos mensuales: casi cuatro veces el volumen anterior.",
        "Estuvo en producción hasta el 5 de octubre de 2026, cuando el cliente migró a Shopify para simplificar las integraciones con sus proveedores logísticos."
      ],
      "en": [
        "Solution was selling on Tienda Nube and handling around 80 orders a month. I built a custom e-commerce platform end to end, with checkout, payments, shipping, an admin dashboard and a wholesale portal, shaped around how the brand actually operated.",
        "I modeled checkout with explicit payment states: pending, approved and rejected. Starting a payment never counted as a confirmed purchase, and every state had a clear response for the buyer. I integrated Mercado Pago for payments and Correo Argentino for nationwide shipping.",
        "I kept retail and wholesale rules separate so one channel's conditions never applied to the other. The wholesale portal included account requests, approval and plan-based access.",
        "The platform went live in early April 2026. As of September 14, it had processed 1,086 orders from 1,006 unique buyers, and the brand had grown to around 300 orders a month: almost four times its previous volume.",
        "It ran in production until October 5, 2026, when the client moved to Shopify to simplify integrations with its logistics providers."
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
