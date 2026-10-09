import { useEffect, useState, useRef } from 'react'
import { Sparkles, Play, X, Volume2, ArrowRight } from 'lucide-react'
import { synth } from '../utils/audioSynth'

export function TheatricalCurtainOpening({ isOpen, onComplete }) {
  const [stage, setStage] = useState('closed') // 'closed' | 'opening' | 'opened'
  const [countdown, setCountdown] = useState(100)
  const timerRef = useRef(null)
  const animFrameRef = useRef(null)

  // Start sequence when opened
  useEffect(() => {
    if (!isOpen) {
      setStage('opened')
      return
    }

    setStage('closed')
    setCountdown(100)

    // Auto-countdown to open automatically like a cinema screening
    const startTime = performance.now()
    const autoDuration = 2400 // 2.4 seconds auto-open

    const updateTimer = (now) => {
      const elapsed = now - startTime
      const remaining = Math.max(0, 100 - (elapsed / autoDuration) * 100)
      setCountdown(remaining)

      if (remaining > 0) {
        animFrameRef.current = requestAnimationFrame(updateTimer)
      } else {
        handleOpen()
      }
    }

    animFrameRef.current = requestAnimationFrame(updateTimer)

    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        handleOpen()
      } else if (e.key === 'Escape') {
        handleSkip()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (timerRef.current) clearTimeout(timerRef.current)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleOpen = () => {
    if (stage !== 'closed') return
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    setStage('opening')
    synth.playCurtainOpen()

    timerRef.current = setTimeout(() => {
      setStage('opened')
      onComplete?.()
    }, 1600) // 1.6s curtain draw duration
  }

  const handleSkip = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    if (timerRef.current) clearTimeout(timerRef.current)
    setStage('opened')
    onComplete?.()
  }

  if (stage === 'opened' && !isOpen) {
    return null
  }

  return (
    <div
      className={`theatrical-curtain-stage ${stage === 'opening' ? 'is-opening' : ''} ${
        stage === 'opened' ? 'is-opened' : ''
      }`}
      aria-hidden={stage === 'opened'}
    >
      {/* Top Pelmet / Valance Drapery Header */}
      <div className="curtain-pelmet">
        <div className="pelmet-fringe" />
        <div className="pelmet-crest-tape">
          <span className="pelmet-text">NAGENDRA KUSHWAHA · PORTFOLIO PREMIERE · AI &amp; ML ARCHITECT · 2026</span>
        </div>
      </div>

      {/* Left Curtain Panel with Realistic Fabric Drape Pleats */}
      <div className="curtain-panel curtain-panel-left">
        <div className="curtain-fabric">
          <div className="curtain-pleat pleat-1" />
          <div className="curtain-pleat pleat-2" />
          <div className="curtain-pleat pleat-3" />
          <div className="curtain-pleat pleat-4" />
          <div className="curtain-pleat pleat-5" />
          <div className="curtain-pleat pleat-6" />
          <div className="curtain-pleat pleat-7" />
          <div className="curtain-pleat pleat-8" />
        </div>
        <div className="curtain-trim gold-trim-right" />
        <div className="curtain-cord cord-left">
          <div className="cord-tassel" />
        </div>
      </div>

      {/* Right Curtain Panel with Realistic Fabric Drape Pleats */}
      <div className="curtain-panel curtain-panel-right">
        <div className="curtain-fabric">
          <div className="curtain-pleat pleat-1" />
          <div className="curtain-pleat pleat-2" />
          <div className="curtain-pleat pleat-3" />
          <div className="curtain-pleat pleat-4" />
          <div className="curtain-pleat pleat-5" />
          <div className="curtain-pleat pleat-6" />
          <div className="curtain-pleat pleat-7" />
          <div className="curtain-pleat pleat-8" />
        </div>
        <div className="curtain-trim gold-trim-left" />
        <div className="curtain-cord cord-right">
          <div className="cord-tassel" />
        </div>
      </div>

      {/* Skip Button Top Right */}
      <div className="curtain-controls-bar">
        <div className="curtain-badge">
          <span className="curtain-pulse-dot" />
          <span>CINEMATIC ARCHITECTURE // V4.2</span>
        </div>
        <button
          type="button"
          className="curtain-skip-button"
          onClick={handleSkip}
          title="Skip Intro (Escape)"
        >
          <span>SKIP [ESC]</span>
          <X size={13} />
        </button>
      </div>

      {/* Center Theatrical Seal / Interactive Crest */}
      <div className="curtain-center-stage">
        <div className="center-crest-medallion" onClick={handleOpen} title="Click to open the curtain and enter">
          {/* Minimal clean decorative halo ring (no text on or surrounding the image) */}
          <div className="crest-celestial-ring" aria-hidden="true" />

          <div className="crest-inner-disc">
            <img
              src="/profile.png"
              alt="Nagendra Kushwaha — AI/ML Engineer & Data Scientist"
              className="crest-portrait-img"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        </div>

        {/* Written Prominently Below the Image */}
        <div className="curtain-narrative">
          <span className="narrative-eyebrow">
            <Sparkles size={13} className="eyebrow-icon" />
            THE CINEMATIC AI EXPERIENCE
          </span>
          <h1 className="narrative-title">NAGENDRA KUSHWAHA</h1>
          <p className="narrative-role">AI / ML ENGINEER &amp; DATA SCIENTIST</p>


          <div className="curtain-proof-pills">
            <span className="proof-pill pill-azure">UptoSkill Intern</span>
            <span className="proof-pill pill-flame">Catalyst Mentor</span>
          </div>

          <p className="narrative-credo">
            &ldquo;Architecting production-ready AI systems with mathematically grounded foundations, explainable vision &amp; resilient APIs.&rdquo;
          </p>
        </div>

        {/* Big Interactive Action Button */}
        <div className="curtain-action-zone">
          <button
            type="button"
            className="curtain-draw-button"
            onClick={handleOpen}
            onMouseEnter={() => synth.playHover()}
          >
            <span className="button-icon-wrap">
              <Play size={15} fill="currentColor" />
            </span>
            <span className="button-text">DRAW CURTAINS &amp; ENTER</span>
            <ArrowRight size={15} className="button-arrow" />
          </button>

          <div className="curtain-auto-indicator">
            <div className="auto-bar-track">
              <div className="auto-bar-fill" style={{ width: `${countdown}%` }} />
            </div>
            <span className="auto-text">Auto-opening in {Math.ceil((countdown / 100) * 2.4)}s · Click anywhere to enter</span>
          </div>
        </div>
      </div>

      {/* Dramatic Backlight Reveal Flare (illuminates when curtains part) */}
      <div className="curtain-backlight-flare" />
    </div>
  )
}
