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
