import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import HeroCanvas from './HeroCanvas.jsx'
import useTilt from '../hooks/useTilt.js'
import portrait from '../assets/sakthi1.png'
import resumePdf from '../assets/Sakthivel-Resume.pdf'

const BADGES = ['React.js', 'Node.js', 'Firebase', 'PostgreSQL', 'SaaS Development']

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: 0.12 * i, ease: [0.21, 0.65, 0.36, 1] },
  }),
}

function Portrait() {
  const tilt = useTilt(7)
  const [ripples, setRipples] = useState([])

  const onTap = () => {
    const id = Date.now()
    setRipples((r) => [...r, id])
    setTimeout(() => setRipples((r) => r.filter((x) => x !== id)), 900)
  }

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={2}
      className="relative mx-auto w-48 xs:w-56 sm:w-64 lg:w-full lg:max-w-sm"
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="tilt-card relative cursor-pointer select-none"
        onClick={onTap}
      >
        {/* glow behind the portrait */}
        <div
          className="absolute inset-x-6 bottom-0 top-10 rounded-full bg-white/[0.07] blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-4 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-accent/15 blur-[70px]"
          aria-hidden="true"
        />

        {/* rotating orbit rings */}
        <div
          className="animate-spin-slower absolute -inset-3 rounded-full border border-dashed border-white/15"
          aria-hidden="true"
        />
        <div
          className="animate-spin-reverse absolute -inset-8 hidden rounded-full border border-white/[0.07] sm:block"
          aria-hidden="true"
        >
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_rgba(201,255,61,0.8)]" />
        </div>

        {/* click ripple rings */}
        <AnimatePresence>
          {ripples.map((id) => (
            <motion.span
              key={id}
              initial={{ opacity: 0.7, scale: 0.85 }}
              animate={{ opacity: 0, scale: 1.35 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-accent/70"
              aria-hidden="true"
            />
          ))}
        </AnimatePresence>

        {/* portrait inside a circular glass frame, photo breaks out of the top */}
        <motion.div whileTap={{ scale: 0.96 }} className="relative">
          <div className="glass relative aspect-square overflow-visible rounded-full border-white/15 bg-gradient-to-b from-white/[0.09] to-white/[0.02]">
            <img
              src={portrait}
              alt="Sakthivel S — Full-Stack Web Developer"
              width="880"
              height="800"
              draggable="false"
              className="absolute bottom-0 left-1/2 w-[112%] max-w-none -translate-x-1/2 drop-shadow-[0_24px_50px_rgba(0,0,0,0.7)] [mask-image:radial-gradient(140%_140%_at_50%_30%,#000_62%,transparent_74%)]"
            />
          </div>
        </motion.div>

        {/* floating stat chips around the portrait */}
        <div className="animate-float-mid absolute -left-6 top-8 sm:-left-12">
          <div className="glass rounded-xl px-3 py-2 shadow-xl shadow-black/50">
            <p className="font-display text-sm font-extrabold text-accent">10+</p>
            <p className="text-[9px] uppercase tracking-wider text-white/50">Live Apps</p>
          </div>
        </div>
        <div className="animate-float-slow absolute -right-4 bottom-10 sm:-right-10">
          <div className="glass rounded-xl px-3 py-2 shadow-xl shadow-black/50">
            <p className="font-display text-sm font-extrabold text-accent">3+</p>
            <p className="text-[9px] uppercase tracking-wider text-white/50">Experience</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Parallax layers — background drifts slower than content for scroll depth
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '55%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Layer 1 — 3D particle field + monochrome atmosphere */}
      <motion.div style={{ y: bgY }} className="absolute inset-0" aria-hidden="true">
        <HeroCanvas />
        <div className="bg-grid animate-grid-drift absolute inset-0 opacity-60" />
        <div className="absolute left-1/2 top-1/3 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.045] blur-[110px] animate-pulse-soft" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_88%)]" />
      </motion.div>

      {/* Layer 2 — content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="section-shell relative z-10 grid items-center gap-12 pb-24 pt-28 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pb-16"
      >
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] sm:text-xs font-medium text-white/70">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Available for freelance &amp; internships
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-fade mt-6 font-display text-[length:clamp(1.9rem,10vw,3.75rem)] font-extrabold tracking-tight sm:text-6xl xl:text-7xl"
          >
            Sakthivel&nbsp;S<span className="text-accent-glow">.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-4 font-display text-base font-semibold text-white/85 xs:text-lg sm:text-2xl"
          >
            Full-Stack Web Developer
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-3 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base"
          >
            Building <span className="font-semibold text-white/85">SaaS Platforms</span>,{' '}
            <span className="font-semibold text-white/85">Automation Tools</span> &amp;{' '}
            <span className="font-semibold text-white/85">Scalable Web Applications</span>
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row lg:justify-start"
          >
            <a href="#projects" className="btn-primary w-full sm:w-auto">
              View Projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#contact" className="btn-ghost w-full sm:w-auto">
              Contact Me
            </a>
            <a
              href={resumePdf}
              download="Sakthivel-Resume.pdf"
              className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-white/60 transition-colors hover:text-accent"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Resume
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-10 flex flex-wrap items-center justify-center gap-2 px-2 lg:justify-start lg:px-0"
          >
            {BADGES.map((b) => (
              <span key={b} className="chip">
                {b}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <Portrait />
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="block h-2 w-1 rounded-full bg-accent/80"
          />
        </span>
      </motion.a>
    </section>
  )
}
