type SolutionStep = {
  title: string
  description: string
}

const SOLUTION_STEPS: SolutionStep[] = [
  {
    title: '1. הרודף החכם',
    description:
      'בוט ווטסאפ שפונה ללקוחות ב-10 לחודש, אוסף קבלות, ומתייק אותן ישירות בתיקיית הלקוח בענן.',
  },
  {
    title: '2. מפענח ה-OCR',
    description:
      'קריאה מבוססת AI של חשבוניות סרוקות, וחילוץ נתונים מדויק כולל אימות מתמטי למע"מ.',
  },
  {
    title: '3. הסוכן המזין (RPA)',
    description:
      'הקלדה אוטומטית של פקודות היומן לתוך תוכנת הנהלת החשבונות שלכם.',
  },
]

export default function SolutionSection() {
  return (
    <section id="solution" className="bg-[var(--color-bg-secondary)] py-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <h2 className="text-balance text-3xl font-semibold leading-tight text-[var(--color-text-heading)] sm:text-4xl">
          צינור נתונים אוטומטי מקצה לקצה
        </h2>

        <div className="mt-12 space-y-5">
          {SOLUTION_STEPS.map((step) => (
            <article
              key={step.title}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--ferdi-white)] p-6 md:p-8"
            >
              <p className="font-[var(--font-mono)] text-sm text-[var(--ferdi-ocean)] sm:text-base">{step.title}</p>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-text-primary)] sm:text-lg">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
