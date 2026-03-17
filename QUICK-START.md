# 📝 GUÍA RÁPIDA: Cómo Agregar Contenido

## 🎯 Archivo Principal: `src/data/content.ts`

Este es el **único archivo** que necesitás editar para personalizar todo el portfolio.

---

## 1. INFORMACIÓN PERSONAL

```typescript
export const personalInfo = {
  name: "Juan Pérez",                    // Tu nombre completo
  role: "Full Stack Developer",          // Tu rol principal
  tagline: "Frontend Specialist — ...",  // Una línea que te describa
  bio: "Breve descripción...",           // 2-3 líneas sobre vos
  location: "Buenos Aires, Argentina",   // Tu ubicación
  email: "juan@example.com",             // Tu email
  availability: "Disponible para...",    // Estado actual
}
```

---

## 2. LINKS SOCIALES

```typescript
export const socialLinks = {
  github: "https://github.com/juanperez",
  linkedin: "https://linkedin.com/in/juan-perez",
  whatsapp: "https://wa.me/5491112345678",  // Formato: código país + número
}
```

**Formato WhatsApp:** Sin espacios, guiones ni paréntesis
- Argentina: `549` + código área + número
- Ejemplo: `5491112345678` (Buenos Aires)

---

## 3. EXPERIENCIA LABORAL

Agregar items al array `experience`:

```typescript
{
  id: 1,  // Número único
  role: "Senior Frontend Developer",
  company: "Tech Company",
  period: "2022 - Presente",
  location: "Remote",
  achievements: [
    "Logro 1 con métricas específicas (ej: mejoré performance en 40%)",
    "Logro 2 con impacto cuantificable",
    "Logro 3 destacando ownership",
    "Logro 4 mostrando colaboración",
  ],
  technologies: ["React", "TypeScript", "Next.js"],
}
```

**Tips para achievements:**
- Usar números y métricas cuando sea posible
- Enfocarse en el impacto, no solo en tareas
- Mencionar tecnologías clave
- 3-5 bullets por rol es ideal

---

## 4. PROYECTOS

Agregar al array `projects`:

```typescript
{
  id: 1,
  title: "E-Commerce Platform",
  description: "Descripción en 1-2 líneas",
  
  // Contexto del proyecto
  problem: "¿Qué problema resolviste?",
  solution: "¿Cómo lo resolviste?",
  
  // Visual
  image: "/projects/project-1.jpg",  // Guardar imagen en public/projects/
  
  // Categorización
  tags: ["Full Stack", "E-Commerce", "Payment Integration"],
  
  // Highlights del proyecto
  highlights: [
    "Procesamiento de +500 transacciones mensuales",
    "Dashboard con métricas en tiempo real",
    "Score Lighthouse: 94/100",
  ],
  
  // Tech stack
  technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
  
  // Links (opcionales)
  liveUrl: "https://demo.vercel.app",
  githubUrl: "https://github.com/tu-usuario/proyecto",
  
  // Case study (opcional)
  caseStudy: "El desafío principal fue... La solución fue...",
}
```

**¿Cómo agregar imágenes de proyectos?**

1. Guardar tu screenshot/mockup en `public/projects/`
2. Nombrar como: `project-1.jpg`, `project-2.jpg`, etc.
3. Referenciar en el objeto proyecto: `image: "/projects/project-1.jpg"`

**Dimensiones recomendadas:** 1200x800px (ratio 3:2)

---

## 5. SKILLS

```typescript
export const skills = {
  frontend: {
    label: "Frontend Development",
    core: ["React", "Next.js"],      // Tecnologías principales
    strong: ["TailwindCSS"],          // Sólido conocimiento
    familiar: ["Vue.js"],             // Experiencia básica
  },
  // Repetir para backend, devops, testing
}
```

**Niveles sugeridos:**
- **Core:** Lo que usás diariamente, tu expertise
- **Strong:** Experiencia sólida, lo usás regularmente
- **Familiar:** Lo has usado, entiendes los conceptos

---

## 6. CONFIGURACIÓN EMAILJS

