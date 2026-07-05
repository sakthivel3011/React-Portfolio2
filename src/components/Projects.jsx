import Reveal, { ParallaxShell, SectionHeader } from './Reveal.jsx'
import useTilt from '../hooks/useTilt.js'
import { projects } from '../data/projects.js'

function ProjectCard({ project, featured }) {
  const tilt = useTilt(featured ? 3 : 5)
  const shownModules = project.modules.slice(0, featured ? 8 : 5)
  const hiddenCount = project.modules.length - shownModules.length

  return (
    <article
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="tilt-card glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06] sm:p-8"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-14 select-none font-display text-[7rem] font-extrabold leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-accent/[0.14] sm:text-[9rem]"
        aria-hidden="true"
      >
        {project.no}
      </div>

      <div className="relative flex items-center gap-3">
        <span className="chip !border-white/20 !bg-white/[0.08] font-mono uppercase tracking-widest !text-white/80">
          {project.tag}
        </span>
        {project.link ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(201,255,61,0.7)]" /> Live
          </span>
        ) : (
          <span className="text-[11px] font-medium text-white/35">In development</span>
        )}
      </div>

      <h3 className="relative mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl">
        {project.title}
      </h3>
      <p className="relative mt-1 text-xs font-medium uppercase tracking-[0.2em] text-white/40 sm:text-[13px] sm:tracking-[0.25em]">
        {project.subtitle}
      </p>

      <p className="relative mt-4 flex-1 text-sm leading-relaxed text-white/60">
        {project.desc}
      </p>

      <div className="relative mt-6 flex flex-wrap gap-1.5">
        {shownModules.map((m) => (
          <span
            key={m}
            className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 text-[10px] font-medium text-white/45 sm:text-[11px]"
          >
            {m}
          </span>
        ))}
        {hiddenCount > 0 && (
          <span className="rounded-md px-2 py-1 text-[10px] font-medium text-white/35 sm:text-[11px]">
            +{hiddenCount} more
          </span>
        )}
      </div>

      <div className="relative mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
        <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-white/50">
          {project.chips.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-accent"
          >
            Visit
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden="true"
      />
      <ParallaxShell>
        <SectionHeader
          kicker="Projects"
          title="Selected work, live in production."
          sub="Real platforms serving real users — from enterprise safety management to campus-scale event operations."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
          {projects.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={0.05 * (i % 2)}
              className={p.featured ? 'md:col-span-2' : ''}
            >
              <ProjectCard project={p} featured={p.featured} />
            </Reveal>
          ))}
        </div>
      </ParallaxShell>
    </section>
  )
}
