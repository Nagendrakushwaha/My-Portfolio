import { useEffect, useState } from 'react'
import { Terminal, ShieldCheck, Zap } from 'lucide-react'

export function CinematicIntro({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [stepText, setStepText] = useState('INITIALIZING TENSOR CORES...')
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    // Check if intro was already shown this session
    if (sessionStorage.getItem('nk_intro_seen') === 'true') {
      onComplete?.()
      return
    }

    const steps = [
      { at: 15, text: 'MOUNTING NEURAL BACKBONES (PYTORCH & FASTAPI)...' },
      { at: 45, text: 'INDEXING WEIGHTS: RSNA, SROIE, BANKING77, CIC-IDS...' },
      { at: 80, text: 'CONFIGURING GRAD-CAM EXPLAINABILITY PIPELINES...' },
      { at: 100, text: 'TELEMETRY ONLINE // WELCOME TO NAGENDRA.AI' },
    ]

    const startTime = performance.now()
    const duration = 1200 // 1.2s total - fast and snappy

    let frameId
    const update = (now) => {
      const elapsed = now - startTime
      const currentProgress = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(currentProgress)

      const activeStep = steps.find((s) => currentProgress <= s.at) || steps[steps.length - 1]
      setStepText(activeStep.text)

      if (currentProgress < 100) {
        frameId = requestAnimationFrame(update)
      } else {
        setTimeout(() => {
          setIsDone(true)
          sessionStorage.setItem('nk_intro_seen', 'true')
          setTimeout(() => {
            onComplete?.()
          }, 350)
        }, 200)
      }
    }

    frameId = requestAnimationFrame(update)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        cancelAnimationFrame(frameId)
        setIsDone(true)
        sessionStorage.setItem('nk_intro_seen', 'true')
        onComplete?.()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onComplete])

  const skip = () => {
    setIsDone(true)
    sessionStorage.setItem('nk_intro_seen', 'true')
    onComplete?.()
  }

  return (
    <div className={`cinematic-intro-overlay ${isDone ? 'fade-out' : ''}`} aria-hidden="true">
      <div className="intro-container">
        <div className="intro-hud-header">
          <div className="intro-badge">
            <span className="live-dot" />
            <span>NK // TENSOR PROTOCOL V4.2</span>
          </div>
          <button className="intro-skip-btn" onClick={skip}>
            SKIP [ESC]
          </button>
        </div>

        <div className="intro-mark-wrap">
          <div className="intro-hex">
            <span>NK</span>
          </div>
          <div className="intro-scanlines" />
        </div>

        <h1 className="intro-title">NAGENDRA KUSHWAHA</h1>
        <p className="intro-subtitle">AI/ML ENGINEER &amp; DATA SCIENTIST</p>

        <div className="intro-progress-box">
          <div className="intro-progress-bar" style={{ width: `${progress}%` }} />
        </div>

        <div className="intro-footer-telemetry">
          <span className="intro-step-text">{stepText}</span>
          <span className="intro-percent">{progress}%</span>
        </div>
      </div>
    </div>
  )
}
