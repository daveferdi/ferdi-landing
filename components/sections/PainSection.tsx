import styles from './painSection.module.css'
import PainMesh from './PainMesh'

export default function PainSection() {
  return (
    <section id="pain" className={styles.section}>
      <div className={styles.stage}>
        <PainMesh />
        <div className={styles.inner}>
          <h2 className={styles.headline}>
            העומס לא נובע רק מכמות העבודה.
            <br />
            <span className={styles.headlineSub}>
              הוא נובע מזה שהדברים נופלים בין המערכות, האנשים והמעקב.
            </span>
          </h2>

          <p className={styles.body}>
            מסמכים שמחכים, משימות שעוברות בין אנשים, מעקב ידני, וחוסר
            ודאות לגבי מה הושלם ומה עדיין תקוע — אלה הדברים שמעמיסים
            על המשרד לאורך היום.
          </p>

          <div className={styles.points}>
            <div className={styles.point}>
              <span className={styles.pointMark} />
              <span className={styles.pointText}>מסמכים שלא הגיעו בזמן</span>
            </div>
            <div className={styles.point}>
              <span className={styles.pointMark} />
              <span className={styles.pointText}>משימות שעוברות בין אנשים בלי בעלות ברורה</span>
            </div>
            <div className={styles.point}>
              <span className={styles.pointMark} />
              <span className={styles.pointText}>חוסר תמונת מצב בזמן אמת</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.divider} />
    </section>
  )
}
