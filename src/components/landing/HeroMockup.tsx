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
  { size: 7, color: 'blue',  top: '30%', right: '-30px', dx: '-220px', dy: '-25px', dur: '3s',   delay: '0s',   po: 0.6 },
  { size: 6, color: 'peach', top: '45%', right: '-15px', dx: '-200px', dy: '-45px', dur: '3.5s', delay: '0.6s', po: 0.4 },
  { size: 7, color: 'blue',  top: '55%', right: '-40px', dx: '-240px', dy: '-10px', dur: '2.8s', delay: '1.1s', po: 0.55 },
  { size: 5, color: 'blue',  top: '65%', right: '-20px', dx: '-180px', dy: '-35px', dur: '3.3s', delay: '1.6s', po: 0.35 },
  { size: 6, color: 'peach', top: '38%', right: '-50px', dx: '-230px', dy: '15px',  dur: '3.8s', delay: '0.9s', po: 0.4 },
  { size: 5, color: 'blue',  top: '50%', right: '-60px', dx: '-210px', dy: '-50px', dur: '4s',   delay: '2s',   po: 0.3 },
];

export default function HeroMockup() {
  return (
    <div className={styles.mockupWrap} aria-hidden="true">
      {/* Particles — OUTSIDE the card, floating in space around it */}
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
              '--po': p.po,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Mockup card */}
      <div className={styles.mockupCard}>
        <div className={styles.mockupInner}>
          <div className={styles.panelData}>
            <div className={styles.panelTitle}>נתונים שחולצו</div>
            {FIELDS.map((f) => (
              <div key={f.label} className={styles.field} style={{ animationDelay: f.delay }}>
                <span className={styles.fieldLabel}>{f.label}</span>
                <span className={styles.fieldValue}>{f.value}</span>
              </div>
            ))}
          </div>
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
