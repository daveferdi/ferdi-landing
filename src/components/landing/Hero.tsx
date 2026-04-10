import styles from './hero.module.css';
import Navbar from './Navbar';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import HeroMockup from './HeroMockup';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <HeroBackground />
      <Navbar />
      <div className={styles.heroInner}>
        <HeroContent />
        <HeroMockup />
      </div>
      <div className={styles.security}>
        <div className={styles.secBadge}>
          <span className={styles.secIcon}>🛡</span> SOC 2 Compliant
        </div>
        <div className={styles.secBadge}>
          <span className={styles.secIcon}>🔐</span> הצפנת AES-256
        </div>
      </div>
      <div className={styles.heroTransition} />
    </section>
  );
}
