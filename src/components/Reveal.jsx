import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Lightweight scroll-reveal wrapper. Elements rise, fade and un-tilt into
 * place as they enter the viewport — GPU-only transforms, runs once.
 */
export default function Reveal({ children, delay = 0, className = '', y = 36 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, rotateX: 6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.65, 0.36, 1] }}
      style={{ transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Hero-style depth on every section: content drifts slower than the page
 * scroll, and as the section leaves the top of the screen it recedes —
 * tilting back, scaling down and fading out, exactly like the hero.
 */
export function ParallaxShell({ children, className = 'section-shell' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [56, -90])
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.72, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0.7, 1], [1, 0.88])
  const rotateX = useTransform(scrollYProgress, [0.7, 1], [0, 10])

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale, rotateX, transformPerspective: 1100 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function TitleWord({ progress, index, total, children }) {
  const start = index / total
  const end = Math.min(1, start + 1.6 / total)
  const opacity = useTransform(progress, [start, end], [0.16, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block text-white">
      {children}&nbsp;
    </motion.span>
  )
}

export function SectionHeader({ kicker, title, sub }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'start 0.5'],
  })

  const endsWithDot = title.endsWith('.')
  const words = (endsWithDot ? title.slice(0, -1) : title).split(' ')

  return (
    <div className="mb-12 sm:mb-16">
      <Reveal>
        <span className="kicker">{kicker}</span>
      </Reveal>
      {/* Title words brighten one by one as the heading scrolls into view */}
      <h2 ref={ref} className="heading-xl mt-4">
        {words.map((w, i) => (
          <TitleWord key={i} progress={scrollYProgress} index={i} total={words.length}>
            {w}
          </TitleWord>
        ))}
        {endsWithDot && <span className="text-accent-glow">.</span>}
      </h2>
      {sub && (
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-white/55">
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  )
}
