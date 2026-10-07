# Alejo de la Arena — Portfolio

Personal portfolio of a full-stack developer with a frontend focus, based in Buenos Aires.

**Live site:** [portfolio-adla.vercel.app](https://portfolio-adla.vercel.app)

## What's inside

The site presents my client work as case studies: what the business needed, the decisions I made and what was delivered. Each experience has its own detail page with desktop and mobile screenshots.

Some of the decisions behind it:

- **Content separated from components.** Experiences, case studies and UI copy live in typed data files, so content changes never touch layout code.
- **Bilingual (ES / EN).** Every piece of content is stored in both languages and switched through a locale context, including the case study pages.
- **Animated WebGL hero.** A halftone pattern rendered with a custom shader on OGL, a lightweight alternative to Three.js for a single full-screen effect.
- **Accessible motion.** Animations respect `prefers-reduced-motion`, and interactive elements are keyboard-operable.
- **Working contact form.** Validated with React Hook Form and Zod, delivered through EmailJS.

## Stack

React · TypeScript · Vite · Tailwind CSS · Framer Motion · OGL (WebGL) · React Router · React Hook Form · Zod · EmailJS · Vercel

## Structure

```
src/
├── components/
│   ├── sections/     # Home page sections
│   ├── experience/   # Case study pages, carousel, image lightbox
│   ├── effects/      # WebGL hero and motion effects
│   ├── layout/       # Navbar and footer
│   └── ui/           # Reusable components
├── data/             # Experiences, case studies and localized content
├── context/          # Locale (ES / EN)
└── hooks/            # Reduced motion, media queries, scroll spy
```

## Contact

[LinkedIn](https://www.linkedin.com/in/alejo-de-la-arena/) · alejodelaarenaa@gmail.com
