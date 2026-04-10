'use client';

import { useEffect, useRef } from 'react';
import styles from './lightMesh.module.css';
import { getY, getSharedTime, ROWS, COLS, W, H } from './meshWaveCore';

export default function LightMeshBackground() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    // Respect reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';

    let animId: number;
    let isVisible = true;

    function render() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      const time = getSharedTime();

      // Horizontal lines — dark navy on white
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
          // Muted warm accent — ghost of the Hero's peach ridge
          const peach = (0.05 - distCenter) / 0.05 * 0.12;
          path.setAttribute('stroke', `rgba(200,120,80,${peach})`);
          path.setAttribute('stroke-width', '1.5');
        } else {
          const op = 0.08 + Math.sin(t * Math.PI) * 0.06;
          path.setAttribute('stroke', `rgba(6,20,40,${op})`);
          path.setAttribute('stroke-width', '0.6');
        }
        svg.appendChild(path);
      }

      // Vertical lines — dark navy on white
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
        const op = 0.06 + Math.sin(t * Math.PI) * 0.04;
        path.setAttribute('stroke', `rgba(6,20,40,${op})`);
        path.setAttribute('stroke-width', '0.5');
        svg.appendChild(path);
      }

      if (!prefersReducedMotion && isVisible) {
        animId = requestAnimationFrame(render);
      }
    }

    container.appendChild(svg);
    render();

    // Pause animation when scrolled out of view
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

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      if (svg.parentNode) svg.parentNode.removeChild(svg);
    };
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.canvas} ref={canvasRef} />
      <div className={styles.fadeTop} />
      <div className={styles.fadeBottom} />
      <div className={styles.fadeL} />
      <div className={styles.fadeR} />
    </div>
  );
}
