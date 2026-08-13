# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page bilingual (GR/EN) portfolio site for Niki Tsolaki using Next.js 14+, TypeScript, Tailwind CSS, and GSAP animations.

**Architecture:** Single `app/page.tsx` assembles all section components. Static data lives in `data/` files. Language state is managed via React Context and stored in `localStorage`. GSAP ScrollTrigger animations are added last, after all sections are functional.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, GSAP, Resend (contact form), Jest + React Testing Library

---

> **Tutor context:** This plan is also a learning exercise. Each task teaches a concept. Read the step, understand what it does, then execute it.

---

## Prerequisites

Before starting:
- Node.js 18+ installed (`node -v`)
- A free Resend account + API key at https://resend.com (for Task 11)
- Git initialized in the project folder

---

## File Map

```
portfolio/
├── app/
│   ├── layout.tsx               ← root layout: fonts, metadata, LanguageProvider
│   ├── page.tsx                 ← assembles all sections
│   ├── globals.css              ← base styles, CSS variables
│   └── api/contact/route.ts     ← Server Action endpoint for Resend
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── ProjectCard.tsx      ← used by Projects.tsx
│   │   ├── SkillTag.tsx         ← used by Skills.tsx
│   │   └── TimelineItem.tsx     ← used by Experience.tsx
│   └── layout/
│       ├── Navbar.tsx           ← sticky nav + language toggle
│       └── SectionWrapper.tsx   ← consistent padding/id per section
├── lib/
│   ├── context/
│   │   └── LanguageContext.tsx  ← React Context for GR/EN toggle
│   └── i18n/
│       ├── en.ts                ← all English strings
│       └── el.ts                ← all Greek strings
├── data/
│   ├── projects.ts              ← project list with bilingual descriptions
│   ├── skills.ts                ← skills grouped by category
│   └── experience.ts            ← work + education + languages
└── __tests__/
    ├── LanguageContext.test.tsx
    ├── ProjectCard.test.tsx
    └── Contact.test.tsx
```

---

## Task 1: Project Setup

**Files:**
- Create: `portfolio/` (root — run command from parent directory)
- Modify: `tailwind.config.ts`
- Create: `app/globals.css`

> **Tutor note:** `create-next-app` scaffolds the full project. The `--app` flag uses the modern App Router (Next.js 13+). App Router means your routes are folders inside `app/`, not `pages/`. This is the current standard.

- [ ] **Step 1: Create Next.js project**

Run from `C:/Users/nikim/MyFiles/`:
```bash
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"
cd portfolio
```

- [ ] **Step 2: Install dependencies**

```bash
npm install gsap @gsap/react resend
npm install -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom ts-node
```

- [ ] **Step 3: Configure Jest**

Create `jest.config.ts`:
```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

Create `jest.setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Configure Tailwind custom colors**

Replace the `theme.extend` section of `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      bg: '#0f0a1a',
      'bg-card': '#1a0a2e',
      purple: {
        DEFAULT: '#a855f7',
        light: '#c084fc',
        dark: '#7c3aed',
      },
      pink: {
        DEFAULT: '#ec4899',
        light: '#f472b6',
      },
      indigo: {
        DEFAULT: '#818cf8',
        light: '#a5b4fc',
      },
      muted: '#94a3b8',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
},
```

- [ ] **Step 5: Set up base CSS**

Replace `app/globals.css` entirely:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0f0a1a;
  color: #f8fafc;
  font-family: 'Inter', sans-serif;
}

