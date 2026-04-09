import styles from './hero.module.css';

export default function HeroBackground() {
  return (
    <>
      <div className={styles.videoBg}>
        <video className={styles.video} autoPlay muted loop playsInline preload="auto">
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoOverlay} />
      </div>
      <div className={styles.bgBase} />
      <div className={styles.bgDiag} />
      <div className={styles.bgDepth} />
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      <div className={styles.bgToplight} />
      <div className={styles.bgNoise} />
      <div className={styles.bgBottomLine} />
    </>
  );
}
