'use client';

import { useEffect, useRef } from 'react';

const W = 700;
const H = 550;
const CX = W * 0.44;
const CY = H * 0.47;

const CONTOUR_COUNT = 40;
const POINTS = 100;

export default function PainObject() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';

    let animId: number;
    let time = 0;

    const noise: number[][] = [];
    for (let c = 0; c < CONTOUR_COUNT; c++) {
      noise.push(Array.from({ length: POINTS + 1 }, () => (Math.random() - 0.5) * 2));
    }

    function radius(angle: number, scale: number, t: number): number {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      // Base: narrow horizontal, commanding vertical — structural stance
      let r = 120 * scale;

      // Dominant vertical elongation — the spine IS the object
      r += Math.abs(sin) * 90 * scale;

      // Top mass — heavy, authoritative, the primary weight
      r += Math.max(0, -sin) * 70 * scale;

      // Upper-right shelf — assertive but organic
      const upperRight = Math.max(0, -sin) * Math.max(0, cos);
      r += upperRight * upperRight * 75 * scale;

      // Deep mid compression — structural waist, real tension
      const midPinch = Math.exp(-3.5 * (sin + 0.08) * (sin + 0.08)) * Math.max(0, cos);
      r -= midPinch * 55 * scale;

      // Shorter inner-bar — more restrained than top shelf
      const midBulge = Math.exp(-6 * (sin - 0.3) * (sin - 0.3)) * Math.max(0, cos);
      r += midBulge * 14 * scale;

      // Lower body tapers — contained, grounded
      r -= Math.max(0, sin) * Math.max(0, cos) * 0.5 * 35 * scale;

      // Left side held tight — compressed wall
      r -= Math.max(0, -cos) * 0.4 * 25 * scale;

      // Sculptural irregularity — restrained, structural not noisy
      r += Math.sin(angle * 2.3 + 0.5) * 7 * scale;
      r += Math.cos(angle * 1.7 + 1.2) * 5 * scale;
      r += Math.sin(angle * 3.1 + 0.8) * 3 * scale;

      // Slow breathing
      r += Math.sin(angle * 2 + t * 0.6) * 3 * scale;
      r += Math.sin(angle * 5 - t * 0.4) * 1.5 * scale;

      return Math.max(r, 12 * scale);
    }

    function deflectFlow(px: number, py: number): { dx: number; dy: number } {
      const diffX = px - CX;
      const diffY = py - CY;
      const angle = Math.atan2(diffY, diffX);
      const dist = Math.sqrt(diffX * diffX + diffY * diffY);
      const objectR = radius(angle, 1, time);
      const buffer = objectR + 30;

      if (dist >= buffer || dist < 0.1) return { dx: 0, dy: 0 };

      const overflow = (buffer - dist) / 30;
      const push = overflow * overflow * 16;
      return { dx: (diffX / dist) * push, dy: (diffY / dist) * push };
    }

    function render() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      // === FLOW FIELD — horizontal ===
      for (let fl = 0; fl < 20; fl++) {
        const baseY = H * 0.05 + fl * (H * 0.9 / 19);
        let d = '';
        for (let fp = 0; fp <= 60; fp++) {
          let x = (fp / 60) * W;
          let y = baseY + Math.sin(x * 0.009 + time * 0.5 + fl * 0.35) * 2.5;
          const def = deflectFlow(x, y);
          x += def.dx;
          y += def.dy;
          d += (fp === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
        }
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'rgba(6,30,68,0.03)');
        path.setAttribute('stroke-width', '0.35');
        svg.appendChild(path);
      }

      // === FLOW FIELD — vertical ===
      for (let fc = 0; fc < 18; fc++) {
        const baseX = W * 0.05 + fc * (W * 0.9 / 17);
        let d = '';
        for (let fp = 0; fp <= 50; fp++) {
          let x = baseX + Math.sin(fp * 0.12 + time * 0.4 + fc * 0.3) * 2;
          let y = (fp / 50) * H;
          const def = deflectFlow(x, y);
          x += def.dx;
          y += def.dy;
          d += (fp === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
        }
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'rgba(6,30,68,0.025)');
        path.setAttribute('stroke-width', '0.3');
        svg.appendChild(path);
      }

      // === THE OBJECT ===
      for (let ci = CONTOUR_COUNT - 1; ci >= 0; ci--) {
        const t = ci / (CONTOUR_COUNT - 1); // 0=inner, 1=outer
        // Non-linear scaling: heavy inner packing
        const scaleCurve = Math.pow(t, 0.6);
        const scale = 0.05 + scaleCurve * 0.95;

        // Core F-hint: innermost ~18% — embedded pressure geometry, not a void
        const coreThreshold = 0.18;
        const coreBlend = t < coreThreshold ? Math.pow(1 - t / coreThreshold, 1.5) : 0;

        let d = '';
        for (let p = 0; p <= POINTS; p++) {
          const angle = (p / POINTS) * Math.PI * 2;
          let r = radius(angle, scale, time);

          if (coreBlend > 0) {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);

            // Vertical compression — narrows horizontally, emphasizing the spine
            // Not a cutout — adds inward pressure that reshapes the contour
            r -= Math.pow(Math.abs(cos), 1.5) * 7 * scale * coreBlend;

            // Top-heavy redistribution — upper mass expands slightly
            r += Math.max(0, -sin - 0.2) * 5 * scale * coreBlend;

            // Tighter mid compression — pressure intensifies at the pinch
            r -= Math.exp(-4 * (sin + 0.08) ** 2) * Math.max(0, cos + 0.2) * 8 * scale * coreBlend;

            // Inner-bar density — subtle mass below pinch, not an extension but a thickening
            r += Math.exp(-6 * (sin - 0.25) ** 2) * 4 * scale * coreBlend;

            // Core breathing — compressed oscillation, trapped
            r += Math.sin(angle * 3 + time * 1.8) * 1.5 * scale * coreBlend;
          }

          const n = noise[ci][p] * (0.8 + t * 4);
          r += n;

          const struggle = Math.sin(angle * 6 + time * 2.2 + ci * 0.5) * (1 - t) * 3.5;
          r += struggle;

          const x = CX + Math.cos(angle) * r;
          const y = CY + Math.sin(angle) * r;
          d += (p === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
        }

        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d + 'Z');
        path.setAttribute('fill', 'none');

        const innerness = 1 - t;
        const opacity = 0.03 + innerness * 0.6;
        const weight = 0.2 + innerness * 2.0;

        path.setAttribute('stroke', `rgba(6,20,40,${opacity.toFixed(2)})`);
        path.setAttribute('stroke-width', weight.toFixed(2));
        svg.appendChild(path);
      }

      // === TENSION SEAM — warm accent in the pinch zone ===
      // One faint copper line tracing the compression between upper and mid mass
      {
        const seam = document.createElementNS(svgNS, 'path');
        let d = '';
        const seamPoints = 30;
        for (let sp = 0; sp <= seamPoints; sp++) {
          // Trace through the pinch zone (right side, mid-height)
          const t = sp / seamPoints;
          const angle = -0.15 + t * 0.8; // roughly horizontal, right side
          const r = radius(angle, 0.45, time);
          const x = CX + Math.cos(angle) * r;
          const y = CY + Math.sin(angle) * r;
          // Add slight tension wobble
          const wobble = Math.sin(t * Math.PI * 4 + time * 1.5) * 1.5;
          d += (sp === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + (y + wobble).toFixed(1);
        }
        seam.setAttribute('d', d);
        seam.setAttribute('fill', 'none');
        seam.setAttribute('stroke', 'rgba(220,150,100,0.07)');
        seam.setAttribute('stroke-width', '0.6');
        svg.appendChild(seam);
      }

      time += prefersReducedMotion ? 0 : 0.004;
      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    }

    container.appendChild(svg);
    render();

    return () => {
      cancelAnimationFrame(animId);
      if (svg.parentNode) svg.parentNode.removeChild(svg);
    };
  }, []);

  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0 }} />
  );
}
