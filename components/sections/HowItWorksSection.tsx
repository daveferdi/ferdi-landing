type WorkStep = {
  title: string
  description: string
}

const STEPS: WorkStep[] = [
  {
    title: 'הרודף החכם',
    description:
      'בוט ווטסאפ שפונה ללקוחות ב-10 לחודש, אוסף קבלות, ומתייק אותן ישירות בתיקיית הלקוח בענן.',
  },
  {
    title: 'מפענח ה-OCR',
    description:
      'קריאה מבוססת AI של חשבוניות סרוקות, וחילוץ נתונים מדויק כולל אימות מתמטי למע"מ.',
  },
  {
    title: 'הסוכן המזין (RPA)',
    description: 'הקלדה אוטומטית של פקודות היומן לתוך תוכנת הנהלת החשבונות שלכם.',
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how" className="bg-[var(--ferdi-frost)] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <h2
          className="max-w-[680px] text-3xl font-semibold leading-tight text-[var(--ferdi-navy)] sm:text-4xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          צינור נתונים אוטומטי מקצה לקצה
        </h2>

        <div className="relative mt-12">
          <div className="absolute right-5 top-0 h-full w-px bg-[var(--ferdi-mist)] md:hidden" aria-hidden="true" />
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-[var(--ferdi-mist)] md:block" aria-hidden="true" />

          <ol className="relative grid gap-8 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <li key={step.title} className="relative pr-16 md:pr-0 md:text-center">
                <span className="absolute right-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--ferdi-navy)] font-[var(--font-mono)] text-sm font-medium text-[var(--ferdi-white)] md:static md:mx-auto">
                  {index + 1}
                </span>
                <h3 className="text-xl font-semibold text-[var(--ferdi-navy)] md:mt-6">{step.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-[var(--ferdi-slate)]">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
