import Reveal, { ParallaxShell } from './Reveal.jsx'
import { ProjectCard } from './Projects.jsx'
import { projects } from '../data/projects.js'
import logo from '../assets/logo-256.png'

export default function AllProjects() {
  return (
    <div className="relative overflow-hidden">
      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="glass-strong mx-auto mt-0 flex h-16 max-w-6xl items-center justify-between gap-2 px-4 xs:px-5 sm:mx-4 sm:mt-3 sm:rounded-2xl sm:px-8 lg:mx-auto">
          <a
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-accent"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M19 12H5m0 0l6 6m-6-6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Portfolio
          </a>
          <div className="flex items-center gap-2.5 font-display text-lg font-bold">
            <img
              src={logo}
              alt="Sakthivel S logo"
              width="30"
              height="30"
              draggable="false"
              className="h-[30px] w-[30px] rounded-full border border-white/15 object-cover"
            />
            <span className="hidden xs:inline">Projects</span>
          </div>
          <a href="/#contact" className="btn-primary shrink-0 !px-4 !py-2 text-xs xs:!px-5">
            Hire Me
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-[45svh] items-end overflow-hidden pt-24 sm:min-h-[50svh]">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="bg-grid animate-grid-drift absolute inset-0 opacity-60" />
          <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.045] blur-[110px] animate-pulse-soft" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_88%)]" />
        </div>

        <div className="section-shell relative z-10 pb-14 sm:pb-20">
          <Reveal>
            <span className="kicker">All Projects</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="heading-xl mt-4">
              Everything I&apos;ve shipped<span className="text-accent-glow">.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
              {projects.length} platforms and products — SaaS tools, event systems, and websites,
              live in production.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Project grid */}
      <section className="relative pb-24 sm:pb-32">
        <ParallaxShell>
          <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
            {projects.map((p, i) => (
              <Reveal
                key={p.slug}
                delay={0.04 * (i % 2)}
                className={p.featured ? 'md:col-span-2' : ''}
              >
                <ProjectCard project={p} featured={p.featured} />
              </Reveal>
            ))}
          </div>
        </ParallaxShell>
      </section>

      {/* Footer */}
      <div className="section-shell mb-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-2.5">
          <img
            src={logo}
            alt="Sakthivel S logo"
            width="24"
            height="24"
            loading="lazy"
            draggable="false"
            className="h-6 w-6 rounded-full object-cover"
          />
          <p className="text-sm font-medium text-white/70">
            Sakthivel S<span className="text-accent">.</span>
          </p>
        </div>
        <a href="/" className="text-xs text-white/50 transition-colors hover:text-accent">
          Back to home
        </a>
      </div>
    </div>
  )
}
