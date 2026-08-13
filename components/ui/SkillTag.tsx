type Color = 'purple' | 'pink' | 'indigo'

const colorMap: Record<Color, string> = {
  purple: 'bg-purple/10 border-purple/20 text-purple-light',
  pink: 'bg-pink/10 border-pink/20 text-pink-light',
  indigo: 'bg-indigo/10 border-indigo/20 text-indigo-light',
}

type Props = {
  label: string
  color: Color
}

export default function SkillTag({ label, color }: Props) {
  return (
    <span className={`text-sm px-3 py-1 rounded-full border ${colorMap[color]}`}>
      {label}
    </span>
  )
}
