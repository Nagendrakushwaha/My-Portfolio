import { ArrowUpRight, ExternalLink, Globe, Shield, Sparkles } from 'lucide-react'
import { ProjectImage } from './ProjectImage'

export function ProjectCard({ project, onDetails }) {
  // Derive verified headline metric
  let headlineMetric = null
  if (project.id === 'shopease') {
    headlineMetric = '88.72% Test Acc · 88.76% Macro F1'
  } else if (project.id === 'smartmed-vision') {
    headlineMetric = '93.60% Acc · 0.9562 ROC-AUC'
  } else if (project.id === 'cognivision-ai') {
    headlineMetric = '36.29% Real Test Acc · 16.26% F1'
  } else if (project.id === 'nids') {
    headlineMetric = '99.6% Test Accuracy'
  } else if (project.id === 'spam-detection') {
    headlineMetric = '98.0% Test Accuracy'
  } else if (project.id === 'fraud-detection') {
    headlineMetric = '86.0% Accuracy (Imbalanced)'
  } else if (project.metrics?.accuracy) {
    headlineMetric = `${(project.metrics.accuracy * 100).toFixed(1)}% Accuracy`
  }

  const primaryModel =
    project.models?.[0] ||
    (project.statistics?.bestModel ? project.statistics.bestModel.split('(')[0].trim() : null)

  return (
    <article className={`light-project-card ${project.featured ? 'featured-card' : ''}`}>
      <ProjectImage project={project} />

      <div className="project-card-body">
        {/* Card Header Meta */}
        <div className="project-card-meta">
          <span className="card-category">{project.category}</span>
          <span className="card-tag">{project.tag}</span>
        </div>

        {/* Status & Headline Metric Row */}
        <div className="card-badge-row">
          <span className={`status-pill ${project.status === 'Production Ready' ? 'success' : 'neutral'}`}>
            {project.status || 'Project'}
          </span>
          {headlineMetric ? (
            <span className="card-metric-pill" title="Verified model test benchmark">
              {headlineMetric}
            </span>
          ) : (
            <span className="card-metric-pill muted">Metrics in documentation</span>
          )}
        </div>

        <h3>{project.title}</h3>
        <p>{project.description}</p>

        {/* Technical Architecture Specs */}
        <div className="card-specs">
          {project.dataset && (
            <div className="card-spec-item">
              <span>Dataset:</span>
              <strong>{project.datasetInfo?.name || project.dataset.split('·')[0].trim()}</strong>
            </div>
          )}
          {primaryModel && (
            <div className="card-spec-item">
              <span>Primary Architecture:</span>
              <strong>{primaryModel}</strong>
            </div>
          )}
        </div>

        {/* Technologies */}
        <div className="light-badges">
          {(project.technologies || []).slice(0, 5).map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
          {(project.technologies || []).length > 5 && (
            <span className="more-tech">+{(project.technologies || []).length - 5}</span>
          )}
        </div>

        {/* Research Disclaimer if medical */}
        {project.id === 'smartmed-vision' && (
          <div className="card-disclaimer">
            <small>Educational &amp; Research only · Not for clinical diagnosis</small>
          </div>
        )}

        {/* Action Buttons */}
        <div className="project-card-actions">
          <button className="outline-button" onClick={() => onDetails(project)}>
            View Case Study <ArrowUpRight size={15} />
          </button>

          <div className="card-external-links">
            {project.liveDemo && (
              <a
                className="live-demo-btn"
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title} Live Demo`}
                title="Open Live Web Application"
              >
                <Globe size={14} /> Live Demo
              </a>
            )}
            {project.github && (
              <a
                className="icon-link"
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title} on GitHub`}
                title="View GitHub Repository"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
