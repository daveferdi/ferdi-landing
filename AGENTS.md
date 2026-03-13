# AGENTS.md — FERDI Landing Page Project

> Default agent rules for this repository.
> Update this file whenever brand direction, architecture, or implementation rules change.

---

## Source of Truth Order

1. `docs/ferdi/landing-brief.md` (Locked V2)
2. `docs/ferdi/work-orders.md`
3. `docs/ferdi/assets-todo.md`
4. `AGENTS.md` (this file)
5. `CLAUDE.md` (mirror guidance)

If conflicts exist, follow this order.
Historical notes that conflict with this order are archival only.

---

## Project Structure

```
ferdi-landing/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── Hero.tsx
│   ├── globals.css
│   └── brand-colors/page.tsx
├── public/
│   ├── media/
│   └── FerdiHero.html
├── docs/ferdi/
│   ├── landing-brief.md
│   ├── assets-todo.md
│   └── work-orders.md
└── AGENTS.md
```

---

## Dev Server

```bash
npm run dev
```

- Main app: `http://localhost:3456`
- Production local run:
  - `npm run build`
  - `npm run start`

---

## Locked Brand Direction (Default)

FERDI is:
- light-smoky
- premium
- calm
- precise
- human

FERDI is not:
- generic SaaS
- dark-heavy SaaS
- flat-white empty
- sci-fi/cyberpunk
- decorative AI demo

Brand principle:
- `Quiet Power`

---

## Visual Rules (Enforced)

1. Use a cream-mineral atmospheric field across the full site.
2. Background must be a living atmospheric field, not static wallpaper logic.
3. Keep one restrained dark navy technological anchor (primarily in hero).
4. Maintain human warmth with soft warm undertones and blurred-readable human presence.
5. Use smoky blue-gray depth layers for spatial continuity.
6. Favor field continuity over isolated panel islands.
7. Keep block surfaces contextual and editorial:
   - no global blur-card recipe as default
   - translucency is optional and rare, only when readability needs it
   - primary surface behavior should remain mineral/light with restrained separation

Do not:
- apply generic glassmorphism everywhere
- fill depth gaps with extra darkness, blur, or glow
- introduce flat white emptiness as default section treatment
- introduce neon, particle effects, or sci-fi motifs

---

## Motion Rules (Enforced)

Treat motion as system behavior, not decorative polish.

Required:
1. Layered atmospheric motion only.
2. Low amplitude + long duration (slow, sweeping, premium).
3. Atmosphere should move; decorative graphics should not dominate.
4. Prefer `transform`/`opacity` animation paths first.
5. Preserve `@media (prefers-reduced-motion: reduce)` behavior.

Do not:
- use fast flashy motion
- use jittery/high-frequency movement
- use obvious “animated graphic demo” patterns

---

## Hero Rules (Enforced)

Hero architecture lock:
- Two columns only.
- Left: one restrained dark operational anchor + blurred human presence.
- Right: bright editorial message surface.

Do not:
- turn hero into multi-card dashboard clutter
- split hero into disconnected mini-panels
- overpower headline with motion/UI noise

---

## Implementation Behavior (Enforced)

1. Preserve existing architecture before changing structure.
2. Do not add extra cards as a shortcut for “depth.”
3. Do not redesign large structure when refinement solves the gap.
4. Keep readability/contrast stable while increasing atmosphere.
5. Any major visual rule change must be recorded in:
   - `docs/ferdi/landing-brief.md`
   - `docs/ferdi/work-orders.md`

---

## Palette Authority

Color values and role mapping are owned by `docs/ferdi/landing-brief.md` (Section 6).
Do not redefine palette values here.

---

## Tech and Conventions

- Framework: Next.js 14 (App Router)
- Styling: Tailwind + `app/globals.css`
- Motion: CSS-first; Framer Motion available but not default for atmospheric system
- Language: Hebrew RTL (`<html lang="he" dir="rtl">`)
- Main IDs in use: `#hero`, `#benefits`, `#how`, `#docs`, `#trust`, `#contact`

---

## Update Log

### 2026-03-12
- Locked default agent behavior to the FERDI visual direction:
  light-smoky architectural premium, living atmospheric field, restrained dark anchor, integrated human warmth, and layered slow motion.
- Deprecated prior assumptions that encouraged dark SaaS, flat-white sections, generic glassmorphism, or sci-fi styling.
