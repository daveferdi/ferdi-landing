'use client'

import { useState } from 'react'
import { ArrowLeft, Check, Copy, ExternalLink, Github, Rocket, Settings2, ShieldCheck } from 'lucide-react'
import Hero from './Hero'

type ValueCard = {
  title: string
  description: string
  bullets: string[]
  icon: typeof Settings2
}

type FlowStep = {
  title: string
  detail: string
}

type TrustPillar = {
  title: string
  detail: string
}

const NAV_ITEMS = [
  { href: '#benefits', label: 'Capabilities' },
  { href: '#how', label: 'How It Works' },
  { href: '#docs', label: 'Operational Clarity' },
  { href: '#trust', label: 'Institutional Trust' },
  { href: '#contact', label: 'Start' },
]

const FRAMEWORKS = ['Next.js', 'Vite', 'Astro', 'Remix', 'SvelteKit', 'Nuxt', 'React Router', 'Gatsby', 'Storybook']

const VALUE_CARDS: ValueCard[] = [
  {
    title: 'Zero Configuration Detection',
    description: 'המערכת מזהה framework, תלותים ותצורת build באופן אוטומטי וללא הכנה ידנית.',
    bullets: ['Auto framework detection', 'Deterministic packaging', 'Clean preview generation'],
    icon: Settings2,
  },
  {
    title: 'Claimable Ownership Flow',
    description: 'כל deployment יוצא עם מנגנון Claim מובנה להעברת בעלות מסודרת למשתמש קצה.',
    bullets: ['Structured ownership transfer', 'Secure claim handoff', 'Readable deployment trail'],
    icon: ShieldCheck,
  },
  {
    title: 'Production Governance',
    description: 'תשתית פריסה יציבה שמחברת מהירות ביצוע עם בקרה ואמינות ברמת production.',
    bullets: ['Operational stability', 'Policy-ready release path', 'Live status visibility'],
    icon: Rocket,
  },
]

const FLOW_STEPS: FlowStep[] = [
  {
    title: 'Connect',
    detail: 'מחברים את קוד ה-Agent או skill repository ומגדירים יעד פריסה.',
  },
  {
    title: 'Build',
    detail: 'FERDI מריץ זיהוי אוטומטי, בונה חבילה ומוודא שכל התלויות והתצורה תקינות.',
  },
  {
    title: 'Deploy',
    detail: 'נוצר URL חי יחד עם Claim URL להעברת בעלות וניהול המשך ב-Vercel.',
  },
]

const TRUST_PILLARS: TrustPillar[] = [
  {
    title: 'Human Oversight',
    detail: 'צוות FERDI מגדיר תהליך עם רמת שקיפות שמאפשרת קבלת החלטות מהירה ובטוחה.',
  },
  {
    title: 'Operational Discipline',
    detail: 'הפריסות מנוהלות כשרשרת מבוקרת: זיהוי, build, בדיקת תקינות, ו-handoff.',
  },
  {
    title: 'Calm Delivery Experience',
    detail: 'פחות רעש תפעולי, יותר בהירות מערכתית גם כאשר הסביבה מורכבת.',
  },
]

const CLI_SNIPPET = 'npx skill-deploy ./agent-skills --framework auto --claim --target vercel'

export default function HomePage() {
  const [copied, setCopied] = useState(false)

  const handleCopySnippet = async () => {
    try {
      await navigator.clipboard.writeText(CLI_SNIPPET)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <main className="skill-page relative z-10">
      <SiteHeader />
      <Hero />

      <section className="skill-shell section-block section-block-compact" aria-label="Trusted frameworks">
        <p className="section-eyebrow section-eyebrow-center">Trusted framework coverage</p>
        <div className="framework-marquee">
          <ul className="framework-marquee-track" dir="ltr">
            {[...FRAMEWORKS, ...FRAMEWORKS].map((item, index) => (
              <li key={`${item}-${index}`} className="framework-chip">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="benefits" className="skill-shell section-block">
        <div className="section-heading">
          <p className="section-eyebrow">What FERDI Delivers</p>
          <h2 className="section-title">Agent deployment that stays clear, controlled, and production-ready</h2>
        </div>

        <div className="feature-grid">
          {VALUE_CARDS.map((card) => (
            <article key={card.title} className="value-card">
              <div className="value-icon">
                <card.icon size={18} aria-hidden="true" />
              </div>

              <h3>{card.title}</h3>
              <p>{card.description}</p>

              <ul>
                {card.bullets.map((bullet) => (
                  <li key={bullet}>
                    <Check size={14} aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="how" className="skill-shell section-block">
        <div className="section-heading">
          <p className="section-eyebrow">Flow</p>
          <h2 className="section-title">Connect. Build. Deploy.</h2>
        </div>

        <div className="flow-grid">
          {FLOW_STEPS.map((step, index) => (
            <article key={step.title} className="step-card">
              <p className="step-index">0{index + 1}</p>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="docs" className="skill-shell section-block">
        <div className="code-panel">
          <div className="code-panel-top">
            <div>
              <p className="section-eyebrow">Operational Clarity</p>
              <h3>One clean command to start locally</h3>
            </div>

            <button type="button" onClick={handleCopySnippet} className="copy-button">
              {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy command'}
            </button>
          </div>

          <pre className="code-block" dir="ltr">
            <code>{CLI_SNIPPET}</code>
          </pre>
        </div>
      </section>

      <section id="trust" className="skill-shell section-block">
        <div className="institution-layer">
          <div className="section-heading">
            <p className="section-eyebrow">Institutional Trust</p>
            <h2 className="section-title">Built to feel calm and dependable under real operating pressure</h2>
          </div>

          <div className="institution-grid">
            {TRUST_PILLARS.map((pillar) => (
              <article key={pillar.title} className="institution-card">
                <h3>{pillar.title}</h3>
                <p>{pillar.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="skill-shell section-block section-block-last">
        <div className="glass-callout">
          <p className="section-eyebrow">Final CTA</p>
          <h2 className="section-title">Start Deploying for Free</h2>
          <p className="section-subtitle">
            Turn deployment complexity into one controlled, readable flow your team can trust.
          </p>

          <div className="cta-row">
            <a href="#hero" className="cta-glow cta-primary">
              Start Deploying for Free
              <ArrowLeft size={16} aria-hidden="true" />
            </a>
            <a href="#docs" className="cta-secondary">
              Read Docs
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="skill-shell site-header-inner">
        <a href="#hero" className="brand-lockup">
          <span className="brand-mark">F</span>
          <span className="brand-copy">
            <span className="brand-copy-top">FERDI</span>
            <span className="brand-copy-main">Skill Deploy</span>
          </span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="site-header-cta">
          Start Free
          <ArrowLeft size={14} aria-hidden="true" />
        </a>
      </div>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="skill-shell site-footer-inner">
        <p>© {new Date().getFullYear()} FERDI Skill Deploy</p>

        <div className="footer-links">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-link">
            <Github size={14} aria-hidden="true" />
            GitHub
            <ExternalLink size={12} aria-hidden="true" />
          </a>
          <a href="https://vercel.com" target="_blank" rel="noreferrer" className="footer-link">
            Vercel
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
