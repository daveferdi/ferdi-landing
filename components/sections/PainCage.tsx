'use client';

import { useEffect, useRef } from 'react';

/**
 * PainCage — collapsed 3D lattice obstruction object.
 *
 * Denser grid, wider structure, heavier beams.
 * Must fill its container visually — not a thin wireframe.
 */

const W = 700;
const H = 550;

// Shifted left — the structure extends rightward under the glass panel
const CX = W * 0.38;
const CY = H * 0.46;

// Denser grid for more visual mass
const COLS = 12;
const ROWS = 18;
const LAYERS = 5;

export default function PainCage() {
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

    let animId = 0;
    let time = 0;
    let isVisible = false;

    function getNode(
      col: number, row: number, layer: number, t: number
    ): { x: number; y: number; depth: number } {
      const cx = col / (COLS - 1) - 0.5;
      const cy = row / (ROWS - 1) - 0.5;
      const cz = layer / (LAYERS - 1) - 0.5;

      // Wide structure — fills left side and extends under glass
      let x3d = cx * 320;
      let y3d = cy * 430;
      let z3d = cz * 130;

      // 3D rotation
      const rotY = 0.18;
      const xRot = x3d * Math.cos(rotY) + z3d * Math.sin(rotY);
      const zRot = -x3d * Math.sin(rotY) + z3d * Math.cos(rotY);
      x3d = xRot;
      z3d = zRot;

      // Top wider than bottom
      const topScale = cy < 0 ? 1 + Math.abs(cy) * 0.35 : 1 - cy * 0.12;
      x3d *= topScale;
      z3d *= topScale;

      // Upper-right shelf extension
      if (cy < -0.1 && cx > 0) {
        x3d += cx * Math.abs(cy) * 50;
      }

      // Mid-height compression pinch
      const pinchZone = Math.exp(-6 * (cy + 0.05) * (cy + 0.05));
      x3d *= 1 - pinchZone * 0.4;
      z3d *= 1 - pinchZone * 0.35;

      // Collapse deformation
      const dist = Math.sqrt(cx * cx + cy * cy + cz * cz);
      const collapse = Math.max(0, 1 - dist / 0.87);
      const collapseCurved = Math.pow(collapse, 2.2);

      x3d *= 1 - collapseCurved * 0.2;
      y3d *= 1 - collapseCurved * 0.12;
      z3d *= 1 - collapseCurved * 0.25;

      // Structural buckling
      x3d += Math.sin(cy * 8 + cz * 4 + t * 0.5) * collapseCurved * 14;
      y3d += Math.sin(cx * 6 + cz * 5 + t * 0.4) * collapseCurved * 10;

      // Breathing
      x3d += Math.sin(t * 0.3 + row * 0.15 + layer * 0.35) * collapse * 3;
      y3d += Math.sin(t * 0.25 + col * 0.2 + layer * 0.4) * collapse * 2;

      // Perspective
      const perspScale = 1 / (1 + z3d * 0.0008);
      return {
        x: CX + x3d * perspScale,
        y: CY + y3d * perspScale,
        depth: z3d,
      };
    }

    function render() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      // Defs
      const defs = document.createElementNS(svgNS, 'defs');
      const filter = document.createElementNS(svgNS, 'filter');
      filter.setAttribute('id', 'cageShadow');
      const blur = document.createElementNS(svgNS, 'feGaussianBlur');
      blur.setAttribute('stdDeviation', '18');
      filter.appendChild(blur);
      defs.appendChild(filter);
      svg.appendChild(defs);

      // Ambient glow behind structure
      const glow = document.createElementNS(svgNS, 'ellipse');
      glow.setAttribute('cx', (CX + 4).toString());
      glow.setAttribute('cy', (CY).toString());
      glow.setAttribute('rx', '130');
      glow.setAttribute('ry', '170');
      glow.setAttribute('fill', 'rgba(126,200,238,0.04)');
      glow.setAttribute('filter', 'url(#cageShadow)');
      svg.appendChild(glow);

      // Collect beams
      const beams: {
        x1: number; y1: number; x2: number; y2: number;
        depth: number; collapse: number;
      }[] = [];

      for (let layer = 0; layer < LAYERS; layer++) {
        for (let row = 0; row < ROWS; row++) {
          for (let col = 0; col < COLS; col++) {
            const node = getNode(col, row, layer, time);
            const cx1 = col / (COLS - 1) - 0.5;
            const cy1 = row / (ROWS - 1) - 0.5;
            const dist = Math.sqrt(cx1 * cx1 + cy1 * cy1);
            const collapse = Math.max(0, 1 - dist / 0.87);

            if (col < COLS - 1) {
              const next = getNode(col + 1, row, layer, time);
              beams.push({
                x1: node.x, y1: node.y, x2: next.x, y2: next.y,
                depth: (node.depth + next.depth) / 2, collapse,
              });
            }

            if (row < ROWS - 1) {
              const next = getNode(col, row + 1, layer, time);
              beams.push({
                x1: node.x, y1: node.y, x2: next.x, y2: next.y,
                depth: (node.depth + next.depth) / 2, collapse,
              });
            }

            if (layer < LAYERS - 1) {
              const next = getNode(col, row, layer + 1, time);
              beams.push({
                x1: node.x, y1: node.y, x2: next.x, y2: next.y,
                depth: (node.depth + next.depth) / 2, collapse,
              });
            }
          }
        }
      }

      beams.sort((a, b) => b.depth - a.depth);

      for (const beam of beams) {
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', beam.x1.toFixed(1));
        line.setAttribute('y1', beam.y1.toFixed(1));
        line.setAttribute('x2', beam.x2.toFixed(1));
        line.setAttribute('y2', beam.y2.toFixed(1));

        const depthNorm = (beam.depth + 60) / 120;
        const depthFog = Math.max(0.15, Math.min(1, depthNorm));
        const collapseCurve = Math.pow(beam.collapse, 2);

        // Light lines on dark substrate
        const baseOp = 0.08 + depthFog * 0.12;
        const opacity = Math.min(baseOp + collapseCurve * 0.5, 0.7);
        const weight = 0.4 + depthFog * 0.5 + collapseCurve * 1.4;

        // Light cool tones — ice/breeze on dark navy
        const color = collapseCurve > 0.15 ? '181,226,248' : '126,200,238';
        line.setAttribute('stroke', `rgba(${color},${opacity.toFixed(2)})`);
        line.setAttribute('stroke-width', weight.toFixed(2));
        line.setAttribute('stroke-linecap', 'round');
        svg.appendChild(line);
      }

      // Pressure accent at pinch
      for (let layer = 0; layer < LAYERS; layer++) {
        for (let col = 3; col <= 8; col++) {
          const node = getNode(col, Math.floor(ROWS * 0.45), layer, time);
          const dot = document.createElementNS(svgNS, 'circle');
          dot.setAttribute('cx', node.x.toFixed(1));
          dot.setAttribute('cy', node.y.toFixed(1));
          dot.setAttribute('r', '2');
          dot.setAttribute('fill', 'rgba(255,140,107,0.1)');
          svg.appendChild(dot);
        }
      }

      time += prefersReducedMotion ? 0 : 0.004;
      if (!prefersReducedMotion && isVisible) {
        animId = requestAnimationFrame(render);
      }
    }

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

  return <div ref={ref} style={{ position: 'absolute', inset: 0 }} />;
}
