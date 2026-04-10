// Shared wave math and synchronized animation time for Hero + Light mesh backgrounds

export const ROWS = 35;
export const COLS = 60;
export const W = 2000;
export const H = 400;

let sharedTime = 0;

/** Called by HeroBackground each frame to advance and return current time */
export function advanceSharedTime(): number {
  sharedTime += 0.005;
  return sharedTime;
}

/** Called by LightMeshBackground to read current time without advancing */
export function getSharedTime(): number {
  return sharedTime;
}

/** Wave displacement — identical math for both dark and light meshes */
export function getY(col: number, row: number, t: number): number {
  const nx = col / COLS;
  const ny = row / ROWS;
  const baseY = ny * H;
  const amp = 60 + Math.sin(ny * Math.PI) * 50;
  const w1 = Math.sin(nx * Math.PI * 2.5 + ny * 2 + t) * amp;
  const w2 = Math.sin(nx * Math.PI * 1.2 + ny * 1.5 + t * 0.6) * amp * 0.4;
  return baseY + w1 + w2;
}
