'use client'

import { useRef } from 'react'
import { useLanguage } from '@/lib/context/LanguageContext'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SkillTag from '@/components/ui/SkillTag'
import { skillGroups } from '@/data/skills'

export default function Skills() {
  const { t, lang } = useLanguage()
  // ref used by GSAP ScrollTrigger animations added in Task 11
  const sectionRef = useRef<HTMLDivElement>(null)

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
