import CtaButton from '@/components/shared/CtaButton'

export default function FinalCtaSection() {
  return (
    <section id="final-cta" className="relative overflow-hidden bg-[var(--ferdi-gradient)] py-16 md:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'rgba(181,226,248,0.12)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[680px] text-center">
          <h2
            className="text-3xl font-semibold leading-tight text-[var(--ferdi-white)] sm:text-4xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            מוכנים לחסוך 80% מזמן האדמיניסטרציה?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--ferdi-ice)] sm:text-lg">
            נקבע פיילוט קצר ונראה איך FERDI משתלב במשרד שלכם בלי לשבש את העבודה השוטפת.
          </p>
          <CtaButton href="#footer" className="mt-8">
            בדקו התאמה למשרד שלכם
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
