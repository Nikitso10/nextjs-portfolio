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
    gsap.set('.skill-group', { opacity: 0 })
    gsap.to('.skill-group', {
      opacity: 1,
      duration: 0.7,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    })
  }, { scope: sectionRef })

  return (
    <SectionWrapper id="skills">
      <p className="text-xs text-purple uppercase tracking-widest mb-2">{t.skills.sectionLabel}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">{t.skills.sectionTitle}</h2>

      <div ref={sectionRef} className="flex flex-col gap-8">
        {skillGroups.map((group) => (
          <div key={group.category.en} className="skill-group">
            <p
              className="text-xs uppercase tracking-widest mb-4"
              style={{
                color: group.color === 'purple' ? '#a855f7' : group.color === 'pink' ? '#ec4899' : '#818cf8',
              }}
            >
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
