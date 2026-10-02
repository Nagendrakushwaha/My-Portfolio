import { useEffect, useState } from 'react'
import { ArrowUp, ArrowUpRight, Bot, Menu, Search, X } from 'lucide-react'
import { portfolio } from './data/portfolio'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { Skills } from './pages/Skills'
import { ProjectCaseStudy } from './pages/ProjectCaseStudy'
import { CommandPalette } from './components/CommandPalette'
import './App.css'
import './experience.css'
import './profile.css'
import './ai-visual.css'
import './case-study.css'
import './quality-overrides.css'
import './footer.css'
import './preferred-fields.css'
import './ultra-premium.css'

function getPath() {
  return window.location.pathname.replace(/\/$/, '') || '/'
}

function App() {
  const [path, setPath] = useState(getPath)
  const [menuOpen, setMenuOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)

  const navigate = (nextPath) => {
    window.history.pushState({}, '', nextPath)
    setPath(getPath())
    setMenuOpen(false)
    const hash = nextPath.includes('#') ? nextPath.split('#')[1] : ''
    window.setTimeout(() => {
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 50)
  }

  useEffect(() => {
    const onPopState = () => setPath(getPath())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  // Global hotkey: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setPaletteOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Identity', path: '/#about' },
    { label: 'Stack', path: '/#skills' },
    { label: 'Projects', path: '/projects' },
    { label: 'ML Lab', path: '/#mllab' },
    { label: 'Analytics', path: '/#analytics' },
    { label: 'Ask AI', path: '/#ask-ai' },
    { label: 'Experience', path: '/#experience' },
    { label: 'Contact', path: '/#contact' },
  ]

  const isActive = (link) =>
    link.path === path ||
    (link.path === '/' && path === '/' && !window.location.hash) ||
    (link.path.startsWith('/#') && window.location.hash === link.path.slice(1))

  const projectId = path.startsWith('/projects/') ? path.split('/')[2] : null

  return (
    <div className="light-site">
      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={navigate}
      />

      {/* Sticky Header Navigation */}
      <header className="light-nav">
        <nav className="nav-inner">
          <button className="light-brand" onClick={() => navigate('/')}>
            <span className="brand-avatar">
              <img src="/profile.png" alt="Nagendra Kushwaha" className="brand-avatar-img" onError={(e) => { e.currentTarget.style.display = 'none' }} />
              <span className="brand-avatar-fallback">NK</span>
            </span>
            <div className="brand-text">
              <b>{portfolio.personal.name}</b>
              <small>AI / ML Engineer</small>
            </div>
          </button>

          {/* Quick Search Palette Trigger */}
          <button
            className="nav-search-trigger"
            onClick={() => setPaletteOpen(true)}
            aria-label="Search projects and commands (Ctrl+K)"
            title="Press ⌘K or Ctrl+K to search"
          >
            <Search size={14} />
            <span className="search-text">Search...</span>
            <span className="search-kbd">⌘K</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Desktop Nav Links */}
          <div className={`light-nav-links ${menuOpen ? 'open' : ''}`}>
            {links.map((link) => (
              <a
                className={isActive(link) ? 'active' : ''}
                href={link.path}
                key={link.label}
                onClick={(event) => {
                  event.preventDefault()
                  navigate(link.path)
                }}
              >
                {link.label === 'Ask AI' && <Bot size={13} className="nav-ai-icon" />}
                {link.label}
              </a>
            ))}

            <a className="resume-nav" href={portfolio.personal.resumeUrl} target="_blank" rel="noreferrer">
              Resume <ArrowUpRight size={14} />
            </a>
          </div>
        </nav>
      </header>

      {/* Main Page Routing */}
      {projectId ? (
        <ProjectCaseStudy projectId={projectId} onNavigate={navigate} />
      ) : path === '/projects' ? (
        <Projects />
      ) : path === '/skills' ? (
        <Skills />
      ) : (
        <Home onNavigate={navigate} />
      )}

      {/* Ultra-Premium Footer */}
      <footer className="light-footer">
        <div className="footer-inner">
          <div className="footer-main">
            <div className="footer-intro">
              <span className="footer-mark">NK</span>
              <h2>Nagendra Kushwaha</h2>
              <p>AI/ML Engineer <span>•</span> Data Scientist <span>•</span> Generative AI Developer</p>
              <small>
                Building verified, production-ready intelligent systems with Machine Learning, Deep Learning &amp; Generative AI.
              </small>
            </div>

            <div className="footer-cta">
              <p>Let&apos;s build something intelligent.</p>
              <nav className="footer-links" aria-label="Footer links">
                <a href={portfolio.personal.github} target="_blank" rel="noreferrer">
                  GitHub <ArrowUpRight size={15} />
                </a>
                <a href={portfolio.personal.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn <ArrowUpRight size={15} />
                </a>
                <a href={`mailto:${portfolio.personal.email}`}>
                  Email <ArrowUpRight size={15} />
                </a>
                <a href={portfolio.personal.resumeUrl} target="_blank" rel="noreferrer">
                  Resume PDF <ArrowUpRight size={15} />
                </a>
              </nav>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Nagendra Kushwaha · Sam Global University, Bhopal</span>
            <span>Grounded in verified project datasets and model evaluations</span>
            <button
              type="button"
              className="back-to-top-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to top <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
