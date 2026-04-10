import styles from './hero.module.css';
import Navbar from './Navbar';
import HeroBackground from './HeroBackground';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <HeroBackground />
      <Navbar />

      <div className={styles.heroStage}>
        <div className={styles.heroContent}>
          <div className={styles.overline}>
            סוכן AI להנהלת חשבונות
          </div>

          <h1 className={styles.headline}>
            60% מזמן המשרד מתבזבז על עבודת &quot;קלדנות&quot;.
          </h1>

          <p className={styles.subtitle}>
            FerdiAI מחלץ נתונים מצילומי ווטסאפ וקבלות מקומטות, מסווג
            לחשבון הנכון ומקליד ישירות לחשבשבת או לפריוריטי. הכל
            ברקע, בלי מגע יד אדם. הגיע הזמן לחזור לייעץ.
          </p>

          <div className={styles.btnRow}>
            <button className={styles.btnPrimary}>איך זה עובד בפועל</button>
            <button className={styles.btnGhost}>בדיקת התאמה למשרד</button>
          </div>

          <div className={styles.trustBar}>
            <span className={styles.trustItem}>99.9% דיוק סיווג</span>
            <span className={styles.trustSep} />
            <span className={styles.trustItem}>עיבוד מסמך ב-0.8 שניות</span>
            <span className={styles.trustSep} />
            <span className={styles.trustItem}>אינטגרציה מלאה ל-ERP</span>
          </div>
        </div>
      </div>

      <div className={styles.heroTransition} />
    </section>
  );
}
