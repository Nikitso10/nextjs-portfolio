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
    githubUrl: 'https://github.com/Nikitso10/nextjs-dev-event',
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
    liveUrl: 'https://movie-app-react-native-expo-tsolaki.vercel.app/',
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
    liveUrl: 'https://youtu.be/v936F1D7NDk?si=DUrdizNKvl8V_f-A',
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
