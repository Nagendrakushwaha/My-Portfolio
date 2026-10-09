import { useEffect, useRef, useState } from 'react'

export function InteractiveNeuralCanvas() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [activeModel, setActiveModel] = useState('EfficientNet-B0')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let isVisible = true
    const isMobile = window.innerWidth < 768
    const nodeCount = isMobile ? 26 : 48

    let width = (canvas.width = canvas.offsetWidth || 560)
    let height = (canvas.height = canvas.offsetHeight || 560)

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      velX: 0,
      velY: 0,
      isHovering: false,
    }

    const keyNodes = [
      { label: 'EfficientNet-B0', metric: '93.6% RSNA', color: '#ff6b35' },
      { label: 'Banking77 Intent', metric: '88.7% F1', color: '#00f2fe' },
      { label: 'XGBoost / LightGBM', metric: '99.6% CIC-IDS', color: '#10b981' },
      { label: 'MobileNetV3-Small', metric: 'SROIE CPU', color: '#38bdf8' },
      { label: 'Policy RAG DB', metric: '102 Chunks', color: '#f59e0b' },
      { label: 'Grad-CAM Attention', metric: 'IoU Align', color: '#ec4899' },
      { label: 'FastAPI Microservice', metric: 'Sub-20ms', color: '#a855f7' },
      { label: 'PyTorch Core', metric: 'v2.2 CPU', color: '#ef4444' },
    ]

    const nodes = []
    const sphereRadius = isMobile ? 120 : 160

    for (let i = 0; i < nodeCount; i++) {
      // Golden spiral distribution on sphere for organic balance
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount)
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5)

      const isKey = i < keyNodes.length
      const keyInfo = isKey ? keyNodes[i] : null

      nodes.push({
        x: sphereRadius * Math.sin(phi) * Math.cos(theta),
        y: sphereRadius * Math.sin(phi) * Math.sin(theta),
        z: sphereRadius * Math.cos(phi),
        baseRadius: isKey ? 4.5 : 1.8 + Math.random() * 1.5,
        keyInfo,
        color: keyInfo ? keyInfo.color : '#64748b',
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.03 + Math.random() * 0.02,
      })
    }

    // Interactive Synaptic Signal Pulses
    const signals = []
    const createSignal = () => {
      if (nodes.length < 2) return
      const from = Math.floor(Math.random() * nodes.length)
      const to = (from + 1 + Math.floor(Math.random() * 6)) % nodes.length
      signals.push({
        from,
        to,
        progress: 0,
        speed: 0.018 + Math.random() * 0.025,
        color: nodes[from].color || '#ff6b35',
      })
    }

    let rotX = 0.2
    let rotY = 0.4

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left - width / 2
      const my = e.clientY - rect.top - height / 2
      mouse.targetX = mx * 0.002
      mouse.targetY = my * 0.002
      mouse.isHovering = true
    }

    const handleMouseLeave = () => {
      mouse.targetX = 0.0008
      mouse.targetY = 0.0004
      mouse.isHovering = false
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth || 560
      height = canvas.height = canvas.offsetHeight || 560
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

    const render = () => {
      animationFrameId = requestAnimationFrame(render)
      if (!isVisible) return

      // Smooth inertia rotation
      if (mouse.isHovering) {
        rotY += (mouse.targetX - mouse.velX) * 0.08
        rotX += (mouse.targetY - mouse.velY) * 0.08
        mouse.velX = mouse.targetX
        mouse.velY = mouse.targetY
      } else {
        rotY += 0.003
        rotX += 0.0015
      }

      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2

      // Ambient radial energy glow in the core
      const glowGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, sphereRadius * 1.5)
      glowGrad.addColorStop(0, 'rgba(2, 132, 199, 0.12)')
      glowGrad.addColorStop(0.35, 'rgba(234, 88, 12, 0.08)')
      glowGrad.addColorStop(0.7, 'rgba(241, 245, 249, 0.05)')
      glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = glowGrad
      ctx.fillRect(0, 0, width, height)

      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)

      const fov = 380

      // 3D Perspective Projection
      const projected = nodes.map((node) => {
        node.pulse += node.pulseSpeed

        // Rotate around Y
        const x1 = node.x * cosY + node.z * sinY
        const z1 = -node.x * sinY + node.z * cosY

        // Rotate around X
        const y1 = node.y * cosX - z1 * sinX
        const z2 = node.y * sinX + z1 * cosX

        const scale = fov / (fov + z2 + 240)
        return {
          px: cx + x1 * scale,
          py: cy + y1 * scale,
          pz: z2,
          scale,
          node,
        }
      })

      // Depth sort so distant nodes render first
      projected.sort((a, b) => a.pz - b.pz)

      // Draw Synaptic Connection Lines
      ctx.lineWidth = 0.9
      const maxDist = isMobile ? 80 : 110

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i]
          const p2 = projected[j]
          const dx = p1.px - p2.px
          const dy = p1.py - p2.py
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.38 * Math.min(p1.scale, p2.scale)
            const isHighlight = p1.node.keyInfo || p2.node.keyInfo

            if (isHighlight) {
              const grad = ctx.createLinearGradient(p1.px, p1.py, p2.px, p2.py)
              grad.addColorStop(0, `rgba(234, 88, 12, ${alpha * 1.2})`)
              grad.addColorStop(1, `rgba(2, 132, 199, ${alpha * 1.2})`)
              ctx.strokeStyle = grad
            } else {
              ctx.strokeStyle = `rgba(100, 116, 139, ${alpha * 0.35})`
            }

            ctx.beginPath()
            ctx.moveTo(p1.px, p1.py)
            ctx.lineTo(p2.px, p2.py)
            ctx.stroke()
          }
        }
      }

      // Spawn Signals
      if (Math.random() < 0.06 && signals.length < 12) {
        createSignal()
      }

      // Draw Signals
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

        ctx.fillStyle = sig.color
        ctx.shadowColor = sig.color
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(sx, sy, 2.8 * pA.scale, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Render Nodes with Dynamic Halo
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i]
        const node = p.node
        const pulseFactor = 1 + 0.18 * Math.sin(node.pulse)
        const r = Math.max(1.5, node.baseRadius * p.scale * pulseFactor)
        const alpha = Math.min(1, Math.max(0.2, (p.pz + 300) / 500))

        if (node.keyInfo) {
          // Halo for key architecture nodes
          ctx.beginPath()
          ctx.arc(p.px, p.py, r * 2.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(234, 88, 12, ${alpha * 0.16})`
          ctx.fill()

          ctx.beginPath()
          ctx.arc(p.px, p.py, r, 0, Math.PI * 2)
          ctx.fillStyle = node.color
          ctx.shadowColor = node.color
          ctx.shadowBlur = 10
          ctx.fill()
          ctx.shadowBlur = 0

          // Exterior orbital ring
          ctx.beginPath()
          ctx.arc(p.px, p.py, r + 4, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(15, 23, 42, ${alpha * 0.25})`
          ctx.lineWidth = 0.8
          ctx.stroke()

          // HUD Label for key nodes facing camera - Pure black text for white background
          if (p.pz > -50 && p.scale > 0.82) {
            ctx.font = '600 10.5px "Space Grotesk", sans-serif'
            ctx.fillStyle = `rgba(9, 13, 22, ${alpha})`
            ctx.fillText(node.keyInfo.label, p.px + r + 8, p.py - 2)

            ctx.font = '600 9px "JetBrains Mono", monospace'
            ctx.fillStyle = `${node.color}`
            ctx.fillText(node.keyInfo.metric, p.px + r + 8, p.py + 10)
          }
        } else {
          // Normal background node
          ctx.beginPath()
          ctx.arc(p.px, p.py, r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(71, 85, 105, ${alpha * 0.75})`
          ctx.fill()
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
    <div
      className="neural-canvas-container"
      ref={containerRef}
      aria-label="Interactive 3D Neural Architecture Visualization"
    >
      <canvas ref={canvasRef} className="neural-canvas" />

      {/* Floating HUD Telemetry Overlay */}
      <div className="neural-hud-corner-top">
        <span className="hud-corner-tag">TENSOR_TOPOLOGY // V4</span>
        <div className="hud-metric-pill">
          <span className="live-dot" />
          <span>SYNAPTIC NODES: 48 // 60 FPS</span>
        </div>
      </div>

      <div className="neural-hud-corner-bottom">
        <div className="hud-model-ticker">
          <span className="ticker-label">ACTIVE BACKBONE:</span>
          <span className="ticker-value">{activeModel}</span>
        </div>
        <span className="hud-corner-coord">LAT: 23.2599° N · LON: 77.4126° E</span>
      </div>
    </div>
  )
}
