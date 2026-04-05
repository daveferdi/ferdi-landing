import { Clock, Keyboard, MessageCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type ProblemCard = {
  title: string
  description: string
  icon: LucideIcon
}

const PROBLEM_CARDS: ProblemCard[] = [
  {
    icon: MessageCircle,
    title: 'רודפים אחרי לקוחות',
    description: 'שעות של הודעות וטלפונים כדי לאסוף חומר בווטסאפ.',
  },
  {
    icon: Keyboard,
    title: 'הקלדה ידנית מתסכלת',
    description: 'הזנת נתונים סיזיפית שמובילה לעייפות וטעויות אנוש.',
  },
  {
    icon: Clock,
    title: 'צוואר בקבוק',
    description: 'חוסר יכולת לקלוט לקוחות חדשים בגלל עומס תפעולי.',
  },
]

export default function ProblemSection() {
  return (
    <section id="problem" className="bg-[var(--ferdi-white)] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <h2
          className="max-w-[680px] text-3xl font-semibold leading-tight text-[var(--ferdi-navy)] sm:text-4xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          ה-15 לחודש לא חייב להיות סיוט.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PROBLEM_CARDS.map((card) => {
            const Icon = card.icon

            return (
              <article
                key={card.title}
                className="rounded-[16px] border border-[var(--ferdi-mist)] bg-[var(--ferdi-frost)] p-8 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(6,30,68,0.08)]"
              >
                <Icon className="h-6 w-6 text-[var(--ferdi-sky)]" aria-hidden="true" />
                <h3 className="mt-6 text-xl font-semibold text-[var(--ferdi-navy)]">{card.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-[var(--ferdi-slate)]">{card.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
