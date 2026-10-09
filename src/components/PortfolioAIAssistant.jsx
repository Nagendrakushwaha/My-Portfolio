import { useState, useRef, useEffect } from 'react'
import { Bot, Send, Sparkles, User, ExternalLink, ArrowRight, CornerDownRight } from 'lucide-react'
import { projects } from '../data/projects'
import { portfolio } from '../data/portfolio'
import { synth } from '../utils/audioSynth'

const SUGGESTED_PROMPTS = [
  'Which projects use Deep Learning?',
  'Show me your Computer Vision projects.',
  'Which project has a live demo?',
  'What is your highest accuracy model?',
  'Tell me about ShopEase conversational AI.',
  'What are your education and internship credentials?',
  'Show me your Generative AI & RAG work.',
]

function answerQuery(queryText, onNavigate) {
  const q = queryText.toLowerCase()

  // 1. Live demo
  if (q.includes('live demo') || q.includes('deployed') || q.includes('try online') || q.includes('working demo')) {
    const liveProj = projects.find((p) => p.liveDemo)
    return {
      text: `ShopEase — Customer Support Conversational AI has a verified live deployment hosted on Render. It features Banking77 intent classification, policy RAG over 102 vector chunks, and real-time prompt-injection defense.`,
      projects: liveProj ? [liveProj] : [],
      source: 'Verified Project Data (projects.js)',
    }
  }

  // 2. Computer Vision
  if (q.includes('computer vision') || q.includes('vision') || q.includes('image') || q.includes('x-ray') || q.includes('receipt') || q.includes('sroie')) {
    const cvProjs = projects.filter((p) => p.categories.includes('Computer Vision') || p.technologies.includes('Computer Vision'))
    return {
      text: `Nagendra has 2 dedicated Computer Vision projects:\n1. SmartMed Vision: Explainable pneumonia detection on RSNA chest X-rays using EfficientNet-B0 (93.60% accuracy, 0.9562 ROC-AUC) with Grad-CAM localization (educational/research use only).\n2. Cognivision AI: Multimodal receipt intelligence on the ICDAR SROIE benchmark combining OCR token bounding boxes and MobileNetV3-Small (36.29% real test accuracy, 16.26% Macro F1), CPU-optimized for AMD Ryzen 5 5500U.`,
      projects: cvProjs,
      source: 'Computer Vision Project Registry',
    }
  }

  // 3. Deep Learning
  if (q.includes('deep learning') || q.includes('pytorch') || q.includes('cnn') || q.includes('neural network') || q.includes('resnet') || q.includes('efficientnet')) {
    const dlProjs = projects.filter((p) => p.categories.includes('Deep Learning') || p.technologies.includes('PyTorch'))
    return {
      text: `Nagendra has implemented multiple Deep Learning architectures using PyTorch:\n• EfficientNet-B0, ResNet-18, MobileNetV3-Small for medical radiography (SmartMed Vision)\n• CogniNet-CNN & MobileNetV3-Small for document intelligence (Cognivision AI)\n• Sequence-to-Sequence neural machine translation for English-to-Hindi Devanagari text processing.`,
      projects: dlProjs,
      source: 'PyTorch Model Registry',
    }
  }

  // 4. GenAI / RAG / LLM
  if (q.includes('genai') || q.includes('generative ai') || q.includes('rag') || q.includes('llm') || q.includes('prompt') || q.includes('intent')) {
    const genAiProjs = projects.filter((p) => p.categories.includes('Generative AI') || p.technologies.includes('RAG'))
    return {
      text: `Nagendra's primary Generative AI & NLP system is ShopEase — an enterprise conversational AI agent built with FastAPI and React. It features:\n• Banking77 Intent Classification: 88.72% test accuracy & 88.76% Macro F1 across 77 classes\n• Policy RAG: 14 documents indexed into 102 vector chunks\n• Safety Guardrails: Prompt-injection filtering, PII/credential masking, and confidence-based human escalation.`,
      projects: genAiProjs,
      source: 'Generative AI Project Registry',
    }
  }

  // 5. Best / Highest accuracy
  if (q.includes('highest accuracy') || q.includes('best model') || q.includes('strongest') || q.includes('top model') || q.includes('benchmark')) {
    return {
      text: `Here are Nagendra's top verified model benchmarks across domains:\n1. NIDS Network Intrusion: 99.6% classification accuracy on 2M+ CIC-IDS2017 flow records (XGBoost/LightGBM).\n2. SmartMed Vision: 93.60% accuracy and 0.9562 ROC-AUC on the RSNA Pneumonia challenge (EfficientNet-B0).\n3. ShopEase AI: 88.72% test accuracy and 88.76% Macro F1 across 77 intent classes (Banking77).\n4. Spam Detection: 98% test accuracy (TF-IDF + Naive Bayes).\nAll metrics are verified from genuine project datasets without synthetic inflation.`,
      projects: [projects[2], projects[0], projects[3]],
      source: 'Verified Benchmark Metrics',
    }
  }

  // 6. ShopEase specific
  if (q.includes('shopease')) {
    const p = projects.find((item) => item.id === 'shopease')
    return {
      text: `ShopEase is a customer support conversational AI built with FastAPI and React.\n• Benchmark: Banking77 (88.72% test accuracy, 88.76% Macro F1, 77 intent classes)\n• Knowledge Base: 14 policy documents split into 102 vector embeddings\n• Defenses: Prompt injection blocking, credential masking, human escalation\n• Deployed live on Render.`,
      projects: p ? [p] : [],
      source: 'ShopEase Case Study',
    }
  }

  // 7. Education & Experience
  if (q.includes('education') || q.includes('college') || q.includes('university') || q.includes('internship') || q.includes('experience') || q.includes('cgpa') || q.includes('mentor')) {
    return {
      text: `Academic & Professional Experience for Nagendra Kushwaha:\n• Degree: B.Tech in Computer Science Engineering at Sam Global University, Bhopal (CGPA: 7.85 / 10, 3rd Year / 6th Semester).\n• Data Analytics Intern at UptoSkill (Dec 2025 — Mar 2026): Python, SQL, data analytics and visualization.\n• Data Science Mentor at Internship Catalyst (Currently Active): Guiding learners in technical problem solving and ML projects.\n• Virtual Experience Program at BCG: Applied business analytics and data-driven problem solving.`,
      projects: [],
      source: 'Verified Portfolio & Resume Data',
    }
  }

  // 8. Tech Stack
  if (q.includes('technolog') || q.includes('skill') || q.includes('stack') || q.includes('tools') || q.includes('python')) {
    return {
      text: `Nagendra's core technical stack includes:\n• Languages: Python (Core), SQL (Core)\n• Machine Learning: Scikit-learn, XGBoost, LightGBM, CatBoost, Feature Engineering\n• Deep Learning & Vision: PyTorch, CNNs, ResNet, EfficientNet, MobileNetV3, Grad-CAM\n• NLP & GenAI: Transformers, RAG, Intent Classification, Prompt Engineering, Sentence Embeddings\n• APIs & Frontend: FastAPI, React, Streamlit, Git, VS Code.`,
      projects: [],
      source: 'Skills Architecture (skills.js)',
    }
  }

  // 9. SmartMed Vision
  if (q.includes('smartmed') || q.includes('pneumonia') || q.includes('medical')) {
    const p = projects.find((item) => item.id === 'smartmed-vision')
    return {
      text: `SmartMed Vision is an explainable deep learning project for pneumonia detection on the RSNA Pneumonia Detection Challenge.\n• Best Model: EfficientNet-B0 achieving 93.60% accuracy and 0.9562 ROC-AUC\n• Explainability: Grad-CAM attention heatmaps verified against ground-truth radiologist bounding boxes\n• Safety: Strictly an educational and academic research study; not certified for clinical diagnostic use.`,
      projects: p ? [p] : [],
      source: 'SmartMed Case Study',
    }
  }

  // Fallback keyword search
  const matched = projects.filter((p) =>
    p.title.toLowerCase().includes(q) ||
    p.technologies.some((t) => t.toLowerCase().includes(q)) ||
    p.description.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  )

  if (matched.length > 0) {
    return {
      text: `Found ${matched.length} project${matched.length > 1 ? 's' : ''} matching "${queryText}": ${matched.map((m) => m.title).join(', ')}. Click below to inspect their full engineering case studies.`,
      projects: matched.slice(0, 3),
      source: 'Project Database Match',
    }
  }

  return {
    text: `Nagendra is an AI/ML Engineer and Data Scientist specializing in Machine Learning, Deep Learning, Computer Vision, and Generative AI (RAG & NLP). Try asking about his Deep Learning models, ShopEase Live Demo, RSNA Pneumonia detection, or internship experience!`,
    projects: [projects[0], projects[1], projects[2]],
    source: 'General Portfolio Index',
  }
}

