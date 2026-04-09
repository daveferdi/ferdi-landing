import styles from './hero.module.css';

const FIELDS = [
  { label: 'ספק', value: 'רוזנברג ושות׳', delay: '0.9s' },
  { label: 'סכום', value: '₪4,250.00', delay: '1.15s' },
  { label: 'מע״מ', value: '₪722.50', delay: '1.4s' },
  { label: 'תאריך', value: '15.03.2026', delay: '1.65s' },
  { label: 'סוג', value: 'חשבונית מס', delay: '1.9s' },
];

const RECEIPT_LINES = [
  { item: 'שירותי ייעוץ', amount: '₪3,200' },
  { item: 'הוצאות נלוות', amount: '₪328' },
  { item: 'מע״מ 17%', amount: '₪722.50' },
];

const PARTICLES = [
  { size: 8, color: 'blue', top: '22%', right: '-24px', dx: '-232px', dy: '-52px', dur: '3s', delay: '0s', opacity: 0.62 },
  { size: 7, color: 'peach', top: '30%', right: '-42px', dx: '-248px', dy: '-38px', dur: '3.4s', delay: '0.45s', opacity: 0.52 },
  { size: 8, color: 'blue', top: '38%', right: '-60px', dx: '-274px', dy: '-12px', dur: '2.9s', delay: '0.9s', opacity: 0.66 },
  { size: 7, color: 'blue', top: '47%', right: '-28px', dx: '-218px', dy: '-28px', dur: '3.2s', delay: '1.3s', opacity: 0.5 },
  { size: 8, color: 'peach', top: '56%', right: '-74px', dx: '-280px', dy: '18px', dur: '3.8s', delay: '0.7s', opacity: 0.55 },
  { size: 7, color: 'blue', top: '64%', right: '-36px', dx: '-242px', dy: '-60px', dur: '4s', delay: '1.8s', opacity: 0.48 },
  { size: 8, color: 'blue', top: '70%', right: '-52px', dx: '-262px', dy: '36px', dur: '3.5s', delay: '1.1s', opacity: 0.58 },
];

export default function HeroMockup() {
  return (
    <div className={styles.mockupWrap} aria-hidden="true">

      {/* Mockup card */}
      <div className={styles.mockupCard}>
        <div className={styles.mockupInner}>
          {/* Extracted data panel */}
          <div className={styles.panelData}>
            <div className={styles.panelTitle}>נתונים שחולצו</div>
            {FIELDS.map((f) => (
              <div
                key={f.label}
                className={styles.field}
                style={{ animationDelay: f.delay }}
              >
                <span className={styles.fieldLabel}>{f.label}</span>
                <span className={styles.fieldValue}>{f.value}</span>
              </div>
            ))}
          </div>

          {/* Receipt panel */}
          <div className={styles.panelReceipt}>
            <div className={styles.scanLine} />
            <div className={styles.receipt}>
              <div className={styles.receiptHeader}>רוזנברג ושות׳</div>
              {RECEIPT_LINES.map((l) => (
                <div key={l.item} className={styles.receiptLine}>
                  <span>{l.item}</span>
                  <span>{l.amount}</span>
                </div>
              ))}
              <div className={styles.receiptTotal}>
                <span>סה״כ</span>
                <span>₪4,250.00</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mockupStatus}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>מעבד קבלה בזמן אמת</span>
        </div>
      </div>
      {/* Data particles */}
      <div className={styles.particlesWrap}>
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className={`${styles.particle} ${p.color === 'peach' ? styles.particlePeach : styles.particleBlue}`}
            style={{
              width: p.size,
              height: p.size,
              top: p.top,
              right: p.right,
              '--dx': p.dx,
              '--dy': p.dy,
              '--dur': p.dur,
              '--delay': p.delay,
              '--peak-opacity': p.opacity,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
