import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/context/LanguageContext'
import Navbar from '@/components/layout/Navbar'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Niki Tsolaki — Frontend Developer & Founder',
  description: 'Portfolio of Niki Tsolaki, Frontend Developer and founder of Metriqs. Specializing in React, Next.js, and React Native.',
  keywords: ['frontend developer', 'React', 'Next.js', 'portfolio', 'Thessaloniki'],
  openGraph: {
    title: 'Niki Tsolaki — Frontend Developer & Founder',
    description: 'Building fast, beautiful web & mobile products.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
