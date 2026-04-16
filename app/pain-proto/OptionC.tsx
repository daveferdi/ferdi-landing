'use client';

import { useEffect, useRef } from 'react';

/**
 * OPTION C — "The Cage"
 *
 * A rigid geometric lattice structure — like an architectural
 * framework or crystalline cage — that has been compressed and
 * partially collapsed inward. Clean straight structural members
 * (beams) that bend and buckle under load.
 *
 * The outer frame retains some of its original rectilinear
 * precision. The inner structure shows progressive failure —
 * beams bowing, joints shifting, geometry distorting under
 * internal pressure.
 *
 * This is fundamentally different from contour/shell approaches.
 * It uses straight structural members in a 3D-projected lattice.
 *
 * No field. No flow. Just structure under stress.
 */

const W = 700;
const H = 550;

const CX = W * 0.5;
const CY = H * 0.46;

// Lattice grid projected from a slightly rotated 3D box
const COLS = 8;
const ROWS = 12;
const LAYERS = 4; // depth layers for 3D effect

export default function OptionC() {
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

    // Node positions: 3D grid projected to 2D
    // The grid is slightly rotated for depth perception
    function getNode(
      col: number,
      row: number,
      layer: number,
      t: number
    ): { x: number; y: number; depth: number } {
      const cx = col / (COLS - 1) - 0.5; // -0.5 to 0.5
      const cy = row / (ROWS - 1) - 0.5;
      const cz = layer / (LAYERS - 1) - 0.5;

      // Base 3D position
      let x3d = cx * 160;
      let y3d = cy * 320;
      let z3d = cz * 80;

      // Slight rotation for 3D feel
      const rotY = 0.15;
      const xRot = x3d * Math.cos(rotY) + z3d * Math.sin(rotY);
      const zRot = -x3d * Math.sin(rotY) + z3d * Math.cos(rotY);
      x3d = xRot;
      z3d = zRot;

      // Top is wider than bottom (authority)
      const topScale = cy < 0 ? 1 + Math.abs(cy) * 0.3 : 1 - cy * 0.15;
      x3d *= topScale;
      z3d *= topScale;

      // Upper-right extension (asymmetry)
      if (cy < -0.1 && cx > 0) {
        x3d += cx * Math.abs(cy) * 40;
      }

      // Compression at mid-height
      const pinchZone = Math.exp(-8 * (cy + 0.05) * (cy + 0.05));
      x3d *= 1 - pinchZone * 0.35;
      z3d *= 1 - pinchZone * 0.3;

      // === COLLAPSE DEFORMATION ===
      // Distance from center of the structure
      const dist = Math.sqrt(cx * cx + cy * cy + cz * cz);
      const maxDist = 0.87;
      const collapse = Math.max(0, 1 - dist / maxDist);
      const collapseCurved = Math.pow(collapse, 2.5);

      // Pull inward — structure implodes toward center
      x3d *= 1 - collapseCurved * 0.25;
      y3d *= 1 - collapseCurved * 0.15;
      z3d *= 1 - collapseCurved * 0.3;

      // Structural buckling — beams bow
      x3d += Math.sin(cy * 8 + cz * 4 + t * 0.5) * collapseCurved * 12;
      y3d += Math.sin(cx * 6 + cz * 5 + t * 0.4) * collapseCurved * 8;

      // Slow structural breathing
      x3d += Math.sin(t * 0.3 + row * 0.2 + layer * 0.4) * collapse * 3;
      y3d += Math.sin(t * 0.25 + col * 0.3 + layer * 0.5) * collapse * 2;

      // Project to 2D (weak perspective)
      const perspScale = 1 / (1 + z3d * 0.001);
      const screenX = CX + x3d * perspScale;
      const screenY = CY + y3d * perspScale;
      const depth = z3d;

      return { x: screenX, y: screenY, depth };
    }

    function render() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      // Defs
      const defs = document.createElementNS(svgNS, 'defs');
      const filter = document.createElementNS(svgNS, 'filter');
      filter.setAttribute('id', 'cageShadow');
      const blur = document.createElementNS(svgNS, 'feGaussianBlur');
      blur.setAttribute('stdDeviation', '15');
      filter.appendChild(blur);
      defs.appendChild(filter);
      svg.appendChild(defs);

      // Ground shadow
      const shadow = document.createElementNS(svgNS, 'ellipse');
      shadow.setAttribute('cx', (CX + 3).toString());
      shadow.setAttribute('cy', (CY + 10).toString());
      shadow.setAttribute('rx', '80');
      shadow.setAttribute('ry', '120');
      shadow.setAttribute('fill', 'rgba(6,18,35,0.04)');
      shadow.setAttribute('filter', 'url(#cageShadow)');
      svg.appendChild(shadow);

      // Collect all beams, sort by depth for proper layering
      const beams: {
        x1: number; y1: number; x2: number; y2: number;
        depth: number; collapse: number;
      }[] = [];

      for (let layer = 0; layer < LAYERS; layer++) {
        for (let row = 0; row < ROWS; row++) {
          for (let col = 0; col < COLS; col++) {
            const node = getNode(col, row, layer, time);

            // Horizontal beams (col to col+1)
            if (col < COLS - 1) {
              const next = getNode(col + 1, row, layer, time);
              const avgDepth = (node.depth + next.depth) / 2;
              const cx1 = col / (COLS - 1) - 0.5;
              const cy1 = row / (ROWS - 1) - 0.5;
              const dist = Math.sqrt(cx1 * cx1 + cy1 * cy1);
              const collapse = Math.max(0, 1 - dist / 0.87);
              beams.push({
                x1: node.x, y1: node.y,
                x2: next.x, y2: next.y,
                depth: avgDepth, collapse,
              });
            }

            // Vertical beams (row to row+1)
            if (row < ROWS - 1) {
              const next = getNode(col, row + 1, layer, time);
              const avgDepth = (node.depth + next.depth) / 2;
              const cx1 = col / (COLS - 1) - 0.5;
              const cy1 = row / (ROWS - 1) - 0.5;
              const dist = Math.sqrt(cx1 * cx1 + cy1 * cy1);
              const collapse = Math.max(0, 1 - dist / 0.87);
              beams.push({
                x1: node.x, y1: node.y,
                x2: next.x, y2: next.y,
                depth: avgDepth, collapse,
              });
            }

            // Depth beams (layer to layer+1) — cross-bracing
            if (layer < LAYERS - 1) {
              const next = getNode(col, row, layer + 1, time);
              const avgDepth = (node.depth + next.depth) / 2;
              const cx1 = col / (COLS - 1) - 0.5;
              const cy1 = row / (ROWS - 1) - 0.5;
              const dist = Math.sqrt(cx1 * cx1 + cy1 * cy1);
              const collapse = Math.max(0, 1 - dist / 0.87);
              beams.push({
                x1: node.x, y1: node.y,
                x2: next.x, y2: next.y,
                depth: avgDepth, collapse,
              });
            }
          }
        }
      }

      // Sort: back beams first (highest depth)
      beams.sort((a, b) => b.depth - a.depth);

      // Render beams
      for (const beam of beams) {
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', beam.x1.toFixed(1));
        line.setAttribute('y1', beam.y1.toFixed(1));
        line.setAttribute('x2', beam.x2.toFixed(1));
        line.setAttribute('y2', beam.y2.toFixed(1));

        // Depth-based fog
        const depthNorm = (beam.depth + 40) / 80; // 0=far, 1=near
        const depthFog = Math.max(0.15, Math.min(1, depthNorm));

        // Collapse-based darkening
        const collapseCurve = Math.pow(beam.collapse, 2);
        const baseOp = 0.04 + depthFog * 0.08;
        const collapseBoost = collapseCurve * 0.4;
        const opacity = Math.min(baseOp + collapseBoost, 0.6);
        const weight = 0.3 + depthFog * 0.4 + collapseCurve * 1.2;

        if (collapseCurve > 0.2) {
          line.setAttribute('stroke', `rgba(6,16,32,${opacity.toFixed(2)})`);
        } else {
          line.setAttribute('stroke', `rgba(6,30,68,${opacity.toFixed(2)})`);
        }
        line.setAttribute('stroke-width', weight.toFixed(2));
        line.setAttribute('stroke-linecap', 'round');
        svg.appendChild(line);
      }

      // Pressure accent at pinch nodes
      {
        for (let layer = 0; layer < LAYERS; layer++) {
          for (let col = 2; col <= 5; col++) {
            const node = getNode(col, Math.floor(ROWS * 0.45), layer, time);
            const dot = document.createElementNS(svgNS, 'circle');
            dot.setAttribute('cx', node.x.toFixed(1));
            dot.setAttribute('cy', node.y.toFixed(1));
            dot.setAttribute('r', '1.5');
            dot.setAttribute('fill', 'rgba(180,120,80,0.08)');
            svg.appendChild(dot);
          }
        }
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
