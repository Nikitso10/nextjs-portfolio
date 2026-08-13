import type { ReactNode } from 'react'

type Props = {
  id: string
  children: ReactNode
  className?: string
}

export default function SectionWrapper({ id, children, className = '' }: Props) {
  return (
    <section id={id} className={`px-6 md:px-16 lg:px-32 py-24 ${className}`}>
      {children}
    </section>
  )
}
