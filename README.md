# Pedrazzoli Digital — Freelance Web Development Landing Page

**Live:** [pedrazzolidigital.com](https://pedrazzolidigital.com)

A landing page for my own freelance web development brand, targeting the Brazilian market. The site is designed to convert visitors into WhatsApp leads — every section funnels toward a contextual WhatsApp message with the visitor's interest already pre-filled.

---

## Context

After building several client projects, I needed a proper storefront for my freelance work. The target audience is Brazilian small business owners who need a professional website but don't know where to start. The site explains what I offer, shows real work, lists pricing, and makes it easy to start a conversation via WhatsApp (the dominant communication channel in Brazil).

This is also the project where I experimented with Tailwind CSS v4's new features (the `@theme` directive, oklch color functions, and the Vite plugin approach instead of PostCSS).

---

## Tech Stack

**Frontend:** React 19, Vite 7, Tailwind CSS v4, Framer Motion, React Router 7, Lucide React, React Hot Toast

**Infrastructure:** Vercel, custom domain via Hostinger

No backend. This is a pure frontend landing page — form submissions go directly to WhatsApp via URL schemes with pre-filled messages.

---

## Architecture

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # Blur effect on scroll, mobile fullscreen menu
│   │   ├── Footer.jsx
│   │   ├── WhatsAppButton.jsx  # Floating button with pulse animation
│   │   ├── CookieConsent.jsx
│   │   └── ScrollToTop.jsx
│   ├── sections/               # Each section of the landing page
│   │   ├── Hero.jsx
│   │   ├── BusinessTypes.jsx   # 12 business types I serve
│   │   ├── Features.jsx        # 12 features included in every site
│   │   ├── Process.jsx         # Step-by-step of how I work
│   │   ├── Portfolio.jsx       # Real client work
│   │   ├── Plans.jsx           # 3 pricing tiers + maintenance
│   │   ├── TechStack.jsx       # Technologies I use
│   │   ├── Testimonials.jsx
│   │   ├── AboutMe.jsx
│   │   ├── FAQ.jsx
│   │   ├── WorldMap.jsx        # Visual: Brazil + Portugal coverage
│   │   └── CTAFinal.jsx        # Final call to action
│   ├── seo/
│   │   └── SEO.jsx             # Dynamic meta tags via DOM manipulation
│   └── ui/
│       ├── Button.jsx
│       ├── CTABanner.jsx
│       ├── FadeIn.jsx          # Intersection Observer wrapper
│       ├── OrbitingSkills.jsx  # Animated tech orbit visual
│       ├── SectionHeader.jsx
│       └── ThemeToggle.jsx
│
├── data/                       # All content separated from components
│   ├── businessTypes.js        # 12 business types with descriptions
│   ├── features.js             # 12 features with icons
│   ├── plans.js                # 3 pricing plans + monthly maintenance
│   ├── faq.js                  # FAQ content
│   ├── portfolio.js            # Client cases + process steps
│   └── testimonials.js
│
├── contexts/
│   ├── ThemeContext.js          # Dark/light mode state
│   ├── ThemeProvider.jsx        # Persists preference in localStorage
│   └── CookieProvider.jsx       # GDPR consent state
│
├── hooks/
│   ├── useTheme.jsx            # Access theme from any component
│   └── useInView.js            # IntersectionObserver for scroll animations
│
├── pages/
│   ├── Home.jsx                # Composes all sections
│   ├── Privacy.jsx
│   └── Terms.jsx
│
├── utils/
│   ├── config.js               # Centralized: name, phone, email, SEO settings
│   └── whatsapp.js             # WhatsApp URL generators with contextual messages
│
└── styles/
    └── index.css               # Tailwind v4 theme, CSS variables, custom keyframes
```

---

## Key Features

### Contextual WhatsApp conversion

This is the core design principle of the site. Every CTA generates a WhatsApp URL with a pre-written message that includes context about what the visitor was looking at.

For example, if someone is browsing the "Restaurant" business type and clicks the CTA, the WhatsApp message opens with something like "Hi, I have a restaurant and I'm interested in a professional website." If they click from the "E-commerce" plan, the message references that specific plan and price.

The `whatsapp.js` utility generates these URLs with the correct phone number format (international, without +) and URL-encoded messages. Every section that has a CTA calls this utility with the relevant context.

### Content/component separation

All text content lives in the `data/` directory — business types, features, plans, FAQ, testimonials, portfolio. The section components only handle layout and rendering. This makes it straightforward to update pricing, add a new FAQ question, or swap out a testimonial without touching component code.

### Dark mode

Full dark/light mode support with three sources of truth (in priority order): manual toggle, localStorage preference, system `prefers-color-scheme`. The `ThemeProvider` handles all three and the toggle in the navbar lets users override. The theme uses Tailwind v4's `@theme` directive with oklch color values.

### Scroll animations

The `FadeIn.jsx` component wraps any element and triggers a CSS animation when it enters the viewport, using a custom `useInView` hook built on IntersectionObserver. Every section uses this for entrance animations. I built this instead of using Framer Motion's `whileInView` because I wanted more control over the animation timing and to keep the animation CSS-based rather than JS-driven.

### SEO

The `SEO.jsx` component dynamically sets meta tags (title, description, Open Graph, Twitter Cards, canonical URL) by directly manipulating the DOM — no `react-helmet` dependency needed. SEO configuration is centralized in `utils/config.js`. The site also has `robots.txt`, `manifest.json`, and sitemap generation would be a straightforward addition.

### Typography

The site uses Plus Jakarta Sans for body text and Instrument Serif for headings — a deliberate pairing that avoids the "Inter on everything" look that makes sites feel AI-generated. The font configuration is in the Tailwind theme via CSS custom properties.

---

## Tailwind CSS v4 notes

This project uses Tailwind v4 which has significant differences from v3:

- **No `tailwind.config.js` for theming.** Colors, fonts, and spacing are defined directly in CSS using `@theme` blocks inside `index.css`.
- **oklch color space.** All custom colors use oklch notation (e.g., `oklch(0.68 0.15 145)` for the primary green) which provides more perceptually uniform color manipulation.
- **Vite plugin instead of PostCSS.** Tailwind v4 integrates via `@tailwindcss/vite` rather than the PostCSS plugin. The `vite.config.js` imports it directly.
- **VS Code needs configuration.** The native CSS validator doesn't understand `@theme` and `@utility` directives. Requires disabling `css.validate` and using the Tailwind CSS IntelliSense extension.

---

## Running locally

Prerequisites: Node.js 18+

```bash
git clone https://github.com/Orlando-Pedrazzoli/pedrazzoli-digital.git

npm install
npm run dev     # Port 5173
```

Production build:

```bash
npm run build
npm run preview
```

Deployed on Vercel. The `vercel.json` rewrites all routes to `index.html` for SPA routing.

---

## What I'd improve

- **Add contact form as backup.** Currently the only conversion path is WhatsApp. Adding an EmailJS form would capture leads from people who prefer email — especially potential clients in Portugal or Europe where WhatsApp is less dominant for business inquiries.
- **Analytics.** No tracking is implemented yet. Adding Plausible or a simple analytics solution would help understand which sections and plans get the most engagement.
- **OG image.** The Open Graph image for social sharing is not yet configured. Need to create a 1200x630px branded image.
- **Internationalisation.** The site is Portuguese-only (targeting Brazil). Adding an English version would help if I want to target the Portuguese or European market too.
- **Migrate to TypeScript.** The project is JavaScript. Following the pattern of my newer projects, TypeScript would be the right choice.

---

## License

Private project. Code shared for portfolio purposes. All rights reserved.

---

Built by [Orlando Pedrazzoli](https://www.orlandopedrazzoli.com) — Full Stack Developer, Lisbon.
