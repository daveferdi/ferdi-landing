import Image from 'next/image'
import styles from './page.module.css'

type ValueCard = {
  label: string
  title: string
  description: string
}

type WorkStep = {
  title: string
  description: string
}

type StatItem = {
  value: string
  label: string
}

const VALUE_CARDS: ValueCard[] = [
  {
    label: 'Platform Clarity',
    title: 'One control plane for shipping',
    description: 'Bring environments, policies, and releases into one calm workflow your team can trust.',
  },
  {
    label: 'Team Focus',
    title: 'Less operational drag',
    description: 'Automate repetitive setup and guardrails so engineers can stay in product flow longer.',
  },
  {
    label: 'Production Confidence',
    title: 'Built for real pressure',
    description: 'Move fast without losing control when incidents, scale, and handoffs happen at the same time.',
  },
]

const WORK_STEPS: WorkStep[] = [
  {
    title: 'Connect your stack',
    description: 'Link repositories, cloud targets, and runtime settings in minutes, not days.',
  },
  {
    title: 'Define release rules',
    description: 'Set clear quality gates and rollout behavior once, then apply them across environments.',
  },
  {
    title: 'Ship with confidence',
    description: 'Deploy with traceability, instant visibility, and a clean handoff to the whole team.',
  },
]

const STATS: StatItem[] = [
  { value: '99.99%', label: 'deployment uptime' },
  { value: '< 8m', label: 'time to first release' },
  { value: '4.2x', label: 'faster delivery cycles' },
  { value: '120+', label: 'teams shipping on Ferdi' },
]

const FOOTER_LINKS = {
  Product: ['Platform', 'Security', 'Roadmap'],
  Resources: ['Docs', 'Status', 'Changelog'],
  Company: ['About', 'Contact', 'Careers'],
}

function LineIcon() {
  return (
    <svg className={styles.lineIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 15.5h5l2.2-3.5 3.6 5.5 2.2-3H21" fill="none" />
      <path d="M3 8h18" fill="none" />
    </svg>
  )
}

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section id="hero" className={`${styles.section} ${styles.heroSection}`}>
        <div className={styles.container}>
          <a className={styles.heroLogoLink} href="#hero" aria-label="Ferdi home">
            <Image
              src="/ferdi_logo_final.svg"
              alt="Ferdi logo"
              width={170}
              height={130}
              priority
              className={styles.logo}
            />
          </a>

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Infrastructure that gets out of your way.</h1>
            <p className={styles.heroSubtitle}>
              Ferdi helps modern teams ship faster with the control, clarity, and calm that production work demands.
            </p>
            <a className={styles.ctaButton} href="#final-cta">
              Start building
            </a>
          </div>
        </div>
      </section>

      <section id="value" className={`${styles.section} ${styles.lightSection}`}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.overline}>Value Proposition</p>
            <h2 className={styles.sectionTitle}>Built for teams who care about speed and standards</h2>
          </header>

          <div className={styles.valueGrid}>
            {VALUE_CARDS.map((card) => (
              <article key={card.title} className={styles.valueCard}>
                <div className={styles.cardTop}>
                  <LineIcon />
                  <p className={styles.overline}>{card.label}</p>
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardBody}>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className={`${styles.section} ${styles.frostSection}`}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.overline}>How It Works</p>
            <h2 className={styles.sectionTitle}>Three steps from setup to stable delivery</h2>
          </header>

          <ol className={styles.stepsGrid}>
            {WORK_STEPS.map((step, index) => (
              <li key={step.title} className={styles.stepCard}>
                <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="stats" className={`${styles.section} ${styles.statsSection}`}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <p className={styles.overlineDark}>Social Proof</p>
            <h2 className={styles.sectionTitleDark}>Trusted by teams that ship every week</h2>
          </header>

          <div className={styles.statsGrid}>
            {STATS.map((stat) => (
              <article key={stat.label} className={styles.statCard}>
                <p className={styles.statValue}>{stat.value}</p>
                <p className={styles.statLabel}>{stat.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="final-cta" className={`${styles.section} ${styles.finalCtaSection}`}>
        <div className={styles.container}>
          <div className={styles.finalCtaInner}>
            <h2 className={styles.finalCtaTitle}>Ready to simplify your delivery stack?</h2>
            <a className={styles.ctaButton} href="#hero">
              See how it works
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerTop}>
            <a className={styles.footerLogoLink} href="#hero" aria-label="Ferdi home">
              <Image
                src="/ferdi_logo_final.svg"
                alt="Ferdi logo"
                width={130}
                height={100}
                className={styles.footerLogo}
              />
            </a>
          </div>

          <div className={styles.footerGrid}>
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title} className={styles.footerColumn}>
                <p className={styles.footerHeading}>{title}</p>
                <ul className={styles.footerLinks}>
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className={styles.footerLink}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}
