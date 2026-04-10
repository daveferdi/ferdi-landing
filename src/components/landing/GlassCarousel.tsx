'use client';

import { useEffect, useRef } from 'react';
import styles from './glassCarousel.module.css';

const CARDS = [
  { title: 'קליטת לקוח חדשה', body: 'פתיחה מסודרת של התהליך, מהמסמכים ועד ההעברה לגורם הנכון.' },
  { title: 'איסוף מסמכים שוטף', body: 'תזכורות ומעקב רציף, בלי לרדוף ידנית אחרי כל לקוח.' },
  { title: 'בקרת עבודה פנימית', body: 'חסרים, אישורים והעברות בין אנשי צוות — עם סדר ברור.' },
  { title: 'חיבור למערכות קיימות', body: 'עובד סביב הכלים שכבר פועלים במשרד.' },
  { title: 'תמונת מצב ברורה', body: 'מה פתוח, מה ממתין ומה הושלם — בכל רגע.' },
];

const CARD_COUNT = CARDS.length;
const CARD_WIDTH = 328;
const GAP = 26;
const SLOT = CARD_WIDTH + GAP;
const SET_WIDTH = CARD_COUNT * SLOT;

export default function GlassCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animId: number;
    let offset = -SET_WIDTH;
    const speed = 0.3;

    function animate() {
      offset += speed;
      if (offset >= 0) offset -= SET_WIDTH;
      track!.style.transform = `translateX(${offset}px)`;
      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animId);
  }, []);

  // 3 sets for seamless loop
  const allCards = Array.from({ length: CARD_COUNT * 3 }, (_, i) => {
    const card = CARDS[i % CARD_COUNT];
    return (
      <div key={i} className={styles.card}>
        <div className={styles.cardInner}>
          <h3 className={styles.cardTitle}>{card.title}</h3>
          <p className={styles.cardBody}>{card.body}</p>
        </div>
      </div>
    );
  });

  return (
    <div className={styles.wrap}>
      <div className={styles.track} ref={trackRef}>
        {allCards}
      </div>
    </div>
  );
}
