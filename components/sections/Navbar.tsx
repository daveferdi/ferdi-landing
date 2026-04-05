import Image from 'next/image'
import CtaButton from '@/components/shared/CtaButton'

const NAV_LINKS = [
  { label: 'איך זה עובד', href: '#how' },
  { label: 'אבטחת מידע', href: '#stats' },
  { label: 'מחשבון חיסכון', href: '#problem' },
]

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-[rgba(255,255,255,0.06)]"
      style={{
        background: 'rgba(6,30,68,0.85)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-10">
        <a href="#hero" aria-label="FERDI">
          <Image src="/ferdi-logo.svg" alt="FERDI" width={150} height={115} priority className="h-10 w-auto" />
        </a>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav
            className="hidden items-center gap-5 text-sm font-medium text-[var(--ferdi-breeze)] md:flex"
            aria-label="ניווט ראשי"
          >
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="transition-colors duration-200 hover:text-[var(--ferdi-white)]">
                {link.label}
              </a>
            ))}
          </nav>

          <CtaButton href="#final-cta" size="sm">
            תיאום פיילוט
          </CtaButton>
        </div>
      </div>
    </header>
  )
}
