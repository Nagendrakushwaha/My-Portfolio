import { Arrow } from './Arrow'
import { synth } from '../../utils/audioSynth'

export function LinkText({
  children,
  href,
  title,
  target = false,
  onClick,
  className = '',
}) {
  const handleClick = (e) => {
    synth.playClick()
    if (onClick) onClick(e)
  }

  return (
    <a
      href={href}
      target={target ? '_blank' : undefined}
      rel={target ? 'noreferrer' : undefined}
      className={`giats-link-text ${className}`}
      onClick={handleClick}
      onMouseEnter={() => synth.playHover()}
      aria-label={title || (typeof children === 'string' ? children : 'Link')}
    >
      <div className="giats-link-content">
        <Arrow className="giats-link-arrow" />
        <span className="giats-link-label">{children}</span>
      </div>
    </a>
  )
}
