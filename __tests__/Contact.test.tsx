import { render, screen } from '@testing-library/react'
import Contact from '@/components/sections/Contact'
import { LanguageProvider } from '@/lib/context/LanguageContext'

function renderContact() {
  return render(
    <LanguageProvider>
      <Contact />
    </LanguageProvider>
  )
}

describe('Contact form', () => {
  it('renders form fields', () => {
    renderContact()
    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/your@email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/your message/i)).toBeInTheDocument()
  })

  it('submit button is present', () => {
    renderContact()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })
})
