import { motion } from 'framer-motion'
import Reveal, { ParallaxShell } from './Reveal.jsx'
import useTilt from '../hooks/useTilt.js'
import updoneLogo from '../assets/icon.png'
import founderImg from '../assets/sakthi.png'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: 0.12 * i, ease: [0.21, 0.65, 0.36, 1] },
  }),
}

const FOCUS_AREAS = [
  {
    title: 'Event Platforms',
    desc: 'Registrations, scheduling, live scoring and analytics for large-scale college events.',
    icon: 'M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z',
  },
  {
    title: 'Automation Systems',
    desc: 'Leave management, attendance, approvals and workflow automation done right.',
    icon: 'M13 3L4 14h6l-1 7 9-11h-6l1-7z',
  },
  {
    title: 'SaaS Products',
    desc: 'Multi-tenant, role-based, cloud-ready platforms built to scale with your business.',
    icon: 'M3 8l9-5 9 5-9 5-9-5zm0 6l9 5 9-5M3 11l9 5 9-5',
  },
  {
    title: 'AI Integrations',
    desc: 'Smart digital experiences powered by modern AI for startups, creators and colleges.',
    icon: 'M12 2a4 4 0 014 4c2.2.5 4 2.4 4 4.8 0 1.5-.7 2.9-1.8 3.8.5 3-1.8 5.4-4.7 5.4h-3c-2.9 0-5.2-2.4-4.7-5.4A4.9 4.9 0 014 10.8C4 8.4 5.8 6.5 8 6a4 4 0 014-4z',
  },
]

function FounderCard() {
  const tilt = useTilt(5)
  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="tilt-card glass relative overflow-hidden rounded-3xl"
    >
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative p-7 sm:p-8">
        <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border border-white/15 bg-gradient-to-b from-white/[0.1] to-white/[0.02] shadow-2xl shadow-black/60">
          <img
            src={founderImg}
            alt="Sakthivel — Founder of Updone"
            draggable="false"
            className="absolute bottom-0 left-1/2 w-[115%] max-w-none -translate-x-1/2"
          />
        </div>
        <h3 className="mt-6 text-center font-display text-2xl font-bold">
          Sakthivel<span className="text-accent">.</span>
        </h3>
        <p className="mt-1 text-center text-sm text-white/55">Founder &amp; Builder</p>
        <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-accent/80">
          Product · Engineering · Growth
        </p>

        <blockquote className="relative mt-7 border-t border-white/10 pt-6">
          <span
            className="absolute -top-1 left-0 font-display text-5xl font-extrabold text-accent/25"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p className="pl-6 text-sm italic leading-relaxed text-white/70">
            We build digital systems with the same care as world-class products — fast,
            scalable, and beautifully designed.
          </p>
        </blockquote>
      </div>
    </div>
  )
}

