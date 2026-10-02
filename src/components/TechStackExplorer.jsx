import { useState } from 'react'
import { ArrowRight, CheckCircle2, Code2, Cpu, Database, Eye, Layers, Server, Sparkles } from 'lucide-react'
import { projects } from '../data/projects'
import { skills } from '../data/skills'

const STACK_CATEGORIES = [
  { id: 'All', label: 'All Technologies' },
  { id: 'Programming', label: 'Programming & Core' },
  { id: 'Machine Learning', label: 'Machine Learning' },
  { id: 'Deep Learning', label: 'Deep Learning & Vision' },
  { id: 'Generative AI', label: 'Generative AI & NLP' },
  { id: 'Data', label: 'Data & SQL' },
  { id: 'Tools', label: 'Deployment & Tools' },
]

export function TechStackExplorer({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedTech, setSelectedTech] = useState('PyTorch')

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory)

  // Find verified projects that actually use the selected technology
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
    level: 'Core Knowledge',
    category: 'Engineering Tool',
    description: 'Applied technical foundation within Nagendra\'s project workflows.',
  }

  return (
    <section className="tech-stack-section content-width" id="skills">
      <div className="section-title">
        <span className="section-number">03</span>
        <div>
          <h2>Interactive Tech Stack</h2>
          <p>
            Click any technology to inspect the verified projects and practical engineering applications where it is implemented.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="tech-category-toolbar">
        {STACK_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`tech-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="tech-explorer-layout">
        {/* Technology Grid */}
        <div className="tech-tiles-grid">
          {filteredSkills.slice(0, 24).map((item) => {
            const isSelected = item.name.toLowerCase() === selectedTech.toLowerCase()
            return (
              <button
                key={item.name}
                className={`tech-tile ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedTech(item.name)}
              >
                <div className="tech-tile-top">
                  <strong>{item.name}</strong>
                  <span className={`level-badge ${item.level.toLowerCase().replace(/\s+/g, '-')}`}>
                    {item.level}
                  </span>
                </div>
                <small>{item.description}</small>
              </button>
            )
          })}
        </div>

        {/* Selected Technology Inspector Card */}
        <div className="tech-inspector-card">
          <div className="inspector-header">
            <div>
              <span className="overline">{currentSkillMeta.category} · {currentSkillMeta.level}</span>
              <h3>{currentSkillMeta.name}</h3>
            </div>
            <span className="verified-tag">
              <CheckCircle2 size={14} /> Verified in Codebase
            </span>
          </div>

          <p className="inspector-desc">{currentSkillMeta.description}</p>

          <div className="inspector-projects-area">
            <h4>Verified Applied Projects ({associatedProjects.length})</h4>
            {associatedProjects.length === 0 ? (
              <div className="inspector-empty">
                Used in exploratory notebooks, statistical analyses, and foundational coursework.
              </div>
            ) : (
              <div className="inspector-projects-list">
                {associatedProjects.map((proj) => (
                  <div key={proj.id} className="inspector-proj-row">
                    <div>
                      <strong>{proj.title}</strong>
                      <small>{proj.category} · {proj.status}</small>
                    </div>
                    <button
                      className="proj-view-btn"
                      onClick={() => onNavigate(`/projects/${proj.id}`)}
                    >
                      Case Study <ArrowRight size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
