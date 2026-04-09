'use client';

import styles from './hero.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navRight}>
        <a href="#how" className={styles.navLink}>איך זה עובד</a>
        <a href="#security" className={styles.navLink}>אבטחת מידע</a>
        <a href="#calculator" className={styles.navLink}>מחשבון חיסכון</a>
        <button className={styles.navCta}>תיאום פיילוט</button>
      </div>
      <div className={styles.navLeft}>
        <span className={styles.navWord}>Ferdi<span className={styles.navAi}>AI</span></span>
        <img src="/ferdi-logo.svg" alt="Ferdi" className={styles.navLogoImg} />
      </div>
    </nav>
  );
}
