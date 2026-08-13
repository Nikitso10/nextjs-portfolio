'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/lib/context/LanguageContext'
import SectionWrapper from '@/components/layout/SectionWrapper'
import TimelineItem from '@/components/ui/TimelineItem'
import { workExperience, education, languages } from '@/data/experience'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const { t, lang } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.set('.timeline-item', { opacity: 0, y: 30 })
    gsap.to('.timeline-item', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
      },
    })
  }, { scope: sectionRef })

  return (
    <SectionWrapper id="experience" className="bg-white/[0.01]">
      <p className="text-xs text-purple uppercase tracking-widest mb-2">{t.experience.sectionLabel}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">{t.experience.sectionTitle}</h2>

      <div ref={sectionRef} className="grid md:grid-cols-2 gap-16">
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
            <div key={edu.institution} className="timeline-item relative pl-8 pb-8 border-l border-white/10 last:pb-0">
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
