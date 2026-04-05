import styles from './hero.module.css';

const FIELDS = [
  { label: 'ספק', value: 'רוזנברג ושות׳', delay: '0.8s' },
  { label: 'סכום', value: '₪4,250.00', delay: '1.1s' },
  { label: 'מע״מ', value: '₪722.50', delay: '1.4s' },
  { label: 'תאריך', value: '15.03.2026', delay: '1.7s' },
  { label: 'סוג', value: 'חשבונית מס', delay: '2.0s' },
];

const RECEIPT_LINES = [
  { item: 'שירותי ייעוץ', amount: '₪3,200' },
  { item: 'הוצאות נלוות', amount: '₪328' },
  { item: 'מע״מ 17%', amount: '₪722.50' },
];

export default function HeroMockup() {
  return (
    <div className={styles.mockupSide} aria-hidden="true">
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

          {/* Receipt scan panel */}
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

        {/* Status bar */}
        <div className={styles.mockupStatus}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>מעבד קבלה בזמן אמת</span>
        </div>
      </div>
    </div>
  );
}
