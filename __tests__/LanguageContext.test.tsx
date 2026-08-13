import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider, useLanguage } from '@/lib/context/LanguageContext'

function TestComponent() {
  const { lang, toggleLang } = useLanguage()
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <button onClick={toggleLang}>toggle</button>
    </div>
  )
}

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('defaults to English', () => {
    render(<LanguageProvider><TestComponent /></LanguageProvider>)
    expect(screen.getByTestId('lang').textContent).toBe('en')
  })

  it('toggles to Greek when toggled', () => {
    render(<LanguageProvider><TestComponent /></LanguageProvider>)
    fireEvent.click(screen.getByText('toggle'))
    expect(screen.getByTestId('lang').textContent).toBe('el')
  })

  it('toggles back to English on second toggle', () => {
    render(<LanguageProvider><TestComponent /></LanguageProvider>)
    fireEvent.click(screen.getByText('toggle'))
    fireEvent.click(screen.getByText('toggle'))
    expect(screen.getByTestId('lang').textContent).toBe('en')
  })

  it('hydrates from stored language on mount', () => {
    localStorage.setItem('lang', 'el')
    render(<LanguageProvider><TestComponent /></LanguageProvider>)
    expect(screen.getByTestId('lang').textContent).toBe('el')
  })
})
