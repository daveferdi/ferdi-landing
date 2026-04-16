'use client';

import { useEffect, useRef } from 'react';

/**
 * OPTION A — "The Monolith"
 *
 * A dense, vertically dominant mass built from tightly packed
 * horizontal slabs that compress and fuse at the center.
 * Think: a stack of planes crushed together under immense vertical
 * pressure, with the edges still showing the original layered structure
 * but the core becoming a single dark impenetrable mass.
 *
 * Structure: ~60 horizontal bands stacked vertically, varying in width.
 * The bands are widest at top and narrow toward a pinch, then widen
 * again below — creating a structural waist under compression.
 * Each band has slight horizontal displacement and organic edge noise.
 * Inner bands are darker and heavier. The whole form breathes slowly.
 *
 * No field. No flow lines. Just the object.
 */

const W = 700;
const H = 550;

const CX = W * 0.5;
const CY = H * 0.48;

const SLAB_COUNT = 65;

export default function OptionA() {
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

    // Pre-computed per-slab properties
    const slabs: {
      baseWidth: number;
      edgeNoise: number[];
      xDrift: number;
      phase: number;
    }[] = [];

    for (let i = 0; i < SLAB_COUNT; i++) {
      const t = i / (SLAB_COUNT - 1); // 0=top, 1=bottom
      const fromCenter = Math.abs(t - 0.42); // pinch slightly above center

      // Width profile: wide top shelf, compression pinch, moderate lower body
      let width;
      if (t < 0.15) {
        // Top cap — broad, authoritative
        width = 130 + (1 - t / 0.15) * 20;
      } else if (t < 0.5) {
        // Upper body narrowing toward pinch
        const pinchT = (t - 0.15) / 0.35;
        width = 130 - pinchT * pinchT * 60;
      } else if (t < 0.6) {
        // Pinch zone — narrowest
        const pinchDepth = 1 - Math.abs((t - 0.55) / 0.05);
        width = 70 - pinchDepth * 15;
      } else {
        // Lower body — recovers but stays smaller than top
        const recoverT = (t - 0.6) / 0.4;
        width = 70 + recoverT * 40;
      }

      // Upper-right shelf extension (structural asymmetry)
      if (t > 0.08 && t < 0.28) {
        const shelfT = 1 - Math.abs((t - 0.18) / 0.1);
        width += shelfT * shelfT * 35;
      }

      const edgePoints = 40;
      const edgeNoise = Array.from({ length: edgePoints }, () =>
        (Math.random() - 0.5) * 6
      );

      slabs.push({
        baseWidth: width,
        edgeNoise,
        xDrift: (Math.random() - 0.5) * 4,
        phase: Math.random() * Math.PI * 2,
      });
    }

    function render() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      // Defs
      const defs = document.createElementNS(svgNS, 'defs');
      const filter = document.createElementNS(svgNS, 'filter');
      filter.setAttribute('id', 'monolithShadow');
      const blur = document.createElementNS(svgNS, 'feGaussianBlur');
      blur.setAttribute('stdDeviation', '18');
      filter.appendChild(blur);
      defs.appendChild(filter);
      svg.appendChild(defs);

      // Object shadow — gives it physical presence
      const shadow = document.createElementNS(svgNS, 'ellipse');
      shadow.setAttribute('cx', (CX + 3).toString());
      shadow.setAttribute('cy', (CY + 8).toString());
      shadow.setAttribute('rx', '85');
      shadow.setAttribute('ry', '130');
      shadow.setAttribute('fill', 'rgba(6,18,35,0.05)');
      shadow.setAttribute('filter', 'url(#monolithShadow)');
      svg.appendChild(shadow);

      const totalHeight = H * 0.72;
      const startY = CY - totalHeight * 0.42;

      for (let i = 0; i < SLAB_COUNT; i++) {
        const slab = slabs[i];
        const t = i / (SLAB_COUNT - 1);
        const y = startY + t * totalHeight;

        // Breathing: slabs compress toward center over time
        const breathe = Math.sin(time * 0.3 + slab.phase) * 2;
        const slabY = y + breathe;

        // Slab height (gap between this slab and next)
        const gap = totalHeight / SLAB_COUNT;
        const slabH = gap * 0.85;

        // Width with slow breathing
        const widthBreath = Math.sin(time * 0.25 + i * 0.12) * 3;
        const halfW = (slab.baseWidth + widthBreath) / 2;

        // Horizontal drift
        const drift = slab.xDrift + Math.sin(time * 0.2 + i * 0.15) * 1.5;
        const slabCX = CX + drift;

        // Build slab shape with organic edges
        const edgePts = slab.edgeNoise.length;
        let d = '';

        // Top edge (left to right)
        for (let ep = 0; ep <= edgePts; ep++) {
          const ex = ep / edgePts;
          const x = slabCX - halfW + ex * halfW * 2;
          const noise = ep < edgePts ? slab.edgeNoise[ep] : slab.edgeNoise[0];
          const edgeY = slabY + noise * 0.3;
          d += (ep === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + edgeY.toFixed(1);
        }

        // Bottom edge (right to left)
        for (let ep = edgePts; ep >= 0; ep--) {
          const ex = ep / edgePts;
          const x = slabCX - halfW + ex * halfW * 2;
          const noise = ep < edgePts ? slab.edgeNoise[ep] : slab.edgeNoise[0];
          const edgeY = slabY + slabH - noise * 0.25;
          d += 'L' + x.toFixed(1) + ',' + edgeY.toFixed(1);
        }

        d += 'Z';

        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d);

        // Density: center slabs are darkest, edges lighten
        const fromCenter = Math.abs(t - 0.45);
        const coreness = Math.max(0, 1 - fromCenter * 2.5);
        const corenessCurved = Math.pow(coreness, 1.5);

        // Fill: solid slabs with varying opacity
        const fillOp = 0.03 + corenessCurved * 0.12;
        path.setAttribute('fill', `rgba(6,20,40,${fillOp.toFixed(3)})`);

        // Stroke: structural edges
        const strokeOp = 0.06 + corenessCurved * 0.4;
        const strokeW = 0.3 + corenessCurved * 1.0;
        path.setAttribute('stroke', `rgba(6,18,35,${strokeOp.toFixed(2)})`);
        path.setAttribute('stroke-width', strokeW.toFixed(2));

        svg.appendChild(path);
      }

      // Inner pressure accent — warm line at the pinch zone
      {
        const pinchY = startY + 0.55 * totalHeight;
        const breathe = Math.sin(time * 0.4) * 3;
        const accent = document.createElementNS(svgNS, 'line');
        accent.setAttribute('x1', (CX - 30).toString());
        accent.setAttribute('y1', (pinchY + breathe).toFixed(1));
        accent.setAttribute('x2', (CX + 25).toString());
        accent.setAttribute('y2', (pinchY + breathe + 1).toFixed(1));
        accent.setAttribute('stroke', 'rgba(180,120,80,0.07)');
        accent.setAttribute('stroke-width', '1.2');
        accent.setAttribute('stroke-linecap', 'round');
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
