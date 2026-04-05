type StatItem = {
  value: string
  label: string
}

const STATS: StatItem[] = [
  { value: '80%+', label: 'חיסכון בזמן אדמיניסטרטיבי' },
  { value: '15 דקות', label: 'זמן הטמעה ראשוני' },
  { value: '0 טעויות', label: 'בהזנה ידנית חוזרת' },
  { value: '100+ משרדים', label: 'שכבר עובדים עם FERDI' },
]

export default function StatsSection() {
  return (
    <section
      id="stats"
      className="relative overflow-hidden border-y border-[rgba(126,200,238,0.1)] py-16 md:py-24"
      style={{
        background:
          'radial-gradient(ellipse at 20% 0%, rgba(26,109,191,0.14) 0%, transparent 55%), radial-gradient(ellipse at 85% 100%, rgba(62,172,224,0.08) 0%, transparent 45%), var(--ferdi-midnight)',
      }}
    >
      <div
        className="pointer-events-none absolute -top-24 left-1/3 h-[260px] w-[260px] rounded-full blur-3xl"
        style={{ background: 'rgba(126,200,238,0.07)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <h2
          className="max-w-[680px] text-3xl font-semibold leading-tight text-[var(--ferdi-white)] sm:text-4xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          אבטחת מידע ברמה צבאית, תוצאות שנמדדות במספרים.
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <article
              key={stat.label}
              className="rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-6 backdrop-blur-[12px]"
            >
              <p className="font-[var(--font-mono)] text-4xl font-semibold leading-none text-[var(--ferdi-ice)] sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ferdi-slate)]">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
