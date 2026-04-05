import { ShieldCheck } from 'lucide-react'

export default function TrustBanner() {
  return (
    <section id="trust" className="bg-[var(--ferdi-midnight)] py-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[auto,1fr] lg:items-start">
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-2xl bg-[color:rgba(126,200,238,0.14)]">
            <ShieldCheck className="h-14 w-14 text-[var(--ferdi-ice)]" aria-hidden="true" />
          </div>

          <div>
            <h2 className="text-balance text-3xl font-semibold leading-tight text-[var(--ferdi-white)] sm:text-4xl">
              אבטחת מידע ברמה צבאית.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--ferdi-ice)]">
              אנחנו מבינים שחיסיון לקוחות הוא הכל. המערכות של FERDI פועלות תחת תקני האבטחה המחמירים ביותר.
              שום נתון פיננסי לא משמש לאימון מודלים חיצוניים (Zero Data Retention). המידע נשאר 100% שלכם.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
