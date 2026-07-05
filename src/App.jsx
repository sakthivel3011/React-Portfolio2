import { lazy, Suspense, useEffect, useState } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'

const About = lazy(() => import('./components/About.jsx'))
const Skills = lazy(() => import('./components/Skills.jsx'))
const Projects = lazy(() => import('./components/Projects.jsx'))
const Experience = lazy(() => import('./components/Experience.jsx'))
const Education = lazy(() => import('./components/Education.jsx'))
const Certifications = lazy(() => import('./components/Certifications.jsx'))
const Contact = lazy(() => import('./components/Contact.jsx'))
const Footer = lazy(() => import('./components/Footer.jsx'))
const Founder = lazy(() => import('./components/Founder.jsx'))

export default function App() {
  const [route, setRoute] = useState(window.location.hash)
  const isFounder = route.startsWith('#/founder')

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // When switching pages, land at the top (or at the section the link targeted)
  useEffect(() => {
    if (isFounder) {
      window.scrollTo(0, 0)
      return
    }
    const id = window.location.hash
    if (id && id.length > 1 && !id.startsWith('#/')) {
      requestAnimationFrame(() => document.querySelector(id)?.scrollIntoView())
    }
  }, [isFounder])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
    })

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Route in-page anchor clicks through Lenis for eased scrolling
    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const id = anchor.getAttribute('href')
      if (id.length < 2 || id.startsWith('#/')) return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -72, duration: 1.4 })
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-ink text-white">
      {isFounder ? (
        <Suspense fallback={<div className="min-h-screen" />}>
          <Founder />
        </Suspense>
      ) : (
        <>
          <Navbar />
          <main>
            <Hero />
            <Suspense fallback={<div className="min-h-screen" />}>
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Education />
              <Certifications />
              <Contact />
              <Footer />
            </Suspense>
          </main>
        </>
      )}
    </div>
  )
}
