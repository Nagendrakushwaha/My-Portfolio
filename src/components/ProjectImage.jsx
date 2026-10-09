import { useState } from 'react'
import { Eye, Layers, Sparkles, Terminal } from 'lucide-react'

export function ProjectImage({ project, large = false }) {
  const [imageError, setImageError] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)

  const hasInteractiveCam = project.id === 'smartmed-vision' || project.id === 'cognivision-ai'

  return (
    <div className={`project-image-wrap ${large ? 'project-image-large' : ''}`}>
      {/* Corner HUD crosshairs */}
      <span className="image-crosshair top-left" aria-hidden="true">+</span>
      <span className="image-crosshair top-right" aria-hidden="true">+</span>
      <span className="image-crosshair bottom-left" aria-hidden="true">+</span>
      <span className="image-crosshair bottom-right" aria-hidden="true">+</span>

      {!imageError && project.image ? (
        <div className="project-image-media-box">
          <img
            src={project.image}
            alt={`${project.title} technical architecture`}
            loading={large ? 'eager' : 'lazy'}
            onError={() => setImageError(true)}
            className={`project-cover-img ${showOverlay ? 'has-cam-filter' : ''}`}
          />

          {/* Futuristic scanline and holographic shimmer */}
          <div className="project-image-scanline" aria-hidden="true" />
          <div className="project-image-vignette" aria-hidden="true" />

          {/* Interactive Grad-CAM / Attention preview button for Vision projects */}
          {hasInteractiveCam && (
            <button
              type="button"
              className={`image-hud-toggle-btn ${showOverlay ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setShowOverlay(!showOverlay)
              }}
              title="Toggle Grad-CAM Attention Heatmap simulation"
            >
              <Eye size={12} />
              <span>{showOverlay ? 'Grad-CAM [ON]' : 'Toggle Heatmap'}</span>
            </button>
          )}

          {/* HUD Status Chip */}
          <div className="image-hud-status-chip">
            <span className="live-dot" />
            <span>{project.task || 'Model System'}</span>
          </div>
        </div>
      ) : (
        <div className="image-hud-fallback">
          <div className="fallback-grid-bg" />
          <div className="fallback-badge">
            <Terminal size={22} className="fallback-icon" />
            <strong>{project.title}</strong>
            <small>{project.category} · {project.datasetInfo?.name || 'Verified Dataset'}</small>
          </div>
        </div>
      )}
    </div>
  )
}
