# Portfolio Site — Design Spec
**Date:** 2026-08-13
**Owner:** Niki Tsolaki

---

## Overview

A professional, single-page portfolio site built with Next.js and GSAP animations. Dual purpose: showcase Niki's work for job hunting (frontend → fullstack roles) and serve as a hands-on learning exercise during development.

**Live target audience:** Recruiters and hiring managers in the Greek and international tech market.

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14+ (App Router) | SSR/SSG support, SEO, industry standard |
| Animations | GSAP | Scroll-triggered animations, smooth transitions |
| Styling | Tailwind CSS | Utility-first, fast iteration |
| Language | TypeScript | Type safety, better DX |
| Deployment | Vercel | Zero-config, CI/CD from GitHub |
| i18n | Custom context (no external lib) | Simple bilingual toggle (GR/EN), no routing needed |

---

## Design Language

- **Theme:** Dark — deep purple/dark navy backgrounds (`#0f0a1a`)
- **Accent:** Violet-to-pink gradient (`#a855f7` → `#ec4899`)
- **Secondary accent:** Indigo (`#818cf8`) for backend/tools category
- **Typography:** Left-aligned, editorial. Mix of bold display and readable body.
- **Cards:** Subtle glass-morphism borders (`border: 1px solid rgba(168,85,247,0.2)`)
- **Radius:** Rounded but not pill-heavy — `8-12px` for cards, `20px` for tags

---

## Layout

Single-page application. All sections in one scroll. Sticky top navigation with smooth scroll anchors.

### Navigation
- Sticky top bar with section links: About · Projects · Skills · Experience · Contact
- Language toggle (GR / EN) — right side of nav
- Mobile: hamburger menu

---

## Sections

### 1. Hero

Left-aligned layout. Full viewport height.

```
[small label]  Niki Tsolaki
[large heading] Frontend Developer
[gradient text] & Founder
[left-border quote] I build fast, beautiful web & mobile products.
                    Creator of Metriqs — a SaaS for construction pros.
[CTA buttons]  View Work ↓  |  GitHub
```

**GSAP animation:** Elements stagger in on load (opacity + y-axis). Subtle gradient orb in background animates slowly.

### 2. About

Two-column on desktop, single on mobile.
- Left: short bio paragraph (bilingual). Highlight: 3+ years frontend, founder mindset, aiming fullstack.
- Right: "At a glance" quick facts — Location, Education, Languages, Open to work status.

### 3. Projects

**Curated Showcase approach:**

- **Metriqs** — large featured card (full width). `FOUNDER` badge. Gradient border. Description, tech tags, Live + GitHub links.
- **3 secondary featured cards** in a grid row:
  1. Dev Event Platform (Next.js fullstack)
  2. GSAP MacBook Website (React + GSAP + Three.js)
  3. MovieFlex (React Native + Appwrite)
- **Other Projects** compact grid (2 columns):
  - Real Estate App
  - Dashboard App
  - TUNGSTEN Game
  - Data Analytics (Tableau)

**GSAP animation:** Cards animate in as user scrolls into view (stagger from bottom).

### 4. Skills

Grouped tags by category. Three groups with distinct accent colors:

| Category | Color | Technologies |
|---|---|---|
| Frontend | Purple (`#a855f7`) | React, Next.js, TypeScript, GSAP, Three.js, Tailwind, HTML5, CSS3/SASS |
| Mobile | Pink (`#ec4899`) | React Native, Expo |
| Backend & Tools | Indigo (`#818cf8`) | Node.js, MongoDB, MySQL, RESTful APIs, Git, GitHub, Vercel CI/CD, Figma |

No progress bars. Tags are honest and recruiter-readable.

### 5. Experience / CV

Vertical timeline layout.

**Work Experience:**
1. **Founder & Developer** — Metriqs · May 2026–Present
   - Built and launched Android SaaS for construction professionals
   - Offline-first architecture, PDF generation, multi-device sync
2. **Freelance Frontend / Full-Stack Engineer** — Self-Employed · 2022–Present
   - React, Next.js, React Native projects
   - Full development lifecycle: design → build → deploy
3. **Data Analyst** — Axel Accessories · 2023
   - Tableau, SQL, Excel dashboards

**Education:**
- BSc Computer Science — Hellenic Open University · 2016–2022
- Postgraduate Certification in Game Development — KE.DI.VI.M., HOU · 2022–2023

**Languages:** Greek (Native) · English (C2) · French (B2)

**GSAP animation:** Timeline items animate in sequentially as user scrolls.

### 6. Contact

- Email link (mailto)
- LinkedIn, GitHub icons
- Simple contact form: Name, Email, Message → Next.js Server Action → Resend API (free tier, sends email to nikitsolaki10@gmail.com)
- Location: Thessaloniki, Greece

---

## Bilingual (GR / EN)

- Toggle button in nav switches language
- All user-visible strings stored in `lib/i18n/el.ts` and `lib/i18n/en.ts`
- Active language stored in React context (`LanguageContext`)
- No URL routing change — same page, content swaps

**Tutor note for implementation:** This is a great intro to React Context API — a pattern for sharing state across components without prop-drilling.

---

## File Structure

```
portfolio/
├── app/
│   ├── page.tsx          ← assembles all sections
│   ├── layout.tsx        ← fonts, metadata, global styles
│   └── globals.css
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── Navbar.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── SkillTag.tsx
│   │   ├── TimelineItem.tsx
│   │   └── LanguageToggle.tsx
│   └── layout/
│       └── SectionWrapper.tsx
├── lib/
│   ├── i18n/
│   │   ├── en.ts
│   │   └── el.ts
│   └── context/
│       └── LanguageContext.tsx
├── public/
│   └── (images, icons, CV PDF)
└── docs/
    └── superpowers/specs/
        └── 2026-08-13-portfolio-design.md
```

---

## GSAP Animation Plan

| Section | Animation | Trigger |
|---|---|---|
| Hero | Stagger in (opacity + translateY) | On load |
| Hero BG | Slow floating gradient orb | Continuous |
| Projects | Cards stagger from bottom | ScrollTrigger |
| Skills | Tags fade in by group | ScrollTrigger |
| Experience | Timeline items draw in sequentially | ScrollTrigger |
| Navbar | Shrink/blur on scroll | ScrollTrigger |

---

## Out of Scope

- Blog
- CMS / admin panel
- Authentication
- Dark/light mode toggle (dark only)
- Database for contact form (Resend handles delivery, no DB needed)
