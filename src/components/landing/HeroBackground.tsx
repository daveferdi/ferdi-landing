'use client';

import { useEffect, useRef } from 'react';
import styles from './hero.module.css';
import { getY, advanceSharedTime, ROWS, COLS, W, H } from './meshWaveCore';

// Invisible influence center — left-middle zone
const GRAV_X = W * 0.22;
const GRAV_Y = H * 0.45;
const GRAV_RADIUS = W * 0.18; // influence radius in SVG units

export default function HeroBackground() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';

    let animId: number;

    // Precompute influence per column (x-axis only, avoids per-point sqrt)
    const GRAV_RX = GRAV_RADIUS;
    const GRAV_RY = GRAV_RADIUS * 0.8;
    const colInfluence = new Float32Array(COLS + 1);
    for (let c = 0; c <= COLS; c++) {
      const dx = (c / COLS) * W - GRAV_X;
      const nx = dx / GRAV_RX;
      if (Math.abs(nx) >= 1) { colInfluence[c] = 0; continue; }
      colInfluence[c] = (1 - nx * nx); // quadratic x-falloff, y blended at render
    }

    function influence(col: number, py: number): number {
      const ci = colInfluence[col];
      if (ci === 0) return 0;
      const dy = (py - GRAV_Y) / GRAV_RY;
      if (Math.abs(dy) >= 1) return 0;
      const yi = 1 - dy * dy;
      return ci * yi * yi; // combined cubic-ish falloff
    }

    function render() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      const time = advanceSharedTime();

      // Horizontal lines
      for (let r = 0; r <= ROWS; r++) {
        let d = '';
        for (let c = 0; c <= COLS; c++) {
          const x = (c / COLS) * W;
          const baseY = getY(c, r, time);

          const inf = influence(c, baseY);
          const pullY = (GRAV_Y - baseY) * inf * 0.07;
          const y = baseY + pullY;

          d += (c === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
        }
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');

        const t = r / ROWS;
        const distCenter = Math.abs(t - 0.42);

        const sampleCol = Math.round(COLS * 0.22);
        const sampleY = getY(sampleCol, r, time);
        const rowInf = influence(sampleCol, sampleY);

        if (distCenter < 0.05) {
          const peach = (0.05 - distCenter) / 0.05 * 0.8 + rowInf * 0.045;
          path.setAttribute('stroke', `rgba(255,160,120,${Math.min(peach, 1)})`);
          path.setAttribute('stroke-width', (1.5 + rowInf * 0.2).toFixed(2));
        } else {
          const op = 0.12 + Math.sin(t * Math.PI) * 0.1 + rowInf * 0.045;
          path.setAttribute('stroke', `rgba(126,200,238,${Math.min(op, 1)})`);
          path.setAttribute('stroke-width', (0.6 + rowInf * 0.18).toFixed(2));
        }
        svg.appendChild(path);
      }

      // Vertical lines
      for (let c = 0; c <= COLS; c++) {
        let d = '';
        for (let r = 0; r <= ROWS; r++) {
          const x = (c / COLS) * W;
          const baseY = getY(c, r, time);

          const inf = influence(c, baseY);
          const pullY = (GRAV_Y - baseY) * inf * 0.07;
          const y = baseY + pullY;

          d += (r === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
        }
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');

        const t = c / COLS;

        const colMidY = getY(c, Math.round(ROWS * 0.45), time);
        const colInf = influence(c, colMidY);

        const op = 0.12 + Math.sin(t * Math.PI) * 0.08 + colInf * 0.045;
        path.setAttribute('stroke', `rgba(126,200,238,${Math.min(op, 1)})`);
        path.setAttribute('stroke-width', (0.5 + colInf * 0.15).toFixed(2));
        svg.appendChild(path);
      }

      animId = requestAnimationFrame(render);
    }

    container.appendChild(svg);
    render();

    return () => {
      cancelAnimationFrame(animId);
      if (svg.parentNode) svg.parentNode.removeChild(svg);
    };
  }, []);

  return (
    <>
      {/* Wave mesh */}
      <div className={styles.meshWrap}>
        <div className={styles.meshCanvas} ref={canvasRef} />
        <div className={styles.meshFadeTop} />
        <div className={styles.meshFadeBottom} />
        <div className={styles.meshFadeL} />
        <div className={styles.meshFadeR} />
      </div>

      {/* Ambient glows */}
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      <div className={styles.bgGlow3} />
      <div className={styles.bgLiftTR} />
      <div className={styles.bgLiftTL} />

      {/* Left depth field */}
      <div className={styles.depthField1} />
      <div className={styles.depthField2} />
      <div className={styles.depthWarmth} />
      <div className={styles.bgNoise} />
    </>
  );
}
