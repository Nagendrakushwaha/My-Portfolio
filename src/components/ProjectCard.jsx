import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { ProjectImage } from './ProjectImage'

export function ProjectCard({ project, onDetails }) {
  return <article className={`light-project-card ${project.featured ? 'featured-card' : ''}`}>
    <ProjectImage project={project} />
    <div className="project-card-body"><div className="project-card-meta"><span>{project.category}</span><span>{project.tag}</span></div>
      <div className="light-badges project-status-badge"><span>{project.status || 'Project'}</span></div><h3>{project.title}</h3><p>{project.description}</p>
      <div className="light-badges">{project.technologies.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}</div>
      <div className="project-card-actions"><button className="outline-button" onClick={() => onDetails(project)}>View details <ArrowUpRight size={15} /></button>{project.github && <a className="icon-link" href={project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} on GitHub`}><ExternalLink size={16} /></a>}</div>
    </div>
  </article>
}
