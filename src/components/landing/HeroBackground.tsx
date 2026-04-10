'use client';

import { useEffect, useRef } from 'react';
import styles from './hero.module.css';
import { getY, advanceSharedTime, ROWS, COLS, W, H } from './meshWaveCore';

const GRAV_X = W * 0.22;
const GRAV_Y = H * 0.45;
const GRAV_RADIUS = W * 0.18;

// Impulse system
const IMPULSE_MOVE_THRESHOLD = 60;
const IMPULSE_SPEED = 0.006;
const IMPULSE_MAX_RADIUS = W * 0.25;
const IMPULSE_RING_WIDTH = W * 0.08;
const IMPULSE_DISPLACEMENT = 18;
const IMPULSE_GLOW = 0.08;
const IMPULSE_WEIGHT = 0.15;

export default function HeroBackground() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const interactionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasRef.current;
    const interactionLayer = interactionRef.current;
    if (!container || !interactionLayer) return;

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';

    let animId: number;

    // --- Left-side gravitational influence ---
    const GRAV_RX = GRAV_RADIUS;
    const GRAV_RY = GRAV_RADIUS * 0.8;
    const colInfluence = new Float32Array(COLS + 1);
    for (let c = 0; c <= COLS; c++) {
      const dx = (c / COLS) * W - GRAV_X;
      const nx = dx / GRAV_RX;
      if (Math.abs(nx) >= 1) { colInfluence[c] = 0; continue; }
      colInfluence[c] = (1 - nx * nx);
    }

    function influence(col: number, py: number): number {
      const ci = colInfluence[col];
      if (ci === 0) return 0;
      const dy = (py - GRAV_Y) / GRAV_RY;
      if (Math.abs(dy) >= 1) return 0;
      const yi = 1 - dy * dy;
      return ci * yi * yi;
    }

    // --- Impulse state ---
    let impulseOriginX = 0;
    let impulseOriginY = 0;
    let impulseProgress = -1; // -1 = idle, 0..1 = active, >1 resets to -1
    let lastPointerX = -9999;
    let lastPointerY = -9999;

    function triggerImpulse(svgX: number, svgY: number) {
      if (impulseProgress >= 0) return; // previous wave still active
      impulseOriginX = svgX;
      impulseOriginY = svgY;
      impulseProgress = 0;
    }

    function onPointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      const domX = e.clientX - rect.left;
      const domY = e.clientY - rect.top;

      const dx = domX - lastPointerX;
      const dy = domY - lastPointerY;
      const moved = Math.sqrt(dx * dx + dy * dy);

      if (lastPointerX < -999 || moved > IMPULSE_MOVE_THRESHOLD) {
        const svgX = (domX / rect.width) * W;
        const svgY = (domY / rect.height) * H;
        triggerImpulse(svgX, svgY);
        lastPointerX = domX;
        lastPointerY = domY;
      }
    }

    function onPointerEnter(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      const domX = e.clientX - rect.left;
      const domY = e.clientY - rect.top;
      lastPointerX = domX;
      lastPointerY = domY;

      const svgX = (domX / rect.width) * W;
      const svgY = (domY / rect.height) * H;
      triggerImpulse(svgX, svgY);
    }

    function onPointerLeave() {
      lastPointerX = -9999;
      lastPointerY = -9999;
    }

    const canHover = window.matchMedia('(hover: hover)').matches;
    if (canHover) {
      interactionLayer.addEventListener('pointermove', onPointerMove, { passive: true });
      interactionLayer.addEventListener('pointerenter', onPointerEnter, { passive: true });
      interactionLayer.addEventListener('pointerleave', onPointerLeave, { passive: true });
    }

    function impulseAt(px: number, py: number): { dx: number; dy: number; strength: number } {
      if (impulseProgress < 0 || impulseProgress > 1) return { dx: 0, dy: 0, strength: 0 };

      const diffX = px - impulseOriginX;
      const diffY = py - impulseOriginY;
      const dist = Math.sqrt(diffX * diffX + diffY * diffY);

      const ringRadius = impulseProgress * IMPULSE_MAX_RADIUS;
      const distFromRing = Math.abs(dist - ringRadius);
      if (distFromRing > IMPULSE_RING_WIDTH) return { dx: 0, dy: 0, strength: 0 };

      const ringT = distFromRing / IMPULSE_RING_WIDTH;
      const ringStrength = (1 - ringT * ringT);
      const expansionFade = 1 - impulseProgress * impulseProgress;

      const strength = ringStrength * expansionFade;
      if (strength < 0.005 || dist < 0.01) return { dx: 0, dy: 0, strength: 0 };

      const pull = strength * IMPULSE_DISPLACEMENT;
      const nx = -diffX / dist;
      const ny = -diffY / dist;

      return { dx: nx * pull, dy: ny * pull, strength };
    }

    // Pre-allocated point buffer
    const pointBuf: { fx: number; fy: number; str: number }[] = [];
    for (let i = 0; i <= Math.max(COLS, ROWS); i++) {
      pointBuf.push({ fx: 0, fy: 0, str: 0 });
    }

    function render() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      const time = advanceSharedTime();

      // Advance impulse
      if (impulseProgress >= 0 && impulseProgress <= 1) {
        impulseProgress += IMPULSE_SPEED;
        if (impulseProgress > 1) impulseProgress = -1;
      }

      const impulseActive = impulseProgress >= 0 && impulseProgress <= 1;

      // --- Horizontal lines ---
      for (let r = 0; r <= ROWS; r++) {
        let hasGlow = false;
        for (let c = 0; c <= COLS; c++) {
          const x = (c / COLS) * W;
          const baseY = getY(c, r, time);
          const gravInf = influence(c, baseY);
          const gravPull = (GRAV_Y - baseY) * gravInf * 0.07;
          const afterGrav = baseY + gravPull;

          let impDx = 0, impDy = 0, impStr = 0;
          if (impulseActive) {
            const imp = impulseAt(x, afterGrav);
            impDx = imp.dx;
            impDy = imp.dy;
            impStr = imp.strength;
            if (impStr > 0) hasGlow = true;
          }

          pointBuf[c].fx = x + impDx;
          pointBuf[c].fy = afterGrav + impDy;
          pointBuf[c].str = impStr;
        }

        // Base path
        let d = '';
        for (let c = 0; c <= COLS; c++) {
          d += (c === 0 ? 'M' : 'L') + pointBuf[c].fx.toFixed(1) + ',' + pointBuf[c].fy.toFixed(1);
        }

        const t = r / ROWS;
        const distCenter = Math.abs(t - 0.42);
        const sampleCol = Math.round(COLS * 0.22);
        const sampleY = getY(sampleCol, r, time);
        const rowGravInf = influence(sampleCol, sampleY);

        const basePath = document.createElementNS(svgNS, 'path');
        basePath.setAttribute('d', d);
        basePath.setAttribute('fill', 'none');

        if (distCenter < 0.05) {
          const peach = (0.05 - distCenter) / 0.05 * 0.8 + rowGravInf * 0.045;
          basePath.setAttribute('stroke', `rgba(255,160,120,${Math.min(peach, 1)})`);
          basePath.setAttribute('stroke-width', (1.5 + rowGravInf * 0.2).toFixed(2));
        } else {
          const op = 0.12 + Math.sin(t * Math.PI) * 0.1 + rowGravInf * 0.045;
          basePath.setAttribute('stroke', `rgba(126,200,238,${Math.min(op, 1)})`);
          basePath.setAttribute('stroke-width', (0.6 + rowGravInf * 0.18).toFixed(2));
        }
        svg.appendChild(basePath);

        // Glow overlay — ring-affected segments only
        if (hasGlow) {
          let glowD = '';
          let inGlow = false;

          for (let c = 0; c <= COLS; c++) {
            if (pointBuf[c].str > 0.01) {
              glowD += (inGlow ? 'L' : 'M') + pointBuf[c].fx.toFixed(1) + ',' + pointBuf[c].fy.toFixed(1);
              inGlow = true;
            } else {
              inGlow = false;
            }
          }

          if (glowD) {
            let sumStr = 0, countStr = 0;
            for (let c = 0; c <= COLS; c++) {
              if (pointBuf[c].str > 0.01) { sumStr += pointBuf[c].str; countStr++; }
            }
            const avgStr = countStr > 0 ? sumStr / countStr : 0;

            const glowPath = document.createElementNS(svgNS, 'path');
            glowPath.setAttribute('d', glowD);
            glowPath.setAttribute('fill', 'none');

            if (distCenter < 0.05) {
              const pg = (0.05 - distCenter) / 0.05 * 0.8 + rowGravInf * 0.045 + avgStr * IMPULSE_GLOW;
              glowPath.setAttribute('stroke', `rgba(255,160,120,${Math.min(pg, 1)})`);
              glowPath.setAttribute('stroke-width', (1.5 + rowGravInf * 0.2 + avgStr * IMPULSE_WEIGHT).toFixed(2));
            } else {
              const og = 0.12 + Math.sin(t * Math.PI) * 0.1 + rowGravInf * 0.045 + avgStr * IMPULSE_GLOW;
              glowPath.setAttribute('stroke', `rgba(126,200,238,${Math.min(og, 1)})`);
              glowPath.setAttribute('stroke-width', (0.6 + rowGravInf * 0.18 + avgStr * IMPULSE_WEIGHT).toFixed(2));
            }
            svg.appendChild(glowPath);
          }
        }
      }

      // --- Vertical lines ---
      for (let c = 0; c <= COLS; c++) {
        let hasGlow = false;
        for (let r = 0; r <= ROWS; r++) {
          const x = (c / COLS) * W;
          const baseY = getY(c, r, time);
          const gravInf = influence(c, baseY);
          const gravPull = (GRAV_Y - baseY) * gravInf * 0.07;
          const afterGrav = baseY + gravPull;

          let impDx = 0, impDy = 0, impStr = 0;
          if (impulseActive) {
            const imp = impulseAt(x, afterGrav);
            impDx = imp.dx;
            impDy = imp.dy;
            impStr = imp.strength;
            if (impStr > 0) hasGlow = true;
          }

          pointBuf[r].fx = x + impDx;
          pointBuf[r].fy = afterGrav + impDy;
          pointBuf[r].str = impStr;
        }

        // Base path
        let d = '';
        for (let r = 0; r <= ROWS; r++) {
          d += (r === 0 ? 'M' : 'L') + pointBuf[r].fx.toFixed(1) + ',' + pointBuf[r].fy.toFixed(1);
        }

        const t = c / COLS;
        const colMidY = getY(c, Math.round(ROWS * 0.45), time);
        const colGravInf = influence(c, colMidY);

        const basePath = document.createElementNS(svgNS, 'path');
        basePath.setAttribute('d', d);
        basePath.setAttribute('fill', 'none');
        const baseOp = 0.12 + Math.sin(t * Math.PI) * 0.08 + colGravInf * 0.045;
        basePath.setAttribute('stroke', `rgba(126,200,238,${Math.min(baseOp, 1)})`);
        basePath.setAttribute('stroke-width', (0.5 + colGravInf * 0.15).toFixed(2));
        svg.appendChild(basePath);

        // Glow overlay
        if (hasGlow) {
          let glowD = '';
          let inGlow = false;

          for (let r = 0; r <= ROWS; r++) {
            if (pointBuf[r].str > 0.01) {
              glowD += (inGlow ? 'L' : 'M') + pointBuf[r].fx.toFixed(1) + ',' + pointBuf[r].fy.toFixed(1);
              inGlow = true;
            } else {
              inGlow = false;
            }
          }

          if (glowD) {
            let sumStr = 0, countStr = 0;
            for (let r = 0; r <= ROWS; r++) {
              if (pointBuf[r].str > 0.01) { sumStr += pointBuf[r].str; countStr++; }
            }
            const avgStr = countStr > 0 ? sumStr / countStr : 0;

            const glowPath = document.createElementNS(svgNS, 'path');
            glowPath.setAttribute('d', glowD);
            glowPath.setAttribute('fill', 'none');
            const og = 0.12 + Math.sin(t * Math.PI) * 0.08 + colGravInf * 0.045 + avgStr * IMPULSE_GLOW;
            glowPath.setAttribute('stroke', `rgba(126,200,238,${Math.min(og, 1)})`);
            glowPath.setAttribute('stroke-width', (0.5 + colGravInf * 0.15 + avgStr * IMPULSE_WEIGHT).toFixed(2));
            svg.appendChild(glowPath);
          }
        }
      }

      animId = requestAnimationFrame(render);
    }

    container.appendChild(svg);
    render();

    return () => {
      cancelAnimationFrame(animId);
      if (svg.parentNode) svg.parentNode.removeChild(svg);
      if (canHover) {
        interactionLayer.removeEventListener('pointermove', onPointerMove);
        interactionLayer.removeEventListener('pointerenter', onPointerEnter);
        interactionLayer.removeEventListener('pointerleave', onPointerLeave);
      }
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

      {/* Mouse interaction layer */}
      <div className={styles.meshInteraction} ref={interactionRef} />

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
