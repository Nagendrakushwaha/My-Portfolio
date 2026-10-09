import { useEffect, useRef, useState } from 'react'

export function AppearTitle({ children, isFooter = false, className = '' }) {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Apply CSS index variable to each child element
    const childNodes = Array.from(el.children)
    childNodes.forEach((child, idx) => {
      if (child instanceof HTMLElement) {
        child.style.setProperty('--i', String(idx))
      }
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`${isFooter ? 'appear-title-footer' : 'appear-title-container'} ${
        isVisible ? 'is-visible' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
