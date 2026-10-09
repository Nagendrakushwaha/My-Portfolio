import { useEffect, useState } from 'react'
import { synth } from '../utils/audioSynth'

const SCENES = [
  { id: 'hero', label: '00 // OPENING' },
  { id: 'about', label: '01 // IDENTITY' },
  { id: 'skills', label: '02 // TECH MATRIX' },
  { id: 'projects', label: '03 // SYSTEMS' },
  { id: 'mllab', label: '04 // LIVE LAB' },
  { id: 'analytics', label: '05 // ANALYTICS' },
  { id: 'ask-ai', label: '06 // AI ASSISTANT' },
  { id: 'experience', label: '07 // TIMELINE' },
  { id: 'github', label: '08 // CODEBASES' },
  { id: 'contact', label: '09 // CONTACT' },
]

export function SceneTracker() {
  const [activeScene, setActiveScene] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveScene(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -40% 0px' }
    )

    SCENES.forEach((scene) => {
      const el = document.getElementById(scene.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    synth.playClick()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="scene-tracker-hud" aria-label="Cinematic Scene Navigator">
      <div className="scene-tracker-line" />
      {SCENES.map((scene) => {
        const isActive = activeScene === scene.id
        return (
          <button
            key={scene.id}
            type="button"
            className={`scene-tracker-node ${isActive ? 'active' : ''}`}
            onClick={() => scrollTo(scene.id)}
            onMouseEnter={() => synth.playHover()}
            title={`Jump to ${scene.label}`}
          >
            <span className="scene-dot" />
            <span className="scene-label">{scene.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
