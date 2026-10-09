export function PerspectiveText({
  label,
  label2,
  href,
  onClick,
  className = '',
  target = false,
}) {
  const content = (
    <span className="perspective-text-inner">
      <span className="perspective-text-face-1">{label}</span>
      <span className="perspective-text-face-2">{label2 || label}</span>
    </span>
  )

  if (href) {
    return (
      <a
        href={href}
        target={target ? '_blank' : undefined}
        rel={target ? 'noreferrer' : undefined}
        onClick={onClick}
        className={`perspective-text-root ${className}`}
        aria-label={label}
      >
        {content}
      </a>
    )
  }

  return (
    <span className={`perspective-text-root ${className}`} onClick={onClick}>
      {content}
    </span>
  )
}
