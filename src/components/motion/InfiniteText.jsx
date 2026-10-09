export function InfiniteText({
  text = 'SCROLL DOWN',
  length = 6,
  hasStroke = true,
  className = '',
}) {
  const items = Array.from({ length }, (_, i) => ({
    id: i,
    isStroke: i % 2 === 1 && hasStroke,
  }))

  return (
    <div className={`infinite-text-marquee ${className}`} aria-hidden="true">
      <div className="infinite-text-track">
        {/* Render 2 identical sets for seamless continuous marquee loop */}
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item.id}-${index}`}
            className={`infinite-text-item ${item.isStroke ? 'item-stroke' : ''}`}
          >
            {text}
            <span className="infinite-text-sep" />
          </span>
        ))}
      </div>
    </div>
  )
}
