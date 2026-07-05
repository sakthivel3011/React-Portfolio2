import logo from '../assets/logo-256.png'
import updoneLogo from '../assets/icon.png'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-10">
      <div className="section-shell flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-2.5">
          <img
            src={logo}
            alt="Sakthivel S logo"
            width="28"
            height="28"
            loading="lazy"
            draggable="false"
            className="h-7 w-7 rounded-full border border-white/15 object-cover"
          />
          <div>
            <p className="text-sm font-medium text-white/70">
              Sakthivel S<span className="text-accent">.</span> — Full-Stack Web Developer
            </p>
            <p className="text-xs text-white/35">© 2026 All Rights Reserved</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 sm:items-end">
          <a
            href="https://updone.in"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08]"
          >
            <span className="text-xs text-white/45">Developed &amp; Powered by</span>
            <img
              src={updoneLogo}
              alt="Updone logo"
              width="16"
              height="16"
              loading="lazy"
              draggable="false"
              className="h-4 w-4 object-contain"
            />
            <span className="text-xs font-bold text-white/85 transition-colors group-hover:text-accent">
              Updone
            </span>
          </a>
          <p className="text-xs text-white/35">
            <a href="mailto:sakthii3011@gmail.com" className="transition-colors hover:text-accent">
              sakthii3011@gmail.com
            </a>
            <span className="mx-1.5" aria-hidden="true">·</span>
            <a href="mailto:info@updone.in" className="transition-colors hover:text-accent">
              info@updone.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
