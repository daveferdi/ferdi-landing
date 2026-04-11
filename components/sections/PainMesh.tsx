'use client';

import { useEffect, useRef } from 'react';
import styles from './painSection.module.css';

const W = 600;
const H = 400;
const ROWS = 22;
const COLS = 28;

export default function PainMesh() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';

    let animId: number;
    let time = 0;

    // Friction displacement — congested, irregular, resisting flow
    function getY(col: number, row: number, t: number): number {
      const nx = col / COLS;
      const ny = row / ROWS;
      const baseY = ny * H;

      // Tighter, more congested wave — multiple competing frequencies
      const amp = 25 + Math.sin(ny * Math.PI) * 20;
      const w1 = Math.sin(nx * Math.PI * 3.5 + ny * 3 + t) * amp;
      const w2 = Math.sin(nx * Math.PI * 1.8 + ny * 2.2 + t * 0.4) * amp * 0.5;
      // Friction: a third wave that fights the first two
      const w3 = Math.sin(nx * Math.PI * 5 + ny * 1.5 - t * 0.7) * amp * 0.2;

      return baseY + w1 + w2 + w3;
    }

    // Precompute static noise per grid point for irregularity
    const noise: number[] = [];
    for (let i = 0; i < (ROWS + 1) * (COLS + 1); i++) {
      noise.push((Math.random() - 0.5) * 8);
    }

    function render() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      // Horizontal lines — denser, more congested
      for (let r = 0; r <= ROWS; r++) {
        let d = '';
        for (let c = 0; c <= COLS; c++) {
          const x = (c / COLS) * W;
          const y = getY(c, r, time) + noise[r * (COLS + 1) + c];
          d += (c === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
        }
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');

        const t = r / ROWS;
        // Uneven opacity — some lines denser, others fading = interrupted flow
        const irregularity = 0.7 + Math.sin(r * 2.7) * 0.3;
        const op = (0.06 + Math.sin(t * Math.PI) * 0.05) * irregularity;
        path.setAttribute('stroke', `rgba(6,30,68,${Math.min(op, 0.14)})`);
        path.setAttribute('stroke-width', (0.5 + Math.sin(r * 1.3) * 0.15).toFixed(2));
        svg.appendChild(path);
      }

      // Vertical lines — tighter spacing, congested feel
      for (let c = 0; c <= COLS; c++) {
        let d = '';
        for (let r = 0; r <= ROWS; r++) {
          const x = (c / COLS) * W;
          const y = getY(c, r, time) + noise[r * (COLS + 1) + c];
          d += (r === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
        }
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');

        const t = c / COLS;
        const irregularity = 0.6 + Math.sin(c * 3.1) * 0.4;
        const op = (0.04 + Math.sin(t * Math.PI) * 0.04) * irregularity;
        path.setAttribute('stroke', `rgba(6,30,68,${Math.min(op, 0.12)})`);
        path.setAttribute('stroke-width', '0.4');
        svg.appendChild(path);
      }

      // Very slow, resisting motion
      time += 0.002;
      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    }

    // Intersection observer — only animate when visible
    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !prefersReducedMotion) {
          animId = requestAnimationFrame(render);
        }
      },
      { threshold: 0 }
    );
    observer.observe(container);

    container.appendChild(svg);
    render(); // initial static render

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      if (svg.parentNode) svg.parentNode.removeChild(svg);
    };
  }, []);

  return (
    <div className={styles.painMeshWrap}>
      <div className={styles.painMeshCanvas} ref={canvasRef} />
      <div className={styles.painMeshFadeR} />
      <div className={styles.painMeshFadeT} />
      <div className={styles.painMeshFadeB} />
    </div>
  );
}
