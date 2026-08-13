import type { Project } from '@/data/projects'

type Props = {
  project: Project
  lang: 'en' | 'el'
  hero?: boolean
}

export default function ProjectCard({ project, lang, hero = false }: Props) {
  return (
    <div className="relative rounded-xl gradient-border gradient-bg p-5 flex flex-col gap-4 h-full">
      {project.badge && (
        <span
          className="absolute top-0 right-0 text-xs font-bold text-white px-3 py-1 rounded-tr-xl rounded-bl-lg gradient-btn"
        >
          {project.badge}
        </span>
      )}

      <div>
        <h3 className={`font-bold text-white ${hero ? 'text-xl' : 'text-base'}`}>{project.title}</h3>
        <p className="text-muted text-sm mt-1 leading-relaxed">{project.desc[lang]}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-purple/10 border border-purple/20 text-purple-light">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3 mt-auto">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-purple border border-purple/40 px-3 py-1 rounded hover:bg-purple/10 transition-colors"
          >
            Live ↗
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} GitHub repository (opens in new tab)`}
            className="text-xs text-muted border border-white/10 px-3 py-1 rounded hover:bg-white/5 transition-colors"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  )
}