### Paso 1: Crear cuenta
1. Ir a [emailjs.com](https://www.emailjs.com/)
2. Registrarse gratis

### Paso 2: Configurar servicio
1. Dashboard → Email Services → Add New Service
2. Elegir Gmail (o tu proveedor)
3. Conectar tu email
4. Copiar el **Service ID**

### Paso 3: Crear template
1. Dashboard → Email Templates → Create New Template
2. Usar este contenido:

```
Subject: Nuevo mensaje de {{from_name}}

De: {{from_name}}
Email: {{from_email}}

Mensaje:
{{message}}
```

3. Copiar el **Template ID**

### Paso 4: Obtener Public Key
1. Dashboard → Account → API Keys
2. Copiar tu **Public Key**

### Paso 5: Actualizar en el código

En `src/data/content.ts`:

```typescript
export const emailConfig = {
  serviceId: "service_abc123",    // Tu Service ID
  templateId: "template_xyz789",  // Tu Template ID
  publicKey: "Tu_Public_Key_Aqui", // Tu Public Key
}
```

---

## 7. SEO: Metadata

En `src/data/content.ts`:

```typescript
export const seoMetadata = {
  title: `${personalInfo.name} | ${personalInfo.role}`,
  description: `Portfolio de ${personalInfo.name}...`,
  keywords: "full stack developer, react, typescript",
  ogImage: "/og-image.jpg",  // Crear imagen 1200x630px
  twitterHandle: "@tuusuario",
}
```

**Crear imagen OG:**
1. Diseñar en Canva/Figma (1200x630px)
2. Incluir tu nombre, rol, tech stack principal
3. Guardar como `og-image.jpg` en `/public/`

---

## 8. PERSONALIZACIÓN DE COLORES

En `tailwind.config.js`:

```javascript
accent: {
  DEFAULT: '#8b5cf6',  // Violeta por defecto
  hover: '#a78bfa',
  light: '#c4b5fd',
}
```

**Colores sugeridos:**
- 🟣 Violeta: `#8b5cf6` (default)
- 🔵 Azul: `#3b82f6`
- 🟢 Verde: `#10b981`
- 🔴 Rojo: `#ef4444`
- 🟠 Naranja: `#f97316`

---

## 9. AGREGAR MÁS PROYECTOS

```typescript
// En src/data/content.ts
export const projects = [
  {
    id: 1,
    // ... proyecto 1
  },
  {
    id: 2,
    // ... proyecto 2
  },
  {
    id: 3,
    title: "Nuevo Proyecto",  // ← Agregar aquí
    description: "...",
    // ... resto de la info
  }
]
```

---

## 10. TESTING LOCAL

Después de hacer cambios:

```bash
# Ver cambios en vivo
npm run dev

# Abrir http://localhost:5173
```

---

## ❓ PREGUNTAS FRECUENTES

**P: ¿Cómo cambio las fuentes?**
R: En `src/styles/index.css` cambiar el `@import` de Google Fonts y actualizar `tailwind.config.js`

**P: ¿Puedo desactivar las partículas 3D?**
R: Sí, en `Hero.tsx` comentar `<ParticleField />`

**P: ¿Cómo agrego más secciones?**
R: Crear componente en `src/components/sections/`, importar en `App.tsx`

**P: ¿El formulario funciona sin EmailJS?**
R: No, necesitas configurar EmailJS (es gratis). Alternativa: usar Formspree

**P: ¿Puedo usar este portfolio para uso comercial?**
R: Sí, es open source y libre para uso personal y comercial

---

## 🚀 CHECKLIST RÁPIDO ANTES DE DEPLOY

- [ ] Actualizar todos los datos en `content.ts`
- [ ] Configurar EmailJS
- [ ] Agregar imágenes de proyectos
- [ ] Crear imagen OG
- [ ] Probar formulario localmente
- [ ] Verificar todos los links sociales
- [ ] Build sin errores: `npm run build`
- [ ] Deploy a Vercel

---

**¿Dudas?** Revisá el `README.md` para instrucciones detalladas.
