import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Clipboard, ExternalLink, Globe, Link, Share2, ShieldAlert, Sparkles, Terminal } from 'lucide-react'
import { projects } from '../data/projects'
import { ProjectImage } from '../components/ProjectImage'
import { MetricCard } from '../components/MetricCard'
import { PerformanceChart } from '../components/PerformanceChart'

const metricLabels = {
  accuracy: ['Accuracy', '%'],
  precision: ['Precision', '%'],
  recall: ['Recall', '%'],
  f1: ['F1 Score', '%'],
  rocAuc: ['ROC-AUC', ''],
  prAuc: ['PR-AUC', ''],
  precisionAtK: ['Precision@K', ''],
  recallAtK: ['Recall@K', ''],
  mapAtK: ['MAP@K', ''],
  ndcgAtK: ['NDCG@K', ''],
  bleu: ['BLEU', ''],
  rouge: ['ROUGE', ''],
  meteor: ['METEOR', ''],
  chrf: ['chrF', ''],
  perplexity: ['Perplexity', ''],
  trainingLoss: ['Training Loss', ''],
  validationLoss: ['Validation Loss', ''],
}

function OptionalList({ title, items, empty = 'Details coming soon.' }) {
  return (
    <section className="case-subsection">
      <h3>{title}</h3>
      {items?.length ? (
        <ul className="case-list">
          {items.map((item, idx) => (
            <li key={idx}>
              <Check size={15} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="case-empty">{empty}</p>
      )}
    </section>
  )
}

function CaseSection({ id, number, title, children }) {
  return (
    <section className="case-section" id={id}>
      <div className="case-section-label">{number}</div>
      <div className="case-section-body">
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  )
}

export function ProjectCaseStudy({ projectId, onNavigate }) {
  const projectIndex = projects.findIndex((item) => item.id === projectId)
  const project = projects[projectIndex]
  const [copied, setCopied] = useState(false)
  const [selectedModelIndex, setSelectedModelIndex] = useState(0)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [projectId])

  const metrics = useMemo(() => {
    return Object.entries(project?.metrics || {}).map(([key, value]) => ({
      key,
      value,
      label: metricLabels[key]?.[0] || key,
      unit: metricLabels[key]?.[1] || '',
    }))
  }, [project])

  if (!project) {
    return (
      <main className="case-not-found">
        <h1>Project not found.</h1>
        <button className="accent-button" onClick={() => onNavigate('/projects')}>
          Back to project lab
        </button>
      </main>
    )
  }

  const previous = projects[(projectIndex - 1 + projects.length) % projects.length]
  const next = projects[(projectIndex + 1) % projects.length]

  const share = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: project.title, url })
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    }
  }

  const metricData =
    project.modelComparison?.map((model) => ({
      label: model.name,
      value: model.metrics?.accuracy,
    })) || []

  return (
    <main className="case-study">
      {/* Hero Header */}
      <section className="case-hero content-width">
        <button className="back-link" onClick={() => onNavigate('/projects')}>
          <ArrowLeft size={16} /> Back to Project Lab
        </button>

        <div className="case-hero-grid">
          <div>
            <p className="overline">
              <Sparkles size={12} className="orange-dot-icon" /> {project.category} / {project.status || 'Engineering Case Study'}
            </p>
            <h1>{project.title}</h1>
            <p className="case-lead">{project.description}</p>

            <div className="case-badges">
              {project.technologies.slice(0, 8).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="case-actions">
              {project.github && (
                <a className="accent-button" href={project.github} target="_blank" rel="noreferrer">
                  GitHub Repository <ExternalLink size={15} />
                </a>
              )}
              {project.liveDemo && (
                <a className="soft-button highlight-demo" href={project.liveDemo} target="_blank" rel="noreferrer">
                  <Globe size={15} /> Launch Live Demo <ExternalLink size={15} />
                </a>
              )}
              <button className="soft-button" onClick={share}>
                {copied ? <><Check size={15} /> Copied URL</> : <><Share2 size={15} /> Share</>}
              </button>
            </div>

            {/* Medical Disclaimer Banner if SmartMed */}
            {project.id === 'smartmed-vision' && (
              <div className="case-disclaimer-banner">
                <ShieldAlert size={18} />
                <div>
                  <strong>Educational &amp; Research Disclaimer:</strong>
                  <span>
                    SmartMed Vision was developed strictly for academic and scientific exploration on RSNA benchmark data. It is not certified as a medical device or clinical diagnostic tool.
                  </span>
                </div>
              </div>
            )}
          </div>

          <ProjectImage project={project} large />
        </div>
      </section>

      {/* Snapshot KPI Bar */}
      <section className="case-snapshot content-width">
        {[
          ['Dataset', project.datasetInfo?.name || project.dataset],
          ['Task', project.task],
          ['Architecture', project.models?.[0] || 'Ensemble Baseline'],
          ['Deployment', project.deployment || 'Code & Notebooks'],
        ]
          .filter((item) => item[1])
          .map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
      </section>

      {/* Case Study Content Layout */}
      <div className="case-layout content-width">
        <aside className="case-sidebar">
          <span className="sidebar-title">Case Study Index</span>
          <a href="#problem">01 · Problem</a>
          <a href="#dataset">02 · Dataset &amp; Scale</a>
          <a href="#preprocessing">03 · Data Processing</a>
          <a href="#models">04 · Models &amp; Backbones</a>
          <a href="#pipeline">05 · Model Pipeline</a>
          <a href="#performance">06 · Evaluation Benchmarks</a>
          <a href="#challenges">07 · Error Analysis</a>
          <a href="#deployment">08 · Deployment Architecture</a>
          <a href="#future">09 · Next Directions</a>
        </aside>

        <div className="case-content">
          {/* 01. Problem */}
          <CaseSection id="problem" number="01" title="Problem Statement &amp; Context">
            <p className="case-copy">{project.overview}</p>
            <div className="case-two-col">
              <OptionalList title="Core Problem Solved" items={project.problem ? [project.problem] : []} />
              <OptionalList title="Technical Objectives" items={project.objectives} />
            </div>
          </CaseSection>

          {/* 02. Dataset */}
          <CaseSection id="dataset" number="02" title="Dataset &amp; Ingestion Scale">
            <div className="dataset-board">
              {Object.entries(project.datasetInfo || {})
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label}>
                    <span>{label.replace(/([A-Z])/g, ' $1')}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
            </div>
          </CaseSection>

          {/* 03. Data Preprocessing */}
          <CaseSection id="preprocessing" number="03" title="Data Preprocessing &amp; Feature Engineering">
            <div className="case-two-col">
              <OptionalList title="Data Preprocessing &amp; Sanitization" items={project.preprocessing} />
              <OptionalList title="Feature Engineering &amp; Embeddings" items={project.featureEngineering} />
            </div>
          </CaseSection>

          {/* 04. Models & Backbones */}
          <CaseSection id="models" number="04" title="Model Architectures Tested">
            <div className="model-grid">
              {(project.models || []).map((model) => (
                <article className="model-card" key={model}>
                  <span>Model Architecture</span>
                  <h3>{model}</h3>
                  <p>Evaluated under standardized cross-validation protocol.</p>
                  <b>Verified Implementation</b>
                </article>
              ))}
            </div>
          </CaseSection>

          {/* 05. Model Pipeline */}
          <CaseSection id="pipeline" number="05" title="End-to-End Model Pipeline">
            <div className="pipeline">
              {(project.pipeline || []).map((step, index) => (
                <div key={step}>
                  <i>{String(index + 1).padStart(2, '0')}</i>
                  <strong>{step}</strong>
                  {index < project.pipeline.length - 1 && <ArrowRight size={15} />}
                </div>
              ))}
            </div>
          </CaseSection>

          {/* 06. Evaluation Benchmarks */}
          <CaseSection id="performance" number="06" title="Verified Evaluation Benchmarks">
            <div className="metric-grid">
              {metrics.map((metric) => (
                <MetricCard key={metric.key} name={metric.label} value={metric.value} unit={metric.unit} />
              ))}
            </div>

            {metricData.length > 0 && (
              <PerformanceChart title="Comparative Model Accuracy (%)" data={metricData} />
            )}

            <div className="comparison-wrap">
              <h3>Model Comparison Matrix</h3>
              {project.modelComparison?.length ? (
                <table>
                  <thead>
                    <tr>
                      <th>Model Architecture</th>
                      <th>Accuracy</th>
                      <th>Precision</th>
                      <th>Recall</th>
                      <th>F1 Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.modelComparison.map((model) => (
                      <tr key={model.name}>
                        <td><strong>{model.name}</strong></td>
                        <td>{model.metrics?.accuracy ? (typeof model.metrics.accuracy === 'number' ? `${(model.metrics.accuracy * 100).toFixed(1)}%` : model.metrics.accuracy) : '--'}</td>
                        <td>{model.metrics?.precision ? (typeof model.metrics.precision === 'number' ? `${(model.metrics.precision * 100).toFixed(1)}%` : model.metrics.precision) : '--'}</td>
                        <td>{model.metrics?.recall ? (typeof model.metrics.recall === 'number' ? `${(model.metrics.recall * 100).toFixed(1)}%` : model.metrics.recall) : '--'}</td>
                        <td>{model.metrics?.f1 ? (typeof model.metrics.f1 === 'number' ? `${(model.metrics.f1 * 100).toFixed(1)}%` : model.metrics.f1) : '--'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="case-empty">Model comparison metrics available in project documentation.</p>
              )}
            </div>

            <div className="case-two-col">
              <OptionalList title="Results &amp; Key Learnings" items={project.results} />
              <OptionalList
                title="Challenges Overcome"
                items={project.challenges?.map((item, index) =>
                  `${item}${project.solutions?.[index] ? ` — ${project.solutions[index]}` : ''}`
                )}
              />
            </div>
          </CaseSection>

          {/* 07. Deployment Architecture */}
          <CaseSection id="deployment" number="07" title="Deployment Architecture &amp; Serving">
            <div className="deployment-specs-card">
              <div className="dep-row">
                <span>Inference Surface:</span>
                <strong>{project.deployment || 'Local Inference & Jupyter Environment'}</strong>
              </div>
              <div className="dep-row">
                <span>Repository:</span>
                <a href={project.github} target="_blank" rel="noreferrer">
                  {project.github || 'Available upon request'}
                </a>
              </div>
              {project.liveDemo && (
                <div className="dep-row highlight">
                  <span>Production Live URL:</span>
                  <a href={project.liveDemo} target="_blank" rel="noreferrer">
                    {project.liveDemo} <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </div>
          </CaseSection>

          {/* 08. Next Directions */}
          <CaseSection id="future" number="08" title="Limitations &amp; Future Engineering Directions">
            <OptionalList title="Next Iterations" items={project.future ? [project.future] : []} />
          </CaseSection>
        </div>
      </div>

      {/* Case Study Pagination */}
      <nav className="case-pagination content-width">
        <button onClick={() => onNavigate(`/projects/${previous.id}`)}>
          <ArrowLeft size={16} /> {previous.title}
        </button>
        <button onClick={() => onNavigate('/projects')}>
          All Projects <Link size={15} />
        </button>
        <button onClick={() => onNavigate(`/projects/${next.id}`)}>
          {next.title} <ArrowRight size={16} />
        </button>
      </nav>
    </main>
  )
}
