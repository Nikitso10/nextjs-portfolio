'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/context/LanguageContext'
import SectionWrapper from '@/components/layout/SectionWrapper'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const { t } = useLanguage()
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setStatus(res.ok ? 'success' : 'error')
    if (res.ok) setForm({ name: '', email: '', message: '' })
  }

  const inputClass = 'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:border-purple/50 transition-colors'

  return (
    <SectionWrapper id="contact">
      <p className="text-xs text-purple uppercase tracking-widest mb-2">{t.contact.sectionLabel}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.contact.sectionTitle}</h2>
      <p className="text-muted mb-10 max-w-lg">{t.contact.subtitle}</p>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Contact links */}
        <div className="flex flex-col gap-4">
          <a
            href="mailto:nikitsolaki10@gmail.com"
            className="flex items-center gap-3 text-muted hover:text-white transition-colors text-sm"
          >
            <span className="text-purple" aria-hidden="true">✉</span>
            nikitsolaki10@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/niki-tsolaki/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in new tab)"
            className="flex items-center gap-3 text-muted hover:text-white transition-colors text-sm"
          >
            <span className="text-purple" aria-hidden="true">in</span>
            LinkedIn
          </a>
          <a
            href="https://www.facebook.com/tsolaki.niki/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook profile (opens in new tab)"
            className="flex items-center gap-3 text-muted hover:text-white transition-colors text-sm"
          >
            <span className="text-purple" aria-hidden="true">f</span>
            Facebook
          </a>
          <a
            href="https://www.facebook.com/metriqs/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Metriqs Facebook page (opens in new tab)"
            className="flex items-center gap-3 text-muted hover:text-white transition-colors text-sm"
          >
            <span className="text-purple" aria-hidden="true">f</span>
            Metriqs on Facebook
          </a>
          <a
            href="https://github.com/Nikitso10"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in new tab)"
            className="flex items-center gap-3 text-muted hover:text-white transition-colors text-sm"
          >
            <span className="text-purple" aria-hidden="true">gh</span>
            GitHub
          </a>
          <a
            href="https://www.youtube.com/@NikiGamingFun23"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube channel (opens in new tab)"
            className="flex items-center gap-3 text-muted hover:text-white transition-colors text-sm"
          >
            <span className="text-purple" aria-hidden="true">▶</span>
            YouTube
          </a>
          <p className="text-muted text-sm mt-2">
            <span aria-hidden="true">📍 </span>Thessaloniki, Greece
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <input
            type="text"
            placeholder={t.contact.namePlaceholder}
            className={inputClass}
            value={form.name}
            onChange={(e) => {
              if (status === 'error') setStatus('idle')
              setForm({ ...form, name: e.target.value })
            }}
            required
            aria-label={t.contact.namePlaceholder}
          />
          <input
            type="email"
            placeholder={t.contact.emailPlaceholder}
            className={inputClass}
            value={form.email}
            onChange={(e) => {
              if (status === 'error') setStatus('idle')
              setForm({ ...form, email: e.target.value })
            }}
            required
            aria-label={t.contact.emailPlaceholder}
          />
          <textarea
            rows={5}
            placeholder={t.contact.messagePlaceholder}
            className={`${inputClass} resize-none`}
            value={form.message}
            onChange={(e) => {
              if (status === 'error') setStatus('idle')
              setForm({ ...form, message: e.target.value })
            }}
            required
            aria-label={t.contact.messagePlaceholder}
          />

          <button
            type="submit"
            disabled={status === 'loading'}
            aria-busy={status === 'loading'}
            className="px-6 py-3 rounded-lg text-sm font-semibold text-white gradient-btn disabled:opacity-50 transition-opacity"
          >
            {status === 'loading' ? 'Sending...' : t.contact.submit}
          </button>

          {status === 'success' && (
            <p className="text-sm text-green-400" role="status">{t.contact.success}</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-400" role="alert">{t.contact.error}</p>
          )}
        </form>
      </div>
    </SectionWrapper>
  )
}
