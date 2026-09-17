import type { Localized, LocalizedList } from './experiences'

export const caseStudies: Record<'solution' | 'espacio-boa' | 'manantial', { summary: Localized; body: LocalizedList }> = {
  "solution": {
    "summary": {
      "es": "Solution pasó de unos 80 pedidos mensuales en Tienda Nube a unos 300 con su plataforma propia, que desarrollé. Acumula 1.086 pedidos de 1.006 compradores únicos al 14 de septiembre de 2026.",
      "en": "Solution went from around 80 monthly orders on Tienda Nube to around 300 on the custom platform I built. It processed 1,086 orders from 1,006 unique buyers as of September 14, 2026."
    },
    "body": {
      "es": [
        "Solution vendía en Tienda Nube y procesaba unos 80 pedidos mensuales. Desarrollé una plataforma propia para definir el checkout y las reglas comerciales según su operación. La decisión permitió tratar la venta minorista y la mayorista como flujos distintos dentro del mismo producto.",
        "Modelé el checkout con estados explícitos de pago: pendiente, aprobado y rechazado. Así, iniciar un pago no equivale a confirmar una compra, y cada estado tiene una respuesta visible para quien compra. Integré Mercado Pago como única pasarela y Correo Argentino para los envíos a todo el país.",
        "Separé las reglas minoristas de las mayoristas para que las condiciones de un canal no se apliquen al otro. El portal mayorista incluye solicitud de cuenta, aprobación y acceso según el plan asignado. Esa separación permite modificar condiciones mayoristas sin mezclar esa lógica con el checkout minorista.",
        "La plataforma está en producción desde el 6 de agosto de 2026. Al 14 de septiembre de 2026, acumula 1.086 pedidos de 1.006 compradores únicos. La marca promedia unos 300 pedidos mensuales: casi cuatro veces el volumen anterior. La plataforma acompañó el crecimiento junto con cambios en la operación de la marca."
      ],
      "en": [
        "Solution sold through Tienda Nube and processed around 80 orders per month. I built a custom platform to shape the checkout and business rules around its operations. This made it possible to handle retail and wholesale as distinct flows within the same product.",
        "I modeled checkout around explicit payment states: pending, approved, and rejected. Starting a payment doesn’t mean a purchase is confirmed, and each state provides visible feedback to the buyer. I integrated Mercado Pago as the sole payment provider and Correo Argentino for nationwide shipping.",
        "I separated retail and wholesale rules so that one channel’s conditions wouldn’t apply to the other. The wholesale portal includes account requests, approval, and access based on the assigned plan. This separation allows wholesale terms to change without mixing that logic into retail checkout.",
        "The platform has been live since August 6, 2026. As of September 14, 2026, it has processed 1,086 orders from 1,006 unique buyers. The brand averages around 300 monthly orders: nearly four times its previous volume. The platform supported that growth alongside changes in the brand’s operations."
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
