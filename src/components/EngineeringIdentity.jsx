import { useState } from 'react'
import { ArrowRight, CheckCircle2, ChevronRight, Cpu, Database, Flame, Layers, Scan, Server, Shield, Sparkles, Terminal } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { synth } from '../utils/audioSynth'

const MINDSET_STEPS = [
  {
    step: '01',
    title: 'Problem Formulation',
    tag: 'Bottleneck Isolation',
    desc: 'Isolate real-world bottlenecks, class imbalances, or support latency challenges before writing any training code.',
  },
  {
    step: '02',
    title: 'Data Curation & Safety',
    tag: 'Schema & PII Guardrails',
    desc: 'Ingestion, tokenization, PII redaction, prompt injection filtering, and balanced stratified train/test partitioning.',
  },
  {
    step: '03',
    title: 'Architecture Benchmark',
    tag: 'Comparative Search',
    desc: 'Cross-validated architecture benchmarks: comparing classical gradient boosters against modern deep CNNs & Transformers.',
  },
  {
    step: '04',
    title: 'PyTorch / ML Modeling',
    tag: 'Backbone Fine-tuning',
    desc: 'EfficientNet-B0, MobileNetV3-Small, Banking77 intent classifiers, LightGBM, and custom CNN representations.',
  },
  {
    step: '05',
    title: 'Rigorous Evaluation',
    tag: 'Macro F1 & ROC-AUC',
    desc: 'Honest evaluation: ROC-AUC, Macro F1, Grad-CAM attention alignment, and uncurated real test reporting.',
  },
  {
    step: '06',
    title: 'Serving & Deployment',
    tag: 'FastAPI & CPU Tuning',
    desc: 'Containerized FastAPI microservices, Render & Streamlit surfaces, and edge CPU latency optimization (AMD Ryzen 5 5500U).',
  },
]

const CORE_DOMAINS = [
  { name: 'Machine Learning', count: '5 Projects', desc: 'XGBoost, LightGBM, Random Forest, Imbalanced Learning' },
  { name: 'Deep Learning', count: '3 Architectures', desc: 'PyTorch, ResNet-18, EfficientNet-B0, MobileNetV3' },
  { name: 'Computer Vision', count: '2 Benchmarks', desc: 'ICDAR SROIE, RSNA Chest Radiographs, Grad-CAM' },
  { name: 'Generative AI & RAG', count: '102 Chunks', desc: 'Banking77 Intent Engine, Vector Embeddings, Guardrails' },
  { name: 'Data Science & SQL', count: '2M+ Records', desc: 'Pandas, NumPy, Statistical EDA, Feature Engineering' },
  { name: 'Model Deployment', count: 'Production APIs', desc: 'FastAPI, React Frontends, Streamlit, CPU Benchmarking' },
]

export function EngineeringIdentity({ onNavigate }) {
  const [activeStep, setActiveStep] = useState(0)
  const [scannerActive, setScannerActive] = useState(false)

  return (
    <section className="identity-section content-width" id="about">
      {/* Corner crosshairs */}
      <span className="section-crosshair top-left">+</span>
      <span className="section-crosshair top-right">+</span>

      <div className="section-title">
        <span className="section-number">01</span>
        <div>
          <h2>Engineering Philosophy &amp; Identity</h2>
          <p>
            Computer Science Engineering student focused on building practical, high-throughput machine learning systems and verified AI architectures.
          </p>
        </div>
      </div>

      <div className="identity-main-grid">
        {/* Left Column: Grand Portrait & Biography */}
        <div className="identity-card-left">
          <div className="identity-bio">
            {/* Prominent Architectural Portrait Plinth */}
            <div className="identity-portrait-showcase">
              <div
                className="identity-portrait-large-frame"
                title="Nagendra Kushwaha — AI/ML Engineer & Data Scientist"
              >
                <img
                  src="/profile.png"
                  alt="Nagendra Kushwaha — AI/ML Engineer"
                  className="identity-portrait-img-large"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>

              {/* Information written prominently below the image */}
              <div className="identity-under-image-meta">
                <span className="overline">Identity Dossier</span>
                <h3 className="identity-name-prominent">Nagendra Kushwaha</h3>
                <p className="identity-role-prominent">AI/ML ENGINEER &middot; GENERATIVE AI &amp; DEEP LEARNING ARCHITECT</p>
                <div className="identity-academic-row">
                  <span className="academic-tag">🎓 Sam Global University, Bhopal</span>
                  <span className="cgpa-pill">7.85 / 10 CGPA</span>
                </div>
                <div className="identity-proof-chips">
                  <span className="proof-chip">UptoSkill Intern</span>
                  <span className="proof-chip">Catalyst Mentor</span>
                </div>
              </div>
            </div>

            <div className="identity-bio-body">
              <p>
                I am <strong>Nagendra Kushwaha</strong>, a Computer Science Engineering student (7.85 CGPA at Sam Global University, Bhopal) dedicated to engineering intelligent software systems across tabular data, medical computer vision, and generative AI.
              </p>
              <p>
                My focus is not superficial model wrapper calls, but mastering the complete engineering lifecycle: raw data preparation, loss calibration, explainability via Grad-CAM, safety guardrails (prompt injection &amp; PII masking), and production-grade FastAPI serving.
              </p>
            </div>
          </div>

          {/* Interactive Engineering Mindset Flow */}
          <div className="mindset-block">
            <div className="mindset-header">
              <span className="overline">Systematic Methodology</span>
              <h4>The 6-Stage Engineering Lifecycle</h4>
            </div>

            <div className="mindset-flow-steps">
              {MINDSET_STEPS.map((s, idx) => (
                <button
                  key={s.step}
                  type="button"
                  className={`mindset-step-node ${activeStep === idx ? 'active-step' : ''}`}
                  onClick={() => {
                    synth.playClick()
                    setActiveStep(idx)
                  }}
                  onMouseEnter={() => synth.playHover()}
                >
                  <div className="step-badge-row">
                    <span className="step-num">{s.step}</span>
                    <strong>{s.title}</strong>
                    {idx < MINDSET_STEPS.length - 1 && <ChevronRight size={13} className="step-arrow" />}
                  </div>
                  <small>{s.desc}</small>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Core Disciplines & Credentials */}
        <div className="identity-card-right">
          <div className="domains-header">
            <span className="overline">Core Technical Areas</span>
            <h3>Specialized Disciplines</h3>
          </div>

          <div className="domains-stack-grid">
            {CORE_DOMAINS.map((domain) => (
              <div key={domain.name} className="domain-chip-card" onMouseEnter={() => synth.playHover()}>
                <div className="domain-chip-top">
                  <strong>{domain.name}</strong>
                  <span className="domain-count">{domain.count}</span>
                </div>
                <small>{domain.desc}</small>
              </div>
            ))}
          </div>

          {/* Quick Academic & Internship Credentials */}
          <div className="quick-credentials">
            <div className="credential-item">
              <span>Academic Degree</span>
              <strong>B.Tech in Computer Science Engineering</strong>
              <small>Sam Global University, Bhopal · 7.85 / 10 CGPA</small>
            </div>

            <div className="credential-item">
              <span>Professional Experience</span>
              <strong>Data Analytics Intern &middot; UptoSkill</strong>
              <small>Dec 2025 — Mar 2026 · Python, SQL, Analytics</small>
            </div>

            <div className="credential-item">
              <span>Mentorship Role</span>
              <strong>Data Science Mentor &middot; Internship Catalyst</strong>
              <small>Guiding students through ML pipelines &amp; analytics</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
