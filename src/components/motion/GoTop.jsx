import { useRef, useCallback } from 'react'
import { Arrow } from './Arrow'
import { synth } from '../../utils/audioSynth'

export function GoTop() {
  const buttonRef = useRef(null)
  const spanRef = useRef(null)

  const scrollToTop = useCallback(() => {
    synth.playClick()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const handleMouseEnter = useCallback((e) => {
    synth.playHover()
    const button = buttonRef.current
    const span = spanRef.current
    if (!button || !span) return

    const rect = button.getBoundingClientRect()
    const isTop = e.clientY < rect.top + rect.height / 2
    const relX = ((e.clientX - rect.left) / rect.width) * 100
    const relY = isTop ? 0 : 100

    span.style.top = `${relY}%`
    span.style.left = `${relX}%`
  }, [])

  const handleMouseLeave = useCallback((e) => {
    const button = buttonRef.current
    const span = spanRef.current
    if (!button || !span) return

    const rect = button.getBoundingClientRect()
    const isTop = e.clientY < rect.top + rect.height / 2
    const relX = ((e.clientX - rect.left) / rect.width) * 100
    const relY = isTop ? 0 : 100

    span.style.top = `${relY}%`
    span.style.left = `${relX}%`
  }, [])

  return (
    <button
      type="button"
      ref={buttonRef}
      aria-label="Back to Top"
      title="Back to Top"
      onClick={scrollToTop}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="giats-circle-button"
    >
      <Arrow className="circle-arrow" />
      <span className="circle-ball" ref={spanRef} />
    </button>
  )
}
