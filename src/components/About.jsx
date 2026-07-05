import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import Reveal, { ParallaxShell, SectionHeader } from './Reveal.jsx'
import useTilt from '../hooks/useTilt.js'
import resumePdf from '../assets/Sakthivel-Resume.pdf'

const STATS = [
  { value: '10+', label: 'Live Web Applications' },
  { value: '1000+', label: 'Users Served' },
  { value: '2024', label: 'Freelancing Since' },
  { value: 'SaaS', label: '& Automation Specialist' },
]

// Bio split into segments; `hl` segments render in white, `accent` in lime
const BIO = [
  { text: 'I am a ' },
  { text: 'Full-Stack Web Developer', hl: true },
  { text: ' and B.Tech ' },
  { text: 'Artificial Intelligence & Data Science', hl: true },
  { text: ' student with hands-on experience building ' },
  { text: 'production-grade SaaS platforms,', accent: true },
  { text: ' event management systems, leave management software, automation tools, and cloud-ready web applications. I focus on building ' },
  { text: 'scalable, clean, role-based,', accent: true },
  { text: ' and ' },
  { text: 'performance-optimized', hl: true },
  { text: ' applications with strong UI/UX and practical real-world functionality.' },
]

// Flatten segments to words while keeping their style
const WORDS = BIO.flatMap((seg) =>
  seg.text
    .split(' ')
    .filter(Boolean)
    .map((w) => ({ w, hl: seg.hl, accent: seg.accent })),
)

function Word({ word, progress, index, total }) {
  const start = index / total
  const end = Math.min(1, start + 1.5 / total)
  const opacity = useTransform(progress, [start, end], [0.14, 1])
  return (
    <motion.span
      style={{ opacity }}
      className={
        word.accent
          ? 'font-semibold text-accent'
          : word.hl
            ? 'font-semibold text-white'
            : 'text-white/85'
      }
    >
      {word.w}{' '}
    </motion.span>
  )
}

/** Words brighten one by one as the paragraph scrolls through the viewport */
function ScrollBio() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  })

  return (
    <p ref={ref} className="text-base leading-relaxed sm:text-lg sm:leading-relaxed">
      {WORDS.map((word, i) => (
        <Word key={i} word={word} progress={scrollYProgress} index={i} total={WORDS.length} />
      ))}
    </p>
  )
}

function ResumeModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-md sm:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Resume preview"
          data-lenis-prevent
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.3, ease: [0.21, 0.65, 0.36, 1] }}
            className="glass-strong flex h-[85svh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
              <p className="font-display text-sm font-bold sm:text-base">
                Resume — Sakthivel S
              </p>
              <div className="flex items-center gap-2">
                <a href={resumePdf} download="Sakthivel-Resume.pdf" className="btn-primary !px-4 !py-1.5 !text-xs">
                  Download
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close preview"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white hover:text-ink"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
            <iframe src={resumePdf} title="Resume preview" className="h-full w-full bg-white" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function About() {
  const tilt = useTilt(4)
  const [resumeOpen, setResumeOpen] = useState(false)

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <ParallaxShell>
        <SectionHeader kicker="About" title="Engineering products, not just pages." />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.35fr] lg:gap-10">
          {/* Profile card */}
          <Reveal>
            <div
              ref={tilt.ref}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
              className="tilt-card glass relative h-full overflow-hidden rounded-3xl p-7 sm:p-8"
            >
              <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
              <div
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                
                <h3 className="mt-6 font-display text-2xl font-bold">
                  Sakthivel S<span className="text-accent">.</span>
                </h3>
                <p className="mt-1 text-sm text-white/55">
                  Full-Stack Web Developer · B.Tech AI &amp; DS
                </p>

                <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-white/45">Focus</span>
                    <span className="text-right font-medium text-white/85">
                      SaaS · Automation · Web Apps
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-white/45">Education</span>
                    <span className="text-right font-medium text-white/85">
                      Kongu Engineering College
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-white/45">Status</span>
                    <span className="inline-flex items-center gap-2 font-medium text-white/85">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Open to work
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-white/45">Location</span>
                    <span className="inline-flex items-center gap-2 font-medium text-white/85">
                      
                      Dharapuram, Tamil Nadu
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2.5 border-t border-white/10 pt-6 xs:flex-row">
                  <button
                    type="button"
                    onClick={() => setResumeOpen(true)}
                    className="btn-ghost flex-1 !px-4 !py-2.5 !text-xs"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.8" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                    Preview Resume
                  </button>
                  <a
                    href={resumePdf}
                    download="Sakthivel-Resume.pdf"
                    className="btn-primary flex-1 !px-4 !py-2.5 !text-xs"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Download
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bio + stats */}
          <div className="flex flex-col justify-between gap-8">
            <ScrollBio />

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={0.08 * i}>
                  <div className="glass group rounded-2xl p-5 transition-colors duration-300 hover:border-accent/30 hover:bg-white/[0.07] sm:p-6">
                    <p className="font-display text-3xl font-extrabold tracking-tight text-accent sm:text-4xl">
                      {s.value}
                    </p>
                    <p className="mt-1.5 text-xs text-white/50 sm:text-sm">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </ParallaxShell>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  )
}
