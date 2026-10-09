import { useRef, useCallback } from 'react'
import { Arrow } from './Arrow'
import { synth } from '../../utils/audioSynth'

export function ButtonLink({
  href,
  label,
  target = false,
  onClick,
  className = '',
}) {
  const buttonRef = useRef(null)
  const spanRef = useRef(null)

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

  const handleClick = (e) => {
    synth.playClick()
    if (onClick) onClick(e)
  }

  const buttonElement = (
    <button
      type="button"
      ref={buttonRef}
      className={`giats-btn-posnawr ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      aria-label={label}
    >
      <span className="btn-label">{label}</span>
      <Arrow className="btn-arrow" />
      <span className="btn-ball" ref={spanRef} />
    </button>
  )

  if (href) {
    return (
      <a
        href={href}
        target={target ? '_blank' : undefined}
        rel={target ? 'noreferrer' : undefined}
        className="giats-button-link"
        onClick={handleClick}
      >
        {buttonElement}
      </a>
    )
  }

  return buttonElement
}
