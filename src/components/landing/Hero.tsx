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
          <h1 className={styles.headline}>
            מערכות AI למשרדי רואי חשבון.
            <br />
            מותאמות למשרד שלך.
          </h1>

          <p className={styles.subtitle}>
            מותאם לצוות, לתהליכים ולמערכות שכבר פועלות במשרד
            — בהטמעה מסודרת, שקופה, וכזו שמשאירה את השליטה אצלך.
          </p>

          <div className={styles.btnRow}>
            <button className={styles.btnPrimary}>לקבוע שיחת היכרות</button>
            <button className={styles.btnGhost}>לראות איך זה עובד</button>
          </div>

          <div className={styles.trustBar}>
            <span className={styles.trustItem}>מותאם למשרד שלך</span>
            <span className={styles.trustSep} />
            <span className={styles.trustItem}>שקיפות מלאה</span>
            <span className={styles.trustSep} />
            <span className={styles.trustItem}>בלי תלות</span>
          </div>
        </div>
      </div>

      <div className={styles.heroTransition} />
    </section>
  );
}
