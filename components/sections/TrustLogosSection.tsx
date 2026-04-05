const TRUST_LOGOS = ['Levi & Co.', 'Mor Accountants', 'Keren פיננסים', 'North CPA Group', 'Axis Tax', 'Office 365 Ledger']

export default function TrustLogosSection() {
  return (
    <section id="proof" className="bg-[var(--ferdi-white)] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <h2
          className="max-w-[680px] text-3xl font-semibold leading-tight text-[var(--ferdi-navy)] sm:text-4xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          נבחר על ידי משרדים מובילים
        </h2>
        <p className="mt-4 max-w-[680px] text-base leading-relaxed text-[var(--ferdi-slate)] sm:text-lg">
          FERDI משתלב בתהליכי עבודה קיימים בלי לשבור נהלים, ומאפשר לצוותים להחזיר שליטה תפעולית כבר מהחודש הראשון.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_LOGOS.map((name) => (
            <div
              key={name}
              className="flex h-20 items-center justify-center rounded-[16px] border border-[var(--ferdi-mist)] bg-[var(--ferdi-frost)] px-4 text-center text-sm font-medium tracking-[0.08em] text-[var(--ferdi-slate)] grayscale"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
