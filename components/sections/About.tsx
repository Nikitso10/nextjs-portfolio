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
        <p className="text-muted text-base leading-relaxed">{t.about.bio}</p>

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
