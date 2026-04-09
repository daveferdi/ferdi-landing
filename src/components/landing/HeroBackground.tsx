import styles from './hero.module.css';

export default function HeroBackground() {
  return (
    <>
      {/* Layer 0: Video (optional — graceful fallback if no video) */}
      <div className={styles.videoBg}>
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoOverlay} />
      </div>

      {/* Layer 1: Blue gradient base */}
      <div className={styles.bgBase} />
      <div className={styles.bgDiag} />
      <div className={styles.bgDepth} />

      {/* Layer 2: Ambient glows */}
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      <div className={styles.bgToplight} />

      {/* Layer 3: Noise texture */}
      <div className={styles.bgNoise} />

      {/* Bottom accent line */}
      <div className={styles.bgBottomLine} />
    </>
  );
}
