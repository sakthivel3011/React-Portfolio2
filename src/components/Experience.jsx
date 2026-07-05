import Reveal, { ParallaxShell, SectionHeader } from './Reveal.jsx'

const POINTS = [
  'Designed and deployed 10+ production web applications for educational institutions and organizations.',
  'Built event, leave, registration, attendance, and automation platforms serving over 5,000 users.',
  'Developed scalable SaaS applications using React.js, Node.js, PostgreSQL, Firebase, and cloud deployment.',
  'Implemented REST APIs, authentication, RBAC, dashboards, and workflow automation.',
]

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden="true"
      />
      <ParallaxShell>
        <SectionHeader kicker="Experience" title="Where the work happened." />

        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/[0.04] blur-3xl"
              aria-hidden="true"
            />
            <div className="relative flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
              <div>
                <h3 className="font-display text-xl font-bold sm:text-2xl">
                  Full-Stack Web Developer
                </h3>
                <p className="mt-1 text-sm text-white/55">Freelance &amp; College Projects</p>
              </div>
              <span className="chip w-fit shrink-0 border-accent/25 font-mono !text-accent">
                2024 — Present
              </span>
            </div>

            <ul className="relative mt-8 space-y-4 border-l border-white/10 pl-6">
              {POINTS.map((p) => (
                <li key={p} className="relative text-sm leading-relaxed text-white/65 sm:text-base">
                  <span
                    className="absolute -left-[27px] top-2 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(201,255,61,0.5)]"
                    aria-hidden="true"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </ParallaxShell>
    </section>
  )
}
