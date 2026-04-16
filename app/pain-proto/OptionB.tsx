'use client';

import { useEffect, useRef } from 'react';

/**
 * OPTION B — "The Mass"
 *
 * A single dense sculptural volume built from concentric contour
 * shells that pack tighter toward the core. Not contour LINES
 * tracing a silhouette — contour BANDS with real fill opacity,
 * creating a volumetric mass with visible density gradient.
 *
 * The shape: asymmetric, top-heavy, with a structural compression
 * at mid-height. Wider upper mass (authority), narrower lower
 * body (grounded), pinch zone in between (tension).
 *
 * Each shell is a filled band (not just a stroke). The overlapping
 * semi-transparent fills create natural density at the core —
 * the more shells overlap, the darker it gets. This is volumetric,
 * not linear.
 *
 * No field. No flow. Just mass.
 */

const W = 700;
const H = 550;

const CX = W * 0.5;
const CY = H * 0.46;

const SHELLS = 40;
const POINTS = 100;

export default function OptionB() {
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

    // Per-shell noise
    const shellNoise: number[][] = [];
    for (let s = 0; s < SHELLS; s++) {
      shellNoise.push(
        Array.from({ length: POINTS + 1 }, () => (Math.random() - 0.5) * 2)
      );
    }

    // Shape radius at a given angle and scale
    function shapeRadius(angle: number, scale: number, t: number): number {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      // Base oval — slightly taller than wide
      let r = 110 * scale;

      // Vertical dominance — taller
      r += Math.abs(sin) * 55 * scale;

      // Top mass — heavier upper region (authority)
      r += Math.max(0, -sin) * 50 * scale;

      // Upper-right shelf — asymmetric mass distribution
      const upperRight = Math.max(0, -sin) * Math.max(0, cos);
      r += upperRight * upperRight * 55 * scale;

      // Compression pinch at mid-height
      const pinch = Math.exp(-4 * (sin + 0.05) * (sin + 0.05)) * Math.max(0, cos + 0.3);
      r -= pinch * 40 * scale;

      // Lower body taper — grounded but contained
      r -= Math.max(0, sin) * Math.max(0, cos) * 25 * scale;

      // Left wall held tight — compressed, not symmetric
      r -= Math.max(0, -cos) * 15 * scale;

      // Structural faceting — angular, not blobby
      r += Math.sin(angle * 2.5 + 0.6) * 6 * scale;
      r += Math.cos(angle * 1.8 + 1.0) * 4 * scale;

      // Very slow breathing
      r += Math.sin(angle * 2 + t * 0.5) * 2.5 * scale;
      r += Math.sin(angle * 3 - t * 0.3) * 1.5 * scale;

      return Math.max(r, 8 * scale);
    }

    function render() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      // Defs
      const defs = document.createElementNS(svgNS, 'defs');
      const filter = document.createElementNS(svgNS, 'filter');
      filter.setAttribute('id', 'massShadow');
      const blur = document.createElementNS(svgNS, 'feGaussianBlur');
      blur.setAttribute('stdDeviation', '20');
      filter.appendChild(blur);
      defs.appendChild(filter);
      svg.appendChild(defs);

      // Ground shadow
      const shadow = document.createElementNS(svgNS, 'ellipse');
      shadow.setAttribute('cx', (CX + 5).toString());
      shadow.setAttribute('cy', (CY + 10).toString());
      shadow.setAttribute('rx', '90');
      shadow.setAttribute('ry', '110');
      shadow.setAttribute('fill', 'rgba(6,18,35,0.04)');
      shadow.setAttribute('filter', 'url(#massShadow)');
      svg.appendChild(shadow);

      // Render shells from outermost to innermost
      // Each is a FILLED band — not just a stroke
      for (let si = SHELLS - 1; si >= 0; si--) {
        const shellT = si / (SHELLS - 1); // 0 = innermost, 1 = outermost
        // Non-linear: inner shells pack tighter
        const scaleCurve = Math.pow(shellT, 0.55);
        const scale = 0.06 + scaleCurve * 0.94;

        let d = '';
        for (let p = 0; p <= POINTS; p++) {
          const angle = (p / POINTS) * Math.PI * 2;
          let r = shapeRadius(angle, scale, time);

          // Per-shell noise — increases with scale
          const n = shellNoise[si][p] * (0.5 + shellT * 4);
          r += n;

          // Inner shell trapped struggle
          if (shellT < 0.3) {
            const innerT = 1 - shellT / 0.3;
            r += Math.sin(angle * 5 + time * 1.5 + si * 0.6) * innerT * 3;
          }

          const x = CX + Math.cos(angle) * r;
          const y = CY + Math.sin(angle) * r;
          d += (p === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
        }

        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d + 'Z');

        const innerness = 1 - shellT;

        // FILL — this is what makes it a mass, not just contours
        const fillOp = 0.008 + Math.pow(innerness, 2) * 0.04;
        path.setAttribute('fill', `rgba(6,20,40,${fillOp.toFixed(4)})`);

        // Stroke — structural edges
        const strokeOp = 0.03 + Math.pow(innerness, 1.5) * 0.5;
        const strokeW = 0.2 + Math.pow(innerness, 1.3) * 1.8;
        path.setAttribute('stroke', `rgba(6,18,35,${strokeOp.toFixed(2)})`);
        path.setAttribute('stroke-width', strokeW.toFixed(2));

        svg.appendChild(path);
      }

      // Warm tension accent at the pinch
      {
        const accentPts = 20;
        let d = '';
        for (let p = 0; p <= accentPts; p++) {
          const t2 = p / accentPts;
          // Trace through the pinch zone
          const angle = -0.2 + t2 * 0.6;
          const r = shapeRadius(angle, 0.35, time);
          const x = CX + Math.cos(angle) * r;
          const y = CY + Math.sin(angle) * r;
          d += (p === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
        }
        const accent = document.createElementNS(svgNS, 'path');
        accent.setAttribute('d', d);
        accent.setAttribute('fill', 'none');
        accent.setAttribute('stroke', 'rgba(180,120,80,0.06)');
        accent.setAttribute('stroke-width', '1');
        svg.appendChild(accent);
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

  return <div ref={ref} style={{ position: 'absolute', inset: 0 }} />;
}