.gradient-text {
  background: linear-gradient(90deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-border {
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.gradient-bg {
  background: linear-gradient(135deg, #1a0a2e, #2d0a4e);
}
```

- [ ] **Step 6: Create folder structure**

```bash
mkdir -p components/sections components/ui components/layout lib/context lib/i18n data __tests__
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js project with Tailwind, GSAP, Jest"
```

---

## Task 2: Static Data

**Files:**
- Create: `data/projects.ts`
- Create: `data/skills.ts`
- Create: `data/experience.ts`

> **Tutor note:** Keeping data separate from components is a key principle — components are responsible for HOW to display, data files are responsible for WHAT to display. If you want to update project descriptions later, you touch one file, not ten components.

- [ ] **Step 1: Create projects data**

Create `data/projects.ts`:
```typescript
export type Project = {
  id: string
  title: string
  desc: { en: string; el: string }
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  tier: 'hero' | 'featured' | 'other'
  badge?: string
}

export const projects: Project[] = [
  {
    id: 'metriqs',
    title: 'Metriqs',
    desc: {
      en: 'Mobile SaaS for construction professionals. Transforms on-site measurements into branded PDF quotes in under 3 minutes. Offline-first, multi-device sync.',
      el: 'Mobile SaaS για επαγγελματίες του κατασκευαστικού. Μετατρέπει μετρήσεις σε επαγγελματικές προσφορές PDF σε λιγότερο από 3 λεπτά. Offline-first, συγχρονισμός πολλαπλών συσκευών.',
    },
    tags: ['React Native', 'Android', 'SaaS', 'Offline-first'],
    liveUrl: 'https://www.metriqs.gr/el',
    tier: 'hero',
    badge: 'FOUNDER',
  },
  {
    id: 'dev-event-platform',
    title: 'Dev Event Platform',
    desc: {
      en: 'Full-stack event platform with SSR/CSR, MongoDB backend, Cloudinary media, and PostHog analytics.',
      el: 'Full-stack πλατφόρμα events με SSR/CSR, MongoDB backend, Cloudinary και PostHog analytics.',
    },
    tags: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind'],
    liveUrl: 'https://nextjs-dev-event.netlify.app/',
    githubUrl: 'https://github.com/Nikitso10',
    tier: 'featured',
  },
  {
    id: 'gsap-macbook',
    title: 'GSAP MacBook Website',
    desc: {
      en: 'Apple-style product page with 3D scenes and scroll-based animations.',
      el: 'Apple-style product page με 3D scenes και scroll-based animations.',
    },
    tags: ['React', 'GSAP', 'Three.js', 'Tailwind'],
    liveUrl: 'https://react-gsap-macbook-app.netlify.app/',
    tier: 'featured',
  },
  {
    id: 'movieflex',
    title: 'MovieFlex',
    desc: {
      en: 'Mobile app to explore films, save favorites, and manage user profile.',
      el: 'Mobile app για εξερεύνηση ταινιών, αποθήκευση αγαπημένων και διαχείριση προφίλ.',
    },
    tags: ['React Native', 'Expo', 'Appwrite', 'TypeScript'],
    githubUrl: 'https://github.com/Nikitso10/movie_app',
    tier: 'featured',
  },
  {
    id: 'real-estate',
    title: 'Real Estate App',
    desc: {
      en: 'Real-estate listing app with Google auth, dynamic routing, and search filters.',
      el: 'App αγγελιών ακινήτων με Google auth, dynamic routing και search filters.',
    },
    tags: ['React Native', 'Expo', 'Appwrite'],
    githubUrl: 'https://github.com/Nikitso10/react_native_real_estate',
    tier: 'other',
  },
  {
    id: 'dashboard',
    title: 'Dashboard App',
    desc: {
      en: 'E-commerce dashboard with multiple themes and Syncfusion components.',
      el: 'E-commerce dashboard με πολλά themes και Syncfusion components.',
    },
    tags: ['React', 'Syncfusion', 'Tailwind'],
    liveUrl: 'https://react-syncfusion-tailwind-dashboard.netlify.app/',
    tier: 'other',
  },
  {
    id: 'tungsten',
    title: 'TUNGSTEN',
    desc: {
      en: 'First-person multiplayer shooter. Project Manager + 3D modeling role.',
      el: 'First-person multiplayer shooter. Ρόλος Project Manager + 3D modeling.',
    },
    tags: ['Godot 4', 'Blender', 'Game Dev'],
    tier: 'other',
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    desc: {
      en: 'Business dashboards and visualizations using Tableau, SQL, Excel.',
      el: 'Business dashboards και visualizations με Tableau, SQL, Excel.',
    },
    tags: ['Tableau', 'SQL', 'Excel', 'Looker Studio'],
    liveUrl: 'https://public.tableau.com/app/profile/niki.tsolaki/vizzes',
    tier: 'other',
  },
]
```

- [ ] **Step 2: Create skills data**

Create `data/skills.ts`:
```typescript
export type SkillGroup = {
  category: { en: string; el: string }
  color: 'purple' | 'pink' | 'indigo'
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: { en: 'Frontend', el: 'Frontend' },
    color: 'purple',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'GSAP', 'Three.js', 'Tailwind CSS', 'CSS3/SASS', 'HTML5'],
  },
  {
    category: { en: 'Mobile', el: 'Mobile' },
    color: 'pink',
    skills: ['React Native', 'Expo'],
  },
  {
    category: { en: 'Backend & Tools', el: 'Backend & Εργαλεία' },
    color: 'indigo',
    skills: ['Node.js', 'MongoDB', 'MySQL', 'RESTful APIs', 'PHP', 'Git', 'GitHub', 'Vercel', 'Figma'],
  },
]
```

- [ ] **Step 3: Create experience data**

Create `data/experience.ts`:
```typescript
export type WorkEntry = {
  role: { en: string; el: string }
  company: string
  period: string
  bullets: { en: string; el: string }[]
  highlight?: boolean
}

export type EducationEntry = {
  degree: { en: string; el: string }
  institution: string
  period: string
}

export const workExperience: WorkEntry[] = [
  {
    role: { en: 'Founder & Developer', el: 'Ιδρύτρια & Developer' },
    company: 'Metriqs',
    period: 'May 2026 – Present',
    highlight: true,
    bullets: [
      {
        en: 'Built and launched an Android SaaS for construction professionals from idea to live product.',
        el: 'Ανέπτυξα και κυκλοφόρησα Android SaaS για επαγγελματίες κατασκευαστικού από ιδέα σε live προϊόν.',
      },
      {
        en: 'Designed offline-first architecture with automatic sync and PDF quote generation.',
        el: 'Σχεδίασα offline-first αρχιτεκτονική με αυτόματο συγχρονισμό και δημιουργία PDF προσφορών.',
      },
    ],
  },
  {
    role: { en: 'Freelance Frontend / Full-Stack Engineer', el: 'Freelance Frontend / Full-Stack Engineer' },
    company: 'Self-Employed',
    period: '2022 – Present',
    bullets: [
      {
        en: 'Built responsive web and mobile interfaces using React, Next.js, React Native, and TypeScript.',
        el: 'Ανέπτυξα responsive web και mobile interfaces με React, Next.js, React Native και TypeScript.',
      },
      {
        en: 'Integrated RESTful APIs, deployed via Vercel, and maintained reusable component libraries.',
        el: 'Ενσωμάτωσα RESTful APIs, deployment μέσω Vercel, και συντήρηση reusable component libraries.',
      },
    ],
  },
  {
    role: { en: 'Data Analyst', el: 'Data Analyst' },
    company: 'Axel Accessories',
    period: '2023',
    bullets: [
      {
        en: 'Created dashboards and reports using Tableau, SQL, Excel, and Google Looker Studio.',
        el: 'Δημιούργησα dashboards και αναφορές με Tableau, SQL, Excel και Google Looker Studio.',
      },
    ],
  },
]

export const education: EducationEntry[] = [
  {
    degree: { en: 'BSc in Computer Science', el: 'Πτυχίο Πληροφορικής' },
    institution: 'Hellenic Open University (HOU)',
    period: '2016 – 2022',
  },
  {
    degree: {
      en: 'Postgraduate Certification in Game Development',
      el: 'Μεταπτυχιακό Πιστοποιητικό Game Development',
    },
    institution: 'KE.DI.VI.M., HOU',
    period: '2022 – 2023',
  },
]

export const languages = [
  { name: { en: 'Greek', el: 'Ελληνικά' }, level: 'Native' },
  { name: { en: 'English', el: 'Αγγλικά' }, level: 'C2' },
  { name: { en: 'French', el: 'Γαλλικά' }, level: 'B2' },
]
```

- [ ] **Step 4: Commit**

```bash
git add data/
git commit -m "feat: add static data for projects, skills, experience"
```

---

## Task 3: i18n System

**Files:**
- Create: `lib/i18n/en.ts`
- Create: `lib/i18n/el.ts`
- Create: `lib/context/LanguageContext.tsx`
- Create: `__tests__/LanguageContext.test.tsx`

> **Tutor note:** React Context is the answer to "how do I share state between components that are not parent/child?" Without Context, you'd have to pass `lang` as a prop from `page.tsx` → every section → every sub-component. That's called "prop drilling" and it's painful. Context lets any component read the language without knowing who set it.

- [ ] **Step 1: Write the failing test**

Create `__tests__/LanguageContext.test.tsx`:
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider, useLanguage } from '@/lib/context/LanguageContext'

function TestComponent() {
  const { lang, toggleLang } = useLanguage()
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <button onClick={toggleLang}>toggle</button>
    </div>
  )
}

describe('LanguageContext', () => {
  it('defaults to English', () => {
    render(<LanguageProvider><TestComponent /></LanguageProvider>)
    expect(screen.getByTestId('lang').textContent).toBe('en')
  })

  it('toggles to Greek when toggled', () => {
    render(<LanguageProvider><TestComponent /></LanguageProvider>)
    fireEvent.click(screen.getByText('toggle'))
    expect(screen.getByTestId('lang').textContent).toBe('el')
  })

  it('toggles back to English on second toggle', () => {
    render(<LanguageProvider><TestComponent /></LanguageProvider>)
    fireEvent.click(screen.getByText('toggle'))
    fireEvent.click(screen.getByText('toggle'))
    expect(screen.getByTestId('lang').textContent).toBe('en')
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest __tests__/LanguageContext.test.tsx
```
Expected: FAIL — `Cannot find module '@/lib/context/LanguageContext'`

- [ ] **Step 3: Create English strings**

Create `lib/i18n/en.ts`:
```typescript
export const en = {
  nav: {
    about: 'About',
    projects: 'Projects',
    skills: 'Skills',
    experience: 'Experience',
    contact: 'Contact',
  },
  hero: {
    greeting: "Hello, I'm",
    title: 'Frontend Developer',
    titleSuffix: '& Founder',
    bio: 'I build fast, beautiful web & mobile products.\nCreator of Metriqs — a SaaS for construction pros.',
    cta: 'View Work',
    github: 'GitHub',
  },
  about: {
    sectionLabel: 'Who I Am',
    sectionTitle: 'About Me',
    bio: 'Front-End Developer with 3+ years of experience building responsive, high-quality interfaces. I specialize in React and Next.js, and I\'m expanding into full-stack development. I\'m also the founder of Metriqs, a mobile SaaS that helps construction professionals generate professional quotes on-site in minutes.',
    location: 'Thessaloniki, Greece',
    education: 'BSc Computer Science, HOU',
    languages: 'Greek · English (C2) · French (B2)',
    status: 'Open to opportunities',
  },
  projects: {
    sectionLabel: 'Selected Work',
    sectionTitle: 'Featured Projects',
    otherTitle: 'Other Projects',
    live: 'Live',
    github: 'GitHub',
  },
  skills: {
    sectionLabel: 'What I Use',
    sectionTitle: 'Skills',
  },
  experience: {
    sectionLabel: 'Background',
    sectionTitle: 'Experience & Education',
    workTitle: 'Work',
    educationTitle: 'Education',
    languagesTitle: 'Languages',
  },
  contact: {
    sectionLabel: 'Get In Touch',
    sectionTitle: 'Contact',
    subtitle: 'Have a project in mind or want to chat? Send me a message.',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'your@email.com',
    messagePlaceholder: 'Your message...',
    submit: 'Send Message',
    success: 'Message sent! I\'ll get back to you soon.',
    error: 'Something went wrong. Try again or email me directly.',
  },
}

export type Translations = typeof en
```

- [ ] **Step 4: Create Greek strings**

Create `lib/i18n/el.ts`:
```typescript
import type { Translations } from './en'

export const el: Translations = {
  nav: {
    about: 'Σχετικά',
    projects: 'Projects',
    skills: 'Skills',
    experience: 'Εμπειρία',
    contact: 'Επικοινωνία',
  },
  hero: {
    greeting: 'Γεια, είμαι',
    title: 'Frontend Developer',
    titleSuffix: '& Ιδρύτρια',
    bio: 'Φτιάχνω γρήγορα, όμορφα web & mobile products.\nΔημιουργός του Metriqs — SaaS για επαγγελματίες κατασκευαστικού.',
    cta: 'Δες τη δουλειά μου',
    github: 'GitHub',
  },
  about: {
    sectionLabel: 'Ποια Είμαι',
    sectionTitle: 'Σχετικά με Μένα',
    bio: 'Frontend Developer με 3+ χρόνια εμπειρία στη δημιουργία responsive, υψηλής ποιότητας interfaces. Ειδικεύομαι σε React και Next.js και επεκτείνομαι σε full-stack development. Είμαι επίσης ιδρύτρια του Metriqs, ενός mobile SaaS για επαγγελματίες του κατασκευαστικού κλάδου.',
    location: 'Θεσσαλονίκη, Ελλάδα',
    education: 'Πτυχίο Πληροφορικής, ΕΑΠ',
    languages: 'Ελληνικά · Αγγλικά (C2) · Γαλλικά (B2)',
    status: 'Ανοιχτή σε ευκαιρίες',
  },
  projects: {
    sectionLabel: 'Επιλεγμένες Δουλειές',
    sectionTitle: 'Featured Projects',
    otherTitle: 'Άλλα Projects',
    live: 'Live',
    github: 'GitHub',
  },
  skills: {
    sectionLabel: 'Τι Χρησιμοποιώ',
    sectionTitle: 'Skills',
  },
  experience: {
    sectionLabel: 'Ιστορικό',
    sectionTitle: 'Εμπειρία & Σπουδές',
    workTitle: 'Εργασία',
    educationTitle: 'Εκπαίδευση',
    languagesTitle: 'Γλώσσες',
  },
  contact: {
    sectionLabel: 'Επικοινωνία',
    sectionTitle: 'Επικοινωνήστε μαζί μου',
    subtitle: 'Έχεις κάποιο project ή θέλεις να μιλήσουμε; Στείλε μου μήνυμα.',
    namePlaceholder: 'Το όνομά σου',
    emailPlaceholder: 'το@email.σου',
    messagePlaceholder: 'Το μήνυμά σου...',
    submit: 'Αποστολή',
    success: 'Το μήνυμα στάλθηκε! Θα επικοινωνήσω σύντομα.',
    error: 'Κάτι πήγε στραβά. Δοκίμασε ξανά ή επικοινώνησε απευθείας.',
  },
}
```

- [ ] **Step 5: Create LanguageContext**

Create `lib/context/LanguageContext.tsx`:
```typescript
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { en } from '@/lib/i18n/en'
import { el } from '@/lib/i18n/el'
import type { Translations } from '@/lib/i18n/en'

type Language = 'en' | 'el'

type LanguageContextType = {
  lang: Language
  toggleLang: () => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en')

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Language | null
    if (stored === 'en' || stored === 'el') setLang(stored)
  }, [])

  function toggleLang() {
    const next: Language = lang === 'en' ? 'el' : 'en'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  const t = lang === 'en' ? en : el

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
```

- [ ] **Step 6: Run tests — verify they pass**

```bash
npx jest __tests__/LanguageContext.test.tsx
```
Expected: 3 tests PASS

- [ ] **Step 7: Commit**

```bash
git add lib/ __tests__/LanguageContext.test.tsx
git commit -m "feat: add i18n system with LanguageContext and GR/EN strings"
```

---

## Task 4: Layout Components

**Files:**
- Create: `components/layout/SectionWrapper.tsx`
- Create: `components/layout/Navbar.tsx`
- Modify: `app/layout.tsx`

> **Tutor note:** `SectionWrapper` is a layout component — it wraps every section with consistent padding and an `id` for scroll targeting. This is a great example of the DRY principle: if you decide to change section padding later, you change it in one place, not in six section files.

- [ ] **Step 1: Create SectionWrapper**

Create `components/layout/SectionWrapper.tsx`:
```typescript
type Props = {
  id: string
  children: React.ReactNode
  className?: string
}

export default function SectionWrapper({ id, children, className = '' }: Props) {
  return (
    <section id={id} className={`px-6 md:px-16 lg:px-32 py-24 ${className}`}>
      {children}
    </section>
  )
}
```

- [ ] **Step 2: Create Navbar**

Create `components/layout/Navbar.tsx`:
```typescript
'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/context/LanguageContext'

export default function Navbar() {
  const { t, lang, toggleLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#projects', label: t.nav.projects },
    { href: '#skills', label: t.nav.skills },
    { href: '#experience', label: t.nav.experience },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/80 backdrop-blur-md border-b border-white/5' : ''
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-4">
        <a href="#" className="text-sm font-bold gradient-text">NT</a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-muted hover:text-white transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="text-xs font-semibold px-3 py-1 rounded-full border border-purple/40 text-purple hover:bg-purple/10 transition-colors"
          >
            {lang === 'en' ? 'GR' : 'EN'}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-muted"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg/95 backdrop-blur-md border-t border-white/5 px-6 py-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block py-2 text-sm text-muted hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 3: Update root layout**

Replace `app/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/lib/context/LanguageContext'
import Navbar from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'Niki Tsolaki — Frontend Developer & Founder',
  description: 'Portfolio of Niki Tsolaki, Frontend Developer and founder of Metriqs. Specializing in React, Next.js, and React Native.',
  keywords: ['frontend developer', 'React', 'Next.js', 'portfolio', 'Thessaloniki'],
  openGraph: {
    title: 'Niki Tsolaki — Frontend Developer & Founder',
    description: 'Building fast, beautiful web & mobile products.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add components/layout/ app/layout.tsx
git commit -m "feat: add Navbar and SectionWrapper layout components"
```

---

## Task 5: Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create Hero component**

Create `components/sections/Hero.tsx`:
```typescript
'use client'

import { useLanguage } from '@/lib/context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="min-h-screen flex items-center px-6 md:px-16 lg:px-32 relative overflow-hidden">
      {/* Background orb */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-purple/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-pink/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl">
        <p className="text-sm text-purple uppercase tracking-widest mb-3 hero-greeting">
          {t.hero.greeting}
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-2 hero-name">
          Niki Tsolaki
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 hero-title">
          {t.hero.title}{' '}
          <span className="gradient-text">{t.hero.titleSuffix}</span>
        </h2>
        <p className="text-muted text-base leading-relaxed border-l-2 border-purple pl-4 mb-10 hero-bio whitespace-pre-line">
          {t.hero.bio}
        </p>
        <div className="flex gap-4 hero-cta">
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(90deg, #a855f7, #ec4899)' }}
          >
            {t.hero.cta} ↓
          </a>
          <a
            href="https://github.com/Nikitso10"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg text-sm font-semibold text-purple border border-purple/40 hover:bg-purple/10 transition-colors"
          >
            {t.hero.github}
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wire up page.tsx**

Replace `app/page.tsx`:
```typescript
import Hero from '@/components/sections/Hero'

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  )
}
```

- [ ] **Step 3: Start dev server and verify Hero renders**

```bash
npm run dev
```
Open http://localhost:3000. Verify:
- Name displays correctly
- Gradient text on "& Founder"
- Language toggle in navbar switches text
- Both CTA buttons are visible
- Background orbs visible (subtle purple/pink blobs)

- [ ] **Step 4: Commit**

```bash
git add components/sections/Hero.tsx app/page.tsx
git commit -m "feat: add Hero section"
```

---

## Task 6: About Section

**Files:**
- Create: `components/sections/About.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create About component**

Create `components/sections/About.tsx`:
```typescript
'use client'

import { useLanguage } from '@/lib/context/LanguageContext'
import SectionWrapper from '@/components/layout/SectionWrapper'

export default function About() {
  const { t } = useLanguage()

  const facts = [
    { label: '📍', value: t.about.location },
    { label: '🎓', value: t.about.education },
    { label: '🌐', value: t.about.languages },
    { label: '💼', value: t.about.status },
  ]

  return (
    <SectionWrapper id="about">
      <p className="text-xs text-purple uppercase tracking-widest mb-2">{t.about.sectionLabel}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">{t.about.sectionTitle}</h2>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Bio */}
        <p className="text-muted text-base leading-relaxed">{t.about.bio}</p>

        {/* Quick facts */}
        <div className="flex flex-col gap-4">
          {facts.map(({ label, value }) => (
            <div key={value} className="flex gap-3 items-start">
              <span className="text-lg">{label}</span>
              <span className="text-muted text-sm leading-relaxed">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```typescript
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

Check http://localhost:3000. Scroll down — About section should appear with bio and facts grid. Toggle language — all text should switch.

- [ ] **Step 4: Commit**

```bash
git add components/sections/About.tsx app/page.tsx
git commit -m "feat: add About section"
```

---

## Task 7: Projects Section

**Files:**
- Create: `components/ui/ProjectCard.tsx`
- Create: `components/sections/Projects.tsx`
- Create: `__tests__/ProjectCard.test.tsx`
- Modify: `app/page.tsx`

> **Tutor note:** `ProjectCard` is a "dumb" component — it receives data as props and renders it. It has no internal logic. This makes it easy to test and reuse. The parent `Projects.tsx` is the "smart" component that knows which projects are featured vs other.

- [ ] **Step 1: Write the failing test**

Create `__tests__/ProjectCard.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import ProjectCard from '@/components/ui/ProjectCard'
import type { Project } from '@/data/projects'

const mockProject: Project = {
  id: 'test',
  title: 'Test Project',
  desc: { en: 'English desc', el: 'Greek desc' },
  tags: ['React', 'TypeScript'],
  liveUrl: 'https://example.com',
  tier: 'featured',
}

describe('ProjectCard', () => {
  it('renders project title', () => {
    render(<ProjectCard project={mockProject} lang="en" />)
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })

  it('renders English description when lang is en', () => {
    render(<ProjectCard project={mockProject} lang="en" />)
    expect(screen.getByText('English desc')).toBeInTheDocument()
  })

  it('renders Greek description when lang is el', () => {
    render(<ProjectCard project={mockProject} lang="el" />)
    expect(screen.getByText('Greek desc')).toBeInTheDocument()
  })

  it('renders tags', () => {
    render(<ProjectCard project={mockProject} lang="en" />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders live link when liveUrl is provided', () => {
    render(<ProjectCard project={mockProject} lang="en" />)
    expect(screen.getByRole('link', { name: /live/i })).toHaveAttribute('href', 'https://example.com')
  })

  it('shows FOUNDER badge when badge prop provided', () => {
    render(<ProjectCard project={{ ...mockProject, badge: 'FOUNDER' }} lang="en" />)
    expect(screen.getByText('FOUNDER')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npx jest __tests__/ProjectCard.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/ui/ProjectCard'`

- [ ] **Step 3: Create ProjectCard component**

Create `components/ui/ProjectCard.tsx`:
```typescript
import type { Project } from '@/data/projects'

type Props = {
  project: Project
  lang: 'en' | 'el'
  hero?: boolean
}

export default function ProjectCard({ project, lang, hero = false }: Props) {
  return (
    <div className={`relative rounded-xl gradient-border gradient-bg p-5 flex flex-col gap-4 ${hero ? 'col-span-full' : ''}`}>
      {project.badge && (
        <span className="absolute top-0 right-0 text-xs font-bold text-white px-3 py-1 rounded-tr-xl rounded-bl-lg"
          style={{ background: 'linear-gradient(90deg, #a855f7, #ec4899)' }}>
          {project.badge}
        </span>
      )}

      <div>
        <h3 className={`font-bold text-white ${hero ? 'text-xl' : 'text-base'}`}>{project.title}</h3>
        <p className="text-muted text-sm mt-1 leading-relaxed">{project.desc[lang]}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-purple/10 border border-purple/20 text-purple-light">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3 mt-auto">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="text-xs text-purple border border-purple/40 px-3 py-1 rounded hover:bg-purple/10 transition-colors">
            Live ↗
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="text-xs text-muted border border-white/10 px-3 py-1 rounded hover:bg-white/5 transition-colors">
            GitHub
          </a>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test — verify it passes**

```bash
npx jest __tests__/ProjectCard.test.tsx
```
Expected: 6 tests PASS

- [ ] **Step 5: Create Projects section**

Create `components/sections/Projects.tsx`:
```typescript
'use client'

import { useLanguage } from '@/lib/context/LanguageContext'
import SectionWrapper from '@/components/layout/SectionWrapper'
import ProjectCard from '@/components/ui/ProjectCard'
import { projects } from '@/data/projects'

export default function Projects() {
  const { t, lang } = useLanguage()

  const heroProject = projects.find((p) => p.tier === 'hero')!
  const featuredProjects = projects.filter((p) => p.tier === 'featured')
  const otherProjects = projects.filter((p) => p.tier === 'other')

  return (
    <SectionWrapper id="projects" className="bg-white/[0.01]">
      <p className="text-xs text-purple uppercase tracking-widest mb-2">{t.projects.sectionLabel}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">{t.projects.sectionTitle}</h2>

      {/* Hero project */}
      <div className="mb-6">
        <ProjectCard project={heroProject} lang={lang} hero />
      </div>

      {/* Featured grid */}
      <div className="grid md:grid-cols-3 gap-5 mb-12">
        {featuredProjects.map((p) => (
          <ProjectCard key={p.id} project={p} lang={lang} />
        ))}
      </div>

      {/* Other projects */}
      <div>
        <p className="text-sm text-muted uppercase tracking-widest mb-4">{t.projects.otherTitle}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {otherProjects.map((p) => (
            <div key={p.id} className="gradient-border rounded-lg p-3 hover:bg-white/5 transition-colors">
              <p className="text-sm font-medium text-white">{p.title}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {p.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs text-muted">{tag}</span>
                ))}
              </div>
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-purple mt-2 inline-block">↗</a>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 6: Add to page.tsx**

```typescript
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
    </main>
  )
}
```

- [ ] **Step 7: Verify in browser**

Scroll to Projects. Verify: Metriqs large card at top with FOUNDER badge, 3 featured cards in a row, compact grid below.

- [ ] **Step 8: Commit**

```bash
git add components/ui/ProjectCard.tsx components/sections/Projects.tsx __tests__/ProjectCard.test.tsx app/page.tsx
git commit -m "feat: add Projects section with featured and other projects"
```

---

## Task 8: Skills Section

**Files:**
- Create: `components/ui/SkillTag.tsx`
- Create: `components/sections/Skills.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create SkillTag**

Create `components/ui/SkillTag.tsx`:
```typescript
type Color = 'purple' | 'pink' | 'indigo'

const colorMap: Record<Color, string> = {
  purple: 'bg-purple/10 border-purple/20 text-purple-light',
  pink: 'bg-pink/10 border-pink/20 text-pink-light',
  indigo: 'bg-indigo/10 border-indigo/20 text-indigo-light',
}

type Props = {
  label: string
  color: Color
}

export default function SkillTag({ label, color }: Props) {
  return (
    <span className={`text-sm px-3 py-1 rounded-full border ${colorMap[color]}`}>
      {label}
    </span>
  )
}
```

- [ ] **Step 2: Create Skills section**

Create `components/sections/Skills.tsx`:
```typescript
'use client'

import { useLanguage } from '@/lib/context/LanguageContext'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SkillTag from '@/components/ui/SkillTag'
import { skillGroups } from '@/data/skills'

export default function Skills() {
  const { t, lang } = useLanguage()

  return (
    <SectionWrapper id="skills">
      <p className="text-xs text-purple uppercase tracking-widest mb-2">{t.skills.sectionLabel}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">{t.skills.sectionTitle}</h2>

      <div className="flex flex-col gap-8">
        {skillGroups.map((group) => (
          <div key={group.category.en}>
            <p className="text-xs uppercase tracking-widest mb-4"
              style={{ color: group.color === 'purple' ? '#a855f7' : group.color === 'pink' ? '#ec4899' : '#818cf8' }}>
              {group.category[lang]}
            </p>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <SkillTag key={skill} label={skill} color={group.color} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 3: Add to page.tsx**

```typescript
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Skills />
    </main>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add components/ui/SkillTag.tsx components/sections/Skills.tsx app/page.tsx
git commit -m "feat: add Skills section with grouped color-coded tags"
```

---

## Task 9: Experience Section

**Files:**
- Create: `components/ui/TimelineItem.tsx`
- Create: `components/sections/Experience.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create TimelineItem**

Create `components/ui/TimelineItem.tsx`:
```typescript
type Props = {
  role: string
  company: string
  period: string
  bullets: string[]
  highlight?: boolean
}

export default function TimelineItem({ role, company, period, bullets, highlight }: Props) {
  return (
    <div className="relative pl-8 pb-10 border-l border-white/10 last:pb-0">
      {/* Dot */}
      <div className={`absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full border-2 ${
        highlight ? 'border-purple bg-purple' : 'border-muted bg-bg'
      }`} />

      <div className="mb-1 flex flex-col md:flex-row md:items-center md:gap-3">
        <h3 className={`font-semibold ${highlight ? 'text-white' : 'text-white/90'}`}>{role}</h3>
        <span className="text-muted text-sm">{company}</span>
      </div>
      <p className="text-xs text-purple mb-3">{period}</p>
      <ul className="flex flex-col gap-1">
        {bullets.map((b, i) => (
          <li key={i} className="text-sm text-muted leading-relaxed flex gap-2">
            <span className="text-purple mt-1">›</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 2: Create Experience section**

Create `components/sections/Experience.tsx`:
```typescript
'use client'

import { useLanguage } from '@/lib/context/LanguageContext'
import SectionWrapper from '@/components/layout/SectionWrapper'
import TimelineItem from '@/components/ui/TimelineItem'
import { workExperience, education, languages } from '@/data/experience'

export default function Experience() {
  const { t, lang } = useLanguage()

  return (
    <SectionWrapper id="experience" className="bg-white/[0.01]">
      <p className="text-xs text-purple uppercase tracking-widest mb-2">{t.experience.sectionLabel}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">{t.experience.sectionTitle}</h2>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Work */}
        <div>
          <p className="text-sm text-muted uppercase tracking-widest mb-8">{t.experience.workTitle}</p>
          {workExperience.map((entry) => (
            <TimelineItem
              key={entry.company + entry.period}
              role={entry.role[lang]}
              company={entry.company}
              period={entry.period}
              bullets={entry.bullets.map((b) => b[lang])}
              highlight={entry.highlight}
            />
          ))}
        </div>

        {/* Education + Languages */}
        <div>
          <p className="text-sm text-muted uppercase tracking-widest mb-8">{t.experience.educationTitle}</p>
          {education.map((edu) => (
            <div key={edu.institution} className="relative pl-8 pb-8 border-l border-white/10 last:pb-0">
              <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full border-2 border-indigo bg-bg" />
              <h3 className="font-semibold text-white/90">{edu.degree[lang]}</h3>
              <p className="text-muted text-sm">{edu.institution}</p>
              <p className="text-xs text-indigo mt-1">{edu.period}</p>
            </div>
          ))}

          <div className="mt-12">
            <p className="text-sm text-muted uppercase tracking-widest mb-4">{t.experience.languagesTitle}</p>
            <div className="flex flex-wrap gap-3">
              {languages.map((l) => (
                <span key={l.name.en} className="text-sm text-muted">
                  {l.name[lang]} <span className="text-purple text-xs">({l.level})</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 3: Add to page.tsx**

```typescript
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
    </main>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add components/ui/TimelineItem.tsx components/sections/Experience.tsx app/page.tsx
git commit -m "feat: add Experience section with timeline and education"
```

---

## Task 10: Contact Section

**Files:**
- Create: `components/sections/Contact.tsx`
- Create: `app/api/contact/route.ts`
- Create: `__tests__/Contact.test.tsx`
- Modify: `app/page.tsx`
- Modify: `.env.local` (create if not exists)

> **Tutor note:** The contact form uses a Next.js API Route (`app/api/contact/route.ts`) — this is server-side code that runs on Vercel's Node.js runtime, not in the browser. It's where you safely use your Resend API key. Never put API keys in client components — they get sent to the browser and exposed.

- [ ] **Step 1: Add Resend API key to env**

Create `.env.local` (this file is never committed — already in `.gitignore`):
```
RESEND_API_KEY=your_resend_api_key_here
```
Replace `your_resend_api_key_here` with your actual key from https://resend.com/api-keys

- [ ] **Step 2: Write the failing test**

Create `__tests__/Contact.test.tsx`:
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Contact from '@/components/sections/Contact'
import { LanguageProvider } from '@/lib/context/LanguageContext'

function renderContact() {
  return render(
    <LanguageProvider>
      <Contact />
    </LanguageProvider>
  )
}

describe('Contact form', () => {
  it('renders form fields', () => {
    renderContact()
    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/your@email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/your message/i)).toBeInTheDocument()
  })

  it('submit button is present', () => {
    renderContact()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run test — verify it fails**

```bash
npx jest __tests__/Contact.test.tsx
```
Expected: FAIL — `Cannot find module '@/components/sections/Contact'`

- [ ] **Step 4: Create API route**

Create `app/api/contact/route.ts`:
```typescript
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: 'nikitsolaki10@gmail.com',
    subject: `Portfolio message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  })

  if (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
```

- [ ] **Step 5: Create Contact section**

Create `components/sections/Contact.tsx`:
```typescript
'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/context/LanguageContext'
import SectionWrapper from '@/components/layout/SectionWrapper'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const { t } = useLanguage()
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setStatus(res.ok ? 'success' : 'error')
    if (res.ok) setForm({ name: '', email: '', message: '' })
  }

  const inputClass = 'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:border-purple/50 transition-colors'

  return (
    <SectionWrapper id="contact">
      <p className="text-xs text-purple uppercase tracking-widest mb-2">{t.contact.sectionLabel}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.contact.sectionTitle}</h2>
      <p className="text-muted mb-10 max-w-lg">{t.contact.subtitle}</p>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Links */}
        <div className="flex flex-col gap-4">
          <a href="mailto:nikitsolaki10@gmail.com"
            className="flex items-center gap-3 text-muted hover:text-white transition-colors text-sm">
            <span className="text-purple">✉</span> nikitsolaki10@gmail.com
          </a>
          <a href="https://linkedin.com/in/niki-tsolaki-434679275" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 text-muted hover:text-white transition-colors text-sm">
            <span className="text-purple">in</span> LinkedIn
          </a>
          <a href="https://github.com/Nikitso10" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 text-muted hover:text-white transition-colors text-sm">
            <span className="text-purple">gh</span> GitHub
          </a>
          <p className="text-muted text-sm mt-2">📍 Thessaloniki, Greece</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder={t.contact.namePlaceholder}
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder={t.contact.emailPlaceholder}
            className={inputClass}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            rows={5}
            placeholder={t.contact.messagePlaceholder}
            className={`${inputClass} resize-none`}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />

          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 rounded-lg text-sm font-semibold text-white disabled:opacity-50 transition-opacity"
            style={{ background: 'linear-gradient(90deg, #a855f7, #ec4899)' }}
          >
            {status === 'loading' ? '...' : t.contact.submit}
          </button>

          {status === 'success' && <p className="text-sm text-green-400">{t.contact.success}</p>}
          {status === 'error' && <p className="text-sm text-red-400">{t.contact.error}</p>}
        </form>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 6: Run test — verify it passes**

```bash
npx jest __tests__/Contact.test.tsx
```
Expected: 2 tests PASS

- [ ] **Step 7: Add to page.tsx**

```typescript
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  )
}
```

- [ ] **Step 8: Commit**

```bash
git add components/sections/Contact.tsx app/api/contact/ __tests__/Contact.test.tsx app/page.tsx
git commit -m "feat: add Contact section with Resend email API"
```

---

## Task 11: GSAP Animations

**Files:**
- Modify: `components/sections/Hero.tsx`
- Modify: `components/sections/Projects.tsx`
- Modify: `components/sections/Skills.tsx`
- Modify: `components/sections/Experience.tsx`

> **Tutor note:** GSAP ScrollTrigger works by watching when elements enter the viewport. The key pattern is: `useGSAP()` (from `@gsap/react`) runs your animation code, `gsap.registerPlugin(ScrollTrigger)` activates the plugin, and `scrollTrigger: { trigger: element }` ties the animation to scroll position. We add animations LAST so they layer on top of working UI.

- [ ] **Step 1: Add Hero entrance animation**

Add to top of `components/sections/Hero.tsx`:
```typescript
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
```

Add `ref` and `useGSAP` inside the component, before the return:
```typescript
const containerRef = useRef<HTMLDivElement>(null)

useGSAP(() => {
  const els = containerRef.current?.querySelectorAll('.hero-greeting, .hero-name, .hero-title, .hero-bio, .hero-cta')
  gsap.fromTo(els,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out' }
  )
}, { scope: containerRef })
```

Add `ref={containerRef}` to the `<div className="relative z-10 max-w-2xl">`.

- [ ] **Step 2: Add Projects scroll animation**

Replace the full contents of `components/sections/Projects.tsx`:
```typescript
'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/lib/context/LanguageContext'
import SectionWrapper from '@/components/layout/SectionWrapper'
import ProjectCard from '@/components/ui/ProjectCard'
import { projects } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const { t, lang } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)

  const heroProject = projects.find((p) => p.tier === 'hero')!
  const featuredProjects = projects.filter((p) => p.tier === 'featured')
  const otherProjects = projects.filter((p) => p.tier === 'other')

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.project-card')
    if (!cards) return
    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    )
  }, { scope: sectionRef })

  return (
    <SectionWrapper id="projects" className="bg-white/[0.01]">
      <p className="text-xs text-purple uppercase tracking-widest mb-2">{t.projects.sectionLabel}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">{t.projects.sectionTitle}</h2>

      <div ref={sectionRef}>
        {/* Hero project */}
        <div className="mb-6 project-card">
          <ProjectCard project={heroProject} lang={lang} hero />
        </div>

        {/* Featured grid */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {featuredProjects.map((p) => (
            <div key={p.id} className="project-card">
              <ProjectCard project={p} lang={lang} />
            </div>
          ))}
        </div>

        {/* Other projects */}
        <div>
          <p className="text-sm text-muted uppercase tracking-widest mb-4">{t.projects.otherTitle}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {otherProjects.map((p) => (
              <div key={p.id} className="gradient-border rounded-lg p-3 hover:bg-white/5 transition-colors project-card">
                <p className="text-sm font-medium text-white">{p.title}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {p.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs text-muted">{tag}</span>
                  ))}
                </div>
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-purple mt-2 inline-block">↗</a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 3: Add Skills scroll animation**

Replace full contents of `components/sections/Skills.tsx`:
```typescript
'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/lib/context/LanguageContext'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SkillTag from '@/components/ui/SkillTag'
import { skillGroups } from '@/data/skills'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const { t, lang } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const groups = sectionRef.current?.querySelectorAll('.skill-group')
    if (!groups) return
    gsap.fromTo(groups,
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0, stagger: 0.2, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    )
  }, { scope: sectionRef })

  return (
    <SectionWrapper id="skills">
      <p className="text-xs text-purple uppercase tracking-widest mb-2">{t.skills.sectionLabel}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">{t.skills.sectionTitle}</h2>

      <div ref={sectionRef} className="flex flex-col gap-8">
        {skillGroups.map((group) => (
          <div key={group.category.en} className="skill-group">
            <p className="text-xs uppercase tracking-widest mb-4"
              style={{ color: group.color === 'purple' ? '#a855f7' : group.color === 'pink' ? '#ec4899' : '#818cf8' }}>
              {group.category[lang]}
            </p>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <SkillTag key={skill} label={skill} color={group.color} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 4: Add Experience scroll animation**

Add to `components/sections/Experience.tsx`:
```typescript
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
```

Inside `Experience` component before return:
```typescript
const sectionRef = useRef<HTMLDivElement>(null)

useGSAP(() => {
  const items = sectionRef.current?.querySelectorAll('.timeline-item')
  if (!items) return
  gsap.fromTo(items,
    { opacity: 0, x: -30 },
    {
      opacity: 1, x: 0, stagger: 0.15, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    }
  )
}, { scope: sectionRef })
```

Wrap the content in `<div ref={sectionRef}>` and add `className="timeline-item"` to each `<TimelineItem>` wrapper.

- [ ] **Step 5: Verify animations in browser**

Run `npm run dev`. Scroll through the page slowly. Verify:
- Hero elements stagger in on load
- Project cards animate up when scrolling into view
- Skill groups slide in from left
- Timeline items animate in sequentially

- [ ] **Step 6: Commit**

```bash
git add components/sections/
git commit -m "feat: add GSAP ScrollTrigger animations to all sections"
```

---

## Task 12: Final Polish & Deploy

**Files:**
- Modify: `app/layout.tsx` (footer)
- Deploy to Vercel

- [ ] **Step 1: Add footer**

Add to the bottom of `app/page.tsx`:
```typescript
<footer className="text-center py-8 text-xs text-muted border-t border-white/5">
  © {new Date().getFullYear()} Niki Tsolaki — Built with Next.js & GSAP
</footer>
```

- [ ] **Step 2: Run all tests**

```bash
npx jest
```
Expected: all tests PASS

- [ ] **Step 3: Build check**

```bash
npm run build
```
Expected: no TypeScript errors, successful build. Fix any errors before deploying.

- [ ] **Step 4: Push to GitHub**

```bash
git add -A
git commit -m "feat: final polish and footer"
git remote add origin https://github.com/Nikitso10/portfolio
git push -u origin main
```

- [ ] **Step 5: Deploy to Vercel**

1. Go to https://vercel.com → New Project → Import from GitHub → select the portfolio repo
2. Framework: Next.js (auto-detected)
3. Add environment variable: `RESEND_API_KEY` = your key
4. Click Deploy

- [ ] **Step 6: Verify live site**

Check the Vercel URL. Test:
- All sections render
- Language toggle works
- Animations fire on scroll
- Contact form sends an email to your Gmail
- Mobile hamburger menu works

- [ ] **Step 7: Final commit**

```bash
git commit -m "chore: add deployment notes" --allow-empty
```

---

## Running All Tests

```bash
npx jest --coverage
```

Expected: 11+ tests across 3 test files, all PASS.
