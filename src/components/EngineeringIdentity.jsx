import { ArrowRight, CheckCircle2, ChevronRight, Cpu, Database, Flame, Layers, Search, Server, Shield, Sparkles } from 'lucide-react'
import { portfolio } from '../data/portfolio'

const MINDSET_STEPS = [
  { step: '01', title: 'Problem', desc: 'Isolate real-world bottlenecks, rare anomalies, or support latency challenges.' },
  { step: '02', title: 'Data', desc: 'Raw ingestion, schema validation, PII redaction, tokenization & class balancing.' },
  { step: '03', title: 'Experiment', desc: 'Cross-validated architecture benchmarks: classical ensembles vs modern deep nets.' },
  { step: '04', title: 'Model', desc: 'PyTorch/Scikit-learn backbones: EfficientNet, MobileNet, Banking77, XGBoost.' },
  { step: '05', title: 'Evaluation', desc: 'Rigorous validation: ROC-AUC, Macro F1, Grad-CAM attention alignment.' },
  { step: '06', title: 'Deployment', desc: 'FastAPI microservices, Render / Streamlit surfaces, CPU latency optimization.' },
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
  return (
    <section className="identity-section content-width" id="about">
      <div className="section-title">
        <span className="section-number">01</span>
        <div>
          <h2>AI Engineering Identity</h2>
          <p>
            Computer Science Engineering student focused on building practical, high-throughput machine learning systems and verified AI architectures.
          </p>
        </div>
      </div>

      <div className="identity-main-grid">
        {/* Left Column: Who I Am & Mindset */}
        <div className="identity-card-left">
          <div className="identity-bio">
            <div className="identity-bio-head">
              <div className="identity-portrait-frame">
                <img src="/profile.png" alt="Nagendra Kushwaha" className="identity-portrait-img" />
              </div>
              <div>
                <span className="overline">Technical Positioning</span>
                <h3>Who I Am</h3>
              </div>
            </div>
            <p>
              I am <strong>Nagendra Kushwaha</strong>, a Computer Science Engineering student (7.85 CGPA at Sam Global University) building machine learning and intelligent software systems across tabular data, computer vision, and generative AI.
            </p>
            <p>
              My focus is not superficial model calling, but mastering the complete engineering lifecycle: raw data preparation, loss calibration, explainability via Grad-CAM, safety guardrails (prompt injection &amp; PII masking), and production-grade FastAPI serving.
            </p>
          </div>

          {/* Engineering Mindset Flow */}
          <div className="mindset-block">
            <span className="overline">Engineering Methodology</span>
            <h4>Systematic Lifecycle Workflow</h4>
            <div className="mindset-flow-steps">
              {MINDSET_STEPS.map((s, idx) => (
                <div key={s.step} className="mindset-step-node">
                  <div className="step-badge-row">
                    <span className="step-num">{s.step}</span>
                    <strong>{s.title}</strong>
                    {idx < MINDSET_STEPS.length - 1 && <ChevronRight size={14} className="step-arrow" />}
                  </div>
                  <small>{s.desc}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Core Engineering Domains */}
        <div className="identity-card-right">
          <div className="domains-header">
            <span className="overline">Core Technical Areas</span>
            <h3>Specialized Disciplines</h3>
          </div>

          <div className="domains-stack-grid">
            {CORE_DOMAINS.map((domain) => (
              <div key={domain.name} className="domain-chip-card">
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
              <small>Sam Global University · 7.85 / 10 CGPA</small>
            </div>
            <div className="credential-item">
              <span>Internship &amp; Mentorship</span>
              <strong>Data Analytics Intern &amp; DS Mentor</strong>
              <small>UptoSkill (Analytics) · Internship Catalyst (Mentor)</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
