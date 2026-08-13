'use client'
import { useLanguage } from '@/lib/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="border-t border-white/5 py-8 px-6 md:px-16 lg:px-32 text-center text-muted text-sm">
      <p>{t.footer.copy}</p>
    </footer>
  )
}
