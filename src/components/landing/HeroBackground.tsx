'use client';

import { useEffect, useRef } from 'react';
import styles from './hero.module.css';
import { getY, advanceSharedTime, ROWS, COLS, W, H } from './meshWaveCore';

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

    function render() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      const time = advanceSharedTime();

      // Horizontal lines
      for (let r = 0; r <= ROWS; r++) {
        let d = '';
        for (let c = 0; c <= COLS; c++) {
          const x = (c / COLS) * W;
          const y = getY(c, r, time);
          d += (c === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
        }
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');

        const t = r / ROWS;
        const distCenter = Math.abs(t - 0.42);
        if (distCenter < 0.05) {
          const peach = (0.05 - distCenter) / 0.05 * 0.8;
          path.setAttribute('stroke', `rgba(255,160,120,${peach})`);
          path.setAttribute('stroke-width', '1.5');
        } else {
          const op = 0.12 + Math.sin(t * Math.PI) * 0.1;
          path.setAttribute('stroke', `rgba(126,200,238,${op})`);
          path.setAttribute('stroke-width', '0.6');
        }
        svg.appendChild(path);
      }

      // Vertical lines
      for (let c = 0; c <= COLS; c++) {
        let d = '';
        for (let r = 0; r <= ROWS; r++) {
          const x = (c / COLS) * W;
          const y = getY(c, r, time);
          d += (r === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
        }
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');

        const t = c / COLS;
        const op = 0.12 + Math.sin(t * Math.PI) * 0.08;
        path.setAttribute('stroke', `rgba(126,200,238,${op})`);
        path.setAttribute('stroke-width', '0.5');
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
      <div className={styles.bgNoise} />
    </>
  );
}
