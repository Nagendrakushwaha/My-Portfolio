import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Beaker, Code2, Download, ExternalLink, FileText, Mail, Sparkles, Terminal } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { ProjectsPreview } from './Projects'
import { InteractiveNeuralCanvas } from '../components/InteractiveNeuralCanvas'
import { PersonalizationBar } from '../components/PersonalizationBar'
import { EngineeringIdentity } from '../components/EngineeringIdentity'
import { TechStackExplorer } from '../components/TechStackExplorer'
import { LiveMLLab } from '../components/LiveMLLab'
import { EngineeringAnalytics } from '../components/EngineeringAnalytics'
import { PortfolioAIAssistant } from '../components/PortfolioAIAssistant'
import { EngineeringTimeline } from '../components/EngineeringTimeline'
import { CodeRepositories } from '../components/CodeRepositories'

function GithubIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedinIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function SectionTitle({ number, title, copy }) {
  return (
    <div className="section-title">
      <span className="section-number">{number}</span>
      <div>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </div>
  )
}

export function Home({ onNavigate }) {
  const [currentPerspective, setCurrentPerspective] = useState('all')

  return (
    <main className="ultra-home">
      {/* 1. HERO SECTION WITH 3D NEURAL CANVAS */}
      <section className="light-hero content-width" id="hero">
        <div className="hero-left">
          <div className="hero-telemetry-badge">
            <span className="live-dot" />
            <span>AI / ML ENGINEER · DATA SCIENTIST · BHOPAL, INDIA</span>
          </div>

          <h1>
            Building Intelligent Systems with
            <br />
            <em>Machine Learning, Deep Learning</em>
            <br />
            &amp; Generative AI.
          </h1>

          <p className="hero-copy">
            I&apos;m <strong>Nagendra Kushwaha</strong>, a Computer Science Engineering student (7.85 CGPA) building verified, production-ready machine learning architectures. My work spans deep computer vision (EfficientNet 93.6% accuracy on RSNA), conversational AI (Banking77 88.72% test accuracy with RAG), and high-throughput network anomaly detection (2M+ CIC-IDS2017 rows).
          </p>

          <div className="hero-buttons">
            <a
              className="accent-button"
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                onNavigate('/projects')
              }}
            >
              Explore Project Lab <ArrowUpRight size={16} />
            </a>

            <a
              className="soft-button"
              href="#mllab"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('mllab')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <Beaker size={15} /> Try Live ML Demos
            </a>

            <a
              className="text-button"
              href={portfolio.personal.resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Download size={15} /> Resume PDF
            </a>

            <a
              className="text-button"
              href={portfolio.personal.github}
              target="_blank"
              rel="noreferrer"
            >
              <Code2 size={15} /> GitHub
            </a>
          </div>

          <div className="hero-telemetry-strip">
            <div className="telemetry-item">
              <span>Primary Stack</span>
              <strong>Python · PyTorch · FastAPI</strong>
            </div>
            <div className="telemetry-item">
              <span>Benchmark Max</span>
              <strong>99.6% Acc (NIDS) · 93.6% (RSNA)</strong>
            </div>
            <div className="telemetry-item">
              <span>Deployment</span>
              <strong>FastAPI + Render + Streamlit</strong>
            </div>
          </div>
        </div>

        {/* Right 3D Visual Mesh with Integrated Profile */}
        <div className="hero-right-visual hero-visual-wrap">
          <div className="profile-frame">
            <img src="/profile.png" alt="Nagendra Kushwaha — AI/ML Engineer" />
          </div>
          <InteractiveNeuralCanvas />
        </div>
      </section>

      {/* 2. PERSONALIZATION EXPERIENCE BAR */}
      <section className="personalization-section content-width">
        <PersonalizationBar
          currentPerspective={currentPerspective}
          onSelectPerspective={setCurrentPerspective}
        />
      </section>

      {/* 3. AI ENGINEERING IDENTITY & LIFECYCLE MINDSET */}
      <EngineeringIdentity onNavigate={onNavigate} />

      {/* 4. INTERACTIVE TECH STACK */}
      <TechStackExplorer onNavigate={onNavigate} />

      {/* 5. FEATURED PROJECTS SECTION */}
      <section className="home-projects content-width" id="projects">
        <div className="section-heading-row">
          <SectionTitle
            number="04"
            title="Featured Engineering Systems."
            copy="Flagship implementations across Generative AI, Medical Computer Vision, Document AI, and Intrusion Detection."
          />
          <button className="text-button" onClick={() => onNavigate('/projects')}>
            View All 9 Projects <ArrowUpRight size={16} />
          </button>
        </div>

        <ProjectsPreview
          filterPersona={currentPerspective}
          onDetails={(project) => onNavigate(`/projects/${project.id}`)}
        />
      </section>

      {/* 6. LIVE ML LAB & MODEL INFERENCE PLAYGROUND */}
      <LiveMLLab onNavigate={onNavigate} />

      {/* 7. REAL ENGINEERING ANALYTICS DASHBOARD */}
      <EngineeringAnalytics />

      {/* 8. AI ASSISTANT: ASK MY PORTFOLIO */}
      <PortfolioAIAssistant onNavigate={onNavigate} />

      {/* 9. ENGINEERING TIMELINE & VERIFIED MILESTONES */}
      <EngineeringTimeline />

      {/* 10. GITHUB & OPEN SOURCE CODEBASES */}
      <CodeRepositories />

      {/* 11. CONTACT & COLLABORATION CTA */}
      <section className="light-contact content-width" id="contact">
        <div>
          <p className="overline">
            <Sparkles size={12} className="orange-dot-icon" /> 11 / Contact &amp; Opportunities
          </p>
          <h2>
            Let&apos;s build
            <br />
            <em>intelligent systems.</em>
          </h2>
          <p className="contact-copy">
            Available for AI/ML Engineer roles, Data Science opportunities, research collaborations, and production intelligent software projects.
          </p>
          <div className="contact-quick-badges">
            <span>Bhopal, Madhya Pradesh, India</span>
            <span>Open to Remote &amp; On-Site</span>
          </div>
        </div>

        <div className="contact-panel">
          <a href={`mailto:${portfolio.personal.email}`}>
            <span className="contact-label"><Mail size={15} /> Direct Email</span>
            <strong>{portfolio.personal.email} <ArrowUpRight size={16} /></strong>
          </a>
          <a href={portfolio.personal.github} target="_blank" rel="noreferrer">
            <span className="contact-label"><GithubIcon size={15} /> GitHub Profile</span>
            <strong>github.com/Nagendrakushwaha <ArrowUpRight size={16} /></strong>
          </a>
          <a href={portfolio.personal.linkedin} target="_blank" rel="noreferrer">
            <span className="contact-label"><LinkedinIcon size={15} /> LinkedIn</span>
            <strong>Nagendra Kushwaha <ArrowUpRight size={16} /></strong>
          </a>
          <a href={portfolio.personal.resumeUrl} target="_blank" rel="noreferrer">
            <span className="contact-label"><FileText size={15} /> Resume PDF</span>
            <strong>Download AI/ML Resume <ArrowUpRight size={16} /></strong>
          </a>
        </div>
      </section>
    </main>
  )
}
