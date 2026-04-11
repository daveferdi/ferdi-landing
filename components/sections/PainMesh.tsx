'use client';

import { useEffect, useRef } from 'react';
import styles from './painSection.module.css';

const W = 900;
const H = 600;
const ROWS = 40;
const COLS = 55;

// Compression zone — where lines bunch together
const CRUSH_X = W * 0.35;
const CRUSH_Y = H * 0.48;
const CRUSH_RADIUS = W * 0.22;

export default function PainMesh() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';

    let animId: number;
    let time = 0;

    // Compression field: pulls points toward the crush zone center
    // Creates visual bunching/folding of lines
    function compress(px: number, py: number): { dx: number; dy: number; intensity: number } {
      const diffX = px - CRUSH_X;
      const diffY = py - CRUSH_Y;
      const dist = Math.sqrt(diffX * diffX + diffY * diffY);

      if (dist > CRUSH_RADIUS || dist < 1) return { dx: 0, dy: 0, intensity: 0 };

      const t = 1 - dist / CRUSH_RADIUS;
      const intensity = t * t; // quadratic — strongest at center

      // Pull inward — lines compress toward the crush point
      const pull = intensity * 45; // strong compression
      const nx = -diffX / dist;
      const ny = -diffY / dist;

      return { dx: nx * pull, dy: ny * pull, intensity };
    }

    function getY(col: number, row: number, t: number): number {
      const nx = col / COLS;
      const ny = row / ROWS;
      const baseY = ny * H;

      // Base wave — calmer outside the crush zone
      const amp = 12 + Math.sin(ny * Math.PI) * 8;
      const w1 = Math.sin(nx * Math.PI * 2.5 + ny * 2.5 + t) * amp;
      const w2 = Math.sin(nx * Math.PI * 1.5 + ny * 1.8 + t * 0.5) * amp * 0.4;

      return baseY + w1 + w2;
    }

    // Static noise
    const noise: number[] = [];
    for (let i = 0; i < (ROWS + 1) * (COLS + 1); i++) {
      noise.push((Math.random() - 0.5) * 4);
    }

    // Struggling micro-motion near crush zone
    function struggle(px: number, py: number, t: number, intensity: number): { sx: number; sy: number } {
      if (intensity < 0.1) return { sx: 0, sy: 0 };
      const freq = 3 + intensity * 5;
      const amp = intensity * 3;
      return {
        sx: Math.sin(px * 0.02 + t * freq) * amp,
        sy: Math.cos(py * 0.03 + t * freq * 0.7) * amp * 0.6,
      };
    }

    function render() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      // Horizontal lines
      for (let r = 0; r <= ROWS; r++) {
        let d = '';
        let maxIntensity = 0;

        for (let c = 0; c <= COLS; c++) {
          const rawX = (c / COLS) * W;
          const rawY = getY(c, r, time) + noise[r * (COLS + 1) + c];

          const comp = compress(rawX, rawY);
          const strug = struggle(rawX, rawY, time, comp.intensity);
          if (comp.intensity > maxIntensity) maxIntensity = comp.intensity;

          const x = rawX + comp.dx + strug.sx;
          const y = rawY + comp.dy + strug.sy;

          d += (c === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
        }

        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');

        const t = r / ROWS;
        // Base opacity + compression boost
        const baseOp = 0.08 + Math.sin(t * Math.PI) * 0.06;
        const compBoost = maxIntensity * 0.35;
        const op = baseOp + compBoost;

        // Color shifts darker in compression zone
        if (maxIntensity > 0.3) {
          path.setAttribute('stroke', `rgba(6,20,40,${Math.min(op + 0.1, 0.6)})`);
          path.setAttribute('stroke-width', (0.6 + maxIntensity * 1.2).toFixed(2));
        } else {
          path.setAttribute('stroke', `rgba(6,30,68,${Math.min(op, 0.3)})`);
          path.setAttribute('stroke-width', (0.5 + maxIntensity * 0.4).toFixed(2));
        }
        svg.appendChild(path);
      }

      // Vertical lines
      for (let c = 0; c <= COLS; c++) {
        let d = '';
        let maxIntensity = 0;

        for (let r = 0; r <= ROWS; r++) {
          const rawX = (c / COLS) * W;
          const rawY = getY(c, r, time) + noise[r * (COLS + 1) + c];

          const comp = compress(rawX, rawY);
          const strug = struggle(rawX, rawY, time, comp.intensity);
          if (comp.intensity > maxIntensity) maxIntensity = comp.intensity;

          const x = rawX + comp.dx + strug.sx;
          const y = rawY + comp.dy + strug.sy;

          d += (r === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
        }

        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');

        const nx = c / COLS;
        const baseOp = 0.06 + Math.sin(nx * Math.PI) * 0.05;
        const compBoost = maxIntensity * 0.3;
        const op = baseOp + compBoost;

        if (maxIntensity > 0.3) {
          path.setAttribute('stroke', `rgba(6,20,40,${Math.min(op + 0.08, 0.5)})`);
          path.setAttribute('stroke-width', (0.4 + maxIntensity * 0.8).toFixed(2));
        } else {
          path.setAttribute('stroke', `rgba(6,30,68,${Math.min(op, 0.25)})`);
          path.setAttribute('stroke-width', (0.4 + maxIntensity * 0.3).toFixed(2));
        }
        svg.appendChild(path);
      }

      // Very slow — trapped, struggling
      time += 0.003;
      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    }

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
    render();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      if (svg.parentNode) svg.parentNode.removeChild(svg);
    };
  }, []);

  return (
    <div className={styles.painMeshWrap}>
      <div className={styles.painMeshCanvas} ref={canvasRef} />
      <div className={styles.painMeshFadeT} />
      <div className={styles.painMeshFadeB} />
    </div>
  );
}
