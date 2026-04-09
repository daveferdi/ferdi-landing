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
  { size: 4, color: 'blue', top: '44%', right: '-14px', dx: '-188px', dy: '-28px', dur: '3s', delay: '0s', opacity: 0.5 },
  { size: 3, color: 'peach', top: '53%', right: '-10px', dx: '-178px', dy: '-48px', dur: '3.5s', delay: '0.5s', opacity: 0.4 },
  { size: 4, color: 'blue', top: '49%', right: '-18px', dx: '-202px', dy: '-12px', dur: '2.8s', delay: '1s', opacity: 0.5 },
  { size: 3, color: 'blue', top: '59%', right: '-8px', dx: '-172px', dy: '-36px', dur: '3.2s', delay: '1.5s', opacity: 0.3 },
  { size: 3, color: 'peach', top: '47%', right: '-16px', dx: '-196px', dy: '12px', dur: '3.8s', delay: '0.8s', opacity: 0.4 },
  { size: 2, color: 'blue', top: '56%', right: '-6px', dx: '-184px', dy: '-54px', dur: '4s', delay: '2s', opacity: 0.35 },
  { size: 3, color: 'blue', top: '41%', right: '-12px', dx: '-168px', dy: '-18px', dur: '3.3s', delay: '1.2s', opacity: 0.45 },
];

export default function HeroMockup() {
  return (
    <div className={styles.mockupWrap} aria-hidden="true">
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
    </div>
  );
}
