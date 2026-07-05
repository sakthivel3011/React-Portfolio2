import Reveal, { ParallaxShell, SectionHeader } from './Reveal.jsx'
import useTilt from '../hooks/useTilt.js'

const SCHOOLS = [
  {
    name: 'Kongu Engineering College',
    degree: 'B.Tech — Artificial Intelligence & Data Science',
    period: '2023 — 2027',
    note: 'Currently pursuing',
  },
  {
    name: 'Veveaham Higher Secondary School',
    degree: 'Higher Secondary Certificate — 70%',
    period: '2018 — 2023',
    note: 'Completed',
  },
]

function SchoolCard({ school }) {
  const tilt = useTilt(4)
  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="tilt-card glass group h-full rounded-3xl p-6 transition-colors duration-300 hover:border-white/25 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] transition-colors duration-300 group-hover:bg-accent group-hover:text-ink">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 3L2 8l10 5 10-5-10-5zM5 10.5V16c0 1.5 3.1 3 7 3s7-1.5 7-3v-5.5M22 8v6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="chip shrink-0 font-mono">{school.period}</span>
      </div>
      <h3 className="mt-5 font-display text-lg font-bold sm:text-xl">{school.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{school.degree}</p>
      <p className="mt-4 text-xs font-medium uppercase tracking-widest text-accent/70">
        {school.note}
      </p>
    </div>
  )
}

export default function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden="true"
      />
      <ParallaxShell>
        <SectionHeader kicker="Education" title="Foundations." />

        <div className="grid gap-5 md:grid-cols-2">
          {SCHOOLS.map((s, i) => (
            <Reveal key={s.name} delay={0.08 * i}>
              <SchoolCard school={s} />
            </Reveal>
          ))}
        </div>
      </ParallaxShell>
    </section>
  )
}
