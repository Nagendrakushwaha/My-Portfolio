import { ExternalLink, X } from 'lucide-react'
import { ProjectImage } from './ProjectImage'

export function ProjectModal({ project, onClose }) {
  if (!project) return null
  return <div className="light-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <article className="light-project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title"><button className="light-modal-close" onClick={onClose} aria-label="Close project details"><X size={18} /></button>
      <ProjectImage project={project} large /><p className="overline">{project.tag}</p><h2 id="project-modal-title">{project.title}</h2><p className="modal-lead">{project.overview}</p>
      <div className="modal-detail-grid"><div><span>Problem</span><p>{project.problem}</p></div><div><span>Approach</span><p>{project.approach}</p></div><div><span>Dataset</span><p>{project.dataset}</p></div><div><span>Future improvements</span><p>{project.future}</p></div></div>
      <div className="modal-concepts"><span>Concepts</span><div className="light-badges">{project.concepts.map((concept) => <span key={concept}>{concept}</span>)}</div></div>
      {project.github && <a className="accent-button" href={project.github} target="_blank" rel="noreferrer">Open GitHub <ExternalLink size={15} /></a>}
    </article>
  </div>
}
