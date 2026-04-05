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
    </section>
  );
}
