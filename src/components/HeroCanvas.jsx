import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 130
const FOV = 320
const DEPTH = 900
const LINK_DIST = 110

/**
 * True-3D particle field: points live in a rotating 3D volume, are
 * perspective-projected onto the canvas, drift toward the viewer and wrap.
 * Mouse position steers the camera rotation for a parallax "look around"
 * feel. Rendering pauses when the hero is off-screen or the tab is hidden.
 */
export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    let targetRX = 0
    let targetRY = 0
    let rx = 0
    let ry = 0

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random() * DEPTH,
      speed: 0.35 + Math.random() * 0.55,
      accent: Math.random() < 0.08,
    }))

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onMouse = (e) => {
      targetRY = (e.clientX / window.innerWidth - 0.5) * 0.5
      targetRX = (e.clientY / window.innerHeight - 0.5) * 0.35
    }

    const project = (p) => {
      // rotate around Y then X (camera steer), then perspective-project
      const hw = w / 2
      const hh = h / 2
      const range = Math.min(hw, hh) * 2.2
      let x = p.x * range
      let y = p.y * range
      let z = p.z

      const cy = Math.cos(ry)
      const sy = Math.sin(ry)
      const cx = Math.cos(rx)
      const sx = Math.sin(rx)

      let x1 = x * cy - (z - DEPTH / 2) * sy
      let z1 = x * sy + (z - DEPTH / 2) * cy + DEPTH / 2
      let y1 = y * cx - (z1 - DEPTH / 2) * sx
      z1 = y * sx + (z1 - DEPTH / 2) * cx + DEPTH / 2

      const scale = FOV / (FOV + z1)
      return { sx: hw + x1 * scale, sy: hh + y1 * scale, scale, z: z1 }
    }

    const frame = () => {
      rx += (targetRX - rx) * 0.04
      ry += (targetRY - ry) * 0.04

      ctx.clearRect(0, 0, w, h)

      const projected = []
      for (const p of particles) {
        if (!reduced) {
          p.z -= p.speed
          if (p.z < 1) {
            p.z = DEPTH
            p.x = (Math.random() - 0.5) * 2
            p.y = (Math.random() - 0.5) * 2
          }
        }
        const pr = project(p)
        pr.accent = p.accent
        projected.push(pr)
      }

      // faint depth-aware link lines between near neighbours
      ctx.lineWidth = 1
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i]
        if (a.scale <= 0) continue
        for (let j = i + 1; j < projected.length; j++) {
          const b = projected[j]
          const dx = a.sx - b.sx
          const dy = a.sy - b.sy
          const d2 = dx * dx + dy * dy
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.14 * Math.min(a.scale, b.scale)
            ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(a.sx, a.sy)
            ctx.lineTo(b.sx, b.sy)
            ctx.stroke()
          }
        }
      }

      for (const pr of projected) {
        if (pr.scale <= 0) continue
        const r = Math.max(0.4, pr.scale * 2.1)
        const alpha = Math.min(0.9, pr.scale * 0.9)
        ctx.beginPath()
        ctx.arc(pr.sx, pr.sy, r, 0, Math.PI * 2)
        ctx.fillStyle = pr.accent
          ? `rgba(201,255,61,${(alpha * 0.9).toFixed(3)})`
          : `rgba(255,255,255,${(alpha * 0.55).toFixed(3)})`
        ctx.fill()
      }

      if (!reduced) raf = requestAnimationFrame(frame)
    }

    const start = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !document.hidden) start()
        else cancelAnimationFrame(raf)
      },
      { threshold: 0 },
    )

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else if (visible) start()
    }

    resize()
    start()
    observer.observe(canvas)
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouse, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
