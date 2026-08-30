'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useLanguage } from '@/lib/context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.set(['.hero-greeting', '.hero-name', '.hero-title', '.hero-bio', '.hero-cta'], {
      opacity: 0,
      y: 60,
    })
    gsap.to(['.hero-greeting', '.hero-name', '.hero-title', '.hero-bio', '.hero-cta'], {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power3.out',
    })

    gsap.to('.hero-orb-1', { y: -20, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.to('.hero-orb-2', { y: 20, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="min-h-screen flex items-center px-6 md:px-16 lg:px-32 relative overflow-hidden">
      {/* Background orbs */}
      <div className="hero-orb-1 absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-purple/10 blur-3xl pointer-events-none" />
      <div className="hero-orb-2 absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-pink/10 blur-3xl pointer-events-none" />

      {/* hero-* classes below are GSAP animation targets (Task 11) — do not remove */}
      <div className="relative z-10 max-w-2xl">
        <p className="text-sm text-purple uppercase tracking-widest mb-3 hero-greeting">
          {t.hero.greeting}
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-2 hero-name">
          Niki Tsolaki
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 hero-title">
          {t.hero.title}{' '}
          <span className="gradient-text">{t.hero.titleSuffix}</span>
        </h2>
        <p className="text-muted text-base leading-relaxed border-l-2 border-purple pl-4 mb-10 hero-bio whitespace-pre-line">
          {t.hero.bio}
        </p>
        <div className="flex gap-4 hero-cta flex-wrap">
          <a
            href="https://www.metriqs.gr/el"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg text-sm font-semibold text-white gradient-btn"
          >
            {t.hero.ctaMetriqs}
          </a>
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg text-sm font-semibold text-purple border border-purple/40 hover:bg-purple/10 transition-colors"
          >
            {t.hero.cta} ↓
          </a>
        </div>
      </div>
    </section>
  )
}
