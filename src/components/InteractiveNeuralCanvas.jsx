import { useEffect, useRef, useState } from 'react'

export function InteractiveNeuralCanvas() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let isVisible = true
    const isMobile = window.innerWidth < 768
    const nodeCount = isMobile ? 22 : 44

    let width = (canvas.width = canvas.offsetWidth || 480)
    let height = (canvas.height = canvas.offsetHeight || 480)

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false }

    const concepts = [
      'Transformers',
      'Embeddings',
      'Latents',
      'Gradients',
      'Attention',
      'FastAPI',
      'PyTorch',
      'RAG Vectors',
      'Grad-CAM',
    ]

    const nodes = []
    for (let i = 0; i < nodeCount; i++) {
      const radius = 120 + Math.random() * 110
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      nodes.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        baseRadius: 2.2 + Math.random() * 2.2,
        concept: i < concepts.length ? concepts[i] : null,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        vz: (Math.random() - 0.5) * 0.25,
      })
    }

    const signals = []
    const createSignal = () => {
      if (nodes.length < 2) return
      const fromIdx = Math.floor(Math.random() * nodes.length)
      let toIdx = (fromIdx + 1 + Math.floor(Math.random() * 5)) % nodes.length
      signals.push({ from: fromIdx, to: toIdx, progress: 0, speed: 0.015 + Math.random() * 0.02 })
    }

    let rotX = 0
    let rotY = 0

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.targetX = (e.clientX - rect.left - width / 2) * 0.0015
      mouse.targetY = (e.clientY - rect.top - height / 2) * 0.0015
      mouse.isHovering = true
    }

    const handleMouseLeave = () => {
      mouse.targetX = 0
      mouse.targetY = 0
      mouse.isHovering = false
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth || 480
      height = canvas.height = canvas.offsetHeight || 480
    }

    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const observer = new IntersectionObserver((entries) => {
      if (entries && entries[0]) {
        isVisible = entries[0].isIntersecting
      }
    })
    if (containerRef.current) observer.observe(containerRef.current)

    let lastTime = performance.now()
    const render = (time) => {
      animationFrameId = requestAnimationFrame(render)
      if (!isVisible) return

      lastTime = time

      rotY += (mouse.targetX - rotY) * 0.05 + 0.0015
      rotX += (mouse.targetY - rotX) * 0.05 + 0.0006

      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2
      const grad = ctx.createRadialGradient(cx, cy, 30, cx, cy, 260)
      grad.addColorStop(0, 'rgba(236, 107, 62, 0.08)')
      grad.addColorStop(0.5, 'rgba(99, 102, 241, 0.03)')
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)

      const fov = 340
      const projected = nodes.map((node) => {
        let x1 = node.x * cosY + node.z * sinY
        let z1 = -node.x * sinY + node.z * cosY
        let y1 = node.y * cosX - z1 * sinX
        let z2 = node.y * sinX + z1 * cosX

        const scale = fov / (fov + z2 + 200)
        return {
          px: cx + x1 * scale,
          py: cy + y1 * scale,
          pz: z2,
          scale,
          node,
        }
      })

      projected.sort((a, b) => a.pz - b.pz)

      ctx.lineWidth = 0.8
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i]
          const p2 = projected[j]
          const dx = p1.px - p2.px
          const dy = p1.py - p2.py
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = isMobile ? 85 : 120

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35 * Math.min(p1.scale, p2.scale)
            ctx.strokeStyle = `rgba(236, 107, 62, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(p1.px, p1.py)
            ctx.lineTo(p2.px, p2.py)
            ctx.stroke()
          }
        }
      }

      if (Math.random() < 0.04 && signals.length < 8) {
        createSignal()
      }

      for (let k = signals.length - 1; k >= 0; k--) {
        const sig = signals[k]
        sig.progress += sig.speed
        if (sig.progress >= 1) {
          signals.splice(k, 1)
          continue
        }

        const pA = projected[sig.from]
        const pB = projected[sig.to]
        if (!pA || !pB) continue

        const sx = pA.px + (pB.px - pA.px) * sig.progress
        const sy = pA.py + (pB.py - pA.py) * sig.progress

        ctx.fillStyle = '#f97316'
        ctx.beginPath()
        ctx.arc(sx, sy, 2.5 * pA.scale, 0, Math.PI * 2)
        ctx.fill()
      }

      for (let i = 0; i < projected.length; i++) {
        const p = projected[i]
        const r = Math.max(1.2, p.node.baseRadius * p.scale)
        const alpha = Math.min(1, Math.max(0.2, (p.pz + 250) / 450))

        ctx.fillStyle = p.node.concept
          ? `rgba(236, 107, 62, ${alpha})`
          : `rgba(23, 32, 38, ${alpha * 0.7})`
        ctx.beginPath()
        ctx.arc(p.px, p.py, r, 0, Math.PI * 2)
        ctx.fill()

        if (p.node.concept) {
          ctx.strokeStyle = `rgba(236, 107, 62, ${alpha * 0.5})`
          ctx.beginPath()
          ctx.arc(p.px, p.py, r + 3, 0, Math.PI * 2)
          ctx.stroke()

          if (!isMobile && p.scale > 0.85) {
            ctx.font = "600 9px 'Space Grotesk', monospace"
            ctx.fillStyle = `rgba(23, 32, 38, ${alpha * 0.85})`
            ctx.fillText(p.node.concept, p.px + r + 5, p.py + 3)
          }
        }
      }
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="neural-canvas-container" ref={containerRef} aria-label="Interactive 3D Neural Architecture Visualization">
      <canvas ref={canvasRef} className="neural-canvas" />
      <div className="neural-overlay-badge">
        <span className="live-dot" />
        <span>3D Neural Flow · Live Tensor Graph</span>
      </div>
    </div>
  )
}
