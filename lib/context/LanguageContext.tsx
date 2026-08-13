'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { en } from '@/lib/i18n/en'
import { el } from '@/lib/i18n/el'
import type { Translations } from '@/lib/i18n/en'

type Language = 'en' | 'el'

type LanguageContextType = {
  lang: Language
  toggleLang: () => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en'
    const stored = localStorage.getItem('lang')
    return stored === 'en' || stored === 'el' ? stored : 'en'
  })

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  function toggleLang() {
    const next: Language = lang === 'en' ? 'el' : 'en'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  const t = lang === 'en' ? en : el

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
