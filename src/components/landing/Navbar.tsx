'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './hero.module.css';

const LETTERS = ['F', 'e', 'r', 'd', 'i'];
const AI_LETTERS = ['A', 'I'];
const ALL = [...LETTERS, ...AI_LETTERS];

// Each letter flies in from a different off-screen origin
const ORIGINS = [
  { x: -600, y: -200, r: -45 },   // F — far top-left
  { x: 500, y: -300, r: 30 },     // e — far top-right
  { x: -400, y: 250, r: 50 },     // r — far bottom-left
  { x: 700, y: 100, r: -35 },     // d — far right
  { x: -300, y: -250, r: 40 },    // i — far top-left
  { x: 600, y: -150, r: -50 },    // A — far top-right
  { x: -500, y: 200, r: 35 },     // I — far bottom-left
];

// Stagger delay per letter (ms)
const STAGGER = 140;
const BASE_DELAY = 500;

export default function Navbar() {
  const [landed, setLanded] = useState<boolean[]>(new Array(ALL.length).fill(false));
  const hasScrollTriggered = useRef(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function triggerSequence() {
    // Reset all to flying
    setLanded(new Array(ALL.length).fill(false));

    // Land each letter one by one
    ALL.forEach((_, i) => {
      const t = setTimeout(() => {
        setLanded(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, BASE_DELAY + i * STAGGER);
      timeoutsRef.current.push(t);
    });
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setLanded(new Array(ALL.length).fill(true));
      return;
    }

    // First trigger on load
    triggerSequence();

    // Second trigger on first scroll
    function onScroll() {
      if (hasScrollTriggered.current) return;
      if (window.scrollY > 150) {
        hasScrollTriggered.current = true;
        triggerSequence();
        window.removeEventListener('scroll', onScroll);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.navRight}>
        <a href="#how" className={styles.navLink}>איך זה עובד</a>
        <a href="#security" className={styles.navLink}>אבטחת מידע</a>
        <a href="#calculator" className={styles.navLink}>מחשבון חיסכון</a>
        <button className={styles.navCta}>תיאום פיילוט</button>
      </div>
      <div className={styles.navLeft}>
        <span className={styles.navWordWrap}>
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              className={styles.navLetter}
              style={landed[i] ? {
                transform: 'translate(0, 0) rotate(0deg)',
                opacity: 1,
              } : {
                transform: `translate(${ORIGINS[i].x}px, ${ORIGINS[i].y}px) rotate(${ORIGINS[i].r}deg)`,
                opacity: 0,
              }}
            >
              {letter}
            </span>
          ))}
          {AI_LETTERS.map((letter, i) => {
            const idx = LETTERS.length + i;
            return (
              <span
                key={`ai-${i}`}
                className={styles.navAiLetter}
                style={landed[idx] ? {
                  transform: 'translate(0, 0) rotate(0deg)',
                  opacity: 1,
                } : {
                  transform: `translate(${ORIGINS[idx].x}px, ${ORIGINS[idx].y}px) rotate(${ORIGINS[idx].r}deg)`,
                  opacity: 0,
                }}
              >
                {letter}
              </span>
            );
          })}
        </span>
        <img src="/ferdi-logo.svg" alt="Ferdi" className={styles.navLogoImg} />
      </div>
    </nav>
  );
}
