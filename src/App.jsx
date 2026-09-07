import { useEffect, useState } from 'react'
import { ArrowUp, ArrowUpRight, Menu, X } from 'lucide-react'
import { portfolio } from './data/portfolio'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { Skills } from './pages/Skills'
import { ProjectCaseStudy } from './pages/ProjectCaseStudy'
import './App.css'
import './experience.css'
import './profile.css'
import './ai-visual.css'
import './case-study.css'
import './quality-overrides.css'
import './footer.css'
import './preferred-fields.css'

function getPath() { return window.location.pathname.replace(/\/$/, '') || '/' }

function App() {
  const [path, setPath] = useState(getPath)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = (nextPath) => { window.history.pushState({}, '', nextPath); setPath(getPath()); setMenuOpen(false); const hash = nextPath.includes('#') ? nextPath.split('#')[1] : ''; window.setTimeout(() => hash ? document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }) : window.scrollTo({ top: 0, behavior: 'smooth' }), 0) }
  useEffect(() => { const onPopState = () => setPath(getPath()); window.addEventListener('popstate', onPopState); return () => window.removeEventListener('popstate', onPopState) }, [])
  const links = [{ label: 'Home', path: '/' }, { label: 'About', path: '/#about' }, { label: 'Skills', path: '/skills' }, { label: 'Projects', path: '/projects' }, { label: 'Experience', path: '/#experience' }, { label: 'Journey', path: '/#journey' }, { label: 'Contact', path: '/#contact' }]
  const isActive = (link) => link.path === path || (link.path === '/' && path === '/') || (link.path.startsWith('/#') && window.location.hash === link.path.slice(1))
  const projectId = path.startsWith('/projects/') ? path.split('/')[2] : null
  return <div className="light-site"><header className="light-nav"><nav className="nav-inner"><button className="light-brand" onClick={() => navigate('/')}><span>NK</span><b>{portfolio.personal.name}</b></button><button className="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button><div className={`light-nav-links ${menuOpen ? 'open' : ''}`}>{links.map((link) => <a className={isActive(link) ? 'active' : ''} href={link.path} key={link.label} onClick={(event) => { event.preventDefault(); navigate(link.path) }}>{link.label}</a>)}<a className="resume-nav" href={portfolio.personal.resumeUrl} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={14} /></a></div></nav></header>{projectId ? <ProjectCaseStudy projectId={projectId} onNavigate={navigate} /> : path === '/projects' ? <Projects /> : path === '/skills' ? <Skills /> : <Home onNavigate={navigate} />}<footer className="light-footer"><div className="footer-inner"><div className="footer-main"><div className="footer-intro"><span className="footer-mark">NK</span><h2>Nagendra Kushwaha</h2><p>AI/ML Engineer <span>•</span> Data Scientist <span>•</span> Generative AI / LLM Developer</p><small>Building intelligent systems with AI, Machine Learning &amp; Generative AI.</small></div><div className="footer-cta"><p>Let&apos;s build something intelligent.</p><nav className="footer-links" aria-label="Footer links"><a href={portfolio.personal.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} /></a><a href={portfolio.personal.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16} /></a><a href={`mailto:${portfolio.personal.email}`}>Email <ArrowUpRight size={16} /></a><a href={portfolio.personal.resumeUrl} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={16} /></a></nav></div></div><div className="footer-bottom"><span>© 2026 Nagendra Kushwaha</span><span>Designed &amp; built by Nagendra Kushwaha</span><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top <ArrowUp size={15} /></button></div></div></footer></div>
}

export default App
