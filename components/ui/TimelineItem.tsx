type Props = {
  role: string
  company: string
  period: string
  bullets: string[]
  highlight?: boolean
}

export default function TimelineItem({ role, company, period, bullets, highlight }: Props) {
  return (
    <div className="timeline-item relative pl-8 pb-10 border-l border-white/10 last:pb-0">
      <div className={`absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full border-2 ${
        highlight ? 'border-purple bg-purple' : 'border-muted bg-bg'
      }`} />

      <div className="mb-1 flex flex-col md:flex-row md:items-center md:gap-3">
        <h3 className={`font-semibold ${highlight ? 'text-white' : 'text-white/90'}`}>{role}</h3>
        <span className="text-muted text-sm">{company}</span>
      </div>
      <p className="text-xs text-purple mb-3">{period}</p>
      <ul className="flex flex-col gap-1">
        {bullets.map((b) => (
          <li key={b} className="text-sm text-muted leading-relaxed flex gap-2">
            <span className="text-purple mt-1" aria-hidden="true">›</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
