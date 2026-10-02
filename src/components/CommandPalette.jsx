import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Beaker, Code2, ExternalLink, FileText, LayoutGrid, Sparkles, X, Search } from 'lucide-react'
import { projects } from '../data/projects'
import { portfolio } from '../data/portfolio'

export function CommandPalette({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Filter items
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = []

    // Quick navigation actions
    const navItems = [
      { type: 'nav', title: 'Home', subtitle: 'Hero, 3D Neural Flow & Overview', path: '/', icon: LayoutGrid },
      { type: 'nav', title: 'Projects Archive', subtitle: 'Explore all 9 machine learning projects', path: '/projects', icon: LayoutGrid },
      { type: 'nav', title: 'Interactive ML Lab', subtitle: 'Live inference & explainability playground', path: '/#mllab', icon: Beaker },
      { type: 'nav', title: 'Engineering Analytics', subtitle: 'Verified metrics & domain distribution', path: '/#analytics', icon: Sparkles },
      { type: 'nav', title: 'Ask My Portfolio (AI)', subtitle: 'Interactive Q&A assistant', path: '/#ask-ai', icon: Sparkles },
      { type: 'nav', title: 'Experience & Timeline', subtitle: 'Education, UptoSkill, Catalyst & BCG', path: '/#experience', icon: FileText },
      { type: 'nav', title: 'Skills Architecture', subtitle: 'Core & working technical stack', path: '/skills', icon: Code2 },
      { type: 'nav', title: 'Contact', subtitle: 'Email, LinkedIn & collaborations', path: '/#contact', icon: ArrowRight },
    ]

    navItems.forEach((item) => {
      if (!q || item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q)) {
        list.push(item)
      }
    })

    // Project matches
    projects.forEach((proj) => {
      const match =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        proj.category.toLowerCase().includes(q) ||
        proj.technologies.some((t) => t.toLowerCase().includes(q)) ||
        (proj.dataset && proj.dataset.toLowerCase().includes(q))

      if (match) {
        list.push({
          type: 'project',
          title: proj.title,
          subtitle: `${proj.category} · ${proj.technologies.slice(0, 3).join(', ')}`,
          path: `/projects/${proj.id}`,
          icon: Beaker,
          tag: proj.tag,
        })
      }
    })

    return list
  }, [query])

  useEffect(() => {
    setSelectedIndex(0)
  }, [results.length])

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[selectedIndex]) {
        onNavigate(results[selectedIndex].path)
        onClose()
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="command-palette-backdrop" onClick={onClose}>
      <div
        className="command-palette-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="command-palette-header">
          <Search size={18} className="command-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="command-palette-input"
            placeholder="Type a command, project, technology, or metric..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="command-palette-close" onClick={onClose} aria-label="Close Command Palette">
            <X size={16} />
          </button>
        </div>

        <div className="command-palette-results">
          {results.length === 0 ? (
            <div className="command-empty">No matching projects or sections found for &quot;{query}&quot;.</div>
          ) : (
            results.map((item, idx) => {
              const Icon = item.icon
              const isSelected = idx === selectedIndex
              return (
                <button
                  key={`${item.type}-${item.path}-${item.title}`}
                  className={`command-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    onNavigate(item.path)
                    onClose()
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="command-item-left">
                    <span className="command-item-icon">
                      <Icon size={16} />
                    </span>
                    <div>
                      <strong>{item.title}</strong>
                      <small>{item.subtitle}</small>
                    </div>
                  </div>
                  {item.tag && <span className="command-item-tag">{item.tag}</span>}
                </button>
              )
            })
          )}
        </div>

        <div className="command-palette-footer">
          <div className="command-hints">
            <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Select</span>
            <span><kbd>Esc</kbd> Close</span>
          </div>
          <div className="command-external-links">
            <a href={portfolio.personal.resumeUrl} target="_blank" rel="noreferrer">
              Resume <ExternalLink size={12} />
            </a>
            <a href={portfolio.personal.github} target="_blank" rel="noreferrer">
              GitHub <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
