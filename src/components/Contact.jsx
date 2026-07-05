import { useState } from 'react'
import Reveal, { ParallaxShell, SectionHeader } from './Reveal.jsx'

/**
 * Google Apps Script web-app endpoint (see apps-script/Code.gs for the
 * backend + deploy steps). Paste the /exec URL from your deployment here.
 */
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyJ9_q849k_Y8QZs007sXHrWFi21MJThL7aebhyY--JRwwl4D82X_EqpOknYnl9wi2k/exec'

const CHANNELS = [
  {
    label: 'Instagram',
    value: '@updone.in',
    href: 'https://www.instagram.com/updone.in',
    icon: 'M3 7a4 4 0 014-4h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7zm9 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zM17.3 6.7h.01',
  },
  {
    label: 'Email',
    value: 'sakthii3011@gmail.com',
    href: 'mailto:sakthii3011@gmail.com',
    icon: 'M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zm0 2l8 6 8-6',
  },
  {
    label: 'Business — Updone',
    value: 'info@updone.in',
    href: 'mailto:info@updone.in',
    icon: 'M3 21V8l9-5 9 5v13h-6v-6h-6v6H3z',
  },
  {
    label: 'Phone',
    value: '+91 89254 90989',
    href: 'tel:+918925490989',
    icon: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z',
  },
]

const inputClasses =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors duration-300 focus:border-white/40 focus:bg-white/[0.06]'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)

    setStatus('sending')
    try {
      if (SCRIPT_URL.startsWith('http')) {
        // Apps Script web apps don't return CORS headers, so fire-and-forget
        await fetch(SCRIPT_URL, { method: 'POST', body: data, mode: 'no-cors' })
      }
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 6000)
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden="true"
      />
      <ParallaxShell>
        <SectionHeader
          kicker="Contact"
          title="Let's build something."
          sub="Open to freelance projects, internships and full-time opportunities. Reach out — I usually reply within a day."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
          {/* Channels */}
          <div className="flex flex-col gap-4">
            {CHANNELS.map((c, i) => (
              <Reveal key={c.label} delay={0.07 * i}>
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="glass group flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] transition-colors duration-300 group-hover:bg-accent group-hover:text-ink">
                    <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true" fill={c.fill ? 'currentColor' : 'none'}>
                      <path
                        d={c.icon}
                        stroke={c.fill ? 'none' : 'currentColor'}
                        strokeWidth={c.fill ? 0 : 1.6}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-widest text-white/40">
                      {c.label}
                    </span>
                    <span className="block truncate text-sm font-semibold text-white/85 sm:text-base">
                      {c.value}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}

            
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/45">
                    Name
                  </label>
                  <input id="name" name="name" type="text" required placeholder="Your name" className={inputClasses} />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/45">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClasses} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/45">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project…"
                    className={`${inputClasses} resize-none`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === 'sending' && (
                  <>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="animate-spin"
                    >
                      <path d="M12 3a9 9 0 109 9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                    </svg>
                    Sending…
                  </>
                )}
                {status === 'sent' && 'Message Sent ✓'}
                {status === 'error' && 'Failed — try again'}
                {status === 'idle' && (
                  <>
                    Send Message
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>

              {status === 'sent' && (
                <p className="mt-3 text-xs text-accent">
                  Thanks! Your message is on its way — check your inbox for a confirmation mail.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </ParallaxShell>
    </section>
  )
}
