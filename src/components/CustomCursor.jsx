import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [cursorText, setCursorText] = useState('')
  const [cursorActive, setCursorActive] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let rafId

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) setVisible(true)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }

      // Check for hover target attributes
      const target = e.target.closest('[data-cursor], a, button, .interactive, .project-card, .repo-card, .metric-tile')
      if (target) {
        const text = target.getAttribute('data-cursor') || ''
        setCursorText(text)
        setCursorActive(true)
      } else {
        setCursorText('')
        setCursorActive(false)
      }
    }

    const onMouseLeave = () => {
      setVisible(false)
    }

    const onMouseEnter = () => {
      setVisible(true)
    }

    const animateRing = () => {
      // Smooth lerp trailing physics
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }

      rafId = requestAnimationFrame(animateRing)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    rafId = requestAnimationFrame(animateRing)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(rafId)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div className="cinematic-cursor-layer" aria-hidden="true">
      <div ref={dotRef} className={`cursor-dot ${cursorActive ? 'dot-active' : ''}`} />
      <div
        ref={ringRef}
        className={`cursor-ring ${cursorActive ? 'ring-active' : ''} ${cursorText ? 'ring-has-text' : ''}`}
      >
        {cursorText && <span className="cursor-label">{cursorText}</span>}
      </div>
    </div>
  )
}
