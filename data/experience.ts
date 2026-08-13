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
