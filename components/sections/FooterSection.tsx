import Image from 'next/image'

const FOOTER_COLUMNS = {
  מוצר: ['איך זה עובד', 'אבטחת מידע', 'תמחור'],
  משאבים: ['מדריכים', 'שאלות נפוצות', 'יצירת קשר'],
  חברה: ['אודות', 'קריירה', 'מדיניות פרטיות'],
}

export default function FooterSection() {
  return (
    <footer id="footer" className="bg-[var(--ferdi-midnight)] py-16">
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-[rgba(126,200,238,0.14)] pb-8">
          <a href="#hero" aria-label="FERDI">
            <Image
              src="/ferdi-logo.svg"
              alt="FERDI"
              width={150}
              height={115}
              className="h-10 w-auto brightness-0 invert opacity-90"
            />
          </a>

          <p className="max-w-[520px] text-sm leading-relaxed text-[var(--ferdi-breeze)]">
            FERDI בונה תשתית תפעולית שקטה למשרדי רואי חשבון, עם אוטומציה מדויקת ושמירה מלאה על פרטיות הלקוחות.
          </p>
        </div>

        <div className="grid gap-8 py-8 sm:grid-cols-3">
          {Object.entries(FOOTER_COLUMNS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-[var(--ferdi-ice)]">{title}</h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[var(--ferdi-slate)] transition-colors duration-200 hover:text-[var(--ferdi-breeze)]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[rgba(126,200,238,0.14)] pt-6 text-xs text-[var(--ferdi-slate)]">
          © {new Date().getFullYear()} FERDI. כל הזכויות שמורות.
        </div>
      </div>
    </footer>
  )
}
