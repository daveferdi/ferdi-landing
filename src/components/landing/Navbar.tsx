'use client';

import { useState, useEffect } from 'react';
import styles from './hero.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      {/* Links + CTA — right side (RTL start) */}
      <div className={styles.navLinks}>
        <a href="#how" className={styles.navLink}>איך זה עובד</a>
        <a href="#security" className={styles.navLink}>אבטחת מידע</a>
        <a href="#calculator" className={styles.navLink}>מחשבון חיסכון</a>
        <button className={styles.navCta}>תיאום פיילוט</button>
      </div>

      {/* Logo — left side (RTL end) */}
      <div className={styles.navLogo}>
        <span className={styles.navWordmark}>Ferdi</span>
        {/* 
          Logo loaded from public/ferdi-logo.svg
          Replace the src to update the logo anytime 
        */}
        <img
          src="/ferdi-logo.svg"
          alt="Ferdi"
          className={styles.navLogoImg}
        />
      </div>
    </nav>
  );
}
