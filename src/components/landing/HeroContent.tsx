import styles from './hero.module.css';

export default function HeroContent() {
  return (
    <div className={styles.textSide}>
      <div className={styles.overline}>
        <span className={styles.overlineDot} />
        סוכן AI למשרדי רואי חשבון
      </div>

      <h1 className={styles.headline}>
        המירו{' '}
        <span className={styles.headlineAccent}>80%</span>{' '}
        מהאדמיניסטרציה שלכם לשעות ייעוץ רווחיות.
      </h1>

      <p className={styles.subtitle}>
        FERDI הוא הסוכן הדיגיטלי למשרדי רואי חשבון. איסוף קבלות,
        פענוח OCR, והזנת נתונים — הכל אוטומטי, מאובטח, וללא מגע יד אדם.
      </p>

      <div className={styles.btnRow}>
        <button className={styles.btnPrimary}>בדקו התאמה למשרד שלכם</button>
        <button className={styles.btnGhost}>צפו בתהליך העבודה</button>
      </div>

      <div className={styles.trustBar}>
        <span className={styles.trustItem}>🔒 Zero Data Retention</span>
        <span className={styles.trustSep} />
        <span className={styles.trustItem}>⚡ הטמעה מהירה</span>
        <span className={styles.trustSep} />
        <span className={styles.trustItem}>⏱ חיסכון עשרות שעות</span>
      </div>

    </div>
  );
}
