'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/context/LanguageContext'

export default function AnnouncementBanner() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="relative w-full bg-purple/20 border-b border-purple/30 backdrop-blur-sm text-center py-2 px-10 text-xs text-white">
      <span className="text-muted">{t.banner.text}</span>{' '}
      <a
        href="https://www.metriqs.gr/el"
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple font-semibold hover:text-white transition-colors"
      >
        {t.banner.cta}
      </a>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
      >
        ✕
      </button>
    </div>
  )
}
