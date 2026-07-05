import Reveal, { ParallaxShell, SectionHeader } from './Reveal.jsx'
import { FaJava, FaDatabase } from 'react-icons/fa'
import { TbApi } from 'react-icons/tb'
import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiVite,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiSupabase,
  SiJsonwebtokens,
  SiPrisma,
  SiGoogle,
  SiGoogleappsscript,
  SiBootstrap,
  SiGit,
  SiGithub,
  SiDocker,
  SiCloudflare,
  SiVercel,
} from 'react-icons/si'

const GROUPS = [
  {
    title: 'Languages',
    skills: [
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Java', icon: FaJava, color: '#E76F00' },
    ],
  },
  {
    title: 'Web Technologies',
    skills: [
      { name: 'React.js', icon: SiReact, color: '#61DAFB' },
      { name: 'React Native', icon: SiReact, color: '#61DAFB' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss, color: '#663399' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
      { name: 'Vite', icon: SiVite, color: '#BD34FE' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Oracle DB', icon: FaDatabase, color: '#F80000' },
      { name: 'Firestore', icon: SiFirebase, color: '#FFCA28' },
      { name: 'Supabase', icon: SiSupabase, color: '#3FCF8E' },
    ],
  },
  {
    title: 'Frameworks & APIs',
    skills: [
      { name: 'REST APIs', icon: TbApi, color: '#C9FF3D' },
      { name: 'JWT Auth', icon: SiJsonwebtokens, color: '#ffffff' },
      { name: 'Prisma ORM', icon: SiPrisma, color: '#5A67D8' },
      { name: 'Google APIs', icon: SiGoogle, color: '#4285F4' },
      { name: 'Google Apps Script', icon: SiGoogleappsscript, color: '#4285F4' },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#ffffff' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
      { name: 'Cloudflare', icon: SiCloudflare, color: '#F38020' },
      { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
    ],
  },
]

function SkillTile({ skill }) {
  const Icon = skill.icon
  return (
    <div
      style={{ '--brand': skill.color }}
      className="glass group flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-black/40"
    >
      <Icon
        size={22}
        className="shrink-0 text-[color:var(--brand)] transition-transform duration-300 group-hover:scale-110"
        aria-hidden="true"
      />
      <span className="truncate text-sm font-semibold text-white/75 transition-colors duration-300 group-hover:text-white">
        {skill.name}
      </span>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden="true"
      />
      <ParallaxShell>
        <SectionHeader
          kicker="Skills"
          title="A stack built for shipping."
          sub="Technologies I use daily to design, build and deploy production applications."
        />

        <div className="space-y-10">
          {GROUPS.map((group, gi) => (
            <Reveal key={group.title} delay={0.05 * gi}>
              <div className="grid gap-4 lg:grid-cols-[220px_1fr] lg:gap-8">
                <div className="flex items-start gap-3 lg:pt-2">
                  <span className="mt-[7px] block h-px w-6 bg-accent/70" aria-hidden="true" />
                  <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
                    {group.title}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 xl:grid-cols-4">
                  {group.skills.map((skill) => (
                    <SkillTile key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </ParallaxShell>
    </section>
  )
}
