import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
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
const AllProjects = lazy(() => import('./components/AllProjects.jsx'))

export default function App() {
  const [path, setPath] = useState(window.location.pathname)
  const isFounder = path === '/founder'
  const isAllProjects = path === '/projects'
  const isSubPage = isFounder || isAllProjects

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Intercept clicks on internal path links (e.g. /founder, /projects, /) and
  // navigate via the History API instead of a full page reload.
  const navigate = useCallback((href) => {
    const url = new URL(href, window.location.origin)
    const pathChanged = url.pathname !== window.location.pathname
    window.history.pushState({}, '', url.pathname + url.hash)
    if (pathChanged) setPath(url.pathname)
    requestAnimationFrame(() => {
      if (url.hash) {
        document.querySelector(url.hash)?.scrollIntoView()
      } else {
        window.scrollTo(0, 0)
      }
    })
  }, [])

  useEffect(() => {
    const onClick = (e) => {
      const anchor = e.target.closest('a[href]')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return
      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('/') || href.startsWith('//')) return
      e.preventDefault()
      navigate(href)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate])

  // When switching pages, land at the top (or at the section the link targeted)
  useEffect(() => {
    if (isSubPage) {
      window.scrollTo(0, 0)
      return
    }
    const id = window.location.hash
    if (id && id.length > 1) {
      requestAnimationFrame(() => document.querySelector(id)?.scrollIntoView())
    }
  }, [isSubPage])

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
      if (id.length < 2) return
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
      ) : isAllProjects ? (
        <Suspense fallback={<div className="min-h-screen" />}>
          <AllProjects />
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
