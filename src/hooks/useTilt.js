import { useCallback, useRef } from 'react'

/**
 * Pointer-driven 3D tilt. Writes CSS custom properties consumed by the
 * .tilt-card utility (pure transform — no layout, no repaints).
 * Disabled automatically on touch devices via the pointer media check.
 */
export default function useTilt(max = 5) {
  const ref = useRef(null)

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current
      if (!el || window.matchMedia('(pointer: coarse)').matches) return
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      el.style.setProperty('--ry', `${(px * max * 2).toFixed(2)}deg`)
      el.style.setProperty('--rx', `${(-py * max * 2).toFixed(2)}deg`)
    },
    [max],
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
