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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    if (menuOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

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
            aria-label={lang === 'en' ? 'Switch to Greek' : 'Switch to English'}
            className="text-xs font-semibold px-3 py-1 rounded-full border border-purple/40 text-purple hover:bg-purple/10 transition-colors"
          >
            {lang === 'en' ? 'GR' : 'EN'}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-muted"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
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
