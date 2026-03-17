# 🚀 Portfolio Full Stack Developer

Portfolio profesional premium con React, TypeScript, TailwindCSS, Three.js y Framer Motion.

## ✨ Características

- ⚡ **React + Vite** - Build ultrarrápido y HMR
- 🎨 **TailwindCSS** - Diseño moderno y responsive
- 🎭 **Framer Motion** - Animaciones fluidas y profesionales
- 🌌 **Three.js / R3F** - Partículas 3D sutiles en el hero
- 📝 **TypeScript** - Type safety completo
- 🎯 **Command Palette** - Navegación estilo ⌘K
- 📬 **EmailJS** - Formulario de contacto funcional
- ♿ **Accesibilidad** - WCAG 2.1, keyboard navigation, reduced-motion
- 📱 **Mobile-first** - Perfecto en todos los dispositivos
- 🎪 **Dark mode** - Con persistencia en localStorage

## 📁 Estructura del Proyecto

```
portfolio-dev/
├── src/
│   ├── components/
│   │   ├── ui/              # Componentes reutilizables
│   │   ├── layout/          # Navbar, Footer, CommandPalette
│   │   ├── sections/        # Hero, About, Experience, etc.
│   │   └── effects/         # ParticleField, SpotlightCursor, etc.
│   ├── data/
│   │   └── content.ts       # ⭐ EDITAR ESTE ARCHIVO
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilidades y validaciones
│   ├── styles/              # CSS global
│   ├── types/               # TypeScript types
│   └── App.tsx
├── public/                  # Assets estáticos
└── package.json
```

## 🚀 Instalación

### Requisitos previos
- Node.js 18+ 
- npm o pnpm

### Pasos

1. **Instalar dependencias**
```bash
npm install
# o
pnpm install
```

2. **Configurar EmailJS** (para formulario de contacto)
   - Ir a [emailjs.com](https://www.emailjs.com/) y crear una cuenta
   - Crear un servicio de email (Gmail, Outlook, etc.)
   - Crear un template de email
   - Copiar tu Service ID, Template ID y Public Key
   - Actualizar en `src/data/content.ts`:

```typescript
export const emailConfig = {
  serviceId: "TU_SERVICE_ID",
  templateId: "TU_TEMPLATE_ID",
  publicKey: "TU_PUBLIC_KEY",
}
```

3. **Personalizar contenido**
   - Abrir `src/data/content.ts`
   - Actualizar toda tu información personal:
     - Nombre, rol, bio
     - Links sociales (GitHub, LinkedIn, WhatsApp)
     - Experiencia laboral
     - Proyectos
     - Skills

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

Abrir [http://localhost:5173](http://localhost:5173)

## 📝 Personalización de Contenido

**Archivo principal:** `src/data/content.ts`

### Información Personal
```typescript
export const personalInfo = {
  name: "Tu Nombre",
  role: "Full Stack Developer",
  tagline: "Tu tagline...",
  // ...
}
```

### Links Sociales
```typescript
export const socialLinks = {
  github: "https://github.com/tu-usuario",
  linkedin: "https://linkedin.com/in/tu-perfil",
  whatsapp: "https://wa.me/5491112345678",
}
```

### Proyectos
Agrega tus proyectos en el array `projects`:
```typescript
{
  id: 1,
  title: "Nombre del Proyecto",
  description: "Descripción corta",
  problem: "El problema que resuelve",
  solution: "Tu solución",
  tags: ["React", "TypeScript"],
  // ...
}
```

### Experiencia
Actualiza tu historial en `experience`:
```typescript
{
  role: "Tu Rol",
  company: "Empresa",
  period: "2022 - Presente",
  achievements: [
    "Logro 1 con métricas",
    // ...
  ]
}
```

## 🎨 Personalización de Diseño

### Colores
Editar `tailwind.config.js`:
```javascript
colors: {
  accent: {
    DEFAULT: '#8b5cf6',  // Color principal
    hover: '#a78bfa',
    light: '#c4b5fd',
  },
}
```

### Fuentes
Cambiar en `src/styles/index.css` y `tailwind.config.js`

### Animaciones
Ajustar velocidad en componentes con `transition={{ duration: 0.5 }}`

## 🔧 Build & Deploy

### Build de producción
```bash
npm run build
```

### Preview del build
```bash
npm run preview
```

### Deploy en Vercel

1. **Instalar Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **O desde el Dashboard de Vercel:**
   - Conectar tu repositorio de GitHub
   - Vercel detectará automáticamente Vite
   - ¡Deploy automático!

### Variables de Entorno (opcional)
Si querés proteger tus keys de EmailJS:

Crear `.env`:
```
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

Actualizar `content.ts`:
```typescript
export const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  // ...
}
```

## 📋 Checklist de Calidad

### UX/UI
- ✅ Diseño minimalista premium
- ✅ Animaciones sutiles y fluidas
- ✅ Micro-interacciones (hover, focus, magnetic buttons)
- ✅ Scroll experience suave
- ✅ Command palette (⌘K)
- ✅ Dark mode con toggle
- ✅ Spotlight cursor effect
- ✅ Partículas 3D en hero

### Performance
- ✅ Code splitting automático (Vite)
- ✅ Lazy loading de imágenes
- ✅ Optimización de animaciones
- ✅ Respeto a `prefers-reduced-motion`
- ✅ Bundle size optimizado

### SEO
- ✅ Meta tags completos
- ✅ Open Graph tags
- ✅ Twitter Card
- ✅ Semantic HTML
- ✅ Lighthouse-ready

### Accesibilidad
- ✅ Navegación por teclado
- ✅ Focus visible
- ✅ Contrastes WCAG 2.1 AA
- ✅ ARIA labels
- ✅ Semantic HTML

### Mobile
- ✅ Mobile-first design
- ✅ Touch-friendly (44px mínimo)
- ✅ Responsive en 360px, 768px, 1024px, 1440px
- ✅ Menu hamburguesa funcional

## 🐛 Troubleshooting

### EmailJS no funciona
- Verificar que las keys estén correctas en `content.ts`
- Verificar que el servicio de email esté activo en emailjs.com
- Revisar la consola del navegador para errores

### Animaciones lentas en mobile
- Las partículas 3D se desactivan automáticamente en `prefers-reduced-motion`
- Podés desactivar completamente Three.js comentando `<ParticleField />` en `Hero.tsx`

### Error de TypeScript
```bash
npm run build
```
Esto mostrará los errores. Revisar tipos en `src/types/index.ts`

## 📚 Stack Tecnológico

- **Frontend:** React 18, TypeScript
- **Build:** Vite 5
- **Styling:** TailwindCSS 3
- **Animations:** Framer Motion, Three.js (R3F)
- **Forms:** React Hook Form + Zod
- **Email:** EmailJS
- **Icons:** Lucide React
- **Command Palette:** cmdk
- **Toast:** Sonner

## 📄 Licencia

Este proyecto es de código abierto. Podés usarlo libremente para tu portfolio personal.

---

**¿Necesitás ayuda?** Abrí un issue en el repositorio o contactame directamente.

**¡Buena suerte con tu portfolio! 🚀**
