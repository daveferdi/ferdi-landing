'use client';

import { useEffect, useRef } from 'react';
import styles from './glassCarousel.module.css';

const CARD_COUNT = 8;
const CARD_WIDTH = 280;
const GAP = 24;
const SLOT = CARD_WIDTH + GAP; // 304px per card
const SET_WIDTH = CARD_COUNT * SLOT;

export default function GlassCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animId: number;
    // Start offset so middle set is visible
    let offset = -SET_WIDTH;
    const speed = 0.4;

    function animate() {
      offset += speed;
      // When we've scrolled one full set forward, jump back seamlessly
      if (offset >= 0) offset -= SET_WIDTH;
      track.style.transform = `translateX(${offset}px)`;
      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animId);
  }, []);

  // Render 3 sets for truly seamless infinite loop
  const cards = Array.from({ length: CARD_COUNT * 3 }, (_, i) => (
    <div key={i} className={styles.card}>
      <div className={styles.cardInner} />
    </div>
  ));

  return (
    <div className={styles.wrap}>
      <div className={styles.track} ref={trackRef}>
        {cards}
      </div>
    </div>
  );
}
