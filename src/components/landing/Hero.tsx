import styles from './hero.module.css';
import Navbar from './Navbar';
import HeroBackground from './HeroBackground';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <HeroBackground />
      <Navbar />
      <div className={styles.heroTransition} />
    </section>
  );
}
