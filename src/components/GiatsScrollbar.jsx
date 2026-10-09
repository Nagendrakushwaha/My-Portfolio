import { useEffect, useRef, useState } from 'react'

export function GiatsScrollbar() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        const progress = Math.min(1, Math.max(0, scrollY / docHeight))
        setScrollProgress(progress)
      }

      setVisible(true)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setVisible(false)
      }, 1200)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div
      className={`giats-hud-scrollbar ${visible ? 'is-visible' : ''}`}
      aria-hidden="true"
    >
      <div className="scrollbar-track">
        <div
          className="scrollbar-thumb"
          style={{
            transform: `translate3d(0, ${scrollProgress * 220}px, 0)`,
          }}
        />
      </div>
    </div>
  )
}
