'use client'

import { ArrowLeft, CalendarDays, PlayCircle, Terminal } from 'lucide-react'

type TerminalLine = {
  prefix: string
  text: string
  accent?: boolean
}

type ProofItem = {
  label: string
  value: string
}

type StatusItem = {
  label: string
  state: string
  tone: 'stable' | 'active' | 'ready'
}

type LedgerItem = {
  label: string
  value: string
}

const TERMINAL_LINES: TerminalLine[] = [
  { prefix: '$', text: ' skill-deploy ./agent-skills --framework auto' },
  { prefix: '>', text: ' Framework detected: Next.js' },
  { prefix: '>', text: ' Build completed with release checks.' },
  { prefix: '>', text: ' Claim URL prepared. Ownership handoff ready.', accent: true },
]

const HERO_PROOF_ITEMS: ProofItem[] = [
  {
    label: 'Structured Control',
    value: 'Flow clarity from first commit to final ownership handoff.',
  },
  {
    label: 'Execution Calm',
    value: 'Readable status signals instead of operational noise.',
  },
  {
    label: 'High-Trust Delivery',
    value: 'Designed for predictable deployment in production contexts.',
  },
]

const HERO_STATUS_ITEMS: StatusItem[] = [
  { label: 'Delivery Flow', state: 'Stable', tone: 'stable' },
  { label: 'Client Support', state: 'Active', tone: 'active' },
  { label: 'Handoff', state: 'Ready', tone: 'ready' },
]

const HERO_LEDGER_ITEMS: LedgerItem[] = [
  { label: 'Framework Detection', value: 'Auto' },
  { label: 'Deploy Validation', value: 'Passed' },
  { label: 'Ownership Transfer', value: 'Prepared' },
]

export default function Hero() {
  return (
    <section id="hero" className="hero-root">
      <div className="skill-shell hero-shell">
        <div className="hero-stage">
          <div className="hero-stage-atmosphere" aria-hidden="true" />

          <div className="hero-grid">
            <div className="hero-copy-surface">
              <p className="hero-copy-eyebrow">AI Agent Deployment</p>

              <h1 className="hero-title">
                <span>Deploy AI Agent Skills</span>
                <span>in Seconds, Not Hours</span>
              </h1>

              <p className="hero-copy-lead">
                הפלטפורמה המהירה והמבוקרת להפוך Skills של Agent לכלים חיים בפרודקשן, עם אינטגרציה מלאה ל-Vercel ותהליך
                מסודר של Deploy, Claim והעברת בעלות.
              </p>

              <div className="hero-founder-presence" aria-label="Founder oversight">
                <p className="hero-founder-label">Founder Presence</p>
                <div className="hero-founder-list">
                  <div className="hero-founder-pill">
                    <span className="hero-founder-avatar" aria-hidden="true">
                      D
                    </span>
                    <span className="hero-founder-meta">
                      <strong>David</strong>
                      <small>Founder Operator</small>
                    </span>
                  </div>

                  <div className="hero-founder-pill">
                    <span className="hero-founder-avatar" aria-hidden="true">
                      A
                    </span>
                    <span className="hero-founder-meta">
                      <strong>Aviva</strong>
                      <small>Client Success Lead</small>
                    </span>
                  </div>
                </div>
              </div>

              <div className="hero-cta-row">
                <a href="#contact" className="cta-glow cta-primary">
                  Start Deploying for Free
                  <ArrowLeft size={16} aria-hidden="true" />
                </a>
                <a href="#docs" className="cta-secondary">
                  <CalendarDays size={16} aria-hidden="true" />
                  CLI Documentation
                </a>
              </div>

              <dl className="hero-proof-rail">
                {HERO_PROOF_ITEMS.map((item) => (
                  <div key={item.label} className="hero-proof-item">
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="hero-visual-shell">
              <div className="hero-video-layer" aria-hidden="true">
                <video autoPlay loop muted playsInline preload="metadata" poster="">
                  {/* Future replacement path for real founder footage */}
                  <source src="/media/skill-deploy/hero-walk.mp4" type="video/mp4" />
                </video>
              </div>

              <div className="hero-diffusion-veil" aria-hidden="true" />

              <div className="hero-terminal" dir="ltr">
                <div className="terminal-top">
                  <div className="terminal-session-label">
                    <Terminal size={13} aria-hidden="true" />
                    live guidance layer
                  </div>
                  <span className="terminal-inline-url">
                    <PlayCircle size={12} aria-hidden="true" />
                    <span>skill-deploy.vercel.app</span>
                  </span>
                </div>

                <ul className="terminal-status-inline" aria-label="Service signals">
                  {HERO_STATUS_ITEMS.map((item) => (
                    <li key={item.label} className="terminal-status-item">
                      <span className={`hero-status-dot hero-status-${item.tone}`} aria-hidden="true" />
                      <span>{item.label}</span>
                      <strong>{item.state}</strong>
                    </li>
                  ))}
                </ul>

                <div className="terminal-body">
                  {TERMINAL_LINES.map((line) => (
                    <p key={line.text} className={line.accent ? 'terminal-line terminal-line-accent' : 'terminal-line'}>
                      <span className="terminal-prefix">{line.prefix}</span>
                      {line.text}
                    </p>
                  ))}
                </div>

                <div className="hero-terminal-foot" dir="ltr" aria-label="Deployment ledger">
                  {HERO_LEDGER_ITEMS.map((item) => (
                    <div key={item.label} className="hero-terminal-foot-item">
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
