import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Beaker, Code2, Download, ExternalLink, FileText, Mail, Sparkles, Terminal, Cpu, Database, Activity, User, Award, Maximize2, CheckCircle2, MapPin, X } from 'lucide-react'
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
import { SceneTracker } from '../components/SceneTracker'
import { synth } from '../utils/audioSynth'
import { AppearTitle } from '../components/motion/AppearTitle'
import { InfiniteText } from '../components/motion/InfiniteText'

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
      <AppearTitle>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </AppearTitle>
    </div>
  )
}

export function Home({ onNavigate }) {
  const [currentPerspective, setCurrentPerspective] = useState('all')
  const [heroVisualMode, setHeroVisualMode] = useState('portrait') // 'portrait' | 'neural'
  const [portraitModalOpen, setPortraitModalOpen] = useState(false)

  return (
    <main className="ultra-home">
      {/* Side HUD Scene Tracker */}
      <SceneTracker />

      {/* 1. CINEMATIC HERO SECTION WITH 3D NEURAL TENSOR CANVAS */}
      <section className="cinematic-hero content-width" id="hero">
        <span className="hero-corner-crosshair top-left">+</span>
        <span className="hero-corner-crosshair top-right">+</span>

        <div className="hero-left">
          <div className="hero-telemetry-badge">
            <span className="live-dot" />
            <span>AI/ML ENGINEER · DATA SCIENTIST · BHOPAL, INDIA</span>
            <span className="telemetry-coord">LAT: 23.2599° N · LON: 77.4126° E</span>
          </div>

          <h1 className="hero-headline">
            Architecting
            <br />
            <span className="headline-gradient">Intelligent Systems</span>
            <br />
            with Deep Learning &amp; GenAI.
          </h1>

          <p className="hero-copy">
            I&apos;m <strong>Nagendra Kushwaha</strong>, a Computer Science Engineering student (7.85 CGPA at Sam Global University) engineering verified, production-ready machine learning architectures. My work spans deep computer vision (EfficientNet 93.6% accuracy on RSNA), conversational AI (Banking77 88.72% test accuracy with RAG), and high-throughput network anomaly detection (2M+ CIC-IDS2017 rows).
          </p>

          {/* Academic Standing Orbit Pill */}
          <div className="hero-benchmark-pills">
            <div className="benchmark-pill" title="Sam Global University Academic Standing">
              <span className="pill-dot gold" />
              <strong>7.85 CGPA</strong>
              <small>Sam Global Univ</small>
            </div>
          </div>

          <div className="hero-buttons">
            <a
              className="cinematic-cta-primary"
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                synth.playClick()
                onNavigate('/projects')
              }}
              onMouseEnter={() => synth.playHover()}
              data-cursor="EXPLORE"
            >
              <span>Explore Project Lab</span>
              <ArrowUpRight size={16} />
            </a>

            <a
              className="cinematic-cta-secondary"
              href="#mllab"
              onClick={(e) => {
                e.preventDefault()
                synth.playClick()
                document.getElementById('mllab')?.scrollIntoView({ behavior: 'smooth' })
              }}
              onMouseEnter={() => synth.playHover()}
              data-cursor="RUN"
            >
              <Beaker size={15} />
              <span>Launch Live ML Demos</span>
            </a>

            <a
              className="cinematic-cta-ghost"
              href={portfolio.personal.resumeUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => synth.playClick()}
              onMouseEnter={() => synth.playHover()}
              data-cursor="PDF"
            >
              <Download size={15} />
              <span>Resume PDF</span>
            </a>

            <a
              className="cinematic-cta-ghost"
              href={portfolio.personal.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => synth.playClick()}
              onMouseEnter={() => synth.playHover()}
              data-cursor="CODE"
            >
              <Code2 size={15} />
              <span>GitHub</span>
            </a>
          </div>

          <div className="hero-telemetry-strip">
            <div className="telemetry-item">
              <span>Primary Core</span>
              <strong>Python · PyTorch · FastAPI</strong>
            </div>
            <div className="telemetry-item">
              <span>Core Focus</span>
              <strong>Computer Vision &amp; Generative AI</strong>
            </div>
            <div className="telemetry-item">
              <span>Production Serving</span>
              <strong>FastAPI + Render + Streamlit</strong>
            </div>
            <div className="telemetry-item">
              <span>Latency Profile</span>
              <strong>AMD Ryzen 5 CPU Tuned</strong>
            </div>
          </div>
        </div>

        {/* Right Architectural Visual Showcase: Grand Portrait & 3D Neural Sphere */}
        <div className="hero-right-visual hero-visual-wrap">
          {/* View Switcher Controls */}
          <div className="hero-visual-switcher" role="tablist">
            <button
              type="button"
              className={`hero-switch-btn ${heroVisualMode === 'portrait' ? 'active' : ''}`}
              onClick={() => {
                synth.playClick()
                setHeroVisualMode('portrait')
              }}
              onMouseEnter={() => synth.playHover()}
            >
              <User size={13} />
              <span>Architect Portrait</span>
            </button>
            <button
              type="button"
              className={`hero-switch-btn ${heroVisualMode === 'neural' ? 'active' : ''}`}
              onClick={() => {
                synth.playClick()
                setHeroVisualMode('neural')
              }}
              onMouseEnter={() => synth.playHover()}
            >
              <Cpu size={13} />
              <span>3D Neural Sphere</span>
            </button>
          </div>

          {heroVisualMode === 'portrait' ? (
            /* Grand Architectural Hero Portrait Card */
            <div className="hero-portrait-card">
              <div
                className="hero-portrait-media-wrap"
                onClick={() => {
                  synth.playClick()
                  setPortraitModalOpen(true)
                }}
                title="Click to view full portrait"
                data-cursor="VIEW"
              >
                <img
                  src="/profile.png"
                  alt="Nagendra Kushwaha — AI/ML Engineer & Data Scientist"
                  className="hero-portrait-img-large"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>

              {/* Information Written Prominently Below the Image */}
              <div className="hero-portrait-caption">
                <div className="caption-header">
                  <div className="caption-name-row">
                    <h2 className="caption-name">Nagendra Kushwaha</h2>
                    <span className="caption-verified-badge" title="Identity Verified">
                      <CheckCircle2 size={13} />
                      <span>Verified</span>
                    </span>
                  </div>
                  <span className="caption-role">AI/ML ENGINEER &amp; DATA SCIENTIST</span>
                  <span className="caption-subdiscipline">Generative AI · Deep Learning · Computer Vision</span>
                </div>

                {/* Academic Distinction Badge */}
                <div className="caption-academic-badge">
                  <span className="academic-icon">🎓</span>
                  <div className="academic-meta">
                    <strong>Sam Global University, Bhopal</strong>
                    <div className="academic-subline">
                      <span>B.Tech Computer Science Engineering</span>
                      <span className="cgpa-highlight">7.85 / 10 CGPA</span>
                    </div>
                  </div>
                </div>

                {/* Industry Internships & Mentorship */}
                <div className="caption-experience-strip">
                  <div className="caption-exp-item">
                    <span className="exp-label">Internship</span>
                    <strong>UptoSkill</strong>
                    <small>Data Analytics &amp; EDA</small>
                  </div>
                  <div className="caption-exp-item">
                    <span className="exp-label">Mentorship</span>
                    <strong>Internship Catalyst</strong>
                    <small>Data Science &amp; ML</small>
                  </div>
                </div>

                {/* Engineering Bio / Philosophy */}
                <p className="caption-credo-text">
                  &ldquo;I engineer real, production-ready AI systems with mathematically grounded foundations, explainable computer vision (Grad-CAM), and low-latency API deployment.&rdquo;
                </p>

                {/* Quick Action Links directly below image */}
                <div className="caption-actions-row">
                  <a
                    href={portfolio.personal.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="caption-action-btn primary"
                    onClick={() => synth.playClick()}
                    onMouseEnter={() => synth.playHover()}
                  >
                    <Download size={12} />
                    <span>Resume PDF</span>
                  </a>
                  <a
                    href={portfolio.personal.github}
                    target="_blank"
                    rel="noreferrer"
                    className="caption-action-btn"
                    onClick={() => synth.playClick()}
                    onMouseEnter={() => synth.playHover()}
                  >
                    <GithubIcon size={12} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={portfolio.personal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="caption-action-btn"
                    onClick={() => synth.playClick()}
                    onMouseEnter={() => synth.playHover()}
                  >
                    <LinkedinIcon size={12} />
                    <span>LinkedIn</span>
                  </a>
                  <button
                    type="button"
                    className="caption-action-btn ghost"
                    onClick={() => {
                      synth.playClick()
                      setPortraitModalOpen(true)
                    }}
                    onMouseEnter={() => synth.playHover()}
                  >
                    <Maximize2 size={12} />
                    <span>HD View</span>
                  </button>
                </div>

                {/* Availability status */}
                <div className="caption-footer-status">
                  <span className="live-dot" />
                  <span>Available for Full-Time Roles &middot; Bhopal, India</span>
                </div>
              </div>
            </div>
          ) : (
            /* 3D Neural Tensor Canvas */
            <div className="hero-neural-wrap">
              <InteractiveNeuralCanvas />
            </div>
          )}
        </div>
      </section>

      {/* Giats-Inspired Infinite Kinetic Marquee Ribbon */}
      <div className="hero-infinite-strip" aria-hidden="true">
        <InfiniteText
          text="AI & ML ARCHITECTURES • REAL-TIME RAG • COMPUTER VISION • VERIFIED PRODUCTION BENCHMARKS • EXPLAINABLE GRAD-CAM"
          length={4}
        />
      </div>

      {/* 2. PERSONALIZATION EXPERIENCE BAR */}
      <section className="personalization-section content-width">
        <PersonalizationBar
          currentPerspective={currentPerspective}
          onSelectPerspective={(val) => {
            synth.playClick()
            setCurrentPerspective(val)
          }}
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
            copy="Flagship implementations across Generative AI, Medical Computer Vision, Document AI, and High-Throughput Intrusion Detection."
          />
          <button
            className="cinematic-view-all-btn"
            onClick={() => {
              synth.playClick()
              onNavigate('/projects')
            }}
            onMouseEnter={() => synth.playHover()}
          >
            <span>View All 9 Projects</span>
            <ArrowUpRight size={15} />
          </button>
        </div>

        <ProjectsPreview
          filterPersona={currentPerspective}
          onDetails={(project) => {
            synth.playClick()
            onNavigate(`/projects/${project.id}`)
          }}
        />
      </section>

      {/* 6. LIVE ML LAB & MODEL INFERENCE PLAYGROUND */}
      <LiveMLLab onNavigate={onNavigate} />

      {/* 7. REAL ENGINEERING ANALYTICS DASHBOARD */}
      <EngineeringAnalytics />

      {/* 8. AI ASSISTANT: ASK MY PORTFOLIO */}
      <section id="ask-ai">
        <PortfolioAIAssistant onNavigate={onNavigate} />
      </section>

      {/* 9. ENGINEERING TIMELINE & VERIFIED MILESTONES */}
      <EngineeringTimeline />

      {/* 10. GITHUB & OPEN SOURCE CODEBASES */}
      <CodeRepositories />

      {/* 11. CONTACT & COLLABORATION CTA */}
      <section className="cinematic-contact content-width" id="contact">
        <span className="section-crosshair top-left">+</span>
        <span className="section-crosshair top-right">+</span>

        <div className="contact-editorial">
          <p className="overline">
            <Sparkles size={13} className="orange-dot-icon" /> 11 // Collaboration &amp; Opportunities
          </p>
          <h2>
            Let&apos;s engineer
            <br />
            <span className="headline-gradient">intelligent systems.</span>
          </h2>
          <p className="contact-copy">
            Available for AI/ML Engineer roles, Data Science opportunities, research collaborations, and production intelligent software initiatives. Grounded in verified datasets and sound ML engineering discipline.
          </p>
          <div className="contact-quick-badges">
            <span>📍 Bhopal, Madhya Pradesh, India</span>
            <span>⚡ Open to Remote &amp; On-Site</span>
            <span>🎓 Sam Global University (7.85 CGPA)</span>
          </div>

          {/* Executive Portrait Collaboration Plaque */}
          <div
            className="contact-executive-plinth"
            onClick={() => {
              synth.playClick()
              setPortraitModalOpen(true)
            }}
            title="Click to view full architectural dossier"
            data-cursor="EXPAND"
          >
            <div className="plinth-avatar-wrap">
              <img
                src="/profile.png"
                alt="Nagendra Kushwaha — AI/ML Engineer"
                className="plinth-avatar-img"
              />
              <span className="plinth-live-badge" />
            </div>
            <div className="plinth-details">
              <div className="plinth-header-row">
                <strong>Nagendra Kushwaha</strong>
                <span className="plinth-role-tag">AI/ML ARCHITECT</span>
              </div>
              <small className="plinth-academic">Sam Global University, Bhopal · B.Tech CSE (7.85 CGPA)</small>
              <p className="plinth-quote">
                &ldquo;Ready to engineer production deep learning systems, explainable medical vision, and low-latency LLM/RAG pipelines for your team.&rdquo;
              </p>
            </div>
          </div>
        </div>

        <div className="contact-panel-cinematic">
          <a
            href={`mailto:${portfolio.personal.email}`}
            onMouseEnter={() => synth.playHover()}
            onClick={() => synth.playClick()}
          >
            <div className="contact-link-left">
              <Mail size={16} className="contact-icon" />
              <div>
                <span className="contact-link-type">Direct Email</span>
                <strong>{portfolio.personal.email}</strong>
              </div>
            </div>
            <ArrowUpRight size={16} />
          </a>

          <a
            href={portfolio.personal.github}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => synth.playHover()}
            onClick={() => synth.playClick()}
          >
            <div className="contact-link-left">
              <GithubIcon size={16} />
              <div>
                <span className="contact-link-type">GitHub Profile</span>
                <strong>github.com/Nagendrakushwaha</strong>
              </div>
            </div>
            <ArrowUpRight size={16} />
          </a>

          <a
            href={portfolio.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => synth.playHover()}
            onClick={() => synth.playClick()}
          >
            <div className="contact-link-left">
              <LinkedinIcon size={16} />
              <div>
                <span className="contact-link-type">LinkedIn Connection</span>
                <strong>Nagendra Kushwaha</strong>
              </div>
            </div>
            <ArrowUpRight size={16} />
          </a>

          <a
            href={portfolio.personal.resumeUrl}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => synth.playHover()}
            onClick={() => synth.playClick()}
          >
            <div className="contact-link-left">
              <FileText size={16} className="contact-icon" />
              <div>
                <span className="contact-link-type">Curriculum Vitae</span>
                <strong>Download AI/ML Resume (PDF)</strong>
              </div>
            </div>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      {/* 12. CINEMATIC HD PORTRAIT LIGHTBOX MODAL */}
      {portraitModalOpen && (
        <div
          className="portrait-lightbox-overlay"
          onClick={() => {
            synth.playClick()
            setPortraitModalOpen(false)
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="portrait-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => {
                synth.playClick()
                setPortraitModalOpen(false)
              }}
              aria-label="Close HD Portrait View"
            >
              <X size={18} />
            </button>

            <div className="lightbox-grid">
              <div className="lightbox-media-col">
                <div className="lightbox-img-frame">
                  <img
                    src="/profile.png"
                    alt="Nagendra Kushwaha — AI/ML Engineer & Data Scientist"
                    className="lightbox-img"
                  />
                </div>
              </div>

              <div className="lightbox-dossier-col">
                <span className="overline">Architectural Dossier</span>
                <h2 className="lightbox-name">Nagendra Kushwaha</h2>
                <p className="lightbox-title">AI/ML ENGINEER &amp; DATA SCIENTIST</p>
                <p className="lightbox-location">
                  <MapPin size={13} /> Bhopal, Madhya Pradesh, India
                </p>

                <div className="lightbox-section">
                  <h4>Academic Distinction</h4>
                  <div className="lightbox-badge-card">
                    <span className="academic-icon">🎓</span>
                    <div>
                      <strong>Sam Global University, Bhopal</strong>
                      <p>B.Tech Computer Science &amp; Engineering &middot; <b>7.85 / 10 CGPA</b></p>
                    </div>
                  </div>
                </div>

                <div className="lightbox-section">
                  <h4>Verified Experience &amp; Mentorship</h4>
                  <ul className="lightbox-exp-list">
                    <li>
                      <strong>UptoSkill</strong> &mdash; Data Analytics Intern (E-commerce EDA, Customer Segmentation &amp; Retention Analytics)
                    </li>
                    <li>
                      <strong>Internship Catalyst</strong> &mdash; Data Science Mentor (Practical Modeling, Loss Calibration, Student Mentorship)
                    </li>
                    <li>
                      <strong>BCG Virtual Experience</strong> &mdash; Business Strategy, Data Analysis &amp; Strategic Problem Solving
                    </li>
                  </ul>
                </div>

                <div className="lightbox-section">
                  <h4>Engineering Philosophy</h4>
                  <p className="lightbox-bio-text">
                    &ldquo;My focus is not superficial model wrapper calls, but mastering the complete engineering lifecycle: raw data preparation, loss calibration, explainability via Grad-CAM, safety guardrails (prompt injection &amp; PII masking), and production-grade FastAPI serving on edge CPUs.&rdquo;
                  </p>
                </div>

                <div className="lightbox-actions-row">
                  <a
                    href={portfolio.personal.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="cinematic-cta-primary"
                    onClick={() => synth.playClick()}
                  >
                    <Download size={14} />
                    <span>Download AI/ML Resume (PDF)</span>
                  </a>
                  <a
                    href={`mailto:${portfolio.personal.email}`}
                    className="cinematic-cta-secondary"
                    onClick={() => synth.playClick()}
                  >
                    <Mail size={14} />
                    <span>Contact Directly</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
