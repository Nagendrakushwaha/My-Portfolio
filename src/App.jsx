import { useEffect, useState } from 'react'
import { ArrowUp, ArrowUpRight, Bot, Film, Menu, Search, Volume2, VolumeX, X } from 'lucide-react'
import { portfolio } from './data/portfolio'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { Skills } from './pages/Skills'
import { ProjectCaseStudy } from './pages/ProjectCaseStudy'
import { CommandPalette } from './components/CommandPalette'
import { CustomCursor } from './components/CustomCursor'
import { TheatricalCurtainOpening } from './components/TheatricalCurtainOpening'
import { synth } from './utils/audioSynth'
import './App.css'
import './experience.css'
import './profile.css'
import './ai-visual.css'
import './case-study.css'
import './quality-overrides.css'
import './footer.css'
import './preferred-fields.css'
import './ultra-premium.css'
import './cinematic-elevation.css'

function getPath() {
  return window.location.pathname.replace(/\/$/, '') || '/'
}

function App() {
  const [path, setPath] = useState(getPath)
  const [menuOpen, setMenuOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMuted, setIsMuted] = useState(synth.isMuted())
  const [showCurtain, setShowCurtain] = useState(true)

  const navigate = (nextPath) => {
    synth.playClick()
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

  // Header scroll glass morphing
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Audio mute subscription
  useEffect(() => {
    const unsubscribe = synth.subscribe((muted) => setIsMuted(muted))
    return unsubscribe
  }, [])

  // Global hotkey: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        synth.playClick()
        setPaletteOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const toggleSound = () => {
    const next = synth.toggleMute()
    setIsMuted(next)
    if (!next) {
      synth.playModeSwitch()
    }
  }

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
    <div className="cinematic-site-root">
      {/* Magnetic Fluid Cursor */}
      <CustomCursor />

      {/* Theatrical Curtain Entrance (Parting Curtains like the Reference Video) */}
      <TheatricalCurtainOpening
        isOpen={showCurtain}
        onComplete={() => setShowCurtain(false)}
      />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={navigate}
      />

      {/* Floating HUD Header Navigation */}
      <header className={`cinematic-nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <nav className="nav-inner">
          <button
            className="cinematic-brand"
            onClick={() => navigate('/')}
            onMouseEnter={() => synth.playHover()}
          >
            <span className="brand-avatar">
              <img
                src="/profile.png"
                alt="Nagendra Kushwaha"
                className="brand-avatar-img"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <span className="brand-avatar-fallback">NK</span>
            </span>
            <div className="brand-text">
              <b>{portfolio.personal.name}</b>
              <small>AI/ML ENGINEER &amp; DATA SCIENTIST</small>
            </div>
          </button>

          {/* Center Navigation Links */}
          <div className={`cinematic-nav-links ${menuOpen ? 'open' : ''}`}>
            {links.map((link) => (
              <a
                className={isActive(link) ? 'active' : ''}
                href={link.path}
                key={link.label}
                onMouseEnter={() => synth.playHover()}
                onClick={(event) => {
                  event.preventDefault()
                  navigate(link.path)
                }}
              >
                {link.label === 'Ask AI' && <Bot size={13} className="nav-ai-icon" />}
                {link.label}
              </a>
            ))}

            <a
              className="resume-nav-btn"
              href={portfolio.personal.resumeUrl}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => synth.playHover()}
              onClick={() => synth.playClick()}
            >
              Resume <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Right Utility Controls: Cinema Replay, Sound, Search, Mobile Menu */}
          <div className="nav-controls-right">
            {/* Cinema Replay Entrance Button */}
            <button
              type="button"
              className="nav-cinema-replay-btn"
              onClick={() => {
                synth.playClick()
                setShowCurtain(true)
              }}
              title="Replay Theatrical Curtain Entrance"
              aria-label="Replay Theatrical Curtain Entrance"
              data-cursor="REPLAY"
            >
              <Film size={14} className="replay-icon" />
              <span className="replay-text">CINEMA REPLAY</span>
            </button>

            {/* Audio Toggle */}
            <button
              type="button"
              className={`nav-sound-toggle ${!isMuted ? 'sound-active' : ''}`}
              onClick={toggleSound}
              title={isMuted ? 'Unmute UI Audio Effects' : 'Mute UI Audio Effects'}
              aria-label={isMuted ? 'Unmute audio effects' : 'Mute audio effects'}
            >
              {!isMuted ? <Volume2 size={15} /> : <VolumeX size={15} />}
              <span className="sound-text">{!isMuted ? 'AUDIO ON' : 'MUTED'}</span>
            </button>

            {/* Quick Search Palette Trigger */}
            <button
              className="nav-search-trigger"
              onClick={() => {
                synth.playClick()
                setPaletteOpen(true)
              }}
              onMouseEnter={() => synth.playHover()}
              aria-label="Search projects and commands (Ctrl+K)"
              title="Press ⌘K or Ctrl+K to search"
            >
              <Search size={14} />
              <span className="search-text">Search</span>
              <span className="search-kbd">⌘K</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => {
                synth.playClick()
                setMenuOpen(!menuOpen)
              }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
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

      {/* Ultra-Premium Cinematic Footer */}
      <footer className="cinematic-footer">
        <div className="footer-inner">
          <div className="footer-main">
            <div className="footer-intro">
              <span className="footer-mark">NK</span>
              <h2>Nagendra Kushwaha</h2>
              <p>
                AI/ML Engineer <span>•</span> Data Scientist <span>•</span> Generative AI Developer
              </p>
              <small>
                Building verified, production-ready intelligent systems with Machine Learning, Deep Learning, Computer Vision &amp; Generative AI.
              </small>
            </div>

            <div className="footer-cta">
              <p>Ready to engineer intelligent systems?</p>
              <nav className="footer-links" aria-label="Footer links">
                <a
                  href={portfolio.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => synth.playHover()}
                  onClick={() => synth.playClick()}
                >
                  GitHub <ArrowUpRight size={14} />
                </a>
                <a
                  href={portfolio.personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => synth.playHover()}
                  onClick={() => synth.playClick()}
                >
                  LinkedIn <ArrowUpRight size={14} />
                </a>
                <a
                  href={`mailto:${portfolio.personal.email}`}
                  onMouseEnter={() => synth.playHover()}
                  onClick={() => synth.playClick()}
                >
                  Email <ArrowUpRight size={14} />
                </a>
                <a
                  href={portfolio.personal.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => synth.playHover()}
                  onClick={() => synth.playClick()}
                >
                  Resume PDF <ArrowUpRight size={14} />
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
              onClick={() => {
                synth.playClick()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              onMouseEnter={() => synth.playHover()}
            >
              Back to top <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