export default function Founder() {
  return (
    <div className="relative overflow-hidden">
      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="glass-strong mx-auto mt-0 flex h-16 max-w-6xl items-center justify-between gap-2 px-4 xs:px-5 sm:mx-4 sm:mt-3 sm:rounded-2xl sm:px-8 lg:mx-auto">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-accent"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M19 12H5m0 0l6 6m-6-6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Portfolio
          </a>
          <div className="flex items-center gap-2.5 font-display text-lg font-bold">
            <img
              src={updoneLogo}
              alt="Updone logo"
              width="30"
              height="30"
              draggable="false"
              className="h-[30px] w-[30px] object-contain"
            />
            <span className="hidden xs:inline">Updone</span>
          </div>
          <a
            href="https://updone.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shrink-0 !px-4 !py-2 text-xs xs:!px-5"
          >
            updone.in
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-[70svh] items-center overflow-hidden pt-24">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="bg-grid animate-grid-drift absolute inset-0 opacity-60" />
          <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.045] blur-[110px] animate-pulse-soft" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_88%)]" />
        </div>

        <div className="section-shell relative z-10 flex flex-col items-center py-16 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <img
              src={updoneLogo}
              alt="Updone logo"
              width="72"
              height="72"
              draggable="false"
              className="animate-float-slow mx-auto h-16 w-16 object-contain drop-shadow-[0_16px_40px_rgba(0,0,0,0.6)] sm:h-[72px] sm:w-[72px]"
            />
          </motion.div>
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="kicker mt-8"
          >
            Founder &amp; Builder
          </motion.span>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="text-fade mt-5 font-display text-4xl font-extrabold tracking-tight xs:text-5xl sm:text-6xl lg:text-7xl"
          >
            Updone<span className="text-accent-glow">.in</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-5 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base"
          >
            A modern technology brand focused on building smart digital solutions, automation
            systems, websites, and mobile applications for{' '}
            <span className="font-semibold text-white/85">colleges</span>,{' '}
            <span className="font-semibold text-white/85">startups</span>,{' '}
            <span className="font-semibold text-white/85">creators</span>, and{' '}
            <span className="font-semibold text-white/85">businesses</span>.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-8">
            <span className="glass inline-flex max-w-full flex-wrap items-center justify-center gap-2.5 rounded-3xl px-5 py-2.5 text-center text-xs font-medium text-white/70 sm:rounded-full sm:text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(201,255,61,0.7)]" />
              Mission — Simplify digital experiences through innovation.{' '}
              <span className="font-bold text-accent">Done Right.</span>
            </span>
          </motion.div>
        </div>
      </section>

      {/* Founder + company */}
      <section className="relative py-20 sm:py-28">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
          aria-hidden="true"
        />
        <ParallaxShell>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            <Reveal>
              <FounderCard />
            </Reveal>

            <div className="flex flex-col gap-6">
              <Reveal delay={0.1}>
                <div className="glass rounded-3xl p-7 sm:p-8">
                  <span className="kicker">The company</span>
                  <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
                    Built to do it right<span className="text-accent">.</span>
                  </h2>
<p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
  Updone is a modern technology company specializing in{' '}
  <span className="font-semibold text-white/85">custom software development</span>,{' '}
  <span className="font-semibold text-white/85">SaaS platforms</span>,{' '}
  <span className="font-semibold text-white/85">business automation</span>,{' '}
  <span className="font-semibold text-white/85">web applications</span>, and{' '}
  <span className="font-semibold text-white/85">mobile solutions</span>, delivering scalable digital experiences for{' '}
  <span className="font-semibold text-white/85">colleges</span>,{' '}
  <span className="font-semibold text-white/85">startups</span>,{' '}
  <span className="font-semibold text-white/85">creators</span>, and{' '}
  <span className="font-semibold text-white/85">growing businesses</span>.
</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                    We create scalable and user-friendly platforms including event management systems, leave management solutions, AI integrations, SaaS products, and automation workflows.

                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                    Our mission is to simplify digital experiences through innovation and technology — Done Right.
                  </p>
                </div>
              </Reveal>


            </div>
          </div>
        </ParallaxShell>
      </section>

      {/* CTA + footer */}
      <section className="relative pb-10 pt-4">
        <ParallaxShell>
          <Reveal>
            <div className="glass relative overflow-hidden rounded-3xl p-8 text-center sm:p-12">

              <h2 className="relative font-display text-2xl font-bold sm:text-3xl">
                Have an idea? Let&apos;s make it real<span className="text-accent-glow">.</span>
              </h2>
              <p className="relative mx-auto mt-3 max-w-md text-sm text-white/55">
                From college events to enterprise SaaS — Updone builds it fast, scalable and
                beautifully designed.
              </p>
              <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="https://updone.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full sm:w-auto"
                >
                  Visit updone.in
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="https://www.updone.in/contact" target="_blank" rel="noopener noreferrer" className="btn-ghost w-full sm:w-auto">
                  Contact the Founder
                </a>
              </div>
            </div>
          </Reveal>
        </ParallaxShell>

        <div className="section-shell mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2.5">
            <img
              src={updoneLogo}
              alt="Updone logo"
              width="24"
              height="24"
              loading="lazy"
              draggable="false"
              className="h-6 w-6 object-contain"
            />
            <p className="text-sm font-medium text-white/70">
              Updone — Done Right<span className="text-accent">.</span>
            </p>
          </div>
          <div className="flex flex-col items-center gap-1 sm:items-end">
            <a
              href="mailto:info@updone.in"
              className="text-xs text-white/50 transition-colors hover:text-accent"
            >
              info@updone.in
            </a>
            <p className="text-xs text-white/35">© 2026 Updone. All Rights Reserved</p>
          </div>
        </div>
      </section>
    </div>
  )
}
