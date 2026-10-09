import { useState } from 'react'
import { ArrowRight, CheckCircle2, Code2, Cpu, Database, Eye, Layers, Server, Sparkles, Terminal } from 'lucide-react'
import { projects } from '../data/projects'
import { skills } from '../data/skills'
import { synth } from '../utils/audioSynth'

const STACK_CATEGORIES = [
  { id: 'All', label: 'Complete Ecosystem' },
  { id: 'Programming', label: 'Languages & Core' },
  { id: 'Machine Learning', label: 'Machine Learning' },
  { id: 'Deep Learning', label: 'Deep Learning & Vision' },
  { id: 'Generative AI', label: 'Generative AI & LLMs' },
  { id: 'Data', label: 'Data & SQL Pipelines' },
  { id: 'Tools', label: 'Serving & Infrastructure' },
]

export function TechStackExplorer({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedTech, setSelectedTech] = useState('PyTorch')

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory)

  // Find verified projects that implement the selected technology
  const associatedProjects = projects.filter((p) => {
    const term = selectedTech.toLowerCase()
    return (
      (p.technologies || []).some((t) => t.toLowerCase().includes(term) || term.includes(t.toLowerCase())) ||
      (p.concepts || []).some((c) => c.toLowerCase().includes(term)) ||
      (p.dataset && p.dataset.toLowerCase().includes(term))
    )
  })

  const currentSkillMeta = skills.find((s) => s.name.toLowerCase() === selectedTech.toLowerCase()) || {
    name: selectedTech,
    level: 'Core',
    category: 'Engineering Tool',
    description: 'Applied technical foundation within Nagendra\'s project workflows.',
  }

  const getLevelColor = (level) => {
    if (level === 'Core') return '#10b981' // emerald
    if (level === 'Working Knowledge') return '#38bdf8' // sky
    return '#f59e0b' // amber
  }

  return (
    <section className="tech-stack-section content-width" id="skills">
      <div className="section-title">
        <span className="section-number">03</span>
        <div>
          <h2>Interactive Technical Matrix</h2>
          <p>
            Explore Nagendra&apos;s active engineering stack. Select any technology to trace its verified implementation in real production pipelines and benchmarked models.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="tech-category-toolbar">
        {STACK_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`tech-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => {
              synth.playHover()
              setActiveCategory(cat.id)
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Matrix Explorer Layout */}
      <div className="tech-matrix-layout">
        {/* Left: Interactive Skills Grid */}
        <div className="tech-nodes-grid">
          {filteredSkills.map((s) => {
            const isSelected = s.name.toLowerCase() === selectedTech.toLowerCase()
            const levelColor = getLevelColor(s.level)

            return (
              <button
                key={`${s.category}-${s.name}`}
                type="button"
                className={`tech-node-chip ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  synth.playClick()
                  setSelectedTech(s.name)
                }}
                onMouseEnter={() => synth.playHover()}
                data-cursor="SELECT"
              >
                <div className="chip-content">
                  <span className="tech-level-dot" style={{ background: levelColor }} />
                  <span className="tech-chip-name">{s.name}</span>
                </div>
                <span className="tech-level-tag">{s.level}</span>
              </button>
            )
          })}
        </div>

        {/* Right: Technical Inspector HUD */}
        <div className="tech-inspector-panel">
          <div className="inspector-hud-header">
            <span className="inspector-pill">
              <Terminal size={12} />
              <span>ACTIVE NODE INSPECTION</span>
            </span>
            <span className="inspector-level" style={{ color: getLevelColor(currentSkillMeta.level) }}>
              ● {currentSkillMeta.level}
            </span>
          </div>

          <div className="inspector-main">
            <h3>{currentSkillMeta.name}</h3>
            <span className="inspector-category">{currentSkillMeta.category} Stack</span>
            <p className="inspector-desc">{currentSkillMeta.description}</p>
          </div>

          <div className="inspector-divider" />

          {/* Associated Verified Projects */}
          <div className="inspector-projects-box">
            <span className="inspector-section-label">
              Verified Pipeline Implementations ({associatedProjects.length})
            </span>

            {associatedProjects.length > 0 ? (
              <div className="inspector-project-list">
                {associatedProjects.map((p) => (
                  <div key={p.id} className="inspector-project-item">
                    <div>
                      <strong>{p.title}</strong>
                      <small>{p.task || p.category}</small>
                    </div>
                    <button
                      type="button"
                      className="inspector-jump-btn"
                      onClick={() => {
                        synth.playClick()
                        onNavigate(`/projects/${p.id}`)
                      }}
                    >
                      Case Study <ArrowRight size={13} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="inspector-empty">
                <small>Core language &amp; mathematical capability applied across experimental notebooks.</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
