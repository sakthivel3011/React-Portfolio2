import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal, { ParallaxShell, SectionHeader } from './Reveal.jsx'
import useTilt from '../hooks/useTilt.js'
import { SiMongodb } from 'react-icons/si'
import { FaJava, FaDatabase } from 'react-icons/fa'
import mongodbCert from '../assets/certificate/mogodb.jpg'
import oracleApexCert from '../assets/certificate/oracle-apex.png'
import oracleJavaCert from '../assets/certificate/oracle-java.png'

const CERTS = [
  {
    title: 'MongoDB Associate Developer',
    issuer: 'MongoDB University',
    icon: SiMongodb,
    color: '#47A248',
    image: mongodbCert,
  },
  {
    title: 'Oracle APEX Cloud Developer',
    issuer: 'Oracle',
    icon: FaDatabase,
    color: '#F80000',
    image: oracleApexCert,
  },
  {
    title: 'Java Foundations Associate',
    issuer: 'Oracle Academy',
    icon: FaJava,
    color: '#E76F00',
    image: oracleJavaCert,
  },
]

function Lightbox({ cert, onClose }) {
  useEffect(() => {
    if (!cert) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [cert, onClose])

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md sm:p-10"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${cert.title} certificate`}
          data-lenis-prevent
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 8 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.21, 0.65, 0.36, 1] }}
            style={{ transformPerspective: 1200 }}
            className="relative max-h-full w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-strong overflow-hidden rounded-2xl">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-bold sm:text-base">
                    {cert.title}
                  </p>
                  <p className="text-xs text-white/45">{cert.issuer}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close certificate"
                  className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white hover:text-ink"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="max-h-[75svh] overflow-auto bg-white/[0.02] p-3 sm:p-5">
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  className="mx-auto max-h-[68svh] w-auto max-w-full rounded-lg shadow-2xl shadow-black/60"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CertCard({ cert, onOpen }) {
  const tilt = useTilt(5)
  const Icon = cert.icon

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      onClick={() => onOpen(cert)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(cert)}
      role="button"
      tabIndex={0}
      aria-label={`View ${cert.title} certificate`}
      className="tilt-card glass group flex h-full cursor-pointer items-center gap-4 rounded-3xl p-5 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06] sm:p-6"
    >
      <span
        style={{ color: cert.color }}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] transition-transform duration-300 group-hover:scale-110"
      >
        <Icon size={22} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-base font-bold leading-snug">{cert.title}</h3>
        <p className="mt-1 text-xs text-white/45">{cert.issuer}</p>
      </div>
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all duration-300 group-hover:border-accent/50 group-hover:text-accent"
        aria-hidden="true"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  )
}

export default function Certifications() {
  const [active, setActive] = useState(null)

  return (
    <section id="certifications" className="relative py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden="true"
      />
      <ParallaxShell>
        <SectionHeader
          kicker="Certifications"
          title="Verified credentials."
          sub="Click a card to view the certificate."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CERTS.map((c, i) => (
            <Reveal key={c.title} delay={0.06 * i}>
              <CertCard cert={c} onOpen={setActive} />
            </Reveal>
          ))}
        </div>
      </ParallaxShell>

      <Lightbox cert={active} onClose={() => setActive(null)} />
    </section>
  )
}
