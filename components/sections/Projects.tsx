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
    gsap.set('.project-card', { opacity: 0, y: 60 })
    gsap.to('.project-card', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    })
  }, { scope: sectionRef })

  return (
    <div ref={sectionRef}>
      <SectionWrapper id="projects" className="bg-white/[0.01]">
        <p className="text-xs text-purple uppercase tracking-widest mb-2">{t.projects.sectionLabel}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">{t.projects.sectionTitle}</h2>

        <div>
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
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.title} (opens in new tab)`}
                      className="text-xs text-purple mt-2 inline-block"
                    >↗</a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
