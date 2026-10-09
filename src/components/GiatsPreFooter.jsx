import { useState, useRef } from 'react'
import { portfolio } from '../data/portfolio'
import { AppearTitle } from './motion/AppearTitle'
import { ButtonLink } from './motion/ButtonLink'
import { synth } from '../utils/audioSynth'
import { Sparkles, Cpu, Layers, Terminal, Database, Activity, Code2 } from 'lucide-react'

const TECH_STAMP_LIST = [
  { name: 'PyTorch', icon: '🔥', role: 'Deep Learning' },
  { name: 'FastAPI', icon: '⚡', role: 'Production Serving' },
  { name: 'Transformers', icon: '🤖', role: 'LLMs & NLP' },
  { name: 'Computer Vision', icon: '👁️', role: 'OCR & ResNet' },
  { name: 'Python', icon: '🐍', role: 'Core ML Architecture' },
  { name: 'Scikit-Learn', icon: '📊', role: 'Ensemble Models' },
  { name: 'RAG & Vectors', icon: '🔍', role: 'Policy Retrieval' },
  { name: 'Docker', icon: '🐳', role: 'Containerization' },
]

export function GiatsPreFooter({ onNavigate }) {
  const [activeStamp, setActiveStamp] = useState(null)
  const [stampsState, setStampsState] = useState(
    TECH_STAMP_LIST.map((item, idx) => ({
      ...item,
      id: idx,
      rotation: ((idx % 5) - 2) * 4,
      sliced: false,
    }))
  )

  const handleStampHover = (idx) => {
    synth.playHover()
    setActiveStamp(idx)
  }

  const handleStampSlice = (idx) => {
    synth.playClick()
    setStampsState((prev) =>
      prev.map((s) => (s.id === idx ? { ...s, sliced: !s.sliced } : s))
    )
  }

  return (
    <section className="giats-prefooter-root" id="prefooter">
      <div className="giats-prefooter-inner">
        {/* Top Eyebrow */}
        <div className="prefooter-eyebrow">
          <Sparkles size={14} className="prefooter-sparkle" />
          <span>COLLABORATION &amp; ENGINEERING HORIZON</span>
        </div>

        {/* Big Bold Headline */}
        <div className="prefooter-heading-wrap">
          <AppearTitle>
            <h2 className="prefooter-h1">Let&apos;s engineer your</h2>
            <h2 className="prefooter-h1 prefooter-highlight">next intelligent system</h2>
            <h2 className="prefooter-h1">together!</h2>
          </AppearTitle>
        </div>

        <AppearTitle>
          <p className="prefooter-subtitle">
            From mathematically grounded loss calibration to high-throughput REST APIs and explainable computer vision — let&apos;s turn ambitious machine learning concepts into verified, production-ready architectures.
          </p>
        </AppearTitle>

        {/* Interactive Interactive Tech Slice Playground (Inspired by Giats interactive pre-footer) */}
        <div className="prefooter-interactive-canvas">
          <div className="canvas-header">
            <span className="canvas-header-dot" />
            <small>INTERACTIVE TECH STACK MATRIX &middot; HOVER OR CLICK TO ENGAGE</small>
          </div>

          <div className="prefooter-stamps-grid">
            {stampsState.map((stamp) => (
              <div
                key={stamp.id}
                className={`prefooter-stamp ${stamp.sliced ? 'is-sliced' : ''} ${
                  activeStamp === stamp.id ? 'is-active' : ''
                }`}
                style={{ transform: `rotate(${stamp.rotation}deg)` }}
                onMouseEnter={() => handleStampHover(stamp.id)}
                onClick={() => handleStampSlice(stamp.id)}
                title="Click to interact"
              >
                <div className="stamp-inner">
                  <span className="stamp-icon">{stamp.icon}</span>
                  <div className="stamp-meta">
                    <strong>{stamp.name}</strong>
                    <small>{stamp.role}</small>
                  </div>
                </div>
                {stamp.sliced && <span className="stamp-cut-line" />}
              </div>
            ))}
          </div>
        </div>

        {/* Action Button Row */}
        <div className="prefooter-actions">
          <ButtonLink
            href={`mailto:${portfolio.personal.email}`}
            label="START A CONVERSATION"
          />

          <ButtonLink
            href="/projects"
            label="EXPLORE PRODUCTION LAB"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault()
                onNavigate('/projects')
              }
            }}
          />
        </div>
      </div>
    </section>
  )
}
