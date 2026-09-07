import { Image, Sparkles } from 'lucide-react'

export function ProjectImage({ project, large = false }) {
  return <div className={`project-image ${large ? 'project-image-large' : ''}`}>
    <img src={project.image} alt={`${project.title} visual`} loading={large ? 'eager' : 'lazy'} onError={(event) => { event.currentTarget.style.display = 'none'; event.currentTarget.nextElementSibling?.removeAttribute('hidden') }} />
    <div className="image-placeholder" hidden>
      <span><Image size={22} /></span>
      <strong>{project.title}</strong>
      <small>{project.category} · {project.status || 'Project'}</small>
      <Sparkles size={15} />
    </div>
  </div>
}
