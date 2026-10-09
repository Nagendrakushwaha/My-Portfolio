import { useMemo, useState } from 'react'
import { Activity, BarChart3, Database, Layers, PieChart, ShieldCheck } from 'lucide-react'
import { projects } from '../data/projects'
import { synth } from '../utils/audioSynth'

export function EngineeringAnalytics() {
  const [activeMetricTab, setActiveMetricTab] = useState('distribution')

  // Calculate genuine statistics dynamically from the actual projects array
  const stats = useMemo(() => {
    const total = projects.length
    const mlCount = projects.filter((p) => (p.categories || []).includes('Machine Learning')).length
    const dlCount = projects.filter((p) => (p.categories || []).includes('Deep Learning')).length
    const cvCount = projects.filter((p) => (p.categories || []).includes('Computer Vision')).length
    const nlpCount = projects.filter((p) => (p.categories || []).includes('NLP')).length
    const genAiCount = projects.filter((p) => (p.categories || []).includes('Generative AI')).length
    const dsCount = projects.filter((p) => (p.categories || []).includes('Data Science')).length
    const deployedCount = projects.filter((p) => p.deployment && p.deployment !== 'None').length

    // Technology counts
    const techMap = {}
    projects.forEach((p) => {
      ;(p.technologies || []).forEach((t) => {
        techMap[t] = (techMap[t] || 0) + 1
      })
    })

    const topTech = Object.entries(techMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count]) => ({ name, count, percent: Math.round((count / total) * 100) }))

    // Verified Benchmark Leaderboard
    const benchmarks = [
      { project: 'NIDS Network Intrusion', model: 'XGBoost / LightGBM', dataset: 'CIC-IDS2017 (2M+ rows)', metric: '99.6% Accuracy', value: 0.996 },
      { project: 'SmartMed Vision', model: 'EfficientNet-B0', dataset: 'RSNA Pneumonia Challenge', metric: '93.60% Acc (0.9562 AUC)', value: 0.936 },
      { project: 'Spam Detection', model: 'Multinomial Naive Bayes', dataset: 'SMS Spam Collection', metric: '98.0% Accuracy', value: 0.980 },
      { project: 'ShopEase Conversational AI', model: 'Banking77 Classifier', dataset: 'Banking77 (77 Intents)', metric: '88.72% Acc (88.76% F1)', value: 0.8872 },
      { project: 'Credit Card Fraud', model: 'Logistic Regression / RF', dataset: 'Credit Card Transactions', metric: '86.0% Accuracy', value: 0.860 },
      { project: 'Cognivision AI (Uncurated Test)', model: 'MobileNetV3-Small', dataset: 'ICDAR SROIE Benchmark', metric: '36.29% Acc (16.26% F1)', value: 0.3629 },
    ]

    return {
      total,
      mlCount,
      dlCount,
      cvCount,
      nlpCount,
      genAiCount,
      dsCount,
      deployedCount,
      topTech,
      benchmarks,
      domains: [
        { label: 'Machine Learning', count: mlCount, percent: Math.round((mlCount / total) * 100) },
        { label: 'Deep Learning', count: dlCount, percent: Math.round((dlCount / total) * 100) },
        { label: 'Computer Vision', count: cvCount, percent: Math.round((cvCount / total) * 100) },
        { label: 'NLP / Language', count: nlpCount, percent: Math.round((nlpCount / total) * 100) },
        { label: 'Generative AI', count: genAiCount, percent: Math.round((genAiCount / total) * 100) },
        { label: 'Data Science', count: dsCount, percent: Math.round((dsCount / total) * 100) },
      ],
    }
  }, [])

  return (
    <section className="analytics-section content-width" id="analytics">
      <div className="section-title">
        <span className="section-number">07</span>
        <div>
          <h2>Engineering Analytics</h2>
          <p>Real-time telemetry and project distribution derived directly from the active project dataset.</p>
        </div>
      </div>

      {/* Top Telemetry KPI Cards */}
      <div className="analytics-kpi-grid">
        <div className="analytics-kpi-card">
          <span className="kpi-label">Total Engineering Projects</span>
          <strong className="kpi-value">{stats.total}</strong>
          <small className="kpi-sub">Across ML, DL, CV, NLP &amp; GenAI</small>
        </div>
        <div className="analytics-kpi-card highlight">
          <span className="kpi-label">Production Deployments</span>
          <strong className="kpi-value">{stats.deployedCount}</strong>
          <small className="kpi-sub">FastAPI, React, Streamlit &amp; Render</small>
        </div>
        <div className="analytics-kpi-card">
          <span className="kpi-label">Deep Learning &amp; Vision</span>
          <strong className="kpi-value">{stats.dlCount}</strong>
          <small className="kpi-sub">PyTorch, EfficientNet, MobileNet, CNNs</small>
        </div>
        <div className="analytics-kpi-card">
          <span className="kpi-label">NLP &amp; Conversational AI</span>
          <strong className="kpi-value">{stats.nlpCount}</strong>
          <small className="kpi-sub">Banking77, 102 Vector Chunks, RAG</small>
        </div>
      </div>

      {/* Detailed Analytics Panel */}
      <div className="analytics-dashboard-panel">
        <div className="dashboard-nav-tabs">
          <button
            className={`dash-tab ${activeMetricTab === 'distribution' ? 'active' : ''}`}
            onMouseEnter={() => synth.playHover()}
            onClick={() => {
              synth.playClick()
              setActiveMetricTab('distribution')
            }}
          >
            <PieChart size={15} />
            <span>Domain Distribution</span>
          </button>
          <button
            className={`dash-tab ${activeMetricTab === 'tech' ? 'active' : ''}`}
            onMouseEnter={() => synth.playHover()}
            onClick={() => {
              synth.playClick()
              setActiveMetricTab('tech')
            }}
          >
            <Layers size={15} />
            <span>Tech Stack Adoption</span>
          </button>
          <button
            className={`dash-tab ${activeMetricTab === 'benchmarks' ? 'active' : ''}`}
            onMouseEnter={() => synth.playHover()}
            onClick={() => {
              synth.playClick()
              setActiveMetricTab('benchmarks')
            }}
          >
            <Activity size={15} />
            <span>Evaluation Benchmarks</span>
          </button>
        </div>

        <div className="dashboard-content-body">
          {/* Domain Distribution */}
          {activeMetricTab === 'distribution' && (
            <div className="dash-chart-grid">
              <div className="chart-bars-list">
                {stats.domains.map((item) => (
                  <div key={item.label} className="analytics-bar-row">
                    <div className="bar-meta">
                      <strong>{item.label}</strong>
                      <span>{item.count} projects ({item.percent}%)</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="analytics-info-box">
                <h4>System Architecture Balance</h4>
                <p>
                  Nagendra&apos;s portfolio spans classical structured predictive modeling (CIC-IDS2017, credit fraud, sales forecasting), modern deep computer vision (RSNA X-rays, SROIE receipts), and modern Generative AI &amp; RAG architectures.
                </p>
                <div className="integrity-note">
                  <ShieldCheck size={16} />
                  <span>Metrics are 100% computed from verified project data files without artificial inflation.</span>
                </div>
              </div>
            </div>
          )}

          {/* Tech Stack Adoption */}
          {activeMetricTab === 'tech' && (
            <div className="dash-chart-grid">
              <div className="chart-bars-list">
                {stats.topTech.map((item) => (
                  <div key={item.name} className="analytics-bar-row">
                    <div className="bar-meta">
                      <strong>{item.name}</strong>
                      <span>Used in {item.count} projects ({item.percent}%)</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill accent" style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="analytics-info-box">
                <h4>Primary Toolkit Integration</h4>
                <p>
                  Python forms the fundamental backbone across data processing, machine learning experiments, and API backends, complemented by PyTorch for deep vision models, Scikit-learn for classical baselines, and FastAPI for production inference serving.
                </p>
              </div>
            </div>
          )}

          {/* Verified Evaluation Benchmarks */}
          {activeMetricTab === 'benchmarks' && (
            <div className="benchmarks-table-wrap">
              <table className="analytics-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Model Architecture</th>
                    <th>Benchmark Dataset</th>
                    <th>Verified Test Result</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.benchmarks.map((row) => (
                    <tr key={row.project}>
                      <td><strong>{row.project}</strong></td>
                      <td><code>{row.model}</code></td>
                      <td>{row.dataset}</td>
                      <td><span className="metric-pill">{row.metric}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
