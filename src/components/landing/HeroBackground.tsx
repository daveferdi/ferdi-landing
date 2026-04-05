import styles from './hero.module.css';

export default function HeroBackground() {
  return (
    <>
      {/* Video background layer */}
      <div className={styles.videoBg}>
        {/* 
          Replace src with your video file.
          Drop your mp4 in public/hero-bg.mp4
          If no video yet — this renders as empty dark bg (graceful fallback)
        */}
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
        <div className={styles.videoGradient} />
        <div className={styles.videoSideFade} />
      </div>

      {/* Gradient blobs for depth */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      {/* Vignette */}
      <div className={styles.vignette} />
    </>
  );
}