export function PortfolioAIAssistant({ onNavigate }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Hello! I am Nagendra's Portfolio Intelligence Assistant. I am directly connected to the verified project architectures, evaluation metrics, and technical experience in this portfolio.\n\nHow can I help you explore his work today?`,
      projects: [],
      source: 'Portfolio Knowledge Engine',
    },
  ])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking])

  const handleSend = (textToSend) => {
    const query = textToSend || input
    if (!query.trim()) return

    const userMsg = { role: 'user', text: query.trim() }
    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInput('')
    setIsThinking(true)

    // Simulate instant local neural retrieval
    setTimeout(() => {
      const response = answerQuery(query, onNavigate)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: response.text,
          projects: response.projects,
          source: response.source,
        },
      ])
      setIsThinking(false)
    }, 380)
  }

  return (
    <section className="ask-ai-section content-width" id="ask-ai">
      <div className="section-title">
        <span className="section-number">08</span>
        <div>
          <h2>Ask My Portfolio</h2>
          <p>Local AI assistant grounded strictly in verified project data, real model benchmarks, and technical milestones.</p>
        </div>
      </div>

      <div className="ask-ai-container">
        {/* Suggested Prompt Chips */}
        <div className="ask-ai-prompts">
          <span className="prompts-label">
            <Sparkles size={13} /> Quick Prompts:
          </span>
          <div className="prompts-list">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                className="prompt-chip"
                onMouseEnter={() => synth.playHover()}
                onClick={() => {
                  synth.playClick()
                  handleSend(prompt)
                }}
                disabled={isThinking}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="ask-ai-chat-window">
          <div className="ask-ai-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.role}`}>
                <div className="message-avatar">
                  {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    <p>{msg.text}</p>
                    {msg.projects && msg.projects.length > 0 && (
                      <div className="message-projects-grid">
                        {msg.projects.filter(Boolean).map((p) => (
                          <div key={p.id} className="message-project-card">
                            <div>
                              <strong>{p.title}</strong>
                              <span>{p.category} · {p.status}</span>
                            </div>
                            <button
                              className="chat-project-link"
                              onClick={() => onNavigate(`/projects/${p.id}`)}
                            >
                              Case Study <ArrowRight size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {msg.source && <small className="message-source">Source: {msg.source}</small>}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="chat-message assistant thinking">
                <div className="message-avatar">
                  <Bot size={18} />
                </div>
                <div className="message-content">
                  <div className="message-bubble typing-bubble">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            className="ask-ai-input-form"
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
          >
            <input
              type="text"
              placeholder="Ask anything about projects, model accuracy, datasets, or technologies..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isThinking}
            />
            <button type="submit" disabled={!input.trim() || isThinking} aria-label="Send query">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
