import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import logo from '../assets/logo-256.png'
import resumePdf from '../assets/Sakthivel-Resume.pdf'

const LINKS = [
  { label: 'Overview', href: '#home' },
  { label: 'About', href: '#about', mobileOnly: true },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Company', href: '#/founder' },
]

const DESKTOP_LINKS = LINKS.filter((l) => !l.mobileOnly)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)
  const resumeRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close the resume menu on outside click / Escape
  useEffect(() => {
    if (!resumeOpen) return
    const onDown = (e) => {
      if (resumeRef.current && !resumeRef.current.contains(e.target)) setResumeOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setResumeOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [resumeOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
        aria-hidden="true"
      />
      <nav
        className={`mx-auto flex h-16 sm:h-[4.5rem] max-w-6xl items-center justify-between px-5 sm:px-8 transition-all duration-500 ${
          scrolled ? 'sm:mt-3' : 'sm:mt-0'
        }`}
      >
        <div
          className={`absolute inset-0 -z-10 transition-all duration-500 ${
            scrolled
              ? 'glass-strong sm:mx-4 sm:mt-3 sm:rounded-2xl'
              : 'bg-transparent border-transparent'
          }`}
          aria-hidden="true"
        />

        <a
          href="#home"
          className="no-tap-highlight flex items-center gap-2.5 font-display text-lg font-bold tracking-tight"
        >
          <img
            src={logo}
            alt="Sakthivel S logo"
            width="36"
            height="36"
            draggable="false"
            className="h-9 w-9 rounded-full border border-white/15 object-cover shadow-lg shadow-black/40 transition-transform duration-300 hover:scale-105"
          />
          <span className="hidden xs:inline">
            Sakthivel S<span className="text-accent">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {DESKTOP_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/60 transition-colors duration-300 hover:bg-white/[0.06] hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}

          {/* Resume: click asks Preview or Download */}
          <li className="relative" ref={resumeRef}>
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={resumeOpen}
              onClick={() => setResumeOpen((v) => !v)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 hover:bg-white/[0.06] hover:text-white ${
                resumeOpen ? 'bg-white/[0.06] text-white' : 'text-white/60'
              }`}
            >
              Resume
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className={`transition-transform duration-300 ${resumeOpen ? 'rotate-180' : ''}`}
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <AnimatePresence>
              {resumeOpen && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="glass-strong absolute right-0 top-full mt-3 w-48 origin-top-right rounded-2xl p-1.5 shadow-2xl shadow-black/60"
                >
                  <a
                    href={resumePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    onClick={() => setResumeOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    Preview
                  </a>
                  <a
                    href={resumePdf}
                    download="Sakthivel-Resume.pdf"
                    role="menuitem"
                    onClick={() => setResumeOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Download
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li className="ml-2">
            <a href="#contact" className="btn-primary !px-5 !py-2 text-xs">
              Hire Me
            </a>
          </li>
        </ul>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="no-tap-highlight relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] lg:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-white transition-transform duration-300 ${
                open ? 'translate-y-[5.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-px w-full bg-white transition-opacity duration-300 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-full bg-white transition-transform duration-300 ${
                open ? '-translate-y-[5.5px] -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink/95 backdrop-blur-2xl lg:hidden"
          >
            <ul className="flex min-h-full flex-col items-center justify-center gap-1.5 px-8 py-24 sm:gap-2">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.35 }}
                  className="w-full max-w-xs"
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-6 py-3 text-center font-display text-xl font-semibold text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white sm:py-4 sm:text-2xl"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * LINKS.length, duration: 0.35 }}
                className="mt-4 w-full max-w-xs"
              >
                <a
                  href={resumePdf}
                  download="Sakthivel-Resume.pdf"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full !py-4 !text-base"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download Resume
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
