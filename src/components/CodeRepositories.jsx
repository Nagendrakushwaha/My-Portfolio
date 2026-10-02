import { Code2, ExternalLink, GitBranch, GitFork, Star } from 'lucide-react'
import { portfolio } from '../data/portfolio'

const REPOSITORIES = [
  {
    name: 'customer_support_AI',
    owner: 'Nagendrakushwaha',
    description: 'ShopEase Conversational AI: FastAPI, React, Banking77 intent engine (88.72% test accuracy), 102 vector chunks, prompt injection defense.',
    url: 'https://github.com/Nagendrakushwaha/customer_support_AI',
    language: 'Python',
    topics: ['nlp', 'rag', 'fastapi', 'react', 'banking77', 'guardrails'],
    stars: 'Public',
    branch: 'main',
  },
  {
    name: 'Cognivision-AI',
    owner: 'Nagendrakushwaha',
    description: 'Multimodal Document Intelligence: ICDAR SROIE receipt token extraction, MobileNetV3-Small & CogniNet-CNN, Grad-CAM, CPU optimized.',
    url: 'https://github.com/Nagendrakushwaha/Cognivision-AI',
    language: 'Python / PyTorch',
    topics: ['computer-vision', 'document-ai', 'pytorch', 'grad-cam', 'ocr'],
    stars: 'Public',
    branch: 'main',
  },
  {
    name: 'SiperVision_medicalVision',
    owner: 'Nagendrakushwaha',
    description: 'SmartMed Vision: Explainable pneumonia detection on RSNA chest X-rays. EfficientNet-B0 (93.60% accuracy, 0.9562 AUC) with Grad-CAM.',
    url: 'https://github.com/Nagendrakushwaha/SiperVision_medicalVision',
    language: 'Python / PyTorch',
    topics: ['medical-ai', 'deep-learning', 'rsna', 'grad-cam', 'fastapi'],
    stars: 'Public',
    branch: 'main',
  },
  {
    name: 'AI-Powered-Network-Intrusion-Detection-System',
    owner: 'Nagendrakushwa',
    description: 'End-to-end multi-class intrusion detection on 2M+ CIC-IDS2017 rows with XGBoost, LightGBM, and interactive Streamlit deployment.',
    url: 'https://github.com/Nagendrakushwa/AI-Powered-Network-Intrusion-Detection-System',
    language: 'Python',
    topics: ['machine-learning', 'cybersecurity', 'xgboost', 'streamlit', 'cic-ids2017'],
    stars: 'Public',
    branch: 'main',
  },
  {
    name: 'coadsoft_task3',
    owner: 'Nagendrakushwaha',
    description: 'Credit Card Fraud Detection using imbalanced classification techniques, feature engineering, and model evaluation.',
    url: 'https://github.com/Nagendrakushwaha/coadsoft_task3/blob/main/task%203%20ml%20project.ipynb',
    language: 'Jupyter Notebook',
    topics: ['data-science', 'imbalanced-learning', 'fraud-detection', 'scikit-learn'],
    stars: 'Public',
    branch: 'main',
  },
  {
    name: 'Spam_detection',
    owner: 'Nagendrakushwa',
    description: 'SMS spam text classification pipeline with NLP preprocessing, TF-IDF extraction, and 98% test accuracy.',
    url: 'https://github.com/Nagendrakushwa/Spam_detection',
    language: 'Python',
    topics: ['nlp', 'text-classification', 'scikit-learn'],
    stars: 'Public',
    branch: 'main',
  },
]

export function CodeRepositories() {
  return (
    <section className="github-section content-width" id="github">
      <div className="section-title">
        <span className="section-number">10</span>
        <div>
          <h2>Open Source &amp; Codebases</h2>
          <p>Direct access to verified GitHub repositories, model implementations, and API services.</p>
        </div>
      </div>

      <div className="repos-grid">
        {REPOSITORIES.map((repo) => (
          <article key={repo.name} className="repo-card">
            <div className="repo-top">
              <div className="repo-title-wrap">
                <Code2 size={16} className="repo-icon" />
                <a href={repo.url} target="_blank" rel="noreferrer" className="repo-name">
                  {repo.owner}/<strong>{repo.name}</strong>
                </a>
              </div>
              <span className="repo-badge">{repo.stars}</span>
            </div>

            <p className="repo-desc">{repo.description}</p>

            <div className="repo-topics">
              {repo.topics.map((t) => (
                <span key={t} className="repo-topic-pill">
                  #{t}
                </span>
              ))}
            </div>

            <div className="repo-footer">
              <div className="repo-meta-left">
                <span className="repo-lang-dot" />
                <small>{repo.language}</small>
                <span className="repo-branch">
                  <GitBranch size={12} /> {repo.branch}
                </span>
              </div>
              <a href={repo.url} target="_blank" rel="noreferrer" className="repo-link">
                View Code <ExternalLink size={13} />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="github-profile-cta">
        <div>
          <strong>Explore more on GitHub</strong>
          <p>Browse additional experiments, notebooks, and learning repositories.</p>
        </div>
        <a
          href={portfolio.personal.github}
          target="_blank"
          rel="noreferrer"
          className="accent-button"
        >
          github.com/Nagendrakushwaha <ExternalLink size={15} />
        </a>
      </div>
    </section>
  )
}
